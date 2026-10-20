import { Badge } from "@halmahera/ui/components/badge";
import { Button } from "@halmahera/ui/components/button";
import { cn } from "@halmahera/ui/lib/utils";
import Image from "next/image";
import Link from "next/link";

import { Hero } from "@/features/home/hero";
import { Showcase } from "@/features/home/showcase";
import { SectionHeading } from "@/features/profile/components/section-heading";
import { SiteFooter } from "@/features/profile/components/site-footer";
import { contactEmail, SiteHeader } from "@/features/profile/components/site-header";
import { TeamCarousel } from "@/features/profile/components/team-carousel";
import { phases, sprintLength } from "@/features/profile/sprint";
import { awards, members } from "@/features/profile/team";

import heroImage from "../../../../public/brushstrokes.webp";

// Demo is last, so it takes the brand color that also fills the Demo day tile.
const phaseColors = ["bg-chart-2", "bg-chart-3", "bg-chart-4", "bg-chart-5", "bg-chart-1"];

export function ProfileContent() {
  return (
    <div data-page="profile" className="min-h-svh overflow-x-clip bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <Showcase />
        <Work />
        <Services />
        <Sprint />
        <WhyUs />
        <Team />
        <Closing />
      </main>
      <SiteFooter />
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <SectionHeading eyebrow="Our work" title="Built on weekend deadlines.">
          Two products. A national jury placed them three times.
        </SectionHeading>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-6">
          <article>
            <div className="-rotate-2 rounded-3xl bg-card p-3 shadow-card-lg">
              <div className="grid aspect-4/3 grid-cols-2 gap-3 rounded-2xl bg-surface-raised p-4 shadow-inset">
                <div className="flex flex-col justify-between rounded-xl bg-card p-4 shadow-card">
                  <p className="font-heading text-sm leading-relaxed font-semibold sm:text-base">
                    “The dragon was scared of the rain, so the kids built it an umbrella…”
                  </p>
                  <p className="text-xs text-muted-foreground">Page 3 · written by Class 4B</p>
                </div>
                <div className="relative overflow-hidden rounded-xl shadow-card">
                  <Image
                    src={heroImage}
                    alt=""
                    fill
                    placeholder="blur"
                    sizes="14rem"
                    className="object-cover object-right"
                  />
                  <span className="absolute bottom-2 left-2 rounded-full bg-background/80 px-2 py-0.5 text-xs font-medium">
                    Painted by AI
                  </span>
                </div>
              </div>
              <div className="grid gap-3 px-1 pt-4 pb-2">
                <p className="type-title">
                  Kids write the story. <span className="text-brand-text">AI draws it.</span>
                </p>
                <p className="text-muted-foreground">
                  A reading classroom where every page gets a painting, and teams talk the story
                  through.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="brand">
                    {awards.lidm.place} · {awards.lidm.event}
                  </Badge>
                  <Badge variant="secondary">
                    {awards.llama.place} · {awards.llama.event}
                  </Badge>
                </div>
              </div>
            </div>
          </article>

          <article className="md:mt-16">
            <div className="rotate-2 rounded-3xl bg-card p-3 shadow-card-lg">
              <div className="dark relative flex aspect-4/3 flex-col justify-end overflow-hidden rounded-2xl bg-card p-5 text-foreground">
                <div aria-hidden className="absolute inset-0 dot-field opacity-30" />
                <span aria-hidden className="absolute top-1/3 left-3/5 flex size-3">
                  <span className="absolute inline-flex size-full rounded-full bg-brand opacity-75 motion-safe:animate-ping" />
                  <span className="relative inline-flex size-3 rounded-full bg-brand ring-2 ring-foreground" />
                </span>
                <p className="relative type-headline tabular-nums">17,000</p>
                <p className="relative text-foreground/80">islands. One early warning.</p>
              </div>
              <div className="grid gap-3 px-1 pt-4 pb-2">
                <p className="type-title">Disaster detection</p>
                <p className="text-muted-foreground">
                  An AI system that spots disasters across Indonesia, so help knows where to go
                  first.
                </p>
                <div>
                  <Badge variant="brand">
                    {awards.gemastik.place} · {awards.gemastik.event}
                  </Badge>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      name: "AI Inside",
      pitch: "Add AI to the product you already run.",
      body: "Chat, search, document reading, or automation, wired into your app and your data.",
      terms: "Your stack · your data",
      tilt: "md:-rotate-3",
    },
    {
      name: "Prototype Sprint",
      pitch: "Idea on Monday. Demo in two weeks.",
      body: "One use case, from your data to a screen you can click.",
      terms: "Fixed scope · 2 weeks",
      tilt: "md:rotate-0 md:-translate-y-4",
      featured: true,
    },
    {
      name: "Full Build",
      pitch: "From first sketch to launch day.",
      body: "Design, engineering, and AI in one small team. We stay until real users are on it.",
      terms: "Design · build · launch",
      tilt: "md:rotate-3",
    },
  ];

  return (
    <section id="services" className="scroll-mt-24 px-4 sm:px-8">
      <div className="mx-auto max-w-7xl rounded-4xl px-4 py-16 shadow-card sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Services" title="Three ways to start.">
            Most people begin with a two-week demo. The other two cover a product you already run,
            or one you want launched.
          </SectionHeading>
          <ul className="mt-12 grid gap-4 md:grid-cols-3 md:gap-6">
            {services.map(function renderService(service) {
              return (
                <li key={service.name} className="flex">
                  <div
                    className={cn(
                      "flex w-full flex-col gap-4 rounded-4xl p-6",
                      service.tilt,
                      service.featured ? "bg-surface-raised shadow-card" : "bg-card shadow-card",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-muted-foreground">{service.name}</p>
                      {service.featured ? <Badge variant="brand">Start here</Badge> : null}
                    </div>
                    <p className="text-2xl leading-tight font-medium tracking-tight text-balance">
                      {service.pitch}
                    </p>
                    <p className="text-muted-foreground">{service.body}</p>
                    <p className="mt-auto pt-4 type-label-mono text-muted-foreground">
                      {service.terms}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Sprint() {
  const days = Array.from({ length: sprintLength }, function toDay(_, index) {
    return index + 1;
  });

  function phaseIndexOf(day: number) {
    return phases.findIndex(function containsDay(phase) {
      return day >= phase.firstDay && day <= phase.lastDay;
    });
  }

  return (
    <section id="sprint" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <SectionHeading eyebrow="The sprint" title="Two weeks on one calendar.">
          This is a Prototype Sprint, day by day. Every day ends with something you can click.
        </SectionHeading>

        <ol aria-label="Sprint calendar" className="mt-12 grid grid-cols-7 gap-1.5 sm:gap-3">
          {days.map(function renderDay(day) {
            const phaseIndex = phaseIndexOf(day);
            const phase = phases[phaseIndex];
            const isPhaseStart = day === phase.firstDay;
            const isDemoDay = day === sprintLength;
            return (
              <li
                key={day}
                aria-label={`Day ${day}: ${phase.name}`}
                className={cn(
                  "flex aspect-square flex-col justify-between rounded-2xl p-2 sm:rounded-3xl sm:p-3",
                  isDemoDay
                    ? "rotate-3 bg-brand text-brand-foreground shadow-xl"
                    : "bg-card shadow-card",
                )}
              >
                <span className="font-heading text-lg font-semibold tracking-tight tabular-nums sm:text-3xl">
                  {day}
                </span>
                <span className="grid gap-1.5">
                  {isPhaseStart ? (
                    <span className="hidden truncate text-xs font-semibold sm:block">
                      {isDemoDay ? "Demo" : phase.name}
                    </span>
                  ) : null}
                  <span
                    aria-hidden
                    className={cn(
                      "h-1.5 rounded-full",
                      isDemoDay ? "bg-brand-foreground/70" : phaseColors[phaseIndex],
                    )}
                  />
                </span>
              </li>
            );
          })}
        </ol>

        <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-5">
          {phases.map(function renderPhase(phase, index) {
            return (
              <li key={phase.name} className="grid content-start gap-2">
                <span aria-hidden className={cn("h-1.5 w-10 rounded-full", phaseColors[index])} />
                <p className="text-xs text-muted-foreground tabular-nums">{phase.days}</p>
                <p className="type-title">{phase.name}</p>
                <p className="text-sm text-muted-foreground">{phase.pitch}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function WhyUs() {
  const comparisons = [
    { usual: "A slide deck first", ours: "A demo you can click" },
    { usual: "Months before you see it", ours: "Two weeks" },
    { usual: "You meet a manager", ours: "You meet the builders" },
    { usual: "The work moves between teams", ours: "Five people stay on it" },
    { usual: "The model comes last", ours: "The model is in the first build" },
  ];

  return (
    <section className="bg-muted py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-8 lg:grid-cols-2 lg:items-center">
        <SectionHeading eyebrow="Why us" title="You talk to the people who build it.">
          A big agency fits a long program. When you need to know if an AI idea works, we use two
          weeks.
        </SectionHeading>

        <ul className="grid gap-3">
          {comparisons.map(function renderRow(row) {
            return (
              <li key={row.ours} className="grid gap-1 rounded-3xl bg-card px-5 py-4 shadow-card">
                <p className="text-xs text-muted-foreground">{row.usual}</p>
                <p className="font-heading text-lg font-semibold tracking-tight">{row.ours}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <SectionHeading eyebrow="The team" title="The five people on the work.">
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

function Closing() {
  return (
    <section id="contact" className="relative isolate scroll-mt-24 overflow-hidden">
      <Image
        src={heroImage}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        className="-z-10 object-cover object-bottom opacity-40 dark:opacity-25"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-background via-background/70 to-background/40" />
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-8 sm:py-28 lg:py-32">
        <div className="max-w-2xl">
          <Badge variant="brand">Let’s talk</Badge>
          <h2 className="mt-3 type-display-xl text-balance">Send the idea.</h2>
          <p className="mt-4 type-lead text-muted-foreground">
            Say what it should do. We will say if two weeks is enough.
          </p>
        </div>
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button size="lg" nativeButton={false} render={<a href={`mailto:${contactEmail}`} />}>
            Email us
          </Button>
          <p className="text-sm text-muted-foreground">{contactEmail}</p>
        </div>
        <p className="mt-16 text-sm text-muted-foreground">
          We build our own products too. Want early access? Say so in your email.
        </p>
      </div>
    </section>
  );
}
