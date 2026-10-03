# Wick frontend API contract

All routes use the Node Function App `/api` prefix. Keep the `sessionToken` in
memory and send it as `Authorization: Bearer <sessionToken>` on every session
route after creation. Never put it in URLs, analytics, or persistent storage.

## Conversation flow

1. `GET /api/scenarios`
2. `POST /api/sessions` with `{ "scenarioId": "upstairs-invite", "mode": "text" | "voice" }`
3. Render the ordered opening character turns returned in `turns`.
4. Text: send the user's message directly to `message`.
5. Voice: upload the utterance to `transcribe`, then send the returned exact text to `message`.
6. Render the returned user turn and ordered `characterTurns`.
7. Voice: request `speech` for each returned character turn and play the audio in order.
8. End with `end` or `step-out`.

Gemini produces every character response. Wick owns the transcript and scenario
state. ElevenLabs receives audio for STT and exact stored character text for TTS;
it does not choose dialogue.

## Endpoints

### `GET /api/scenarios`

Returns public scenario metadata, characters, opening dialogue, supported modes, and duration.

### `POST /api/sessions`

Returns `201` with a token-protected session and canonical opening turns:

```json
{
  "sessionId": "uuid",
  "sessionToken": "opaque-secret",
  "scenarioId": "upstairs-invite",
  "scenarioVersion": "1.0.0",
  "mode": "text",
  "state": "active",
  "turns": [{
    "turnId": "t1",
    "role": "character",
    "speaker": "dylan",
    "text": "Come on, Maya, let's go upstairs for a little. It's way quieter up there.",
    "sourceMedium": "text",
    "createdAt": "2026-10-03T16:00:00.000Z"
  }]
}
```

### `POST /api/sessions/{sessionId}/message`

```json
{ "text": "Come with me and let's ask if they want to step outside.", "sourceMedium": "text" }
```

Voice uses `sourceMedium: "audio"`. The response contains `userTurn`,
`characterTurns`, and the current public session. Turn IDs increment as `t1`,
`t2`, `t3`, and are stable in storage.

### `POST /api/sessions/{sessionId}/transcribe`

Send multipart form data with an `audio` file. Returns `{ "text": "..." }`.
Failed STT never creates or invents a transcript turn.

### `POST /api/sessions/{sessionId}/turns/{turnId}/speech`

Returns `audio/mpeg` for a stored character turn. The server looks up the turn,
so the synthesized text is exactly the canonical Gemini response and clients
cannot use this route for arbitrary TTS.

### `GET /api/sessions/{sessionId}`

Returns the canonical transcript and session state.

### `POST /api/sessions/{sessionId}/end`

Ends the session as `completed` and returns the existing transcript-grounded evaluation.

### `POST /api/sessions/{sessionId}/step-out`

Ends the session as `stepped_out`.

## Errors

Errors use `{ "error": { "code", "message", "retryable" } }`. Important codes
include `invalid_scenario`, `invalid_mode`, `invalid_session_token`,
`speech_not_recognized`, `elevenlabs_request_failed`, and
`gemini_request_failed`.
