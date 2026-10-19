export interface Arm {
  radius: number;
  height: number;
  planet: number | null;
  start: number;
}

export const ARMS: readonly Arm[] = [
  { radius: 34, height: 96, planet: 5, start: 0.7 },
  { radius: 52, height: 83, planet: 7, start: 3.6 },
  { radius: 70, height: 70, planet: null, start: 0.45 },
  { radius: 88, height: 57, planet: 6, start: 2.4 },
  { radius: 106, height: 44, planet: 9, start: 4.9 },
];

export const MISSING = ARMS.findIndex(function isEmpty(arm) {
  return arm.planet === null;
});

export const MASTER_RATE = 0.45;

export function angleOf(index: number, clock: number) {
  const arm = ARMS[index];
  const slowdown = (ARMS[0].radius / arm.radius) ** 1.5;
  return arm.start + clock * MASTER_RATE * slowdown;
}

export const planetCount = ARMS.filter(function hasPlanet(arm) {
  return arm.planet !== null;
}).length;
