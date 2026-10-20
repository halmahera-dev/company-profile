import type { Metadata } from "next";

import { Button } from "@halmahera/ui/components/button";
import Link from "next/link";

import { OrreryFigure } from "@/features/not-found/art";
import { SiteFooter } from "@/features/profile/components/site-footer";
import { SiteHeader } from "@/features/profile/components/site-header";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="min-h-svh overflow-x-clip bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-28 pb-16 sm:px-8 lg:min-h-svh lg:grid-cols-2 lg:pt-24">
        <div className="grid rise-in justify-items-start gap-5">
          <h1 className="type-headline text-balance">We cannot find this page.</h1>
          <p className="max-w-md type-lead text-muted-foreground">
            It is like the planet missing from this desk model. The link may be old, or the address
            may have a typo.
          </p>
          <Button nativeButton={false} render={<Link href="/" />}>
            Back to home
          </Button>
        </div>
        <div className="rise-in">
          <OrreryFigure />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
