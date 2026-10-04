import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

import { AppError } from "../domain/errors";
import { readJsonObject, requiredString, respond } from "../http/helpers";
import { publicScenario } from "../scenarios";
import { generateCustomScenario, signCustomScenario } from "../scenarios/customScenario";
import { rateLimitIdentity } from "../services/sessionService";
import { getSessionStore } from "../storage/sessionStore";

export async function generateScenario(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  return respond(request, context, async () => {
    const body = await readJsonObject(request);
    const prompt = requiredString(body.prompt, "prompt", 1_500).trim();
    if (prompt.length < 20) {
      throw new AppError(400, "scenario_prompt_too_short", "Describe the situation in at least 20 characters.");
    }
    const store = await getSessionStore();
    await store.consumeRateLimit(`generate-${rateLimitIdentity(clientIp(request))}`, 6, 60 * 60);
    const scenario = await generateCustomScenario(prompt);
    context.log("Custom Wick scenario generated", {
      scenarioId: scenario.scenario_id,
      characters: scenario.characters.length,
    });
    return {
      status: 201,
      body: {
        scenario: publicScenario(scenario),
        scenarioToken: signCustomScenario(scenario),
      },
    };
  });
}

app.http("generateScenario", {
  methods: ["POST", "OPTIONS"],
  authLevel: "anonymous",
  route: "scenarios/generate",
  handler: generateScenario,
});

function clientIp(request: HttpRequest): string | undefined {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
}
