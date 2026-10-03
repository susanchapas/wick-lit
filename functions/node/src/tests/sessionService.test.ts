import { describe, expect, it } from "vitest";

import type { RoleplayGenerator } from "../roleplay/types";
import { addMessage, createSession, getSession } from "../services/sessionService";
import { MemorySessionStore } from "../storage/sessionStore";

const generator: RoleplayGenerator = async ({ conversationHistory, latestUserMessage }) => ({
  response: `What if that makes things worse after you say: ${latestUserMessage}`,
  scenarioComplete: false,
  state: `turn_${conversationHistory.length}`,
  model: "test-model",
});

describe("Wick-owned session flow", () => {
  it("rejects an invalid scenario without calling a provider", async () => {
    await expect(createSession(
      new MemorySessionStore(),
      { scenarioId: "not-real", mode: "text" },
      "test-client",
    )).rejects.toMatchObject({ code: "invalid_scenario", status: 400 });
  });

  it("creates a stable opening turn and appends a canonical user/character pair", async () => {
    const store = new MemorySessionStore();
    const started = await createSession(
      store,
      { scenarioId: "party-hesitant-friend", mode: "text" },
      "test-client",
    );
    expect(started.turns).toMatchObject([{ turnId: "t1", role: "character", speaker: "alex" }]);

    const message = await addMessage(
      store,
      started.sessionId,
      started.sessionToken,
      { text: "Come with me and let's ask if they want to step outside." },
      generator,
    );
    expect(message.userTurn).toMatchObject({ turnId: "t2", role: "user", sourceMedium: "text" });
    expect(message.characterTurn).toMatchObject({ turnId: "t3", role: "character", speaker: "alex" });

    const session = await getSession(store, started.sessionId, started.sessionToken);
    expect(session.turns.map((turn) => turn.turnId)).toEqual(["t1", "t2", "t3"]);
  });

  it("does not allow a session token from another session", async () => {
    const store = new MemorySessionStore();
    const first = await createSession(store, { scenarioId: "party-hesitant-friend", mode: "text" }, "a");
    const second = await createSession(store, { scenarioId: "party-hesitant-friend", mode: "text" }, "b");
    await expect(getSession(store, first.sessionId, second.sessionToken)).rejects.toMatchObject({
      code: "invalid_session_token",
      status: 403,
    });
  });

  it("keeps voice sessions on the same roleplay engine with audio source turns", async () => {
    const store = new MemorySessionStore();
    const started = await createSession(store, { scenarioId: "party-hesitant-friend", mode: "voice" }, "voice");
    const result = await addMessage(
      store,
      started.sessionId,
      started.sessionToken,
      { text: "Let's check in with them together.", sourceMedium: "audio" },
      generator,
    );
    expect(result.userTurn.sourceMedium).toBe("audio");
    expect(result.characterTurn.sourceMedium).toBe("audio");
  });
});
