import { createHash, randomUUID } from "node:crypto";

import { AppError } from "../domain/errors";
import type { ConversationMode, WickSession, WickTurn } from "../domain/types";
import { generateRoleplayResponse } from "../roleplay/generateResponse";
import type { RoleplayGenerator } from "../roleplay/types";
import { getScenario } from "../scenarios";
import { assertSessionAccess, createSessionCredential } from "../security/sessionAccess";
import type { SessionStore } from "../storage/sessionStore";

export async function createSession(
  store: SessionStore,
  input: { scenarioId: string; mode: string },
  rateLimitIdentity: string,
) {
  const scenario = getScenario(input.scenarioId);
  if (!scenario) throw new AppError(400, "invalid_scenario", "The scenario ID is not supported.");
  if (input.mode !== "text" && input.mode !== "voice") {
    throw new AppError(400, "invalid_mode", "Mode must be text or voice.");
  }

  await store.consumeRateLimit(rateLimitIdentity, 20, 60 * 60);
  const credential = createSessionCredential();
  const now = new Date();
  const openingTurn: WickTurn = {
    turnId: "t1",
    role: "character",
    speaker: scenario.character.id,
    text: scenario.first_message,
    sourceMedium: input.mode === "voice" ? "audio" : "text",
    createdAt: now.toISOString(),
  };
  const session: WickSession = {
    sessionId: randomUUID(),
    tokenHash: credential.tokenHash,
    scenarioId: scenario.scenario_id,
    scenarioVersion: scenario.scenario_version,
    mode: input.mode as ConversationMode,
    state: "active",
    roleplayState: "opening",
    createdAt: now.toISOString(),
    conversationDeadline: new Date(now.getTime() + scenario.duration_seconds * 1000).toISOString(),
    expiresAt: new Date(now.getTime() + 30 * 60 * 1000).toISOString(),
    turns: [openingTurn],
    nextTurnNumber: 2,
  };
  await store.create(session);
  return { ...publicSession(session), sessionToken: credential.token };
}

export async function addMessage(
  store: SessionStore,
  sessionId: string,
  token: string | undefined,
  input: { text: string; sourceMedium?: string },
  generate: RoleplayGenerator = generateRoleplayResponse,
) {
  const session = await requireSession(store, sessionId, token);
  assertActive(session);
  const text = input.text.trim();
  if (!text || text.length > 1_000) {
    throw new AppError(400, "invalid_message", "Message text must be between 1 and 1,000 characters.");
  }
  const sourceMedium = input.sourceMedium ?? session.mode;
  const storedMedium = sourceMedium === "voice" ? "audio" : sourceMedium;
  if (storedMedium !== "text" && storedMedium !== "audio") {
    throw new AppError(400, "invalid_source_medium", "The message source is invalid.");
  }
  if ((session.mode === "text" && storedMedium !== "text") || (session.mode === "voice" && storedMedium !== "audio")) {
    throw new AppError(400, "invalid_source_medium", "The message source does not match the session mode.");
  }

  const scenario = getScenario(session.scenarioId)!;
  const generated = await generate({
    scenario,
    conversationHistory: session.turns,
    latestUserMessage: text,
    currentState: session.roleplayState,
  });
  const now = new Date().toISOString();
  const userTurn: WickTurn = {
    turnId: `t${session.nextTurnNumber++}`,
    role: "user",
    speaker: "user",
    text,
    sourceMedium: storedMedium,
    createdAt: now,
  };
  const characterTurn: WickTurn = {
    turnId: `t${session.nextTurnNumber++}`,
    role: "character",
    speaker: scenario.character.id,
    text: generated.response,
    sourceMedium: session.mode === "voice" ? "audio" : "text",
    createdAt: new Date().toISOString(),
  };
  session.turns.push(userTurn, characterTurn);
  session.roleplayState = generated.state;
  session.model = generated.model;
  if (generated.scenarioComplete) {
    session.state = "completed";
    session.endedAt = new Date().toISOString();
  }
  await store.put(session);
  console.log("Gemini roleplay response generated", {
    sessionId: session.sessionId,
    turnId: characterTurn.turnId,
    characters: characterTurn.text.length,
    model: generated.model,
  });
  return { userTurn, characterTurn, session: publicSession(session) };
}

export async function getSession(store: SessionStore, sessionId: string, token: string | undefined) {
  return publicSession(await requireSession(store, sessionId, token));
}

export async function endSession(store: SessionStore, sessionId: string, token: string | undefined) {
  const session = await requireSession(store, sessionId, token);
  if (!isTerminal(session.state)) {
    session.state = "completed";
    session.endedAt = new Date().toISOString();
    await store.put(session);
  }
  return publicSession(session);
}

export async function stepOutSession(store: SessionStore, sessionId: string, token: string | undefined) {
  const session = await requireSession(store, sessionId, token);
  if (!isTerminal(session.state)) {
    session.state = "stepped_out";
    session.endedAt = new Date().toISOString();
    await store.put(session);
  }
  return publicSession(session);
}

export async function getCharacterTurn(
  store: SessionStore,
  sessionId: string,
  token: string | undefined,
  turnId: string,
): Promise<WickTurn> {
  const session = await requireSession(store, sessionId, token);
  const turn = session.turns.find((candidate) => candidate.turnId === turnId);
  if (!turn || turn.role !== "character") {
    throw new AppError(404, "character_turn_not_found", "The character turn was not found.");
  }
  return turn;
}

async function requireSession(store: SessionStore, sessionId: string, token: string | undefined) {
  if (!/^[0-9a-f-]{36}$/i.test(sessionId)) throw new AppError(404, "session_not_found", "The session was not found.");
  const session = await store.get(sessionId);
  if (!session) throw new AppError(404, "session_not_found", "The session was not found.");
  assertSessionAccess(session.tokenHash, token);
  if (Date.parse(session.expiresAt) <= Date.now() && !isTerminal(session.state)) {
    session.state = "expired";
    session.endedAt = new Date().toISOString();
    await store.put(session);
  }
  return session;
}

function assertActive(session: WickSession) {
  if (session.state !== "active") throw new AppError(409, "session_ended", "This session has ended.");
  if (Date.parse(session.conversationDeadline) <= Date.now()) {
    throw new AppError(409, "session_time_expired", "The conversation time has ended.");
  }
}

function publicSession(session: WickSession) {
  return {
    sessionId: session.sessionId,
    scenarioId: session.scenarioId,
    scenarioVersion: session.scenarioVersion,
    mode: session.mode,
    state: session.state,
    roleplayState: session.roleplayState,
    createdAt: session.createdAt,
    conversationDeadline: session.conversationDeadline,
    endedAt: session.endedAt,
    turns: session.turns,
  };
}

function isTerminal(state: WickSession["state"]) {
  return ["completed", "stepped_out", "failed", "expired"].includes(state);
}

export function rateLimitIdentity(ip: string | undefined): string {
  const value = `${process.env.WICK_RATE_LIMIT_SALT ?? "wick-local"}:${ip ?? "unknown"}`;
  return createHash("sha256").update(value).digest("hex").slice(0, 32);
}
