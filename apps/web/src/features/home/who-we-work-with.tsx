import { cn } from "@halmahera/ui/lib/utils";

import { Reveal } from "@/components/reveal";
import {
  CivicBuildingFigure,
  OfficeBlockFigure,
  RocketPadFigure,
} from "@/features/home/figures/who-we-work-with-figures";
import { SectionHeading } from "@/features/profile/components/section-heading";

const buyers = [
  {
    name: "Companies",
    line: "Add AI to the systems you already run.",
    problem: "A shelf runs empty because nobody saw the numbers in time.",
    lead: "The AI reads the records",
    solution: "you keep every day, and it writes the order while there is still stock.",
    result: "Your team comes in, and the work is ready.",
    Figure: OfficeBlockFigure,
  },
  {
    name: "Startups",
    line: "Build your AI product with a team that ships.",
    problem: "Your idea lives on one page, and nobody can try it.",
    lead: "The AI learns your product",
    solution: "and it answers a visitor's real question on a screen that anyone can use.",
    result: "They stop reading about it and start using it.",
    Figure: RocketPadFigure,
  },
  {
    name: "Government",
    line: "Public-safety AI that runs on your own servers.",
    problem: "The water rises past the line before anyone sends a warning.",
    lead: "The AI sends the warning",
    solution:
      "while the water is still below the line, and it turns your field photos into reports on a computer that you own.",
    result: "You keep the model.",
    Figure: CivicBuildingFigure,
  },
];

export function WhoWeWorkWith() {
  return (
    <section id="who-we-work-with" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <SectionHeading title="Who we work with">
          Companies, startups, and government.
        </SectionHeading>
        <ul className="mt-16 grid gap-16 lg:mt-20 lg:gap-24">
          {buyers.map(function renderBuyer(buyer, index) {
            const textFirst = index % 2 === 1;
            return (
              <Reveal
                as="li"
                key={buyer.name}
                className="grid items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-20"
              >
                <div className={cn("min-w-0", textFirst && "lg:order-2")}>
                  <buyer.Figure />
                </div>
                <div className="max-w-lg">
                  <p className="text-base font-medium text-muted-foreground">{buyer.name}</p>
                  <p className="mt-3 text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl">
                    {buyer.line}
                  </p>
                  <p className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground">
                    {buyer.problem}{" "}
                    <strong className="font-medium text-foreground">{buyer.lead}</strong>{" "}
                    {buyer.solution} {buyer.result}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
