/* oxlint-disable shadcn/no-arbitrary-values, shadcn/no-raw-colors, shadcn/no-inline-styles -- fixed 1200x630 share card, not site UI */
import type { Metadata } from "next";

import { Mark } from "@/features/mark/mark";

// Source of opengraph-image.png. Open at 1200x630 and screenshot the frame.
export const metadata: Metadata = {
  title: "OG source",
  robots: { index: false, follow: false },
};

const brand = "#ff2056";
const indigo = "#615fff";

const glyphs = [
  { c: "#", x: 842, y: 176, o: 0.55 },
  { c: "S", x: 905, y: 218, o: 0.4 },
  { c: "8", x: 1010, y: 236, o: 0.5 },
  { c: "X", x: 1086, y: 292, o: 0.35 },
  { c: "+", x: 1112, y: 372, o: 0.5 },
  { c: "0", x: 1060, y: 452, o: 0.4 },
  { c: "=", x: 962, y: 480, o: 0.55 },
  { c: ";", x: 860, y: 470, o: 0.35 },
  { c: "x", x: 780, y: 420, o: 0.5 },
  { c: "S", x: 744, y: 340, o: 0.4 },
  { c: "-", x: 760, y: 262, o: 0.5 },
  { c: "0", x: 1150, y: 214, o: 0.3 },
  { c: "#", x: 690, y: 400, o: 0.3 },
];

export default function OgSource() {
  return (
    <div className="dark relative h-[630px] w-[1200px] overflow-hidden bg-background text-foreground">
      <style>{"nextjs-portal{display:none}"}</style>
      <div aria-hidden className="absolute inset-0 star-field text-muted-foreground opacity-60" />
      <svg aria-hidden viewBox="0 0 1200 630" className="absolute inset-0">
        <defs>
          <radialGradient id="halo-brand" cx="0.45" cy="0.5" r="0.5">
            <stop offset="0" stopColor={brand} stopOpacity="0.3" />
            <stop offset="1" stopColor={brand} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="halo-indigo" cx="0.6" cy="0.55" r="0.5">
            <stop offset="0" stopColor={indigo} stopOpacity="0.26" />
            <stop offset="1" stopColor={indigo} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="planet" x1="0.1" y1="0.1" x2="0.9" y2="0.9">
            <stop offset="0" stopColor={brand} />
            <stop offset="1" stopColor={indigo} />
          </linearGradient>
          <radialGradient id="shade" cx="0.35" cy="0.3" r="0.8">
            <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
            <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.25" />
          </radialGradient>
        </defs>
        <circle cx="930" cy="340" r="260" fill="url(#halo-brand)" />
        <circle cx="930" cy="340" r="260" fill="url(#halo-indigo)" />
        <g fill="none" stroke="#f7f8f8" strokeOpacity="0.28" strokeWidth="1.25">
          <circle cx="930" cy="340" r="190" strokeOpacity="0.4" />
          <ellipse cx="930" cy="340" rx="190" ry="70" />
          <ellipse cx="930" cy="340" rx="190" ry="130" />
          <ellipse cx="930" cy="340" rx="70" ry="190" />
          <ellipse cx="930" cy="340" rx="130" ry="190" />
          <ellipse
            cx="930"
            cy="340"
            rx="330"
            ry="108"
            transform="rotate(-14 930 340)"
            strokeOpacity="0.16"
          />
          <ellipse
            cx="930"
            cy="340"
            rx="280"
            ry="84"
            transform="rotate(12 930 340)"
            strokeOpacity="0.12"
          />
        </g>
        <circle cx="930" cy="340" r="66" fill="url(#planet)" />
        <circle cx="930" cy="340" r="66" fill="url(#shade)" />
        <g fill="#f7f8f8" className="font-mono" fontSize="26" textAnchor="middle">
          {glyphs.map(function renderGlyph(glyph, index) {
            return (
              <text key={index} x={glyph.x} y={glyph.y} opacity={glyph.o}>
                {glyph.c}
              </text>
            );
          })}
        </g>
      </svg>
      <div className="absolute inset-y-0 left-0 w-[560px] bg-linear-to-r from-background via-background/90 to-transparent" />
      <div className="absolute inset-0 shadow-[inset_0_0_0_1px_var(--border)]" />

      <div className="absolute top-14 left-16 flex items-center gap-3">
        <Mark className="size-8" />
        <span className="font-heading text-2xl font-semibold tracking-tight">Halmahera</span>
      </div>

      <div className="absolute top-1/2 left-16 grid -translate-y-[44%] gap-6">
        <h1 className="text-[88px] leading-[0.98] font-medium tracking-[-0.022em]">
          Less orbit.
          <br />
          More landing.
        </h1>
        <p className="max-w-[480px] text-[28px] leading-[1.3] tracking-[-0.011em] text-muted-foreground">
          A small AI team in Indonesia. A working prototype in{" "}
          <span className="text-foreground">two weeks</span>.
        </p>
      </div>

      <p className="absolute bottom-14 left-16 font-mono text-lg tracking-wide text-faint-foreground">
        halmahera.site
      </p>
    </div>
  );
}
