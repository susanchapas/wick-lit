import { createHash, randomUUID } from "node:crypto";

import { AppError } from "../domain/errors";
import type { ConversationMode, WickSession } from "../domain/types";
import { evaluateTranscript } from "../evaluation/feedback";
import {
  ConversationProcessingError,
  createTemporaryAuthorization,
  getCompletedTranscript,
  verifyAgentDefinition,
} from "../providers/elevenLabs";
import { ASK_A_FRIEND, getScenario } from "../scenarios/askAFriend";
import { assertSessionAccess, createSessionCredential } from "../security/sessionAccess";
import type { SessionStore } from "../storage/sessionStore";

export async function createSession(
  store: SessionStore,
  input: { scenarioId: string; mode: string },
  rateLimitIdentity: string,
) {
  const scenario = getScenario(input.scenarioId);
  if (!scenario) {
    throw new AppError(400, "invalid_scenario", "The scenario ID is not supported.");
  }
  if (input.mode !== "text" && input.mode !== "voice") {
    throw new AppError(400, "invalid_mode", "Mode must be text or voice.");
  }

  await store.consumeRateLimit(rateLimitIdentity, 8, 60 * 60);
  const verification = await verifyAgentDefinition();
  const authorization = await createTemporaryAuthorization(input.mode);
  const credential = createSessionCredential();
  const now = new Date();
  const deadline = new Date(now.getTime() + scenario.durationSeconds * 1000);
  const expires = new Date(now.getTime() + 30 * 60 * 1000);
  const session: WickSession = {
    sessionId: randomUUID(),
    tokenHash: credential.tokenHash,
    scenarioId: scenario.id,
    scenarioVersion: scenario.version,
    rubricVersion: scenario.rubricVersion,
    mode: input.mode as ConversationMode,
    state: "authorized",
    createdAt: now.toISOString(),
    conversationDeadline: deadline.toISOString(),
    expiresAt: expires.toISOString(),
    providerConversationId: authorization.providerConversationId,
    providerVersionId: verification.versionId,
  };
  await store.create(session);

  return {
    sessionId: session.sessionId,
    sessionToken: credential.token,
    scenarioId: session.scenarioId,
    scenarioVersion: session.scenarioVersion,
    mode: session.mode,
    state: session.state,
    conversationDeadline: session.conversationDeadline,
    authorization:
      authorization.type === "signed_url"
        ? {
            type: authorization.type,
            signedUrl: authorization.value,
            expiresInSeconds: authorization.expiresInSeconds,
          }
        : {
            type: authorization.type,
            conversationToken: authorization.value,
            expiresInSeconds: authorization.expiresInSeconds,
          },
  };
}

export async function attachProviderConversation(
  store: SessionStore,
  sessionId: string,
  token: string | undefined,
  providerConversationId: string,
) {
  if (!/^[A-Za-z0-9_-]{8,128}$/.test(providerConversationId)) {
    throw new AppError(
      400,
      "invalid_provider_conversation_id",
      "The provider conversation ID is invalid.",
    );
  }
  const session = await requireSession(store, sessionId, token);
  if (session.providerConversationId && session.providerConversationId !== providerConversationId) {
    throw new AppError(
      409,
      "provider_conversation_already_attached",
      "A different provider conversation is already attached.",
    );
  }
  if (isTerminal(session.state)) {
    throw new AppError(409, "session_ended", "The session has already ended.");
  }
  session.providerConversationId = providerConversationId;
  session.state = "conversing";
  await store.put(session);
  return publicStatus(session);
}

export async function finishSession(
  store: SessionStore,
  sessionId: string,
  token: string | undefined,
) {
  const session = await requireSession(store, sessionId, token);
  if (session.state === "completed") return publicResult(session);
  if (["stepped_out", "disconnected", "failed", "expired"].includes(session.state)) {
    throw new AppError(
      409,
      "session_not_completable",
      `A ${session.state} session cannot be evaluated.`,
    );
  }
  if (!session.providerConversationId) {
    throw new AppError(
      409,
      "provider_conversation_missing",
      "The ElevenLabs conversation has not been attached.",
    );
  }

  session.state = "processing";
  await store.put(session);
  return processSession(store, session);
}

export async function getSessionResult(
  store: SessionStore,
  sessionId: string,
  token: string | undefined,
) {
  const session = await requireSession(store, sessionId, token);
  if (session.state === "processing") {
    return processSession(store, session);
  }
  return publicResult(session);
}

