import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

import { respond } from "../http/helpers";
import { generateScenarioSuggestion } from "../scenarios/customScenario";
import { rateLimitIdentity } from "../services/sessionService";
import { getSessionStore } from "../storage/sessionStore";

export async function suggestScenario(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  return respond(request, context, async () => {
    const store = await getSessionStore();
    await store.consumeRateLimit(`suggest-${rateLimitIdentity(clientIp(request))}`, 12, 60 * 60);
    return { body: { prompt: await generateScenarioSuggestion() } };
  });
}

app.http("suggestScenario", {
  methods: ["POST", "OPTIONS"],
  authLevel: "anonymous",
  route: "scenarios/suggest",
  handler: suggestScenario,
});

function clientIp(request: HttpRequest): string | undefined {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
}
