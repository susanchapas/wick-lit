import type { ScenarioDefinition } from "../scenarios";
import type { WickTurn } from "../domain/types";

export interface RoleplayRequest {
  scenario: ScenarioDefinition;
  conversationHistory: WickTurn[];
  latestUserMessage: string;
  currentState: string;
  userTurnNumber: number;
}

export interface RoleplayResponse {
  responses: { speaker: string; text: string }[];
  scenarioComplete: boolean;
  endReason: "resolved" | "learner_stop" | null;
  state: string;
  model: string;
}

export type RoleplayGenerator = (request: RoleplayRequest) => Promise<RoleplayResponse>;
