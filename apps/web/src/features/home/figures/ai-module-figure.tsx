import {
  axisVector,
  corners,
  cylinder,
  insetPlan,
  iso,
  pathOf,
  planOutline,
  pointsAt,
  ring,
  rise,
  segment,
  slabOf,
  type Plan,
  type Point3,
} from "@/components/iso/iso-kit";
import * as G from "@/components/iso/lathe.mjs";
import { Dots, Line, Solid } from "@/components/iso/react/draw";
import { Bench, FLOOR, Glow, P, faceBox, slab } from "@/features/home/figures/bench";

const LIFT = 20;

function vectorOf(by: Point3) {
  const [x, y] = axisVector(P, by);
  return `${x}px ${y}px`;
}

export function AiModuleFigure() {
  const plinth: Plan = { x: -46, y: -32, w: 92, d: 64, r: 3 };
  const floorTop = FLOOR + 3;
  const block: Plan = { x: -42, y: -22, w: 50, d: 44, r: 1.5 };
  const bodyZ = floorTop + 3;
  const bodyTop = bodyZ + 23;
  const front = block.y + block.d;
  const side = block.x + block.w;
  const socket: Plan = { x: -30, y: -12, w: 24, d: 24, r: 1 };
  const socketTop = bodyTop + 1.2;
  const cartridge: Plan = { x: -27, y: -9, w: 18, d: 18, r: 1.5 };
  const cartridgeH = 12;
  const cartridgeTop = socketTop + cartridgeH;
  const posts: [number, number][] = [
    [-31.5, -13.5],
    [-4.5, -13.5],
    [-31.5, 13.5],
    [-4.5, 13.5],
  ];
  const [backPost, ...otherPosts] = posts;
  const pins = [-6, 0, 6].flatMap(function row(y) {
    return [-6, 0, 6].map(function pin(x): Point3 {
      return [-18 + x, y, socketTop];
    });
  });
  const screws = corners(block, 3).map(function onTop([x, y]): Point3 {
    return [x, y, bodyTop];
  });
  const panelScrews: Point3[] = [
    [-36, front, bodyZ + 17],
    [2, front, bodyZ + 17],
    [-36, front, bodyZ + 3],
    [2, front, bodyZ + 3],
  ];
  const ledXs = [-30, -25, -20];
  const drum = { x: 28, y: 4, r: 7.5 };
  const discs = [0, 9, 18].map(function level(step) {
    return floorTop + step;
  });
  const dockStyle = { "--dock-lift": vectorOf([0, 0, LIFT]) } as React.CSSProperties;

  function cablePath(y: number) {
    const route: Point3[] = [
      [drum.x - 6, y, floorTop + 0.8],
      [side + 6, y, floorTop + 0.8],
      [side, y, bodyZ + 3],
    ];
    return pathOf(
      route.map(function project(point) {
        return iso(point, P);
      }),
    );
  }

  return (
    <Bench
      hue="violet"
      id="hts-add-ai"
      label="A product cabinet with an open slot on top. A glowing AI module lowers into the slot, and data flows in from a storage drum."
    >
      {slab(plinth, FLOOR, 3, "lo")}
      <Line d={planOutline(insetPlan(plinth, 3), floorTop, P)} tone="faint" />
      <Dots
        points={pointsAt(
          corners(plinth, 6).map(function onPlinth([x, y]): Point3 {
            return [x, y, floorTop];
          }),
          P,
        )}
        size={0.45}
        tone="mid"
      />
      {slab(
        { x: block.x - 1, y: block.y - 1, w: block.w + 2, d: block.d + 2, r: 1.5 },
        floorTop,
        3,
        "lo",
      )}
      <Solid paths={slabOf(block, bodyZ, 23, P, 4, 0.5)} tone="mid" />
      <Line d={faceBox("y", front, -38, 4, bodyZ + 3, bodyZ + 20)} tone="lo" />
      <Line d={faceBox("x", side, -18, 18, bodyZ + 3, bodyZ + 20)} tone="faint" />
      {[-4, 0, 4].map(function vent(row) {
        return (
          <Line
            key={row}
            d={faceBox("y", front, -34, -14, bodyZ + 12 + row, bodyZ + 13 + row)}
            tone="faint"
          />
        );
      })}
      <Line d={faceBox("y", front, 8, 0, bodyZ + 4, bodyZ + 16)} tone="faint" />
      <Line d={segment([-34, front, bodyZ + 23], [-34, front, bodyZ + 20], P)} tone="faint" />
      <Dots points={pointsAt(panelScrews, P)} size={0.45} tone="mid" />
      <Dots points={pointsAt(screws, P)} size={0.45} tone="mid" />
      <Line d={planOutline(insetPlan(block, 1.6), bodyTop, P, 4)} tone="faint" />
      {ledXs.map(function offLed(x) {
        return <Solid key={x} paths={G.sphereOf([x, front, bodyZ + 20.5], 0.9, P)} tone="lo" />;
      })}
      <Line d={faceBox("x", side, -4, 4, bodyZ, bodyZ + 6)} tone="mid" />
      <Solid paths={slabOf(socket, bodyTop, 1.2, P, 4, 0.3)} tone="lo" />
      <Line d={planOutline(insetPlan(socket, 3), socketTop, P, 4)} tone="faint" />
      <Dots points={pointsAt(pins, P)} size={0.5} tone="mid" />
      <Solid
        paths={cylinder(backPost[0], backPost[1], 1.1, socketTop, 18, P, 12)}
        tone="mid"
        crease="none"
      />
      <Solid
        paths={cylinder(backPost[0], backPost[1], 1.7, socketTop + 18, 1, P, 12, 0.2)}
        tone="lo"
      />
      <Line d={cablePath(-1.5)} tone="lo" />
      <Line d={cablePath(1.5)} tone="mid" />
      {[discs[0], discs[1], discs[2]].map(function renderDisc(z, index) {
        return (
          <g key={z}>
            <Solid paths={cylinder(drum.x, drum.y, drum.r, z, 6, P, 32, 0.4)} tone="mid" />
            <Line d={ring(drum.x, drum.y, drum.r - 2.2, z + 6, P, 24)} tone="faint" />
            {index < 2 ? (
              <Solid
                paths={cylinder(drum.x, drum.y, drum.r - 1.6, z + 6, 3, P, 24)}
                tone="lo"
                crease="none"
              />
            ) : null}
          </g>
        );
      })}
      <Solid paths={cylinder(drum.x, drum.y, 2, discs[2] + 6, 1.4, P, 14, 0.2)} tone="lo" />
      <Dots
        points={pointsAt(
          [0, 1, 2].map(function stripe(step): Point3 {
            return [drum.x - 3 + step * 3, drum.y + drum.r, discs[0] + 3];
          }),
          P,
        )}
        size={0.45}
        tone="mid"
      />
      <g className="hts-docked">
        <Line d={cablePath(1.5)} tone="hi" flow />
        {ledXs.map(function onLed(x) {
          return (
            <Glow key={x}>
              <Solid paths={G.sphereOf([x, front, bodyZ + 20.5], 0.9, P)} tone="hi" />
            </Glow>
          );
        })}
      </g>
      <g className="hts-dock" style={dockStyle}>
        <Glow>
          <Solid paths={slabOf(cartridge, socketTop, cartridgeH, P, 4, 0.5)} tone="hi" />
        </Glow>
        {[-5, 0, 5].map(function rib(y) {
          return (
            <Line
              key={y}
              d={rise([cartridge.x + cartridge.w, y], socketTop + 2, cartridgeTop - 2, P)}
              tone="lo"
            />
          );
        })}
        <Line
          d={faceBox(
            "y",
            cartridge.y + cartridge.d,
            cartridge.x + 3,
            cartridge.x + 15,
            socketTop + 3,
            socketTop + 8,
          )}
          tone="lo"
        />
        <Solid
          paths={slabOf({ x: -22, y: -4, w: 8, d: 8, r: 1 }, cartridgeTop, 2.4, P, 4, 0.3)}
          tone="mid"
        />
        <Line d={ring(-18, 0, 1.6, cartridgeTop + 2.4, P, 16)} tone="lo" />
      </g>
      {otherPosts.map(function renderPost([x, y]) {
        return (
          <g key={`${x}${y}`}>
            <Solid paths={cylinder(x, y, 1.1, socketTop, 18, P, 12)} tone="mid" crease="none" />
            <Solid paths={cylinder(x, y, 1.7, socketTop + 18, 1, P, 12, 0.2)} tone="lo" />
          </g>
        );
      })}
    </Bench>
  );
}
