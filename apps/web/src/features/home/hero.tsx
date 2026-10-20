import { Button } from "@halmahera/ui/components/button";
import Link from "next/link";

import { OrbitScene } from "@/features/home/orbit-scene";
import { contactEmail } from "@/features/profile/components/site-header";

export function Hero() {
  return (
    <section className="relative">
      <div className="pointer-events-none relative z-10 mx-auto flex max-w-6xl items-center px-4 pt-32 pb-8 sm:px-8 sm:pt-40 lg:min-h-176 lg:pb-24">
        <div data-hero-text className="pointer-events-auto grid rise-in justify-items-start gap-6 lg:w-5/12">
          <h1 className="type-display-xl text-balance">Less orbit. More landing.</h1>
          <p className="max-w-md type-lead text-muted-foreground">
            A small AI team from Indonesia. We build AI that works in your business, not in a slide
            deck.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-6">
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
