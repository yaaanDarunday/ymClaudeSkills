---
name: building-gsap-sites-from-fresh-references
description: Use when building an award-level GSAP / motion site (portfolio, studio, agency, product landing) that must look different from earlier builds: "fresh references", "new style", "something unique", "not like the last one", "study new sites from the GSAP showcase", or when previous motion sites in the project have started to look alike.
---

# Building GSAP sites from fresh references

## Overview
`building-gsap-motion-sites` distils a **fixed set of studied sites** (20 as of 2026-10-03, in its `references/`). Builds that only draw on that set converge on one look:
- Lenis + SplitText + ScrambleText
- a neutral pair plus one hot signal colour
- a sans plus a mono
- a difference cursor

This skill breaks that loop. **Each run studies sites from gsap.com/showcase that nobody here has studied before.** The design direction then comes from that new study, and it must diverge from every build in `ledger.md`.

**Division of labour:**
- **This skill** owns discovery, the study and the direction (the look).
- **REQUIRED SUB-SKILL:** `building-gsap-motion-sites` owns the engineering: GSAP/Lenis boot, reduced-motion branching, the pattern code, its common-mistakes table and its verification. Do **not** take its template's styling, fonts, palette or vibe matrix. Those are exactly what this skill replaces.

**Needs:**
- Playwright MCP: `browser_navigate`, `browser_evaluate`, `browser_snapshot`, `browser_run_code_unsafe`
- Python with Pillow, for contact sheets

**Shots folder:** pick one gitignored folder for screenshots and the harvest JSON, because they are other people's work. In the WebSites repo that folder is `gsap-showcase-study/shots/`. Call it `SHOTS` below.

## Workflow

### 1. Read the ledger
Read `ledger.md`. Its studied URLs are excluded from this run. Its builds table is what the new direction must diverge from (step 5).

### 2. Harvest the showcase
Navigate to `https://gsap.com/showcase/`. Run `scripts/harvest-showcase.js` as the `browser_evaluate` function, with `filename` set to `SHOTS/showcase-index.json`. It clicks "Load More" until the gallery ends; expect about 500 cards with `{title, url, creator, plugins}`. Remove every ledger URL.

### 3. Pick sites for spread, not fame
- Shortlist **8 candidates, sampled at random** across the whole list. The top of the gallery is the same featured work everyone has already copied.
- At least **half** must carry a plugin outside the usual set (ScrollTrigger, SplitText, CustomEase, ScrollTo, useGSAP): Draggable, Inertia, Flip, Observer, MorphSVG, DrawSVG, MotionPath, Physics2D, ScrambleText-only, and so on.
- Aim for spread in **kind** too: product, brand campaign, e-commerce, editorial experiment, music, toy or game, as well as portfolios.
- Open each candidate. **Drop** it if it is dead, parked, behind a password page (a redirect to `/password`) or login, or visually close to a ledger build or another pick. Keep a backup list so a dropped site can be replaced.
- Keep the 3–4 that differ most **from each other** in input model, colour and type. Keep more if the user asked for a bigger study.

### 4. Dissect each pick
1. **Configure the runner.** Edit the constants at the top of `scripts/study-site.js`: `dir` = absolute `SHOTS` path, `SLUG`, `PRE_MS` and `TICKS`.
2. `browser_navigate` to the site.
3. **Clear gates first:**
   - Take a `browser_snapshot`.
   - Click the enter, warning, "GO" or "read now" button, or reject cookies.
   - Prefer a safe or reduced mode if one is offered and you will not be studying the glitch.
4. **Run the study.** Call `browser_run_code_unsafe` with `filename: scripts/study-site.js` (path relative to the MCP workspace). It does the following:
   - waits out the preloader
   - takes the settled hero frame
   - dissects the page: type, palette, radii, tokens, eases, keyframes, live GSAP and ScrollTrigger counts, the live tween inventory, libraries, and loaded fonts
   - sends `TICKS` wheel ticks of 800px, taking a mid-motion and a settled frame for each
   - re-dissects the page
   - returns JSON, including `ys` (scrollY after each tick)
5. **Read `ys`:**
   - **All 0:** the page hijacks the wheel, or a gate is still up (`html.lenis-stopped`). Clear the gate and re-run, or treat the site as a stage.
   - **Uneven steps:** sections hold the scroll.
