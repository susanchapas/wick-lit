import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { readFileSync } from "node:fs";

import { AppError, asPublicError } from "../domain/errors";
import { publicScenario } from "../scenarios/askAFriend";
import { readBearerToken } from "../security/sessionAccess";
import {
  attachProviderConversation,
  createSession,
  disconnectSession,
  finishSession,
  getSessionResult,
  rateLimitIdentity,
  stepOutSession,
} from "../services/sessionService";
import { MemorySessionStore } from "../storage/sessionStore";

loadLocalSettings();
const store = new MemorySessionStore();
const port = Number(process.env.WICK_DEV_API_PORT ?? "7071");

createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
    const path = url.pathname;
    if (request.method === "GET" && path === "/api/health") {
      return json(response, 200, { status: "ok", service: "wick-node-local" });
    }
    if (request.method === "GET" && path === "/api/scenarios") {
      return json(response, 200, { scenarios: [publicScenario()] });
    }
    if (request.method === "POST" && path === "/api/sessions") {
      const body = await readBody(request);
      const result = await createSession(
        store,
        { scenarioId: stringField(body.scenarioId), mode: stringField(body.mode) },
        rateLimitIdentity(request.socket.remoteAddress),
      );
      return json(response, 201, result);
    }

    const match = /^\/api\/sessions\/([^/]+)\/(connect|finish|result|step-out|disconnect)$/.exec(path);
    if (!match) throw new AppError(404, "not_found", "The route was not found.");
    const [, sessionId, action] = match;
    const token = readBearerToken(
      Array.isArray(request.headers.authorization)
        ? request.headers.authorization[0]
        : request.headers.authorization ?? null,
    );
    let result: unknown;
    if (request.method === "POST" && action === "connect") {
      const body = await readBody(request);
      result = await attachProviderConversation(
        store,
        sessionId,
        token,
        stringField(body.providerConversationId),
      );
    } else if (request.method === "POST" && action === "finish") {
      result = await finishSession(store, sessionId, token);
    } else if (request.method === "GET" && action === "result") {
      result = await getSessionResult(store, sessionId, token);
    } else if (request.method === "POST" && action === "step-out") {
      result = await stepOutSession(store, sessionId, token);
    } else if (request.method === "POST" && action === "disconnect") {
      result = await disconnectSession(store, sessionId, token);
    } else {
      throw new AppError(405, "method_not_allowed", "The method is not allowed.");
    }
    const status =
      typeof result === "object" && result && "state" in result && result.state === "processing"
        ? 202
        : 200;
    return json(response, status, result);
  } catch (error) {
    const value = asPublicError(error);
    return json(response, value.status, value.body);
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Wick local API listening on http://127.0.0.1:${port}`);
});

async function readBody(request: IncomingMessage): Promise<Record<string, unknown>> {
  let raw = "";
  for await (const chunk of request) {
    raw += String(chunk);
    if (raw.length > 16_384) throw new AppError(413, "request_too_large", "Request too large.");
  }
  try {
    const value = JSON.parse(raw || "{}");
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error();
    return value as Record<string, unknown>;
  } catch {
    throw new AppError(400, "invalid_json", "A valid JSON object is required.");
  }
}

function stringField(value: unknown): string {
  if (typeof value !== "string") throw new AppError(400, "invalid_request", "A string is required.");
  return value;
}

function json(response: ServerResponse, status: number, body: unknown) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(JSON.stringify(body));
}

function loadLocalSettings() {
  const settings = JSON.parse(readFileSync("local.settings.json", "utf8")) as {
    Values?: Record<string, string>;
  };
  for (const [name, value] of Object.entries(settings.Values ?? {})) {
    if (process.env[name] === undefined) process.env[name] = value;
  }
}
