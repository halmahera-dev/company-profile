import { Badge } from "@halmahera/ui/components/badge";
import { Button } from "@halmahera/ui/components/button";
import Image from "next/image";

import { SectionHeading } from "@/features/profile/components/section-heading";
import { SiteFooter } from "@/features/profile/components/site-footer";
import {
  contactEmail,
  SiteHeader,
} from "@/features/profile/components/site-header";
import { members } from "@/features/profile/team";

export function TeamContent() {
  return (
    <div
      data-page="profile"
      className="min-h-svh overflow-x-clip bg-background text-foreground"
    >
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 pt-32 pb-20 sm:px-8 sm:pt-40 sm:pb-28">
        <SectionHeading eyebrow="The team" title="You will talk to these five.">
          Email us and one of these five writes back. The same five build the
          product.
        </SectionHeading>

        <ul className="mt-12 grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {members.map(function renderMember(member) {
            return (
              <li key={member.name} className="group">
                <div className="relative aspect-4/5 overflow-hidden rounded-4xl bg-muted">
                  <Image
                    src={member.photo}
                    alt={`Portrait of ${member.name}`}
                    fill
                    placeholder="blur"
                    quality={90}
                    sizes="(min-width: 1024px) 20rem, (min-width: 640px) 45vw, 90vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="mt-4 grid gap-1 px-1">
                  <h2 className="type-title">{member.name}</h2>
                  <p className="text-sm text-brand-text">{member.title}</p>
                  <p className="mt-2 text-muted-foreground">{member.bio}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {member.awards.map(function renderAward(award) {
                      return (
                        <Badge key={award.event} variant="secondary">
                          {award.place} · {award.event}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-20 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button
            size="lg"
            nativeButton={false}
            render={<a href={`mailto:${contactEmail}`} />}
          >
            Work with us
          </Button>
          <p className="text-sm text-muted-foreground">{contactEmail}</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
