import type { Metadata } from "next";

import { MarkFigure } from "@/features/mark/art";
import { SiteFooter } from "@/features/profile/components/site-footer";
import { SiteHeader } from "@/features/profile/components/site-header";

export const metadata: Metadata = {
  title: "Mark",
  description: "The Halmahera mark. A letter H, one ring, and a small planet.",
  alternates: { canonical: "/mark" },
};

export default function MarkPage() {
  return (
    <div className="min-h-svh overflow-x-clip bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto grid max-w-3xl gap-8 px-4 pt-28 pb-16 sm:px-8">
        <div className="grid gap-3">
          <h1 className="type-headline text-balance">The mark</h1>
          <p className="max-w-md type-lead text-muted-foreground">
            The Halmahera mark is a letter H. A thin ring goes around it. A small planet sits on the
            ring.
          </p>
        </div>
        <MarkFigure />
      </main>
      <SiteFooter />
    </div>
  );
}
