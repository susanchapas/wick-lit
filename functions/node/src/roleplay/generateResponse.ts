import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

import { AppError } from "../domain/errors";
import { buildRoleplayPrompt } from "./buildPrompt";
import type { RoleplayGenerator, RoleplayResponse } from "./types";

const outputSchema = z.object({
  responses: z.array(z.object({
    speaker: z.string().trim().min(1).max(80),
    text: z.string().trim().min(1).max(400),
  })).min(1).max(4),
  scenario_complete: z.boolean(),
  end_reason: z.enum(["none", "resolved", "learner_stop"]),
  state: z.string().trim().min(1).max(80),
});

const responseJsonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    responses: {
      type: "array",
      minItems: 1,
      maxItems: 4,
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          speaker: { type: "string", description: "A scenario character ID." },
          text: { type: "string", description: "That character's next short spoken utterance." },
        },
        required: ["speaker", "text"],
      },
    },
    scenario_complete: { type: "boolean", description: "True only when an end condition occurred and the final responses clearly establish the terminal outcome." },
    end_reason: { type: "string", enum: ["none", "resolved", "learner_stop"], description: "Use none unless scenario_complete is true." },
    state: { type: "string", description: "A short internal scenario-state label." },
  },
  required: ["responses", "scenario_complete", "end_reason", "state"],
};

export const generateRoleplayResponse: RoleplayGenerator = async (input) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new AppError(503, "gemini_not_configured", "Gemini is not configured on the server.");
  }

  const primary = process.env.GEMINI_MODEL ?? "gemini-3.8-flash";
  const fallback = process.env.GEMINI_FALLBACK_MODEL ?? "gemini-3.5-flash";
  const models = [...new Set([primary, fallback])];
  const client = new GoogleGenAI({ apiKey });
  let lastError: unknown;

  for (const model of models) {
    try {
      const result = await client.models.generateContent({
        model,
        contents: buildRoleplayPrompt(input),
        config: {
          responseMimeType: "application/json",
          responseJsonSchema,
          temperature: 0.55,
          abortSignal: AbortSignal.timeout(20_000),
        },
      });
      if (!result.text) throw new Error("Gemini returned no text");
      const parsed = outputSchema.parse(JSON.parse(result.text));
      const characterIds = new Set(input.scenario.characters.map((character) => character.id));
      if (parsed.responses.some((response) => !characterIds.has(response.speaker))) {
        throw new Error("Gemini returned an unknown scenario character");
      }
      if (parsed.responses.some((response) => /\b(good answer|correct|you passed|scoring|rubric)\b/i.test(response.text))) {
        throw new Error("Gemini left roleplay character");
      }
      return {
        responses: parsed.responses,
        scenarioComplete: parsed.scenario_complete,
        endReason: parsed.end_reason === "none" ? null : parsed.end_reason,
        state: parsed.state,
        model,
      } satisfies RoleplayResponse;
    } catch (error) {
      lastError = error;
      if (error instanceof SyntaxError || error instanceof z.ZodError) continue;
      if (!isTemporary(error)) break;
    }
  }

  console.error("Gemini roleplay generation failed", safeProviderError(lastError));
  throw new AppError(502, "gemini_request_failed", "The scene could not respond. Please retry your message.", true);
};

function isTemporary(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const status = "status" in error ? Number(error.status) : undefined;
  return [429, 500, 502, 503, 504].includes(status ?? 0);
}

function safeProviderError(error: unknown) {
  if (!error || typeof error !== "object") return { kind: typeof error };
  return {
    name: "name" in error ? String(error.name) : "Error",
    status: "status" in error ? Number(error.status) : undefined,
  };
}
