import { Button } from "@halmahera/ui/components/button";
import Link from "next/link";
import * as React from "react";

import { OrbitScene } from "@/features/home/orbit-scene";
import { contactEmail } from "@/features/profile/components/site-header";

export function Hero() {
  const headline = "Less orbit. More landing.";

  return (
    <section className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 star-field text-muted-foreground opacity-60"
      />
      <div className="pointer-events-none relative z-10 mx-auto flex max-w-6xl items-center px-4 pt-32 pb-8 sm:px-8 sm:pt-40 lg:min-h-176 lg:pb-24">
        <div
          data-hero-text
          className="pointer-events-auto grid justify-items-start gap-6 lg:w-5/12"
        >
          <h1 className="relative type-display-xl text-balance">
            {headline.split(" ").map(function renderWord(word, index) {
              return (
                <React.Fragment key={index}>
                  {index > 0 && " "}
                  <span
                    className="blur-in"
                    style={{ "--word-index": index } as React.CSSProperties}
                  >
                    {word}
                  </span>
                </React.Fragment>
              );
            })}
            <span aria-hidden="true" className="glitch-layer text-brand">
              {headline}
            </span>
            <span aria-hidden="true" className="glitch-layer text-chart-2 glitch-mirror">
              {headline}
            </span>
          </h1>
          <p className="max-w-md rise-in type-lead text-muted-foreground">
            A small AI team in Indonesia that{" "}
            <span className="font-bold text-foreground">makes bold ideas work</span>. Start fresh or
            build on what you have.
          </p>
          <div className="mt-2 flex rise-in flex-wrap items-center gap-6">
            <Button nativeButton={false} render={<a href={`mailto:${contactEmail}`} />}>
              Book a call
            </Button>
            <Button variant="link" nativeButton={false} render={<Link href="#work" />}>
              See our work →
            </Button>
          </div>
        </div>
      </div>
      <OrbitScene className="relative aspect-square w-full lg:absolute lg:inset-0 lg:aspect-auto" />
    </section>
  );
}
