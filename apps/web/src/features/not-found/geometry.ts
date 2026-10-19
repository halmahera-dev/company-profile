import {
  circleRing,
  cylinder,
  depthOf,
  lineOnTop,
  onTop,
  pointsAt,
  radialTicks,
  ring,
  sideArc,
  slabOf,
  knurl,
  topMatrix,
  planOutline,
  insetPlan,
  type Plan,
  type SolidPaths,
  type Point3,
} from "@/components/iso/iso-kit";
import * as G from "@/components/iso/lathe.mjs";
import { ARMS } from "@/features/not-found/orrery";
import { FOOT_Z, P, PLINTH_R, SUN_R, SUN_Z } from "@/features/not-found/view";

export const BAR_HEIGHT = 4;
export const BAR_HALF = 3.4;
export const HUB_R = 9;
export const SPACER_R = 6;
export const LEVEL_HEIGHT = 13;
export const TOP_Z = ARMS[0].height + LEVEL_HEIGHT;

const POST_R = 1.4;
const BOSS_R = 2.7;
const BOSS_H = 1.2;
const POST_FROM = BAR_HEIGHT + BOSS_H;
const SOCKET_R = 5.2;
const SOCKET_H = 5;
const STUD_H = 6;
const GHOST_R = 8;

const UP: Point3 = [0, 0, 1];
const frameAt = (z: number, x = 0, y = 0) => G.frameOf([x, y, z], UP, [1, 0, 0], [0, 1, 0]);

function byDepth(points: [number, number][]) {
  return [...points].sort(function nearerLast(a, b) {
    return depthOf([a[0], a[1], 0], P) - depthOf([b[0], b[1], 0], P);
  });
}

function around(radius: number, count: number, phase = 0): [number, number][] {
  return Array.from({ length: count }, function place(_, index) {
    const angle = phase + (index / count) * Math.PI * 2;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius];
  });
}

const ticks = radialTicks(0, 0, 119.7, 120, 10, 0, [2.2, 4.4], P);
const LEDGE_Z = -4;
const LEDGE = around(124, 8, Math.PI / 8);
const PAD_BOLTS = around(38, 6);
const GEAR_BOLTS = around(17, 6, Math.PI / 6);
const FLANGE_BOLTS = around(31, 4, Math.PI / 4);
const LABEL: Plan = { x: 46, y: 55, w: 36, d: 16, r: 2 };
const LABEL_Z = 0.8;
const KNOB_LEFT: [number, number] = [-36, 90];
export const KNOB_RIGHT: [number, number] = [90, -36];
export const KNOB_TOP = 6;

function knobArt([x, y]: [number, number]) {
  return {
    washer: cylinder(x, y, 7.4, 0, 1, P, 28),
    body: cylinder(x, y, 5.4, 1, KNOB_TOP - 1, P, 28, 0.5),
    knurl: knurl(x, y, 5.4, 1, KNOB_TOP, 26, P, 0.3),
    seam: sideArc(x, y, 5.4, 2.4, P, 20),
  };
}

export const BASE_ART = {
  halo: cylinder(0, 0, PLINTH_R, FOOT_Z, 18, P, 96).fill,
  feet: byDepth(around(96, 4, Math.PI / 4)).map(function foot([x, y]) {
    return [cylinder(x, y, 8, FOOT_Z, 1.6, P, 28), cylinder(x, y, 6, FOOT_Z + 1.6, 3.4, P, 28)];
  }),
  lower: cylinder(0, 0, PLINTH_R, -14, 10, P, 96, 1.2),
  ledgeRings: LEDGE.map(([x, y]) => ring(x, y, 1.9, LEDGE_Z, P, 14)).join(""),
  ledgeScrews: pointsAt(
    LEDGE.map(([x, y]): Point3 => [x, y, LEDGE_Z]),
    P,
  ),
  upper: cylinder(0, 0, 120, LEDGE_Z, 4, P, 96, 0.6),
  ticksMinor: ticks.minor,
  ticksMajor: ticks.major,
  tracks: ARMS.map((arm) => ring(0, 0, arm.radius, 0, P, 96)).join(""),
  pad: cylinder(0, 0, 44, 0, 1.6, P, 64, 0.6),
  padRings: PAD_BOLTS.map(([x, y]) => ring(x, y, 1.9, 1.6, P, 14)).join(""),
  padScrews: pointsAt(
    PAD_BOLTS.map(([x, y]): Point3 => [x, y, 1.6]),
    P,
  ),
  plate: slabOf(LABEL, 0, LABEL_Z, P, 4, 0.3),
  plateInner: planOutline(insetPlan(LABEL, 1.6), LABEL_Z, P, 4),
  plateScrews: pointsAt(
    [
      [LABEL.x + 3.6, LABEL.y + LABEL.d / 2, LABEL_Z],
      [LABEL.x + LABEL.w - 3.6, LABEL.y + LABEL.d / 2, LABEL_Z],
    ],
    P,
  ),
  plateText: topMatrix([LABEL.x + LABEL.w / 2, LABEL.y + LABEL.d / 2 + 2.6], LABEL_Z, P),
  knobLeft: knobArt(KNOB_LEFT),
  knobLeftPointer: lineOnTop(KNOB_LEFT, [KNOB_LEFT[0] + 4.4, KNOB_LEFT[1]], KNOB_TOP, P),
  knobRight: knobArt(KNOB_RIGHT),
};

