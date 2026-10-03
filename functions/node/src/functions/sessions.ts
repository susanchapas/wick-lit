import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

import { readJsonObject, requiredString, respond } from "../http/helpers";
import { readBearerToken } from "../security/sessionAccess";
import { addMessage, createSession, endSession, getSession, rateLimitIdentity, stepOutSession } from "../services/sessionService";
import { getSessionStore } from "../storage/sessionStore";

function token(request: HttpRequest) {
  return readBearerToken(request.headers.get("authorization"));
}

export async function startSession(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  return respond(request, context, async () => {
    const body = await readJsonObject(request);
    const result = await createSession(
      await getSessionStore(),
      {
        scenarioId: requiredString(body.scenarioId ?? body.scenario_id, "scenarioId", 80),
        mode: requiredString(body.mode, "mode", 10),
      },
      rateLimitIdentity(clientIp(request)),
    );
    context.log("Wick session started", { sessionId: result.sessionId, scenarioId: result.scenarioId, mode: result.mode });
    return { status: 201, body: result };
  });
}

export async function message(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  return respond(request, context, async () => {
    const body = await readJsonObject(request);
    return {
      body: await addMessage(
        await getSessionStore(),
        requiredString(request.params.sessionId, "sessionId", 80),
        token(request),
        {
          text: requiredString(body.text, "text", 1_000),
          sourceMedium: typeof body.sourceMedium === "string" ? body.sourceMedium : undefined,
        },
      ),
    };
  });
}

export async function readSession(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  return respond(request, context, async () => ({
    body: await getSession(
      await getSessionStore(),
      requiredString(request.params.sessionId, "sessionId", 80),
      token(request),
    ),
  }));
}

export async function end(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  return respond(request, context, async () => ({
    body: await endSession(
      await getSessionStore(),
      requiredString(request.params.sessionId, "sessionId", 80),
      token(request),
    ),
  }));
}

export async function stepOut(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  return respond(request, context, async () => ({
    body: await stepOutSession(
      await getSessionStore(),
      requiredString(request.params.sessionId, "sessionId", 80),
      token(request),
    ),
  }));
}

app.http("startSession", { methods: ["POST", "OPTIONS"], authLevel: "anonymous", route: "sessions", handler: startSession });
app.http("messageSession", { methods: ["POST", "OPTIONS"], authLevel: "anonymous", route: "sessions/{sessionId}/message", handler: message });
app.http("getSession", { methods: ["GET", "OPTIONS"], authLevel: "anonymous", route: "sessions/{sessionId}", handler: readSession });
app.http("endSession", { methods: ["POST", "OPTIONS"], authLevel: "anonymous", route: "sessions/{sessionId}/end", handler: end });
app.http("stepOutSession", { methods: ["POST", "OPTIONS"], authLevel: "anonymous", route: "sessions/{sessionId}/step-out", handler: stepOut });

function clientIp(request: HttpRequest): string | undefined {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
}
