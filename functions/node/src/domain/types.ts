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
}
