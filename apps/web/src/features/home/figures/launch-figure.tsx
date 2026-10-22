import {
  axisVector,
  corners,
  cylinder,
  insetPlan,
  lineOnTop,
  planOutline,
  pointsAt,
  ring,
  segment,
  slabOf,
  type Plan,
  type Point3,
} from "@/components/iso/iso-kit";
import * as G from "@/components/iso/lathe.mjs";
import { Dots, Line, Solid } from "@/components/iso/react/draw";
import { Bench, FLOOR, Glow, P, faceBox, frameAt, slab } from "@/features/home/figures/bench";

const DESIGN_X = -32;
const BUILD_X = 0;
const LAUNCH_X = 36;

function vectorOf(by: Point3) {
  const [x, y] = axisVector(P, by);
  return `${x}px ${y}px`;
}

export function LaunchFigure() {
  const floorTop = FLOOR + 3;
  const plinth: Plan = { x: -50, y: -30, w: 100, d: 60, r: 3 };
  const railTop = floorTop + 1.5;
  const rail: Plan = { x: -46, y: -3, w: 70, d: 6, r: 0.8 };
  const cart: Plan = { x: DESIGN_X - 5, y: -3.5, w: 10, d: 7, r: 1 };
  const cartTop = railTop + 2;
  const podProfile: [number, number, number?][] = [
    [0, 3.2],
    [1.2, 3.4, 1],
    [6, 3.4],
    [9, 2.2, 1],
    [11.6, 0.4],
  ];
  const table: Plan = { x: -42, y: -22, w: 18, d: 14, r: 0.8 };
  const tableTop = floorTop + 11;
  const sheet: Plan = insetPlan(table, 2);
  const lampAt = { x: -40, y: -20 };
  const lampHead = tableTop + 13;
  const beamZ = floorTop + 26;
  const pressDrop = vectorOf([0, 0, -2.6]);
  const plume = [
    { z: cartTop + 2, r: 3.2 },
    { z: cartTop + 5.6, r: 2.4 },
    { z: cartTop + 8.6, r: 1.6 },
  ];
  const clamps = [225, 315, 45, 135].map(function clampAt(degrees) {
    const angle = (degrees * Math.PI) / 180;
    return { degrees, x: LAUNCH_X + Math.cos(angle) * 9, y: Math.sin(angle) * 9 };
  });
  const plinthScrews = corners(plinth, 6).map(function onPlinth([x, y]): Point3 {
    return [x, y, floorTop];
  });
  const carryStyle = {
    "--to-build": vectorOf([BUILD_X - DESIGN_X, 0, 0]),
    "--to-launch": vectorOf([LAUNCH_X - DESIGN_X, 0, 0]),
    "--lift": vectorOf([0, 0, 40]),
  } as React.CSSProperties;
  const ties = Array.from({ length: 11 }, function tieAt(_, index) {
    return -42 + index * 6;
  });
  const stack = [-1.5, 0, 1.5];

  function clampPost(clamp: (typeof clamps)[number]) {
    const plan: Plan = { x: clamp.x - 1, y: clamp.y - 1, w: 2, d: 2, r: 0.3 };
    return (
      <g key={clamp.degrees}>
        {slab(plan, floorTop + 1.5, 7)}
        {slab(
          { x: clamp.x - 1.4, y: clamp.y - 1.4, w: 2.8, d: 2.8, r: 0.3 },
          floorTop + 8.5,
          1,
          "lo",
        )}
      </g>
    );
  }

  return (
    <Bench
      hue="green"
      id="hts-launch"
      label="A product pod rides a rail through three stations: a drafting table, a build press, and a launch pad where it lifts off."
    >
      {slab(plinth, FLOOR, 3, "lo")}
      <Line d={planOutline(insetPlan(plinth, 3), floorTop, P)} tone="faint" />
      <Dots points={pointsAt(plinthScrews, P)} size={0.45} tone="mid" />

      {[
        [table.x + 1.6, table.y + 1.6],
        [table.x + table.w - 1.6, table.y + 1.6],
        [table.x + 1.6, table.y + table.d - 1.6],
        [table.x + table.w - 1.6, table.y + table.d - 1.6],
      ].map(function leg([x, y]) {
        return (
          <Solid
            key={`${x}${y}`}
            paths={cylinder(x, y, 0.9, floorTop, 11, P, 10)}
            tone="lo"
            crease="none"
          />
        );
      })}
      <Solid paths={slabOf(table, tableTop - 2, 2, P, 4, 0.4)} tone="mid" />
      <Solid paths={slabOf(sheet, tableTop, 0.5, P, 4, 0.2)} tone="lo" crease="none" />
      {[-4, 0, 4].map(function gridRow(offset) {
        const y = sheet.y + sheet.d / 2 + offset;
        return (
          <Line
            key={`r${offset}`}
            d={lineOnTop([sheet.x, y], [sheet.x + sheet.w, y], tableTop + 0.5, P)}
            tone="faint"
          />
        );
      })}
      {[-4, 0, 4].map(function gridColumn(offset) {
        const x = sheet.x + sheet.w / 2 + offset;
        return (
          <Line
            key={`c${offset}`}
            d={lineOnTop([x, sheet.y], [x, sheet.y + sheet.d], tableTop + 0.5, P)}
            tone="faint"
          />
        );
      })}
      <Line
        d={ring(sheet.x + sheet.w / 2 + 2, sheet.y + sheet.d / 2, 3.2, tableTop + 0.5, P, 24)}
        tone="mid"
      />
      <Solid
        paths={slabOf(
          { x: sheet.x + 2, y: sheet.y + 1.4, w: 8, d: 0.9, r: 0.2 },
          tableTop + 0.5,
          0.9,
          P,
          4,
          0.1,
        )}
        tone="mid"
        crease="none"
      />
      <Solid paths={cylinder(lampAt.x, lampAt.y, 2, tableTop, 1, P, 16, 0.2)} tone="lo" />
      <Solid
        paths={cylinder(lampAt.x, lampAt.y, 0.5, tableTop + 1, 11, P, 8)}
        tone="mid"
        crease="none"
      />
      <Solid paths={cylinder(lampAt.x, lampAt.y, 2.6, lampHead - 1.4, 1.4, P, 16, 0.2)} tone="lo" />
      <Solid paths={G.sphereOf([lampAt.x, lampAt.y, lampHead - 1.8], 1.7, P)} tone="lo" />
      <g className="hts-lamp">
        <Glow>
          <Solid paths={G.sphereOf([lampAt.x, lampAt.y, lampHead - 1.8], 1.7, P)} tone="hi" />
        </Glow>
      </g>

      <Solid
        paths={slabOf({ x: 35, y: -19, w: 4, d: 4, r: 0.4 }, floorTop, 32, P, 4, 0.4)}
        tone="mid"
      />
      {[10, 18, 26].map(function level(z) {
        return (
          <Line
            key={z}
            d={faceBox("y", -15, 35.6, 38.4, floorTop + z, floorTop + z + 2)}
            tone="faint"
          />
        );
      })}
      <Solid
        paths={slabOf({ x: 36, y: -15, w: 2, d: 9, r: 0.3 }, floorTop + 14, 1.6, P, 4, 0.2)}
        tone="lo"
      />
      <Solid paths={cylinder(37, -17, 1, floorTop + 32, 2, P, 10, 0.2)} tone="lo" />
      <Solid paths={G.sphereOf([37, -17, floorTop + 36], 1.6, P)} tone="lo" />
      <g className="hts-beacon">
        <Glow>
          <Solid paths={G.sphereOf([37, -17, floorTop + 36], 1.6, P)} tone="hi" />
        </Glow>
      </g>

      <Solid
        paths={slabOf({ x: -3.5, y: -10, w: 7, d: 5, r: 0.4 }, floorTop, 1.2, P, 4, 0.2)}
        tone="lo"
      />
      <Solid
        paths={slabOf({ x: -2, y: -9, w: 4, d: 3, r: 0.3 }, floorTop + 1.2, 24.8, P, 4, 0.3)}
        tone="mid"
      />
      {clampPost(clamps[0])}
      {clampPost(clamps[1])}

      <Solid paths={slabOf(rail, floorTop, 1.5, P, 4, 0.3)} tone="mid" />
      <Line d={planOutline(insetPlan(rail, 0.9), railTop, P, 4)} tone="faint" />
      {ties.map(function tie(x) {
        return <Line key={x} d={lineOnTop([x, -3], [x, 3], railTop, P)} tone="faint" />;
      })}
      <Solid paths={cylinder(LAUNCH_X, 0, 12.5, floorTop, 1.5, P, 40, 0.3)} tone="mid" />
      <Line d={ring(LAUNCH_X, 0, 9, railTop, P, 40)} tone="faint" />
      <Line d={ring(LAUNCH_X, 0, 5.4, railTop, P, 32)} tone="faint" />

      <g className="hts-carry" style={carryStyle}>
        <Solid paths={slabOf(cart, railTop, 2, P, 4, 0.4)} tone="lo" />
        <Dots
          points={pointsAt(
            corners(cart, 1.4).map(function onCart([x, y]): Point3 {
              return [x, y, cartTop];
            }),
            P,
          )}
          size={0.4}
          tone="mid"
        />
        <Line d={planOutline(insetPlan(cart, 2.4), cartTop, P, 4)} tone="faint" />
        <g className="hts-plume">
          {plume.map(function puff(item) {
            return (
              <Glow key={item.z}>
                <Solid paths={G.sphereOf([DESIGN_X, 0, item.z], item.r, P)} tone="hi" />
              </Glow>
            );
          })}
        </g>
        <g className="hts-pod">
          {[
            { key: "w", plan: { x: DESIGN_X - 4.6, y: -0.35, w: 2, d: 0.7, r: 0.15 } },
            { key: "n", plan: { x: DESIGN_X - 0.35, y: -4.6, w: 0.7, d: 2, r: 0.15 } },
          ].map(function backFin(fin) {
            return <g key={fin.key}>{slab(fin.plan, cartTop, 3.4)}</g>;
          })}
          <Glow>
            <Solid paths={G.solidOf(podProfile, frameAt(DESIGN_X, 0, cartTop), P)} tone="hi" />
          </Glow>
          <Line d={ring(DESIGN_X, 0, 3.4, cartTop + 6, P, 24)} tone="lo" />
          <Line d={ring(DESIGN_X, 0, 3.4, cartTop + 3, P, 24)} tone="lo" />
          {[
            { key: "e", plan: { x: DESIGN_X + 2.6, y: -0.35, w: 2, d: 0.7, r: 0.15 } },
            { key: "s", plan: { x: DESIGN_X - 0.35, y: 2.6, w: 0.7, d: 2, r: 0.15 } },
          ].map(function frontFin(fin) {
            return <g key={fin.key}>{slab(fin.plan, cartTop, 3.4)}</g>;
          })}
        </g>
      </g>

      {clampPost(clamps[2])}
      {clampPost(clamps[3])}
      <Solid
        paths={slabOf({ x: -3.5, y: 5, w: 7, d: 5, r: 0.4 }, floorTop, 1.2, P, 4, 0.2)}
        tone="lo"
      />
      <Solid
        paths={slabOf({ x: -2, y: 6, w: 4, d: 3, r: 0.3 }, floorTop + 1.2, 24.8, P, 4, 0.3)}
        tone="mid"
      />
      <Line d={faceBox("y", 9, -1.2, 1.2, floorTop + 6, floorTop + 17)} tone="faint" />
      {stack.map(function led(offset, index) {
        const z = floorTop + 8 + (offset + 1.5) * 2.4;
        return (
          <g key={offset}>
            <Solid paths={G.sphereOf([0, 9, z], 0.6, P)} tone="lo" />
            <g className={`hts-flash hts-flash-${index}`}>
              <Glow>
                <Solid paths={G.sphereOf([0, 9, z], 0.6, P)} tone="hi" />
              </Glow>
            </g>
          </g>
        );
      })}
      <g className="hts-press" style={{ "--press": pressDrop } as React.CSSProperties}>
        <Solid paths={cylinder(0, 0, 1.1, beamZ - 5, 5, P, 12)} tone="mid" crease="none" />
        <Solid paths={cylinder(0, 0, 3.4, beamZ - 8, 3, P, 20, 0.3)} tone="lo" />
      </g>
      <Solid paths={cylinder(0, 0, 1.9, beamZ - 4, 4, P, 14, 0.2)} tone="mid" />
      <Solid
        paths={slabOf({ x: -3, y: -10, w: 6, d: 20, r: 0.6 }, beamZ, 3, P, 4, 0.4)}
        tone="mid"
      />
      <Line d={segment([0, 10, beamZ + 3], [0, 10, beamZ], P)} tone="faint" />
      <Line d={faceBox("y", 10, -2, 2, beamZ + 0.6, beamZ + 2.4)} tone="faint" />
    </Bench>
  );
}
