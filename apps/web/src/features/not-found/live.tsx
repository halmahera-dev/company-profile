"use client";

import * as React from "react";

import { IsoFigure } from "@/components/iso/react/draw";
import { follow, useInView, useLoop, useStillness } from "@/components/iso/react/live";
import { barSvg, itemsAt, knobPointerSvg, shiftTo } from "@/features/not-found/frame";
import { ARMS, angleOf, MASTER_RATE } from "@/features/not-found/orrery";
import { HEIGHT, WIDTH } from "@/features/not-found/view";

const SCRUB = 0.02;
const NUDGE = 0.8;
const FASTEST = 40;
const SETTLE_SECONDS = 0.9;

interface Props {
  label: string;
  base: React.ReactNode;
  gear: React.ReactNode;
  levels: React.ReactNode[];
  sun: React.ReactNode;
  shadows: React.ReactNode[];
  tips: React.ReactNode[];
}

const REST_ORDER = itemsAt(0).map((item) => item.id);
const REST_BARS = ARMS.map((_, index) => barSvg(index, angleOf(index, 0)));
const REST_SHIFTS = ARMS.map((_, index) => shiftTo(index, angleOf(index, 0)));
const REST_POINTER = knobPointerSvg(0);

export function OrreryLive({ label, base, gear, levels, sun, shadows, tips }: Props) {
  const root = React.useRef<HTMLDivElement | null>(null);
  const layer = React.useRef<SVGGElement | null>(null);
  const pointer = React.useRef<SVGGElement | null>(null);
  const nodes = React.useRef(new Map<string, SVGGElement>());
  const state = React.useRef({
    clock: 0,
    rate: 1,
    dragging: false,
    lastX: 0,
    lastTime: 0,
    order: REST_ORDER.join(),
  });
  const inView = useInView(root);
  const still = useStillness();

  const draw = React.useCallback(function draw() {
    const { clock } = state.current;
    ARMS.forEach(function moveArm(_, index) {
      const angle = angleOf(index, clock);
      const shift = shiftTo(index, angle);
      const bar = nodes.current.get(`bar-${index}`);
      if (bar) bar.innerHTML = barSvg(index, angle);
      nodes.current.get(`tip-${index}`)?.setAttribute("transform", shift);
      nodes.current.get(`shadow-${index}`)?.setAttribute("transform", shift);
    });
    const order = itemsAt(clock).map((item) => item.id);
    const signature = order.join();
    if (layer.current && signature !== state.current.order) {
      for (const id of order) {
        const node = nodes.current.get(id);
        if (node) layer.current.appendChild(node);
      }
      state.current.order = signature;
    }
    if (pointer.current) pointer.current.innerHTML = knobPointerSvg(clock * MASTER_RATE);
  }, []);

  const kick = useLoop(function tick(dt) {
    const current = state.current;
    if (!current.dragging) {
      current.rate = follow(current.rate, 1, dt, SETTLE_SECONDS);
      current.clock += current.rate * dt;
    }
    draw();
    return true;
  }, inView && !still);

  function register(id: string) {
    return function setNode(node: SVGGElement | null) {
      if (node) nodes.current.set(id, node);
      else nodes.current.delete(id);
    };
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    Object.assign(state.current, {
      dragging: true,
      lastX: event.clientX,
      lastTime: event.timeStamp,
    });
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const current = state.current;
    if (!current.dragging) return;
    const step = (event.clientX - current.lastX) * SCRUB;
    const seconds = Math.max((event.timeStamp - current.lastTime) / 1000, 0.008);
    current.clock += step;
    current.rate = Math.max(-FASTEST, Math.min(FASTEST, step / seconds));
    current.lastX = event.clientX;
    current.lastTime = event.timeStamp;
    draw();
  }

  function onPointerUp() {
    state.current.dragging = false;
    kick();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    state.current.clock += event.key === "ArrowRight" ? NUDGE : -NUDGE;
    draw();
  }

  function renderItem(id: string) {
    const index = Number(id.split("-")[1]);
    if (id.startsWith("bar-")) {
      return (
        <g key={id} ref={register(id)} dangerouslySetInnerHTML={{ __html: REST_BARS[index] }} />
      );
    }
    if (id.startsWith("tip-")) {
      return (
        <g key={id} ref={register(id)} transform={REST_SHIFTS[index]}>
          {tips[index]}
        </g>
      );
    }
    return (
      <g key={id} ref={register(id)}>
        {id === "sun" ? sun : levels[index]}
      </g>
    );
  }

  return (
    <div className="iso orrery">
      <div
        ref={root}
        className="orrery-stage"
        tabIndex={0}
        role="group"
        aria-label="Orrery. Drag, or use the left and right arrow keys, to turn the arms."
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      >
        <IsoFigure width={WIDTH} height={HEIGHT} label={label}>
          {base}
          <g ref={pointer} dangerouslySetInnerHTML={{ __html: REST_POINTER }} />
          {shadows.map(function renderShadow(shadow, index) {
            return (
              <g key={index} ref={register(`shadow-${index}`)} transform={REST_SHIFTS[index]}>
                {shadow}
              </g>
            );
          })}
          {gear}
          <g ref={layer}>{REST_ORDER.map(renderItem)}</g>
        </IsoFigure>
      </div>
    </div>
  );
}
