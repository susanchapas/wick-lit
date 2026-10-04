import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

import { AppError, asPublicError } from "../domain/errors";
import { corsHeaders, requiredString, respond } from "../http/helpers";
import { synthesizeCharacterSpeech, transcribeUserAudio } from "../providers/elevenLabsSpeech";
import { getCharacterVoiceId } from "../scenarios";
import { readBearerToken } from "../security/sessionAccess";
import { getCharacterTurnContext, getSession } from "../services/sessionService";
import { getSessionStore } from "../storage/sessionStore";

export async function transcribe(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  return respond(request, context, async () => {
    const store = await getSessionStore();
    await getSession(store, requiredString(request.params.sessionId, "sessionId", 80), token(request));
    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      throw new AppError(400, "invalid_audio_upload", "Upload the recording as multipart form data.");
    }
    const audio = form.get("audio");
    if (!(audio instanceof Blob)) throw new AppError(400, "audio_required", "An audio recording is required.");
    const text = await transcribeUserAudio({
      bytes: new Uint8Array(await audio.arrayBuffer()),
      fileName: "name" in audio && typeof audio.name === "string" ? audio.name : "utterance.webm",
      contentType: audio.type || "audio/webm",
    });
    context.log("User utterance transcribed", { sessionId: request.params.sessionId, characters: text.length });
    return { body: { text } };
  });
}

export async function speech(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  if (request.method === "OPTIONS") return { status: 204, headers: corsHeaders(request) };
  try {
    const store = await getSessionStore();
    const sessionId = requiredString(request.params.sessionId, "sessionId", 80);
    const sessionToken = token(request);
    const { turn, scenarioId } = await getCharacterTurnContext(
      store,
      sessionId,
      sessionToken,
      requiredString(request.params.turnId, "turnId", 20),
    );
    const audio = await synthesizeCharacterSpeech(turn.text, getCharacterVoiceId(scenarioId, turn.speaker));
    return {
      status: 200,
      body: audio.bytes,
      headers: {
        ...corsHeaders(request),
        "content-type": audio.contentType,
        "content-length": String(audio.bytes.byteLength),
        "cache-control": "private, no-store",
      },
    };
  } catch (error) {
    const failure = asPublicError(error);
    context.error("Wick speech request failed", { code: failure.body.error.code, status: failure.status });
    return {
      status: failure.status,
      jsonBody: failure.body,
      headers: { ...corsHeaders(request), "cache-control": "no-store" },
    };
  }
}

app.http("transcribeUserAudio", { methods: ["POST", "OPTIONS"], authLevel: "anonymous", route: "sessions/{sessionId}/transcribe", handler: transcribe });
app.http("synthesizeCharacterSpeech", { methods: ["POST", "OPTIONS"], authLevel: "anonymous", route: "sessions/{sessionId}/turns/{turnId}/speech", handler: speech });

function token(request: HttpRequest) {
  return readBearerToken(request.headers.get("authorization"));
}
