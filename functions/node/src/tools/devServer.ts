import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { readFileSync } from "node:fs";

import { AppError, asPublicError } from "../domain/errors";
import { synthesizeCharacterSpeech, transcribeUserAudio } from "../providers/elevenLabsSpeech";
import { getScenarioCharacterVoiceId, publicScenario, publicScenarios } from "../scenarios";
import { generateCustomScenario, signCustomScenario } from "../scenarios/customScenario";
import { readBearerToken } from "../security/sessionAccess";
import { addMessage, createSession, endSession, getCharacterTurnContext, getSession, rateLimitIdentity, stepOutSession } from "../services/sessionService";
import { MemorySessionStore } from "../storage/sessionStore";

loadLocalSettings();
const store = new MemorySessionStore();
const port = Number(process.env.WICK_DEV_API_PORT ?? "7071");

createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
    const path = url.pathname;
    if (request.method === "GET" && path === "/api/health") return json(response, 200, { status: "ok", service: "wick-node-local" });
    if (request.method === "GET" && path === "/api/scenarios") return json(response, 200, { scenarios: publicScenarios() });
    if (request.method === "POST" && path === "/api/scenarios/generate") {
      const body = await readJson(request);
      await store.consumeRateLimit(`generate-${rateLimitIdentity(request.socket.remoteAddress)}`, 6, 60 * 60);
      const prompt = stringField(body.prompt).trim();
      if (prompt.length < 20 || prompt.length > 1_500) {
        throw new AppError(400, "invalid_scenario_prompt", "Describe the situation in 20 to 1,500 characters.");
      }
      const scenario = await generateCustomScenario(prompt);
      return json(response, 201, { scenario: publicScenario(scenario), scenarioToken: signCustomScenario(scenario) });
    }
    if (request.method === "POST" && path === "/api/sessions") {
      const body = await readJson(request);
      const result = await createSession(
        store,
        {
          scenarioId: stringField(body.scenarioId ?? body.scenario_id),
          mode: stringField(body.mode),
          scenarioToken: typeof body.scenarioToken === "string" ? body.scenarioToken : undefined,
        },
        rateLimitIdentity(request.socket.remoteAddress),
      );
      return json(response, 201, result);
    }

    const match = /^\/api\/sessions\/([^/]+)(?:\/(message|transcribe|end|step-out|turns\/([^/]+)\/speech))?$/.exec(path);
    if (!match) throw new AppError(404, "not_found", "The route was not found.");
    const [, sessionId, action, turnId] = match;
    const token = readBearerToken(singleHeader(request.headers.authorization) ?? null);
    if (request.method === "GET" && !action) return json(response, 200, await getSession(store, sessionId, token));
    if (request.method === "POST" && action === "message") {
      const body = await readJson(request);
      return json(response, 200, await addMessage(store, sessionId, token, {
        text: stringField(body.text),
        sourceMedium: typeof body.sourceMedium === "string" ? body.sourceMedium : undefined,
      }));
    }
    if (request.method === "POST" && action === "transcribe") {
      await getSession(store, sessionId, token);
      const form = await readFormData(request);
      const audio = form.get("audio");
      if (!(audio instanceof Blob)) throw new AppError(400, "audio_required", "An audio recording is required.");
      const text = await transcribeUserAudio({
        bytes: new Uint8Array(await audio.arrayBuffer()),
        fileName: "name" in audio && typeof audio.name === "string" ? audio.name : "utterance.webm",
        contentType: audio.type || "audio/webm",
      });
      return json(response, 200, { text });
    }
    if (request.method === "POST" && action?.startsWith("turns/") && turnId) {
      const { turn, scenario } = await getCharacterTurnContext(store, sessionId, token, turnId);
      const audio = await synthesizeCharacterSpeech(turn.text, getScenarioCharacterVoiceId(scenario, turn.speaker));
      response.writeHead(200, { "content-type": audio.contentType, "content-length": String(audio.bytes.byteLength), "cache-control": "no-store" });
      return response.end(audio.bytes);
    }
    if (request.method === "POST" && action === "end") return json(response, 200, await endSession(store, sessionId, token));
    if (request.method === "POST" && action === "step-out") return json(response, 200, await stepOutSession(store, sessionId, token));
    throw new AppError(405, "method_not_allowed", "The method is not allowed.");
  } catch (error) {
    const value = asPublicError(error);
    return json(response, value.status, value.body);
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Wick local API listening on http://127.0.0.1:${port}`);
});

async function readJson(request: IncomingMessage): Promise<Record<string, unknown>> {
  const bytes = await readBytes(request, 16_384);
  try {
    const value = JSON.parse(bytes.toString("utf8") || "{}");
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error();
    return value as Record<string, unknown>;
  } catch {
    throw new AppError(400, "invalid_json", "A valid JSON object is required.");
  }
}

async function readFormData(request: IncomingMessage): Promise<FormData> {
  const bytes = await readBytes(request, 20 * 1024 * 1024);
  try {
    const copy = new Uint8Array(bytes.byteLength);
    copy.set(bytes);
    const webRequest = new Request("http://localhost/upload", {
      method: "POST",
      headers: { "content-type": singleHeader(request.headers["content-type"]) ?? "" },
      body: copy.buffer,
    });
    return await webRequest.formData();
  } catch {
    throw new AppError(400, "invalid_audio_upload", "Upload the recording as multipart form data.");
  }
}

async function readBytes(request: IncomingMessage, maxBytes: number): Promise<Buffer> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of request) {
    const value = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += value.byteLength;
    if (size > maxBytes) throw new AppError(413, "request_too_large", "Request too large.");
    chunks.push(value);
  }
  return Buffer.concat(chunks);
}

function stringField(value: unknown): string {
  if (typeof value !== "string") throw new AppError(400, "invalid_request", "A string is required.");
  return value;
}

function singleHeader(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function json(response: ServerResponse, status: number, body: unknown) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
  response.end(JSON.stringify(body));
}

function loadLocalSettings() {
  const settings = JSON.parse(readFileSync("local.settings.json", "utf8")) as { Values?: Record<string, string> };
  for (const [name, value] of Object.entries(settings.Values ?? {})) {
    if (process.env[name] === undefined) process.env[name] = value;
  }
}
