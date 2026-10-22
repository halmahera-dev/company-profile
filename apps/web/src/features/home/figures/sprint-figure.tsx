import {
  axisVector,
  corners,
  cylinder,
  insetPlan,
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

const DAYS = 14;
const CELL_PITCH = 4;
const CELL_WIDTH = 3;
const FIRST_CELL_X = -29;

export function SprintFigure() {
  const floorTop = FLOOR + 3;
  const plinth: Plan = { x: -50, y: -30, w: 100, d: 60, r: 3 };
  const track: Plan = { x: -31, y: -5, w: 62, d: 10, r: 1 };
  const trackTop = floorTop + 2.5;
  const cellTop = trackTop + 0.8;
  const pedestal: Plan = { x: -45, y: -8, w: 14, d: 16, r: 1 };
  const pedestalTop = floorTop + 10;
  const funnel: [number, number, number?][] = [
    [0, 2.6],
    [3, 2.6],
    [15, 8.4],
    [16.4, 9],
    [18, 8.4],
  ];
  const funnelTop = pedestalTop + 18;
  const base: Plan = { x: 31, y: -13, w: 12, d: 26, r: 1 };
  const baseTop = floorTop + 2.5;
  const bezelTop = baseTop + 24;
  const glassBottom = baseTop + 2.5;
  const glassFace = 39.8;
  const days = Array.from({ length: DAYS }, function dayAt(_, index) {
    return { index, x: FIRST_CELL_X + index * CELL_PITCH };
  });
  const run = axisVector(P, [(DAYS - 1) * CELL_PITCH, 0, 0]);
  const runStyle = { "--run-x": `${run[0]}px`, "--run-y": `${run[1]}px` } as React.CSSProperties;
  const weekPosts = [FIRST_CELL_X, FIRST_CELL_X + 7 * CELL_PITCH - 0.5, 28];
  const plinthScrews = corners(plinth, 6).map(function onPlinth([x, y]): Point3 {
    return [x, y, floorTop];
  });
  const bezelScrews: Point3[] = [
    [39, -11, bezelTop - 2],
    [39, 11, bezelTop - 2],
    [39, -11, baseTop + 2],
    [39, 11, baseTop + 2],
  ];

  return (
    <Bench
      hue="amber"
      id="hts-sprint"
      label="A data hopper feeds a block along a track of fourteen day cells. The cells light one by one, and a screen switches on at the end."
    >
      {slab(plinth, FLOOR, 3, "lo")}
      <Line d={planOutline(insetPlan(plinth, 3), floorTop, P)} tone="faint" />
      <Dots points={pointsAt(plinthScrews, P)} size={0.45} tone="mid" />
      <Solid paths={slabOf(pedestal, floorTop, 10, P, 4, 0.4)} tone="mid" />
      <Line
        d={faceBox("x", pedestal.x + pedestal.w, -3, 3, floorTop + 2, floorTop + 6)}
        tone="lo"
      />
      <Line
        d={faceBox("y", pedestal.y + pedestal.d, -42, -34, floorTop + 2, floorTop + 8)}
        tone="faint"
      />
      <Line d={planOutline(insetPlan(pedestal, 1.4), pedestalTop, P, 4)} tone="faint" />
      <Solid paths={G.solidOf(funnel, frameAt(-38, 0, pedestalTop), P)} tone="mid" />
      <Line d={ring(-38, 0, 8.6, funnelTop - 0.4, P, 28)} tone="lo" />
      <Line d={ring(-38, 0, 8.4, pedestalTop + 8, P, 28)} tone="faint" />
      {[
        [-41, -2, 1.6],
        [-35, 1, 1.9],
        [-38, 4, 1.4],
      ].map(function bead([x, y, r]) {
        return (
          <Solid key={`${x}${y}`} paths={G.sphereOf([x, y, funnelTop + r - 0.6], r, P)} tone="hi" />
        );
      })}
      {weekPosts.map(function post(x) {
        return (
          <g key={x}>
            <Solid paths={cylinder(x, -8, 0.8, floorTop, 8, P, 10)} tone="mid" crease="none" />
            <Solid paths={G.sphereOf([x, -8, floorTop + 8.6], 1.1, P)} tone="lo" />
          </g>
        );
      })}
      <Solid paths={slabOf(track, floorTop, 2.5, P, 4, 0.4)} tone="mid" />
      <Line d={planOutline(insetPlan(track, 1.2), trackTop, P, 4)} tone="faint" />
      {Array.from({ length: DAYS + 1 }, function tick(_, index) {
        const x = FIRST_CELL_X - 0.5 + index * CELL_PITCH;
        const isWeek = index % 7 === 0;
        return (
          <Line
            key={index}
            d={segment(
              [x, track.y + track.d, trackTop],
              [x, track.y + track.d, trackTop - (isWeek ? 2.2 : 1.2)],
              P,
            )}
            tone={isWeek ? "mid" : "lo"}
          />
        );
      })}
      {days.map(function renderCell(day) {
        const plan: Plan = { x: day.x, y: -3, w: CELL_WIDTH, d: 6, r: 0.5 };
        return (
          <Solid
            key={day.index}
            paths={slabOf(plan, trackTop, 0.8, P, 4, 0.2)}
            tone="lo"
            crease="none"
          />
        );
      })}
      <Solid paths={slabOf(base, floorTop, 2.5, P, 4, 0.4)} tone="lo" />
      <Solid
        paths={slabOf({ x: 35, y: -13, w: 5, d: 2, r: 0.4 }, baseTop, 6, P, 4, 0.3)}
        tone="lo"
      />
      <Solid
        paths={slabOf({ x: 35, y: 11, w: 5, d: 2, r: 0.4 }, baseTop, 6, P, 4, 0.3)}
        tone="lo"
      />
      <Solid
        paths={slabOf({ x: 36, y: -12, w: 3, d: 24, r: 1 }, baseTop, 24, P, 4, 0.5)}
        tone="mid"
      />
      <Dots points={pointsAt(bezelScrews, P)} size={0.45} tone="mid" />
      <Solid
        paths={slabOf({ x: 39, y: -10, w: 0.8, d: 20, r: 0.4 }, glassBottom, 19.5, P, 4, 0.2)}
        tone="lo"
      />
      <g className="hts-sprint" style={runStyle}>
        {days.map(function renderLit(day) {
          const plan: Plan = { x: day.x, y: -3, w: CELL_WIDTH, d: 6, r: 0.5 };
          const style = { "--at": day.index / (DAYS - 1) } as React.CSSProperties;
          return (
            <g key={day.index} className="hts-cell" style={style}>
              <Glow>
                <Solid paths={slabOf(plan, trackTop, 0.8, P, 4, 0.2)} tone="hi" crease="none" />
              </Glow>
            </g>
          );
        })}
        <g className="hts-screen">
          <Glow>
            <Solid
              paths={slabOf({ x: 39, y: -10, w: 0.8, d: 20, r: 0.4 }, glassBottom, 19.5, P, 4, 0.2)}
              tone="hi"
            />
          </Glow>
        </g>
        <g className="hts-token">
          <Glow>
            <Solid
              paths={slabOf(
                { x: FIRST_CELL_X, y: -1.5, w: 3, d: 3, r: 0.5 },
                cellTop,
                3,
                P,
                4,
                0.3,
              )}
              tone="hi"
            />
          </Glow>
        </g>
      </g>
      <Line d={faceBox("x", glassFace, -8, 8, glassBottom + 14.5, glassBottom + 17.5)} tone="lo" />
      <Line d={faceBox("x", glassFace, -8, -1, glassBottom + 6, glassBottom + 12.5)} tone="lo" />
      <Line d={faceBox("x", glassFace, 1, 8, glassBottom + 6, glassBottom + 12.5)} tone="lo" />
      <Line d={faceBox("x", glassFace, -8, 0, glassBottom + 1.5, glassBottom + 4)} tone="mid" />
    </Bench>
  );
}
