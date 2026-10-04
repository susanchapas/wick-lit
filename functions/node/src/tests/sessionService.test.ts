import { describe, expect, it } from "vitest";

import type { RoleplayGenerator } from "../roleplay/types";
import { getScenario } from "../scenarios";
import { addMessage, createSession, getSession } from "../services/sessionService";
import { MemorySessionStore } from "../storage/sessionStore";

const generator: RoleplayGenerator = async ({ conversationHistory, latestUserMessage }) => ({
  responses: [
    { speaker: "dylan", text: `Why are you getting involved after you say: ${latestUserMessage}` },
    { speaker: "maya", text: "I think I want to stay down here." },
  ],
  scenarioComplete: false,
  endReason: null,
  state: `turn_${conversationHistory.length}`,
  model: "test-model",
});

describe("Wick-owned session flow", () => {
  it("assigns every simulated character a distinct ElevenLabs voice", () => {
    const characters = ["upstairs-invite", "private-group-chat", "the-library"]
      .flatMap((scenarioId) => getScenario(scenarioId)?.characters ?? []);
    expect(characters).toHaveLength(6);
    expect(characters.every((character) => character.voice.provider === "elevenlabs")).toBe(true);
    expect(new Set(characters.map((character) => character.voice.voice_id)).size).toBe(characters.length);
  });

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
      { scenarioId: "upstairs-invite", mode: "text" },
      "test-client",
    );
    expect(started.turns).toMatchObject([
      { turnId: "t1", role: "character", speaker: "dylan" },
      { turnId: "t2", role: "character", speaker: "maya" },
      { turnId: "t3", role: "character", speaker: "dylan" },
    ]);

    const message = await addMessage(
      store,
      started.sessionId,
      started.sessionToken,
      { text: "Come with me and let's ask if they want to step outside." },
      generator,
    );
    expect(message.userTurn).toMatchObject({ turnId: "t4", role: "user", sourceMedium: "text" });
    expect(message.characterTurns).toMatchObject([
      { turnId: "t5", role: "character", speaker: "dylan" },
      { turnId: "t6", role: "character", speaker: "maya" },
    ]);

    const session = await getSession(store, started.sessionId, started.sessionToken);
    expect(session.turns.map((turn) => turn.turnId)).toEqual(["t1", "t2", "t3", "t4", "t5", "t6"]);
  });

  it("creates the private group chat with only present chat participants as speakers", async () => {
    const started = await createSession(
      new MemorySessionStore(),
      { scenarioId: "private-group-chat", mode: "text" },
      "group-chat-client",
    );
    expect(started.turns).toMatchObject([
      { turnId: "t1", role: "character", speaker: "jake" },
      { turnId: "t2", role: "character", speaker: "chris" },
    ]);
    expect(started.turns.some((turn) => turn.speaker === "ana")).toBe(false);
  });

  it("creates the library scenario with the full Greg and Ana opening", async () => {
    const started = await createSession(
      new MemorySessionStore(),
      { scenarioId: "the-library", mode: "text" },
      "library-client",
    );
    expect(started.turns.map((turn) => turn.speaker)).toEqual(["greg", "ana", "greg", "ana", "greg"]);
    expect(started.turns[4]?.text).toBe("Why are you making it weird?");
  });

  it("does not allow a session token from another session", async () => {
    const store = new MemorySessionStore();
    const first = await createSession(store, { scenarioId: "upstairs-invite", mode: "text" }, "a");
    const second = await createSession(store, { scenarioId: "upstairs-invite", mode: "text" }, "b");
    await expect(getSession(store, first.sessionId, second.sessionToken)).rejects.toMatchObject({
      code: "invalid_session_token",
      status: 403,
    });
  });

  it("keeps voice sessions on the same roleplay engine with audio source turns", async () => {
    const store = new MemorySessionStore();
    const started = await createSession(store, { scenarioId: "upstairs-invite", mode: "voice" }, "voice");
    const result = await addMessage(
      store,
      started.sessionId,
      started.sessionToken,
      { text: "Let's check in with them together.", sourceMedium: "audio" },
      generator,
    );
    expect(result.userTurn.sourceMedium).toBe("audio");
    expect(result.characterTurns.every((turn) => turn.sourceMedium === "audio")).toBe(true);
  });

  it("does not complete a resolved scene after only one learner response", async () => {
    const store = new MemorySessionStore();
    const started = await createSession(store, { scenarioId: "upstairs-invite", mode: "text" }, "minimum-turns");
    const result = await addMessage(store, started.sessionId, started.sessionToken, { text: "Maya, come with me." }, async () => ({
      responses: [{ speaker: "maya", text: "Okay, let's go." }],
      scenarioComplete: true,
      endReason: "resolved",
      state: "maya_leaving",
      model: "test-model",
    }));
    expect(result.session.state).toBe("active");
  });

  it("enforces the scenario turn limit in the backend", async () => {
    const store = new MemorySessionStore();
    const started = await createSession(store, { scenarioId: "upstairs-invite", mode: "text" }, "turn-limit");
    let state = started.state;
    for (let index = 1; index <= 6; index += 1) {
      const result = await addMessage(store, started.sessionId, started.sessionToken, { text: `Learner response ${index}` }, generator);
      state = result.session.state;
      if (index < 6) expect(state).toBe("active");
    }
    expect(state).toBe("completed");
  });
});
