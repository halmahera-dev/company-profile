"use client";

import { Button } from "@halmahera/ui/components/button";
import { cn } from "@halmahera/ui/lib/utils";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { useEffect, useRef, useState } from "react";

import { GlowBorder } from "@/features/home/glow-border";
import { SectionHeading } from "@/features/profile/components/section-heading";

import planetImage from "../../../public/planet.webp";

type Device = "phone" | "laptop";

const builds: {
  label: string;
  capability: string;
  body: string;
  device: Device;
  screenDescription: string;
  placement: string;
  Screen: () => React.ReactNode;
}[] = [
  {
    label: "Ask",
    capability: "Chat on your data",
    body: "Ask why a number changed. The assistant finds the cause and shows the chart.",
    device: "phone",
    screenDescription:
      "A phone chat. The question “Why did sales drop in Surabaya last week?” gets an answer with the cause and a daily sales chart.",
    placement: "lg:col-start-1 lg:row-start-1 lg:self-end",
    Screen: AskScreen,
  },
  {
    label: "Read",
    capability: "Document reading",
    body: "Drop in invoices or forms. It pulls out the fields and marks the ones to check.",
    device: "laptop",
    screenDescription:
      "A laptop screen. A stack of invoices becomes a table of fields. One low-confidence field is marked to check.",
    placement: "lg:col-start-1 lg:row-start-2 lg:self-start",
    Screen: ReadScreen,
  },
  {
    label: "Act",
    capability: "Automation with approval",
    body: "It drafts the work, like a restock order. Nothing goes out until you approve it.",
    device: "laptop",
    screenDescription:
      "A laptop screen. A restock order drafted from stock levels, with Edit and Approve buttons.",
    placement: "lg:col-start-6 lg:row-start-1 lg:self-end",
    Screen: ActScreen,
  },
  {
    label: "Alert",
    capability: "Early warning",
    body: "It watches sensors and data, and warns your team before a problem grows.",
    device: "phone",
    screenDescription:
      "A phone alert. Water level at sensor 4 is rising fast, 40 minutes to the threshold, with buttons to alert the field team.",
    placement: "lg:col-start-6 lg:row-start-2 lg:self-start",
    Screen: AlertScreen,
  },
];

