// Run with the Playwright MCP tool `browser_run_code_unsafe` using its `filename`
// option (pass this file's path) AFTER `browser_navigate` to the site and after
// clearing any gate / cookie wall. State does not persist between run_code calls,
// so this file is self-contained. Edit `dir` to an absolute, gitignored screenshots
// folder first; SLUG/PRE_MS/TICKS are constants below
// (globals do not survive between calls). Set SLUG for hosts like design.cash.app,
// which would otherwise save as "design-*".
// Output: <slug>-00.jpg (settled hero), <slug>-NN.jpg (settled after tick N),
// <slug>-NNm.jpg (≈260ms after odd ticks = mid-motion), plus the JSON returned:
// { top: full dissect, mid/end: only what changed, ys: scrollY after each tick }.
// ys all 0 => the page hijacks the wheel or a gate is still up.
async (page) => {
  // ---- EDIT ME -------------------------------------------------------------
  const dir = 'C:/ABSOLUTE/PATH/TO/shots/'; // absolute, gitignored, trailing slash
  const SLUG = null;      // e.g. 'cashapp'; null = first hostname label
  const PRE_MS = 3500;    // wait for the preloader before the first frame
  const TICKS = 10;       // 800px wheel ticks
  // ---------------------------------------------------------------------------
  const host = SLUG || new URL(page.url()).hostname.replace(/^www\./, '').split('.')[0];
  const wait = ms => page.waitForTimeout(ms);
  const shot = name => page.screenshot({ path: dir + host + '-' + name + '.jpg', type: 'jpeg', quality: 55 });

  const dissect = () => {
    const px = v => Math.round(parseFloat(v) * 10) / 10;
    const round = n => Math.round(n * 1000) / 1000;
    const type = new Map();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const t = walker.currentNode.textContent.trim();
      const el = walker.currentNode.parentElement;
      if (!t || !el) continue;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      const s = getComputedStyle(el);
      if (s.visibility === 'hidden' || s.opacity === '0') continue;
      const size = parseFloat(s.fontSize);
      const lh = s.lineHeight === 'normal' ? 'n' : round(parseFloat(s.lineHeight) / size);
      const ls = s.letterSpacing === 'normal' ? 0 : round(parseFloat(s.letterSpacing) / size);
      const key = [s.fontFamily.split(',')[0].replace(/["']/g, ''), px(size), s.fontWeight, s.fontStyle === 'normal' ? '' : s.fontStyle, lh, ls + 'em', s.textTransform === 'none' ? '' : s.textTransform, s.color].join('|');
      const e = type.get(key) || { n: 0, sample: t.slice(0, 30) };
      e.n++; type.set(key, e);
    }
    const typography = [...type].sort((a, b) => parseFloat(b[0].split('|')[1]) - parseFloat(a[0].split('|')[1]))
      .slice(0, 22).map(([k, v]) => `${k} ×${v.n} "${v.sample}"`);
    const colours = {};
    const radii = {};
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      const s = getComputedStyle(el);
      for (const [prop, v] of [['bg', s.backgroundColor], ['tx', s.color], ['bd', s.borderTopWidth !== '0px' ? s.borderTopColor + ' ' + s.borderTopWidth : null]]) {
        if (!v || v === 'rgba(0, 0, 0, 0)') continue;
        const k = prop + ' ' + v; colours[k] = (colours[k] || 0) + 1;
      }
      if (s.borderTopLeftRadius !== '0px') radii[s.borderTopLeftRadius] = (radii[s.borderTopLeftRadius] || 0) + 1;
    }
    const top = (o, n) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, c]) => `${k} ×${c}`);
    const vars = {}, eases = {}, durations = {}, keyframes = [];
    let blocked = 0;
    for (const sheet of document.styleSheets) {
      let rules; try { rules = sheet.cssRules; } catch { blocked++; continue; }
      const walk = list => { for (const r of list) {
        if (r.cssRules && !r.style) walk(r.cssRules);
        if (r.type === 7) keyframes.push(r.name);
        if (!r.style) continue;
        if (r.selectorText === ':root' || r.selectorText === 'html' || r.selectorText === 'body') for (const p of r.style) if (p.startsWith('--')) vars[p] = r.style.getPropertyValue(p).trim().slice(0, 60);
        const tf = r.style.transitionTimingFunction || r.style.animationTimingFunction;
        if (tf) tf.split(/,(?![^(]*\))/).forEach(e => eases[e.trim()] = (eases[e.trim()] || 0) + 1);
        const d = r.style.transitionDuration || r.style.animationDuration;
        if (d) d.split(',').forEach(x => durations[x.trim()] = (durations[x.trim()] || 0) + 1);
      } };
      walk(rules);
    }
    const g = window.gsap, ST = window.ScrollTrigger;
    const triggers = ST?.getAll?.() || [];
    let tweens = [];
    try { tweens = g ? g.globalTimeline.getChildren(true, true, false).slice(0, 400).map(t => (t.vars.ease && typeof t.vars.ease === 'string' ? t.vars.ease : (t.vars.ease ? 'fn' : 'def')) + '@' + t.duration()) : []; } catch {}
    const tw = {}; tweens.forEach(t => tw[t] = (tw[t] || 0) + 1);
    const scripts = [...new Set([...document.scripts].map(s => s.src).filter(Boolean).map(s => s.split('?')[0].split('/').slice(-1)[0]))];
    const fonts = [...new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => f.family.replace(/"/g, '') + ' ' + f.weight + (f.style !== 'normal' ? ' ' + f.style : '')))];
    return {
      url: location.href, title: document.title,
      docH: document.documentElement.scrollHeight, scrollY: Math.round(scrollY),
      overflow: getComputedStyle(document.documentElement).overflow + '/' + getComputedStyle(document.body).overflow,
      htmlClass: document.documentElement.className.slice(0, 120),
      rt: {
        gsap: g?.version || 'no', plugins: Object.keys(window).filter(k => /^(ScrollTrigger|SplitText|ScrambleTextPlugin|Observer|Draggable|Flip|InertiaPlugin|DrawSVGPlugin|MorphSVGPlugin|CustomEase|ScrollSmoother|MotionPathPlugin|Physics2DPlugin|TextPlugin)$/.test(k)),
        st: triggers.length, pinned: triggers.filter(t => t.pin).length, scrub: [...new Set(triggers.filter(t => t.vars?.scrub).map(t => t.vars.scrub))], scrubN: triggers.filter(t => t.vars?.scrub).length,
        smoother: !!window.ScrollSmoother?.get?.(), lenis: !!(window.lenis || window.Lenis || document.documentElement.classList.contains('lenis')),
        three: !!window.THREE, canvases: document.querySelectorAll('canvas').length, videos: document.querySelectorAll('video').length, svgs: document.querySelectorAll('svg').length,
        fw: ['__NEXT_DATA__', '__NUXT__', 'Webflow', '__svelte', 'Framer', 'barba', 'swup', 'Swup', 'Howl', 'PIXI', 'Matter', 'jQuery'].filter(k => k in window)
          .concat(document.querySelector('[data-wf-site]') ? ['WebflowAttr'] : [], document.querySelector('astro-island') ? ['Astro'] : [], document.querySelector('#__nuxt') ? ['NuxtEl'] : [], document.querySelector('[data-framer-name],#__framer-badge-container') ? ['FramerEl'] : []),
      },
      tweens: top(tw, 10),
      scripts: scripts.slice(0, 20),
      fonts: fonts.slice(0, 20),
      typography,
      palette: top(colours, 18),
      radii: top(radii, 8),
      vars: Object.entries(vars).slice(0, 45).map(([k, v]) => k + ':' + v).join('; '),
      eases: top(eases, 10), durations: top(durations, 10),
      keyframes: [...new Set(keyframes)].slice(0, 25), blocked,
      blend: [...new Set([...document.querySelectorAll('body *')].map(e => getComputedStyle(e).mixBlendMode).filter(m => m !== 'normal'))],
      backdrop: document.querySelectorAll('*').length && [...document.querySelectorAll('body *')].filter(e => getComputedStyle(e).backdropFilter !== 'none').length,
      cursor: getComputedStyle(document.body).cursor,
      bodyBg: getComputedStyle(document.body).backgroundColor + ' / html ' + getComputedStyle(document.documentElement).backgroundColor,
    };
  };

  const out = {};
  await wait(PRE_MS);
  await shot('00');
  out.top = await page.evaluate(dissect);
  await page.mouse.move(720, 450);
  const ys = [];
  const ticks = TICKS;
  for (let i = 1; i <= ticks; i++) {
    await page.mouse.wheel(0, 800);
    await wait(260);
    if (i % 2 === 1) await shot(String(i).padStart(2, '0') + 'm');
    await wait(1450);
    await shot(String(i).padStart(2, '0'));
    ys.push(await page.evaluate(() => Math.round(scrollY)));
    if (i === Math.ceil(ticks / 2)) out.mid = await page.evaluate(dissect);
  }
  out.ys = ys;
  out.end = await page.evaluate(dissect);
  // keep only what is new in mid/end
  for (const k of ['mid', 'end']) {
    if (!out[k]) continue;
    out[k] = { typography: out[k].typography.filter(t => !out.top.typography.includes(t)), palette: out[k].palette.filter(t => !out.top.palette.includes(t)).slice(0, 10), rt: out[k].rt, docH: out[k].docH };
  }
  return out;
}
