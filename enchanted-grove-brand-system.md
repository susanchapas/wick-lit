# Enchanted Grove: the complete brand and design system

Version 4. This single file holds every rule, token, component and asset source for the Enchanted Grove brand, so it can be dropped into any project (or handed to an AI coding agent) as the source of truth. Default theme: **Dusk**. Themes: Dusk (default), Grove (night blue), Mist (light), Fern (verdant dark).

## How to use this file

1. Copy the `tokens.css` block from Appendix A into your project and set `<html data-theme="dusk">` (or `grove`, `mist`, `fern`).
2. Download the fonts listed in Appendix F (all SIL Open Font License) into a `fonts/` folder, or load them from Google Fonts.
3. For React projects, copy the component stylesheet (Appendix B) and the component library (Appendix C). Components attach to `window.Grove` and expect React 18 on the page.
4. Follow the rules in sections 1 to 10. Every color pairing listed as text-safe reaches WCAG AAA (7:1) in all four themes.
5. To quiet all motion for a person who asks, set `data-motion="still"` on `<html>`.

## Contents

- 1. Brand overview
- 2. Color
- 3. Typography
- 4. Visual and material language
- 5. Web and UI architecture
- 6. Motion
- 7. Responsive layout
- 8. Accessibility and usability
- 9. Editorial and verbal identity
- 10. Packaging and print
- 11. Token reference
- 12. Components
- Appendix A. tokens.css
- Appendix B. Component stylesheet
- Appendix C. Component library (bundle.js)
- Appendix D. TypeScript definitions
- Appendix E. Ornament, filigree and icon SVG sources
- Appendix F. Fonts

## 1. Brand overview

Enchanted Grove is a software brand built around nocturnal alchemy and living flora. The interface should feel like a pane of frosted glass held over a glowing, mossy forest floor: elegant, hushed and a little enchanted. It sits between a shadowed botanical garden and a refined modern laboratory. Whimsy is everywhere it can be kind: sparks burst when work is preserved, a seedling sprouts when something is planted, leaves drift down when something is pruned, glowworms and fireflies wander through empty clearings, a moth crosses the screen when night falls, and checkboxes open into tiny blooms. None of it ever stands in the person's way.

### Brand strategy

**Primary archetype: the Magician.** The brand works as a conduit between natural biology and quiet wonder. It offers transformation, heightened perception and access to an unseen realm.

**Secondary archetype: the Sage (botanical and arcane).** Botanical intelligence, subtle pattern and careful observation keep the brand grounded. The Sage anchors the Magician in timeless, sophisticated mystique and keeps juvenile fantasy out of the brand.

| | |
| --- | --- |
| Essence | Nocturnal Alchemy and Flora Incarnate |
| Brand promise | Unveiling the luminous, hidden quietude of the natural world |
| Emotional position | Introspective, reverent, sensorial, grounded luxury |
| Vibe | Midnight Terrarium and Digital Apothecary |

### Using this system

- **Themes.** Four color themes share one set of token names. `dusk` is the default: a nightshade ground, amethyst tiles and fuchsia flare. `grove` is the night blue mode. `mist` is the light mode, grounded in Pale Mist. `fern` is the verdant mode on a deep forest floor. Pure white (`#ffffff`) does not appear anywhere; use `pale-mist`, `canopy-raised` or `on-seal` where white would otherwise go.
- **Accessibility level.** Every text token holds at least 7:1 (WCAG AAA) on each ground its usage note names, in all four themes. Sills, the focus halo, icons and chart marks hold at least 3:1.
- **Grounds and text.** Set pages on `canopy`, cards on `canopy-raised`, fields on `canopy-sunken` and secondary buttons on `frost`. Set text in `ink`, `ink-muted`, `ink-link` or `amethyst-text`. Green text and fills come from `moss-text` and `moss-soft`. The source hues and greens (`amethyst`, `cornflower-blue`, `golden-sand`, `baby-blue-ice`, `moss`, `fern-green`, `lichen`, `glowworm`) belong to imagery, charts, sparkles and print.
- **Quest-log ornament.** Cards and tiles wear gilded swirl corners (`eg-ornate`), featured cards add a crest with the theme's flare gem (`eg-ornate-gilded`), and cards take original cut silhouettes: notch, scoop, arch, ticket and banner.
- **Flares and contrast.** Each theme has one vivid flare (fuchsia, aurora, rosehip, marigold) through `flare`, `flare-text` and `flare-soft`, and tiles sit clearly lighter than the page.
- **Surfaces are carved.** Nothing wears an outline. Raised surfaces use `inset-frost`, fields use `inset-well` (whose 2px `sill` keeps them findable), the primary button uses `inset-seal`. Hover light comes from `glow-lumen` and `glow-seal`; floating layers add `bleed-twilight`. Hard drop shadows are never used.
- **Focus.** Every interactive element shows the firefly halo, `focus-ring`, under `:focus-visible`. It is the only solid ring in the system.
- **Type.** Headings use the `display` family (Cormorant, an open source serif close to Ogg Roman). Interface text uses the `sans` family (Mona Sans). Numbers, codes and ratios use the `mono` family (DM Mono).
- **Motion and whimsy.** Durations and curves come from the `duration` and `easing` tokens. Effects come from the bundle so they look the same everywhere: `Grove.burst` (sparks), `Grove.sprout` (a seedling), `Grove.leafFall` (falling leaves), `Grove.mothFlight` (a moth for night themes), plus the `Sparkle`, `Fireflies`, `Pollen`, `Checkbox` and `MoonPhase` components.
- **Responsive.** Four growth stages from the `breakpoint` tokens: seedling, sapling, grove and canopy.
- **Radii.** `radius-sm` (4px), `radius-md` (6px) and `radius-lg` (8px) only.
- **Components.** React components live in `components/bundle.js` as `window.Grove`, with styles in `components/bundle.css`. Every class is prefixed `eg-`.
- **Logo.** No logo or wordmark exists yet. Until one is drawn, set the product name in `folio` or `title` in the `display` family.

### Seeing it in practice

In the published design system, seventeen showcase pages sit beside the components. They are live, animated and follow the theme switcher: Quest cards and gilded tiles, Every pairing applied, One screen in four themes, Charts in the grove, Type in use, Light and depth, Filigree in use, Icons in use, A working screen, Depth map, The threshold, The motion library, A success frame by frame, Growth stages, Accessible without outlines, Voice in context and the Packaging suite.

A one-page interactive brand guide and a portable markdown reference with every token accompany this system.

The sections that follow set the rules for color, type, visual language, interface, motion, responsive layout, accessibility, voice and packaging.

## 2. Color

The five source hues come from the Enchanted Grove palette. Pale Mist stands in for white, a family of greens brings the living grove into the palette, four vivid flares (Fuchsia, Aurora, Rosehip and Marigold) give each theme a jewel-bright accent, and gilded gold dresses the ornaments. Grounds are deep and tiles are clearly lighter, so every card lifts off the page. Every text pairing meets WCAG AAA in all four themes; the tables below are measured from the tokens themselves.

### The palette

| Hue | Hex | Role |
| --- | --- | --- |
| Amethyst | `#A846A0` | Source. Foil, imagery, sparkles, large decorative fields |
| Cornflower Blue | `#6F9CEB` | Source. Illustration, charts, packaging panels |
| Oxford Navy | `#102F5D` | Source. Filigree ink, Mist text |
| Golden Sand | `#CACF85` | Source. Bioluminescent highlight, focus halo, progress trail |
| Baby Blue Ice | `#98B9F2` | Source. Soft fills, vellum tints, first chart series |
| Pale Mist | `#ECF1FB` | Added. Used wherever white would be |
| Fuchsia | `#FF5FBC` | Added flare. Dusk's gems, seal, hover blooms and rare tags |
| Aurora | `#5FE0E6` | Added flare. Grove's gems and hover light |
| Rosehip | `#C2187F` | Added flare. Mist's gems and flare fills |
| Marigold | `#FFBE4D` | Added flare. Fern's gems and warm light |
| Gold Leaf | `#D4B062` | Added metallic. Gilded swirls, crests and frames |
| Moss | `#3E6B48` | Added green. Moss-dyed stock, illustration fields, leaves |
| Fern | `#6FA877` | Added green. Illustration, sprouts, leaves, packaging panels |
| Lichen | `#B7DDB0` | Added green. Filigree ink on moss stock, soft fills, leaves |
| Glowworm | `#9BF0C4` | Added green. Firefly and pollen glow, the green sparkle |
| Forest Floor | `#0C2620` | Derived green. Imagery and print on the verdant line |
| Midnight Canopy | `#0B1D3A` | Derived. Imagery and print on the night line |
| Plum Dusk | `#2A1030` | Derived. Imagery and print on the twilight line |
| Wax Amethyst | `#74306F` | Derived. The seal in Grove, Mist and Fern |
| Orchid Lumen | `#E8B4E2` | Derived. Amethyst as text on dark grounds |
| Gilt | `#B8AE6A` | Derived. Muted gold hairline filigree |

### Themes

| Theme | Page `canopy` | Tile `canopy-raised` | Well `canopy-sunken` | Frost | Text `ink` | Seal | Flare | Character |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Dusk (default) | `#1c0823` | `#4b1f5e` | `#110416` | `#5c2a72` | `#f6eff8` | `#ff6fc6` | `#ff5fbc` | Nightshade and amethyst, lit with fuchsia |
| Grove | `#071530` | `#18396f` | `#040c1e` | `#21457f` | `#eef3fc` | `#74306f` | `#5fe0e6` | Night blue forest, lit with aurora |
| Mist | `#cbd7ee` | `#f5f8fe` | `#bfcce6` | `#e1e8f6` | `#0e2a55` | `#74306f` | `#9c1166` | Deep mist with pale tiles, lit with rosehip |
| Fern | `#061a14` | `#184838` | `#03100c` | `#1d5040` | `#eef6f0` | `#74306f` | `#ffbe4d` | Forest floor, lit with marigold and glowworms |

Dusk is the default for every product surface: a nightshade ground, amethyst tiles and fuchsia flare. Offer Grove and Fern as preferences and Mist for people who read better on light grounds or who work in bright rooms. Respect `prefers-color-scheme: light` on a first visit by starting in Mist.

### Ground and tile contrast

Tiles must read as objects resting on the page. The page ground was deepened and `canopy-raised` lifted in every theme, so the step between them is at least 1.35:1 (and between a tile and the sunken well inside it at least 1.5:1). Inset frost adds a lit top edge on top of that.

| Theme | Page | Tile | Page to tile | Tile to well |
| --- | --- | --- | --- | --- |
| Dusk | `#1c0823` | `#4b1f5e` | 1.49:1 | 1.57:1 |
| Grove | `#071530` | `#18396f` | 1.60:1 | 1.72:1 |
| Mist | `#cbd7ee` | `#f5f8fe` | 1.36:1 | 1.52:1 |
| Fern | `#061a14` | `#184838` | 1.74:1 | 1.87:1 |

### Flares: one vivid accent per theme

Each theme pairs its ground with a single jewel-bright flare, the way fuchsia lights the purple of Dusk.

| Token | Role |
| --- | --- |
| `flare` | Gems in ornaments, rarity bands, the flare tag fill, highlight bars. A fill and a light, never body text. |
| `flare-text` | The flare as readable text: rare names, rarity labels, highlighted figures. |
| `flare-soft` | Soft ground behind `flare-text`: flare tags, highlighted rows, quest rewards. |
| `on-flare` | Text on a solid flare fill. |
| `glow-flare` | The flare's hover bloom on gems, rare cards and tiles. |

Rules: one flare moment per card, a few per screen. In Dusk the seal itself is fuchsia, so flare and the primary action share one family there.

### Gilded gold

`gold-deep`, `gold` and `gold-bright` form the gradient that every swirl ornament, crest and frame is painted with. Mist uses a deeper gold so the swirls hold their own on light tiles. Gold is ornament only: it never carries text or meaning.

### Where green lives in the interface

- `moss-text` on `moss-soft`: the moss tag (In season, Growing, Thriving), growth figures, the in-season row.
- `data-5`: growth measures in charts.
- `spark-4` (glowworm): half of all wandering fireflies, a quarter of every burst, the pollen trail and the sprout's glow.
- `leaf-1`, `leaf-2`, `leaf-3`: falling leaves when something is pruned.
- `glow-moss`: hover bloom on moss tags, growth chips and checkboxes.
- The whole Fern theme.
- Success stays blue (`dew`) in every theme so that success and error never depend on telling green from red.

### Text pairings (all AAA)

| Token | On | Dusk | Grove | Mist | Fern |
| --- | --- | --- | --- | --- | --- |
| `ink` | canopy / raised / sunken / frost | 16.8 / 11.2 / 17.7 / 9.2 | 16.3 / 10.2 / 17.5 / 8.5 | 9.8 / 13.3 / 8.8 / 11.5 | 16.4 / 9.4 / 17.6 / 8.4 |
| `ink-muted` | canopy / raised / sunken | 12.6 / 8.4 / 13.2 | 11.6 / 7.3 / 12.5 | 8.4 / 11.5 / 7.5 | 12.9 / 7.4 / 13.9 |
| `ink-link` | canopy / raised / sunken | 12.9 / 8.7 / 13.6 | 11.9 / 7.5 / 12.8 | 8.1 / 11.0 / 7.2 | 13.6 / 7.8 / 14.6 |
| `amethyst-text` | canopy / raised / amethyst-soft | 11.6 / 7.8 / 9.5 | 11.3 / 7.1 / 9.1 | 8.0 / 10.8 / 9.5 | 12.6 / 7.3 / 9.9 |
| `flare-text` | canopy / raised / flare-soft | 11.5 / 7.7 / 8.9 | 13.4 / 8.4 / 8.9 | 7.8 / 10.6 / 9.2 | 13.4 / 7.7 / 9.2 |
| `moss-text` | canopy / raised / moss-soft | 13.5 / 9.1 / 9.0 | 11.8 / 7.4 / 8.6 | 8.3 / 11.3 / 10.0 | 14.0 / 8.1 / 7.5 |
| `lumen` | canopy / raised / sunken | 13.0 / 8.7 / 13.7 | 11.6 / 7.3 / 12.5 | 8.5 / 11.5 / 7.6 | 13.6 / 7.8 / 14.7 |
| `dew` | canopy / dew-soft | 13.0 / 9.3 | 11.9 / 8.5 | 8.0 / 9.3 | 13.3 / 8.6 |
| `thorn` | canopy / thorn-soft | 11.6 / 8.9 | 11.7 / 9.4 | 8.0 / 9.6 | 12.6 / 9.5 |
| `on-seal` | seal | 7.5 | 7.7 | 8.2 | 7.7 |
| `on-flare` | flare | 7.4 | 11.5 | 7.4 | 10.9 |

### Marks (3:1 or more)

| Token | On | Dusk | Grove | Mist | Fern |
| --- | --- | --- | --- | --- | --- |
| `sill` | canopy / sunken / frost | 7.5 / 7.9 / 4.1 | 6.9 / 7.4 / 3.6 | 4.1 / 3.6 / 4.8 | 9.2 / 9.9 / 4.7 |
| `flare` | canopy / raised | 6.9 / 4.6 | 11.5 / 7.2 | 5.4 / 7.4 | 10.9 / 6.3 |
| `lantern` | seal | 7.0 | 7.7 | 8.2 | 7.7 |
| `trail` | sunken | 12.1 | 11.9 | 5.0 | 11.8 |
| `data-5` | canopy / raised | 10.8 / 7.2 | 9.2 / 5.7 | 5.6 / 7.6 | 11.7 / 6.7 |

Figures are contrast ratios computed from the token values. Any new pairing must be measured before use and must reach 7:1 for text under 24px.

### Layering rules

1. **Three strata of ground.** `canopy-sunken` below, `canopy` in the middle, `canopy-raised` above. Never stack two surfaces of the same token directly; step up or down one stratum.
2. **Surfaces carry their inset.** Raised surfaces always wear `inset-frost`; sunken surfaces always wear `inset-well`. The inset is what separates them, so no surface needs an outline.
3. **Text sits on grounds only.** Place text on the canopy tokens, `frost`, `seal`, `amethyst-soft`, `moss-soft`, `flare-soft` or a status soft fill. Never place text on a source hue, on imagery or on a gradient without a solid `canopy-raised` panel behind it.
4. **One seal per view.** `seal` (Wax Amethyst) marks the single most important action.
5. **Lumen is light.** `lumen` (Golden Sand) appears as focus, hover glow, the progress trail and small highlights. It never fills more than 5% of a screen.
6. **Green means alive.** Use the moss tokens for growth, seasons and living things. Never use green to mean success or permission.
7. **Sparkles and leaves are decoration.** The `spark-*` and `leaf-*` tokens color particles only. They carry no meaning and need no contrast.
8. **Status always pairs color with a word and an icon.** Success uses `dew` (blue), error uses `thorn` (copper) and caution uses `lumen` (gold).

### Imagery and iconography on color

- Source hues and greens at full strength belong to illustration, photography grading, charts, sparkles and packaging.
- Line art and icons on dark grounds use `ink`, `gilt`, `lichen` or `lumen`. On Mist they use `oxford-navy` or `moss`.
- Icons that carry meaning hold 3:1 against their ground. Decorative filigree may fall below 3:1 when it carries no information.
- Photography sits inside a `radius-lg` frame carved with `inset-frost`, or bleeds off the page edge. Grade toward cool shadows, mossy midtones and Golden Sand highlights.
- Never set words straight on a source hue or a photograph. Put them on a frosted `canopy-raised` panel above it.

### Data visualization

- Series colors in order: `data-1` (Baby Blue Ice), `data-2` (Golden Sand), `data-3` (Amethyst), `data-4` (copper), and `data-5` (fern green) for growth measures. Mist swaps each for its deep counterpart.
- Prefer two or three series. Past four, group the rest as "Other" in `ink-muted`.
- Gridlines use `data-grid` (an alias of `vein`) at `stroke-hairline`. Axis labels use `specimen` in `ink-muted`.
- Lines are 1.75px with round joins and draw in over `duration-unfurl` or longer when a chart first appears. Points appear on hover only, each glowing in its series color.
- Label series directly at the line end so a legend is optional. Every chart carries a written summary for screen readers.
- A single measure uses one ring in `trail` over a sunken track. Never stack rings.

## 3. Typography

The type pairing sets ancient scholarly text against a crisp modern interface. Three open source families cover every need, and all three ship with the system as WOFF2 files. The Type in use showcase shows the scale, an editorial page and the responsive steps live.

| Family token | Face | Resembles | Job |
| --- | --- | --- | --- |
| `display` | Cormorant (300 to 700, roman and italic) | Ogg Roman: calligraphic, high contrast, sharp wedge serifs | Headings, epigraphs, packaging names |
| `sans` | Mona Sans (200 to 900, roman and italic) | A clean grotesk with a technical, laboratory tone | All interface and reading text |
| `mono` | DM Mono (400, 500) | Specimen labels and instrument readouts | Numbers, batch codes, IDs, timestamps |

All three are licensed under the SIL Open Font License.

### Hierarchy

| Style | Family | Size / line | Weight | Use |
| --- | --- | --- | --- | --- |
| `folio` | display | 64 / 64 | 500 | Welcome screens and packaging fronts. One per view. |
| `title` | display | 44 / 48 | 500 | Page titles |
| `heading` | display | 30 / 36 | 600 | Section headings |
| `subheading` | display | 22 / 28 | 600 | Card and dialog titles |
| `marginalia` | display italic | 20 / 28 | 500 | Epigraphs, pull quotes, empty state lines |
| `body-lg` | sans | 18 / 28 | 400 | Lead paragraphs, onboarding |
| `body` | sans | 16 / 26 | 400 | Default text |
| `label` | sans | 14 / 20 | 550 | Buttons, field labels, tabs |
| `caption` | sans | 13 / 20 | 400 | Helper text, metadata |
| `specimen` | mono | 13 / 20 | 400 | Data values and codes |
| `overline` | mono | 12 / 16 | 500, +0.12em, uppercase | Eyebrow above a heading |

### Responsive steps

Display sizes step down at smaller growth stages. Text sizes hold steady so reading comfort never drops.

| Style | Seedling (phones) | Sapling (tablets) | Grove and canopy |
| --- | --- | --- | --- |
| `folio` | 44 / 46 | 54 / 54 | 64 / 64 |
| `title` | 34 / 38 | 40 / 44 | 44 / 48 |
| `heading` | 26 / 32 | 28 / 34 | 30 / 36 |
| `subheading` and below | unchanged | unchanged | unchanged |

In CSS, a fluid folio can use `font-size: clamp(44px, 4.2vw + 20px, 64px)`.

### Rules

- Cormorant never goes below 20px on screen or 12pt in print. Its hairlines thin out at small sizes, so everything smaller is set in Mona Sans or DM Mono.
- Set headings in sentence case. Reserve title case for proper names, product names and batch names ("The First Gathering").
- Keep reading measure between 60 and 72 characters.
- Use `overline` sparingly, at most one per section, and never longer than three words.
- Use DM Mono for columns of numbers; its figures are tabular by default.
- Italic Cormorant is a voice for quiet commentary. Never set instructions, errors or button labels in it.
- Minimum body size is 16px on screen at every growth stage. Captions at 13px are for single lines of metadata only.
- Letter spacing on display styles stays at or slightly below zero. Never track out the serif.

## 4. Visual and material language

The Light and depth, Filigree in use and Icons in use showcases show every rule below applied and interactive.

### Carved glass: inset shadows in place of outlines

Components never wear colored outlines or rings. Each surface is carved with an inset shadow that tells the eye whether it rises, sinks or can be pressed.

| Surface | Shadow token | What it looks like |
| --- | --- | --- |
| Cards, dialogs, toasts, menus, tags, frost buttons | `inset-frost` | A soft highlight along the top inner edge and a shade pooling at the base, like frosted glass |
| Fields, wells, switch tracks, progress tracks | `inset-well` | A shadow under the top lip and a 2px `sill` along the base |
| The seal (primary) button | `inset-seal` | A pressed-wax highlight on the upper lip and a deep pool below |
| Anything pressed | `inset-press` | Light leaves and the surface sinks 1px |

- The sill inside `inset-well` is the one hard edge in the system. It exists for accessibility: it holds at least 3:1 so a field can always be found.
- Compose insets with glows in one declaration: `box-shadow: var(--inset-frost), var(--glow-lumen);`.
- Hairlines survive only as decoration: `vein` dividers between content sections, table rules and chart gridlines.

### Gilded ornaments: the quest log

The archive reads like a mage's quest log. Cards and tiles carry gilded swirl ornaments painted with the `gold-deep`, `gold` and `gold-bright` gradient, and featured cards hold the theme's flare as a gem.

| Level | What appears | Use for |
| --- | --- | --- |
| None | Inset frost only | Dense lists, tables, data panels |
| Corners (`eg-ornate`) | A gilded swirl flourish in each corner | Most cards, panels, tiles (`eg-ornate-sm` for small ones) |
| Gilded (`eg-ornate-gilded`) | Corners, a crest holding the flare gem, a fading inner frame, a divider at the foot | One or two featured cards per view: the active quest, a reward, onboarding |

- Ornaments sit 6px inside the edge (`ornament-inset`), 46 to 56px on cards, 40px on panels, 30px on tiles. Content padding grows so swirls never touch words.
- The inner frame of a gilded card fades out between the corners and under the crest; it is filigree, never a component boundary.
- Ornate buttons (`ornate`) carry a small gilded flourish at each end. Reserve them for the action that begins or completes a quest.
- The gilded divider (`eg-divider-gilded`) separates titles from content on boards and dialogs.
- Mark every ornament `aria-hidden`; they carry no meaning.

### Card silhouettes

Original cuts inspired by fantasy game interfaces: carved tablets, chapel windows, tickets and pennants. Soft (an 8px radius) stays the default.

| Silhouette | Token | Use for |
| --- | --- | --- |
| Soft | `radius-lg` | Everyday cards and panels |
| Notch | `cut-notch` 14px | Quests, items, dialog headers, KPI tiles |
| Scoop | `cut-scoop` 16px | Rewards, specimen plates, featured content |
| Arch | `cut-arch` | Companions and characters, onboarding, welcome cards |
| Ticket | `cut-ticket` 10px | Passes, batch labels, quest scrolls |
| Banner | `cut-banner` 18px | Ranks, achievements, chapter markers |
| Gem | `cut-gem` 22% | Icon wells, inventory slots, currency |

- One silhouette family per list; never mix cuts within a single row of cards.
- Cut silhouettes clip ordinary shadows, so their hover glow lives on a wrapper (`eg-cut-wrap`) as a drop-shadow in the flare color.

### Inventory tiles

- Tiles hold one thing: a specimen, ingredient, tool or reward. Notched by default, with small gilded corners.
- A rarity band glows across the top in `flare`, `gold`, `moss-text` or `amethyst-text`; the icon sits in a cut-gem well and takes the band's color.
- Gold diamond pips show rank out of five; a count sits in the top corner on `flare-soft`.

### Light and bioluminescence

- **Bloom on hover.** An element that can be touched glows when the pointer finds it: `glow-lumen` on cards, frost buttons and fields; `glow-seal` on the seal. Cards also lift 2px and wake a firefly twinkle in their upper right corner.
- **Sink on press.** Pressing swaps the glow for `inset-press` and spreads a dew ripple from the press point.
- **The firefly halo on focus.** Keyboard focus adds `focus-ring`: a thin ring of ground color, 2px of solid `lumen`, and a soft glow. It is the only solid ring in the system and appears only for keyboard focus.
- **Glow always travels with a second cue** (a lift, a color change or an underline) so no state depends on glow alone.
- **Floating layers** add one directional `bleed-twilight`, falling slightly downward as if lit from the upper left through leaves. Hard drop shadows are never used.

### Whimsy

Small enchantments reward attention. They are always decorative, always optional under reduced motion, and never in the way. Each one belongs to a verb.

| Moment | Whimsy | Colors |
| --- | --- | --- |
| Preserve, complete, cross the boundary | A firefly burst of sparks and stars | `spark-1` to `spark-4` |
| Plant, cultivate, create | A seedling draws itself above the button, unfolds two leaves and glows | `leaf-1`, `leaf-2`, `spark-4` |
| Prune, return to earth | Leaves drift down from the control, swaying | `leaf-1` to `leaf-3` |
| Switch to a night theme | One moth crosses the screen toward the new light | `gilt`, `lichen` |
| Check a box | The bud opens: five tiny petals bloom as the mark draws | `spark-3`, `spark-4` |
| Hover the seal | A dew sheen slides once across the wax | `pale-mist` |
| Empty states, onboarding, heroes | Fireflies and glowworms wander and blink | `spark-*` |
| Hero and onboarding areas | Pollen trails the pointer and floats away | `spark-4`, `spark-1` |
| Short waits | The moon waxes and wanes | `spark-1` |
| Loading | Spores drift along the trail | `trail`, `spark-1` |
| Switches that are on | The lantern knob breathes | `lantern` |

- **Budget.** At most one burst, sprout or leaf fall per moment and one looping ambient effect per view. If two things sparkle at once, remove one.
- **Placement.** Fireflies and pollen stay out of forms, tables and long text. Never more than eight fireflies on a screen.
- **Words first.** Every effect accompanies words that say what happened. Effects are `aria-hidden`.

### Vector filigree and line art

- Draw with single-weight hairline strokes: `stroke-filigree` (0.5pt) for print and `stroke-hairline` (0.75pt) on screen. Never vary the stroke within one drawing and never fill line art.
- Ink colors: `gilt` on dark grounds and dark stock; Oxford Navy on Pale Mist and light stock.
- Subjects: nocturnal mycorrhizae, constellations mapped onto flower structures, unfurling fern fronds and moth wings. The `Filigree` asset group holds one drawing of each.
- Strength by placement: 15% behind a heading, 35% as a watermark, 60% in corners and margins, 95% as standalone art in empty states.
- Filigree lives at the edges of a layout, in corners, between sections and hanging from the top of the footer. It never sits under words at more than 15%.
- Avoid literal illustrations of trees, vines, mushrooms with faces, fairies, wands or cartoon sparkles.

### Negative space (the Mist Rule)

- Leave at least 40% of every layout, screen or physical touchpoint as untouched ground: `canopy` on screen, Pale Mist stock in print.
- On screen, use `space-12` between sections and the page margins of each growth stage.
- When a layout feels crowded, remove an element before shrinking the spacing.

### Fine-grain texture

- Every canopy ground carries a microscopic SVG noise overlay at `opacity-grain` (2.5%). It turns flat pixels into something closer to watercolor paper or stone.
- Apply grain as a fixed, pointer-transparent layer at `stratum-root`. The component stylesheet does this on `body`.

### Iconography

- Icons are drawn on a 24px grid with a 2px safe margin, at `stroke-icon` (1.25px), with round caps and joins, and are never filled.
- Forms come from botany and instruments: a sprout for cultivate, a lens for seek, shears for prune, a sealed flask for preserve, a crossed circle for an obscured path, a crescent for night.
- Icons inherit their color from the text around them. On hover they take `lumen` with a soft glow; when selected, `amethyst-text`.
- Use 20px in controls and 24px in navigation. Navigation always pairs an icon with a word.
- Every icon-only button carries a plain `aria-label` and a visible tooltip on hover and focus.

### Imagery and textures

- Photography is macro and nocturnal: moss under raking light, lichen on slate, dew on fern tips, moth scales, cut stems in glass. Keep depth of field shallow.
- Grade toward cool blue shadows and warm Golden Sand highlights. Avoid saturated greens.
- No people in hero imagery. Hands are allowed when they handle botanical material.
- Frame all imagery in `radius-lg` carved with `inset-frost`, or bleed it off the page edge.
- Textures (vellum, cotton stock, slate) may sit behind imagery at 4 to 8% opacity.

## 5. Web and UI architecture

The interface balances atmospheric depth with strict usability. It should feel like looking into a quiet, luminous ecosystem while still behaving like dependable software. The A working screen, Depth map and The threshold showcases show these rules assembled.

### Z-index depth mapping

Depth follows atmospheric perspective. Lower strata are darker, cooler and softer; higher strata are brighter and catch more light.

| Stratum token | z-index | Surface | Holds |
| --- | --- | --- | --- |
| `stratum-root` | 0 | `canopy` + grain | Page ground, wandering fireflies, ambient imagery |
| `stratum-understory` | 10 | `canopy-raised` + `inset-frost` | Cards, panels |
| `stratum-canopy` | 20 | `canopy-raised` at 88% + `blur-mist` | Sticky header, side navigation |
| `stratum-mist` | 30 | `canopy` at `opacity-scrim` + `blur-mist` | Scrim behind dialogs |
| `stratum-bloom` | 40 | `canopy-raised` + `inset-frost` + `bleed-twilight` | Dialogs, menus, popovers |
| `stratum-firefly` | 50 | `canopy-raised` + `inset-frost` + `bleed-twilight` | Toasts, tooltips, sparkle bursts |

Never invent z-index values outside this table.

### Component architecture

- **No outlines.** Every container is carved: `inset-frost` for things that rise, `inset-well` for things that receive input, `inset-seal` for the primary button.
- **Quest-log cards** add gilded corners, crests and cut silhouettes (see Visual language). Lists use one silhouette throughout; one or two gilded cards per view.
- **Tiles** hold single things in notched inventory slots with rarity bands and rank pips.
- **Cards** are borderless: `canopy-raised` fill, `inset-frost`, `radius-lg`, `space-6` padding and no outer shadow at rest. Interactive cards bloom, lift 2px, wake a corner twinkle and always show a visible call to action ("Open log").
- **Frosted panels** (header, dialog) use a translucent canopy fill with `backdrop-filter: blur(24px)` so the grove shows through faintly.
- **Buttons** come in three tones. Seal (`seal` fill, `on-seal` label, `inset-seal`) marks the single primary action. Frost (`frost` fill, `inset-frost`) is for secondary actions. Quiet (underlined `ink-link` text) is for tertiary actions.
- **Fields** sit in `canopy-sunken` with `inset-well`. Labels always sit above the field; placeholders never replace labels. The field's lower corners use `radius-sm` so the sill reads as a level edge.
- **Checkboxes** are buds: a small well that fills with wax amethyst and opens into a bloom when checked.
- **Switches** are lanterns: a well track that turns to wax amethyst, with a knob that glows and breathes while on.
- **Tabs** show selection with `amethyst-text`, a 2px `seal` mark that glides between tabs, and `aria-selected`.
- **Radii** stay between 4px and 8px: `radius-sm` for tags and checkboxes, `radius-md` for buttons and fields, `radius-lg` for cards, dialogs, toasts and image frames. No pills and no square corners.
- **Controls** are at least 44px tall at every growth stage.

### States

| State | Treatment |
| --- | --- |
| Rest | The surface's inset alone |
| Hover | Add `glow-lumen` (or `glow-seal`), plus a lift, fill change or underline |
| Keyboard focus | Add `focus-ring` through `:focus-visible` |
| Pressed | Swap to `inset-press`, sink 1px, dew ripple from the press point |
| Selected | `amethyst-text`, a `seal` mark, and `aria-selected` or `aria-current` |
| Disabled | `opacity-disabled`, cursor not-allowed, and a visible reason nearby |
| Error | `inset-well-error`, a single wilt sway, the obscured icon and a sentence |
| Loading | The Gathering trail with drifting spores and the word "Gathering" |
| Success | A toast or notice in `dew`, with a firefly burst when the person caused it |
| Created | A sprout grows above the control that planted it |
| Deleted | Leaves drift down from the control, then the item fades out |
| Checked | The bud blooms and the mark draws in |

### Onboarding

- Frame the first minutes as crossing a threshold: a folio heading, one short paragraph, one choice at a time.
- Show progress as a constellation. Finished steps glow, the current star breathes and slowly turns, the next line draws itself in. The list is an ordered list with `aria-current="step"`.
- Selecting an option glows it with `glow-seal` and releases a small burst. Finishing onboarding releases a full burst.
- Fireflies may wander through onboarding screens, away from the form.

## 6. Motion

Motion is slow, soft and openly enchanted. Everything moves like something alive in a night garden: light blooms, spores drift, fireflies and glowworms wander, planted things sprout, pruned things shed leaves, a moth crosses the screen when night falls, and a success releases a burst of sparks. The motion library and A success frame by frame showcases play every movement live.

