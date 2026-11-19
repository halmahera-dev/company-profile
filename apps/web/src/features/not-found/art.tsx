import type { ReactNode } from "react";

import "@/components/iso/iso.css";
import "@/features/not-found/orrery.css";
import type { SolidPaths } from "@/components/iso/iso-kit";

import { barSvg, itemsAt, knobPointerSvg, shiftTo } from "@/features/not-found/frame";
import { BASE_ART, GEAR_ART, LEVEL_ART, SUN_ART, TIP_ART } from "@/features/not-found/geometry";
import { ARMS, MISSING, angleOf, planetCount } from "@/features/not-found/orrery";
import { HEIGHT, WIDTH } from "@/features/not-found/view";

type Tone = "hi" | "mid" | "lo" | "faint";

function Solid({
  paths,
  tone = "hi",
  crease = "faint",
  inner,
}: {
  paths: SolidPaths;
  tone?: Tone;
  crease?: Tone | "none";
  inner?: ReactNode;
}) {
  return (
    <g className="iso-solid" data-seamless={paths.seamless ? "" : undefined}>
      <path className="iso-fill" d={paths.fill} />
      {paths.shades.map(function renderShade(d, shade) {
        return d ? <path key={shade} className="iso-shade" data-shade={shade} d={d} /> : null;
      })}
      <path className="iso-top" d={paths.top} />
      {crease === "none" || !paths.crease ? null : (
        <path className="iso-line iso-crease" data-tone={crease} d={paths.crease} />
      )}
      {crease === "none" || !paths.bevel ? null : (
        <path className="iso-line iso-bevel" data-tone={crease} d={paths.bevel} />
      )}
      {inner}
      <path className="iso-line iso-edge" data-tone={tone} d={paths.outline} />
    </g>
  );
}

function Line({
  d,
  tone = "lo",
  free,
  className,
}: {
  d: string;
  tone?: Tone;
  free?: boolean;
  className?: string;
}) {
  if (!d) return null;
  return (
    <path
      className={className ? `iso-line ${className}` : "iso-line"}
      data-tone={tone}
      data-free={free ? "" : undefined}
      d={d}
    />
  );
}

function Dots({ points, size, tone }: { points: [number, number][]; size: number; tone: Tone }) {
  return (
    <g className="iso-dots" data-tone={tone}>
      {points.map(function renderDot([x, y], index) {
        return <circle key={index} cx={x} cy={y} r={size} />;
      })}
    </g>
  );
}

function FaceText({
  transform,
  size,
  tone,
  anchor,
  children,
}: {
  transform: string;
  size: number;
  tone: Tone;
  anchor: "start" | "middle" | "end";
  children: ReactNode;
}) {
  return (
    <text
      className="iso-face-text"
      data-tone={tone}
      transform={transform}
      fontSize={size}
      textAnchor={anchor}
    >
      {children}
    </text>
  );
}

function knob(parts: typeof BASE_ART.knobLeft, key: string, pointer?: string) {
  return (
    <g key={key}>
      <Solid paths={parts.washer} tone="lo" crease="faint" />
      <Solid
        paths={parts.body}
        tone="mid"
        crease="faint"
        inner={
          <>
            <Line d={parts.seam} tone="faint" />
            <Line d={parts.knurl} tone="lo" />
          </>
        }
      />
      {pointer ? <Line d={pointer} tone="hi" free /> : null}
    </g>
  );
}

function Glow({
  id,
  hue,
  centre,
  radius,
  spread,
}: {
  id: string;
  hue: string;
  centre: [number, number];
  radius: number;
  spread: number;
}) {
  return (
    <g className={hue}>
      <defs>
        <radialGradient id={id}>
          <stop offset="0" className="orrery-glow-hot" />
          <stop offset="0.18" className="orrery-glow-core" />
          <stop offset="0.5" className="orrery-glow-mid" />
          <stop offset="1" className="orrery-glow-edge" />
        </radialGradient>
      </defs>
      <circle
        className="orrery-glow"
        cx={centre[0]}
        cy={centre[1]}
        r={radius * spread}
        fill={`url(#${id})`}
      />
    </g>
  );
}

