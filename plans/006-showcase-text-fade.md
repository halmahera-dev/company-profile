# 006 — Fade the showcase text with its screen

- **Status**: TODO
- **Commit**: 834253b
- **Severity**: MEDIUM
- **Category**: Missed opportunities, Cohesion
- **Estimated scope**: 1 file, 1 line

## Problem

When the active build changes (click, or autoplay every 8s), the device screen fades in, but the text on the left changes at once. The two halves change at different speeds.

```tsx
// apps/web/src/features/home/showcase.tsx:145-148 — current
<div className="grid gap-2">
  <p className="type-label-mono text-muted-foreground">{activeBuild.capability}</p>
  <p className="type-lead text-muted-foreground">{activeBuild.body}</p>
</div>
```

The screen already does this (same file, about line 162):

```tsx
<div key={activeIndex} className="size-full fade-in">
```

## Target

Give the text block the same `key` and the same `fade-in` utility. `fade-in` is in `packages/ui/src/styles/globals.css`: opacity only, 240ms, `--ease-out`. A fade is already the reduced-motion form, so nothing else is needed.

```tsx
<div key={activeIndex} className="grid gap-2 fade-in">
  <p className="type-label-mono text-muted-foreground">{activeBuild.capability}</p>
  <p className="type-lead text-muted-foreground">{activeBuild.body}</p>
</div>
```

## Repo conventions to follow

- Exemplar: the screen wrapper in the same file (`key={activeIndex} ... fade-in`).
- Use the existing `fade-in` utility. Do not write a new keyframe.

## Steps

1. In `showcase.tsx`, edit the opening tag at line 145 as shown. Change nothing inside it.

## Boundaries

- Do NOT edit the headline buttons, the progress bar, `DeviceFrame`, or the screens.
- Do NOT add a stagger or a translate.
- If line 145 is not `<div className="grid gap-2">`, STOP and report.

## Verification

- **Mechanical**: `bun run lint` and `bun run check-types` pass.
- **Feel check**: open the landing page, scroll to the showcase.
  - Click each headline phrase. The text and the screen fade in at the same time.
  - Wait for autoplay. Same result.
  - Click phrases fast. Nothing flashes or stays at half opacity.
  - Check the layout does not jump between builds (the text block height can differ; if it makes the screen move, report it).
  - DevTools Animations at 10%: one `fade-in` on the text, one on the screen, same length.
- **Done when**: the text block has `key={activeIndex}` and `fade-in`.