### Principles

1. **Earned delight.** The most whimsical moments (bursts, the lantern, the constellation) respond to something the person did. Nothing sparkles on page load or during background work.
2. **Slow in, soft out.** Entrances use `ease-mist`, which starts quickly and settles gently. Nothing snaps.
3. **Light before movement.** Prefer a change of glow to a change of position. When things move, they move a few pixels.
4. **Living and calm.** One looping ambient effect per view, and at most one burst per moment.
5. **Motion is optional.** Under reduced motion, the light stays and the movement goes.

### The named movements

| Movement | Tokens | Trigger | What happens |
| --- | --- | --- | --- |
| Firefly burst | `duration-firefly`, `ease-mist` | An earned success | 16 gold, dew and orchid sparks fly out, drift upward and fade around the source |
| Bloom | `duration-drift`, `glow-lumen` | Hover | Glow gathers around the surface, which lifts 2px |
| Dew ripple | `duration-unfurl`, `ease-mist` | Press | A pale ring spreads from the press point inside the control |
| Rise through mist | `duration-bloom`, `ease-mist` | Entrance | Fade in, rise 8px, a 4px blur clears |
| Spore drift | `duration-tide`, `ease-tide` | Indeterminate loading | Spores float along the track while a short trail wanders |
| Formulated | `duration-bloom`, then a burst | Progress reaches 100% | The spark leads the trail home, the label turns to Formulated, a small burst releases |
| Firefly wander | `duration-wander`, `ease-tide` | Ambient | Up to eight fireflies drift slow loops and blink |
| Unfurl | `duration-unfurl`, `ease-unfurl` | Expand | Panels open from the corner that was pressed, like a frond uncurling |
| Wilt | `duration-unfurl`, `ease-mist` | An error appears | The field sways once, gently, about its base |
| Constellation | `duration-unfurl`, `ease-mist` | A step completes | The next line draws itself between stars |
| Lantern | `duration-bloom`, `ease-unfurl`, `duration-tide` | Switch turns on | The knob glides with a slight overshoot, then breathes |
| Twinkle | `duration-bloom`, `ease-unfurl` | Card hover or focus | A single firefly wakes and turns in the card's corner |
| Tab glide | `duration-bloom`, `ease-unfurl` | Tab change | The selected mark slides to the new tab and the panel rises |
| Sprout | `duration-unfurl`, `ease-unfurl` | Plant, cultivate, create | A seedling draws its stem, unfolds two leaves, glows glowworm green and releases a few sparks |
| Leaf fall | about 1600ms, `ease-tide` | Prune, return to earth | Nine leaves drift down from the control, swaying and turning, then fade |
| Moth flight | 3400ms, 180ms wingbeat | Switching to a night theme | One moth flutters across the screen along a wavering path |
| Pollen trail | about 1100ms per speck | Pointer moves in a hero or onboarding area | Glowing specks fall from the pointer and float upward |
| Bud bloom | `duration-bloom`, `ease-mist` | A checkbox is checked | Five petals open outward and fade as the check mark draws |
| Moon phase | `duration-tide`, `ease-tide` | Waits under two seconds | The moon's shadow sweeps across it, waxing and waning |
| Dew sheen | 900ms, `ease-mist` | Hover on the seal | A soft highlight slides once across the wax |

### Curves and durations

| Token | Value | Use |
| --- | --- | --- |
| `ease-mist` | cubic-bezier(0.2, 0.7, 0.2, 1) | Default for entrances, blooms and color |
| `ease-unfurl` | cubic-bezier(0.34, 1.4, 0.64, 1) | Gentle overshoot for sparkles, knobs and unfurling panels only |
| `ease-tide` | cubic-bezier(0.45, 0, 0.55, 1) | Looping ambient motion that breathes |
| `duration-flicker` | 120ms | Press feedback |
| `duration-drift` | 240ms | Hover blooms, color changes |
| `duration-bloom` | 420ms | Entrances, toasts, dialogs, tab marks |
| `duration-unfurl` | 640ms | Expanding panels, ripples, wilt |
| `duration-firefly` | 1100ms | One sparkle burst |
| `duration-tide` | 2400ms | Breathing loops, spores |
| `duration-wander` | 9000ms | One loop of a wandering firefly |

### Choreography

- Stagger lists and card grids by 40ms per item, up to eight items; the rest arrive together.
- A toast rises first; its burst releases 180ms later, once the toast has settled.
- Dialogs: the scrim fades over `duration-drift` while the dialog unfurls over `duration-unfurl`.
- Never animate layout properties (width, height, top, left) on large surfaces. Animate opacity, transform, filter and shadow.

### The sparkle budget

- One burst, sprout or leaf fall per moment. A burst has at most 16 sparks and lasts about one second. Never chain effects or play them on a timer in the product.
- Match the effect to the verb with the Button's `effect` prop: `sparkle`, `sprout` or `leaves`.
- Spread shrinks with the growth stage: 48px on phones, 64px on tablets, 76px above.
- Sparks are `aria-hidden` and always accompany words that say what happened.
- Use the bundle's helpers (`Grove.burst`, `Grove.sprout`, `Grove.leafFall`, `Grove.mothFlight`) so every effect in the product looks the same.

### Reduced motion

| Movement | Full motion | With `prefers-reduced-motion: reduce` |
| --- | --- | --- |
| Firefly burst | Sparks fly out and fade | One soft glow fades in and out in place |
| Bloom | Glow and a 2px lift | Glow only |
| Dew ripple | A ring spreads | Removed; the pressed shadow remains |
| Rise through mist | Fade, rise, blur clears | Appears at once |
| Spore drift | Spores and trail travel | A still, softly lit bar and the word Gathering |
| Firefly wander | Fireflies drift and blink | Fireflies rest in place, softly lit |
| Wilt | One sway | No sway; copper sill and error text remain |
| Lantern | Glide and breathe | The knob moves at once and stays lit |
| Sprout | The seedling draws and glows | The seedling appears still, then fades |
| Leaf fall, moth flight, pollen, dew sheen | Particles and flight | Removed |
| Bud bloom | Petals open, the mark draws | The mark appears at once; no petals |
| Moon phase | The shadow sweeps | A still half moon beside the word |

## 7. Responsive layout

The layout grows like a plant through four stages: a seedling on phones, a sapling on tablets, a grove on laptops and a full canopy on wide screens. The Growth stages showcase renders one layout at all four sizes from the same markup.

### Growth stages

| Stage | Token | Width | Columns | Margins | Navigation | Cards per row |
| --- | --- | --- | --- | --- | --- | --- |
| Seedling | `bp-seedling` | 0 to 599px | 4 | 16px | Bottom tab bar, 4 items | 1 |
| Sapling | `bp-sapling` | 600 to 959px | 8 | 24px | Icon rail, 84px, with small labels | 2 |
| Grove | `bp-grove` | 960 to 1279px | 12 | 48px | Sidebar, 220px | 3 |
| Canopy | `bp-canopy` | 1280px and up | 12 inside 1200px | 80px | Sidebar and a 340px detail panel | 2 beside the detail |

Gutters are `space-4` on phones and `space-6` everywhere else.

### Layout rules

- Design mobile first and add columns as the stage grows.
- Use container queries (`container-type: inline-size`) for components so a card or panel adapts to the space it is given. Use media queries only for the page shell.
- The Mist Rule holds at every size: at least 40% open ground.
- Reading columns never exceed 72 characters, even on the canopy stage.
- The seal action spans the full width on phones and sits beside the page title from the sapling stage up.
- Seek is an icon button on phones and tablets and a full sunken field from the grove stage up.
- Dialogs become bottom sheets on phones, rising from the lower edge with `duration-unfurl`.
- Toasts sit 16px from the bottom on phones, centered, above the tab bar; 24px from the bottom right corner above that.

### Type, touch and density

- Only display sizes step down: folio 44, 54, then 64; title 34, 40, then 44; heading 26, 28, then 30. Body text stays 16px everywhere.
- Touch targets stay at least 44 by 44px at every stage, including tab bar items and icon buttons.
- Tabs scroll sideways on phones and never wrap.
- Card padding stays `space-6`; on phones, the space between cards drops to `space-3`.

### Whimsy at each size

| Effect | Seedling | Sapling | Grove and canopy |
| --- | --- | --- | --- |
| Wandering fireflies | up to 3 | up to 5 | up to 8 |
| Burst spread | 48px | 64px | 76px |
| Glow radii | two thirds of the token | full | full |
| Filigree | cropped at the edges, never below 96px | cropped at the edges | full placements |
| Turning bloom behind headings | off | on | on |

The `Grove.burst` helper picks the burst spread for the current width automatically.

## 8. Accessibility and usability

Atmospheric palettes often fail WCAG because they depend on low-contrast pastels, and outline-free interfaces often fail because controls disappear. This system targets WCAG 2.2 AAA for text contrast and AA for everything else, in all four themes, without a single component outline. The Accessible without outlines showcase measures every claim below live.

### Contrast mandates

- Text under 24px: at least 7:1 against its ground. Every text token in this system meets this on every ground its usage note names.
- Text at 24px and above, or bold at 19px and above: at least 4.5:1.
- Sills, the focus halo, the switch knob, icons that carry meaning and chart marks: at least 3:1.
- Source hues and sparkle colors are never used as text colors.
- Never place text over imagery, grain, glow or fireflies without a solid panel behind it.

### How carved surfaces stay findable

1. **Words mark buttons.** A button with a visible text label needs no boundary (WCAG 1.4.11 treats the text as the identifier). Seal and frost fills add depth on top. Icon-only buttons are always frost-filled and carry a tooltip.
2. **A sill marks fields.** Every field, switch track and progress track has a 2px `sill` along its base, painted by `inset-well` and holding at least 3:1 against the well and the page.
3. **Position marks switches.** The knob's side says on or off, the knob holds 3:1 against its track, and the label reads On or Off.
4. **A halo marks focus.** The firefly halo is a solid 2px ring of `lumen` set off from the control by a thin ring of ground color, at least 7.4:1 on every canopy ground. It meets WCAG 2.4.13 (focus appearance) and shows only for keyboard focus.
5. **Three cues mark selection.** Selected tabs and rows change color, gain a mark and set `aria-selected` or `aria-current`.
6. **Words carry status.** Every status pairs an icon and a sentence with its color.

### Focus states

```css
:focus-visible {
  outline: 2px solid transparent; /* keeps a ring in Windows high contrast mode */
  outline-offset: 2px;
  box-shadow: var(--inset-frost), var(--focus-ring); /* keep the surface's own inset first */
}
```

Focus must never be conveyed by glow alone. Keep the surface's inset in the same `box-shadow` list so the control keeps its depth while focused.

### Screen reader semantics

- Poetic visual language never enters accessible names for icon-only or ornamental controls. A button styled as an Amethyst wax seal with no visible text is labeled `aria-label="Submit form"`, never "Cast spell".
- For buttons with visible text, the accessible name must contain the visible words (WCAG 2.5.3, Label in Name). If the visible label reads "Preserve", the accessible name is "Preserve" or "Preserve changes". Add a plain description with `aria-describedby` when the verb could be unclear.
- Sparkle bursts, fireflies, filigree, grain and decorative imagery are `aria-hidden="true"` or have empty `alt=""`.
- Loading states use `role="progressbar"` with values when known, and `aria-busy="true"` on the region being filled.
- Success notices and toasts use `role="status"`; error toasts use `role="alert"`. The words announce what the sparkles celebrate.

### Color vision

- Success is blue and error is copper, so the two stay apart without relying on red and green.
- Chart series differ in lightness as well as hue; direct labels name each line.
- In the no-color view, icons and words carry every meaning.

### Motion and comfort

- Every animation respects `prefers-reduced-motion`: the light stays and the movement goes (see the Motion section for each fallback).
- Nothing flashes more than three times a second. Bursts fade over about a second, and breathing loops take 2.4 seconds.
- Ambient loops (fireflies, spores, breathing knobs) pause when the page is hidden and rest in place under reduced motion. The product's settings offer a "Still the grove" switch that stops them for anyone, which covers WCAG 2.2.2 (Pause, Stop, Hide). The switch sets `data-motion="still"` on the `html` element, and the component library then behaves exactly as it does under reduced motion.

### Usability

- Themes respect `prefers-color-scheme` on first visit and the person's saved choice after that.
- Keyboard order follows reading order. Dialogs trap focus and return it on close.
- Touch targets are at least 44 by 44px at every growth stage.
- Disabled controls always show a reason nearby.

## 9. Editorial and verbal identity

The voice of the brand is the Sage: calm, knowledgeable and exact. It speaks in natural, elemental terms and describes textures, scents, light conditions and mineral notes precisely. The Voice in context showcase renders each moment below as working interface, written both ways.

### Tone pillars

- **Atmospheric, with restraint.** Speak with reverence and sensory precision. Name the moss, the slate, the hour. Avoid clichés such as "magic", "magical", "enchanting" and "fairytale".
- **Deliberate and measured.** The pace is slow, calm and contemplative. No exclamation points, no urgency ("hurry", "don't miss out"), no hype ("amazing", "game-changing").
- **Scholarly mysticism.** Balance poetic phrasing with exact, Latinate description: botanical nomenclature, lunar phases, extraction ratios, batch numbers.

### Copywriting comparison

| Context | Avoid (generic fantasy) | Use (Enchanted Grove) |
| --- | --- | --- |
| Welcome banner | "Step into our magical wonderland of enchanting treasures." | "Entered under twilight canopy. Formulated where deep root meets cold light." |
| Call to action | "Buy now to feel the magic!" | "Acquire the First Gathering" / "Cross the Boundary" |
| Product description | "An amazing, sweet scent that will make you feel like a woodland fairy." | "Distilled at dewfall. Damp moss, bruised nightshade petals and cold blue slate." |
| Product specs | "Made with pure organic materials and lots of love." | "Batch 004. Hand-harvested beneath full gibbous; cold-pressed within unvarnished cedar." |

### Interface verbs

Replace forceful software verbs with cultivating ones. Keep the plain verb available for accessible names and help text.

| Plain action | Visible verb | Example accessible name |
| --- | --- | --- |
| Create / Add | Cultivate, Plant, Originate | "Plant new project" |
| Delete / Remove | Prune, Clear, Return to earth | "Prune project (delete)" |
| Save | Preserve, Archive | "Preserve changes" |
| Search | Seek, Uncover | "Seek projects" |
| Edit | Tend | "Tend project details" |
| Cancel | Withdraw | "Withdraw and discard changes" |

Destructive actions always state the plain consequence in the confirmation dialog: "Return this project to earth? It will be permanently deleted."

### System copy

| Moment | Avoid | Use |
| --- | --- | --- |
| Loading | "Loading data..." | "Gathering..." / "Formulating..." |
| Empty state | "You have no projects yet." | "An empty clearing. Begin charting your first project." / "The grove is quiet. Plant your first seed to begin." |
| Error | "Error 404: Page Not Found!" | "The path is obscured. This location cannot be reached." |
| Temporary error | "Something went wrong!" | "The path is obscured by mist. Please wait a moment and try seeking again." |
| Success | "Saved!" | "Changes preserved." / "Archived successfully." |
| Onboarding | "Welcome! Let's get started!" | "Step into the clearing. Let us map your surroundings." |

### Writing rules

- Sentence case everywhere in the interface. Periods end full sentences in notices; button labels have no punctuation.
- Errors name what happened and what to do next, in that order, in two short sentences at most.
- Use "you" for the person and "we" sparingly. The product never speaks as a character.
- Numbers are exact and set in `specimen`: "12 specimens", "Batch 004", "1:16".
- Metaphor stays within the grove: roots, canopy, dew, mist, moonlight, stone. Never mix in unrelated imagery.
- Celebrations stay in the same calm voice. A firefly burst carries the whimsy, so the words stay plain: "Changes preserved." never "Woohoo!"
- When clarity and atmosphere conflict, clarity wins. A person should never have to decode an instruction.

## 10. Packaging and print layout

Physical touchpoints follow the same palette, type and Mist Rule as the software. Everything here applies to boxes, sleeves, cards, labels and printed inserts. Physical pieces always use the source colors, whatever theme a screen is in. The Packaging suite showcase shows every piece below.

### Materials

- **Stock.** Matte, tactile cotton stock, 350gsm or heavier, uncoated and subtly toothy. Pale Mist or a close cotton white for light pieces; Oxford Navy or Midnight Canopy through-dyed stock for dark pieces; Moss through-dyed stock for the verdant line, printed in Lichen and gilt.
- **Blind debossing.** Root and vine patterns pressed without ink, drawn from the `Filigree` set.
- **Foil.** Spot holographic micro-foil or satin gold, only on Amethyst or Golden Sand details. One foil per piece.
- **Vellum.** Translucent vellum wraps tinted Baby Blue Ice, printed with a single filigree drawing in Oxford Navy.
- **Ink.** Oxford Navy for text on light stock. Pale Mist (as an opaque white ink) or gilt foil for text on dark stock.

### Layout grid

- Margins are at least 10% of the shortest side on every panel.
- Divide the front panel into thirds. The product name sits in the lower third, the filigree drawing or blind deboss in the upper two thirds, and at least 40% of the panel remains bare stock.
- The name is set in `display` (Cormorant) at a size where it spans no more than 60% of the panel width.
- Supporting copy (batch, harvest note, contents) is set in `mono` at 7 to 8pt with +0.08em tracking, aligned to the same left margin as the name.
- One accent color per piece: Amethyst or Golden Sand, applied as foil or a single small field.

### Panel hierarchy

| Panel | Contents | Type |
| --- | --- | --- |
| Front | Product name, one filigree drawing or deboss, one line of marginalia | `display`, `marginalia` |
| Side | Batch code, harvest date, lunar phase | `mono` |
| Back | Sensory description, ingredients in botanical nomenclature, legal copy | `sans` for legal, `display` for the description lead |
| Inner flap | A short epigraph and a place to begin | `marginalia` |

### Legibility in print

- Body copy is at least 7pt on light stock and 8pt on dark stock (light ink on dark stock spreads).
- Legal and ingredient copy uses Mona Sans. Cormorant is never set below 12pt in print.
- Text on foil or on vellum must also be printed in a solid ink elsewhere on the pack.
- Contrast targets for print copy match the screen rules: 7:1 for body copy, measured on the flat ink color.

### Unboxing sequence

1. Vellum wrap: the first veil, printed with one drawing.
2. Outer box: bare cotton stock, blind debossed roots, the name in the lower third.
3. Inner card: a single line of marginalia and the batch number.
4. Product: minimal label in Oxford Navy with a Golden Sand foil detail.

## 11. Token reference

Every token, every value, every theme. Names are CSS custom properties: `--name`. Themed values switch with `data-theme`; fixed values are the same everywhere.

### 11.1 Color

