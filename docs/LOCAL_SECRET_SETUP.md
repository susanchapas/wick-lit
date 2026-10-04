# Local provider setup without committing secrets

Wick's Gemini and ElevenLabs credentials are backend-only secrets. Real values belong in `functions/node/local.settings.json` on each development computer. That filename is ignored by the repository's root `.gitignore`.

## Backend local settings

Create a local copy of `functions/node/local.settings.example.json` named `functions/node/local.settings.json`.

In the local copy, replace these placeholders:

| Setting | Local value |
| --- | --- |
| `GEMINI_API_KEY` | Gemini API key from Google AI Studio |
| `ELEVENLABS_API_KEY` | ElevenLabs API key with speech-to-text and text-to-speech access |
| `ELEVENLABS_VOICE_ID` | The ElevenLabs voice ID used for scenario speech |
| `WICK_RATE_LIMIT_SALT` | A long random value unique to the local machine |
| `WICK_CUSTOM_SCENARIO_SECRET` | A long random value used to sign generated scenario drafts |

The model fields already contain the Wick defaults. `GEMINI_EVALUATION_MODEL` may match the role-play model locally.

`AzureWebJobsStorage` is set to `UseDevelopmentStorage=true` in the template for Azure Functions tooling. Wick's lightweight local API server uses an in-memory session store and does not require a cloud storage secret.

## Frontend local settings

The frontend does not need Gemini or ElevenLabs credentials.

For ordinary local development, no frontend environment file is required. The frontend calls `/api`, and Vite proxies those requests to `http://127.0.0.1:7071`.

If a local frontend override is needed, copy `frontend/.env.example` to `frontend/.env.local`. Keep `VITE_WICK_API_BASE_URL` blank when using the local backend. A production frontend environment may set it to the deployed Node Function App `/api` URL.

Never create a `VITE_` variable containing a provider API key. Variables with that prefix are embedded into browser code during the frontend build.

## Safe commit boundary

Files intended for Git:

- `functions/node/local.settings.example.json`
- `frontend/.env.example`
- application source and documentation

Files that must remain local and untracked:

- `functions/node/local.settings.json`
- `frontend/.env.local`
- any other `.env` or `.env.*` file that contains real values

The root `.gitignore` already enforces this boundary. Before a commit, the local settings file should be reported as ignored and should not appear in the normal Git status output.

If a real key is ever committed, removing it from the latest file is not sufficient. Revoke or rotate the exposed key immediately, then address the Git history separately.

## Runtime roles

- Gemini generates character dialogue and transcript-grounded evaluation.
- ElevenLabs performs learner speech-to-text and character text-to-speech.
- The browser never receives either provider key.
- The Wick backend remains the only caller of both providers.
