# Wick

**Live:** <https://wick.courses>

Wick is an AI bystander-intervention coach. You practise stepping in during
realistic harassment scenarios, then get calm, specific coaching on what you
said.

## Problem

Most of us complete harassment training at work or school. That training
teaches three things:

1. How to identify harassment.
2. How to report it when it happens to you.
3. How to make sure you do not do it yourself.

It does not teach what to do when you **see** it happen to someone else.
We always hear "say something" or "do something", but no one shows us how.
So in the moment, most people freeze. They do not know the words, they
fear making it worse, and they have never practised.

## Purpose

Wick fills that gap. It gives people a safe place to rehearse bystander
intervention until the response feels natural. The method is the five Ds:

| Strategy | What you do |
| --- | --- |
| Direct | Name the behaviour and ask it to stop, when it is safe |
| Distract | Interrupt the situation without confronting the person |
| Delegate | Get help from someone with more authority or reach |
| Delay | Check in with the affected person after the moment |
| Document | Record what happened, for the affected person to use |

## How Wick is different

| | Typical harassment training | Bystander videos and articles | Wick |
| --- | --- | --- | --- |
| Focus | Recognise, report, do not offend | Explain what bystanders can do | Practise what bystanders can do |
| Format | Slides, videos, quiz | Read or watch | Live role-play, voice or text |
| Who talks back | No one | No one | An AI character who pushes back |
| Feedback | Pass or fail | None | Coaching grounded in your own transcript |
| Repetition | Once a year | Once | As often as you want, at your difficulty |

Wick is not a compliance course. It is a practice tool: you say the words out
loud, the other person reacts, and you learn what works before it matters.

## Core features

- **Trails (scenarios).** Realistic situations such as *The Upstairs Invite*,
  *The Library* and *The Private Group Chat*. The AI plays the person causing
  harm, the uncomfortable friend or the passive onlooker.
- **Custom scenarios.** Describe a situation (or ask for a suggestion) and Wick
  generates a new scenario for it.
- **Voice or text.** Speak your replies or type them. Text mode never asks for
  the microphone.
- **Difficulty.** Gentle, Realistic or Intense, which changes how characters
  react and how direct the coaching is.
- **Feedback.** When a session ends, you get a qualitative evaluation based on
  what you actually said, mapped to the five Ds.
- **Field Guide.** Short modules (Learn, See it, Practice, Complete) for each of
  the five Ds.
- **Journey.** Session history and streaks, stored only in your browser.
- **Care and access.** Content notes before each scenario, plus accessibility
  and privacy settings.

## Tech stack

```text
Browser (React app on GitHub Pages, wick.courses)
   │  HTTPS, session token
   ▼
Azure Functions (Node.js 22 API)
   ├── Gemini ─────────── plays the characters, writes feedback, makes scenarios
   ├── ElevenLabs ─────── speech to text (Scribe v2) and text to speech
   └── Azure Table Storage ── sessions and transcripts
```

| Layer | Technology | What it does |
| --- | --- | --- |
| Frontend | React 19, TypeScript, Vite, React Router | The app you see: scenarios, sessions, guide, settings |
| Hosting | GitHub Pages + GitHub Actions | Builds and deploys the frontend on every push to `master` |
| Backend | Azure Functions (Node.js 22, TypeScript) | API for sessions, messages, speech and scenario generation |
| AI roleplay | Google Gemini (`@google/genai`) | Generates every character reply, custom scenarios and feedback |
| Voice | ElevenLabs Scribe v2 and Flash v2.5 | Turns your speech into text and character text into speech |
| Storage | Azure Table Storage | Keeps token-protected sessions and the canonical transcript |
| Validation | Zod | Checks request and scenario data |
| Tests | Vitest | Backend unit tests |
| Lint | oxlint | Frontend linting |

## Architecture

- Gemini is the roleplay brain and generates every character response.
- Wick owns scenario state, session access, and the canonical transcript.
- Scenarios are JSON definitions loaded into one reusable master roleplay prompt.
- Text and voice use the same `/message` endpoint and Gemini engine.
- ElevenLabs is used only for Scribe v2 STT and direct TTS.
- The browser records each learner utterance and sends it to the protected Wick
  STT endpoint; Wick stores only the returned transcript text.
- Azure Table Storage persists token-protected sessions.
- Transcript-grounded qualitative evaluation is returned when a session ends.
- Provider keys stay in Azure; the browser never sees them.

## Local setup

```bash
cd functions/node
npm install
cp local.settings.example.json local.settings.json
npm run check
npm run dev:api
```

The copied `local.settings.json` is ignored by Git. Add the real Gemini and
ElevenLabs values only to that local file. See
[docs/LOCAL_SECRET_SETUP.md](docs/LOCAL_SECRET_SETUP.md) for the exact fields
and safe commit boundary.

In another terminal from the repository root:

```bash
npm --prefix frontend install
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
| `ELEVENLABS_STT_MODEL` | Defaults to `scribe_v2` |
| `ELEVENLABS_TTS_MODEL` | Defaults to `eleven_flash_v2_5` |
| `AzureWebJobsStorage` | Functions storage and durable sessions |
| `WICK_SESSIONS_TABLE` | Defaults to `WickSessions` |
| `WICK_ALLOWED_ORIGINS` | Allowed browser origins |
| `WICK_RATE_LIMIT_SALT` | Salt for stored rate-limit identities |
| `WICK_CUSTOM_SCENARIO_SECRET` | Signs generated scenario drafts before session creation |

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