| Token | Dusk (default) | Grove (night blue) | Mist (light) | Fern (verdant dark) | Usage |
| --- | --- | --- | --- | --- | --- |
| `amethyst` | `#a846a0` (fixed) | same | same | same | Source hue Amethyst. Imagery, foil and print details, large decorative fields, sparkles. Never used for text or as a text ground in the interface; use `seal` and `amethyst-text` there. |
| `cornflower-blue` | `#6f9ceb` (fixed) | same | same | same | Source hue Cornflower Blue. Illustration fills, chart series on the Grove and Dusk grounds, packaging panels. As text only on `canopy` in Grove, at 24px and above. |
| `oxford-navy` | `#102f5d` (fixed) | same | same | same | Source hue Oxford Navy. Filigree ink on Pale Mist stock, the raised surface in Grove, and body text in Mist. |
| `golden-sand` | `#cacf85` (fixed) | same | same | same | Source hue Golden Sand. Bioluminescent highlight, focus halo and caution tone on dark grounds. Never text on Pale Mist. |
| `baby-blue-ice` | `#98b9f2` (fixed) | same | same | same | Source hue Baby Blue Ice. Soft illustration fills, vellum tints, chart series. As text only on the Grove and Dusk page grounds. |
| `pale-mist` | `#ecf1fb` (fixed) | same | same | same | Added hue Pale Mist. Used everywhere white would be: the Mist theme page ground, text on dark grounds, paper stock, negative space. Pure #ffffff is not part of the system. |
| `midnight-canopy` | `#0b1d3a` (fixed) | same | same | same | Deep hue derived from Oxford Navy. The Grove page ground. |
| `plum-dusk` | `#2a1030` (fixed) | same | same | same | Deep hue derived from Amethyst. The Dusk page ground. |
| `wax-amethyst` | `#74306f` (fixed) | same | same | same | Deepened Amethyst for filled controls. Holds 7.7:1 with Pale Mist labels. |
| `orchid-lumen` | `#e8b4e2` (fixed) | same | same | same | Lightened Amethyst for text and glows on dark grounds. |
| `moss` | `#3e6b48` (fixed) | same | same | same | Added green. Deep moss: packaging stock option, illustration fields, leaf particles, the Fern theme's accents in print. Never text. |
| `fern-green` | `#6fa877` (fixed) | same | same | same | Added green. Mid fern: illustration, leaf particles, sprout drawings, packaging panels. Never text. |
| `lichen` | `#b7ddb0` (fixed) | same | same | same | Added green. Pale lichen: filigree ink on dark and moss stock, leaf particles, soft illustration fills. |
| `glowworm` | `#9bf0c4` (fixed) | same | same | same | Added green. Bioluminescent mint: firefly and pollen glow, the green sparkle. Decorative light only. |
| `forest-floor` | `#0c2620` (fixed) | same | same | same | Deep green derived from Moss. The Fern theme page ground. |
| `gilt` | `#b8ae6a` (fixed) | same | same | same | Metallic muted gold for hairline filigree on dark grounds and satin gold foil in print. Decorative lines only; never text. |
| `fuchsia` | `#ff5fbc` (fixed) | same | same | same | Added flare hue. Dusk's vivid accent: gems, flare tags, hover blooms, the seal in Dusk, sparks. As text only through `flare-text`. |
| `aurora` | `#5fe0e6` (fixed) | same | same | same | Added flare hue. Grove's vivid accent: gems, flare tags and hover light on the night blue theme. |
| `marigold` | `#ffbe4d` (fixed) | same | same | same | Added flare hue. Fern's vivid accent: gems, flare tags and warm light against the forest floor. |
| `rosehip` | `#c2187f` (fixed) | same | same | same | Added flare hue. Mist's vivid accent: gems and flare fills on the light theme. |
| `gold-leaf` | `#d4b062` (fixed) | same | same | same | Added metallic. The gilded gold of swirl ornaments, crests and frames at print and screen scale. Decorative only. |
| `canopy` | `#1c0823` | `#071530` | `#cbd7ee` | `#061a14` | Page ground. Dusk: Nightshade (#1c0823). Grove: Deep Canopy. Mist: Deep Mist, so Pale Mist tiles stand out. Fern: Forest Floor. Must cover at least 40% of any layout (the Mist Rule). |
| `canopy-raised` | `#4b1f5e` | `#18396f` | `#f5f8fe` | `#184838` | Tiles, cards, panels, menus, dialogs, toasts. Set clearly lighter than `canopy` (at least 1.35:1 between them in every theme) so tiles lift off the page. Always carries `inset-frost`. In Mist it is Pale Mist itself. |
| `canopy-sunken` | `#110416` | `#040c1e` | `#bfcce6` | `#03100c` | Fields, wells, code blocks and the track of a progress bar. Sits one stratum below `canopy` and always carries `inset-well`. |
| `frost` | `#5c2a72` | `#21457f` | `#e1e8f6` | `#1d5040` | Fill of the secondary (frost) button and of chips a person can select. Carries `inset-frost`. |
| `frost-hover` | `#69337f` | `#2a5190` | `#d5dff2` | `#1f5444` | The frost fill under pointer hover. |
| `sill` | `#c194c4` | `#7fa0da` | `#4a6499` | `#86c79f` | The 2px lower edge that `inset-well` paints inside every field, and the knob track of switches. Holds at least 3:1 against `canopy`, `canopy-raised`, `canopy-sunken` and `frost` in every theme, so fields stay identifiable without outlines. |
| `vein` | `#6a3580` | `#2a4f8a` | `#b3c3e2` | `#2a5c4a` | Decorative hairlines: filigree dividers, table row rules, chart gridlines. Below 3:1 on purpose; never the only way to find a control. |
| `ink` | `#f6eff8` | `#eef3fc` | `#0e2a55` | `#eef6f0` | Primary text and headings on `canopy`, `canopy-raised`, `canopy-sunken` and `frost`. At least 8.9:1 in every theme. |
| `ink-muted` | `#e0cce6` | `#bcd0f2` | `#1f355c` | `#c8e0cf` | Secondary text, metadata, helper text and placeholders on all canopy grounds. At least 7.2:1 in every theme. |
| `ink-link` | `#c5d6f7` | `#bcd3f9` | `#153670` | `#c6e8cf` | Links and quiet buttons on all canopy grounds, always underlined. At least 7.6:1 in every theme. |
| `amethyst-text` | `#f3b8ea` | `#efbde9` | `#5c2257` | `#f5cbef` | Amethyst as text: emphasised labels, selected tab text, active navigation on the three canopy grounds and on `amethyst-soft`. At least 7.2:1. |
| `seal` | `#ff6fc6` | `#74306f` | `#74306f` | `#74306f` | The wax seal: fill of the primary button, the on state of switches and the selected tab mark. Fuchsia in Dusk, Wax Amethyst elsewhere. One seal button per view. |
| `seal-hover` | `#ff8ad1` | `#6c2a67` | `#6a2b65` | `#6c2a67` | The seal fill under pointer hover, paired with the `glow-seal` shadow. |
| `on-seal` | `#1c0823` | `#ecf1fb` | `#f5f8fe` | `#ecf1fb` | Text and icons on a `seal` or `seal-hover` fill. At least 7.2:1. |
| `amethyst-soft` | `#3a1440` | `#3b1b4a` | `#f5e4f4` | `#3d1f45` | Soft amethyst ground for featured tags and the selected navigation row, behind `amethyst-text`. |
| `lumen` | `#d6db8f` | `#cfd48b` | `#3a360a` | `#e0e59e` | Bioluminescence: the focus halo, hover glows, the progress trail, the switch knob when on, and caution text on all canopy grounds. |
| `trail` | `#cacf85` | `#cacf85` | `#1f4f94` | `#cacf85` | The glowing progress trail and its leading spark. Holds at least 3:1 against `canopy-sunken` in every theme. |
| `lantern` | `#2a0a30` | `#f1f4c8` | `#f5f8fe` | `#f1f4c8` | The switch knob when on, glowing inside the `seal` track. Holds at least 3:1 against `seal`. |
| `on-lumen` | `#1c0823` | `#071530` | `#f5f8fe` | `#061a14` | Text on a solid `lumen` fill (rare: a highlighted count or selection chip). |
| `flare` | `#ff5fbc` | `#5fe0e6` | `#9c1166` | `#ffbe4d` | The theme's vivid accent: fuchsia in Dusk, aurora in Grove, rosehip in Mist, marigold in Fern. Gems in ornaments, the flare tag fill, rarity glows, highlight bars. A fill and a light, never body text. |
| `flare-text` | `#ffb3df` | `#86eef2` | `#720a49` | `#ffd994` | The flare as text: highlighted names, rarity labels, the flare tag. On the canopy grounds and on `flare-soft`. At least 7:1. |
| `flare-soft` | `#4a103f` | `#0d3b4c` | `#f9e2ef` | `#3f3312` | Soft ground behind `flare-text` or `ink`: flare tags, highlighted rows, quest rewards. |
| `on-flare` | `#0d0210` | `#071530` | `#f5f8fe` | `#061a14` | Text and icons on a solid `flare` fill. |
| `gold-deep` | `#7a5a22` | `#7a5a22` | `#5e4410` | `#7a5a22` | Shadow end of the gilded gradient used by swirl ornaments, crests and frames. |
| `gold` | `#d4b062` | `#d4b062` | `#8f6b1e` | `#d4b062` | Body of the gilded gradient. Ornaments only; never text. |
| `gold-bright` | `#f7e6ad` | `#f7e6ad` | `#c39a3e` | `#f7e6ad` | Highlight end of the gilded gradient: the gleam on every swirl. |
| `dew` | `#b3dcf4` | `#a6d8f3` | `#0e3b5e` | `#bfe3f7` | Success and saved states ("Changes preserved"). Blue, so it never relies on a red and green pairing. Text on the canopy grounds and on `dew-soft`. |
| `dew-soft` | `#2a2a52` | `#0e3350` | `#d6e9f6` | `#123e4a` | Ground of a success notice or toast, behind `dew` or `ink` text. |
| `thorn` | `#f6bf98` | `#f7c6a3` | `#61261b` | `#facfb2` | Errors and blocked paths ("The path is obscured"). Copper, never alarm red. Text on the canopy grounds and on `thorn-soft`. |
| `thorn-soft` | `#45192f` | `#3a2226` | `#f5e6df` | `#3c2a22` | Ground of an error notice, behind `thorn` or `ink` text. |
| `pollen-soft` | `#3e2c2a` | `#2c3320` | `#e9e8cc` | `#2e3a1e` | Ground of a caution notice, behind `lumen` or `ink` text. |
| `spark-1` | `#f1f4c8` | `#f1f4c8` | `#8f8420` | `#f1f4c8` | Firefly sparkle core, golden. Decorative particles in success bursts and wandering fireflies; never carries meaning alone. |
| `spark-2` | `#bfe3f7` | `#bfe3f7` | `#2f6fb8` | `#bfe3f7` | Dew sparkle, blue. Second particle color in success bursts. |
| `spark-3` | `#ff8fd6` | `#f2c9ee` | `#a846a0` | `#f2c9ee` | Orchid sparkle. Third particle color in success bursts and the seal button's press. |
| `moss-text` | `#bfe4b8` | `#b1dca8` | `#1b3d27` | `#c9ecc6` | Green as text: growth figures, in-season labels, the moss tag. On the canopy grounds and on `moss-soft`. At least 7:1. |
| `moss-soft` | `#24382b` | `#16352e` | `#dcefdc` | `#1f4d3c` | Soft green ground for the moss tag, growth chips and the in-season row, behind `moss-text` or `ink`. |
| `spark-4` | `#9bf0c4` | `#9bf0c4` | `#2f8a5e` | `#c8ffe0` | Glowworm sparkle, green. Fireflies, pollen trails, the sprout's glow and a fourth burst color. |
| `leaf-1` | `#8fd39b` | `#6fa877` | `#3e6b48` | `#9be0a8` | Falling leaf color one (fern). Decorative particles when something is pruned. |
| `leaf-2` | `#b7ddb0` | `#b7ddb0` | `#6fa877` | `#c3e8c0` | Falling leaf color two (lichen). |
| `leaf-3` | `#cacf85` | `#cacf85` | `#9a9a4e` | `#d4d98c` | Falling leaf color three (dry gold). |
| `data-1` | `#98b9f2` | `#98b9f2` | `#1f4588` | `#98b9f2` | Chart series one (Baby Blue Ice on dark, deep cornflower on Mist). |
| `data-2` | `#cacf85` | `#cacf85` | `#4f4b14` | `#cacf85` | Chart series two (Golden Sand). |
| `data-3` | `#e3a9dc` | `#e8b4e2` | `#74306f` | `#e8b4e2` | Chart series three (Amethyst). |
| `data-4` | `#f2b38a` | `#f2b38a` | `#7a3326` | `#f2b38a` | Chart series four (copper). Use only when four series are unavoidable. |
| `data-5` | `#8fd39b` | `#7fc98d` | `#275a34` | `#9be0a8` | Chart series five (fern green). For growth measures, or when five series are unavoidable. |
| `data-grid` | `{vein}` | `{vein}` | `{vein}` | `{vein}` | Chart gridlines and axes at hairline weight. An alias of `vein`. |

### 11.2 Shadows and glows

No outlines and no hard drop shadows. Surfaces are carved with inset shadows (frost for raised glass, well for fields, seal for the wax button). Light comes from soft outer glows. Floating layers get one directional twilight bleed. Compose them: box-shadow: var(--inset-frost), var(--glow-lumen).

**`inset-frost`**: Frosted glass: cards, panels, frost buttons, toasts, menus. A soft highlight along the top inner edge and a shade pooling at the bottom.

| Theme | Value |
| --- | --- |
| Dusk (default) | `inset 0 1px 2px #f6eff83d, inset 0 -12px 24px -10px #0a0210b3` |
| Grove (night blue) | `inset 0 1px 2px #eef3fc38, inset 0 -12px 24px -10px #020815b3` |
| Mist (light) | `inset 0 2px 3px #f5f8fef2, inset 0 -12px 24px -10px #0e2a552e` |
| Fern (verdant dark) | `inset 0 1px 2px #eef6f038, inset 0 -12px 24px -10px #020d0ab3` |

**`inset-well`**: Fields and wells: a shadow pooling under the top edge and a 2px `sill` along the bottom inner edge. The sill carries the 3:1 boundary that keeps fields findable.

| Theme | Value |
| --- | --- |
| Dusk (default) | `inset 0 4px 10px #060108cc, inset 0 -2px 0 #c194c4` |
| Grove (night blue) | `inset 0 4px 10px #020815cc, inset 0 -2px 0 #7fa0da` |
| Mist (light) | `inset 0 4px 10px #0e2a5533, inset 0 -2px 0 #4a6499` |
| Fern (verdant dark) | `inset 0 4px 10px #010806cc, inset 0 -2px 0 #86c79f` |

**`inset-well-focus`**: A field while it holds focus: the sill turns `lumen` and lights the inside of the well from below.

| Theme | Value |
| --- | --- |
| Dusk (default) | `inset 0 4px 10px #060108cc, inset 0 -2px 0 #d6db8f, inset 0 -10px 16px -10px #d6db8f66` |
| Grove (night blue) | `inset 0 4px 10px #020815cc, inset 0 -2px 0 #cfd48b, inset 0 -10px 16px -10px #cfd48b66` |
| Mist (light) | `inset 0 4px 10px #0e2a5533, inset 0 -2px 0 #3a360a, inset 0 -10px 16px -10px #3a360a40` |
| Fern (verdant dark) | `inset 0 4px 10px #010806cc, inset 0 -2px 0 #e0e59e, inset 0 -10px 16px -10px #e0e59e66` |

**`inset-well-error`**: A field with an error: a copper sill and a faint copper warmth inside the well. Always paired with the obscured icon and error text.

| Theme | Value |
| --- | --- |
| Dusk (default) | `inset 0 4px 10px #060108cc, inset 0 -2px 0 #f6bf98, inset 0 0 18px #f6bf9826` |
| Grove (night blue) | `inset 0 4px 10px #020815cc, inset 0 -2px 0 #f7c6a3, inset 0 0 18px #f7c6a326` |
| Mist (light) | `inset 0 4px 10px #0e2a5533, inset 0 -2px 0 #61261b, inset 0 0 18px #61261b14` |
| Fern (verdant dark) | `inset 0 4px 10px #010806cc, inset 0 -2px 0 #facfb2, inset 0 0 18px #facfb226` |

**`inset-seal`**: The wax seal button: a pressed-wax highlight on the upper lip and a deep pool below.

| Theme | Value |
| --- | --- |
| Dusk (default) | `inset 0 1px 2px #ffd6efcc, inset 0 -8px 14px -6px #9e1f6e8c` |
| Grove (night blue) | `inset 0 1px 2px #e8b4e266, inset 0 -8px 14px -6px #1e0a23b3` |
| Mist (light) | `inset 0 1px 2px #e8b4e259, inset 0 -8px 14px -6px #2a0a2699` |
| Fern (verdant dark) | `inset 0 1px 2px #e8b4e266, inset 0 -8px 14px -6px #1e0a23b3` |

**`inset-press`**: Any pressed control: light leaves and the surface sinks.

| Theme | Value |
| --- | --- |
| Dusk (default) | `inset 0 4px 12px #0d0310cc` |
| Grove (night blue) | `inset 0 4px 12px #020815cc` |
| Mist (light) | `inset 0 4px 12px #102f5d4d` |
| Fern (verdant dark) | `inset 0 4px 12px #020d0acc` |

**`glow-lumen`**: Hover bloom on cards, frost buttons and fields: bioluminescent moss lighting under the pointer. Add it after the surface's inset shadow.

| Theme | Value |
| --- | --- |
| Dusk (default) | `0 0 4px #ff4fb366, 0 0 28px #ff4fb347` |
| Grove (night blue) | `0 0 4px #5fe0e659, 0 0 28px #5fe0e638` |
| Mist (light) | `0 0 4px #6f9ceb59, 0 0 28px #6f9ceb38` |
| Fern (verdant dark) | `0 0 4px #ffbe4d59, 0 0 28px #ffbe4d38` |

**`glow-seal`**: Hover bloom on the seal button and the on state of switches.

| Theme | Value |
| --- | --- |
| Dusk (default) | `0 0 8px #ff6fc699, 0 0 36px #ff4fb380` |
| Grove (night blue) | `0 0 6px #e8b4e266, 0 0 32px #a846a066` |
| Mist (light) | `0 0 6px #a846a040, 0 0 32px #a846a040` |
| Fern (verdant dark) | `0 0 6px #e8b4e266, 0 0 32px #a846a066` |

**`glow-dew`**: The halo around a success toast or notice while its sparkle burst plays.

| Theme | Value |
| --- | --- |
| Dusk (default) | `0 0 6px #a9d8f266, 0 0 32px #a9d8f240` |
| Grove (night blue) | `0 0 6px #9fd3f066, 0 0 32px #9fd3f040` |
| Mist (light) | `0 0 6px #2f6fb840, 0 0 32px #2f6fb833` |
| Fern (verdant dark) | `0 0 6px #a9d8f266, 0 0 32px #a9d8f240` |

**`glow-moss`**: A green glowworm bloom: hover on moss tags and growth chips, the sprout's halo, the pollen trail. In Fern it also lights ordinary hovers.

| Theme | Value |
| --- | --- |
| Dusk (default) | `0 0 6px #9bf0c466, 0 0 30px #9bf0c440` |
| Grove (night blue) | `0 0 6px #9bf0c466, 0 0 30px #9bf0c440` |
| Mist (light) | `0 0 6px #2f8a5e40, 0 0 30px #2f8a5e33` |
| Fern (verdant dark) | `0 0 6px #c8ffe066, 0 0 30px #9bf0c44d` |

**`glow-flare`**: The flare bloom: gems, rarity cards, flare tags and featured tiles on hover. Stronger and warmer than glow-lumen.

| Theme | Value |
| --- | --- |
| Dusk (default) | `0 0 6px #ff4fb399, 0 0 34px #ff4fb366` |
| Grove (night blue) | `0 0 6px #5fe0e699, 0 0 34px #5fe0e659` |
| Mist (light) | `0 0 6px #c2187f59, 0 0 30px #c2187f40` |
| Fern (verdant dark) | `0 0 6px #ffbe4d99, 0 0 34px #ffbe4d59` |

**`gilt-gleam`**: The soft halo around gilded ornaments (applied as a drop-shadow filter).

| Theme | Value |
| --- | --- |
| Dusk (default) | `0 0 10px #f7e6ad59` |
| Grove (night blue) | `0 0 10px #f7e6ad59` |
| Mist (light) | `0 0 8px #c39a3e40` |
| Fern (verdant dark) | `0 0 10px #f7e6ad59` |

**`bleed-twilight`**: Directional twilight bleed under floating strata: menus, dialogs, toasts. Light falls from the upper left.

| Theme | Value |
| --- | --- |
| Dusk (default) | `0 18px 48px -10px #060108d9` |
| Grove (night blue) | `0 18px 48px -10px #020815d9` |
| Mist (light) | `0 18px 40px -10px #102f5d33` |
| Fern (verdant dark) | `0 18px 48px -10px #020d0abf` |

**`focus-ring`**: The firefly halo: keyboard focus on every interactive element via :focus-visible. A 2px ring of ground color, 2px of solid `lumen` and a soft glow. The only solid ring in the system, shown only for keyboard focus. At least 7.4:1 on every canopy ground.

| Theme | Value |
| --- | --- |
| Dusk (default) | `0 0 0 2px #1c0823, 0 0 0 4px #d6db8f, 0 0 18px 4px #d6db8f59` |
| Grove (night blue) | `0 0 0 2px #071530, 0 0 0 4px #cfd48b, 0 0 18px 4px #cfd48b59` |
| Mist (light) | `0 0 0 2px #cbd7ee, 0 0 0 4px #3a360a, 0 0 18px 4px #3a360a33` |
| Fern (verdant dark) | `0 0 0 2px #061a14, 0 0 0 4px #e0e59e, 0 0 18px 4px #e0e59e59` |

### 11.3 Typography

| Family token | CSS stack |
| --- | --- |
| `--font-display` | `"Cormorant", "Cormorant Garamond", Georgia, serif` |
| `--font-sans` | `"Mona Sans", "Helvetica Neue", Arial, sans-serif` |
| `--font-mono` | `"DM Mono", ui-monospace, Menlo, monospace` |

| Font file | Family | Weight | Style |
| --- | --- | --- | --- |
| `fonts/Cormorant-Variable.woff2` | Cormorant | 300 700 | normal |
| `fonts/Cormorant-Italic-Variable.woff2` | Cormorant | 300 700 | italic |
| `fonts/MonaSans-Variable.woff2` | Mona Sans | 200 900 | normal |
| `fonts/MonaSans-Italic-Variable.woff2` | Mona Sans | 200 900 | italic |
| `fonts/DMMono-Regular.woff2` | DM Mono | 400 | normal |
| `fonts/DMMono-Medium.woff2` | DM Mono | 500 | normal |

| Style (class) | Family | Size | Line height | Weight | Letter spacing | Sample | Usage |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `.folio` | display | 64px | 64px | 500 | -0.01em | Formulated where deep root meets cold light | Welcome screens, packaging fronts, one per view. 44px on phones. |
| `.title` | display | 44px | 48px | 500 | 0 | The First Gathering | Page titles. 34px on phones. |
| `.heading` | display | 30px | 36px | 600 | 0 | Batch 004 notes | Section headings. 26px on phones. |
| `.subheading` | display | 22px | 28px | 600 | 0 | Harvested beneath full gibbous | Card titles and dialog titles. |
| `.marginalia` | display italic | 20px | 28px | 500 | 0 | Distilled at dewfall | Pull quotes, epigraphs and empty state lines. Never for instructions. |
| `.body-lg` | sans | 18px | 28px | 400 | 0 | Damp moss, bruised nightshade petals and cold blue slate. | Lead paragraphs and onboarding. |
| `.body` | sans | 16px | 26px | 400 | 0 | Choose a location to begin charting your first project. | Default interface and reading text. |
| `.label` | sans | 14px | 20px | 550 | 0.01em | Preserve changes | Buttons, field labels, tabs. |
| `.caption` | sans | 13px | 20px | 400 | 0 | Last archived 14 minutes ago | Helper text and metadata. Smallest size for sentences. |
| `.specimen` | mono | 13px | 20px | 400 | 0.02em | BATCH 004 · 1:16 · 12.4 °C | Data values, IDs, timestamps, tabular figures. |
| `.overline` | mono | 12px | 16px | 500 | 0.12em | SPECIMEN LOG | Uppercase eyebrow above a heading. Never longer than three words. |

### 11.4 Spacing

4px base. Generous steps keep the Mist Rule easy to honor.

| Token | Value | Usage |
| --- | --- | --- |
| `space-1` | `4px` | Icon to label. |
| `space-2` | `8px` | Inside tags and between stacked labels and fields. |
| `space-3` | `12px` | Vertical padding inside buttons and fields. |
| `space-4` | `16px` | Horizontal padding inside controls; page margin on phones. |
| `space-6` | `24px` | Card padding; page margin on tablets; grid gutter. |
| `space-8` | `32px` | Between groups inside a section. |
| `space-12` | `48px` | Between sections; page margin on small desktops. |
| `space-20` | `80px` | Page margins on wide desktops; the fog above a folio heading. |

### 11.5 Radius

Soft natural tension between 4px and 8px. No pills, no square corners.

| Token | Value | Usage |
| --- | --- | --- |
| `radius-sm` | `4px` | Tags, checkboxes, tooltips. |
| `radius-md` | `6px` | Buttons and fields. |
| `radius-lg` | `8px` | Cards, dialogs, menus, toasts and image frames. |

### 11.6 Stroke

Line weights.

| Token | Value | Usage |
| --- | --- | --- |
| `stroke-filigree` | `0.5px` | Decorative line art at print scale and above 2x density. |
| `stroke-hairline` | `0.75px` | Decorative line art on screen; filigree dividers in `vein`. |
| `stroke-icon` | `1.25px` | Interface icons at 20 and 24px. |
| `stroke-sill` | `2px` | The inner lower edge of fields and the selected tab mark. |

### 11.7 Blur

Gaussian bleeds for twilight light and frosted glass.

| Token | Value | Usage |
| --- | --- | --- |
| `blur-mist` | `24px` | backdrop-filter behind frosted panels, headers and dialogs. |
| `blur-twilight` | `48px` | Large ambient light pools behind hero imagery. |

### 11.8 Stratum (z-index)

Z-index depth mapping by atmospheric perspective: deeper strata sit lower, darker and cooler; nearer strata sit higher and catch more light.

| Token | Value | Usage |
| --- | --- | --- |
| `stratum-root` | `0` | Page ground, grain overlay, wandering fireflies and ambient imagery. |
| `stratum-understory` | `10` | Cards and content panels. |
| `stratum-canopy` | `20` | Sticky headers and side navigation. |
| `stratum-mist` | `30` | Scrims and frosted overlays behind dialogs. |
| `stratum-bloom` | `40` | Dialogs, menus and popovers. |
| `stratum-firefly` | `50` | Toasts, tooltips and sparkle bursts. |

### 11.9 Opacity

Grain and veils.

| Token | Value | Usage |
| --- | --- | --- |
| `opacity-grain` | `0.025` | SVG noise overlay on every canopy ground (2 to 3%). |
| `opacity-scrim` | `0.72` | The canopy-colored scrim behind a dialog. |
| `opacity-disabled` | `0.48` | Disabled controls, always paired with a text reason nearby. |

### 11.10 Duration

Named for the grove. Calm by default; whimsy lives in the long, soft tails.

| Token | Value | Usage |
| --- | --- | --- |
| `duration-flicker` | `120ms` | Press feedback and the start of a dew ripple. |
| `duration-drift` | `240ms` | Hover blooms, color changes, tab marks. |
| `duration-bloom` | `420ms` | Entrances (rise through mist), toasts, dialogs. |
| `duration-unfurl` | `640ms` | Expanding panels, accordions, the fern unfurl. |
| `duration-firefly` | `1100ms` | One sparkle burst from start to last fade. |
| `duration-tide` | `2400ms` | Looping ambient motion: spores on the loading trail, a lantern breathing. |
| `duration-wander` | `9000ms` | One loop of a wandering firefly in empty states and onboarding. |

### 11.11 Easing

Three curves. Only sparkles and unfurls may overshoot.

| Token | Value | Usage |
| --- | --- | --- |
| `ease-mist` | `cubic-bezier(0.2, 0.7, 0.2, 1)` | Default for entrances, blooms and color. |
| `ease-unfurl` | `cubic-bezier(0.34, 1.4, 0.64, 1)` | A gentle overshoot for sparkles, switch knobs and unfurling panels. |
| `ease-tide` | `cubic-bezier(0.45, 0, 0.55, 1)` | Looping ambient motion that breathes in and out. |

### 11.12 Breakpoint

Four growth stages, mobile first. Each value is the minimum width where the stage begins.

| Token | Value | Usage |
| --- | --- | --- |
| `bp-seedling` | `0px` | Phones. 4 columns, 16px margins, bottom tab bar, one card per row, folio at 44px. |
| `bp-sapling` | `600px` | Tablets and narrow windows. 8 columns, 24px margins, navigation rail, two cards per row. |
| `bp-grove` | `960px` | Laptops. 12 columns, 48px margins, full sidebar, three cards per row. |
| `bp-canopy` | `1280px` | Wide desktops. 12 columns inside a 1200px column, 80px margins, a detail panel may open beside the list. |

### 11.13 Silhouette (card cuts)

Card and tile cuts. Each value is the size of the cut; the component classes eg-cut-* apply them. Soft (8px radius) stays the default.

| Token | Value | Usage |
| --- | --- | --- |
| `cut-notch` | `14px` | Chamfered corners cut at 45 degrees: quest cards, item tiles, dialog headers. |
| `cut-scoop` | `16px` | Concave quarter-circle corners, like a carved tablet: featured cards, rewards, specimen plates. |
| `cut-arch` | `140px` | A rounded arch across the top, like a portal or chapel window: character and companion cards, onboarding. |
| `cut-ticket` | `10px` | Half-circle bites on the left and right edges: tickets, passes, quest scrolls, batch labels. |
| `cut-banner` | `18px` | A pennant point at the bottom: achievements, ranks, chapter markers. |
| `cut-gem` | `22%` | A cut-gem octagon: small icon tiles, inventory slots, currency. |

### 11.14 Ornament (gilded motifs)

Gilded swirl ornaments. Sizes for the corner flourishes, crests and frames drawn by the eg-ornate classes.

| Token | Value | Usage |
| --- | --- | --- |
| `ornament-corner` | `56px` | Size of each gilded corner flourish on cards and panels. 40px on tiles and on phones. |
| `ornament-inset` | `6px` | Distance from the card edge to the ornament layer. |
| `ornament-crest` | `132px` | Width of the gilded crest with its gem at the top center of a card. |
| `ornament-frame` | `1px` | Weight of the fading inner frame that links the corners on gilded cards. |

## 12. Components

React 18 components on `window.Grove`. Classes are prefixed `eg-`. Include `tokens.css`, the component stylesheet, React, ReactDOM and the library, in that order.

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="grove.css">
<script src="react.production.min.js"></script>
<script src="react-dom.production.min.js"></script>
<script src="grove.js"></script>
<script>
  const { Button } = window.Grove;
  ReactDOM.createRoot(root).render(React.createElement(Button, { tone: "seal", effect: "sparkle" }, "Preserve changes"));
</script>
```

### 12.1 Button

Three tones for every action, carved with inset shadows and never outlined: `seal` for the single primary action, `frost` for secondary actions and `quiet` for tertiary ones.

**Consumer provides:** `tone` (`seal`, `frost`, `quiet`; default `frost`; `outline` is accepted as an older name for `frost`), children as the visible label, an optional leading `icon` or trailing `iconAfter` (`cultivate`, `seek`, `prune`, `preserve`, `preserved`, `obscured`, `caution`, `moon`, `close`, `arrow`, `sparkle`, `leaf`), `effect` to add a whimsical press effect (`sparkle` for a firefly burst, `sprout` for a growing seedling, `leaves` for falling leaves; the older `sparkle` boolean still works), `ornate` to add small gilded flourishes at both ends (for the action that begins or completes a quest), and any native button attributes (`onClick`, `disabled`, `type`, `aria-label`).

- One `seal` per view. It is the wax seal: fuchsia in Dusk, Wax Amethyst in the other themes, with `inset-seal` for a pressed-wax lip.
- `frost` is pressable glass: `frost` fill with `inset-frost`. Its text label is what identifies it, so it needs no boundary (WCAG 1.4.11).
- Hover blooms (`glow-seal`, `glow-lumen`). Pressing sinks the surface (`inset-press`) and spreads a dew ripple from the press point. Keyboard focus shows the firefly halo (`focus-ring`).
- Match the effect to the verb: `sparkle` for Preserve and Cross the boundary, `sprout` for Plant and Cultivate, `leaves` for Prune and Return to earth. Never add an effect to navigation or cancel.
- The seal also carries a dew sheen: a soft highlight slides across it once on hover.
- Labels use cultivating verbs ("Preserve changes", "Plant project", "Prune"). The accessible name must contain the visible words; icon-only buttons pass a plain `aria-label` ("Search projects").
- Minimum height 44px. Disabled buttons show a reason in nearby text.

### 12.2 Card

A frosted glass card on `canopy-raised`, carved by `inset-frost` and rounded with `radius-lg`. No outline, no outer shadow at rest.

**Consumer provides:** `title`, optional `overline` (three words at most), children as the body, optional `meta` (set in `specimen`), `onClick` or `href` to make the whole card interactive, `cta` for the visible action text on interactive cards ("Open log"), `silhouette` (`soft`, `notch`, `scoop`, `arch`, `ticket`, `banner`; default `soft`), `ornament` (`none`, `corners`, `gilded`; default `none`), `band` (`flare`, `gold`, `moss`, `amethyst`, `dew`) for a rarity glow across the top, and `gem` to set a small flare gem in the upper corner.

- Interactive cards bloom with `glow-lumen`, lift 2px, and wake a single firefly twinkle in the upper right corner on hover and keyboard focus.
- Always give an interactive card a `cta`: the underlined words and arrow tell every reader the card can be opened.
- One idea per card. Never nest a card in a card. Leave at least `space-6` between cards so the Mist Rule holds.
- Ornament levels: `none` for dense lists and data, `corners` (gilded swirl corners) for most cards, `gilded` (corners, a crest holding the flare gem, a fading inner frame and a divider) for one or two featured cards per view.
- Silhouettes: `notch` for quests and items, `scoop` for rewards and specimen plates, `arch` for companions and onboarding, `ticket` for passes and batches, `banner` for ranks and achievements. Cut silhouettes (all but `soft` and `arch`) render inside a wrapper that carries the hover glow, because the cut clips ordinary shadows.
- The same ornaments work on any element: add `eg-ornate` (corners), `eg-ornate-sm` (smaller corners) and `eg-ornate-gilded` (the full set), plus `eg-cut-*` for a silhouette.

### 12.3 Field

A labeled text input or textarea sunk into `canopy-sunken` by `inset-well`, with optional hint and error text wired to `aria-describedby`.

**Consumer provides:** `label` (required), optional `hint`, optional `error` text, `multiline` for a textarea, and any native input attributes (`value`, `onChange`, `placeholder`, `required`).

- The well carries a 2px sill along its base (the `sill` token, at least 3:1 in every theme). This sill is what makes the field findable without an outline.
- On focus the sill turns `lumen`, light rises inside the well (`inset-well-focus`) and the firefly halo appears around it.
- On error the sill turns copper, the well warms faintly (`inset-well-error`), the field sways once (wilt) and the error text rises in with the obscured icon. State what happened and how to fix it: "Batch codes use three digits, for example 004."
- Labels always sit above the field. Placeholders are examples and never replace the label.

### 12.4 Checkbox

The bud: a native checkbox dressed as a small sunken well. Checking it fills the well with wax amethyst, draws the mark, and opens a tiny five-petal bloom of orchid and glowworm petals.

**Consumer provides:** `label` (required), optional `hint`, `checked` and `onChange(next)` for controlled use or `defaultChecked`, `bloom={false}` to hold back the petals, and `disabled`.

- A native `input type="checkbox"` sits underneath, so keyboard, forms and screen readers work as usual.
- Checked state carries three cues: the seal fill, the check mark and the native checked state. The petals are decoration only and skip under reduced motion.
- Hover glows with `glow-moss`; keyboard focus shows the firefly halo.

### 12.5 Switch

The lantern: an on/off switch whose knob glides with a slight overshoot and glows while on.

**Consumer provides:** `label` (required), `checked` and `onChange(next)` for controlled use or `defaultChecked` for uncontrolled use, optional `onText` and `offText` (default On and Off), `stateText={false}` to hide the state word, and `disabled`.

- Renders a `button` with `role="switch"` and `aria-checked`. The visible label is linked to it.
- Off: a sunken well track with a muted knob on the left. On: a seal track with the `lantern` knob on the right, breathing softly (`duration-tide`).
- The knob's position carries the state; the glow and the On/Off word reinforce it. The knob holds at least 3:1 against the track.

### 12.6 Tabs

A tab list whose selected mark glides between tabs with a gentle overshoot, and whose panel rises through mist when it changes.

**Consumer provides:** `items` (an array of `{ id, label, count?, content? }`), `label` (the tab list's accessible name), `value` and `onChange(id)` for controlled use or `defaultValue`.

- Full keyboard support: Left and Right move between tabs, Home and End jump to the ends. Only the selected tab is in the tab order.
- Selection shows three cues: `amethyst-text` label color, the 2px `seal` mark beneath, and `aria-selected`.
- On phones the tab list scrolls sideways and never wraps.

### 12.7 Tag

A small uppercase label on a soft tinted fill for status, categories and lunar phases. No outlines.

**Consumer provides:** `tone` (`neutral`, `amethyst`, `flare`, `moss`, `lumen`, `dew`, `thorn`; default `neutral`), an optional `icon`, and one or two words as children.

- Every tone pairs a soft fill with its own text token at 7:1 or more.
- Tags are static labels. For filters use a frost button with `aria-pressed`.
- `dew` and `thorn` tags always carry a status word, and ideally an icon; color never works alone.
- `moss` marks growth and seasonality: In season, Growing, Thriving.
- `flare` marks rare and featured things in the theme's vivid accent: fuchsia, aurora, rosehip or marigold.

### 12.8 Notice

An inline message for success, errors and cautions: a soft tinted panel carved with `inset-frost`, an icon, a title and a body. It rises through mist when it appears.

**Consumer provides:** `tone` (`preserved`, `obscured`, `caution`), `title`, children as the body, optional `action` element, `urgent` to announce an `obscured` notice as an alert, and `celebrate` to release a small firefly burst from the icon when a `preserved` notice appears.

- Success is blue (`dew`), errors are copper (`thorn`) and cautions are gold (`lumen`). Each carries its own icon, so no status depends on color alone.
- Write calmly: "Changes preserved.", "The path is obscured. This location cannot be reached." No exclamation points and no alarm red.
- Notices use `role="status"` by default. Use `urgent` only when the person must act.

### 12.9 Toast

A floating confirmation on the firefly stratum. It rises through mist, and a success toast releases a firefly burst from its icon.

**Consumer provides:** `tone` (`preserved`, `obscured`, `caution`), `title`, children as a short body, `onClose` to show the dismiss button (`aria-label="Dismiss notification"`), and `celebrate={false}` to hold back the burst. The consumer positions the toast (usually bottom right, 24px from the edges) and removes it after about five seconds.

- Surfaces: `canopy-raised` with `inset-frost`, `bleed-twilight`, and a `glow-dew` halo for success.
- Success toasts announce through `role="status"`; obscured toasts through `role="alert"`.
- Sparkle only for successes that follow a direct action. Background syncs never sparkle.

### 12.10 EmptyState

Frames an empty view as a peaceful clearing: wandering fireflies, an optional filigree drawing, a line of marginalia and one action.

**Consumer provides:** `title` (default "An empty clearing."), children as one or two sentences, optional `art` (a Filigree asset URL, rendered decorative), optional `action` (usually a seal Button with `sparkle`), and `fireflies` (a count up to 8, or `false`).

- Title in italic Cormorant; body in `ink-muted`.
- Examples: "The grove is quiet. Plant your first seed to begin." / "An empty clearing. Begin charting your first project."
- Use at most 3 fireflies on phones and none behind forms.

### 12.11 Gathering

The loading indicator: a glowing `trail` on a sunken track, labeled "Gathering" or "Formulating", with breathing dots.

**Consumer provides:** `label` (visible word), `a11yLabel` (plain accessible name such as "Loading projects"), optional `value` from 0 to 100 for determinate progress, optional `detail` in `specimen`, `doneLabel` (default "Formulated") and `celebrate={false}` to hold back the burst at completion.

- Without `value`, spores drift along the track and a short trail wanders across it.
- With `value`, a bright spark leads the trail. When it reaches 100 the label becomes "Formulated" in `dew` and a small firefly burst releases from the spark.
- Renders `role="progressbar"` with values when determinate. Set `aria-busy="true"` on the region being filled.

### 12.12 MoonPhase

A small loader for waits under two seconds: a glowing moon whose shadow sweeps across it, waxing and waning, beside one word.

**Consumer provides:** optional `size` in px (default 40), `label` (default "Waxing"; `false` hides it) and `a11yLabel` (plain name, default "Loading").

- Renders `role="status"` with the plain accessible name. The visible word is decorative.
- For longer or measurable waits use Gathering.
- Under reduced motion the moon rests at a half phase.

### 12.13 Sparkle

Wraps any element and releases a firefly burst from its center whenever `trigger` changes. The same burst is available imperatively as `Grove.burst(element, { count, spread })`.

**Consumer provides:** children, a `trigger` value that changes when the burst should play, `onMount` to also burst on first render, and optional `count` (default 16) and `spread` in px (default 76; 48 on phones).

- Particles are a mix of four-point stars and dots in `spark-1` (gold), `spark-2` (dew blue), `spark-3` (orchid) and `spark-4` (glowworm green), drifting slightly upward as they fade over about a second.
- Sibling helpers: `Grove.leafFall(element)` sheds leaves from an element, `Grove.sprout(element)` grows a seedling above it, and `Grove.mothFlight()` sends one moth across the screen (use it when someone switches to a night theme).
- The burst layer is `aria-hidden` and sits on `stratum-firefly`. Always pair it with words that say what happened.
- Under reduced motion the burst becomes a single soft glow in place.
- One burst per moment. Never chain bursts or play them on a timer in the product.

### 12.14 Fireflies

A decorative layer of softly blinking fireflies that wander slow loops. Place it as the first child of a positioned container.

**Consumer provides:** `count` (up to 8; default 7) and an optional `className`. The parent must be `position: relative`, and its other children should sit above it (`position: relative`).

- Fireflies alternate glowworm green with the gold, dew and orchid spark colors and loop over `duration-wander` (9s) with a `duration-tide` blink.
- Use in empty states, onboarding, hero areas and packaging scenes. Never behind forms or dense text.
- The layer is `aria-hidden`. Under reduced motion the fireflies rest in place.

### 12.15 Pollen

A container that sheds glowing pollen from the pointer as it moves: glowworm green and gold specks that float up and fade.

**Consumer provides:** children, plus `className` and `style` for the container. The container clips its pollen.

- Use for hero areas, onboarding and packaging scenes. Never behind forms, tables or long text.
- At most 24 specks exist at once, spawned no faster than one every 36ms.
- Under reduced motion no pollen appears.

### 12.16 Tile

An inventory slot for specimens, ingredients, tools and rewards: a notched tile with small gilded corners, a cut-gem icon well, a name, a kind, gold rank pips and a flare count.

**Consumer provides:** `label` (required), `icon`, optional `sub` (kind), `pips` (0 to 5), `count`, `rank` (`common`, `flare`, `gold`, `moss`, `amethyst`; default `common`), `silhouette` (default `notch`; `gem` and `scoop` also suit), `ornament={false}` to drop the corners, `onClick` to make it a button, and `a11yLabel` for a fuller name.

- The rank lights a band across the top and tints the icon; `flare` uses the theme's flare color.
- Rank pips render as an image labeled "4 of 5". The count sits on `flare-soft` in `flare-text`.
- Interactive tiles glow with the flare on hover and focus through their wrapper, since the cut silhouette clips ordinary shadows.
- Set tiles in a wrapping row with `space-4` between them.

### 12.17 Effect helpers

- `Grove.burst(element, { count, spread })`: a firefly burst from the element's center.
- `Grove.sprout(element)`: a seedling grows above the element.
- `Grove.leafFall(element, { count })`: leaves drift down from the element.
- `Grove.mothFlight({ size, duration })`: one moth crosses the screen.
- `Grove.ripple(pointerEvent)`: a dew ripple inside the pressed control.

All helpers do nothing (or show a still glow) under reduced motion or `data-motion="still"`.

## Appendix A. tokens.css

All four themes, all tokens, the type classes and the font faces. Font paths assume a `fonts/` folder beside the stylesheet.

```css
/* Enchanted Grove tokens v3. Themes: dusk, grove, mist, fern. Set <html data-theme="dusk|grove|mist|fern">; dusk is the default. */
@font-face { font-family: 'Cormorant'; src: url('fonts/Cormorant-Variable.woff2') format('woff2'); font-weight: 300 700; font-style: normal; font-display: swap; }
@font-face { font-family: 'Cormorant'; src: url('fonts/Cormorant-Italic-Variable.woff2') format('woff2'); font-weight: 300 700; font-style: italic; font-display: swap; }
@font-face { font-family: 'Mona Sans'; src: url('fonts/MonaSans-Variable.woff2') format('woff2'); font-weight: 200 900; font-style: normal; font-display: swap; }
@font-face { font-family: 'Mona Sans'; src: url('fonts/MonaSans-Italic-Variable.woff2') format('woff2'); font-weight: 200 900; font-style: italic; font-display: swap; }
@font-face { font-family: 'DM Mono'; src: url('fonts/DMMono-Regular.woff2') format('woff2'); font-weight: 400; font-style: normal; font-display: swap; }
@font-face { font-family: 'DM Mono'; src: url('fonts/DMMono-Medium.woff2') format('woff2'); font-weight: 500; font-style: normal; font-display: swap; }
:root, [data-theme="dusk"] {
  --amethyst: #a846a0;
  --cornflower-blue: #6f9ceb;
  --oxford-navy: #102f5d;
  --golden-sand: #cacf85;
  --baby-blue-ice: #98b9f2;
  --pale-mist: #ecf1fb;
  --midnight-canopy: #0b1d3a;
  --plum-dusk: #2a1030;
  --wax-amethyst: #74306f;
  --orchid-lumen: #e8b4e2;
  --moss: #3e6b48;
  --fern-green: #6fa877;
  --lichen: #b7ddb0;
  --glowworm: #9bf0c4;
  --forest-floor: #0c2620;
  --gilt: #b8ae6a;
  --fuchsia: #ff5fbc;
  --aurora: #5fe0e6;
  --marigold: #ffbe4d;
  --rosehip: #c2187f;
  --gold-leaf: #d4b062;
  --canopy: #1c0823;
  --canopy-raised: #4b1f5e;
  --canopy-sunken: #110416;
  --frost: #5c2a72;
  --frost-hover: #69337f;
  --sill: #c194c4;
  --vein: #6a3580;
  --ink: #f6eff8;
  --ink-muted: #e0cce6;
  --ink-link: #c5d6f7;
  --amethyst-text: #f3b8ea;
  --seal: #ff6fc6;
  --seal-hover: #ff8ad1;
  --on-seal: #1c0823;
  --amethyst-soft: #3a1440;
  --lumen: #d6db8f;
  --trail: #cacf85;
  --lantern: #2a0a30;
  --on-lumen: #1c0823;
  --flare: #ff5fbc;
  --flare-text: #ffb3df;
  --flare-soft: #4a103f;
  --on-flare: #0d0210;
  --gold-deep: #7a5a22;
  --gold: #d4b062;
  --gold-bright: #f7e6ad;
  --dew: #b3dcf4;
  --dew-soft: #2a2a52;
  --thorn: #f6bf98;
  --thorn-soft: #45192f;
  --pollen-soft: #3e2c2a;
  --spark-1: #f1f4c8;
  --spark-2: #bfe3f7;
  --spark-3: #ff8fd6;
  --moss-text: #bfe4b8;
  --moss-soft: #24382b;
  --spark-4: #9bf0c4;
  --leaf-1: #8fd39b;
  --leaf-2: #b7ddb0;
  --leaf-3: #cacf85;
  --data-1: #98b9f2;
  --data-2: #cacf85;
  --data-3: #e3a9dc;
  --data-4: #f2b38a;
  --data-5: #8fd39b;
  --data-grid: var(--vein);
  --inset-frost: inset 0 1px 2px #f6eff83d, inset 0 -12px 24px -10px #0a0210b3;
  --inset-well: inset 0 4px 10px #060108cc, inset 0 -2px 0 #c194c4;
  --inset-well-focus: inset 0 4px 10px #060108cc, inset 0 -2px 0 #d6db8f, inset 0 -10px 16px -10px #d6db8f66;
  --inset-well-error: inset 0 4px 10px #060108cc, inset 0 -2px 0 #f6bf98, inset 0 0 18px #f6bf9826;
  --inset-seal: inset 0 1px 2px #ffd6efcc, inset 0 -8px 14px -6px #9e1f6e8c;
  --inset-press: inset 0 4px 12px #0d0310cc;
  --glow-lumen: 0 0 4px #ff4fb366, 0 0 28px #ff4fb347;
  --glow-seal: 0 0 8px #ff6fc699, 0 0 36px #ff4fb380;
  --glow-dew: 0 0 6px #a9d8f266, 0 0 32px #a9d8f240;
  --glow-moss: 0 0 6px #9bf0c466, 0 0 30px #9bf0c440;
  --glow-flare: 0 0 6px #ff4fb399, 0 0 34px #ff4fb366;
  --gilt-gleam: 0 0 10px #f7e6ad59;
  --bleed-twilight: 0 18px 48px -10px #060108d9;
  --focus-ring: 0 0 0 2px #1c0823, 0 0 0 4px #d6db8f, 0 0 18px 4px #d6db8f59;
}
[data-theme="grove"] {
  --canopy: #071530;
  --canopy-raised: #18396f;
  --canopy-sunken: #040c1e;
  --frost: #21457f;
  --frost-hover: #2a5190;
  --sill: #7fa0da;
  --vein: #2a4f8a;
  --ink: #eef3fc;
  --ink-muted: #bcd0f2;
  --ink-link: #bcd3f9;
  --amethyst-text: #efbde9;
  --seal: #74306f;
  --seal-hover: #6c2a67;
  --on-seal: #ecf1fb;
  --amethyst-soft: #3b1b4a;
  --lumen: #cfd48b;
  --trail: #cacf85;
  --lantern: #f1f4c8;
  --on-lumen: #071530;
  --flare: #5fe0e6;
  --flare-text: #86eef2;
  --flare-soft: #0d3b4c;
  --on-flare: #071530;
  --gold-deep: #7a5a22;
  --gold: #d4b062;
  --gold-bright: #f7e6ad;
  --dew: #a6d8f3;
  --dew-soft: #0e3350;
  --thorn: #f7c6a3;
  --thorn-soft: #3a2226;
  --pollen-soft: #2c3320;
  --spark-1: #f1f4c8;
  --spark-2: #bfe3f7;
  --spark-3: #f2c9ee;
  --moss-text: #b1dca8;
  --moss-soft: #16352e;
  --spark-4: #9bf0c4;
  --leaf-1: #6fa877;
  --leaf-2: #b7ddb0;
  --leaf-3: #cacf85;
  --data-1: #98b9f2;
  --data-2: #cacf85;
  --data-3: #e8b4e2;
  --data-4: #f2b38a;
  --data-5: #7fc98d;
  --data-grid: var(--vein);
  --inset-frost: inset 0 1px 2px #eef3fc38, inset 0 -12px 24px -10px #020815b3;
  --inset-well: inset 0 4px 10px #020815cc, inset 0 -2px 0 #7fa0da;
  --inset-well-focus: inset 0 4px 10px #020815cc, inset 0 -2px 0 #cfd48b, inset 0 -10px 16px -10px #cfd48b66;
  --inset-well-error: inset 0 4px 10px #020815cc, inset 0 -2px 0 #f7c6a3, inset 0 0 18px #f7c6a326;
  --inset-seal: inset 0 1px 2px #e8b4e266, inset 0 -8px 14px -6px #1e0a23b3;
  --inset-press: inset 0 4px 12px #020815cc;
  --glow-lumen: 0 0 4px #5fe0e659, 0 0 28px #5fe0e638;
  --glow-seal: 0 0 6px #e8b4e266, 0 0 32px #a846a066;
  --glow-dew: 0 0 6px #9fd3f066, 0 0 32px #9fd3f040;
  --glow-moss: 0 0 6px #9bf0c466, 0 0 30px #9bf0c440;
  --glow-flare: 0 0 6px #5fe0e699, 0 0 34px #5fe0e659;
  --gilt-gleam: 0 0 10px #f7e6ad59;
  --bleed-twilight: 0 18px 48px -10px #020815d9;
  --focus-ring: 0 0 0 2px #071530, 0 0 0 4px #cfd48b, 0 0 18px 4px #cfd48b59;
}
[data-theme="mist"] {
  --canopy: #cbd7ee;
  --canopy-raised: #f5f8fe;
  --canopy-sunken: #bfcce6;
  --frost: #e1e8f6;
  --frost-hover: #d5dff2;
  --sill: #4a6499;
  --vein: #b3c3e2;
  --ink: #0e2a55;
  --ink-muted: #1f355c;
  --ink-link: #153670;
  --amethyst-text: #5c2257;
  --seal: #74306f;
  --seal-hover: #6a2b65;
  --on-seal: #f5f8fe;
  --amethyst-soft: #f5e4f4;
  --lumen: #3a360a;
  --trail: #1f4f94;
  --lantern: #f5f8fe;
  --on-lumen: #f5f8fe;
  --flare: #9c1166;
  --flare-text: #720a49;
  --flare-soft: #f9e2ef;
  --on-flare: #f5f8fe;
  --gold-deep: #5e4410;
  --gold: #8f6b1e;
  --gold-bright: #c39a3e;
  --dew: #0e3b5e;
  --dew-soft: #d6e9f6;
  --thorn: #61261b;
  --thorn-soft: #f5e6df;
  --pollen-soft: #e9e8cc;
  --spark-1: #8f8420;
  --spark-2: #2f6fb8;
  --spark-3: #a846a0;
  --moss-text: #1b3d27;
  --moss-soft: #dcefdc;
  --spark-4: #2f8a5e;
  --leaf-1: #3e6b48;
  --leaf-2: #6fa877;
  --leaf-3: #9a9a4e;
  --data-1: #1f4588;
  --data-2: #4f4b14;
  --data-3: #74306f;
  --data-4: #7a3326;
  --data-5: #275a34;
  --data-grid: var(--vein);
  --inset-frost: inset 0 2px 3px #f5f8fef2, inset 0 -12px 24px -10px #0e2a552e;
  --inset-well: inset 0 4px 10px #0e2a5533, inset 0 -2px 0 #4a6499;
  --inset-well-focus: inset 0 4px 10px #0e2a5533, inset 0 -2px 0 #3a360a, inset 0 -10px 16px -10px #3a360a40;
  --inset-well-error: inset 0 4px 10px #0e2a5533, inset 0 -2px 0 #61261b, inset 0 0 18px #61261b14;
  --inset-seal: inset 0 1px 2px #e8b4e259, inset 0 -8px 14px -6px #2a0a2699;
  --inset-press: inset 0 4px 12px #102f5d4d;
  --glow-lumen: 0 0 4px #6f9ceb59, 0 0 28px #6f9ceb38;
  --glow-seal: 0 0 6px #a846a040, 0 0 32px #a846a040;
  --glow-dew: 0 0 6px #2f6fb840, 0 0 32px #2f6fb833;
  --glow-moss: 0 0 6px #2f8a5e40, 0 0 30px #2f8a5e33;
  --glow-flare: 0 0 6px #c2187f59, 0 0 30px #c2187f40;
  --gilt-gleam: 0 0 8px #c39a3e40;
  --bleed-twilight: 0 18px 40px -10px #102f5d33;
  --focus-ring: 0 0 0 2px #cbd7ee, 0 0 0 4px #3a360a, 0 0 18px 4px #3a360a33;
}
[data-theme="fern"] {
  --canopy: #061a14;
  --canopy-raised: #184838;
  --canopy-sunken: #03100c;
  --frost: #1d5040;
  --frost-hover: #1f5444;
  --sill: #86c79f;
  --vein: #2a5c4a;
  --ink: #eef6f0;
  --ink-muted: #c8e0cf;
  --ink-link: #c6e8cf;
  --amethyst-text: #f5cbef;
  --seal: #74306f;
  --seal-hover: #6c2a67;
  --on-seal: #ecf1fb;
  --amethyst-soft: #3d1f45;
  --lumen: #e0e59e;
  --trail: #cacf85;
  --lantern: #f1f4c8;
  --on-lumen: #061a14;
  --flare: #ffbe4d;
  --flare-text: #ffd994;
  --flare-soft: #3f3312;
  --on-flare: #061a14;
  --gold-deep: #7a5a22;
  --gold: #d4b062;
  --gold-bright: #f7e6ad;
  --dew: #bfe3f7;
  --dew-soft: #123e4a;
  --thorn: #facfb2;
  --thorn-soft: #3c2a22;
  --pollen-soft: #2e3a1e;
  --spark-1: #f1f4c8;
  --spark-2: #bfe3f7;
  --spark-3: #f2c9ee;
  --moss-text: #c9ecc6;
  --moss-soft: #1f4d3c;
  --spark-4: #c8ffe0;
  --leaf-1: #9be0a8;
  --leaf-2: #c3e8c0;
  --leaf-3: #d4d98c;
  --data-1: #98b9f2;
  --data-2: #cacf85;
  --data-3: #e8b4e2;
  --data-4: #f2b38a;
  --data-5: #9be0a8;
  --data-grid: var(--vein);
  --inset-frost: inset 0 1px 2px #eef6f038, inset 0 -12px 24px -10px #020d0ab3;
  --inset-well: inset 0 4px 10px #010806cc, inset 0 -2px 0 #86c79f;
  --inset-well-focus: inset 0 4px 10px #010806cc, inset 0 -2px 0 #e0e59e, inset 0 -10px 16px -10px #e0e59e66;
  --inset-well-error: inset 0 4px 10px #010806cc, inset 0 -2px 0 #facfb2, inset 0 0 18px #facfb226;
  --inset-seal: inset 0 1px 2px #e8b4e266, inset 0 -8px 14px -6px #1e0a23b3;
  --inset-press: inset 0 4px 12px #020d0acc;
  --glow-lumen: 0 0 4px #ffbe4d59, 0 0 28px #ffbe4d38;
  --glow-seal: 0 0 6px #e8b4e266, 0 0 32px #a846a066;
  --glow-dew: 0 0 6px #a9d8f266, 0 0 32px #a9d8f240;
  --glow-moss: 0 0 6px #c8ffe066, 0 0 30px #9bf0c44d;
  --glow-flare: 0 0 6px #ffbe4d99, 0 0 34px #ffbe4d59;
  --gilt-gleam: 0 0 10px #f7e6ad59;
  --bleed-twilight: 0 18px 48px -10px #020d0abf;
  --focus-ring: 0 0 0 2px #061a14, 0 0 0 4px #e0e59e, 0 0 18px 4px #e0e59e59;
}
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-20: 80px;
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --stroke-filigree: 0.5px;
  --stroke-hairline: 0.75px;
  --stroke-icon: 1.25px;
  --stroke-sill: 2px;
  --blur-mist: 24px;
  --blur-twilight: 48px;
  --stratum-root: 0;
  --stratum-understory: 10;
  --stratum-canopy: 20;
  --stratum-mist: 30;
  --stratum-bloom: 40;
  --stratum-firefly: 50;
  --opacity-grain: 0.025;
  --opacity-scrim: 0.72;
  --opacity-disabled: 0.48;
  --duration-flicker: 120ms;
  --duration-drift: 240ms;
  --duration-bloom: 420ms;
  --duration-unfurl: 640ms;
  --duration-firefly: 1100ms;
  --duration-tide: 2400ms;
  --duration-wander: 9000ms;
  --ease-mist: cubic-bezier(0.2, 0.7, 0.2, 1);
  --ease-unfurl: cubic-bezier(0.34, 1.4, 0.64, 1);
  --ease-tide: cubic-bezier(0.45, 0, 0.55, 1);
  --bp-seedling: 0px;
  --bp-sapling: 600px;
  --bp-grove: 960px;
  --bp-canopy: 1280px;
  --cut-notch: 14px;
  --cut-scoop: 16px;
  --cut-arch: 140px;
  --cut-ticket: 10px;
  --cut-banner: 18px;
  --cut-gem: 22%;
  --ornament-corner: 56px;
  --ornament-inset: 6px;
  --ornament-crest: 132px;
  --ornament-frame: 1px;
  --font-display: "Cormorant", "Cormorant Garamond", Georgia, serif;
  --font-sans: "Mona Sans", "Helvetica Neue", Arial, sans-serif;
  --font-mono: "DM Mono", ui-monospace, Menlo, monospace;
}
.folio { font-family: var(--font-display); font-size: 64px; line-height: 64px; font-weight: 500; letter-spacing: -0.01em; }
.title { font-family: var(--font-display); font-size: 44px; line-height: 48px; font-weight: 500; }
.heading { font-family: var(--font-display); font-size: 30px; line-height: 36px; font-weight: 600; }
.subheading { font-family: var(--font-display); font-size: 22px; line-height: 28px; font-weight: 600; }
.marginalia { font-family: var(--font-display); font-size: 20px; line-height: 28px; font-weight: 500; font-style: italic; }
.body-lg { font-family: var(--font-sans); font-size: 18px; line-height: 28px; font-weight: 400; }
.body { font-family: var(--font-sans); font-size: 16px; line-height: 26px; font-weight: 400; }
.label { font-family: var(--font-sans); font-size: 14px; line-height: 20px; font-weight: 550; letter-spacing: 0.01em; }
.caption { font-family: var(--font-sans); font-size: 13px; line-height: 20px; font-weight: 400; }
.specimen { font-family: var(--font-mono); font-size: 13px; line-height: 20px; font-weight: 400; letter-spacing: 0.02em; }
.overline { font-family: var(--font-mono); font-size: 12px; line-height: 16px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; }
```

## Appendix B. Component stylesheet (grove.css)

```css
/* Enchanted Grove components. Requires tokens.css. All classes prefixed eg-.
   Surfaces are carved with inset shadows; there are no outlines. The only solid ring is the keyboard focus halo. */
