# 001 — Stop the theme icons scaling to zero

- **Status**: TODO
- **Commit**: 834253b
- **Severity**: HIGH
- **Category**: Physicality & origin, Performance
- **Estimated scope**: 1 file, 2 lines

## Problem

The sun and moon icons swap with `scale-0` and `transition-all`. Nothing in the real world grows from nothing, and `transition-all` animates properties we did not pick.

```tsx
// apps/web/src/components/mode-toggle.tsx:21-28 — current
<HugeiconsIcon
  icon={Sun03Icon}
  className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
/>
<HugeiconsIcon
  icon={MoonFastWindIcon}
  className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
/>
```

## Target

The hidden icon sits at `scale-75` and `opacity-0`, not `scale-0`. Only `scale`, `rotate` and `opacity` animate. With reduced motion, only `opacity` animates.

```tsx
// target
<HugeiconsIcon
  icon={Sun03Icon}
  className="scale-100 rotate-0 opacity-100 transition-[scale,rotate,opacity] motion-reduce:transition-[opacity] dark:scale-75 dark:-rotate-90 dark:opacity-0"
/>
<HugeiconsIcon
  icon={MoonFastWindIcon}
  className="absolute scale-75 rotate-90 opacity-0 transition-[scale,rotate,opacity] motion-reduce:transition-[opacity] dark:scale-100 dark:rotate-0 dark:opacity-100"
/>
```

Duration and curve come from the global defaults: 160ms and `--ease-out` (`cubic-bezier(0.25, 0.46, 0.45, 0.94)`). Do not add a duration or a curve.

## Repo conventions to follow

- Motion values live in `packages/ui/src/styles/globals.css`. Do not write a new `cubic-bezier`.
- Exemplar of an explicit transition list: `packages/ui/src/components/button.tsx:6` (`transition-[color,background-color,border-color,scale]`).

## Steps

1. In `apps/web/src/components/mode-toggle.tsx`, replace the two `className` strings on the icons with the target strings above.

## Boundaries

- Do NOT touch the `DropdownMenu` code or the `setTheme` calls. Plan 007 changes those.
- Do NOT change icons, sizes, or markup.
- Do NOT add dependencies.
- If lines 21-28 do not match the excerpt, STOP and report.

## Verification

- **Mechanical**: `bun run lint` and `bun run check-types` pass.
- **Feel check**: run the app (`bun run dev`, port 3001). Open the theme menu and switch Day, Night, Day.
  - The icon swap is a short fade with a small scale and turn. Nothing grows from a point.
  - In DevTools, open the Animations panel and set playback to 10%. Confirm only `scale`, `rotate` and `opacity` change on the icons.
  - In the Rendering panel, set `prefers-reduced-motion: reduce`. The icons cross-fade with no turning.
- **Done when**: `transition-all` and `scale-0` no longer appear in `mode-toggle.tsx`.
