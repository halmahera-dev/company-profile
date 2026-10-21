import { depthOf, iso, type Plane, type Point3, type SolidPaths } from "@/components/iso/iso-kit";
import * as G from "@/components/iso/lathe.mjs";

import {
  BAR_H,
  LETTER_H,
  LETTER_W,
  N,
  onMark,
  P,
  PLANET_R,
  RING_BAND,
  RING_R,
  STEM_W,
  THICK,
  U,
  UP,
} from "./view";

const FRAME = G.frameOf([0, 0, 0], N, U, UP);
const S0 = -THICK / 2;
const S1 = THICK / 2;

function rect(x: number, y: number, w: number, h: number): Plane[] {
  return [
    [x, y],
    [x + w, y],
    [x + w, y + h],
    [x, y + h],
  ];
}

function letter(x: number, y: number, w: number, h: number, at: Point3) {
  return {
    paths: G.prismOf(FRAME, rect(x, y, w, h), S0, S1, P) as SolidPaths,
    depth: depthOf(at, P),
  };
}

const halfW = LETTER_W / 2;
const halfH = LETTER_H / 2;
const barW = LETTER_W - STEM_W * 2;

export const LETTERS = [
  letter(-halfW, -halfH, STEM_W, LETTER_H, onMark(-halfW + STEM_W / 2, 0)),
  letter(-halfW + STEM_W, -BAR_H / 2, barW, BAR_H, onMark(0, 0)),
  letter(halfW - STEM_W, -halfH, STEM_W, LETTER_H, onMark(halfW - STEM_W / 2, 0)),
].sort(function farFirst(a, b) {
  return a.depth - b.depth;
});

export const RING = G.ringBand(S0, S1, RING_R - RING_BAND, RING_R + RING_BAND, FRAME, P, {
  hole: [S1, RING_R - RING_BAND],
}) as SolidPaths;

const planetAngle = Math.atan2(22.9, 16.1);

const planetRadius = RING_R + RING_BAND * 0.35;

export const PLANET = G.sphereOf(
  onMark(Math.cos(planetAngle) * planetRadius, Math.sin(planetAngle) * planetRadius, THICK * 0.12),
  PLANET_R,
  P,
  { steps: 56 },
) as SolidPaths;

const du = depthOf(U, P);
const dv = depthOf(UP, P);
const near = Math.atan2(dv, du);

function at(angle: number, radius: number) {
  return iso(onMark(Math.cos(angle) * radius, Math.sin(angle) * radius), P);
}

function nudge(
  point: [number, number],
  toward: [number, number],
  pixels: number,
): [number, number] {
  const dx = toward[0] - point[0];
  const dy = toward[1] - point[1];
  const length = Math.hypot(dx, dy) || 1;
  return [point[0] + (dx / length) * pixels, point[1] + (dy / length) * pixels];
}

const seamA = at(near + Math.PI / 2, 90);
const seamB = at(near - Math.PI / 2, 90);
const far = at(near + Math.PI, 90);
const close = at(near, 90);
const overlapA = nudge(seamA, far, 42);
const overlapB = nudge(seamB, far, 42);

export const NEAR_CLIP = [
  overlapA,
  overlapB,
  nudge(overlapB, close, 900),
  nudge(overlapA, close, 900),
]
  .map(function place([x, y]) {
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  })
  .join(" ");
