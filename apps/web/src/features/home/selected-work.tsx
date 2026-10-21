import { Badge } from "@halmahera/ui/components/badge";
import { cn } from "@halmahera/ui/lib/utils";

import { SectionHeading } from "@/features/profile/components/section-heading";
import { awards } from "@/features/profile/team";

const wins = [
  { ...awards.lidm, project: "Reading classroom" },
  { ...awards.llama, project: "Reading classroom" },
  { ...awards.gemastik, project: "Disaster detection" },
];

export function SelectedWork() {
  return (
    <section id="work" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <SectionHeading title="Selected work.">
          Things we shipped, and the juries that tried them.
        </SectionHeading>

        <article className="mt-12 grid gap-8 rounded-4xl bg-card p-3 shadow-card lg:grid-cols-5 lg:items-center lg:gap-10 lg:pr-10">
          <AlertMapScreen />
          <div className="grid content-start gap-5 px-3 pb-4 lg:col-span-2 lg:p-0">
            <p className="type-label-mono text-muted-foreground">Featured · Disaster detection</p>
            <p className="text-3xl leading-tight font-medium tracking-tight text-balance">
              17,000 islands. One early warning.
            </p>
            <dl className="grid gap-4">
              <div className="grid gap-1">
                <dt className="type-caption text-muted-foreground">Problem</dt>
                <dd>Warnings reach people too late, and help goes to the wrong place first.</dd>
              </div>
              <div className="grid gap-1">
                <dt className="type-caption text-muted-foreground">Result</dt>
                <dd>
                  One map that spots a disaster and ranks where help should go. A national jury gave
                  it {awards.gemastik.place.toLowerCase()}.
                </dd>
              </div>
            </dl>
          </div>
        </article>

        <ol
          aria-label="Hackathon wins"
          className="mt-6 grid divide-y rounded-4xl shadow-card sm:grid-cols-3 sm:divide-x sm:divide-y-0"
        >
          {wins.map(function renderWin(win, index) {
            return (
              <li key={win.event} className="flex items-end justify-between gap-4 p-6">
                <div className="grid gap-1">
                  <p className="type-label-mono text-muted-foreground">
                    Mission {String(index + 1).padStart(2, "0")} · {win.project}
                  </p>
                  <p className="type-title">{win.event}</p>
                </div>
                <p className="shrink-0 font-heading text-3xl font-medium tracking-tight tabular-nums">
                  {win.place.split(" ")[0]}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function AlertMapScreen() {
  const markers = [
    { position: "top-2/5 left-1/4", isUrgent: true },
    { position: "top-3/5 left-1/2", isUrgent: false },
    { position: "top-1/3 left-3/4", isUrgent: false },
  ];
  const alerts = [
    { kind: "Flood", place: "Bekasi", level: "High" },
    { kind: "Landslide", place: "Garut", level: "Watch" },
    { kind: "Quake M5.2", place: "Palu", level: "Info" },
  ];

  return (
    <figure className="dark relative aspect-4/3 overflow-hidden rounded-2xl bg-background text-foreground shadow-inset lg:col-span-3">
      <figcaption className="sr-only">
        Example screen. A map of Indonesia with three alerts. A flood in Bekasi is marked high.
      </figcaption>
      <div aria-hidden className="absolute inset-0 dot-field text-muted-foreground opacity-40" />
      {markers.map(function renderMarker(marker) {
        return (
          <span
            key={marker.position}
            aria-hidden
            className={cn("absolute flex size-2.5", marker.position)}
          >
            {marker.isUrgent ? (
              <span className="absolute inline-flex size-full rounded-full bg-brand opacity-75 motion-safe:animate-ping" />
            ) : null}
            <span
              className={cn(
                "relative size-2.5 rounded-full",
                marker.isUrgent ? "bg-brand" : "bg-chart-3",
              )}
            />
          </span>
        );
      })}
      <div className="absolute inset-x-4 top-4 flex items-center justify-between">
        <p className="type-label-mono text-muted-foreground">Early warning · Live</p>
        <p className="font-mono text-xs text-muted-foreground tabular-nums">06:42 WIB</p>
      </div>
      <ul
        aria-hidden
        className="absolute right-4 bottom-4 hidden w-56 gap-1.5 rounded-3xl bg-card p-2 shadow-lg sm:grid"
      >
        {alerts.map(function renderAlert(alert) {
          return (
            <li
              key={alert.kind}
              className="flex items-center justify-between gap-3 rounded-xl px-2 py-1.5 text-sm first:bg-surface-raised"
            >
              <span>
                {alert.kind} <span className="text-muted-foreground">· {alert.place}</span>
              </span>
              <Badge variant={alert.level === "High" ? "destructive" : "secondary"}>
                {alert.level}
              </Badge>
            </li>
          );
        })}
      </ul>
    </figure>
  );
}
