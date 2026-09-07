# NY MedCare — single-page site

USCIS-designated civil surgeon in Manhattan, NY. Form I-693 immigration medical
examinations.

A redesign of `nymedprime.pages.dev`. **All copy is carried over from that site
verbatim** — no wording was changed, added or removed, and no section was added,
removed or reordered. Only the design, layout, motion and 3D layer are new.

## Run it

The page uses ES modules and an importmap for Three.js, so it must be served
over HTTP — opening `index.html` from the filesystem leaves the WebGL layer
dead.

```bash
python -m http.server 8099
# then open http://localhost:8099/
```

No build step, no dependencies, no bundler.

## Deploy (Vercel)

There is deliberately **no `package.json`** — Vercel must detect no framework and
serve the repo root as static files. Adding one would trigger a build step this
site does not need.

Import once and every push to `main` deploys automatically:

1. <https://vercel.com/new> → **Import Git Repository** → `Bilal-363/Ny-medcare`
2. Framework Preset: **Other**. Leave Build Command empty, Output Directory as
   the root. `vercel.json` supplies clean URLs, caching and security headers.
3. **Deploy.**

Or from the CLI, from this folder:

```bash
npm i -g vercel
vercel login       # interactive
vercel --prod
```

Note `index.html` still carries `<meta name="robots" content="noindex, nofollow">`
(inherited from the source site), so the deploy will not be indexed until that is
removed — which is usually what you want for a client preview.

## Structure

```
index.html                 the whole page — 13 sections, in source order
assets/css/core.css        frozen engine stylesheet (tokens, units, chrome)
assets/css/site.css        the light theme + every section
assets/js/engine.js        scroll smoothing, pointer parallax, reveal observer
assets/js/gl.js            renderer, camera keyframe rig, quality ladder
assets/js/nav.js           header state, mobile menu
assets/js/scenes.js        PulseLine (ECG) + HairlineFloor
assets/js/page.home.js     page channels, counters, process spine, stage boot
BUILD-SPEC.md              the full build spec — every value, formula and trap
```

## Design

Clinical white ground (`#fbfaf7`) with the logo's crimson `#c41c1c` as the
single accent and `#2f7d78` teal as secondary. Instrument Serif display over
Inter body. Depth comes from soft shadows and real photography, not glow.

**Visual signature:** a procedural ECG trace (`PulseLine`) rendered as
ink-and-crimson line art behind the hero. It draws itself once on load, then a
QRS spike sweeps left to right every 2.4s. The camera pushes straight in from
z 7.4 to 5.4 across the first 1400px of scroll.

Three tiers ship: full WebGL, a CSS/SVG fallback under `html.no-gl`, and a
static reduced-motion tier. All three are complete pages.

## Before launch

These all came from the source site, not from this build:

1. **`ADDRESS_TBD` / `ZIP_TBD`** is a literal placeholder on the live source
   site. It appears in the topbar, hero, footer, location section and the
   JSON-LD `streetAddress`/`postalCode`. **Must be replaced.**
2. **`<meta name="robots" content="noindex, nofollow">`** is carried over from
   the source. Remove it to allow indexing.
3. **The 4.9 / 120-review rating** appears on the page and in the schema
   `aggregateRating`. Confirm it is substantiated or remove both.
4. **Three testimonials** (Maria S., Joseph A., Rina P.) came from the source.
   Confirm they are real.
5. **Social links point to "Medcare Clinic Danbury"** accounts, not a New York
   handle. Confirm they are the right accounts.
6. **The booking calendar is not connected.** The Go High Level loader is in
   place but still needs a real calendar ID.
7. **`geo` 40.7831 / −73.9712** is a generic Manhattan centroid. Update with the
   real coordinates.
8. Regulatory dates in the copy (polio added May 2024; COVID-19 requirement
   removed 22 Jan 2025; 01/20/2025 edition only since 3 Jul 2025; I-693 validity
   guidance effective 11 Jun 2025) all came from the source copy. Re-verify
   against uscis.gov.
