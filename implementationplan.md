# Wick: Implementation Plan (Frontend + Backend)

**Team:** Susan = frontend · Antony = backend · Neta = content, brand, PM
**Task IDs** (S1, A1, G1...) match `Wick-24h-Plan.xlsx`.

**How to use this doc with an AI assistant**

1. Paste Sections 1 to 4 (product, stack, layout, formats) at the start of every session. They are the shared ground truth.
2. Then paste the one task you're working on from Section 6.
3. Tell the assistant: "Follow the formats in Section 4 exactly. Don't change them."
4. If the assistant suggests changing a format, a file path or a provider, check with the team first.

---

## 1. Product context

**Wick** is a bystander-intervention practice app. The user picks a campus-safety scenario (a "trail"), role-plays stepping in against AI characters by voice or text (in "the clearing"), then gets a scored coaching result on a 5-part rubric.

**Core loop:** Pick a trail → Practice in the clearing → Get coached

**Vocabulary** (use these exact words in the UI and in code names where it makes sense):

| Word | Meaning |
|---|---|
| The grove | Home screen |
| Trail | A practice scenario |
| The clearing | The role-play session |
| Coaching result | The scored feedback screen |
| Field guide | Reference cards for the Five Ds |
| Lanterns lit | Private history + streak page |
| Step out | Quit a session; nothing is saved, no score |
| Get scored | End the session and receive coaching |

**The Five Ds** (numbered, used across the app): 1 Direct, 2 Distract, 3 Delegate, 4 Delay, 5 Document.

**Rubric:** 5 dimensions, 20 points each, 100 total: Noticed, Directness, Safety, De-escalation, Follow-through.

**Feedback rule:** every coaching note names the strategy, says what the user did (quoting a line from their session), and gives one step forward. Example: "You used **Delegate** by telling the bartender. Next time, stay with Priya until her friend arrives." Never generic praise.

**Theme:** dark-forest and candle look for the shell only. Scenarios, character names, dialogue, scoring and safety language stay true to life. No fantasy creatures, no points, trophies, leaderboards or public scores.

**Safety rules (fixed, never loosen):**
- First visit shows the "What you're stepping into" awareness screen.
- Every trail shows a content note before starting.
- Step out at any time; nothing is saved and no score is shown.
- Scores and history are private to the user.
- AI characters never break character, never coach, never describe anything graphic (they describe the outcome instead), and end the scene in one line when the user says stop.

**Settings that change behavior:**
- **Intensity:** Gentle (characters back down sooner), Realistic (default), Intense (characters argue and escalate).
- **Default input:** Voice or Text.
- Theme (Night grove, Dawn, Lantern high contrast), Captions (on by default), Reduce motion, Stage mode, Untimed role-play.