body { margin: 0; font-family: var(--font-sans); font-size: 16px; line-height: 26px; background: var(--canopy); color: var(--ink); -webkit-font-smoothing: antialiased; }
body::before { content: ""; position: fixed; inset: 0; pointer-events: none; z-index: var(--stratum-root); opacity: var(--opacity-grain); background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>"); }
.eg-stage { position: relative; display: flex; flex-wrap: wrap; align-items: flex-start; gap: var(--space-4); padding: var(--space-6); }
.eg-stage-col { flex-direction: column; align-items: stretch; max-width: 520px; }
.eg-icon { flex: none; display: block; }
:where(.eg-btn, .eg-card-interactive, .eg-switch-track, .eg-tab, .eg-toast-close, .eg-tabs-panel):focus-visible { outline: 2px solid transparent; outline-offset: 2px; box-shadow: var(--focus-ring); }

/* ---------- Keyframes ---------- */
@keyframes eg-rise { from { opacity: 0; transform: translateY(8px); filter: blur(4px); } to { opacity: 1; transform: none; filter: none; } }
@keyframes eg-wander { 0%, 100% { transform: translate(0, 0); } 25% { transform: translate(var(--wx1), var(--wy1)); } 50% { transform: translate(var(--wx2), var(--wy2)); } 75% { transform: translate(var(--wx3), var(--wy3)); } 90% { transform: translate(var(--wx4), var(--wy4)); } }
@keyframes eg-blink { 0%, 100% { opacity: 0.15; } 40%, 60% { opacity: 1; } }
@keyframes eg-breathe { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
@keyframes eg-drift { 0% { transform: translateX(-100%); } 100% { transform: translateX(320%); } }
@keyframes eg-spore { 0% { left: -4%; opacity: 0; transform: translateY(0); } 15% { opacity: 1; } 50% { transform: translateY(-5px); } 85% { opacity: 1; } 100% { left: 102%; opacity: 0; transform: translateY(0); } }
@keyframes eg-wilt { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-0.8deg) translateY(1px); } 55% { transform: rotate(0.5deg); } 80% { transform: rotate(-0.2deg); } }
@keyframes eg-twinkle { 0% { opacity: 0; transform: scale(0) rotate(0deg); } 60% { opacity: 1; transform: scale(1.15) rotate(70deg); } 100% { opacity: 1; transform: scale(1) rotate(90deg); } }
@keyframes eg-dot { 0%, 100% { opacity: 0.25; } 50% { opacity: 1; } }

/* ---------- Sparkles (burst particles, wandering fireflies) ---------- */
.eg-burst { position: absolute; width: 0; height: 0; pointer-events: none; z-index: var(--stratum-firefly); }
.eg-burst-core { position: absolute; left: 0; top: 0; width: 72px; height: 72px; border-radius: 50%; background: radial-gradient(circle, var(--spark-1) 0%, transparent 65%); opacity: 0; transform: translate(-50%, -50%); }
.eg-spark { position: absolute; left: 0; top: 0; display: block; transform: translate(-50%, -50%) scale(0); }
.eg-spark-c1 { --c: var(--spark-1); }
.eg-spark-c2 { --c: var(--spark-2); }
.eg-spark-c3 { --c: var(--spark-3); }
.eg-spark-c4 { --c: var(--spark-4); }
.eg-spark-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--c); box-shadow: 0 0 9px 3px var(--c); }
.eg-spark-star { width: 22px; height: 22px; background: radial-gradient(ellipse 2px 11px at center, var(--c) 0 55%, transparent 100%), radial-gradient(ellipse 11px 2px at center, var(--c) 0 55%, transparent 100%); filter: drop-shadow(0 0 4px var(--c)); }
.eg-sparkle { display: inline-block; }
.eg-fireflies { position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 0; }
.eg-firefly { position: absolute; width: 4px; height: 4px; border-radius: 50%; background: var(--c); box-shadow: 0 0 8px 3px var(--c); animation: eg-wander var(--duration-wander) var(--ease-tide) infinite, eg-blink var(--duration-tide) var(--ease-tide) infinite; }

/* ---------- Dew ripple (press) ---------- */
.eg-ripple { position: absolute; border-radius: 50%; pointer-events: none; background: radial-gradient(circle, var(--pale-mist) 0%, transparent 60%); transform: scale(0); }

/* ---------- Button ---------- */
.eg-btn { position: relative; overflow: hidden; isolation: isolate; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); min-height: 44px; padding: 0 var(--space-6); border: 0; border-radius: var(--radius-md); font-family: var(--font-sans); font-size: 14px; line-height: 20px; font-weight: 550; letter-spacing: 0.01em; cursor: pointer; transition: box-shadow var(--duration-drift) var(--ease-mist), background-color var(--duration-drift) var(--ease-mist), transform var(--duration-flicker) var(--ease-mist); }
.eg-btn-label { position: relative; }
.eg-btn-seal { background: var(--seal); color: var(--on-seal); box-shadow: var(--inset-seal); }
.eg-btn-seal:hover { background: var(--seal-hover); box-shadow: var(--inset-seal), var(--glow-seal); }
.eg-btn-frost { background: var(--frost); color: var(--ink); box-shadow: var(--inset-frost); }
.eg-btn-frost:hover { background: var(--frost-hover); box-shadow: var(--inset-frost), var(--glow-lumen); }
.eg-btn-quiet { background: transparent; color: var(--ink-link); padding: 0 var(--space-3); text-decoration: underline; text-underline-offset: 4px; text-decoration-thickness: 1px; }
.eg-btn-quiet:hover { text-decoration-thickness: 2px; text-shadow: 0 0 12px var(--lumen); }
.eg-btn:active:not(:disabled) { box-shadow: var(--inset-press); transform: translateY(1px); }
.eg-btn-seal:focus-visible { box-shadow: var(--inset-seal), var(--focus-ring); }
.eg-btn-frost:focus-visible { box-shadow: var(--inset-frost), var(--focus-ring); }
.eg-btn:disabled { opacity: var(--opacity-disabled); cursor: not-allowed; }

/* ---------- Card ---------- */
.eg-card { position: relative; display: flex; flex-direction: column; box-sizing: border-box; width: 100%; max-width: 360px; padding: var(--space-6); background: var(--canopy-raised); border: 0; border-radius: var(--radius-lg); box-shadow: var(--inset-frost); color: var(--ink); text-align: left; font: inherit; text-decoration: none; z-index: var(--stratum-understory); }
.eg-card-interactive { cursor: pointer; transition: box-shadow var(--duration-drift) var(--ease-mist), transform var(--duration-drift) var(--ease-mist); }
.eg-card-interactive:hover { box-shadow: var(--inset-frost), var(--glow-lumen); transform: translateY(-2px); }
.eg-card-interactive:focus-visible { box-shadow: var(--inset-frost), var(--focus-ring); }
.eg-card-twinkle { position: absolute; top: 14px; right: 14px; width: 14px; height: 14px; opacity: 0; transform: scale(0); background: radial-gradient(ellipse 1.4px 7px at center, var(--lumen) 0 55%, transparent 100%), radial-gradient(ellipse 7px 1.4px at center, var(--lumen) 0 55%, transparent 100%); filter: drop-shadow(0 0 3px var(--lumen)); }
.eg-card-interactive:hover .eg-card-twinkle, .eg-card-interactive:focus-visible .eg-card-twinkle { animation: eg-twinkle var(--duration-bloom) var(--ease-unfurl) forwards; }
.eg-card-overline { display: block; margin: 0 0 var(--space-2); font-family: var(--font-mono); font-size: 12px; line-height: 16px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-muted); }
.eg-card-title { display: block; margin: 0 0 var(--space-2); font-family: var(--font-display); font-size: 22px; line-height: 28px; font-weight: 600; color: var(--ink); }
.eg-card-body { display: block; color: var(--ink-muted); }
.eg-card-meta { display: block; margin: var(--space-4) 0 0; font-family: var(--font-mono); font-size: 13px; line-height: 20px; letter-spacing: 0.02em; color: var(--ink-muted); }
.eg-card-cta { display: inline-flex; align-items: center; gap: var(--space-1); margin-top: var(--space-4); font-size: 14px; line-height: 20px; font-weight: 550; color: var(--ink-link); text-decoration: underline; text-underline-offset: 4px; }
.eg-card-interactive:hover .eg-card-cta .eg-icon { transform: translateX(3px); transition: transform var(--duration-drift) var(--ease-unfurl); }

/* ---------- Field ---------- */
.eg-field { display: flex; flex-direction: column; gap: var(--space-2); max-width: 420px; }
.eg-field-label { font-size: 14px; line-height: 20px; font-weight: 550; color: var(--ink); }
.eg-field-hint { display: block; margin: 0; font-size: 13px; line-height: 20px; color: var(--ink-muted); }
.eg-field-input { box-sizing: border-box; min-height: 48px; padding: var(--space-3) var(--space-4); background: var(--canopy-sunken); color: var(--ink); border: 0; border-radius: var(--radius-md) var(--radius-md) var(--radius-sm) var(--radius-sm); box-shadow: var(--inset-well); font: inherit; transition: box-shadow var(--duration-drift) var(--ease-mist); }
.eg-field-input::placeholder { color: var(--ink-muted); }
.eg-field-input:hover { box-shadow: var(--inset-well), var(--glow-lumen); }
.eg-field-input:focus { outline: 2px solid transparent; box-shadow: var(--inset-well-focus), var(--focus-ring); }
.eg-field-error .eg-field-input { box-shadow: var(--inset-well-error); animation: eg-wilt var(--duration-unfurl) var(--ease-mist) 1; transform-origin: 50% 100%; }
.eg-field-error .eg-field-input:focus { box-shadow: var(--inset-well-error), var(--focus-ring); }
.eg-field-errtext { display: flex; align-items: center; gap: var(--space-2); margin: 0; font-size: 13px; line-height: 20px; color: var(--thorn); animation: eg-rise var(--duration-bloom) var(--ease-mist) both; }
textarea.eg-field-input { min-height: 112px; resize: vertical; }

/* ---------- Switch (the lantern) ---------- */
.eg-switch { display: inline-flex; align-items: center; gap: var(--space-3); }
.eg-switch-track { position: relative; flex: none; width: 52px; height: 30px; padding: 0; border: 0; border-radius: var(--radius-lg); background: var(--canopy-sunken); box-shadow: var(--inset-well); cursor: pointer; transition: background-color var(--duration-drift) var(--ease-mist), box-shadow var(--duration-drift) var(--ease-mist); }
.eg-switch-knob { position: absolute; top: 5px; left: 5px; width: 18px; height: 18px; border-radius: var(--radius-sm); background: var(--ink-muted); box-shadow: inset 0 1px 1px var(--canopy-raised); transition: transform var(--duration-bloom) var(--ease-unfurl), background-color var(--duration-drift) var(--ease-mist), box-shadow var(--duration-drift) var(--ease-mist); }
.eg-switch-on .eg-switch-track { background: var(--seal); box-shadow: var(--inset-seal), var(--glow-seal); }
.eg-switch-on .eg-switch-knob { transform: translateX(22px); background: var(--lantern); box-shadow: 0 0 10px 2px var(--spark-1); animation: eg-breathe var(--duration-tide) var(--ease-tide) infinite; }
.eg-switch-track:focus-visible { box-shadow: var(--inset-well), var(--focus-ring); }
.eg-switch-on .eg-switch-track:focus-visible { box-shadow: var(--inset-seal), var(--focus-ring); }
.eg-switch-track:disabled { opacity: var(--opacity-disabled); cursor: not-allowed; }
.eg-switch-label { display: inline-flex; align-items: baseline; gap: var(--space-2); font-size: 14px; line-height: 20px; font-weight: 550; color: var(--ink); cursor: pointer; }
.eg-switch-state { font-family: var(--font-mono); font-size: 12px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-muted); }
.eg-switch-on .eg-switch-state { color: var(--lumen); }

/* ---------- Tabs ---------- */
.eg-tabs-list { position: relative; display: flex; gap: var(--space-1); padding-bottom: 6px; overflow-x: auto; scrollbar-width: none; }
.eg-tab { flex: none; display: inline-flex; align-items: center; gap: var(--space-2); min-height: 44px; padding: 0 var(--space-4); border: 0; border-radius: var(--radius-md); background: transparent; color: var(--ink-muted); font: inherit; font-size: 14px; line-height: 20px; font-weight: 550; cursor: pointer; transition: color var(--duration-drift) var(--ease-mist), background-color var(--duration-drift) var(--ease-mist); }
.eg-tab:hover { color: var(--ink); background: var(--frost); }
.eg-tab[aria-selected="true"] { color: var(--amethyst-text); }
.eg-tab-count { font-family: var(--font-mono); font-size: 12px; color: var(--ink-muted); }
.eg-tabs-mark { position: absolute; left: 0; bottom: 2px; height: 2px; border-radius: 2px; background: var(--seal); box-shadow: 0 0 10px var(--amethyst-text); transition: transform var(--duration-bloom) var(--ease-unfurl), width var(--duration-bloom) var(--ease-unfurl); }
.eg-tabs-panel { padding: var(--space-6) 0 0; border-radius: var(--radius-md); animation: eg-rise var(--duration-bloom) var(--ease-mist) both; }

/* ---------- Tag ---------- */
.eg-tag { display: inline-flex; align-items: center; gap: var(--space-1); min-height: 24px; padding: 0 var(--space-2); border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 12px; line-height: 16px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; box-shadow: var(--inset-frost); }
.eg-tag-neutral { color: var(--ink); background: var(--frost); }
.eg-tag-amethyst { color: var(--amethyst-text); background: var(--amethyst-soft); }
.eg-tag-lumen { color: var(--lumen); background: var(--pollen-soft); }
.eg-tag-dew { color: var(--dew); background: var(--dew-soft); }
.eg-tag-thorn { color: var(--thorn); background: var(--thorn-soft); }
.eg-tag-moss { color: var(--moss-text); background: var(--moss-soft); }

/* ---------- Notice ---------- */
.eg-notice { display: flex; align-items: flex-start; gap: var(--space-3); box-sizing: border-box; max-width: 480px; padding: var(--space-4); border-radius: var(--radius-lg); color: var(--ink); box-shadow: var(--inset-frost); animation: eg-rise var(--duration-bloom) var(--ease-mist) both; }
.eg-notice-icon { flex: none; display: block; }
.eg-notice-text { flex: 1; }
.eg-notice-title { margin: 0; font-size: 14px; line-height: 20px; font-weight: 600; }
.eg-notice-body { margin: var(--space-1) 0 0; font-size: 14px; line-height: 22px; }
.eg-notice-preserved { background: var(--dew-soft); }
.eg-notice-preserved .eg-icon, .eg-notice-preserved .eg-notice-title { color: var(--dew); }
.eg-notice-obscured { background: var(--thorn-soft); }
.eg-notice-obscured .eg-icon, .eg-notice-obscured .eg-notice-title { color: var(--thorn); }
.eg-notice-caution { background: var(--pollen-soft); }
.eg-notice-caution .eg-icon, .eg-notice-caution .eg-notice-title { color: var(--lumen); }

/* ---------- Toast ---------- */
.eg-toast { position: relative; display: flex; align-items: flex-start; gap: var(--space-3); box-sizing: border-box; width: 100%; max-width: 400px; padding: var(--space-4) var(--space-4) var(--space-4) var(--space-4); border-radius: var(--radius-lg); background: var(--canopy-raised); color: var(--ink); box-shadow: var(--inset-frost), var(--bleed-twilight); z-index: var(--stratum-firefly); animation: eg-rise var(--duration-bloom) var(--ease-mist) both; }
.eg-toast-preserved { box-shadow: var(--inset-frost), var(--bleed-twilight), var(--glow-dew); }
.eg-toast-icon { flex: none; display: grid; place-items: center; width: 36px; height: 36px; border-radius: var(--radius-md); }
.eg-toast-preserved .eg-toast-icon { background: var(--dew-soft); color: var(--dew); }
.eg-toast-obscured .eg-toast-icon { background: var(--thorn-soft); color: var(--thorn); }
.eg-toast-caution .eg-toast-icon { background: var(--pollen-soft); color: var(--lumen); }
.eg-toast-text { flex: 1; padding-top: 2px; }
.eg-toast-title { margin: 0; font-size: 14px; line-height: 20px; font-weight: 600; }
.eg-toast-body { margin: 2px 0 0; font-size: 13px; line-height: 20px; color: var(--ink-muted); }
.eg-toast-close { flex: none; display: grid; place-items: center; width: 36px; height: 36px; border: 0; border-radius: var(--radius-md); background: transparent; color: var(--ink-muted); cursor: pointer; }
.eg-toast-close:hover { background: var(--frost); color: var(--ink); }

/* ---------- EmptyState ---------- */
.eg-empty { position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; gap: var(--space-3); max-width: 460px; margin: 0 auto; padding: var(--space-12) var(--space-6); }
.eg-empty > :not(.eg-fireflies) { position: relative; z-index: 1; }
.eg-empty-art { width: 96px; height: auto; opacity: 0.9; margin-bottom: var(--space-2); }
.eg-empty-title { margin: 0; font-family: var(--font-display); font-style: italic; font-size: 24px; line-height: 30px; font-weight: 500; color: var(--ink); }
.eg-empty-body { margin: 0 0 var(--space-3); color: var(--ink-muted); }

/* ---------- Gathering (loading) ---------- */
.eg-gathering { width: 100%; max-width: 360px; }
.eg-gathering-label { margin: 0 0 var(--space-2); font-size: 14px; line-height: 20px; font-weight: 550; color: var(--ink); }
.eg-gathering-dots i { font-style: normal; animation: eg-dot 1.2s var(--ease-tide) infinite; }
.eg-gathering-dots i:nth-child(2) { animation-delay: 0.2s; }
.eg-gathering-dots i:nth-child(3) { animation-delay: 0.4s; }
.eg-gathering-track { position: relative; height: 6px; border-radius: var(--radius-sm); background: var(--canopy-sunken); box-shadow: var(--inset-well); }
.eg-gathering-trail { position: relative; height: 100%; border-radius: var(--radius-sm); background: var(--trail); box-shadow: 0 0 12px var(--trail); transition: width var(--duration-bloom) var(--ease-mist); }
.eg-gathering-tip { position: absolute; right: -3px; top: 50%; width: 10px; height: 10px; border-radius: 50%; transform: translateY(-50%); background: var(--spark-1); box-shadow: 0 0 10px 4px var(--trail); }
.eg-gathering-indeterminate { width: 30%; animation: eg-drift var(--duration-tide) var(--ease-tide) infinite; }
.eg-gathering-indeterminate .eg-gathering-tip { display: none; }
.eg-gathering-clip { position: absolute; inset: 0; border-radius: inherit; }
.eg-gathering-clip-flow { overflow: hidden; }
.eg-spores { position: absolute; inset: 0; pointer-events: none; }
.eg-spores i { position: absolute; top: -1px; width: 4px; height: 4px; border-radius: 50%; background: var(--spark-1); box-shadow: 0 0 6px 2px var(--trail); animation: eg-spore var(--duration-tide) var(--ease-tide) infinite; }
.eg-spores i:nth-child(2) { animation-delay: -0.8s; top: 1px; }
.eg-spores i:nth-child(3) { animation-delay: -1.6s; }
.eg-gathering-done .eg-gathering-label { color: var(--dew); }
.eg-gathering-detail { margin: var(--space-2) 0 0; font-family: var(--font-mono); font-size: 13px; line-height: 20px; letter-spacing: 0.02em; color: var(--ink-muted); }


/* ---------- Dew sheen on the seal ---------- */
.eg-btn-seal::after { content: ""; position: absolute; top: 0; bottom: 0; left: -60%; width: 40%; pointer-events: none; background: linear-gradient(100deg, transparent, color-mix(in srgb, var(--pale-mist) 28%, transparent), transparent); transform: skewX(-18deg); opacity: 0; }
.eg-btn-seal:hover::after { animation: eg-sheen 900ms var(--ease-mist) 1; }
@keyframes eg-sheen { 0% { left: -60%; opacity: 0; } 20% { opacity: 1; } 100% { left: 130%; opacity: 0; } }

/* ---------- Leaves, sprout, moth, pollen ---------- */
.eg-leaf { position: absolute; top: 0; width: 15px; height: 15px; border-radius: 0 100% 0 100%; background: linear-gradient(135deg, transparent 46%, color-mix(in srgb, var(--canopy) 45%, transparent) 48%, transparent 52%), var(--c); box-shadow: 0 0 6px color-mix(in srgb, var(--c) 45%, transparent); opacity: 0; }
.eg-leaf-c1 { --c: var(--leaf-1); } .eg-leaf-c2 { --c: var(--leaf-2); } .eg-leaf-c3 { --c: var(--leaf-3); }
.eg-sprout { position: absolute; left: 0; top: 0; transform: translate(-50%, -100%); filter: drop-shadow(0 0 6px var(--spark-4)); }
.eg-sprout-stem { stroke: var(--leaf-1); stroke-width: 2.5; stroke-dasharray: 40; stroke-dashoffset: 40; }
.eg-sprout-leaf { fill: var(--leaf-2); stroke: var(--leaf-1); stroke-width: 1; transform: scale(0); transform-box: fill-box; }
.eg-sprout-leaf.l { transform-origin: 100% 100%; } .eg-sprout-leaf.r { transform-origin: 0% 100%; }
.eg-sprout-bud { fill: var(--spark-4); transform: scale(0); transform-box: fill-box; transform-origin: center; }
.eg-moth { position: fixed; left: 0; top: 0; z-index: var(--stratum-firefly); pointer-events: none; filter: drop-shadow(0 0 8px var(--spark-1)); }
.eg-moth svg { display: block; overflow: visible; }
.eg-moth path { fill: color-mix(in srgb, var(--lichen) 30%, transparent); stroke: var(--gilt); stroke-width: 1; }
.eg-moth .eg-moth-body { fill: var(--gilt); }
.eg-moth-wing { transform-box: view-box; transform-origin: 32px 22px; animation: eg-flap 180ms ease-in-out infinite alternate; }
@keyframes eg-flap { from { transform: scaleX(1); } to { transform: scaleX(0.35); } }
.eg-pollen-field { position: relative; overflow: hidden; }
.eg-pollen { position: absolute; width: 5px; height: 5px; border-radius: 50%; pointer-events: none; background: var(--c); box-shadow: 0 0 8px 2px var(--c); }

