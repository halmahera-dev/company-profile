# 008 — Fade disabled buttons instead of snapping

- **Status**: TODO
- **Commit**: 834253b
- **Severity**: LOW
- **Category**: Missed opportunities
- **Estimated scope**: 1 file, 1 token

## Problem

`Button` has `disabled:opacity-50`, but `opacity` is not in its transition list. When the carousel reaches the first or last card (`apps/web/src/features/home/what-we-build-scroller.tsx:873-898`), the Previous or Next arrow snaps to half opacity.

```tsx
// packages/ui/src/components/button.tsx:6 — current (part of string)
"group/button inline-flex shrink-0 pressable ... transition-[color,background-color,border-color,scale] outline-none ... disabled:pointer-events-none disabled:opacity-50 ...";
```

## Target

```tsx
transition - [color, background - color, border - color, scale, opacity];
```

Same global 160ms and `--ease-out`.

## Repo conventions to follow

- Motion values live in `globals.css`. Add no duration or curve here.

## Steps

1. In `packages/ui/src/components/button.tsx` line 6, add `,opacity` inside the `transition-[...]` list.

## Boundaries

- Do NOT edit the variants, sizes, or `disabled:` classes.
- This change reaches every Button in the app. That is on purpose.
- If the transition list is not as shown, STOP and report.

## Verification

- **Mechanical**: `bun run lint` and `bun run check-types` pass.
- **Feel check**: on the landing page, go to "One team for every part of the business". Press Next until the last card.
  - The Next arrow fades to 50% in 160ms. Previous fades back in at the start.
  - Hover and press on any Button still look the same.
  - `prefers-reduced-motion: reduce`: the fade is fine to keep (it is opacity only).
- **Done when**: `opacity` is in the Button transition list.
