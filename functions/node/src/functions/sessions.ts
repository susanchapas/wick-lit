import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

import { readJsonObject, requiredString, respond } from "../http/helpers";
import { readBearerToken } from "../security/sessionAccess";
import {
  attachProviderConversation,
  createSession,
  disconnectSession,
  finishSession,
  getSessionResult,
  rateLimitIdentity,
  stepOutSession,
} from "../services/sessionService";
import { getSessionStore } from "../storage/sessionStore";

export async function startSession(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  return respond(request, context, async () => {
    const body = await readJsonObject(request);
    const store = await getSessionStore();
    const result = await createSession(
      store,
      {
        scenarioId: requiredString(body.scenarioId, "scenarioId", 80),
        mode: requiredString(body.mode, "mode", 10),
      },
      rateLimitIdentity(clientIp(request)),
    );
    context.log("Wick session authorized", {
      sessionId: result.sessionId,
      scenarioId: result.scenarioId,
      mode: result.mode,
    });
    return { status: 201, body: result };
  });
}

export async function connectSession(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  return respond(request, context, async () => {
    const body = await readJsonObject(request);
    const result = await attachProviderConversation(
      await getSessionStore(),
      requiredString(request.params.sessionId, "sessionId", 80),
      readBearerToken(request.headers.get("authorization")),
      requiredString(body.providerConversationId, "providerConversationId", 128),
    );
    return { body: result };
  });
}

export async function finish(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  return respond(request, context, async () => {
    const result = await finishSession(
      await getSessionStore(),
      requiredString(request.params.sessionId, "sessionId", 80),
      readBearerToken(request.headers.get("authorization")),
    );
    return { status: result.state === "processing" ? 202 : 200, body: result };
  });
}

export async function result(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  return respond(request, context, async () => {
    const value = await getSessionResult(
      await getSessionStore(),
      requiredString(request.params.sessionId, "sessionId", 80),
      readBearerToken(request.headers.get("authorization")),
    );
    return { status: value.state === "processing" ? 202 : 200, body: value };
  });
}

export async function stepOut(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  return respond(request, context, async () => ({
    body: await stepOutSession(
      await getSessionStore(),
      requiredString(request.params.sessionId, "sessionId", 80),
      readBearerToken(request.headers.get("authorization")),
    ),
  }));
}

export async function disconnect(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  return respond(request, context, async () => ({
    body: await disconnectSession(
      await getSessionStore(),
      requiredString(request.params.sessionId, "sessionId", 80),
      readBearerToken(request.headers.get("authorization")),
    ),
  }));
}

app.http("startSession", {
  methods: ["POST", "OPTIONS"],
  authLevel: "anonymous",
  route: "sessions",
  handler: startSession,
});
app.http("connectSession", {
  methods: ["POST", "OPTIONS"],
  authLevel: "anonymous",
  route: "sessions/{sessionId}/connect",
  handler: connectSession,
});
app.http("finishSession", {
  methods: ["POST", "OPTIONS"],
  authLevel: "anonymous",
  route: "sessions/{sessionId}/finish",
  handler: finish,
});
app.http("getSessionResult", {
  methods: ["GET", "OPTIONS"],
  authLevel: "anonymous",
  route: "sessions/{sessionId}/result",
  handler: result,
});
app.http("stepOutSession", {
  methods: ["POST", "OPTIONS"],
  authLevel: "anonymous",
  route: "sessions/{sessionId}/step-out",
  handler: stepOut,
});
app.http("disconnectSession", {
  methods: ["POST", "OPTIONS"],
  authLevel: "anonymous",
  route: "sessions/{sessionId}/disconnect",
  handler: disconnect,
});

function clientIp(request: HttpRequest): string | undefined {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
}