/* ---------- Checkbox (the bud) ---------- */
.eg-check { display: inline-flex; align-items: flex-start; gap: var(--space-3); cursor: pointer; font-size: 14px; line-height: 20px; }
.eg-check-input { position: absolute; opacity: 0; width: 1px; height: 1px; margin: 0; }
.eg-check-box { position: relative; flex: none; display: grid; place-items: center; width: 24px; height: 24px; border-radius: var(--radius-sm); background: var(--canopy-sunken); box-shadow: var(--inset-well); color: var(--on-seal); transition: background-color var(--duration-drift) var(--ease-mist), box-shadow var(--duration-drift) var(--ease-mist); }
.eg-check-box svg { position: relative; z-index: 1; }
.eg-check-mark { stroke-dasharray: 20; stroke-dashoffset: 20; transition: stroke-dashoffset var(--duration-bloom) var(--ease-mist); }
.eg-check-on .eg-check-box { background: var(--seal); box-shadow: var(--inset-seal), var(--glow-seal); }
.eg-check-on .eg-check-mark { stroke-dashoffset: 0; }
.eg-petal { position: absolute; left: 50%; top: 50%; width: 9px; height: 13px; margin: -6.5px 0 0 -4.5px; border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; background: var(--spark-3); box-shadow: 0 0 6px var(--spark-3); opacity: 0; pointer-events: none; }
.eg-petal:nth-child(2n) { background: var(--spark-4); box-shadow: 0 0 6px var(--spark-4); }
.eg-check:hover .eg-check-box { box-shadow: var(--inset-well), var(--glow-moss); }
.eg-check-on:hover .eg-check-box { box-shadow: var(--inset-seal), var(--glow-seal); }
.eg-check-input:focus-visible + .eg-check-box { box-shadow: var(--inset-well), var(--focus-ring); }
.eg-check-on .eg-check-input:focus-visible + .eg-check-box { box-shadow: var(--inset-seal), var(--focus-ring); }
.eg-check-label { display: grid; gap: 2px; font-weight: 550; color: var(--ink); padding-top: 2px; }
.eg-check-hint { font-weight: 400; font-size: 13px; color: var(--ink-muted); }
.eg-check-disabled { opacity: var(--opacity-disabled); cursor: not-allowed; }

/* ---------- MoonPhase ---------- */
.eg-moon { display: inline-flex; align-items: center; gap: var(--space-3); }
.eg-moon-disc { position: relative; display: block; border-radius: 50%; overflow: hidden; background: var(--spark-1); box-shadow: 0 0 18px color-mix(in srgb, var(--spark-1) 55%, transparent); }
.eg-moon-shade { position: absolute; inset: 0; border-radius: 50%; background: var(--canopy-sunken); animation: eg-phase var(--duration-tide) var(--ease-tide) infinite; }
@keyframes eg-phase { 0% { transform: translateX(0); } 50% { transform: translateX(100%); } 50.01% { transform: translateX(-100%); } 100% { transform: translateX(0); } }
.eg-moon-label { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-muted); }

/* ---------- Gilded ornaments (RPG quest style) ---------- */
.eg-ornate { position: relative; isolation: isolate; --orn-size: var(--ornament-corner); --orn-inset: var(--ornament-inset); }
:where(.eg-ornate) > :where(*) { position: relative; z-index: 1; }
.eg-ornate::before { content: ""; position: absolute; inset: var(--orn-inset); z-index: 0; pointer-events: none;
  background: linear-gradient(135deg, var(--gold-deep) 0%, var(--gold-bright) 28%, var(--gold) 52%, var(--gold-bright) 76%, var(--gold-deep) 100%);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='64' height='64'%3E%3Cg%3E%3Cg fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 62 L5 22 Q5 5 22 5 L62 5'/%3E%3Cpath d='M11 50 L11 26 Q11 11 26 11 L50 11'/%3E%3Cpath d='M58 5 L58.68 5.12 L59.33 5.31 L59.95 5.58 L60.53 5.91 L61.05 6.3 L61.52 6.75 L61.93 7.23 L62.27 7.76 L62.54 8.31 L62.75 8.88 L62.89 9.47 L62.95 10.06 L62.95 10.64 L62.88 11.2 L62.74 11.75 L62.55 12.27 L62.3 12.75 L62 13.2 L61.65 13.6 L61.27 13.94 L60.86 14.24 L60.42 14.48 L59.97 14.67 L59.5 14.79 L59.04 14.86 L58.57 14.88 L58.12 14.84 L57.69 14.75 L57.27 14.61 L56.89 14.42 L56.53 14.2 L56.22 13.94 L55.94 13.65 L55.71 13.34 L55.51 13.01 L55.37 12.67 L55.26 12.32 L55.2 11.97 L55.19 11.63 L55.22 11.29 L55.28 10.97 L55.38 10.67 L55.51 10.39 L55.68 10.14 L55.86 9.91 L56.07 9.72 L56.29 9.55 L56.52 9.43 L56.76 9.33 L57 9.27 L57.24 9.24 L57.47 9.24 L57.69 9.27 L57.89 9.32 L58.08 9.4 L58.25 9.5 L58.4 9.62 L58.53 9.75 L58.63 9.88 L58.71 10.03'/%3E%3Cpath d='M5 58 L5.12 58.68 L5.31 59.33 L5.58 59.95 L5.91 60.53 L6.3 61.05 L6.75 61.52 L7.23 61.93 L7.76 62.27 L8.31 62.54 L8.88 62.75 L9.47 62.89 L10.06 62.95 L10.64 62.95 L11.2 62.88 L11.75 62.74 L12.27 62.55 L12.75 62.3 L13.2 62 L13.6 61.65 L13.94 61.27 L14.24 60.86 L14.48 60.42 L14.67 59.97 L14.79 59.5 L14.86 59.04 L14.88 58.57 L14.84 58.12 L14.75 57.69 L14.61 57.27 L14.42 56.89 L14.2 56.53 L13.94 56.22 L13.65 55.94 L13.34 55.71 L13.01 55.51 L12.67 55.37 L12.32 55.26 L11.97 55.2 L11.63 55.19 L11.29 55.22 L10.97 55.28 L10.67 55.38 L10.39 55.51 L10.14 55.68 L9.91 55.86 L9.72 56.07 L9.55 56.29 L9.43 56.52 L9.33 56.76 L9.27 57 L9.24 57.24 L9.24 57.47 L9.27 57.69 L9.32 57.89 L9.4 58.08 L9.5 58.25 L9.62 58.4 L9.75 58.53 L9.88 58.63 L10.03 58.71'/%3E%3Cpath d='M11 26 C16 22 22 18 26 22 C30 26 25 32 21 29 C18 27 20 23 23 24'/%3E%3Cpath d='M26 11 C22 16 18 22 22 26'/%3E%3Cpath d='M30 11 C34 18 42 18 44 13'/%3E%3Cpath d='M11 30 C18 34 18 42 13 44'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M36 5 Q39.28 8.53 44.72 7.24 Q40.57 3.49 36 5 Z'/%3E%3Cpath d='M5 36 Q3.49 40.57 7.24 44.72 Q8.53 39.28 5 36 Z'/%3E%3Cpath d='M5 1.8 L8.2 5 L5 8.2 L1.8 5 Z'/%3E%3Cpath d='M48 5 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M5 48 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M24 21.8 L26.2 24 L24 26.2 L21.8 24 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") left top / var(--orn-size) var(--orn-size) no-repeat, url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='64' height='64'%3E%3Cg transform='translate%2864 0%29 scale%28-1 1%29'%3E%3Cg fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 62 L5 22 Q5 5 22 5 L62 5'/%3E%3Cpath d='M11 50 L11 26 Q11 11 26 11 L50 11'/%3E%3Cpath d='M58 5 L58.68 5.12 L59.33 5.31 L59.95 5.58 L60.53 5.91 L61.05 6.3 L61.52 6.75 L61.93 7.23 L62.27 7.76 L62.54 8.31 L62.75 8.88 L62.89 9.47 L62.95 10.06 L62.95 10.64 L62.88 11.2 L62.74 11.75 L62.55 12.27 L62.3 12.75 L62 13.2 L61.65 13.6 L61.27 13.94 L60.86 14.24 L60.42 14.48 L59.97 14.67 L59.5 14.79 L59.04 14.86 L58.57 14.88 L58.12 14.84 L57.69 14.75 L57.27 14.61 L56.89 14.42 L56.53 14.2 L56.22 13.94 L55.94 13.65 L55.71 13.34 L55.51 13.01 L55.37 12.67 L55.26 12.32 L55.2 11.97 L55.19 11.63 L55.22 11.29 L55.28 10.97 L55.38 10.67 L55.51 10.39 L55.68 10.14 L55.86 9.91 L56.07 9.72 L56.29 9.55 L56.52 9.43 L56.76 9.33 L57 9.27 L57.24 9.24 L57.47 9.24 L57.69 9.27 L57.89 9.32 L58.08 9.4 L58.25 9.5 L58.4 9.62 L58.53 9.75 L58.63 9.88 L58.71 10.03'/%3E%3Cpath d='M5 58 L5.12 58.68 L5.31 59.33 L5.58 59.95 L5.91 60.53 L6.3 61.05 L6.75 61.52 L7.23 61.93 L7.76 62.27 L8.31 62.54 L8.88 62.75 L9.47 62.89 L10.06 62.95 L10.64 62.95 L11.2 62.88 L11.75 62.74 L12.27 62.55 L12.75 62.3 L13.2 62 L13.6 61.65 L13.94 61.27 L14.24 60.86 L14.48 60.42 L14.67 59.97 L14.79 59.5 L14.86 59.04 L14.88 58.57 L14.84 58.12 L14.75 57.69 L14.61 57.27 L14.42 56.89 L14.2 56.53 L13.94 56.22 L13.65 55.94 L13.34 55.71 L13.01 55.51 L12.67 55.37 L12.32 55.26 L11.97 55.2 L11.63 55.19 L11.29 55.22 L10.97 55.28 L10.67 55.38 L10.39 55.51 L10.14 55.68 L9.91 55.86 L9.72 56.07 L9.55 56.29 L9.43 56.52 L9.33 56.76 L9.27 57 L9.24 57.24 L9.24 57.47 L9.27 57.69 L9.32 57.89 L9.4 58.08 L9.5 58.25 L9.62 58.4 L9.75 58.53 L9.88 58.63 L10.03 58.71'/%3E%3Cpath d='M11 26 C16 22 22 18 26 22 C30 26 25 32 21 29 C18 27 20 23 23 24'/%3E%3Cpath d='M26 11 C22 16 18 22 22 26'/%3E%3Cpath d='M30 11 C34 18 42 18 44 13'/%3E%3Cpath d='M11 30 C18 34 18 42 13 44'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M36 5 Q39.28 8.53 44.72 7.24 Q40.57 3.49 36 5 Z'/%3E%3Cpath d='M5 36 Q3.49 40.57 7.24 44.72 Q8.53 39.28 5 36 Z'/%3E%3Cpath d='M5 1.8 L8.2 5 L5 8.2 L1.8 5 Z'/%3E%3Cpath d='M48 5 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M5 48 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M24 21.8 L26.2 24 L24 26.2 L21.8 24 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") right top / var(--orn-size) var(--orn-size) no-repeat, url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='64' height='64'%3E%3Cg transform='translate%280 64%29 scale%281 -1%29'%3E%3Cg fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 62 L5 22 Q5 5 22 5 L62 5'/%3E%3Cpath d='M11 50 L11 26 Q11 11 26 11 L50 11'/%3E%3Cpath d='M58 5 L58.68 5.12 L59.33 5.31 L59.95 5.58 L60.53 5.91 L61.05 6.3 L61.52 6.75 L61.93 7.23 L62.27 7.76 L62.54 8.31 L62.75 8.88 L62.89 9.47 L62.95 10.06 L62.95 10.64 L62.88 11.2 L62.74 11.75 L62.55 12.27 L62.3 12.75 L62 13.2 L61.65 13.6 L61.27 13.94 L60.86 14.24 L60.42 14.48 L59.97 14.67 L59.5 14.79 L59.04 14.86 L58.57 14.88 L58.12 14.84 L57.69 14.75 L57.27 14.61 L56.89 14.42 L56.53 14.2 L56.22 13.94 L55.94 13.65 L55.71 13.34 L55.51 13.01 L55.37 12.67 L55.26 12.32 L55.2 11.97 L55.19 11.63 L55.22 11.29 L55.28 10.97 L55.38 10.67 L55.51 10.39 L55.68 10.14 L55.86 9.91 L56.07 9.72 L56.29 9.55 L56.52 9.43 L56.76 9.33 L57 9.27 L57.24 9.24 L57.47 9.24 L57.69 9.27 L57.89 9.32 L58.08 9.4 L58.25 9.5 L58.4 9.62 L58.53 9.75 L58.63 9.88 L58.71 10.03'/%3E%3Cpath d='M5 58 L5.12 58.68 L5.31 59.33 L5.58 59.95 L5.91 60.53 L6.3 61.05 L6.75 61.52 L7.23 61.93 L7.76 62.27 L8.31 62.54 L8.88 62.75 L9.47 62.89 L10.06 62.95 L10.64 62.95 L11.2 62.88 L11.75 62.74 L12.27 62.55 L12.75 62.3 L13.2 62 L13.6 61.65 L13.94 61.27 L14.24 60.86 L14.48 60.42 L14.67 59.97 L14.79 59.5 L14.86 59.04 L14.88 58.57 L14.84 58.12 L14.75 57.69 L14.61 57.27 L14.42 56.89 L14.2 56.53 L13.94 56.22 L13.65 55.94 L13.34 55.71 L13.01 55.51 L12.67 55.37 L12.32 55.26 L11.97 55.2 L11.63 55.19 L11.29 55.22 L10.97 55.28 L10.67 55.38 L10.39 55.51 L10.14 55.68 L9.91 55.86 L9.72 56.07 L9.55 56.29 L9.43 56.52 L9.33 56.76 L9.27 57 L9.24 57.24 L9.24 57.47 L9.27 57.69 L9.32 57.89 L9.4 58.08 L9.5 58.25 L9.62 58.4 L9.75 58.53 L9.88 58.63 L10.03 58.71'/%3E%3Cpath d='M11 26 C16 22 22 18 26 22 C30 26 25 32 21 29 C18 27 20 23 23 24'/%3E%3Cpath d='M26 11 C22 16 18 22 22 26'/%3E%3Cpath d='M30 11 C34 18 42 18 44 13'/%3E%3Cpath d='M11 30 C18 34 18 42 13 44'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M36 5 Q39.28 8.53 44.72 7.24 Q40.57 3.49 36 5 Z'/%3E%3Cpath d='M5 36 Q3.49 40.57 7.24 44.72 Q8.53 39.28 5 36 Z'/%3E%3Cpath d='M5 1.8 L8.2 5 L5 8.2 L1.8 5 Z'/%3E%3Cpath d='M48 5 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M5 48 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M24 21.8 L26.2 24 L24 26.2 L21.8 24 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") left bottom / var(--orn-size) var(--orn-size) no-repeat, url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='64' height='64'%3E%3Cg transform='translate%2864 64%29 scale%28-1 -1%29'%3E%3Cg fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 62 L5 22 Q5 5 22 5 L62 5'/%3E%3Cpath d='M11 50 L11 26 Q11 11 26 11 L50 11'/%3E%3Cpath d='M58 5 L58.68 5.12 L59.33 5.31 L59.95 5.58 L60.53 5.91 L61.05 6.3 L61.52 6.75 L61.93 7.23 L62.27 7.76 L62.54 8.31 L62.75 8.88 L62.89 9.47 L62.95 10.06 L62.95 10.64 L62.88 11.2 L62.74 11.75 L62.55 12.27 L62.3 12.75 L62 13.2 L61.65 13.6 L61.27 13.94 L60.86 14.24 L60.42 14.48 L59.97 14.67 L59.5 14.79 L59.04 14.86 L58.57 14.88 L58.12 14.84 L57.69 14.75 L57.27 14.61 L56.89 14.42 L56.53 14.2 L56.22 13.94 L55.94 13.65 L55.71 13.34 L55.51 13.01 L55.37 12.67 L55.26 12.32 L55.2 11.97 L55.19 11.63 L55.22 11.29 L55.28 10.97 L55.38 10.67 L55.51 10.39 L55.68 10.14 L55.86 9.91 L56.07 9.72 L56.29 9.55 L56.52 9.43 L56.76 9.33 L57 9.27 L57.24 9.24 L57.47 9.24 L57.69 9.27 L57.89 9.32 L58.08 9.4 L58.25 9.5 L58.4 9.62 L58.53 9.75 L58.63 9.88 L58.71 10.03'/%3E%3Cpath d='M5 58 L5.12 58.68 L5.31 59.33 L5.58 59.95 L5.91 60.53 L6.3 61.05 L6.75 61.52 L7.23 61.93 L7.76 62.27 L8.31 62.54 L8.88 62.75 L9.47 62.89 L10.06 62.95 L10.64 62.95 L11.2 62.88 L11.75 62.74 L12.27 62.55 L12.75 62.3 L13.2 62 L13.6 61.65 L13.94 61.27 L14.24 60.86 L14.48 60.42 L14.67 59.97 L14.79 59.5 L14.86 59.04 L14.88 58.57 L14.84 58.12 L14.75 57.69 L14.61 57.27 L14.42 56.89 L14.2 56.53 L13.94 56.22 L13.65 55.94 L13.34 55.71 L13.01 55.51 L12.67 55.37 L12.32 55.26 L11.97 55.2 L11.63 55.19 L11.29 55.22 L10.97 55.28 L10.67 55.38 L10.39 55.51 L10.14 55.68 L9.91 55.86 L9.72 56.07 L9.55 56.29 L9.43 56.52 L9.33 56.76 L9.27 57 L9.24 57.24 L9.24 57.47 L9.27 57.69 L9.32 57.89 L9.4 58.08 L9.5 58.25 L9.62 58.4 L9.75 58.53 L9.88 58.63 L10.03 58.71'/%3E%3Cpath d='M11 26 C16 22 22 18 26 22 C30 26 25 32 21 29 C18 27 20 23 23 24'/%3E%3Cpath d='M26 11 C22 16 18 22 22 26'/%3E%3Cpath d='M30 11 C34 18 42 18 44 13'/%3E%3Cpath d='M11 30 C18 34 18 42 13 44'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M36 5 Q39.28 8.53 44.72 7.24 Q40.57 3.49 36 5 Z'/%3E%3Cpath d='M5 36 Q3.49 40.57 7.24 44.72 Q8.53 39.28 5 36 Z'/%3E%3Cpath d='M5 1.8 L8.2 5 L5 8.2 L1.8 5 Z'/%3E%3Cpath d='M48 5 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M5 48 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M24 21.8 L26.2 24 L24 26.2 L21.8 24 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") right bottom / var(--orn-size) var(--orn-size) no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='64' height='64'%3E%3Cg%3E%3Cg fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 62 L5 22 Q5 5 22 5 L62 5'/%3E%3Cpath d='M11 50 L11 26 Q11 11 26 11 L50 11'/%3E%3Cpath d='M58 5 L58.68 5.12 L59.33 5.31 L59.95 5.58 L60.53 5.91 L61.05 6.3 L61.52 6.75 L61.93 7.23 L62.27 7.76 L62.54 8.31 L62.75 8.88 L62.89 9.47 L62.95 10.06 L62.95 10.64 L62.88 11.2 L62.74 11.75 L62.55 12.27 L62.3 12.75 L62 13.2 L61.65 13.6 L61.27 13.94 L60.86 14.24 L60.42 14.48 L59.97 14.67 L59.5 14.79 L59.04 14.86 L58.57 14.88 L58.12 14.84 L57.69 14.75 L57.27 14.61 L56.89 14.42 L56.53 14.2 L56.22 13.94 L55.94 13.65 L55.71 13.34 L55.51 13.01 L55.37 12.67 L55.26 12.32 L55.2 11.97 L55.19 11.63 L55.22 11.29 L55.28 10.97 L55.38 10.67 L55.51 10.39 L55.68 10.14 L55.86 9.91 L56.07 9.72 L56.29 9.55 L56.52 9.43 L56.76 9.33 L57 9.27 L57.24 9.24 L57.47 9.24 L57.69 9.27 L57.89 9.32 L58.08 9.4 L58.25 9.5 L58.4 9.62 L58.53 9.75 L58.63 9.88 L58.71 10.03'/%3E%3Cpath d='M5 58 L5.12 58.68 L5.31 59.33 L5.58 59.95 L5.91 60.53 L6.3 61.05 L6.75 61.52 L7.23 61.93 L7.76 62.27 L8.31 62.54 L8.88 62.75 L9.47 62.89 L10.06 62.95 L10.64 62.95 L11.2 62.88 L11.75 62.74 L12.27 62.55 L12.75 62.3 L13.2 62 L13.6 61.65 L13.94 61.27 L14.24 60.86 L14.48 60.42 L14.67 59.97 L14.79 59.5 L14.86 59.04 L14.88 58.57 L14.84 58.12 L14.75 57.69 L14.61 57.27 L14.42 56.89 L14.2 56.53 L13.94 56.22 L13.65 55.94 L13.34 55.71 L13.01 55.51 L12.67 55.37 L12.32 55.26 L11.97 55.2 L11.63 55.19 L11.29 55.22 L10.97 55.28 L10.67 55.38 L10.39 55.51 L10.14 55.68 L9.91 55.86 L9.72 56.07 L9.55 56.29 L9.43 56.52 L9.33 56.76 L9.27 57 L9.24 57.24 L9.24 57.47 L9.27 57.69 L9.32 57.89 L9.4 58.08 L9.5 58.25 L9.62 58.4 L9.75 58.53 L9.88 58.63 L10.03 58.71'/%3E%3Cpath d='M11 26 C16 22 22 18 26 22 C30 26 25 32 21 29 C18 27 20 23 23 24'/%3E%3Cpath d='M26 11 C22 16 18 22 22 26'/%3E%3Cpath d='M30 11 C34 18 42 18 44 13'/%3E%3Cpath d='M11 30 C18 34 18 42 13 44'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M36 5 Q39.28 8.53 44.72 7.24 Q40.57 3.49 36 5 Z'/%3E%3Cpath d='M5 36 Q3.49 40.57 7.24 44.72 Q8.53 39.28 5 36 Z'/%3E%3Cpath d='M5 1.8 L8.2 5 L5 8.2 L1.8 5 Z'/%3E%3Cpath d='M48 5 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M5 48 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M24 21.8 L26.2 24 L24 26.2 L21.8 24 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") left top / var(--orn-size) var(--orn-size) no-repeat, url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='64' height='64'%3E%3Cg transform='translate%2864 0%29 scale%28-1 1%29'%3E%3Cg fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 62 L5 22 Q5 5 22 5 L62 5'/%3E%3Cpath d='M11 50 L11 26 Q11 11 26 11 L50 11'/%3E%3Cpath d='M58 5 L58.68 5.12 L59.33 5.31 L59.95 5.58 L60.53 5.91 L61.05 6.3 L61.52 6.75 L61.93 7.23 L62.27 7.76 L62.54 8.31 L62.75 8.88 L62.89 9.47 L62.95 10.06 L62.95 10.64 L62.88 11.2 L62.74 11.75 L62.55 12.27 L62.3 12.75 L62 13.2 L61.65 13.6 L61.27 13.94 L60.86 14.24 L60.42 14.48 L59.97 14.67 L59.5 14.79 L59.04 14.86 L58.57 14.88 L58.12 14.84 L57.69 14.75 L57.27 14.61 L56.89 14.42 L56.53 14.2 L56.22 13.94 L55.94 13.65 L55.71 13.34 L55.51 13.01 L55.37 12.67 L55.26 12.32 L55.2 11.97 L55.19 11.63 L55.22 11.29 L55.28 10.97 L55.38 10.67 L55.51 10.39 L55.68 10.14 L55.86 9.91 L56.07 9.72 L56.29 9.55 L56.52 9.43 L56.76 9.33 L57 9.27 L57.24 9.24 L57.47 9.24 L57.69 9.27 L57.89 9.32 L58.08 9.4 L58.25 9.5 L58.4 9.62 L58.53 9.75 L58.63 9.88 L58.71 10.03'/%3E%3Cpath d='M5 58 L5.12 58.68 L5.31 59.33 L5.58 59.95 L5.91 60.53 L6.3 61.05 L6.75 61.52 L7.23 61.93 L7.76 62.27 L8.31 62.54 L8.88 62.75 L9.47 62.89 L10.06 62.95 L10.64 62.95 L11.2 62.88 L11.75 62.74 L12.27 62.55 L12.75 62.3 L13.2 62 L13.6 61.65 L13.94 61.27 L14.24 60.86 L14.48 60.42 L14.67 59.97 L14.79 59.5 L14.86 59.04 L14.88 58.57 L14.84 58.12 L14.75 57.69 L14.61 57.27 L14.42 56.89 L14.2 56.53 L13.94 56.22 L13.65 55.94 L13.34 55.71 L13.01 55.51 L12.67 55.37 L12.32 55.26 L11.97 55.2 L11.63 55.19 L11.29 55.22 L10.97 55.28 L10.67 55.38 L10.39 55.51 L10.14 55.68 L9.91 55.86 L9.72 56.07 L9.55 56.29 L9.43 56.52 L9.33 56.76 L9.27 57 L9.24 57.24 L9.24 57.47 L9.27 57.69 L9.32 57.89 L9.4 58.08 L9.5 58.25 L9.62 58.4 L9.75 58.53 L9.88 58.63 L10.03 58.71'/%3E%3Cpath d='M11 26 C16 22 22 18 26 22 C30 26 25 32 21 29 C18 27 20 23 23 24'/%3E%3Cpath d='M26 11 C22 16 18 22 22 26'/%3E%3Cpath d='M30 11 C34 18 42 18 44 13'/%3E%3Cpath d='M11 30 C18 34 18 42 13 44'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M36 5 Q39.28 8.53 44.72 7.24 Q40.57 3.49 36 5 Z'/%3E%3Cpath d='M5 36 Q3.49 40.57 7.24 44.72 Q8.53 39.28 5 36 Z'/%3E%3Cpath d='M5 1.8 L8.2 5 L5 8.2 L1.8 5 Z'/%3E%3Cpath d='M48 5 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M5 48 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M24 21.8 L26.2 24 L24 26.2 L21.8 24 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") right top / var(--orn-size) var(--orn-size) no-repeat, url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='64' height='64'%3E%3Cg transform='translate%280 64%29 scale%281 -1%29'%3E%3Cg fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 62 L5 22 Q5 5 22 5 L62 5'/%3E%3Cpath d='M11 50 L11 26 Q11 11 26 11 L50 11'/%3E%3Cpath d='M58 5 L58.68 5.12 L59.33 5.31 L59.95 5.58 L60.53 5.91 L61.05 6.3 L61.52 6.75 L61.93 7.23 L62.27 7.76 L62.54 8.31 L62.75 8.88 L62.89 9.47 L62.95 10.06 L62.95 10.64 L62.88 11.2 L62.74 11.75 L62.55 12.27 L62.3 12.75 L62 13.2 L61.65 13.6 L61.27 13.94 L60.86 14.24 L60.42 14.48 L59.97 14.67 L59.5 14.79 L59.04 14.86 L58.57 14.88 L58.12 14.84 L57.69 14.75 L57.27 14.61 L56.89 14.42 L56.53 14.2 L56.22 13.94 L55.94 13.65 L55.71 13.34 L55.51 13.01 L55.37 12.67 L55.26 12.32 L55.2 11.97 L55.19 11.63 L55.22 11.29 L55.28 10.97 L55.38 10.67 L55.51 10.39 L55.68 10.14 L55.86 9.91 L56.07 9.72 L56.29 9.55 L56.52 9.43 L56.76 9.33 L57 9.27 L57.24 9.24 L57.47 9.24 L57.69 9.27 L57.89 9.32 L58.08 9.4 L58.25 9.5 L58.4 9.62 L58.53 9.75 L58.63 9.88 L58.71 10.03'/%3E%3Cpath d='M5 58 L5.12 58.68 L5.31 59.33 L5.58 59.95 L5.91 60.53 L6.3 61.05 L6.75 61.52 L7.23 61.93 L7.76 62.27 L8.31 62.54 L8.88 62.75 L9.47 62.89 L10.06 62.95 L10.64 62.95 L11.2 62.88 L11.75 62.74 L12.27 62.55 L12.75 62.3 L13.2 62 L13.6 61.65 L13.94 61.27 L14.24 60.86 L14.48 60.42 L14.67 59.97 L14.79 59.5 L14.86 59.04 L14.88 58.57 L14.84 58.12 L14.75 57.69 L14.61 57.27 L14.42 56.89 L14.2 56.53 L13.94 56.22 L13.65 55.94 L13.34 55.71 L13.01 55.51 L12.67 55.37 L12.32 55.26 L11.97 55.2 L11.63 55.19 L11.29 55.22 L10.97 55.28 L10.67 55.38 L10.39 55.51 L10.14 55.68 L9.91 55.86 L9.72 56.07 L9.55 56.29 L9.43 56.52 L9.33 56.76 L9.27 57 L9.24 57.24 L9.24 57.47 L9.27 57.69 L9.32 57.89 L9.4 58.08 L9.5 58.25 L9.62 58.4 L9.75 58.53 L9.88 58.63 L10.03 58.71'/%3E%3Cpath d='M11 26 C16 22 22 18 26 22 C30 26 25 32 21 29 C18 27 20 23 23 24'/%3E%3Cpath d='M26 11 C22 16 18 22 22 26'/%3E%3Cpath d='M30 11 C34 18 42 18 44 13'/%3E%3Cpath d='M11 30 C18 34 18 42 13 44'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M36 5 Q39.28 8.53 44.72 7.24 Q40.57 3.49 36 5 Z'/%3E%3Cpath d='M5 36 Q3.49 40.57 7.24 44.72 Q8.53 39.28 5 36 Z'/%3E%3Cpath d='M5 1.8 L8.2 5 L5 8.2 L1.8 5 Z'/%3E%3Cpath d='M48 5 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M5 48 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M24 21.8 L26.2 24 L24 26.2 L21.8 24 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") left bottom / var(--orn-size) var(--orn-size) no-repeat, url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='64' height='64'%3E%3Cg transform='translate%2864 64%29 scale%28-1 -1%29'%3E%3Cg fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 62 L5 22 Q5 5 22 5 L62 5'/%3E%3Cpath d='M11 50 L11 26 Q11 11 26 11 L50 11'/%3E%3Cpath d='M58 5 L58.68 5.12 L59.33 5.31 L59.95 5.58 L60.53 5.91 L61.05 6.3 L61.52 6.75 L61.93 7.23 L62.27 7.76 L62.54 8.31 L62.75 8.88 L62.89 9.47 L62.95 10.06 L62.95 10.64 L62.88 11.2 L62.74 11.75 L62.55 12.27 L62.3 12.75 L62 13.2 L61.65 13.6 L61.27 13.94 L60.86 14.24 L60.42 14.48 L59.97 14.67 L59.5 14.79 L59.04 14.86 L58.57 14.88 L58.12 14.84 L57.69 14.75 L57.27 14.61 L56.89 14.42 L56.53 14.2 L56.22 13.94 L55.94 13.65 L55.71 13.34 L55.51 13.01 L55.37 12.67 L55.26 12.32 L55.2 11.97 L55.19 11.63 L55.22 11.29 L55.28 10.97 L55.38 10.67 L55.51 10.39 L55.68 10.14 L55.86 9.91 L56.07 9.72 L56.29 9.55 L56.52 9.43 L56.76 9.33 L57 9.27 L57.24 9.24 L57.47 9.24 L57.69 9.27 L57.89 9.32 L58.08 9.4 L58.25 9.5 L58.4 9.62 L58.53 9.75 L58.63 9.88 L58.71 10.03'/%3E%3Cpath d='M5 58 L5.12 58.68 L5.31 59.33 L5.58 59.95 L5.91 60.53 L6.3 61.05 L6.75 61.52 L7.23 61.93 L7.76 62.27 L8.31 62.54 L8.88 62.75 L9.47 62.89 L10.06 62.95 L10.64 62.95 L11.2 62.88 L11.75 62.74 L12.27 62.55 L12.75 62.3 L13.2 62 L13.6 61.65 L13.94 61.27 L14.24 60.86 L14.48 60.42 L14.67 59.97 L14.79 59.5 L14.86 59.04 L14.88 58.57 L14.84 58.12 L14.75 57.69 L14.61 57.27 L14.42 56.89 L14.2 56.53 L13.94 56.22 L13.65 55.94 L13.34 55.71 L13.01 55.51 L12.67 55.37 L12.32 55.26 L11.97 55.2 L11.63 55.19 L11.29 55.22 L10.97 55.28 L10.67 55.38 L10.39 55.51 L10.14 55.68 L9.91 55.86 L9.72 56.07 L9.55 56.29 L9.43 56.52 L9.33 56.76 L9.27 57 L9.24 57.24 L9.24 57.47 L9.27 57.69 L9.32 57.89 L9.4 58.08 L9.5 58.25 L9.62 58.4 L9.75 58.53 L9.88 58.63 L10.03 58.71'/%3E%3Cpath d='M11 26 C16 22 22 18 26 22 C30 26 25 32 21 29 C18 27 20 23 23 24'/%3E%3Cpath d='M26 11 C22 16 18 22 22 26'/%3E%3Cpath d='M30 11 C34 18 42 18 44 13'/%3E%3Cpath d='M11 30 C18 34 18 42 13 44'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M36 5 Q39.28 8.53 44.72 7.24 Q40.57 3.49 36 5 Z'/%3E%3Cpath d='M5 36 Q3.49 40.57 7.24 44.72 Q8.53 39.28 5 36 Z'/%3E%3Cpath d='M5 1.8 L8.2 5 L5 8.2 L1.8 5 Z'/%3E%3Cpath d='M48 5 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M5 48 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0'/%3E%3Cpath d='M24 21.8 L26.2 24 L24 26.2 L21.8 24 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") right bottom / var(--orn-size) var(--orn-size) no-repeat; }
