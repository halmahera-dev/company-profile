import { Button } from "@halmahera/ui/components/button";
import Link from "next/link";

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
import { SectionHeading } from "@/features/profile/components/section-heading";
import { SiteFooter } from "@/features/profile/components/site-footer";
import { SiteHeader } from "@/features/profile/components/site-header";
import { TeamCarousel } from "@/features/profile/components/team-carousel";
import { members } from "@/features/profile/team";

// The team block stays in this file. It is off the landing page for now.
const showTeamSection = false;

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
        {showTeamSection ? <Team /> : null}
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

function Team() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <SectionHeading title="The five people on the work.">
          Two of us built the reading classroom. Three of us built the disaster alerts. We work as
          one group now.
        </SectionHeading>
      </div>
      <div className="mt-10">
        <TeamCarousel members={members} />
      </div>
      <div className="mx-auto mt-6 flex max-w-6xl justify-center px-4 sm:px-8">
        <Button variant="outline" nativeButton={false} render={<Link href="/team" />}>
          Meet the team
        </Button>
      </div>
    </section>
  );
}
