import { Badge } from "@halmahera/ui/components/badge";
import { Card, CardContent, CardHeader } from "@halmahera/ui/components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@halmahera/ui/components/tabs";

const sprintLength = 14;

const phases = [
  {
    days: "Day 1",
    firstDay: 1,
    lastDay: 1,
    name: "Scope",
    pitch: "One use case. One test for “working”.",
    tasks: ["Call with your team", "Pick the use case", "Agree what success looks like"],
  },
  {
    days: "Days 2–4",
    firstDay: 2,
    lastDay: 4,
    name: "Data & design",
    pitch: "Your data in. First screens out.",
    tasks: ["Access to sample data", "First model test", "Clickable screens"],
  },
  {
    days: "Days 5–11",
    firstDay: 5,
    lastDay: 11,
    name: "Build",
    pitch: "The model and the product, end to end.",
    tasks: ["AI pipeline", "Real interface", "A demo link that updates every day"],
  },
  {
    days: "Days 12–13",
    firstDay: 12,
    lastDay: 13,
    name: "Test",
    pitch: "Real users try to break it.",
    tasks: ["Sessions with real users", "Fixes from what we see", "Accuracy check"],
  },
  {
    days: "Day 14",
    firstDay: 14,
    lastDay: 14,
    name: "Demo",
    pitch: "You get a working thing, not a deck.",
    tasks: ["Live demo for your team", "Source code", "A plan for what comes next"],
  },
];

export function SprintTimeline() {
  const days = Array.from({ length: sprintLength }, function toDay(_, index) {
    return index + 1;
  });

  return (
    <Tabs defaultValue={phases[0].name}>
      <div className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        <TabsList>
          {phases.map(function renderTrigger(phase) {
            return (
              <TabsTrigger key={phase.name} value={phase.name}>
                {phase.name}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>

      {phases.map(function renderPhase(phase) {
        return (
          <TabsContent key={phase.name} value={phase.name}>
            <Card>
              <CardHeader>
                <div
                  role="img"
                  aria-label={`${phase.days} of ${sprintLength}`}
                  className="grid grid-cols-14 gap-1"
                >
                  {days.map(function renderDay(day) {
                    const isInPhase = day >= phase.firstDay && day <= phase.lastDay;
                    return (
                      <span
                        key={day}
                        className={
                          isInPhase
                            ? "h-2 rounded-full bg-brand transition-colors duration-200 ease-out"
                            : "h-2 rounded-full bg-muted transition-colors duration-200 ease-out"
                        }
                      />
                    );
                  })}
                </div>
                <p className="mt-4 text-sm text-muted-foreground tabular-nums">{phase.days}</p>
                <p className="type-headline text-balance">{phase.pitch}</p>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-wrap gap-2">
                  {phase.tasks.map(function renderTask(task) {
                    return (
                      <li key={task}>
                        <Badge variant="secondary">{task}</Badge>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
