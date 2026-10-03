---
name: building-gsap-motion-sites
description: Use when building or restyling a portfolio, studio, agency, product landing or other site meant to feel award-level (Awwwards / GSAP showcase / FWA): scroll-driven choreography, GSAP ScrollTrigger, SplitText, ScrambleText, Lenis smooth scroll, pinned sections, preloaders, odometer counters, custom cursors, drag/inertia canvases, Flip layout transitions, DrawSVG lines, or "make it feel premium / cinematic / like an award site".
---

# Building GSAP motion sites

## Overview
Award-level motion sites are not "more animation". They are **one committed idea, expressed through a strict system.** That means:
- one input model
- one recurring motif (ideally a physical object)
- a small, strict type system
- a disciplined palette
- exits faster than entrances

The rules and patterns here were distilled from measuring **20 GSAP-showcase sites**, all at 1440px:
- **`references/showcase-study.md`:** 7 deep dissections (A24, Illoca, Huy Phan, Revelatio, Graffico, Dkton, Door Dennis).
- **`references/showcase-study-20.md`:** those 7 plus 13 more (Filmbot, LxL, Orwell, TILToooTILT, Utopia Tokyo, Lando Norris, Osmo, Ponpon Mania, Palmer, Two Capitals, Cash App, No Art, IKEA 30). Its Part C has the cross-site tables: input models, the type scale per site, colour structures, detailing, motion signatures, eases and a vibe matrix.

**Starting point:** `template/` is a working, browser-verified one-page site (`index.html`, `styles.css`, `main.js`) that uses every pattern below. Copy it and adapt it rather than writing from scratch.

## Decide the direction first (before any code)
1. **Input model.** Pick exactly one:

   | Model | Use when | Reference |
   |---|---|---|
   | Hijacked stage (`overflow:hidden`, the wheel steps an index) | The content *is* an object, catalogue or chaptered story | A24, Huy Phan, Ponpon Mania, IKEA 30 |
   | Camera-path scrub | A 3D scene or pre-rendered film is the product | Illoca, IKEA 30 |
   | Native smooth scroll + set pieces (pins, scrubs, inversions) | Most portfolios, studios and products (default) | Revelatio, Dkton, Filmbot, LxL, Lando, Osmo, No Art |
   | Held scenes (scroll pauses on each scene) | Essays and narratives | Orwell |
   | Drag canvas (Draggable + Inertia, no page scroll) | Collections people browse rather than read | Palmer, TILToooTILT |
   | Cursor-panned grid | Object libraries, brand systems | Cash App |
   | Game controls (WASD + pointer lock) | The product is a place | Graffico |
