# Image slot suggestions

Sizes come from the current CSS. "Display" is the largest size the slot shows on screen. "Export" is 2x display, for retina screens. Use WebP or AVIF with a JPG fallback. Use PNG or SVG only when the image needs transparency.

Layout limits used for the numbers below:
- Page content: max 1168px wide (`.page` max 1200px, 16px side padding).
- Nav rail: 104px at 600–959px, 232px at 960px and up.
- Breakpoints: 600px, 960px, 1600px.

## Summary

| # | Slot | Page (route) | Component / element | Display (max) | Aspect | Export |
|---|------|--------------|---------------------|---------------|--------|--------|
| 1 | Welcome hero art | Welcome (`/welcome`) | `Welcome` → `.welcome-art__pane` | 280 × 360 | 7:9 | 560 × 720 |
| 2 | Horizon scenery | Welcome, Access, Stepping in | `Brand` → `Scenery` (`.wk-scenery`) | full width × 160 | 12:1 | 3840 × 320 |
| 3 | Onboarding step art | Access, Stepping in | `OnboardingStep` → `.onboard__intro` | 532 × 400 | 4:3 | 1064 × 800 |
| 4 | Grove map ground | Grove (`/`) | `Grove` → `.map__ground` | 1136 × 400 | 2.84:1 (~17:6) | 2272 × 800 |
| 5 | Trail card cover | Trails (`/trails`) | `TrailCard` (`.wk-card`) | 567 × 319 | 16:9 | 1200 × 675 |
| 6 | Content note banner | Content note (`/trails/:id`) | `ContentNote` → `.wk-cnote` | 592 × 296 | 2:1 | 1200 × 600 |
| 7 | Clearing backdrop | Clearing (`/trails/:id/clearing`) | `Clearing` → `.session` / `.clearing` | full viewport | 16:9 | 2560 × 1440 |
| 8 | Character avatar | Clearing, Result | `Session` → `Transcript` (`.wk-line__who`), `Pending` | 32 × 32 | 1:1 | 96 × 96 |
| 9 | Strategy spot art | Field guide (`/guide`) | `FieldGuide` → `.wk-card.panel` per D | 120 × 120 | 1:1 | 240 × 240 |
| 10 | Lantern tile art | Lanterns lit (`/lanterns`) | `Streak` → `LanternTile` (`.wk-lantern`) | 168 × 220 | ~3:4 (42:55) | 336 × 440 |
| 11 | Empty state art | Lanterns lit (no history) | `Feedback` → `EmptyState` (`.wk-empty__art`) | 96 × 132 | 8:11 | 192 × 264 |
| 12 | Theme preview | Settings, Access | `Controls` → `ChoiceGroup` (Theme) | 160 × 100 | 16:10 | 320 × 200 |
| 13 | Social share card | All (`index.html`) | `<meta property="og:image">` | — | 1.91:1 | 1200 × 630 |
| 14 | App icons | All (`index.html`) | `apple-touch-icon`, PWA icons | — | 1:1 | 180, 192, 512 |
| 15 | How practice works card | Welcome (`/welcome`) | `Welcome` → `.step-card` | 927 × ~150 | ~3:1 (height follows text) | 1856 × 620 |

## Slot details

### 1. Welcome hero art
- **Page:** Welcome. **File:** `src/screens/Welcome.tsx` (`<figure className="welcome-art">`).
- **Now:** the `Mark` SVG inside an arched pane.
- **Use:** a lantern-in-the-grove illustration. It sits inside an arch mask (top corners rounded 50% / 36%). Keep the subject in the centre 70%.
- **Sizes:** 280 × 360 on phone and tablet. 160–256px wide on desktop (`clamp(160px, 30vh, 256px)`).
- **Export:** 560 × 720, 7:9.

### 2. Horizon scenery
- **Pages:** Welcome, Access, Stepping in. Also used on Grove map (hidden below 960px). **File:** `src/components/Brand.tsx` (`Scenery`).
- **Now:** generated SVG treeline, `viewBox 1200 × 200`, `preserveAspectRatio="xMidYMax slice"`.
- **Use:** a painted treeline strip. The image is cropped at the sides on narrow screens, so keep key shapes in the bottom-centre. Transparent top edge.
- **Sizes:** full viewport width, 160px tall.
- **Export:** 3840 × 320 (12:1), PNG/WebP with alpha. Safe zone: centre 1200 × 160.

### 3. Onboarding step art
- **Pages:** Access (step 2), Stepping in (step 3). **File:** `src/components/OnboardingStep.tsx`, below the lead in `.onboard__intro`.
- **Now:** empty space in the left column on desktop.
- **Use:** one illustration per step (for example, settings / a hand on a lantern).
- **Sizes:** left column of a 2-column grid at 960px and up, about 532px wide. Full width on phone. Hide below 600px if too tall.
- **Export:** 1064 × 800, 4:3.

### 4. Grove map ground
- **Page:** Grove. **File:** `src/screens/Grove.tsx` (`.map__ground`).
- **Now:** flat sunken panel with pins placed by percent (`pins` array).
- **Use:** a top-down or 3/4 grove map. Pins sit on top at fixed `%` positions, so mark trailhead spots to match the `pins` array: `[22,40] [70,30] [86,58] [54,62] [34,70] [90,22] [12,60] [46,24]`.
- **Sizes:** 400px tall, up to 1136px wide. Only shown at 960px and up (list layout below).
- **Export:** 2272 × 800. Use `object-fit: cover`; keep pins away from the outer 5%.

