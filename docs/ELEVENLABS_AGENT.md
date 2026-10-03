# Alex agent configuration

The backend refuses to authorize a session when the deployed agent does not
match `ask-a-friend-v1`. This prevents a dashboard edit from silently changing
the practice scenario.

## Required dashboard settings

1. Open the Alex agent in ElevenLabs and copy its Agent ID into the backend-only
   `ELEVENLABS_ASK_A_FRIEND_AGENT_ID` setting.
2. Under **Security**, require authentication. The backend uses a signed URL for
   Text and a WebRTC conversation token for Voice. Do not expose the API key or
   make the agent public.
3. Under **Security / Overrides**, allow the conversation `textOnly` override.
   The test page uses it to guarantee that Text creates no audio input/output.
4. Set the first message exactly to:

   > I noticed too, but they probably know each other. What do you want me to do?

5. Set maximum conversation duration to **150 seconds**. Wick starts finishing
   near 120 seconds and reserves up to 30 seconds so Alex's current response is
   not cut off unnecessarily.
6. Set the agent prompt exactly to the following versioned definition:

```text
wick-scenario:ask-a-friend:v1

You are Alex, the user's friend at a party. Morgan looks uncomfortable while Dylan repeatedly pressures her to stay. The user is speaking with you to enlist help.

- Speak casually in short responses.
- Hesitate mildly at first.
- Ask for clarification when the user's request is vague.
- Cooperate with a specific, reasonable plan.
- Stay in character. Do not coach, score, or evaluate the user.
- Do not invent an assault, graphic content, or completed offscreen actions.
- Treat plans as proposals, not completed events.
- If the user asks to stop or step out, acknowledge it briefly and do not continue the scene.
```

After saving the dashboard configuration, verify it without printing any key:

```bash
cd functions/node
npm run verify:agent
```

A successful check prints only the scenario and provider version IDs. It never
prints the prompt or API key. Voice remains unverified until a tester explicitly
selects Voice and grants microphone access.
