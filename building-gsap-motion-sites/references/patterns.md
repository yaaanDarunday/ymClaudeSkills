# Pattern catalog

Copy-ready GSAP 3.13+ implementations of the set pieces seen on GSAP-showcase sites. All plugins are free since 3.13.
Every one of these is already wired up in `../template/main.js`. Search that file for the pattern name to see it in context.

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrambleTextPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/CustomEase.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1/dist/lenis.min.js"></script>
```
For npm/React, use `import { gsap } from "gsap"` and `useGSAP(() => {...}, { scope })` from `@gsap/react`. The same code goes inside the hook.

## Boot: Lenis on the GSAP ticker + easings
```js
gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, CustomEase);
CustomEase.create("osmo", "0.625, 0.05, 0, 1");   // snappy UI in-out
CustomEase.create("exit", "0.625, 0, 0.875, 0");  // fast accelerate-out for exits
const lenis = new Lenis({ lerp: 0.09 });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
lenis.stop();            // during the preloader; lenis.start() after
```
Skip Lenis entirely when `prefers-reduced-motion: reduce`.

## Responsive and reduced-motion branching
```js
gsap.matchMedia().add(
  { desktop: "(min-width: 900px)", reduce: "(prefers-reduced-motion: reduce)" },
  (ctx) => { const { desktop, reduce } = ctx.conditions; /* pins only if desktop && !reduce */ }
);
```

## Odometer (rolling digits): loaders, counters, stats
```js
function createOdometer(el, digits) {
  const reels = Array.from({ length: digits }, () => {
    const d = el.appendChild(document.createElement("span")); d.className = "odo-digit";
    const r = d.appendChild(document.createElement("span")); r.className = "odo-reel";
    r.innerHTML = [..."0123456789"].map((n) => `<span>${n}</span>`).join("");
    return r;
  });
  el.setAttribute("role", "img");
  return { set(v, { duration = 1.1, ease = "expo.out", stagger = 0.06 } = {}) {
    el.setAttribute("aria-label", String(Math.round(v)));
    const s = String(Math.round(v)).padStart(digits, "0").slice(-digits);
    reels.forEach((r, i) => gsap.to(r, { yPercent: -10 * s[i], duration, ease, delay: (digits - 1 - i) * stagger, overwrite: true }));
  } };
}
```
```css
.odo-digit { display:inline-block; height:1em; overflow:hidden; }
.odo-reel { display:flex; flex-direction:column; }
.odo-reel span { display:block; height:1em; line-height:1; }
```
Each reel holds 10 items, so one digit is `yPercent: -10`, not -100.

## Scramble / decode text
```js
const text = el.textContent; el.textContent = "";          // must clear first
gsap.to(el, { duration: 1.2, scrambleText: { text, chars: "!<>-_\\/[]{}—=+*^?#%$@", speed: 0.5 } });
```

## Masked line reveal (resize- and font-safe)
```js
SplitText.create(".hero-title", { type: "lines", mask: "lines", autoSplit: true,
  onSplit: (self) => gsap.from(self.lines, { yPercent: 118, duration: 1.4, ease: "expo.out", stagger: 0.09 }) });
```
Return the animation from `onSplit` so the re-split on resize or font load reverts it and syncs it back up. To hold it until a preloader finishes, pass `paused: true` and `.play()` later.

## Word-by-word scroll highlight
```js
SplitText.create(".statement", { type: "words", autoSplit: true,
  onSplit: (self) => gsap.fromTo(self.words, { opacity: 0.12 }, { opacity: 1, stagger: 0.1, ease: "none",
    scrollTrigger: { trigger: ".statement", start: "top 65%", end: "bottom 65%", scrub: true } }) });
```

## Pinned focus index (one item in focus, the rest dimmed)
```js
const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: {
  trigger: ".work", start: "top top", end: () => "+=" + (n - 1) * innerHeight * 0.9,
  pin: ".work-inner", scrub: 1, invalidateOnRefresh: true,
  snap: { snapTo: "labelsDirectional", duration: { min: 0.25, max: 0.7 }, ease: "power2.inOut" },
  onUpdate: (s) => setActive(Math.round(s.progress * (n - 1))) } });
