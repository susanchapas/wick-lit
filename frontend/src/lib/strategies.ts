import type { StrategyNumber } from "./types";

export const strategies = [
  {
    n: 1,
    id: "direct",
    name: "Direct",
    meaning: "Say something straight away",
    when: "Use Direct when the situation is low-stakes, the person affected wants to speak up, and you can intervene without escalating the scene.",
    whenNot: "Avoid Direct if the person affected is already being targeted, if the situation feels volatile, or if you would be putting yourself or someone else at risk.",
  },
  {
    n: 2,
    id: "distract",
    name: "Distract",
    meaning: "Create a diversion",
    when: "Use Distract when you need to interrupt the interaction without escalating it. A diversion can give the person affected space to leave or change the subject.",
    whenNot: "Avoid Distract if the situation is already physical, if the person affected is being followed, or if a diversion would make the scene more confusing.",
  },
  {
    n: 3,
    id: "delegate",
    name: "Delegate",
    meaning: "Get someone else",
    when: "Use Delegate when the situation needs authority, staff, or security. Get someone who can act faster, more safely, or with more credibility.",
    whenNot: "Avoid Delegate if the person affected does not want staff involved, if the situation is already being handled well, or if you can act more quickly yourself.",
  },
  {
    n: 4,
    id: "delay",
    name: "Delay",
    meaning: "Check in after",
    when: "Use Delay when the moment to act has passed but the person affected still needs support. Check in afterwards and offer next steps.",
    whenNot: "Avoid Delay if the person affected needs help right now, if the situation is still escalating, or if you are the only person who can act.",
  },
  {
    n: 5,
    id: "document",
    name: "Document",
    meaning: "Note or record what happened",
    when: "Use Document when the person affected wants a record, when reporting may be helpful later, or when you need to pass information to someone else.",
    whenNot: "Avoid Document if the person affected does not want a record kept, if documenting would put them at greater risk, or if it delays taking action.",
  },
] as const;

export const strategy = (n: StrategyNumber) => strategies[n - 1];
