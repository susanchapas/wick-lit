# Wick frontend API contract

All routes use the Node Function App `/api` prefix. JSON responses include
`Cache-Control: no-store`. Keep the returned `sessionToken` in memory; do not
put it in a URL, analytics event, or persistent browser storage.

## Flow

1. `GET /api/scenarios`
2. `POST /api/sessions`
3. Start ElevenLabs with the returned temporary authorization.
4. `POST /api/sessions/{sessionId}/connect` with the conversation ID returned by
   the ElevenLabs SDK.
5. End the SDK conversation, then call `finish` or `step-out`.
6. If `finish` returns `202 processing`, poll `result` after `retryAfterSeconds`.

Every session route after creation requires:

```http
Authorization: Bearer <sessionToken>
```

The ElevenLabs conversation ID by itself grants no transcript or feedback
access. The backend also verifies that the conversation belongs to the mapped
agent and falls within the Wick session time window.

## Endpoints

### List scenarios

`GET /api/scenarios`

Returns public context, opening message, modes, and duration. Agent IDs, prompts,
and rubric internals stay server-side.

### Create session

`POST /api/sessions`

```json
{ "scenarioId": "ask-a-friend", "mode": "text" }
```

Text response (`201`):

```json
{
  "sessionId": "uuid",
  "sessionToken": "opaque-secret",
  "scenarioId": "ask-a-friend",
  "scenarioVersion": "ask-a-friend-v1",
  "mode": "text",
  "state": "authorized",
  "conversationDeadline": "2026-10-03T16:00:00.000Z",
  "authorization": {
    "type": "signed_url",
    "signedUrl": "wss://temporary-elevenlabs-url",
    "expiresInSeconds": 900
  }
}
```

Voice returns `type: conversation_token` and `conversationToken`. Text must call
the official SDK with `textOnly: true`, `connectionType: "websocket"`, and the
conversation text-only override. Voice uses `connectionType: "webrtc"` and may
request microphone access only after an explicit user action.

### Attach provider conversation

`POST /api/sessions/{sessionId}/connect`

```json
{ "providerConversationId": "conv_..." }
```

Returns state `conversing`. A different conversation cannot replace one already
attached to the session.

### Finish and evaluate

`POST /api/sessions/{sessionId}/finish` (empty body)

Returns either `200 completed` or `202 processing`. A processing response is:

```json
{
  "sessionId": "uuid",
  "scenarioId": "ask-a-friend",
  "mode": "text",
  "state": "processing",
  "conversationDeadline": "2026-10-03T16:00:00.000Z",
  "processingAttempts": 1,
  "retryAfterSeconds": 3
}
```

### Poll result

`GET /api/sessions/{sessionId}/result`

This may continue returning `202 processing`; provider reads are retried three
times per request and stop permanently after 40 processing attempts. Completed
results contain the normalized transcript and feedback.

### Step out

`POST /api/sessions/{sessionId}/step-out`

Ends immediately with state `stepped_out`. No transcript evaluation or feedback
is produced.

### Unexpected disconnect

`POST /api/sessions/{sessionId}/disconnect`

Marks an active session `disconnected`. It must not be presented as a successful
completion and cannot later be evaluated.

## Session states

| State | Meaning |
| --- | --- |
| `authorized` | Temporary provider authorization was issued |
| `conversing` | Provider conversation ID was attached |
| `processing` | Conversation ended; transcript/feedback is pending |
| `completed` | Transcript and validated feedback are available |
| `stepped_out` | User exited intentionally; no evaluation |
| `disconnected` | Connection ended unexpectedly; no successful completion |
| `failed` | Provider transcript or evaluation failed permanently |
| `expired` | Session access window ended |

The selected mode never changes within a session. Start a new session to switch
from denied Voice access to Text.

## Completed feedback example

```json
{
  "dimensions": {
    "clearAction": {
      "status": "demonstrated",
      "evidence": [{ "turnId": "turn-2", "quote": "ask Morgan if she wants to leave" }],
      "rationale": "The user proposed a specific action."
    },
    "safety": {
      "status": "demonstrated",
      "evidence": [{ "turnId": "turn-2", "quote": "leave with us" }],
      "rationale": "The plan offers a lower-escalation exit."
    },
    "supportAndChoice": {
      "status": "demonstrated",
      "evidence": [{ "turnId": "turn-2", "quote": "if she wants" }],
      "rationale": "The plan asks what Morgan wants."
    }
  },
  "identifiedStrategies": [
    {
      "number": 3,
      "name": "Delegate",
      "evidence": [{ "turnId": "turn-2", "quote": "Can you ask Morgan" }]
    }
  ],
  "strength": "You gave Alex a specific supportive role.",
  "nextStep": "Add what you will do if Morgan wants more help.",
  "summary": "This was a clear, choice-respecting plan.",
  "metadata": {
    "scenarioVersion": "ask-a-friend-v1",
    "rubricVersion": "bystander-rubric-v1",
    "evaluatorModel": "gemini-3.8-flash",
    "evaluatedAt": "2026-10-03T16:01:00.000Z",
    "audioMetricsIncluded": false
  }
}
```

Statuses are `demonstrated`, `partly_demonstrated`, `not_demonstrated`, and
`insufficient_evidence`. There is intentionally no percentage score. Every
evidence quote is checked against the cited user turn; invalid or invented
quotes reject the evaluation.

## Errors

```json
{
  "error": {
    "code": "invalid_scenario",
    "message": "The scenario ID is not supported.",
    "retryable": false
  }
}
```

Relevant codes include `invalid_scenario`, `invalid_mode`,
`session_token_required`, `invalid_session_token`, `session_not_found`,
`rate_limit_exceeded`, `agent_configuration_mismatch`,
`transcript_processing`, `provider_conversation_mismatch`, and provider
configuration/unavailability errors. Frontends should branch on `code`, show
`message`, and retry only when `retryable` is true.
