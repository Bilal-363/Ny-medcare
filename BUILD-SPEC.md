# NY MedCare — Master Build Prompt (single-page, light/clinical)

> **Reproduce all values verbatim. They are not approximations.**

Source of content: `https://nymedprime.pages.dev/` — **every string is scraped
and verbatim law. No copy is reworded, added, or removed. No section is added,
removed, or reordered.** Only the design, layout composition, motion and 3D
layer are new.

---

## 1 · IDENTITY

| field | value |
|---|---|
| Brand | NY MedCare |
| Niche | USCIS-designated civil surgeon · Form I-693 immigration medical exam · Manhattan, NY |
| Preset | **P7 ENAMEL** (light / clinical white) |
| Accent | **`#c41c1c` brand crimson** (taken from the supplied logo + the source site's `--red`), secondary `#2f7d78` teal |
| Scene | **PulseLine (#22)** — ECG trace, rendered light-safe as ink/crimson line art |
| Positioning | One exam appointment. Every lab and vaccine order written for you. A properly sealed Form I-693. |

Contact facts — all **as given by the source site**, nothing invented:

| fact | value |
|---|---|
| Phone | (917) 905-8140 · `tel:+19179058140` |
| Address | `ADDRESS_TBD, New York, NY` — **placeholder in the source; carried through verbatim** |
| Hours | Mon–Fri 9:00–5:00 · Sat 10:00–2:00 · Sun Closed |
| Physician | Dr. Huma Irshad, MD — USCIS-designated civil surgeon |
| Socials | Facebook / Instagram / Yelp / TikTok — the four source URLs, verbatim |

| page | file | `<title>` | `<meta description>` |
|---|---|---|---|
| Home (only page) | `index.html` | `USCIS Immigration Medical Exam (Form I-693) in Manhattan, NY \| NY MedCare` | source description, verbatim |

Head: `<html lang="en">`, charset, viewport, favicon (logo mark), canonical
`https://nymedprime.com/`, OG + Twitter tags, three JSON-LD blocks
(`MedicalClinic`, `FAQPage`, `HowTo`) copied verbatim from the source.

---

## 2 · ASSETS

### 2a · Asset table

| role | URL / source | notes |
|---|---|---|
| Logo mark (heart + cross) | `assets/img/logo-mark.png` / `.webp` — **user-supplied** `Logo Ny MedCare.jpeg` | background flood-filled to transparent so the enclosed white cross survives; 420px wide |
| Footer brand | reversed lockup: `logo-mark` + light HTML wordmark | the supplied logo's wordmark is dark crimson and disappears on the near-black footer, so the footer pairs the mark with `--void` type instead of an image |
| Hero photograph | `assets/img/clinic-exam-room.webp` (1376×768, 77KB) — **user-supplied** `Gemini_Generated_Image_…jpeg` | + `-sm.webp` 800px for mobile |
| Physician portrait | `assets/img/dr-irshad.webp` (620×774) | crop of the same photograph, left third |
| Fonts | `https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap` | display serif + clean sans, per P7 clinic |
| Three.js | importmap → `https://cdn.jsdelivr.net/npm/three@0.168.0/build/three.module.js` | |
| Map | `https://maps.google.com/maps?q=Manhattan%20New%20York%20NY&t=&z=13&ie=UTF8&iwloc=&output=embed` | source URL verbatim, `loading="lazy"` |
| Booking calendar | not connected — the source ships the same placeholder ("Connects on launch") | GHL loader `https://widgets.leadconnectorhq.com/loader.js` kept |

**Rung 1 of the ladder resolved every photographic need** — the user supplied
both images, so no generation and no stock was used.

### 2b · Asset-acquisition ladder (for any future re-run)

> Walk top to bottom, stop at the first rung that succeeds **per shot**.
> **Rung 1 — user URLs / files.** Use verbatim. *(This build: satisfied.)*
> **Rung 2 — a generation tool is connected.** Preflight the credit cost and
> report it before spending; generate the still first and pass it as a video's
> `start_image`; Read each result before wiring it.
> **Rung 3 — free-licence stock.** Unsplash/Pexels, size pinned, credited.
> **Rung 4 — build it in code.** The PulseLine system in §6.
> Never `placehold.co`, `picsum`, grey boxes, or scraped Google Images.

### 2c · Generation prompts (paste-ready, this niche, this palette)

**Image 1 — hero, exam room.**
> Editorial documentary photograph of a warm, bright American medical clinic
> consultation room. A woman physician in a white coat over navy scrubs, with a
> stethoscope, sits at a dark wood desk typing on a silver laptop and smiling at
> a seated adult patient across from her. Behind her, anatomy and "USCIS Medical
> Exams" wall charts; a nurse in blue scrubs adjusts a vitals monitor beside an
> exam table; a large window with soft green foliage outside. Natural daylight,
> soft shadows, warm off-white walls `#fbfaf7`, one crimson accent `#c41c1c` in
> the wall charts, teal-grey `#2f7d78` instrument detail. Shot on 35mm, f/2.8,
> shallow depth of field, no text overlay, no logos, 16:9.

**Image 2 — physician portrait.**
> Three-quarter portrait of a mid-career woman physician in a crisp white coat
> over navy scrubs with a stethoscope, seated at a desk in a bright clinic
> office, looking slightly off-camera with a calm, warm expression. Warm
> off-white `#fbfaf7` background wall, soft window light from the right, gentle
> falloff, crimson `#c41c1c` accent only in a small wall chart behind her.
> 85mm, f/2.0, natural skin tones, documentary not corporate stock, 4:5.

**Image 3 — sealed-form detail.**
> Overhead close-up still life on a warm off-white `#fbfaf7` desk surface: a
> sealed white official envelope with a crimson `#c41c1c` signature seal, a
> stack of printed medical forms, a fountain pen, and a folded pair of
> eyeglasses. Soft directional daylight from the upper left, long soft shadows,
> shallow depth of field, no readable text, no logos, 3:2.

**Video — 4 seconds.**
> 4-second static-tripod shot in a bright clinic consultation room: a woman
> physician in a white coat slides a sealed white envelope with a crimson
> `#c41c1c` seal across a dark wood desk toward the camera, then rests her hand
> beside it. Warm daylight, off-white walls `#fbfaf7`, no camera movement, no
> cuts, no text, subtle ambient motion only, 16:9, 24fps.
> `start_image` = Image 3.

---

## 3 · TOKENS

```css
:root{
  /* P7 ENAMEL — brand crimson variant */
  --void:#fbfaf7; --void-2:#ffffff; --void-3:#f4f1ec;
  --ink:#141210; --muted:#5a544c; --dim:#9a948c;
  --line:rgba(20,18,16,.12); --line-2:rgba(20,18,16,.06);
  --accent:#c41c1c; --accent-deep:#8f1414; --accent-2:#2f7d78;
  --accent-soft:rgba(196,28,28,.09); --accent-2-soft:rgba(47,125,120,.10);
  --glass:rgba(255,255,255,.62); --glass-line:rgba(20,18,16,.10);
  --pill:#141210; --pill-ink:#fbfaf7;
  /* light-mode depth tokens — NOT optional */
  --shadow-sm:0 2px 8px rgba(20,18,16,.06);
  --shadow-md:0 12px 30px rgba(20,18,16,.10);
  --shadow-lg:0 30px 70px rgba(20,18,16,.14);
  --contact:0 24px 40px -20px rgba(20,18,16,.35);
}
```

Type scale (`--h` unit, reference canvas 1512×1024):

| role | size | line-height | weight | family | tracking |
|---|---|---|---|---|---|
| hero h1 | `calc(78 * var(--h))` | **1.06** | 400 | Instrument Serif | −.02em |
| h2 | `calc(46 * var(--h))` | 1.0 | 400 | Instrument Serif | −.015em |
| h3 | `calc(21 * var(--h))` | 1.2 | 600 | Inter | −.01em |
| lead | `calc(19 * var(--h))` | 1.55 | 400 | Inter | 0 |
| body | `calc(16.5 * var(--h))` | 1.62 | 400 | Inter | 0 |
| eyebrow | `calc(11.5 * var(--h))` | 1 | 600 | Inter | .16em, uppercase |
| stat numeral | `calc(52 * var(--h))` | 1 | 400 | Instrument Serif | −.02em, `tabular-nums` |

`em` inside an h1 = `color:var(--accent)` **plus a drawn ECG underline** —
never a gradient fill. The underline is `position:absolute; bottom:calc(1 *
var(--h)); height:calc(11 * var(--h)); overflow:visible`, so its QRS spike
overshoots into the accent line's own descender space. **h1 leading must stay
≥ 1.06** or the underline lands on top of the next line. Below 1180px the
underline is hidden and `white-space:nowrap` is lifted from the `em` — nowrap
on a 30-character phrase is what pushes a 390px viewport into horizontal
overflow.

---

## 4 · UNIT SYSTEM

`--u:calc(100dvh / 1024)` · `--uw:calc(100vw / 1512)` ·
`--h:clamp(var(--u), calc(var(--u)*.62 + var(--uw)*.38), calc(var(--u)*1.18))`.

Four rules: **`--u`** for fixed position · **`--h`** for type ·
**`--gutter`** (`clamp(20px,6.4vw,92px)`) for horizontal ·
**raw px** for scroll timelines, never `vh`.

Portrait/tablet override: `--m:min(calc(100vw / 430),1.32px)` at
`max-aspect-ratio:11/10`, with `--u:var(--m); --h:var(--m)`; tablet band
`(min-width:600px)` → `--m:min(calc(100vw/860),calc(100vh/760),1.24px)`.

---

## 5 · SHARED CHROME

**Topbar** (`--top-h:36px`, hidden below 1100px): left = crimson dot +
`USCIS-Designated Civil Surgeon`; right = `ADDRESS_TBD, New York, NY` ·
`(917) 905-8140` · `Book Your I-693 Exam`. Ground `--ink`, text
`rgba(251,250,247,.78)`.

**Header** (`--nav-h:76px`, sticky at `top:var(--top-h)` then `top:0` when
stuck): grid `auto 1fr auto`. Brand = `logo-mark.webp` at
`height:calc(38 * var(--h))` + `NY MedCare` in Inter 700 −.02em, with
`MedCare` in `--accent-deep`. Links in source order: `What's Included` ·
`The Process` · `What to Bring` · `Vaccines` · `FAQ`. Right slot =
`(917) 905-8140` (ghost) + `Book Exam` (pill). `.is-stuck` →
`background:rgba(251,250,247,.86); backdrop-filter:blur(18px) saturate(1.2);
border-bottom-color:var(--line-2); box-shadow:var(--shadow-sm)`.

**Mobile menu**: `#burger` 44×44, two 18×1.5px bars → X at 45°/−45°.
`#menu` full-screen `rgba(251,250,247,.97)` + `blur(24px)`; 7 links in source
order, stagger `.06/.10/.16/.22/.28/.34/.40s`; then `Call (917) 905-8140` and
`Book Your I-693 Exam`.

**Footer**: 4 columns — brand (lockup + description + 4 socials) ·
`Immigration Exam` (7 links) · `Practice` (5 links) · `Hours & Location`.
Then the disclaimer paragraph, then the bottom rule with `© 2026 NY MedCare.
All rights reserved.` + Privacy / Terms.

**Mobile action bar** (`max-aspect-ratio:11/10` only): fixed bottom,
`Call` (ghost) + `Book Exam` (pill), safe-area padded.

**Grain** at `opacity:calc(var(--grain) * .55)` with
`mix-blend-mode:multiply` — on a light ground, overlay grain is invisible and
multiply is what reads. **No vignette** (a light page must not darken at the
edges).

**Stacking contract**: `canvas#gl` 0 → `.plate` 1 → `.grain` 2 →
`main` 10 → `.chrome` 60 → `.topbar` 61 → `.mobar` 70 → `#menu` 80 →
`.curtain` 90.

**`footer.foot` must carry `position:relative; z-index:10`.** It lives outside
`<main>`, and `main` is what core.css lifts above the canvas — a static footer
paints in the block layer *below* the fixed `canvas#gl` and gets veiled by it.
On this page `--gl-op` happens to be 0 by the time the footer is in view, so
the bug is invisible until it isn't.

---

## 6 · 3D LAYER

**Visual Signature:** `PulseLine (ECG tube, ink+crimson line-art on warm
white) + HairlineFloor · accent #c41c1c · C1 slow straight push-in · signature
move: the trace draws itself once on load, then one QRS spike travels
left→right every 2.4s and the crimson H1 underline beats with it.`

Renderer: `outputColorSpace = SRGBColorSpace`, **`NoToneMapping`**,
`alpha:true`, **`bloom:0`** (light build), **no fog** (`scene.fog = null`),
`shadowMap.enabled = false`, DPR cap 1.75 / 1.35 on low-tier, and an
**opaque clear to `#fbfaf7`** (`setClearColor(0xfbfaf7, 1)`).

Three renderer decisions that are load-bearing on a light build — each was a
real failure caught in review, not a precaution:
1. **Clear opaque, never transparent.** `alpha:true` + `clearAlpha 0` is the
   usual light-build recipe, but a driver that ignores it (headless
   SwiftShader does) hands back an opaque **black** buffer, and the fixed
   full-viewport canvas then paints the whole hero black. Clearing to `--void`
   at alpha 1 makes the canvas indistinguishable from the body either way.
2. **`NoToneMapping`.** ACES filmic compresses the entire frame, so a warm-white
   clear lands at ≈`#e3e4e3` — a visible grey slab where the page should be
   `#fbfaf7`. There is no HDR content in flat line art, so tone mapping buys
   nothing and costs the ground colour.
3. **`tick(stageApi, engineState, dt)`.** The stage carries `.time`; the pointer
   and scroll channels (`mx`/`my`/`sp`) are on the *second* argument. Reading
   `mx` off the stage yields `undefined`, which poisons the transform with NaN
   and the mesh vanishes silently — no error, just an empty canvas.

**PulseLine geometry** — exact:
- 1 `CatmullRomCurve3` through **160** sampled points across `x ∈ [−7.4, 7.4]`
  at `y = f(x)`, `z = 0`; `TubeGeometry(curve, 420, 0.022, 8, false)`.
- `f(x)` is a real resting ECG: baseline 0, then per beat at phase
  `p = fract((x + 7.4) / 3.7)` — P wave `+0.10 · gauss(p, .13, .035)`,
  Q `−0.09 · gauss(p, .27, .012)`, **R `+0.86 · gauss(p, .31, .014)`**,
  S `−0.20 · gauss(p, .35, .016)`, T `+0.22 · gauss(p, .55, .060)`,
  where `gauss(p,μ,σ) = exp(−((p−μ)²)/(2σ²))`. **4 beats across the frame.**
- Material `MeshBasicMaterial{ color:0x141210, transparent:true, opacity:.20,
  depthWrite:false }`.
- A second **highlight** tube, same curve, `radius 0.034`,
  `MeshBasicMaterial{ color:0xc41c1c, transparent:true, opacity:.85,
  depthWrite:false }`, revealed by `drawRange` — this is the travelling pulse.
- **HairlineFloor**: `LineSegments` grid, 26 × 14 cells, `2.0` spacing,
  `LineBasicMaterial{ color:0x141210, transparent:true, opacity:.055 }`,
  rotated `−Math.PI/2` on x, at `y = −2.6`.

**Motion**:
- **Draw-on-load** — `highlight.geometry.setDrawRange(0, n)` where
  `n = round(total · smoothstep(0, 1, min(1, t / 1.4)))`, `t` in seconds from
  first tick. Runs once.
- **Travelling QRS** — after the draw completes, a window of
  `total * 0.16` indices sweeps `0 → total` every **2.4s**; inside the window
  `opacity = .85`, outside `.34`. Implemented as two draw ranges per frame
  (base tube always full at `.20`).
- Ink tube `opacity` lifts `.20 → .26` on the beat, easing back over `.45s`.
- Group `rotation.z = state.my * 0.035`, `position.x = state.mx * 0.30`.

**Camera keyframes** (C1 — straight push-in, no orbit):

| scroll px | position | target | fov | note |
|---|---|---|---|---|
| 0 | `[0, 0.25, 7.4]` | `[0, 0.10, 0]` | 40 | hero rest |
| 620 | `[0, 0.10, 6.0]` | `[0, 0.02, 0]` | 37 | push-in as the hero leaves |
| 1400 | `[0, −0.20, 5.4]` | `[0, −0.10, 0]` | 36 | settle; canvas already faded |

**Single-scalar bridge**: `gl.js` reads only `state.scroll`. The page module
writes `--gl-op` and nothing in `gl.js` reads the DOM.

**Canvas visibility**: `--gl-op = (1 - smoothstep(0, 1, clamp(scroll / (heroH *
0.85))))`, `.toFixed(3)`; `canvas#gl{opacity:var(--gl-op)}`. Past the hero the
canvas is invisible, so no scene fights the white content sections.

**Three tiers**: (1) full WebGL as above · (2) `html.no-gl` → a CSS-only
`.fallback` in the hero drawing the same 4-beat ECG as an **inline SVG**
`stroke-dasharray` path in `--accent` at `.5` opacity, plus the hairline grid
as two `repeating-linear-gradient`s at `--line-2` · (3)
`prefers-reduced-motion` → the SVG path fully drawn, static, no sweep.

Perf budget: ≤ 6 draw calls (2 tubes + 1 grid = 3), one rAF loop, one WebGL
context, on-demand render, no per-frame allocation.

---

## 7 · SCROLL ENGINE

`assets/js/engine.js` copied **verbatim** — it owns `--sp`, `--mx`, `--my`,
`--tilt-x/y`, `--depth-1/2/3`, `--grain` and the `[data-reveal]` observer.
`nav.js` copied verbatim. `gl.js` copied verbatim.

Per-page channel writes (all from `page.home.js`, all `.toFixed`):

| channel | formula | precision |
|---|---|---|
| `--gl-op` | `1 - smoothstep(0, 1, clamp(scroll / (heroH * .85)))` | 3 |
| `--hero-y` | `(-scroll * .09).toFixed(1) + 'px'` | 1 |
| `--hero-photo-y` | `(-scroll * .045).toFixed(1) + 'px'` | 1 |
| `--hero-op` | `1 - smoothstep(heroH * .40, heroH * .92, scroll)` | 3 |
| `--spine` | process-rig local `s / len` | 4 |
| `--beat` | `0.5 + 0.5 * sin(time * 2π / 2.4)` (drives the H1 underline) | 3 |

Reduced motion: `--gl-op:0`, `--hero-y/-photo-y:0px`, `--hero-op:1`,
`--spine:1`, `--beat:0`.

---

## 8 · PAGE — DOM tree, source order = paint order

```
body
  canvas#gl                       (aria-hidden, fixed, --gl-op)
  .grain
  a.skip → #main
  .topbar                         (dot + "USCIS-Designated Civil Surgeon" | address | phone | CTA)
  header.chrome                   (brand | .links | .right)
  nav#menu                        (7 links + call + book)
  main#main
    S1  section.hero              — split: copy column | photo column
    S2  section.stats             — 4 stats, hairline dividers, count-up
    S3  section.why    #why       — "Why Applicants Choose Us" · 4 items, 2×2, serif numerals
    S4  section.inc    #included   — "What's Included" · 6 items + ⚠ callout
    S5  section.proc   #process    — "The Process" · 5 steps, drawn SVG spine
    S6  section.prep   #bring      — "Come Prepared" · bring-list + 12 vaccine chips + ℹ callout
    S7  section.book   #book       — "Book Online" · calendar panel
    S8  section.doc    #doctor     — "Your Civil Surgeon" · portrait + credentials
    S9  section.revs              — "Patient Reviews" · 3 quotes
    S10 section.serve             — "Who We Serve" · 12 area chips + 4 feature chips
    S11 section.faq    #faq        — "Questions" · 13 <details>
    S12 section.loc    #location   — "Find Us" · map + 4 info blocks
    S13 section.cta               — dark inverted band, final CTA
  footer.foot
  .mobar                          (Call | Book Exam)
```

**Every string is the scraped source string, verbatim.** The emoji glyphs the
source used as icons (🩺 🧪 💉 📋 🧠 ✉️ ⚠ ℹ) are replaced by **inline SVG
line icons** — icons are decoration, not content, and emoji are banned. Nothing
else changes.

### Composition rules that keep this off the banned card-grid

The source renders S3–S6 as bordered 3-across boxes. That exact composition is
banned. Same content, recomposed:

| section | composition |
|---|---|
| S3 Why | 2×2, each item = `01–04` serif numeral + 20px SVG icon + h3 + p, separated by **hairlines only** (`--line-2`), no border, no box |
| S4 Included | editorial two-column list, each row = SVG icon in a 44px crimson-tinted circle + h3 + p, `border-top:1px solid var(--line-2)` per row; the ⚠ note is a full-bleed `--accent-soft` band with a 2px left rule in `--accent` |
| S5 Process | vertical timeline, one **drawn SVG spine** down the left at `--gutter + 22px`, 5 nodes; node fills `--accent` as `--spine` passes it; content on the right; duration as a small `--void-3` chip |
| S6 Prepare | two columns — left the 8-item bring list (`✓` SVG + bold lead-in + rest), right the 12 vaccine chips (`--void-2`, hairline, `--shadow-sm`) + the changes note + the ℹ band |
| S9 Reviews | three quotes, large serif opening quote in `--accent` at `.18` opacity, hairline between, author avatar = initial in a crimson circle |
| S11 FAQ | native `<details>`, `border-top:1px solid var(--line-2)`, `+ → ×` rotation, `summary` in Inter 600 |

### Scroll math — written out in full

**S1 hero** (no rig; page-scroll driven, ramps per P7: enter 320 / exit 300)
```
heroH = hero.offsetHeight
--hero-y        = (-scroll * .09).toFixed(1) + 'px'      → .hero-copy{transform:translateY(var(--hero-y))}
--hero-photo-y  = (-scroll * .045).toFixed(1) + 'px'     → .hero-photo{transform:translateY(var(--hero-photo-y))}
--hero-op       = (1 - smoothstep(heroH*.40, heroH*.92, scroll)).toFixed(3)
                                                          → .hero-copy{opacity:var(--hero-op)}
--gl-op         = (1 - smoothstep(0, 1, clamp(scroll/(heroH*.85)))).toFixed(3)
```
Mobile (`max-aspect-ratio:11/10`): `--hero-y` and `--hero-photo-y` forced to
`0px`, `--hero-op` forced to `1`, `--gl-op` capped at `.5`.
Reduced motion: all four forced to the rest values above.

**S2 stats count-up** — one `IntersectionObserver` at `threshold .4`, fires
once. `4.9` counts `0 → 4.9` over 900ms with one decimal; `1` and `3–5` and
`All` and `USCIS-Designated` are **not** counted (they are not numbers) — they
fade up with the `[data-reveal]` stagger. `font-variant-numeric:tabular-nums`
on the counter or the digits jitter.

**S5 process spine** — a `.rig[data-rig]` is *not* used (the section must not
pin on a content page). Instead one observer + page-scroll:
```
local  = clamp((scroll + innerHeight * .82 - secTop) / (secH * .78), 0, 1)
--spine = local.toFixed(4)
svg path { stroke-dasharray: var(--len); stroke-dashoffset: calc(var(--len) * (1 - var(--spine))) }
node i  { --at: i/4 ; filled when var(--spine) > var(--at) }   → 5 nodes at 0, .25, .5, .75, 1
```
Node fill is a CSS `background` swap driven by a `.on` class the page module
toggles at `local > (i / 4) - .04` — no per-frame class writes: the module
tracks the highest lit index and only writes on change.
Mobile: identical, `secH * .9`. Reduced motion: `--spine:1`, all nodes `.on`.

**S13 dark band** — `background:var(--ink)`, `color:var(--void)`; the crimson
CTA keeps `--accent` on ink (contrast 4.9:1 for the large pill label, and the
pill is `--void` ground with `--ink` text, so it is 15:1).

---

## 9 · ENTRANCES

`.appear`/`[data-reveal]` resting opacity is **1** in the no-JS path: the
`[data-reveal]{opacity:0}` rule is emitted **inside**
`@media (prefers-reduced-motion:no-preference)` **and** guarded by a
`html.js` class set by an inline `<script>` in `<head>`. With JS off, nothing
is hidden.

Anti-flash — **inverted for a light build**: first CSS rule
`html,body{background:#fbfaf7!important;color:#141210}`, then inline
`<body style="background:#fbfaf7;color:#141210">`, then the token version.

Load stagger (`cubic-bezier(.22,1,.36,1)`, `rise` = `translateY(16 * var(--u))`):

| target | delay | dur |
|---|---|---|
| topbar | 0 | 600ms |
| brand / links / right | 40ms | 800ms |
| hero eyebrow | 120ms | 560ms |
| hero h1 | 200ms | 900ms |
| hero lead | 300ms | 900ms |
| hero rating + chips | 400ms | 700ms |
| hero CTAs | 500ms | 700ms |
| hero info cards | 600ms | 700ms |
| **hero photograph** | **excluded** | it is the static stage and never animates |

The ECG draw-on-load (§6) starts at the first GL tick and takes 1.4s.

Reserved space: every `<img>` carries `width`/`height`; the map iframe and the
booking panel carry `aspect-ratio`. CLS target < 0.1.

---

## 10 · BREAKPOINTS

| breakpoint | overrides |
|---|---|
| `max-width:1500px` | `--nav-h:72px`; hero h1 `calc(66 * var(--h))`; h2 `calc(41 * var(--h))` |
| `max-width:1100px` | `.topbar{display:none}`; `.links{display:none}`; `#burger{display:flex}`; hero → single column, photo below copy; S3 2×2 → 2×2 kept; S4/S6 → single column |
| `max-aspect-ratio:11/10` | `--m` unit system; hero h1 `calc(40 * var(--m))`; `.actions{flex-direction:column;align-items:stretch}`; `canvas#gl{opacity:calc(var(--gl-op) * .5)}`; `.mobar{display:flex}` + `main{padding-bottom:calc(76 * var(--m))}`; header padded with `env(safe-area-inset-*)` |
| `min-width:600px and max-aspect-ratio:11/10` | tablet `--m` band |
| `max-width:430px` | `--gutter:20px`; hero h1 `calc(35 * var(--m))`; stats 2×2 |
| `prefers-reduced-motion:reduce` | all animation/transition ≈ 0s; `[data-reveal]{opacity:1;transform:none}`; `--gl-op:0`; spine full; `scroll-behavior:auto` |

---

## 11 · ACCESSIBILITY & SEO

One `<h1>`. Skip link to `#main`. `:focus-visible{outline:2px solid
var(--accent);outline-offset:3px}` — never `outline:none` bare. `canvas#gl`
`aria-hidden="true"` and `pointer-events:none`. Every SVG icon
`aria-hidden="true"` with the meaning in the adjacent text. `<details>` used
for FAQ so it is keyboard- and screen-reader-native. Map iframe keeps its
`title`. Socials get `aria-label` + `rel="noopener"`.

Contrast: `--muted #5a544c` on `--void #fbfaf7` = **7.0:1**; `--dim #9a948c`
on `--void` = **2.6:1**, so `--dim` is used **only** for ≥18px semibold
eyebrows and decorative rules, never body text. `--accent #c41c1c` on
`--void` = **5.9:1**. Touch targets ≥ 44px.

JSON-LD: the source's `MedicalClinic`, `FAQPage` and `HowTo` blocks, verbatim
— including its `aggregateRating`, which is **the client's own existing claim,
carried over unchanged, not authored here** (listed in §12b).

`sitemap.xml` + `robots.txt` for the single URL.

---

## 12 · ACCEPTANCE CRITERIA

1. Every string on the page matches the source site character-for-character;
   diffing the extracted text of both pages shows no copy difference.
2. All 13 source sections are present, in source order.
3. First viewport is ONE composition: brand + nav + one H1 + one sub + one CTA
   pair + the photograph. No stat strip above the fold.
4. Scrubbing 0 → 620px: the ink ECG holds, the crimson pulse sweeps
   left→right on a 2.4s loop, the copy column drifts up 9% of scroll and fades
   to 0 by 92% of hero height, the photo drifts 4.5%, the canvas reaches
   `opacity:0` by 85% of hero height, and the camera pushes from `z 7.4 → 6.0`
   with fov `40 → 37`.
5. Scrubbing the process section: the spine draws top→bottom and each of the 5
   nodes fills crimson as it is passed; scrolling back up does **not**
   re-animate anything.
6. `html.no-gl`: the hero shows the drawn SVG ECG + hairline grid and looks
   intentional, never an empty box.
7. `prefers-reduced-motion`: page fully readable and static, all content
   reachable, no canvas.
8. No `overflow-x:hidden` on any ancestor of any sticky element (`clip` only).
9. Lighthouse: CLS < 0.1; every image ships as WebP under 100KB.
10. Keyboard: skip link → header → nav → all 13 FAQ items open with Enter →
    footer, with a visible ring at every stop.
11. No emoji, no gradient text fill, no glowing orbs, no blurred blob
    gradients, no bordered 3-across card grid as a primary composition, no
    animation library, no loaded 3D model.

## 12b · FACTS TO CONFIRM

Everything below came from the **source site**, not from this build. Nothing
here was authored:

1. **`ADDRESS_TBD, New York, NY`** — a literal placeholder on the live source
   site. It appears in the topbar, hero info card, footer, location section and
   the JSON-LD `streetAddress`/`postalCode` (`ZIP_TBD`). **Replace before
   launch.**
2. **`aggregateRating` 4.9 / 120 reviews** and the on-page `4.9 | 120+ patient
   reviews` — the client's existing claim. Verify it is substantiated, or
   remove both the visible rating and the schema block.
3. **Three testimonials** (Maria S., Joseph A., Rina P.) — supplied by the
   source site, carried over verbatim. Confirm they are real.
4. **Social links point to "Medcare Clinic Danbury"** accounts, not a New York
   handle — the source's own URLs. Confirm they are the right accounts.
5. **Booking calendar is not connected** — the source ships the same
   placeholder. The GHL loader is present; a real calendar ID is still needed.
6. **`geo` 40.7831 / −73.9712** is a generic Manhattan centroid from the
   source. Update with the real coordinates.
7. Dates and regulatory claims (polio added May 2024; COVID-19 requirement
   removed Jan 22 2025; 01/20/2025 edition only since July 3 2025; I-693
   validity guidance effective June 11 2025) — all from the source copy.
   Re-verify against uscis.gov before launch.

## 13 · BUILD ORDER

```
core.css tokens → chrome + footer → engine.js + nav.js → gl.js + PulseLine →
hero → S2…S13 in order → mobile pass → a11y pass → perf pass → ship
```

## BANNED (restated)

Generic bordered 3-across card grid as a primary composition · glowing orbs ·
blurred blob / mesh-gradient wallpaper · emoji · stock illustration · lorem ·
invented copy where real copy exists · gradient text fills on headings · a
`<canvas>` that captures pointer events · `outline:none` without a replacement
ring · re-animating a reveal on scroll back up · GSAP / Lenis / AOS / any
animation library · loaded 3D models · `overflow-x:hidden` above a sticky rig.
