export type StrategyNumber = 1 | 2 | 3 | 4 | 5;
export type Intensity = "gentle" | "realistic" | "intense";
export type Mode = "text" | "voice";

export interface Scenario {
  id: string;
  title: string;
  setup: string;
  difficulty: string;
  location: string;
  minutes: number;
  characters: string[];
  strategies: StrategyNumber[];
  contentTags: string[];
  contentNote: string;
  openingAudio: string;
}

export interface Message {
  speaker: string;
  text: string;
}

export interface ChatRequest {
  scenarioId: string;
  mode: Mode;
  intensity: Intensity;
  messages: Message[];
}

export interface ChatResponse {
  replies: Message[];
  turn: number;
  ended: boolean;
  endReason: "turn_cap" | "user_stop" | null;
}

export interface ScoreRequest {
  scenarioId: string;
  intensity: Intensity;
  transcript: Message[];
}

export interface ScoreDimension {
  name: "Noticed" | "Directness" | "Safety" | "De-escalation" | "Follow-through";
  score: number;
  strategy: string;
  note: string;
}

export interface ScoreResponse {
  total: number;
  headline: string;
  dimensions: ScoreDimension[];
  strengths: string[];
  improvements: string[];
  exampleLine: string;
  scoredBy: "gemini" | "azure";
}

export interface SpeechToken {
  token: string;
  region: string;
}

export interface SpeakRequest {
  speaker: string;
  text: string;
}

export interface SessionRecord extends ScoreResponse {
  scenarioId: string;
  intensity: Intensity;
  transcript: Message[];
  startedAt: string;
  completedAt: string;
}

export interface ApiErrorBody {
  error: "chat_unavailable" | "scoring_unavailable" | "voice_unavailable";
}
