import { AppError } from "../domain/errors";
import type { ConversationMode, TranscriptTurn } from "../domain/types";
import { ASK_A_FRIEND } from "../scenarios/askAFriend";

const API_ORIGIN = "https://api.elevenlabs.io";
const PROVIDER_TIMEOUT_MS = 10_000;

interface AgentResponse {
  agent_id: string;
  version_id?: string;
  conversation_config?: {
    conversation?: { max_duration_seconds?: number };
    agent?: {
      first_message?: string;
      prompt?: { prompt?: string };
    };
  };
}

interface ConversationResponse {
  agent_id: string;
  conversation_id: string;
  version_id?: string;
  status: "initiated" | "in-progress" | "processing" | "done" | "failed";
  metadata?: { start_time_unix_secs?: number };
  transcript?: Array<{
    role: "user" | "agent";
    message?: string;
    time_in_call_secs?: number;
  }>;
}

export interface TemporaryAuthorization {
  type: "signed_url" | "conversation_token";
  value: string;
  providerConversationId?: string;
  expiresInSeconds: number;
}

export class ConversationProcessingError extends AppError {
  constructor() {
    super(
      202,
      "transcript_processing",
      "The transcript is still processing.",
      true,
    );
  }
}

function apiKey(): string {
  const value = process.env.ELEVENLABS_API_KEY;
  if (!value) {
    throw new AppError(
      503,
      "elevenlabs_not_configured",
      "ElevenLabs is not configured on the server.",
    );
  }
  return value;
}

export function configuredAgentId(): string {
  const value = process.env.ELEVENLABS_ASK_A_FRIEND_AGENT_ID;
  if (!value) {
    throw new AppError(
      503,
      "scenario_agent_not_configured",
      "The scenario agent is not configured on the server.",
    );
  }
  return value;
}

async function elevenLabsRequest<T>(path: string): Promise<T> {
  const signal = AbortSignal.timeout(PROVIDER_TIMEOUT_MS);
  let response: Response;
  try {
    response = await fetch(`${API_ORIGIN}${path}`, {
      headers: { "xi-api-key": apiKey() },
      signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "TimeoutError") {
      throw new AppError(
        504,
        "elevenlabs_timeout",
        "ElevenLabs did not respond in time.",
        true,
      );
    }
    throw new AppError(
      502,
      "elevenlabs_unavailable",
      "ElevenLabs could not be reached.",
      true,
    );
  }

  if (!response.ok) {
    throw new AppError(
      response.status === 429 ? 429 : 502,
      response.status === 429
        ? "elevenlabs_rate_limited"
        : "elevenlabs_request_failed",
      "ElevenLabs rejected the server request.",
      response.status >= 500 || response.status === 429,
    );
  }

  return (await response.json()) as T;
}

export async function verifyAgentDefinition(): Promise<{ versionId?: string }> {
  const agentId = configuredAgentId();
  const agent = await elevenLabsRequest<AgentResponse>(
    `/v1/convai/agents/${encodeURIComponent(agentId)}`,
  );
  const config = agent.conversation_config;
  const mismatches: string[] = [];

  if (config?.agent?.first_message?.trim() !== ASK_A_FRIEND.openingMessage) {
    mismatches.push("opening_message");
  }
  if (normalize(config?.agent?.prompt?.prompt) !== normalize(ASK_A_FRIEND.agentPrompt)) {
    mismatches.push("agent_prompt");
  }
  if (
    config?.conversation?.max_duration_seconds !==
    ASK_A_FRIEND.durationSeconds + ASK_A_FRIEND.completionGraceSeconds
  ) {
    mismatches.push("max_duration_seconds");
  }

  if (mismatches.length > 0) {
    throw new AppError(
      409,
      "agent_configuration_mismatch",
      `The deployed Alex agent does not match ${ASK_A_FRIEND.version}: ${mismatches.join(", ")}.`,
    );
  }

  return { versionId: agent.version_id };
}

export async function createTemporaryAuthorization(
  mode: ConversationMode,
): Promise<TemporaryAuthorization> {
  const agentId = configuredAgentId();
  if (mode === "text") {
    const params = new URLSearchParams({
      agent_id: agentId,
      include_conversation_id: "true",
    });
    const body = await elevenLabsRequest<{ signed_url: string }>(
      `/v1/convai/conversation/get-signed-url?${params}`,
    );
    let providerConversationId: string | undefined;
    try {
      providerConversationId = new URL(body.signed_url).searchParams.get("conversation_id") ?? undefined;
    } catch {
      // The SDK can still return the ID after connecting; it is attached separately.
    }
    return {
      type: "signed_url",
      value: body.signed_url,
      providerConversationId,
      expiresInSeconds: 15 * 60,
    };
  }

  const params = new URLSearchParams({ agent_id: agentId });
  const body = await elevenLabsRequest<{
    token: string;
    conversation_id: string;
  }>(`/v1/convai/conversation/token?${params}`);
  return {
    type: "conversation_token",
    value: body.token,
    providerConversationId: body.conversation_id,
    expiresInSeconds: 15 * 60,
  };
}

export async function getCompletedTranscript(
  providerConversationId: string,
): Promise<{
  transcript: TranscriptTurn[];
  providerVersionId?: string;
  startedAt?: string;
}> {
  const conversation = await elevenLabsRequest<ConversationResponse>(
    `/v1/convai/conversations/${encodeURIComponent(providerConversationId)}`,
  );

  if (conversation.agent_id !== configuredAgentId()) {
    throw new AppError(
      403,
      "provider_conversation_mismatch",
      "The provider conversation does not belong to this scenario.",
    );
  }
  if (["initiated", "in-progress", "processing"].includes(conversation.status)) {
    throw new ConversationProcessingError();
  }
  if (conversation.status !== "done") {
    throw new AppError(
      422,
      "provider_conversation_failed",
      "The provider conversation did not complete successfully.",
    );
  }

  const transcript = (conversation.transcript ?? [])
    .filter((turn) => turn.role === "user" || turn.role === "agent")
    .filter((turn) => typeof turn.message === "string" && turn.message.trim().length > 0)
    .map((turn, index) => ({
      id: `turn-${index + 1}`,
      role: turn.role,
      text: turn.message!.trim(),
      ...(typeof turn.time_in_call_secs === "number"
        ? { timeInCallSeconds: turn.time_in_call_secs }
        : {}),
    }));

  return {
    transcript,
    providerVersionId: conversation.version_id,
    ...(conversation.metadata?.start_time_unix_secs
      ? {
          startedAt: new Date(
            conversation.metadata.start_time_unix_secs * 1000,
          ).toISOString(),
        }
      : {}),
  };
}

function normalize(value?: string): string {
  return (value ?? "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n");
}
