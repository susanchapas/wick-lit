# Wick

Wick is a standalone scenario-practice engine with an Azure Functions backend
and a developer test page. This repository is separate from the earlier
Handoff prototype.

## Architecture

- Gemini is the roleplay brain and generates every character response.
- Wick owns scenario state, session access, and the canonical transcript.
- Scenarios are JSON definitions loaded into one reusable master roleplay prompt.
- Text and voice use the same `/message` endpoint and Gemini engine.
- ElevenLabs is used only for Scribe v2 STT and direct TTS.
- The browser records the user's microphone separately and retains a user-only
  Blob for later upload/analysis.
- Azure Table Storage persists token-protected sessions.
- Evaluation, scoring, delivery analysis, and Python/librosa changes are deferred.

## Local setup

```bash
cd functions/node
npm install
cp local.settings.example.json local.settings.json
npm run check
npm run dev:api
```

In another terminal:

```bash
cd developer
npm install
cp .env.example .env.local
npm run dev
```

Open <http://127.0.0.1:5173>. Text mode never requests microphone access.
Voice mode requests it only after Start.

## Backend settings

| Variable | Purpose |
| --- | --- |
| `GEMINI_API_KEY` | Server-side roleplay generation |
| `GEMINI_MODEL` | Primary low-latency model |
| `GEMINI_FALLBACK_MODEL` | Capacity fallback |
| `ELEVENLABS_API_KEY` | Server-side STT and TTS |
| `ELEVENLABS_VOICE_ID` | Voice used for scenario character speech |
| `ELEVENLABS_STT_MODEL` | Defaults to `scribe_v2` |
| `ELEVENLABS_TTS_MODEL` | Defaults to `eleven_flash_v2_5` |
| `AzureWebJobsStorage` | Functions storage and durable sessions |
| `WICK_SESSIONS_TABLE` | Defaults to `WickSessions` |
| `WICK_ALLOWED_ORIGINS` | Allowed browser origins |
| `WICK_RATE_LIMIT_SALT` | Salt for stored rate-limit identities |

The provider keys and session tokens must never be committed or exposed to
browser code. See [docs/API.md](docs/API.md) for the frontend contract.

## Azure resources

- Resource group: `wick-hackathon`
- Region: Canada Central
- Node app: `wick-node-c5167eed` (Node.js 22, Flex Consumption)
- Python app: `wick-python-c5167eed` (Python 3.12, unchanged)
- Hosting: zero always-ready instances

Health checks:

- <https://wick-node-c5167eed.azurewebsites.net/api/health>
- <https://wick-python-c5167eed.azurewebsites.net/api/health>
