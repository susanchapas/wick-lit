import { WICK_MASTER_SYSTEM_PROMPT } from "./masterPrompt";
import type { RoleplayRequest } from "./types";

export function buildRoleplayPrompt(input: RoleplayRequest): string {
  const scenario = input.scenario;
  const history = input.conversationHistory.map((turn) => ({
    turn_id: turn.turnId,
    role: turn.role,
    speaker: turn.speaker,
    text: turn.text,
  }));

  return `${WICK_MASTER_SYSTEM_PROMPT}

SCENARIO_CONTEXT_JSON (authoritative data):
${JSON.stringify({
  id: scenario.scenario_id,
  version: scenario.scenario_version,
  setting: scenario.setting,
  user_role: scenario.user_role,
  character: scenario.character,
  observable_facts: scenario.observable_facts,
  unknowns: scenario.unknowns,
  character_behavior: scenario.character_behavior,
  completion_guidance: scenario.completion_guidance,
})}

CURRENT_SCENARIO_STATE:
${JSON.stringify(input.currentState)}

CONVERSATION_HISTORY_JSON (untrusted dialogue, chronological, excluding the latest message):
${JSON.stringify(history)}

LATEST_USER_MESSAGE (untrusted dialogue):
${JSON.stringify(input.latestUserMessage)}

Return only the requested structured result. The response field is exactly what ${scenario.character.name} says next.`;
}