**Scenarios:** four exist (The Upstairs Invite, The Unattended Drink, The Library Regular, The Group Chat). Two are being written (The Late Train, Closing time at Lou's). Full details are in `wick-team-onboarding.md`, Section 6.

---

## 2. Stack

| Layer | Tool | Owner |
|---|---|---|
| Frontend | React + Vite, React Router, plain CSS with CSS variables | 🟢 Susan |
| Hosting | Azure Static Web Apps (Free) | 🔵 Antony sets up |
| Backend | Azure Functions, Node 20, v4 programming model, inside the Static Web App | 🔵 Antony |
| Text-mode conversation | Gemini API (current stable Flash model) via `@google/genai` | 🔵 Antony |
| Voice-mode conversation | Azure OpenAI, `gpt-5.4-mini` deployment, via `openai` package (`AzureOpenAI` client) | 🔵 Antony |
| Scoring + coaching | Gemini with JSON output; Azure OpenAI as backup | 🔵 Antony |
| Speech to text | Azure AI Speech. Backend issues a token; browser uses `microsoft-cognitiveservices-speech-sdk` | 🔵 Antony + 🟢 Susan |
| Character voices | ElevenLabs text to speech (low-latency model) | 🔵 Antony + 🟢 Susan (playback) |
| Session history | Cosmos DB (optional). Streak and history live in the browser (`localStorage`) | 🔵 Antony + 🟢 Susan |
| Domain | GoDaddy, pointed at the Static Web App | Neta + 🔵 Antony |

**Why the split:** text mode and scoring run on Gemini, so the app works even if Azure OpenAI access is delayed. Voice mode runs on Azure OpenAI. Both use the same character prompt.

**Notes for AI assistants:**
- `gpt-5.4-mini` may reject `temperature` and expects `max_completion_tokens` in place of `max_tokens`. Use the lowest reasoning effort the deployment accepts so replies come back fast.
- `gpt-4o-mini` is deprecated on Azure for new subscriptions. Don't suggest it.
- Use the Azure Functions **v4** model (`app.http(...)` in `src/functions/*.js`), not the older `function.json` folders.

---

## 3. Project layout

```
wick/
├── frontend/                      🟢 Susan
│   ├── index.html
│   ├── vite.config.js             # sends /api requests to localhost:7071 during local work
│   ├── .env.example               # VITE_USE_SAMPLES=true
│   └── src/
│       ├── main.jsx
│       ├── App.jsx                # routes
│       ├── styles/tokens.css      # colors, type, spacing for all 3 themes
│       ├── lib/
│       │   ├── api.js             # every backend call goes through here
│       │   ├── samples.js         # sample responses (Section 4 formats)
│       │   ├── speech.js          # mic + Azure speech to text
│       │   ├── audio.js           # plays character voices in order
│       │   └── streak.js          # localStorage streak + Lanterns lit history
│       ├── screens/               # one file per screen
│       └── components/
├── api/                           🔵 Antony
│   ├── host.json
│   ├── package.json
│   ├── local.settings.json        # NEVER uploaded (in .gitignore)
│   ├── local.settings.example.json
│   └── src/
│       ├── functions/             # chat.js, score.js, speechToken.js, speak.js, scenarios.js, sessions.js
│       └── lib/
│           ├── prompts.js         # builds each character's system prompt
│           ├── gemini.js
│           ├── azureOpenAI.js
│           ├── elevenlabs.js
│           └── cosmos.js
├── content/                       Neta writes, both read
│   ├── scenarios/*.json           # one file per trail
│   ├── voices.json                # speaker name → ElevenLabs voice ID
│   ├── scoring-prompt.md
│   ├── copy/*.json                # screen text
│   └── audio/                     # pre-made opening lines
└── staticwebapp.config.json       🟢 Susan
```

**Settings and keys** (kept in the Static Web App settings and the shared vault; copied into `api/local.settings.json` on each laptop):

```
GEMINI_API_KEY          GEMINI_MODEL
AZURE_OPENAI_ENDPOINT   AZURE_OPENAI_KEY   AZURE_OPENAI_DEPLOYMENT=gpt-5.4-mini   AZURE_OPENAI_API_VERSION
SPEECH_KEY              SPEECH_REGION
ELEVENLABS_API_KEY      ELEVENLABS_MODEL
COSMOS_ENDPOINT         COSMOS_KEY                  (optional)
```

---

## 4. Request and response formats

These are locked once both of you agree on them. Susan's `samples.js` copies them exactly. To change one, post in the team chat and update this section first.

### `GET /api/scenarios`
```json
[
  {
    "id": "upstairs-invite",
    "title": "The Upstairs Invite",
    "setup": "Your friend Maya has had a lot to drink. A guy she just met is steering her toward the stairs.",
    "difficulty": "Medium",
    "location": "House party",
    "minutes": 1,
    "characters": ["Dylan", "Maya"],
    "strategies": [2, 3, 1],
    "contentTags": ["Alcohol", "Pressure", "Unwanted attention"],
    "contentNote": "Two-line plain description of what happens in the scene.",
    "openingAudio": "/content/audio/upstairs-invite-opening.mp3"
  }
]
```
`strategies` are Five D numbers.

### `POST /api/chat`
```json
// request
{
  "scenarioId": "upstairs-invite",
  "mode": "text",                 // "text" → Gemini, "voice" → Azure OpenAI
  "intensity": "realistic",       // "gentle" | "realistic" | "intense"
  "messages": [
    { "speaker": "Dylan", "text": "Come on, the roof deck is sick. Just us, two minutes." },
    { "speaker": "user",  "text": "Maya! Your roommate's looking for you." }
  ]
}
// response 200
{
  "replies": [
    { "speaker": "Dylan", "text": "She's fine, we'll be right back." },
    { "speaker": "Maya",  "text": "Wait, Jess is here?" }
  ],
  "turn": 2,
  "ended": false,
  "endReason": null               // "turn_cap" | "user_stop" | null
}
// response 502
{ "error": "chat_unavailable" }
```
Rules: the server counts user turns and returns `ended: true, endReason: "turn_cap"` after the 8th. If the user says stop, quit or end, the server returns one closing line and `endReason: "user_stop"`. Each reply is 1 to 3 lines, under 60 words.

### `POST /api/score`
```json
// request
{
  "scenarioId": "upstairs-invite",
  "intensity": "realistic",
  "transcript": [ { "speaker": "Dylan", "text": "..." }, { "speaker": "user", "text": "..." } ]
}
// response 200
{
  "total": 82,
  "headline": "Effective, with room to grow",
  "dimensions": [
    { "name": "Noticed",        "score": 18, "strategy": "Distract", "note": "You used Distract by saying her roommate was looking for her. Next time, say it before Dylan reaches the stairs." },
    { "name": "Directness",     "score": 15, "strategy": "Direct",   "note": "..." },
    { "name": "Safety",         "score": 17, "strategy": "...",      "note": "..." },
    { "name": "De-escalation",  "score": 16, "strategy": "...",      "note": "..." },
    { "name": "Follow-through", "score": 16, "strategy": "...",      "note": "..." }
  ],
  "strengths":    ["...", "..."],
  "improvements": ["...", "..."],
  "exampleLine":  "Hey Maya, I need you in the bathroom right now.",
  "scoredBy": "gemini"            // "gemini" | "azure"
}
// response 502
{ "error": "scoring_unavailable" }
```
Each dimension is 0 to 20. `total` is the sum of the five.

### `GET /api/speechToken`
```json
// 200
{ "token": "<short-lived token>", "region": "eastus2" }
// 503 when Speech isn't set up
{ "error": "voice_unavailable" }
```
The token lasts 10 minutes. The frontend requests a new one at the start of every session.

### `POST /api/speak`
```json
{ "speaker": "Dylan", "text": "She's fine, we'll be right back." }
```
Response 200: audio (`Content-Type: audio/mpeg`). Response 503: `{ "error": "voice_unavailable" }`.

### `POST /api/sessions` (optional, Cosmos)
Body: the score response plus `scenarioId`, `intensity`, `transcript`, `startedAt`, `completedAt`. Returns `202`. The frontend never waits for this call or shows its errors.

---

## 5. How the two of you work in parallel

Susan builds every screen against **sample responses** in the Section 4 formats. `lib/api.js` returns samples when `VITE_USE_SAMPLES=true` and calls the backend when it's `false`. Once an endpoint is live, Susan flips the setting.

Antony tests every endpoint from the terminal, so he never needs Susan's screens to check his work.

**Ownership:** Susan edits `frontend/`. Antony edits `api/`. Neta edits `content/`. If you need a change in someone else's folder, ask them.

---

## 6. Phases and tasks

Within each phase, 🟢 Susan's and 🔵 Antony's tasks happen at the same time. Each phase ends at a checkpoint (G) the team checks together.

### Phase 0 · Kickoff (both)

1. Read Section 4 together. Change anything now; after kickoff it's locked.
2. Confirm: text mode and scoring on Gemini, voice mode on Azure OpenAI.
3. Confirm the rubric, the 8-turn cap and the three Intensity levels.
4. Check that every laptop has Node 20, Git, VS Code, Azure Functions Core Tools v4 and the Azure CLI.

**Done when:** everyone agrees on Section 4.

---

### Phase 1 · Setup

**Goal:** both people can work alone from here on.

| 🟢 Susan | 🔵 Antony |
|---|---|
| S1. Create the GitHub project | A1. Azure OpenAI (do first; slowest to approve) |
| S2. App frame + sample data | A2. Create the other Azure services |
| | A3. `/api/chat` + `/api/scenarios` |

#### 🟢 S1. Create the GitHub project
1. Create a GitHub project called `wick`. Invite Antony and Neta with write access.
2. Inside `wick/`, run `npm create vite@latest frontend -- --template react`. Add `react-router-dom`.
3. Create the folders from Section 3.
4. Add a `.gitignore` with `node_modules`, `dist`, `.env`, `local.settings.json`. **Do this before the first upload.**
5. Add `staticwebapp.config.json`:
   ```json
   { "navigationFallback": { "rewrite": "/index.html", "exclude": ["/api/*", "/content/*", "/assets/*"] } }
   ```
6. In `vite.config.js`, send `/api` requests to `http://localhost:7071`.
7. Upload and tell Antony.

**Done when:** Antony can download the project and `npm run dev` opens a page.

#### 🟢 S2. App frame + sample data
1. `styles/tokens.css`: colors and type for Night grove (default), Dawn and Lantern high contrast, from Figma. Switch themes with a `data-theme` attribute on `<html>`.
2. `lib/samples.js`: one sample for every endpoint in Section 4, copied exactly.
3. `lib/api.js`: one function per endpoint (`getScenarios`, `sendTurn`, `getScore`, `getSpeechToken`, `speak`, `saveSession`). Return the sample when `import.meta.env.VITE_USE_SAMPLES === "true"`; otherwise call the backend. Add a 400 ms delay to samples so loading states show.
4. Screens in this order: Welcome → How practice works (3 cards) → Access and modality → What you're stepping into → The grove → Trails → Content note. First visit runs onboarding; return visits open the grove (save `wick.onboarded` in `localStorage`).
5. Bottom navigation: Grove, Trails, Lanterns lit, Field guide.
6. Screen text: use `wick-user-flows.md` until Neta's `content/copy/` files arrive.

**Done when:** you can go from Welcome to a trail's Content note with sample data, on desktop and at 375 px wide.
**If blocked:** nothing here depends on anyone else.

#### 🔵 A1. Azure OpenAI
1. Use a pay-as-you-go subscription or sponsor credits. Student subscriptions often have zero Azure OpenAI quota.
2. Create an Azure OpenAI resource in **East US 2**. If `gpt-5.4-mini` isn't offered, try **Sweden Central**.
3. Deploy `gpt-5.4-mini` with deployment name `gpt-5.4-mini`.
4. Send one test message from the terminal.
5. Note which request settings the model accepts (see Section 2 notes) and share them in the team chat.

**Done when (G1):** a test message gets a reply in under 3 seconds.
**If blocked:** file a quota increase request and move on. Voice mode uses Gemini until it clears.

#### 🔵 A2. Create the other Azure services
1. **Static Web App (Free):** connect to Susan's GitHub project. App location `wick/frontend`, API location `wick/api`, output `dist`. Pull the GitHub Actions file Azure adds.
2. **Azure AI Speech (F0):** note the key and region.
3. **Cosmos DB (free tier, optional):** database `wick`, container `sessions`, partition key `/userId`.
4. Put every key from Section 3 in the Static Web App settings and the shared vault. Neta provides the Gemini and ElevenLabs keys.
5. In the Static Web App, add the `www` custom domain and send Neta the two values Azure shows.

**Done when:** every key is in the vault and the Static Web App test address loads.

#### 🔵 A3. `/api/chat` + `/api/scenarios`
1. Set up `api/` with `func init --worker-runtime node --model V4`. Install `@google/genai` and `openai`.
2. `lib/prompts.js` builds one system prompt per scenario from `content/scenarios/*.json`. Until Neta's files arrive, copy the 4 scenarios from the onboarding doc into that format. Every prompt includes:
   - who each character is and how they talk
   - the Intensity rule for the chosen level
   - the safety rules from Section 1
   - "Reply only as JSON: `{ replies: [{ speaker, text }] }`"
3. `functions/chat.js`: validate the request, build the prompt, send it to **Gemini when `mode` is `text`** and **Azure OpenAI when `mode` is `voice`**. Count user turns; at 8, return `ended: true`.
4. Build the Gemini path first. Add Azure once G1 passes.
5. User text goes only in user messages. Never insert it into the system prompt.
6. `functions/scenarios.js` returns the trail list in the Section 4 format.
7. Test with `func start` and a terminal request.

**Done when:** `/api/chat` in text mode returns a correct reply for The Upstairs Invite.

#### ✅ G2 checkpoint
- Antony sends Susan one saved response from `/api/chat` and `/api/scenarios`. Susan compares them to `samples.js` and fixes any difference.
- The Static Web App test address loads Susan's frame.

---

### Phase 2 · First working version

**Goal:** a person can pick a trail, role-play in text, and get a score on the test address.

| 🟢 Susan | 🔵 Antony |
|---|---|
| S3. The clearing | A4. `/api/score` |
| | A5. Put it online + test with Susan |

#### 🟢 S3. The clearing
Build in this order so the core loop works first:
1. Scene opening: show the opening line; play `openingAudio` if it exists.
2. Text input, Send, and the conversation list with speaker names. Call `sendTurn` with `mode: "text"`.
3. States: **Listening** ("Speak when you are ready"), **Thinking** (waiting for reply), **Character speaking**.
4. **End and get scored** button. Nudge after turn 6. End automatically when `ended` is true.
5. **Step out**: confirm "Leave the clearing? Nothing will be saved." → clear everything → back to the Content note. No score, no history.
6. **Pause**: overlay; timer and input stop; resume where you left off.
7. Timer counting up (hidden when Untimed role-play is on). Captions on by default.
8. Keyboard: Space speaks, P pauses, T types, Esc steps out.
9. Once Antony's `/api/chat` is live, set `VITE_USE_SAMPLES=false` and test.

**Done when:** a full text conversation runs against the live backend, and Step out returns to the Content note with nothing saved.
**If blocked:** keep building with samples.

#### 🔵 A4. `/api/score`
1. Load `content/scoring-prompt.md` from Neta. If it isn't there yet, use the rubric and feedback rule from Section 1.
2. Call Gemini with JSON output on and a schema matching the Section 4 score response.
3. Validate: five dimensions, each 0 to 20, total equals the sum. If not, try once more.
4. If Gemini fails twice, send the same prompt to Azure OpenAI and set `scoredBy: "azure"`.
5. If both fail, return `502 { "error": "scoring_unavailable" }`.

**Done when:** a weak, a medium and a strong transcript get sensible, different scores.

#### 🔵 A5. Put it online + test with Susan
1. Upload; wait for the GitHub Actions build; check the test address.
2. Log the endpoint, provider and error message for every failure.
3. Run the full text loop with Susan on the test address.

#### ✅ G3 checkpoint
Text role-play and scoring work start to finish on the test address.
**If not:** cut to one trail and simple scoring. Fix the loop before Phase 3.

---

### Phase 3 · Voice and coaching

| 🟢 Susan | 🔵 Antony |
|---|---|
| S4. Coaching result + voice screens | A6. Voice loop |

#### 🟢 S4. Coaching result + voice screens
1. **Coaching result:** loading line ("Reviewing your practice..."), score out of 100 + headline, five dimension cards (name, score out of 20, note), strengths, improvements, example line, **Try again** (same trail, new conversation), **Reflect** (private note saved in the browser), privacy line "This result is private."
2. **Scoring failed:** on a 502, try once more. If it fails again, show the transcript with "Scoring unavailable right now."
3. **Mic and voice** (`lib/speech.js`, `lib/audio.js`):
   - At session start, call `getSpeechToken`. On a 503, hide the Voice toggle and use text.
   - Mic blocked → banner: "Microphone blocked. Allow it in your browser settings, or type your reply instead." → switch to text.
   - Use `microsoft-cognitiveservices-speech-sdk` with the token to turn speech into text, then send it with `mode: "voice"`.
   - Play each reply through `/api/speak`, one character after another. Show captions as each line plays.
4. After a completed session (never after Step out), add a history entry and update the streak.

**Done when:** a full session ends on a scored Coaching result, and the scoring-failed state shows the transcript.

#### 🔵 A6. Voice loop
1. **`/api/speechToken`:** `POST https://<region>.api.cognitive.microsoft.com/sts/v1.0/issueToken` with the Speech key in the `Ocp-Apim-Subscription-Key` header. Return `{ token, region }`. If the key is missing, return 503.
2. **`/api/speak`:** look up the speaker in `content/voices.json`, call ElevenLabs text to speech with the `xi-api-key` header and the low-latency model, return the audio. Unknown speaker → default voice. ElevenLabs missing or failing → 503.
3. Switch voice-mode `/api/chat` to Azure OpenAI (if G1 failed, keep Gemini).
4. Measure time from the user finishing speaking to audio starting. Aim for about 3 seconds. If slower, shorten replies and start `/api/speak` for the first character while the next reply is still being prepared.
5. Test with a headset mic in a quiet spot.

**Done when:** a voice conversation on the test address works three times in a row, in Chrome and Safari.

#### ✅ G4 voice checkpoint
- Voice reliable → voice is the main demo mode.
- Voice unreliable → text is the main demo mode; voice stays behind the toggle.
- Text loop still broken → switch to the backup project.

---

### Phase 4 · Depth

| 🟢 Susan | 🔵 Antony |
|---|---|
| S5. Field guide, Lanterns lit, Settings | A7. Intensity, character fixes, Cosmos |
| S6. Themes, motion, mobile, accessibility | A8. New scenarios + domain |

#### 🟢 S5. Field guide, Lanterns lit, Settings
1. **Field guide:** five cards (Direct, Distract, Delegate, Delay, Document) with definition, when to use, when not to. "Practise this on a trail" links to trails with that strategy. Strategy numbers on trail cards link back.
2. **Streak** (`lib/streak.js`): one completed session per day keeps the candle lit. Missed day → candle out → next session relights it at day 1, with the copy "Light it again tonight." Step-outs never count. One streak day per calendar day at most.
3. **Lanterns lit:** streak display + history list (trail, strategies used, date). "A quiet record of showing up."
4. **Settings:** all settings from Section 1, saved in `localStorage`. Send `intensity` with every `/api/chat` and `/api/score` call.

**Done when:** changing Intensity changes the value sent to the backend, and the streak updates after a completed session.

#### 🔵 A7. Intensity, character fixes, Cosmos
1. Load Neta's Intensity lines into `prompts.js`.
2. Run The Upstairs Invite at Gentle and Intense. Dylan should back off quickly at Gentle and argue at Intense.
3. Fix problems from Neta's character testing: breaking character, graphic content, ignoring stop, obeying "ignore your instructions".
4. Optional: `/api/sessions` saves finished sessions to Cosmos. On failure, log it and return 202 anyway.

**Done when:** Intensity changes how characters behave, and Neta's testing problems are fixed.

#### 🟢 S6. Themes, motion, mobile, accessibility
1. Check all three themes on every screen. Color is never the only signal; pair it with text or an icon.
2. Reduce motion turns off pulses and screen transitions.
3. Test at 375 px and on desktop.
4. Keyboard order through every screen, visible focus outline, captions announced with `aria-live="polite"`, contrast checked in the high-contrast theme.
5. Candle on the grove home: lit image when the streak is active, unlit when it isn't.

**Done when:** a keyboard-only user can complete a session, and nothing breaks at 375 px.

#### 🔵 A8. New scenarios + domain
1. Add Neta's two new scenarios (The Late Train, Closing time at Lou's). If `prompts.js` is built well, this only needs the new JSON files.
2. Test each at all three Intensity levels.
3. Check the custom domain loads with HTTPS. If it's still pending, the demo uses the test address.

