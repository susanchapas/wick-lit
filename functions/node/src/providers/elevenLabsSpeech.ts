import { AppError } from "../domain/errors";

const API_ORIGIN = "https://api.elevenlabs.io";
const PROVIDER_TIMEOUT_MS = 30_000;
const STABILIZED_VOICE_ID = "iP95p4xoKVk53GoZ742B";

export interface TranscriptionInput {
  bytes: Uint8Array;
  fileName: string;
  contentType: string;
}

export interface SpeechAudio {
  bytes: Uint8Array;
  contentType: string;
}

export async function transcribeUserAudio(input: TranscriptionInput): Promise<string> {
  if (input.bytes.byteLength < 64) {
    throw new AppError(400, "audio_too_short", "No usable speech recording was received.");
  }
  if (input.bytes.byteLength > 20 * 1024 * 1024) {
    throw new AppError(413, "audio_too_large", "The voice recording is too large.");
  }

  const form = new FormData();
  form.set("model_id", process.env.ELEVENLABS_STT_MODEL ?? "scribe_v2");
  form.set("language_code", "eng");
  form.set("tag_audio_events", "false");
  form.set("diarize", "false");
  const copy = new Uint8Array(input.bytes.byteLength);
  copy.set(input.bytes);
  form.set("file", new Blob([copy.buffer], { type: input.contentType }), input.fileName);

  const response = await request("/v1/speech-to-text", { method: "POST", body: form });
  const body = await response.json() as { text?: unknown };
  const text = typeof body.text === "string" ? body.text.trim() : "";
  if (!text) {
    throw new AppError(422, "speech_not_recognized", "No speech was recognized. Please try again.", true);
  }
  return text;
}

export async function synthesizeCharacterSpeech(text: string, characterVoiceId?: string): Promise<SpeechAudio> {
  const voiceId = characterVoiceId;
  if (!voiceId) {
    throw new AppError(503, "elevenlabs_voice_not_configured", "Character voice is not configured on the server.");
  }
  console.log("ElevenLabs TTS request started", { characters: text.length });
  const response = await request(
    `/v1/text-to-speech/${encodeURIComponent(voiceId)}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: { "content-type": "application/json", accept: "audio/mpeg" },
      body: JSON.stringify({
        text,
        model_id: process.env.ELEVENLABS_TTS_MODEL ?? "eleven_flash_v2_5",
        ...(voiceId === STABILIZED_VOICE_ID ? {
          voice_settings: {
            stability: 0.9,
            similarity_boost: 0.75,
            style: 0,
            use_speaker_boost: true,
            speed: 1,
          },
        } : {}),
      }),
    },
  );
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.byteLength === 0) {
    throw new AppError(502, "empty_speech_audio", "ElevenLabs returned empty audio.", true);
  }
  const contentType = response.headers.get("content-type")?.split(";")[0] || "audio/mpeg";
  console.log("ElevenLabs TTS response received", { bytes: bytes.byteLength, contentType });
  return { bytes, contentType };
}

async function request(path: string, init: RequestInit): Promise<Response> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    throw new AppError(503, "elevenlabs_not_configured", "ElevenLabs is not configured on the server.");
  }
  const headers = new Headers(init.headers);
  headers.set("xi-api-key", apiKey);
  let response: Response;
  try {
    response = await fetch(`${API_ORIGIN}${path}`, {
      ...init,
      headers,
      signal: AbortSignal.timeout(PROVIDER_TIMEOUT_MS),
    });
  } catch (error) {
    const timeout = error instanceof Error && ["TimeoutError", "AbortError"].includes(error.name);
    throw new AppError(
      timeout ? 504 : 502,
      timeout ? "elevenlabs_timeout" : "elevenlabs_unavailable",
      timeout ? "ElevenLabs did not respond in time." : "ElevenLabs could not be reached.",
      true,
    );
  }
  if (!response.ok) {
    const providerBody = await response.text().catch(() => "");
    console.error("ElevenLabs request rejected", {
      path,
      status: response.status,
      providerMessage: safeProviderMessage(providerBody),
    });
    throw new AppError(
      response.status === 400 ? 422 : response.status === 429 ? 429 : 502,
      response.status === 400
        ? "audio_format_rejected"
        : response.status === 429
          ? "elevenlabs_rate_limited"
          : "elevenlabs_request_failed",
      response.status === 401 || response.status === 403
        ? "The ElevenLabs key is missing the permission required for this voice feature."
        : response.status === 400
          ? "ElevenLabs could not read that audio recording. Please record it again."
        : "ElevenLabs rejected the voice request.",
      response.status >= 500 || response.status === 429,
    );
  }
  return response;
}

function safeProviderMessage(value: string) {
  try {
    const parsed = JSON.parse(value) as { detail?: { message?: unknown; status?: unknown } | string };
    if (typeof parsed.detail === "string") return parsed.detail.slice(0, 240);
    if (parsed.detail && typeof parsed.detail.message === "string") return parsed.detail.message.slice(0, 240);
    if (parsed.detail && parsed.detail.status) return String(parsed.detail.status).slice(0, 120);
  } catch {
    // Do not log unstructured provider bodies.
  }
  return undefined;
}
