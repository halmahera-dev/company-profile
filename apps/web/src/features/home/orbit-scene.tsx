"use client";

import "@/components/iso/iso.css";

import { cn } from "@halmahera/ui/lib/utils";
import * as React from "react";

import {
  follow,
  spring,
  type Spring,
  useInView,
  useLoop,
  useStillness,
} from "@/components/iso/react/live";

type Vec3 = [number, number, number];

interface Ring {
  radius: number;
  tiltX: number;
  tiltZ: number;
  secondsPerTurn: number;
  glyphs: number;
}

interface Glyph {
  ring: number;
  slot: number;
  character: string;
  cell: Vec3 | null;
  delay: number;
  heat: number;
}

interface Palette {
  glyph: string;
  brand: string;
  purple: string;
  line: string;
  additive: boolean;
  font: string;
}

interface Scene {
  glyphs: Glyph[];
  clock: number;
  swapClock: number;
  landing: number;
  landed: boolean;
  holdLeft: number;
  crossfade: number;
  padLight: number;
  pointer: { x: number; y: number; glow: number; inside: boolean };
  turn: { yaw: Spring; pitch: Spring };
  center: { x: number; y: number };
  scale: number;
  dpr: number;
  palette: Palette | null;
  ease: (t: number) => number;
}

const CHARACTERS = "#S08Xx+=-;:. @";
const RINGS: Ring[] = [
  { radius: 1.7, tiltX: 0.32, tiltZ: -0.28, secondsPerTurn: 60, glyphs: 56 },
  { radius: 2.25, tiltX: -0.22, tiltZ: 0.34, secondsPerTurn: -90, glyphs: 72 },
];
const LANDING_RING = 0;
const PAD_NORMAL = normalize([0.3, -0.38, 0.88]);
const FLIGHT_SECONDS = 1.2;
const LANDING_SECONDS = 1.6;
const HOLD_SECONDS = 4;
const CROSSFADE_SECONDS = 0.2;
const COLOR_FADE_SECONDS = 0.055;
const SWAP_SECONDS = 0.15;
const MAX_TURN = 0.35;
const HOVER_REACH = 90;
const HOVER_BLUR = 8;
// Same lightness as --brand, so the hover gradient reads as one light.
const HOVER_PURPLE = "oklch(64.5% 0.24 305)";
// motion's default spring, { bounce: 0, duration: 0.4 }, as stiffness and damping.
const TURN_STIFFNESS = (2 * Math.PI / 0.4) ** 2;
const TURN_DAMPING = 2 * Math.sqrt(TURN_STIFFNESS);
const CAMERA_DISTANCE = 7;
const PAD_HALF_SPAN = 0.32;

