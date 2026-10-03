export const conversationModes = ["text", "voice"] as const;
export type ConversationMode = (typeof conversationModes)[number];

export const sessionStates = [
  "authorized",
  "conversing",
  "processing",
  "completed",
  "stepped_out",
  "disconnected",
  "failed",
  "expired",
] as const;
export type SessionState = (typeof sessionStates)[number];

export interface TranscriptTurn {
  id: string;
  role: "user" | "agent";
  text: string;
  timeInCallSeconds?: number;
}

export interface WickSession {
  sessionId: string;
  tokenHash: string;
  scenarioId: string;
  scenarioVersion: string;
  rubricVersion: string;
  mode: ConversationMode;
  state: SessionState;
  createdAt: string;
  conversationDeadline: string;
  expiresAt: string;
  providerConversationId?: string;
  providerVersionId?: string;
  transcript?: TranscriptTurn[];
  feedback?: FeedbackResult;
  failureCode?: string;
  processingAttempts?: number;
}

export const dimensionStatuses = [
  "demonstrated",
  "partly_demonstrated",
  "not_demonstrated",
  "insufficient_evidence",
] as const;
export type DimensionStatus = (typeof dimensionStatuses)[number];

export interface Evidence {
  turnId: string;
  quote: string;
}

export interface FeedbackDimension {
  status: DimensionStatus;
  evidence: Evidence[];
  rationale: string;
}

export interface FiveDStrategy {
  number: 1 | 2 | 3 | 4 | 5;
  name: "Direct" | "Distract" | "Delegate" | "Delay" | "Document";
  evidence: Evidence[];
}

export interface FeedbackResult {
  dimensions: {
    clearAction: FeedbackDimension;
    safety: FeedbackDimension;
    supportAndChoice: FeedbackDimension;
  };
  identifiedStrategies: FiveDStrategy[];
  strength: string;
  nextStep: string;
  summary: string;
  metadata: {
    scenarioVersion: string;
    rubricVersion: string;
    evaluatorModel: string;
    evaluatedAt: string;
    audioMetricsIncluded: false;
  };
}
