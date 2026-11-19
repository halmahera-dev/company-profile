import {
  AbacusFigure,
  ConveyorFigure,
  DealBoardFigure,
  DocumentTrayFigure,
  SensorMastFigure,
  ServiceBellFigure,
} from "@/features/home/figures/what-we-build-figures";
import { GlowBorder } from "@/features/home/glow-border";
import { WhatWeBuildScroller } from "@/features/home/what-we-build-scroller";
import { SectionHeading } from "@/features/profile/components/section-heading";

const functions = [
  {
    name: "Customer service",
    line: "Answer customers on the channels they already use.",
    Figure: ServiceBellFigure,
    bullets: [
      "Chat assistant on your product and policy docs",
      "Handover to a human with full context",
      "Ticket sorting and routing",
      "Daily summary of top questions",
    ],
  },
  {
    name: "Sales",
    line: "Find the deals that need attention.",
    Figure: DealBoardFigure,
    bullets: [
      "Pipeline questions in plain language",
      "Lead scoring from your CRM data",
      "Follow-up drafts for each deal",
      "Weekly sales brief",
    ],
  },
  {
    name: "Operations",
    line: "See problems before they stop the line.",
    Figure: ConveyorFigure,
    bullets: [
      "Stock risk and restock drafts",
      "Delay detection across orders",
      "Daily ops brief",
      "Approval flow for every action",
    ],
  },
  {
    name: "Finance",
    line: "Less manual checking, faster close.",
    Figure: AbacusFigure,
    bullets: [
      "Invoice and receipt reading",
      "Matching payments to invoices",
      "Spending anomaly flags",
      "Draft monthly reports",
    ],
  },
  {
    name: "Admin & documents",
    line: "Turn paper and PDFs into data.",
    Figure: DocumentTrayFigure,
    bullets: [
      "Form and contract reading",
      "Search across all company documents",
      "Data entry into your current system",
      "Summaries of long documents",
    ],
  },
  {
    name: "Field & safety",
    line: "Watch the field so people do not have to.",
    Figure: SensorMastFigure,
    bullets: [
      "Sensor and camera monitoring",
      "Early warning alerts",
      "Incident reports from photos",
      "Field team dispatch",
    ],
  },
];

export function WhatWeBuild() {
  return (
    <section id="what-we-build" className="scroll-mt-24 py-20 sm:py-28">
      <WhatWeBuildScroller
        heading={
          <SectionHeading title="One team for every part of the business.">
            Six business functions. Each one starts with a problem you already have.
          </SectionHeading>
        }
      >
        {functions.map((item) => {
          return (
            <li
              key={item.name}
              className="flex min-w-0 shrink-0 grow-0 card-row-item snap-start list-disc"
            >
              <GlowBorder className="flex w-full flex-col gap-4 rounded-4xl bg-card surface-lit p-6 shadow-card">
                <item.Figure />
                <p className="text-sm font-medium text-muted-foreground">{item.name}</p>
                <p className="text-2xl leading-tight font-medium tracking-tight text-balance">
                  {item.line}
                </p>
                <ul className="mt-auto grid gap-2 pt-4 text-muted-foreground">
                  {item.bullets.map(function renderBullet(bullet) {
                    return <li key={bullet}>{bullet}</li>;
                  })}
                </ul>
              </GlowBorder>
            </li>
          );
        })}
      </WhatWeBuildScroller>
    </section>
  );
}