6. **Make a contact sheet.** Run `python scripts/contact-sheet.py SHOTS <slug> 00 01m 02 03 05 06 08 10`, then Read the single `<slug>-sheet.jpg`. One image per site keeps context small.
7. **Drive non-scroll sites by hand** with a short `browser_run_code_unsafe`: drag the canvas, move the cursor to the corners, hover, click a tile. Screenshot about 300ms and about 1.8s after each action, then make a sheet of those frames.

Write it all up in `study-format.md` format as `studies/YYYY-MM-DD-<slug>.md`. Commit the text study, not the screenshots.

### 5. Commit to a direction that diverges
Pick **one lead site** from the study for the vibe and input model, and **borrow exactly one idea** from another pick. Then fill in this card:

| Axis | This build | Closest ledger build | Different? |
|---|---|---|---|
| Input / scroll model | | | |
| Type families (none reused) | | | |
| Palette structure | | | |
| Signature motion | | | |
| Composition / grid | | | |

**Pass rule:**
- At least **4 of 5 axes differ** from *every* ledger build.
- No type family already in the ledger is reused.
- Avoid the ledger's "worn-out defaults" unless the lead site measurably uses one. If it does, cite the measurement from the study.

If the card fails, change the direction, not the card. Show the user the card and the lead/borrow sites **before building**.

### 6. Build
Build with `building-gsap-motion-sites`. Take its engineering and verification steps, and pull patterns from its `references/patterns.md` only where the study calls for them. That file now includes drag canvas, Flip scatter↔grid, tile→hero, gravity drop, card deck and drawn-line patterns. If the lead site's motion has no pattern there (SVG morph, physics), write it fresh from the measured behaviour.

Keep its always-rules: reduced motion, a mobile layout without pins, keyboard access and visible focus.

### 7. Update the ledger
Append the studied sites and the new build row, including its palette structure and signature motion. Commit `ledger.md` and the study file together with the build.

## Common mistakes
| Symptom | Cause | Fix |
|---|---|---|
| New build looks like the last one | Direction taken from the old skill's vibe matrix or template CSS | Direction comes only from the new study; the divergence card must pass |
| All picks share one look | Took the top of the gallery, or picked by fame | Random 8-card shortlist; half with unusual plugins; spread across kinds of site |
| `gsap: "no"`, 0 triggers | GSAP is bundled (Vite, Next, Nuxt, custom `main.js`) | Record the plugins from the showcase card, infer motion from the mid/settled frames, mark it *(inferred)* |
| `ys` all 0, frames identical | A gate is still up (`lenis-stopped`), or the wheel is hijacked | Snapshot, click the gate, re-run; for stages, step with the wheel and judge from frames |
| Every frame shows a modal | Cookie or consent wall | Click "Reject all" or "Decline" first and say so in the caveats |
| URL redirects to `/password` or a login | Private or pre-launch site | Drop it and take the next backup |
| `globalThis.x is not a function` / undefined on the next call | `browser_run_code_unsafe` state does not persist between calls | Keep the runner self-contained and pass it via `filename`; edit its constants instead of setting globals |
| Every call echoes a huge script | `browser_run_code_unsafe` prints the code it ran | Expected; keep the runner as one file and avoid re-running it needlessly |
| Two sites save over each other | The slug is the first hostname label (`design.cash.app` → `design`) | Set `SLUG` in the runner |
| Typography list has only the nav | Measured during the preloader, or the text is canvas or image | Raise `PRE_MS`; for WebGL or image text, describe it from frames and mark it *(seen)* |
| Context fills up with screenshots | Reading frames one by one | One contact sheet per site via `contact-sheet.py` |
| Screenshots frozen or blank | Hidden tab, so rAF is paused | Use a visible Playwright page |
| Study wanders off into vague adjectives | No numbers | Every section needs px, hex and ease values from the dissect output |
| Next run repeats these sites | Ledger not updated or not committed | Step 7 is part of the run |
| `File access denied … outside allowed roots` when saving | The Playwright MCP only writes inside its own workspace | Point `dir` inside the workspace, or save to `.playwright-mcp/` and move the files |
| `require is not defined` | The run_code sandbox has no Node APIs | Use the `filename` option instead of reading files in code |
| `goto` fails with "interrupted by another navigation" | The site redirects while loading | Go to `about:blank` first, then retry with `waitUntil: "load"` |
