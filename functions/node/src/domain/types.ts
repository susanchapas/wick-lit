export const conversationModes = ["text", "voice"] as const;
export type ConversationMode = (typeof conversationModes)[number];

export const sessionStates = ["active", "completed", "stepped_out", "failed", "expired"] as const;
export type SessionState = (typeof sessionStates)[number];

export interface WickTurn {
  turnId: string;
  role: "user" | "character";
  speaker: string;
  text: string;
  sourceMedium: "text" | "audio";
  createdAt: string;
}

export const dimensionStatuses = ["demonstrated", "partly_demonstrated", "not_demonstrated", "insufficient_evidence"] as const;
export type DimensionStatus = (typeof dimensionStatuses)[number];

export interface FeedbackDimension {
  status: DimensionStatus;
  evidence: { turnId: string; quote: string }[];
  rationale: string;
}

export interface FeedbackResult {
  dimensions: {
    clearAction: FeedbackDimension;
    safety: FeedbackDimension;
    supportAndChoice: FeedbackDimension;
  };
  identifiedStrategies: {
    number: 1 | 2 | 3 | 4 | 5;
    name: "Direct" | "Distract" | "Delegate" | "Delay" | "Document";
    evidence: { turnId: string; quote: string }[];
  }[];
  strength: string;
  nextStep: string;
  summary: string;
  metadata: {
    scenarioVersion: string;
    evaluatorModel: string;
    evaluatedAt: string;
    audioMetricsIncluded: false;
  };
}

export interface WickSession {
  sessionId: string;
  tokenHash: string;
  scenarioId: string;
  scenarioVersion: string;
  mode: ConversationMode;
  state: SessionState;
  roleplayState: string;
  createdAt: string;
  conversationDeadline: string;
  expiresAt: string;
  endedAt?: string;
  turns: WickTurn[];
  nextTurnNumber: number;
  model?: string;
  failureCode?: string;
  evaluation?: FeedbackResult;
}
