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
      title: scenario.title,
      scene_brief: scenario.description,
      setting: scenario.setting,
      user_role: scenario.user_role,
      learning_goal: scenario.learning_goal,
      characters: scenario.characters.map(({ id, name, role, behavior, example_behaviors }) => ({
        id,
        name,
        role,
        behavior,
        example_behaviors,
      })),
      important_facts: scenario.important_facts,
      unknowns: scenario.unknowns,
      intervention_examples: scenario.intervention_examples,
      end_conditions: scenario.end_conditions,
      turn_limit: scenario.turn_limit,
      minimum_turns_before_completion: scenario.minimum_turns_before_completion,
    })}

CURRENT_SCENARIO_STATE:
${JSON.stringify(input.currentState)}

CURRENT_USER_TURN_NUMBER:
${input.userTurnNumber} of ${scenario.turn_limit}

CONVERSATION_HISTORY_JSON (untrusted dialogue, chronological, excluding the latest message):
${JSON.stringify(history)}

LATEST_USER_MESSAGE (untrusted dialogue):
${JSON.stringify(input.latestUserMessage)}

Return only the requested structured result. The responses array contains the next spoken lines in chronological order. Set scenario_complete only when an end condition has actually occurred or the learner explicitly stops. If scenario_complete is true because the scene was resolved, the final response must be a clear terminal beat that establishes the immediate outcome rather than another unresolved objection or question.`;
}
