import {
  depthOf,
  dotsSvg,
  extrude,
  lineOnTop,
  lineSvg,
  pointsAt,
  solidSvg,
  translateAlong,
  type Plane,
  type Point3,
} from "@/components/iso/iso-kit";
import {
  BAR_HALF,
  BAR_HEIGHT,
  HUB_R,
  KNOB_RIGHT,
  KNOB_TOP,
  LEVEL_HEIGHT,
} from "@/features/not-found/geometry";
import { ARMS, angleOf } from "@/features/not-found/orrery";
import { P, SUN_Z } from "@/features/not-found/view";

const ROOT = Math.sqrt(HUB_R ** 2 - BAR_HALF ** 2);
const END_STEPS = 8;
const HUB_SCREW_R = 7.5;

function barRing(radius: number, angle: number): Plane[] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  function turn(along: number, across: number): Plane {
    return [along * cos - across * sin, along * sin + across * cos];
  }
  const ring = [turn(ROOT, -BAR_HALF), turn(radius, -BAR_HALF)];
  for (let step = 1; step < END_STEPS; step++) {
    const sweep = -Math.PI / 2 + (Math.PI * step) / END_STEPS;
    ring.push(turn(radius + BAR_HALF * Math.cos(sweep), BAR_HALF * Math.sin(sweep)));
  }
  ring.push(turn(radius, BAR_HALF), turn(ROOT, BAR_HALF));
  return ring;
}

export function barSvg(index: number, angle: number) {
  const { radius, height } = ARMS[index];
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const top = height + BAR_HEIGHT;
  const screws: Point3[] = [HUB_SCREW_R, ROOT + 6, radius - 6].map(function onBar(along): Point3 {
    return [along * cos, along * sin, top];
  });
  const paths = extrude(barRing(radius, angle), height, BAR_HEIGHT, P, { bevel: 0.5 });
  return (
    solidSvg(paths, { tone: "mid" }) + dotsSvg(pointsAt(screws, P), { size: 0.45, tone: "mid" })
  );
}

export function tipPosition(index: number, angle: number): Point3 {
  const { radius } = ARMS[index];
  return [Math.cos(angle) * radius, Math.sin(angle) * radius, 0];
}

export function shiftTo(index: number, angle: number) {
  return translateAlong(P, tipPosition(index, angle));
}

export function barKey(index: number, angle: number) {
  const { radius, height } = ARMS[index];
  const middle = (ROOT + radius) / 2;
  return depthOf([Math.cos(angle) * middle, Math.sin(angle) * middle, height + BAR_HEIGHT / 2], P);
}

export function tipKey(index: number, angle: number) {
  const [x, y] = tipPosition(index, angle);
  return depthOf([x, y, ARMS[index].height + 12], P);
}

export const LEVEL_KEYS = ARMS.map((arm) => depthOf([0, 0, arm.height + LEVEL_HEIGHT / 2], P));
export const SUN_KEY = depthOf([0, 0, SUN_Z], P);

export function knobPointerSvg(angle: number) {
  const [x, y] = KNOB_RIGHT;
  const tip: Plane = [x + Math.cos(angle) * 4.4, y + Math.sin(angle) * 4.4];
  return lineSvg(lineOnTop(KNOB_RIGHT, tip, KNOB_TOP, P), { tone: "hi", free: true });
}

export function itemsAt(clock: number) {
  const items = ARMS.flatMap(function armItems(_, index) {
    const angle = angleOf(index, clock);
    return [
      { id: `bar-${index}`, key: barKey(index, angle) },
      { id: `tip-${index}`, key: tipKey(index, angle) },
    ];
  });
  ARMS.forEach(function levelItem(_, index) {
    items.push({ id: `level-${index}`, key: LEVEL_KEYS[index] });
  });
  items.push({ id: "sun", key: SUN_KEY });
  return items.sort(function nearerLast(a, b) {
    return a.key - b.key;
  });
}
