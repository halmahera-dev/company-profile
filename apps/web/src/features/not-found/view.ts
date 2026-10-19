import { fitProjection, type Point3 } from "@/components/iso/iso-kit";
import { ARMS } from "@/features/not-found/orrery";

export const WIDTH = 560;
export const HEIGHT = 500;

export const PLINTH_R = 128;
export const FOOT_Z = -19;
export const SUN_Z = 130;
export const SUN_R = 12;

function ringPoints(radius: number, z: number): Point3[] {
  return Array.from({ length: 24 }, function onRing(_, index) {
    const angle = (index / 24) * Math.PI * 2;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius, z];
  });
}

const reach = ARMS[ARMS.length - 1].radius + 12;

export const P = fitProjection(
  [...ringPoints(PLINTH_R, FOOT_Z), ...ringPoints(reach, 90), [0, 0, SUN_Z + SUN_R + 2]],
  WIDTH,
  HEIGHT,
  { pad: 26, azimuth: 45, elevation: 32 },
);
