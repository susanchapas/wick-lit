import type { StrategyNumber } from "./types";

export const strategies = [
  { n: 1, id: "direct", name: "Direct", meaning: "Say something straight away", line: "Only when it is safe for you and for the person." },
  { n: 2, id: "distract", name: "Distract", meaning: "Create a diversion", line: "Spill a drink, ask for directions, pull the person into a conversation." },
  { n: 3, id: "delegate", name: "Delegate", meaning: "Get someone else", line: "A friend, a bouncer, an RA, staff, campus security." },
  { n: 4, id: "delay", name: "Delay", meaning: "Check in after", line: "“Hey, that wasn’t okay. Are you alright?”" },
  { n: 5, id: "document", name: "Document", meaning: "Note or record what happened", line: "With the person’s consent in mind. Give the record to them." },
] as const;

export const strategy = (n: StrategyNumber) => strategies[n - 1];