export function OrbitScene({ className }: { className?: string }) {
  const wrapper = React.useRef<HTMLDivElement>(null);
  const canvas = React.useRef<HTMLCanvasElement>(null);
  const probe = React.useRef<HTMLSpanElement>(null);
  const moonButton = React.useRef<HTMLButtonElement>(null);
  const scene = React.useRef<Scene>({
    glyphs: [],
    clock: 0,
    swapClock: 0,
    landing: 0,
    landed: false,
    holdLeft: 0,
    crossfade: 0,
    padLight: 0,
    pointer: { x: 0, y: 0, glow: 0, inside: false },
    turn: { yaw: { at: 0, rate: 0 }, pitch: { at: 0, rate: 0 } },
    center: { x: 0, y: 0 },
    scale: 1,
    dpr: 1,
    palette: null,
    ease: (t: number) => t,
  });
  const inView = useInView(wrapper);
  const still = useStillness();

  const draw = React.useCallback(function draw() {
    const context = canvas.current?.getContext("2d");
    const current = scene.current;
    if (!context || !current.palette) return;
    drawScene(context, current, current.palette);
  }, []);

  const kick = useLoop(function tick(dt, calm) {
    const current = scene.current;
    const landingTarget = current.landed ? LANDING_SECONDS : 0;

    if (calm) {
      current.crossfade = approach(current.crossfade, current.landed ? 1 : 0, dt / CROSSFADE_SECONDS);
      current.landing = landingTarget;
    } else {
      current.clock += dt;
      current.landing = approach(current.landing, landingTarget, dt);
      current.crossfade = 0;
      swapCharacters(current, dt);
    }

    const touchedDown = current.landed && current.landing === LANDING_SECONDS;
    if (touchedDown) {
      current.holdLeft -= dt;
      if (current.holdLeft <= 0) current.landed = false;
    }
    current.padLight = follow(current.padLight, touchedDown ? 1 : 0, dt, COLOR_FADE_SECONDS);
    current.pointer.glow = follow(current.pointer.glow, current.pointer.inside ? 1 : 0, dt, COLOR_FADE_SECONDS);
    const turnSettled = turnMoon(current, dt, calm);
    warmGlyphs(current, dt);
    draw();

    const settling =
      current.landed ||
      current.padLight > 0 ||
      current.pointer.glow > 0 ||
      current.pointer.inside ||
      current.crossfade > 0 ||
      !turnSettled ||
      current.glyphs.some((glyph) => glyph.heat > 0);
    return !calm || settling;
  }, inView && !still);

  React.useEffect(
    function watchLayoutAndTheme() {
      const wrapperNode = wrapper.current;
      const canvasNode = canvas.current;
      const probeNode = probe.current;
      if (!wrapperNode || !canvasNode || !probeNode) return;
      const current = scene.current;
      const wide = window.matchMedia("(min-width: 64rem)");

      function readTheme() {
        current.palette = readPalette(probeNode!, canvasNode!);
        current.ease = cubicBezier(
          getComputedStyle(document.documentElement).getPropertyValue("--ease-in-out"),
        );
        draw();
      }

      function layout() {
        const width = wrapperNode!.clientWidth;
        const height = wrapperNode!.clientHeight;
        current.dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvasNode!.width = Math.round(width * current.dpr);
        canvasNode!.height = Math.round(height * current.dpr);

        const glyphShare = wide.matches ? 1 : 0.6;
        if (current.glyphs.length !== countGlyphs(glyphShare)) current.glyphs = buildGlyphs(glyphShare);
        const extent = measureExtent();

        if (wide.matches) {
          const text = wrapperNode!.parentElement?.querySelector("[data-hero-text]");
          const textRight = text
            ? text.getBoundingClientRect().right - wrapperNode!.getBoundingClientRect().left
            : 0;
          current.center = { x: width * 0.7, y: height / 2 };
          current.scale = Math.min(
            (current.center.x - textRight - 32) / extent.x,
            (width - current.center.x - 16) / extent.x,
            (height / 2 - 24) / extent.y,
          );
        } else {
          current.center = { x: width / 2, y: height / 2 };
          current.scale = Math.min((width / 2 - 12) / extent.x, (height / 2 - 12) / extent.y);
        }

        const button = moonButton.current;
        if (button) {
          button.style.left = `${current.center.x - current.scale}px`;
          button.style.top = `${current.center.y - current.scale}px`;
          button.style.width = `${current.scale * 2}px`;
          button.style.height = `${current.scale * 2}px`;
        }
        draw();
      }

      readTheme();
      layout();
      const resizeObserver = new ResizeObserver(layout);
      resizeObserver.observe(wrapperNode);
      const themeObserver = new MutationObserver(readTheme);
      themeObserver.observe(document.documentElement, { attributeFilter: ["class"] });
      wide.addEventListener("change", layout);
      return function stopWatching() {
        resizeObserver.disconnect();
        themeObserver.disconnect();
        wide.removeEventListener("change", layout);
      };
    },
    [draw],
  );

  function handlePointer(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const pointer = scene.current.pointer;
    pointer.x = event.clientX - bounds.left;
    pointer.y = event.clientY - bounds.top;
    pointer.inside = event.type !== "pointerleave";
    kick();
  }

  function toggleLanding() {
    const current = scene.current;
    current.landed = !current.landed;
    current.holdLeft = HOLD_SECONDS;
    kick();
  }

  return (
    <div
      ref={wrapper}
      className={cn("iso", className)}
      onPointerMove={handlePointer}
      onPointerLeave={handlePointer}
    >
      <canvas ref={canvas} aria-hidden="true" className="absolute inset-0 size-full font-mono" />
      <span ref={probe} aria-hidden="true" className="hidden" />
      <button
        ref={moonButton}
        type="button"
        aria-label="Land the orbit"
        onClick={toggleLanding}
        className="pressable absolute cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  );
}

function measureExtent() {
  let x = 1;
  let y = 1;
  for (const ring of RINGS) {
    for (let step = 0; step < 90; step++) {
      const angle = (step / 90) * Math.PI * 2;
      const flat: Vec3 = [ring.radius * Math.cos(angle), 0, ring.radius * Math.sin(angle)];
      const point = rotateZ(rotateX(flat, ring.tiltX), ring.tiltZ);
      const perspective = CAMERA_DISTANCE / (CAMERA_DISTANCE - point[2]);
      x = Math.max(x, Math.abs(point[0]) * perspective + 0.1);
      y = Math.max(y, Math.abs(point[1]) * perspective + 0.1);
    }
  }
  return { x, y };
}

function countGlyphs(share: number) {
  return RINGS.reduce((total, ring) => total + Math.round(ring.glyphs * share), 0);
}

function buildGlyphs(share: number) {
  const landingCount = Math.round(RINGS[LANDING_RING]!.glyphs * share);
  const columns = Math.ceil(Math.sqrt(landingCount));
  const spacing = (PAD_HALF_SPAN * 2) / columns;
  const across = normalize(cross([0, 1, 0], PAD_NORMAL));
  const up = cross(PAD_NORMAL, across);
  const glyphs: Glyph[] = [];

  RINGS.forEach(function addRing(ring, ringIndex) {
    const slots = Math.round(ring.glyphs * share);
    for (let slot = 0; slot < slots; slot++) {
      const offsetAcross = ((slot % columns) - (columns - 1) / 2) * spacing;
      const offsetUp = (Math.floor(slot / columns) - (columns - 1) / 2) * spacing;
      const cell = normalize(add(PAD_NORMAL, add(scaleVec(across, offsetAcross), scaleVec(up, offsetUp))));
      glyphs.push({
        ring: ringIndex,
        slot: slot / slots,
        character: randomCharacter(),
        cell: ringIndex === LANDING_RING ? cell : null,
        delay: Math.random() * (LANDING_SECONDS - FLIGHT_SECONDS),
        heat: 0,
      });
    }
  });
  return glyphs;
}

function turnMoon(current: Scene, dt: number, calm: boolean) {
  const { pointer, center, scale, turn } = current;
  const following = pointer.inside && !calm;
  const reach = scale * 3;
  const yawTarget = following ? clampSigned((pointer.x - center.x) / reach) * MAX_TURN : 0;
  const pitchTarget = following ? clampSigned((pointer.y - center.y) / reach) * MAX_TURN : 0;
  const yawSettled = spring(turn.yaw, yawTarget, dt, TURN_STIFFNESS, TURN_DAMPING);
  const pitchSettled = spring(turn.pitch, pitchTarget, dt, TURN_STIFFNESS, TURN_DAMPING);
  return yawSettled && pitchSettled;
}

function onMoon(current: Scene, point: Vec3): Vec3 {
  return rotateX(rotateY(point, current.turn.yaw.at), current.turn.pitch.at);
}

function swapCharacters(current: Scene, dt: number) {
  current.swapClock += dt;
  while (current.swapClock >= SWAP_SECONDS) {
    current.swapClock -= SWAP_SECONDS;
    RINGS.forEach(function swapOne(_, ringIndex) {
      const ringGlyphs = current.glyphs.filter((glyph) => glyph.ring === ringIndex);
      const glyph = ringGlyphs[Math.floor(Math.random() * ringGlyphs.length)];
      if (glyph) glyph.character = randomCharacter();
    });
  }
}

function warmGlyphs(current: Scene, dt: number) {
  for (const glyph of current.glyphs) {
    const point = project(current, glyphPosition(current, glyph));
    const distance = Math.hypot(point.x - current.pointer.x, point.y - current.pointer.y);
    const target = current.pointer.inside ? Math.max(0, 1 - distance / HOVER_REACH) : 0;
    glyph.heat = follow(glyph.heat, target, dt, COLOR_FADE_SECONDS);
  }
}

function orbitPosition(current: Scene, glyph: Glyph): Vec3 {
  const ring = RINGS[glyph.ring]!;
  const angle = (glyph.slot + current.clock / ring.secondsPerTurn) * Math.PI * 2;
  const flat: Vec3 = [ring.radius * Math.cos(angle), 0, ring.radius * Math.sin(angle)];
  return rotateZ(rotateX(flat, ring.tiltX), ring.tiltZ);
}

function flightProgress(current: Scene, glyph: Glyph) {
  if (!glyph.cell) return 0;
  const local = clamp((current.landing - glyph.delay) / FLIGHT_SECONDS);
  return current.ease(local);
}

function glyphPosition(current: Scene, glyph: Glyph): Vec3 {
  const progress = flightProgress(current, glyph);
  const start = orbitPosition(current, glyph);
  if (progress === 0 || !glyph.cell) return start;
  const straight = add(scaleVec(start, 1 - progress), scaleVec(onMoon(current, glyph.cell), progress));
  const swirl = progress * (1 - progress) * 4 * 1.4;
  return rotateY(straight, swirl);
}

function project(current: Scene, point: Vec3) {
  const perspective = CAMERA_DISTANCE / (CAMERA_DISTANCE - point[2]);
  return {
    x: current.center.x + point[0] * current.scale * perspective,
    y: current.center.y - point[1] * current.scale * perspective,
    perspective,
  };
}

function drawScene(context: CanvasRenderingContext2D, current: Scene, palette: Palette) {
  const { dpr } = current;
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.setTransform(dpr, 0, 0, dpr, 0, 0);

  const placed = current.glyphs.flatMap(function placeGlyph(glyph) {
    const progress = flightProgress(current, glyph);
    if (current.crossfade > 0 && glyph.cell) {
      return [
        { glyph, point: orbitPosition(current, glyph), alpha: 1 - current.crossfade, landedness: 0 },
        { glyph, point: onMoon(current, glyph.cell), alpha: current.crossfade, landedness: 1 },
      ];
    }
    return [{ glyph, point: glyphPosition(current, glyph), alpha: 1, landedness: progress }];
  });

  for (const item of placed) if (item.point[2] < 0) drawGlyph(context, current, palette, item);
  drawMoon(context, current, palette);
  drawPad(context, current, palette);
  for (const item of placed) if (item.point[2] >= 0) drawGlyph(context, current, palette, item);
}

function drawGlyph(
  context: CanvasRenderingContext2D,
  current: Scene,
  palette: Palette,
  item: { glyph: Glyph; point: Vec3; alpha: number; landedness: number },
) {
  const { x, y, perspective } = project(current, item.point);
  const depth = clamp((item.point[2] + 2) / 4);
  const orbitSize = 0.075 * current.scale;
  const landedSize = 0.045 * current.scale;
  const size = (orbitSize + (landedSize - orbitSize) * item.landedness) * perspective;
  const hovered = item.glyph.heat;
  const landed = current.padLight * item.landedness;
  const lit = Math.max(hovered, landed);
  const alpha = item.alpha * (0.3 + 0.65 * depth);

  context.font = `${size.toFixed(1)}px ${palette.font}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.globalAlpha = alpha * (1 - lit);
  context.fillStyle = palette.glyph;
  context.fillText(item.glyph.character, x, y);
  if (lit > 0) {
    const glow = landed >= hovered ? solidGlow(palette.brand) : hoverGlow(context, current, palette, x, y);
    context.globalAlpha = alpha * lit;
    context.fillStyle = glow.paint;
    context.shadowColor = glow.shadow;
    context.shadowBlur = HOVER_BLUR * lit;
    context.fillText(item.glyph.character, x, y);
    context.shadowBlur = 0;
  }
  context.globalAlpha = 1;
}

function drawMoon(context: CanvasRenderingContext2D, current: Scene, palette: Palette) {
  context.lineWidth = 0.8;
  drawWireframe(context, current, palette, "back", 0.2);
  drawWireframe(context, current, palette, "front", 0.7);
  const outline = Array.from({ length: 97 }, function outlinePoint(_, step) {
    const angle = (step / 96) * Math.PI * 2;
    return {
      x: current.center.x + Math.cos(angle) * current.scale,
      y: current.center.y + Math.sin(angle) * current.scale,
    };
  });
  strokeLine(context, current, palette, outline, 0.7);
  context.globalAlpha = 1;
}

function solidGlow(color: string) {
  return { paint: color, shadow: color };
}

function hoverGlow(
  context: CanvasRenderingContext2D,
  current: Scene,
  palette: Palette,
  x: number,
  y: number,
) {
  const { pointer } = current;
  const paint = context.createLinearGradient(
    pointer.x - HOVER_REACH,
    pointer.y - HOVER_REACH,
    pointer.x + HOVER_REACH,
    pointer.y + HOVER_REACH,
  );
  paint.addColorStop(0, palette.brand);
  paint.addColorStop(1, palette.purple);
  const along = (x - pointer.x + (y - pointer.y)) / (4 * HOVER_REACH) + 0.5;
  return { paint, shadow: along < 0.5 ? palette.brand : palette.purple };
}

type ScreenPoint = { x: number; y: number } | null;

function strokeLine(
  context: CanvasRenderingContext2D,
  current: Scene,
  palette: Palette,
  points: ScreenPoint[],
  alpha: number,
) {
  context.globalAlpha = alpha;
  context.strokeStyle = palette.line;
  context.beginPath();
  points.forEach(function addPoint(point, index) {
    if (!point) return;
    if (points[index - 1]) context.lineTo(point.x, point.y);
    else context.moveTo(point.x, point.y);
  });
  context.stroke();

  const { pointer } = current;
  if (pointer.glow <= 0) return;
  context.save();
  context.shadowBlur = HOVER_BLUR;
  points.forEach(function glowSegment(point, index) {
    const previous = points[index - 1];
    if (!point || !previous) return;
    const middle = { x: (point.x + previous.x) / 2, y: (point.y + previous.y) / 2 };
    const distance = Math.hypot(middle.x - pointer.x, middle.y - pointer.y);
    const heat = pointer.glow * (1 - distance / HOVER_REACH);
    if (heat <= 0) return;
    const glow = hoverGlow(context, current, palette, middle.x, middle.y);
    context.strokeStyle = glow.paint;
    context.shadowColor = glow.shadow;
    context.globalAlpha = Math.min(1, alpha + 0.3) * heat;
    context.beginPath();
    context.moveTo(previous.x, previous.y);
    context.lineTo(point.x, point.y);
    context.stroke();
  });
  context.restore();
}

function drawWireframe(
  context: CanvasRenderingContext2D,
  current: Scene,
  palette: Palette,
  side: "front" | "back",
  alpha: number,
) {
  const steps = 48;

  function tilt(point: Vec3): Vec3 {
    return rotateZ(rotateX(point, -0.35), 0.3);
  }

  function strokeCurve(pointAt: (t: number) => Vec3) {
    const points = Array.from({ length: steps + 1 }, function curvePoint(_, step): ScreenPoint {
      const point = onMoon(current, tilt(pointAt(step / steps)));
      const facing = point[2] >= 0 ? "front" : "back";
      return facing === side ? project(current, point) : null;
    });
    strokeLine(context, current, palette, points, alpha);
  }

  for (let latitude = -60; latitude <= 60; latitude += 30) {
    const angle = (latitude * Math.PI) / 180;
    strokeCurve((t) => [
      Math.cos(angle) * Math.cos(t * Math.PI * 2),
      Math.sin(angle),
      Math.cos(angle) * Math.sin(t * Math.PI * 2),
    ]);
  }
  for (let longitude = 0; longitude < 180; longitude += 30) {
    const angle = (longitude * Math.PI) / 180;
    strokeCurve((t) => {
      const around = t * Math.PI * 2;
      return [Math.cos(around) * Math.cos(angle), Math.sin(around), Math.cos(around) * Math.sin(angle)];
    });
  }
}

function drawPad(context: CanvasRenderingContext2D, current: Scene, palette: Palette) {
  const across = normalize(cross([0, 1, 0], PAD_NORMAL));
  const up = cross(PAD_NORMAL, across);
  const half = PAD_HALF_SPAN;
  const lines = 6;

  function surface(a: number, b: number) {
    const point = normalize(add(PAD_NORMAL, add(scaleVec(across, a), scaleVec(up, b))));
    return project(current, onMoon(current, point));
  }

  function strokeGrid() {
    context.beginPath();
    for (let line = 0; line <= lines; line++) {
      const offset = -half + (line / lines) * half * 2;
      for (const vertical of [true, false]) {
        for (let step = 0; step <= 8; step++) {
          const along = -half + (step / 8) * half * 2;
          const { x, y } = vertical ? surface(offset, along) : surface(along, offset);
          if (step === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
      }
    }
    context.stroke();
  }

  context.lineWidth = 0.8;
  context.globalAlpha = 0.6;
  context.strokeStyle = palette.line;
  strokeGrid();

  if (current.padLight > 0) {
    const center = surface(0, 0);
    const radius = current.scale * 0.7;
    const gradient = context.createRadialGradient(center.x, center.y, 0, center.x, center.y, radius);
    gradient.addColorStop(0, palette.brand);
    gradient.addColorStop(1, "transparent");
    context.save();
    context.globalCompositeOperation = palette.additive ? "lighter" : "source-over";
    context.globalAlpha = current.padLight * (palette.additive ? 0.35 : 0.15);
    context.fillStyle = gradient;
    context.fillRect(center.x - radius, center.y - radius, radius * 2, radius * 2);
    context.restore();

    context.globalAlpha = current.padLight;
    context.strokeStyle = palette.brand;
    strokeGrid();
  }
  context.globalAlpha = 1;
}

function readPalette(probe: HTMLElement, canvas: HTMLCanvasElement): Palette {
  function color(name: string) {
    probe.style.color = `var(${name})`;
    return getComputedStyle(probe).color;
  }
  return {
    glyph: color("--muted-foreground"),
    brand: color("--brand"),
    purple: HOVER_PURPLE,
    line: color("--anatomy-lo"),
    additive: document.documentElement.classList.contains("dark"),
    font: getComputedStyle(canvas).fontFamily,
  };
}

function cubicBezier(token: string) {
  const [x1 = 0, y1 = 0, x2 = 1, y2 = 1] = (token.match(/-?[\d.]+/g) ?? []).map(Number);
  function curve(t: number, a: number, b: number) {
    const inverse = 1 - t;
    return 3 * a * inverse * inverse * t + 3 * b * inverse * t * t + t * t * t;
  }
  return function ease(progress: number) {
    if (progress <= 0 || progress >= 1) return progress;
    let low = 0;
    let high = 1;
    for (let step = 0; step < 24; step++) {
      const middle = (low + high) / 2;
      if (curve(middle, x1, x2) < progress) low = middle;
      else high = middle;
    }
    return curve((low + high) / 2, y1, y2);
  };
}

function randomCharacter() {
  return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]!;
}

function approach(current: number, target: number, step: number) {
  if (current < target) return Math.min(current + step, target);
  return Math.max(current - step, target);
}

function clampSigned(value: number) {
  return Math.min(Math.max(value, -1), 1);
}

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

function add(a: Vec3, b: Vec3): Vec3 {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function scaleVec(a: Vec3, amount: number): Vec3 {
  return [a[0] * amount, a[1] * amount, a[2] * amount];
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

function normalize(a: Vec3): Vec3 {
  const length = Math.hypot(a[0], a[1], a[2]);
  return scaleVec(a, 1 / length);
}

function rotateX(point: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [point[0], point[1] * cos - point[2] * sin, point[1] * sin + point[2] * cos];
}

function rotateY(point: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [point[0] * cos + point[2] * sin, point[1], -point[0] * sin + point[2] * cos];
}

function rotateZ(point: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [point[0] * cos - point[1] * sin, point[0] * sin + point[1] * cos, point[2]];
}