**Done when:** six trails work, and the team knows whether the domain is ready.

#### ✅ G5 checkpoint
Someone outside the team can use Wick from Welcome to Coaching result without help. No new essential features after this.

---

### Phase 5 · Extras

| 🟢 Susan (in order; stop when out of time) | 🔵 Antony |
|---|---|
| 1. Cards for the two new trails | 1. Anything from earlier phases that's unfinished |
| 2. Safety resources panel (Neta's helpline list) | 2. Faster replies (shorter prompts, starting audio earlier) |
| 3. Grove map with trail markers | 3. If nothing is unfinished, take items from Susan's list (tell her first) |
| 4. Candle size grows with the streak | |

---

### Phase 6 · Fixes

Neta gives you a ranked list of problems she found by using the live site start to finish.

| 🟢 Susan | 🔵 Antony |
|---|---|
| Fix the frontend items, starting at the top of the list. | Fix the backend items, starting at the top of the list. |
| Fix only problems on the demo path. | Fix only problems on the demo path. |
| Upload after each fix and check the test address. | Upload after each fix and check the test address. |

After this phase: **feature freeze.** Only fix problems that would break the demo.

---

### Phase 7 · Demo prep

| 🟢 Susan | 🔵 Antony |
|---|---|
| Rehearse three times running the app: with voice, text only, and on the backup laptop with a phone hotspot. | Search the whole GitHub history for keys. Replace any key that was ever uploaded. Make the project public if the rules require it. |
| Confirm `VITE_USE_SAMPLES=false` on the live site. Keep a local copy with samples on as an emergency backup. | Check that Gemini and Azure OpenAI have enough usage left for judging. |
| | Shortly before the demo, run one practice and one score so the first response is fast. |

---

## 7. If something isn't ready

| If this isn't ready... | It affects... | Do this |
|---|---|---|
| Azure OpenAI quota (G1) | Voice mode on Azure | Voice mode uses Gemini; change only the provider in `chat.js`. |
| Antony's endpoints | Susan's screens | Keep `VITE_USE_SAMPLES=true`. |
| Susan's screens | Antony's testing | Test with terminal requests. |
| Neta's voice picks | `/api/speak` | One default ElevenLabs voice for everyone. |
| Neta's scoring instructions | `/api/score` | Use the rubric and feedback rule in Section 1. |
| Neta's Intensity lines | Intensity | Ship Realistic only; hide the setting. |
| Neta's new scenarios | Trails 5 and 6 | Use the 4 existing trails. |
| Speech or ElevenLabs down | Voice | Voice toggle hides; text mode works on its own. |
| Gemini rate limit | Text mode + scoring | Use a production key with billing on; scoring falls back to Azure OpenAI. |
| Custom domain | Pitch link | Use the `azurestaticapps.net` test address. |

## 8. Rules for both of you

1. **Never upload keys.** They live in the vault and the Static Web App settings only.
2. **Stay in your folder.** Susan: `frontend/`. Antony: `api/`. Neta: `content/`.
3. **Upload in batches.** Each upload triggers a rebuild. Test on your laptop first.
4. **Changing a format in Section 4?** Post in the team chat and update this doc before changing code.
5. **Stuck?** Say so in the team chat right away.
6. **Safety rules in Section 1 are fixed.** Don't loosen them for convenience or to make a scene feel more intense.
