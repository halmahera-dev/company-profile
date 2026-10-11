import { Badge } from "@halmahera/ui/components/badge";
import { Button } from "@halmahera/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@halmahera/ui/components/card";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/features/profile/components/section-heading";
import { SiteFooter } from "@/features/profile/components/site-footer";
import { contactEmail, SiteHeader } from "@/features/profile/components/site-header";
import { SprintTimeline } from "@/features/profile/components/sprint-timeline";
import { TeamCarousel } from "@/features/profile/components/team-carousel";
import { awards, members } from "@/features/profile/team";

import heroImage from "../../../../public/brushstrokes.webp";

export function ProfileContent() {
  return (
    <div data-page="profile" className="min-h-svh overflow-x-clip bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
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

function Hero() {
  const facts = [
    { value: awards.lidm.place, label: awards.lidm.event },
    { value: awards.llama.place, label: awards.llama.event },
    { value: awards.gemastik.place, label: awards.gemastik.event },
    { value: "2 weeks", label: "To a working prototype" },
  ];

  return (
    <section className="relative isolate flex min-h-svh items-end overflow-hidden">
      <Image
        src={heroImage}
        alt="Abstract oil painting of crimson, plum, and white brushstrokes"
        fill
        loading="eager"
        fetchPriority="high"
        placeholder="blur"
        sizes="100vw"
        className="-z-10 scroll-drift object-cover object-center dark:brightness-75"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-deep-wine/85 via-deep-wine/55 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-transparent from-60% to-background" />

      <div className="mx-auto w-full max-w-5xl px-4 pt-28 pb-12 sm:px-6 sm:pt-32 sm:pb-24">
        <div className="rise-in">
          <Badge variant="blur">AI product team from Indonesia</Badge>
        </div>
        <h1 className="mt-5 max-w-4xl rise-in type-display-xl text-balance text-cream drop-shadow-lg">
          Your AI idea, <span className="font-light">working</span> in two weeks.
        </h1>
        <p className="mt-6 max-w-xl rise-in text-base leading-relaxed text-cream/90 sm:text-lg">
          Five award-winning builders. Hackathons taught us to ship under pressure. Now we do it for
          you.
        </p>
        <div className="mt-8 flex rise-in flex-wrap gap-3">
          <Button
            variant="brand"
            size="lg"
            nativeButton={false}
            render={<a href={`mailto:${contactEmail}`} />}
          >
            Email us
            <HugeiconsIcon icon={ArrowRight01Icon} data-icon="inline-end" />
          </Button>
          <Button variant="outline" size="lg" nativeButton={false} render={<a href="#work" />}>
            See our work
          </Button>
        </div>
        <div className="mt-8 grid max-w-2xl rise-in grid-cols-2 gap-2 sm:grid-cols-4">
          {facts.map(function renderFact(fact) {
            return (
              <Card key={fact.label} size="sm" className="min-w-0">
                <CardContent>
                  <p className="font-medium tabular-nums">{fact.value}</p>
                  <p className="text-xs text-muted-foreground">{fact.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="scroll-mt-24 py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading eyebrow="Our work" title="Built under pressure.">
          Weekend deadlines, national juries, real problems. Two products, three podiums.
        </SectionHeading>

        <div className="mt-10 grid gap-4 md:grid-cols-5">
          <div className="flex reveal-on-scroll md:col-span-3">
            <Card className="w-full">
              <CardHeader>
                <CardDescription>A reading classroom</CardDescription>
                <p className="type-headline text-balance">
                  Kids write the story. <span className="text-brand-text">AI draws it.</span>
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Students write their own stories, and AI paints a picture for every page. Teachers
                  set the reading, and the class talks it through in teams.
                </p>
              </CardContent>
              <CardFooter className="mt-auto">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="brand">
                    {awards.lidm.place} · {awards.lidm.event}
                  </Badge>
                  <Badge variant="secondary">
                    {awards.llama.place} · {awards.llama.event}
                  </Badge>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="flex reveal-on-scroll md:col-span-2">
            <Card className="w-full">
              <CardHeader>
                <CardDescription>Disaster detection</CardDescription>
                <p className="font-heading text-6xl font-extrabold tracking-tight text-brand-text tabular-nums">
                  17,000
                </p>
                <p className="type-title">islands. One early warning.</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  An AI system that spots disasters across Indonesia, so help knows where to go
                  first.
                </p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Badge variant="brand">
                  {awards.gemastik.place} · {awards.gemastik.event}
                </Badge>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      name: "Prototype Sprint",
      pitch: "Idea on Monday. Demo in two weeks.",
      body: "We pick one sharp use case, build it end to end, and put a working demo in your hands. No slide decks.",
      terms: "Fixed scope · 2 weeks",
      featured: true,
    },
    {
      name: "AI Inside",
      pitch: "Add AI to the product you already run.",
      body: "Chat, search, document reading, or automation, wired into your current app and your own data.",
      terms: "Your stack · your data",
    },
    {
      name: "Full Build",
      pitch: "From first sketch to launch day.",
      body: "Design, engineering, and AI in one small team. We stay until real users are on it.",
      terms: "Design · build · launch",
    },
  ];

  return (
    <section id="services" className="scroll-mt-24 bg-muted/50 py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading eyebrow="Services" title="Three ways to work with us." />
        <ul className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-3">
          {services.map(function renderService(service) {
            return (
              <li
                key={service.name}
                className={
                  service.featured
                    ? "flex reveal-on-scroll rounded-4xl ring-2 ring-brand"
                    : "flex reveal-on-scroll"
                }
              >
                <Card className="w-full">
                  <CardHeader>
                    <CardDescription>{service.name}</CardDescription>
                    <CardTitle>{service.pitch}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.body}</p>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Badge variant={service.featured ? "brand" : "secondary"}>
                      {service.terms}
                    </Badge>
                  </CardFooter>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Sprint() {
  return (
    <section id="sprint" className="scroll-mt-24 py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading eyebrow="The sprint" title="Fourteen days, idea to demo.">
          This is how a Prototype Sprint runs. Pick a phase to see what happens in it.
        </SectionHeading>
        <div className="mt-10 reveal-on-scroll">
          <SprintTimeline />
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const comparisons = [
    { topic: "First thing you get", usual: "A discovery deck", ours: "A working demo" },
    { topic: "Time to first version", usual: "A few months", ours: "Two weeks" },
    { topic: "Who you talk to", usual: "An account manager", ours: "The people who build it" },
    { topic: "Handoffs", usual: "Many teams, many handoffs", ours: "Five builders, no handoffs" },
    { topic: "AI", usual: "Added at the end", ours: "Built in from day one" },
  ];

  return (
    <section className="bg-muted/50 py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading eyebrow="Why us" title="Why not a big agency?">
          Big agencies are good at big programs. When you need to know fast if an AI idea works,
          they are slow.
        </SectionHeading>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="flex reveal-on-scroll">
            <Card className="w-full">
              <CardHeader>
                <CardDescription>The usual way</CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="grid gap-4">
                  {comparisons.map(function renderUsual(row) {
                    return (
                      <div key={row.topic} className="grid gap-0.5">
                        <dt className="text-xs text-muted-foreground">{row.topic}</dt>
                        <dd className="text-muted-foreground">{row.usual}</dd>
                      </div>
                    );
                  })}
                </dl>
              </CardContent>
            </Card>
          </div>
          <div className="flex reveal-on-scroll rounded-4xl ring-2 ring-brand">
            <Card className="w-full">
              <CardHeader>
                <p className="text-sm font-medium text-brand-text">The Halmahera way</p>
              </CardHeader>
              <CardContent>
                <dl className="grid gap-4">
                  {comparisons.map(function renderOurs(row) {
                    return (
                      <div key={row.topic} className="grid gap-0.5">
                        <dt className="text-xs text-muted-foreground">{row.topic}</dt>
                        <dd className="font-medium">{row.ours}</dd>
                      </div>
                    );
                  })}
                </dl>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading eyebrow="The team" title="Five builders. Three podiums.">
          Two of us won with the reading classroom. Three of us won with disaster detection. Now we
          build together.
        </SectionHeading>
      </div>
      <div className="mt-10 reveal-on-scroll">
        <TeamCarousel members={members} />
      </div>
      <div className="mx-auto mt-6 flex max-w-5xl justify-center px-4 sm:px-6">
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
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
        <SectionHeading eyebrow="Let’s talk" title="Got an AI idea collecting dust?">
          Tell us what it should do. We will tell you honestly if two weeks is enough.
        </SectionHeading>
        <div className="mt-10 flex reveal-on-scroll flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button
            variant="brand"
            size="lg"
            nativeButton={false}
            render={<a href={`mailto:${contactEmail}`} />}
          >
            Email us
            <HugeiconsIcon icon={ArrowRight01Icon} data-icon="inline-end" />
          </Button>
          <p className="text-sm text-muted-foreground">{contactEmail}</p>
        </div>
        <p className="mt-16 reveal-on-scroll text-sm text-muted-foreground">
          We build our own products too. Want early access? Say so in your email.
        </p>
      </div>
    </section>
  );
}