export function Showcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPointerInside, setIsPointerInside] = useState(false);
  const [isFocusInside, setIsFocusInside] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isAutoplaying, setIsAutoplaying] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  const isPaused = isPointerInside || isFocusInside || !isInView;
  const activeBuild = builds[activeIndex];

  useEffect(function pauseWhenOffscreen() {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), {
      threshold: 0.4,
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  function showNextBuild() {
    setActiveIndex((index) => (index + 1) % builds.length);
  }

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="scroll-mt-24 py-20 sm:py-28"
      onPointerEnter={() => setIsPointerInside(true)}
      onPointerLeave={() => setIsPointerInside(false)}
      onFocusCapture={() => setIsFocusInside(true)}
      onBlurCapture={function resumeWhenFocusLeaves(event) {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsFocusInside(false);
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <SectionHeading title="AI your team uses every day.">
          Four things we build most. Pick one to see an example screen.
        </SectionHeading>

        <div className="mt-12 flex flex-col gap-6 lg:grid lg:grid-cols-7 lg:grid-rows-2 lg:gap-y-2 lg:rounded-4xl lg:p-6 lg:shadow-card">
          <div
            role="group"
            aria-label="Choose an example"
            data-paused={isPaused}
            className="inline-flex self-center rounded-full bg-secondary p-1 lg:contents"
          >
            {builds.map(function renderChoice(build, index) {
              const isActive = index === activeIndex;
              return (
                <GlowBorder
                  key={build.label}
                  isActive={isActive}
                  className={cn("rounded-full lg:col-span-2 lg:rounded-4xl", build.placement)}
                >
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={function chooseBuild() {
                      setActiveIndex(index);
                      setIsAutoplaying(false);
                    }}
                    className={cn(
                      "group relative size-full pressable cursor-pointer overflow-hidden rounded-full px-4 py-1 text-sm font-medium text-muted-foreground transition hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring aria-pressed:bg-surface-raised aria-pressed:text-foreground",
                      "lg:flex lg:flex-col lg:items-start lg:gap-3 lg:rounded-4xl lg:p-6 lg:pb-10 lg:text-left",
                    )}
                  >
                    <span className="lg:type-label-mono">{build.label}</span>
                    <span className="hidden type-title text-foreground lg:block">
                      {build.capability}
                    </span>
                    <span className="hidden text-base font-normal text-muted-foreground group-aria-pressed:text-foreground lg:block">
                      {build.body}
                    </span>
                    {isActive && isAutoplaying ? (
                      <span
                        key={activeIndex}
                        aria-hidden
                        onAnimationEnd={showNextBuild}
                        className="absolute inset-x-3 bottom-0.5 h-0.5 origin-left autoplay-progress rounded-full bg-brand lg:inset-x-6 lg:bottom-4"
                      />
                    ) : null}
                  </button>
                </GlowBorder>
              );
            })}
          </div>

          <p className="min-h-18 text-center text-muted-foreground lg:hidden">
            <span className="font-medium text-foreground">{activeBuild.capability}.</span>{" "}
            {activeBuild.body}
          </p>

          <div className="@container relative order-first flex h-136 flex-col items-center justify-center lg:order-none lg:col-span-3 lg:col-start-3 lg:row-span-2 lg:row-start-1">
            <div className="absolute inset-x-0 inset-y-10 overflow-hidden rounded-3xl bg-background">
              <Image
                src={planetImage}
                alt=""
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 32rem, 100vw"
                className="object-cover object-right-top"
              />
            </div>
            <div
              aria-hidden
              className="absolute -inset-x-6 inset-y-0 neutral-glow lg:-inset-x-20"
            />
            <DeviceFrame device={activeBuild.device}>
              <div key={activeIndex} className="size-full fade-in">
                <p className="sr-only">{activeBuild.screenDescription}</p>
                <div aria-hidden inert className="size-full">
                  <activeBuild.Screen />
                </div>
              </div>
            </DeviceFrame>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-1 text-sm text-muted-foreground">
          <span>Your data stays in your systems.</span>
          <Button variant="link" nativeButton={false} render={<Link href="#data" />}>
            How we handle data →
          </Button>
        </div>
      </div>
    </section>
  );
}

// The screen takes its final size at once. The frame clips it while it resizes.
function DeviceFrame({ device, children }: { device: Device; children: React.ReactNode }) {
  const isPhone = device === "phone";

  return (
    <div
      data-device={device}
      style={
        {
          "--device-width": isPhone ? "18rem" : "calc(100% - 3rem)",
          "--device-height": isPhone ? "32rem" : "20rem",
          "--device-radius": isPhone ? "2.75rem" : "1rem",
          "--screen-width": isPhone ? "16.75rem" : "calc(100cqw - 4rem)",
          "--screen-height": isPhone ? "30.75rem" : "19rem",
          "--screen-radius": isPhone ? "2.125rem" : "0.5rem",
        } as React.CSSProperties
      }
      className="group/device dark relative z-10 h-(--device-height) w-(--device-width) transition-device"
    >
      <div className="absolute inset-0 overflow-hidden rounded-(--device-radius) bg-background shadow-card-lg ring-1 ring-border transition-device">
        <div className="absolute top-1/2 left-1/2 h-(--screen-height) w-(--screen-width) -translate-1/2 overflow-hidden rounded-(--screen-radius) bg-card text-foreground">
          {children}
        </div>
        <span className="absolute top-4 left-1/2 h-6 w-20 -translate-x-1/2 rounded-full bg-background transition-opacity group-data-[device=laptop]/device:opacity-0" />
      </div>
      <span className="absolute -inset-x-6 top-full h-3 rounded-b-xl bg-surface-raised transition-opacity group-data-[device=phone]/device:opacity-0" />
    </div>
  );
}

function AppBar({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-border px-4 py-3">
      <span className="size-7 shrink-0 rounded-full bg-linear-to-br from-brand to-chart-2" />
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{title}</p>
        <p className="truncate text-xs text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
}

function AskScreen() {
  const days = [
    { day: "Mon", sales: 42 },
    { day: "Tue", sales: 31, isDrop: true },
    { day: "Wed", sales: 29, isDrop: true },
    { day: "Thu", sales: 30, isDrop: true },
    { day: "Fri", sales: 33, isDrop: true },
    { day: "Sat", sales: 39 },
    { day: "Sun", sales: 37 },
  ];

  return (
    <div className="flex size-full flex-col pt-8 text-xs">
      <AppBar title="Sales assistant" detail="Connected to your POS" />
      <div className="flex flex-1 flex-col gap-2 overflow-hidden p-3">
        <p className="max-w-4/5 self-end rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground">
          Why did sales drop in Surabaya last week?
        </p>
        <p className="max-w-5/6 rounded-2xl rounded-bl-sm bg-secondary px-3 py-2 text-sm">
          Sales fell 18%. Most of it came from 3 stores in East Surabaya, after Kopi Susu 1L ran out
          on Tuesday.
        </p>
        <div className="rounded-2xl border border-border p-3">
          <p className="font-medium">
            Daily sales · <span className="text-muted-foreground">Rp million</span>
          </p>
          <ul className="mt-2 grid gap-1">
            {days.map(function renderDay(day) {
              return (
                <li key={day.day} className="flex items-center gap-2">
                  <span className="w-8 text-muted-foreground">{day.day}</span>
                  <span className="flex-1">
                    <span
                      className={cn(
                        "block h-2 w-(--bar-width) rounded-full",
                        day.isDrop ? "bg-brand" : "bg-muted-foreground/40",
                      )}
                      style={
                        {
                          "--bar-width": `${(day.sales / 42) * 100}%`,
                        } as React.CSSProperties
                      }
                    />
                  </span>
                  <span
                    className={cn("w-6 text-right tabular-nums", day.isDrop && "text-brand-text")}
                  >
                    {day.sales}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <p className="text-muted-foreground">Source: 412 rows from your POS</p>
      </div>
    </div>
  );
}

function ReadScreen() {
  const fields = [
    { name: "Vendor", value: "PT Sinar Jaya", confidence: 99 },
    { name: "Invoice no.", value: "INV-0142", confidence: 98 },
    { name: "Date", value: "14 Oct 2026", confidence: 97 },
    { name: "Total", value: "Rp 12.480.000", confidence: 96 },
    { name: "Tax ID", value: "01.234.5?6.7-001", confidence: 62 },
  ];
  const pageOffsets = ["translate-x-3 translate-y-4", "translate-x-1.5 translate-y-2", ""];

  return (
    <div className="flex size-full flex-col text-xs">
      <AppBar title="Invoice reader" detail="3 files · 1 field to check" />
      <div className="flex flex-1 gap-4 overflow-hidden p-4">
        <div className="relative hidden w-28 shrink-0 @xl:block">
          {pageOffsets.map(function renderPage(offset) {
            return (
              <div
                key={offset}
                className={cn(
                  "absolute inset-x-0 top-0 h-36 rounded-md border border-border bg-background p-2",
                  offset,
                )}
              >
                <span className="block h-1.5 w-1/2 rounded-full bg-muted-foreground/40" />
                <span className="mt-2 block h-1 w-full rounded-full bg-muted-foreground/20" />
                <span className="mt-1 block h-1 w-4/5 rounded-full bg-muted-foreground/20" />
                <span className="mt-1 block h-1 w-3/5 rounded-full bg-muted-foreground/20" />
              </div>
            );
          })}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex gap-3 border-b border-border pb-1.5 text-muted-foreground">
            <span className="w-1/4">Field</span>
            <span className="flex-1">Value</span>
            <span className="w-20 text-right">Confidence</span>
          </div>
          {fields.map(function renderField(field) {
            const isLowConfidence = field.confidence < 80;
            return (
              <div
                key={field.name}
                className={cn(
                  "flex items-center gap-3 border-b border-border py-1.5",
                  isLowConfidence && "-mx-2 rounded-md border-transparent bg-brand/10 px-2",
                )}
              >
                <span className="w-1/4 text-muted-foreground">{field.name}</span>
                <span className="min-w-0 flex-1 truncate text-sm font-medium tabular-nums">
                  {field.value}
                </span>
                <span
                  className={cn(
                    "w-20 text-right tabular-nums",
                    isLowConfidence && "font-medium text-brand-text",
                  )}
                >
                  {isLowConfidence ? `Check · ${field.confidence}%` : `${field.confidence}%`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ActScreen() {
  const items = [
    { name: "Gula pasir 1 kg", onHand: 40, minimum: 120, order: 200 },
    { name: "Minyak goreng 2 L", onHand: 18, minimum: 60, order: 96 },
    { name: "Tepung terigu 1 kg", onHand: 55, minimum: 100, order: 120 },
  ];

  return (
    <div className="flex size-full flex-col text-xs">
      <AppBar title="Restock draft" detail="Warehouse Sidoarjo · from stock at 06:00" />
      <div className="flex flex-1 flex-col gap-3 overflow-hidden p-4">
        <p className="text-muted-foreground">
          3 items are below the minimum. Here is a draft order.
        </p>
        <div>
          <div className="flex gap-4 border-b border-border pb-1.5 text-muted-foreground">
            <span className="flex-1">Item</span>
            <span className="w-12 text-right">On hand</span>
            <span className="w-8 text-right">Min</span>
            <span className="w-10 text-right">Order</span>
          </div>
          {items.map(function renderItem(item) {
            return (
              <div
                key={item.name}
                className="flex gap-4 border-b border-border py-2 text-sm tabular-nums"
              >
                <span className="min-w-0 flex-1 truncate font-medium">{item.name}</span>
                <span className="w-12 text-right text-brand-text">{item.onHand}</span>
                <span className="w-8 text-right text-muted-foreground">{item.minimum}</span>
                <span className="w-10 text-right font-medium">{item.order}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-auto flex items-center justify-between gap-3">
          <p className="min-w-0 truncate text-muted-foreground">
            CV Maju Bersama · <span className="text-foreground tabular-nums">Rp 8.240.000</span>
          </p>
          <div className="flex shrink-0 gap-2">
            <Button variant="outline" size="sm">
              Edit
            </Button>
            <Button size="sm">Approve</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AlertScreen() {
  const levels = [118, 121, 120, 126, 131, 137, 142, 150, 158, 167, 174, 182];
  const threshold = 220;

  return (
    <div className="flex size-full flex-col pt-8 text-xs">
      <AppBar title="Flood watch" detail="12 sensors · Kali Brantas" />
      <div className="flex flex-1 flex-col gap-3 overflow-hidden p-3">
        <div className="rounded-2xl bg-brand/10 p-3 ring-1 ring-brand/40">
          <p className="font-medium text-brand-text">Sensor 4 · rising fast</p>
          <p className="mt-1 text-sm">Water level at sensor 4 is rising fast.</p>
          <p className="mt-3 flex items-baseline gap-2">
            <span className="type-title tabular-nums">182 cm</span>
            <span className="text-brand-text tabular-nums">+24 cm in 1 hr</span>
          </p>
          <div className="relative mt-3 flex h-20 items-end gap-1 border-t border-dashed border-brand/60">
            {levels.map(function renderLevel(level, index) {
              return (
                <span
                  key={index}
                  className="h-(--level) flex-1 rounded-sm bg-brand/70"
                  style={
                    {
                      "--level": `${(level / threshold) * 100}%`,
                    } as React.CSSProperties
                  }
                />
              );
            })}
          </div>
          <p className="mt-2 text-muted-foreground">
            Est. <span className="font-medium text-foreground">40 min</span> to threshold (220 cm)
          </p>
        </div>
        <Button variant="brand" className="w-full">
          Alert field team
        </Button>
        <Button variant="outline" className="w-full">
          Open sensor map
        </Button>
      </div>
    </div>
  );
}
