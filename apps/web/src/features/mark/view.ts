import { cameraOf, fitProjection, type Point3, type Projection } from "@/components/iso/iso-kit";

export const WIDTH = 640;
export const HEIGHT = 640;

export const RING_R = 28;
export const RING_BAND = 1.35;
export const THICK = 4.2;
export const PLANET_R = 3.5;
export const LETTER_W = 22;
export const LETTER_H = 28;
export const STEM_W = 5.5;
export const BAR_H = 5.5;

const AZIMUTH = 45;
const ELEVATION = 30;
const YAW = (16 * Math.PI) / 180;
const TILT = (18 * Math.PI) / 180;

function cross(a: Point3, b: Point3): Point3 {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

function turn(axis: Point3, vec: Point3, angle: number): Point3 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const dot = axis[0] * vec[0] + axis[1] * vec[1] + axis[2] * vec[2];
  const spun = cross(axis, vec);
  return [
    vec[0] * c + spun[0] * s + axis[0] * dot * (1 - c),
    vec[1] * c + spun[1] * s + axis[1] * dot * (1 - c),
    vec[2] * c + spun[2] * s + axis[2] * dot * (1 - c),
  ];
}

const AIM: Projection = { origin: [0, 0], scale: 1, azimuth: AZIMUTH, elevation: ELEVATION };
const { sinA, cosA, sinE, cosE } = cameraOf(AIM);
const view: Point3 = [cosA * cosE, sinA * cosE, sinE];
const right: Point3 = [sinA, -cosA, 0];
const up0: Point3 = [-cosA * sinE, -sinA * sinE, cosE];
const yawedRight = turn(up0, right, YAW);
const yawedView = turn(up0, view, YAW);

export const U = yawedRight;
export const N = turn(yawedRight, yawedView, TILT);
export const UP = turn(yawedRight, up0, TILT);

export function onMark(x: number, y: number, s = 0): Point3 {
  return [
    N[0] * s + U[0] * x + UP[0] * y,
    N[1] * s + U[1] * x + UP[1] * y,
    N[2] * s + U[2] * x + UP[2] * y,
  ];
}

function around(radius: number, s: number): Point3[] {
  return Array.from({ length: 12 }, function place(_, index) {
    const angle = (index / 12) * Math.PI * 2;
    return onMark(Math.cos(angle) * radius, Math.sin(angle) * radius, s);
  });
}

const reach = RING_R + RING_BAND + PLANET_R;

export const P = fitProjection(
  [
    ...around(reach, THICK / 2),
    ...around(reach, -THICK / 2),
    onMark(-LETTER_W / 2, -LETTER_H / 2, THICK / 2),
    onMark(LETTER_W / 2, LETTER_H / 2, -THICK / 2),
  ],
  WIDTH,
  HEIGHT,
  { pad: 48, azimuth: AZIMUTH, elevation: ELEVATION },
);
