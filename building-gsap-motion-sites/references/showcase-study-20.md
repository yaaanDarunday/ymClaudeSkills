# GSAP Showcase Study: 20 Sites

**Source:** [gsap.com/showcase](https://gsap.com/showcase/). A harvest on 2026-10-03 returned **495 gallery cards**.
**Scope:** the 7 sites from the first study (`showcase-study.md`, 2026-09-28) plus **13 new sites** studied on 2026-10-03. None of the 13 had been studied before (see the fresh-references ledger).
**Rig:** desktop Chromium at **1440 × 900**, DPR 1, driven by Playwright.

**Method (identical for every new site):**
1. Load the page and wait 3.5s for the preloader.
2. Screenshot it and run the `dissect-site.js` probe:
   - every visible text node's font, size, weight, line-height, tracking, case and colour
   - colour, border and radius frequencies
   - `:root` tokens, CSS eases, durations and keyframes
   - live GSAP version, plugins, ScrollTrigger counts (total, pinned, scrubbed) and the live tween ease/duration inventory
   - Lenis, Three.js, canvas, video and SVG counts
3. Send **10 real mouse-wheel ticks of 800px**. After each tick, take a frame ~260ms later (mid-motion) and another ~1.7s later (settled).
4. Re-probe at the midpoint and the end.
5. Where a site gates or hijacks input, do what the page asks: click "GO GO GO", "ENABLE GLITCH EFFECT", "VISIT WEBSITE" or "read now", reject cookies, drag the canvas, hover and click tiles.

All px values are **computed at 1440px wide**. Most sites use fluid type (`vw` or `clamp()`), so expect different numbers at other widths. Anything read from a screenshot rather than the DOM is marked *(seen)*. Anything deduced is marked *(inferred)*.

Screenshots are kept out of version control because they are other people's work.

---

## Index

| # | Project | Built by | Kind | Stack observed | Input model |
|---|---|---|---|---|---|
| 1 | [A24 Films](https://a24.raviklaassens.com/) | Ravi Klaassens | Film catalogue | Astro, GSAP 3.15, Lenis, Three.js, Barba | Wheel hijacked, steps a WebGL disc carousel |
| 2 | [Illoca](https://illoca.unseen.co/) | Unseen Studio | AI product | Nuxt, Lenis (wrapper), Three.js, GSAP (bundled) | Scroll-scrubbed 3D camera path |
| 3 | [Huy Phan](https://huyml.co/) | Huy Phan & Chien Pham | Portfolio | Framer, Three.js | Wheel hijacked, steps a 3D image ribbon |
| 4 | [Revelatio](https://revelatio.studio/) | Revelatio | Studio | Webflow, GSAP 3.15 (ST, SplitText, ScrambleText, Observer), Lenis | Native smooth scroll + theme inversion |
| 5 | [Graffico Office](https://office.graffico.it/) | Graffico | Studio "game" | Next.js, React Three Fiber | No scroll: WASD walk-through |
| 6 | [Dkton](https://www.dkton.at/) | Barry Baris Dogan | Sound designer | Webflow, GSAP 3.15 (ST ×14), Lenis, Howler | Audio gate → native smooth scroll |
| 7 | [Door Dennis](https://www.doordennis.nl/) | Dennis Janssen | Web studio | WordPress, GSAP 3.11 (ST ×18), Lenis, Swup, Three.js | Native smooth scroll, 2 pins, 8 scrubs |
| 8 | [Filmbot](https://filmbot.com/) | Somefolk®, Eduard Bodak | B2B SaaS (cinema ticketing) | Webflow, GSAP 3.15 ScrollTrigger (35 ST, ~20 scrubbed), Lenis, custom WebGL | Native smooth scroll; light→dark flip |
| 9 | [LxL Creative](https://www.lxlcreative.co.uk/) | Jordan Gilroy | Entertainment creative agency | Webflow, Barba, Lenis, GSAP 3.15 (8 plugins incl. DrawSVG, Draggable, Flip) | Native smooth scroll + drawn-line set pieces |
| 10 | [What if Orwell had a website](https://orwell.byholm.co/) | Canberk Polat (byholm) | Editorial experiment | Vanilla, GSAP 3.12 (SplitText, DrawSVG), Lenis, 3 canvases | Scroll through held "scenes" (stepped positions) |
| 11 | [TILToooTILT — Everything Has Weight](https://tiltoootilt.tote.co.jp/) | Tote Inc. | Fashion/art collage toy | Vanilla, GSAP 3.15 (Draggable + Inertia only), Three.js | No scroll: shutter gate → horizontal drag |
| 12 | [Utopia Tokyo](https://www.utopiatokyo.com/) | SPOTHEROZ, Simon Smeraldi, Andrew Measham | Speculative brand world | Webflow, Barba, Lenis, GSAP 3.14 (6 plugins), Spline | Epilepsy gate → native smooth scroll |
| 13 | [Lando Norris](https://landonorris.com/) | OFF+BRAND | Athlete site | Webflow, custom bundle (GSAP not global), Lenis, 21 canvases | Native smooth scroll, marquee + drawn signature |
| 14 | [Osmo](https://www.osmo.supply/) | Dennis Snellenberg, Ilja van Eck | Dev-resource platform | Webflow, Barba, Lenis, GSAP 3.15 (Draggable, Inertia, Observer, ST, SplitText, CustomEase) | Native smooth scroll with a card wheel |
| 15 | [Ponpon Mania](https://ponpon-mania.com/) | Justine Soulié, Patrick Heng | Interactive comic | Nuxt, WebGL canvas (GSAP bundled) | Wheel hijacked, steps an album-sleeve carousel |
| 16 | [Palmer Dinnerware](https://www.palmer-dinnerware.com/) | (uncredited) | Ceramics e-commerce | Webflow, Lenis, GSAP 3.15 (81 ST, Draggable, Inertia, Flip) | No scroll: infinite drag canvas ↔ Flip grid |
| 17 | [Two Capitals Studio](https://www.twocapitalsstudio.com/) | Two Capitals | Web studio | Custom bundle (GSAP not global), Lenis, 9 canvases | Gate → native smooth scroll, 3D text and card deck |
| 18 | [Cash App Brand Guidelines](https://design.cash.app/) | Cash App | Brand system site | Astro, Swup, 31 videos | No scroll: cursor-panned object grid → Flip into page |
| 19 | [No Art](https://www.noartmusic.com/) | BORING | Music label / events + shop | Webflow, Lenis, GSAP 3.15 (8 plugins), Three.js globe, Swiper | Native smooth scroll, focus carousels |
| 20 | [IKEA "Desmontando los 30"](https://www.family.ikea.es/demos/desmontando-los-30/) | MRM Spain, /nk.studio, Mach Studio | Brand campaign + sweepstake | Next.js (Turbopack), Tailwind, Lenis, video sequences | Wheel hijacked, steps a pre-rendered marble run |

---

# Part A: The original 7 (condensed)

Full dissections are in `showcase-study.md`. This part keeps the numbers that matter for comparison.

## 1. A24 Films
**Vibe:** a curator's archive, like a boutique Criterion shelf. It's paper-grey and reverent, and the physical object (a DVD) carries all the colour.
- **Layout:** the stage is `overflow:hidden` and 900px tall, so the page never scrolls. A fixed HUD sits on all four edges:
  - top-centre: a floating nav, "Films" with a 3px dot under it
  - mid-left / mid-right: labels exactly on the vertical centre line, 6px from the edges
  - top-left: a DVD-back "spec sheet" with 1px black rules
  - bottom-centre: ★★★★½ press quotes
  - centre: a Three.js canvas of DVD discs on a diagonal arc
- **Type:**
  - **PP Eiko** 400 (razor-thin didone) for display: 120px / 1.0 / −0.04em; titles 30px; quotes 21px uppercase
  - **PP Neue Montreal** 500 for UI: 13.5px / 1.4 / −0.025em
  - **PP Museum** micro caps: **7.5px**, +0.2em
  - The extreme jump is from 120px straight down to 7.5px.
- **Colour:** paper `#F2F2F2`, ink `#000`, stone `#D6D3D1`. All chroma comes from disc art. A CSS `@keyframes grain` overlay sits on top.
- **Motion:**
  - The disc enters edge-on and spins to face the camera while an odometer loader counts up.
  - Each wheel tick is `power3.out` at 0.8s.
  - Jitter keyframes (`btn-film-jitter`, `nav-plate-jitter`) mimic projector gate weave.
  - Barba handles transitions, and `prefers-reduced-motion` is respected.
  - Eases: `cubic-bezier(.625,.05,0,1)` and `(.509,.188,.041,.989)`.
- **Steal:** a hero object, an edge-anchored HUD, and three fonts with strict jobs.

## 2. Illoca
**Vibe:** an architect's drafting desk rendered in 3D. It's warm and tactile, and the copy says it outright: "architectural → NOT SOFTWARE".
- **Layout:**
  - the whole page is graph paper over `#EADFC9`
  - live cursor X/Y in handwriting, top-left
  - nav in a white 1px-bordered "title block" box
  - a 2-line 111px headline with handwritten annotations around it
- **Type:**
  - **F37 Analog** 500: 111px / 0.9
  - **Graphik** 12–27px at −0.02 to −0.03em
  - **Architect Pro** handwriting, 18px
  - **Geist Mono** labels, 12–13.5px
  - Hover text-rolls use duplicated labels.
- **Colour:**
  - paper `#EADFC9`, cream `#FDF8F0`, ink `#373737`
  - blueprint blue `#3B60C5` / `#283F7D`, signal `#EC633D`
  - The 3D scene is a duotone halftone (stipple) shader.
- **Detailing:** radii of 1.5–4px. Hard offset shadows instead of blurs: `drop-shadow(6px 6px 0 rgba(0,0,0,.1))`.
- **Motion:**
  - The preloader morphs the 4-tile logo.
  - About 4,000px of scroll scrubs a camera that dollies over a woman's shoulder onto her plan.
  - The frame slides to ⅔ width while feature panels swap into the left ⅓.
- **Steal:** a physical-world metaphor carried through font, background, shadow and shader.

## 3. Huy Phan
**Vibe:** cheeky and editorial. A cartoon self-portrait pushes a wall open onto a red flared-serif name, then a fashion-grade 3D index.
- **Layout:**
  - **Intro (about 8s):** the mascot shoves a black wall aside to reveal "HUY / PHAN" in `#FF4949`, then a white curtain wipes down.
  - **Index:** a WebGL ribbon of project cards flows along an S-curve.
  - A right column lists 19 projects. Only the active one is at full opacity; the rest sit at about 25%.
  - The meta table blurs out and back in with `blur(12px)`.
  - A 180px refracted counter shows "06 / 19".
  - A live HCMC clock and an audio toggle sit in the HUD.
- **Type:**
  - **BT Glyphius**: 220px / 0.96 / −0.05em
  - **BT Grotesk**: 180px counter; meta at **10px**
  - **F37 Bolton** credits: 10px
- **Colour:**
  - `#ECECEC` and `#1E1E1E`, with `#FF4949` used only for the name
  - three palette swatches per project
  - `mix-blend-mode: difference` on 16 elements; `backdrop-filter: blur(17px)`
- **Steal:** one thing in focus, everything else dimmed or blurred.

## 4. Revelatio Studio
**Vibe:** Swiss-minimal plus hacker texture: ASCII, scramble, black and white.
- **Type:** **Neue Haas Grotesk Text 55 Roman at weight 400, and nothing else.**
  - stats 180px / 1.0 / −0.04em
  - cities 72px
  - H1 36px / 1.1 / −0.03em
  - lists 21px
  - meta 10.5–13.5px
- **Colour:** `#000` and `#fff`, plus alpha steps of 4, 8, 16, 32 and 64% for each. Theme tokens are `--tbg`, `--tfg` and so on.
- **Motion:**
  - ScrambleText runs on the preloader, the H1 and a cursor label.
  - The team video renders as coloured ASCII glyphs.
  - Sections invert black⇄white on enter.
  - The city list lights one word at a time, scrubbed by scroll.
  - Odometer stats at 180px.
  - The ASCII wordmark footer re-randomises on click.
  - Eases: `(.65,0,.35,1)` 0.7s fades, `(.22,1,.36,1)` 0.48s transforms, and a dedicated exit ease `(.625,0,.875,0)` at 0.8s.
- **Steal:** one font, one weight, and identity carried by text effects.

## 5. Graffico Office
**Vibe:** a cozy 1970s office at golden hour that you walk around in first person.
- **Input:** WASD, mouse-look, Shift to run, E to interact, Esc to release. The radio streams real stations, a monitor renders live HTML, and pulling the plug triggers a blackout.
- **Type:**
  - **Shrikhand** title: 36px
  - **Work Sans** UI: 15–16px
  - CTA in 700 caps at +0.1em; keycaps at 13.5px
- **Colour:** `#040F0F` teal-black, almond `#E7D7C1`, gold `#D4AF37`, CTA red ≈ `#B8412E`.
- **Detailing:** the controls card has a 16px radius, a 5% fill and `blur(2px)`; keycaps have a 6px radius.
- **Steal:** when the product is a place, let people inhabit it.

## 6. Dkton
**Vibe:** LOUD. A film sound designer's site that behaves like a mixing desk.
- **Flow:**
  1. An "ENTER THE EXPERIENCE" gate inside corner-bracket crop marks; the click unlocks audio.
  2. Seven gradient pills act as a live equalizer.
  3. Per-letter colour fill is scrubbed by scroll.
  4. Full-width service rows get wiped by solid purple `#A67EFF` and red `#FF4337` blocks.
  5. The pills rise into the showreel mask.
- **Nav:** a segmented control with per-section progress bars.
- **Type:**
  - **GT Walsheim Condensed 900 Italic** caps: **228px / 0.8**, 190px, 134px
  - 700 for statements: 64px
  - **Geist Mono 300** labels: 14–20px
  - fluid `clamp()` tokens
- **Colour:** `#000`, `#FFF`, brand `#FFB800`.
- **Motion:** expo-out `(.16,1,.3,1)` from 340ms to 1.2s, `elastic.out(1,.55)`, 4s `sine.inOut` idles, plus lens-flare keyframes.
- **Steal:** the subject (sound) becomes the interaction model, reused five ways.

## 7. Door Dennis
**Vibe:** a friendly, polished Dutch studio: frosted glass, fashion-mag serif, a visible grid.
- **Layout:**
  - **8 visible 1px grid lines** at `rgba(25,25,25,.2)`
  - reeded/fluted glass hero
  - chrome "DD" 3D monogram
  - mono pill nav with a 9.5px radius and hard offset shadow
  - orange `#FF5F37` CTA pills
- **Type:**
  - **Instrument Serif** caps, italic for emphasis: 66.7px
  - **Inter** body: 17px / **1.78**
  - **Roboto Mono** UI: 13–15px
- **Motion:**
  - 18 ScrollTriggers: 2 pinned, 8 scrubbed at 0.8–1
  - clip-path image reveals at 1.9s with `(0,.55,.45,1)`
  - menu stagger `(.83,0,.17,1)`
  - back-overshoot pops `(.68,-.6,.32,1.6)`
- **Steal:** a visible grid plus one glass material makes a service site feel crafted.

---

# Part B: The 13 new sites

## 8. Filmbot
**Vibe:** independent-cinema energy sold as B2B software. It starts editorial white and drops into a black screening room, with neon-red film stills and huge condensed caps. The tone is a confident pitch deck that feels like a festival programme: "Ticketing for the new era of **INDEPENDENT CINEMAS**".

### Layout and composition
- **Top ticker:**
  - a full-width black strip with a mono marquee: "★ Marquee Sponsor of the 2026 Independent Film Exhibition (IND/EX) conference · LATEST NEWS ·…"
  - two hard-edged rectangular buttons top-right: **FESTIVAL INFO** (black) and **→ CONTACT US** (red `#FF4040`)
  - mono 9–10px caps *(seen)*
- **Hero:**
  - a centred stack: a small eyebrow "TICKETING FOR THE NEW ERA OF" at 37.7px, then **INDEPENDENT / CINEMAS** at 135px, then "More than a platform, we're your partner." at 20px
  - The FILMBOT logo mark sits above and below the stack.
  - On the left, a **film still is masked into a stepped, rounded-corner glyph shape**, like a pixelated film strip or a piece of the logo, cropped by the viewport edge.
- **Statement block:** a two-tone paragraph at 59.6px / 0.92. The first sentence is ink (`#171717`) and the rest grey (`#9B9B9B`): *"This is a time of rebirth for collective film culture. We empower the cinema teams…"*. A tiny "Crafted in collaboration ✣ with those restoring the spirit of community around film" sits under it.
- **Photo scatter:**
  - About 8 cinema photos (marquees, audiences with popcorn, a red curtain) on a white field at different sizes and offsets.
  - They move at different scrubbed speeds, so the field parallaxes apart.
  - This is where 19–22 scrubbed triggers live (`scrub: true` and `0.2`).
- **Dark flip:**
  - A full-bleed red neon video ("SEAMLESS SUITE OF FEATURES", white 71.5px) hands off to a black page (`#0C0C0C` / `#101010`).
  - The background gains a **faint dashed grid of large rounded rectangles**, like an empty seating chart.
- **Black sections:**
  - "**BOLD WEBSITES**" at 186.7px over a mono micro bar chart: THEATRE WEBSITES vs SOCIAL MEDIA, in red bars with a footnote "*2026 national audience survey*".
  - A laptop showing a client's theatre site ("twilight cinemas") over a full-bleed film still.
  - "**IPAD BOX OFFICE**" next to a dark WebGL device render.
  - A testimonial in giant caps with curly quotes.

### Typography
Two families, self-hosted under neutral names: **"Font Sans Variable"** (200–800) and **"Font Mono Variable"** (200–800).

| Role | Size / LH / Tracking | Notes |
|---|---|---|
| Mega display ("BOLD WEBSITES") | **186.7px / 0.78 / −0.07em**, 700 caps | `--font-display-size: 11.75em` |
| H1/H2 | **135.1px / 0.78 / −0.07em**, 700 caps | `--font-h1-size: 8.5em` |
| H3 | 98.3px / 0.78 / −0.07em | |
| H4 | 71.5px / 0.78 / −0.06em | |
| Odometer stat digits | Mono **97.3px / 1.0 / −0.06em** | a 0–9 digit column per place |
| Statement (body-xl) | 59.6px / 0.92 / −0.07em, 700, sentence case | two-tone ink/grey |
| H5 / sponsor lines | 47.7px / 0.78 / −0.06em | |
| Eyebrow | 37.7px / 0.8 / −0.05em caps | |
| Body-l | 31.8px / 0.92 / −0.05em, 400 | |
| Body-s | **19.9px / 1.04 / −0.05em** | even body text is tracked tight |
| Captions | 17.9px / 1.0 / −0.05em caps | |
| Base body | `.6875em` (11px) | mono micro copy |

- **Every level is negatively tracked, and line-height never exceeds 1.04.** The tracking and line-height tokens are spelled out per level (`--font-h7-ls: -.04em`, etc.).

### Colour
| Token | Value | Use |
|---|---|---|
| `--color-background` | `#F9F8F8` | light half |
| `--color` | `#171717` | ink |
| `--color-grey-3` | `#494949` | secondary |
| grey | `#9B9B9B` / `#CBCBCB` / `#E0E0E0` | two-tone statements, dark-mode body |
| dark | `#101010`, `#0C0C0C`, `#1D1D1D` | dark half |
| **Signal** | **`#FF4040`** | CTA, chart bars, ticker |

- Radii are tiny (≈2–4px), with one 40px pill.

### Motion
- **Live GSAP inventory:**
  - `circ.out` 0.25s ×22 and `circ.inOut` 0.3s ×22: hover and UI micro-moves
  - `power1.out` 0.6s ×14
  - a CustomEase named **`expo-in-out`** at 1.06 / 1.15 / **1.6s**: the big section moves
  - `expo.inOut` 0.904s
- The light→dark flip is a scrubbed background change, not a cut.
- The stat numerals roll as odometers in mono.

### The one thing to steal
**Mask the hero video inside a shape cut from the logo's geometry.** The brand mark then becomes the window onto the content instead of a sticker on top of it.

---

## 9. LxL Creative
**Vibe:** a warm, cinematic UK entertainment agency. Think film-poster key art on chocolate-brown with cream type and a hot-orange **handwritten script** that crashes into the caps. It's friendly, crafted and slightly retro, "from a garden shed to a creative hub in Soho".

### Layout and composition
- **Hero:**
  - Left half: a portrait key-art photo in a **12px-radius card**.
  - Overlapping its bottom edge: a huge logotype, the script **"lxl"** in orange `#FF5121` plus "**creative**" in cream at roughly 130px *(seen)*, half on the photo and half on the brown.
  - Centre-right: a tiny 3-line stack, "REAL CRAFT. / *Real people.* / REAL RESULTS.", with the middle line in orange script tucked between the caps.
  - The nav is plain top-right Manrope 600 text: Work · Services · LxL Studios · About · Contact.
- **Video reveal:** on scroll, a behind-the-scenes video card grows from an inset to full-bleed (scrubbed). It then dims, and a **centred 55px statement in Owners Wide caps** runs over it with script words dropped inline in orange: "…FOR SOME OF THE *biggest* NAMES IN ENTERTAINMENT … CONSISTENTLY *brilliant* AND DELIVERED". A "Sound ●" toggle pill sits under it.
- **Services:**
  - Left: "*Our* SERVICES", with the script word above the caps, a short paragraph and an orange "All services →" pill.
  - Right: a **deck of 12px-radius poster cards** (UNIT, EDITORIAL, ACTIVATIONS…), each slightly rotated. The deck shuffles as you scroll and labels sit bottom-left on the image.
  - An **orange hand-drawn squiggle** (DrawSVG) draws itself through the section.
- **About:** a team photo card, with a single thick orange line that loops around it and off the page, drawn on scroll.

### Typography
| Role | Font | Size / LH / Tracking |
|---|---|---|
| Script display | **Scribo** 400 | 101.7px / 0.9 ("Why lxl", "Studios") |
| Script inline | Scribo | 98.8px / **0.3** (inline "biggest"; the tiny LH lets it overlap caps lines), 58.6 / 0.7, 51.4, 45.7 |
| Statement caps | **Owners Wide** 700 uppercase | 54.9px / 0.9; 42.3 / 1.0; 32.6 |
| Card labels / buttons | Owners Wide 700 caps | 22.9px; 15.4px / 1.2 |
| Lead | **Manrope** 600 | 28.6px / 1.0 |
| Body | Manrope 500 | 17.4px / 1.4, cream at 70% |
| UI | Manrope 600 | 14.4px, 13px |

- The token system is Lumos/Osmo-style: `--_typography---line-height--small: .9`, `medium: 1`, `large: 1.2`, `huge: 1.4`, `letter-spacing--tight: -.03em`, all fluid `clamp()` spacing on a 12-column grid.
- **The pairing is a super-wide grotesk with a brush script.** The script always crosses the caps and never sits on its own line.

### Colour
| Token | Value |
|---|---|
| Background | **`#27201D`** (dark chocolate) |
| Card | `color-mix(in srgb, bg, white 7%)` ≈ `#362F2D` |
| Text | **`#FCF2BD`** (butter cream), body at 70% |
| Accent (heading-accent / brand) | **`#FF5121`** orange |
| Second accent | `#055DFF` electric blue (used once, on "Studios") |
| Borders | white 20% at 2px, cream 20% at 1px |

- Radii: **12px ×66** (every card), 16, 20, plus 1440px pills.

### Motion
- **8 GSAP plugins are loaded:** Observer, ScrollTrigger, CustomEase, DrawSVG, Inertia, Draggable, Flip and SplitText. Barba handles page transitions.
- A CustomEase called **`osmo`** runs 1.5–3s tweens.
- CSS: `cubic-bezier(0.65, 0, 0, 1)`, with 0.2 / 0.3 / 0.45 / 0.8s durations.
- ScrollTriggers go from 20 to 26 as you scroll, with 7 scrubbed (`true` and `0.5`). The drawn lines and the card deck are the scrubbed parts.

### The one thing to steal
**One hand-drawn orange line that keeps drawing itself through the page** (DrawSVG plus scrub), paired with script words that interrupt the caps. Together they give a corporate agency a human signature.

---

## 10. What if George Orwell had a website
**Vibe:** propaganda-poster red, CRT surveillance and newsprint. It's a dark, literary interactive essay: oppressive, theatrical and slightly unsettling. You are being watched, and the site ends by telling you so.

### Layout and composition (a sequence of held scenes, not a page)
1. **Telescreen:**
   - Grainy red `#CC0000` fills a **CRT-shaped viewport**, with a black rounded bezel vignette eating the corners.
   - The four corners hold the Party slogans in tracked Bebas caps: BIG BROTHER IS WATCHING YOU / WAR IS PEACE / FREEDOM IS SLAVERY / IGNORANCE IS STRENGTH.
   - Centre: a silvery halftone **puppeteer's hand**, with the numerals **1 9 8 4 dangling from its fingertips on threads**, surrounded by black lens/eye discs.
2. **Doublethink:**
   - A white **eye** icon at the top.
   - An ink sketch of a line of bowed prisoners on the left.
   - A tiny "DOUBLETHINK" label at the centre.
   - A Bebas quote on the right: *"Until they become conscious they will never rebel…"*.
3. **Ministry of Truth:**
   - A newspaper, "THE TIMES — OCEANIA EDITION · MONDAY, APRIL 4, 1984 · VICTORY EDITION — ALL RECORDS VERIFIED BY MINISTRY OF TRUTH", tilted about −3°.
   - The headline **types itself** ("OCEANIA WIN" → "OCEANIA WINS WAR PE…").
   - Black **redaction bars wipe across** the body lines (`@keyframes redact-wipe`).
   - Then the whole page **bleaches to grey**, as if the record were rewritten.
4. **Who controls the past:** Big Brother's face as a rough ink drawing behind *"WHO CONTROLS THE PAST CONTROLS THE FUTURE…"*. Every word is set at its own jittered baseline and rotation, in white Bebas 900 at 79px.
5. **Thoughtcrime:**
   - A black, slightly warped **book** (the diary) in the centre.
   - Two walls of dense, faint Bebas text (Goldstein's book) on either side.
   - It ends on **"THOUGHTCRIME DETECTED / THIS SESSION HAS BEEN RECORDED"** in white over the red.

### Typography
| Role | Font | Size / LH / Tracking |
|---|---|---|
| Alarm headline | **Bebas Neue** 400 | 86.4px / normal / **+0.093em** |
| Newspaper headline | Bebas 700 | 86.4px / 0.9 |
| Jittered quote words | Bebas 900 | 79.2px |
| Literary quote | **EB Garamond** 400 (and italic) | 57.6px / 1.3 / +0.035em |
| Pull quote | Bebas | 31.7px / 1.15–1.4 / +0.063em |
| Corner slogans | Bebas | 25.9px / **+0.116em** |
| Session line | Bebas | 28px / +0.143em |
| Masthead | Bebas | 15px / **+0.267em** |
| Dateline | Bebas | 14px / +0.214em |
| Body columns | Bebas | 15px / 1.8 / +0.067em |

- **This is the inverse of the usual rule.** A condensed display face is set with **wide positive tracking** at every size, which gives a stencilled, state-issued tone. The serif appears only when Orwell himself "speaks".

### Colour
`#CC0000` red · `#1A1A1A` ink · `#F5F0E8` newsprint · `#000` bezel · white. Text alphas are 30%, 45% and 50% black. Everything sits under a grain layer: 3 canvases, with `screen` and `difference` blends.

### Motion
- **No ScrollTrigger.** It runs on GSAP 3.12 (SplitText, DrawSVG) plus Lenis, and the scenes are driven by the scroll position in custom code.
- **The scroll positions are stepped.** The wheel landed at 800 → 1161 → 1961 → 2688 → 3270 → 4070 → 4385 px, so scenes hold and then release.
- CSS keyframes: `s6-vignette-pulse`, `redact-wipe`, `truth-appear`, `s7-breathe`, `s7-flicker`. Ease: `cubic-bezier(0.77, 0, 0.18, 1)`, plus long ambient durations of 4, 5 and 9s.
- **`cursor: none`** with a custom cursor.

### The one thing to steal
**Make the motion carry the meaning.** Redaction bars that wipe text out, and a page that fades as history is "corrected", turn plain reveals into the story itself.

---

## 11. TILToooTILT — Everything Has Weight (Tote Inc., Tokyo)
**Vibe:** maximalist Tokyo fashion collage, like a Harajuku pop-up crossed with a baroque junk shop. It's loud, joyful and absurd. The tagline "Everything Has Weight" is literal: every object drops in and bounces.

### Flow
1. **Gate:** a full-screen **corrugated roller shutter** in oxblood, sprayed with pink/beige graffiti ("TILT", "the stars with music"). A small torn **peep-hole** shows a model in pink sunglasses whose colour cycles from blue to cyan to green. A hand-lettered "→ without SOUND" link sits at the bottom. The button is "**GO GO GO**".
2. **The room:** the shutter **rolls up**, revealing a 21:9 panorama:
   - a brick wall, Ionic columns and a chesterfield
   - stacked speakers and deer-head trophies wearing carnival masks
   - gold 3D "TILT TILT" letters
   - a **neon "WEIGHT" sign** that cycles green → blue → purple
   - a model in a black vinyl jumpsuit
3. **Objects drop in:** a zebra, flamingos, platform boots, roller skates, a skull crowned with flowers, a varsity jacket and jeans. Each falls with **`bounce.out` at 1.02 / 1.09 / 1.17 / 1.25 / 1.33s**, staggered by about 0.078s.
4. A hand-lettered "**←DRAG→**" label appears, and dragging **pans the whole room horizontally with inertia**.

### Typography
**No live text at all.** Every word (logo, buttons, labels) is a hand-lettered or 3D image, and the DOM has only image alts. The one CSS colour for text is `#FAF2E6`.

### Colour
- **Gate:** oxblood `#0F0000` body plus graffiti pinks.
- **Room:** fully photographic and saturated, with brick orange, gold, neon green, flamingo pink and zebra black/white.
- Blends: `overlay` and **`color-burn`** (on the shutter graffiti) *(inferred)*.

### Motion
- **GSAP 3.15 with Draggable + InertiaPlugin only.** Three.js is present, plus 2 canvases. The page is 900px tall and never scrolls.
- **Design tokens for a 4K stage:**
  - `--base: 3840`
  - `--pv: min(1vw, 19.2px)`
  - `--stage-h: calc(100vw * 9 / 21)`, so the room is a **21:9 letterbox** scaled from a 3840px design
- **CSS eases are the Penner set:**
  - easeOutCubic `(.215,.61,.355,1)` ×12
  - **easeOutBack `(.175,.885,.32,1.275)` ×7** (pops)
  - easeInCubic
  - **easeInBack `(.6,-.28,.735,.045)`** (anticipation)
- Durations are mostly **0.5s ×30**, plus 0.25 and 0.125.
- Keyframes: `loading`, `speaker` (speaker cones pulse), `rotate-loop`, `lightMove`, `drag` / `dragShow` / `dragHide`, `weight`. GSAP also runs `power2.out` 0.125s micro-moves ×10 and one `power2.inOut` 3s glide.

### The one thing to steal
**A physical gate that matches the brand**, here a shop shutter rolling up. Follow it with **gravity**: let content fall in with bounce eases so the page feels heavy and real.

---

## 12. Utopia Tokyo
**Vibe:** cyberpunk dystopia in a brutalist Swiss HUD. Red-on-ink, kanji, Noh/Oni masks under surveillance ("Masked. Marked. Watched."). It's intense and clinical, with real glitch energy behind a responsible photosensitivity warning.

### Flow and layout
1. **Loader:**
   - On ink `#14171F`, the edges are lined with dim red mono glyph columns ("[LOADING]", "U T O P I A", "VERSION RC.1") that scramble.
   - A **red modal "EXPERIENCE WARNING"** in stencil-pixel caps, with two buttons inside **corner-bracket crop marks**: `[ USE SAFE MODE ]` and `[ ENABLE GLITCH EFFECT ]`.
   - After the choice, two crossed katana silhouettes flash behind **five red vertical bars** (barcode-like).
2. **Hero:**
   - A **full red panel with 45° chamfered (clipped) corners**, inset about 10px from the viewport.
   - Wordmark **UTOPIA** (solid) + **TOKYO** (outline only) at 197px.
   - A ruled table of "MASKED. / MARKED. / WATCHED." in rows divided by 1px ink lines.
   - A coordinates readout "35.6762° N / 139.6503° E · JAPAN".
   - A boxed emblem, a `[ >_EXECUTE_CREATION ]` terminal button, a horizontal **ruler/slider scale**, "VERSION: 2.0.0-RC.1", and an Oni mask render cut off at the right.
3. **Explore:**
   - "EXPLORE MASKS OF UTOPIA TOKYO WHERE PAST AND FUTURE COLLIDE" in 160px red caps. Each line is a ruled table row, with micro data tags ("DATAMNEROODTN", "DATA_AGILITY") pinned to the rules.
   - A **giant outlined kanji** runs down the right edge.
   - A 3D Noh mask (Spline) floats in front with **RGB-split glitch slices**.
4. **Mask collection:** masks in **corner-bracket frames** on a red-dot grid. The mid frame shows the brackets snapping around each item.
5. **Branding:**
   - A red **hinomaru circle** grows across the viewport with black **東京** at 360px.
   - Two lines of words ("FACES OF TIME SHADOWS OF TOMORROW / MASKS OF UTOPIA TOKYO WHERE PAST AND FUTURE COLLIDE") are spread across the full width with huge gaps between them.
   - Then the circle leaves and the kanji turns red on ink. A mono marquee runs along the bottom.
6. **Footer:** "DISCOVER YOUR MASK" over an outlined katakana パワー, then a chamfered red panel with credits and "**PLAY MINIGAME**".

### Typography
| Role | Font | Size / LH / Tracking |
|---|---|---|
| Kanji | PPMori 600 | **360–384px** |
| Wordmark | **PPMori 600 + Neopixel 500, alternating per letter** | **197.3px / 0.76 / −0.02em** |
| Manifesto | PPMori 600/700 + Neopixel, caps | 160px / 0.9 / −0.02em |
| Mask names | PPMori 600 | 72–96px / 0.9–1.0 |
| Lists | PPMori 600 caps | 48px / 1.4 |
| Pixel numerals | Neopixel 500–800 | 160px, 72px, 40px ("100%") |
| Tokens | — | h1 3.5em/1/−.02em, h2 3.7em/.9/−.02em, h3 2.6em, h4 2em/1.05 |
| CJK pixel | **Zpix** | labels |

- **The signature move:** words are SplitText'd and individual letters are swapped into a pixel/stencil face (Neopixel), so "UTOPIA" reads as part grotesk, part LED sign. During glitch moments the letters flip between the two faces.

### Colour
| Token | Value |
|---|---|
| `--_color---brand--red` | **`#FF1919`** |
| `--_color---brand--black` | **`#14171F`** (blue-black ink) |
| `--_color---brand--cream` | **`#EBE5CE`** |
| neutral-700 | `#252525` |
| Alphas | each colour at 20% for rules and ghost text |

- **Borders are a heavy 3px** in ink, cream or red ×160+. Hairline rules are 1px cream at 20%.
- **Zero border-radius anywhere.** Corners are chamfered with clip-path instead.

### Motion
- **6 GSAP plugins live:** SplitText, Observer, ScrollTrigger, Flip, ScrambleText and DrawSVG. Plus Barba, Lenis and Spline.
  - 30–55 ScrollTriggers, 5 of them scrubbed (`1` and `true`).
  - Long linear tweens of 23–44s run the marquees.
- **CSS eases:**
  - `(.625,.05,0,1)` ×7
  - expo-out `(.16,1,.3,1)` ×6
  - quart-out `(.165,.84,.44,1)` ×5
  - `(.19,1,.22,1)` ×4
  - quint-out `(.22,1,.36,1)`
  - Durations are mostly **0.3s**, then 0.6s.
- **Keyframes:** `glitch-scan`, `glitch-noise`, `glitch-anim`, `glitch2`, `glitch3`, `clip`, `radar-travel`, `mp-pulse`, `spin-longitude`, `reveal-item-appear`.
- Blends: `difference`, `screen`, `exclusion`. `backdrop-filter` is used ×4.

### The one thing to steal
**Brutalist HUD furniture:**
- chamfered panels
- bracket-framed buttons
- coordinates, version numbers and data tags pinned to ruled lines
- a mixed-face wordmark (grotesk + pixel)

Plus a **real accessibility gate** that offers a safe mode before any flashing.

---

## 13. Lando Norris
**Vibe:** a premium athlete brand that's warm, playful and fan-facing. Off-white paper and dark olive meet a radioactive **lime**, with a racing-track contour map behind everything and his **handwritten signature** as the recurring motif. The tone is personal ("It doesn't matter where you start, it's how you progress from there."), not corporate F1.

### Layout and composition
- **Hero:**
  - Off-white `#F4F4ED` with faint **topographic contour lines**, which double as circuit outlines.
  - A cut-out portrait of Lando at the centre, with **helmet-visor fragments in yellow and black camo floating around his face**, like a helmet assembling in pieces (3D or canvas; there are 21 canvases on the page).
  - Top-left: a stacked logotype, "LANDO" in serif over "NORRIS" in sans.
  - Top-centre: the LN monogram.
  - Top-right: a **lime "STORE" button with a bag icon** and a square menu button.
  - Bottom-left: a small framed card, "NEXT RACE · Singapore GP", with a circuit outline and a laurel badge "McLaren F1 since 2019".
- **Message section:**
  - Dark olive `#282C20`.
  - Two rows of giant text **marquee in opposite directions** behind a monochrome portrait. The rows use 30s `translateXLeft` / `translateXRight` keyframes.
  - His **lime signature draws itself** across the photo (DrawSVG).
- **Manifesto:** a centred 105px statement in Mona Sans caps with **emphasised words swapped into Brier serif and lime**: "**REDEFINING** LIMITS, FIGHTING FOR **WINS**, BRINGING IT ALL IN ALL WAYS. DEFINING A **LEGACY** IN FORMULA 1 ON AND OFF THE TRACK."
- **Photo field:**
  - Small captioned photos ("QATAR, 2024", "BATTERSEA, 2024", "HIGH PERFORMANCE GALA, 2024") scattered across the viewport, each moving at its own parallax speed.
  - Handwritten-style serif quotes with a mini signature underneath.
  - The background crossfades olive → warm grey → off-white.
- **ON TRACK / OFF TRACK:** two big words, with a lime script "on" scribbled over the first. They lead into a full-bleed photo of the helmet.
- **Helmets:** a black grid of helmet renders in dark cards with **notched/chamfered lower edges** (like a tyre-wall) and labels ("Season 2025", "Discoball 2025", "Porcelain 2024", "GIF 2024").

### Typography
| Role | Font | Size / LH / Tracking |
|---|---|---|
| Emphasis serif | **Brier** 700 caps | **110px / 0.83 / −0.023em** (lime-off), 97.5, 93.3, 72.5, 62.5 |
| Statement sans | **Mona Sans Variable** 400 caps | 105.8px / 0.9 / −0.008em |
| Section heads | Mona Sans 700 caps | 93.3px / 0.82–0.85 / −0.036em; 70px; 60px / 0.886 / −0.028em |
| Sub-heads | Mona Sans 700 caps | 38px / 1.16; 32px / 1.125 |
| Tokens | — | `--text--impact: 7.9375rem` (127px), h1 4rem, h2 4.5rem, h3 2rem, `--text--eyebrow: .578rem` (9.25px) |

- **Mixing serif and sans inside one sentence**, with the serif carrying the colour, is the brand's voice.

### Colour
| Token | Value |
|---|---|
| `--color--white` | **`#F4F4ED`** |
| `--color--dark-green` | **`#282C20`** |
| `--color--black` | `#111112` |
| `--color--lime` | **`#D2FF00`** |
| `--color--lime-off` | `#B2C73A` (lime on light backgrounds; type) |
| green off-whites | `#DDE1D2`, `#B4B8A5`, `#EBEEE0` |
| tints | `#535450`, `#3B3C38`, grey-on-track `#B9BBAD` |

- **Two limes:** pure `#D2FF00` for fills on dark, and a muted `#B2C73A` for text on light, where pure lime would vanish.
- Radii: tokens of `1rem` / `3rem` / `6.25rem`, 44px cards and 7.2px buttons.
- Blends: `saturation`, **`plus-lighter`** and `difference`.

### Motion
- GSAP is **bundled** (`lando-by-OFF+BRAND.05.js`) and not global. The card lists ScrollTrigger, **MotionPath**, Flip and SplitText. Lenis is on.
- Ease: expo-out `(.19,1,.22,1)`.

### The one thing to steal
**A personal signature as the motion motif.** It's drawn over photos, scribbled over words ("on"), and repeated under quotes, so it gives a mass-market brand a hand-made feel.

---

## 14. Osmo
**Vibe:** a creative-developer toolkit that shows off its own resources. It feels light, nerdy and generous. A grey-and-charcoal base takes three electric accents (purple, acid green, coral), and handwritten margin notes make it feel like a friend's annotated notebook.

### Layout and composition
- **Nav:**
  - A **floating dark bar about 600px wide**, centred: "≡ Menu", the OSMO wordmark, a grey "Login" pill and an acid-green "Join" pill.
  - Under it, a **thin acid-green marquee strip** in mono: "NEW · TRY 20 RESOURCES FOR FREE ·…".
  - Further down the page the bar keeps only a ✱ mark.
- **Hero:**
  - "Dev Toolkit **✱** Built to Flex" at 112px, with a purple asterisk in the middle.
  - The subline places **grey chips inline** around keywords: "Platform packed with `Webflow` & `HTML` resources, `icons`, `easings` and a page transition `course`".
- **Card wheel:**
  - Below the hero, an **arc of dark 4px-radius preview cards** ("Collage Focus Card on Hover", "Mega Navigation (Directional Hover)", "3D Cards Carousel"…).
  - The cards are arranged like spokes and rotate as a wheel when you scroll. At the mid-frame they swing off the corners.
- **Reel line:** "Play [video] Reel". A small black video tile sits between the two words and expands. A coral **handwritten "See what it can do!"** with a hand-drawn arrow points at it.
- **Shape collage:** a purple card with a dotted dial, a black half-disc, and an acid-green card ("Globe Gallery"). Then a **huge light-grey circle that grows** to hold "We built Osmo to help creative developers…" and a purple "About the Vault" pill.
- **"The platform":** 150px, with a coral handwritten "(The Vault)" note and arrow.
- **Benefits:** tilted purple and green cards with "Discover" stickers. A 2-column list split by hairline rules.
- **Social proof:** a logo marquee, a dark rounded column "Connect Worldwide", and a purple testimonial card signed in script.
- **"Made with Osmo":** three words spread across the full width. A fan of green project screenshots rises below.
- **Footer:** a giant cropped **OSMO** wordmark bleeding off both sides, with mono legal tags as tiny boxed chips.

### Typography
| Role | Font | Size / LH / Tracking |
|---|---|---|
| Display | **Haffer XH** 400 | **150px / 0.9 / −0.05em**; 112px / 1.0 / **−0.06em** |
| Section heads | Haffer XH | 80px / −0.04em; 64; 62 |
| Paragraph-as-heading | Haffer XH | 40px / 1.05 / −0.03em |
| Prices / UI | **Haffer VF** (100–1000) | 36px / 1.08 / −0.02em; 24px |
| Labels | **Haffer Mono** | small caps |
| Annotations | **Brisa Pro** (handwriting) | 25px / 0.8, in coral, green or white |

- **One family in three cuts (XH, VF, Mono) plus a handwriting face for notes.** Even 40px "paragraphs" are tracked −0.03em.

### Colour
| Token | Value |
|---|---|
| `--color-neutral-200` (light) | **`#F4F4F4`** |
| `--color-neutral-800` (dark) | **`#201D1D`** (warm charcoal) |
| neutral scale | `#2A2727`, `#312E2E`, `#393636`, `#817F7F`, `#B8B8B8`, `#D8D8D8`, `#E1E1E1`, `#EAEAEA` |
| `--color-purple` | **`#6840FF`** |
| `--color-electric` | **`#A1FF62`** |
| `--color-coral` | **`#F84131`** (handwriting, "Join Osmo" in footer) |

- Radii by role:
  - 2–5px: chips and cards (×190)
  - 16px: panels
  - 48px: big blocks
  - 1600px: pills
  - 50%: discs

### Motion
- GSAP 3.15: Draggable, Inertia, Observer, ScrollTrigger, SplitText and CustomEase. Barba + Lenis.
- Only **5 ScrollTriggers, 1 scrubbed**. The richness comes from components, not scroll choreography.
- **36 HLS videos** autoplay as resource previews.
- CSS ease: **`cubic-bezier(0.625, 0.05, 0, 1)`** (the "Osmo ease" that appears on A24, Revelatio, Dkton, Utopia and Palmer too), with 0.2 / 0.6 / **1.4s** durations.

### The one thing to steal
**Handwritten margin notes with arrows** ("See what it can do!", "(The Vault)", "These folks are talented") placed next to big, clean grotesk headings. They add warmth and point the eye at what matters.

---

## 15. Ponpon Mania (interactive comic)
**Vibe:** a sugary cartoon pop album. Think Saturday-morning animation meets indie record sleeves: pastel-neon gradients, a fluffy sheep hero, and stickers. It's sweet, goofy and collectible.

### Flow and layout
- **Home:**
  - A periwinkle field with a **scalloped cloud-shaped window** cut through it.
  - Inside the window is a full illustrated scene:
    - an orange sunset with pink clouds and city towers
    - the sheep Ponpon arms-up on a pedestal
    - a grey wolf waiter, a green dino on its phone, and a smiling blue blob
  - A chunky white wordmark "ponpon mania", a rotating circular **badge sticker**, and a black pill "**read now**".
  - A cookie bar at the bottom: "Hey you ✨ This site uses cookies…" with white/black pills.
- **Transition:** clicking zooms the camera into the scene, then cuts to the chapter index.
- **Chapters:**
  - Each chapter is a **vinyl-album sleeve with a shrink-wrap plastic sheen**: "Welcome to Marny", "Under Pressure" (with a Parental Advisory label), "Sheep Don't Sleep", "Scratch That!" and "Wow…".
  - The active sleeve sits flat in the centre. Neighbours are rotated in 3D and recede.
  - A **music-player pill** sits under the active cover:
    - a play button (or a **padlock** for locked chapters)
    - "02.under pressure / PonponMania Vol. I / 02:06"
    - prev/next
- **Background per chapter:** a radial gradient plus film grain, recoloured each time (orange ring on pink, periwinkle ring, red/orange burst, purple on red).
- **Chrome:** an outline pill "chapters", the logo, "about", EN|FR, a grid icon bottom-left, and an outline "support us" pill bottom-right.

### Typography
- **Libre Franklin** variable (100–900) for UI: 15px / 700 "chapters", 13px cookie text, 6.6px credits.
- The logo, chapter titles and stickers are all **hand-lettered artwork**.
- Buttons fall back to **Arial** 600 at 35px ("read now"). It's a little rough, but it reads as intentionally plain next to the art.

### Colour
- Chrome: `#171717` and cream `#FEECE3`.
- Each chapter brings its own saturated gradient pair: periwinkle (~`#7B7BFF`), tangerine (~`#FFA21C`), bubblegum pink, tomato red (~`#EE3B2B`), lime *(seen)*.
- Radii are soft pills: 25, 30 and 42px.

### Motion
- Nuxt app, `overflow: hidden`, a single canvas. GSAP is bundled (the card lists ScrollTrigger and SplitText). **The wheel steps the carousel**: each tick advances one sleeve, and neighbours rotate in 3D during the move (mid-frame).
- CSS keyframes: `goofyAnimation`, `jump`, `logo`, `spin-in`, `scaleIn`, `slideUp` / `slideDown`.
- Default CSS eases are mostly `ease` / `ease-out`, at 0.1–0.4s with some 1–3s loops.

### The one thing to steal
**Package chapters as physical media** (album sleeves with a play bar, track numbers and running times) so a story reads like a tracklist people want to collect.

---

## 16. Palmer Dinnerware
**Vibe:** a quiet, tactile ceramics boutique. It's like walking over a table covered in hand-glazed plates. It feels calm, Scandinavian-adjacent and premium, with light type, lots of air, and the products as the only colour.

### Layout and composition
- **No page scroll.** The home page is an **infinite top-down canvas of plates and bowls**. Each is a cut-out photo with a soft drop shadow, scattered on `#F5F6EE`.
  - You **drag to explore**, with inertia.
  - Zoom **−/+** buttons and "✥ Drag to explore" sit bottom-right.
- **HUD:**
  - "palmer" logo top-left.
  - An "⁘ experience view" / "grid view" toggle top-centre.
  - Dark pill buttons "≡ menu" and "⚌ filter" bottom-centre.
- **Hover:** a tiny black tag appears beside the plate, e.g. "**+ Coco Green**".
- **Grid view:** the toggle **Flips** the scattered plates into a tidy 3-column grid. Each plate lands in a 1px-bordered square card with "Coco Blue … 7 Products" beneath.
- **Collection page:** a 120px light-weight title, split into letters, plus "Drag for more" carousels.

### Typography
| Role | Font | Size / LH / Tracking |
|---|---|---|
| Collection title | **TWK Lausanne 300** | **120px / 0.9 / −0.04em** (split per letter) |
| Lead | TWK Lausanne 300 | 18px / 1.4 / −0.03em |
| Body | TWK Lausanne 400 | 13.5px / 1.4 / −0.02em |
| UI labels | TWK Lausanne 500 | 12px / 1.4, 10.5px |

- One family. **The weight goes down (300) as the size goes up.** That's the opposite of most showcase sites, and it is the "quiet luxury" tell.

### Colour
`#F5F6EE` bone · `#222222` ink · `#E0E1DA` panel · `#A1A19C` hairline · `#FFFFFF` cards. Pale blush and sand tiles (`#FFCECE`, `#F3E0CF`) back individual collections. The cookie banner brings a brand magenta *(seen)*. All the colour is glaze: cobalt, celadon, rust and speckled grey.
- Radii: 3px ×50, 100px pills ×29, 9px ×21.

### Motion
- GSAP 3.15: Observer, **81 ScrollTriggers** (per-item reveals), SplitText, Inertia, Draggable, **Flip** and ScrollTo. Lenis. `dat.gui` is still shipped, a leftover from tuning.
- **Live tweens:** **`back.out(1.7)`** at 0.5–0.9s (playful pops) ×7, `power2.in` 0.5–0.6s exits, `power3` 0.5s, `power2.out` 0.6–0.8s.
- **CSS eases:**
  - A24's `(.509,.188,.041,.989)` ×7
  - the Osmo `(.625,.05,0,1)` ×5
  - quint-out `(.22,1,.36,1)`
  - quart-out `(.165,.84,.44,1)`
  - expo-out
  - easeOutBack `(.175,.885,.32,1.275)`
- Durations: 0.3s, then 0.6 and 0.4.

### The one thing to steal
**An "experience view ↔ grid view" toggle.** You get a playful, explorable canvas for browsing and one Flip back to a conventional grid for shopping, with the same objects animating between the two.

---

## 17. Two Capitals Studio
**Vibe:** space-age studio theatre. A black starfield, a moon horizon and a drifting astronaut give way to a calm warm-grey studio page. It's ambitious and showy, and a little "agency sci-fi".

### Flow and layout
1. **Gate:** a black screen holding nothing but a tiny "VISIT WEBSITE" link. It's a user gesture (for audio/sensors), and Lenis stays stopped until the click.
2. **Hero:**
   - A starfield with a grey **lunar surface** curving up from the bottom edge, and two tall angled **glass panels** standing on it, catching reflections.
   - Heading "WE CREATE DIGITAL / SOLUTIONS FOR YOUR BUSINESS" in GothamPro caps, signed "– TWO CAPITALS STUDIO".
3. **HUD:**
   - Bottom-left: **"Battery: [53%] / Charging: [In Progress]"**, from the real Battery API.
   - Right edge: a vertical **scroll-percentage** readout ("33%").
   - Bottom-right: a spinning wireframe globe.
   - Top-left: a "TCS" bracket box. Top-right: EN/UA and a square menu button.
4. **Scroll:**
   - The heading **tilts into 3D perspective** and slides off.
   - An astronaut floats up from below.
   - The black "space" then **lifts away as a curved horizon arc**, uncovering a warm-grey section with a **dot grid**.
   - "ABOUT" shows with a **scrambling** line ("CREATIVE WEB STUDIO FO[]-!+]…").
5. **Services:** a **deck of dark cards** with space imagery and moon horizons: BRANDING, UX/UI DESIGN, CREATIVE DESIGN, DEVELOPMENT. Each card holds a bulleted service list, and the deck stacks and peels with scroll.
6. **Closing line:** "Your unique website is just a …" at 97.5px.

### Typography
| Role | Font | Size / LH |
|---|---|---|
| Big statement | **GothamPro** | 97.5px / 1.1 |
| Statements | GothamPro | 52.5px / 1.1 (×53 split words) |
| Nav (menu open) | GothamPro caps | 25.5px |
| Marquee letters | **Manrope ExtraBold** caps | 60px (×86 split letters) |
| Card titles | Manrope ExtraBold caps | 45px |
| Body / lists | Manrope Regular | 21px; micro 12–13.5px |

### Colour
`--bg-color: #E5E4E0` (warm grey) · `--text-color: #222` · `--bg: #000` (space) · `--accent: #2628A5` (ultramarine, for the "ABOUT" label and active states) · `--grey: #EEE` · `--grey-btn: #555` · `--star: #C2C2C2`. Radii: 7.5px cards, 3.75px small. One `difference` blend.

### Motion
- A custom bundle, `main.js`. GSAP isn't global; the card lists ScrollSmoother, Observer, **MorphSVG, DrawSVG, MotionPath**, Flip and SplitText. 9 canvases.
- **One house ease is used 57 times: `cubic-bezier(0.39, 0.52, 0, 1)`.** It's a soft start into a long, smooth settle. Durations: 0.8s ×23, 0.6s ×15, 1.2–1.3s, plus a 15s `rotation`.
- Keyframes: `low-b` (low battery?), `rotation`, `mask-dis`.

### The one thing to steal
**Live device data in the HUD.** The battery level and charging state are trivially cheap, and they make the page feel aware of the person visiting it.

---

## 18. Cash App Brand Guidelines
**Vibe:** a brand system shown as a toy shelf. On pure black, a grid of looping 3D "objects" (a squishy $ coin, a jelly purse, a can, a card, a 62% ring, a matcha, a candy-filled glass $) feels collectible, tactile and very Gen-Z fintech. It's confident and minimal, and all the noise lives in the renders.

### Flow and layout
- **Loader:**
  - Black, with a centred rounded-square **app icon that cycles through brand variants**: blue tile with a green $, then an op-art moiré, then an engraved white S.
  - A tiny spinner and a percentage underneath (24% → 74% → 98%). The body cursor is `wait`.
- **Home:**
  - A 5-column grid of square tiles, each a **looping video of one 3D object** (31 videos).
  - The **whole grid pans opposite to the cursor** (parallax), so moving to a corner reveals more tiles.
  - Nav: the $ logo top-left, "**Brand Guidelines**" centred, and Foundations ⌄ / Expressions ⌄ / Resources ⌄ top-right.
  - A footer of legal micro-copy at 10px / 1.5, white at 70%.
- **Click a tile:**
  - Every other tile fades out.
  - The chosen one stays put, then **Flip-grows into the hero** of its page (`/idents`), with a spinner as it loads.
  - Swup swaps the route underneath.

### Typography
**CashSans** only (400 / 500 / 600 / 700).

| Role | Size / LH / Tracking |
|---|---|
| Page titles | 122.4px / 1 / 0 ("Foundations"); 117px / 1 / −0.015em |
| Secondary (grey) | 86.4px / 1, `#858585` |
| Menu items | 16px, 500 / 700 |
| Legal | 10px / 1.5, white 70% |

- **Tokens are viewport-based:** `--font-size-h0: 24vw`, `h1: 8vw`, `h2: 4vw`, then fixed h3–h5 at 20 / 18 / 16px.

### Colour
`--black: #000` · `--white: #fff` · **`--green: #00D533`** (Cash green) · `--light-grey: #D8DBE1` · `--grey: #858585`. Chroma comes from the renders: greens, gradient purples and pinks.
- Radii: 15px, and **15%** for squircle app icons.

### Motion
- **The whole Penner ease set is declared as CSS variables:** `--power1-in/out/in-out` … `--power4-*`, `--expo-in`, `--expo-out: cubic-bezier(.19,1,.22,1)`.
  - default `--easing: var(--power2-out)`
  - `--speed: .3s`, `--speed-slow: .6s`
  - a `--bounce` ease
- GSAP is bundled (the card lists ScrollTrigger and Flip). Swup handles transitions.

### The one thing to steal
**Grid → Flip → hero.** Keep the clicked thumbnail on screen while the context fades, then grow it into the next page's hero, so navigation never breaks continuity.

---

## 19. No Art
**Vibe:** an Amsterdam underground label, raw and editorial. It's white space, an all-caps typewriter mono and justified text with crop marks. It looks like a festival zine or an archive catalogue and feels cool, art-school and technical, with one emergency red.

### Layout and composition
- **Hero:** a full-bleed festival-crowd video with a **hand-scrawled "NoART" logo** floating on it. On scroll, the video **collapses into a thin strip header** carrying:
  - the nav: "■ SHOP ■ GALLERY ■ TICKETS ■ FOUNDATION"
  - a "Next up: NO ART LISBON · OCTOBER 10, 2026" mini card with a thumbnail
- **Framing:** every section is boxed by **crop/crosshair marks at the corners and edge midpoints** (⊢ ⊣ ⌐ ┘), like a print proof.
- **About:** the H2 "AN EXPERIENCE WHERE MUSIC, ART AND PEOPLE UNITE" sits left, **justified in caps so the word gaps stretch**. A justified mono paragraph sits right, with "MORE ABOUT US ↘".
- **Upcoming events carousel:**
  - The centred event poster (Keith-Haring-style figures) is full colour inside a thin frame.
  - **Neighbours are washed to about 30%.**
  - A red tag "**INFO & TICKETS ↘**" and "‹ PREV |||| NEXT ›" with a bar-count pager.
- **Globe:**
  - A Three.js **wireframe globe** in light grey with **red pins**, rotating to the active city.
  - "LAT: 14.3239° N / LON: 117.3301° W" readouts update as it turns.
  - A **live "LOCAL TIME: 14:40:13 / TIME ZONE: GMT+8"** block.
- **Shop:** the same focus/dim carousel with merch photos, "+ YELLOW CANVAS TEE €54,95", and a red "SHOP NOW ↘" tag on the focused item.
- **Footer:** a boxed table with **bracketed column heads** ([EXPERIENCE] [COMPANY] [SUPPORT] [CONTACT] [FOLLOW] [COMMUNITY]) and ↗ arrows on links.

### Typography
| Role | Font | Size / LH / Tracking |
|---|---|---|
| Headings | **Neue Haas Grotesk Text Pro** 600/700 caps | **47.5px / 1.0 / −0.03em**, justified |
| Body | **Chivo Mono** 400 caps | 17.8px / 1.2, justified |
| Labels / nav / tags | Chivo Mono 400/500 caps | 11.9px / 1.2 |
| Code-ish | JetBrains Mono | small |
| Tokens | — | heading large 6em, medium 2em; rich-text h1 6em, h2 4em, h3 2.5em |

- **Justified all-caps mono body text** is rare and very effective here. The rivers become texture.

### Colour
`#FFF` · `#000` · `#808080` grey · **`--_colors---brand--100: #FF2B29`** red. Alpha tokens: dark 20 / 50 / 80% and light 20 / 50%. **Radius tokens are all 0**; only the 2px tags and 1000px pills are rounded.

### Motion
- GSAP 3.15 with 8 plugins: Observer, ScrollTrigger, SplitText, ScrambleText, Flip, CustomEase, Draggable and Inertia. Plus Lenis, Three.js, Swiper and Shopify (Shopyflow).
- **Live tweens:** **`power4.inOut` 0.8s ×5** (carousel slides), `power4.out` 0.6–1s, `power3.out` 0.4s, plus a 0.05s `power4.inOut` (scramble ticks).
- CSS: expo-out `(.16,1,.3,1)` ×12, Osmo `(.625,.05,0,1)` ×4; durations 0.3–0.8s.
- There's a `difference` blend on the header over the video.

### The one thing to steal
**Print-proof framing**: crop marks, bracketed labels and justified mono caps, plus **live geo-data** (lat/lon, local time) tied to a rotating globe. The result is an archive aesthetic with almost no colour.

---

## 20. IKEA "Desmontando los 30" (30th anniversary, Spain)
**Vibe:** a children's marble-run toy rendered like a premium product film. Warm birch, primary-colour blocks and rolling balls make it nostalgic, cheerful and family-friendly. Everything is assembled from IKEA's building-block language.

### Flow and layout
- **Loader:** an **extreme macro close-up of a curved wooden/plastic marble-run track** (blue, orange, red bands), with a white **"51%"** counter and three pulsing dots (`loaderDotPulse`).
- **Reveal:** the camera pulls out to show **"30" built from beech marble-run tracks** on a floor of colour blocks: coral pink, cobalt blue, mustard yellow and **terrazzo**. Blue, red and yellow balls roll through the numerals.
- **Intro:**
  - The view **pans down a single vertical track**.
  - On the right, white "DESMONTANDO LOS 30" in big bold caps, then: "Hace 30 años que llegamos a la Península… ¿Empezamos?"
  - A "Desliza" label (Spanish for "swipe") with a circled ↓ that nudges (`scrollArrowNudge`).
- **Participation:**
  - The layout **splits**: the track on the left (the background shifts from grey to a soft yellow gradient), and a white panel on the right.
  - The panel holds the IKEA Family card-number input (a long, light, round field), an "Aceptar bases legales" checkbox, and a **blue "Participar" pill**.
  - Error copy is pink `#FB6579`.

### Typography
**NotoIKEALatin** 400/700 only.

| Role | Size / LH / Tracking |
|---|---|
| Counters | 64px / 1.06 / −0.034em |
| Copy blocks | 20px / 1.2 / **−0.11em** (very tight, as computed) |
| Body / buttons | 16px / 1.25–1.5 |
| Help / errors | 12–14px / 1.4 |

### Colour
- Warm grey stage ≈ `#C9C5BD` *(seen)*, drifting to pale butter yellow (`ambientGradientDrift`).
- **IKEA blue `#0058A3`** for the CTA. White panels, `#FAFAFA` and `#F5F5F5` fields with a `#CBCBCB` 1px border.
- Error pink `#FB6579`.
- Translucent white UI at 30% and 70% over the render, with `backdrop-filter` ×5.
- All other chroma comes from the 3D render: pink `#F07A7A`-ish, cobalt, mustard, birch *(seen)*.

### Motion
- Next.js (Turbopack) + Tailwind + Lenis (stopped while the stage is hijacked; `overflow: clip`). GSAP is bundled (the card lists ScrollTrigger and SplitText, with useGSAP).
- **The stage is a pre-rendered video sequence** (3 videos), and each wheel or swipe advances a chapter.
- Ambient CSS keyframes keep it alive between steps:
  - `floatDrift`, `floatWobble`, `floatPulse` (floating UI)
  - `scrollNumberFloatA` / `B`
  - `ambientGradientDrift`
- CSS eases: `(0,0,.1,1)`, expo-out `(.19,1,.22,1)`, cubic-out `(.33,1,.68,1)`; 0.2s UI and 0.7–1.5s ambient.

### The one thing to steal
**Build the brand's number out of the brand's product** (the "30" from marble-run tracks), and use the camera move (macro → wide → pan) as the loader, reveal and navigation all at once.

---

# Part C: Across all 20

## C1. Input / scroll models (seven, not four)
| Model | Sites | When it fits |
|---|---|---|
| **1. Hijacked stage**: the wheel steps an index (`overflow:hidden`) | A24, Huy Phan, Ponpon Mania, IKEA | Catalogues and stories where each item *is* a scene |
| **2. Camera-path scrub**: scroll = timeline of a 3D or video camera | Illoca, IKEA (partly) | One continuous space you fly through |
| **3. Native smooth scroll + set pieces** (Lenis + pins, scrubs, inversions) | Revelatio, Dkton, Door Dennis, Filmbot, LxL, Utopia, Lando, Osmo, TCS, No Art | Long-form marketing; the safe default |
| **4. Held scenes**: native scroll that stops on each scene | Orwell | Essays and narratives |
| **5. Drag canvas**: no scroll; Draggable + Inertia pans a plane | Palmer, TILToooTILT | Collections you browse rather than read |
| **6. Cursor-panned grid**: no scroll; the grid shifts against the pointer | Cash App | Object libraries and brand systems |
| **7. Game controls**: WASD + pointer lock | Graffico | When the product is a place |

**Gates before the experience** appear on 6 of 20:
- Dkton: audio "ENTER THE EXPERIENCE"
- Utopia: photosensitivity "SAFE MODE / GLITCH"
- TCS: "VISIT WEBSITE"
- TILT: "GO GO GO" shutter
- Ponpon: "read now"
- Graffico: "ENTER THE OFFICE"

Gates exist to earn a user gesture (for audio or sensors) or to warn. The best ones (TILT's shutter, Dkton's viewfinder) are themed props, not dialogs.

## C2. Stack reality
- **Lenis is on 16 of 20 sites.** The exceptions are Huy (Framer), Graffico (game), Ponpon (canvas) and Cash App (Swup only).
- **Webflow on 9 of 20:** Revelatio, Dkton, Filmbot, LxL, Utopia, Lando, Osmo, Palmer and No Art. A24 is on Astro but uses Client-First-style tokens. Most use Lumos/Osmo-style `--_typography---…` tokens with fluid `clamp()`.
- **GSAP is often not global.** Lando, TCS, Cash App, Ponpon, IKEA, Illoca, Huy and Graffico bundle it. Where it is global, 3.15 dominates (one site runs 3.14, and Orwell and Door Dennis run older 3.12 and 3.11).
- **Plugins beyond the core kit, by count:**
  - Draggable + Inertia: Osmo, Palmer, LxL, TILT, No Art
  - Flip: Palmer, Cash App, LxL, Utopia, No Art, Lando
  - DrawSVG: LxL, Orwell, Utopia, Lando (signature)
  - ScrambleText: Revelatio, Utopia, No Art, TCS
  - MotionPath: Lando, TCS
- **Page transitions:** Barba (A24, LxL, Utopia, Osmo), Swup (Door Dennis, Cash App), custom (Revelatio).
- **3D:** Three.js on 7 sites (A24, Illoca, Huy, Graffico via R3F, Door Dennis, TILT, No Art), Spline on 1 (Utopia), pre-rendered video on 2 (Cash App, IKEA), and baked photo collage on 1 (TILT). **Pre-rendered video is a valid "3D" choice.**

## C3. Typography: measured rules
**Display size**: the largest live text per site, at 1440px.

| Site | Biggest | LH | Tracking |
|---|---|---|---|
| Utopia | 384px (kanji), 197px wordmark | 0.76 | −0.02em |
| Dkton | 228px | 0.8 | −0.017em |
| Huy | 220px | 0.96 | −0.05em |
| Filmbot | 186.7px | **0.78** | **−0.07em** |
| Revelatio | 180px | 1.0 | −0.04em |
| Osmo | 150px | 0.9 | −0.05em |
| Cash App | 122px | 1.0 | 0 |
| A24 / Palmer | 120px | 0.9–1.0 | −0.04em |
| Illoca | 111px | 0.9 | 0 |
| Lando | 110px | 0.83 | −0.023em |
| LxL | 102px (script) | 0.9 (inline script **0.3**) | 0 |
| TCS | 97.5px | 1.1 | 0 |
| Orwell | 86px | ≈1 | **+0.093em** |
| Door Dennis | 67px | 1.2 | 0 |
| No Art | 47.5px (justified) | 1.0 | −0.03em |

**What the 20 agree on:**
1. **Display line-height is ≤ 1.0 almost everywhere.** The only measured exceptions are Door Dennis (1.2) and Two Capitals (1.1). The tightest is Filmbot at 0.78 on every heading level.
2. **Negative tracking on display is the norm** (−0.02 to −0.07em). Filmbot, Osmo and Huy go past −0.05em. **The one counter-example is Orwell**, which tracks condensed caps *positive* (+0.09 to +0.27em) for a state-issued tone. Positive tracking reads as authority and coldness, negative as confidence and warmth.
3. **The middle sizes are empty.** Most sites jump from 100–200px display to 10–18px UI. A24 jumps from 120px straight to 7.5px.
4. **Pairing patterns seen:**
   - **grotesk + handwriting**: Osmo (Brisa Pro), LxL (Scribo), Illoca (Architect Pro), Lando (signature)
   - **sans + serif inside one sentence**: Lando (Mona Sans + Brier), Door Dennis (Instrument Serif italics)
   - **grotesk + pixel face swapped per letter**: Utopia (PPMori + Neopixel)
   - **grotesk + mono**: Filmbot, Revelatio-style, Dkton, No Art, Illoca
   - **one family only**: Revelatio, Palmer, Cash App, IKEA, Filmbot (sans + mono of one family)
   - **no live type at all**: TILT; Ponpon is nearly so (all lettering is artwork)
5. **Justified text is back.** No Art (justified mono caps) and Utopia (words spread across the full width) use word gaps as texture.
6. **Weight goes down as size goes up** for luxury: Palmer at 300 for 120px, A24's hairline Eiko. Weight goes up for energy: Dkton 900, Filmbot 700.

## C4. Colour structures
| Structure | Sites | Notes |
|---|---|---|
| Neutral pair + one signal | Filmbot (`#FF4040`), No Art (`#FF2B29`), Door Dennis (`#FF5F37`), Dkton (`#FFB800`), Huy (`#FF4949`) | Signal used ≤5% of area; red-orange dominates |
| **Two-colour poster** | Orwell (`#CC0000` + ink), Utopia (`#FF1919` + `#14171F` + cream) | Red as a *field*, not an accent |
| **Tinted dark base**, not black | LxL `#27201D` chocolate, Lando `#282C20` olive, Graffico `#040F0F` teal, Utopia `#14171F` blue-black, Osmo `#201D1D` warm charcoal | Every "dark mode" here is tinted; none uses neutral `#111` as its main dark |
| **Off-white base**, not white | Lando `#F4F4ED`, Palmer `#F5F6EE`, TCS `#E5E4E0`, A24 `#F2F2F2`, Illoca `#EADFC9`, Filmbot `#F9F8F8`, Osmo `#F4F4F4` | Slight warm or green tint |
| Multi-accent system | Osmo (purple `#6840FF`, electric `#A1FF62`, coral `#F84131`) | Each accent has one job: CTA, highlight, handwriting |
| **Two versions of one accent** | Lando: `#D2FF00` for fills on dark, `#B2C73A` for text on light | Solves neon-on-white legibility |
| Colour from content | A24, Huy, Palmer, Cash App, TILT, Ponpon, IKEA | UI stays neutral and renders or photos supply the chroma |
| Alpha scales instead of greys | Revelatio, Utopia (20%), No Art (20/50/80%), LxL (cream 70%) | |

## C5. Detailing vocabulary (cheap, high perceived craft)
| Detail | Seen on | Build |
|---|---|---|
| **Corner-bracket / crop-mark frames** | Dkton, Utopia, No Art, Huy | 4 L-shaped pseudo-elements; snap in on hover |
| **Chamfered (45°) corners** | Utopia panels, Lando helmet cards | `clip-path: polygon(...)` with 12–20px cuts |
| **Live data in the HUD** | Illoca (cursor XY), Huy (clock), Revelatio (Brazil time), A24 (timecode), TCS (**battery**), No Art (**lat/lon + local time**), Utopia (coordinates, version string), Filmbot (news ticker) | `setInterval`, `navigator.getBattery()`, pointer events |
| **Handwritten annotations with arrows** | Osmo, Illoca, LxL, Lando | Script font + an inline SVG arrow drawn with DrawSVG |
| **Inline chips inside sentences** | Osmo hero ("`Webflow` & `HTML` resources") | `<span>` with a 4px radius and a 7–10% fill |
| **Inline media inside a headline** | Osmo ("Play [video] Reel"), Filmbot (logo-shaped video mask) | Inline-block video that Flips to fullscreen |
| **Focus + dim carousels** | Huy (25%), No Art (~30% washed), Ponpon (3D tilt), Palmer hover tag | Active item at opacity 1; others at 0.25–0.3 or blurred |
| **Grain / CRT / film overlays** | A24, Orwell (CRT bezel + grain), Ponpon (grain on gradients) | Canvas or SVG-noise overlay; vignette keyframes |
| **Visible grids** | Door Dennis (8 lines), Filmbot (dashed rounded cells), TCS / Utopia (dot grids), Illoca (graph paper), Lando (contour lines) | Fixed background layer at 10–20% ink |
| **Physical-media metaphors** | A24 (DVDs), Ponpon (vinyl sleeves + player), Orwell (newspaper, book), TILT (shop shutter), Palmer (table of plates), IKEA (toy track) | The UI is an object |
| **Tiny/zero radii** | Utopia 0, No Art 0, Illoca 1.5–4px, Filmbot 2–4px | Brutalist/print tone |
| **Soft/large radii** | LxL 12px, Osmo 16–48px, Ponpon 25–42px pills, Lando 44px | Friendly/product tone |

## C6. Motion signatures worth stealing
| Effect | Seen on | How |
|---|---|---|
| Odometer digits | A24, Huy, Revelatio, Filmbot (mono 97px) | A 0–9 column per digit, `yPercent` tween, masked |
| Scramble / decode | Revelatio, Utopia, No Art, TCS, Door Dennis | ScrambleTextPlugin with chars `"!^%=#@$[]"` |
| Self-drawing line | LxL (squiggle), Lando (signature), Orwell (threads) | DrawSVG + `scrub` |
| Redaction / wipe bars | Orwell, Dkton (colour wipes) | `scaleX` from 0 on black bars over text; clip-path wipes |
| Letter-face swap | Utopia (grotesk ↔ pixel) | SplitText chars; toggle `font-family` per char on a stagger |
| Opposing marquees | Lando (30s each way), Utopia, Filmbot ticker, Osmo strip | Two rows, `xPercent: -50` / `+50` linear loops |
| Inset → full-bleed video | LxL, Revelatio, Filmbot | Scrubbed `clip-path: inset()` or scale on a pinned wrapper |
| Parallax photo scatter | Filmbot, Lando | 6–10 absolutely placed images, each with its own scrubbed `y` speed |
| Card deck shuffle | LxL services, TCS services, Osmo "Made with" fan | Stacked cards; per-card `rotation`/`y` scrubbed; z-order swap |
| Rotating card wheel | Osmo hero | Cards placed on a circle; the wheel's `rotation` driven by scroll |
| Gravity drop-in | TILT (`bounce.out` ~1.0–1.3s staggered by 0.078s), Palmer (`back.out(1.7)`) | Stagger from above with bounce or back eases |
| Drag canvas + inertia | Palmer, TILT | Draggable `type:"x,y"` + `inertia:true`; wrap or clamp bounds |
| Scatter ↔ grid Flip | Palmer | `Flip.getState()` → toggle class → `Flip.from(state, {duration:.8, ease:"power2.inOut"})` |
| Tile → hero Flip | Cash App | Fade the siblings, Flip the clicked tile into the next page's hero slot |
| Cursor-panned grid | Cash App | `quickTo` on grid `x`/`y` mapped from pointer −0.5..0.5 |
| Theme flip | Revelatio (inversion), Filmbot (white→black), Lando (olive→grey→white), TCS (space→warm grey via curved horizon) | Scrub `--bg` / `--fg` or a curved mask |
| 3D text tilt-out | TCS | `rotationX/Y` + `z` on the heading, scrubbed to exit |
| Stepped / held scenes | Orwell | Pin each scene for a fixed distance; content tweens inside |

## C7. Easing cheat-sheet (all 20)
```css
/* UI in-out: the most common curve across the showcase (A24, Revelatio, Dkton, Utopia, Osmo, Palmer, No Art) */
--ease-osmo:        cubic-bezier(0.625, 0.05, 0, 1);
/* Big settles */
--ease-out-expo:    cubic-bezier(0.16, 1, 0.3, 1);      /* Dkton, Utopia, No Art ×12 */
--ease-out-expo-2:  cubic-bezier(0.19, 1, 0.22, 1);     /* Lando, Utopia, Palmer, IKEA, Cash App --expo-out */
--ease-out-quint:   cubic-bezier(0.22, 1, 0.36, 1);     /* Revelatio, Door Dennis, Utopia, Palmer */
--ease-out-quart:   cubic-bezier(0.165, 0.84, 0.44, 1); /* Utopia, Palmer, Cash App --power3-out */
--ease-a24:         cubic-bezier(0.509, 0.188, 0.041, 0.989); /* A24, Palmer ×7 */
--ease-tcs:         cubic-bezier(0.39, 0.52, 0, 1);     /* Two Capitals: one house ease ×57 */
--ease-lxl:         cubic-bezier(0.65, 0, 0, 1);        /* LxL: sharp in-out */
--ease-orwell:      cubic-bezier(0.77, 0, 0.18, 1);     /* Orwell: heavy in-out for scene changes */
/* Character */
--ease-back-out:    cubic-bezier(0.175, 0.885, 0.32, 1.275); /* TILT ×7, Palmer: pops */
--ease-back-in:     cubic-bezier(0.6, -0.28, 0.735, 0.045);  /* TILT: anticipation */
--ease-back-pop:    cubic-bezier(0.68, -0.6, 0.32, 1.6);     /* Door Dennis */
--ease-exit:        cubic-bezier(0.625, 0, 0.875, 0);        /* Revelatio: fast exits */
/* GSAP strings seen live:
   Filmbot:  circ.out .25 / circ.inOut .3 (UI), CustomEase "expo-in-out" 1.06–1.6s (sections)
   No Art:   power4.inOut .8 (carousel), power4.out .6–1
   Palmer:   back.out(1.7) .5–.9, power2.in .5 exits
   TILT:     bounce.out 1.02–1.33 staggered, power2.out .125 micro
   A24:      power3.out .4/.8;   Dkton: elastic.out(1,.55), sine.inOut 4s idles
   LxL:      CustomEase "osmo" 1.5–3s                                              */
```
**Durations cluster in three bands:**
- **UI: 0.1–0.3s.** Utopia uses 0.3s ×28, TILT 0.5s ×30, Filmbot 0.25 / 0.3.
- **Content: 0.6–0.9s.** No Art 0.8, TCS 0.8 ×23, Palmer 0.5–0.9.
- **Hero / section: 1.1–1.9s.** Filmbot 1.6, Osmo 1.4, Door Dennis 1.9, Dkton 1.2.

Ambient loops run 4–44s. Exits are faster than entrances wherever both exist.

## C8. Vibe matrix (all 20)
| # | Site | Temperature | Energy | Personality | Signature |
|---|---|---|---|---|---|
| 1 | A24 | cool paper grey | very low | curatorial, reverent | DVD disc carousel, 120px hairline serif |
| 2 | Illoca | warm beige + blueprint blue | low–med | thoughtful, crafted | handwriting + halftone 3D camera |
| 3 | Huy Phan | neutral + red | med–high | cheeky, award-proud | mascot wall-push, S-curve ribbon |
| 4 | Revelatio | pure B/W | low (glitchy) | Swiss, technical | ASCII video, one font one weight |
| 5 | Graffico | warm sepia dark | low, cozy | playful, game-like | walkable office |
| 6 | Dkton | black + hot yellow | **very high** | loud, musical | EQ pills everywhere |
| 7 | Door Dennis | light grey + orange + glass blue | medium | friendly, polished | visible grid + fluted glass |
| 8 | Filmbot | white → black + red | medium | confident, cinephile B2B | logo-shaped video mask, −0.07em caps |
| 9 | LxL | chocolate + cream + orange | medium | warm, crafted, retro | script crashing into wide caps, drawn squiggle |
| 10 | Orwell | blood red + newsprint | low, ominous | literary, unsettling | redaction wipes, CRT bezel, positive tracking |
| 11 | TILToooTILT | saturated maximal | **very high** | absurd, joyful | shutter gate, bouncing objects, drag room |
| 12 | Utopia Tokyo | red + blue-black + cream | high (glitch) | clinical cyberpunk | chamfered HUD, pixel/grotesk letter swap |
| 13 | Lando Norris | off-white/olive + lime | med–high | personal, fan-facing | drawn signature, serif-in-sans emphasis |
| 14 | Osmo | light grey + purple/acid/coral | medium | nerdy, generous | handwritten margin notes, card wheel |
| 15 | Ponpon Mania | pastel-neon gradients | high, sweet | goofy, collectible | album-sleeve chapters with player bar |
| 16 | Palmer | bone white | very low | quiet luxury | drag table of plates ↔ Flip grid |
| 17 | Two Capitals | space black → warm grey | medium | showy sci-fi | battery HUD, 3D text tilt, card deck |
| 18 | Cash App | pure black + renders | medium | tactile Gen-Z fintech | object grid → Flip hero |
| 19 | No Art | white + one red | low–med | underground archive | crop marks, justified mono, live globe |
| 20 | IKEA 30 | warm grey → butter | low, cheerful | nostalgic, family | "30" built from marble-run track |

---

# Part D: Applying this

1. **Pick the input model before the look** (C1). Seven models are proven. Drag canvases and cursor-panned grids are the least used, which makes them the freshest.
2. **Choose one physical metaphor and let it set the furniture.** A24 discs, Ponpon sleeves, Orwell's newspaper, TILT's shutter, IKEA's track and Palmer's table are all examples. The UI, loader and transitions then come from the object.
3. **Tracking carries tone.** Use −0.04 to −0.07em on display for warmth and confidence (Filmbot, Osmo). Use **positive** tracking on condensed caps for authority or menace (Orwell). Keep display line-height ≤ 1.0.
4. **Tint your darks and your whites** (C4). Use one accent with one job. If it's neon, make a second, muted version for text on light backgrounds (Lando).
5. **Add one human layer:** a script, a signature, or handwritten notes (LxL, Lando, Osmo, Illoca). This was the most repeated "warmth" device among the new 13.
6. **Add one live-data detail:** clock, coordinates, battery, version string, or cursor XY.
7. **Keep the clicked thing on screen** across navigation (Cash App, Palmer). Flip beats a fade.
8. **Ship the gate only if it earns something** (audio, safety, a reveal), and make it a themed prop. Always ship `prefers-reduced-motion`. Utopia's safe-mode choice is the model to copy.

---

*Caveats:*
- *GSAP is bundled and not exposed on `window` on Lando, Two Capitals, Cash App, Ponpon, IKEA, Illoca, Huy and Graffico. Their plugin lists come from the showcase cards, and their motion comes from mid-motion versus settled frames.*
- *Canvas, WebGL and image-only text (TILT, Ponpon, parts of Lando and Utopia) can't be measured in the DOM. Those sizes and colours are marked (seen).*
- *SPYLT Milk was harvested but dropped because its site sits behind a password page (`/password`). Two Capitals Studio replaced it.*
- *Cookie banners were rejected or ignored. Palmer was studied after "Reject all".*
- *All measurements are from 1440 × 900. Mobile layouts were not studied.*
