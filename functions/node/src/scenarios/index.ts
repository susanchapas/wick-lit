import privateGroupChatJson from "./private-group-chat.json";
import theLibraryJson from "./the-library.json";
import upstairsInviteJson from "./upstairs-invite.json";

export interface ScenarioCharacter {
  id: string;
  name: string;
  role: string;
  behavior: string[];
  example_behaviors: string[];
}

export interface ScenarioDialogueLine {
  speaker: string;
  text: string;
}

export interface ScenarioDefinition {
  scenario_id: string;
  scenario_version: string;
  title: string;
  description: string;
  setting: string;
  user_role: string;
  learning_goal: string;
  characters: ScenarioCharacter[];
  opening_dialogue: ScenarioDialogueLine[];
  important_facts: string[];
  unknowns: string[];
  intervention_examples: { strategy: string; example: string }[];
  end_conditions: string[];
  coaching_context: string[];
  turn_limit: number;
  minimum_turns_before_completion: number;
  duration_seconds: number;
  content_tags: string[];
  content_note: string;
  strategies: number[];
}

const privateGroupChat = privateGroupChatJson satisfies ScenarioDefinition;
const theLibrary = theLibraryJson satisfies ScenarioDefinition;
const upstairsInvite = upstairsInviteJson satisfies ScenarioDefinition;
const scenarios = new Map<string, ScenarioDefinition>([
  [upstairsInvite.scenario_id, upstairsInvite],
  [privateGroupChat.scenario_id, privateGroupChat],
  [theLibrary.scenario_id, theLibrary],
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
    characters: scenario.characters.map(({ id, name, role }) => ({ id, name, role })),
    openingDialogue: scenario.opening_dialogue,
    durationSeconds: scenario.duration_seconds,
    contentTags: scenario.content_tags,
    contentNote: scenario.content_note,
    strategies: scenario.strategies,
    modes: ["text", "voice"] as const,
  }));
}
