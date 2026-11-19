import { DataStaysYours } from "@/features/home/data-stays-yours";
import { Faq } from "@/features/home/faq";
import { FinalCta } from "@/features/home/final-cta";
import { Hero } from "@/features/home/hero";
import { HowToStart } from "@/features/home/how-to-start";
import { SelectedWork } from "@/features/home/selected-work";
import { Showcase } from "@/features/home/showcase";
import { Sprint } from "@/features/home/sprint";
import { WhatWeBuild } from "@/features/home/what-we-build";
import { WhoWeWorkWith } from "@/features/home/who-we-work-with";
import { SiteFooter } from "@/features/profile/components/site-footer";
import { SiteHeader } from "@/features/profile/components/site-header";

export function ProfileContent() {
  return (
    <div data-page="profile" className="min-h-svh overflow-x-clip bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <Showcase />
        <WhatWeBuild />
        <WhoWeWorkWith />
        <SelectedWork />
        <HowToStart />
        <Sprint />
        <DataStaysYours />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
