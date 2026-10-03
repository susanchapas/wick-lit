import { describe, expect, it } from "vitest";

import type { TranscriptTurn } from "../domain/types";
import { evaluateTranscript, validateFeedbackDraft } from "../evaluation/feedback";

const transcript: TranscriptTurn[] = [
  {
    id: "turn-1",
    role: "agent",
    text: "What do you want me to do?",
  },
  {
    id: "turn-2",
    role: "user",
    text: "Please ask Morgan if she wants to leave with us.",
  },
];

const validDraft = {
  dimensions: {
    clearAction: {
      status: "demonstrated",
      evidence: [{ turnId: "turn-2", quote: "ask Morgan" }],
      rationale: "The user proposed a specific action.",
    },
    safety: {
      status: "demonstrated",
      evidence: [{ turnId: "turn-2", quote: "leave with us" }],
      rationale: "The plan offers a low-escalation exit.",
    },
    supportAndChoice: {
      status: "demonstrated",
      evidence: [{ turnId: "turn-2", quote: "if she wants" }],
      rationale: "The plan asks Morgan what she wants.",
    },
  },
  identifiedStrategies: [
    {
      number: 3,
      name: "Delegate",
      evidence: [{ turnId: "turn-2", quote: "Please ask Morgan" }],
    },
  ],
  strength: "You gave Alex a specific supportive role.",
  nextStep: "Add what you will do if Morgan wants more help.",
  summary: "This was a clear and choice-respecting plan.",
};

describe("feedback validation", () => {
  it("accepts exact user-turn evidence", () => {
    expect(validateFeedbackDraft(validDraft, transcript)).toEqual(validDraft);
  });

  it("rejects invented or agent-only evidence", () => {
    const invented = structuredClone(validDraft);
    invented.dimensions.clearAction.evidence[0].quote = "a quote that never happened";
    expect(() => validateFeedbackDraft(invented, transcript)).toThrowError(
      /exact user transcript quote/,
    );

    const agentEvidence = structuredClone(validDraft);
    agentEvidence.dimensions.clearAction.evidence[0] = {
      turnId: "turn-1",
      quote: "What do you want me to do?",
    };
    expect(() => validateFeedbackDraft(agentEvidence, transcript)).toThrowError(
      /exact user transcript quote/,
    );
  });

  it("returns insufficient evidence without calling Gemini for an empty transcript", async () => {
    const previous = process.env.GEMINI_API_KEY;
    delete process.env.GEMINI_API_KEY;
    const result = await evaluateTranscript([]);
    if (previous === undefined) delete process.env.GEMINI_API_KEY;
    else process.env.GEMINI_API_KEY = previous;

    expect(result.dimensions.clearAction.status).toBe("insufficient_evidence");
    expect(result.dimensions.safety.status).toBe("insufficient_evidence");
    expect(result.dimensions.supportAndChoice.status).toBe("insufficient_evidence");
    expect(result.identifiedStrategies).toEqual([]);
    expect(result.metadata.audioMetricsIncluded).toBe(false);
  });
});
