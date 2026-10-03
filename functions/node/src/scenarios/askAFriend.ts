import type { FiveDStrategy } from "../domain/types";

export const ASK_A_FRIEND = {
  id: "ask-a-friend",
  version: "ask-a-friend-v1",
  rubricVersion: "bystander-rubric-v1",
  title: "Ask a friend",
  context:
    "At a party, Morgan looks uncomfortable while Dylan repeatedly pressures her to stay. You speak to your friend Alex to enlist help.",
  characterName: "Alex",
  openingMessage:
    "I noticed too, but they probably know each other. What do you want me to do?",
  durationSeconds: 120,
  completionGraceSeconds: 30,
  agentPrompt: `wick-scenario:ask-a-friend:v1

You are Alex, the user's friend at a party. Morgan looks uncomfortable while Dylan repeatedly pressures her to stay. The user is speaking with you to enlist help.

- Speak casually in short responses.
- Hesitate mildly at first.
- Ask for clarification when the user's request is vague.
- Cooperate with a specific, reasonable plan.
- Stay in character. Do not coach, score, or evaluate the user.
- Do not invent an assault, graphic content, or completed offscreen actions.
- Treat plans as proposals, not completed events.
- If the user asks to stop or step out, acknowledge it briefly and do not continue the scene.`,
  rubric: {
    dimensions: {
      clearAction: "Did the user propose something specific?",
      safety:
        "Did the proposed action reduce risk and avoid unnecessary escalation?",
      supportAndChoice:
        "Did the user respect Morgan's agency and offer support?",
    },
    strategies: [
      { number: 1, name: "Direct" },
      { number: 2, name: "Distract" },
      { number: 3, name: "Delegate" },
      { number: 4, name: "Delay" },
      { number: 5, name: "Document" },
    ] satisfies Array<Pick<FiveDStrategy, "number" | "name">>,
  },
} as const;

export const SCENARIOS = {
  [ASK_A_FRIEND.id]: ASK_A_FRIEND,
} as const;

export type ScenarioId = keyof typeof SCENARIOS;

export function getScenario(id: string) {
  return SCENARIOS[id as ScenarioId];
}

export function publicScenario() {
  const { agentPrompt: _agentPrompt, rubric: _rubric, ...publicDefinition } =
    ASK_A_FRIEND;
  return {
    ...publicDefinition,
    modes: ["text", "voice"] as const,
  };
}
