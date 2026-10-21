# 009 — Add press feedback to the showcase phrases

- **Status**: TODO
- **Commit**: 834253b
- **Severity**: LOW
- **Category**: Physicality & origin (press feedback)
- **Estimated scope**: 1 file, 1 string

## Problem

`AGENTS.md` says pressable elements use the `pressable` utility. The four phrase buttons in the showcase headline do not. Every other pressable control does (`Button`, the hero moon button, the team cards).

```tsx
// apps/web/src/features/home/showcase.tsx:118-121 — current
className={cn(
  "cursor-pointer text-left transition-colors focus-visible:outline-2 focus-visible:outline-ring",
  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
)}
```

## Target

`pressable` is in `globals.css`: scale 0.97 on `:active`, only when motion is allowed. It needs `scale` in the transition list so the release takes 160ms with `--ease-out`.

```tsx
className={cn(
  "cursor-pointer pressable text-left transition-[color,scale] focus-visible:outline-2 focus-visible:outline-ring",
  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
)}
```

## Repo conventions to follow

- Exemplar: `packages/ui/src/components/button.tsx:6` (`pressable` plus `transition-[...,scale]`).

## Steps

1. In `showcase.tsx`, change the first string inside `cn(...)` as shown.

## Boundaries

- Do NOT change the progress bar span, the `aria-pressed` logic, or the click handler.
- If the result looks wrong (see feel check), revert this plan. Do not try a different scale.
- If the lines differ from the excerpt, STOP and report.

## Verification

- **Mechanical**: `bun run lint` and `bun run check-types` pass.
- **Feel check**: on the landing page showcase, press and hold a phrase.
  - The phrase shrinks a little (0.97) and returns in about 160ms on release.
  - This is large display text. Look for blurry text or a visible shift of the underline progress bar. The bar is inside the button, so it scales with it. If it looks off, revert and report.
  - `prefers-reduced-motion: reduce`: no scale.
- **Done when**: the phrase buttons have `pressable` and `transition-[color,scale]`.
