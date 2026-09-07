/* NY MedCare — scene primitives.
 * Visual Signature: PulseLine (ECG tube, ink + crimson line-art on warm white)
 * + HairlineFloor · accent #c41c1c · C1 slow push-in · the trace draws itself
 * once on load, then one QRS spike travels left to right every 2.4s.
 *
 * Light-build rules (art-direction.md P7): no bloom, no fog, dark-stroke only,
 * never a bright wireframe. Factory contract: { object, tick, thin }.
 */

import * as THREE from 'three';

const gauss = (p, mu, sg) => Math.exp(-((p - mu) * (p - mu)) / (2 * sg * sg));

/** One resting-rhythm ECG cycle, phase 0..1. Peak R at .31. */
function ecg(p) {
  return 0.10 * gauss(p, 0.13, 0.035)   // P wave
       - 0.09 * gauss(p, 0.27, 0.012)   // Q
       + 0.86 * gauss(p, 0.31, 0.014)   // R  — the spike
       - 0.20 * gauss(p, 0.35, 0.016)   // S
       + 0.22 * gauss(p, 0.55, 0.060);  // T wave
}

/* ---------------------------------------------------------------- PulseLine */
export function PulseLine(stage, {
  span = 7.4,          // x reaches -span..+span
  beats = 8,           // ~4 beats inside the visible frame at the hero keyframe
  samples = 260,
  amp = 0.68,
  y = -0.55,           // just under the lead paragraph, above the rating row
} = {}) {
  const pts = [];
  for (let i = 0; i < samples; i++) {
    const t = i / (samples - 1);
    const x = -span + t * span * 2;
    const p = ((x + span) / (span * 2 / beats)) % 1;
    pts.push(new THREE.Vector3(x, ecg(p) * amp, 0));
  }
  const curve = new THREE.CatmullRomCurve3(pts);

  const baseGeo = new THREE.TubeGeometry(curve, 620, 0.026, 8, false);
  const hiGeo   = new THREE.TubeGeometry(curve, 620, 0.040, 8, false);

  const baseMat = new THREE.MeshBasicMaterial({
    color: 0x141210, transparent: true, opacity: 0.24, depthWrite: false });
  const hiMat = new THREE.MeshBasicMaterial({
    color: 0xc41c1c, transparent: true, opacity: 0.85, depthWrite: false });

  const base = new THREE.Mesh(baseGeo, baseMat);
  const hi   = new THREE.Mesh(hiGeo, hiMat);

  const object = new THREE.Group();
  object.add(base, hi);
  object.position.y = y;

  const TOTAL = hiGeo.index ? hiGeo.index.count : hiGeo.attributes.position.count;
  const WIN = Math.round(TOTAL * 0.16);
  const DRAW_S = 1.4;        // draw-on-load duration, seconds
  const PERIOD = 2.4;        // one sweep — a real resting rhythm

  let t0 = -1;
  hiGeo.setDrawRange(0, 0);

  /* gl.js calls tick(stageApi, engineState, dt) — `gl.time` is on the stage,
   * the pointer/scroll channels are on the engine state. Reading mx/my off the
   * stage yields undefined, which poisons the matrix with NaN and the mesh
   * silently vanishes. */
  const tick = (gl, st, dt) => {
    if (t0 < 0) t0 = gl.time;
    const t = gl.time - t0;

    if (t < DRAW_S) {
      /* draw-on-load: the trace writes itself once, left to right */
      const x = t / DRAW_S;
      hiGeo.setDrawRange(0, Math.round(TOTAL * (x * x * (3 - 2 * x))));
      hiMat.opacity = 0.85;
      baseMat.opacity = 0.20;
    } else {
      /* travelling QRS window */
      const ph = ((t - DRAW_S) % PERIOD) / PERIOD;
      const start = Math.round(ph * TOTAL);
      hiGeo.setDrawRange(start, Math.min(WIN, TOTAL - start));
      /* the ink line lifts as the spike passes the centre */
      baseMat.opacity = 0.24 + 0.07 * gauss(ph, 0.5, 0.10);
    }

    /* pointer parallax — small, clinical */
    object.rotation.z = st.mx * 0.035;
    object.position.x = st.mx * 0.30;
    object.position.y = y - st.my * 0.12;
  };

  const thin = () => {
    baseMat.opacity = 0.18;
    hiMat.opacity = 0.70;
  };

  return { object, tick, thin };
}

/* ------------------------------------------------------------ HairlineFloor */
export function HairlineFloor(stage, {
  cols = 26, rows = 14, gap = 2.0, y = -2.6,
} = {}) {
  const w = cols * gap, d = rows * gap;
  const v = [];
  for (let i = 0; i <= cols; i++) {
    const x = -w / 2 + i * gap;
    v.push(x, 0, -d / 2, x, 0, d / 2);
  }
  for (let j = 0; j <= rows; j++) {
    const z = -d / 2 + j * gap;
    v.push(-w / 2, 0, z, w / 2, 0, z);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(v, 3));
  const m = new THREE.LineBasicMaterial({
    color: 0x141210, transparent: true, opacity: 0.055, depthWrite: false });

  const object = new THREE.LineSegments(g, m);
  object.position.y = y;

  const tick = (gl, st) => { object.position.z = st.sp * 3.2; };
  const thin = () => { m.opacity = 0.035; };

  return { object, tick, thin };
}
