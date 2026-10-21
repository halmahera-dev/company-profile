import { Button } from "@halmahera/ui/components/button";

import { contactEmail } from "@/features/profile/components/site-header";
import "@/features/home/final-cta.css";

export function FinalCta() {
  return (
    <section id="contact" className="relative isolate scroll-mt-24 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 star-field text-muted-foreground opacity-60"
      />
      <div
        aria-hidden
        className="cta-horizon pointer-events-none absolute left-1/2 -z-10 aspect-square -translate-x-1/2 rounded-full bg-card"
      />
      <div className="mx-auto grid max-w-6xl justify-items-center px-4 pt-24 pb-64 text-center sm:px-8 sm:pt-32 sm:pb-80">
        <h2 className="type-display-xl text-balance">Ready to start?</h2>
        <p className="mt-4 max-w-md type-lead text-muted-foreground">
          Book a call. We pick one use case together, and you click it in 14 days.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            nativeButton={false}
            render={<a href={`mailto:${contactEmail}?subject=Book%20a%20call`} />}
          >
            Book a call
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<a href={`mailto:${contactEmail}`} />}
          >
            Send a message
          </Button>
        </div>
      </div>
    </section>
  );
}