tl.addLabel("p0");
for (let i = 1; i < n; i++) tl
  .fromTo(cards[i], { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)" })
  .fromTo(cards[i - 1], { scale: 1, filter: "brightness(1)" }, { scale: 0.9, filter: "brightness(0.7)" }, "<")
  .addLabel("p" + i);
// list click → lenis.scrollTo(tl.scrollTrigger.labelToScroll("p" + i))
```
In `setActive(i)`, the list gets `opacity: 1` on the active item and about 0.22 on the rest. The meta block crossfades through `filter: blur(8px)`, and the odometer and swatches update.

## Colour wipe with inverted text + travelling meter
Markup: a base row, plus an identical `.fill` row stacked with `position:absolute; inset:0; background:var(--signal); clip-path:inset(0 100% 0 0)`.
```js
gsap.timeline({ scrollTrigger: { trigger: row, start: "top 85%", end: "bottom 30%", scrub: 0.6, invalidateOnRefresh: true,
    onUpdate: (s) => (meter.textContent = s.progress < 0.02 ? "−∞ dB" : `${Math.round((s.progress - 1) * 48)} dB`) } })
  .fromTo(fill, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)" }, 0)
  .fromTo(meter, { x: 0 }, { x: () => row.offsetWidth - meter.offsetWidth }, 0);
```

## Theme inversion on a section
Define the other tokens relative to the base pair, e.g. `--ink-64: color-mix(in srgb, var(--ink) 64%, transparent)`, so they follow the swap.
```js
ScrollTrigger.create({ trigger: ".about", start: "top 55%", end: "bottom 45%",
  onToggle: (s) => gsap.to(document.documentElement, s.isActive
    ? { "--paper": "#0e0e0d", "--ink": "#efede8", duration: 0.8, ease: "osmo", overwrite: true }
    : { "--paper": "#efede8", "--ink": "#121212", duration: 0.8, ease: "osmo", overwrite: true }) });
```

## Marquee boosted by scroll velocity
```js
const m = gsap.to(".marquee-track", { xPercent: -50, duration: 32, ease: "none", repeat: -1 }); // content duplicated twice
ScrollTrigger.create({ trigger: ".marquee", onUpdate: (s) => {
  gsap.to(m, { timeScale: 1 + Math.min(Math.abs(s.getVelocity()) / 350, 5), duration: 0.2, overwrite: true });
  gsap.to(m, { timeScale: 1, duration: 1.2, delay: 0.2 }); } });
```

## Hover text roll (CSS only)
```html
<a href="#work"><span class="roll"><span data-text="Work">Work</span></span></a>
```
```css
.roll { display:inline-block; overflow:hidden; vertical-align:top; }
.roll > span { position:relative; display:block; transition:transform .5s cubic-bezier(.625,.05,0,1); }
.roll > span::after { content:attr(data-text); position:absolute; left:0; top:100%; }
a:hover .roll > span, a:focus-visible .roll > span { transform:translateY(-100%); }
```
`attr()` copies text only, so style the `::after` explicitly (italic, colour) when the source contains `<em>`.

## Nav with section progress bars
Create these ScrollTriggers **after** every pinned trigger, so the pin spacing has already been measured.
```js
ScrollTrigger.create({ trigger: section, start: "top 50%", end: "bottom 50%",
  onToggle: (s) => link.classList.toggle("is-active", s.isActive),
  onUpdate: (s) => gsap.set(bar, { scaleX: s.progress }) });
```

## Difference-blend cursor + live HUD
```js
const xTo = gsap.quickTo(cursor, "x", { duration: 0.45, ease: "power3" });
const yTo = gsap.quickTo(cursor, "y", { duration: 0.45, ease: "power3" });
addEventListener("pointermove", (e) => { xTo(e.clientX); yTo(e.clientY); xy.textContent = `X ${e.clientX} Y ${e.clientY}`; });
setInterval(() => (clock.textContent = new Date().toLocaleTimeString([], { hour12: false })), 1000);
```
```css
.cursor { position:fixed; width:12px; height:12px; margin:-6px 0 0 -6px; border-radius:50%; background:#fff; mix-blend-mode:difference; pointer-events:none; }
@media (hover:none), (pointer:coarse) { .cursor { display:none; } }
```
Grow the cursor and show a label on `[data-cursor]` elements by toggling a class that changes size (for example 84px).

## Atmosphere
- **Grain:** a fixed SVG `feTurbulence` data-URI layer at `opacity:.07`, animated with `steps(4)` translate keyframes.
- **Visible grid:** fixed flex columns of 1px lines at 6% ink.
- **Viewfinder buttons:** an `::before` with a 1px border, masked to four corner squares with `mask: linear-gradient(#000 0 0) top left / 8px 8px no-repeat, …`. Grow its `inset` on hover.

---

# Patterns from the 20-site study (2026-10-03)
These are not wired into `../template/` yet. Each was smoke-tested in Chromium on GSAP 3.13 with zero page errors and the expected end state. Register what you use:
```js
gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, Flip, Draggable, InertiaPlugin);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
```

## Self-drawing line (LxL squiggle, Lando signature)
```js
gsap.from(".squiggle path", { drawSVG: 0, ease: "none",
  scrollTrigger: { trigger: ".squiggle", start: "top 80%", end: "bottom 20%", scrub: 0.5 } });
```
The path needs `fill:none` and a stroke. For a signature, use one path per stroke and add them to a timeline in writing order.

## Scatter ↔ grid with Flip (Palmer "experience view / grid view")
```js
const plates = gsap.utils.toArray(".plate");
toggle.addEventListener("click", () => {
  const state = Flip.getState(plates);
  stage.classList.toggle("is-grid");
  Flip.from(state, { duration: reduce ? 0 : 0.8, ease: "power2.inOut", stagger: 0.02, absolute: true });
});
```
```css
.stage:not(.is-grid) .plate { position:absolute; left:var(--x); top:var(--y); } /* scatter coords inline */
.stage.is-grid { display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; }
```

## Tile → hero (Cash App)
```js
tile.addEventListener("click", () => {
  const state = Flip.getState(tile);
  gsap.to(siblings, { autoAlpha: 0, duration: 0.3 });
  heroSlot.appendChild(tile);              // or reparent into the next page's hero slot
  Flip.from(state, { duration: 0.9, ease: "expo.inOut", absolute: true, delay: 0.15 });
});
```
Across routes (Barba or Swup), take `Flip.getState` before leaving, pass it along, and `Flip.from` on the new page's hero element (use a matching `data-flip-id`).

## Drag canvas with inertia (Palmer, TILToooTILT)
```js
const [drag] = Draggable.create(".canvas", { type: "x,y", bounds: ".viewport", inertia: !reduce, edgeResistance: 0.85 });
zoomIn.onclick = () => gsap.to(".canvas", { scale: "+=0.2", duration: 0.5, ease: "power3" });
```
The canvas must be larger than `.viewport`. Add arrow-key panning (`gsap.to(canvas, { x: "-=200" })` then `drag.update()`) for keyboard users. For a 21:9 room like TILT, use `type: "x"` only.

## Cursor-panned grid (Cash App)
```js
gsap.set(grid, { xPercent: -50, yPercent: -50 });  // centred; xPercent and x stack independently
const xTo = gsap.quickTo(grid, "x", { duration: 0.8, ease: "power3" });
const yTo = gsap.quickTo(grid, "y", { duration: 0.8, ease: "power3" });
addEventListener("pointermove", (e) => {
  xTo(-(e.clientX / innerWidth - 0.5) * (grid.offsetWidth - innerWidth));
  yTo(-(e.clientY / innerHeight - 0.5) * (grid.offsetHeight - innerHeight));
});
```
`.grid { position:fixed; left:50%; top:50%; }`. On touch devices, fall back to a normal scrolling grid.

## Gravity drop-in (TILToooTILT bounce, Palmer back-pop)
```js
gsap.from(".prop", { y: () => -innerHeight, rotation: () => gsap.utils.random(-25, 25), duration: 1.1,
  ease: "bounce.out", stagger: { each: 0.08, from: "random" }, scrollTrigger: { trigger: ".props", start: "top 85%" } });
```
For a softer version use `ease: "back.out(1.7)"`, `y: 40`, `duration: 0.6`.

## Card deck, pinned and peeled (LxL services, Two Capitals)
```js
const cards = gsap.utils.toArray(".deck .card");
gsap.set(cards, { rotation: (i) => (i - (cards.length - 1) / 2) * 3, zIndex: (i) => cards.length - i });
const tl = gsap.timeline({ scrollTrigger: { trigger: ".deck-section", start: "top top",
  end: () => "+=" + cards.length * 400, pin: true, scrub: 0.6 } });
cards.slice(0, -1).forEach((c, i) => tl.to(c, { yPercent: -130, rotation: -12, ease: "power2.in" }, i));
```

## Inset → full-bleed media (LxL, Revelatio, Filmbot)
```js
gsap.fromTo(".reel", { clipPath: "inset(18% 22% 18% 22% round 12px)" },
  { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none",
    scrollTrigger: { trigger: ".reel-wrap", start: "top top", end: "+=100%", pin: true, scrub: true } });
```

## Opposing marquees (Lando)
```js
gsap.utils.toArray(".marquee__track").forEach((t, i) =>
  gsap.fromTo(t, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 30, ease: "none", repeat: -1 }));
```
Each track holds its content **twice** (`display:inline-flex`) so −50% loops seamlessly.

## Redaction wipe (Orwell)
```js
gsap.from(".redact", { scaleX: 0, transformOrigin: "left center", duration: 0.6, ease: "power4.inOut", stagger: 0.15,
  scrollTrigger: { trigger: ".article", start: "top 60%" } });
```
`.redact` is an absolutely positioned black bar inside each line (`top:.2em; height:1em`). To finish the story, follow it with a tween that fades the whole article to grey.

## Letter-face swap (Utopia: grotesk ↔ pixel)
```js
const chars = SplitText.create(".wordmark", { type: "chars" }).chars;
chars.forEach((c) => { c.style.display = "inline-block"; c.style.width = c.offsetWidth + "px"; c.style.textAlign = "center"; });
if (!reduce) gsap.to({}, { duration: 0.12, repeat: -1, onRepeat: () => gsap.utils.random(chars).classList.toggle("is-pixel") });
```
`.is-pixel { font-family: "YourPixelFace", monospace; }`. Lock each char's width first, or the word jitters as glyph widths change. Run it after `document.fonts.ready`.

## Chamfered panels and bracket frames (Utopia, Dkton, No Art)
```css
.panel { --cut:16px; clip-path: polygon(var(--cut) 0, calc(100% - var(--cut)) 0, 100% var(--cut),
  100% calc(100% - var(--cut)), calc(100% - var(--cut)) 100%, var(--cut) 100%, 0 calc(100% - var(--cut)), 0 var(--cut)); }
.bracket { --c:currentColor; --l:10px; --w:1.5px; background:
  linear-gradient(var(--c) 0 0) top left/var(--l) var(--w),    linear-gradient(var(--c) 0 0) top left/var(--w) var(--l),
  linear-gradient(var(--c) 0 0) top right/var(--l) var(--w),   linear-gradient(var(--c) 0 0) top right/var(--w) var(--l),
  linear-gradient(var(--c) 0 0) bottom left/var(--l) var(--w), linear-gradient(var(--c) 0 0) bottom left/var(--w) var(--l),
  linear-gradient(var(--c) 0 0) bottom right/var(--l) var(--w),linear-gradient(var(--c) 0 0) bottom right/var(--w) var(--l);
  background-repeat:no-repeat; /* after the shorthand, which would reset it */ }
```
`clip-path` also clips focus outlines. Draw focus with an inset `box-shadow` or on an inner element.

## Live device data in the HUD (Two Capitals battery, No Art local time)
```js
navigator.getBattery?.().then((b) => {
  const render = () => { el.hidden = false; el.textContent = `Battery: [${Math.round(b.level * 100)}%] Charging: [${b.charging ? "In Progress" : "No"}]`; };
  render(); b.addEventListener("levelchange", render); b.addEventListener("chargingchange", render);
});
const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
setInterval(() => (clock.textContent = new Date().toLocaleTimeString([], { hour12: false }) + " " + tz), 1000);
```
The Battery API is Chromium-only, so keep the element `hidden` until it resolves.
