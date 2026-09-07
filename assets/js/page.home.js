/* NY MedCare — page module.
 * Writes only numbers into CSS custom properties. Never sets style.transform.
 * The single bridge to WebGL is engine.js's state.scroll, read inside gl.js.
 */

import { state, onFrame, setVar, clamp, smoothstep, requestTick } from './engine.js';
import { createStage } from './gl.js';
import { PulseLine, HairlineFloor } from './scenes.js';

const root = document.documentElement;
const q = (s, c = document) => c.querySelector(s);
const qa = (s, c = document) => Array.from(c.querySelectorAll(s));

/* =========================================================== 1 · HERO CHANNELS */
const hero = q('.hero');

function heroChannels(st) {
  if (!hero) return;
  const h = hero.offsetHeight || innerHeight;
  const s = st.scroll;

  if (st.reduced || matchMedia('(max-aspect-ratio:11/10)').matches) {
    setVar('--hero-y', '0px');
    setVar('--hero-photo-y', '0px');
    setVar('--hero-op', '1');
    setVar('--gl-op', st.reduced ? '0' : (1 - smoothstep(0, 1, clamp(s / (h * 0.85)))).toFixed(3));
    return;
  }

  setVar('--hero-y', (-s * 0.09).toFixed(1) + 'px');
  setVar('--hero-photo-y', (-s * 0.045).toFixed(1) + 'px');
  setVar('--hero-op', (1 - smoothstep(h * 0.40, h * 0.92, s)).toFixed(3));
  setVar('--gl-op', (1 - smoothstep(0, 1, clamp(s / (h * 0.85)))).toFixed(3));
}

/* ========================================================= 2 · PROCESS SPINE */
const procWrap = q('.proc-wrap');
const steps = qa('.step');
const spineFill = q('.spine line.fill');

if (spineFill) {
  /* the dash length must match the real drawn height, so measure it */
  const measureSpine = () => {
    const len = Math.max(1, Math.round(spineFill.getTotalLength()));
    spineFill.style.setProperty('--len', len);
  };
  measureSpine();
  addEventListener('resize', measureSpine);
  if (document.fonts?.ready) document.fonts.ready.then(measureSpine);
}

let litIndex = -1;

function spineChannel(st) {
  if (!procWrap || !steps.length) return;

  if (st.reduced) {
    setVar('--spine', '1');
    if (litIndex !== steps.length - 1) {
      steps.forEach((el) => el.classList.add('on'));
      litIndex = steps.length - 1;
    }
    return;
  }

  const rect = procWrap.getBoundingClientRect();
  const top = rect.top + scrollY;
  const secH = Math.max(1, procWrap.offsetHeight);
  const local = clamp((st.scroll + innerHeight * 0.82 - top) / (secH * 0.78), 0, 1);

  setVar('--spine', local.toFixed(4));

  /* light each node as the fill passes it — write classes only on change */
  const want = Math.min(steps.length - 1,
    Math.floor(local * steps.length + 0.04) - 1);
  if (want !== litIndex) {
    if (want > litIndex) {
      for (let i = litIndex + 1; i <= want; i++) steps[i]?.classList.add('on');
    } else {
      for (let i = litIndex; i > want; i--) steps[i]?.classList.remove('on');
    }
    litIndex = want;
  }
}

/* =============================================================== 3 · COUNTERS */
/* Only real numbers count up. "All" and "USCIS-Designated" are words — they
 * ride the [data-reveal] stagger instead. */
function initCounters() {
  const els = qa('[data-count]');
  if (!els.length) return;

  if (state.reduced) {
    els.forEach((el) => { el.textContent = el.dataset.count; });
    return;
  }

  const run = (el) => {
    const target = parseFloat(el.dataset.count);
    const dp = (el.dataset.count.split('.')[1] || '').length;
    const dur = 900;
    const t0 = performance.now();
    const step = (now) => {
      const x = clamp((now - t0) / dur);
      const e = 1 - Math.pow(1 - x, 3);
      el.textContent = (target * e).toFixed(dp);
      if (x < 1) requestAnimationFrame(step);
      else el.textContent = el.dataset.count;
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      run(e.target);
      io.unobserve(e.target);          // never re-run on scroll back up
    }
  }, { threshold: 0.4 });

  els.forEach((el) => { el.textContent = '0'; io.observe(el); });
}

/* ============================================================ 4 · FRAME HOOK */
onFrame((st) => {
  heroChannels(st);
  spineChannel(st);
});

/* ================================================================= 5 · STAGE */
const CAMERA_KEYS = [
  { at: 0,    pos: [0,  0.25, 7.4], look: [0,  0.10, 0], fov: 40 },
  { at: 620,  pos: [0,  0.10, 6.0], look: [0,  0.02, 0], fov: 37 },
  { at: 1400, pos: [0, -0.20, 5.4], look: [0, -0.10, 0], fov: 36 },
];

async function boot() {
  initCounters();

  /* nothing to render under reduced motion — tier 3 owns the page */
  if (state.reduced) {
    root.classList.add('no-gl');
    setVar('--gl-op', '0');
    requestTick();
    return;
  }

  const stage = await createStage({
    canvas: '#gl',
    keys: CAMERA_KEYS,
    fogDensity: 0,              // light build: no fog
    bloom: 0,                   // light build: no bloom
    accent: 0xc41c1c,
    accent2: 0x2f7d78,
    background: 0xfbfaf7,
  });

  if (stage.disabled) { requestTick(); return; }

  /* Light build: clear to the page ground, opaque.
   * Never rely on a transparent canvas — some drivers (and headless
   * SwiftShader) ignore alpha:true and hand back an opaque BLACK buffer,
   * which on a white page is a total failure. Clearing to --void means the
   * canvas is indistinguishable from the body no matter what the driver does. */
  const T = stage.THREE;
  /* ACES filmic tone mapping compresses the whole frame, so a warm-white clear
   * lands around #e3e4e3 instead of #fbfaf7. There is no HDR content in a flat
   * line-art scene, so tone mapping buys nothing here — turn it off and the
   * ground matches --void exactly. */
  stage.renderer.toneMapping = T.NoToneMapping;
  stage.renderer.setClearColor(0xfbfaf7, 1);
  if (stage.scene) stage.scene.fog = null;

  stage.add(PulseLine(stage), HairlineFloor(stage));
  requestTick();
}

if (document.readyState === 'loading') addEventListener('DOMContentLoaded', boot);
else boot();