export async function stepOutSession(
  store: SessionStore,
  sessionId: string,
  token: string | undefined,
) {
  const session = await requireSession(store, sessionId, token);
  if (session.state === "completed") {
    throw new AppError(409, "session_already_completed", "Feedback is already complete.");
  }
  session.state = "stepped_out";
  delete session.feedback;
  await store.put(session);
  return publicStatus(session);
}

export async function disconnectSession(
  store: SessionStore,
  sessionId: string,
  token: string | undefined,
) {
  const session = await requireSession(store, sessionId, token);
  if (!isTerminal(session.state) && session.state !== "processing") {
    session.state = "disconnected";
    await store.put(session);
  }
  return publicStatus(session);
}

async function processSession(store: SessionStore, session: WickSession) {
  if (!session.providerConversationId) {
    throw new AppError(409, "provider_conversation_missing", "No conversation is attached.");
  }
  if ((session.processingAttempts ?? 0) >= 40) {
    session.state = "failed";
    session.failureCode = "transcript_processing_timeout";
    await store.put(session);
    throw new AppError(
      504,
      "transcript_processing_timeout",
      "The transcript did not finish processing in time.",
      true,
    );
  }
  session.processingAttempts = (session.processingAttempts ?? 0) + 1;
  await store.put(session);

  try {
    const providerResult = await retryTranscript(session.providerConversationId);
    assertProviderTiming(session, providerResult.startedAt);
    session.transcript = providerResult.transcript;
    session.providerVersionId = providerResult.providerVersionId ?? session.providerVersionId;
    session.feedback = await evaluateTranscript(providerResult.transcript);
    session.state = "completed";
    delete session.failureCode;
    await store.put(session);
    return publicResult(session);
  } catch (error) {
    if (error instanceof ConversationProcessingError) {
      await store.put(session);
      return publicResult(session);
    }
    if (error instanceof AppError && !error.retryable) {
      session.state = "failed";
      session.failureCode = error.code;
      await store.put(session);
    } else {
      await store.put(session);
      return publicResult(session);
    }
    throw error;
  }
}

async function retryTranscript(providerConversationId: string) {
  const delays = [0, 600, 1_400];
  let lastError: unknown;
  for (const delay of delays) {
    if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay));
    try {
      return await getCompletedTranscript(providerConversationId);
    } catch (error) {
      lastError = error;
      if (!(error instanceof ConversationProcessingError)) throw error;
    }
  }
  throw lastError;
}

async function requireSession(
  store: SessionStore,
  sessionId: string,
  token: string | undefined,
) {
  if (!/^[0-9a-f-]{36}$/i.test(sessionId)) {
    throw new AppError(404, "session_not_found", "The session was not found.");
  }
  const session = await store.get(sessionId);
  if (!session) {
    throw new AppError(404, "session_not_found", "The session was not found.");
  }
  assertSessionAccess(session.tokenHash, token);
  if (Date.parse(session.expiresAt) <= Date.now() && !isTerminal(session.state)) {
    session.state = "expired";
    await store.put(session);
  }
  return session;
}

function assertProviderTiming(session: WickSession, startedAt?: string) {
  if (!startedAt) return;
  const started = Date.parse(startedAt);
  const earliest = Date.parse(session.createdAt) - 60_000;
  const latest = Date.parse(session.expiresAt);
  if (started < earliest || started > latest) {
    throw new AppError(
      403,
      "provider_conversation_mismatch",
      "The provider conversation does not belong to this Wick session.",
    );
  }
}

function publicStatus(session: WickSession) {
  return {
    sessionId: session.sessionId,
    scenarioId: session.scenarioId,
    mode: session.mode,
    state: session.state,
    conversationDeadline: session.conversationDeadline,
  };
}

function publicResult(session: WickSession) {
  return {
    ...publicStatus(session),
    processingAttempts: session.processingAttempts ?? 0,
    ...(session.state === "processing"
      ? { retryAfterSeconds: 3 }
      : {}),
    ...(session.state === "completed"
      ? { transcript: session.transcript, feedback: session.feedback }
      : {}),
    ...(session.failureCode ? { failureCode: session.failureCode } : {}),
  };
}

function isTerminal(state: WickSession["state"]) {
  return ["completed", "stepped_out", "disconnected", "failed", "expired"].includes(
    state,
  );
}

export function rateLimitIdentity(ip: string | undefined): string {
  const value = `${process.env.WICK_RATE_LIMIT_SALT ?? "wick-local"}:${ip ?? "unknown"}`;
  return createHash("sha256").update(value).digest("hex").slice(0, 32);
}
