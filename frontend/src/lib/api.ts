import type { ApiErrorBody, Mode, Scenario, StartedSession, TurnResponse, WickSession } from "./types";

const configuredBase = import.meta.env.VITE_WICK_API_BASE_URL?.replace(/\/$/, "");
const apiBase = configuredBase || "/api";

export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;

  constructor(status: number, code?: string, message?: string) {
    super(message ?? code ?? `HTTP ${status}`);
    this.status = status;
    this.code = code;
  }
}

const json = (body?: unknown): RequestInit => ({
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: body === undefined ? undefined : JSON.stringify(body),
});

const authorized = (token: string, init: RequestInit = {}): RequestInit => ({
  ...init,
  headers: { ...init.headers, Authorization: `Bearer ${token}` },
});

async function request(path: string, init?: RequestInit) {
  const response = await fetch(`${apiBase}/${path}`, init);
  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as ApiErrorBody;
    const error = typeof body.error === "string" ? { code: body.error } : body.error;
    throw new ApiError(response.status, error?.code, error?.message);
  }
  return response;
}

export async function getScenarios(): Promise<Scenario[]> {
  const payload = (await request("scenarios").then((response) => response.json())) as {
    scenarios: Array<{
      scenarioId: string;
      scenarioVersion: string;
      title: string;
      description: string;
      setting: string;
      character: { name: string };
      firstMessage: string;
      durationSeconds: number;
      contentTags: string[];
      contentNote: string;
      strategies: Scenario["strategies"];
      modes: Mode[];
    }>;
  };
  return payload.scenarios.map((scenario) => ({
    id: scenario.scenarioId,
    version: scenario.scenarioVersion,
    title: scenario.title,
    setup: scenario.description,
    location: scenario.setting,
    minutes: Math.max(1, Math.ceil(scenario.durationSeconds / 60)),
    characters: [scenario.character.name, "You"],
    strategies: scenario.strategies,
    contentTags: scenario.contentTags,
    contentNote: scenario.contentNote,
    firstMessage: scenario.firstMessage,
    durationSeconds: scenario.durationSeconds,
    modes: scenario.modes,
  }));
}

export const startSession = (scenarioId: string, mode: Mode): Promise<StartedSession> =>
  request("sessions", json({ scenarioId, mode })).then((response) => response.json());

export const sendTurn = (credential: { sessionId: string; sessionToken: string }, text: string, mode: Mode): Promise<TurnResponse> =>
  request(
    `sessions/${credential.sessionId}/message`,
    authorized(credential.sessionToken, json({ text, sourceMedium: mode === "voice" ? "audio" : "text" })),
  ).then((response) => response.json());

export const endSession = (credential: { sessionId: string; sessionToken: string }): Promise<WickSession> =>
  request(`sessions/${credential.sessionId}/end`, authorized(credential.sessionToken, json())).then((response) => response.json());

export const stepOutSession = (credential: { sessionId: string; sessionToken: string }): Promise<WickSession> =>
  request(`sessions/${credential.sessionId}/step-out`, authorized(credential.sessionToken, json())).then((response) => response.json());

export async function transcribeAudio(credential: { sessionId: string; sessionToken: string }, audio: Blob): Promise<string> {
  const form = new FormData();
  form.append("audio", audio, `utterance.${audio.type.includes("ogg") ? "ogg" : "webm"}`);
  const response = await request(`sessions/${credential.sessionId}/transcribe`, authorized(credential.sessionToken, { method: "POST", body: form }));
  return ((await response.json()) as { text: string }).text;
}

export const getTurnSpeech = (credential: { sessionId: string; sessionToken: string }, turnId: string): Promise<Blob> =>
  request(`sessions/${credential.sessionId}/turns/${turnId}/speech`, authorized(credential.sessionToken, { method: "POST" })).then((response) => response.blob());
