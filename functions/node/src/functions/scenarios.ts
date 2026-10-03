import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

import { respond } from "../http/helpers";
import { publicScenarios } from "../scenarios";

export async function listScenarios(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  return respond(request, context, async () => ({
    body: { scenarios: publicScenarios() },
  }));
}

app.http("listScenarios", {
  methods: ["GET", "OPTIONS"],
  authLevel: "anonymous",
  route: "scenarios",
  handler: listScenarios,
});
