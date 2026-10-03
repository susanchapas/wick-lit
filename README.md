# Wick

Wick's standalone Azure Functions backend and developer-only conversation test
page. This repository is separate from the earlier Handoff prototype. The
production frontend belongs in the teammate's repository and should consume the
documented API rather than importing this test UI.

## What is implemented

- `ask-a-friend-v1`, a server-owned scenario and bystander-feedback rubric.
- Durable, token-protected sessions in Azure Table Storage.
- Temporary ElevenLabs authorization: signed WebSocket URL for Text and WebRTC
  token for Voice. Provider keys never reach browser code.
- Server-side transcript retrieval with a visible processing state and bounded
  retries.
- Gemini structured feedback with schema and exact-quote validation.
- A separate test page in `developer/`, defaulting to Text with no microphone
  access.
- The existing Node and Python `/api/health` routes.

Python/librosa audio analysis is intentionally deferred. Text feedback never
contains audio metrics.

## Local setup

Requirements: Node.js 22, Azure Functions Core Tools 4, and Azurite (or another
Azure Storage connection). In VS Code, the Azure Functions and Azurite
extensions can start both services.

```bash
cd functions/node
npm install
cp local.settings.example.json local.settings.json
npm run check
npx azurite --silent --location ../../.azurite
npm start
```

For a quick provider/UI test when Core Tools or Azurite is unavailable, use the
local-only runner:

```bash
cd functions/node
npm run dev:api
```

That runner deliberately uses an in-memory store and must never be deployed.
The Azure Functions entrypoints always use durable Azure Table Storage.

Edit the ignored `functions/node/local.settings.json` and replace the three
provider placeholders plus the rate-limit salt. Never commit or paste secrets
into the developer page.

In a second terminal:

```bash
cd developer
npm install
cp .env.example .env.local
npm run dev
```

Open <http://localhost:5173>. The Vite server proxies `/api` to
`http://localhost:7071`, so keys and provider authorization remain on the
backend. To test against the deployed API, set `WICK_API_PROXY_TARGET` in the
ignored `developer/.env.local` to the Node Function App origin.

## Configuration

| Variable | Location | Purpose |
| --- | --- | --- |
| `ELEVENLABS_API_KEY` | backend only | Requests temporary auth and transcripts |
| `ELEVENLABS_ASK_A_FRIEND_AGENT_ID` | backend only | Maps `ask-a-friend` to Alex |
| `GEMINI_API_KEY` | backend only | Produces post-conversation feedback |
| `GEMINI_MODEL` | backend only | Evaluator model; defaults to `gemini-3.8-flash` |
| `GEMINI_FALLBACK_MODEL` | backend only | Capacity fallback; defaults to `gemini-3.5-flash` |
| `AzureWebJobsStorage` | backend only | Functions storage and durable Wick sessions |
| `WICK_SESSIONS_TABLE` | backend only | Optional table name; defaults to `WickSessions` |
| `WICK_ALLOWED_ORIGINS` | backend only | Comma-separated production/local frontend origins |
| `WICK_RATE_LIMIT_SALT` | backend only | Random salt used before rate-limit identities are stored |

For Azure, enter these under Function App **Environment variables / App
settings** (or the equivalent VS Code Azure resource setting), never in source
control. Mark deployment-pipeline values as secrets. The browser receives only
a short-lived signed URL/token and a Wick session credential.

## Agent and API handoff

- [ElevenLabs agent setup](docs/ELEVENLABS_AGENT.md)
- [Frontend API contract](docs/API.md)

The implementation follows the current official
[ElevenLabs JavaScript SDK](https://elevenlabs.io/docs/eleven-agents/libraries/java-script),
[agent authentication](https://elevenlabs.io/docs/eleven-agents/customization/authentication),
[conversation transcript API](https://elevenlabs.io/docs/eleven-agents/api-reference/conversations/get),
and [Gemini structured-output guidance](https://ai.google.dev/gemini-api/docs/structured-output).

## Azure resources

- Subscription: Azure for Students
- Resource group: `wick-hackathon`
- Region: Canada Central
- Node app: `wick-node-c5167eed` (Node.js 22, Flex Consumption)
- Python app: `wick-python-c5167eed` (Python 3.12, Flex Consumption)
- Hosting: zero always-ready instances, no paid monitoring add-on
- Storage: separate Standard_LRS accounts

Current health checks:

- <https://wick-node-c5167eed.azurewebsites.net/api/health>
- <https://wick-python-c5167eed.azurewebsites.net/api/health>

No conversation-retention or provider-deletion guarantee is claimed. The
backend deliberately avoids logging transcript content, but provider and Azure
retention settings must be reviewed separately before production use.