2. **Motif.** One idea reused as the loader, hero, transitions and details. The strongest motifs are **physical objects that become the UI**: A24's discs, Ponpon's vinyl sleeves with a player bar, Orwell's newspaper and redaction bars, TILT's shop shutter, Palmer's table of plates, IKEA's marble-run "30". Others: Dkton's EQ pills, Lando's signature, LxL's drawn line.
3. **Vibe.** Choose its temperature, energy and personality. Use the vibe matrix in `references/showcase-study-20.md` §C8.
4. **Gate, only if it earns something.** Use one when you need a user gesture (audio), a safety choice (Utopia's "safe mode / glitch") or a reveal. Make it a themed prop (TILT's shutter, Dkton's viewfinder), not a bare dialog.

## System rules
- **Type:**
  - display face at 100–230px, `line-height ≤ 1.0` (0.76–0.9 is common)
  - tracking sets the tone:
    - −0.02 to −0.07em reads confident and warm (Filmbot uses −0.07em at 0.78)
    - **positive** tracking on condensed caps reads authoritative or cold (Orwell +0.09 to +0.27em)
  - UI and labels at 10–13px, in mono or tracked caps (+0.08 to +0.2em)
  - leave the middle sizes almost empty
  - each font has one strict job
  - proven pairings beyond sans + mono:
    - grotesk + handwriting for notes (Osmo, LxL, Illoca)
    - sans + serif *inside one sentence* for emphasis (Lando)
    - grotesk + pixel face swapped per letter (Utopia)
    - one family only (Revelatio, Palmer, Cash App)
  - for quiet luxury, go *lighter* as you go bigger (Palmer: 300 weight at 120px)
- **Colour:**
  - **Tint the darks and the whites**: chocolate `#27201D`, olive `#282C20`, blue-black `#14171F`, bone `#F5F6EE`, off-white `#F4F4ED`. Never plain `#000` / `#fff` as the base.
  - Choose one structure:
    - neutral pair + one signal
    - two-colour poster (red as a *field*)
    - a multi-accent system where each accent has one job (Osmo)
    - content-only chroma (Cash App, Palmer)
  - A neon accent needs a muted twin for text on light backgrounds (Lando `#D2FF00` / `#B2C73A`).
  - Use alpha steps instead of a grey scale.
- **Timing:** 0.2–0.4s for UI, 0.6–0.8s for reveals, 1.2–1.9s for hero moments. Exits are faster than entrances.
- **Always:** `prefers-reduced-motion` (no loader, no Lenis, no pins, final states shown), a mobile layout without pins, keyboard-reachable interactions, and visible focus.

## Easing quick reference
| Name | Curve | Use |
|---|---|---|
| osmo | `0.625, 0.05, 0, 1` | UI transforms, nav, hover rolls |
| expo.out | `0.16, 1, 0.3, 1` | Big settles, line reveals |
| out-quint | `0.22, 1, 0.36, 1` | Text rises |
| out-circ | `0, 0.55, 0.45, 1` | Long clip-path image reveals |
| exit | `0.625, 0, 0.875, 0` | Anything leaving |
| expo.out (alt) | `0.19, 1, 0.22, 1` | Lando, Utopia, Cash App: settles |
| smooth settle | `0.39, 0.52, 0, 1` | Two Capitals' single house ease (×57) |
| back.out | `0.175, 0.885, 0.32, 1.275` / `back.out(1.7)` | Pops, playful drops (Palmer, TILT) |
| bounce.out | GSAP `bounce.out`, 1.0–1.3s staggered | Gravity drop-ins (TILT) |

## Pattern menu
Pick 4–6 of these. Code for each is in `references/patterns.md`.
- odometer counter
- scramble text
- masked line reveal
- word-by-word scroll highlight
- pinned focus index
- colour wipe with inverted text
- theme inversion
- velocity marquee
- hover text roll
- nav with section progress bars
- difference cursor with live HUD
- grain, visible grid and viewfinder buttons
- **from the 20-site study** (bottom of `patterns.md`, smoke-tested but not yet in the template):
  - self-drawing line
  - scatter ↔ grid Flip
  - tile → hero Flip
  - drag canvas with inertia
  - cursor-panned grid
  - gravity drop-in
  - pinned card deck
  - inset → full-bleed media
  - opposing marquees
  - redaction wipe
  - letter-face swap
  - chamfered panels and bracket frames
  - live device data (battery, local time)

## Common mistakes (all hit in practice)
| Symptom | Cause | Fix |
|---|---|---|
| Element renders black at scrub start | Tweening `filter` from `none` | Use `fromTo` with `filter:"brightness(1)"` |
| Centred element jumps when GSAP animates it | CSS `translateX(-50%)` gets baked into GSAP's px `x` | Centre with `left:0; right:0; margin-inline:auto; width:max-content` |
| Headline drops below other content | Grid auto-placement collides with an explicitly placed sibling | Give every hero child an explicit `grid-row` |
| Odometer overshoots | Used `yPercent:-100` per digit | A 10-item reel needs `-10` per digit |
| Scramble does nothing | Scrambling to the text it already has | Clear `textContent` first |
| Split text breaks on resize or font load | Manual split with no re-split | `autoSplit:true` and return the tween from `onSplit`; init after `document.fonts.ready` |
| Nav progress is wrong after the pinned section | Triggers created before the pin | Create nav triggers last, or set `refreshPriority` |
| Footer or last content hidden under a fixed HUD | No bottom clearance | Pad the footer by the HUD height |
| Screenshots show frozen WebGL/GSAP | The browser tab is hidden, so rAF is paused | Verify in a visible Playwright page, not a background tab |
| Bracket corners repeat across the whole element | `background-repeat` set before the `background` shorthand | Put `background-repeat:no-repeat` after the shorthand |
| Focus ring missing on chamfered panels | `clip-path` clips outlines | Use an inset `box-shadow`, or put focus on an inner element |
| Word jitters during the letter-face swap | Glyph widths differ between faces | Lock each char's width after `document.fonts.ready` |
| Drag canvas unusable on keyboard/touch | Only pointer drag wired | Add arrow-key panning, and fall back to a scrolling grid on coarse pointers |

## Verify before claiming done
Serve the site locally, e.g. `python -m http.server`, then drive it in Playwright:
- screenshot mid-motion (about 250ms after a wheel tick) and settled
- check a 390px mobile viewport, with no horizontal scroll
- check `reducedMotion: 'reduce'`
- confirm there are zero `pageerror`s
