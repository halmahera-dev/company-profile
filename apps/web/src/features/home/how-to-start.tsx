import { Badge } from "@halmahera/ui/components/badge";
import { Button } from "@halmahera/ui/components/button";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { HopFigure } from "@/features/home/figures/hop-figure";
import { LaunchFigure } from "@/features/home/figures/launch-figure";
import { OrreryFigure } from "@/features/home/figures/orrery-figure";
import { SectionHeading } from "@/features/profile/components/section-heading";

const offers = [
  {
    name: "Add AI to your product",
    body: "Chat, search, document reading, or automation, wired into your app and your data.",
    terms: "Your stack · your data",
    Figure: OrreryFigure,
  },
  {
    name: "Prototype Sprint",
    body: "One use case, from your data to a screen you can click. Fixed scope, 2 weeks.",
    terms: "Fixed scope · 2 weeks",
    Figure: HopFigure,
    isFeatured: true,
  },
  {
    name: "Design, build, launch",
    body: "Design, engineering, and AI in one small team. We stay until real users are on it.",
    terms: "Design · build · launch",
    Figure: LaunchFigure,
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
                <offer.Figure />
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
