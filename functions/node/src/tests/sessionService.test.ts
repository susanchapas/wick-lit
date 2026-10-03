import { describe, expect, it } from "vitest";

import { AppError } from "../domain/errors";
import type { WickSession } from "../domain/types";
import { createSessionCredential } from "../security/sessionAccess";
import {
  attachProviderConversation,
  createSession,
} from "../services/sessionService";
import { MemorySessionStore } from "../storage/sessionStore";

describe("session service validation", () => {
  it("rejects an invalid scenario before calling providers", async () => {
    await expect(
      createSession(
        new MemorySessionStore(),
        { scenarioId: "not-real", mode: "text" },
        "test-client",
      ),
    ).rejects.toMatchObject({ code: "invalid_scenario", status: 400 });
  });

  it("does not allow a provider ID to bypass session access", async () => {
    const store = new MemorySessionStore();
    const credential = createSessionCredential();
    const session: WickSession = {
      sessionId: "27c2cff5-bcce-481a-9f03-0c94d53a5d21",
      tokenHash: credential.tokenHash,
      scenarioId: "ask-a-friend",
      scenarioVersion: "ask-a-friend-v1",
      rubricVersion: "bystander-rubric-v1",
      mode: "text",
      state: "authorized",
      createdAt: new Date().toISOString(),
      conversationDeadline: new Date(Date.now() + 120_000).toISOString(),
      expiresAt: new Date(Date.now() + 1_800_000).toISOString(),
    };
    await store.create(session);

    await expect(
      attachProviderConversation(store, session.sessionId, "wrong", "conv_12345678"),
    ).rejects.toBeInstanceOf(AppError);
    expect((await store.get(session.sessionId))?.providerConversationId).toBeUndefined();
  });
});
