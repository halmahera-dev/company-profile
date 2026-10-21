# halmahera

Company site for an AI product team in Indonesia. The live site is [halmahera.site](https://halmahera.site).

The app is Next.js 16 on Bun, with React 19, Tailwind 4, and a shared UI package. It deploys to Cloudflare Workers through OpenNext.

## Pages

| Route            | File                                      |
| ---------------- | ----------------------------------------- |
| `/`              | `apps/web/src/app/page.tsx`               |
| `/team`          | `apps/web/src/app/team/page.tsx`          |
| `/design-system` | `apps/web/src/app/design-system/page.tsx` |

The design-system page sets `robots` to `noindex`.

## Setup

You need [Bun](https://bun.sh) 1.3.10 (`packageManager` in the root `package.json`).

```bash
bun install
bun run dev
```

Open [http://localhost:3001](http://localhost:3001).

## Scripts

| Command                    | What it does                                                      |
| -------------------------- | ----------------------------------------------------------------- |
| `bun run dev`              | Start every package dev task. Today that is the site on port 3001 |
| `bun run dev:web`          | Start the web package on port 3001                                |
| `bun run build`            | Next.js production build                                          |
| `bun run build:cloudflare` | OpenNext build for the Worker                                     |
| `bun run deploy`           | OpenNext build, then `opennextjs-cloudflare deploy`               |
| `bun run check-types`      | Typecheck every package                                           |
| `bun run lint`             | Run Oxlint                                                        |
| `bun run format:check`     | Report format issues and leave files unchanged                    |
| `bun run check`            | Run Oxlint, then write formatting with Oxfmt                      |

Run `bun run check` before you commit.

The pre-commit hook runs `bunx lint-staged`. The repo has no lint-staged config, so the hook skips every file.

## Layout

```
halmahera/
├── apps/
│   └── web/          # Next.js site
├── packages/
│   ├── ui/           # Shared components and styles
│   └── config/       # Shared TypeScript config
├── docs/             # Site outline and hero spec
└── patches/          # OpenNext 1.20.10 patch
```

| Path                                 | Purpose                                                                        |
| ------------------------------------ | ------------------------------------------------------------------------------ |
| `apps/web/next.config.ts`            | Next config. Imports the env schema. Turns on the React Compiler               |
| `apps/web/src/env.ts`                | Env schema. Validates `NODE_ENV` only                                          |
| `apps/web/wrangler.jsonc`            | Worker config. The Worker name is `halmahera-web`                              |
| `packages/ui/src/styles/globals.css` | Design tokens and global styles                                                |
| `packages/ui/components.json`        | shadcn config for shared components. Style is `base-luma`. Icons are Hugeicons |
| `packages/config/tsconfig.base.json` | Shared TypeScript config                                                       |
| `design.md`                          | Design language. Update it in the same change as the tokens                    |

## UI

Change tokens in `packages/ui/src/styles/globals.css`. Shared primitives live in `packages/ui/src/components/*`. App-only components live in `apps/web`.

Add a shared primitive from the repo root:

```bash
npx shadcn@latest add accordion dialog popover sheet table -c packages/ui
```

```tsx
import { Button } from "@halmahera/ui/components/button";
```

For a block that belongs to the site only, run the shadcn CLI from `apps/web`.

## Environment

`apps/web/src/env.ts` uses [t3-env](https://env.t3.gg). Put local values in `apps/web/.env`. `apps/web/.gitignore` ignores `.env*` and allows `.env.example`. The repo has no example file yet.

Add secrets under `server` and `NEXT_PUBLIC_*` values under `client`. List every client key in `experimental__runtimeEnv`. Import `env` from `@/env`. `next.config.ts` imports the schema, so `next dev` and builds fail when a required variable is missing.

Next inlines client values at build time. Set them on the machine that runs `bun run deploy`.

On the Worker, OpenNext copies string vars onto `process.env`. Bindings such as `IMAGES` are objects. Read them with `getCloudflareContext().env` from `@opennextjs/cloudflare`.

## Deploy

Web deploys to Cloudflare Workers with [OpenNext](https://opennext.js.org/cloudflare).

- Local auth: `bunx wrangler login`
- CI auth: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`
- Deploy: `bun run deploy`

## OpenNext patch

**Symptom.** Every server-rendered page on the Worker returns error 1101.

**Cause.** Next.js 16.4 writes `.next/server/preview-props.json`. `@opennextjs/cloudflare` 1.20.10 leaves that file out of the Worker.

**What this repo does.** `patches/@opennextjs%2Fcloudflare@1.20.10.patch` adds `preview-props` to the copy list. `patchedDependencies` in the root `package.json` applies it. The lockfile installs 1.20.10. Bun applies the patch only to that exact version.

`@opennextjs/cloudflare` 1.20.12 includes the same fix. To drop the local patch:

1. Bump `@opennextjs/cloudflare` in `apps/web/package.json` to 1.20.12 or newer.
2. Delete the `patchedDependencies` entry in the root `package.json` and the file in `patches/`.
3. Run `bun install`.
4. In `apps/web`, run `bunx opennextjs-cloudflare build`, then `bunx wrangler dev`. The home page must return 200.

A version bump that skips step 2 leaves a stale `patchedDependencies` entry.

## Related docs

- [docs/site-outline.md](docs/site-outline.md)
- [docs/hero-spec.md](docs/hero-spec.md)
- [design.md](design.md)

Last reviewed: 21 October 2026.