.eg-ornate-gilded::after { content: ""; position: absolute; inset: var(--orn-inset); z-index: 0; pointer-events: none;
  background: radial-gradient(circle at 50% 16px, var(--flare) 0 5.5px, transparent 6px), linear-gradient(90deg, var(--gold-deep), var(--gold-bright) 30%, var(--gold) 50%, var(--gold-bright) 70%, var(--gold-deep));
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
.eg-ornate-sm { --orn-size: 40px; }
.eg-tile.eg-ornate { --orn-size: 30px; --orn-inset: 7px; }
.eg-card.eg-ornate { --orn-size: 46px; padding: calc(var(--space-6) + 16px) calc(var(--space-6) + 12px); overflow: hidden; }
.eg-card { overflow: hidden; }
.eg-card.eg-ornate-gilded, .eg-ornate-gilded { padding-top: calc(var(--space-6) + 34px) !important; padding-bottom: calc(var(--space-6) + 24px) !important; }
.eg-divider-gilded { display: block; height: 14px; margin: var(--space-4) auto; width: min(220px, 80%); background: linear-gradient(90deg, var(--gold-deep), var(--gold-bright) 30%, var(--gold) 50%, var(--gold-bright) 70%, var(--gold-deep)); -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 16' width='180' height='16'%3E%3Cg%3E%3Cg fill='none' stroke='%23000' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M97 8 L152 8'/%3E%3Cpath d='M152 8 L152.07 7.59 L152.19 7.19 L152.35 6.81 L152.54 6.46 L152.77 6.13 L153.02 5.84 L153.3 5.57 L153.61 5.34 L153.93 5.15 L154.27 5 L154.61 4.88 L154.96 4.8 L155.31 4.77 L155.66 4.76 L156 4.8 L156.33 4.87 L156.64 4.97 L156.94 5.11 L157.21 5.27 L157.47 5.46 L157.69 5.67 L157.89 5.9 L158.06 6.14 L158.2 6.4 L158.31 6.67 L158.39 6.94 L158.43 7.21 L158.45 7.48 L158.44 7.74 L158.4 8 L158.33 8.25 L158.24 8.48 L158.13 8.69 L158 8.89 L157.85 9.07 L157.68 9.22 L157.51 9.36 L157.32 9.47 L157.13 9.55 L156.93 9.62 L156.74 9.66 L156.54 9.67 L156.35 9.67 L156.17 9.64 L156 9.6 L155.84 9.54 L155.69 9.46 L155.56 9.37 L155.44 9.27 L155.33 9.15 L155.25 9.04 L155.18 8.91 L155.13 8.79 L155.09 8.66 L155.08 8.53 L155.07 8.41 L155.09 8.3 L155.11 8.19 L155.15 8.09 L155.2 8'/%3E%3Cpath d='M83 8 L28 8'/%3E%3Cpath d='M28 8 L27.93 7.59 L27.81 7.19 L27.65 6.81 L27.46 6.46 L27.23 6.13 L26.98 5.84 L26.7 5.57 L26.39 5.34 L26.07 5.15 L25.73 5 L25.39 4.88 L25.04 4.8 L24.69 4.77 L24.34 4.76 L24 4.8 L23.67 4.87 L23.36 4.97 L23.06 5.11 L22.79 5.27 L22.53 5.46 L22.31 5.67 L22.11 5.9 L21.94 6.14 L21.8 6.4 L21.69 6.67 L21.61 6.94 L21.57 7.21 L21.55 7.48 L21.56 7.74 L21.6 8 L21.67 8.25 L21.76 8.48 L21.87 8.69 L22 8.89 L22.15 9.07 L22.32 9.22 L22.49 9.36 L22.68 9.47 L22.87 9.55 L23.07 9.62 L23.26 9.66 L23.46 9.67 L23.65 9.67 L23.83 9.64 L24 9.6 L24.16 9.54 L24.31 9.46 L24.44 9.37 L24.56 9.27 L24.67 9.15 L24.75 9.04 L24.82 8.91 L24.87 8.79 L24.91 8.66 L24.92 8.53 L24.93 8.41 L24.91 8.3 L24.89 8.19 L24.85 8.09 L24.8 8'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M90 4 L94 8 L90 12 L86 8 Z'/%3E%3Cpath d='M170 8 m-1.4 0 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0'/%3E%3Cpath d='M10 8 m-1.4 0 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") center / contain no-repeat; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 16' width='180' height='16'%3E%3Cg%3E%3Cg fill='none' stroke='%23000' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M97 8 L152 8'/%3E%3Cpath d='M152 8 L152.07 7.59 L152.19 7.19 L152.35 6.81 L152.54 6.46 L152.77 6.13 L153.02 5.84 L153.3 5.57 L153.61 5.34 L153.93 5.15 L154.27 5 L154.61 4.88 L154.96 4.8 L155.31 4.77 L155.66 4.76 L156 4.8 L156.33 4.87 L156.64 4.97 L156.94 5.11 L157.21 5.27 L157.47 5.46 L157.69 5.67 L157.89 5.9 L158.06 6.14 L158.2 6.4 L158.31 6.67 L158.39 6.94 L158.43 7.21 L158.45 7.48 L158.44 7.74 L158.4 8 L158.33 8.25 L158.24 8.48 L158.13 8.69 L158 8.89 L157.85 9.07 L157.68 9.22 L157.51 9.36 L157.32 9.47 L157.13 9.55 L156.93 9.62 L156.74 9.66 L156.54 9.67 L156.35 9.67 L156.17 9.64 L156 9.6 L155.84 9.54 L155.69 9.46 L155.56 9.37 L155.44 9.27 L155.33 9.15 L155.25 9.04 L155.18 8.91 L155.13 8.79 L155.09 8.66 L155.08 8.53 L155.07 8.41 L155.09 8.3 L155.11 8.19 L155.15 8.09 L155.2 8'/%3E%3Cpath d='M83 8 L28 8'/%3E%3Cpath d='M28 8 L27.93 7.59 L27.81 7.19 L27.65 6.81 L27.46 6.46 L27.23 6.13 L26.98 5.84 L26.7 5.57 L26.39 5.34 L26.07 5.15 L25.73 5 L25.39 4.88 L25.04 4.8 L24.69 4.77 L24.34 4.76 L24 4.8 L23.67 4.87 L23.36 4.97 L23.06 5.11 L22.79 5.27 L22.53 5.46 L22.31 5.67 L22.11 5.9 L21.94 6.14 L21.8 6.4 L21.69 6.67 L21.61 6.94 L21.57 7.21 L21.55 7.48 L21.56 7.74 L21.6 8 L21.67 8.25 L21.76 8.48 L21.87 8.69 L22 8.89 L22.15 9.07 L22.32 9.22 L22.49 9.36 L22.68 9.47 L22.87 9.55 L23.07 9.62 L23.26 9.66 L23.46 9.67 L23.65 9.67 L23.83 9.64 L24 9.6 L24.16 9.54 L24.31 9.46 L24.44 9.37 L24.56 9.27 L24.67 9.15 L24.75 9.04 L24.82 8.91 L24.87 8.79 L24.91 8.66 L24.92 8.53 L24.93 8.41 L24.91 8.3 L24.89 8.19 L24.85 8.09 L24.8 8'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M90 4 L94 8 L90 12 L86 8 Z'/%3E%3Cpath d='M170 8 m-1.4 0 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0'/%3E%3Cpath d='M10 8 m-1.4 0 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") center / contain no-repeat; }

