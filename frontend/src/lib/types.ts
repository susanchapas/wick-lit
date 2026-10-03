export type StrategyNumber = 1 | 2 | 3 | 4 | 5;
export type Intensity = "gentle" | "realistic" | "intense";
export type Mode = "text" | "voice";
export type SessionState = "active" | "completed" | "stepped_out" | "failed" | "expired";

export interface Scenario {
  id: string;
  version: string;
  title: string;
  setup: string;
  location: string;
  minutes: number;
  characters: string[];
  characterNames: Record<string, string>;
  strategies: StrategyNumber[];
  contentTags: string[];
  contentNote: string;
  durationSeconds: number;
  modes: Mode[];
}

export interface WickTurn {
  turnId: string;
  role: "user" | "character";
  speaker: string;
  text: string;
  sourceMedium: "text" | "audio";
  createdAt: string;
}

export type DimensionStatus = "demonstrated" | "partly_demonstrated" | "not_demonstrated" | "insufficient_evidence";

export interface EvaluationDimension {
  status: DimensionStatus;
  evidence: { turnId: string; quote: string }[];
  rationale: string;
}

export interface Evaluation {
  dimensions: {
    clearAction: EvaluationDimension;
    safety: EvaluationDimension;
    supportAndChoice: EvaluationDimension;
  };
  identifiedStrategies: { number: StrategyNumber; name: string; evidence: { turnId: string; quote: string }[] }[];
  strength: string;
  nextStep: string;
  summary: string;
  metadata: { scenarioVersion: string; evaluatorModel: string; evaluatedAt: string; audioMetricsIncluded: false };
}

export interface WickSession {
  sessionId: string;
  scenarioId: string;
  scenarioVersion: string;
  mode: Mode;
  state: SessionState;
  roleplayState: string;
  createdAt: string;
  conversationDeadline: string;
  endedAt?: string;
  turns: WickTurn[];
  evaluation?: Evaluation;
}

export interface SessionCredential {
  sessionId: string;
  sessionToken: string;
}

export interface StartedSession extends WickSession, SessionCredential {}

export interface TurnResponse {
  userTurn: WickTurn;
  characterTurns: WickTurn[];
  session: WickSession;
}

export interface ApiErrorBody {
  error?: { code?: string; message?: string } | string;
}
