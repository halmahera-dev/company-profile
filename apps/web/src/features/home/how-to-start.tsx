import { Badge } from "@halmahera/ui/components/badge";
import { Button } from "@halmahera/ui/components/button";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/features/profile/components/section-heading";

const offers = [
  {
    name: "Add AI to your product",
    body: "Chat, search, document reading, or automation, wired into your app and your data.",
    terms: "Your stack · your data",
    Path: DockPath,
  },
  {
    name: "Prototype Sprint",
    body: "One use case, from your data to a screen you can click. Fixed scope, 2 weeks.",
    terms: "Fixed scope · 2 weeks",
    Path: HopPath,
    isFeatured: true,
  },
  {
    name: "Design, build, launch",
    body: "Design, engineering, and AI in one small team. We stay until real users are on it.",
    terms: "Design · build · launch",
    Path: LaunchPath,
  },
];

export function HowToStart() {
  return (
    <section id="services" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <SectionHeading title="Three ways to start.">
          Most teams start with the sprint. The other two fit a product you already run, or one you
          want launched.
        </SectionHeading>

        <Reveal
          as="ul"
          className="mt-12 grid divide-y rounded-4xl shadow-card md:grid-cols-3 md:divide-x md:divide-y-0"
        >
          {offers.map(function renderOffer(offer) {
            return (
              <li key={offer.name} className="flex flex-col gap-4 p-6 sm:p-8">
                <offer.Path />
                <div className="flex items-center justify-between gap-3 pt-4">
                  <p className="type-title">{offer.name}</p>
                  {offer.isFeatured ? <Badge variant="brand">Start here</Badge> : null}
                </div>
                <p className="text-muted-foreground">{offer.body}</p>
                <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                  <p className="type-label-mono text-muted-foreground">{offer.terms}</p>
                  {offer.isFeatured ? (
                    <Button variant="link" nativeButton={false} render={<Link href="#sprint" />}>
                      See the 14 days →
                    </Button>
                  ) : null}
                </div>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

function PathFrame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 200 80"
      preserveAspectRatio="xMinYMid meet"
      role="img"
      aria-label={label}
      fill="none"
      strokeLinecap="round"
      className="h-20 w-full text-muted-foreground"
    >
      <line x1="4" y1="72" x2="196" y2="72" stroke="var(--rule)" />
      {children}
    </svg>
  );
}

function DockPath() {
  return (
    <PathFrame label="A small craft joins a planet's orbit.">
      <ellipse cx="120" cy="40" rx="64" ry="18" stroke="currentColor" strokeDasharray="2 4" />
      <circle cx="120" cy="40" r="12" fill="var(--surface-raised)" stroke="currentColor" />
      <path d="M12 64 C 34 58, 46 48, 58 44" stroke="currentColor" />
      <circle cx="58" cy="44" r="3.5" fill="var(--brand)" />
    </PathFrame>
  );
}

function HopPath() {
  return (
    <PathFrame label="A short arc from take-off to landing.">
      <path d="M24 72 C 60 6, 140 6, 176 72" stroke="currentColor" strokeDasharray="2 4" />
      <circle cx="24" cy="72" r="3" fill="currentColor" />
      <path d="M168 72 h16" stroke="var(--brand)" strokeWidth="2" />
      <circle cx="176" cy="66" r="3.5" fill="var(--brand)" />
    </PathFrame>
  );
}

function LaunchPath() {
  return (
    <PathFrame label="A long flight from launch to a far landing.">
      <path d="M16 72 C 30 20, 70 8, 100 8 S 170 24, 186 72" stroke="currentColor" />
      <circle cx="16" cy="72" r="3" fill="currentColor" />
      <circle cx="100" cy="8" r="2" fill="currentColor" />
      <path d="M178 72 h16" stroke="var(--brand)" strokeWidth="2" />
      <circle cx="186" cy="66" r="3.5" fill="var(--brand)" />
    </PathFrame>
  );
}