### 5. Trail card cover
- **Page:** Trails, and anywhere `TrailList` renders. **File:** `src/components/TrailCard.tsx`.
- **Now:** a colour band (`.wk-band`) per location.
- **Use:** one scene image per scenario (House party, Bar, Campus library, Group chat). Add an `image` field to `Scenario` in `src/lib/types.ts`.
- **Sizes:** 1 column (up to 567px) on phone, 2 columns (~400px) at 600px, 3 columns (~373px) at 960px.
- **Export:** 1200 × 675, 16:9.

### 6. Content note banner
- **Page:** Content note. **File:** `src/screens/ContentNote.tsx`, above `.wk-cnote__title`.
- **Use:** the same scene as slot 5, cropped wider. Keep it calm; the content note warns about the scene, the image must not show harm.
- **Sizes:** inner width of `.wk-cnote` (640 max − 2 × 24 padding = 592px).
- **Export:** 1200 × 600, 2:1. Can share a source file with slot 5 if the art is made at 2400 × 1350 and cropped.

### 7. Clearing backdrop
- **Page:** Clearing. **File:** `src/screens/Clearing.tsx` (`.session` / `.clearing`).
- **Use:** a dark, blurred scene behind the orb and transcript. Low contrast so captions stay readable (check WCAG AA on `.wk-transcript`).
- **Sizes:** full viewport, 360px to 2560px wide.
- **Export:** 2560 × 1440, 16:9. Keep the centre column (orb + transcript, ~560px) plain.

### 8. Character avatar
- **Pages:** Clearing, Result (failed-score transcript). **File:** `src/components/Session.tsx` (`Transcript`, `Pending`), replacing `.wk-line__dot`.
- **Use:** one per character in `scenario.characters` (Dylan, Maya, Rob, Priya, Bartender, Greg, Ana, Jordan, Alex). Silhouette or abstract style. Never add the avatar as the only cue; keep the name text.
- **Sizes:** 32 × 32, round mask.
- **Export:** 96 × 96, 1:1.

### 9. Strategy spot art
- **Page:** Field guide. **File:** `src/screens/FieldGuide.tsx`, in each `<li className="wk-card panel">` beside the `h2`.
- **Use:** one illustration per D (Direct, Distract, Delegate, Delay, Document). Tint to match `--d-<id>` colours.
- **Sizes:** 120 × 120 on desktop, 80 × 80 on phone.
- **Export:** 240 × 240, 1:1, transparent PNG/WebP or SVG.

### 10. Lantern tile art
- **Page:** Lanterns lit. **File:** `src/components/Streak.tsx` (`LanternTile`).
- **Now:** a flame SVG inside an arch-clipped tile.
- **Use:** optional per-scenario glow image behind the flame. The tile uses a `clip-path` arch, so the top 50% is cut in a curve.
- **Sizes:** 168 × 220 minimum; grid cells grow (`minmax(168px, 1fr)`).
- **Export:** 336 × 440. Keep the subject in the lower 60%.

### 11. Empty state art
- **Page:** Lanterns lit (no history). **File:** `src/components/Feedback.tsx` (`EmptyState`).
- **Now:** an outline arch SVG with a flame.
- **Use:** an unlit lantern illustration.
- **Sizes:** 96 × 132.
- **Export:** 192 × 264, 8:11, transparent. SVG preferred.

### 12. Theme preview
- **Pages:** Settings, Access. **Files:** `src/screens/Settings.tsx`, `src/screens/Access.tsx` (Theme `ChoiceGroup`).
- **Use:** a small screenshot of each theme (Night grove, Dawn) inside each option label.
- **Sizes:** 160 × 100.
- **Export:** 320 × 200, 16:10.

### 13. Social share card
- **Page:** all. **File:** `index.html`.
- **Now:** no `og:image` or `twitter:image`.
- **Export:** 1200 × 630, 1.91:1. Keep text in the centre 1000 × 500.

### 14. App icons
- **Page:** all. **File:** `index.html`, `public/`.
- **Now:** only `favicon.svg`.
- **Export:** `apple-touch-icon.png` 180 × 180; PWA icons 192 × 192 and 512 × 512 (add a 512 maskable version with the mark in the centre 80%). All 1:1.

### 15. How practice works card
- **Page:** Welcome. **File:** `src/screens/Welcome.tsx` (`.step-card`).
- **Use:** an illustration or background pattern for each of the three steps.
- **Sizes:** the card has no fixed height; padding and text set it. Use the image as a `background-size: cover` layer.
  - Below 960px: 1 column, full body width (viewport − 32px), up to 927px wide. About 150px tall with hover, about 210px on touch (text always shown).
  - 960px and up: 3 columns, (1104 − 2 × 16) / 3 ≈ 357px wide, about 108–124px tall.
- **Export:** 1856 × 620, 3:1. Keep key shapes in the centre 50% of the height; the wide tablet card crops top and bottom. Keep the top-right corner (step number) and left side (icon, title) low in contrast.

### 16. Strategy scene photo
- **Page:** Field guide. **File:** `src/lib/strategies.ts` (`photo`), shown in `src/screens/FieldGuide.tsx`.
- **Use:** one Pexels photo per D that matches its practice situation. Loaded from `images.pexels.com`; CSS mutes and fades it into the card.
- **Now:** party (Direct), club (Distract), transit (Delegate), study table (Delay), phone (Document).

## General notes
- Every image in slots 1–12 is decorative except 5, 6 and 8. Use `alt=""` for decorative images; give 5 and 6 a short scene description.
- Provide a night and a dawn version for slots 1, 2, 4 and 7, or tint with CSS.
- Respect `data-motion="still"`: no animated images unless reduce motion is off.
- Use `loading="lazy"` for slots 5, 9 and 10. Load slots 1 and 4 eagerly (above the fold).
