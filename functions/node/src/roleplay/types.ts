import type { ScenarioDefinition } from "../scenarios";
import type { WickTurn } from "../domain/types";

export interface RoleplayRequest {
  scenario: ScenarioDefinition;
  conversationHistory: WickTurn[];
  latestUserMessage: string;
  currentState: string;
}

export interface RoleplayResponse {
  response: string;
  scenarioComplete: boolean;
  state: string;
  model: string;
}

export type RoleplayGenerator = (request: RoleplayRequest) => Promise<RoleplayResponse>;
