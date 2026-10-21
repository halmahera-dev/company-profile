import { cn } from "@halmahera/ui/lib/utils";

import { Mark } from "@/features/mark/mark";
import { SectionHeading } from "@/features/profile/components/section-heading";

const milestones: Record<number, string> = {
  1: "Kickoff. Pick one use case.",
  2: "Data in. Access to your sample data.",
  3: "Data check. Clean and map the data.",
  4: "First model on your data.",
  5: "Review with you.",
  8: "First clickable screen.",
  9: "Connect the screen to the model.",
  10: "Review with you.",
  11: "Test with real users.",
  12: "Fix what users found.",
  13: "Dry run.",
  14: "Demo day. You click it.",
};

export function Sprint() {
  const weeks = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
  ];
  const reviewDays = [5, 10];
  const demoDay = 14;

  return (
    <section id="sprint" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <SectionHeading title="The 14-day sprint.">
          One milestone each working day. Two reviews with you. On day 14, you click it.
        </SectionHeading>

        <div className="mt-12 grid gap-6">
          {weeks.map(function renderWeek(days, weekIndex) {
            return (
              <div key={weekIndex} className="grid gap-3">
                <p className="type-label-mono text-muted-foreground">Week {weekIndex + 1}</p>
                <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-7">
                  {days.map(function renderDay(day) {
                    const milestone = milestones[day];
                    const isReview = reviewDays.includes(day);
                    const isDemoDay = day === demoDay;

                    if (!milestone) {
                      return (
                        <li
                          key={day}
                          className="flex items-center gap-3 rounded-2xl p-3 text-faint-foreground shadow-inset lg:flex-col lg:items-start lg:justify-between"
                        >
                          <span className="w-16 shrink-0 font-mono text-xs tabular-nums lg:w-auto">
                            Day {day}
                          </span>
                          <span className="text-sm">Weekend</span>
                        </li>
                      );
                    }

                    return (
                      <li
                        key={day}
                        className={cn(
                          "relative flex items-start gap-3 rounded-2xl p-3 shadow-card lg:min-h-36 lg:flex-col lg:justify-between",
                          isDemoDay ? "bg-surface-raised" : "bg-card",
                        )}
                      >
                        <span className="flex w-16 shrink-0 items-center gap-2 font-mono text-xs text-muted-foreground tabular-nums lg:w-auto">
                          Day {day}
                          {isReview ? (
                            <span aria-hidden className="size-1.5 rounded-full bg-brand" />
                          ) : null}
                        </span>
                        <span className="text-sm text-pretty">{milestone}</span>
                        {isDemoDay ? (
                          <>
                            <Mark className="absolute top-3 right-3 size-4 text-brand-text" />
                            <span
                              aria-hidden
                              data-active="true"
                              className="glow-ring absolute -inset-px"
                            />
                          </>
                        ) : null}
                      </li>
                    );
                  })}
                </ol>
              </div>
            );
          })}
        </div>

        <p className="mt-6 flex items-center gap-2 type-caption text-muted-foreground">
          <span aria-hidden className="size-1.5 rounded-full bg-brand" />
          You see the work on review days, and on demo day.
        </p>
      </div>
    </section>
  );
}
