import * as Alchemy from "alchemy";
import * as Cloudflare from "alchemy/Cloudflare";
import * as Effect from "effect/Effect";
import "varlock/auto-load";

export const web = Cloudflare.Website.StaticSite("web", {
  cwd: "../../apps/web",
  command: "bun run build:cloudflare",
  // Rebuild shared workspace dependencies until Alchemy has a workspace-aware default memo.
  memo: false,
  outdir: ".open-next/assets",
  main: "../../apps/web/.open-next/worker.js",
  bundle: true,
  compatibility: {
    flags: ["nodejs_compat", "global_fetch_strictly_public"],
  },
  env: {
    IMAGES: Cloudflare.Images.Images(),
  },
  dev: {
    command: "bun run dev:bare",
    url: "http://localhost:3001",
  },
});

export type WebEnv = Cloudflare.InferEnv<typeof web>;

export default Alchemy.Stack(
  "halmahera",
  {
    providers: Cloudflare.providers(),
    state: Cloudflare.state(),
  },
  Effect.gen(function* () {
    const webWorker = yield* web;

    return {
      web: webWorker.url,
    };
  }),
);
