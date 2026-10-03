# Wick: complete brand guide and design tokens

Version 1 · October 2026 · Built on the Enchanted Grove design system

Wick is an AI bystander-intervention coach set in an enchanted grove at night. This file holds every rule, token, value, component contract and asset reference in the Wick brand, so it can be dropped into any future project (a codebase, a design file, a prompt for an AI agent) as the single source of truth.

**How to use this file**

- Read "The rule" and "Voice and copy" before writing any screen or any line of copy.
- Paste Appendix A (`tokens.css`) into a project to get every CSS custom property. Set `data-theme="night"`, `"dawn"` or `"contrast"` on the root element.
- Use Appendix B (`tokens.json`) for tooling. Every family is a list of `{name, value, usage}`; colour and shadow values are objects keyed by theme.
- Component contracts are in "Components" and Appendix C (TypeScript). Component styles are in Appendix D.
- Icons, the mark and the wordmark are in Appendix E as inline SVG and path data.

## Contents

1. Brand and the rule
2. Voice and copy
3. The five Ds
4. Logo
5. Colour
6. Typography
7. Space, sizes and breakpoints
8. Corners, silhouettes, depth, light and layering
9. Motion and micro-interactions
10. States, loading, errors and empty states
11. Components
12. Accessibility and care
13. Scenarios and scoring
14. Frame kit: silhouettes, ornaments, assets
15. Iconography
16. Appendices: tokens.css, tokens.json, TypeScript, component CSS, SVG sources

## 1. Brand and the rule

Wick is an AI bystander-intervention coach. People freeze in the moment because they have never practised, so Wick lets them practise: a short voice role-play with an AI that plays the person causing harm, the uncomfortable friend or the passive onlooker, followed by a calm score and coaching built on the five Ds (Direct, Distract, Delegate, Delay, Document). The app is set in an enchanted grove at night, because these moments happen in the dark, at parties and on late walks home. The fantasy is the setting. The scenarios are true to life.

Wick is built on the Enchanted Grove design system. It inherits two typefaces (Mona Sans, DM Mono) and pairs them with Faculty Glyphic for display, the method of carving surfaces with inset shadows, and the source hues (marigold becomes the lantern amber, plus moss, lichen, dew blue and copper). It narrows them into a quieter product voice while maintaining WCAG AAA text contrast.

### The rule: theme the frame, keep the content true to life

- **The frame is themed.** The night forest grounds, lantern amber, the scenery, the mark and the names of places: the grove (home), trails (scenarios), the clearing (the role-play space), lanterns lit (finished sessions), your wick (the streak) and the field guide (the five Ds).
- **Cards and tiles dress like a quest menu.** Trail cards, quest tiles, the streak and lantern tiles and chapter headings carry gilded swirl corners, a crest set with an arcane gem, gilded dividers, soft colour bands, a turning arcane sigil and carved silhouettes (notch, scoop, gem, arch, ticket, banner, pane). The dressing sits on the outside of a card. The content note, the role-play stage, the transcript, the score, the rubric and safety notes stay plain.
- **The content is plain.** Scenario titles, characters, places, dialogue, scores, rubric notes, coaching and safety notes use ordinary names and ordinary words. Dylan stays Dylan. A party stays a party.
- **Rewards track practice.** Streaks and lit lanterns count that someone practised. Nothing scores a scenario like a game: no points, coins, badges, confetti or "win" language on any intervention.
- **The light metaphor carries the brand.** Lanterns, wicks and darkness are already safety language. Use one metaphor line per screen at most, and only in the frame: "When the grove goes dark, keep your wick lit."

The ThemeRule page shows the vocabulary, a do and don't pair and the pitch line.

### Using this system

- Set the theme on the root element: `<html data-theme="night">` (default) or `dawn` for daylight. Offer both in Settings, and follow `prefers-color-scheme` on first launch (dark selects `night`).
- Load `tokens.css`, the fonts, `components/bundle.css`, React 18, then `components/bundle.js`. Components live on `window.Wick`.
- Set `data-motion="still"` on the root when the person turns on Reduce motion; the stylesheet also honours `prefers-reduced-motion`.
- Build screens from the components first. Reach for tokens directly only for layout.
- One `lantern` button per screen. Step out (`Button tone="exit"`) appears on the content note and on every role-play screen, in the top right corner, on `stratum-exit`.

### Content fundamentals

- **Two voices.** The frame voice is soft and may use the light metaphor ("Keep your wick lit"). The content voice is a calm trainer standing beside you: plain, specific, kind ("Next time, stay with her after you leave the hallway.").
- **Person.** Speak to the user as "you". Characters are named. Never "the victim" or "the perpetrator" in the interface; use the person's name.
- **Casing.** Sentence case everywhere, including buttons and titles. The wordmark is lowercase "wick"; in running text write "Wick".
- **Length.** Short sentences. One idea per sentence. Coaching is two sentences: what the person did, then one thing to try next time.
- **No emoji** in the product or the scenarios. The streak uses the flame icon.
- **Coaching never blames.** Avoid "should have", "failed", "wrong". Prefer "Next time, try" and "This worked because".
- **Scenarios describe warning signs and stop before harm.** Refilling drinks, steering someone away, blocking a doorway, commenting on a body, sharing a private photo. Never depict an assault.
- Examples of good copy: "Start role-play", "Step out", "Setting the scene", "Effective, with room to grow", "Direct is for when you are safe", "No lanterns lit yet", "Your wick is ready when you are".

### The five Ds

| | Strategy | What it means | Token |
| --- | --- | --- | --- |
| 1 | Direct | Say something straight away, only when it is safe | `d-direct` |
| 2 | Distract | Create a diversion: spill a drink, ask for directions, pull the person into a conversation | `d-distract` |
| 3 | Delegate | Get someone else: a friend, a bouncer, an RA, staff, campus security | `d-delegate` |
| 4 | Delay | Check in afterwards: "Hey, that wasn't okay. Are you alright?" | `d-delay` |
| 5 | Document | Note or record what happened, with the person's consent in mind | `d-document` |

Always show a strategy with its number and its name (`Strategy` component). Keep the standard names; they are taught on campuses in Green Dot, Bringing in the Bystander and Hollaback programs.

### Visual foundations

- **Colour.** Night forest grounds (`ground`, `ground-raised`, `ground-sunken`) with a single accent, the lantern (`lantern`, `lantern-text`, `flame`). Tiles stand well off the page: `ground-raised` sits 1.9:1 above `ground` at night and 1.4:1 in Dawn, and ornate tiles add a gilded `rim-gilt`. Ornaments use the gilded gradient (`gold-deep`, `gold`, `gold-bright`) and the arcane `gem` (amethyst), both frame-only and never text. Text is `ink` and `ink-muted`. Status is `steady` (blue), `caution` (pale gold) and `danger` (copper). Wick avoids any red and green pair. Your voice is `voice-you` (amber) and the AI's voice is `voice-ai` (blue). Scores use `meter-fill`, a neutral, so no colour ever says good or bad.
- **Type.** Faculty Glyphic for the frame only (`hero`, `title`, `heading`, `aside`). Mona Sans for every content word (`scenario-title`, `dialogue`, `body`, `label`, `caption`, `score`). DM Mono for timers and values (`timer`, `data`, `overline`).
- **Space.** 4px base, generous steps (`space-1` to `space-20`). Targets are at least `target-min` (44px). Text lines stop at `measure` (68ch).
- **Depth.** Surfaces are carved: `inset-raised` for cards, `inset-frost` for buttons and chips, `inset-well` for fields. Light comes from glows (`glow-lantern`, `glow-soft`, `glow-voice`). Ornate cards and tiles add `rim-gilt`, a gilded double rim, after `inset-raised`; gems take `glow-gem`. Floating layers take one `bleed-night`. Focus is `focus-ring`.
- **Corners and silhouettes.** `radius-md` for controls, `radius-lg` for cards, `radius-xl` for sheets. `radius-round` only for the voice orb, avatars, rings and dots. Trail cards and tiles may take any quest-menu cut: `cut-notch` (chamfered), `cut-scoop` (carved tablet), `cut-gem` (octagon slot), `cut-arch`, `cut-ticket`, `cut-banner` or `cut-pane` (lantern). Wrap cut cards in `wk-cut-wrap` for their shadow and gold hover glow. The role-play, score and safety surfaces keep the plain `cut-soft` card.
- **Motion.** Light kindles, breathes and settles. `duration-kindle` for hover, `duration-rise` for entrances, `duration-hush` for the score. `ease-lift` may overshoot slightly, on frame controls only. Nothing bounces near a scenario or a score.
- **States.** Every control has rest, hover, focus, pressed, disabled and, where it applies, loading, error and success. The StateMatrix page shows them all.
- **Loading.** The wick loader (a burning progress line), the scene loader (a lantern pane filling with light), skeletons and the ember spinner. Loading text names the work in plain words.

### Iconography

29 icons on a 24px grid at `stroke-icon` (1.75px), round caps and joins, no fills, drawn inline by `Icon` with `currentColor`. They cover navigation (grove, trail, lantern, guide), the session (mic, mic-off, speaker, pause, play, replay, step-out, captions, timer), the five Ds, status (steady, caution, danger, info) and utility. The SVG files sit in the Icons asset group. Icons are always paired with a word or an `aria-label`. No emoji, no icon fonts.

### Accessibility

Wick targets WCAG 2.2 AAA where it applies. Every text token holds 7:1 on its grounds in all three themes; focus rings, meaningful edges, the flame and the voice colours hold 3:1. Every role-play can be answered by typing, captions are on by default, motion is optional, targets are 44px or more, and colour is never the only cue. Trauma-informed controls are part of the system: a content note before every trail, Step out on every role-play screen with no confirmation, no forced replays, and private results. The A11yChecks page measures every pair live.

### Rewards

- Count a streak day when someone finishes any trail, whatever the score.
- A finished trail lights its lantern in Lanterns lit. The lantern never shows the score.
- The score screen is the calmest screen in the app: no streak, no lantern lighting and no celebration appear on it.
- Never send streak warnings late at night, and never use loss words when a streak ends.

### Frame vocabulary

| Plain meaning | Frame word | Where it appears |
| --- | --- | --- |
| Home | The grove | Navigation and the home title |
| Scenario library | Trails | Navigation, library title, card overline ("Trail 01 · Party") |
| Role-play space | The clearing | Settings and help text only; the stage carries no frame words |
| Finished sessions | Lanterns lit | Navigation, the collection, "Lantern lit" on a finished card |
| Practice streak | Your wick | "3 days your wick has stayed lit" |
| Five Ds reference | Field guide | Navigation; strategies keep their standard names |

### The pitch line

"We set Wick in a grove at night because that is honest: these moments happen in the dark, at parties, on late walks home. The fantasy is the setting. The scenarios are true to life."

Open with ten seconds of the metaphor, then drop it and get serious. The live demo follows: a 60-second role-play on stage, then the score lands in silence.

## 2. Voice and copy

### Two voices

| | Frame voice | Content voice |
| --- | --- | --- |
| Where | Home title, navigation, empty states, the streak, the pitch | Scenarios, dialogue, scores, coaching, safety notes, errors |
| Tone | Soft; may use the light metaphor, one line per screen | Plain, specific, kind; a calm trainer beside you |
| Type | Faculty Glyphic for display lines | Mona Sans only |
| Example | "Keep your wick lit" | "You used Distract to give Maya a reason to leave the hallway." |

### Microcopy

| Moment | Write | Avoid |
| --- | --- | --- |
| Start a session | Start role-play | Begin your quest |
| Leave a session | Step out | Flee the clearing · Are you sure? |
| Loading a scene | Setting the scene | Summoning the spirits |
| Score band | Effective, with room to grow | Great job! · You failed |
| Coaching | Next time, stay with her after you leave the hallway. | You should have known better. |
| Safety note | Direct is for when you are safe. If someone is aggressive, choose Delegate. | Be a hero! |
| Microphone error | Microphone blocked. Allow it in your browser settings, or type your reply instead. | Oops! Something went wrong. |
| Empty collection | No lanterns lit yet. Finish a trail to light your first lantern. | Your grove is lonely and dark |
| Streak ended | Your wick is ready when you are. | You lost your streak! |
| Finished card | Lantern lit | Completed with 78 points |

### Words to flag in review

- Game words: win, won, points, perfect, level up, badge, gold, unlock.
- Story words inside content: quest, goblin, monster, spell, curse.
- Blame words: fail, failed, wrong, should have.
- Pressure words: hero, brave enough.
- Labels for people: victim, perpetrator. Use the person's name.
- Jokes or "Oops" in errors. Exclamation marks anywhere in content.

## 3. The five Ds

A tag for one of the five Ds, the bystander model taught on campuses: Direct, Distract, Delegate, Delay and Document.

**Consumer provides:** `d` (`direct`, `distract`, `delegate`, `delay`, `document`) and `variant="plain"` to drop the frost chip.

- Each strategy has a colour token (`d-direct`, `d-distract`, `d-delegate`, `d-delay`, `d-document`), a number badge (1 to 5, in `on-d`) and its name. Colour is never the only cue: the number and the word always travel together.
- Order is fixed: Direct, Distract, Delegate, Delay, Document.
- Use the standard names. Do not theme them.
- The colours mark categories and carry no grade. Never use a strategy colour to imply that one D is better than another.

| D | Meaning | Line in the field guide |
| --- | --- | --- |
| 1 Direct | Say something straight away | Only when it is safe for you and for the person. |
| 2 Distract | Create a diversion | Spill a drink, ask for directions, pull the person into a conversation. |
| 3 Delegate | Get someone else | A friend, a bouncer, an RA, staff, campus security. |
| 4 Delay | Check in after | "Hey, that wasn't okay. Are you alright?" |
| 5 Document | Note or record what happened | With the person's consent in mind. Give the record to them. |



## 4. Logo

The Wick mark is a lantern pane holding a single flame on its wick. The wordmark is "wick" set in Faculty Glyphic at weight 400, drawn as outlines, with a flame in place of the dot on the i. Copy these files as they are; do not redraw or re-set them.

- `wick-mark.svg`: the mark for night grounds. Pane in `ground-raised` night (#133126), flame in `lantern-amber` (#ffbe4d) with a `flame-core` (#fff1c9) center, wick in `parchment` (#f4efe3).
- `wick-mark-dawn.svg`: the mark for Dawn grounds. The pane deepens to `pine` (#0f2a20) so the flame keeps its glow on parchment.
- `wick-wordmark.svg`: wordmark for night grounds. Letters in `parchment` (#f4efe3), flame in `lantern-amber` and `flame-core`.
- `wick-wordmark-dawn.svg`: wordmark for Dawn grounds. Letters in Dawn `ink` (#0f231a), flame in Dawn `flame` (#a85600) with a `lantern-amber` center.
- `wick-lockup.svg` and `wick-lockup-dawn.svg`: mark and wordmark side by side for the app header, the pitch deck and the store listing.
- `wick-app-icon.svg`: the app icon. The mark on `night-forest` with a soft lantern pool. The platform applies its own corner mask.

Rules: give the mark clear space equal to the height of its flame on every side. Minimum size 20px for the mark and 64px wide for the wordmark. The logo carries `role="img"` and the label "Wick"; when it sits beside the visible name, hide it from assistive technology.


## 5. Colour

Wick has one accent, the lantern, set against a night forest. Every other colour either carries text, separates surfaces, marks a status, names a strategy or a voice, or belongs to the scenery. Two themes share one set of token names: Night grove (`night`, the default) and Dawn (`dawn`).

### Rules

- Lay screens on `ground`. Put cards, tiles, sheets and toasts on `ground-raised`. Put fields, the transcript and meter tracks in `ground-sunken`.
- Set body text in `ink` and secondary text in `ink-muted`. Both hold at least 7:1 on every ground in every theme.
- Use `lantern` for one thing per screen: the primary action, the listening orb or the on state of a switch. Text on it is always `on-lantern`.
- Use `lantern-text` for warm text in the frame: the active navigation label, the streak count, "Lantern lit".
- Status colours always travel with an icon and a word. `steady` is blue on purpose, so success and danger never rely on red and green.
- Scores, rubric meters and the timer use `meter-fill`, a neutral. Never tint a score by how good it is.
- `vein` is decorative and sits below 3:1 on purpose. Anything that must be seen as a boundary uses `edge`.
- The scenery tokens (`tree-far`, `tree-near`, `lantern-pool`) are for the frame only.


### Every colour token

| Token | Night grove | Dawn | High contrast | Use |
| --- | --- | --- | --- | --- |
| `night-forest` | #06140f | #06140f | #06140f | Source hue. The deep forest at night: the page ground of the default theme and the base of every silhouette layer. |
| `pine` | #0f2a20 | #0f2a20 | #0f2a20 | Source hue. Raised forest green used for illustration fields and the app icon ground. |
| `moss` | #3e6b48 | #3e6b48 | #3e6b48 | Source hue inherited from Enchanted Grove. Illustration and silhouette accents only. Holds less than 4.5:1 on the night grounds, so it is never text. |
| `lichen` | #b7ddb0 | #b7ddb0 | #b7ddb0 | Source hue inherited from Enchanted Grove. Pale green for illustration and the Document strategy on dark grounds. |
| `lantern-amber` | #ffbe4d | #ffbe4d | #ffbe4d | Source hue. The lantern light, inherited from the Enchanted Grove marigold flare. The single accent of the brand: the primary action, the listening halo and the flame in the mark. |
| `ember` | #e08a1e | #e08a1e | #e08a1e | Source hue. The deeper orange at the base of the flame in the mark and in glows on the Dawn theme. Decorative only. |
| `flame-core` | #fff1c9 | #fff1c9 | #fff1c9 | Source hue. The pale center of the flame in the mark and the hottest point of the wick loader. |
| `parchment` | #f4efe3 | #f4efe3 | #f4efe3 | Source hue. Used wherever white would be: text on the night grounds and the Dawn page tint. |
| `dew-blue` | #a6d8f3 | #a6d8f3 | #a6d8f3 | Source hue inherited from Enchanted Grove. The voice of the AI character and the steady (success) state. Blue keeps success apart from danger without relying on red and green. |
| `copper` | #f2b38a | #f2b38a | #f2b38a | Source hue inherited from Enchanted Grove. The danger state. Copper reads as serious without alarm red. |
| `ground` | #020a06 | #e2d9c5 | #000000 | Page ground. Night: the deepest night forest. Dawn: aged parchment, deep enough that cards stand off it. High contrast: black. |
| `ground-raised` | #1c4535 | #fffdf8 | #000000 | Cards, tiles, sheets, menus, dialogs and toasts. Set well apart from `ground` by lightness (night 2.1:1, Dawn 1.4:1 plus the `rim-gilt` edge) so every tile reads as its own object. |
| `ground-sunken` | #010503 | #dad1bc | #000000 | Fields, the transcript well, meter tracks and the track of the wick loader. One stratum below `ground`. |
| `veil` | #020806 | #1b2a22 | #000000 | Scrim color behind dialogs and sheets, applied at `opacity-scrim`. |
| `frost` | #21503d | #efe7d6 | #000000 | Fill of the secondary (frost) button, the AI dialogue bubble and selectable chips. Carries `inset-frost`. |
| `frost-hover` | #275a46 | #e5dbc6 | #1a1a1a | Frost fill under pointer hover. |
| `sill` | #8fbfa5 | #4d6a5a | #ffffff | The 2px lower edge that `inset-well` paints inside fields, and the off track of switches. At least 3:1 on `ground-sunken` in every theme. |
| `vein` | #2f5d4b | #c4b99f | #8a8a8a | Decorative hairlines: dividers, table rules, chart gridlines. Below 3:1 on purpose, so it never carries meaning alone. |
| `edge` | #7aa98f | #5b6f63 | #ffffff | Meaningful boundaries: chart outlines, the meter track edge and every surface edge. At least 3:1 against `ground`, `ground-raised` and `ground-sunken`. |
| `ink` | #fbf8f0 | #0f231a | #ffffff | Primary text and headings on `ground`, `ground-raised`, `ground-sunken`, `frost` and `bubble-you`. At least 10:1 in every theme. |
| `ink-muted` | #e3ece5 | #283a30 | #ececec | Secondary text, metadata, helper text and placeholders on all grounds and on `frost`. At least 7:1 in every theme (WCAG AAA). |
| `ink-link` | #ffdea6 | #5a2e00 | #ffe27a | Links and quiet buttons on all grounds, always underlined. At least 7:1 in every theme. |
| `lantern` | #ffbe4d | #6e3b00 | #ffd700 | The lantern: fill of the one primary button per screen, the switch on state and the listening voice orb. Pair it with `on-lantern` text. |
| `lantern-hover` | #ffcb6e | #5c3100 | #ffe95c | Lantern fill under pointer hover, paired with `glow-lantern`. |
| `on-lantern` | #1a0f02 | #fff8ea | #000000 | Text and icons on `lantern` and `lantern-hover`. At least 7:1 in every theme. |
| `lantern-text` | #ffdfa2 | #542d00 | #ffd700 | The lantern as text: the active navigation label, the streak count, the Direct strategy and frame headings that need warmth. On all grounds, at least 7:1. |
| `lantern-soft` | #3a2a0f | #f7e6c4 | #000000 | Soft amber ground behind `lantern-text` or `ink`: the selected navigation row, the streak tile and your own dialogue bubble. |
| `flame` | #ffbe4d | #a85600 | #ffd700 | The flame in the mark, the wick loader head and the streak glyph. Decorative or paired with text; at least 3:1 on `ground` in every theme. |
| `focus` | #ffe3a3 | #0f231a | #00e5ff | The keyboard focus ring colour, drawn by `focus-ring` with a ground-coloured band inside it. At least 3:1 on every ground in every theme. |
| `voice-you` | #ffbe4d | #6e3b00 | #ffd700 | Your voice: the listening orb, your waveform and the Speaking label beside you. Always paired with the word Listening or You. |
| `voice-ai` | #a6d8f3 | #0e3b5e | #9fdfff | The AI character's voice: its waveform and the speaking indicator beside its name. Always paired with the character's name. |
| `bubble-you` | {lantern-soft} | {lantern-soft} | {lantern-soft} | Fill of your dialogue bubble in the transcript. An alias of `lantern-soft`; text on it is `ink`. |
| `bubble-ai` | {frost} | {frost} | {frost} | Fill of the AI character's dialogue bubble. An alias of `frost`; text on it is `ink`. |
| `steady` | #c6e6f8 | #0e3b5e | #9fdfff | Success and saved states ("Session saved"). Text on all grounds and on `steady-soft`, at least 7:1. Always carries the check icon and a word. |
| `steady-soft` | #12304a | #dceaf5 | #000000 | Ground of a success notice or toast, behind `steady` or `ink`. |
| `caution` | #f1eeab | #3d3600 | #fff36b | Caution and safety notes ("Check your own safety first"). Text on all grounds and on `caution-soft`, at least 7:1. Always carries the caution icon and a word. |
| `caution-soft` | #2f3318 | #efecc9 | #000000 | Ground of a safety or caution note, behind `caution` or `ink`. |
| `danger` | #fcdcc4 | #682210 | #ffb38a | Errors and risks that need action now ("Microphone blocked"). Copper, a calm warning hue. Text on all grounds and on `danger-soft`, at least 7:1. Always carries the danger icon and a word. |
| `danger-soft` | #3f2219 | #f6e3da | #000000 | Ground of an error notice, behind `danger` or `ink`. |
| `d-direct` | #ffdfa2 | #542d00 | #ffd700 | Strategy colour for Direct. Used for the D badge and as text on all grounds. Every strategy also carries its letter glyph and its name, so colour is never the only cue. |
| `d-distract` | #a6f0f3 | #063c41 | #7ff6ff | Strategy colour for Distract. Badge fill and text on all grounds. |
| `d-delegate` | #f7daf4 | #5a2254 | #ffc4f6 | Strategy colour for Delegate. Badge fill and text on all grounds. |
| `d-delay` | #dee1fd | #2c3377 | #d0d6ff | Strategy colour for Delay. Badge fill and text on all grounds. |
| `d-document` | #d8f3d5 | #193f23 | #b8ffb0 | Strategy colour for Document. Badge fill and text on all grounds. |
| `on-d` | #06140f | #ffffff | #000000 | The letter inside a filled strategy badge. At least 7:1 on every `d-` colour in every theme. |
| `meter-fill` | #dfe9e2 | #1f3329 | #ffffff | The filled part of a rubric meter and the score ring. Neutral on purpose: scores stay clinical, with no reward colour. At least 3:1 on `ground-sunken`. |
| `meter-track` | {ground-sunken} | {ground-sunken} | {ground-sunken} | The empty part of a rubric meter. An alias of `ground-sunken`, bounded by `edge` where the meter needs a visible end. |
| `gold-deep` | #7a5a22 | #5e4410 | #b8860b | Shadow end of the gilded gradient on swirl corners, crests, dividers and tile pips. Inherited from Enchanted Grove. Ornament only, never text. |
| `gold` | #d4b062 | #8f6b1e | #ffd700 | Body of the gilded gradient. Inherited from Enchanted Grove gold leaf. At least 3:1 on `ground-raised` in every theme so the swirls read as marks. Never text. |
| `gold-bright` | #f7e6ad | #c39a3e | #fff3a0 | Highlight end of the gilded gradient: the gleam on every swirl. |
| `gem` | #c690f5 | #7b2f92 | #e3a6ff | The arcane gem set into gilded crests, card gems and the arcane band. Amethyst from Enchanted Grove, lifted for night. A frame accent for the mage and wizard feel. Never on scenario, score or safety surfaces. |
| `gem-text` | #e8cffc | #5e1f72 | #efcbff | The gem as text: the arcane band label and a featured tile name. At least 7:1 on `ground-raised` and `gem-soft`. |
| `gem-soft` | #3a1d4f | #f3e3f7 | #000000 | Soft arcane ground for the arcane band and featured tile counts. |
| `tree-far` | #0b2219 | #d0c6b0 | #000000 | The far treeline silhouette in the frame. Decorative, frame only. |
| `tree-near` | #010604 | #bdb197 | #000000 | The near treeline silhouette in the frame. Decorative, frame only. |
| `lantern-pool` | #ffbe4d | #f0b45a | #000000 | The colour of ambient lantern light pooled behind the frame, used at `opacity-pool` in a radial gradient. Decorative only. |

### Every required contrast pair, measured

Text needs 7:1 (WCAG AAA). Focus rings, edges, the flame and the voice colours need 3:1. All pass.

| Foreground | Background | Needs | Night grove | Dawn | High contrast |
| --- | --- | --- | --- | --- | --- |
| `ink` | `ground` | 7:1 | 18.87 | 11.73 | 21.00 |
| `ink` | `ground-raised` | 7:1 | 10.14 | 16.19 | 21.00 |
| `ink` | `ground-sunken` | 7:1 | 19.32 | 10.84 | 21.00 |
| `ink` | `frost` | 7:1 | 8.68 | 13.38 | 21.00 |
| `ink-muted` | `ground` | 7:1 | 16.59 | 8.61 | 17.78 |
| `ink-muted` | `ground-raised` | 7:1 | 8.91 | 11.88 | 17.78 |
| `ink-muted` | `ground-sunken` | 7:1 | 16.98 | 7.96 | 17.78 |
| `ink-muted` | `frost` | 7:1 | 7.63 | 9.82 | 17.78 |
| `ink-link` | `ground` | 7:1 | 15.50 | 8.20 | 16.41 |
| `ink-link` | `ground-raised` | 7:1 | 8.33 | 11.32 | 16.41 |
| `ink-link` | `ground-sunken` | 7:1 | 15.87 | 7.57 | 16.41 |
| `ink-link` | `frost` | 7:1 | 7.13 | 9.35 | 16.41 |
| `lantern-text` | `ground` | 7:1 | 15.57 | 8.54 | 14.97 |
| `lantern-text` | `ground-raised` | 7:1 | 8.37 | 11.79 | 14.97 |
| `lantern-text` | `ground-sunken` | 7:1 | 15.94 | 7.89 | 14.97 |
| `lantern-text` | `frost` | 7:1 | 7.16 | 9.74 | 14.97 |
| `steady` | `ground` | 7:1 | 15.33 | 8.29 | 14.47 |
| `steady` | `ground-raised` | 7:1 | 8.24 | 11.44 | 14.47 |
| `steady` | `ground-sunken` | 7:1 | 15.69 | 7.66 | 14.47 |
| `steady` | `frost` | 7:1 | 7.05 | 9.45 | 14.47 |
| `caution` | `ground` | 7:1 | 16.74 | 8.67 | 18.28 |
| `caution` | `ground-raised` | 7:1 | 8.99 | 11.97 | 18.28 |
| `caution` | `ground-sunken` | 7:1 | 17.14 | 8.01 | 18.28 |
| `caution` | `frost` | 7:1 | 7.70 | 9.89 | 18.28 |
| `danger` | `ground` | 7:1 | 15.42 | 8.20 | 12.07 |
| `danger` | `ground-raised` | 7:1 | 8.29 | 11.32 | 12.07 |
| `danger` | `ground-sunken` | 7:1 | 15.79 | 7.58 | 12.07 |
| `danger` | `frost` | 7:1 | 7.10 | 9.35 | 12.07 |
| `d-direct` | `ground` | 7:1 | 15.57 | 8.54 | 14.97 |
| `d-direct` | `ground-raised` | 7:1 | 8.37 | 11.79 | 14.97 |
| `d-direct` | `ground-sunken` | 7:1 | 15.94 | 7.89 | 14.97 |
| `d-direct` | `frost` | 7:1 | 7.16 | 9.74 | 14.97 |
| `d-distract` | `ground` | 7:1 | 15.62 | 8.65 | 16.53 |
| `d-distract` | `ground-raised` | 7:1 | 8.39 | 11.94 | 16.53 |
| `d-distract` | `ground-sunken` | 7:1 | 15.99 | 7.99 | 16.53 |
| `d-distract` | `frost` | 7:1 | 7.19 | 9.87 | 16.53 |
| `d-delegate` | `ground` | 7:1 | 15.53 | 8.35 | 14.48 |
| `d-delegate` | `ground-raised` | 7:1 | 8.35 | 11.53 | 14.48 |
| `d-delegate` | `ground-sunken` | 7:1 | 15.90 | 7.72 | 14.48 |
| `d-delegate` | `frost` | 7:1 | 7.15 | 9.53 | 14.48 |
| `d-delay` | `ground` | 7:1 | 15.54 | 8.10 | 14.74 |
| `d-delay` | `ground-raised` | 7:1 | 8.35 | 11.18 | 14.74 |
| `d-delay` | `ground-sunken` | 7:1 | 15.91 | 7.49 | 14.74 |
| `d-delay` | `frost` | 7:1 | 7.15 | 9.24 | 14.74 |
| `d-document` | `ground` | 7:1 | 16.88 | 8.42 | 17.97 |
| `d-document` | `ground-raised` | 7:1 | 9.07 | 11.63 | 17.97 |
| `d-document` | `ground-sunken` | 7:1 | 17.28 | 7.78 | 17.97 |
| `d-document` | `frost` | 7:1 | 7.77 | 9.61 | 17.97 |
| `ink` | `lantern-soft` | 7:1 | 13.04 | 13.38 | 21.00 |
| `ink-muted` | `lantern-soft` | 7:1 | 11.46 | 9.82 | 17.78 |
| `lantern-text` | `lantern-soft` | 7:1 | 10.76 | 9.74 | 14.97 |
| `ink` | `frost-hover` | 7:1 | 7.50 | 11.98 | 17.40 |
| `steady` | `steady-soft` | 7:1 | 10.39 | 9.49 | 14.47 |
| `ink` | `steady-soft` | 7:1 | 12.79 | 13.43 | 21.00 |
| `caution` | `caution-soft` | 7:1 | 10.92 | 10.15 | 18.28 |
| `ink` | `caution-soft` | 7:1 | 12.31 | 13.73 | 21.00 |
| `danger` | `danger-soft` | 7:1 | 11.12 | 9.27 | 12.07 |
| `ink` | `danger-soft` | 7:1 | 13.61 | 13.26 | 21.00 |
| `on-lantern` | `lantern` | 7:1 | 11.43 | 8.68 | 14.97 |
| `on-lantern` | `lantern-hover` | 7:1 | 12.59 | 10.49 | 17.06 |
| `on-d` | `d-direct` | 7:1 | 14.65 | 11.98 | 14.97 |
| `on-d` | `d-distract` | 7:1 | 14.69 | 12.14 | 16.53 |
| `on-d` | `d-delegate` | 7:1 | 14.61 | 11.72 | 14.48 |
| `on-d` | `d-delay` | 7:1 | 14.62 | 11.37 | 14.74 |
| `on-d` | `d-document` | 7:1 | 15.88 | 11.82 | 17.97 |
| `focus` | `ground` | 3:1 | 15.99 | 11.73 | 13.65 |
| `edge` | `ground` | 3:1 | 7.53 | 3.84 | 21.00 |
| `flame` | `ground` | 3:1 | 12.13 | 3.74 | 14.97 |
| `voice-you` | `ground` | 3:1 | 12.13 | 6.54 | 14.97 |
| `voice-ai` | `ground` | 3:1 | 13.10 | 8.29 | 14.47 |
| `lantern` | `ground` | 3:1 | 12.13 | 6.54 | 14.97 |
| `focus` | `ground-raised` | 3:1 | 8.59 | 16.19 | 13.65 |
| `edge` | `ground-raised` | 3:1 | 4.05 | 5.30 | 21.00 |
| `flame` | `ground-raised` | 3:1 | 6.52 | 5.17 | 14.97 |
| `voice-you` | `ground-raised` | 3:1 | 6.52 | 9.03 | 14.97 |
| `voice-ai` | `ground-raised` | 3:1 | 7.04 | 11.44 | 14.47 |
| `lantern` | `ground-raised` | 3:1 | 6.52 | 9.03 | 14.97 |
| `focus` | `ground-sunken` | 3:1 | 16.37 | 10.84 | 13.65 |
| `edge` | `ground-sunken` | 3:1 | 7.71 | 3.55 | 21.00 |
| `flame` | `ground-sunken` | 3:1 | 12.42 | 3.46 | 14.97 |
| `voice-you` | `ground-sunken` | 3:1 | 12.42 | 6.04 | 14.97 |
| `voice-ai` | `ground-sunken` | 3:1 | 13.41 | 7.66 | 14.47 |
| `lantern` | `ground-sunken` | 3:1 | 12.42 | 6.04 | 14.97 |
| `sill` | `ground-sunken` | 3:1 | 9.92 | 3.92 | 21.00 |
| `meter-fill` | `ground-sunken` | 3:1 | 16.49 | 8.84 | 21.00 |
| `sill` | `ground-raised` | 3:1 | 5.21 | 5.86 | 21.00 |
| `gold` | `ground-raised` | 3:1 | 5.22 | 4.82 | 14.97 |
| `gold` | `ground` | 3:1 | 9.71 | 3.49 | 14.97 |
| `gem` | `ground-raised` | 3:1 | 4.46 | 7.75 | 11.16 |
| `gem-text` | `ground-raised` | 7:1 | 7.56 | 10.79 | 14.66 |
| `gem-text` | `gem-soft` | 7:1 | 10.05 | 8.95 | 14.66 |
| `ink` | `gem-soft` | 7:1 | 13.47 | 13.44 | 21.00 |
| `ground-raised` | `ground` | 1:1 | 1.86 | 1.38 | 1.00 |

## 6. Typography

Three faces, each with one job. Mona Sans and DM Mono come from Enchanted Grove; Faculty Glyphic replaces Cormorant for display.

| Face | Job | Never |
| --- | --- | --- |
| Faculty Glyphic (display serif) | The frame: the hero line, screen titles, section headings, one quiet aside line | Scenario titles, dialogue, scores, safety notes, buttons |
| Mona Sans (grotesk) | Every content and interface word | Decorative italics |
| DM Mono | Timers, rubric values, dates, eyebrows | Sentences |

### Scale

| Style | Face | Size / line | Weight | Use |
| --- | --- | --- | --- | --- |
| `hero` | Faculty Glyphic | 56 / 60 | 400 | One line on home and welcome. 40px phones, 96px stage. |
| `title` | Faculty Glyphic | 40 / 44 | 400 | Screen titles in the frame. 32px phones. |
| `heading` | Faculty Glyphic | 28 / 34 | 400 | Frame section headings. 24px phones. |
| `aside` | Faculty Glyphic | 20 / 28 | 400 | One metaphor line in an empty state or welcome. |
| `score` | Mona Sans | 72 / 72 | 600 | The intervention score, tabular figures. 56px phones, 128px stage. |
| `scenario-title` | Mona Sans | 24 / 30 | 650 | Scenario titles. |
| `subtitle` | Mona Sans | 20 / 28 | 600 | Card, dialog and rubric headings. |
| `dialogue` | Mona Sans | 18 / 28 | 420 | Transcript lines and captions. 24 to 28px on stage. |
| `body-lg` | Mona Sans | 18 / 28 | 400 | Set-ups, coaching, onboarding. |
| `body` | Mona Sans | 16 / 26 | 400 | Default text. |
| `label` | Mona Sans | 15 / 20 | 600 | Buttons, labels, tabs, navigation. |
| `caption` | Mona Sans | 14 / 20 | 450 | Helper text and metadata. Smallest sentence size. |
| `timer` | DM Mono | 20 / 24 | 500 | The countdown. |
| `data` | DM Mono | 14 / 20 | 400 | Rubric values, dates, counts. |
| `overline` | DM Mono caps | 12 / 16 | 500, 0.12em | Eyebrows, three words at most. |

### Rules

- Text never goes below 14px for a sentence. Overlines at 12px are uppercase labels only and always in `ink` or `ink-muted`.
- Keep lines to `measure` (68ch). Coaching paragraphs sit at 17 to 18px.
- Use tabular figures for the score, the timer and rubric values so digits do not jump while counting.
- Faculty Glyphic appears at 20px and above only. It has one weight (400) and no italic; never set it bold or italic, as browsers fake both.
- Support text resizing to 200% without loss: every component uses relative layout and wraps.

### Font files and stacks

| Family | File | Weight | Style |
| --- | --- | --- | --- |
| Faculty Glyphic | `fonts/FacultyGlyphic-Regular.woff2` | 400 | normal |
| Mona Sans | `fonts/MonaSans-Variable.woff2` | 200 900 | normal |
| Mona Sans | `fonts/MonaSans-Italic-Variable.woff2` | 200 900 | italic |
| DM Mono | `fonts/DMMono-Regular.woff2` | 400 | normal |
| DM Mono | `fonts/DMMono-Medium.woff2` | 500 | normal |

| Role | CSS stack |
| --- | --- |
| `--font-display` | "Faculty Glyphic", Georgia, serif |
| `--font-sans` | "Mona Sans", "Helvetica Neue", Arial, sans-serif |
| `--font-mono` | "DM Mono", ui-monospace, Menlo, monospace |

All three families are open source under the SIL Open Font License. Faculty Glyphic and DM Mono are on Google Fonts; Mona Sans is published by GitHub.

### Type style details

| Style | Family | Size | Line | Weight | Tracking | Sample | Use |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `hero` | display | 56px | 60px | 400 | -0.01em | Keep your wick lit | The one line on the home screen and the welcome screen. 40px on phones; 96px on the stage breakpoint. |
| `title` | display | 40px | 44px | 400 | 0 | The grove | Screen titles in the frame: The grove, Trails, Lanterns lit, Field guide. 32px on phones. |
| `heading` | display | 28px | 34px | 400 | 0 | Trails for tonight | Section headings in the frame. 24px on phones. |
| `aside` | display | 20px | 28px | 400 | 0 | When the grove goes dark, keep your wick lit. | One quiet line in empty states and the welcome screen. Never for instructions or scenario text. |
| `score` | sans | 72px | 72px | 600 | -0.02em | 78 | The intervention score on the result screen, with tabular figures. 56px on phones; 128px on the stage breakpoint. No other number on the screen is this large. |
| `scenario-title` | sans | 24px | 30px | 650 | 0 | Dylan keeps refilling Maya's cup | Scenario titles on trail cards, the content note and the result screen. Names and places stay true to life. |
| `subtitle` | sans | 20px | 28px | 600 | 0 | How you intervened | Card titles, dialog titles and rubric headings. |
| `dialogue` | sans | 18px | 28px | 420 | 0 | Hey Maya, can you come help me find the bathroom? | Lines in the live transcript and captions during a role-play. |
| `body-lg` | sans | 18px | 28px | 400 | 0 | You arrive at a house party off campus. It is loud and crowded. | Scenario set-ups, coaching paragraphs and onboarding. |
| `body` | sans | 16px | 26px | 400 | 0 | Choose a trail to practise. Each one takes about a minute. | Default interface and reading text. |
| `label` | sans | 15px | 20px | 600 | 0.01em | Start role-play | Buttons, field labels, tabs and navigation. |
| `caption` | sans | 14px | 20px | 450 | 0 | About 60 seconds · Includes alcohol and pressure | Helper text and metadata. The smallest size for any sentence. |
| `timer` | mono | 20px | 24px | 500 | 0.02em | 0:42 | The role-play countdown inside the timer ring. |
| `data` | mono | 14px | 20px | 400 | 0.02em | Safety 24 / 25 | Rubric values, dates and session counts. |
| `overline` | mono | 12px | 16px | 500 | 0.12em | TRAIL 03 · PARTY | Uppercase eyebrow above a heading, three words at most, always in `ink` or `ink-muted`. |

## 7. Space, sizes and breakpoints

Wick is built for a phone in a dark room first and a projector on stage last. Space is generous so a person under stress always finds the next step.

### Spacing

| Token | Value | Use |
| --- | --- | --- |
| `space-1` | 4px | Icon to label; between a badge and its word. |
| `space-2` | 8px | Inside tags; between stacked label and field; between rubric rows. |
| `space-3` | 12px | Vertical padding inside buttons and fields; between dialogue bubbles. |
| `space-4` | 16px | Horizontal padding inside controls; page margin on phones. |
| `space-5` | 20px | Card padding on phones; the inner padding of a toast. |
| `space-6` | 24px | Card padding; grid gutter; page margin on tablets. |
| `space-8` | 32px | Between groups inside a section. |
| `space-10` | 40px | Between the voice orb and the transcript on the role-play stage. |
| `space-12` | 48px | Between sections; page margin on laptops. |
| `space-16` | 64px | Above the score on the result screen, so it lands in quiet space. |
| `space-20` | 80px | Page margins on wide desktops and the stage breakpoint. |

### Sizes

| Token | Value | Use |
| --- | --- | --- |
| `target-min` | 44px | The smallest hit area of any control (WCAG 2.5.5 AAA). |
| `target-comfort` | 48px | Navigation items and buttons on phones. |
| `icon-sm` | 20px | Icons inside buttons, tags and notices. |
| `icon-md` | 24px | Navigation and stand-alone icons. |
| `avatar` | 48px | The AI character's avatar beside the transcript. |
| `orb` | 112px | The voice orb on phones. 144px from the grove breakpoint, 192px on the stage breakpoint. |
| `timer` | 88px | The 60-second timer ring. |
| `measure` | 68ch | The longest line length for coaching and scenario text. |

### Breakpoints

| Token | Value | Use |
| --- | --- | --- |
| `bp-sprout` | 0px | Phones. 4 columns, 16px margins, bottom navigation, one trail card per row, hero at 40px. |
| `bp-sapling` | 600px | Tablets and narrow windows. 8 columns, 24px margins, navigation rail, two trail cards per row. |
| `bp-grove` | 960px | Laptops. 12 columns, 48px margins, sidebar, three trail cards per row. The role-play stage shows the transcript beside the orb. |
| `bp-canopy` | 1280px | Wide desktops. 12 columns inside a 1200px column, 80px margins. |
| `bp-stage` | 1600px | Projectors and the live demo. Stage mode: score at 128px, dialogue at 28px, navigation hidden. |

### Screen recipes

- **The grove (home).** Scenery header (200 to 240px) with the hero line, then the streak strip, then "Trails for tonight" with trail cards, then the navigation. Margins `space-4` on phones.
- **Trails.** Frame title and wick rule, Tabs for All, Not walked and Lanterns lit, then the card grid with `space-6` between cards.
- **Content note.** Plain card centered in the viewport, Step out in the top right. No scenery.
- **The clearing (role-play).** Timer top left, Pause and Step out top right, the voice orb, then the transcript. From the grove breakpoint the transcript sits beside the orb. Navigation is hidden.
- **Result.** Score at the top with `space-16` above it, rubric, the safety note, then Try again and Reflect. No scenery, no streak.
- **Stage mode.** A setting for presenting. Hides navigation and chrome, sets dialogue at 24 to 28px and the score at 128px, and centers each screen with `space-20` margins.

### Breakpoint behaviour

| Element | Sprout (0) | Sapling (600) | Grove (960) | Canopy (1280) | Stage (1600) |
| --- | --- | --- | --- | --- | --- |
| Navigation | Bottom bar | Rail | Sidebar | Sidebar | Hidden |
| Trail cards per row | 1 | 2 | 3 | 3 | n/a |
| Voice orb | 112px | 112px | 144px | 144px | 192px |
| Transcript | Below the orb | Below the orb | Beside the orb | Beside the orb | Beside, 24 to 28px |
| Score | 56px | 72px | 72px | 72px | 128px |
| Hero line | 40px | 48px | 56px | 56px | 96px |
| Page margin | 16px | 24px | 48px | 80px | 80px |

CSS custom properties cannot be read inside media queries, so write breakpoints as literal values: `@media (min-width: 600px)`, `960px`, `1280px`, `1600px`.

## 8. Corners, silhouettes, depth, light and layering

Surfaces are carved with inset shadows. Light comes from the lantern.

### Shadows

| Token | Use |
| --- | --- |
| `inset-frost` | Frosted glass: frost buttons, chips, the AI bubble. A soft highlight on the top lip and a pool of dark at the base. In high contrast it becomes a 2px white inset edge. |
| `inset-raised` | Cards, tiles, sheets and dialogs on `ground-raised`. Carves the surface without an outline. |
| `inset-well` | Fields and the transcript well: shadow pooling under the top edge and a 2px `sill` along the bottom. |
| `inset-well-focus` | A field while it holds focus: the sill turns lantern and warms the inside of the well. Shown together with `focus-ring`. |
| `inset-well-error` | A field with an error: a copper sill and a faint copper warmth. Always paired with error text and the danger icon. |
| `inset-lantern` | The primary lantern button: a lit upper lip and a warm pool at the base, like light through a glass pane. |
| `inset-press` | Any pressed control: the light leaves and the surface sinks. Replaces the control's own inset while pressed. |
| `rim-gilt` | A gilded double rim inside ornate cards and quest tiles: a gold hairline, a band of ground, then a fainter gold line. Compose after the surface inset: box-shadow: var(--inset-raised), var(--rim-gilt). |
| `glow-gem` | The halo around an arcane gem set in a crest or card corner. |
| `glow-lantern` | Hover bloom on the lantern button and the on state of switches. |
| `glow-soft` | Hover bloom on cards, tiles and frost buttons: lantern light falling on the surface from above. |
| `glow-voice` | The halo around the voice orb while it listens. Its spread follows the input level. |
| `glow-ai` | The halo around the AI character's avatar while it speaks. |
| `bleed-night` | The single directional shadow under floating strata: menus, dialogs, sheets and toasts. |
| `focus-ring` | Keyboard focus on every interactive element through :focus-visible. A ground-coloured band, then a solid 3px ring in `focus`. Combine it with the control's own inset. |

Compose shadows with commas: `box-shadow: var(--inset-raised), var(--glow-soft);`. Pressing replaces the control's inset with `inset-press`. Focus adds `focus-ring` after the control's own inset.

### Strata (z-index)

| Token | Value | Use |
| --- | --- | --- |
| `stratum-ground` | 0 | Page ground, grain and the silhouette scenery. |
| `stratum-trees` | 10 | Cards and content panels. |
| `stratum-path` | 20 | Sticky header, bottom navigation and the navigation rail. |
| `stratum-veil` | 30 | Scrim behind dialogs and sheets. |
| `stratum-lantern` | 40 | Dialogs, sheets, menus and popovers. |
| `stratum-signal` | 50 | Toasts, tooltips and live captions. |
| `stratum-exit` | 60 | The Step out button and the pause control during a role-play. |

### Corner radius

| Token | Value | Use |
| --- | --- | --- |
| `radius-xs` | 2px | The inner tick of checkboxes and the meter fill end. |
| `radius-sm` | 6px | Tags, strategy badges, tooltips and checkboxes. |
| `radius-md` | 10px | Buttons and fields. |
| `radius-lg` | 16px | Cards, tiles, toasts, menus and dialogue bubbles. |
| `radius-xl` | 24px | Sheets, dialogs and the role-play stage panel. |
| `radius-round` | 50% | Only for the voice orb, avatars, the timer ring and the streak dots. |

### Silhouettes

| Token | Value | Use |
| --- | --- | --- |
| `cut-soft` | 16px | Default card: a plain rounded rectangle at `radius-lg`. Trail cards, rubric cards, notices. |
| `cut-pane` | 50% | A lantern pane: the top edge arches to a point of half the width. The lantern tile in Lanterns lit and the empty state frame. |
| `cut-arch` | 120px | A soft rounded arch across the top, like a clearing in the trees. The streak tile and the welcome card. |
| `cut-notch` | 14px | Chamfered corners cut at 45 degrees: quest trail cards, chapter headers, dialog headers. Inherited from Enchanted Grove. |
| `cut-scoop` | 16px | Concave quarter-circle corners, like a carved tablet: featured trail cards and the field guide strategy cards. |
| `cut-ticket` | 10px | Half-circle bites on the left and right edges, like a quest scroll or pass: session receipts and the weekly practice card. |
| `cut-banner` | 18px | A pennant point at the bottom: chapter markers and the streak milestone card. |
| `cut-gem` | 22% | A cut-gem octagon: quest tiles, inventory-style slots for strategies and trail categories. |
| `cut-bubble` | 4px | The smaller corner of a dialogue bubble, nearest the speaker. The other three corners use `radius-lg`. |

### Stroke

| Token | Value | Use |
| --- | --- | --- |
| `stroke-hairline` | 1px | Decorative ornaments and dividers in `vein`. |
| `stroke-icon` | 1.75px | Interface icons at 20px and 24px. Heavier than the parent grove so icons stay legible at night. |
| `stroke-sill` | 2px | The inner lower edge of fields, the selected tab mark and high contrast surface edges. |
| `stroke-focus` | 3px | The visible width of the focus ring. |
| `stroke-ring` | 6px | The timer ring and the score ring. |

### Blur

| Token | Value | Use |
| --- | --- | --- |
| `blur-veil` | 16px | backdrop-filter behind sheets, dialogs and the sticky navigation. |
| `blur-glow` | 32px | The soft pool of light behind the voice orb. |
| `blur-night` | 72px | Large ambient lantern pools behind the frame scenery. |

### Opacity

| Token | Value | Use |
| --- | --- | --- |
| `opacity-grain` | 0.03 | SVG noise over the page ground. |
| `opacity-pool` | 0.16 | The ambient lantern light behind the scenery. |
| `opacity-scenery` | 0.9 | The far treeline layer, so the near layer reads in front. |
| `opacity-scrim` | 0.8 | The `veil` scrim behind a dialog or sheet. |
| `opacity-disabled` | 0.5 | Disabled controls, always with a text reason nearby. |

### Silhouette CSS

```css
.cut-soft   { border-radius: var(--radius-lg); }
.cut-pane   { clip-path: polygon(50% 0, 62% 4%, 73% 10%, 83% 18%, 91% 28%, 97% 39%, 100% 50%, 100% 100%, 0 100%, 0 50%, 3% 39%, 9% 28%, 17% 18%, 27% 10%, 38% 4%); }
.cut-arch   { border-radius: var(--cut-arch) var(--cut-arch) var(--radius-lg) var(--radius-lg) / 48px 48px var(--radius-lg) var(--radius-lg); }
.bubble-ai  { border-radius: var(--radius-lg) var(--radius-lg) var(--radius-lg) var(--cut-bubble); }
.bubble-you { border-radius: var(--radius-lg) var(--radius-lg) var(--cut-bubble) var(--radius-lg); }
```


### Every shadow value

| Token | Night grove | Dawn | High contrast |
| --- | --- | --- | --- |
| `inset-frost` | `inset 0 1px 1px #f4efe338, inset 0 -12px 22px -12px #000000c7` | `inset 0 1px 1px #ffffffd9, inset 0 -12px 20px -12px #6b5a3a4d` | `inset 0 0 0 2px #ffffff` |
| `inset-raised` | `inset 0 1px 0 #f4efe338, inset 0 0 0 1px #7aa98f2e, inset 0 -18px 30px -20px #000000d9, 0 16px 32px -18px #000000` | `inset 0 1px 0 #ffffff, inset 0 0 0 1px #8f6b1e24, inset 0 -18px 30px -22px #6b5a3a40, 0 14px 28px -16px #5e44104d` | `inset 0 0 0 2px #ffffff` |
| `inset-well` | `inset 0 3px 8px #000000d1, inset 0 -2px 0 #8fbfa5` | `inset 0 3px 8px #3a2e1a38, inset 0 -2px 0 #4d6a5a` | `inset 0 0 0 2px #ffffff` |
| `inset-well-focus` | `inset 0 3px 8px #000000d1, inset 0 -2px 0 #ffbe4d, inset 0 -12px 16px -12px #ffbe4d73` | `inset 0 3px 8px #3a2e1a38, inset 0 -2px 0 #6e3b00, inset 0 -12px 16px -12px #e08a1e59` | `inset 0 0 0 3px #00e5ff` |
| `inset-well-error` | `inset 0 3px 8px #000000d1, inset 0 -2px 0 #f7c6a3, inset 0 0 18px #f7c6a326` | `inset 0 3px 8px #3a2e1a38, inset 0 -2px 0 #7a2a14, inset 0 0 16px #7a2a141f` | `inset 0 0 0 3px #ffb38a` |
| `inset-lantern` | `inset 0 1px 1px #fff1c9f2, inset 0 -8px 14px -6px #b8650aa6` | `inset 0 1px 1px #ffd9a159, inset 0 -8px 14px -6px #2a1400bf` | `inset 0 0 0 2px #000000` |
| `inset-press` | `inset 0 4px 12px #000000db` | `inset 0 4px 10px #3a2e1a5c` | `inset 0 0 0 4px #00e5ff` |
| `rim-gilt` | `inset 0 0 0 1px #d4b06280, inset 0 0 0 4px #020a06, inset 0 0 0 5px #d4b06240` | `inset 0 0 0 1px #8f6b1ea6, inset 0 0 0 4px #fffdf8, inset 0 0 0 5px #8f6b1e4d` | `inset 0 0 0 2px #ffd700` |
| `glow-gem` | `0 0 0 1.5px #d4b062, 0 0 12px #c690f5` | `0 0 0 1.5px #8f6b1e, 0 0 10px #7b2f9266` | `0 0 0 2px #ffd700` |
| `glow-lantern` | `0 0 6px #ffbe4d6b, 0 0 32px #ffbe4d47` | `0 6px 20px -6px #e08a1e73` | `0 0 0 2px #ffd700` |
| `glow-soft` | `0 0 0 1px #ffbe4d1f, 0 10px 28px -12px #ffbe4d38` | `0 10px 24px -12px #6b5a3a59` | `0 0 0 2px #ffffff` |
| `glow-voice` | `0 0 0 8px #ffbe4d2e, 0 0 48px 10px #ffbe4d4d` | `0 0 0 8px #e08a1e26, 0 0 40px 8px #e08a1e40` | `0 0 0 4px #ffd700` |
| `glow-ai` | `0 0 0 8px #a6d8f326, 0 0 44px 8px #a6d8f340` | `0 0 0 8px #0e3b5e1f, 0 0 36px 6px #0e3b5e33` | `0 0 0 4px #9fdfff` |
| `bleed-night` | `0 24px 48px -12px #000000e6` | `0 20px 40px -14px #3a2e1a4d` | `0 0 0 2px #ffffff` |
| `focus-ring` | `0 0 0 2px #020a06, 0 0 0 5px #ffe3a3` | `0 0 0 2px #e2d9c5, 0 0 0 5px #0f231a` | `0 0 0 2px #000000, 0 0 0 5px #00e5ff` |

## 9. Motion and micro-interactions

Light moves the way lantern light moves: it kindles, breathes and settles. Motion explains what happened and who is speaking. It never celebrates an intervention.

### Durations

| Token | Value | Use |
| --- | --- | --- |
| `duration-flicker` | 100ms | Press feedback: the surface sinks. |
| `duration-kindle` | 180ms | Hover glows, colour changes and the focus ring appearing. |
| `duration-drift` | 260ms | Tab marks, switch knobs, menus opening. |
| `duration-rise` | 420ms | Entrances: cards, toasts, sheets and dialogue bubbles rising into place. |
| `duration-settle` | 640ms | Panels expanding and the voice orb changing state. |
| `duration-hush` | 1400ms | The score reveal: the number counts up and the rubric fills, once, without bounce. |
| `duration-breath` | 2400ms | One breath of the listening halo, the lantern flicker loop and the skeleton shimmer. |
| `duration-night` | 16000ms | One slow loop of the ambient lantern light in the frame. |

### Easing

| Token | Value | Use |
| --- | --- | --- |
| `ease-kindle` | cubic-bezier(0.2, 0.7, 0.2, 1) | Default for entrances, glows and colour. |
| `ease-settle` | cubic-bezier(0.3, 0, 0.2, 1) | The score reveal, the rubric meters and the timer: steady and serious. |
| `ease-breath` | cubic-bezier(0.45, 0, 0.55, 1) | Looping motion that breathes in and out: the listening halo and the flame flicker. |
| `ease-lift` | cubic-bezier(0.34, 1.25, 0.64, 1) | A small lift for frame controls only: switch knobs, the selected tab mark, a lantern lighting in the collection. |

### Micro-interactions by component

| Component | Trigger | What moves | Tokens |
| --- | --- | --- | --- |
| Button, lantern | Hover | Fill warms to `lantern-hover`, `glow-lantern` blooms, the icon flickers | `duration-kindle`, `ease-kindle`, `duration-breath` |
| Button, any | Press | Surface sinks with `inset-press` and 1px of travel | `duration-flicker` |
| Button, any | Keyboard focus | `focus-ring` appears | `duration-kindle` |
| Button, trailing arrow | Hover | Arrow moves 3px forward | `duration-kindle` |
| Button, exit | Hover | Door arrow moves 2px outward | `duration-kindle` |
| Button | Loading | Icon becomes the ember spinner; label stays | `duration-settle` per ember |
| Voice orb | Listening | Fill turns `voice-you`; halo scales with voice level each frame | `glow-voice`, 90ms linear |
| Voice orb | Thinking | Three embers rise in turn | `duration-breath`, 160ms stagger |
| Voice orb | Speaking | Five bars move as a waveform; halo breathes | 900ms, `ease-breath` |
| Voice orb | Any change | Fill and shadow cross-fade | `duration-settle` |
| Timer | Each second | Ring burns one step | 1s linear |
| Timer | Last 10 seconds | Ring colour changes to `caution` | `duration-settle` |
| Transcript line | New line | Rises 8px and fades in | `duration-rise`, `ease-kindle` |
| Transcript | Character about to speak | Three dots breathe | `duration-breath` |
| Trail card | Hover | Lifts 2px, `glow-soft`, arrow steps forward | `duration-kindle` |
| Trail card | Load | Rises in | `duration-rise` |
| Score | Reveal | Number counts up once; band fades in after | `duration-hush`, `ease-settle` |
| Rubric meter | Reveal | Fills, 120ms after the previous meter | `duration-hush`, `ease-settle` |
| Strategy picker | Select | Inner ring appears; check scales in | `duration-drift`, `ease-lift` |
| Switch | Toggle | Knob travels; track lights with `glow-lantern` | `duration-drift`, `ease-lift` |
| Checkbox | Check | Tick draws itself | `duration-drift` |
| Tabs | Select | Mark glides to the tab | `duration-drift`, `ease-lift` |
| Navigation | Arrive | Current icon kindles once | `duration-drift`, `ease-lift` |
| Field | Focus | Sill turns lantern, the well warms | `duration-kindle` |
| Toast | Arrive and wait | Rises in; time line runs down; pauses on hover or focus | `duration-rise` |
| Dialog | Open | Veil fades, panel rises | `duration-rise` |
| Streak tile | Load | Flame flickers; today's ember kindles | `duration-breath`, `ease-lift` |
| Lantern tile | Session finished | Flame kindles, then flickers; pool warms the pane | `duration-settle`, `ease-lift` |
| Cut card, quest tile | Hover or focus | Lifts 2px; gold edge glow and lantern halo | `duration-drift`, `ease-kindle` |
| Arcane sigil | Ambient | Turns once every 90 seconds behind tile icons and the streak flame | 90s linear |
| Empty state | Hover | Pane flame warms from `vein` to `flame` | `duration-settle` |
| Wick loader | Progress | Burn grows; flame leads it | `duration-settle`, `ease-settle` |
| Scene loader | Loading | Pane fills with light; steps change | `duration-night` |
| Skeleton | Loading | Light sweeps across | `duration-breath` |
| Scenery | Ambient | Lantern pool breathes | `duration-night` |
| Mark, live | Welcome, loading | Flame flickers | `duration-breath` |

### Rules

- Only `ease-lift` overshoots, and only on frame controls. Scenario, score and safety motion uses `ease-kindle` or `ease-settle`.
- No confetti, sparkles, coins, stars or sounds on a score. No shake on an error.
- No flashing: nothing changes brightness more than three times a second.
- No ambient motion behind a scenario, a transcript or a score.
- With `prefers-reduced-motion` or `data-motion="still"`, every loop stops, entrances become instant, the score appears at once and the indeterminate loader rests in the middle of its track.

### Keyframes

```css
@keyframes wk-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes wk-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes wk-flicker { 0%, 100% { transform: scaleY(1) scaleX(1); } 30% { transform: scaleY(1.08) scaleX(.96); } 55% { transform: scaleY(.95) scaleX(1.03); } 80% { transform: scaleY(1.04) scaleX(.98); } }
@keyframes wk-breath { 0%, 100% { transform: scale(1); opacity: .85; } 50% { transform: scale(1.06); opacity: 1; } }
@keyframes wk-ember { 0%, 100% { opacity: .3; transform: translateY(0); } 40% { opacity: 1; transform: translateY(-4px); } }
@keyframes wk-spin { to { transform: rotate(360deg); } }
@keyframes wk-shimmer { from { background-position: 150% 0; } to { background-position: -50% 0; } }
@keyframes wk-drift { 0% { left: -10%; } 100% { left: 100%; } }
@keyframes wk-wave { 0%, 100% { transform: scaleY(.35); } 50% { transform: scaleY(1); } }
@keyframes wk-kindle { from { opacity: 0; transform: scale(.6); } to { opacity: 1; transform: none; } }
@keyframes wk-pane-fill { from { transform: translateY(100%); } to { transform: translateY(0); } }
@keyframes wk-draw { from { stroke-dashoffset: 24; } to { stroke-dashoffset: 0; } }
@keyframes wk-pool { 0%, 100% { opacity: .7; transform: translate(-50%, 0) scale(1); } 50% { opacity: 1; transform: translate(-48%, -2%) scale(1.08); } }
@keyframes wk-countdown { from { width: 100%; } to { width: 0; } }
```

## 10. States, loading, errors and empty states

### State model

| State | How it looks | Rule |
| --- | --- | --- |
| Rest | The control's own inset (`inset-frost`, `inset-lantern`, `inset-well`) | Never an outline |
| Hover | Fill one step lighter, a glow (`glow-lantern` or `glow-soft`) | Pointer only; never the only cue |
| Focus | `focus-ring` after the control's inset | Always visible on keyboard focus |
| Pressed | `inset-press`, 1px travel | Replaces the inset for the press |
| Selected | `lantern-soft` fill, `lantern-text` label, or a 2px inner ring | Pair with `aria-selected`, `aria-current` or `checked` |
| Loading | Ember spinner or wick loader, label kept | `aria-busy`; ignore repeat presses |
| Disabled | `opacity-disabled` | Always explain why in nearby text |
| Error | `inset-well-error`, danger icon, a sentence in `danger` | Say how to fix it |
| Success | `steady` icon and word on `steady-soft` | Quiet. No celebration. |

### Voice orb states

| State | Fill | Status line | Button |
| --- | --- | --- | --- |
| Idle | `frost` | Ready when you are | Start speaking |
| Listening | `voice-you` with `glow-voice` | Listening | Stop speaking (pressed) |
| Thinking | `ground-raised`, embers | Thinking | Disabled |
| Speaking | `frost` with `glow-ai`, waveform | Dylan is speaking | Disabled |
| Paused | `ground-sunken` | Paused | Resume role-play |
| Blocked | `danger-soft`, mic-off | Microphone blocked | Offers typing instead |

### Loading states

| Situation | Pattern | Copy |
| --- | --- | --- |
| Opening the trail library | Skeleton cards | Loading trails (for screen readers) |
| Preparing a role-play | Scene loader | Setting the scene · Placing the people in the room · Your partner is getting into character |
| Connecting audio | Wick loader, unknown | Connecting to your role-play partner |
| Scoring | Wick loader, known; lantern button loading | Scoring your intervention |
| Saving a reflection | Button loading | Saving |
| Longer than 10 seconds | Add a quiet way back | Choose another trail |

### Errors

- Name what happened, then what to do: "Microphone blocked. Allow it in your browser settings, or type your reply instead."
- Errors that stop a session pause it and keep the transcript. Nothing is lost.
- Never use "Oops", humour or the light metaphor in an error.

### Empty states

- An unlit pane, a plain title, one optional `aside` line in the frame voice, and one action.
- "No lanterns lit yet. Finish a trail to light your first lantern." with the button "Find a trail".

## 11. Components

All components ship in one classic script that assigns `window.Wick` (React 18 UMD must load first) and one stylesheet loaded after `tokens.css`. Class names use the `wk-` prefix.

### Button

Four tones carved with inset shadows: `lantern` for the one primary action on a screen, `frost` for secondary actions, `quiet` for tertiary ones and `exit` for Step out.

**Consumer provides:** `tone` (`lantern`, `frost`, `quiet`, `exit`; default `frost`), children as the visible label, an optional leading `icon` or trailing `iconAfter` (any Wick icon name), `ornate` for gilded flourishes, `size="lg"` for the main call to action on a screen, `loading` with a `loadingLabel` for screen readers, and any native button attributes (`onClick`, `disabled`, `type`, `aria-label`).

- One `lantern` per screen. It is the light you walk toward: "Start role-play", "Light a lantern", "Save reflection". Text on it is `on-lantern`, at least 7:1 in every theme.
- `frost` uses `frost` with `inset-frost`. Its label identifies it, so it needs no boundary (WCAG 1.4.11).
- `quiet` is an underlined text action in `ink-link`. Use it for "Choose another trail" and other ways back.
- `exit` reads "Step out" with the door icon. It sits on `stratum-exit` and appears on every role-play and content note screen, in the same corner every time. Pressing it ends the session at once with no confirmation.
- Micro-interactions: hover kindles a glow in `duration-kindle` (`glow-lantern` or `glow-soft`); the lantern's icon flickers on hover; a trailing arrow moves 3px forward; pressing sinks the surface with `inset-press` and 1px of travel in `duration-flicker`; keyboard focus draws `focus-ring`.
- `ornate` adds small gilded flourishes at both ends. Use it for frame actions that open or close a chapter ("Walk your first trail", "Light a lantern"), never on the role-play stage or the result screen.
- Loading keeps the label and replaces the icon with the ember spinner. The button sets `aria-busy` and ignores presses until the work ends.
- Disabled buttons sit at `opacity-disabled` and always have a reason in nearby text.
- Minimum size `target-min` (44px) on every side. Icon-only buttons carry a plain `aria-label` ("Pause role-play").
- Labels are plain verbs about the task. Frame words such as "Light a lantern" are allowed only for frame actions; scenario actions use plain words ("Start role-play", "Try again").

### VoiceOrb

The voice control at the center of the role-play: one round lantern that shows who is speaking and what the app is doing.

**Consumer provides:** `state` (`idle`, `listening`, `thinking`, `speaking`, `paused`, `blocked`), `speaker` (the AI character's name, shown while it speaks), `level` (0 to 1, the live input level while listening; omit it and the orb simulates a level), `onToggle`, and `hint={false}` to hide the helper line.

- `idle`: a `frost` orb with the microphone. Hover adds `glow-soft`. Text: "Ready when you are".
- `listening`: the orb fills with `voice-you` and its halo (`glow-voice`) grows with your voice level, updated every frame. Text: "Listening". The button is `aria-pressed="true"`.
- `thinking`: three embers rise in turn over `duration-breath`. The button is disabled and the cursor shows progress.
- `speaking`: five bars in `voice-ai` move like a waveform and the halo (`glow-ai`) breathes. Text: "Dylan is speaking". Captions stream into the Transcript at the same time.
- `paused`: the orb sinks into `inset-well`. Nothing is recorded. Pressing resumes.
- `blocked`: copper `danger` text and `inset-well-error`, with a way forward ("type your reply instead").
- The status line is a polite live region, so every change of state is announced once. State changes cross-fade in `duration-settle`.
- Your voice is always amber and the AI's voice is always blue, and each also carries a word, so the speaker never depends on colour.
- Space toggles listening when the orb has focus. Hold-to-talk is an optional setting; tap-to-toggle is the default because it is easier for people with limited dexterity.
- Size: `orb` (112px) on phones, 144px from the grove breakpoint, 192px at the stage breakpoint.

### Timer

The 60-second countdown for a role-play, drawn as a ring that burns down.

**Consumer provides:** `total` seconds (default 60), either `running` to let the timer count itself or `remaining` to control it, and `onDone`.

- The ring uses `meter-fill` on a `ground-sunken` track at `stroke-ring` (6px). It burns linearly, one step per second.
- In the last ten seconds the ring turns `caution` and the word under the number changes from "left" to "wrap up". There is no flashing and no sound.
- The number is set in the `timer` style (DM Mono). The element has `role="timer"`; an assertive live region announces 30 seconds, 10 seconds and time up, once each.
- When time is up the role-play does not cut the person off mid-sentence. The current reply finishes, then the score loads.
- Size `timer` (88px). Place it top left on the role-play stage, opposite Step out.

### Transcript

The live caption log of a role-play: the AI character's lines on the left, yours on the right, in a sunken well.

**Consumer provides:** `lines` as `{ role: 'ai' | 'you' | 'note', speaker?, text }`, an optional `label`, and children for a trailing pending line (`DialogueLine` with `pending`).

- The well uses `ground-sunken` with `inset-well`. AI lines sit in `bubble-ai` (`frost`); your lines sit in `bubble-you` (`lantern-soft`). Text on both is `ink` in the `dialogue` style (18/28).
- Each line names its speaker above the bubble, with a dot in `voice-ai` or `voice-you`. Names are the scenario's own names: Dylan, Maya, Priya. They are never replaced with fantasy names.
- The corner nearest the speaker is cut small (`cut-bubble`); the other three use `radius-lg`.
- New lines rise 8px and fade in over `duration-rise`. While the character is about to speak, three dots breathe in `voice-ai` and the line is labelled "Dylan is speaking".
- `role="log"` with a polite live region announces each new line. The transcript stays visible after the session for review.
- Note lines (`role: 'note'`) mark events such as "Role-play started" in `ink-muted` caption type.

### DialogueLine

One spoken line in the transcript, with the speaker's name above a bubble.

**Consumer provides:** `role` (`ai`, `you`, `note`), `speaker` for AI lines, children as the words, or `pending` to show the breathing dots while the character is about to speak.

- Use the person's words exactly as spoken or transcribed. Do not tidy them.
- AI bubble: `bubble-ai`. Your bubble: `bubble-you`. Text: `ink`, `dialogue` style.
- Enters with the rise movement (`duration-rise`, `ease-kindle`).

### TrailCard

A scenario in the trail library: its plain title, the set-up, the people involved, a content note and the strategies it practises.

**Consumer provides:** `title`, `setup`, `overline` (for example "Trail 01 · Party"), `minutes`, `place`, `people`, `note` (the content note, listed plainly), `strategies` (an array of `direct`, `distract`, `delegate`, `delay`, `document`), `status` (`new` or `done`) and `href` or `onStart`.

- "Trail" is the frame word. Everything inside the card is content and stays plain: true names, true places, true situations. Write titles as what is happening ("Dylan keeps refilling Maya's cup"), in sentence case, with no wordplay.
- **Consumer may also set** `silhouette` (`soft`, `notch`, `scoop`, `arch`, `ticket`, `banner`; default `soft`), `ornament` (`none`, `corners`, `gilded`), `band` (`lantern`, `gold`, `arcane`, `moss`, `dew`) and `gem` (an arcane gem in the top right corner).
- The frame of the card is themed like a quest menu: gilded swirl corners, a crest with an arcane gem and a fading inner frame (`gilded`), a soft colour band across the top, and chamfered or carved silhouettes. The words inside stay plain.
- Use `gilded` for the one featured trail on a screen, `corners` for the rest of the library, and `notch` or `scoop` to set apart a chapter of trails. Bands mark the trail's setting (lantern for parties, arcane for online, gold for transit, moss for campus, dew for after the moment), never difficulty or a score.
- Ornate cards carry `rim-gilt` after `inset-raised`, so the tile stands well off the ground. Cut silhouettes are wrapped in `wk-cut-wrap`, which casts the drop shadow and the gold hover glow that `clip-path` would otherwise cut away.
- The content note sits in a sunken strip with the info icon and the words "Content note:". Show it on every card where the trail includes alcohol, assault, harassment, image abuse or spiking.
- A finished trail shows "Lantern lit" with a small flame in `lantern-text`. This marks practice alone: no score appears on the card.
- No trail is ever locked. Safety practice is never a reward to unlock.
- The whole card is one link (the title link stretches over it). Hover lifts the card 2px and adds `glow-soft`; the arrow moves 3px. Focus anywhere in the card draws `focus-ring` around the whole card.
- Cards rise in on load over `duration-rise`; cut cards lift 2px on hover and glow in `gold` and `lantern`. One card per row on phones, two from the sapling breakpoint, three from the grove breakpoint.

### ContentNote

The screen before a role-play begins: what the scenario contains, a clear start, a clear way back and a promise about stepping out.

**Consumer provides:** `title` (the scenario title), `lead` (the set-up), `items` (what the trail includes, in plain words), `onStart`, `onSkip`, and optional `startLabel` and `skipLabel`.

- Show it every time, including on repeat visits. Never skip it to save a tap.
- List content in plain, specific words ("Alcohol and someone who may be too drunk to consent"). Avoid euphemism and avoid graphic detail.
- The primary action is the `lantern` button "Start role-play". The secondary path is a `quiet` button "Choose another trail", with equal ease of reach.
- The last line always reads: "You can step out at any moment. Nothing is saved unless you finish." Keep that promise in the product.
- No ornaments and no frame words on this screen.

### Strategy

A tag for one of the five Ds, the bystander model taught on campuses: Direct, Distract, Delegate, Delay and Document.

**Consumer provides:** `d` (`direct`, `distract`, `delegate`, `delay`, `document`) and `variant="plain"` to drop the frost chip.

- Each strategy has a colour token (`d-direct`, `d-distract`, `d-delegate`, `d-delay`, `d-document`), a number badge (1 to 5, in `on-d`) and its name. Colour is never the only cue: the number and the word always travel together.
- Order is fixed: Direct, Distract, Delegate, Delay, Document.
- Use the standard names. Do not theme them.
- The colours mark categories and carry no grade. Never use a strategy colour to imply that one D is better than another.


### StrategyPicker

A radio group for choosing one of the five Ds, used in the reflection after a role-play.

**Consumer provides:** `legend`, `value` or `defaultValue`, `onChange`, and optional `options` to show a subset.

- Built on native radio inputs inside a `fieldset`, so arrow keys move between options and screen readers announce "Distract, radio button, 2 of 5".
- The selected option fills with `lantern-soft`, gains a 2px inner ring in its own `d-` colour, and a check draws in with `ease-lift`.
- Every option meets `target-min` (44px).

### ScoreReveal

The result of a role-play: one score, a plain band, a short summary and four rubric meters with coaching notes.

**Consumer provides:** `score`, `max` (default 100), `band` (a plain phrase), `summary`, `rubric` (an array of `{ label, value, max, note }`), `replayKey` to replay the reveal, and `animate={false}` to show it at rest.

- This is the moment the room goes quiet, so it is the calmest screen in the app. The number counts up over `duration-hush` (1400ms) with `ease-settle`, once. The band fades in after it. Rubric meters fill one after another, 120ms apart.
- No confetti, no sparkles, no sound, no stars, no colour that means good or bad. The meters and the number use `ink` and `meter-fill` only. The score evaluates a practice attempt; it never treats the scenario as a game.
- Bands: "Effective" (85 and above), "Effective, with room to grow" (70 to 84), "Partly effective" (50 to 69), "Keep practising" (below 50). Never use words such as "win", "fail", "perfect" or "level up".
- The rubric is Safety, Timing, Clarity and Care for the person, 25 points each. Notes name what the person did, then one thing to try next time. Use the scenario's names.
- Set the number in the `score` style with tabular figures: 72px, 56px on phones, 128px at the stage breakpoint. Place `space-16` above it.
- Screen readers hear the final score once, when the count finishes ("Score 78 out of 100. Effective, with room to grow."). The counting digits are hidden from them.
- With reduced motion the final values appear at once.
- Follow the score with the safety note for the trail and a Try again button. Never follow it with a streak or a reward.

### RubricMeter

One criterion of the score: its name, its value out of the maximum, a neutral bar and an optional coaching note.

**Consumer provides:** `label`, `value`, `max` (default 25), `note`, `delay` in ms for staggered reveals, and `animate`.

- The fill is `meter-fill` on `meter-track` with a 1px `edge` inset, so the end of the track is visible at 3:1 or more in every theme.
- `role="meter"` with min, max and now values, and the value is also printed as text in the `data` style.
- The bar fills over `duration-hush` with `ease-settle`. It never overshoots.

### Notice

An inline message for safety notes, confirmations, errors and information. Clinical and respectful, with zero whimsy.

**Consumer provides:** `tone` (`safety`, `caution`, `danger`, `steady`, `info`), `title`, children as the message, `action` (usually a Button), and `urgent` to announce it at once.

- Every tone carries an icon and words. Colour is never the only cue.
- `safety` and `caution`: `caution` text and icon on `caution-soft`. Use `safety` for the safety note at the end of every trail.
- `danger`: copper `danger` on `danger-soft`. Always offer a way forward in the action.
- `steady`: `steady` blue on `steady-soft` for saved and done.
- `info`: `ink` on `ground-raised`.
- Notices use `inset-frost` and `radius-lg`, no ornaments and no frame words. Write them as plain facts and instructions.
- `role="status"` for steady and danger; `role="alert"` only with `urgent`. Safety and info notices are static content.

### Toast

A short message that floats above the screen after an action, then leaves on its own.

**Consumer provides:** `tone` (`steady`, `danger`, `info`), `title`, children as one sentence, `duration` in ms (default 6000; `0` keeps it until dismissed) and `onClose`.

- Toasts rise in over `duration-rise` and sit on `stratum-signal` with `bleed-night`.
- A thin line in `edge` runs down the bottom edge to show the time left. Hover or keyboard focus pauses it (WCAG 2.2.1).
- Errors that block the session use `duration: 0` and stay until the person dismisses them.
- Never use a toast to celebrate a score.

### Dialog

A modal question that needs an answer before the person continues.

**Consumer provides:** `open`, `title`, children as one or two sentences, `actions` (Buttons, the safest first), and `onClose`.

- The `veil` scrim sits at `opacity-scrim` with `blur-veil`. The panel uses `ground-raised`, `inset-raised`, `bleed-night` and `radius-xl`, on `stratum-lantern`.
- Focus moves into the dialog, Tab stays inside it, Escape closes it and focus returns to where it was.
- Step out never opens a dialog. Use dialogs only for choices that discard work, such as leaving the reflection unsaved.
- Use a `frost` button for the destructive choice and a `quiet` button for staying. Do not put a `lantern` button on a dialog that discards work.

### StreakTile

Your practice streak: how many days in a row your wick has stayed lit, and this week's practice at a glance.

**Consumer provides:** `days`, `week` (seven booleans), `today` (index 0 to 6), `lanterns` (total finished sessions), `ornament` (default on), and optional `labels` and `dayNames`.

- Streaks reward practice alone. Count a day when the person finishes any trail, whatever the score.
- The tile uses the `cut-arch` silhouette with gilded swirl corners at its base, a `rim-gilt` edge and a slowly turning arcane sigil behind the flame. Pass `ornament={false}` for the plain version with `lantern-bracket` corners. It belongs to the frame: the grove (home) and Lanterns lit.
- The flame icon flickers gently. Today's ember kindles once with `ease-lift`. Lit days glow in `flame`; other days are sunken dots with an `edge` ring.
- When a streak ends, say so kindly and without loss words: "Your wick is ready when you are." Never shame a missed day and never send streak warnings at night.
- Each day is announced as "Wednesday: practised". The count reads "3 day".

### LanternTile

One finished session in Lanterns lit, drawn as a lantern pane that lights when the session is done.

**Consumer provides:** `title` (a short plain name for the session), `meta` (date and the strategy used), `lit={false}` for a trail not yet walked, and `ornament={false}` to drop the gilded corners.

- The tile uses the `cut-pane` silhouette: a pointed lantern top over a straight body.
- Lighting: the flame kindles with `ease-lift` over `duration-settle`, then flickers slowly, and a pool of `lantern-pool` light warms the pane behind it. This is the one frame reward in Wick, and it marks that practice happened.
- Never show the score on the tile. The score lives in the session detail, in plain type.
- An unlit tile shows the flame in `vein`.

### Field

A labelled text input or text area, carved into the surface as a well.

**Consumer provides:** `label`, `hint`, `error`, `multiline`, `maxLength` (shows a live count), `value` or `defaultValue`, `onChange`, and any native input attributes.

- The well uses `ground-sunken` with `inset-well`: a shadow under the top edge and a 2px `sill` along the bottom. No outline.
- Focus turns the sill lantern-coloured and warms the well (`inset-well-focus`) together with `focus-ring`, over `duration-kindle`.
- Errors use `inset-well-error`, the danger icon and a sentence in `danger` that says how to fix it. `aria-invalid` and `aria-describedby` are set for you.
- The character count turns into a polite live region when 20 characters remain.
- Placeholders hold examples. Instructions belong in the label or hint. The label always stays visible.

### Switch

An on and off setting that takes effect at once.

**Consumer provides:** `label`, `checked` or `defaultChecked`, `onChange`, `disabled`, and `stateText={false}` to hide the On and Off word.

- Native checkbox with `role="switch"`. Off: a sunken track with a 2px `sill` ring. On: the track fills with `lantern` and `glow-lantern`, and the knob turns `on-lantern`.
- The knob travels with `ease-lift` over `duration-drift`. The word On or Off sits beside it, so state never depends on colour.
- Use switches for settings such as Captions, Reduce motion and Stage mode. Use a Checkbox for agreements.

### Checkbox

A checkbox for agreements and independent options.

**Consumer provides:** `label`, `checked` or `defaultChecked`, `onChange`, `disabled`.

- A sunken box with a 2px `sill` ring. Checked, it fills with `lantern` and the tick draws itself over `duration-drift`.
- The whole label is the hit area, at least `target-min` tall.

### Tabs

A segmented set of views within one screen, such as filters on the trail library.

**Consumer provides:** `items` (`{ id, label, content }`), `label` for the tab list, `value` or `defaultValue`, `onChange`.

- The list sits in a sunken well. The selected tab lifts onto `frost` with a 2px lantern line along its base. The mark glides between tabs with `ease-lift` over `duration-drift`.
- Arrow keys, Home and End move between tabs (roving tabindex). The panel follows the selection.

### NavBar

The main navigation: a bottom bar on phones and a rail from the sapling breakpoint.

**Consumer provides:** `items` (`{ id, label, icon, href }`; defaults to the four Wick destinations), `value` or `defaultValue`, `onChange`, `variant` (`bar` or `rail`), `label`.

- The four destinations use frame words, because navigation is the frame: The grove (home), Trails, Lanterns lit and Field guide.
- The current item sets `aria-current="page"`, fills with `lantern-soft` and turns its label `lantern-text`. Its icon kindles once.
- Every item shows its word under the icon. Icon-only navigation is not allowed.
- Hide the navigation during a role-play. The role-play stage shows only the timer, the orb, the transcript and Step out.

### WickLoader

A progress bar drawn as a burning wick: the filled part is what has burned, and a small flame marks the leading edge.

**Consumer provides:** `label` (what is happening, in plain words), `value` (0 to 100) or nothing for an unknown duration.

- Track: `ground-sunken` with a 1px `edge` inset. Burn: `meter-fill`. Flame: `flame`, flickering over `duration-breath`.
- Known progress moves with `ease-settle` over `duration-settle`. Unknown progress sends the flame drifting along the track; with reduced motion it rests in the middle.
- `role="progressbar"` with the label as its name. Show the percentage only when the value is known.

### SceneLoader

The full loading state before a role-play: a lantern pane that slowly fills with light while each step is named.

**Consumer provides:** `title`, `steps` (short plain lines), `stepMs`.

- Steps describe the work in plain words: "Setting the scene", "Placing the people in the room", "Your partner is getting into character".
- The pane fills over `duration-night` with `ease-settle`. The status region announces each step politely.
- If loading takes longer than 10 seconds, add a `quiet` button "Choose another trail" below it.

### Skeleton

A placeholder for a card while its content loads.

**Consumer provides:** `lines` (body lines under the title bar).

- Bars use `ground-sunken` with a band of `frost-hover` light that sweeps across over `duration-breath`. With reduced motion the bars are still.
- Hidden from assistive technology; pair it with a status message such as "Loading trails".

### Spinner

Eight embers in a ring that brighten in turn. Used inside buttons and in tight spaces.

**Consumer provides:** `label` to make it a status message, otherwise it is decorative.

- Inherits `currentColor`. Use `flame` alone, or the button's text colour inside a button.
- Each ember fades over `duration-settle`, 80ms apart.

### EmptyState

What a screen shows when it has nothing yet: an unlit lantern pane, a plain title, one quiet line and a way forward.

**Consumer provides:** `title`, `aside` (one line in the `aside` style, optional), children as the explanation, `action`.

- The empty state belongs to the frame, so it may use the metaphor in its `aside` line. The title and explanation stay plain.
- The pane is drawn in `edge`; its flame rests in `vein` and warms to `flame` on hover.
- Always offer one action. Never leave a person on an empty screen with no next step.

### QuestTile

A quest-menu tile, like an inventory slot: a gilded, chamfered tile with a soft colour band, an icon set over a turning arcane sigil, a name, a small line under it and optional pips.

**Consumer provides:** `label`, `sub`, `icon` (any Wick icon) or `letter` (a short glyph such as a strategy number), `tone` (`lantern`, `gold`, `arcane`, `moss`, `dew`), `silhouette` (`notch`, `gem`, `scoop`; default `notch`), `pips` and `pipMax` with a `pipLabel` (for example "Walked 3 of 4"), `count` (a small badge such as "New"), `ornament={false}` to drop the gilded corners, and `onClick` or `href`.

- Use tiles for navigation through the frame: trail chapters (Parties, Transit, Online, Campus, After), the five Ds in the Field guide, and settings groups.
- Pips count practice, never performance: "Walked 3 of 4 trails". Never show a score, a rank or a rarity on a tile.
- Tones mark a category. They never grade.
- The tile uses `ground-raised` with `inset-raised` and `rim-gilt`; gilded corners at 30px; the icon sits in a sunken gem-cut well. Labels are set in Faculty Glyphic at 20px (the frame voice) and the sub line in DM Mono at 12px.
- Hover lifts the tile 2px with a gold glow; keyboard focus draws a 3px `focus` ring inside the rim. The whole tile is one button or link, named by its label, sub line and count.
- The sigil turns once every 90 seconds and stops with reduced motion.

### GildedHeading

A chapter heading for the frame: a gilded crest with an arcane gem, an optional eyebrow, a Faculty Glyphic title and a gilded divider.

**Consumer provides:** `title`, `sub` (eyebrow, three words at most), `level` (heading level, default 2). `GildedDivider` is the divider on its own.

- Use one per screen, above a group of trail cards or tiles in the grove, the trail library, Lanterns lit or the Field guide.
- Never above the role-play stage, a score or a safety note.
- The crest and divider are decorative and hidden from assistive technology; the title is a true heading.

### Mark

The Wick mark drawn inline with theme tokens: a lantern pane holding one flame on its wick.

**Consumer provides:** `size` in px, `live` for the slow flicker (welcome screen and loading only), `label` when the mark stands alone, and children (usually the Wordmark) for a lockup.

- Pane: `ground-raised` (Dawn: `pine`). Flame: `lantern-amber` with a `flame-core` center. Wick: `parchment`.
- Clear space equals the flame height. Minimum size 20px.
- The live flicker uses `ease-breath` over `duration-breath` and stops with reduced motion.

### Wordmark

"wick" in Faculty Glyphic at weight 400, drawn as outlines, with a flame in place of the dot on the i.

**Consumer provides:** `height` in px.

- Letters in `ink`, flame in `flame` with a `flame-core` center (Dawn: `lantern-amber` center).
- Always lowercase. Never set the name in another face, never stretch it, never add a tagline inside the lockup.
- In running text write the name as "Wick".

### Scenery

The frame's landscape: two treelines and a slow pool of lantern light, drawn inline so they follow the theme.

**Consumer provides:** `height`, `pool={false}` to drop the light, and children laid over the scenery.

- Far trees in `tree-far` at `opacity-scenery`; near trees in `tree-near`; the pool in `lantern-pool` at `opacity-pool`, blurred by `blur-glow`, breathing over `duration-night`.
- Use it in the grove (home) header, the welcome screen and empty states. Never behind a scenario, a transcript, a score or a safety note.
- Decorative and hidden from assistive technology.

### WickRule

The divider for the frame: two hairlines in `vein` that fade outward toward a small flame.

**Consumer provides:** nothing; it fills its container up to 360px.

- Use it once per screen at most, under a frame title or between sections of the grove. Never inside content surfaces.
- Hairline weight `ornament-rule`, flame height `ornament-flame`.

### Icon

The Wick icon set drawn inline: 29 icons on a 24px grid at `stroke-icon` (1.75px), round caps and joins, no fills.

**Consumer provides:** `name`, `size` (20 or 24), `className`.

- Icons inherit `currentColor`. Set colour with a text token: `ink`, `ink-muted`, `lantern-text`, a status token or a `d-` strategy token.
- Navigation: grove, trail, lantern, guide. Session: mic, mic-off, speaker, pause, play, replay, step-out, captions, timer. Strategies: direct, distract, delegate, delay, document. Status: steady, caution, danger, info. Utility: settings, theme, flame, close, arrow, chevron, check.
- Every icon is decorative (`aria-hidden`). Meaning comes from the adjacent word or the button's `aria-label`.

## 12. Accessibility and care

Wick targets WCAG 2.2 AAA where it applies, and treats emotional safety as part of accessibility.

### Perceivable

- Text tokens hold 7:1 or more on their grounds in all three themes. Focus rings, the `edge` token, the flame and both voice colours hold 3:1.
- Colour is never the only cue. Statuses carry icons and words. Strategies carry a number and a name. Speakers are named beside their voice colour.
- Captions are on by default. The transcript captions both voices live and stays available after the session.
- Every role-play can be answered by typing (press `T` on the stage, or the "Type your reply instead" action).
- Text resizes to 200% and reflows down to 320px wide.

### Operable

- Every control is reachable by keyboard in reading order. Focus is always visible.
- Targets are at least 44px (`target-min`); phone navigation and buttons are 48px.
- Keys on the role-play stage: `Space` speaks, `P` pauses, `T` types, `Escape` steps out.
- Timed role-plays never cut a person off mid-sentence, and the 60-second limit can be turned off in Settings (WCAG 2.2.1).
- Toasts pause while hovered or focused.
- No flashing content. Motion stops with reduced motion.

### Understandable

- Plain language, short sentences, sentence case.
- One primary action per screen.
- Errors say how to fix the problem.
- The five Ds use their standard names everywhere.

### Robust

- Native elements first: buttons, radio inputs, checkboxes with `role="switch"`, fieldsets, labels.
- Live regions: the orb status (polite), the transcript (`role="log"`), the timer marks (assertive at 30s, 10s and time up), the final score (once, after the count).
- `forced-colors` mode draws system outlines on controls and surfaces.

### Trauma-informed design

- A content note before every trail, listing what it contains in plain words. The person chooses to start.
- Step out on every role-play screen, in the same place, ending the session at once with no confirmation and nothing saved.
- No forced replays. Try again is always optional.
- The AI never escalates to violence, never continues after Step out and never comments on the user's own experiences.
- Results and reflections are private. Voice audio is deleted after 24 hours.
- The Field guide links to campus and local support services. Show them after any trail involving assault or image abuse.
- Coaching never blames. It names what worked, then one thing to try next.

### Keyboard map

| Key | Where | What it does |
| --- | --- | --- |
| Tab | Everywhere | Moves focus in reading order; the 3px ring is always visible |
| Space | Voice orb | Starts and stops listening |
| P | Role-play stage | Pauses and resumes |
| T | Role-play stage | Type your reply instead of speaking |
| Escape | Role-play stage | Step out at once; in a dialog, closes it |
| Arrow keys | Tabs, strategy picker | Move between options |

## 13. Scenarios and scoring

The content of Wick is the practice itself. It is written plainly and scored clinically.

### Writing a trail

- **Title:** what is happening, in sentence case, with true-to-life names. "Dylan keeps refilling Maya's cup."
- **Overline:** "Trail 01 · Party". The number and a one-word setting.
- **Set-up:** two or three sentences on where you are and the warning signs you notice.
- **Characters:** the AI plays one or more of three roles: the person causing harm, the uncomfortable friend and the passive onlooker. Each has a first name and a clear goal.
- **Content note:** a plain list of what the trail includes.
- **Strategies:** the Ds that fit, in order of how well they fit.
- **Safety note:** one sentence on when to choose Delegate or call for help.
- **Ending:** the role-play ends at 60 seconds or when the person has intervened and the moment has passed. It never continues into harm.

### Starter trails

| # | Title | Roles the AI plays | Fitting Ds |
| --- | --- | --- | --- |
| 01 | Dylan keeps refilling Maya's cup | Dylan (causing harm), Maya | Distract, Delegate, Direct |
| 02 | A man on the late train won't stop commenting | Rob (causing harm), Priya | Distract, Document, Delay |
| 03 | Jordan posts a photo in the group chat | Jordan (uncomfortable friend), the group | Direct, Delay, Document |
| 04 | Closing time at Lou's | A stranger, the bartender | Delegate, Direct |
| 05 | Your roommate laughs it off | Sam (uncomfortable friend) | Delay, Direct |
| 06 | Tess says it's not our business | Tess (passive onlooker) | Delegate, Distract |

### The rubric

| Criterion | Points | What it measures |
| --- | --- | --- |
| Safety | 25 | Did you keep yourself and the person safe? Did you avoid confronting someone alone in a risky space? |
| Timing | 25 | Did you act at the first clear warning sign? |
| Clarity | 25 | Was what you said or did clear and easy to follow? |
| Care for the person | 25 | Did you centre the person at risk: check in, offer a way out, ask what they need? |

### Bands

| Score | Band |
| --- | --- |
| 85 to 100 | Effective |
| 70 to 84 | Effective, with room to grow |
| 50 to 69 | Partly effective |
| 0 to 49 | Keep practising |

### Coaching notes

- Two sentences per criterion: what the person did, then one thing to try next time.
- Use the scenario's names. "Next time, stay with Maya after you leave the hallway."
- Never use "fail", "wrong", "should have", "win", "perfect", "level up" or points language.

### Safety notes

- Every result screen ends with the trail's safety note in a `safety` Notice.
- Default text: "Direct is for when you are safe. If someone is aggressive, has a weapon, or you are alone, choose Delegate. Contact staff, campus security or 911."
- Document only with the person's consent in mind, and give any record to them.

### Sample scenario data

```js
const trail = {
  overline: 'Trail 01 · Party',
  title: "Dylan keeps refilling Maya's cup",
  setup: 'A house party off campus. Dylan has handed Maya three drinks in an hour and keeps steering her toward the back hallway. She looks unsteady.',
  minutes: 'About 60 seconds', place: 'House party', people: 'Dylan, Maya',
  note: 'alcohol, pressure, unwanted attention',
  strategies: ['distract', 'delegate', 'direct']
};
const rubric = [
  { label: 'Safety', value: 23, max: 25, note: 'You kept your tone light and did not confront Dylan alone in a narrow hallway.' },
  { label: 'Timing', value: 20, max: 25, note: 'You stepped in after the third drink. Acting at the first sign of steering would have been easier.' },
  { label: 'Clarity', value: 18, max: 25, note: "Your request was clear. Saying Maya's name first got her attention quickly." },
  { label: 'Care for Maya', value: 17, max: 25, note: 'Next time, stay with her after you leave the hallway and ask what she needs.' }
];
```

## 14. Frame kit: silhouettes, ornaments, assets

The frame kit dresses the grove, the trail library, the Field guide, Lanterns lit, empty states and the pitch, including the outside of trail cards and tiles. It never appears on a content note, the role-play stage, the transcript, a score or a safety note.

### Logo

- The mark is a lantern pane holding one flame on its wick. The wordmark is "wick" in Faculty Glyphic 400 drawn as outlines, with a flame for the dot of the i.
- Files: `wick-mark.svg`, `wick-mark-dawn.svg`, `wick-wordmark.svg`, `wick-wordmark-dawn.svg`, `wick-lockup.svg`, `wick-lockup-dawn.svg`, `wick-app-icon.svg` (Logos group). Inline versions: the `Mark` and `Wordmark` components.
- Clear space equals the flame height. Minimum 20px for the mark, 64px wide for the wordmark.

### Silhouettes (scenery)

- `treeline-far.svg` and `treeline-near.svg`: layered pine rows. Inline: `Scenery`, bound to `tree-far` and `tree-near`.
- `hanging-lantern.svg`: the welcome screen and the Lanterns lit empty state.
- `clearing.svg`: a hill with a path opening, for the foot of the welcome screen.

### Card silhouettes

- `cut-soft`: the default card, and always the content note, score, rubric and safety notes.
- `cut-notch`: chamfered quest cards and chapter headers.
- `cut-scoop`: carved tablets for featured cards and the Field guide.
- `cut-gem`: octagon quest tiles.
- `cut-ticket`: session receipts and the weekly practice card.
- `cut-banner`: milestone cards with a pennant point.
- `cut-pane`: the lantern tile.
- `cut-arch`: the streak tile and the welcome card.
- `cut-bubble`: the speaker corner of dialogue bubbles.

### Gilded quest set

- `gilded-corner.svg`: swirl corners for cards (46px) and quest tiles (30px). Drawn by `.wk-ornate` through CSS masks in each theme's gold.
- `gilded-crest.svg`: scrolls around an arcane gem, top center of a `gilded` card and of `GildedHeading`.
- `gilded-divider.svg`: under chapter titles and at the foot of gilded cards (`GildedDivider`).
- `gilded-flourish.svg`: both ends of an `ornate` button.
- `arcane-sigil.svg`: the turning ringed star behind quest tile icons and the streak flame (`Sigil`).
- Levels: `ornament="corners"` for most cards, `ornament="gilded"` for the one featured card per screen. Bands (`lantern`, `gold`, `arcane`, `moss`, `dew`) name a setting, never a grade.

### Ornaments

- `wick-rule.svg`: the divider, once per screen at most. Inline: `WickRule`.
- `lantern-bracket.svg`: corners of the streak tile and the welcome card.
- `ember-row.svg`: three embers as a separator.
- `pane-frame.svg`: the lantern pane as a double hairline, behind empty states.

### Placement

| Surface | Scenery | Ornaments | Mark |
| --- | --- | --- | --- |
| Welcome and the grove | Yes | Gilded heading, gilded cards, quest tiles, wick rule | Lockup |
| Empty states, Lanterns lit | Optional | Gilded lantern and streak tiles, pane frame, embers | No |
| Trail library, Field guide | Header only | Gilded heading, quest tiles, ornate trail cards | No |
| Dialogs and settings | No | Notched header, gilded divider | No |
| Content note, role-play, transcript | No | No | No |
| Score, rubric, coaching, safety notes | No | No | No |
| Pitch deck, store listing | Yes | Wick rule | Lockup, app icon |

### Fonts

Faculty Glyphic (400), Mona Sans (variable, roman and italic) and DM Mono (400 and 500) are included as woff2 files under `fonts/`. All three are open source under the SIL Open Font License.

### Silhouettes

Scenery for the frame: the night grove that surrounds the app. Use them in the welcome screen, the grove (home) header, empty states and the cover of the pitch. They never appear behind a scenario, a transcript, a score or a safety note.

- `treeline-far.svg`: a soft row of distant pines on rolling ground, filled with `tree-far` night (#0c241b). Bottom of the grove header, at `opacity-scenery`.
- `treeline-near.svg`: a taller, darker row of pines in `tree-near` night (#020a07). Layered in front of the far row.
- `hanging-lantern.svg`: a lantern on a cord with its pane lit in `lantern-amber` and a `flame-core` flame. The welcome screen and the empty state of Lanterns lit.
- `clearing.svg`: a low hill with a path opening in the middle, in `tree-far` and `ground-raised`. The foot of the welcome screen and the stage breakpoint.

The bundle's `Scenery` component draws the same treelines inline and binds them to the `tree-far` and `tree-near` tokens, so they follow each theme. In the Dawn theme they turn to pale parchment hills. Silhouettes are decorative: mark them `aria-hidden="true"`.

### Ornaments

Quiet ornaments for the frame. They mark navigation and moments of rest. They never sit on a scenario card, a transcript, a score, a rubric or a safety note.

- `wick-rule.svg`: the wick rule. Two hairlines in `vein` night (#2a5444) fading outward, meeting a small flame in `lantern-amber` on a `ink-muted` wick. Between sections of the grove and under frame titles. Use it once per screen at most.
- `lantern-bracket.svg`: a rounded corner bracket, outer line in `edge` night (#6f9e86), inner in `vein`, with `lantern-amber` embers at each end. Rotate for the other corners. The welcome card and the streak tile only, at `ornament-bracket` (20px arm).
- `ember-row.svg`: three embers, the center one lit. A separator between frame items and the loading mark in tight spaces.
- `pane-frame.svg`: the lantern pane drawn as a double hairline with mullions. Behind the empty state of Lanterns lit and the welcome illustration.

The bundle draws the rule, bracket and embers inline with theme tokens. Ornaments are decorative: mark them `aria-hidden="true"`.

#### Gilded quest set

Gilded swirl ornaments in the fantasy quest-menu style, carried over from Enchanted Grove. Each file is drawn as a gold gradient from `gold-deep` (#7a5a22) through `gold-bright` (#f7e6ad) and `gold` (#d4b062). The component stylesheet draws the same forms through CSS masks, so in product they follow each theme's gold tokens.

- `gilded-corner.svg`: a double-line swirl corner with curled arm ends. Mirror it for the other three corners. Cards at 46px (`ornament-corner`), quest tiles at 30px, phones at 40px.
- `gilded-crest.svg`: paired scrolls around a socket set with an arcane gem in `gem` (#c690f5). Top center of the one gilded card per screen and of the gilded heading.
- `gilded-divider.svg`: a centered diamond with fading arms and curls. Under chapter titles and at the foot of gilded cards.
- `gilded-flourish.svg`: the small flourish at each end of an ornate button.
- `arcane-sigil.svg`: a ringed compass star in `gold` at a 0.9px stroke, Wick's mage and wizard motif. A slowly turning watermark at 28 to 35% opacity behind quest tile icons and the streak flame.

These dress the outside of trail cards, quest tiles, the streak and lantern tiles, chapter headings and dialog headers. They never sit on the content note, the role-play stage, the transcript, a score, a rubric or a safety note. All are decorative: `aria-hidden="true"` or empty alt text.

## 15. Iconography

24px grid, 2px safe margin, 1.75px stroke (`stroke-icon`), round caps and joins, no fills. Each file is drawn in `lantern-text` night (#ffcf7d) for preview. In product use the bundle draws the same paths inline with `currentColor`, so set colour with a text token (`ink`, `ink-muted`, `lantern-text`, `steady`, `caution`, `danger` or a `d-` strategy colour).

- `grove.svg`: The grove (home).
- `trail.svg`: Trails (the scenario library).
- `lantern.svg`: Lanterns lit (finished sessions).
- `guide.svg`: Field guide (the five Ds reference).
- `settings.svg`: Settings.
- `theme.svg`: Theme switcher.
- `mic.svg`: Start speaking; microphone on.
- `mic-off.svg`: Microphone muted or blocked.
- `speaker.svg`: The AI character is speaking.
- `pause.svg`: Pause the role-play.
- `play.svg`: Resume.
- `replay.svg`: Try this trail again.
- `step-out.svg`: Step out: leave the role-play at once.
- `captions.svg`: Captions on or off.
- `timer.svg`: Role-play time.
- `flame.svg`: Practice streak (your wick).
- `direct.svg`: Direct: say something.
- `distract.svg`: Distract: create a diversion.
- `delegate.svg`: Delegate: get someone else.
- `delay.svg`: Delay: check in after.
- `document.svg`: Document: note what happened.
- `steady.svg`: Success, with `steady`.
- `caution.svg`: Caution and safety notes, with `caution`.
- `danger.svg`: Errors and risks, with `danger`.
- `info.svg`: Information.
- `close.svg`: Close or dismiss.
- `arrow.svg`: Continue.
- `chevron.svg`: Open a row or card.
- `check.svg`: Selected or done.

Icon-only buttons always carry a plain `aria-label` ("Pause role-play", "Step out"). Status icons always sit beside a word.


## 16. Appendices

### Appendix A: tokens.css

```css
/* Wick tokens. Set data-theme="night" or "dawn" on the root. Font files: fonts/*.woff2 */
:root, [data-theme="night"] {
  --night-forest: #06140f;
  --pine: #0f2a20;
  --moss: #3e6b48;
  --lichen: #b7ddb0;
  --lantern-amber: #ffbe4d;
  --ember: #e08a1e;
  --flame-core: #fff1c9;
  --parchment: #f4efe3;
  --dew-blue: #a6d8f3;
  --copper: #f2b38a;
  --ground: #020a06;
  --ground-raised: #1c4535;
  --ground-sunken: #010503;
  --veil: #020806;
  --frost: #21503d;
  --frost-hover: #275a46;
  --sill: #8fbfa5;
  --vein: #2f5d4b;
  --edge: #7aa98f;
  --ink: #fbf8f0;
  --ink-muted: #e3ece5;
  --ink-link: #ffdea6;
  --lantern: #ffbe4d;
  --lantern-hover: #ffcb6e;
  --on-lantern: #1a0f02;
  --lantern-text: #ffdfa2;
  --lantern-soft: #3a2a0f;
  --flame: #ffbe4d;
  --focus: #ffe3a3;
  --voice-you: #ffbe4d;
  --voice-ai: #a6d8f3;
  --bubble-you: var(--lantern-soft);
  --bubble-ai: var(--frost);
  --steady: #c6e6f8;
  --steady-soft: #12304a;
  --caution: #f1eeab;
  --caution-soft: #2f3318;
  --danger: #fcdcc4;
  --danger-soft: #3f2219;
  --d-direct: #ffdfa2;
  --d-distract: #a6f0f3;
  --d-delegate: #f7daf4;
  --d-delay: #dee1fd;
  --d-document: #d8f3d5;
  --on-d: #06140f;
  --meter-fill: #dfe9e2;
  --meter-track: var(--ground-sunken);
  --gold-deep: #7a5a22;
  --gold: #d4b062;
  --gold-bright: #f7e6ad;
  --gem: #c690f5;
  --gem-text: #e8cffc;
  --gem-soft: #3a1d4f;
  --tree-far: #0b2219;
  --tree-near: #010604;
  --lantern-pool: #ffbe4d;
  --inset-frost: inset 0 1px 1px #f4efe338, inset 0 -12px 22px -12px #000000c7;
  --inset-raised: inset 0 1px 0 #f4efe338, inset 0 0 0 1px #7aa98f2e, inset 0 -18px 30px -20px #000000d9, 0 16px 32px -18px #000000;
  --inset-well: inset 0 3px 8px #000000d1, inset 0 -2px 0 #8fbfa5;
  --inset-well-focus: inset 0 3px 8px #000000d1, inset 0 -2px 0 #ffbe4d, inset 0 -12px 16px -12px #ffbe4d73;
  --inset-well-error: inset 0 3px 8px #000000d1, inset 0 -2px 0 #f7c6a3, inset 0 0 18px #f7c6a326;
  --inset-lantern: inset 0 1px 1px #fff1c9f2, inset 0 -8px 14px -6px #b8650aa6;
  --inset-press: inset 0 4px 12px #000000db;
  --rim-gilt: inset 0 0 0 1px #d4b06280, inset 0 0 0 4px #020a06, inset 0 0 0 5px #d4b06240;
  --glow-gem: 0 0 0 1.5px #d4b062, 0 0 12px #c690f5;
  --glow-lantern: 0 0 6px #ffbe4d6b, 0 0 32px #ffbe4d47;
  --glow-soft: 0 0 0 1px #ffbe4d1f, 0 10px 28px -12px #ffbe4d38;
  --glow-voice: 0 0 0 8px #ffbe4d2e, 0 0 48px 10px #ffbe4d4d;
  --glow-ai: 0 0 0 8px #a6d8f326, 0 0 44px 8px #a6d8f340;
  --bleed-night: 0 24px 48px -12px #000000e6;
  --focus-ring: 0 0 0 2px #020a06, 0 0 0 5px #ffe3a3;
}
[data-theme="dawn"] {
  --night-forest: #06140f;
  --pine: #0f2a20;
  --moss: #3e6b48;
  --lichen: #b7ddb0;
  --lantern-amber: #ffbe4d;
  --ember: #e08a1e;
  --flame-core: #fff1c9;
  --parchment: #f4efe3;
  --dew-blue: #a6d8f3;
  --copper: #f2b38a;
  --ground: #e2d9c5;
  --ground-raised: #fffdf8;
  --ground-sunken: #dad1bc;
  --veil: #1b2a22;
  --frost: #efe7d6;
  --frost-hover: #e5dbc6;
  --sill: #4d6a5a;
  --vein: #c4b99f;
  --edge: #5b6f63;
  --ink: #0f231a;
  --ink-muted: #283a30;
  --ink-link: #5a2e00;
  --lantern: #6e3b00;
  --lantern-hover: #5c3100;
  --on-lantern: #fff8ea;
  --lantern-text: #542d00;
  --lantern-soft: #f7e6c4;
  --flame: #a85600;
  --focus: #0f231a;
  --voice-you: #6e3b00;
  --voice-ai: #0e3b5e;
  --bubble-you: var(--lantern-soft);
  --bubble-ai: var(--frost);
  --steady: #0e3b5e;
  --steady-soft: #dceaf5;
  --caution: #3d3600;
  --caution-soft: #efecc9;
  --danger: #682210;
  --danger-soft: #f6e3da;
  --d-direct: #542d00;
  --d-distract: #063c41;
  --d-delegate: #5a2254;
  --d-delay: #2c3377;
  --d-document: #193f23;
  --on-d: #ffffff;
  --meter-fill: #1f3329;
  --meter-track: var(--ground-sunken);
  --gold-deep: #5e4410;
  --gold: #8f6b1e;
  --gold-bright: #c39a3e;
  --gem: #7b2f92;
  --gem-text: #5e1f72;
  --gem-soft: #f3e3f7;
  --tree-far: #d0c6b0;
  --tree-near: #bdb197;
  --lantern-pool: #f0b45a;
  --inset-frost: inset 0 1px 1px #ffffffd9, inset 0 -12px 20px -12px #6b5a3a4d;
  --inset-raised: inset 0 1px 0 #ffffff, inset 0 0 0 1px #8f6b1e24, inset 0 -18px 30px -22px #6b5a3a40, 0 14px 28px -16px #5e44104d;
  --inset-well: inset 0 3px 8px #3a2e1a38, inset 0 -2px 0 #4d6a5a;
  --inset-well-focus: inset 0 3px 8px #3a2e1a38, inset 0 -2px 0 #6e3b00, inset 0 -12px 16px -12px #e08a1e59;
  --inset-well-error: inset 0 3px 8px #3a2e1a38, inset 0 -2px 0 #7a2a14, inset 0 0 16px #7a2a141f;
  --inset-lantern: inset 0 1px 1px #ffd9a159, inset 0 -8px 14px -6px #2a1400bf;
  --inset-press: inset 0 4px 10px #3a2e1a5c;
  --rim-gilt: inset 0 0 0 1px #8f6b1ea6, inset 0 0 0 4px #fffdf8, inset 0 0 0 5px #8f6b1e4d;
  --glow-gem: 0 0 0 1.5px #8f6b1e, 0 0 10px #7b2f9266;
  --glow-lantern: 0 6px 20px -6px #e08a1e73;
  --glow-soft: 0 10px 24px -12px #6b5a3a59;
  --glow-voice: 0 0 0 8px #e08a1e26, 0 0 40px 8px #e08a1e40;
  --glow-ai: 0 0 0 8px #0e3b5e1f, 0 0 36px 6px #0e3b5e33;
  --bleed-night: 0 20px 40px -14px #3a2e1a4d;
  --focus-ring: 0 0 0 2px #e2d9c5, 0 0 0 5px #0f231a;
}
[data-theme="contrast"] {
  --night-forest: #06140f;
  --pine: #0f2a20;
  --moss: #3e6b48;
  --lichen: #b7ddb0;
  --lantern-amber: #ffbe4d;
  --ember: #e08a1e;
  --flame-core: #fff1c9;
  --parchment: #f4efe3;
  --dew-blue: #a6d8f3;
  --copper: #f2b38a;
  --ground: #000000;
  --ground-raised: #000000;
  --ground-sunken: #000000;
  --veil: #000000;
  --frost: #000000;
  --frost-hover: #1a1a1a;
  --sill: #ffffff;
  --vein: #8a8a8a;
  --edge: #ffffff;
  --ink: #ffffff;
  --ink-muted: #ececec;
  --ink-link: #ffe27a;
  --lantern: #ffd700;
  --lantern-hover: #ffe95c;
  --on-lantern: #000000;
  --lantern-text: #ffd700;
  --lantern-soft: #000000;
  --flame: #ffd700;
  --focus: #00e5ff;
  --voice-you: #ffd700;
  --voice-ai: #9fdfff;
  --bubble-you: var(--lantern-soft);
  --bubble-ai: var(--frost);
  --steady: #9fdfff;
  --steady-soft: #000000;
  --caution: #fff36b;
  --caution-soft: #000000;
  --danger: #ffb38a;
  --danger-soft: #000000;
  --d-direct: #ffd700;
  --d-distract: #7ff6ff;
  --d-delegate: #ffc4f6;
  --d-delay: #d0d6ff;
  --d-document: #b8ffb0;
  --on-d: #000000;
  --meter-fill: #ffffff;
  --meter-track: var(--ground-sunken);
  --gold-deep: #b8860b;
  --gold: #ffd700;
  --gold-bright: #fff3a0;
  --gem: #e3a6ff;
  --gem-text: #efcbff;
  --gem-soft: #000000;
  --tree-far: #000000;
  --tree-near: #000000;
  --lantern-pool: #000000;
  --inset-frost: inset 0 0 0 2px #ffffff;
  --inset-raised: inset 0 0 0 2px #ffffff;
  --inset-well: inset 0 0 0 2px #ffffff;
  --inset-well-focus: inset 0 0 0 3px #00e5ff;
  --inset-well-error: inset 0 0 0 3px #ffb38a;
  --inset-lantern: inset 0 0 0 2px #000000;
  --inset-press: inset 0 0 0 4px #00e5ff;
  --rim-gilt: inset 0 0 0 2px #ffd700;
  --glow-gem: 0 0 0 2px #ffd700;
  --glow-lantern: 0 0 0 2px #ffd700;
  --glow-soft: 0 0 0 2px #ffffff;
  --glow-voice: 0 0 0 4px #ffd700;
  --glow-ai: 0 0 0 4px #9fdfff;
  --bleed-night: 0 0 0 2px #ffffff;
  --focus-ring: 0 0 0 2px #000000, 0 0 0 5px #00e5ff;
}
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --radius-xs: 2px;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-round: 50%;
  --stroke-hairline: 1px;
  --stroke-icon: 1.75px;
  --stroke-sill: 2px;
  --stroke-focus: 3px;
  --stroke-ring: 6px;
  --blur-veil: 16px;
  --blur-glow: 32px;
  --blur-night: 72px;
  --stratum-ground: 0;
  --stratum-trees: 10;
  --stratum-path: 20;
  --stratum-veil: 30;
  --stratum-lantern: 40;
  --stratum-signal: 50;
  --stratum-exit: 60;
  --opacity-grain: 0.03;
  --opacity-pool: 0.16;
  --opacity-scenery: 0.9;
  --opacity-scrim: 0.8;
  --opacity-disabled: 0.5;
  --duration-flicker: 100ms;
  --duration-kindle: 180ms;
  --duration-drift: 260ms;
  --duration-rise: 420ms;
  --duration-settle: 640ms;
  --duration-hush: 1400ms;
  --duration-breath: 2400ms;
  --duration-night: 16000ms;
  --ease-kindle: cubic-bezier(0.2, 0.7, 0.2, 1);
  --ease-settle: cubic-bezier(0.3, 0, 0.2, 1);
  --ease-breath: cubic-bezier(0.45, 0, 0.55, 1);
  --ease-lift: cubic-bezier(0.34, 1.25, 0.64, 1);
  --bp-sprout: 0px;
  --bp-sapling: 600px;
  --bp-grove: 960px;
  --bp-canopy: 1280px;
  --bp-stage: 1600px;
  --target-min: 44px;
  --target-comfort: 48px;
  --icon-sm: 20px;
  --icon-md: 24px;
  --avatar: 48px;
  --orb: 112px;
  --timer: 88px;
  --measure: 68ch;
  --cut-soft: 16px;
  --cut-pane: 50%;
  --cut-arch: 120px;
  --cut-notch: 14px;
  --cut-scoop: 16px;
  --cut-ticket: 10px;
  --cut-banner: 18px;
  --cut-gem: 22%;
  --cut-bubble: 4px;
  --ornament-corner: 46px;
  --ornament-inset: 6px;
  --ornament-crest: 132px;
  --ornament-frame: 1px;
  --ornament-sigil: 120px;
  --ornament-rule: 1px;
  --ornament-flame: 10px;
  --ornament-bracket: 20px;
  --ornament-ember: 4px;
  --font-display: "Faculty Glyphic", Georgia, serif;
  --font-sans: "Mona Sans", "Helvetica Neue", Arial, sans-serif;
  --font-mono: "DM Mono", ui-monospace, Menlo, monospace;
}
@font-face { font-family: "Faculty Glyphic"; src: url("fonts/FacultyGlyphic-Regular.woff2") format("woff2"); font-weight: 400; font-style: normal; font-display: swap; }
@font-face { font-family: "Mona Sans"; src: url("fonts/MonaSans-Variable.woff2") format("woff2"); font-weight: 200 900; font-style: normal; font-display: swap; }
@font-face { font-family: "Mona Sans"; src: url("fonts/MonaSans-Italic-Variable.woff2") format("woff2"); font-weight: 200 900; font-style: italic; font-display: swap; }
@font-face { font-family: "DM Mono"; src: url("fonts/DMMono-Regular.woff2") format("woff2"); font-weight: 400; font-style: normal; font-display: swap; }
@font-face { font-family: "DM Mono"; src: url("fonts/DMMono-Medium.woff2") format("woff2"); font-weight: 500; font-style: normal; font-display: swap; }
.hero { font-family: var(--font-display); font-size: 56px; line-height: 60px; font-weight: 400; letter-spacing: -0.01em; }
.title { font-family: var(--font-display); font-size: 40px; line-height: 44px; font-weight: 400; }
.heading { font-family: var(--font-display); font-size: 28px; line-height: 34px; font-weight: 400; }
.aside { font-family: var(--font-display); font-size: 20px; line-height: 28px; font-weight: 400; }
.score { font-family: var(--font-sans); font-size: 72px; line-height: 72px; font-weight: 600; letter-spacing: -0.02em; }
.scenario-title { font-family: var(--font-sans); font-size: 24px; line-height: 30px; font-weight: 650; }
.subtitle { font-family: var(--font-sans); font-size: 20px; line-height: 28px; font-weight: 600; }
.dialogue { font-family: var(--font-sans); font-size: 18px; line-height: 28px; font-weight: 420; }
.body-lg { font-family: var(--font-sans); font-size: 18px; line-height: 28px; font-weight: 400; }
.body { font-family: var(--font-sans); font-size: 16px; line-height: 26px; font-weight: 400; }
.label { font-family: var(--font-sans); font-size: 15px; line-height: 20px; font-weight: 600; letter-spacing: 0.01em; }
.caption { font-family: var(--font-sans); font-size: 14px; line-height: 20px; font-weight: 450; }
.timer { font-family: var(--font-mono); font-size: 20px; line-height: 24px; font-weight: 500; letter-spacing: 0.02em; }
.data { font-family: var(--font-mono); font-size: 14px; line-height: 20px; font-weight: 400; letter-spacing: 0.02em; }
.overline { font-family: var(--font-mono); font-size: 12px; line-height: 16px; font-weight: 500; letter-spacing: 0.12em; }
```

### Appendix B: tokens.json

```json
{
 "name": "Wick",
 "version": 1,
 "meta": {
  "source": "Built from the Enchanted Grove design system (fonts, inset-shadow method and source hues) and the Wick brief."
 },
 "color": {
  "themes": [
   {
    "id": "night",
    "name": "Night grove (default)"
   },
   {
    "id": "dawn",
    "name": "Dawn (light)"
   }
  ],
  "tokens": [
   {
    "name": "night-forest",
    "value": "#06140f",
    "usage": "Source hue. The deep forest at night: the page ground of the default theme and the base of every silhouette layer."
   },
   {
    "name": "pine",
    "value": "#0f2a20",
    "usage": "Source hue. Raised forest green used for illustration fields and the app icon ground."
   },
   {
    "name": "moss",
    "value": "#3e6b48",
    "usage": "Source hue inherited from Enchanted Grove. Illustration and silhouette accents only. Holds less than 4.5:1 on the night grounds, so it is never text."
   },
   {
    "name": "lichen",
    "value": "#b7ddb0",
    "usage": "Source hue inherited from Enchanted Grove. Pale green for illustration and the Document strategy on dark grounds."
   },
   {
    "name": "lantern-amber",
    "value": "#ffbe4d",
    "usage": "Source hue. The lantern light, inherited from the Enchanted Grove marigold flare. The single accent of the brand: the primary action, the listening halo and the flame in the mark."
   },
   {
    "name": "ember",
    "value": "#e08a1e",
    "usage": "Source hue. The deeper orange at the base of the flame in the mark and in glows on the Dawn theme. Decorative only."
   },
   {
    "name": "flame-core",
    "value": "#fff1c9",
    "usage": "Source hue. The pale center of the flame in the mark and the hottest point of the wick loader."
   },
   {
    "name": "parchment",
    "value": "#f4efe3",
    "usage": "Source hue. Used wherever white would be: text on the night grounds and the Dawn page tint."
   },
   {
    "name": "dew-blue",
    "value": "#a6d8f3",
    "usage": "Source hue inherited from Enchanted Grove. The voice of the AI character and the steady (success) state. Blue keeps success apart from danger without relying on red and green."
   },
   {
    "name": "copper",
    "value": "#f2b38a",
    "usage": "Source hue inherited from Enchanted Grove. The danger state. Copper reads as serious without alarm red."
   },
   {
    "name": "ground",
    "value": {
     "night": "#020a06",
     "dawn": "#e2d9c5",
     "contrast": "#000000"
    },
    "usage": "Page ground. Night: the deepest night forest. Dawn: aged parchment, deep enough that cards stand off it. High contrast: black."
   },
   {
    "name": "ground-raised",
    "value": {
     "night": "#1c4535",
     "dawn": "#fffdf8",
     "contrast": "#000000"
    },
    "usage": "Cards, tiles, sheets, menus, dialogs and toasts. Set well apart from `ground` by lightness (night 2.1:1, Dawn 1.4:1 plus the `rim-gilt` edge) so every tile reads as its own object."
   },
   {
    "name": "ground-sunken",
    "value": {
     "night": "#010503",
     "dawn": "#dad1bc",
     "contrast": "#000000"
    },
    "usage": "Fields, the transcript well, meter tracks and the track of the wick loader. One stratum below `ground`."
   },
   {
    "name": "veil",
    "value": {
     "night": "#020806",
     "dawn": "#1b2a22",
     "contrast": "#000000"
    },
    "usage": "Scrim color behind dialogs and sheets, applied at `opacity-scrim`."
   },
   {
    "name": "frost",
    "value": {
     "night": "#21503d",
     "dawn": "#efe7d6",
     "contrast": "#000000"
    },
    "usage": "Fill of the secondary (frost) button, the AI dialogue bubble and selectable chips. Carries `inset-frost`."
   },
   {
    "name": "frost-hover",
    "value": {
     "night": "#275a46",
     "dawn": "#e5dbc6",
     "contrast": "#1a1a1a"
    },
    "usage": "Frost fill under pointer hover."
   },
   {
    "name": "sill",
    "value": {
     "night": "#8fbfa5",
     "dawn": "#4d6a5a",
     "contrast": "#ffffff"
    },
    "usage": "The 2px lower edge that `inset-well` paints inside fields, and the off track of switches. At least 3:1 on `ground-sunken` in every theme."
   },
   {
    "name": "vein",
    "value": {
     "night": "#2f5d4b",
     "dawn": "#c4b99f",
     "contrast": "#8a8a8a"
    },
    "usage": "Decorative hairlines: dividers, table rules, chart gridlines. Below 3:1 on purpose, so it never carries meaning alone."
   },
   {
    "name": "edge",
    "value": {
     "night": "#7aa98f",
     "dawn": "#5b6f63",
     "contrast": "#ffffff"
    },
    "usage": "Meaningful boundaries: chart outlines, the meter track edge and every surface edge. At least 3:1 against `ground`, `ground-raised` and `ground-sunken`."
   },
   {
    "name": "ink",
    "value": {
     "night": "#fbf8f0",
     "dawn": "#0f231a",
     "contrast": "#ffffff"
    },
    "usage": "Primary text and headings on `ground`, `ground-raised`, `ground-sunken`, `frost` and `bubble-you`. At least 10:1 in every theme."
   },
   {
    "name": "ink-muted",
    "value": {
     "night": "#e3ece5",
     "dawn": "#283a30",
     "contrast": "#ececec"
    },
    "usage": "Secondary text, metadata, helper text and placeholders on all grounds and on `frost`. At least 7:1 in every theme (WCAG AAA)."
   },
   {
    "name": "ink-link",
    "value": {
     "night": "#ffdea6",
     "dawn": "#5a2e00",
     "contrast": "#ffe27a"
    },
    "usage": "Links and quiet buttons on all grounds, always underlined. At least 7:1 in every theme."
   },
   {
    "name": "lantern",
    "value": {
     "night": "#ffbe4d",
     "dawn": "#6e3b00",
     "contrast": "#ffd700"
    },
    "usage": "The lantern: fill of the one primary button per screen, the switch on state and the listening voice orb. Pair it with `on-lantern` text."
   },
   {
    "name": "lantern-hover",
    "value": {
     "night": "#ffcb6e",
     "dawn": "#5c3100",
     "contrast": "#ffe95c"
    },
    "usage": "Lantern fill under pointer hover, paired with `glow-lantern`."
   },
   {
    "name": "on-lantern",
    "value": {
     "night": "#1a0f02",
     "dawn": "#fff8ea",
     "contrast": "#000000"
    },
    "usage": "Text and icons on `lantern` and `lantern-hover`. At least 7:1 in every theme."
   },
   {
    "name": "lantern-text",
    "value": {
     "night": "#ffdfa2",
     "dawn": "#542d00",
     "contrast": "#ffd700"
    },
    "usage": "The lantern as text: the active navigation label, the streak count, the Direct strategy and frame headings that need warmth. On all grounds, at least 7:1."
   },
   {
    "name": "lantern-soft",
    "value": {
     "night": "#3a2a0f",
     "dawn": "#f7e6c4",
     "contrast": "#000000"
    },
    "usage": "Soft amber ground behind `lantern-text` or `ink`: the selected navigation row, the streak tile and your own dialogue bubble."
   },
   {
    "name": "flame",
    "value": {
     "night": "#ffbe4d",
     "dawn": "#a85600",
     "contrast": "#ffd700"
    },
    "usage": "The flame in the mark, the wick loader head and the streak glyph. Decorative or paired with text; at least 3:1 on `ground` in every theme."
   },
   {
    "name": "focus",
    "value": {
     "night": "#ffe3a3",
     "dawn": "#0f231a",
     "contrast": "#00e5ff"
    },
    "usage": "The keyboard focus ring colour, drawn by `focus-ring` with a ground-coloured band inside it. At least 3:1 on every ground in every theme."
   },
   {
    "name": "voice-you",
    "value": {
     "night": "#ffbe4d",
     "dawn": "#6e3b00",
     "contrast": "#ffd700"
    },
    "usage": "Your voice: the listening orb, your waveform and the Speaking label beside you. Always paired with the word Listening or You."
   },
   {
    "name": "voice-ai",
    "value": {
     "night": "#a6d8f3",
     "dawn": "#0e3b5e",
     "contrast": "#9fdfff"
    },
    "usage": "The AI character's voice: its waveform and the speaking indicator beside its name. Always paired with the character's name."
   },
   {
    "name": "bubble-you",
    "value": "{lantern-soft}",
    "usage": "Fill of your dialogue bubble in the transcript. An alias of `lantern-soft`; text on it is `ink`."
   },
   {
    "name": "bubble-ai",
    "value": "{frost}",
    "usage": "Fill of the AI character's dialogue bubble. An alias of `frost`; text on it is `ink`."
   },
   {
    "name": "steady",
    "value": {
     "night": "#c6e6f8",
     "dawn": "#0e3b5e",
     "contrast": "#9fdfff"
    },
    "usage": "Success and saved states (\"Session saved\"). Text on all grounds and on `steady-soft`, at least 7:1. Always carries the check icon and a word."
   },
   {
    "name": "steady-soft",
    "value": {
     "night": "#12304a",
     "dawn": "#dceaf5",
     "contrast": "#000000"
    },
    "usage": "Ground of a success notice or toast, behind `steady` or `ink`."
   },
   {
    "name": "caution",
    "value": {
     "night": "#f1eeab",
     "dawn": "#3d3600",
     "contrast": "#fff36b"
    },
    "usage": "Caution and safety notes (\"Check your own safety first\"). Text on all grounds and on `caution-soft`, at least 7:1. Always carries the caution icon and a word."
   },
   {
    "name": "caution-soft",
    "value": {
     "night": "#2f3318",
     "dawn": "#efecc9",
     "contrast": "#000000"
    },
    "usage": "Ground of a safety or caution note, behind `caution` or `ink`."
   },
   {
    "name": "danger",
    "value": {
     "night": "#fcdcc4",
     "dawn": "#682210",
     "contrast": "#ffb38a"
    },
    "usage": "Errors and risks that need action now (\"Microphone blocked\"). Copper, a calm warning hue. Text on all grounds and on `danger-soft`, at least 7:1. Always carries the danger icon and a word."
   },
   {
    "name": "danger-soft",
    "value": {
     "night": "#3f2219",
     "dawn": "#f6e3da",
     "contrast": "#000000"
    },
    "usage": "Ground of an error notice, behind `danger` or `ink`."
   },
   {
    "name": "d-direct",
    "value": {
     "night": "#ffdfa2",
     "dawn": "#542d00",
     "contrast": "#ffd700"
    },
    "usage": "Strategy colour for Direct. Used for the D badge and as text on all grounds. Every strategy also carries its letter glyph and its name, so colour is never the only cue."
   },
   {
    "name": "d-distract",
    "value": {
     "night": "#a6f0f3",
     "dawn": "#063c41",
     "contrast": "#7ff6ff"
    },
    "usage": "Strategy colour for Distract. Badge fill and text on all grounds."
   },
   {
    "name": "d-delegate",
    "value": {
     "night": "#f7daf4",
     "dawn": "#5a2254",
     "contrast": "#ffc4f6"
    },
    "usage": "Strategy colour for Delegate. Badge fill and text on all grounds."
   },
   {
    "name": "d-delay",
    "value": {
     "night": "#dee1fd",
     "dawn": "#2c3377",
     "contrast": "#d0d6ff"
    },
    "usage": "Strategy colour for Delay. Badge fill and text on all grounds."
   },
   {
    "name": "d-document",
    "value": {
     "night": "#d8f3d5",
     "dawn": "#193f23",
     "contrast": "#b8ffb0"
    },
    "usage": "Strategy colour for Document. Badge fill and text on all grounds."
   },
   {
    "name": "on-d",
    "value": {
     "night": "#06140f",
     "dawn": "#ffffff",
     "contrast": "#000000"
    },
    "usage": "The letter inside a filled strategy badge. At least 7:1 on every `d-` colour in every theme."
   },
   {
    "name": "meter-fill",
    "value": {
     "night": "#dfe9e2",
     "dawn": "#1f3329",
     "contrast": "#ffffff"
    },
    "usage": "The filled part of a rubric meter and the score ring. Neutral on purpose: scores stay clinical, with no reward colour. At least 3:1 on `ground-sunken`."
   },
   {
    "name": "meter-track",
    "value": "{ground-sunken}",
    "usage": "The empty part of a rubric meter. An alias of `ground-sunken`, bounded by `edge` where the meter needs a visible end."
   },
   {
    "name": "gold-deep",
    "value": {
     "night": "#7a5a22",
     "dawn": "#5e4410",
     "contrast": "#b8860b"
    },
    "usage": "Shadow end of the gilded gradient on swirl corners, crests, dividers and tile pips. Inherited from Enchanted Grove. Ornament only, never text."
   },
   {
    "name": "gold",
    "value": {
     "night": "#d4b062",
     "dawn": "#8f6b1e",
     "contrast": "#ffd700"
    },
    "usage": "Body of the gilded gradient. Inherited from Enchanted Grove gold leaf. At least 3:1 on `ground-raised` in every theme so the swirls read as marks. Never text."
   },
   {
    "name": "gold-bright",
    "value": {
     "night": "#f7e6ad",
     "dawn": "#c39a3e",
     "contrast": "#fff3a0"
    },
    "usage": "Highlight end of the gilded gradient: the gleam on every swirl."
   },
   {
    "name": "gem",
    "value": {
     "night": "#c690f5",
     "dawn": "#7b2f92",
     "contrast": "#e3a6ff"
    },
    "usage": "The arcane gem set into gilded crests, card gems and the arcane band. Amethyst from Enchanted Grove, lifted for night. A frame accent for the mage and wizard feel. Never on scenario, score or safety surfaces."
   },
   {
    "name": "gem-text",
    "value": {
     "night": "#e8cffc",
     "dawn": "#5e1f72",
     "contrast": "#efcbff"
    },
    "usage": "The gem as text: the arcane band label and a featured tile name. At least 7:1 on `ground-raised` and `gem-soft`."
   },
   {
    "name": "gem-soft",
    "value": {
     "night": "#3a1d4f",
     "dawn": "#f3e3f7",
     "contrast": "#000000"
    },
    "usage": "Soft arcane ground for the arcane band and featured tile counts."
   },
   {
    "name": "tree-far",
    "value": {
     "night": "#0b2219",
     "dawn": "#d0c6b0",
     "contrast": "#000000"
    },
    "usage": "The far treeline silhouette in the frame. Decorative, frame only."
   },
   {
    "name": "tree-near",
    "value": {
     "night": "#010604",
     "dawn": "#bdb197",
     "contrast": "#000000"
    },
    "usage": "The near treeline silhouette in the frame. Decorative, frame only."
   },
   {
    "name": "lantern-pool",
    "value": {
     "night": "#ffbe4d",
     "dawn": "#f0b45a",
     "contrast": "#000000"
    },
    "usage": "The colour of ambient lantern light pooled behind the frame, used at `opacity-pool` in a radial gradient. Decorative only."
   }
  ]
 },
 "type": {
  "fonts": [
   {
    "family": "Faculty Glyphic",
    "file": "fonts/FacultyGlyphic-Regular.woff2",
    "weight": "400",
    "style": "normal"
   },
   {
    "family": "Mona Sans",
    "file": "fonts/MonaSans-Variable.woff2",
    "weight": "200 900",
    "style": "normal"
   },
   {
    "family": "Mona Sans",
    "file": "fonts/MonaSans-Italic-Variable.woff2",
    "weight": "200 900",
    "style": "italic"
   },
   {
    "family": "DM Mono",
    "file": "fonts/DMMono-Regular.woff2",
    "weight": "400",
    "style": "normal"
   },
   {
    "family": "DM Mono",
    "file": "fonts/DMMono-Medium.woff2",
    "weight": "500",
    "style": "normal"
   }
  ],
  "families": {
   "display": "\"Faculty Glyphic\", Georgia, serif",
   "sans": "\"Mona Sans\", \"Helvetica Neue\", Arial, sans-serif",
   "mono": "\"DM Mono\", ui-monospace, Menlo, monospace"
  },
  "groups": [
   {
    "name": "Frame",
    "family": "display",
    "note": "Faculty Glyphic, from Google Fonts, replaces the Enchanted Grove Cormorant. One weight, no italic. The voice of the frame only: the wordmark, navigation headings and quiet lines in the grove. Scenario content, scores and safety notes never use it.",
    "styles": [
     {
      "name": "hero",
      "fontSize": "56px",
      "lineHeight": "60px",
      "fontWeight": 400,
      "letterSpacing": "-0.01em",
      "sample": "Keep your wick lit",
      "usage": "The one line on the home screen and the welcome screen. 40px on phones; 96px on the stage breakpoint."
     },
     {
      "name": "title",
      "fontSize": "40px",
      "lineHeight": "44px",
      "fontWeight": 400,
      "sample": "The grove",
      "usage": "Screen titles in the frame: The grove, Trails, Lanterns lit, Field guide. 32px on phones."
     },
     {
      "name": "heading",
      "fontSize": "28px",
      "lineHeight": "34px",
      "fontWeight": 400,
      "sample": "Trails for tonight",
      "usage": "Section headings in the frame. 24px on phones."
     },
     {
      "name": "aside",
      "fontSize": "20px",
      "lineHeight": "28px",
      "fontWeight": 400,
      "sample": "When the grove goes dark, keep your wick lit.",
      "usage": "One quiet line in empty states and the welcome screen. Never for instructions or scenario text."
     }
    ]
   },
   {
    "name": "Content",
    "family": "sans",
    "note": "Mona Sans, inherited from Enchanted Grove. Every functional and scenario word: titles, dialogue, scores, coaching and safety notes. Plain, warm and easy to read under stress.",
    "styles": [
     {
      "name": "score",
      "fontSize": "72px",
      "lineHeight": "72px",
      "fontWeight": 600,
      "letterSpacing": "-0.02em",
      "sample": "78",
      "usage": "The intervention score on the result screen, with tabular figures. 56px on phones; 128px on the stage breakpoint. No other number on the screen is this large."
     },
     {
      "name": "scenario-title",
      "fontSize": "24px",
      "lineHeight": "30px",
      "fontWeight": 650,
      "sample": "Dylan keeps refilling Maya's cup",
      "usage": "Scenario titles on trail cards, the content note and the result screen. Names and places stay true to life."
     },
     {
      "name": "subtitle",
      "fontSize": "20px",
      "lineHeight": "28px",
      "fontWeight": 600,
      "sample": "How you intervened",
      "usage": "Card titles, dialog titles and rubric headings."
     },
     {
      "name": "dialogue",
      "fontSize": "18px",
      "lineHeight": "28px",
      "fontWeight": 420,
      "sample": "Hey Maya, can you come help me find the bathroom?",
      "usage": "Lines in the live transcript and captions during a role-play."
     },
     {
      "name": "body-lg",
      "fontSize": "18px",
      "lineHeight": "28px",
      "fontWeight": 400,
      "sample": "You arrive at a house party off campus. It is loud and crowded.",
      "usage": "Scenario set-ups, coaching paragraphs and onboarding."
     },
     {
      "name": "body",
      "fontSize": "16px",
      "lineHeight": "26px",
      "fontWeight": 400,
      "sample": "Choose a trail to practise. Each one takes about a minute.",
      "usage": "Default interface and reading text."
     },
     {
      "name": "label",
      "fontSize": "15px",
      "lineHeight": "20px",
      "fontWeight": 600,
      "letterSpacing": "0.01em",
      "sample": "Start role-play",
      "usage": "Buttons, field labels, tabs and navigation."
     },
     {
      "name": "caption",
      "fontSize": "14px",
      "lineHeight": "20px",
      "fontWeight": 450,
      "sample": "About 60 seconds · Includes alcohol and pressure",
      "usage": "Helper text and metadata. The smallest size for any sentence."
     }
    ]
   },
   {
    "name": "Data",
    "family": "mono",
    "note": "DM Mono, inherited from Enchanted Grove. Timers, counts and rubric values.",
    "styles": [
     {
      "name": "timer",
      "fontSize": "20px",
      "lineHeight": "24px",
      "fontWeight": 500,
      "letterSpacing": "0.02em",
      "sample": "0:42",
      "usage": "The role-play countdown inside the timer ring."
     },
     {
      "name": "data",
      "fontSize": "14px",
      "lineHeight": "20px",
      "fontWeight": 400,
      "letterSpacing": "0.02em",
      "sample": "Safety 24 / 25",
      "usage": "Rubric values, dates and session counts."
     },
     {
      "name": "overline",
      "fontSize": "12px",
      "lineHeight": "16px",
      "fontWeight": 500,
      "letterSpacing": "0.12em",
      "sample": "TRAIL 03 · PARTY",
      "usage": "Uppercase eyebrow above a heading, three words at most, always in `ink` or `ink-muted`."
     }
    ]
   }
  ]
 },
 "spacing": {
  "note": "4px base. Space is generous so a person under stress always has room to find the next step.",
  "tokens": [
   {
    "name": "space-1",
    "value": "4px",
    "usage": "Icon to label; between a badge and its word."
   },
   {
    "name": "space-2",
    "value": "8px",
    "usage": "Inside tags; between stacked label and field; between rubric rows."
   },
   {
    "name": "space-3",
    "value": "12px",
    "usage": "Vertical padding inside buttons and fields; between dialogue bubbles."
   },
   {
    "name": "space-4",
    "value": "16px",
    "usage": "Horizontal padding inside controls; page margin on phones."
   },
   {
    "name": "space-5",
    "value": "20px",
    "usage": "Card padding on phones; the inner padding of a toast."
   },
   {
    "name": "space-6",
    "value": "24px",
    "usage": "Card padding; grid gutter; page margin on tablets."
   },
   {
    "name": "space-8",
    "value": "32px",
    "usage": "Between groups inside a section."
   },
   {
    "name": "space-10",
    "value": "40px",
    "usage": "Between the voice orb and the transcript on the role-play stage."
   },
   {
    "name": "space-12",
    "value": "48px",
    "usage": "Between sections; page margin on laptops."
   },
   {
    "name": "space-16",
    "value": "64px",
    "usage": "Above the score on the result screen, so it lands in quiet space."
   },
   {
    "name": "space-20",
    "value": "80px",
    "usage": "Page margins on wide desktops and the stage breakpoint."
   }
  ]
 },
 "radius": {
  "note": "Soft, steady corners. Rounder than the parent grove so the app feels calm in the hand.",
  "tokens": [
   {
    "name": "radius-xs",
    "value": "2px",
    "usage": "The inner tick of checkboxes and the meter fill end."
   },
   {
    "name": "radius-sm",
    "value": "6px",
    "usage": "Tags, strategy badges, tooltips and checkboxes."
   },
   {
    "name": "radius-md",
    "value": "10px",
    "usage": "Buttons and fields."
   },
   {
    "name": "radius-lg",
    "value": "16px",
    "usage": "Cards, tiles, toasts, menus and dialogue bubbles."
   },
   {
    "name": "radius-xl",
    "value": "24px",
    "usage": "Sheets, dialogs and the role-play stage panel."
   },
   {
    "name": "radius-round",
    "value": "50%",
    "usage": "Only for the voice orb, avatars, the timer ring and the streak dots."
   }
  ]
 },
 "shadow": {
  "note": "No outlines and no hard drop shadows. Surfaces are carved with inset shadows; light comes from soft lantern glows; floating layers get one directional bleed. Compose them: box-shadow: var(--inset-frost), var(--glow-soft).",
  "tokens": [
   {
    "name": "inset-frost",
    "value": {
     "night": "inset 0 1px 1px #f4efe338, inset 0 -12px 22px -12px #000000c7",
     "dawn": "inset 0 1px 1px #ffffffd9, inset 0 -12px 20px -12px #6b5a3a4d",
     "contrast": "inset 0 0 0 2px #ffffff"
    },
    "usage": "Frosted glass: frost buttons, chips, the AI bubble. A soft highlight on the top lip and a pool of dark at the base. In high contrast it becomes a 2px white inset edge."
   },
   {
    "name": "inset-raised",
    "value": {
     "night": "inset 0 1px 0 #f4efe338, inset 0 0 0 1px #7aa98f2e, inset 0 -18px 30px -20px #000000d9, 0 16px 32px -18px #000000",
     "dawn": "inset 0 1px 0 #ffffff, inset 0 0 0 1px #8f6b1e24, inset 0 -18px 30px -22px #6b5a3a40, 0 14px 28px -16px #5e44104d",
     "contrast": "inset 0 0 0 2px #ffffff"
    },
    "usage": "Cards, tiles, sheets and dialogs on `ground-raised`. Carves the surface without an outline."
   },
   {
    "name": "inset-well",
    "value": {
     "night": "inset 0 3px 8px #000000d1, inset 0 -2px 0 #8fbfa5",
     "dawn": "inset 0 3px 8px #3a2e1a38, inset 0 -2px 0 #4d6a5a",
     "contrast": "inset 0 0 0 2px #ffffff"
    },
    "usage": "Fields and the transcript well: shadow pooling under the top edge and a 2px `sill` along the bottom."
   },
   {
    "name": "inset-well-focus",
    "value": {
     "night": "inset 0 3px 8px #000000d1, inset 0 -2px 0 #ffbe4d, inset 0 -12px 16px -12px #ffbe4d73",
     "dawn": "inset 0 3px 8px #3a2e1a38, inset 0 -2px 0 #6e3b00, inset 0 -12px 16px -12px #e08a1e59",
     "contrast": "inset 0 0 0 3px #00e5ff"
    },
    "usage": "A field while it holds focus: the sill turns lantern and warms the inside of the well. Shown together with `focus-ring`."
   },
   {
    "name": "inset-well-error",
    "value": {
     "night": "inset 0 3px 8px #000000d1, inset 0 -2px 0 #f7c6a3, inset 0 0 18px #f7c6a326",
     "dawn": "inset 0 3px 8px #3a2e1a38, inset 0 -2px 0 #7a2a14, inset 0 0 16px #7a2a141f",
     "contrast": "inset 0 0 0 3px #ffb38a"
    },
    "usage": "A field with an error: a copper sill and a faint copper warmth. Always paired with error text and the danger icon."
   },
   {
    "name": "inset-lantern",
    "value": {
     "night": "inset 0 1px 1px #fff1c9f2, inset 0 -8px 14px -6px #b8650aa6",
     "dawn": "inset 0 1px 1px #ffd9a159, inset 0 -8px 14px -6px #2a1400bf",
     "contrast": "inset 0 0 0 2px #000000"
    },
    "usage": "The primary lantern button: a lit upper lip and a warm pool at the base, like light through a glass pane."
   },
   {
    "name": "inset-press",
    "value": {
     "night": "inset 0 4px 12px #000000db",
     "dawn": "inset 0 4px 10px #3a2e1a5c",
     "contrast": "inset 0 0 0 4px #00e5ff"
    },
    "usage": "Any pressed control: the light leaves and the surface sinks. Replaces the control's own inset while pressed."
   },
   {
    "name": "rim-gilt",
    "value": {
     "night": "inset 0 0 0 1px #d4b06280, inset 0 0 0 4px #020a06, inset 0 0 0 5px #d4b06240",
     "dawn": "inset 0 0 0 1px #8f6b1ea6, inset 0 0 0 4px #fffdf8, inset 0 0 0 5px #8f6b1e4d",
     "contrast": "inset 0 0 0 2px #ffd700"
    },
    "usage": "A gilded double rim inside ornate cards and quest tiles: a gold hairline, a band of ground, then a fainter gold line. Compose after the surface inset: box-shadow: var(--inset-raised), var(--rim-gilt)."
   },
   {
    "name": "glow-gem",
    "value": {
     "night": "0 0 0 1.5px #d4b062, 0 0 12px #c690f5",
     "dawn": "0 0 0 1.5px #8f6b1e, 0 0 10px #7b2f9266",
     "contrast": "0 0 0 2px #ffd700"
    },
    "usage": "The halo around an arcane gem set in a crest or card corner."
   },
   {
    "name": "glow-lantern",
    "value": {
     "night": "0 0 6px #ffbe4d6b, 0 0 32px #ffbe4d47",
     "dawn": "0 6px 20px -6px #e08a1e73",
     "contrast": "0 0 0 2px #ffd700"
    },
    "usage": "Hover bloom on the lantern button and the on state of switches."
   },
   {
    "name": "glow-soft",
    "value": {
     "night": "0 0 0 1px #ffbe4d1f, 0 10px 28px -12px #ffbe4d38",
     "dawn": "0 10px 24px -12px #6b5a3a59",
     "contrast": "0 0 0 2px #ffffff"
    },
    "usage": "Hover bloom on cards, tiles and frost buttons: lantern light falling on the surface from above."
   },
   {
    "name": "glow-voice",
    "value": {
     "night": "0 0 0 8px #ffbe4d2e, 0 0 48px 10px #ffbe4d4d",
     "dawn": "0 0 0 8px #e08a1e26, 0 0 40px 8px #e08a1e40",
     "contrast": "0 0 0 4px #ffd700"
    },
    "usage": "The halo around the voice orb while it listens. Its spread follows the input level."
   },
   {
    "name": "glow-ai",
    "value": {
     "night": "0 0 0 8px #a6d8f326, 0 0 44px 8px #a6d8f340",
     "dawn": "0 0 0 8px #0e3b5e1f, 0 0 36px 6px #0e3b5e33",
     "contrast": "0 0 0 4px #9fdfff"
    },
    "usage": "The halo around the AI character's avatar while it speaks."
   },
   {
    "name": "bleed-night",
    "value": {
     "night": "0 24px 48px -12px #000000e6",
     "dawn": "0 20px 40px -14px #3a2e1a4d",
     "contrast": "0 0 0 2px #ffffff"
    },
    "usage": "The single directional shadow under floating strata: menus, dialogs, sheets and toasts."
   },
   {
    "name": "focus-ring",
    "value": {
     "night": "0 0 0 2px #020a06, 0 0 0 5px #ffe3a3",
     "dawn": "0 0 0 2px #e2d9c5, 0 0 0 5px #0f231a",
     "contrast": "0 0 0 2px #000000, 0 0 0 5px #00e5ff"
    },
    "usage": "Keyboard focus on every interactive element through :focus-visible. A ground-coloured band, then a solid 3px ring in `focus`. Combine it with the control's own inset."
   }
  ]
 },
 "stroke": {
  "note": "Line weights. Lines draw icons and ornaments; surfaces use inset shadows.",
  "tokens": [
   {
    "name": "stroke-hairline",
    "value": "1px",
    "usage": "Decorative ornaments and dividers in `vein`."
   },
   {
    "name": "stroke-icon",
    "value": "1.75px",
    "usage": "Interface icons at 20px and 24px. Heavier than the parent grove so icons stay legible at night."
   },
   {
    "name": "stroke-sill",
    "value": "2px",
    "usage": "The inner lower edge of fields, the selected tab mark and high contrast surface edges."
   },
   {
    "name": "stroke-focus",
    "value": "3px",
    "usage": "The visible width of the focus ring."
   },
   {
    "name": "stroke-ring",
    "value": "6px",
    "usage": "The timer ring and the score ring."
   }
  ]
 },
 "blur": {
  "note": "Gaussian bleeds for the veil and lantern light.",
  "tokens": [
   {
    "name": "blur-veil",
    "value": "16px",
    "usage": "backdrop-filter behind sheets, dialogs and the sticky navigation."
   },
   {
    "name": "blur-glow",
    "value": "32px",
    "usage": "The soft pool of light behind the voice orb."
   },
   {
    "name": "blur-night",
    "value": "72px",
    "usage": "Large ambient lantern pools behind the frame scenery."
   }
  ]
 },
 "stratum": {
  "note": "Z-index by depth in the grove. The Step out control sits above everything so a person can always leave.",
  "tokens": [
   {
    "name": "stratum-ground",
    "value": "0",
    "usage": "Page ground, grain and the silhouette scenery."
   },
   {
    "name": "stratum-trees",
    "value": "10",
    "usage": "Cards and content panels."
   },
   {
    "name": "stratum-path",
    "value": "20",
    "usage": "Sticky header, bottom navigation and the navigation rail."
   },
   {
    "name": "stratum-veil",
    "value": "30",
    "usage": "Scrim behind dialogs and sheets."
   },
   {
    "name": "stratum-lantern",
    "value": "40",
    "usage": "Dialogs, sheets, menus and popovers."
   },
   {
    "name": "stratum-signal",
    "value": "50",
    "usage": "Toasts, tooltips and live captions."
   },
   {
    "name": "stratum-exit",
    "value": "60",
    "usage": "The Step out button and the pause control during a role-play."
   }
  ]
 },
 "opacity": {
  "note": "Grain, veils and quiet layers.",
  "tokens": [
   {
    "name": "opacity-grain",
    "value": "0.03",
    "usage": "SVG noise over the page ground."
   },
   {
    "name": "opacity-pool",
    "value": "0.16",
    "usage": "The ambient lantern light behind the scenery."
   },
   {
    "name": "opacity-scenery",
    "value": "0.9",
    "usage": "The far treeline layer, so the near layer reads in front."
   },
   {
    "name": "opacity-scrim",
    "value": "0.8",
    "usage": "The `veil` scrim behind a dialog or sheet."
   },
   {
    "name": "opacity-disabled",
    "value": "0.5",
    "usage": "Disabled controls, always with a text reason nearby."
   }
  ]
 },
 "duration": {
  "note": "Calm by default. The longest durations belong to breathing loops and to the score reveal, which is slow on purpose so the room can go quiet.",
  "tokens": [
   {
    "name": "duration-flicker",
    "value": "100ms",
    "usage": "Press feedback: the surface sinks."
   },
   {
    "name": "duration-kindle",
    "value": "180ms",
    "usage": "Hover glows, colour changes and the focus ring appearing."
   },
   {
    "name": "duration-drift",
    "value": "260ms",
    "usage": "Tab marks, switch knobs, menus opening."
   },
   {
    "name": "duration-rise",
    "value": "420ms",
    "usage": "Entrances: cards, toasts, sheets and dialogue bubbles rising into place."
   },
   {
    "name": "duration-settle",
    "value": "640ms",
    "usage": "Panels expanding and the voice orb changing state."
   },
   {
    "name": "duration-hush",
    "value": "1400ms",
    "usage": "The score reveal: the number counts up and the rubric fills, once, without bounce."
   },
   {
    "name": "duration-breath",
    "value": "2400ms",
    "usage": "One breath of the listening halo, the lantern flicker loop and the skeleton shimmer."
   },
   {
    "name": "duration-night",
    "value": "16000ms",
    "usage": "One slow loop of the ambient lantern light in the frame."
   }
  ]
 },
 "easing": {
  "note": "Four curves. Only frame controls may overshoot, and never by much. Scenario and score motion never overshoots.",
  "tokens": [
   {
    "name": "ease-kindle",
    "value": "cubic-bezier(0.2, 0.7, 0.2, 1)",
    "usage": "Default for entrances, glows and colour."
   },
   {
    "name": "ease-settle",
    "value": "cubic-bezier(0.3, 0, 0.2, 1)",
    "usage": "The score reveal, the rubric meters and the timer: steady and serious."
   },
   {
    "name": "ease-breath",
    "value": "cubic-bezier(0.45, 0, 0.55, 1)",
    "usage": "Looping motion that breathes in and out: the listening halo and the flame flicker."
   },
   {
    "name": "ease-lift",
    "value": "cubic-bezier(0.34, 1.25, 0.64, 1)",
    "usage": "A small lift for frame controls only: switch knobs, the selected tab mark, a lantern lighting in the collection."
   }
  ]
 },
 "breakpoint": {
  "note": "Five stages, mobile first. Each value is the minimum width where the stage begins.",
  "tokens": [
   {
    "name": "bp-sprout",
    "value": "0px",
    "usage": "Phones. 4 columns, 16px margins, bottom navigation, one trail card per row, hero at 40px."
   },
   {
    "name": "bp-sapling",
    "value": "600px",
    "usage": "Tablets and narrow windows. 8 columns, 24px margins, navigation rail, two trail cards per row."
   },
   {
    "name": "bp-grove",
    "value": "960px",
    "usage": "Laptops. 12 columns, 48px margins, sidebar, three trail cards per row. The role-play stage shows the transcript beside the orb."
   },
   {
    "name": "bp-canopy",
    "value": "1280px",
    "usage": "Wide desktops. 12 columns inside a 1200px column, 80px margins."
   },
   {
    "name": "bp-stage",
    "value": "1600px",
    "usage": "Projectors and the live demo. Stage mode: score at 128px, dialogue at 28px, navigation hidden."
   }
  ]
 },
 "size": {
  "note": "Fixed sizes for targets and key objects.",
  "tokens": [
   {
    "name": "target-min",
    "value": "44px",
    "usage": "The smallest hit area of any control (WCAG 2.5.5 AAA)."
   },
   {
    "name": "target-comfort",
    "value": "48px",
    "usage": "Navigation items and buttons on phones."
   },
   {
    "name": "icon-sm",
    "value": "20px",
    "usage": "Icons inside buttons, tags and notices."
   },
   {
    "name": "icon-md",
    "value": "24px",
    "usage": "Navigation and stand-alone icons."
   },
   {
    "name": "avatar",
    "value": "48px",
    "usage": "The AI character's avatar beside the transcript."
   },
   {
    "name": "orb",
    "value": "112px",
    "usage": "The voice orb on phones. 144px from the grove breakpoint, 192px on the stage breakpoint."
   },
   {
    "name": "timer",
    "value": "88px",
    "usage": "The 60-second timer ring."
   },
   {
    "name": "measure",
    "value": "68ch",
    "usage": "The longest line length for coaching and scenario text."
   }
  ]
 },
 "silhouette": {
  "note": "Card and tile cuts, in the spirit of fantasy quest menus. Trail cards, tiles and frame surfaces may take any cut. The role-play stage, transcript, score, rubric and safety notes keep the plain `cut-soft` card.",
  "tokens": [
   {
    "name": "cut-soft",
    "value": "16px",
    "usage": "Default card: a plain rounded rectangle at `radius-lg`. Trail cards, rubric cards, notices."
   },
   {
    "name": "cut-pane",
    "value": "50%",
    "usage": "A lantern pane: the top edge arches to a point of half the width. The lantern tile in Lanterns lit and the empty state frame."
   },
   {
    "name": "cut-arch",
    "value": "120px",
    "usage": "A soft rounded arch across the top, like a clearing in the trees. The streak tile and the welcome card."
   },
   {
    "name": "cut-notch",
    "value": "14px",
    "usage": "Chamfered corners cut at 45 degrees: quest trail cards, chapter headers, dialog headers. Inherited from Enchanted Grove."
   },
   {
    "name": "cut-scoop",
    "value": "16px",
    "usage": "Concave quarter-circle corners, like a carved tablet: featured trail cards and the field guide strategy cards."
   },
   {
    "name": "cut-ticket",
    "value": "10px",
    "usage": "Half-circle bites on the left and right edges, like a quest scroll or pass: session receipts and the weekly practice card."
   },
   {
    "name": "cut-banner",
    "value": "18px",
    "usage": "A pennant point at the bottom: chapter markers and the streak milestone card."
   },
   {
    "name": "cut-gem",
    "value": "22%",
    "usage": "A cut-gem octagon: quest tiles, inventory-style slots for strategies and trail categories."
   },
   {
    "name": "cut-bubble",
    "value": "4px",
    "usage": "The smaller corner of a dialogue bubble, nearest the speaker. The other three corners use `radius-lg`."
   }
  ]
 },
 "ornament": {
  "note": "Gilded swirl ornaments in the quest-menu style, inherited from Enchanted Grove, plus Wick's own wick rule and arcane sigil. They dress trail cards, tiles and frame surfaces. They never sit on the role-play stage, the transcript, a score, a rubric or a safety note.",
  "tokens": [
   {
    "name": "ornament-corner",
    "value": "46px",
    "usage": "Size of each gilded swirl corner on cards and panels. 30px on quest tiles, 40px on phones."
   },
   {
    "name": "ornament-inset",
    "value": "6px",
    "usage": "Distance from the card edge to the ornament layer. 9px on notched cards, 10px on scooped cards."
   },
   {
    "name": "ornament-crest",
    "value": "132px",
    "usage": "Width of the gilded crest with its arcane gem at the top center of a featured card."
   },
   {
    "name": "ornament-frame",
    "value": "1px",
    "usage": "Weight of the fading inner frame that links the corners on gilded cards."
   },
   {
    "name": "ornament-sigil",
    "value": "120px",
    "usage": "Diameter of the arcane sigil watermark behind quest tile icons and the streak flame."
   },
   {
    "name": "ornament-rule",
    "value": "1px",
    "usage": "The wick rule divider: a hairline in `vein` with a small flame at its center."
   },
   {
    "name": "ornament-flame",
    "value": "10px",
    "usage": "The height of the flame at the center of the wick rule and on the lantern tile."
   },
   {
    "name": "ornament-bracket",
    "value": "20px",
    "usage": "The arm length of the lantern bracket at the corners of the welcome card and the streak tile."
   },
   {
    "name": "ornament-ember",
    "value": "4px",
    "usage": "The ember dots between frame items and in the streak week row."
   }
  ]
 }
}
```

### Appendix C: component types (index.d.ts)

```ts
import type * as React from 'react';
export type IconName = 'grove' | 'trail' | 'lantern' | 'guide' | 'settings' | 'theme' | 'mic' | 'mic-off' | 'speaker' | 'pause' | 'play' | 'replay' | 'step-out' | 'captions' | 'timer' | 'flame' | 'direct' | 'distract' | 'delegate' | 'delay' | 'document' | 'steady' | 'caution' | 'danger' | 'info' | 'close' | 'arrow' | 'chevron' | 'check';
export type StrategyName = 'direct' | 'distract' | 'delegate' | 'delay' | 'document';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { tone?: 'lantern' | 'frost' | 'quiet' | 'exit'; icon?: IconName; iconAfter?: IconName; size?: 'md' | 'lg'; loading?: boolean; loadingLabel?: string; ornate?: boolean }
export declare function Button(props: ButtonProps): React.ReactElement;
export interface VoiceOrbProps { state?: 'idle' | 'listening' | 'thinking' | 'speaking' | 'paused' | 'blocked'; speaker?: string; level?: number; onToggle?: () => void; hint?: boolean; className?: string }
export declare function VoiceOrb(props: VoiceOrbProps): React.ReactElement;
export interface TimerProps { total?: number; remaining?: number; running?: boolean; onDone?: () => void; className?: string }
export declare function Timer(props: TimerProps): React.ReactElement;
export interface TrailCardProps { title: React.ReactNode; setup?: React.ReactNode; overline?: string; minutes?: string; place?: string; people?: string; note?: string | null; strategies?: StrategyName[]; status?: 'new' | 'done'; href?: string; onStart?: () => void; silhouette?: 'soft' | 'notch' | 'scoop' | 'arch' | 'ticket' | 'banner'; ornament?: 'none' | 'corners' | 'gilded'; band?: 'lantern' | 'gold' | 'arcane' | 'moss' | 'dew'; gem?: boolean; className?: string }
export declare function TrailCard(props: TrailCardProps): React.ReactElement;
export interface StrategyProps { d: StrategyName; variant?: 'chip' | 'plain'; className?: string }
export declare function Strategy(props: StrategyProps): React.ReactElement;
export interface StrategyPickerProps { legend?: React.ReactNode; value?: StrategyName | null; defaultValue?: StrategyName; onChange?: (d: StrategyName) => void; options?: StrategyName[]; id?: string; className?: string }
export declare function StrategyPicker(props: StrategyPickerProps): React.ReactElement;
export interface DialogueLineProps { role?: 'ai' | 'you' | 'note'; speaker?: string; pending?: boolean; className?: string; children?: React.ReactNode }
export declare function DialogueLine(props: DialogueLineProps): React.ReactElement;
export interface TranscriptLine { role: 'ai' | 'you' | 'note'; speaker?: string; text: React.ReactNode }
export interface TranscriptProps { lines?: TranscriptLine[]; label?: string; className?: string; children?: React.ReactNode }
export declare function Transcript(props: TranscriptProps): React.ReactElement;
export interface RubricItem { label: string; value: number; max?: number; note?: React.ReactNode | null }
export interface RubricMeterProps extends RubricItem { delay?: number; animate?: boolean; className?: string }
export declare function RubricMeter(props: RubricMeterProps): React.ReactElement;
export interface ScoreRevealProps { score: number; max?: number; band?: string; summary?: React.ReactNode; rubric?: RubricItem[]; overline?: string; replayKey?: unknown; animate?: boolean; className?: string; children?: React.ReactNode }
export declare function ScoreReveal(props: ScoreRevealProps): React.ReactElement;
export interface NoticeProps { tone?: 'safety' | 'caution' | 'danger' | 'steady' | 'info'; title?: React.ReactNode; action?: React.ReactNode; urgent?: boolean; className?: string; children?: React.ReactNode }
export declare function Notice(props: NoticeProps): React.ReactElement;
export interface ContentNoteProps { title: React.ReactNode; lead?: React.ReactNode; items?: string[]; onStart?: () => void; onSkip?: () => void; startLabel?: string; skipLabel?: string; className?: string }
export declare function ContentNote(props: ContentNoteProps): React.ReactElement;
export interface StreakTileProps { days: number; week?: boolean[]; today?: number; lanterns?: number; labels?: string[]; dayNames?: string[]; ornament?: boolean; className?: string }
export declare function StreakTile(props: StreakTileProps): React.ReactElement;
export interface LanternTileProps { title: React.ReactNode; meta?: React.ReactNode; lit?: boolean; ornament?: boolean; className?: string }
export declare function LanternTile(props: LanternTileProps): React.ReactElement;
export interface FieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> { label: React.ReactNode; hint?: React.ReactNode; error?: React.ReactNode; multiline?: boolean; maxLength?: number; onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }
export declare function Field(props: FieldProps): React.ReactElement;
export interface SwitchProps { label: React.ReactNode; checked?: boolean; defaultChecked?: boolean; onChange?: (next: boolean) => void; disabled?: boolean; stateText?: boolean; id?: string; className?: string }
export declare function Switch(props: SwitchProps): React.ReactElement;
export interface CheckboxProps { label: React.ReactNode; checked?: boolean; defaultChecked?: boolean; onChange?: (next: boolean) => void; disabled?: boolean; id?: string; className?: string }
export declare function Checkbox(props: CheckboxProps): React.ReactElement;
export interface TabItem { id: string; label: React.ReactNode; content?: React.ReactNode }
export interface TabsProps { items: TabItem[]; label: string; value?: string; defaultValue?: string; onChange?: (id: string) => void; id?: string; className?: string }
export declare function Tabs(props: TabsProps): React.ReactElement;
export interface NavItem { id: string; label: string; icon: IconName; href?: string }
export interface NavBarProps { items?: NavItem[]; value?: string; defaultValue?: string; onChange?: (id: string) => void; variant?: 'bar' | 'rail'; label?: string; className?: string }
export declare function NavBar(props: NavBarProps): React.ReactElement;
export interface ToastProps { tone?: 'steady' | 'danger' | 'info'; title: React.ReactNode; duration?: number; onClose?: () => void; className?: string; children?: React.ReactNode }
export declare function Toast(props: ToastProps): React.ReactElement | null;
export interface DialogProps { open: boolean; title: React.ReactNode; actions?: React.ReactNode; onClose?: () => void; inline?: boolean; className?: string; children?: React.ReactNode }
export declare function Dialog(props: DialogProps): React.ReactElement | null;
export interface WickLoaderProps { label?: string; value?: number; id?: string; className?: string }
export declare function WickLoader(props: WickLoaderProps): React.ReactElement;
export interface SceneLoaderProps { title?: string; steps?: string[]; stepMs?: number; className?: string }
export declare function SceneLoader(props: SceneLoaderProps): React.ReactElement;
export interface SkeletonProps { lines?: number; className?: string }
export declare function Skeleton(props: SkeletonProps): React.ReactElement;
export interface SpinnerProps { label?: string; className?: string }
export declare function Spinner(props: SpinnerProps): React.ReactElement;
export interface EmptyStateProps { title?: React.ReactNode; aside?: React.ReactNode; action?: React.ReactNode; className?: string; children?: React.ReactNode }
export declare function EmptyState(props: EmptyStateProps): React.ReactElement;
export interface MarkProps { size?: number; live?: boolean; label?: string; className?: string; children?: React.ReactNode }
export declare function Mark(props: MarkProps): React.ReactElement;
export interface WordmarkProps { height?: number; className?: string }
export declare function Wordmark(props: WordmarkProps): React.ReactElement;
export interface SceneryProps { height?: number; pool?: boolean; className?: string; children?: React.ReactNode }
export declare function Scenery(props: SceneryProps): React.ReactElement;
export interface WickRuleProps { className?: string }
export declare function WickRule(props: WickRuleProps): React.ReactElement;
export interface QuestTileProps { label: React.ReactNode; sub?: React.ReactNode; icon?: IconName; letter?: string; tone?: 'lantern' | 'gold' | 'arcane' | 'moss' | 'dew'; silhouette?: 'notch' | 'gem' | 'scoop'; pips?: number; pipMax?: number; pipLabel?: string; count?: React.ReactNode; ornament?: boolean; sigil?: boolean; onClick?: () => void; href?: string; a11yLabel?: string; className?: string }
export declare function QuestTile(props: QuestTileProps): React.ReactElement;
export interface GildedHeadingProps { title: React.ReactNode; sub?: string; level?: 1 | 2 | 3 | 4; className?: string }
export declare function GildedHeading(props: GildedHeadingProps): React.ReactElement;
export declare function GildedDivider(props: { className?: string }): React.ReactElement;
export declare function Sigil(props: { size?: number; className?: string }): React.ReactElement;
export interface IconProps { name: IconName; size?: number; className?: string }
export declare function Icon(props: IconProps): React.ReactElement;
declare global { interface Window { Wick: { Button: typeof Button; VoiceOrb: typeof VoiceOrb; Timer: typeof Timer; TrailCard: typeof TrailCard; Strategy: typeof Strategy; StrategyPicker: typeof StrategyPicker; Transcript: typeof Transcript; DialogueLine: typeof DialogueLine; ScoreReveal: typeof ScoreReveal; RubricMeter: typeof RubricMeter; Notice: typeof Notice; ContentNote: typeof ContentNote; StreakTile: typeof StreakTile; LanternTile: typeof LanternTile; Field: typeof Field; Switch: typeof Switch; Checkbox: typeof Checkbox; Tabs: typeof Tabs; NavBar: typeof NavBar; Toast: typeof Toast; Dialog: typeof Dialog; WickLoader: typeof WickLoader; SceneLoader: typeof SceneLoader; Skeleton: typeof Skeleton; Spinner: typeof Spinner; EmptyState: typeof EmptyState; Mark: typeof Mark; Wordmark: typeof Wordmark; Scenery: typeof Scenery; WickRule: typeof WickRule; QuestTile: typeof QuestTile; GildedHeading: typeof GildedHeading; GildedDivider: typeof GildedDivider; Sigil: typeof Sigil; Icon: typeof Icon } } }
```

### Appendix D: component stylesheet (bundle.css)

```css
/* Wick component stylesheet. Loaded after tokens.css. Every value comes from a token.
   Breakpoints mirror bp-sapling 600px, bp-grove 960px, bp-canopy 1280px and bp-stage 1600px
   (custom properties cannot be read inside media queries). */

/* ---------- base ---------- */
html { color-scheme: dark; }
html[data-theme="dawn"] { color-scheme: light; }
body { margin: 0; background: var(--ground); color: var(--ink); font-family: var(--font-sans); font-size: 16px; line-height: 26px; -webkit-font-smoothing: antialiased; }
*, *::before, *::after { box-sizing: border-box; }
.wk-sr { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
.wk-stage { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-4); padding: var(--space-6); }
.wk-stack { display: flex; flex-direction: column; gap: var(--space-4); padding: var(--space-6); }
.wk-row { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-3); }
.wk-icon { flex: none; display: block; }
:where(a) { color: var(--ink-link); text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; }
:where(a):hover { text-decoration-thickness: 2px; }
:where(a, button, input, textarea, [tabindex]):focus { outline: none; }
:where(a, [tabindex]):focus-visible { box-shadow: var(--focus-ring); border-radius: var(--radius-sm); }
@media (forced-colors: active) {
  :where(a, button, input, textarea, [tabindex]):focus-visible { outline: 3px solid CanvasText; outline-offset: 2px; }
  .wk-btn, .wk-field__control, .wk-card, .wk-tile, .wk-notice, .wk-toast, .wk-dialog__panel { border: 1px solid CanvasText; }
}

/* ---------- keyframes ---------- */
@keyframes wk-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes wk-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes wk-flicker { 0%, 100% { transform: scaleY(1) scaleX(1); } 30% { transform: scaleY(1.08) scaleX(.96); } 55% { transform: scaleY(.95) scaleX(1.03); } 80% { transform: scaleY(1.04) scaleX(.98); } }
@keyframes wk-breath { 0%, 100% { transform: scale(1); opacity: .85; } 50% { transform: scale(1.06); opacity: 1; } }
@keyframes wk-ember { 0%, 100% { opacity: .3; transform: translateY(0); } 40% { opacity: 1; transform: translateY(-4px); } }
@keyframes wk-spin { to { transform: rotate(360deg); } }
@keyframes wk-shimmer { from { background-position: 150% 0; } to { background-position: -50% 0; } }
@keyframes wk-drift { 0% { left: -10%; } 100% { left: 100%; } }
@keyframes wk-wave { 0%, 100% { transform: scaleY(.35); } 50% { transform: scaleY(1); } }
@keyframes wk-kindle { from { opacity: 0; transform: scale(.6); } to { opacity: 1; transform: none; } }
@keyframes wk-pane-fill { from { transform: translateY(100%); } to { transform: translateY(0); } }
@keyframes wk-draw { from { stroke-dashoffset: 24; } to { stroke-dashoffset: 0; } }
@keyframes wk-pool { 0%, 100% { opacity: .7; transform: translate(-50%, 0) scale(1); } 50% { opacity: 1; transform: translate(-48%, -2%) scale(1.08); } }
@keyframes wk-countdown { from { width: 100%; } to { width: 0; } }

/* ---------- Button ---------- */
.wk-btn { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); min-height: var(--target-min); min-width: var(--target-min); padding: var(--space-3) var(--space-5); border: 0; border-radius: var(--radius-md); font: 600 15px/20px var(--font-sans); letter-spacing: .01em; cursor: pointer; text-decoration: none; -webkit-tap-highlight-color: transparent; transition: background-color var(--duration-kindle) var(--ease-kindle), box-shadow var(--duration-kindle) var(--ease-kindle), transform var(--duration-flicker) var(--ease-kindle), color var(--duration-kindle) var(--ease-kindle); }
.wk-btn--lg { min-height: 56px; padding: var(--space-4) var(--space-8); font-size: 17px; border-radius: var(--radius-lg); }
.wk-btn--icon { padding: var(--space-3); }
.wk-btn--lantern { background: var(--lantern); color: var(--on-lantern); box-shadow: var(--inset-lantern); }
.wk-btn--lantern:hover { background: var(--lantern-hover); box-shadow: var(--inset-lantern), var(--glow-lantern); }
.wk-btn--lantern:hover .wk-btn__glyph { animation: wk-flicker var(--duration-breath) var(--ease-breath) infinite; transform-origin: 50% 90%; }
.wk-btn--lantern:focus-visible { box-shadow: var(--inset-lantern), var(--focus-ring); }
.wk-btn--frost { background: var(--frost); color: var(--ink); box-shadow: var(--inset-frost); }
.wk-btn--frost:hover { background: var(--frost-hover); box-shadow: var(--inset-frost), var(--glow-soft); }
.wk-btn--frost:focus-visible { box-shadow: var(--inset-frost), var(--focus-ring); }
.wk-btn--quiet { background: transparent; color: var(--ink-link); text-decoration: underline; text-underline-offset: 4px; text-decoration-thickness: 1px; padding-inline: var(--space-3); }
.wk-btn--quiet:hover { text-decoration-thickness: 2px; background: var(--frost); box-shadow: var(--inset-frost); }
.wk-btn--quiet:focus-visible { box-shadow: var(--focus-ring); }
.wk-btn--exit { background: var(--ground-raised); color: var(--ink); box-shadow: var(--inset-raised); z-index: var(--stratum-exit); }
.wk-btn--exit:hover { background: var(--frost-hover); }
.wk-btn--exit:hover .wk-btn__glyph { transform: translateX(2px); }
.wk-btn--exit .wk-btn__glyph { transition: transform var(--duration-kindle) var(--ease-kindle); }
.wk-btn--exit:focus-visible { box-shadow: var(--inset-raised), var(--focus-ring); }
.wk-btn:active:not([disabled]):not([aria-disabled="true"]) { box-shadow: var(--inset-press); transform: translateY(1px); }
.wk-btn[disabled], .wk-btn[aria-disabled="true"] { opacity: var(--opacity-disabled); cursor: not-allowed; }
.wk-btn[aria-busy="true"] { cursor: progress; }
.wk-btn__spin { width: 18px; height: 18px; }
.wk-btn__after { transition: transform var(--duration-kindle) var(--ease-kindle); }
.wk-btn:hover .wk-btn__after { transform: translateX(3px); }

/* ---------- Spinner and loaders ---------- */
.wk-spinner { display: inline-block; position: relative; width: 20px; height: 20px; color: currentColor; }
.wk-spinner i { position: absolute; left: 50%; top: 0; width: 3px; height: 3px; margin-left: -1.5px; border-radius: var(--radius-round); background: currentColor; transform-origin: 1.5px 10px; opacity: .25; animation: wk-fade var(--duration-settle) linear infinite alternate; }
.wk-loader { display: grid; gap: var(--space-2); width: 100%; max-width: 420px; }
.wk-loader__label { display: flex; justify-content: space-between; font: 450 14px/20px var(--font-sans); color: var(--ink-muted); }
.wk-loader__label b { font: 400 14px/20px var(--font-mono); color: var(--ink); }
.wk-loader__track { position: relative; height: 8px; border-radius: var(--radius-sm); background: var(--ground-sunken); box-shadow: inset 0 0 0 1px var(--edge); overflow: visible; }
.wk-loader__burn { position: absolute; left: 0; top: 0; bottom: 0; border-radius: var(--radius-sm); background: var(--meter-fill); transition: width var(--duration-settle) var(--ease-settle); }
.wk-loader__head { position: absolute; top: 50%; width: 12px; height: 18px; margin: -14px 0 0 -6px; color: var(--flame); transition: left var(--duration-settle) var(--ease-settle); }
.wk-loader__head svg { display: block; animation: wk-flicker var(--duration-breath) var(--ease-breath) infinite; transform-origin: 50% 90%; }
.wk-loader--indeterminate .wk-loader__burn { display: none; }
.wk-loader--indeterminate .wk-loader__head { animation: wk-drift var(--duration-breath) var(--ease-breath) infinite; }
.wk-scene-loader { display: grid; justify-items: center; gap: var(--space-4); text-align: center; padding: var(--space-8); }
.wk-scene-loader__pane { position: relative; width: 72px; height: 100px; overflow: hidden; background: var(--ground-sunken); box-shadow: var(--inset-well); clip-path: polygon(50% 0, 64% 5%, 77% 12%, 88% 22%, 96% 34%, 100% 46%, 100% 100%, 0 100%, 0 46%, 4% 34%, 12% 22%, 23% 12%, 36% 5%); }
.wk-scene-loader__pane::after { content: ""; position: absolute; inset: 0; background: linear-gradient(to top, var(--lantern), var(--lantern-soft)); opacity: .9; transform: translateY(100%); animation: wk-pane-fill var(--duration-night) var(--ease-settle) forwards; }
.wk-scene-loader__pane svg { position: absolute; left: 50%; bottom: 14px; margin-left: -12px; z-index: 1; color: var(--flame); animation: wk-flicker var(--duration-breath) var(--ease-breath) infinite; transform-origin: 50% 90%; }
.wk-scene-loader__title { margin: 0; font: 600 20px/28px var(--font-sans); }
.wk-scene-loader__step { margin: 0; font: 450 14px/20px var(--font-sans); color: var(--ink-muted); min-height: 20px; }
.wk-skeleton { display: grid; gap: var(--space-3); padding: var(--space-6); border-radius: var(--radius-lg); background: var(--ground-raised); box-shadow: var(--inset-raised); width: 100%; max-width: 340px; }
.wk-skeleton__bar { height: 14px; border-radius: var(--radius-sm); background: linear-gradient(100deg, var(--ground-sunken) 30%, var(--frost-hover) 50%, var(--ground-sunken) 70%); background-size: 300% 100%; animation: wk-shimmer var(--duration-breath) var(--ease-breath) infinite; }
.wk-skeleton__bar--title { height: 22px; width: 70%; }
.wk-skeleton__bar--short { width: 45%; }

/* ---------- Strategy (five Ds) ---------- */
.wk-d { --d: var(--d-direct); display: inline-flex; align-items: center; gap: var(--space-2); min-height: 32px; padding: var(--space-1) var(--space-3) var(--space-1) var(--space-1); border-radius: var(--radius-sm); background: var(--frost); box-shadow: var(--inset-frost); color: var(--ink); font: 600 14px/20px var(--font-sans); }
.wk-d--direct { --d: var(--d-direct); } .wk-d--distract { --d: var(--d-distract); } .wk-d--delegate { --d: var(--d-delegate); } .wk-d--delay { --d: var(--d-delay); } .wk-d--document { --d: var(--d-document); }
.wk-d__badge { display: inline-grid; place-items: center; width: 24px; height: 24px; border-radius: var(--radius-sm); background: var(--d); color: var(--on-d); font: 500 13px/1 var(--font-mono); }
.wk-d--plain { background: transparent; box-shadow: none; padding: 0; }
.wk-d--text { color: var(--d); }
.wk-dpick { border: 0; padding: 0; margin: 0; display: grid; gap: var(--space-2); }
.wk-dpick legend { font: 600 15px/20px var(--font-sans); margin-bottom: var(--space-2); padding: 0; }
.wk-dpick__opts { display: flex; flex-wrap: wrap; gap: var(--space-2); }
.wk-dpick__opt { position: relative; }
.wk-dpick__opt input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.wk-dpick__opt label { display: inline-flex; align-items: center; gap: var(--space-2); min-height: var(--target-min); padding: var(--space-2) var(--space-4) var(--space-2) var(--space-2); border-radius: var(--radius-md); background: var(--frost); box-shadow: var(--inset-frost); cursor: pointer; font: 600 15px/20px var(--font-sans); transition: background-color var(--duration-kindle) var(--ease-kindle), box-shadow var(--duration-kindle) var(--ease-kindle); }
.wk-dpick__opt label:hover { background: var(--frost-hover); }
.wk-dpick__opt input:focus-visible + label { box-shadow: var(--inset-frost), var(--focus-ring); }
.wk-dpick__opt input:checked + label { background: var(--lantern-soft); box-shadow: inset 0 0 0 2px var(--d), var(--inset-frost); }
.wk-dpick__check { width: 18px; height: 18px; color: var(--d); opacity: 0; transform: scale(.6); transition: opacity var(--duration-kindle) var(--ease-kindle), transform var(--duration-drift) var(--ease-lift); }
.wk-dpick__opt input:checked + label .wk-dpick__check { opacity: 1; transform: none; }

/* ---------- Trail card ---------- */
.wk-card { position: relative; display: grid; gap: var(--space-3); padding: var(--space-6); border-radius: var(--radius-lg); background: var(--ground-raised); box-shadow: var(--inset-raised); color: var(--ink); max-width: 380px; transition: transform var(--duration-kindle) var(--ease-kindle), box-shadow var(--duration-kindle) var(--ease-kindle); animation: wk-rise var(--duration-rise) var(--ease-kindle) both; }
.wk-card--link { cursor: pointer; }
.wk-card--link:hover { transform: translateY(-2px); box-shadow: var(--inset-raised), var(--glow-soft); }
.wk-card--link:focus-within { box-shadow: var(--inset-raised), var(--focus-ring); }
.wk-card__over { display: flex; justify-content: space-between; align-items: center; gap: var(--space-2); font: 500 12px/16px var(--font-mono); letter-spacing: .12em; text-transform: uppercase; color: var(--ink-muted); }
.wk-card__title { margin: 0; font: 650 22px/28px var(--font-sans); }
.wk-card__title a { color: inherit; text-decoration: none; }
.wk-card__title a::after { content: ""; position: absolute; inset: 0; border-radius: inherit; }
.wk-card__title a:focus-visible { box-shadow: none; }
.wk-card__body { margin: 0; color: var(--ink-muted); font: 400 16px/24px var(--font-sans); }
.wk-card__meta { display: flex; flex-wrap: wrap; gap: var(--space-2) var(--space-4); font: 450 14px/20px var(--font-sans); color: var(--ink-muted); }
.wk-card__meta span { display: inline-flex; align-items: center; gap: var(--space-1); }
.wk-card__ds { display: flex; flex-wrap: wrap; gap: var(--space-2); }
.wk-card__foot { display: flex; align-items: center; justify-content: space-between; gap: var(--space-3); padding-top: var(--space-2); }
.wk-card__go { display: inline-flex; align-items: center; gap: var(--space-1); color: var(--lantern-text); font: 600 15px/20px var(--font-sans); }
.wk-card__go .wk-icon { transition: transform var(--duration-kindle) var(--ease-kindle); }
.wk-card--link:hover .wk-card__go .wk-icon { transform: translateX(3px); }
.wk-card__lit { display: inline-flex; align-items: center; gap: var(--space-1); color: var(--lantern-text); font: 600 14px/20px var(--font-sans); }
.wk-card__note { display: flex; gap: var(--space-2); font: 450 14px/20px var(--font-sans); color: var(--ink-muted); padding: var(--space-2) var(--space-3); border-radius: var(--radius-sm); background: var(--ground-sunken); }

/* ---------- Voice orb ---------- */
.wk-orb { display: grid; justify-items: center; gap: var(--space-4); text-align: center; }
.wk-orb__btn { position: relative; width: var(--orb); height: var(--orb); border: 0; border-radius: var(--radius-round); cursor: pointer; display: grid; place-items: center; background: var(--frost); color: var(--ink); box-shadow: var(--inset-frost); transition: background-color var(--duration-settle) var(--ease-kindle), box-shadow var(--duration-settle) var(--ease-kindle), color var(--duration-settle) var(--ease-kindle); }
.wk-orb__btn:focus-visible { box-shadow: var(--inset-frost), var(--focus-ring); }
.wk-orb__btn .wk-icon { width: 40px; height: 40px; position: relative; z-index: 1; }
.wk-orb__halo { position: absolute; inset: 0; border-radius: inherit; pointer-events: none; transition: transform 90ms linear, opacity var(--duration-settle) var(--ease-kindle); opacity: 0; }
.wk-orb[data-state="idle"] .wk-orb__btn:hover { background: var(--frost-hover); box-shadow: var(--inset-frost), var(--glow-soft); }
.wk-orb[data-state="listening"] .wk-orb__btn { background: var(--voice-you); color: var(--on-lantern); box-shadow: var(--inset-lantern); }
.wk-orb[data-state="listening"] .wk-orb__halo { opacity: 1; box-shadow: var(--glow-voice); }
.wk-orb[data-state="listening"] .wk-orb__btn:focus-visible { box-shadow: var(--inset-lantern), var(--focus-ring); }
.wk-orb[data-state="thinking"] .wk-orb__btn { background: var(--ground-raised); box-shadow: var(--inset-raised); cursor: progress; }
.wk-orb[data-state="speaking"] .wk-orb__btn { background: var(--frost); box-shadow: var(--inset-frost); }
.wk-orb[data-state="speaking"] .wk-orb__halo { opacity: 1; box-shadow: var(--glow-ai); animation: wk-breath var(--duration-breath) var(--ease-breath) infinite; }
.wk-orb[data-state="paused"] .wk-orb__btn { background: var(--ground-sunken); box-shadow: var(--inset-well); color: var(--ink-muted); }
.wk-orb[data-state="blocked"] .wk-orb__btn { background: var(--danger-soft); color: var(--danger); box-shadow: var(--inset-well-error); }
.wk-orb__embers { display: flex; gap: 6px; position: relative; z-index: 1; }
.wk-orb__embers i, .wk-typing i { width: 8px; height: 8px; border-radius: var(--radius-round); background: var(--flame); animation: wk-ember var(--duration-breath) var(--ease-breath) infinite; }
.wk-orb__embers i:nth-child(2), .wk-typing i:nth-child(2) { animation-delay: 160ms; }
.wk-orb__embers i:nth-child(3), .wk-typing i:nth-child(3) { animation-delay: 320ms; }
.wk-orb__wave { display: flex; align-items: center; gap: 4px; height: 40px; position: relative; z-index: 1; }
.wk-orb__wave i { width: 5px; height: 100%; border-radius: var(--radius-sm); background: var(--voice-ai); animation: wk-wave 900ms var(--ease-breath) infinite; }
.wk-orb__wave i:nth-child(2) { animation-delay: 120ms; } .wk-orb__wave i:nth-child(3) { animation-delay: 240ms; } .wk-orb__wave i:nth-child(4) { animation-delay: 360ms; } .wk-orb__wave i:nth-child(5) { animation-delay: 480ms; }
.wk-orb__status { margin: 0; font: 600 17px/24px var(--font-sans); color: var(--ink); min-height: 24px; }
.wk-orb__hint { margin: 0; font: 450 14px/20px var(--font-sans); color: var(--ink-muted); max-width: 30ch; }
.wk-orb[data-state="blocked"] .wk-orb__status { color: var(--danger); }
@media (min-width: 960px) { :root { --orb: 144px; } }
@media (min-width: 1600px) { :root { --orb: 192px; } }

/* ---------- Timer ---------- */
.wk-timer { position: relative; width: var(--timer); height: var(--timer); display: grid; place-items: center; }
.wk-timer svg { position: absolute; inset: 0; transform: rotate(-90deg); }
.wk-timer__track { stroke: var(--ground-sunken); }
.wk-timer__burn { stroke: var(--meter-fill); stroke-linecap: round; transition: stroke-dashoffset 1s linear, stroke var(--duration-settle) var(--ease-kindle); }
.wk-timer--low .wk-timer__burn { stroke: var(--caution); }
.wk-timer__num { position: relative; font: 500 20px/24px var(--font-mono); letter-spacing: .02em; color: var(--ink); text-align: center; }
.wk-timer__num small { display: block; font: 450 12px/16px var(--font-sans); letter-spacing: 0; color: var(--ink-muted); }
.wk-timer__flame { position: absolute; width: 12px; height: 16px; color: var(--flame); left: 50%; top: 50%; margin: -8px 0 0 -6px; transition: transform 1s linear; }

/* ---------- Dialogue ---------- */
.wk-transcript { display: flex; flex-direction: column; gap: var(--space-3); padding: var(--space-5); border-radius: var(--radius-lg); background: var(--ground-sunken); box-shadow: var(--inset-well); max-width: 560px; width: 100%; }
.wk-line { display: grid; gap: var(--space-1); max-width: 85%; animation: wk-rise var(--duration-rise) var(--ease-kindle) both; }
.wk-line__who { display: flex; align-items: center; gap: var(--space-2); font: 600 13px/18px var(--font-sans); color: var(--ink-muted); }
.wk-line__dot { width: 8px; height: 8px; border-radius: var(--radius-round); background: var(--voice-ai); }
.wk-line__bubble { margin: 0; padding: var(--space-3) var(--space-4); border-radius: var(--radius-lg) var(--radius-lg) var(--radius-lg) var(--cut-bubble); background: var(--bubble-ai); box-shadow: var(--inset-frost); font: 420 18px/28px var(--font-sans); color: var(--ink); }
.wk-line--you { align-self: flex-end; justify-self: end; justify-items: end; }
.wk-line--you .wk-line__dot { background: var(--voice-you); }
.wk-line--you .wk-line__bubble { background: var(--bubble-you); border-radius: var(--radius-lg) var(--radius-lg) var(--cut-bubble) var(--radius-lg); }
.wk-line--note { align-self: center; max-width: 100%; }
.wk-line--note .wk-line__bubble { background: transparent; box-shadow: none; font: 450 14px/20px var(--font-sans); color: var(--ink-muted); text-align: center; padding: var(--space-1); }
.wk-typing { display: inline-flex; gap: 5px; padding: var(--space-2) 0; }
.wk-typing i { width: 7px; height: 7px; background: var(--voice-ai); }

/* ---------- Score ---------- */
.wk-score { display: grid; gap: var(--space-6); padding: var(--space-8) var(--space-6); border-radius: var(--radius-xl); background: var(--ground-raised); box-shadow: var(--inset-raised); max-width: 560px; width: 100%; }
.wk-score__head { display: grid; justify-items: start; gap: var(--space-2); }
.wk-score__over { font: 500 12px/16px var(--font-mono); letter-spacing: .12em; text-transform: uppercase; color: var(--ink-muted); }
.wk-score__num { display: flex; align-items: baseline; gap: var(--space-2); font: 600 72px/72px var(--font-sans); letter-spacing: -.02em; font-variant-numeric: tabular-nums; color: var(--ink); }
.wk-score__num small { font: 500 20px/24px var(--font-mono); letter-spacing: 0; color: var(--ink-muted); }
.wk-score__band { font: 600 17px/24px var(--font-sans); color: var(--ink); opacity: 0; transition: opacity var(--duration-rise) var(--ease-kindle); }
.wk-score.is-done .wk-score__band { opacity: 1; }
.wk-score__summary { margin: 0; font: 400 17px/27px var(--font-sans); color: var(--ink-muted); max-width: var(--measure); }
.wk-score__rubric { display: grid; gap: var(--space-4); margin: 0; padding: 0; list-style: none; }
.wk-meter { display: grid; gap: var(--space-2); }
.wk-meter__row { display: flex; justify-content: space-between; gap: var(--space-3); font: 600 15px/20px var(--font-sans); }
.wk-meter__row b { font: 400 14px/20px var(--font-mono); color: var(--ink); }
.wk-meter__track { height: 8px; border-radius: var(--radius-xs); background: var(--meter-track); box-shadow: inset 0 0 0 1px var(--edge); overflow: hidden; }
.wk-meter__fill { height: 100%; border-radius: var(--radius-xs); background: var(--meter-fill); width: 0; transition: width var(--duration-hush) var(--ease-settle); }
.wk-meter__note { margin: 0; font: 400 15px/24px var(--font-sans); color: var(--ink-muted); }
@media (min-width: 1600px) { .wk-score__num { font-size: 128px; line-height: 128px; } }

/* ---------- Notice and content note ---------- */
.wk-notice { --tone: var(--ink); --soft: var(--ground-raised); display: grid; grid-template-columns: auto 1fr; gap: var(--space-1) var(--space-3); padding: var(--space-4) var(--space-5); border-radius: var(--radius-lg); background: var(--soft); box-shadow: var(--inset-frost); color: var(--ink); max-width: 560px; animation: wk-rise var(--duration-rise) var(--ease-kindle) both; }
.wk-notice--safety, .wk-notice--caution { --tone: var(--caution); --soft: var(--caution-soft); }
.wk-notice--danger { --tone: var(--danger); --soft: var(--danger-soft); }
.wk-notice--steady { --tone: var(--steady); --soft: var(--steady-soft); }
.wk-notice__icon { color: var(--tone); margin-top: 2px; }
.wk-notice__title { margin: 0; font: 600 16px/24px var(--font-sans); color: var(--tone); }
.wk-notice__body { grid-column: 2; margin: 0; font: 400 16px/24px var(--font-sans); color: var(--ink); }
.wk-notice__action { grid-column: 2; margin-top: var(--space-2); }
.wk-cnote { display: grid; gap: var(--space-4); padding: var(--space-6); border-radius: var(--radius-xl); background: var(--ground-raised); box-shadow: var(--inset-raised); max-width: 520px; }
.wk-cnote__title { margin: 0; font: 650 24px/30px var(--font-sans); }
.wk-cnote__lead { margin: 0; font: 400 17px/27px var(--font-sans); color: var(--ink-muted); }
.wk-cnote__list { margin: 0; padding: 0; list-style: none; display: grid; gap: var(--space-2); }
.wk-cnote__list li { display: flex; gap: var(--space-2); align-items: flex-start; font: 400 16px/24px var(--font-sans); }
.wk-cnote__list li::before { content: ""; flex: none; width: 6px; height: 6px; margin-top: 9px; border-radius: var(--radius-round); background: var(--caution); }
.wk-cnote__exit { margin: 0; font: 450 14px/20px var(--font-sans); color: var(--ink-muted); display: flex; gap: var(--space-2); align-items: center; }

/* ---------- Tiles: streak and lantern ---------- */
.wk-tile { position: relative; display: grid; gap: var(--space-3); padding: var(--space-6); border-radius: var(--cut-arch) var(--cut-arch) var(--radius-lg) var(--radius-lg) / 48px 48px var(--radius-lg) var(--radius-lg); background: var(--ground-raised); box-shadow: var(--inset-raised); max-width: 320px; text-align: center; justify-items: center; }
.wk-tile__bracket { position: absolute; width: var(--ornament-bracket); height: var(--ornament-bracket); color: var(--edge); }
.wk-tile__bracket--bl { left: 10px; bottom: 10px; transform: rotate(-90deg); }
.wk-tile__bracket--br { right: 10px; bottom: 10px; transform: rotate(180deg); }
.wk-streak__flame { width: 44px; height: 44px; color: var(--flame); transform-origin: 50% 90%; animation: wk-flicker var(--duration-breath) var(--ease-breath) infinite; }
.wk-streak__count { margin: 0; font: 600 40px/44px var(--font-sans); color: var(--lantern-text); font-variant-numeric: tabular-nums; }
.wk-streak__label { margin: 0; font: 600 16px/22px var(--font-sans); }
.wk-streak__sub { margin: 0; font: 450 14px/20px var(--font-sans); color: var(--ink-muted); }
.wk-week { display: flex; gap: var(--space-3); margin: 0; padding: 0; list-style: none; }
.wk-week li { display: grid; justify-items: center; gap: var(--space-1); font: 500 12px/16px var(--font-mono); color: var(--ink-muted); }
.wk-week__dot { width: 12px; height: 12px; border-radius: var(--radius-round); background: var(--ground-sunken); box-shadow: inset 0 0 0 1px var(--edge); }
.wk-week__dot.is-lit { background: var(--flame); box-shadow: 0 0 8px var(--flame); }
.wk-week__dot.is-today { animation: wk-kindle var(--duration-settle) var(--ease-lift) both; }
.wk-lantern { position: relative; display: grid; justify-items: center; align-content: end; gap: var(--space-2); width: 168px; min-height: 220px; padding: var(--space-5) var(--space-4); text-align: center; color: var(--ink); background: var(--ground-raised); box-shadow: var(--inset-raised); clip-path: polygon(50% 0, 62% 4%, 73% 10%, 83% 18%, 91% 28%, 97% 39%, 100% 50%, 100% 100%, 0 100%, 0 50%, 3% 39%, 9% 28%, 17% 18%, 27% 10%, 38% 4%); }
.wk-lantern::before { content: ""; position: absolute; left: 50%; top: 34%; width: 120px; height: 120px; margin-left: -60px; border-radius: var(--radius-round); background: radial-gradient(closest-side, var(--lantern-pool), transparent); opacity: 0; transition: opacity var(--duration-settle) var(--ease-kindle); }
.wk-lantern.is-lit::before { opacity: .35; }
.wk-lantern__flame { position: relative; width: 28px; height: 36px; color: var(--flame); margin-bottom: var(--space-3); transform-origin: 50% 90%; }
.wk-lantern.is-lit .wk-lantern__flame { animation: wk-kindle var(--duration-settle) var(--ease-lift) both, wk-flicker var(--duration-breath) var(--ease-breath) var(--duration-settle) infinite; }
.wk-lantern:not(.is-lit) .wk-lantern__flame { color: var(--vein); }
.wk-lantern__title { position: relative; margin: 0; font: 600 15px/20px var(--font-sans); }
.wk-lantern__meta { position: relative; margin: 0; font: 400 13px/18px var(--font-mono); color: var(--ink-muted); }

/* ---------- Field ---------- */
.wk-field { display: grid; gap: var(--space-2); max-width: 480px; width: 100%; }
.wk-field__label { font: 600 15px/20px var(--font-sans); color: var(--ink); }
.wk-field__hint { font: 450 14px/20px var(--font-sans); color: var(--ink-muted); margin: 0; }
.wk-field__control { width: 100%; min-height: var(--target-comfort); padding: var(--space-3) var(--space-4); border: 0; border-radius: var(--radius-md); background: var(--ground-sunken); color: var(--ink); box-shadow: var(--inset-well); font: 400 16px/24px var(--font-sans); resize: vertical; transition: box-shadow var(--duration-kindle) var(--ease-kindle); }
.wk-field__control:disabled { opacity: var(--opacity-disabled); cursor: not-allowed; }
.wk-field__control::placeholder { color: var(--ink-muted); opacity: 1; }
.wk-field__control:focus-visible { box-shadow: var(--inset-well-focus), var(--focus-ring); }
.wk-field__control[aria-invalid="true"] { box-shadow: var(--inset-well-error); }
.wk-field__control[aria-invalid="true"]:focus-visible { box-shadow: var(--inset-well-error), var(--focus-ring); }
.wk-field__foot { display: flex; justify-content: space-between; gap: var(--space-3); }
.wk-field__error { display: flex; gap: var(--space-1); align-items: flex-start; margin: 0; font: 600 14px/20px var(--font-sans); color: var(--danger); }
.wk-field__count { margin-left: auto; font: 400 13px/20px var(--font-mono); color: var(--ink-muted); }

/* ---------- Switch and checkbox ---------- */
.wk-switch { display: inline-flex; align-items: center; gap: var(--space-3); min-height: var(--target-min); cursor: pointer; font: 600 15px/20px var(--font-sans); }
.wk-switch input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.wk-switch__track { position: relative; flex: none; width: 52px; height: 30px; border-radius: 15px; background: var(--ground-sunken); box-shadow: inset 0 0 0 2px var(--sill), inset 0 3px 6px #00000059; transition: background-color var(--duration-drift) var(--ease-kindle), box-shadow var(--duration-drift) var(--ease-kindle); }
.wk-switch__knob { position: absolute; top: 5px; left: 5px; width: 20px; height: 20px; border-radius: var(--radius-round); background: var(--sill); transition: transform var(--duration-drift) var(--ease-lift), background-color var(--duration-drift) var(--ease-kindle); }
.wk-switch input:checked + .wk-switch__track { background: var(--lantern); box-shadow: var(--inset-lantern), var(--glow-lantern); }
.wk-switch input:checked + .wk-switch__track .wk-switch__knob { transform: translateX(22px); background: var(--on-lantern); }
.wk-switch input:focus-visible + .wk-switch__track { box-shadow: inset 0 0 0 2px var(--sill), var(--focus-ring); }
.wk-switch input:checked:focus-visible + .wk-switch__track { box-shadow: var(--inset-lantern), var(--focus-ring); }
.wk-switch__state { font: 400 13px/20px var(--font-mono); color: var(--ink-muted); }
.wk-check { display: inline-flex; align-items: flex-start; gap: var(--space-3); min-height: var(--target-min); cursor: pointer; font: 400 16px/24px var(--font-sans); max-width: 480px; }
.wk-check input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.wk-check__box { flex: none; display: grid; place-items: center; width: 24px; height: 24px; border-radius: var(--radius-sm); background: var(--ground-sunken); box-shadow: inset 0 0 0 2px var(--sill); color: var(--on-lantern); transition: background-color var(--duration-kindle) var(--ease-kindle); }
.wk-check__box svg { stroke-dasharray: 24; stroke-dashoffset: 24; }
.wk-check input:checked + .wk-check__box { background: var(--lantern); box-shadow: var(--inset-lantern); }
.wk-check input:checked + .wk-check__box svg { animation: wk-draw var(--duration-drift) var(--ease-kindle) forwards; }
.wk-check input:focus-visible + .wk-check__box { box-shadow: inset 0 0 0 2px var(--sill), var(--focus-ring); }

/* ---------- Tabs and navigation ---------- */
.wk-tabs__list { position: relative; display: inline-flex; gap: var(--space-1); padding: var(--space-1); border-radius: var(--radius-md); background: var(--ground-sunken); box-shadow: var(--inset-well); }
.wk-tabs__tab { position: relative; z-index: 1; min-height: 40px; min-width: var(--target-min); padding: var(--space-2) var(--space-4); border: 0; border-radius: var(--radius-sm); background: transparent; color: var(--ink-muted); font: 600 15px/20px var(--font-sans); cursor: pointer; transition: color var(--duration-kindle) var(--ease-kindle); }
.wk-tabs__tab:hover { color: var(--ink); }
.wk-tabs__tab[aria-selected="true"] { color: var(--ink); }
.wk-tabs__tab:focus-visible { box-shadow: var(--focus-ring); }
.wk-tabs__mark { position: absolute; top: var(--space-1); bottom: var(--space-1); border-radius: var(--radius-sm); background: var(--frost); box-shadow: var(--inset-frost), inset 0 -2px 0 var(--lantern); transition: left var(--duration-drift) var(--ease-lift), width var(--duration-drift) var(--ease-lift); }
.wk-tabs__panel { padding: var(--space-4) 0 0; }
.wk-tabs__panel:focus-visible { box-shadow: var(--focus-ring); }
.wk-nav { display: flex; justify-content: space-around; gap: var(--space-1); padding: var(--space-2) var(--space-2) calc(var(--space-2) + env(safe-area-inset-bottom, 0px)); background: var(--ground-raised); box-shadow: var(--inset-raised); z-index: var(--stratum-path); width: 100%; max-width: 440px; border-radius: var(--radius-lg); }
.wk-nav__item { display: grid; justify-items: center; gap: 2px; flex: 1; min-height: 56px; padding: var(--space-2) var(--space-1); border-radius: var(--radius-md); color: var(--ink-muted); text-decoration: none; font: 600 13px/16px var(--font-sans); transition: background-color var(--duration-kindle) var(--ease-kindle), color var(--duration-kindle) var(--ease-kindle); }
.wk-nav__item:hover { color: var(--ink); background: var(--frost); }
.wk-nav__item[aria-current="page"] { color: var(--lantern-text); background: var(--lantern-soft); }
.wk-nav__item[aria-current="page"] .wk-icon { animation: wk-kindle var(--duration-drift) var(--ease-lift) both; }
.wk-nav__item:focus-visible { box-shadow: var(--focus-ring); }
.wk-nav--rail { flex-direction: column; justify-content: flex-start; width: 96px; max-width: none; padding: var(--space-3); }

/* ---------- Toast ---------- */
.wk-toast { position: relative; display: grid; grid-template-columns: auto 1fr auto; align-items: start; gap: var(--space-3); padding: var(--space-4) var(--space-4) var(--space-4) var(--space-5); border-radius: var(--radius-lg); background: var(--ground-raised); box-shadow: var(--inset-raised), var(--bleed-night); color: var(--ink); max-width: 420px; z-index: var(--stratum-signal); overflow: hidden; animation: wk-rise var(--duration-rise) var(--ease-kindle) both; }
.wk-toast--steady { background: var(--steady-soft); }
.wk-toast--steady .wk-toast__icon { color: var(--steady); }
.wk-toast--danger { background: var(--danger-soft); }
.wk-toast--danger .wk-toast__icon { color: var(--danger); }
.wk-toast__title { margin: 0; font: 600 16px/22px var(--font-sans); }
.wk-toast__body { margin: 2px 0 0; font: 400 15px/22px var(--font-sans); color: var(--ink-muted); }
.wk-toast__timer { position: absolute; left: 0; bottom: 0; height: 3px; background: var(--edge); animation: wk-countdown linear forwards; }
.wk-toast:hover .wk-toast__timer, .wk-toast:focus-within .wk-toast__timer { animation-play-state: paused; }

/* ---------- Dialog ---------- */
.wk-dialog { position: fixed; inset: 0; z-index: var(--stratum-lantern); display: grid; place-items: center; padding: var(--space-4); }
.wk-dialog__veil { position: absolute; inset: 0; background: var(--veil); opacity: var(--opacity-scrim); -webkit-backdrop-filter: blur(var(--blur-veil)); backdrop-filter: blur(var(--blur-veil)); animation: wk-fade var(--duration-rise) var(--ease-kindle) both; }
.wk-dialog__panel { position: relative; display: grid; gap: var(--space-4); width: 100%; max-width: 440px; padding: var(--space-6); border-radius: var(--radius-xl); background: var(--ground-raised); box-shadow: var(--inset-raised), var(--bleed-night); animation: wk-rise var(--duration-rise) var(--ease-kindle) both; }
.wk-dialog__title { margin: 0; font: 600 20px/28px var(--font-sans); }
.wk-dialog__body { margin: 0; font: 400 16px/26px var(--font-sans); color: var(--ink-muted); }
.wk-dialog__actions { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: var(--space-3); }

/* ---------- Empty state ---------- */
.wk-empty { display: grid; justify-items: center; gap: var(--space-3); padding: var(--space-8) var(--space-6); text-align: center; max-width: 420px; }
.wk-empty__art { position: relative; width: 96px; height: 132px; color: var(--edge); }
.wk-empty__art .wk-flame { position: absolute; left: 50%; bottom: 26px; width: 22px; height: 28px; margin-left: -11px; color: var(--vein); transition: color var(--duration-settle) var(--ease-kindle); }
.wk-empty:hover .wk-empty__art .wk-flame { color: var(--flame); }
.wk-empty__title { margin: 0; font: 600 20px/28px var(--font-sans); }
.wk-empty__aside { margin: 0; font: 400 20px/28px var(--font-display); color: var(--ink-muted); }
.wk-empty__body { margin: 0; font: 400 16px/24px var(--font-sans); color: var(--ink-muted); }

/* ---------- Frame: mark, scenery, rule ---------- */
.wk-mark { display: inline-flex; align-items: center; gap: var(--space-3); color: var(--ink); }
.wk-mark__pane { fill: var(--ground-raised); }
[data-theme="dawn"] .wk-mark__pane { fill: var(--pine); }
.wk-mark__flame { fill: var(--lantern-amber); transform-origin: 32px 47px; }
.wk-mark__core { fill: var(--flame-core); }
.wk-mark__wick { stroke: var(--parchment); }
.wk-mark--live .wk-mark__flame, .wk-mark--live .wk-mark__core { animation: wk-flicker var(--duration-breath) var(--ease-breath) infinite; transform-origin: 32px 47px; }
.wk-wordmark__ink { fill: var(--ink); }
.wk-wordmark__flame { fill: var(--flame); }
.wk-wordmark__core { fill: var(--flame-core); }
[data-theme="dawn"] .wk-wordmark__core { fill: var(--lantern-amber); }
.wk-scenery { position: relative; overflow: hidden; height: 200px; pointer-events: none; }
.wk-scenery__pool { position: absolute; left: 50%; bottom: 10%; width: 70%; height: 140%; transform: translate(-50%, 0); border-radius: var(--radius-round); background: radial-gradient(closest-side, var(--lantern-pool), transparent); opacity: var(--opacity-pool); filter: blur(var(--blur-glow)); animation: wk-pool var(--duration-night) var(--ease-breath) infinite; }
.wk-scenery svg { position: absolute; left: 0; bottom: 0; width: 100%; height: 100%; }
.wk-scenery__far { fill: var(--tree-far); opacity: var(--opacity-scenery); }
.wk-scenery__near { fill: var(--tree-near); }
.wk-rule { display: flex; align-items: center; gap: var(--space-3); width: 100%; max-width: 360px; color: var(--flame); }
.wk-rule::before, .wk-rule::after { content: ""; flex: 1; height: var(--ornament-rule); background: linear-gradient(to right, transparent, var(--vein)); }
.wk-rule::after { background: linear-gradient(to left, transparent, var(--vein)); }
.wk-rule svg { width: var(--ornament-flame); height: 14px; }

/* ---------- motion preferences ---------- */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 1ms !important; animation-iteration-count: 1 !important; transition-duration: 1ms !important; }
  .wk-loader--indeterminate .wk-loader__head { animation: none !important; left: 50%; }
}
[data-motion="still"] *, [data-motion="still"] *::before, [data-motion="still"] *::after { animation-duration: 1ms !important; animation-iteration-count: 1 !important; transition-duration: 1ms !important; }

/* ---------- forced states (documentation only: lets a page show hover, focus and press side by side) ---------- */
.wk-btn--lantern.is-hover { background: var(--lantern-hover); box-shadow: var(--inset-lantern), var(--glow-lantern); }
.wk-btn--frost.is-hover { background: var(--frost-hover); box-shadow: var(--inset-frost), var(--glow-soft); }
.wk-btn--quiet.is-hover { text-decoration-thickness: 2px; background: var(--frost); box-shadow: var(--inset-frost); }
.wk-btn--exit.is-hover { background: var(--frost-hover); }
.wk-btn--lantern.is-focus { box-shadow: var(--inset-lantern), var(--focus-ring); }
.wk-btn--frost.is-focus, .wk-btn--exit.is-focus { box-shadow: var(--inset-frost), var(--focus-ring); }
.wk-btn--quiet.is-focus { box-shadow: var(--focus-ring); }
.wk-btn.is-press { box-shadow: var(--inset-press) !important; transform: translateY(1px); }
.wk-card.is-hover { transform: translateY(-2px); box-shadow: var(--inset-raised), var(--glow-soft); }
.wk-card.is-focus { box-shadow: var(--inset-raised), var(--focus-ring); }
.wk-field__control.is-focus { box-shadow: var(--inset-well-focus), var(--focus-ring); }

/* ---------- documentation pages ---------- */
.wk-doc { position: relative; padding: var(--space-10); color: var(--ink); }
.wk-doc__head { max-width: 760px; margin: 0 0 var(--space-8); }
.wk-doc__over { margin: 0 0 var(--space-2); font: 500 12px/16px var(--font-mono); letter-spacing: .12em; text-transform: uppercase; color: var(--ink-muted); }
.wk-doc__title { margin: 0 0 var(--space-3); font: 500 40px/44px var(--font-display); }
.wk-doc__lead { margin: 0; font: 400 18px/28px var(--font-sans); color: var(--ink-muted); max-width: var(--measure); }
.wk-doc__h { margin: var(--space-10) 0 var(--space-4); font: 400 28px/34px var(--font-display); }
.wk-doc__h3 { margin: 0 0 var(--space-2); font: 600 17px/24px var(--font-sans); }
.wk-doc__p { margin: 0 0 var(--space-3); font: 400 16px/26px var(--font-sans); color: var(--ink-muted); max-width: var(--measure); }
.wk-doc__grid { display: grid; gap: var(--space-6); grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }
.wk-doc__grid--2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.wk-doc__grid--3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.wk-doc__panel { padding: var(--space-6); border-radius: var(--radius-lg); background: var(--ground-raised); box-shadow: var(--inset-raised); }
.wk-doc__panel--sunken { background: var(--ground-sunken); box-shadow: var(--inset-well); }
.wk-doc__label { display: block; margin-bottom: var(--space-3); font: 500 12px/16px var(--font-mono); letter-spacing: .12em; text-transform: uppercase; color: var(--ink-muted); }
.wk-doc__table { width: 100%; border-collapse: collapse; font: 400 15px/22px var(--font-sans); }
.wk-doc__table th { text-align: left; font: 500 12px/16px var(--font-mono); letter-spacing: .1em; text-transform: uppercase; color: var(--ink-muted); padding: var(--space-2) var(--space-3); border-bottom: 1px solid var(--edge); }
.wk-doc__table td { padding: var(--space-3); border-bottom: 1px solid var(--vein); vertical-align: top; }
.wk-doc__table code, .wk-doc code { font: 400 13px/20px var(--font-mono); color: var(--lantern-text); }
.wk-doc__verdict { display: inline-flex; align-items: center; gap: var(--space-1); font: 600 14px/20px var(--font-sans); }
.wk-doc__verdict--yes { color: var(--steady); }
.wk-doc__verdict--no { color: var(--danger); }
.wk-doc__swatch { width: 100%; height: 56px; border-radius: var(--radius-md); }
.wk-doc__phone { width: 360px; min-height: 740px; border-radius: 36px; overflow: hidden; position: relative; background: var(--ground); box-shadow: 0 0 0 10px var(--ground-sunken), 0 0 0 11px var(--edge), var(--bleed-night); }
.wk-doc__replay { margin-top: var(--space-3); }

/* ---------- Gilded ornaments (quest-menu style, ported from Enchanted Grove) ---------- */
.wk-ornate { position: relative; isolation: isolate; --orn-size: var(--ornament-corner); --orn-inset: var(--ornament-inset); }
:where(.wk-ornate) > :where(*) { position: relative; z-index: 1; }
.wk-ornate::before { content: ""; position: absolute; inset: var(--orn-inset); z-index: 0; pointer-events: none;
  background: linear-gradient(135deg, var(--gold-deep) 0%, var(--gold-bright) 28%, var(--gold) 52%, var(--gold-bright) 76%, var(--gold-deep) 100%);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='64' height='64'%3E%3Cg%3E%3Cg fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 62 L5 22 Q5 5 22 5 L62 5'/%3E%3Cpath d='M11 50 L11 26 Q11 11 26 11 L50 11'/%3E%3Cpath d='M58 5 L58.68 5.12 L59.33 5.31 L59.95 5.58 L60.53 5.91 L61.05 6.3 L61.52 6.75 L61.93 7.23 L62.27 7.76 L62.54 8.31 L62.75 8.88 L62.89 9.47 L62.95 10.06 L62.95 10.64 L62.88 11.2 L62.74 11.75 L62.55 12.27 L62.3 12.75 L62 13.2 L61.65 13.6 L61.27 13.94 L60.86 14.24 L60.42 14.48 L59.97 14.67 L59.5 14.79 L59.04 14.86 L58.57 14.88 L58.12 14.84 L57.69 14.75 L57.27 14.61 L56.89 14.42 L56.53 14.2 L56.22 13.94 L55.94 13.65 L55.71 13.34 L55.51 13.01 L55.37 12.67 L55.26 12.32 L55.2 11.97 L55.19 11.63 L55.22 11.29 L55.28 10.97 L55.38 10.67 L55.51 10.39 L55.68 10.14 L55.86 9.91 L56.07 9.72 L56.29 9.55 L56.52 9.43 L56.76 9.33 L57 9.27 L57.24 9.24 L57.47 9.24 L57.69 9.27 L57.89 9.32 L58.08 9.4 L58.25 9.5 L58.4 9.62 L58.53 9.75 L58.63 9.88 L58.71 10.03'/%3E%3Cpath d='M5 58 L5.12 58.68 L5.31 59.33 L5.58 59.95 L5.91 60.53 L6.3 61.05 L6.75 61.52 L7.23 61.93 L7.76 62.27 L8.31 62.54 L8.88 62.75 L9.47 62.89 L10.06 62.95 L10.64 62.95 L11.2 62.88 L11.75 62.74 L12.27 62.55 L12.75 62.3 L13.2 62 L13.6 61.65 L13.94 61.27 L14.24 60.86 L14.48 60.42 L14.67 59.97 L14.79 59.5 L14.86 59.04 L14.88 58.57 L14.84 58.12 L14.75 57.69 L14.61 57.27 L14.42 56.89 L14.2 56.53 L13.94 56.22 L13.65 55.94 L13.34 55.71 L13.01 55.51 L12.67 55.37 L12.32 55.26 L11.97 55.2 L11.63 55.19 L11.29 55.22 L10.97 55.28 L10.67 55.38 L10.39 55.51 L10.14 55.68 L9.91 55.86 L9.72 56.07 L9.55 56.29 L9.43 56.52 L9.33 56.76 L9.27 57 L9.24 57.24 L9.24 57.47 L9.27 57.69 L9.32 57.89 L9.4 58.08 L9.5 58.25 L9.62 58.4 L9.75 58.53 L9.88 58.63 L10.03 58.71'/%3E%3Cpath d='M11 26 C16 22 22 18 26 22 C30 26 25 32 21 29 C18 27 20 23 23 24'/%3E%3Cpath d='M26 11 C22 16 18 22 22 26'/%3E%3Cpath d='M30 11 C34 18 42 18 44 13'/%3E%3Cpath d='M11 30 C18 34 18 42 13 44'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M36 5 Q39.28 8.53 44.72 7.24 Q40.57 3.49 36 5 Z'/%3E%3Cpath d='M5 36 Q3.49 40.57 7.24 44.72 Q8.53 39.28 5 36 Z'/%3E%3Cpath d='M5 1.8 L8.2 5 L5 8.2 L1.8 5 Z'/%3E%3Cpath d='M48 5 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M5 48 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M24 21.8 L26.2 24 L24 26.2 L21.8 24 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") left top / var(--orn-size) var(--orn-size) no-repeat, url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='64' height='64'%3E%3Cg transform='translate%2864 0%29 scale%28-1 1%29'%3E%3Cg fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 62 L5 22 Q5 5 22 5 L62 5'/%3E%3Cpath d='M11 50 L11 26 Q11 11 26 11 L50 11'/%3E%3Cpath d='M58 5 L58.68 5.12 L59.33 5.31 L59.95 5.58 L60.53 5.91 L61.05 6.3 L61.52 6.75 L61.93 7.23 L62.27 7.76 L62.54 8.31 L62.75 8.88 L62.89 9.47 L62.95 10.06 L62.95 10.64 L62.88 11.2 L62.74 11.75 L62.55 12.27 L62.3 12.75 L62 13.2 L61.65 13.6 L61.27 13.94 L60.86 14.24 L60.42 14.48 L59.97 14.67 L59.5 14.79 L59.04 14.86 L58.57 14.88 L58.12 14.84 L57.69 14.75 L57.27 14.61 L56.89 14.42 L56.53 14.2 L56.22 13.94 L55.94 13.65 L55.71 13.34 L55.51 13.01 L55.37 12.67 L55.26 12.32 L55.2 11.97 L55.19 11.63 L55.22 11.29 L55.28 10.97 L55.38 10.67 L55.51 10.39 L55.68 10.14 L55.86 9.91 L56.07 9.72 L56.29 9.55 L56.52 9.43 L56.76 9.33 L57 9.27 L57.24 9.24 L57.47 9.24 L57.69 9.27 L57.89 9.32 L58.08 9.4 L58.25 9.5 L58.4 9.62 L58.53 9.75 L58.63 9.88 L58.71 10.03'/%3E%3Cpath d='M5 58 L5.12 58.68 L5.31 59.33 L5.58 59.95 L5.91 60.53 L6.3 61.05 L6.75 61.52 L7.23 61.93 L7.76 62.27 L8.31 62.54 L8.88 62.75 L9.47 62.89 L10.06 62.95 L10.64 62.95 L11.2 62.88 L11.75 62.74 L12.27 62.55 L12.75 62.3 L13.2 62 L13.6 61.65 L13.94 61.27 L14.24 60.86 L14.48 60.42 L14.67 59.97 L14.79 59.5 L14.86 59.04 L14.88 58.57 L14.84 58.12 L14.75 57.69 L14.61 57.27 L14.42 56.89 L14.2 56.53 L13.94 56.22 L13.65 55.94 L13.34 55.71 L13.01 55.51 L12.67 55.37 L12.32 55.26 L11.97 55.2 L11.63 55.19 L11.29 55.22 L10.97 55.28 L10.67 55.38 L10.39 55.51 L10.14 55.68 L9.91 55.86 L9.72 56.07 L9.55 56.29 L9.43 56.52 L9.33 56.76 L9.27 57 L9.24 57.24 L9.24 57.47 L9.27 57.69 L9.32 57.89 L9.4 58.08 L9.5 58.25 L9.62 58.4 L9.75 58.53 L9.88 58.63 L10.03 58.71'/%3E%3Cpath d='M11 26 C16 22 22 18 26 22 C30 26 25 32 21 29 C18 27 20 23 23 24'/%3E%3Cpath d='M26 11 C22 16 18 22 22 26'/%3E%3Cpath d='M30 11 C34 18 42 18 44 13'/%3E%3Cpath d='M11 30 C18 34 18 42 13 44'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M36 5 Q39.28 8.53 44.72 7.24 Q40.57 3.49 36 5 Z'/%3E%3Cpath d='M5 36 Q3.49 40.57 7.24 44.72 Q8.53 39.28 5 36 Z'/%3E%3Cpath d='M5 1.8 L8.2 5 L5 8.2 L1.8 5 Z'/%3E%3Cpath d='M48 5 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M5 48 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M24 21.8 L26.2 24 L24 26.2 L21.8 24 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") right top / var(--orn-size) var(--orn-size) no-repeat, url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='64' height='64'%3E%3Cg transform='translate%280 64%29 scale%281 -1%29'%3E%3Cg fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 62 L5 22 Q5 5 22 5 L62 5'/%3E%3Cpath d='M11 50 L11 26 Q11 11 26 11 L50 11'/%3E%3Cpath d='M58 5 L58.68 5.12 L59.33 5.31 L59.95 5.58 L60.53 5.91 L61.05 6.3 L61.52 6.75 L61.93 7.23 L62.27 7.76 L62.54 8.31 L62.75 8.88 L62.89 9.47 L62.95 10.06 L62.95 10.64 L62.88 11.2 L62.74 11.75 L62.55 12.27 L62.3 12.75 L62 13.2 L61.65 13.6 L61.27 13.94 L60.86 14.24 L60.42 14.48 L59.97 14.67 L59.5 14.79 L59.04 14.86 L58.57 14.88 L58.12 14.84 L57.69 14.75 L57.27 14.61 L56.89 14.42 L56.53 14.2 L56.22 13.94 L55.94 13.65 L55.71 13.34 L55.51 13.01 L55.37 12.67 L55.26 12.32 L55.2 11.97 L55.19 11.63 L55.22 11.29 L55.28 10.97 L55.38 10.67 L55.51 10.39 L55.68 10.14 L55.86 9.91 L56.07 9.72 L56.29 9.55 L56.52 9.43 L56.76 9.33 L57 9.27 L57.24 9.24 L57.47 9.24 L57.69 9.27 L57.89 9.32 L58.08 9.4 L58.25 9.5 L58.4 9.62 L58.53 9.75 L58.63 9.88 L58.71 10.03'/%3E%3Cpath d='M5 58 L5.12 58.68 L5.31 59.33 L5.58 59.95 L5.91 60.53 L6.3 61.05 L6.75 61.52 L7.23 61.93 L7.76 62.27 L8.31 62.54 L8.88 62.75 L9.47 62.89 L10.06 62.95 L10.64 62.95 L11.2 62.88 L11.75 62.74 L12.27 62.55 L12.75 62.3 L13.2 62 L13.6 61.65 L13.94 61.27 L14.24 60.86 L14.48 60.42 L14.67 59.97 L14.79 59.5 L14.86 59.04 L14.88 58.57 L14.84 58.12 L14.75 57.69 L14.61 57.27 L14.42 56.89 L14.2 56.53 L13.94 56.22 L13.65 55.94 L13.34 55.71 L13.01 55.51 L12.67 55.37 L12.32 55.26 L11.97 55.2 L11.63 55.19 L11.29 55.22 L10.97 55.28 L10.67 55.38 L10.39 55.51 L10.14 55.68 L9.91 55.86 L9.72 56.07 L9.55 56.29 L9.43 56.52 L9.33 56.76 L9.27 57 L9.24 57.24 L9.24 57.47 L9.27 57.69 L9.32 57.89 L9.4 58.08 L9.5 58.25 L9.62 58.4 L9.75 58.53 L9.88 58.63 L10.03 58.71'/%3E%3Cpath d='M11 26 C16 22 22 18 26 22 C30 26 25 32 21 29 C18 27 20 23 23 24'/%3E%3Cpath d='M26 11 C22 16 18 22 22 26'/%3E%3Cpath d='M30 11 C34 18 42 18 44 13'/%3E%3Cpath d='M11 30 C18 34 18 42 13 44'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M36 5 Q39.28 8.53 44.72 7.24 Q40.57 3.49 36 5 Z'/%3E%3Cpath d='M5 36 Q3.49 40.57 7.24 44.72 Q8.53 39.28 5 36 Z'/%3E%3Cpath d='M5 1.8 L8.2 5 L5 8.2 L1.8 5 Z'/%3E%3Cpath d='M48 5 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M5 48 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M24 21.8 L26.2 24 L24 26.2 L21.8 24 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") left bottom / var(--orn-size) var(--orn-size) no-repeat, url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='64' height='64'%3E%3Cg transform='translate%2864 64%29 scale%28-1 -1%29'%3E%3Cg fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 62 L5 22 Q5 5 22 5 L62 5'/%3E%3Cpath d='M11 50 L11 26 Q11 11 26 11 L50 11'/%3E%3Cpath d='M58 5 L58.68 5.12 L59.33 5.31 L59.95 5.58 L60.53 5.91 L61.05 6.3 L61.52 6.75 L61.93 7.23 L62.27 7.76 L62.54 8.31 L62.75 8.88 L62.89 9.47 L62.95 10.06 L62.95 10.64 L62.88 11.2 L62.74 11.75 L62.55 12.27 L62.3 12.75 L62 13.2 L61.65 13.6 L61.27 13.94 L60.86 14.24 L60.42 14.48 L59.97 14.67 L59.5 14.79 L59.04 14.86 L58.57 14.88 L58.12 14.84 L57.69 14.75 L57.27 14.61 L56.89 14.42 L56.53 14.2 L56.22 13.94 L55.94 13.65 L55.71 13.34 L55.51 13.01 L55.37 12.67 L55.26 12.32 L55.2 11.97 L55.19 11.63 L55.22 11.29 L55.28 10.97 L55.38 10.67 L55.51 10.39 L55.68 10.14 L55.86 9.91 L56.07 9.72 L56.29 9.55 L56.52 9.43 L56.76 9.33 L57 9.27 L57.24 9.24 L57.47 9.24 L57.69 9.27 L57.89 9.32 L58.08 9.4 L58.25 9.5 L58.4 9.62 L58.53 9.75 L58.63 9.88 L58.71 10.03'/%3E%3Cpath d='M5 58 L5.12 58.68 L5.31 59.33 L5.58 59.95 L5.91 60.53 L6.3 61.05 L6.75 61.52 L7.23 61.93 L7.76 62.27 L8.31 62.54 L8.88 62.75 L9.47 62.89 L10.06 62.95 L10.64 62.95 L11.2 62.88 L11.75 62.74 L12.27 62.55 L12.75 62.3 L13.2 62 L13.6 61.65 L13.94 61.27 L14.24 60.86 L14.48 60.42 L14.67 59.97 L14.79 59.5 L14.86 59.04 L14.88 58.57 L14.84 58.12 L14.75 57.69 L14.61 57.27 L14.42 56.89 L14.2 56.53 L13.94 56.22 L13.65 55.94 L13.34 55.71 L13.01 55.51 L12.67 55.37 L12.32 55.26 L11.97 55.2 L11.63 55.19 L11.29 55.22 L10.97 55.28 L10.67 55.38 L10.39 55.51 L10.14 55.68 L9.91 55.86 L9.72 56.07 L9.55 56.29 L9.43 56.52 L9.33 56.76 L9.27 57 L9.24 57.24 L9.24 57.47 L9.27 57.69 L9.32 57.89 L9.4 58.08 L9.5 58.25 L9.62 58.4 L9.75 58.53 L9.88 58.63 L10.03 58.71'/%3E%3Cpath d='M11 26 C16 22 22 18 26 22 C30 26 25 32 21 29 C18 27 20 23 23 24'/%3E%3Cpath d='M26 11 C22 16 18 22 22 26'/%3E%3Cpath d='M30 11 C34 18 42 18 44 13'/%3E%3Cpath d='M11 30 C18 34 18 42 13 44'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M36 5 Q39.28 8.53 44.72 7.24 Q40.57 3.49 36 5 Z'/%3E%3Cpath d='M5 36 Q3.49 40.57 7.24 44.72 Q8.53 39.28 5 36 Z'/%3E%3Cpath d='M5 1.8 L8.2 5 L5 8.2 L1.8 5 Z'/%3E%3Cpath d='M48 5 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M5 48 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M24 21.8 L26.2 24 L24 26.2 L21.8 24 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") right bottom / var(--orn-size) var(--orn-size) no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='64' height='64'%3E%3Cg%3E%3Cg fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 62 L5 22 Q5 5 22 5 L62 5'/%3E%3Cpath d='M11 50 L11 26 Q11 11 26 11 L50 11'/%3E%3Cpath d='M58 5 L58.68 5.12 L59.33 5.31 L59.95 5.58 L60.53 5.91 L61.05 6.3 L61.52 6.75 L61.93 7.23 L62.27 7.76 L62.54 8.31 L62.75 8.88 L62.89 9.47 L62.95 10.06 L62.95 10.64 L62.88 11.2 L62.74 11.75 L62.55 12.27 L62.3 12.75 L62 13.2 L61.65 13.6 L61.27 13.94 L60.86 14.24 L60.42 14.48 L59.97 14.67 L59.5 14.79 L59.04 14.86 L58.57 14.88 L58.12 14.84 L57.69 14.75 L57.27 14.61 L56.89 14.42 L56.53 14.2 L56.22 13.94 L55.94 13.65 L55.71 13.34 L55.51 13.01 L55.37 12.67 L55.26 12.32 L55.2 11.97 L55.19 11.63 L55.22 11.29 L55.28 10.97 L55.38 10.67 L55.51 10.39 L55.68 10.14 L55.86 9.91 L56.07 9.72 L56.29 9.55 L56.52 9.43 L56.76 9.33 L57 9.27 L57.24 9.24 L57.47 9.24 L57.69 9.27 L57.89 9.32 L58.08 9.4 L58.25 9.5 L58.4 9.62 L58.53 9.75 L58.63 9.88 L58.71 10.03'/%3E%3Cpath d='M5 58 L5.12 58.68 L5.31 59.33 L5.58 59.95 L5.91 60.53 L6.3 61.05 L6.75 61.52 L7.23 61.93 L7.76 62.27 L8.31 62.54 L8.88 62.75 L9.47 62.89 L10.06 62.95 L10.64 62.95 L11.2 62.88 L11.75 62.74 L12.27 62.55 L12.75 62.3 L13.2 62 L13.6 61.65 L13.94 61.27 L14.24 60.86 L14.48 60.42 L14.67 59.97 L14.79 59.5 L14.86 59.04 L14.88 58.57 L14.84 58.12 L14.75 57.69 L14.61 57.27 L14.42 56.89 L14.2 56.53 L13.94 56.22 L13.65 55.94 L13.34 55.71 L13.01 55.51 L12.67 55.37 L12.32 55.26 L11.97 55.2 L11.63 55.19 L11.29 55.22 L10.97 55.28 L10.67 55.38 L10.39 55.51 L10.14 55.68 L9.91 55.86 L9.72 56.07 L9.55 56.29 L9.43 56.52 L9.33 56.76 L9.27 57 L9.24 57.24 L9.24 57.47 L9.27 57.69 L9.32 57.89 L9.4 58.08 L9.5 58.25 L9.62 58.4 L9.75 58.53 L9.88 58.63 L10.03 58.71'/%3E%3Cpath d='M11 26 C16 22 22 18 26 22 C30 26 25 32 21 29 C18 27 20 23 23 24'/%3E%3Cpath d='M26 11 C22 16 18 22 22 26'/%3E%3Cpath d='M30 11 C34 18 42 18 44 13'/%3E%3Cpath d='M11 30 C18 34 18 42 13 44'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M36 5 Q39.28 8.53 44.72 7.24 Q40.57 3.49 36 5 Z'/%3E%3Cpath d='M5 36 Q3.49 40.57 7.24 44.72 Q8.53 39.28 5 36 Z'/%3E%3Cpath d='M5 1.8 L8.2 5 L5 8.2 L1.8 5 Z'/%3E%3Cpath d='M48 5 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M5 48 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M24 21.8 L26.2 24 L24 26.2 L21.8 24 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") left top / var(--orn-size) var(--orn-size) no-repeat, url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='64' height='64'%3E%3Cg transform='translate%2864 0%29 scale%28-1 1%29'%3E%3Cg fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 62 L5 22 Q5 5 22 5 L62 5'/%3E%3Cpath d='M11 50 L11 26 Q11 11 26 11 L50 11'/%3E%3Cpath d='M58 5 L58.68 5.12 L59.33 5.31 L59.95 5.58 L60.53 5.91 L61.05 6.3 L61.52 6.75 L61.93 7.23 L62.27 7.76 L62.54 8.31 L62.75 8.88 L62.89 9.47 L62.95 10.06 L62.95 10.64 L62.88 11.2 L62.74 11.75 L62.55 12.27 L62.3 12.75 L62 13.2 L61.65 13.6 L61.27 13.94 L60.86 14.24 L60.42 14.48 L59.97 14.67 L59.5 14.79 L59.04 14.86 L58.57 14.88 L58.12 14.84 L57.69 14.75 L57.27 14.61 L56.89 14.42 L56.53 14.2 L56.22 13.94 L55.94 13.65 L55.71 13.34 L55.51 13.01 L55.37 12.67 L55.26 12.32 L55.2 11.97 L55.19 11.63 L55.22 11.29 L55.28 10.97 L55.38 10.67 L55.51 10.39 L55.68 10.14 L55.86 9.91 L56.07 9.72 L56.29 9.55 L56.52 9.43 L56.76 9.33 L57 9.27 L57.24 9.24 L57.47 9.24 L57.69 9.27 L57.89 9.32 L58.08 9.4 L58.25 9.5 L58.4 9.62 L58.53 9.75 L58.63 9.88 L58.71 10.03'/%3E%3Cpath d='M5 58 L5.12 58.68 L5.31 59.33 L5.58 59.95 L5.91 60.53 L6.3 61.05 L6.75 61.52 L7.23 61.93 L7.76 62.27 L8.31 62.54 L8.88 62.75 L9.47 62.89 L10.06 62.95 L10.64 62.95 L11.2 62.88 L11.75 62.74 L12.27 62.55 L12.75 62.3 L13.2 62 L13.6 61.65 L13.94 61.27 L14.24 60.86 L14.48 60.42 L14.67 59.97 L14.79 59.5 L14.86 59.04 L14.88 58.57 L14.84 58.12 L14.75 57.69 L14.61 57.27 L14.42 56.89 L14.2 56.53 L13.94 56.22 L13.65 55.94 L13.34 55.71 L13.01 55.51 L12.67 55.37 L12.32 55.26 L11.97 55.2 L11.63 55.19 L11.29 55.22 L10.97 55.28 L10.67 55.38 L10.39 55.51 L10.14 55.68 L9.91 55.86 L9.72 56.07 L9.55 56.29 L9.43 56.52 L9.33 56.76 L9.27 57 L9.24 57.24 L9.24 57.47 L9.27 57.69 L9.32 57.89 L9.4 58.08 L9.5 58.25 L9.62 58.4 L9.75 58.53 L9.88 58.63 L10.03 58.71'/%3E%3Cpath d='M11 26 C16 22 22 18 26 22 C30 26 25 32 21 29 C18 27 20 23 23 24'/%3E%3Cpath d='M26 11 C22 16 18 22 22 26'/%3E%3Cpath d='M30 11 C34 18 42 18 44 13'/%3E%3Cpath d='M11 30 C18 34 18 42 13 44'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M36 5 Q39.28 8.53 44.72 7.24 Q40.57 3.49 36 5 Z'/%3E%3Cpath d='M5 36 Q3.49 40.57 7.24 44.72 Q8.53 39.28 5 36 Z'/%3E%3Cpath d='M5 1.8 L8.2 5 L5 8.2 L1.8 5 Z'/%3E%3Cpath d='M48 5 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M5 48 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M24 21.8 L26.2 24 L24 26.2 L21.8 24 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") right top / var(--orn-size) var(--orn-size) no-repeat, url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='64' height='64'%3E%3Cg transform='translate%280 64%29 scale%281 -1%29'%3E%3Cg fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 62 L5 22 Q5 5 22 5 L62 5'/%3E%3Cpath d='M11 50 L11 26 Q11 11 26 11 L50 11'/%3E%3Cpath d='M58 5 L58.68 5.12 L59.33 5.31 L59.95 5.58 L60.53 5.91 L61.05 6.3 L61.52 6.75 L61.93 7.23 L62.27 7.76 L62.54 8.31 L62.75 8.88 L62.89 9.47 L62.95 10.06 L62.95 10.64 L62.88 11.2 L62.74 11.75 L62.55 12.27 L62.3 12.75 L62 13.2 L61.65 13.6 L61.27 13.94 L60.86 14.24 L60.42 14.48 L59.97 14.67 L59.5 14.79 L59.04 14.86 L58.57 14.88 L58.12 14.84 L57.69 14.75 L57.27 14.61 L56.89 14.42 L56.53 14.2 L56.22 13.94 L55.94 13.65 L55.71 13.34 L55.51 13.01 L55.37 12.67 L55.26 12.32 L55.2 11.97 L55.19 11.63 L55.22 11.29 L55.28 10.97 L55.38 10.67 L55.51 10.39 L55.68 10.14 L55.86 9.91 L56.07 9.72 L56.29 9.55 L56.52 9.43 L56.76 9.33 L57 9.27 L57.24 9.24 L57.47 9.24 L57.69 9.27 L57.89 9.32 L58.08 9.4 L58.25 9.5 L58.4 9.62 L58.53 9.75 L58.63 9.88 L58.71 10.03'/%3E%3Cpath d='M5 58 L5.12 58.68 L5.31 59.33 L5.58 59.95 L5.91 60.53 L6.3 61.05 L6.75 61.52 L7.23 61.93 L7.76 62.27 L8.31 62.54 L8.88 62.75 L9.47 62.89 L10.06 62.95 L10.64 62.95 L11.2 62.88 L11.75 62.74 L12.27 62.55 L12.75 62.3 L13.2 62 L13.6 61.65 L13.94 61.27 L14.24 60.86 L14.48 60.42 L14.67 59.97 L14.79 59.5 L14.86 59.04 L14.88 58.57 L14.84 58.12 L14.75 57.69 L14.61 57.27 L14.42 56.89 L14.2 56.53 L13.94 56.22 L13.65 55.94 L13.34 55.71 L13.01 55.51 L12.67 55.37 L12.32 55.26 L11.97 55.2 L11.63 55.19 L11.29 55.22 L10.97 55.28 L10.67 55.38 L10.39 55.51 L10.14 55.68 L9.91 55.86 L9.72 56.07 L9.55 56.29 L9.43 56.52 L9.33 56.76 L9.27 57 L9.24 57.24 L9.24 57.47 L9.27 57.69 L9.32 57.89 L9.4 58.08 L9.5 58.25 L9.62 58.4 L9.75 58.53 L9.88 58.63 L10.03 58.71'/%3E%3Cpath d='M11 26 C16 22 22 18 26 22 C30 26 25 32 21 29 C18 27 20 23 23 24'/%3E%3Cpath d='M26 11 C22 16 18 22 22 26'/%3E%3Cpath d='M30 11 C34 18 42 18 44 13'/%3E%3Cpath d='M11 30 C18 34 18 42 13 44'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M36 5 Q39.28 8.53 44.72 7.24 Q40.57 3.49 36 5 Z'/%3E%3Cpath d='M5 36 Q3.49 40.57 7.24 44.72 Q8.53 39.28 5 36 Z'/%3E%3Cpath d='M5 1.8 L8.2 5 L5 8.2 L1.8 5 Z'/%3E%3Cpath d='M48 5 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M5 48 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M24 21.8 L26.2 24 L24 26.2 L21.8 24 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") left bottom / var(--orn-size) var(--orn-size) no-repeat, url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='64' height='64'%3E%3Cg transform='translate%2864 64%29 scale%28-1 -1%29'%3E%3Cg fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 62 L5 22 Q5 5 22 5 L62 5'/%3E%3Cpath d='M11 50 L11 26 Q11 11 26 11 L50 11'/%3E%3Cpath d='M58 5 L58.68 5.12 L59.33 5.31 L59.95 5.58 L60.53 5.91 L61.05 6.3 L61.52 6.75 L61.93 7.23 L62.27 7.76 L62.54 8.31 L62.75 8.88 L62.89 9.47 L62.95 10.06 L62.95 10.64 L62.88 11.2 L62.74 11.75 L62.55 12.27 L62.3 12.75 L62 13.2 L61.65 13.6 L61.27 13.94 L60.86 14.24 L60.42 14.48 L59.97 14.67 L59.5 14.79 L59.04 14.86 L58.57 14.88 L58.12 14.84 L57.69 14.75 L57.27 14.61 L56.89 14.42 L56.53 14.2 L56.22 13.94 L55.94 13.65 L55.71 13.34 L55.51 13.01 L55.37 12.67 L55.26 12.32 L55.2 11.97 L55.19 11.63 L55.22 11.29 L55.28 10.97 L55.38 10.67 L55.51 10.39 L55.68 10.14 L55.86 9.91 L56.07 9.72 L56.29 9.55 L56.52 9.43 L56.76 9.33 L57 9.27 L57.24 9.24 L57.47 9.24 L57.69 9.27 L57.89 9.32 L58.08 9.4 L58.25 9.5 L58.4 9.62 L58.53 9.75 L58.63 9.88 L58.71 10.03'/%3E%3Cpath d='M5 58 L5.12 58.68 L5.31 59.33 L5.58 59.95 L5.91 60.53 L6.3 61.05 L6.75 61.52 L7.23 61.93 L7.76 62.27 L8.31 62.54 L8.88 62.75 L9.47 62.89 L10.06 62.95 L10.64 62.95 L11.2 62.88 L11.75 62.74 L12.27 62.55 L12.75 62.3 L13.2 62 L13.6 61.65 L13.94 61.27 L14.24 60.86 L14.48 60.42 L14.67 59.97 L14.79 59.5 L14.86 59.04 L14.88 58.57 L14.84 58.12 L14.75 57.69 L14.61 57.27 L14.42 56.89 L14.2 56.53 L13.94 56.22 L13.65 55.94 L13.34 55.71 L13.01 55.51 L12.67 55.37 L12.32 55.26 L11.97 55.2 L11.63 55.19 L11.29 55.22 L10.97 55.28 L10.67 55.38 L10.39 55.51 L10.14 55.68 L9.91 55.86 L9.72 56.07 L9.55 56.29 L9.43 56.52 L9.33 56.76 L9.27 57 L9.24 57.24 L9.24 57.47 L9.27 57.69 L9.32 57.89 L9.4 58.08 L9.5 58.25 L9.62 58.4 L9.75 58.53 L9.88 58.63 L10.03 58.71'/%3E%3Cpath d='M11 26 C16 22 22 18 26 22 C30 26 25 32 21 29 C18 27 20 23 23 24'/%3E%3Cpath d='M26 11 C22 16 18 22 22 26'/%3E%3Cpath d='M30 11 C34 18 42 18 44 13'/%3E%3Cpath d='M11 30 C18 34 18 42 13 44'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M36 5 Q39.28 8.53 44.72 7.24 Q40.57 3.49 36 5 Z'/%3E%3Cpath d='M5 36 Q3.49 40.57 7.24 44.72 Q8.53 39.28 5 36 Z'/%3E%3Cpath d='M5 1.8 L8.2 5 L5 8.2 L1.8 5 Z'/%3E%3Cpath d='M48 5 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M5 48 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M24 21.8 L26.2 24 L24 26.2 L21.8 24 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") right bottom / var(--orn-size) var(--orn-size) no-repeat; }
.wk-ornate-gilded::after { content: ""; position: absolute; inset: var(--orn-inset); z-index: 0; pointer-events: none;
  background: radial-gradient(circle at 50% 16px, var(--gem) 0 5.5px, transparent 6px), linear-gradient(90deg, var(--gold-deep), var(--gold-bright) 30%, var(--gold) 50%, var(--gold-bright) 70%, var(--gold-deep));
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 140 32' width='140' height='32'%3E%3Cg%3E%3Cg fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M70 3.5 L82.5 16 L70 28.5 L57.5 16 Z'/%3E%3Cpath d='M83 16 C92 8 104 8 110 16'/%3E%3Cpath d='M110 16 C116 24 128 23 130 16'/%3E%3Cpath d='M128.76 15.55 L128.83 15.03 L128.84 14.51 L128.8 14 L128.71 13.51 L128.56 13.03 L128.37 12.58 L128.14 12.16 L127.87 11.77 L127.56 11.41 L127.22 11.1 L126.85 10.83 L126.47 10.6 L126.07 10.42 L125.65 10.28 L125.24 10.2 L124.82 10.15 L124.4 10.15 L124 10.2 L123.61 10.29 L123.24 10.41 L122.89 10.58 L122.56 10.77 L122.27 11 L122 11.25 L121.77 11.52 L121.57 11.81 L121.41 12.12 L121.29 12.43 L121.2 12.75 L121.15 13.07 L121.13 13.39 L121.15 13.7 L121.2 14 L121.28 14.29 L121.39 14.55 L121.53 14.8 L121.69 15.03 L121.86 15.23 L122.06 15.41 L122.27 15.56 L122.48 15.68 L122.71 15.78 L122.93 15.85 L123.16 15.89 L123.38 15.9 L123.6 15.89 L123.8 15.86 L124 15.8 L124.18 15.72 L124.35 15.63 L124.49 15.52 L124.62 15.4 L124.73 15.27 L124.82 15.13 L124.89 14.99 L124.94 14.85 L124.97 14.71 L124.98 14.57 L124.97 14.43 L124.95 14.31'/%3E%3Cpath d='M83 18 C90 25 98 25 101 21'/%3E%3Cpath d='M57 16 C48 8 36 8 30 16'/%3E%3Cpath d='M30 16 C24 24 12 23 10 16'/%3E%3Cpath d='M11.24 15.55 L11.17 15.03 L11.16 14.51 L11.2 14 L11.29 13.51 L11.44 13.03 L11.63 12.58 L11.86 12.16 L12.13 11.77 L12.44 11.41 L12.78 11.1 L13.15 10.83 L13.53 10.6 L13.93 10.42 L14.35 10.28 L14.76 10.2 L15.18 10.15 L15.6 10.15 L16 10.2 L16.39 10.29 L16.76 10.41 L17.11 10.58 L17.44 10.77 L17.73 11 L18 11.25 L18.23 11.52 L18.43 11.81 L18.59 12.12 L18.71 12.43 L18.8 12.75 L18.85 13.07 L18.87 13.39 L18.85 13.7 L18.8 14 L18.72 14.29 L18.61 14.55 L18.47 14.8 L18.31 15.03 L18.14 15.23 L17.94 15.41 L17.73 15.56 L17.52 15.68 L17.29 15.78 L17.07 15.85 L16.84 15.89 L16.62 15.9 L16.4 15.89 L16.2 15.86 L16 15.8 L15.82 15.72 L15.65 15.63 L15.51 15.52 L15.38 15.4 L15.27 15.27 L15.18 15.13 L15.11 14.99 L15.06 14.85 L15.03 14.71 L15.02 14.57 L15.03 14.43 L15.05 14.31'/%3E%3Cpath d='M57 18 C50 25 42 25 39 21'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M70 7 L79 16 L70 25 L61 16 Z'/%3E%3Cpath d='M101 10.5 Q105.21 10.7 108.02 6.66 Q103.1 6.84 101 10.5 Z'/%3E%3Cpath d='M138 16 m-1.6 0 a1.6 1.6 0 1 0 3.2 0 a1.6 1.6 0 1 0 -3.2 0'/%3E%3Cpath d='M39 10.5 Q36.9 6.84 31.98 6.66 Q34.79 10.7 39 10.5 Z'/%3E%3Cpath d='M2 16 m-1.6 0 a1.6 1.6 0 1 0 3.2 0 a1.6 1.6 0 1 0 -3.2 0'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") left 50% top 0 / var(--ornament-crest) calc(var(--ornament-crest) * 0.2286) no-repeat,
    linear-gradient(90deg, transparent 6%, #000 22%, #000 36%, transparent 40%, transparent 60%, #000 64%, #000 78%, transparent 94%) left 0 top 15px / 100% var(--ornament-frame) no-repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 16' width='180' height='16'%3E%3Cg%3E%3Cg fill='none' stroke='%23000' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M97 8 L152 8'/%3E%3Cpath d='M152 8 L152.07 7.59 L152.19 7.19 L152.35 6.81 L152.54 6.46 L152.77 6.13 L153.02 5.84 L153.3 5.57 L153.61 5.34 L153.93 5.15 L154.27 5 L154.61 4.88 L154.96 4.8 L155.31 4.77 L155.66 4.76 L156 4.8 L156.33 4.87 L156.64 4.97 L156.94 5.11 L157.21 5.27 L157.47 5.46 L157.69 5.67 L157.89 5.9 L158.06 6.14 L158.2 6.4 L158.31 6.67 L158.39 6.94 L158.43 7.21 L158.45 7.48 L158.44 7.74 L158.4 8 L158.33 8.25 L158.24 8.48 L158.13 8.69 L158 8.89 L157.85 9.07 L157.68 9.22 L157.51 9.36 L157.32 9.47 L157.13 9.55 L156.93 9.62 L156.74 9.66 L156.54 9.67 L156.35 9.67 L156.17 9.64 L156 9.6 L155.84 9.54 L155.69 9.46 L155.56 9.37 L155.44 9.27 L155.33 9.15 L155.25 9.04 L155.18 8.91 L155.13 8.79 L155.09 8.66 L155.08 8.53 L155.07 8.41 L155.09 8.3 L155.11 8.19 L155.15 8.09 L155.2 8'/%3E%3Cpath d='M83 8 L28 8'/%3E%3Cpath d='M28 8 L27.93 7.59 L27.81 7.19 L27.65 6.81 L27.46 6.46 L27.23 6.13 L26.98 5.84 L26.7 5.57 L26.39 5.34 L26.07 5.15 L25.73 5 L25.39 4.88 L25.04 4.8 L24.69 4.77 L24.34 4.76 L24 4.8 L23.67 4.87 L23.36 4.97 L23.06 5.11 L22.79 5.27 L22.53 5.46 L22.31 5.67 L22.11 5.9 L21.94 6.14 L21.8 6.4 L21.69 6.67 L21.61 6.94 L21.57 7.21 L21.55 7.48 L21.56 7.74 L21.6 8 L21.67 8.25 L21.76 8.48 L21.87 8.69 L22 8.89 L22.15 9.07 L22.32 9.22 L22.49 9.36 L22.68 9.47 L22.87 9.55 L23.07 9.62 L23.26 9.66 L23.46 9.67 L23.65 9.67 L23.83 9.64 L24 9.6 L24.16 9.54 L24.31 9.46 L24.44 9.37 L24.56 9.27 L24.67 9.15 L24.75 9.04 L24.82 8.91 L24.87 8.79 L24.91 8.66 L24.92 8.53 L24.93 8.41 L24.91 8.3 L24.89 8.19 L24.85 8.09 L24.8 8'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M90 4 L94 8 L90 12 L86 8 Z'/%3E%3Cpath d='M170 8 m-1.4 0 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0'/%3E%3Cpath d='M10 8 m-1.4 0 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") left 50% bottom 2px / 150px 13px no-repeat,
    linear-gradient(90deg, transparent 6%, #000 22%, #000 38%, transparent 42%, transparent 58%, #000 62%, #000 78%, transparent 94%) left 0 bottom 8px / 100% var(--ornament-frame) no-repeat,
    linear-gradient(180deg, transparent 12%, #000 30%, #000 70%, transparent 88%) left 4px top 0 / var(--ornament-frame) 100% no-repeat,
    linear-gradient(180deg, transparent 12%, #000 30%, #000 70%, transparent 88%) right 4px top 0 / var(--ornament-frame) 100% no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 140 32' width='140' height='32'%3E%3Cg%3E%3Cg fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M70 3.5 L82.5 16 L70 28.5 L57.5 16 Z'/%3E%3Cpath d='M83 16 C92 8 104 8 110 16'/%3E%3Cpath d='M110 16 C116 24 128 23 130 16'/%3E%3Cpath d='M128.76 15.55 L128.83 15.03 L128.84 14.51 L128.8 14 L128.71 13.51 L128.56 13.03 L128.37 12.58 L128.14 12.16 L127.87 11.77 L127.56 11.41 L127.22 11.1 L126.85 10.83 L126.47 10.6 L126.07 10.42 L125.65 10.28 L125.24 10.2 L124.82 10.15 L124.4 10.15 L124 10.2 L123.61 10.29 L123.24 10.41 L122.89 10.58 L122.56 10.77 L122.27 11 L122 11.25 L121.77 11.52 L121.57 11.81 L121.41 12.12 L121.29 12.43 L121.2 12.75 L121.15 13.07 L121.13 13.39 L121.15 13.7 L121.2 14 L121.28 14.29 L121.39 14.55 L121.53 14.8 L121.69 15.03 L121.86 15.23 L122.06 15.41 L122.27 15.56 L122.48 15.68 L122.71 15.78 L122.93 15.85 L123.16 15.89 L123.38 15.9 L123.6 15.89 L123.8 15.86 L124 15.8 L124.18 15.72 L124.35 15.63 L124.49 15.52 L124.62 15.4 L124.73 15.27 L124.82 15.13 L124.89 14.99 L124.94 14.85 L124.97 14.71 L124.98 14.57 L124.97 14.43 L124.95 14.31'/%3E%3Cpath d='M83 18 C90 25 98 25 101 21'/%3E%3Cpath d='M57 16 C48 8 36 8 30 16'/%3E%3Cpath d='M30 16 C24 24 12 23 10 16'/%3E%3Cpath d='M11.24 15.55 L11.17 15.03 L11.16 14.51 L11.2 14 L11.29 13.51 L11.44 13.03 L11.63 12.58 L11.86 12.16 L12.13 11.77 L12.44 11.41 L12.78 11.1 L13.15 10.83 L13.53 10.6 L13.93 10.42 L14.35 10.28 L14.76 10.2 L15.18 10.15 L15.6 10.15 L16 10.2 L16.39 10.29 L16.76 10.41 L17.11 10.58 L17.44 10.77 L17.73 11 L18 11.25 L18.23 11.52 L18.43 11.81 L18.59 12.12 L18.71 12.43 L18.8 12.75 L18.85 13.07 L18.87 13.39 L18.85 13.7 L18.8 14 L18.72 14.29 L18.61 14.55 L18.47 14.8 L18.31 15.03 L18.14 15.23 L17.94 15.41 L17.73 15.56 L17.52 15.68 L17.29 15.78 L17.07 15.85 L16.84 15.89 L16.62 15.9 L16.4 15.89 L16.2 15.86 L16 15.8 L15.82 15.72 L15.65 15.63 L15.51 15.52 L15.38 15.4 L15.27 15.27 L15.18 15.13 L15.11 14.99 L15.06 14.85 L15.03 14.71 L15.02 14.57 L15.03 14.43 L15.05 14.31'/%3E%3Cpath d='M57 18 C50 25 42 25 39 21'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M70 7 L79 16 L70 25 L61 16 Z'/%3E%3Cpath d='M101 10.5 Q105.21 10.7 108.02 6.66 Q103.1 6.84 101 10.5 Z'/%3E%3Cpath d='M138 16 m-1.6 0 a1.6 1.6 0 1 0 3.2 0 a1.6 1.6 0 1 0 -3.2 0'/%3E%3Cpath d='M39 10.5 Q36.9 6.84 31.98 6.66 Q34.79 10.7 39 10.5 Z'/%3E%3Cpath d='M2 16 m-1.6 0 a1.6 1.6 0 1 0 3.2 0 a1.6 1.6 0 1 0 -3.2 0'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") left 50% top 0 / var(--ornament-crest) calc(var(--ornament-crest) * 0.2286) no-repeat,
    linear-gradient(90deg, transparent 6%, #000 22%, #000 36%, transparent 40%, transparent 60%, #000 64%, #000 78%, transparent 94%) left 0 top 15px / 100% var(--ornament-frame) no-repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 16' width='180' height='16'%3E%3Cg%3E%3Cg fill='none' stroke='%23000' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M97 8 L152 8'/%3E%3Cpath d='M152 8 L152.07 7.59 L152.19 7.19 L152.35 6.81 L152.54 6.46 L152.77 6.13 L153.02 5.84 L153.3 5.57 L153.61 5.34 L153.93 5.15 L154.27 5 L154.61 4.88 L154.96 4.8 L155.31 4.77 L155.66 4.76 L156 4.8 L156.33 4.87 L156.64 4.97 L156.94 5.11 L157.21 5.27 L157.47 5.46 L157.69 5.67 L157.89 5.9 L158.06 6.14 L158.2 6.4 L158.31 6.67 L158.39 6.94 L158.43 7.21 L158.45 7.48 L158.44 7.74 L158.4 8 L158.33 8.25 L158.24 8.48 L158.13 8.69 L158 8.89 L157.85 9.07 L157.68 9.22 L157.51 9.36 L157.32 9.47 L157.13 9.55 L156.93 9.62 L156.74 9.66 L156.54 9.67 L156.35 9.67 L156.17 9.64 L156 9.6 L155.84 9.54 L155.69 9.46 L155.56 9.37 L155.44 9.27 L155.33 9.15 L155.25 9.04 L155.18 8.91 L155.13 8.79 L155.09 8.66 L155.08 8.53 L155.07 8.41 L155.09 8.3 L155.11 8.19 L155.15 8.09 L155.2 8'/%3E%3Cpath d='M83 8 L28 8'/%3E%3Cpath d='M28 8 L27.93 7.59 L27.81 7.19 L27.65 6.81 L27.46 6.46 L27.23 6.13 L26.98 5.84 L26.7 5.57 L26.39 5.34 L26.07 5.15 L25.73 5 L25.39 4.88 L25.04 4.8 L24.69 4.77 L24.34 4.76 L24 4.8 L23.67 4.87 L23.36 4.97 L23.06 5.11 L22.79 5.27 L22.53 5.46 L22.31 5.67 L22.11 5.9 L21.94 6.14 L21.8 6.4 L21.69 6.67 L21.61 6.94 L21.57 7.21 L21.55 7.48 L21.56 7.74 L21.6 8 L21.67 8.25 L21.76 8.48 L21.87 8.69 L22 8.89 L22.15 9.07 L22.32 9.22 L22.49 9.36 L22.68 9.47 L22.87 9.55 L23.07 9.62 L23.26 9.66 L23.46 9.67 L23.65 9.67 L23.83 9.64 L24 9.6 L24.16 9.54 L24.31 9.46 L24.44 9.37 L24.56 9.27 L24.67 9.15 L24.75 9.04 L24.82 8.91 L24.87 8.79 L24.91 8.66 L24.92 8.53 L24.93 8.41 L24.91 8.3 L24.89 8.19 L24.85 8.09 L24.8 8'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M90 4 L94 8 L90 12 L86 8 Z'/%3E%3Cpath d='M170 8 m-1.4 0 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0'/%3E%3Cpath d='M10 8 m-1.4 0 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") left 50% bottom 2px / 150px 13px no-repeat,
    linear-gradient(90deg, transparent 6%, #000 22%, #000 38%, transparent 42%, transparent 58%, #000 62%, #000 78%, transparent 94%) left 0 bottom 8px / 100% var(--ornament-frame) no-repeat,
    linear-gradient(180deg, transparent 12%, #000 30%, #000 70%, transparent 88%) left 4px top 0 / var(--ornament-frame) 100% no-repeat,
    linear-gradient(180deg, transparent 12%, #000 30%, #000 70%, transparent 88%) right 4px top 0 / var(--ornament-frame) 100% no-repeat; }
.wk-ornate-sm { --orn-size: 40px; }
.wk-qtile.wk-ornate { --orn-size: 30px; --orn-inset: 7px; }
.wk-card.wk-ornate { --orn-size: 46px; padding: calc(var(--space-6) + 16px) calc(var(--space-6) + 12px); overflow: hidden; }
.wk-card { overflow: hidden; }
.wk-card.wk-ornate-gilded, .wk-ornate-gilded { padding-top: calc(var(--space-6) + 34px) !important; padding-bottom: calc(var(--space-6) + 24px) !important; }
.wk-divider-gilded { display: block; height: 14px; margin: var(--space-4) auto; width: min(220px, 80%); background: linear-gradient(90deg, var(--gold-deep), var(--gold-bright) 30%, var(--gold) 50%, var(--gold-bright) 70%, var(--gold-deep)); -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 16' width='180' height='16'%3E%3Cg%3E%3Cg fill='none' stroke='%23000' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M97 8 L152 8'/%3E%3Cpath d='M152 8 L152.07 7.59 L152.19 7.19 L152.35 6.81 L152.54 6.46 L152.77 6.13 L153.02 5.84 L153.3 5.57 L153.61 5.34 L153.93 5.15 L154.27 5 L154.61 4.88 L154.96 4.8 L155.31 4.77 L155.66 4.76 L156 4.8 L156.33 4.87 L156.64 4.97 L156.94 5.11 L157.21 5.27 L157.47 5.46 L157.69 5.67 L157.89 5.9 L158.06 6.14 L158.2 6.4 L158.31 6.67 L158.39 6.94 L158.43 7.21 L158.45 7.48 L158.44 7.74 L158.4 8 L158.33 8.25 L158.24 8.48 L158.13 8.69 L158 8.89 L157.85 9.07 L157.68 9.22 L157.51 9.36 L157.32 9.47 L157.13 9.55 L156.93 9.62 L156.74 9.66 L156.54 9.67 L156.35 9.67 L156.17 9.64 L156 9.6 L155.84 9.54 L155.69 9.46 L155.56 9.37 L155.44 9.27 L155.33 9.15 L155.25 9.04 L155.18 8.91 L155.13 8.79 L155.09 8.66 L155.08 8.53 L155.07 8.41 L155.09 8.3 L155.11 8.19 L155.15 8.09 L155.2 8'/%3E%3Cpath d='M83 8 L28 8'/%3E%3Cpath d='M28 8 L27.93 7.59 L27.81 7.19 L27.65 6.81 L27.46 6.46 L27.23 6.13 L26.98 5.84 L26.7 5.57 L26.39 5.34 L26.07 5.15 L25.73 5 L25.39 4.88 L25.04 4.8 L24.69 4.77 L24.34 4.76 L24 4.8 L23.67 4.87 L23.36 4.97 L23.06 5.11 L22.79 5.27 L22.53 5.46 L22.31 5.67 L22.11 5.9 L21.94 6.14 L21.8 6.4 L21.69 6.67 L21.61 6.94 L21.57 7.21 L21.55 7.48 L21.56 7.74 L21.6 8 L21.67 8.25 L21.76 8.48 L21.87 8.69 L22 8.89 L22.15 9.07 L22.32 9.22 L22.49 9.36 L22.68 9.47 L22.87 9.55 L23.07 9.62 L23.26 9.66 L23.46 9.67 L23.65 9.67 L23.83 9.64 L24 9.6 L24.16 9.54 L24.31 9.46 L24.44 9.37 L24.56 9.27 L24.67 9.15 L24.75 9.04 L24.82 8.91 L24.87 8.79 L24.91 8.66 L24.92 8.53 L24.93 8.41 L24.91 8.3 L24.89 8.19 L24.85 8.09 L24.8 8'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M90 4 L94 8 L90 12 L86 8 Z'/%3E%3Cpath d='M170 8 m-1.4 0 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0'/%3E%3Cpath d='M10 8 m-1.4 0 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") center / contain no-repeat; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 16' width='180' height='16'%3E%3Cg%3E%3Cg fill='none' stroke='%23000' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M97 8 L152 8'/%3E%3Cpath d='M152 8 L152.07 7.59 L152.19 7.19 L152.35 6.81 L152.54 6.46 L152.77 6.13 L153.02 5.84 L153.3 5.57 L153.61 5.34 L153.93 5.15 L154.27 5 L154.61 4.88 L154.96 4.8 L155.31 4.77 L155.66 4.76 L156 4.8 L156.33 4.87 L156.64 4.97 L156.94 5.11 L157.21 5.27 L157.47 5.46 L157.69 5.67 L157.89 5.9 L158.06 6.14 L158.2 6.4 L158.31 6.67 L158.39 6.94 L158.43 7.21 L158.45 7.48 L158.44 7.74 L158.4 8 L158.33 8.25 L158.24 8.48 L158.13 8.69 L158 8.89 L157.85 9.07 L157.68 9.22 L157.51 9.36 L157.32 9.47 L157.13 9.55 L156.93 9.62 L156.74 9.66 L156.54 9.67 L156.35 9.67 L156.17 9.64 L156 9.6 L155.84 9.54 L155.69 9.46 L155.56 9.37 L155.44 9.27 L155.33 9.15 L155.25 9.04 L155.18 8.91 L155.13 8.79 L155.09 8.66 L155.08 8.53 L155.07 8.41 L155.09 8.3 L155.11 8.19 L155.15 8.09 L155.2 8'/%3E%3Cpath d='M83 8 L28 8'/%3E%3Cpath d='M28 8 L27.93 7.59 L27.81 7.19 L27.65 6.81 L27.46 6.46 L27.23 6.13 L26.98 5.84 L26.7 5.57 L26.39 5.34 L26.07 5.15 L25.73 5 L25.39 4.88 L25.04 4.8 L24.69 4.77 L24.34 4.76 L24 4.8 L23.67 4.87 L23.36 4.97 L23.06 5.11 L22.79 5.27 L22.53 5.46 L22.31 5.67 L22.11 5.9 L21.94 6.14 L21.8 6.4 L21.69 6.67 L21.61 6.94 L21.57 7.21 L21.55 7.48 L21.56 7.74 L21.6 8 L21.67 8.25 L21.76 8.48 L21.87 8.69 L22 8.89 L22.15 9.07 L22.32 9.22 L22.49 9.36 L22.68 9.47 L22.87 9.55 L23.07 9.62 L23.26 9.66 L23.46 9.67 L23.65 9.67 L23.83 9.64 L24 9.6 L24.16 9.54 L24.31 9.46 L24.44 9.37 L24.56 9.27 L24.67 9.15 L24.75 9.04 L24.82 8.91 L24.87 8.79 L24.91 8.66 L24.92 8.53 L24.93 8.41 L24.91 8.3 L24.89 8.19 L24.85 8.09 L24.8 8'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M90 4 L94 8 L90 12 L86 8 Z'/%3E%3Cpath d='M170 8 m-1.4 0 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0'/%3E%3Cpath d='M10 8 m-1.4 0 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") center / contain no-repeat; }

/* ---------- Card and tile silhouettes ---------- */
.wk-cut-notch { border-radius: 0 !important; clip-path: polygon(var(--cut-notch) 0, calc(100% - var(--cut-notch)) 0, 100% var(--cut-notch), 100% calc(100% - var(--cut-notch)), calc(100% - var(--cut-notch)) 100%, var(--cut-notch) 100%, 0 calc(100% - var(--cut-notch)), 0 var(--cut-notch)); }
.wk-cut-notch.wk-ornate { --orn-inset: 9px; }
.wk-cut-scoop { border-radius: 0 !important;
  -webkit-mask: radial-gradient(circle at 0 0, transparent var(--cut-scoop), #000 calc(var(--cut-scoop) + 0.5px)) left top / 51% 51% no-repeat, radial-gradient(circle at 100% 0, transparent var(--cut-scoop), #000 calc(var(--cut-scoop) + 0.5px)) right top / 51% 51% no-repeat, radial-gradient(circle at 0 100%, transparent var(--cut-scoop), #000 calc(var(--cut-scoop) + 0.5px)) left bottom / 51% 51% no-repeat, radial-gradient(circle at 100% 100%, transparent var(--cut-scoop), #000 calc(var(--cut-scoop) + 0.5px)) right bottom / 51% 51% no-repeat;
  mask: radial-gradient(circle at 0 0, transparent var(--cut-scoop), #000 calc(var(--cut-scoop) + 0.5px)) left top / 51% 51% no-repeat, radial-gradient(circle at 100% 0, transparent var(--cut-scoop), #000 calc(var(--cut-scoop) + 0.5px)) right top / 51% 51% no-repeat, radial-gradient(circle at 0 100%, transparent var(--cut-scoop), #000 calc(var(--cut-scoop) + 0.5px)) left bottom / 51% 51% no-repeat, radial-gradient(circle at 100% 100%, transparent var(--cut-scoop), #000 calc(var(--cut-scoop) + 0.5px)) right bottom / 51% 51% no-repeat; }
.wk-cut-scoop.wk-ornate { --orn-inset: 10px; }
.wk-cut-arch { border-radius: 50% 50% var(--radius-lg) var(--radius-lg) / min(var(--cut-arch), 34%) min(var(--cut-arch), 34%) var(--radius-lg) var(--radius-lg) !important; padding-top: calc(var(--space-12) + 8px) !important; }
.wk-cut-arch.wk-ornate { --orn-size: 44px; }
.wk-cut-arch.wk-ornate::before { -webkit-mask-size: 0 0, 0 0, var(--orn-size) var(--orn-size), var(--orn-size) var(--orn-size); mask-size: 0 0, 0 0, var(--orn-size) var(--orn-size), var(--orn-size) var(--orn-size); }
.wk-cut-ticket {
  -webkit-mask: radial-gradient(circle at 0 50%, transparent var(--cut-ticket), #000 calc(var(--cut-ticket) + 0.5px)) left / 51% 100% no-repeat, radial-gradient(circle at 100% 50%, transparent var(--cut-ticket), #000 calc(var(--cut-ticket) + 0.5px)) right / 51% 100% no-repeat;
  mask: radial-gradient(circle at 0 50%, transparent var(--cut-ticket), #000 calc(var(--cut-ticket) + 0.5px)) left / 51% 100% no-repeat, radial-gradient(circle at 100% 50%, transparent var(--cut-ticket), #000 calc(var(--cut-ticket) + 0.5px)) right / 51% 100% no-repeat; }
.wk-cut-banner { border-radius: var(--radius-lg) var(--radius-lg) 0 0 !important; padding-bottom: calc(var(--space-6) + var(--cut-banner)) !important; clip-path: polygon(0 0, 100% 0, 100% calc(100% - var(--cut-banner)), 50% 100%, 0 calc(100% - var(--cut-banner))); }
.wk-cut-gem { border-radius: 0 !important; clip-path: polygon(var(--cut-gem) 0, calc(100% - var(--cut-gem)) 0, 100% var(--cut-gem), 100% calc(100% - var(--cut-gem)), calc(100% - var(--cut-gem)) 100%, var(--cut-gem) 100%, 0 calc(100% - var(--cut-gem)), 0 var(--cut-gem)); }
.wk-cut-wrap { display: block; position: relative; transition: filter var(--duration-drift) var(--ease-kindle), transform var(--duration-drift) var(--ease-kindle); filter: drop-shadow(0 14px 22px color-mix(in srgb, var(--ground-sunken) 70%, transparent)); }
.wk-cut-wrap:hover, .wk-cut-wrap:focus-within { filter: drop-shadow(0 0 4px color-mix(in srgb, var(--gem) 55%, transparent)) drop-shadow(0 0 22px color-mix(in srgb, var(--gem) 38%, transparent)); transform: translateY(-2px); }
.wk-cut-wrap > .wk-card { max-width: none; }

/* ---------- Tile (inventory slot) ---------- */
.wk-qtile { position: relative; display: flex; flex-direction: column; align-items: center; gap: var(--space-2); box-sizing: border-box; width: 132px; padding: 18px 12px 14px; border: 0; background: var(--ground-raised); box-shadow: var(--inset-frost); color: var(--ink); font: inherit; text-align: center; cursor: default; overflow: hidden; }
button.wk-qtile, a.wk-qtile { cursor: pointer; text-decoration: none; }
.wk-qtile-icon { position: relative; z-index: 1; display: grid; place-items: center; width: 60px; height: 60px; background: var(--ground-sunken); box-shadow: var(--inset-well); color: var(--band, var(--ink)); clip-path: polygon(22% 0, 78% 0, 100% 22%, 100% 78%, 78% 100%, 22% 100%, 0 78%, 0 22%); }
.wk-qtile-icon .wk-icon { filter: drop-shadow(0 0 6px color-mix(in srgb, var(--band, var(--lantern)) 60%, transparent)); }
.wk-qtile-label { position: relative; z-index: 1; font-family: var(--font-display); font-size: 20px; line-height: 22px; font-weight: 400; }
.wk-qtile-sub { position: relative; z-index: 1; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-muted); }
.wk-qtile-count { position: absolute; z-index: 2; right: 10px; top: 10px; min-width: 22px; padding: 0 6px; border-radius: var(--radius-sm); background: var(--gem-soft); color: var(--gem-text); font-family: var(--font-mono); font-size: 12px; line-height: 20px; box-shadow: var(--inset-frost); }
.wk-qtile-pips { position: relative; z-index: 1; display: flex; gap: 4px; }
.wk-qtile-pips i { width: 7px; height: 7px; transform: rotate(45deg); background: var(--vein); }
.wk-qtile-pips i.on { background: var(--gold); box-shadow: 0 0 6px var(--gold-bright); }
.wk-qtile-flare { box-shadow: var(--inset-frost), inset 0 0 0 1px color-mix(in srgb, var(--gem) 0%, transparent); }

/* ---------- Ornate buttons ---------- */
.wk-btn-orn { position: relative; flex: none; width: 24px; height: 12px; background: linear-gradient(90deg, var(--gold-deep), var(--gold-bright) 60%, var(--gold)); -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 12' width='24' height='12'%3E%3Cg%3E%3Cg fill='none' stroke='%23000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 6 L12 6'/%3E%3Cpath d='M6 10 L6.37 9.93 L6.73 9.82 L7.07 9.69 L7.39 9.52 L7.69 9.33 L7.97 9.11 L8.22 8.87 L8.45 8.6 L8.64 8.33 L8.8 8.04 L8.94 7.74 L9.04 7.43 L9.11 7.12 L9.15 6.81 L9.16 6.5 L9.14 6.2 L9.09 5.9 L9.02 5.62 L8.91 5.35 L8.79 5.09 L8.64 4.86 L8.48 4.64 L8.29 4.44 L8.1 4.27 L7.89 4.11 L7.67 3.99 L7.44 3.88 L7.21 3.8 L6.97 3.75 L6.74 3.72 L6.51 3.71 L6.29 3.72 L6.07 3.76 L5.86 3.82 L5.67 3.89 L5.48 3.99 L5.31 4.09 L5.16 4.21 L5.02 4.35 L4.9 4.49 L4.8 4.64 L4.72 4.8 L4.65 4.95 L4.6 5.11 L4.57 5.27 L4.56 5.43 L4.57 5.58 L4.59 5.73 L4.62 5.87 L4.67 6 L4.73 6.12 L4.8 6.23 L4.87 6.33 L4.96 6.41 L5.05 6.48 L5.14 6.54 L5.24 6.59 L5.34 6.62 L5.44 6.64 L5.53 6.65'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M18 1.8 L22.2 6 L18 10.2 L13.8 6 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") center / 24px 12px no-repeat; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 12' width='24' height='12'%3E%3Cg%3E%3Cg fill='none' stroke='%23000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 6 L12 6'/%3E%3Cpath d='M6 10 L6.37 9.93 L6.73 9.82 L7.07 9.69 L7.39 9.52 L7.69 9.33 L7.97 9.11 L8.22 8.87 L8.45 8.6 L8.64 8.33 L8.8 8.04 L8.94 7.74 L9.04 7.43 L9.11 7.12 L9.15 6.81 L9.16 6.5 L9.14 6.2 L9.09 5.9 L9.02 5.62 L8.91 5.35 L8.79 5.09 L8.64 4.86 L8.48 4.64 L8.29 4.44 L8.1 4.27 L7.89 4.11 L7.67 3.99 L7.44 3.88 L7.21 3.8 L6.97 3.75 L6.74 3.72 L6.51 3.71 L6.29 3.72 L6.07 3.76 L5.86 3.82 L5.67 3.89 L5.48 3.99 L5.31 4.09 L5.16 4.21 L5.02 4.35 L4.9 4.49 L4.8 4.64 L4.72 4.8 L4.65 4.95 L4.6 5.11 L4.57 5.27 L4.56 5.43 L4.57 5.58 L4.59 5.73 L4.62 5.87 L4.67 6 L4.73 6.12 L4.8 6.23 L4.87 6.33 L4.96 6.41 L5.05 6.48 L5.14 6.54 L5.24 6.59 L5.34 6.62 L5.44 6.64 L5.53 6.65'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M18 1.8 L22.2 6 L18 10.2 L13.8 6 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") center / 24px 12px no-repeat; filter: drop-shadow(0 0 4px color-mix(in srgb, var(--gold-bright) 50%, transparent)); }
.wk-btn-orn.r { transform: scaleX(-1); }
.wk-btn-ornate { padding: 0 var(--space-4); }
.wk-btn--lantern.wk-btn-ornate .wk-btn-orn { background: linear-gradient(90deg, var(--on-lantern), color-mix(in srgb, var(--on-lantern) 70%, var(--gold))); filter: none; }


/* ---------- Wick additions to the gilded system ---------- */
.wk-ornate.wk-card, .wk-ornate.wk-qtile, .wk-ornate.wk-tile, .wk-lantern--ornate { box-shadow: var(--inset-raised), var(--rim-gilt); }
.wk-ornate.wk-card { --orn-size: var(--ornament-corner); }
.wk-card.wk-ornate:not(.wk-ornate-gilded) { padding: calc(var(--space-6) + 10px) calc(var(--space-6) + 8px); }
.wk-tile.wk-ornate { --orn-size: 36px; --orn-inset: 8px; }
.wk-lantern__orn { position: absolute !important; inset: 0; z-index: 0 !important; --orn-size: 30px; --orn-inset: 7px; }
.wk-lantern__orn::before { -webkit-mask-size: 0 0, 0 0, var(--orn-size) var(--orn-size), var(--orn-size) var(--orn-size); mask-size: 0 0, 0 0, var(--orn-size) var(--orn-size), var(--orn-size) var(--orn-size); }
.wk-band { position: absolute; left: 0; right: 0; top: 0; height: 72px; z-index: 0; pointer-events: none; background: linear-gradient(180deg, color-mix(in srgb, var(--band) 40%, transparent), transparent); }
.wk-band--lantern { --band: var(--lantern); } .wk-band--gold { --band: var(--gold); } .wk-band--arcane { --band: var(--gem); } .wk-band--moss { --band: var(--d-document); } .wk-band--dew { --band: var(--steady); }
.wk-card-gem { position: absolute; top: 16px; right: 18px; z-index: 2; width: 12px; height: 12px; transform: rotate(45deg); background: linear-gradient(135deg, color-mix(in srgb, var(--gem) 55%, var(--flame-core)), var(--gem)); box-shadow: var(--glow-gem); }
.wk-cut-wrap { display: block; position: relative; max-width: 380px; transition: filter var(--duration-drift) var(--ease-kindle), transform var(--duration-drift) var(--ease-kindle); filter: drop-shadow(0 16px 22px color-mix(in srgb, var(--ground-sunken) 85%, transparent)); }
.wk-cut-wrap:hover, .wk-cut-wrap:focus-within { filter: drop-shadow(0 0 3px color-mix(in srgb, var(--gold) 70%, transparent)) drop-shadow(0 0 20px color-mix(in srgb, var(--lantern) 35%, transparent)); transform: translateY(-2px); }
.wk-cut-wrap > .wk-card { max-width: none; animation: none; }
.wk-cut-wrap > .wk-card.wk-card--link:hover { transform: none; }
.wk-cut-wrap:focus-within > .wk-card { box-shadow: var(--inset-raised), var(--rim-gilt), inset 0 0 0 3px var(--focus); }
.wk-sigil { position: absolute; z-index: 0; left: 50%; top: 50%; width: var(--ornament-sigil); height: var(--ornament-sigil); margin: calc(var(--ornament-sigil) / -2) 0 0 calc(var(--ornament-sigil) / -2); color: var(--gold); opacity: .28; pointer-events: none; animation: wk-spin 90s linear infinite; }
.wk-qtile { width: 148px; border-radius: 0; background: var(--ground-raised); box-shadow: var(--inset-raised), var(--rim-gilt); }
.wk-qtile-icon { width: 64px; height: 64px; }
.wk-qtile-icon .wk-sigil { --ornament-sigil: 96px; opacity: .35; }
button.wk-qtile:hover, a.wk-qtile:hover { background: var(--frost); }
button.wk-qtile:focus-visible, a.wk-qtile:focus-visible { box-shadow: var(--inset-raised), var(--rim-gilt), inset 0 0 0 3px var(--focus); outline: none; }
.wk-qtile--lantern { --band: var(--lantern); } .wk-qtile--gold { --band: var(--gold); } .wk-qtile--arcane { --band: var(--gem); } .wk-qtile--moss { --band: var(--d-document); } .wk-qtile--dew { --band: var(--steady); }
.wk-qtile .wk-band { height: 56px; }
.wk-qtile-pips i.on { background: var(--gold); box-shadow: 0 0 6px var(--gold-bright); }
.wk-gilded-head { display: grid; justify-items: center; gap: var(--space-2); text-align: center; }
.wk-gilded-head__crest { width: var(--ornament-crest); height: calc(var(--ornament-crest) * 0.2286); -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 140 32' width='140' height='32'%3E%3Cg%3E%3Cg fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M70 3.5 L82.5 16 L70 28.5 L57.5 16 Z'/%3E%3Cpath d='M83 16 C92 8 104 8 110 16'/%3E%3Cpath d='M110 16 C116 24 128 23 130 16'/%3E%3Cpath d='M128.76 15.55 L128.83 15.03 L128.84 14.51 L128.8 14 L128.71 13.51 L128.56 13.03 L128.37 12.58 L128.14 12.16 L127.87 11.77 L127.56 11.41 L127.22 11.1 L126.85 10.83 L126.47 10.6 L126.07 10.42 L125.65 10.28 L125.24 10.2 L124.82 10.15 L124.4 10.15 L124 10.2 L123.61 10.29 L123.24 10.41 L122.89 10.58 L122.56 10.77 L122.27 11 L122 11.25 L121.77 11.52 L121.57 11.81 L121.41 12.12 L121.29 12.43 L121.2 12.75 L121.15 13.07 L121.13 13.39 L121.15 13.7 L121.2 14 L121.28 14.29 L121.39 14.55 L121.53 14.8 L121.69 15.03 L121.86 15.23 L122.06 15.41 L122.27 15.56 L122.48 15.68 L122.71 15.78 L122.93 15.85 L123.16 15.89 L123.38 15.9 L123.6 15.89 L123.8 15.86 L124 15.8 L124.18 15.72 L124.35 15.63 L124.49 15.52 L124.62 15.4 L124.73 15.27 L124.82 15.13 L124.89 14.99 L124.94 14.85 L124.97 14.71 L124.98 14.57 L124.97 14.43 L124.95 14.31'/%3E%3Cpath d='M83 18 C90 25 98 25 101 21'/%3E%3Cpath d='M57 16 C48 8 36 8 30 16'/%3E%3Cpath d='M30 16 C24 24 12 23 10 16'/%3E%3Cpath d='M11.24 15.55 L11.17 15.03 L11.16 14.51 L11.2 14 L11.29 13.51 L11.44 13.03 L11.63 12.58 L11.86 12.16 L12.13 11.77 L12.44 11.41 L12.78 11.1 L13.15 10.83 L13.53 10.6 L13.93 10.42 L14.35 10.28 L14.76 10.2 L15.18 10.15 L15.6 10.15 L16 10.2 L16.39 10.29 L16.76 10.41 L17.11 10.58 L17.44 10.77 L17.73 11 L18 11.25 L18.23 11.52 L18.43 11.81 L18.59 12.12 L18.71 12.43 L18.8 12.75 L18.85 13.07 L18.87 13.39 L18.85 13.7 L18.8 14 L18.72 14.29 L18.61 14.55 L18.47 14.8 L18.31 15.03 L18.14 15.23 L17.94 15.41 L17.73 15.56 L17.52 15.68 L17.29 15.78 L17.07 15.85 L16.84 15.89 L16.62 15.9 L16.4 15.89 L16.2 15.86 L16 15.8 L15.82 15.72 L15.65 15.63 L15.51 15.52 L15.38 15.4 L15.27 15.27 L15.18 15.13 L15.11 14.99 L15.06 14.85 L15.03 14.71 L15.02 14.57 L15.03 14.43 L15.05 14.31'/%3E%3Cpath d='M57 18 C50 25 42 25 39 21'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M70 7 L79 16 L70 25 L61 16 Z'/%3E%3Cpath d='M101 10.5 Q105.21 10.7 108.02 6.66 Q103.1 6.84 101 10.5 Z'/%3E%3Cpath d='M138 16 m-1.6 0 a1.6 1.6 0 1 0 3.2 0 a1.6 1.6 0 1 0 -3.2 0'/%3E%3Cpath d='M39 10.5 Q36.9 6.84 31.98 6.66 Q34.79 10.7 39 10.5 Z'/%3E%3Cpath d='M2 16 m-1.6 0 a1.6 1.6 0 1 0 3.2 0 a1.6 1.6 0 1 0 -3.2 0'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") center / contain no-repeat; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 140 32' width='140' height='32'%3E%3Cg%3E%3Cg fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M70 3.5 L82.5 16 L70 28.5 L57.5 16 Z'/%3E%3Cpath d='M83 16 C92 8 104 8 110 16'/%3E%3Cpath d='M110 16 C116 24 128 23 130 16'/%3E%3Cpath d='M128.76 15.55 L128.83 15.03 L128.84 14.51 L128.8 14 L128.71 13.51 L128.56 13.03 L128.37 12.58 L128.14 12.16 L127.87 11.77 L127.56 11.41 L127.22 11.1 L126.85 10.83 L126.47 10.6 L126.07 10.42 L125.65 10.28 L125.24 10.2 L124.82 10.15 L124.4 10.15 L124 10.2 L123.61 10.29 L123.24 10.41 L122.89 10.58 L122.56 10.77 L122.27 11 L122 11.25 L121.77 11.52 L121.57 11.81 L121.41 12.12 L121.29 12.43 L121.2 12.75 L121.15 13.07 L121.13 13.39 L121.15 13.7 L121.2 14 L121.28 14.29 L121.39 14.55 L121.53 14.8 L121.69 15.03 L121.86 15.23 L122.06 15.41 L122.27 15.56 L122.48 15.68 L122.71 15.78 L122.93 15.85 L123.16 15.89 L123.38 15.9 L123.6 15.89 L123.8 15.86 L124 15.8 L124.18 15.72 L124.35 15.63 L124.49 15.52 L124.62 15.4 L124.73 15.27 L124.82 15.13 L124.89 14.99 L124.94 14.85 L124.97 14.71 L124.98 14.57 L124.97 14.43 L124.95 14.31'/%3E%3Cpath d='M83 18 C90 25 98 25 101 21'/%3E%3Cpath d='M57 16 C48 8 36 8 30 16'/%3E%3Cpath d='M30 16 C24 24 12 23 10 16'/%3E%3Cpath d='M11.24 15.55 L11.17 15.03 L11.16 14.51 L11.2 14 L11.29 13.51 L11.44 13.03 L11.63 12.58 L11.86 12.16 L12.13 11.77 L12.44 11.41 L12.78 11.1 L13.15 10.83 L13.53 10.6 L13.93 10.42 L14.35 10.28 L14.76 10.2 L15.18 10.15 L15.6 10.15 L16 10.2 L16.39 10.29 L16.76 10.41 L17.11 10.58 L17.44 10.77 L17.73 11 L18 11.25 L18.23 11.52 L18.43 11.81 L18.59 12.12 L18.71 12.43 L18.8 12.75 L18.85 13.07 L18.87 13.39 L18.85 13.7 L18.8 14 L18.72 14.29 L18.61 14.55 L18.47 14.8 L18.31 15.03 L18.14 15.23 L17.94 15.41 L17.73 15.56 L17.52 15.68 L17.29 15.78 L17.07 15.85 L16.84 15.89 L16.62 15.9 L16.4 15.89 L16.2 15.86 L16 15.8 L15.82 15.72 L15.65 15.63 L15.51 15.52 L15.38 15.4 L15.27 15.27 L15.18 15.13 L15.11 14.99 L15.06 14.85 L15.03 14.71 L15.02 14.57 L15.03 14.43 L15.05 14.31'/%3E%3Cpath d='M57 18 C50 25 42 25 39 21'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M70 7 L79 16 L70 25 L61 16 Z'/%3E%3Cpath d='M101 10.5 Q105.21 10.7 108.02 6.66 Q103.1 6.84 101 10.5 Z'/%3E%3Cpath d='M138 16 m-1.6 0 a1.6 1.6 0 1 0 3.2 0 a1.6 1.6 0 1 0 -3.2 0'/%3E%3Cpath d='M39 10.5 Q36.9 6.84 31.98 6.66 Q34.79 10.7 39 10.5 Z'/%3E%3Cpath d='M2 16 m-1.6 0 a1.6 1.6 0 1 0 3.2 0 a1.6 1.6 0 1 0 -3.2 0'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") center / contain no-repeat; background: radial-gradient(circle at 50% 16px, var(--gem) 0 5.5px, transparent 6px), linear-gradient(90deg, var(--gold-deep), var(--gold-bright) 30%, var(--gold) 50%, var(--gold-bright) 70%, var(--gold-deep)); }
.wk-gilded-head__title { margin: 0; font: 400 28px/34px var(--font-display); color: var(--ink); }
.wk-gilded-head__sub { margin: 0; font: 500 12px/16px var(--font-mono); letter-spacing: .12em; text-transform: uppercase; color: var(--ink-muted); }
.wk-btn .wk-btn-orn { margin: 0 -4px; }
.wk-btn--lantern .wk-btn-orn { background: linear-gradient(90deg, var(--on-lantern), color-mix(in srgb, var(--on-lantern) 70%, var(--gold-deep))); filter: none; }
@media (max-width: 599px) { .wk-ornate.wk-card { --orn-size: 40px; } }
@media (prefers-reduced-motion: reduce) { .wk-cut-wrap { transition: none; } .wk-cut-wrap:hover { transform: none; } .wk-sigil { animation: none; } }
[data-motion="still"] .wk-cut-wrap { transition: none; } [data-motion="still"] .wk-sigil { animation: none; }
.wk-tile.wk-ornate::before { -webkit-mask-size: 0 0, 0 0, var(--orn-size) var(--orn-size), var(--orn-size) var(--orn-size); mask-size: 0 0, 0 0, var(--orn-size) var(--orn-size), var(--orn-size) var(--orn-size); }
.wk-qtile-count { background: var(--gem-soft); color: var(--gem-text); }
.wk-lantern--ornate { padding-bottom: var(--space-8); padding-inline: var(--space-5); }

```

### Appendix E: SVG sources

Icon path data (24 by 24 grid, stroke 1.75, round caps and joins, no fill, `stroke="currentColor"`):

```json
{
 "grove": [
  "M12 3L6.5 11H9.5L5 17.5H19L14.5 11H17.5Z",
  "M12 17.5V21"
 ],
 "trail": [
  "M8 21C8 17 16 17.5 16 13.5C16 9.5 8 10 8 6C8 4.6 9 3.5 10.5 3",
  "M17.5 20.5h.01",
  "M6.5 13h.01",
  "M15 4h.01"
 ],
 "lantern": [
  "M12 2.5V4.5",
  "M9.5 4.5H14.5",
  "M8 7H16",
  "M8 7C7 10 7 15 8 18H16C17 15 17 10 16 7",
  "M9.5 18V20.5H14.5V18",
  "M12 10C13 11.3 13.6 12.3 13.6 13.2A1.6 1.6 0 0 1 10.4 13.2C10.4 12.3 11 11.3 12 10Z"
 ],
 "guide": [
  "M3 5.5C5.6 4.5 9 4.6 12 6.6C15 4.6 18.4 4.5 21 5.5V19C18.4 18 15 18.1 12 20.1C9 18.1 5.6 18 3 19Z",
  "M12 6.6V20.1"
 ],
 "settings": [
  "M4 7H13",
  "M17 7H20",
  "M15 5V9",
  "M4 17H7",
  "M11 17H20",
  "M9 15V19"
 ],
 "theme": [
  "M19 14.5A8 8 0 1 1 9.5 5A6.5 6.5 0 0 0 19 14.5Z"
 ],
 "mic": [
  "M12 3A3 3 0 0 0 9 6V12A3 3 0 0 0 15 12V6A3 3 0 0 0 12 3Z",
  "M5.5 11.5A6.5 6.5 0 0 0 18.5 11.5",
  "M12 18V21",
  "M9 21H15"
 ],
 "mic-off": [
  "M15 9.5V6A3 3 0 0 0 9.4 4.5",
  "M9 9V12A3 3 0 0 0 14.1 14.1",
  "M5.5 11.5A6.5 6.5 0 0 0 16.4 16.3",
  "M18.5 11.5A6.4 6.4 0 0 1 18.2 13.4",
  "M12 18V21",
  "M9 21H15",
  "M4 4L20 20"
 ],
 "speaker": [
  "M4 9.5H7.5L12.5 5.5V18.5L7.5 14.5H4Z",
  "M16 9.5A3.6 3.6 0 0 1 16 14.5",
  "M18.5 7A7.2 7.2 0 0 1 18.5 17"
 ],
 "pause": [
  "M9 5.5V18.5",
  "M15 5.5V18.5"
 ],
 "play": [
  "M8 5.5L18.5 12L8 18.5Z"
 ],
 "replay": [
  "M4.5 12A7.5 7.5 0 1 0 6.7 6.7",
  "M4.5 3.5V7.5H8.5"
 ],
 "step-out": [
  "M13.5 4H6.5V20H13.5",
  "M10 12H20.5",
  "M17 8.5L20.5 12L17 15.5"
 ],
 "captions": [
  "M5 5H19A2 2 0 0 1 21 7V17A2 2 0 0 1 19 19H5A2 2 0 0 1 3 17V7A2 2 0 0 1 5 5Z",
  "M10.5 10.2A2 2 0 1 0 10.5 13.8",
  "M17 10.2A2 2 0 1 0 17 13.8"
 ],
 "timer": [
  "M12 6.5A7 7 0 1 0 12 20.5A7 7 0 1 0 12 6.5",
  "M12 13.5V10",
  "M10 3H14",
  "M12 3V6.5"
 ],
 "flame": [
  "M12 3C14.6 6.4 18 8.9 18 13.6A6 6 0 0 1 6 13.6C6 10.6 7.8 8.6 9.2 6.4C9.8 8.2 10.7 9.2 11.8 9.6C12.6 7.6 12.6 5.3 12 3Z"
 ],
 "direct": [
  "M5 4.5H19A1.5 1.5 0 0 1 20.5 6V15A1.5 1.5 0 0 1 19 16.5H10L5.5 20V16.5H5A1.5 1.5 0 0 1 3.5 15V6A1.5 1.5 0 0 1 5 4.5Z",
  "M12 8V11.5",
  "M12 13.8V13.9"
 ],
 "distract": [
  "M3.5 18.5C8 18.5 8.5 7 14 7H20",
  "M17 4L20 7L17 10",
  "M3.5 7H7"
 ],
 "delegate": [
  "M7.5 5.5A2.5 2.5 0 1 0 7.5 10.5A2.5 2.5 0 1 0 7.5 5.5",
  "M3 19.5C3 16.4 5 14 7.5 14C10 14 12 16.4 12 19.5",
  "M14 11.5H20.5",
  "M17.5 8.5L20.5 11.5L17.5 14.5"
 ],
 "delay": [
  "M12 4A8 8 0 1 0 12 20A8 8 0 1 0 12 4",
  "M12 8V12L15 14"
 ],
 "document": [
  "M6.5 3H14.5L18 6.5V21H6.5Z",
  "M14.5 3V6.5H18",
  "M9.5 11H15",
  "M9.5 14.5H15",
  "M9.5 18H12.5"
 ],
 "steady": [
  "M12 3.5A8.5 8.5 0 1 0 12 20.5A8.5 8.5 0 1 0 12 3.5",
  "M8.2 12.4L10.9 15.1L16 9.6"
 ],
 "caution": [
  "M12 3.5L21 19.5H3Z",
  "M12 9.5V13.5",
  "M12 16.4V16.5"
 ],
 "danger": [
  "M8.5 3H15.5L21 8.5V15.5L15.5 21H8.5L3 15.5V8.5Z",
  "M12 7.5V12.8",
  "M12 16.2V16.3"
 ],
 "info": [
  "M12 3.5A8.5 8.5 0 1 0 12 20.5A8.5 8.5 0 1 0 12 3.5",
  "M12 11V16.5",
  "M12 7.8V7.9"
 ],
 "close": [
  "M6.5 6.5L17.5 17.5",
  "M17.5 6.5L6.5 17.5"
 ],
 "arrow": [
  "M5 12H19",
  "M13.5 6.5L19 12L13.5 17.5"
 ],
 "chevron": [
  "M9.5 6L15.5 12L9.5 18"
 ],
 "check": [
  "M5.5 12.5L10 17L18.5 7.5"
 ]
}
```

`Ornaments/gilded-corner.svg`

```svg
<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><defs><linearGradient id="g" x1="0" y1="0" x2="64.0" y2="64.0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#7a5a22"/><stop offset=".28" stop-color="#f7e6ad"/><stop offset=".52" stop-color="#d4b062"/><stop offset=".76" stop-color="#f7e6ad"/><stop offset="1" stop-color="#7a5a22"/></linearGradient></defs><g><g fill="none" stroke="url(#g)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 62 L5 22 Q5 5 22 5 L62 5"/><path d="M11 50 L11 26 Q11 11 26 11 L50 11"/><path d="M58 5 L58.68 5.12 L59.33 5.31 L59.95 5.58 L60.53 5.91 L61.05 6.3 L61.52 6.75 L61.93 7.23 L62.27 7.76 L62.54 8.31 L62.75 8.88 L62.89 9.47 L62.95 10.06 L62.95 10.64 L62.88 11.2 L62.74 11.75 L62.55 12.27 L62.3 12.75 L62 13.2 L61.65 13.6 L61.27 13.94 L60.86 14.24 L60.42 14.48 L59.97 14.67 L59.5 14.79 L59.04 14.86 L58.57 14.88 L58.12 14.84 L57.69 14.75 L57.27 14.61 L56.89 14.42 L56.53 14.2 L56.22 13.94 L55.94 13.65 L55.71 13.34 L55.51 13.01 L55.37 12.67 L55.26 12.32 L55.2 11.97 L55.19 11.63 L55.22 11.29 L55.28 10.97 L55.38 10.67 L55.51 10.39 L55.68 10.14 L55.86 9.91 L56.07 9.72 L56.29 9.55 L56.52 9.43 L56.76 9.33 L57 9.27 L57.24 9.24 L57.47 9.24 L57.69 9.27 L57.89 9.32 L58.08 9.4 L58.25 9.5 L58.4 9.62 L58.53 9.75 L58.63 9.88 L58.71 10.03"/><path d="M5 58 L5.12 58.68 L5.31 59.33 L5.58 59.95 L5.91 60.53 L6.3 61.05 L6.75 61.52 L7.23 61.93 L7.76 62.27 L8.31 62.54 L8.88 62.75 L9.47 62.89 L10.06 62.95 L10.64 62.95 L11.2 62.88 L11.75 62.74 L12.27 62.55 L12.75 62.3 L13.2 62 L13.6 61.65 L13.94 61.27 L14.24 60.86 L14.48 60.42 L14.67 59.97 L14.79 59.5 L14.86 59.04 L14.88 58.57 L14.84 58.12 L14.75 57.69 L14.61 57.27 L14.42 56.89 L14.2 56.53 L13.94 56.22 L13.65 55.94 L13.34 55.71 L13.01 55.51 L12.67 55.37 L12.32 55.26 L11.97 55.2 L11.63 55.19 L11.29 55.22 L10.97 55.28 L10.67 55.38 L10.39 55.51 L10.14 55.68 L9.91 55.86 L9.72 56.07 L9.55 56.29 L9.43 56.52 L9.33 56.76 L9.27 57 L9.24 57.24 L9.24 57.47 L9.27 57.69 L9.32 57.89 L9.4 58.08 L9.5 58.25 L9.62 58.4 L9.75 58.53 L9.88 58.63 L10.03 58.71"/><path d="M11 26 C16 22 22 18 26 22 C30 26 25 32 21 29 C18 27 20 23 23 24"/><path d="M26 11 C22 16 18 22 22 26"/><path d="M30 11 C34 18 42 18 44 13"/><path d="M11 30 C18 34 18 42 13 44"/></g><g fill="url(#g)"><path d="M36 5 Q39.28 8.53 44.72 7.24 Q40.57 3.49 36 5 Z"/><path d="M5 36 Q3.49 40.57 7.24 44.72 Q8.53 39.28 5 36 Z"/><path d="M5 1.8 L8.2 5 L5 8.2 L1.8 5 Z"/><path d="M48 5 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0"/><path d="M5 48 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0"/><path d="M24 21.8 L26.2 24 L24 26.2 L21.8 24 Z"/></g></g></svg>
```

`Ornaments/gilded-crest.svg`

```svg
<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 32" width="140" height="32"><defs><linearGradient id="g" x1="0" y1="0" x2="140.0" y2="32.0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#7a5a22"/><stop offset=".28" stop-color="#f7e6ad"/><stop offset=".52" stop-color="#d4b062"/><stop offset=".76" stop-color="#f7e6ad"/><stop offset="1" stop-color="#7a5a22"/></linearGradient></defs><g><g fill="none" stroke="url(#g)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M70 3.5 L82.5 16 L70 28.5 L57.5 16 Z"/><path d="M83 16 C92 8 104 8 110 16"/><path d="M110 16 C116 24 128 23 130 16"/><path d="M128.76 15.55 L128.83 15.03 L128.84 14.51 L128.8 14 L128.71 13.51 L128.56 13.03 L128.37 12.58 L128.14 12.16 L127.87 11.77 L127.56 11.41 L127.22 11.1 L126.85 10.83 L126.47 10.6 L126.07 10.42 L125.65 10.28 L125.24 10.2 L124.82 10.15 L124.4 10.15 L124 10.2 L123.61 10.29 L123.24 10.41 L122.89 10.58 L122.56 10.77 L122.27 11 L122 11.25 L121.77 11.52 L121.57 11.81 L121.41 12.12 L121.29 12.43 L121.2 12.75 L121.15 13.07 L121.13 13.39 L121.15 13.7 L121.2 14 L121.28 14.29 L121.39 14.55 L121.53 14.8 L121.69 15.03 L121.86 15.23 L122.06 15.41 L122.27 15.56 L122.48 15.68 L122.71 15.78 L122.93 15.85 L123.16 15.89 L123.38 15.9 L123.6 15.89 L123.8 15.86 L124 15.8 L124.18 15.72 L124.35 15.63 L124.49 15.52 L124.62 15.4 L124.73 15.27 L124.82 15.13 L124.89 14.99 L124.94 14.85 L124.97 14.71 L124.98 14.57 L124.97 14.43 L124.95 14.31"/><path d="M83 18 C90 25 98 25 101 21"/><path d="M57 16 C48 8 36 8 30 16"/><path d="M30 16 C24 24 12 23 10 16"/><path d="M11.24 15.55 L11.17 15.03 L11.16 14.51 L11.2 14 L11.29 13.51 L11.44 13.03 L11.63 12.58 L11.86 12.16 L12.13 11.77 L12.44 11.41 L12.78 11.1 L13.15 10.83 L13.53 10.6 L13.93 10.42 L14.35 10.28 L14.76 10.2 L15.18 10.15 L15.6 10.15 L16 10.2 L16.39 10.29 L16.76 10.41 L17.11 10.58 L17.44 10.77 L17.73 11 L18 11.25 L18.23 11.52 L18.43 11.81 L18.59 12.12 L18.71 12.43 L18.8 12.75 L18.85 13.07 L18.87 13.39 L18.85 13.7 L18.8 14 L18.72 14.29 L18.61 14.55 L18.47 14.8 L18.31 15.03 L18.14 15.23 L17.94 15.41 L17.73 15.56 L17.52 15.68 L17.29 15.78 L17.07 15.85 L16.84 15.89 L16.62 15.9 L16.4 15.89 L16.2 15.86 L16 15.8 L15.82 15.72 L15.65 15.63 L15.51 15.52 L15.38 15.4 L15.27 15.27 L15.18 15.13 L15.11 14.99 L15.06 14.85 L15.03 14.71 L15.02 14.57 L15.03 14.43 L15.05 14.31"/><path d="M57 18 C50 25 42 25 39 21"/></g><g fill="url(#g)"><path d="M70 7 L79 16 L70 25 L61 16 Z"/><path d="M101 10.5 Q105.21 10.7 108.02 6.66 Q103.1 6.84 101 10.5 Z"/><path d="M138 16 m-1.6 0 a1.6 1.6 0 1 0 3.2 0 a1.6 1.6 0 1 0 -3.2 0"/><path d="M39 10.5 Q36.9 6.84 31.98 6.66 Q34.79 10.7 39 10.5 Z"/><path d="M2 16 m-1.6 0 a1.6 1.6 0 1 0 3.2 0 a1.6 1.6 0 1 0 -3.2 0"/></g></g><circle cx="70" cy="16" r="5.5" fill="#c690f5" stroke="#f7e6ad" stroke-width="1"/></svg>
```

`Ornaments/gilded-divider.svg`

```svg
<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 16" width="180" height="16"><defs><linearGradient id="g" x1="0" y1="0" x2="180.0" y2="16.0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#7a5a22"/><stop offset=".28" stop-color="#f7e6ad"/><stop offset=".52" stop-color="#d4b062"/><stop offset=".76" stop-color="#f7e6ad"/><stop offset="1" stop-color="#7a5a22"/></linearGradient></defs><g><g fill="none" stroke="url(#g)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M97 8 L152 8"/><path d="M152 8 L152.07 7.59 L152.19 7.19 L152.35 6.81 L152.54 6.46 L152.77 6.13 L153.02 5.84 L153.3 5.57 L153.61 5.34 L153.93 5.15 L154.27 5 L154.61 4.88 L154.96 4.8 L155.31 4.77 L155.66 4.76 L156 4.8 L156.33 4.87 L156.64 4.97 L156.94 5.11 L157.21 5.27 L157.47 5.46 L157.69 5.67 L157.89 5.9 L158.06 6.14 L158.2 6.4 L158.31 6.67 L158.39 6.94 L158.43 7.21 L158.45 7.48 L158.44 7.74 L158.4 8 L158.33 8.25 L158.24 8.48 L158.13 8.69 L158 8.89 L157.85 9.07 L157.68 9.22 L157.51 9.36 L157.32 9.47 L157.13 9.55 L156.93 9.62 L156.74 9.66 L156.54 9.67 L156.35 9.67 L156.17 9.64 L156 9.6 L155.84 9.54 L155.69 9.46 L155.56 9.37 L155.44 9.27 L155.33 9.15 L155.25 9.04 L155.18 8.91 L155.13 8.79 L155.09 8.66 L155.08 8.53 L155.07 8.41 L155.09 8.3 L155.11 8.19 L155.15 8.09 L155.2 8"/><path d="M83 8 L28 8"/><path d="M28 8 L27.93 7.59 L27.81 7.19 L27.65 6.81 L27.46 6.46 L27.23 6.13 L26.98 5.84 L26.7 5.57 L26.39 5.34 L26.07 5.15 L25.73 5 L25.39 4.88 L25.04 4.8 L24.69 4.77 L24.34 4.76 L24 4.8 L23.67 4.87 L23.36 4.97 L23.06 5.11 L22.79 5.27 L22.53 5.46 L22.31 5.67 L22.11 5.9 L21.94 6.14 L21.8 6.4 L21.69 6.67 L21.61 6.94 L21.57 7.21 L21.55 7.48 L21.56 7.74 L21.6 8 L21.67 8.25 L21.76 8.48 L21.87 8.69 L22 8.89 L22.15 9.07 L22.32 9.22 L22.49 9.36 L22.68 9.47 L22.87 9.55 L23.07 9.62 L23.26 9.66 L23.46 9.67 L23.65 9.67 L23.83 9.64 L24 9.6 L24.16 9.54 L24.31 9.46 L24.44 9.37 L24.56 9.27 L24.67 9.15 L24.75 9.04 L24.82 8.91 L24.87 8.79 L24.91 8.66 L24.92 8.53 L24.93 8.41 L24.91 8.3 L24.89 8.19 L24.85 8.09 L24.8 8"/></g><g fill="url(#g)"><path d="M90 4 L94 8 L90 12 L86 8 Z"/><path d="M170 8 m-1.4 0 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0"/><path d="M10 8 m-1.4 0 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0"/></g></g></svg>
```

`Ornaments/gilded-flourish.svg`

```svg
<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 12" width="24" height="12"><defs><linearGradient id="g" x1="0" y1="0" x2="24.0" y2="12.0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#7a5a22"/><stop offset=".28" stop-color="#f7e6ad"/><stop offset=".52" stop-color="#d4b062"/><stop offset=".76" stop-color="#f7e6ad"/><stop offset="1" stop-color="#7a5a22"/></linearGradient></defs><g><g fill="none" stroke="url(#g)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6 L12 6"/><path d="M6 10 L6.37 9.93 L6.73 9.82 L7.07 9.69 L7.39 9.52 L7.69 9.33 L7.97 9.11 L8.22 8.87 L8.45 8.6 L8.64 8.33 L8.8 8.04 L8.94 7.74 L9.04 7.43 L9.11 7.12 L9.15 6.81 L9.16 6.5 L9.14 6.2 L9.09 5.9 L9.02 5.62 L8.91 5.35 L8.79 5.09 L8.64 4.86 L8.48 4.64 L8.29 4.44 L8.1 4.27 L7.89 4.11 L7.67 3.99 L7.44 3.88 L7.21 3.8 L6.97 3.75 L6.74 3.72 L6.51 3.71 L6.29 3.72 L6.07 3.76 L5.86 3.82 L5.67 3.89 L5.48 3.99 L5.31 4.09 L5.16 4.21 L5.02 4.35 L4.9 4.49 L4.8 4.64 L4.72 4.8 L4.65 4.95 L4.6 5.11 L4.57 5.27 L4.56 5.43 L4.57 5.58 L4.59 5.73 L4.62 5.87 L4.67 6 L4.73 6.12 L4.8 6.23 L4.87 6.33 L4.96 6.41 L5.05 6.48 L5.14 6.54 L5.24 6.59 L5.34 6.62 L5.44 6.64 L5.53 6.65"/></g><g fill="url(#g)"><path d="M18 1.8 L22.2 6 L18 10.2 L13.8 6 Z"/></g></g></svg>
```

`Ornaments/arcane-sigil.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="120" height="120" aria-hidden="true" fill="none" stroke="#d4b062" stroke-width=".9"><circle cx="50" cy="50" r="46"/><circle cx="50" cy="50" r="38" stroke-dasharray="2 3"/><circle cx="50" cy="50" r="14"/><path d="M96.00 50.00L90.00 50.00M94.43 61.91L91.53 61.13M89.84 73.00L84.64 70.00M82.53 82.53L80.41 80.41M73.00 89.84L70.00 84.64M61.91 94.43L61.13 91.53M50.00 96.00L50.00 90.00M38.09 94.43L38.87 91.53M27.00 89.84L30.00 84.64M17.47 82.53L19.59 80.41M10.16 73.00L15.36 70.00M5.57 61.91L8.47 61.13M4.00 50.00L10.00 50.00M5.57 38.09L8.47 38.87M10.16 27.00L15.36 30.00M17.47 17.47L19.59 19.59M27.00 10.16L30.00 15.36M38.09 5.57L38.87 8.47M50.00 4.00L50.00 10.00M61.91 5.57L61.13 8.47M73.00 10.16L70.00 15.36M82.53 17.47L80.41 19.59M89.84 27.00L84.64 30.00M94.43 38.09L91.53 38.87"/><path d="M50.00 18.00L53.44 41.69L65.56 34.44L58.31 46.56L82.00 50.00L58.31 53.44L65.56 65.56L53.44 58.31L50.00 82.00L46.56 58.31L34.44 65.56L41.69 53.44L18.00 50.00L41.69 46.56L34.44 34.44L46.56 41.69Z"/></svg>
```

`Logos/wick-mark.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="Wick"><path fill="#133126" d="M32 4C42.5 9.5 52 18.5 52 31V58A2 2 0 0 1 50 60H14A2 2 0 0 1 12 58V31C12 18.5 21.5 9.5 32 4Z"/><path fill="#ffbe4d" d="M32 16C36.6 22.6 42 27.4 42 35.6C42 42.4 37.6 47 32 47C26.4 47 22 42.4 22 35.6C22 29.4 26.4 25.4 28.4 21.4C29.4 24.6 30.6 26.2 32.2 27C33 23.6 32.9 19.6 32 16Z"/><path fill="#fff1c9" d="M32 30C34.2 33 36 35 36 38.2C36 41 34.2 43 32 43C29.8 43 28 41 28 38.2C28 35.4 30.2 33.4 32 30Z"/><path fill="none" stroke="#f4efe3" stroke-width="2.5" stroke-linecap="round" d="M32 43V52"/></svg>
```

`Logos/wick-mark-dawn.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="Wick"><path fill="#0f2a20" d="M32 4C42.5 9.5 52 18.5 52 31V58A2 2 0 0 1 50 60H14A2 2 0 0 1 12 58V31C12 18.5 21.5 9.5 32 4Z"/><path fill="#ffbe4d" d="M32 16C36.6 22.6 42 27.4 42 35.6C42 42.4 37.6 47 32 47C26.4 47 22 42.4 22 35.6C22 29.4 26.4 25.4 28.4 21.4C29.4 24.6 30.6 26.2 32.2 27C33 23.6 32.9 19.6 32 16Z"/><path fill="#fff1c9" d="M32 30C34.2 33 36 35 36 38.2C36 41 34.2 43 32 43C29.8 43 28 41 28 38.2C28 35.4 30.2 33.4 32 30Z"/><path fill="none" stroke="#f4efe3" stroke-width="2.5" stroke-linecap="round" d="M32 43V52"/></svg>
```

`Logos/wick-app-icon.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="256" height="256" role="img" aria-label="Wick app icon"><defs><radialGradient id="pool" cx="50%" cy="46%" r="50%"><stop offset="0" stop-color="#ffbe4d" stop-opacity=".32"/><stop offset="1" stop-color="#ffbe4d" stop-opacity="0"/></radialGradient></defs><rect width="1024" height="1024" rx="228" fill="#06140f"/><rect width="1024" height="1024" rx="228" fill="url(#pool)"/><g transform="translate(192 168) scale(10)"><path fill="#133126" d="M32 4C42.5 9.5 52 18.5 52 31V58A2 2 0 0 1 50 60H14A2 2 0 0 1 12 58V31C12 18.5 21.5 9.5 32 4Z"/><path fill="#ffbe4d" d="M32 16C36.6 22.6 42 27.4 42 35.6C42 42.4 37.6 47 32 47C26.4 47 22 42.4 22 35.6C22 29.4 26.4 25.4 28.4 21.4C29.4 24.6 30.6 26.2 32.2 27C33 23.6 32.9 19.6 32 16Z"/><path fill="#fff1c9" d="M32 30C34.2 33 36 35 36 38.2C36 41 34.2 43 32 43C29.8 43 28 41 28 38.2C28 35.4 30.2 33.4 32 30Z"/><path fill="none" stroke="#f4efe3" stroke-width="2.5" stroke-linecap="round" d="M32 43V52"/></g></svg>
```

`Logos/wick-wordmark.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-25 -1083 2335 1510" width="584" height="378" role="img" aria-label="Wick"><path fill="#f4efe3" d="M890 -550Q874 -526 859 -499Q844 -472 829 -436.5Q814 -401 796 -350L672 0H582L451 -370L320 0H230L106 -350Q88 -401 73.5 -436.5Q59 -472 45.5 -499Q32 -526 15 -550H144Q148 -526 154 -500Q160 -474 170 -440.5Q180 -407 196 -358L279 -113L361 -358Q386 -431 398 -472.5Q410 -514 417 -550H496Q500 -526 506 -500Q512 -474 522 -440.5Q532 -407 548 -358L631 -113L713 -358Q738 -431 750 -472.5Q762 -514 769 -550Z M999 -222V-330Q999 -384 995 -418.5Q991 -453 983 -477Q975 -501 961 -523V-529L1094 -557V-222Q1094 -166 1096.5 -110Q1099 -54 1112 0H981Q994 -54 996.5 -110Q999 -166 999 -222Z M1677 -108Q1666 -86 1641.5 -57.5Q1617 -29 1574.5 -7.5Q1532 14 1467 14Q1411 14 1361.5 -8Q1312 -30 1273.5 -69Q1235 -108 1213.5 -160.5Q1192 -213 1192 -274Q1192 -335 1213.5 -388Q1235 -441 1273.5 -480.5Q1312 -520 1361.5 -542Q1411 -564 1467 -564Q1529 -564 1573.5 -547Q1618 -530 1647 -506L1644 -392H1637Q1615 -429 1574.5 -456.5Q1534 -484 1467 -484Q1413 -484 1373.5 -457Q1334 -430 1312 -383Q1290 -336 1290 -274Q1290 -211 1318.5 -164Q1347 -117 1393 -91.5Q1439 -66 1490 -66Q1546 -66 1582.5 -86Q1619 -106 1641 -139Z M2131 -132Q2163 -97 2195.5 -66Q2228 -35 2270 0H2131Q2129 -6 2114 -26Q2099 -46 2076 -71L1865 -296V-222Q1865 -166 1867.5 -110Q1870 -54 1883 0H1752Q1765 -54 1767.5 -110Q1770 -166 1770 -222V-553Q1770 -607 1766 -641.5Q1762 -676 1754 -700Q1746 -724 1732 -746V-752L1865 -780V-299L2023 -468Q2050 -499 2067.5 -521Q2085 -543 2088 -550H2227Q2195 -523 2168.5 -499Q2142 -475 2117 -450L1974 -298Z"/><path fill="#ffbe4d" d="M1036.5 -1011.7C1104.9 -903.9 1143.4 -819.3 1143.4 -734.7C1143.4 -665.4 1094.2 -626.9 1036.5 -626.9C978.8 -626.9 929.6 -665.4 929.6 -734.7C929.6 -827 998 -880.9 1036.5 -1011.7Z"/><path fill="#fff1c9" d="M1036.5 -843.5C1072 -787.7 1092.1 -743.8 1092.1 -699.9C1092.1 -664 1066.4 -644 1036.5 -644C1006.4 -644 980.9 -664 980.9 -699.9C980.9 -747.8 1016.4 -775.7 1036.5 -843.5Z"/></svg>
```

`Logos/wick-lockup.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 169 64" width="338" height="128" role="img" aria-label="Wick"><path fill="#133126" d="M32 4C42.5 9.5 52 18.5 52 31V58A2 2 0 0 1 50 60H14A2 2 0 0 1 12 58V31C12 18.5 21.5 9.5 32 4Z"/><path fill="#ffbe4d" d="M32 16C36.6 22.6 42 27.4 42 35.6C42 42.4 37.6 47 32 47C26.4 47 22 42.4 22 35.6C22 29.4 26.4 25.4 28.4 21.4C29.4 24.6 30.6 26.2 32.2 27C33 23.6 32.9 19.6 32 16Z"/><path fill="#fff1c9" d="M32 30C34.2 33 36 35 36 38.2C36 41 34.2 43 32 43C29.8 43 28 41 28 38.2C28 35.4 30.2 33.4 32 30Z"/><path fill="none" stroke="#f4efe3" stroke-width="2.5" stroke-linecap="round" d="M32 43V52"/><g transform="translate(74 6) scale(0.03709) translate(25 1083)"><path fill="#f4efe3" d="M890 -550Q874 -526 859 -499Q844 -472 829 -436.5Q814 -401 796 -350L672 0H582L451 -370L320 0H230L106 -350Q88 -401 73.5 -436.5Q59 -472 45.5 -499Q32 -526 15 -550H144Q148 -526 154 -500Q160 -474 170 -440.5Q180 -407 196 -358L279 -113L361 -358Q386 -431 398 -472.5Q410 -514 417 -550H496Q500 -526 506 -500Q512 -474 522 -440.5Q532 -407 548 -358L631 -113L713 -358Q738 -431 750 -472.5Q762 -514 769 -550Z M999 -222V-330Q999 -384 995 -418.5Q991 -453 983 -477Q975 -501 961 -523V-529L1094 -557V-222Q1094 -166 1096.5 -110Q1099 -54 1112 0H981Q994 -54 996.5 -110Q999 -166 999 -222Z M1677 -108Q1666 -86 1641.5 -57.5Q1617 -29 1574.5 -7.5Q1532 14 1467 14Q1411 14 1361.5 -8Q1312 -30 1273.5 -69Q1235 -108 1213.5 -160.5Q1192 -213 1192 -274Q1192 -335 1213.5 -388Q1235 -441 1273.5 -480.5Q1312 -520 1361.5 -542Q1411 -564 1467 -564Q1529 -564 1573.5 -547Q1618 -530 1647 -506L1644 -392H1637Q1615 -429 1574.5 -456.5Q1534 -484 1467 -484Q1413 -484 1373.5 -457Q1334 -430 1312 -383Q1290 -336 1290 -274Q1290 -211 1318.5 -164Q1347 -117 1393 -91.5Q1439 -66 1490 -66Q1546 -66 1582.5 -86Q1619 -106 1641 -139Z M2131 -132Q2163 -97 2195.5 -66Q2228 -35 2270 0H2131Q2129 -6 2114 -26Q2099 -46 2076 -71L1865 -296V-222Q1865 -166 1867.5 -110Q1870 -54 1883 0H1752Q1765 -54 1767.5 -110Q1770 -166 1770 -222V-553Q1770 -607 1766 -641.5Q1762 -676 1754 -700Q1746 -724 1732 -746V-752L1865 -780V-299L2023 -468Q2050 -499 2067.5 -521Q2085 -543 2088 -550H2227Q2195 -523 2168.5 -499Q2142 -475 2117 -450L1974 -298Z"/><path fill="#ffbe4d" d="M1036.5 -1011.7C1104.9 -903.9 1143.4 -819.3 1143.4 -734.7C1143.4 -665.4 1094.2 -626.9 1036.5 -626.9C978.8 -626.9 929.6 -665.4 929.6 -734.7C929.6 -827 998 -880.9 1036.5 -1011.7Z"/><path fill="#fff1c9" d="M1036.5 -843.5C1072 -787.7 1092.1 -743.8 1092.1 -699.9C1092.1 -664 1066.4 -644 1036.5 -644C1006.4 -644 980.9 -664 980.9 -699.9C980.9 -747.8 1016.4 -775.7 1036.5 -843.5Z"/></g></svg>
```

`Silhouettes/hanging-lantern.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 220" width="120" height="220" aria-hidden="true"><defs><radialGradient id="g" cx="50%" cy="62%" r="50%"><stop offset="0" stop-color="#ffbe4d" stop-opacity=".55"/><stop offset="1" stop-color="#ffbe4d" stop-opacity="0"/></radialGradient></defs><circle cx="60" cy="140" r="60" fill="url(#g)"/><path d="M60 0V70" stroke="#020a07" stroke-width="2"/><path fill="#020a07" d="M52 70H68L72 80H48Z M40 84H80V90H40Z M42 90H78C80 112 80 150 78 172H42C40 150 40 112 42 90Z M38 172H82V180H38Z M48 180H72L66 192H54Z"/><path fill="#ffbe4d" d="M48 98H72C73.5 118 73.5 146 72 164H48C46.5 146 46.5 118 48 98Z"/><path fill="#fff1c9" d="M60 116C64 122 67 126 67 132C67 137 64 140 60 140C56 140 53 137 53 132C53 126 56.5 122 60 116Z"/><path d="M60 140V150" stroke="#020a07" stroke-width="2" stroke-linecap="round"/></svg>
```

`Silhouettes/clearing.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 160" width="1200" height="160" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><path fill="#0c241b" d="M0 160V96C200 70 400 60 600 62C800 64 1000 74 1200 96V160Z"/><path fill="#133126" d="M520 160C548 132 566 110 586 92C594 86 606 86 614 92C634 110 652 132 680 160Z"/></svg>
```

`Ornaments/wick-rule.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 24" width="320" height="24" aria-hidden="true"><defs><linearGradient id="l" x1="0" x2="1"><stop offset="0" stop-color="#2a5444" stop-opacity="0"/><stop offset="1" stop-color="#2a5444"/></linearGradient><linearGradient id="r" x1="1" x2="0"><stop offset="0" stop-color="#2a5444" stop-opacity="0"/><stop offset="1" stop-color="#2a5444"/></linearGradient></defs><path d="M0 14H146" stroke="url(#l)" stroke-width="1"/><path d="M174 14H320" stroke="url(#r)" stroke-width="1"/><path fill="#ffbe4d" d="M160 3C162.6 6.6 165 9 165 12.6C165 15.4 162.8 17.4 160 17.4C157.2 17.4 155 15.4 155 12.6C155 9.6 157.6 7.2 160 3Z"/><path fill="#fff1c9" d="M160 9.6C161.2 11.2 162 12.2 162 13.6C162 14.8 161.1 15.6 160 15.6C158.9 15.6 158 14.8 158 13.6C158 12.3 158.9 11.2 160 9.6Z"/><path d="M160 17.4V21" stroke="#cdd9cf" stroke-width="1" stroke-linecap="round"/></svg>
```

`Ornaments/lantern-bracket.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40" aria-hidden="true"><path d="M4 36V12C4 7.6 7.6 4 12 4H36" fill="none" stroke="#6f9e86" stroke-width="1.25" stroke-linecap="round"/><path d="M9 31V14C9 11.2 11.2 9 14 9H31" fill="none" stroke="#2a5444" stroke-width="1" stroke-linecap="round"/><circle cx="36" cy="4" r="2" fill="#ffbe4d"/><circle cx="4" cy="36" r="2" fill="#ffbe4d"/></svg>
```

`Ornaments/ember-row.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 8" width="48" height="8" aria-hidden="true"><circle cx="4" cy="4" r="2" fill="#6f9e86"/><circle cx="24" cy="4" r="3" fill="#ffbe4d"/><circle cx="44" cy="4" r="2" fill="#6f9e86"/></svg>
```

`Ornaments/pane-frame.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 220" width="160" height="220" aria-hidden="true"><path d="M80 4C112 20 156 50 156 92V212A4 4 0 0 1 152 216H8A4 4 0 0 1 4 212V92C4 50 48 20 80 4Z" fill="none" stroke="#6f9e86" stroke-width="1.25"/><path d="M80 16C106 30 144 56 144 94V204H16V94C16 56 54 30 80 16Z" fill="none" stroke="#2a5444" stroke-width="1"/><path d="M80 16V204M16 110H144" stroke="#2a5444" stroke-width="1"/></svg>
```

The two treeline silhouettes are generated: see the `Scenery` component in the bundle, which draws seeded pine rows bound to `tree-far` and `tree-near`.
