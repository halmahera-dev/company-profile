# halmahera

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines Next.js, Self, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **Next.js** - Full-stack React framework
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **Shared UI package** - shadcn/ui primitives live in `packages/ui`
- **Oxlint** - Oxlint + Oxfmt (linting & formatting)
- **Turborepo** - Optimized monorepo build system

## Getting Started

First, install the dependencies:

```bash
bun install
```

Then, run the development server:

```bash
bun run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the fullstack application.

## UI Customization

React web apps in this stack share shadcn/ui primitives through `packages/ui`.

- Change design tokens and global styles in `packages/ui/src/styles/globals.css`
- Update shared primitives in `packages/ui/src/components/*`
- Adjust shadcn aliases or style config in `packages/ui/components.json` and `apps/web/components.json`

### Add more shared components

Run this from the project root to add more primitives to the shared UI package:

```bash
npx shadcn@latest add accordion dialog popover sheet table -c packages/ui
```

Import shared components like this:

```tsx
import { Button } from "@halmahera/ui/components/button";
```

### Add app-specific blocks

If you want to add app-specific blocks instead of shared primitives, run the shadcn CLI from `apps/web`.

## Environment Configuration

Environment variables are validated with [t3-env](https://env.t3.gg). Keep values in ignored `.env` files or your deployment platform, and commit only `.env.example`.

The web app's schema is `apps/web/src/env.ts`. Add secrets under `server` and `NEXT_PUBLIC_*` values under `client`, then list every client key in `experimental__runtimeEnv`. Import `env` from `@/env` in application code. `next.config.ts` imports the schema, so `next dev` and builds fail when a variable is missing. Next inlines client values at build time, so they must be set wherever the build runs, including `alchemy deploy`.

In the deployed Worker, OpenNext copies string Worker vars onto `process.env`, so the same `env` object works there. Cloudflare bindings such as `IMAGES` are runtime objects, not env vars. Read them with `getCloudflareContext().env` from `@opennextjs/cloudflare`.

The infra schema is `packages/infra/env.ts`. It loads `packages/infra/.env` with `util.parseEnv`, which works under both Bun and Node, and validates the Cloudflare credentials before Alchemy runs. Copy `packages/infra/.env.example` to start. Bun's automatic env loading is disabled in `bunfig.toml`, so each process loads its own env file.

## Deployment

### Alchemy

- Target: web on Cloudflare
- Configure provider accounts: `cd packages/infra && bunx alchemy profile edit`
- Dev: bun run dev
- Deploy: bun run deploy
- Destroy: bun run destroy

`alchemy profile edit` stores the selected Axiom, Cloudflare, Neon, PlanetScale, and/or Prisma provider profiles under `~/.alchemy`; no provider-specific setup command is required by this scaffold.

Deploys are staged and default to a personal `dev_<username>` stage. For production, run the deploy with an explicit stage from `packages/infra`:

```bash
cd packages/infra && bunx alchemy deploy --stage production
```

## Git Hooks and Formatting

- Run checks: `bun run check`

## Project Structure

```
halmahera/
├── apps/
│   └── web/         # Fullstack application (Next.js)
├── packages/
│   ├── ui/          # Shared shadcn/ui components and styles
```

## Available Scripts

- `bun run dev`: Start all applications in development mode
- `bun run build`: Build all applications
- `bun run dev:web`: Start only the web application
- `bun run check-types`: Check TypeScript types across all apps
- `bun run check`: Run Oxlint and Oxfmt