function ghostPath({ centre, radius }: { centre: [number, number]; radius: number }) {
  const [x, y] = centre;
  return `M${x - radius} ${y}a${radius} ${radius} 0 1 0 ${radius * 2} 0a${radius} ${radius} 0 1 0 ${-radius * 2} 0Z`;
}

function Orb({
  id,
  hue,
  centre,
  radius,
  children,
}: {
  id: string;
  hue: string;
  centre: [number, number];
  radius: number;
  children: ReactNode;
}) {
  return (
    <g className={`orrery-body ${hue}`}>
      <defs>
        <radialGradient id={id} cx="0.5" cy="0.5" r="0.5" fx="0.34" fy="0.3">
          <stop offset="0" className="orrery-orb-lit" />
          <stop offset="0.5" className="orrery-orb-mid" />
          <stop offset="1" className="orrery-orb-dark" />
        </radialGradient>
      </defs>
      <circle cx={centre[0]} cy={centre[1]} r={radius} fill={`url(#${id})`} />
      <Line d={ghostPath({ centre, radius })} tone="hi" />
      {children}
    </g>
  );
}

const LABEL = `An orrery, a desk model of the solar system, on a round base. A sun sits on a column with ${ARMS.length} arms. ${planetCount} arms carry a planet. Arm ${MISSING + 1} ends in an empty socket where a planet should be, like the page you were looking for.`;

const REST_ORDER = itemsAt(0).map(function idOf(item) {
  return item.id;
});
const REST_BARS = ARMS.map(function barAt(_, index) {
  return barSvg(index, angleOf(index, 0));
});
const REST_SHIFTS = ARMS.map(function shiftAt(_, index) {
  return shiftTo(index, angleOf(index, 0));
});
const REST_POINTER = knobPointerSvg(0);

