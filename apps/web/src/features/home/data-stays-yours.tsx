import { SectionHeading } from "@/features/profile/components/section-heading";
import "@/features/home/data-stays-yours.css";

const claims = [
  { name: "On-prem or private cloud", body: "It runs on your servers or your cloud account." },
  { name: "Hosted in Indonesia", body: "Data stays in the country. Built for UU PDP." },
  {
    name: "Local open models",
    body: "We can use open models (Llama, Qwen) so no data goes to outside AI providers.",
  },
  { name: "NDA by default", body: "We sign before we see your data." },
];

const stack = ["GPT", "Claude", "Gemini", "Llama", "Qwen", "Ollama", "vLLM", "pgvector"];

export function DataStaysYours() {
  return (
    <section id="data" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <SectionHeading title="Your data stays yours.">
            The AI comes to your data. Your data does not go to the AI.
          </SectionHeading>
          <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {claims.map(function renderClaim(claim) {
              return (
                <li key={claim.name} className="grid content-start gap-1 border-t pt-4">
                  <p className="font-medium">{claim.name}</p>
                  <p className="text-sm text-muted-foreground">{claim.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <ClosedOrbitFigure />
      </div>

      <div className="mx-auto mt-16 max-w-6xl px-4 sm:px-8">
        <p className="type-label-mono text-muted-foreground">Models and tools we use</p>
        <ul className="mt-4 flex flex-wrap gap-x-10 gap-y-3 font-heading text-xl font-medium tracking-tight text-faint-foreground">
          {stack.map(function renderTool(tool) {
            return <li key={tool}>{tool}</li>;
          })}
        </ul>
      </div>
    </section>
  );
}

function ClosedOrbitFigure() {
  return (
    <figure className="relative aspect-square overflow-hidden rounded-4xl bg-card shadow-card">
      <figcaption className="sr-only">
        Your data goes around a server inside your network. A line from an outside AI provider stops
        at the edge of the network.
      </figcaption>
      <div aria-hidden className="absolute inset-0 star-field text-muted-foreground opacity-50" />
      <div
        aria-hidden
        className="absolute inset-x-6 inset-y-16 rounded-3xl border border-dashed border-faint-foreground/60 sm:inset-x-14"
      >
        <p className="absolute -bottom-2 left-4 bg-card px-2 type-label-mono text-muted-foreground">
          Your servers · Indonesia
        </p>
        <div className="absolute inset-0 grid place-items-center perspective-midrange">
          <div className="dsy-tilt grid aspect-square w-3/4 place-items-center">
            <div className="col-start-1 row-start-1 size-full rounded-full border" />
            <div className="dsy-orbit col-start-1 row-start-1 size-full">
              <span className="absolute top-0 left-1/2 size-3 -translate-1/2 rounded-full bg-brand" />
              <span className="absolute bottom-0 left-1/2 size-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-chart-2" />
              <span className="absolute top-1/2 left-0 size-2 -translate-1/2 rounded-full bg-chart-5" />
            </div>
          </div>
          <div className="dsy-planet absolute aspect-square w-1/5 rounded-full" />
        </div>
      </div>
      <div
        aria-hidden
        className="absolute top-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1"
      >
        <p className="type-label-mono text-faint-foreground">Outside AI providers</p>
        <span className="h-6 w-px bg-linear-to-b from-transparent to-faint-foreground" />
        <span className="h-0.5 w-5 rounded-full bg-destructive" />
      </div>
    </figure>
  );
}
