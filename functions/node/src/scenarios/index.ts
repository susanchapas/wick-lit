import partyHesitantFriendJson from "./party-hesitant-friend.json";

export interface ScenarioDefinition {
  scenario_id: string;
  scenario_version: string;
  title: string;
  description: string;
  setting: string;
  user_role: string;
  character: { id: string; name: string; role: string };
  observable_facts: string[];
  unknowns: string[];
  first_message: string;
  character_behavior: string[];
  completion_guidance: string[];
  duration_seconds: number;
  content_tags: string[];
  content_note: string;
  strategies: number[];
}

const partyHesitantFriend = partyHesitantFriendJson satisfies ScenarioDefinition;
const scenarios = new Map<string, ScenarioDefinition>([
  [partyHesitantFriend.scenario_id, partyHesitantFriend],
]);

export function getScenario(id: string): ScenarioDefinition | undefined {
  return scenarios.get(id);
}

export function publicScenarios() {
  return [...scenarios.values()].map((scenario) => ({
    scenarioId: scenario.scenario_id,
    scenarioVersion: scenario.scenario_version,
    title: scenario.title,
    description: scenario.description,
    setting: scenario.setting,
    userRole: scenario.user_role,
    character: scenario.character,
    firstMessage: scenario.first_message,
    durationSeconds: scenario.duration_seconds,
    contentTags: scenario.content_tags,
    contentNote: scenario.content_note,
    strategies: scenario.strategies,
    modes: ["text", "voice"] as const,
  }));
}