const GEAR_Z = 1.6;
const GEAR_BODY_Z = GEAR_Z + 4;
const GEAR_TOP = GEAR_BODY_Z + 17;
const CAP_TOP = GEAR_TOP + 5;
const NECK_TOP = ARMS[ARMS.length - 1].height;

export const GEAR_ART = {
  flange: cylinder(0, 0, 34, GEAR_Z, 4, P, 72, 0.6),
  flangeRings: FLANGE_BOLTS.map(([x, y]) => ring(x, y, 1.9, GEAR_BODY_Z, P, 14)).join(""),
  flangeScrews: pointsAt(
    FLANGE_BOLTS.map(([x, y]): Point3 => [x, y, GEAR_BODY_Z]),
    P,
  ),
  body: cylinder(0, 0, 28, GEAR_BODY_Z, 17, P, 72, 0.8),
  knurl: knurl(0, 0, 28, GEAR_BODY_Z + 5, GEAR_BODY_Z + 12, 72, P, 0),
  seamLow: sideArc(0, 0, 28, GEAR_BODY_Z + 5, P, 40),
  seamHigh: sideArc(0, 0, 28, GEAR_BODY_Z + 12, P, 40),
  cap: cylinder(0, 0, 22, GEAR_TOP, 5, P, 56, 0.6),
  capRings: GEAR_BOLTS.map(([x, y]) => ring(x, y, 1.7, CAP_TOP, P, 14)).join(""),
  capScrews: pointsAt(
    GEAR_BOLTS.map(([x, y]): Point3 => [x, y, CAP_TOP]),
    P,
  ),
  neck: cylinder(0, 0, 8.4, CAP_TOP, NECK_TOP - CAP_TOP, P, 32),
  neckSeam: sideArc(0, 0, 8.4, CAP_TOP + 6, P, 24),
};

export function levelArt(index: number) {
  const F = frameAt(ARMS[index].height);
  return {
    body: G.solidOf(
      [
        [0, HUB_R],
        [4, HUB_R],
        [4, SPACER_R],
        [LEVEL_HEIGHT, SPACER_R],
      ],
      F,
      P,
      { bevel: 0.4 },
    ),
    ribs: G.ribsOf(F, 0, 4, HUB_R, 36, P, { seams: true }) as string,
    seam: G.arcOf(F, 8.6, SPACER_R, P) as string,
  };
}

export const LEVEL_ART = ARMS.map((_, index) => levelArt(index));

const SUN_FRAME = frameAt(SUN_Z);
const NECK_BOTTOM = TOP_Z;
const NECK_R = 3.4;
const NECK_LENGTH = SUN_Z - Math.sqrt(SUN_R ** 2 - NECK_R ** 2) - NECK_BOTTOM;

export const SUN_ART = {
  neck: G.solidOf(
    [
      [0, NECK_R],
      [NECK_LENGTH, NECK_R],
    ],
    frameAt(NECK_BOTTOM),
    P,
  ),
  neckSeam: G.arcOf(frameAt(NECK_BOTTOM), 4, NECK_R, P) as string,
  ball: G.sphereOf([0, 0, SUN_Z], SUN_R, P) as SolidPaths,
  equator: G.arcOf(SUN_FRAME, 0, SUN_R, P, { slope: 0 }) as string,
  glow: { centre: pointsAt([[0, 0, SUN_Z]], P)[0], radius: SUN_R * P.scale },
};

export function tipArt(index: number) {
  const { height, planet } = ARMS[index];
  const bossTop = height + POST_FROM;
  const boss = cylinder(0, 0, BOSS_R, height + BAR_HEIGHT, BOSS_H, P, 20, 0.2);
  if (planet !== null) {
    const centre = height + POST_FROM + 15 + planet;
    const postTop = centre - Math.sqrt(planet ** 2 - POST_R ** 2);
    return {
      kind: "planet" as const,
      boss,
      collar: cylinder(0, 0, 2.3, bossTop + 3, 1.2, P, 16),
      post: cylinder(0, 0, POST_R, bossTop, postTop - bossTop, P, 12),
      ball: G.sphereOf([0, 0, centre], planet, P) as SolidPaths,
      glow: { centre: pointsAt([[0, 0, centre]], P)[0], radius: planet * P.scale },
      belt: planet >= 7 ? (G.arcOf(frameAt(centre), 0, planet, P, { slope: 0 }) as string) : "",
      shadow: onTop(circleRing(0, 0, planet * 1.1, 28), 0, P, true),
    };
  }
  const socketBottom = bossTop + 11;
  const socketTop = socketBottom + SOCKET_H;
  const studTop = socketTop + STUD_H;
  const ghostCentre: Point3 = [0, 0, studTop + GHOST_R + 2.5];
  return {
    kind: "socket" as const,
    boss,
    collar: cylinder(0, 0, 2.3, bossTop + 3, 1.2, P, 16),
    post: cylinder(0, 0, POST_R, bossTop, socketBottom - bossTop, P, 12),
    socket: cylinder(0, 0, SOCKET_R, socketBottom, SOCKET_H, P, 32, 0.5),
    socketSeam: sideArc(0, 0, SOCKET_R, socketBottom + 1.6, P, 20),
    recess: onTop(circleRing(0, 0, 3.7, 28), socketTop, P, true),
    stud: cylinder(0, 0, 1.1, socketTop, STUD_H, P, 12),
    ghost: { centre: pointsAt([ghostCentre], P)[0], radius: GHOST_R * P.scale },
    shadow: onTop(circleRing(0, 0, SOCKET_R * 1.1, 24), 0, P, true),
  };
}

export const TIP_ART = ARMS.map((_, index) => tipArt(index));
