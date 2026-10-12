import { Badge } from "@halmahera/ui/components/badge";
import { Button } from "@halmahera/ui/components/button";
import { cn } from "@halmahera/ui/lib/utils";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/features/profile/components/section-heading";
import { SiteFooter } from "@/features/profile/components/site-footer";
import { contactEmail, SiteHeader } from "@/features/profile/components/site-header";
import { TeamCarousel } from "@/features/profile/components/team-carousel";
import { phases, sprintLength } from "@/features/profile/sprint";
import { awards, members } from "@/features/profile/team";

import heroImage from "../../../../public/brushstrokes.webp";

const phaseColors = ["bg-chart-1", "bg-chart-2", "bg-chart-3", "bg-chart-4", "bg-chart-5"];

export function ProfileContent() {
  return (
    <div data-page="profile" className="min-h-svh overflow-x-clip bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <Ticker />
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

function EmailButton({ children }: { children: React.ReactNode }) {
  return (
    <Button
      variant="brand"
      size="lg"
      nativeButton={false}
      render={<a href={`mailto:${contactEmail}`} />}
    >
      {children}
      <HugeiconsIcon icon={ArrowRight01Icon} data-icon="inline-end" />
    </Button>
  );
}

function Hero() {
  const stickers = [
    {
      label: `🏆 ${awards.lidm.place} · ${awards.lidm.event}`,
      tilt: "-rotate-6 lg:-left-10 lg:top-6",
    },
    { label: `🦙 ${awards.llama.place} · Meta Llama`, tilt: "rotate-3 lg:-right-8 lg:top-1/3" },
    {
      label: `🛰️ ${awards.gemastik.place} · ${awards.gemastik.event}`,
      tilt: "-rotate-3 lg:-left-6 lg:bottom-16",
    },
  ];

  return (
    <section className="relative mx-auto max-w-6xl px-4 pt-32 pb-16 sm:px-8 sm:pt-40 sm:pb-24">
      <div className="rise-in">
        <Badge variant="brand">AI product team from Indonesia</Badge>
      </div>
      <h1 className="mt-5 rise-in type-display-xl text-balance">
        Your AI idea,{" "}
        <span className="relative inline-swatch -rotate-3 overflow-hidden rounded-full shadow-card-lg">
          <Image
            src={heroImage}
            alt=""
            fill
            loading="eager"
            fetchPriority="high"
            placeholder="blur"
            sizes="12rem"
            className="object-cover"
          />
        </span>{" "}
        <span className="font-light text-brand">working</span> in two weeks.
      </h1>

      <div className="mt-10 grid items-center gap-12 lg:grid-cols-3">
        <div className="rise-in lg:col-span-2">
          <p className="max-w-lg type-lead text-muted-foreground">
            <strong className="text-foreground">Five award-winning builders.</strong> Hackathons
            taught us to ship under pressure. Now we do it for you. 🚀
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <EmailButton>Email us</EmailButton>
            <Button variant="outline" size="lg" nativeButton={false} render={<a href="#work" />}>
              See our work
            </Button>
          </div>
        </div>

        <div className="relative rise-in">
          <figure className="rotate-3 rounded-3xl bg-card p-3 shadow-card-lg transition-transform duration-300 ease-out hover:rotate-0 dark:ring-1 dark:ring-foreground/10">
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
              <Image
                src={heroImage}
                alt="Abstract oil painting of crimson, plum, and white brushstrokes"
                fill
                placeholder="blur"
                sizes="24rem"
                className="object-cover"
              />
            </div>
            <figcaption className="flex items-center justify-between px-1 pt-4">
              <span className="type-title">Day 14. Demo day.</span>
              <span className="font-mono text-sm text-muted-foreground tabular-nums">
                {sprintLength}/{sprintLength}
              </span>
            </figcaption>
          </figure>
          <ul className="mt-6 flex flex-wrap gap-2 lg:contents">
            {stickers.map(function renderSticker(sticker) {
              return (
                <li
                  key={sticker.label}
                  className={cn(
                    "w-fit rounded-full bg-card px-4 py-2 text-sm font-semibold shadow-card transition-transform duration-300 ease-out hover:scale-105 lg:absolute dark:ring-1 dark:ring-foreground/10",
                    sticker.tilt,
                  )}
                >
                  {sticker.label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const items = [
    "Chatbots on your data",
    "Smart search",
    "Document reading",
    "Workflow automation",
    "Early warning systems",
    "AI storybooks",
    "Working demos, not decks",
  ];
  const loop = [...items, ...items];

  return (
    <div className="-mx-16 -rotate-2 bg-deep-wine py-4 text-cream shadow-card-lg">
      <ul aria-label="What we build" className="flex w-max marquee">
        {loop.map(function renderItem(item, index) {
          return (
            <li
              key={index}
              aria-hidden={index >= items.length}
              className="flex items-center gap-6 pr-6 font-heading text-lg font-bold tracking-tight whitespace-nowrap sm:text-xl"
            >
              {item}
              <span aria-hidden className="size-2 rounded-full bg-brand" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <SectionHeading eyebrow="Our work" title="Built under pressure.">
          Weekend deadlines, national juries, real problems. Two products, three podiums.
        </SectionHeading>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-6">
          <article className="reveal-on-scroll">
            <div className="-rotate-2 rounded-3xl bg-card p-3 shadow-card-lg transition-transform duration-300 ease-out hover:-translate-y-1 hover:rotate-0 dark:ring-1 dark:ring-foreground/10">
              <div className="grid aspect-4/3 grid-cols-2 gap-3 rounded-2xl bg-surface-sand p-4 shadow-inset">
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
                  <span className="absolute bottom-2 left-2 rounded-full bg-background/70 px-2 py-0.5 text-xs font-semibold backdrop-blur">
                    ✨ Painted by AI
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

          <article className="reveal-on-scroll md:mt-16">
            <div className="rotate-2 rounded-3xl bg-card p-3 shadow-card-lg transition-transform duration-300 ease-out hover:-translate-y-1 hover:rotate-0 dark:ring-1 dark:ring-foreground/10">
              <div className="relative flex aspect-4/3 flex-col justify-end overflow-hidden rounded-2xl bg-deep-wine p-5 text-cream">
                <div aria-hidden className="absolute inset-0 dot-field opacity-30" />
                <span aria-hidden className="absolute top-1/3 left-3/5 flex size-3">
                  <span className="absolute inline-flex size-full rounded-full bg-brand opacity-75 motion-safe:animate-ping" />
                  <span className="relative inline-flex size-3 rounded-full bg-brand ring-2 ring-cream" />
                </span>
                <p className="relative font-heading text-6xl font-extrabold tracking-tight tabular-nums sm:text-7xl">
                  17,000
                </p>
                <p className="relative text-cream/80">islands. One early warning.</p>
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
      body: "One sharp use case, built end to end, in your hands. No slide decks.",
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
      <div className="mx-auto max-w-7xl rounded-4xl bg-surface-sand px-4 py-16 shadow-inset sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Services" title="Pick a card. Any card." />
          <ul className="mt-12 grid gap-4 md:grid-cols-3 md:gap-6">
            {services.map(function renderService(service) {
              return (
                <li key={service.name} className="flex reveal-on-scroll">
                  <div
                    className={cn(
                      "flex w-full flex-col gap-4 rounded-4xl p-6 transition-transform duration-300 ease-out hover:-translate-y-2 hover:rotate-0",
                      service.tilt,
                      service.featured
                        ? "bg-deep-wine text-cream shadow-xl"
                        : "bg-card shadow-card dark:ring-1 dark:ring-foreground/10",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <p
                        className={cn(
                          "text-sm font-medium",
                          service.featured ? "text-cream/70" : "text-muted-foreground",
                        )}
                      >
                        {service.name}
                      </p>
                      {service.featured ? <Badge variant="blur">Start here</Badge> : null}
                    </div>
                    <p className="type-headline text-balance">{service.pitch}</p>
                    <p className={service.featured ? "text-cream/80" : "text-muted-foreground"}>
                      {service.body}
                    </p>
                    <p
                      className={cn(
                        "mt-auto pt-4 font-mono text-xs",
                        service.featured ? "text-cream/70" : "text-muted-foreground",
                      )}
                    >
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
                  "flex aspect-square reveal-on-scroll flex-col justify-between rounded-2xl p-2 transition-transform duration-300 ease-out hover:-translate-y-1 sm:rounded-3xl sm:p-3",
                  isDemoDay
                    ? "rotate-3 bg-brand text-brand-foreground shadow-xl"
                    : "bg-card shadow-card dark:ring-1 dark:ring-foreground/10",
                )}
              >
                <span className="font-heading text-lg font-extrabold tracking-tight tabular-nums sm:text-3xl">
                  {day}
                </span>
                <span className="grid gap-1.5">
                  {isPhaseStart ? (
                    <span className="hidden truncate text-xs font-semibold sm:block">
                      {isDemoDay ? "Demo 🎉" : phase.name}
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
              <li key={phase.name} className="grid reveal-on-scroll content-start gap-2">
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
    { usual: "A discovery deck", ours: "A working demo" },
    { usual: "A few months", ours: "Two weeks" },
    { usual: "An account manager", ours: "The people who build it" },
    { usual: "Many teams, many handoffs", ours: "Five builders, no handoffs" },
    { usual: "AI added at the end", ours: "AI from day one" },
  ];

  return (
    <section className="bg-muted/50 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-8 lg:grid-cols-2 lg:items-center">
        <SectionHeading eyebrow="Why us" title="Why not a big agency?">
          Big agencies are good at big programs. When you need to know fast if an AI idea works,
          they are slow.
        </SectionHeading>

        <ul className="grid gap-3">
          {comparisons.map(function renderRow(row) {
            return (
              <li
                key={row.ours}
                className="group flex reveal-on-scroll flex-wrap items-baseline gap-x-4 gap-y-1 rounded-3xl bg-card px-5 py-4 shadow-card transition-transform duration-300 ease-out hover:translate-x-1.5 dark:ring-1 dark:ring-foreground/10"
              >
                <span className="text-muted-foreground line-through decoration-brand decoration-2">
                  {row.usual}
                </span>
                <span className="font-heading text-lg font-bold tracking-tight">
                  <span aria-hidden className="mr-2 text-brand-text">
                    →
                  </span>
                  {row.ours}
                </span>
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
        <SectionHeading eyebrow="The team" title="Five builders. Three podiums.">
          Two of us won with the reading classroom. Three of us won with disaster detection. Now we
          build together.
        </SectionHeading>
      </div>
      <div className="mt-10 reveal-on-scroll">
        <TeamCarousel members={members} />
      </div>
      <div className="mx-auto mt-6 flex max-w-6xl justify-center px-4 sm:px-8">
        <Button variant="outline" nativeButton={false} render={<Link href="/team" />}>
          Meet the team
          <HugeiconsIcon icon={ArrowRight01Icon} data-icon="inline-end" />
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
        <SectionHeading eyebrow="Let’s talk" title="Got an AI idea collecting dust?">
          Tell us what it should do. We will tell you honestly if two weeks is enough.
        </SectionHeading>
        <div className="mt-10 flex reveal-on-scroll flex-col items-start gap-4 sm:flex-row sm:items-center">
          <EmailButton>Email us</EmailButton>
          <p className="text-sm text-muted-foreground">{contactEmail}</p>
        </div>
        <p className="mt-16 reveal-on-scroll text-sm text-muted-foreground">
          We build our own products too. Want early access? Say so in your email.
        </p>
      </div>
    </section>
  );
}
