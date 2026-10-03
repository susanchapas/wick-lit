import * as samples from "./samples";
import type {
  ChatRequest,
  ChatResponse,
  Scenario,
  ScoreRequest,
  ScoreResponse,
  SessionRecord,
  SpeakRequest,
  SpeechToken,
} from "./types";

const useSamples = import.meta.env.VITE_USE_SAMPLES === "true";

export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;

  constructor(status: number, code?: string) {
    super(code ?? `HTTP ${status}`);
    this.status = status;
    this.code = code;
  }
}

const sample = <T>(data: T) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(structuredClone(data)), 400));

const json = (body: unknown): RequestInit => ({
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

async function request(path: string, init?: RequestInit) {
  const res = await fetch(`/api/${path}`, init);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, body.error);
  }
  return res;
}

export const getScenarios = (): Promise<Scenario[]> =>
  useSamples ? sample(samples.scenarios) : request("scenarios").then((r) => r.json());

export const sendTurn = (body: ChatRequest): Promise<ChatResponse> =>
  useSamples ? sample(samples.chat) : request("chat", json(body)).then((r) => r.json());

export const getScore = (body: ScoreRequest): Promise<ScoreResponse> =>
  useSamples ? sample(samples.score) : request("score", json(body)).then((r) => r.json());

export const getSpeechToken = (): Promise<SpeechToken> =>
  useSamples ? sample(samples.speechToken) : request("speechToken").then((r) => r.json());

export const speak = (body: SpeakRequest): Promise<Blob> =>
  useSamples
    ? sample(null).then(() => Promise.reject(new ApiError(503, samples.voiceUnavailable.error)))
    : request("speak", json(body)).then((r) => r.blob());

export function saveSession(body: SessionRecord): void {
  if (useSamples) return;
  fetch("/api/sessions", { ...json(body), keepalive: true }).catch(() => {});
}