export function OrreryFigure() {
  const tips = TIP_ART.map(function renderTip(tip, index) {
    if (tip.kind === "planet") {
      return (
        <g key={`tip-${index}`}>
          <Solid paths={tip.boss} tone="mid" crease="faint" />
          <Solid paths={tip.post} tone="mid" crease="none" />
          <Solid paths={tip.collar} tone="mid" crease="faint" />
          <Glow
            id={`orrery-glow-${index}`}
            hue={`orrery-hue-${index}`}
            {...tip.glow}
            spread={4.4}
          />
          <Orb id={`orrery-orb-${index}`} hue={`orrery-hue-${index}`} {...tip.glow}>
            {tip.belt ? <Line d={tip.belt} tone="lo" /> : null}
          </Orb>
        </g>
      );
    }
    return (
      <g key={`tip-${index}`}>
        <Solid paths={tip.boss} tone="mid" crease="faint" />
        <Solid paths={tip.post} tone="mid" crease="none" />
        <Solid paths={tip.collar} tone="mid" crease="faint" />
        <Solid
          paths={tip.socket}
          tone="mid"
          crease="faint"
          inner={<Line d={tip.socketSeam} tone="faint" />}
        />
        <path className="iso-shade" data-shade="0" d={tip.recess} />
        <Line d={tip.recess} tone="lo" />
        <Solid paths={tip.stud} tone="hi" crease="none" />
        <Line d={ghostPath(tip.ghost)} tone="hi" className="orrery-ghost" />
      </g>
    );
  });

  const levels = LEVEL_ART.map(function renderLevel(level, index) {
    return (
      <g key={`level-${index}`}>
        <Solid
          paths={level.body}
          tone="mid"
          crease="faint"
          inner={
            <>
              <Line d={level.seam} tone="faint" />
              <Line d={level.ribs} tone="lo" />
            </>
          }
        />
      </g>
    );
  });

  const sun = (
    <g key="sun">
      <Solid
        paths={SUN_ART.neck}
        tone="mid"
        crease="faint"
        inner={<Line d={SUN_ART.neckSeam} tone="faint" />}
      />
      <Glow id="orrery-glow-sun" hue="orrery-sun" {...SUN_ART.glow} spread={6} />
      <Orb id="orrery-orb-sun" hue="orrery-sun" {...SUN_ART.glow}>
        <Line d={SUN_ART.equator} tone="lo" />
      </Orb>
    </g>
  );

  function renderItem(id: string) {
    const index = Number(id.split("-")[1]);
    if (id.startsWith("bar-")) {
      return <g key={id} dangerouslySetInnerHTML={{ __html: REST_BARS[index] }} />;
    }
    if (id.startsWith("tip-")) {
      return (
        <g key={id} transform={REST_SHIFTS[index]}>
          {tips[index]}
        </g>
      );
    }
    return <g key={id}>{id === "sun" ? sun : levels[index]}</g>;
  }

  return (
    <div className="iso orrery">
      <div className="orrery-stage">
        <div className="iso-stage">
          <svg
            className="iso-svg"
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            role="img"
            aria-label={LABEL}
            focusable="false"
          >
            <g key="base">
              <path className="iso-halo" d={BASE_ART.halo} />
              {BASE_ART.feet.map(function renderFoot([flange, foot], index) {
                return (
                  <g key={index}>
                    <Solid paths={flange} tone="lo" crease="faint" />
                    <Solid paths={foot} tone="mid" crease="faint" />
                  </g>
                );
              })}
              <Solid paths={BASE_ART.lower} tone="mid" crease="faint" />
              <Line d={BASE_ART.ledgeRings} tone="lo" />
              <Dots points={BASE_ART.ledgeScrews} size={0.5} tone="mid" />
              <Solid paths={BASE_ART.upper} tone="lo" crease="faint" />
              <Line d={BASE_ART.ticksMinor} tone="lo" />
              <Line d={BASE_ART.ticksMajor} tone="mid" />
              <Line d={BASE_ART.tracks} tone="faint" />
              <Solid paths={BASE_ART.pad} tone="mid" crease="faint" />
              <Line d={BASE_ART.padRings} tone="lo" />
              <Dots points={BASE_ART.padScrews} size={0.5} tone="mid" />
              <Solid paths={BASE_ART.plate} tone="mid" crease="faint" />
              <Line d={BASE_ART.plateInner} tone="faint" />
              <FaceText transform={BASE_ART.plateText} size={8} tone="hi" anchor="middle">
                404
              </FaceText>
              <Dots points={BASE_ART.plateScrews} size={0.45} tone="mid" />
              {knob(BASE_ART.knobLeft, "knob-left", BASE_ART.knobLeftPointer)}
              {knob(BASE_ART.knobRight, "knob-right")}
            </g>
            <g dangerouslySetInnerHTML={{ __html: REST_POINTER }} />
            {TIP_ART.map(function renderShadow(tip, index) {
              return (
                <g key={`shadow-${index}`} transform={REST_SHIFTS[index]}>
                  <path className="iso-halo orrery-shadow" d={tip.shadow} />
                </g>
              );
            })}
            <g key="gear">
              <Solid paths={GEAR_ART.flange} tone="mid" crease="faint" />
              <Line d={GEAR_ART.flangeRings} tone="lo" />
              <Dots points={GEAR_ART.flangeScrews} size={0.5} tone="mid" />
              <Solid
                paths={GEAR_ART.body}
                tone="mid"
                crease="faint"
                inner={
                  <>
                    <Line d={GEAR_ART.knurl} tone="lo" />
                    <Line d={GEAR_ART.seamLow} tone="faint" />
                    <Line d={GEAR_ART.seamHigh} tone="faint" />
                  </>
                }
              />
              <Solid paths={GEAR_ART.cap} tone="mid" crease="faint" />
              <Line d={GEAR_ART.capRings} tone="lo" />
              <Dots points={GEAR_ART.capScrews} size={0.5} tone="mid" />
              <Solid
                paths={GEAR_ART.neck}
                tone="mid"
                crease="faint"
                inner={<Line d={GEAR_ART.neckSeam} tone="faint" />}
              />
            </g>
            <g>{REST_ORDER.map(renderItem)}</g>
          </svg>
        </div>
      </div>
    </div>
  );
}
