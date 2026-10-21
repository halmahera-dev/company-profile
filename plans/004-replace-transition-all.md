# 004 — Replace `transition-all` with named properties

- **Status**: TODO
- **Commit**: 834253b
- **Severity**: LOW
- **Category**: Performance
- **Estimated scope**: 6 files, 8 class strings

## Problem

`transition-all` animates every property that changes, including ones nobody planned (layout, shadows, filters). Each place below changes only a few known properties.

| File:line                                                        | Current                                                                                            | What really changes                     |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `packages/ui/src/components/accordion.tsx:32`                    | `... text-sm font-medium transition-all outline-none hover:underline ...`                          | text color only (focus and hover)       |
| `apps/web/src/features/profile/components/team-carousel.tsx:116` | `... bg-muted-foreground/30 transition-all duration-300 ease-in-out motion-reduce:transition-none` | dot width (`w-8` / `w-2`)               |
| `packages/ui/src/components/progress.tsx:39`                     | `className={cn("h-full bg-primary transition-all", className)}`                                    | indicator width (set inline by Base UI) |
| `packages/ui/src/components/switch.tsx:18`                       | `... rounded-full border-2 transition-all outline-none ...`                                        | background and border color, focus ring |
| `packages/ui/src/components/input-otp.tsx:56`                    | `... text-sm transition-all outline-none first:rounded-l-3xl ...`                                  | border color, ring, background          |
| `packages/ui/src/components/navigation-menu.tsx:55`              | `... text-sm font-medium transition-all outline-none hover:bg-muted ...`                           | background and text color               |
| `packages/ui/src/components/navigation-menu.tsx:127`             | `... p-3 text-sm transition-all outline-none hover:bg-muted focus:bg-muted ...`                    | background and text color               |

(`transition-all` in `mode-toggle.tsx` is plan 001.)

## Target

| File:line                    | Replace `transition-all` with                                                        |
| ---------------------------- | ------------------------------------------------------------------------------------ |
| accordion.tsx:32             | `transition-colors`                                                                  |
| team-carousel.tsx:116        | `transition-[width]` (keep `duration-300 ease-in-out motion-reduce:transition-none`) |
| progress.tsx:39              | `transition-[width]`                                                                 |
| switch.tsx:18                | `transition-[color,box-shadow,background-color,border-color]`                        |
| input-otp.tsx:56             | `transition-[color,box-shadow,background-color,border-color]`                        |
| navigation-menu.tsx:55, :127 | `transition-colors`                                                                  |

Duration and curve stay at the global defaults (160ms, `--ease-out`).

## Repo conventions to follow

- Exemplar: `packages/ui/src/components/input.tsx:11` uses `transition-[color,box-shadow,background-color]`.
- `packages/ui/src/components/button.tsx:6` lists exact properties.

## Steps

1. For each row in the Target table, edit that one class in that one string. Nothing else in the string changes.
2. For `progress.tsx`, open the file first. If the indicator does not change `width` (check `ProgressPrimitive.Indicator` usage), STOP and report.
3. For `switch.tsx`, check how the thumb moves (the `after:` classes or a child). If the thumb moves with `translate`, add `translate` to the list: `transition-[color,box-shadow,background-color,border-color,translate]`.

## Boundaries

- Do NOT change any other class, duration, or curve.
- Do NOT edit `accordion.tsx` beyond line 32. Plan 005 edits the chevron in the same file.
- Do NOT add dependencies.
- If a line does not match the excerpt, STOP and report.

## Verification

- **Mechanical**: `bun run lint` and `bun run check-types` pass. `grep -rn "transition-all" apps packages --include='*.tsx'` returns nothing (apart from `design-system/` demo text, if any).
- **Feel check**: run the app and the `/design-system` page.
  - FAQ rows: hover and focus with the keyboard. Text color still fades over 160ms.
  - Switch: toggle it. The thumb and the track still move and change color together.
  - Team page (`/team`) on mobile width: the active dot still widens smoothly.
  - Progress: the bar still grows without a jump.
- **Done when**: no `transition-all` is left in these files.
