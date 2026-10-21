# 005 — Rotate one FAQ chevron, not swap two icons

- **Status**: TODO
- **Commit**: 834253b
- **Severity**: LOW
- **Category**: Missed opportunities
- **Estimated scope**: 1 file, about 10 lines

## Problem

The panel height animates (I checked: about 200ms, `accordion-down` and `accordion-up`). The chevron does not. Two icons swap with `hidden` and `inline`, so the icon jumps while the panel moves.

```tsx
// packages/ui/src/components/accordion.tsx:3 — current
import { ArrowDown01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons";
```

```tsx
// packages/ui/src/components/accordion.tsx:37-49 — current
<HugeiconsIcon
  icon={ArrowDown01Icon}
  strokeWidth={2}
  data-slot="accordion-trigger-icon"
  className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
/>
<HugeiconsIcon
  icon={ArrowUp01Icon}
  strokeWidth={2}
  data-slot="accordion-trigger-icon"
  className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
/>
```

## Target

One icon. It turns 180 degrees when the row opens. `transition-transform` in Tailwind v4 covers `rotate`. It uses the global 160ms and `--ease-out`. Reduced motion: no turn (the icon snaps).

```tsx
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
```

```tsx
<HugeiconsIcon
  icon={ArrowDown01Icon}
  strokeWidth={2}
  data-slot="accordion-trigger-icon"
  className="pointer-events-none shrink-0 motion-safe:transition-transform group-aria-expanded/accordion-trigger:rotate-180"
/>
```

## Repo conventions to follow

- Same idea, already in the repo: `packages/ui/src/components/navigation-menu.tsx:73` rotates its chevron with `group-data-popup-open/...:rotate-180`.
- Plan 004 must be done first (same file, line 32).

## Steps

1. Change the import on line 3 to import only `ArrowDown01Icon`.
2. Delete the second `HugeiconsIcon` (the `ArrowUp01Icon` one).
3. Replace the className of the remaining icon with the target string.

## Boundaries

- Do NOT edit the trigger `className` (line 32) or the panel code.
- Do NOT add new icons or dependencies.
- If the file differs from the excerpts, STOP and report.

## Verification

- **Mechanical**: `bun run lint` and `bun run check-types` pass.
- **Feel check**: open the FAQ on the landing page.
  - Open and close a row. The chevron turns while the panel grows. It should finish about when the panel finishes.
  - Click a row twice quickly. The chevron reverses from where it is, with no restart from zero (it is a transition, so it should).
  - DevTools Animations at 10%: only `rotate` changes on the icon.
  - `prefers-reduced-motion: reduce`: the chevron changes at once, with no turn.
- **Done when**: only one chevron element exists per trigger, and it has `rotate-180` when expanded.