/* ---------- Card and tile silhouettes ---------- */
.eg-cut-notch { border-radius: 0 !important; clip-path: polygon(var(--cut-notch) 0, calc(100% - var(--cut-notch)) 0, 100% var(--cut-notch), 100% calc(100% - var(--cut-notch)), calc(100% - var(--cut-notch)) 100%, var(--cut-notch) 100%, 0 calc(100% - var(--cut-notch)), 0 var(--cut-notch)); }
.eg-cut-notch.eg-ornate { --orn-inset: 9px; }
.eg-cut-scoop { border-radius: 0 !important;
  -webkit-mask: radial-gradient(circle at 0 0, transparent var(--cut-scoop), #000 calc(var(--cut-scoop) + 0.5px)) left top / 51% 51% no-repeat, radial-gradient(circle at 100% 0, transparent var(--cut-scoop), #000 calc(var(--cut-scoop) + 0.5px)) right top / 51% 51% no-repeat, radial-gradient(circle at 0 100%, transparent var(--cut-scoop), #000 calc(var(--cut-scoop) + 0.5px)) left bottom / 51% 51% no-repeat, radial-gradient(circle at 100% 100%, transparent var(--cut-scoop), #000 calc(var(--cut-scoop) + 0.5px)) right bottom / 51% 51% no-repeat;
  mask: radial-gradient(circle at 0 0, transparent var(--cut-scoop), #000 calc(var(--cut-scoop) + 0.5px)) left top / 51% 51% no-repeat, radial-gradient(circle at 100% 0, transparent var(--cut-scoop), #000 calc(var(--cut-scoop) + 0.5px)) right top / 51% 51% no-repeat, radial-gradient(circle at 0 100%, transparent var(--cut-scoop), #000 calc(var(--cut-scoop) + 0.5px)) left bottom / 51% 51% no-repeat, radial-gradient(circle at 100% 100%, transparent var(--cut-scoop), #000 calc(var(--cut-scoop) + 0.5px)) right bottom / 51% 51% no-repeat; }
.eg-cut-scoop.eg-ornate { --orn-inset: 10px; }
.eg-cut-arch { border-radius: 50% 50% var(--radius-lg) var(--radius-lg) / min(var(--cut-arch), 34%) min(var(--cut-arch), 34%) var(--radius-lg) var(--radius-lg) !important; padding-top: calc(var(--space-12) + 8px) !important; }
.eg-cut-arch.eg-ornate { --orn-size: 44px; }
.eg-cut-arch.eg-ornate::before { -webkit-mask-size: 0 0, 0 0, var(--orn-size) var(--orn-size), var(--orn-size) var(--orn-size); mask-size: 0 0, 0 0, var(--orn-size) var(--orn-size), var(--orn-size) var(--orn-size); }
.eg-cut-ticket {
  -webkit-mask: radial-gradient(circle at 0 50%, transparent var(--cut-ticket), #000 calc(var(--cut-ticket) + 0.5px)) left / 51% 100% no-repeat, radial-gradient(circle at 100% 50%, transparent var(--cut-ticket), #000 calc(var(--cut-ticket) + 0.5px)) right / 51% 100% no-repeat;
  mask: radial-gradient(circle at 0 50%, transparent var(--cut-ticket), #000 calc(var(--cut-ticket) + 0.5px)) left / 51% 100% no-repeat, radial-gradient(circle at 100% 50%, transparent var(--cut-ticket), #000 calc(var(--cut-ticket) + 0.5px)) right / 51% 100% no-repeat; }
.eg-cut-banner { border-radius: var(--radius-lg) var(--radius-lg) 0 0 !important; padding-bottom: calc(var(--space-6) + var(--cut-banner)) !important; clip-path: polygon(0 0, 100% 0, 100% calc(100% - var(--cut-banner)), 50% 100%, 0 calc(100% - var(--cut-banner))); }
.eg-cut-gem { border-radius: 0 !important; clip-path: polygon(var(--cut-gem) 0, calc(100% - var(--cut-gem)) 0, 100% var(--cut-gem), 100% calc(100% - var(--cut-gem)), calc(100% - var(--cut-gem)) 100%, var(--cut-gem) 100%, 0 calc(100% - var(--cut-gem)), 0 var(--cut-gem)); }
.eg-cut-wrap { display: block; position: relative; transition: filter var(--duration-drift) var(--ease-mist), transform var(--duration-drift) var(--ease-mist); filter: drop-shadow(0 14px 22px color-mix(in srgb, var(--canopy-sunken) 70%, transparent)); }
.eg-cut-wrap:hover, .eg-cut-wrap:focus-within { filter: drop-shadow(0 0 4px color-mix(in srgb, var(--flare) 55%, transparent)) drop-shadow(0 0 22px color-mix(in srgb, var(--flare) 38%, transparent)); transform: translateY(-2px); }
.eg-cut-wrap > .eg-card { max-width: none; }

/* ---------- Rarity bands ---------- */
.eg-band { position: absolute; left: 0; right: 0; top: 0; height: 64px; z-index: 0; pointer-events: none; background: linear-gradient(180deg, color-mix(in srgb, var(--band) 42%, transparent), transparent); }
.eg-band-flare { --band: var(--flare); } .eg-band-gold { --band: var(--gold); } .eg-band-moss { --band: var(--moss-text); } .eg-band-amethyst { --band: var(--amethyst-text); } .eg-band-dew { --band: var(--dew); }
.eg-card-gem { position: absolute; top: 14px; right: 16px; z-index: 2; width: 12px; height: 12px; transform: rotate(45deg); background: linear-gradient(135deg, color-mix(in srgb, var(--flare) 60%, var(--pale-mist)), var(--flare)); box-shadow: 0 0 0 1.5px var(--gold), 0 0 12px var(--flare); }

/* ---------- Tile (inventory slot) ---------- */
.eg-tile { position: relative; display: flex; flex-direction: column; align-items: center; gap: var(--space-2); box-sizing: border-box; width: 132px; padding: 18px 12px 14px; border: 0; background: var(--canopy-raised); box-shadow: var(--inset-frost); color: var(--ink); font: inherit; text-align: center; cursor: default; overflow: hidden; }
button.eg-tile, a.eg-tile { cursor: pointer; text-decoration: none; }
.eg-tile-icon { position: relative; z-index: 1; display: grid; place-items: center; width: 60px; height: 60px; background: var(--canopy-sunken); box-shadow: var(--inset-well); color: var(--band, var(--ink)); clip-path: polygon(22% 0, 78% 0, 100% 22%, 100% 78%, 78% 100%, 22% 100%, 0 78%, 0 22%); }
.eg-tile-icon .eg-icon { filter: drop-shadow(0 0 6px color-mix(in srgb, var(--band, var(--lumen)) 60%, transparent)); }
.eg-tile-label { position: relative; z-index: 1; font-family: var(--font-display); font-size: 17px; line-height: 20px; font-weight: 600; }
.eg-tile-sub { position: relative; z-index: 1; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-muted); }
.eg-tile-count { position: absolute; z-index: 2; right: 10px; top: 10px; min-width: 22px; padding: 0 6px; border-radius: var(--radius-sm); background: var(--flare-soft); color: var(--flare-text); font-family: var(--font-mono); font-size: 11px; line-height: 20px; box-shadow: var(--inset-frost); }
.eg-tile-pips { position: relative; z-index: 1; display: flex; gap: 4px; }
.eg-tile-pips i { width: 7px; height: 7px; transform: rotate(45deg); background: var(--vein); }
.eg-tile-pips i.on { background: var(--gold); box-shadow: 0 0 6px var(--gold-bright); }
.eg-tile-flare { box-shadow: var(--inset-frost), inset 0 0 0 1px color-mix(in srgb, var(--flare) 0%, transparent); }

/* ---------- Ornate buttons ---------- */
.eg-btn-orn { position: relative; flex: none; width: 24px; height: 12px; background: linear-gradient(90deg, var(--gold-deep), var(--gold-bright) 60%, var(--gold)); -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 12' width='24' height='12'%3E%3Cg%3E%3Cg fill='none' stroke='%23000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 6 L12 6'/%3E%3Cpath d='M6 10 L6.37 9.93 L6.73 9.82 L7.07 9.69 L7.39 9.52 L7.69 9.33 L7.97 9.11 L8.22 8.87 L8.45 8.6 L8.64 8.33 L8.8 8.04 L8.94 7.74 L9.04 7.43 L9.11 7.12 L9.15 6.81 L9.16 6.5 L9.14 6.2 L9.09 5.9 L9.02 5.62 L8.91 5.35 L8.79 5.09 L8.64 4.86 L8.48 4.64 L8.29 4.44 L8.1 4.27 L7.89 4.11 L7.67 3.99 L7.44 3.88 L7.21 3.8 L6.97 3.75 L6.74 3.72 L6.51 3.71 L6.29 3.72 L6.07 3.76 L5.86 3.82 L5.67 3.89 L5.48 3.99 L5.31 4.09 L5.16 4.21 L5.02 4.35 L4.9 4.49 L4.8 4.64 L4.72 4.8 L4.65 4.95 L4.6 5.11 L4.57 5.27 L4.56 5.43 L4.57 5.58 L4.59 5.73 L4.62 5.87 L4.67 6 L4.73 6.12 L4.8 6.23 L4.87 6.33 L4.96 6.41 L5.05 6.48 L5.14 6.54 L5.24 6.59 L5.34 6.62 L5.44 6.64 L5.53 6.65'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M18 1.8 L22.2 6 L18 10.2 L13.8 6 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") center / 24px 12px no-repeat; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 12' width='24' height='12'%3E%3Cg%3E%3Cg fill='none' stroke='%23000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 6 L12 6'/%3E%3Cpath d='M6 10 L6.37 9.93 L6.73 9.82 L7.07 9.69 L7.39 9.52 L7.69 9.33 L7.97 9.11 L8.22 8.87 L8.45 8.6 L8.64 8.33 L8.8 8.04 L8.94 7.74 L9.04 7.43 L9.11 7.12 L9.15 6.81 L9.16 6.5 L9.14 6.2 L9.09 5.9 L9.02 5.62 L8.91 5.35 L8.79 5.09 L8.64 4.86 L8.48 4.64 L8.29 4.44 L8.1 4.27 L7.89 4.11 L7.67 3.99 L7.44 3.88 L7.21 3.8 L6.97 3.75 L6.74 3.72 L6.51 3.71 L6.29 3.72 L6.07 3.76 L5.86 3.82 L5.67 3.89 L5.48 3.99 L5.31 4.09 L5.16 4.21 L5.02 4.35 L4.9 4.49 L4.8 4.64 L4.72 4.8 L4.65 4.95 L4.6 5.11 L4.57 5.27 L4.56 5.43 L4.57 5.58 L4.59 5.73 L4.62 5.87 L4.67 6 L4.73 6.12 L4.8 6.23 L4.87 6.33 L4.96 6.41 L5.05 6.48 L5.14 6.54 L5.24 6.59 L5.34 6.62 L5.44 6.64 L5.53 6.65'/%3E%3C/g%3E%3Cg fill='%23000'%3E%3Cpath d='M18 1.8 L22.2 6 L18 10.2 L13.8 6 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") center / 24px 12px no-repeat; filter: drop-shadow(0 0 4px color-mix(in srgb, var(--gold-bright) 50%, transparent)); }
.eg-btn-orn.r { transform: scaleX(-1); }
.eg-btn-ornate { padding: 0 var(--space-4); }
.eg-btn-seal.eg-btn-ornate .eg-btn-orn { background: linear-gradient(90deg, var(--on-seal), color-mix(in srgb, var(--on-seal) 70%, var(--gold))); filter: none; }

/* ---------- Flare tag ---------- */
.eg-tag-flare { color: var(--flare-text); background: var(--flare-soft); }

/* ---------- Reduced motion: keep the light, drop the movement ---------- */
@media (prefers-reduced-motion: reduce) {
  .eg-btn, .eg-card-interactive, .eg-field-input, .eg-gathering-trail, .eg-switch-knob, .eg-switch-track, .eg-tabs-mark { transition: none; }
  .eg-card-interactive:hover, .eg-btn:active:not(:disabled) { transform: none; }
  .eg-firefly { animation: none; opacity: 0.7; }
  .eg-gathering-indeterminate { animation: none; width: 100%; opacity: 0.6; }
  .eg-spores, .eg-ripple, .eg-pollen, .eg-moth { display: none; }
  .eg-btn-seal:hover::after { animation: none; }
  .eg-moon-shade { animation: none; transform: translateX(45%); }
  .eg-check-mark, .eg-check-box { transition: none; }
  .eg-field-error .eg-field-input, .eg-switch-on .eg-switch-knob, .eg-gathering-dots i { animation: none; }
  .eg-notice, .eg-toast, .eg-tabs-panel, .eg-field-errtext { animation-duration: 1ms; }
  .eg-card-interactive:hover .eg-card-twinkle, .eg-card-interactive:focus-visible .eg-card-twinkle { animation: none; opacity: 1; transform: none; }
}

/* ---------- "Still the grove": the same fallbacks, switched on by <html data-motion="still"> ---------- */
[data-motion="still"] .eg-btn, [data-motion="still"] .eg-card-interactive, [data-motion="still"] .eg-field-input, [data-motion="still"] .eg-gathering-trail, [data-motion="still"] .eg-switch-knob, [data-motion="still"] .eg-switch-track, [data-motion="still"] .eg-tabs-mark { transition: none; }
[data-motion="still"] .eg-card-interactive:hover, [data-motion="still"] .eg-btn:active:not(:disabled) { transform: none; }
[data-motion="still"] .eg-firefly { animation: none; opacity: 0.7; }
[data-motion="still"] .eg-gathering-indeterminate { animation: none; width: 100%; opacity: 0.6; }
[data-motion="still"] .eg-spores, [data-motion="still"] .eg-ripple, [data-motion="still"] .eg-pollen, [data-motion="still"] .eg-moth { display: none; }
[data-motion="still"] .eg-btn-seal:hover::after { animation: none; }
[data-motion="still"] .eg-moon-shade { animation: none; transform: translateX(45%); }
[data-motion="still"] .eg-check-mark, [data-motion="still"] .eg-check-box { transition: none; }
[data-motion="still"] .eg-field-error .eg-field-input, [data-motion="still"] .eg-switch-on .eg-switch-knob, [data-motion="still"] .eg-gathering-dots i { animation: none; }
[data-motion="still"] .eg-notice, [data-motion="still"] .eg-toast, [data-motion="still"] .eg-tabs-panel, [data-motion="still"] .eg-field-errtext { animation-duration: 1ms; }
[data-motion="still"] .eg-card-interactive:hover .eg-card-twinkle, [data-motion="still"] .eg-card-interactive:focus-visible .eg-card-twinkle { animation: none; opacity: 1; transform: none; }
[data-motion="still"] .eg-firefly, [data-motion="still"] .eg-moon-shade, [data-motion="still"] .eg-switch-on .eg-switch-knob { animation: none; }

[data-motion="still"] .eg-cut-wrap { transition: none; }
@media (prefers-reduced-motion: reduce) { .eg-cut-wrap { transition: none; } .eg-cut-wrap:hover { transform: none; } }
```

## Appendix C. Component library (grove.js)

A single classic script. It reads `window.React` and `window.ReactDOM` and assigns `window.Grove`.

```js
/* @ds-bundle: {"format":4,"namespace":"Grove","components":[{"name":"Button"},{"name":"Card"},{"name":"Field"},{"name":"Switch"},{"name":"Tabs"},{"name":"Tag"},{"name":"Notice"},{"name":"Toast"},{"name":"EmptyState"},{"name":"Gathering"},{"name":"Sparkle"},{"name":"Fireflies"},{"name":"Checkbox"},{"name":"MoonPhase"},{"name":"Pollen"},{"name":"Tile"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }
  var uid = 0;
  function useId(given) {
    var ref = React.useRef(null);
    if (ref.current === null) { uid += 1; ref.current = given || 'eg-' + uid; }
    return ref.current;
  }
  function omit(obj, keys) {
    var out = {};
    for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && keys.indexOf(k) < 0) out[k] = obj[k];
    return out;
  }
  function reducedMotion() {
    var root = document.documentElement;
    if (root && root.getAttribute('data-motion') === 'still') return true;
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  /* ---------- Icons ---------- */
  var ICON_PATHS = {
    preserved: ['M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18', 'M8 12.5L11 15.5L16.5 9'],
    obscured: ['M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18', 'M5 10H19M4 14H20', 'M12 6.5V7.5M12 16.5V17.5'],
    caution: ['M12 3L21 19.5H3Z', 'M12 9.5V13.5', 'M12 16.5V16.6'],
    cultivate: ['M12 21V11', 'M12 13C12 8 8 6 5 6C5 10 8 13 12 13', 'M12 11C12 7 15 4 19 4C19 8 16 11 12 11', 'M8 21H16'],
    seek: ['M10.5 4.5a6 6 0 1 0 0 12a6 6 0 1 0 0-12', 'M15 15L20 20', 'M7.5 9.5A3.2 3.2 0 0 1 10 7.3'],
    prune: ['M6.5 15a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5', 'M17.5 15a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5', 'M8.5 16L17 4', 'M15.5 16L7 4'],
    preserve: ['M9 3H15', 'M10 3V8L6.5 18A2.5 2.5 0 0 0 9 21H15A2.5 2.5 0 0 0 17.5 18L14 8V3', 'M8 14H16'],
    moon: ['M19 14.5A8 8 0 1 1 9.5 5A6.5 6.5 0 0 0 19 14.5Z'],
    close: ['M6.5 6.5L17.5 17.5M17.5 6.5L6.5 17.5'],
    arrow: ['M5 12H19', 'M13.5 6.5L19 12L13.5 17.5'],
    sparkle: ['M12 3C12.6 8.4 15.6 11.4 21 12C15.6 12.6 12.6 15.6 12 21C11.4 15.6 8.4 12.6 3 12C8.4 11.4 11.4 8.4 12 3Z'],
    leaf: ['M5 19C5 10 10 5 19 5C19 14 14 19 5 19Z', 'M5 19L13 11']
  };
  function Icon(props) {
    var paths = ICON_PATHS[props.name] || [];
    return h('svg', { className: cx('eg-icon', props.className), viewBox: '0 0 24 24', width: props.size || 20, height: props.size || 20, fill: 'none', stroke: 'currentColor', strokeWidth: 1.25, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true', focusable: 'false' },
      paths.map(function (d, i) { return h('path', { key: i, d: d }); }));
  }

  /* ---------- Motion helpers ---------- */
  function burst(target, opts) {
    opts = opts || {};
    if (!target || !target.getBoundingClientRect) return;
    var doc = target.ownerDocument || document;
    var win = doc.defaultView || window;
    var r = target.getBoundingClientRect();
    var x = opts.x != null ? opts.x : r.left + r.width / 2;
    var y = opts.y != null ? opts.y : r.top + r.height / 2;
    var layer = doc.createElement('span');
    layer.className = 'eg-burst';
    layer.setAttribute('aria-hidden', 'true');
    layer.style.left = (x + win.scrollX) + 'px';
    layer.style.top = (y + win.scrollY) + 'px';
    doc.body.appendChild(layer);
    var core = doc.createElement('span');
    core.className = 'eg-burst-core';
    layer.appendChild(core);
    if (reducedMotion() || !core.animate) {
      if (core.animate) core.animate([{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }], { duration: 900, easing: 'ease-out' });
      win.setTimeout(function () { layer.remove(); }, 950);
      return;
    }
    core.animate([{ opacity: 0, transform: 'translate(-50%,-50%) scale(0.2)' }, { opacity: 0.9, transform: 'translate(-50%,-50%) scale(1)', offset: 0.25 }, { opacity: 0, transform: 'translate(-50%,-50%) scale(1.6)' }], { duration: 700, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)', fill: 'forwards' });
    var n = opts.count || 16;
    var vw = win.innerWidth || 1280;
    var spread = opts.spread || (vw < 600 ? 48 : vw < 960 ? 64 : 76);
    for (var i = 0; i < n; i++) {
      var p = doc.createElement('span');
      var kind = i % 3 === 0 ? 'star' : 'dot';
      p.className = 'eg-spark eg-spark-' + kind + ' eg-spark-c' + ((i % 4) + 1);
      layer.appendChild(p);
      var a = (Math.PI * 2 * i / n) + (Math.random() - 0.5) * 0.7;
      var d = spread * (0.5 + Math.random() * 0.7);
      var dx = Math.cos(a) * d;
      var dy = Math.sin(a) * d - 8;
      var s = kind === 'star' ? 0.8 + Math.random() * 0.7 : 0.5 + Math.random() * 0.8;
      var rot = (Math.random() - 0.5) * 180;
      p.animate([
        { transform: 'translate(-50%,-50%) translate(0px,0px) scale(0) rotate(0deg)', opacity: 1 },
        { transform: 'translate(-50%,-50%) translate(' + (dx * 0.78) + 'px,' + (dy * 0.78) + 'px) scale(' + s + ') rotate(' + (rot * 0.6) + 'deg)', opacity: 1, offset: 0.4 },
        { transform: 'translate(-50%,-50%) translate(' + dx + 'px,' + (dy - 18) + 'px) scale(0) rotate(' + rot + 'deg)', opacity: 0 }
      ], { duration: 900 + Math.random() * 300, delay: Math.random() * 90, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)', fill: 'forwards' });
    }
    win.setTimeout(function () { layer.remove(); }, 1500);
  }

  function ripple(e) {
    if (reducedMotion()) return;
    var el = e.currentTarget;
    if (!el || !el.getBoundingClientRect) return;
    var r = el.getBoundingClientRect();
    var size = Math.max(r.width, r.height) * 2.2;
    var dot = el.ownerDocument.createElement('span');
    dot.className = 'eg-ripple';
    dot.setAttribute('aria-hidden', 'true');
    dot.style.width = dot.style.height = size + 'px';
    dot.style.left = ((e.clientX || r.left + r.width / 2) - r.left - size / 2) + 'px';
    dot.style.top = ((e.clientY || r.top + r.height / 2) - r.top - size / 2) + 'px';
    el.appendChild(dot);
    var anim = dot.animate([{ transform: 'scale(0)', opacity: 0.32 }, { transform: 'scale(1)', opacity: 0 }], { duration: 640, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)' });
    anim.onfinish = function () { dot.remove(); };
  }


  /* ---------- More whimsy: leaves, sprout, moth ---------- */
  function layerAt(doc, win, x, y) {
    var layer = doc.createElement('span');
    layer.className = 'eg-burst';
    layer.setAttribute('aria-hidden', 'true');
    layer.style.left = (x + win.scrollX) + 'px';
    layer.style.top = (y + win.scrollY) + 'px';
    doc.body.appendChild(layer);
    return layer;
  }
  function leafFall(target, opts) {
    opts = opts || {};
    if (!target || !target.getBoundingClientRect || reducedMotion()) return;
    var doc = target.ownerDocument || document, win = doc.defaultView || window;
    var r = target.getBoundingClientRect();
    var layer = layerAt(doc, win, r.left, r.top + r.height * 0.4);
    var n = opts.count || 9;
    for (var i = 0; i < n; i++) {
      var leaf = doc.createElement('span');
      leaf.className = 'eg-leaf eg-leaf-c' + ((i % 3) + 1);
      layer.appendChild(leaf);
      var x0 = r.width * (0.1 + 0.8 * Math.random());
      var fall = 90 + Math.random() * 80;
      var sway = 14 + Math.random() * 18;
      var rot = (Math.random() < 0.5 ? -1 : 1) * (120 + Math.random() * 160);
      leaf.style.left = x0 + 'px';
      leaf.animate([
        { transform: 'translate(0px, 0px) rotate(0deg) scale(0.6)', opacity: 0 },
        { transform: 'translate(' + sway + 'px, ' + (fall * 0.25) + 'px) rotate(' + (rot * 0.3) + 'deg) scale(1)', opacity: 1, offset: 0.2 },
        { transform: 'translate(' + (-sway) + 'px, ' + (fall * 0.55) + 'px) rotate(' + (rot * 0.6) + 'deg) scale(1)', opacity: 1, offset: 0.55 },
        { transform: 'translate(' + (sway * 0.6) + 'px, ' + fall + 'px) rotate(' + rot + 'deg) scale(0.9)', opacity: 0 }
      ], { duration: 1500 + Math.random() * 500, delay: i * 50, easing: 'cubic-bezier(0.45, 0, 0.55, 1)', fill: 'forwards' });
    }
    win.setTimeout(function () { layer.remove(); }, 2600);
  }
  function sprout(target) {
    if (!target || !target.getBoundingClientRect) return;
    var doc = target.ownerDocument || document, win = doc.defaultView || window;
    var r = target.getBoundingClientRect();
    var layer = layerAt(doc, win, r.left + r.width / 2, r.top);
    var wrap = doc.createElement('span');
    wrap.className = 'eg-sprout';
    wrap.innerHTML = '<svg viewBox="0 0 48 64" width="62" height="83" fill="none" stroke-linecap="round" stroke-linejoin="round"><path class="eg-sprout-stem" d="M24 62 C24 50 23 40 24 28"/><path class="eg-sprout-leaf l" d="M24 36 C16 36 10 30 9 22 C17 22 23 27 24 36 Z"/><path class="eg-sprout-leaf r" d="M24 30 C24 21 30 14 39 13 C39 22 33 29 24 30 Z"/><circle class="eg-sprout-bud" cx="24" cy="26" r="2.5"/></svg>';
    layer.appendChild(wrap);
    if (reducedMotion() || !wrap.animate) {
      win.setTimeout(function () { layer.remove(); }, 1200);
      return;
    }
    var stem = wrap.querySelector('.eg-sprout-stem');
    stem.animate([{ strokeDashoffset: 40 }, { strokeDashoffset: 0 }], { duration: 520, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)', fill: 'forwards' });
    wrap.querySelectorAll('.eg-sprout-leaf, .eg-sprout-bud').forEach(function (el, i) {
      el.animate([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], { duration: 480, delay: 380 + i * 110, easing: 'cubic-bezier(0.34, 1.4, 0.64, 1)', fill: 'both' });
    });
    wrap.animate([{ opacity: 1, transform: 'translate(-50%, -100%)' }, { opacity: 1, transform: 'translate(-50%, -104%)', offset: 0.7 }, { opacity: 0, transform: 'translate(-50%, -112%)' }], { duration: 1900, easing: 'ease-out', fill: 'forwards' });
    win.setTimeout(function () { burst(wrap, { count: 8, spread: 36, y: r.top - 44 }); }, 700);
    win.setTimeout(function () { layer.remove(); }, 2000);
  }
  function mothFlight(opts) {
    opts = opts || {};
    if (reducedMotion()) return;
    var doc = opts.document || document, win = doc.defaultView || window;
    var w = win.innerWidth, hgt = win.innerHeight;
    var moth = doc.createElement('span');
    moth.className = 'eg-moth';
    moth.setAttribute('aria-hidden', 'true');
    moth.innerHTML = '<svg viewBox="0 0 64 44" width="' + (opts.size || 44) + '"><g class="eg-moth-wing wl"><path d="M32 20 C24 4 6 2 3 12 C1 20 14 26 30 23 Z"/><path d="M31 25 C20 28 12 38 17 42 C22 45 29 36 31 27 Z"/></g><g class="eg-moth-wing wr"><path d="M32 20 C40 4 58 2 61 12 C63 20 50 26 34 23 Z"/><path d="M33 25 C44 28 52 38 47 42 C42 45 35 36 33 27 Z"/></g><path class="eg-moth-body" d="M32 14 C34 20 34 30 32 36 C30 30 30 20 32 14 Z"/></svg>';
    doc.body.appendChild(moth);
    var y0 = hgt * (0.55 + Math.random() * 0.3), y1 = hgt * (0.1 + Math.random() * 0.25);
    var pts = [];
    for (var i = 0; i <= 12; i++) {
      var t = i / 12;
      var x = -60 + (w + 120) * t;
      var y = y0 + (y1 - y0) * t + Math.sin(t * Math.PI * 3) * 40;
      pts.push({ transform: 'translate(' + x + 'px, ' + y + 'px) rotate(' + (Math.cos(t * Math.PI * 3) * 14 + 8) + 'deg)', offset: t });
    }
    var a = moth.animate(pts, { duration: opts.duration || 3400, easing: 'linear', fill: 'forwards' });
    a.onfinish = function () { moth.remove(); };
  }

  /* ---------- Checkbox (the bud) ---------- */
  function Checkbox(props) {
    var id = useId(props.id);
    var controlled = typeof props.checked === 'boolean';
    var st = React.useState(!!props.defaultChecked);
    var on = controlled ? props.checked : st[0];
    var boxRef = React.useRef(null);
    function change(e) {
      var next = e.target.checked;
      if (!controlled) st[1](next);
      if (next && props.bloom !== false && !reducedMotion()) {
        var petals = boxRef.current && boxRef.current.querySelectorAll('.eg-petal');
        if (petals) petals.forEach(function (p, i) {
          var a = i * 72;
          p.animate([{ transform: 'rotate(' + a + 'deg) translateY(0) scale(0)', opacity: 1 }, { transform: 'rotate(' + a + 'deg) translateY(-17px) scale(1)', opacity: 1, offset: 0.5 }, { transform: 'rotate(' + a + 'deg) translateY(-24px) scale(0.4)', opacity: 0 }], { duration: 760, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)' });
        });
      }
      if (props.onChange) props.onChange(next);
    }
    return h('label', { className: cx('eg-check', on && 'eg-check-on', props.disabled && 'eg-check-disabled', props.className), htmlFor: id },
      h('input', { type: 'checkbox', id: id, className: 'eg-check-input', checked: on, disabled: props.disabled, onChange: change }),
      h('span', { className: 'eg-check-box', ref: boxRef, 'aria-hidden': 'true' },
        [0, 1, 2, 3, 4].map(function (i) { return h('i', { key: i, className: 'eg-petal' }); }),
        h('svg', { viewBox: '0 0 24 24', width: 18, height: 18, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, h('path', { className: 'eg-check-mark', d: 'M6 12.5L10 16.5L18 8' }))),
      h('span', { className: 'eg-check-label' }, props.label, props.hint ? h('span', { className: 'eg-check-hint' }, props.hint) : null));
  }

  /* ---------- MoonPhase (a short-wait loader) ---------- */
  function MoonPhase(props) {
    var size = props.size || 40;
    return h('span', { className: cx('eg-moon', props.className), role: 'status', 'aria-label': props.a11yLabel || 'Loading' },
      h('span', { className: 'eg-moon-disc', style: { width: size + 'px', height: size + 'px' }, 'aria-hidden': 'true' }, h('span', { className: 'eg-moon-shade' })),
      props.label !== false ? h('span', { className: 'eg-moon-label', 'aria-hidden': 'true' }, props.label || 'Waxing') : null);
  }

  /* ---------- Pollen (pointer trail) ---------- */
  function Pollen(props) {
    var ref = React.useRef(null);
    React.useEffect(function () {
      var el = ref.current; if (!el || reducedMotion()) return;
      var last = 0, alive = 0;
      function move(e) {
        var now = Date.now(); if (now - last < 36 || alive > 24) return; last = now;
        var r = el.getBoundingClientRect();
        var p = el.ownerDocument.createElement('span');
        p.className = 'eg-pollen eg-spark-c' + (Math.random() < 0.6 ? 4 : 1);
        p.style.left = (e.clientX - r.left) + 'px'; p.style.top = (e.clientY - r.top) + 'px';
        el.appendChild(p); alive++;
        var dx = (Math.random() - 0.5) * 30, dy = -20 - Math.random() * 30;
        var a = p.animate([{ transform: 'translate(-50%, -50%) scale(1)', opacity: 0.9 }, { transform: 'translate(calc(-50% + ' + dx + 'px), calc(-50% + ' + dy + 'px)) scale(0.2)', opacity: 0 }], { duration: 900 + Math.random() * 400, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)' });
        a.onfinish = function () { p.remove(); alive--; };
      }
      el.addEventListener('pointermove', move);
      return function () { el.removeEventListener('pointermove', move); };
    }, []);
    return h('div', { ref: ref, className: cx('eg-pollen-field', props.className), style: props.style }, props.children);
  }

  /* ---------- Sparkle ---------- */
  function Sparkle(props) {
    var ref = React.useRef(null);
    var first = React.useRef(true);
    React.useEffect(function () {
      if (first.current) { first.current = false; if (!props.onMount) return; }
      burst(ref.current, { count: props.count, spread: props.spread });
    }, [props.trigger]);
    return h('span', { ref: ref, className: cx('eg-sparkle', props.className) }, props.children);
  }

  /* ---------- Fireflies ---------- */
  var FLY_PATHS = [
    [-38, -22, 24, -40, 44, 12, -12, 30], [30, -18, -26, -34, -44, 16, 20, 36], [-20, 34, 36, 18, 10, -40, -40, -8],
    [44, 20, -8, 40, -36, -20, 22, -36], [-44, 8, -6, -38, 38, -26, 16, 34], [12, -40, 40, 6, -18, 38, -40, -16],
    [-28, -36, 36, -12, 18, 40, -44, 20], [36, 34, -40, 10, -10, -42, 42, -20]
  ];
  var FLY_SPOTS = [[12, 28], [82, 18], [22, 72], [68, 66], [48, 14], [90, 58], [8, 52], [56, 86]];
  function Fireflies(props) {
    var count = Math.min(props.count || 7, 8);
    var flies = [];
    for (var i = 0; i < count; i++) {
      var p = FLY_PATHS[i], s = FLY_SPOTS[i];
      flies.push(h('span', { key: i, className: 'eg-firefly eg-spark-c' + (i % 2 === 0 ? 4 : (i % 3) + 1), style: {
        left: s[0] + '%', top: s[1] + '%',
        '--wx1': p[0] + 'px', '--wy1': p[1] + 'px', '--wx2': p[2] + 'px', '--wy2': p[3] + 'px', '--wx3': p[4] + 'px', '--wy3': p[5] + 'px', '--wx4': p[6] + 'px', '--wy4': p[7] + 'px',
        animationDelay: (-i * 1.3) + 's, ' + (-i * 0.7) + 's'
      } }));
    }
    return h('span', { className: cx('eg-fireflies', props.className), 'aria-hidden': 'true' }, flies);
  }

  /* ---------- Button ---------- */
  function Button(props) {
    var tone = props.tone === 'outline' ? 'frost' : (props.tone || 'frost');
    var rest = omit(props, ['tone', 'icon', 'className', 'children', 'sparkle', 'effect', 'onClick', 'onPointerDown', 'iconAfter', 'ornate']);
    var effect = props.effect || (props.sparkle ? 'sparkle' : null);
    return h('button', Object.assign({ type: 'button' }, rest, {
      className: cx('eg-btn', 'eg-btn-' + tone, props.ornate && 'eg-btn-ornate', props.className),
      onPointerDown: function (e) { if (tone !== 'quiet') ripple(e); if (props.onPointerDown) props.onPointerDown(e); },
      onClick: function (e) { var t = e.currentTarget; if (effect === 'sparkle') burst(t); if (effect === 'leaves') leafFall(t); if (effect === 'sprout') sprout(t); if (props.onClick) props.onClick(e); }
    }),
      props.ornate ? h('span', { className: 'eg-btn-orn l', 'aria-hidden': 'true' }) : null,
      props.icon ? h(Icon, { name: props.icon, size: 18 }) : null,
      props.children ? h('span', { className: 'eg-btn-label' }, props.children) : null,
      props.iconAfter ? h(Icon, { name: props.iconAfter, size: 18 }) : null,
      props.ornate ? h('span', { className: 'eg-btn-orn r', 'aria-hidden': 'true' }) : null);
  }

  /* ---------- Card ---------- */
  function Card(props) {
    var interactive = !!props.onClick || !!props.href;
    var El = props.href ? 'a' : (props.onClick ? 'button' : 'section');
    var cut = props.silhouette && props.silhouette !== 'soft' ? props.silhouette : null;
    var orn = props.ornament || 'none';
    var attrs = { className: cx('eg-card', interactive && 'eg-card-interactive', cut && 'eg-cut-' + cut, orn !== 'none' && 'eg-ornate', orn === 'gilded' && 'eg-ornate-gilded', props.className) };
    if (props.href) attrs.href = props.href;
    if (props.onClick) { attrs.onClick = props.onClick; attrs.type = 'button'; }
    var card = h(El, attrs,
      props.band ? h('span', { className: 'eg-band eg-band-' + props.band, 'aria-hidden': 'true' }) : null,
      props.gem ? h('span', { className: 'eg-card-gem', 'aria-hidden': 'true' }) : null,
      interactive && !props.gem ? h('span', { className: 'eg-card-twinkle', 'aria-hidden': 'true' }) : null,
      props.overline ? h('span', { className: 'eg-card-overline' }, props.overline) : null,
      props.title ? h(interactive ? 'span' : 'h' + (props.level || 3), { className: 'eg-card-title' }, props.title) : null,
      props.children ? h('span', { className: 'eg-card-body' }, props.children) : null,
      props.meta ? h('span', { className: 'eg-card-meta' }, props.meta) : null,
      interactive && props.cta ? h('span', { className: 'eg-card-cta' }, props.cta, h(Icon, { name: 'arrow', size: 16 })) : null);
    if (cut && cut !== 'arch') return h('span', { className: 'eg-cut-wrap', style: props.wrapStyle }, card);
    return card;
  }

  /* ---------- Tile (inventory slot) ---------- */
  function Tile(props) {
    var rank = props.rank || 'common';
    var band = rank === 'common' ? null : rank;
    var El = props.onClick ? 'button' : 'div';
    var pips = [];
    for (var i = 0; i < 5; i++) pips.push(h('i', { key: i, className: i < (props.pips || 0) ? 'on' : '' }));
    var tile = h(El, { type: props.onClick ? 'button' : undefined, onClick: props.onClick, className: cx('eg-tile', 'eg-cut-' + (props.silhouette || 'notch'), props.ornament !== false && 'eg-ornate eg-ornate-sm', props.className), style: band ? { '--band': 'var(--' + (band === 'flare' ? 'flare' : band === 'gold' ? 'gold' : band === 'moss' ? 'moss-text' : 'amethyst-text') + ')' } : undefined, 'aria-label': props.onClick ? props.a11yLabel || (props.label + (props.count != null ? ', ' + props.count : '')) : undefined },
      band ? h('span', { className: 'eg-band eg-band-' + band, 'aria-hidden': 'true' }) : null,
      props.count != null ? h('span', { className: 'eg-tile-count' }, props.count) : null,
      h('span', { className: 'eg-tile-icon', 'aria-hidden': 'true' }, h(Icon, { name: props.icon || 'leaf', size: 28 })),
      h('span', { className: 'eg-tile-label' }, props.label),
      props.sub ? h('span', { className: 'eg-tile-sub' }, props.sub) : null,
      props.pips != null ? h('span', { className: 'eg-tile-pips', role: 'img', 'aria-label': (props.pips || 0) + ' of 5' }, pips) : null);
    return h('span', { className: 'eg-cut-wrap', style: { display: 'inline-block' } }, tile);
  }

  /* ---------- Field ---------- */
  function Field(props) {
    var id = useId(props.id);
    var hintId = id + '-hint';
    var errId = id + '-err';
    var described = [props.hint ? hintId : null, props.error ? errId : null].filter(Boolean).join(' ') || undefined;
    var rest = omit(props, ['label', 'hint', 'error', 'multiline', 'className', 'id']);
    return h('div', { className: cx('eg-field', props.error && 'eg-field-error', props.className) },
      h('label', { className: 'eg-field-label', htmlFor: id }, props.label),
      props.hint ? h('span', { className: 'eg-field-hint', id: hintId }, props.hint) : null,
      h(props.multiline ? 'textarea' : 'input', Object.assign({}, rest, { id: id, className: 'eg-field-input', 'aria-describedby': described, 'aria-invalid': props.error ? 'true' : undefined })),
      props.error ? h('span', { className: 'eg-field-errtext', id: errId }, h(Icon, { name: 'obscured', size: 16 }), h('span', null, props.error)) : null);
  }

  /* ---------- Switch (the lantern) ---------- */
  function Switch(props) {
    var controlled = typeof props.checked === 'boolean';
    var st = React.useState(!!props.defaultChecked);
    var on = controlled ? props.checked : st[0];
    var id = useId(props.id);
    function toggle() {
      var next = !on;
      if (!controlled) st[1](next);
      if (props.onChange) props.onChange(next);
    }
    return h('div', { className: cx('eg-switch', on && 'eg-switch-on', props.className) },
      h('button', { type: 'button', role: 'switch', id: id, 'aria-checked': on ? 'true' : 'false', disabled: props.disabled, className: 'eg-switch-track', onClick: toggle },
        h('span', { className: 'eg-switch-knob', 'aria-hidden': 'true' })),
      h('label', { htmlFor: id, className: 'eg-switch-label' }, props.label,
        props.stateText !== false ? h('span', { className: 'eg-switch-state', 'aria-hidden': 'true' }, on ? (props.onText || 'On') : (props.offText || 'Off')) : null));
  }

  /* ---------- Tabs ---------- */
  function Tabs(props) {
    var items = props.items || [];
    var base = useId(props.id);
    var st = React.useState(props.defaultValue || (items[0] && items[0].id));
    var value = props.value != null ? props.value : st[0];
    var listRef = React.useRef(null);
    var markSt = React.useState({ left: 0, width: 0 });
    function select(id) { if (props.value == null) st[1](id); if (props.onChange) props.onChange(id); }
    React.useLayoutEffect(function () {
      var list = listRef.current; if (!list) return;
      var el = list.querySelector('[aria-selected="true"]');
      if (el) markSt[1]({ left: el.offsetLeft, width: el.offsetWidth });
    }, [value, items.length]);
    function onKey(e) {
      var idx = items.findIndex(function (t) { return t.id === value; });
      var next = null;
      if (e.key === 'ArrowRight') next = (idx + 1) % items.length;
      if (e.key === 'ArrowLeft') next = (idx - 1 + items.length) % items.length;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = items.length - 1;
      if (next === null) return;
      e.preventDefault();
      select(items[next].id);
      var btn = listRef.current && listRef.current.querySelectorAll('[role="tab"]')[next];
      if (btn) btn.focus();
    }
    var current = items.find(function (t) { return t.id === value; });
    return h('div', { className: cx('eg-tabs', props.className) },
      h('div', { className: 'eg-tabs-list', role: 'tablist', 'aria-label': props.label, ref: listRef, onKeyDown: onKey },
        items.map(function (t) {
          var sel = t.id === value;
          return h('button', { key: t.id, type: 'button', role: 'tab', id: base + '-tab-' + t.id, 'aria-selected': sel ? 'true' : 'false', 'aria-controls': base + '-panel', tabIndex: sel ? 0 : -1, className: 'eg-tab', onClick: function () { select(t.id); } },
            t.label, t.count != null ? h('span', { className: 'eg-tab-count' }, t.count) : null);
        }),
        h('span', { className: 'eg-tabs-mark', 'aria-hidden': 'true', style: { transform: 'translateX(' + markSt[0].left + 'px)', width: markSt[0].width + 'px' } })),
      current && current.content != null ? h('div', { className: 'eg-tabs-panel', role: 'tabpanel', id: base + '-panel', 'aria-labelledby': base + '-tab-' + current.id, key: current.id, tabIndex: 0 }, current.content) : null);
  }

  /* ---------- Tag ---------- */
  function Tag(props) {
    return h('span', { className: cx('eg-tag', 'eg-tag-' + (props.tone || 'neutral'), props.className) },
      props.icon ? h(Icon, { name: props.icon, size: 14 }) : null, props.children);
  }

  /* ---------- Notice ---------- */
  var NOTICE_ICON = { preserved: 'preserved', obscured: 'obscured', caution: 'caution' };
  function Notice(props) {
    var tone = props.tone || 'preserved';
    var iconRef = React.useRef(null);
    React.useEffect(function () {
      if (props.celebrate && tone === 'preserved') burst(iconRef.current, { count: 12, spread: 56 });
    }, []);
    return h('div', { className: cx('eg-notice', 'eg-notice-' + tone, props.className), role: tone === 'obscured' && props.urgent ? 'alert' : 'status' },
      h('span', { ref: iconRef, className: 'eg-notice-icon' }, h(Icon, { name: NOTICE_ICON[tone], size: 20 })),
      h('div', { className: 'eg-notice-text' },
        props.title ? h('p', { className: 'eg-notice-title' }, props.title) : null,
        props.children ? h('p', { className: 'eg-notice-body' }, props.children) : null),
      props.action || null);
  }

  /* ---------- Toast ---------- */
  function Toast(props) {
    var tone = props.tone || 'preserved';
    var iconRef = React.useRef(null);
    React.useEffect(function () {
      if (tone === 'preserved' && props.celebrate !== false) {
        var t = window.setTimeout(function () { burst(iconRef.current, { count: 16 }); }, 180);
        return function () { window.clearTimeout(t); };
      }
    }, []);
    return h('div', { className: cx('eg-toast', 'eg-toast-' + tone, props.className), role: tone === 'obscured' ? 'alert' : 'status' },
      h('span', { ref: iconRef, className: 'eg-toast-icon' }, h(Icon, { name: NOTICE_ICON[tone] || 'preserved', size: 22 })),
      h('div', { className: 'eg-toast-text' },
        h('p', { className: 'eg-toast-title' }, props.title),
        props.children ? h('p', { className: 'eg-toast-body' }, props.children) : null),
      props.onClose ? h('button', { type: 'button', className: 'eg-toast-close', 'aria-label': 'Dismiss notification', onClick: props.onClose }, h(Icon, { name: 'close', size: 18 })) : null);
  }

  /* ---------- EmptyState ---------- */
  function EmptyState(props) {
    return h('section', { className: cx('eg-empty', props.className) },
      props.fireflies !== false ? h(Fireflies, { count: props.fireflies || 7 }) : null,
      props.art ? h('img', { className: 'eg-empty-art', src: props.art, alt: '', 'aria-hidden': 'true' }) : null,
      h('h3', { className: 'eg-empty-title' }, props.title || 'An empty clearing.'),
      props.children ? h('p', { className: 'eg-empty-body' }, props.children) : null,
      props.action || null);
  }

  /* ---------- Gathering ---------- */
  function Gathering(props) {
    var label = props.label || 'Gathering';
    var hasValue = typeof props.value === 'number';
    var done = hasValue && props.value >= 100;
    var ref = React.useRef(null);
    var was = React.useRef(done);
    React.useEffect(function () {
      if (done && !was.current && props.celebrate !== false) burst(ref.current, { count: 14, spread: 60 });
      was.current = done;
    }, [done]);
    return h('div', { className: cx('eg-gathering', done && 'eg-gathering-done', props.className), role: 'progressbar', 'aria-label': props.a11yLabel || 'Loading', 'aria-valuemin': hasValue ? 0 : undefined, 'aria-valuemax': hasValue ? 100 : undefined, 'aria-valuenow': hasValue ? Math.round(props.value) : undefined },
      h('p', { className: 'eg-gathering-label' }, done ? (props.doneLabel || 'Formulated') : label, done ? null : h('span', { className: 'eg-gathering-dots', 'aria-hidden': 'true' }, h('i', null, '.'), h('i', null, '.'), h('i', null, '.'))),
      h('div', { className: 'eg-gathering-track' },
        h('div', { className: cx('eg-gathering-clip', !hasValue && 'eg-gathering-clip-flow') },
          h('div', { className: cx('eg-gathering-trail', !hasValue && 'eg-gathering-indeterminate'), style: hasValue ? { width: Math.min(100, props.value) + '%' } : undefined },
            h('span', { className: 'eg-gathering-tip', ref: ref, 'aria-hidden': 'true' }))),
        !hasValue ? h('span', { className: 'eg-spores', 'aria-hidden': 'true' }, h('i'), h('i'), h('i')) : null),
      props.detail ? h('p', { className: 'eg-gathering-detail' }, props.detail) : null);
  }

  window.Grove = Object.assign(window.Grove || {}, {
    Button: Button, Card: Card, Field: Field, Switch: Switch, Tabs: Tabs, Tag: Tag, Notice: Notice, Toast: Toast,
    EmptyState: EmptyState, Gathering: Gathering, Sparkle: Sparkle, Fireflies: Fireflies, Icon: Icon,
    Checkbox: Checkbox, MoonPhase: MoonPhase, Pollen: Pollen, Tile: Tile,
    burst: burst, ripple: ripple, leafFall: leafFall, sprout: sprout, mothFlight: mothFlight
  });
})();
```

## Appendix D. TypeScript definitions

```ts
import type * as React from 'react';
export type IconName = 'cultivate' | 'seek' | 'prune' | 'preserve' | 'preserved' | 'obscured' | 'caution' | 'moon' | 'close' | 'arrow' | 'sparkle' | 'leaf';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { tone?: 'seal' | 'frost' | 'quiet' | 'outline'; icon?: IconName; iconAfter?: IconName; effect?: 'sparkle' | 'sprout' | 'leaves'; ornate?: boolean; sparkle?: boolean }
export declare function Button(props: ButtonProps): React.ReactElement;
export interface CardProps { title?: React.ReactNode; overline?: string; meta?: React.ReactNode; cta?: React.ReactNode; silhouette?: 'soft' | 'notch' | 'scoop' | 'arch' | 'ticket' | 'banner'; ornament?: 'none' | 'corners' | 'gilded'; band?: 'flare' | 'gold' | 'moss' | 'amethyst' | 'dew'; gem?: boolean; href?: string; onClick?: () => void; level?: 2 | 3 | 4; className?: string; children?: React.ReactNode }
export declare function Card(props: CardProps): React.ReactElement;
export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> { label: React.ReactNode; hint?: React.ReactNode; error?: React.ReactNode; multiline?: boolean }
export declare function Field(props: FieldProps): React.ReactElement;
export interface SwitchProps { label: React.ReactNode; checked?: boolean; defaultChecked?: boolean; onChange?: (next: boolean) => void; onText?: string; offText?: string; stateText?: boolean; disabled?: boolean; id?: string; className?: string }
export declare function Switch(props: SwitchProps): React.ReactElement;
export interface TabItem { id: string; label: React.ReactNode; count?: number; content?: React.ReactNode }
export interface TabsProps { items: TabItem[]; label: string; value?: string; defaultValue?: string; onChange?: (id: string) => void; className?: string }
export declare function Tabs(props: TabsProps): React.ReactElement;
export interface TagProps { tone?: 'neutral' | 'amethyst' | 'flare' | 'moss' | 'lumen' | 'dew' | 'thorn'; icon?: IconName; children?: React.ReactNode }
export declare function Tag(props: TagProps): React.ReactElement;
export interface NoticeProps { tone?: 'preserved' | 'obscured' | 'caution'; title?: React.ReactNode; action?: React.ReactNode; urgent?: boolean; celebrate?: boolean; children?: React.ReactNode }
export declare function Notice(props: NoticeProps): React.ReactElement;
export interface ToastProps { tone?: 'preserved' | 'obscured' | 'caution'; title: React.ReactNode; onClose?: () => void; celebrate?: boolean; children?: React.ReactNode }
export declare function Toast(props: ToastProps): React.ReactElement;
export interface EmptyStateProps { title?: React.ReactNode; art?: string; action?: React.ReactNode; fireflies?: number | false; children?: React.ReactNode }
export declare function EmptyState(props: EmptyStateProps): React.ReactElement;
export interface GatheringProps { label?: string; a11yLabel?: string; value?: number; detail?: React.ReactNode; doneLabel?: string; celebrate?: boolean }
export declare function Gathering(props: GatheringProps): React.ReactElement;
export interface SparkleProps { trigger?: unknown; onMount?: boolean; count?: number; spread?: number; className?: string; children?: React.ReactNode }
export declare function Sparkle(props: SparkleProps): React.ReactElement;
export interface FirefliesProps { count?: number; className?: string }
export declare function Fireflies(props: FirefliesProps): React.ReactElement;
export interface TileProps { label: React.ReactNode; icon?: IconName; sub?: React.ReactNode; pips?: number; count?: number; rank?: 'common' | 'flare' | 'gold' | 'moss' | 'amethyst'; silhouette?: 'notch' | 'gem' | 'scoop'; ornament?: boolean; onClick?: () => void; a11yLabel?: string; className?: string }
export declare function Tile(props: TileProps): React.ReactElement;
export interface CheckboxProps { label: React.ReactNode; hint?: React.ReactNode; checked?: boolean; defaultChecked?: boolean; onChange?: (next: boolean) => void; bloom?: boolean; disabled?: boolean; id?: string; className?: string }
export declare function Checkbox(props: CheckboxProps): React.ReactElement;
export interface MoonPhaseProps { size?: number; label?: string | false; a11yLabel?: string; className?: string }
export declare function MoonPhase(props: MoonPhaseProps): React.ReactElement;
export interface PollenProps { className?: string; style?: React.CSSProperties; children?: React.ReactNode }
export declare function Pollen(props: PollenProps): React.ReactElement;
export interface IconProps { name: IconName; size?: number; className?: string }
export declare function Icon(props: IconProps): React.ReactElement;
export interface BurstOptions { count?: number; spread?: number; x?: number; y?: number }
export declare function burst(target: Element, options?: BurstOptions): void;
export declare function leafFall(target: Element, options?: { count?: number }): void;
export declare function sprout(target: Element): void;
export declare function mothFlight(options?: { size?: number; duration?: number }): void;
export declare function ripple(event: { currentTarget: Element; clientX?: number; clientY?: number }): void;
declare global { interface Window { Grove: { Button: typeof Button; Card: typeof Card; Field: typeof Field; Switch: typeof Switch; Tabs: typeof Tabs; Tag: typeof Tag; Notice: typeof Notice; Toast: typeof Toast; EmptyState: typeof EmptyState; Gathering: typeof Gathering; Sparkle: typeof Sparkle; Fireflies: typeof Fireflies; Icon: typeof Icon; Checkbox: typeof Checkbox; MoonPhase: typeof MoonPhase; Pollen: typeof Pollen; Tile: typeof Tile; burst: typeof burst; ripple: typeof ripple; leafFall: typeof leafFall; sprout: typeof sprout; mothFlight: typeof mothFlight } } }
```

## Appendix E. Ornament, filigree and icon SVG sources

Filigree is drawn in `gilt` (#b8ae6a) at a 0.75px stroke; recolor to Oxford Navy (#102f5d) on light stock or Lichen (#b7ddb0) on Moss stock. Icons are drawn at 24px with a 1.25px stroke; set the stroke to a text token in product use.

**Ornaments · gilded-corner.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><defs><linearGradient id="g" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="64" y2="64"><stop offset="0" stop-color="#7a5a22"/><stop offset="0.35" stop-color="#f7e6ad"/><stop offset="0.6" stop-color="#d4b062"/><stop offset="0.8" stop-color="#f7e6ad"/><stop offset="1" stop-color="#7a5a22"/></linearGradient></defs><g><g fill="none" stroke="url(#g)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 62 L5 22 Q5 5 22 5 L62 5"/><path d="M11 50 L11 26 Q11 11 26 11 L50 11"/><path d="M58 5 L58.68 5.12 L59.33 5.31 L59.95 5.58 L60.53 5.91 L61.05 6.3 L61.52 6.75 L61.93 7.23 L62.27 7.76 L62.54 8.31 L62.75 8.88 L62.89 9.47 L62.95 10.06 L62.95 10.64 L62.88 11.2 L62.74 11.75 L62.55 12.27 L62.3 12.75 L62 13.2 L61.65 13.6 L61.27 13.94 L60.86 14.24 L60.42 14.48 L59.97 14.67 L59.5 14.79 L59.04 14.86 L58.57 14.88 L58.12 14.84 L57.69 14.75 L57.27 14.61 L56.89 14.42 L56.53 14.2 L56.22 13.94 L55.94 13.65 L55.71 13.34 L55.51 13.01 L55.37 12.67 L55.26 12.32 L55.2 11.97 L55.19 11.63 L55.22 11.29 L55.28 10.97 L55.38 10.67 L55.51 10.39 L55.68 10.14 L55.86 9.91 L56.07 9.72 L56.29 9.55 L56.52 9.43 L56.76 9.33 L57 9.27 L57.24 9.24 L57.47 9.24 L57.69 9.27 L57.89 9.32 L58.08 9.4 L58.25 9.5 L58.4 9.62 L58.53 9.75 L58.63 9.88 L58.71 10.03"/><path d="M5 58 L5.12 58.68 L5.31 59.33 L5.58 59.95 L5.91 60.53 L6.3 61.05 L6.75 61.52 L7.23 61.93 L7.76 62.27 L8.31 62.54 L8.88 62.75 L9.47 62.89 L10.06 62.95 L10.64 62.95 L11.2 62.88 L11.75 62.74 L12.27 62.55 L12.75 62.3 L13.2 62 L13.6 61.65 L13.94 61.27 L14.24 60.86 L14.48 60.42 L14.67 59.97 L14.79 59.5 L14.86 59.04 L14.88 58.57 L14.84 58.12 L14.75 57.69 L14.61 57.27 L14.42 56.89 L14.2 56.53 L13.94 56.22 L13.65 55.94 L13.34 55.71 L13.01 55.51 L12.67 55.37 L12.32 55.26 L11.97 55.2 L11.63 55.19 L11.29 55.22 L10.97 55.28 L10.67 55.38 L10.39 55.51 L10.14 55.68 L9.91 55.86 L9.72 56.07 L9.55 56.29 L9.43 56.52 L9.33 56.76 L9.27 57 L9.24 57.24 L9.24 57.47 L9.27 57.69 L9.32 57.89 L9.4 58.08 L9.5 58.25 L9.62 58.4 L9.75 58.53 L9.88 58.63 L10.03 58.71"/><path d="M11 26 C16 22 22 18 26 22 C30 26 25 32 21 29 C18 27 20 23 23 24"/><path d="M26 11 C22 16 18 22 22 26"/><path d="M30 11 C34 18 42 18 44 13"/><path d="M11 30 C18 34 18 42 13 44"/></g><g fill="url(#g)"><path d="M36 5 Q39.28 8.53 44.72 7.24 Q40.57 3.49 36 5 Z"/><path d="M5 36 Q3.49 40.57 7.24 44.72 Q8.53 39.28 5 36 Z"/><path d="M5 1.8 L8.2 5 L5 8.2 L1.8 5 Z"/><path d="M48 5 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0"/><path d="M5 48 m-1.8 0 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0"/><path d="M24 21.8 L26.2 24 L24 26.2 L21.8 24 Z"/></g></g></svg>
```

**Ornaments · gilded-crest.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 32" width="140" height="32"><defs><linearGradient id="g" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="140" y2="32"><stop offset="0" stop-color="#7a5a22"/><stop offset="0.35" stop-color="#f7e6ad"/><stop offset="0.6" stop-color="#d4b062"/><stop offset="0.8" stop-color="#f7e6ad"/><stop offset="1" stop-color="#7a5a22"/></linearGradient></defs><g><g fill="none" stroke="url(#g)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M70 3.5 L82.5 16 L70 28.5 L57.5 16 Z"/><path d="M83 16 C92 8 104 8 110 16"/><path d="M110 16 C116 24 128 23 130 16"/><path d="M128.76 15.55 L128.83 15.03 L128.84 14.51 L128.8 14 L128.71 13.51 L128.56 13.03 L128.37 12.58 L128.14 12.16 L127.87 11.77 L127.56 11.41 L127.22 11.1 L126.85 10.83 L126.47 10.6 L126.07 10.42 L125.65 10.28 L125.24 10.2 L124.82 10.15 L124.4 10.15 L124 10.2 L123.61 10.29 L123.24 10.41 L122.89 10.58 L122.56 10.77 L122.27 11 L122 11.25 L121.77 11.52 L121.57 11.81 L121.41 12.12 L121.29 12.43 L121.2 12.75 L121.15 13.07 L121.13 13.39 L121.15 13.7 L121.2 14 L121.28 14.29 L121.39 14.55 L121.53 14.8 L121.69 15.03 L121.86 15.23 L122.06 15.41 L122.27 15.56 L122.48 15.68 L122.71 15.78 L122.93 15.85 L123.16 15.89 L123.38 15.9 L123.6 15.89 L123.8 15.86 L124 15.8 L124.18 15.72 L124.35 15.63 L124.49 15.52 L124.62 15.4 L124.73 15.27 L124.82 15.13 L124.89 14.99 L124.94 14.85 L124.97 14.71 L124.98 14.57 L124.97 14.43 L124.95 14.31"/><path d="M83 18 C90 25 98 25 101 21"/><path d="M57 16 C48 8 36 8 30 16"/><path d="M30 16 C24 24 12 23 10 16"/><path d="M11.24 15.55 L11.17 15.03 L11.16 14.51 L11.2 14 L11.29 13.51 L11.44 13.03 L11.63 12.58 L11.86 12.16 L12.13 11.77 L12.44 11.41 L12.78 11.1 L13.15 10.83 L13.53 10.6 L13.93 10.42 L14.35 10.28 L14.76 10.2 L15.18 10.15 L15.6 10.15 L16 10.2 L16.39 10.29 L16.76 10.41 L17.11 10.58 L17.44 10.77 L17.73 11 L18 11.25 L18.23 11.52 L18.43 11.81 L18.59 12.12 L18.71 12.43 L18.8 12.75 L18.85 13.07 L18.87 13.39 L18.85 13.7 L18.8 14 L18.72 14.29 L18.61 14.55 L18.47 14.8 L18.31 15.03 L18.14 15.23 L17.94 15.41 L17.73 15.56 L17.52 15.68 L17.29 15.78 L17.07 15.85 L16.84 15.89 L16.62 15.9 L16.4 15.89 L16.2 15.86 L16 15.8 L15.82 15.72 L15.65 15.63 L15.51 15.52 L15.38 15.4 L15.27 15.27 L15.18 15.13 L15.11 14.99 L15.06 14.85 L15.03 14.71 L15.02 14.57 L15.03 14.43 L15.05 14.31"/><path d="M57 18 C50 25 42 25 39 21"/></g><g fill="url(#g)"><path d="M70 7 L79 16 L70 25 L61 16 Z"/><path d="M101 10.5 Q105.21 10.7 108.02 6.66 Q103.1 6.84 101 10.5 Z"/><path d="M138 16 m-1.6 0 a1.6 1.6 0 1 0 3.2 0 a1.6 1.6 0 1 0 -3.2 0"/><path d="M39 10.5 Q36.9 6.84 31.98 6.66 Q34.79 10.7 39 10.5 Z"/><path d="M2 16 m-1.6 0 a1.6 1.6 0 1 0 3.2 0 a1.6 1.6 0 1 0 -3.2 0"/></g></g><path d="M70 9.5 L76.5 16 L70 22.5 L63.5 16 Z" fill="#ff5fbc"/></svg>
```

**Ornaments · gilded-divider.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 16" width="180" height="16"><defs><linearGradient id="g" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="180" y2="16"><stop offset="0" stop-color="#7a5a22"/><stop offset="0.35" stop-color="#f7e6ad"/><stop offset="0.6" stop-color="#d4b062"/><stop offset="0.8" stop-color="#f7e6ad"/><stop offset="1" stop-color="#7a5a22"/></linearGradient></defs><g><g fill="none" stroke="url(#g)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M97 8 L152 8"/><path d="M152 8 L152.07 7.59 L152.19 7.19 L152.35 6.81 L152.54 6.46 L152.77 6.13 L153.02 5.84 L153.3 5.57 L153.61 5.34 L153.93 5.15 L154.27 5 L154.61 4.88 L154.96 4.8 L155.31 4.77 L155.66 4.76 L156 4.8 L156.33 4.87 L156.64 4.97 L156.94 5.11 L157.21 5.27 L157.47 5.46 L157.69 5.67 L157.89 5.9 L158.06 6.14 L158.2 6.4 L158.31 6.67 L158.39 6.94 L158.43 7.21 L158.45 7.48 L158.44 7.74 L158.4 8 L158.33 8.25 L158.24 8.48 L158.13 8.69 L158 8.89 L157.85 9.07 L157.68 9.22 L157.51 9.36 L157.32 9.47 L157.13 9.55 L156.93 9.62 L156.74 9.66 L156.54 9.67 L156.35 9.67 L156.17 9.64 L156 9.6 L155.84 9.54 L155.69 9.46 L155.56 9.37 L155.44 9.27 L155.33 9.15 L155.25 9.04 L155.18 8.91 L155.13 8.79 L155.09 8.66 L155.08 8.53 L155.07 8.41 L155.09 8.3 L155.11 8.19 L155.15 8.09 L155.2 8"/><path d="M83 8 L28 8"/><path d="M28 8 L27.93 7.59 L27.81 7.19 L27.65 6.81 L27.46 6.46 L27.23 6.13 L26.98 5.84 L26.7 5.57 L26.39 5.34 L26.07 5.15 L25.73 5 L25.39 4.88 L25.04 4.8 L24.69 4.77 L24.34 4.76 L24 4.8 L23.67 4.87 L23.36 4.97 L23.06 5.11 L22.79 5.27 L22.53 5.46 L22.31 5.67 L22.11 5.9 L21.94 6.14 L21.8 6.4 L21.69 6.67 L21.61 6.94 L21.57 7.21 L21.55 7.48 L21.56 7.74 L21.6 8 L21.67 8.25 L21.76 8.48 L21.87 8.69 L22 8.89 L22.15 9.07 L22.32 9.22 L22.49 9.36 L22.68 9.47 L22.87 9.55 L23.07 9.62 L23.26 9.66 L23.46 9.67 L23.65 9.67 L23.83 9.64 L24 9.6 L24.16 9.54 L24.31 9.46 L24.44 9.37 L24.56 9.27 L24.67 9.15 L24.75 9.04 L24.82 8.91 L24.87 8.79 L24.91 8.66 L24.92 8.53 L24.93 8.41 L24.91 8.3 L24.89 8.19 L24.85 8.09 L24.8 8"/></g><g fill="url(#g)"><path d="M90 4 L94 8 L90 12 L86 8 Z"/><path d="M170 8 m-1.4 0 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0"/><path d="M10 8 m-1.4 0 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0"/></g></g></svg>
```

**Filigree · constellation-bloom.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" width="320" height="320" fill="none" stroke="#b8ae6a" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round">
<path d="M160 160 Q133.9 106.0 160.0 50.0 Q186.1 106.0 160 160"/>
<path d="M160 160 Q193.7 110.4 255.3 105.0 Q219.8 155.6 160 160"/>
<path d="M160 160 Q219.8 164.4 255.3 215.0 Q193.7 209.6 160 160"/>
<path d="M160 160 Q186.1 214.0 160.0 270.0 Q133.9 214.0 160 160"/>
<path d="M160 160 Q126.3 209.6 64.7 215.0 Q100.2 164.4 160 160"/>
<path d="M160 160 Q100.2 155.6 64.7 105.0 Q126.3 110.4 160 160"/>
<path d="M160.0 50.0 L255.3 105.0 L255.3 215.0 L160.0 270.0 L64.7 215.0 L64.7 105.0 L160.0 50.0" stroke-dasharray="2 5"/>
<circle cx="160.0" cy="50.0" r="3.5"/><path d="M151.0 50.0 L169.0 50.0 M160.0 41.0 L160.0 59.0"/>
<circle cx="255.3" cy="105.0" r="3.5"/><path d="M246.3 105.0 L264.3 105.0 M255.3 96.0 L255.3 114.0"/>
<circle cx="255.3" cy="215.0" r="3.5"/><path d="M246.3 215.0 L264.3 215.0 M255.3 206.0 L255.3 224.0"/>
<circle cx="160.0" cy="270.0" r="3.5"/><path d="M151.0 270.0 L169.0 270.0 M160.0 261.0 L160.0 279.0"/>
<circle cx="64.7" cy="215.0" r="3.5"/><path d="M55.7 215.0 L73.7 215.0 M64.7 206.0 L64.7 224.0"/>
<circle cx="64.7" cy="105.0" r="3.5"/><path d="M55.7 105.0 L73.7 105.0 M64.7 96.0 L64.7 114.0"/>
<circle cx="160" cy="160" r="16"/><circle cx="160" cy="160" r="4"/>
<circle cx="186.0" cy="160.0" r="1.5"/>
<circle cx="182.5" cy="173.0" r="1.5"/>
<circle cx="173.0" cy="182.5" r="1.5"/>
<circle cx="160.0" cy="186.0" r="1.5"/>
<circle cx="147.0" cy="182.5" r="1.5"/>
<circle cx="137.5" cy="173.0" r="1.5"/>
<circle cx="134.0" cy="160.0" r="1.5"/>
<circle cx="137.5" cy="147.0" r="1.5"/>
<circle cx="147.0" cy="137.5" r="1.5"/>
<circle cx="160.0" cy="134.0" r="1.5"/>
<circle cx="173.0" cy="137.5" r="1.5"/>
<circle cx="182.5" cy="147.0" r="1.5"/>
</svg>
```

**Filigree · fern-frond.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 320" width="240" height="320" fill="none" stroke="#b8ae6a" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round">
<path d="M120.0 300.0 L120.3 297.7 L120.7 295.4 L121.0 293.1 L121.4 290.8 L121.7 288.5 L122.0 286.2 L122.4 283.9 L122.7 281.6 L123.0 279.3 L123.4 277.0 L123.7 274.7 L124.0 272.4 L124.4 270.1 L124.7 267.8 L125.0 265.5 L125.3 263.2 L125.6 260.9 L126.0 258.6 L126.3 256.3 L126.6 254.0 L126.9 251.7 L127.2 249.4 L127.5 247.1 L127.8 244.8 L128.1 242.5 L128.4 240.2 L128.6 237.9 L128.9 235.6 L129.2 233.3 L129.5 231.0 L129.7 228.7 L130.0 226.4 L130.3 224.1 L130.5 221.8 L130.7 219.5 L131.0 217.2 L131.2 214.9 L131.4 212.6 L131.7 210.3 L131.9 208.0 L132.1 205.7 L132.3 203.4 L132.5 201.1 L132.7 198.8 L132.9 196.5 L133.1 194.2 L133.2 191.9 L133.4 189.6 L133.5 187.3 L133.7 185.0 L133.8 182.7 L134.0 180.4 L134.1 178.1 L134.2 175.8 L134.3 173.5 L134.4 171.2 L134.5 168.9 L134.6 166.6 L134.7 164.3 L134.8 162.0 L134.8 159.7 L134.9 157.4 L134.9 155.1 L135.0 152.8 L135.0 150.5 L135.0 148.2 L135.0 145.9 L135.0 143.6 L135.0 141.3 L135.0 139.0 L135.0 136.7 L134.9 134.4 L134.9 132.1 L134.8 129.8 L134.8 127.5 L134.7 125.2 L134.6 122.9 L134.5 120.6 L134.4 118.3 L134.3 116.0 L134.2 113.7 L134.1 111.4 L133.9 109.1 L133.8 106.8 L133.6 104.5 L133.4 102.2 L133.3 99.9 L133.1 97.6 L132.9 95.3 L132.7 93.0 L132.4 90.7 L132.2 88.4 L132.0 86.1 L131.7 83.8 L131.4 81.5 L131.2 79.2 L130.9 76.9 L130.6 74.6 L130.3 72.3 L130.0 70.0"/>
<path d="M130.0 70.0 L130.7 68.8 L131.5 67.7 L132.3 66.8 L133.2 65.9 L134.1 65.2 L135.0 64.6 L135.9 64.1 L136.8 63.7 L137.7 63.5 L138.6 63.3 L139.5 63.1 L140.3 63.1 L141.1 63.1 L141.8 63.2 L142.5 63.4 L143.1 63.6 L143.7 63.9 L144.3 64.2 L144.8 64.5 L145.2 64.8 L145.6 65.2 L145.9 65.6 L146.2 66.0 L146.4 66.4 L146.6 66.8 L146.7 67.2 L146.8 67.5 L146.9 67.9 L146.9 68.3 L146.9 68.6 L146.9 68.9 L146.8 69.2 L146.8 69.5 L146.7 69.8 L146.5 70.0 L146.4 70.2 L146.3 70.4 L146.1 70.6 L145.9 70.8 L145.8 70.9 L145.6 71.0 L145.4 71.1 L145.3 71.2 L145.1 71.2 L144.9 71.2 L144.8 71.3 L144.6 71.3 L144.5 71.3 L144.4 71.2 L144.2 71.2 L144.1 71.2 L144.0 71.1 L143.9 71.1 L143.8 71.0 L143.8 70.9 L143.7 70.9 L143.6 70.8 L143.6 70.7 L143.5 70.7 L143.5 70.6 L143.5 70.5 L143.5 70.4 L143.4 70.4 L143.4 70.3 L143.4 70.2 L143.4 70.2 L143.5 70.1 L143.5 70.1 L143.5 70.0 L143.5 70.0 L143.5 70.0 L143.6 69.9 L143.6 69.9 L143.6 69.9 L143.7 69.8 L143.7 69.8 L143.7 69.8 L143.7 69.8 L143.8 69.8 L143.8 69.8 L143.8 69.8 L143.9 69.8 L143.9 69.8 L143.9 69.8 L143.9 69.8 L144.0 69.8 L144.0 69.8 L144.0 69.8 L144.0 69.8 L144.0 69.8 L144.0 69.8 L144.0 69.9 L144.1 69.9 L144.1 69.9 L144.1 69.9 L144.1 69.9 L144.1 69.9 L144.1 69.9 L144.1 69.9 L144.1 70.0 L144.1 70.0 L144.1 70.0 L144.1 70.0 L144.1 70.0 L144.1 70.0 L144.1 70.0 L144.1 70.0 L144.1 70.0 L144.0 70.0 L144.0 70.0 L144.0 70.0 L144.0 70.0 L144.0 70.0 L144.0 70.0 L144.0 70.0 L144.0 70.0 L144.0 70.0 L144.0 70.0 L144.0 70.0 L144.0 70.0 L144.0 70.0 L144.0 70.0 L144.0 70.0 L144.0 70.0 L144.0 70.0 L144.0 70.0 L144.0 70.0 L144.0 70.0 L144.0 70.0 L144.0 70.0 L144.0 70.0 L144.0 70.0 L144.0 70.0 L144.0 70.0 L144.0 70.0 L144.0 70.0 L144.0 70.0 L144.0 70.0 L144.0 70.0"/>
<path d="M121.4 290.8 Q152.2 290.0 180.8 274.0"/>
<path d="M121.4 290.8 Q92.0 281.2 69.3 257.6"/>
<path d="M123.4 277.0 Q152.6 276.2 179.5 261.0"/>
<path d="M123.4 277.0 Q95.6 268.0 74.0 245.8"/>
<path d="M125.3 263.2 Q152.8 262.3 178.2 247.8"/>
<path d="M125.3 263.2 Q99.1 254.9 78.6 234.1"/>
<path d="M127.2 249.4 Q153.0 248.3 176.7 234.5"/>
<path d="M127.2 249.4 Q102.5 241.8 83.1 222.4"/>
<path d="M128.9 235.6 Q153.1 234.3 175.1 221.2"/>
<path d="M128.9 235.6 Q105.8 228.7 87.5 210.8"/>
<path d="M130.5 221.8 Q152.9 220.3 173.3 207.9"/>
<path d="M130.5 221.8 Q108.9 215.7 91.6 199.2"/>
<path d="M131.9 208.0 Q152.6 206.3 171.2 194.5"/>
<path d="M131.9 208.0 Q111.8 202.6 95.6 187.6"/>
<path d="M133.1 194.2 Q152.1 192.4 169.0 181.2"/>
<path d="M133.1 194.2 Q114.5 189.6 99.4 176.0"/>
<path d="M134.0 180.4 Q151.3 178.4 166.5 167.9"/>
<path d="M134.0 180.4 Q117.0 176.5 103.0 164.4"/>
<path d="M134.6 166.6 Q150.2 164.5 163.8 154.7"/>
<path d="M134.6 166.6 Q119.2 163.4 106.3 152.7"/>
<path d="M135.0 152.8 Q148.9 150.6 160.8 141.6"/>
<path d="M135.0 152.8 Q121.1 150.2 109.4 141.0"/>
<path d="M135.0 139.0 Q147.2 136.8 157.5 128.6"/>
<path d="M135.0 139.0 Q122.8 137.0 112.3 129.1"/>
<path d="M134.7 125.2 Q145.2 123.0 154.0 115.7"/>
<path d="M134.7 125.2 Q124.1 123.8 114.8 117.1"/>
<path d="M134.1 111.4 Q142.9 109.3 150.1 103.0"/>
<path d="M134.1 111.4 Q125.1 110.4 117.1 105.0"/>
<path d="M133.1 97.6 Q140.2 95.7 145.9 90.4"/>
<path d="M133.1 97.6 Q125.7 97.0 119.2 92.8"/>
</svg>
```

**Filigree · moth-wing.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 280" width="320" height="280" fill="none" stroke="#b8ae6a" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round">
<path d="M160 120 C200 60 290 40 300 90 C306 124 250 150 166 150"/>
<path d="M166 152 C230 160 270 200 252 238 C238 262 190 238 164 190"/>
<path d="M170 128 Q225.0 60 280 72"/>
<path d="M170 136 Q229.0 92 288 104"/>
<path d="M170 144 Q213.0 126 256 138"/>
<path d="M168 160 Q216.0 177.0 244 214"/>
<path d="M166 170 Q199.0 193.0 212 236"/>
<circle cx="252" cy="100" r="12"/><circle cx="252" cy="100" r="5"/>
<path d="M163 112 C170 80 190 60 204 52"/>
<path d="M160 120 C120 60 30 40 20 90 C14 124 70 150 154 150"/>
<path d="M154 152 C90 160 50 200 68 238 C82 262 130 238 156 190"/>
<path d="M150 128 Q95.0 60 40 72"/>
<path d="M150 136 Q91.0 92 32 104"/>
<path d="M150 144 Q107.0 126 64 138"/>
<path d="M152 160 Q104.0 177.0 76 214"/>
<path d="M154 170 Q121.0 193.0 108 236"/>
<circle cx="68" cy="100" r="12"/><circle cx="68" cy="100" r="5"/>
<path d="M157 112 C150 80 130 60 116 52"/>
<path d="M160 112 C168 130 168 200 160 226 C152 200 152 130 160 112 Z"/>
</svg>
```

**Filigree · mycorrhizae.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 300" width="340" height="300" fill="none" stroke="#b8ae6a" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round">
<path d="M70.0 20.0 Q78.3 50.0 74.2 79.9"/>
<path d="M74.2 79.9 Q84.0 96.5 90.7 118.9"/>
<path d="M90.7 118.9 Q101.4 124.1 111.5 135.3"/>
<path d="M111.5 135.3 Q119.4 136.3 128.7 141.2"/>
<path d="M128.7 141.2 Q135.2 141.2 141.9 140.5"/>
<circle cx="141.9" cy="140.5" r="2"/>
<circle cx="141.9" cy="140.5" r="2"/>
<path d="M128.7 141.2 Q133.8 144.7 137.3 149.2"/>
<circle cx="137.3" cy="149.2" r="2"/>
<circle cx="137.3" cy="149.2" r="2"/>
<path d="M111.5 135.3 Q117.7 142.4 119.7 152.2"/>
<path d="M119.7 152.2 Q125.0 156.1 129.9 161.3"/>
<circle cx="129.9" cy="161.3" r="2"/>
<circle cx="129.9" cy="161.3" r="2"/>
<path d="M119.7 152.2 Q118.7 158.3 118.2 164.4"/>
<circle cx="118.2" cy="164.4" r="2"/>
<circle cx="118.2" cy="164.4" r="2"/>
<path d="M90.7 118.9 Q89.2 132.9 92.2 147.9"/>
<path d="M92.2 147.9 Q96.1 156.3 101.7 163.5"/>
<path d="M101.7 163.5 Q108.1 167.4 113.9 170.0"/>
<circle cx="113.9" cy="170.0" r="2"/>
<circle cx="113.9" cy="170.0" r="2"/>
<path d="M101.7 163.5 Q100.3 169.7 100.1 176.0"/>
<circle cx="100.1" cy="176.0" r="2"/>
<circle cx="100.1" cy="176.0" r="2"/>
<path d="M92.2 147.9 Q87.8 157.8 85.2 166.5"/>
<path d="M85.2 166.5 Q87.4 172.4 86.8 179.2"/>
<circle cx="86.8" cy="179.2" r="2"/>
<circle cx="86.8" cy="179.2" r="2"/>
<path d="M85.2 166.5 Q80.0 169.6 74.6 173.1"/>
<circle cx="74.6" cy="173.1" r="2"/>
<circle cx="74.6" cy="173.1" r="2"/>
<path d="M74.2 79.9 Q62.3 95.8 58.6 117.4"/>
<path d="M58.6 117.4 Q60.2 130.4 57.6 143.7"/>
<path d="M57.6 143.7 Q63.0 150.5 66.0 160.6"/>
<path d="M66.0 160.6 Q70.9 165.6 76.2 168.2"/>
<circle cx="76.2" cy="168.2" r="2"/>
<circle cx="76.2" cy="168.2" r="2"/>
<path d="M66.0 160.6 Q65.7 167.7 67.9 174.8"/>
<circle cx="67.9" cy="174.8" r="2"/>
<circle cx="67.9" cy="174.8" r="2"/>
<path d="M57.6 143.7 Q54.9 151.3 48.4 157.5"/>
<path d="M48.4 157.5 Q48.7 163.1 45.9 168.4"/>
<circle cx="45.9" cy="168.4" r="2"/>
<circle cx="45.9" cy="168.4" r="2"/>
<path d="M48.4 157.5 Q43.3 160.2 37.1 161.4"/>
<circle cx="37.1" cy="161.4" r="2"/>
<circle cx="37.1" cy="161.4" r="2"/>
<path d="M58.6 117.4 Q46.1 126.7 33.5 130.3"/>
<path d="M33.5 130.3 Q28.0 135.9 20.5 144.3"/>
<path d="M20.5 144.3 Q16.8 149.7 16.0 155.3"/>
<circle cx="16.0" cy="155.3" r="2"/>
<circle cx="16.0" cy="155.3" r="2"/>
<path d="M20.5 144.3 Q13.3 146.2 6.2 146.1"/>
<circle cx="6.2" cy="146.1" r="2"/>
<circle cx="6.2" cy="146.1" r="2"/>
<path d="M33.5 130.3 Q24.0 127.3 14.7 127.8"/>
<path d="M14.7 127.8 Q8.0 130.4 2.5 135.4"/>
<circle cx="2.5" cy="135.4" r="2"/>
<circle cx="2.5" cy="135.4" r="2"/>
<path d="M14.7 127.8 Q9.0 126.0 4.0 122.7"/>
<circle cx="4.0" cy="122.7" r="2"/>
<circle cx="4.0" cy="122.7" r="2"/>
<path d="M170.0 20.0 Q156.5 49.8 158.4 78.9"/>
<path d="M158.4 78.9 Q165.6 97.2 165.9 117.5"/>
<path d="M165.9 117.5 Q173.6 128.5 186.3 139.7"/>
<path d="M186.3 139.7 Q197.5 143.7 208.0 145.6"/>
<path d="M208.0 145.6 Q216.1 142.3 223.4 139.1"/>
<circle cx="223.4" cy="139.1" r="2"/>
<circle cx="223.4" cy="139.1" r="2"/>
<path d="M208.0 145.6 Q212.8 152.8 216.8 158.2"/>
<circle cx="216.8" cy="158.2" r="2"/>
<circle cx="216.8" cy="158.2" r="2"/>
<path d="M186.3 139.7 Q189.5 150.9 188.1 162.1"/>
<path d="M188.1 162.1 Q194.3 168.1 199.5 173.8"/>
<circle cx="199.5" cy="173.8" r="2"/>
<circle cx="199.5" cy="173.8" r="2"/>
<path d="M188.1 162.1 Q184.8 169.0 180.8 177.9"/>
<circle cx="180.8" cy="177.9" r="2"/>
<circle cx="180.8" cy="177.9" r="2"/>
<path d="M165.9 117.5 Q165.1 131.4 160.2 145.0"/>
<path d="M160.2 145.0 Q162.8 155.6 163.4 166.3"/>
<path d="M163.4 166.3 Q168.9 173.8 173.8 179.1"/>
<circle cx="173.8" cy="179.1" r="2"/>
<circle cx="173.8" cy="179.1" r="2"/>
<path d="M163.4 166.3 Q163.2 172.4 159.0 179.6"/>
<circle cx="159.0" cy="179.6" r="2"/>
<circle cx="159.0" cy="179.6" r="2"/>
<path d="M160.2 145.0 Q154.1 151.9 148.5 161.0"/>
<path d="M148.5 161.0 Q147.6 167.9 144.5 174.4"/>
<circle cx="144.5" cy="174.4" r="2"/>
<circle cx="144.5" cy="174.4" r="2"/>
<path d="M148.5 161.0 Q141.9 162.8 135.4 164.6"/>
<circle cx="135.4" cy="164.6" r="2"/>
<circle cx="135.4" cy="164.6" r="2"/>
<path d="M158.4 78.9 Q141.7 93.0 129.1 114.6"/>
<path d="M129.1 114.6 Q128.4 129.3 128.8 145.2"/>
<path d="M128.8 145.2 Q136.2 153.0 140.3 161.1"/>
<path d="M140.3 161.1 Q146.3 165.4 150.8 168.6"/>
<circle cx="150.8" cy="168.6" r="2"/>
<circle cx="150.8" cy="168.6" r="2"/>
<path d="M140.3 161.1 Q139.2 167.3 141.1 173.7"/>
<circle cx="141.1" cy="173.7" r="2"/>
<circle cx="141.1" cy="173.7" r="2"/>
<path d="M128.8 145.2 Q123.2 154.3 113.8 162.8"/>
<path d="M113.8 162.8 Q113.7 170.5 110.8 178.0"/>
<circle cx="110.8" cy="178.0" r="2"/>
<circle cx="110.8" cy="178.0" r="2"/>
<path d="M113.8 162.8 Q107.0 166.8 100.7 171.0"/>
<circle cx="100.7" cy="171.0" r="2"/>
<circle cx="100.7" cy="171.0" r="2"/>
<path d="M129.1 114.6 Q118.6 120.2 102.8 130.4"/>
<path d="M102.8 130.4 Q97.5 136.8 91.4 146.4"/>
<path d="M91.4 146.4 Q92.8 152.7 91.5 159.4"/>
<circle cx="91.5" cy="159.4" r="2"/>
<circle cx="91.5" cy="159.4" r="2"/>
<path d="M91.4 146.4 Q86.0 147.2 78.9 151.4"/>
<circle cx="78.9" cy="151.4" r="2"/>
<circle cx="78.9" cy="151.4" r="2"/>
<path d="M102.8 130.4 Q91.6 134.0 80.1 135.4"/>
<path d="M80.1 135.4 Q74.4 142.7 66.9 147.4"/>
<circle cx="66.9" cy="147.4" r="2"/>
<circle cx="66.9" cy="147.4" r="2"/>
<path d="M80.1 135.4 Q72.6 135.5 65.1 133.8"/>
<circle cx="65.1" cy="133.8" r="2"/>
<circle cx="65.1" cy="133.8" r="2"/>
<path d="M270.0 20.0 Q280.3 49.3 273.7 79.9"/>
<path d="M273.7 79.9 Q281.0 98.7 289.6 121.2"/>
<path d="M289.6 121.2 Q304.7 134.6 315.3 143.5"/>
<path d="M315.3 143.5 Q326.1 145.5 338.4 149.1"/>
<path d="M338.4 149.1 Q347.1 146.1 355.2 144.6"/>
<circle cx="355.2" cy="144.6" r="2"/>
<circle cx="355.2" cy="144.6" r="2"/>
<path d="M338.4 149.1 Q345.1 152.2 350.1 158.5"/>
<circle cx="350.1" cy="158.5" r="2"/>
<circle cx="350.1" cy="158.5" r="2"/>
<path d="M315.3 143.5 Q316.8 155.6 321.0 168.7"/>
<path d="M321.0 168.7 Q326.1 174.5 330.9 182.7"/>
<circle cx="330.9" cy="182.7" r="2"/>
<circle cx="330.9" cy="182.7" r="2"/>
<path d="M321.0 168.7 Q316.3 177.1 316.0 185.0"/>
<circle cx="316.0" cy="185.0" r="2"/>
<circle cx="316.0" cy="185.0" r="2"/>
<path d="M289.6 121.2 Q287.6 135.4 285.7 149.8"/>
<path d="M285.7 149.8 Q288.7 157.6 290.6 167.4"/>
<path d="M290.6 167.4 Q294.8 172.7 297.3 177.6"/>
<circle cx="297.3" cy="177.6" r="2"/>
<circle cx="297.3" cy="177.6" r="2"/>
<path d="M290.6 167.4 Q288.9 172.3 286.0 179.0"/>
<circle cx="286.0" cy="179.0" r="2"/>
<circle cx="286.0" cy="179.0" r="2"/>
<path d="M285.7 149.8 Q277.5 156.5 270.4 165.6"/>
<path d="M270.4 165.6 Q269.3 172.6 268.4 179.6"/>
<circle cx="268.4" cy="179.6" r="2"/>
<circle cx="268.4" cy="179.6" r="2"/>
<path d="M270.4 165.6 Q262.4 168.0 254.5 167.9"/>
<circle cx="254.5" cy="167.9" r="2"/>
<circle cx="254.5" cy="167.9" r="2"/>
<path d="M273.7 79.9 Q260.8 96.8 250.6 115.6"/>
<path d="M250.6 115.6 Q254.9 130.3 250.6 145.4"/>
<path d="M250.6 145.4 Q256.2 154.5 262.3 162.6"/>
<path d="M262.3 162.6 Q269.0 165.5 274.6 171.8"/>
<circle cx="274.6" cy="171.8" r="2"/>
<circle cx="274.6" cy="171.8" r="2"/>
<path d="M262.3 162.6 Q262.1 169.8 261.0 177.1"/>
<circle cx="261.0" cy="177.1" r="2"/>
<circle cx="261.0" cy="177.1" r="2"/>
<path d="M250.6 145.4 Q248.8 153.9 244.3 163.5"/>
<path d="M244.3 163.5 Q246.9 169.8 245.6 177.0"/>
<circle cx="245.6" cy="177.0" r="2"/>
<circle cx="245.6" cy="177.0" r="2"/>
<path d="M244.3 163.5 Q239.9 168.5 235.2 173.3"/>
<circle cx="235.2" cy="173.3" r="2"/>
<circle cx="235.2" cy="173.3" r="2"/>
<path d="M250.6 115.6 Q238.1 117.4 225.5 124.1"/>
<path d="M225.5 124.1 Q221.7 132.6 215.7 139.6"/>
<path d="M215.7 139.6 Q216.1 145.3 217.1 151.5"/>
<circle cx="217.1" cy="151.5" r="2"/>
<circle cx="217.1" cy="151.5" r="2"/>
<path d="M215.7 139.6 Q209.2 143.9 203.5 146.4"/>
<circle cx="203.5" cy="146.4" r="2"/>
<circle cx="203.5" cy="146.4" r="2"/>
<path d="M225.5 124.1 Q216.3 124.5 207.4 120.9"/>
<path d="M207.4 120.9 Q201.2 124.2 195.5 124.1"/>
<circle cx="195.5" cy="124.1" r="2"/>
<circle cx="195.5" cy="124.1" r="2"/>
<path d="M207.4 120.9 Q201.7 116.5 197.2 111.3"/>
<circle cx="197.2" cy="111.3" r="2"/>
<circle cx="197.2" cy="111.3" r="2"/>
<path d="M16 20 L324 20"/>
</svg>
```

**Icons · caution.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#6f9ceb" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">
<path d="M12 3 L21 19.5 H3 Z"/><path d="M12 9.5 V13.5"/><path d="M12 16.5 V16.6"/>
</svg>
```

**Icons · cultivate.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#6f9ceb" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">
<path d="M12 21 V11"/><path d="M12 13 C12 8 8 6 5 6 C5 10 8 13 12 13"/><path d="M12 11 C12 7 15 4 19 4 C19 8 16 11 12 11"/><path d="M8 21 H16"/>
</svg>
```

**Icons · moon.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#6f9ceb" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">
<path d="M19 14.5 A8 8 0 1 1 9.5 5 A6.5 6.5 0 0 0 19 14.5 Z"/>
</svg>
```

**Icons · obscured.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#6f9ceb" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">
<circle cx="12" cy="12" r="9"/><path d="M5 10 H19 M4 14 H20"/><path d="M12 6.5 V7.5 M12 16.5 V17.5"/>
</svg>
```

**Icons · preserve.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#6f9ceb" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">
<path d="M9 3 H15"/><path d="M10 3 V8 L6.5 18 A2.5 2.5 0 0 0 9 21 H15 A2.5 2.5 0 0 0 17.5 18 L14 8 V3"/><path d="M8 14 H16"/>
</svg>
```

**Icons · preserved.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#6f9ceb" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">
<circle cx="12" cy="12" r="9"/><path d="M8 12.5 L11 15.5 L16.5 9"/>
</svg>
```

**Icons · prune.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#6f9ceb" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">
<circle cx="6.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/><path d="M8.5 16 L17 4"/><path d="M15.5 16 L7 4"/>
</svg>
```

**Icons · seek.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#6f9ceb" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">
<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15 L20 20"/><path d="M7.5 9.5 A3.2 3.2 0 0 1 10 7.3"/>
</svg>
```

## Appendix F. Fonts

| Family | Role | Source | License |
| --- | --- | --- | --- |
| Cormorant (variable, roman and italic) | Display, close to Ogg Roman | Google Fonts or `@fontsource-variable/cormorant` | SIL Open Font License 1.1 |
| Mona Sans (variable, roman and italic) | Interface and reading text | Google Fonts, GitHub, or `@fontsource-variable/mona-sans` | SIL Open Font License 1.1 |
| DM Mono (400, 500) | Numbers, codes, specimens | Google Fonts or `@fontsource/dm-mono` | SIL Open Font License 1.1 |

Expected files: `fonts/Cormorant-Variable.woff2`, `fonts/Cormorant-Italic-Variable.woff2`, `fonts/MonaSans-Variable.woff2`, `fonts/MonaSans-Italic-Variable.woff2`, `fonts/DMMono-Regular.woff2`, `fonts/DMMono-Medium.woff2`.
