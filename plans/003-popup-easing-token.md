# 003 — Use the repo ease-out on popups and dialogs

- **Status**: TODO
- **Commit**: 834253b
- **Severity**: MEDIUM
- **Category**: Easing & duration, Cohesion & tokens
- **Estimated scope**: 5 files, 7 class strings

## Problem

`data-open:animate-in` and `data-closed:animate-out` come from tw-animate-css. They set `animation: enter <duration> var(--tw-ease, ease)`. No popup sets `--tw-ease`, so every enter and exit uses the CSS `ease` default. `design.md` says enter and exit use `ease-out`, which is the token `--ease-out` (`cubic-bezier(0.25, 0.46, 0.45, 0.94)`).

Locations (each string has `duration-100` or the default 150ms, plus `animate-in`/`animate-out`, and no `ease-out`):

- `packages/ui/src/components/popover.tsx:34`
- `packages/ui/src/components/hover-card.tsx:35`
- `packages/ui/src/components/tooltip.tsx:40`
- `packages/ui/src/components/dialog.tsx:31` (overlay) and `:53` (content)
- `packages/ui/src/components/alert-dialog.tsx:23` (overlay) and `:45` (content)

```tsx
// packages/ui/src/components/popover.tsx:34 — current (start of string)
"z-50 flex w-72 origin-(--transform-origin) flex-col gap-4 rounded-3xl bg-popover p-4 text-sm text-popover-foreground shadow-lg ring-1 ring-foreground/5 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 ...";
```

## Target

Add the `ease-out` utility next to the duration class. In Tailwind v4 it sets `--tw-ease: var(--ease-out)`, which the animate classes read.

```tsx
// target (popover, same idea for the others)
"z-50 flex w-72 origin-(--transform-origin) ... outline-hidden duration-100 ease-out data-[side=bottom]:slide-in-from-top-2 ...";
```

Do not change any duration. For `tooltip.tsx` (no `duration-*` class), put `ease-out` right after `origin-(--transform-origin)`.

## Repo conventions to follow

- `AGENTS.md`: do not write new cubic-bezier values. Use the tokens in `packages/ui/src/styles/globals.css`.
- Exemplar: `packages/ui/src/components/accordion.tsx:59` already runs on tw-animate's own `ease-out` default for its keyframes.

## Steps

1. In each of the five files, add `ease-out` to the content/overlay class strings listed above. One edit per string, nothing else.

## Boundaries

- Do NOT edit `dropdown-menu.tsx`. Plan 002 does that.
- Do NOT touch `drawer.tsx`, `sheet.tsx`, `toast.tsx` or `navigation-menu.tsx`. They use `transition-*`, not `animate-in`.
- Do NOT change durations, zoom, slide, or markup.
- If a string already contains `ease-`, STOP and report.

## Verification

- **Mechanical**: `bun run lint` and `bun run check-types` pass.
- **Feel check**: open `/design-system` (dev server on port 3001) and open a popover, a dialog, an alert dialog, a hover card and a tooltip.
  - In DevTools, select each open popup and read the computed `animation-timing-function`. It must be `cubic-bezier(0.25, 0.46, 0.45, 0.94)`. If it is `ease`, STOP and report that `ease-out` does not set `--tw-ease` in this setup.
  - Popups should feel the same speed, with a slightly crisper start. Nothing should feel slower.
  - `prefers-reduced-motion: reduce`: dialogs and popups still fade.
- **Done when**: all seven strings contain `ease-out`, and the computed timing function is the token on every popup type.
