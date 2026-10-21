# 002 — Let the dropdown menu animate from its trigger

- **Status**: TODO
- **Commit**: 834253b
- **Severity**: MEDIUM
- **Category**: Physicality & origin, Easing & duration
- **Estimated scope**: 1 file, 2 class strings

## Problem

The menu popup has `origin-(--transform-origin)` and `data-open:animate-in` with fade and zoom classes. But it also has `animate-none!`, which sets `animation: none !important`. So the menu never animates. `design.md` says popovers and menus scale from their trigger.

I checked this in the running app. On the header theme menu, sampled every frame for 300ms after the click: `opacity` was `1`, `transform` was `none`, and `animation-name` was `none` from the first frame. The menu pops in with no motion.

The classes are in `packages/ui/src/components/dropdown-menu.tsx`, in the content popup (line 40) and the sub-menu popup (line 134). Each string contains these parts (the rest is omitted):

```
... origin-(--transform-origin) animate-none! overflow-x-hidden ... backdrop-blur-md duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 ... data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95
```

Line 134 has the same `animate-none!` and `duration-100` in the sub-menu popup.

## Target

Remove `animate-none!`. Change `duration-100` to `duration-150`. Add `ease-out`. In Tailwind v4, `ease-out` sets `--tw-ease` to the repo token `--ease-out` (`cubic-bezier(0.25, 0.46, 0.45, 0.94)`), and the tw-animate-css `animate-in`/`animate-out` classes read `--tw-ease`. Without it they use the CSS `ease` default.

```
... origin-(--transform-origin) overflow-x-hidden ... backdrop-blur-md duration-150 ease-out outline-none ...
```

## Repo conventions to follow

- Popover that already has the correct pattern (apart from the curve, see plan 003): `packages/ui/src/components/popover.tsx:34`.
- Menus and popovers scale from the trigger (`origin-(--transform-origin)`), modals stay centered. See `AGENTS.md`, Design Rules.

## Steps

1. In `packages/ui/src/components/dropdown-menu.tsx`, line 40: delete `animate-none!`, replace `duration-100` with `duration-150 ease-out`.
2. Same file, line 134: do the same two edits.

## Boundaries

- Do NOT edit `context-menu.tsx`, `menubar.tsx` or `select.tsx`. They have the same `animate-none!`, but no page uses them. See plans/README.md, open decisions.
- Do NOT remove `backdrop-blur-md` here. That is a design-rule question, not a motion one.
- Do NOT add a new keyframe or a new curve.
- If lines 40 and 134 do not contain `animate-none!`, STOP and report.

## Verification

- **Mechanical**: `bun run lint` and `bun run check-types` pass.
- **Feel check**: run the app (`bun run dev`, port 3001). Click the theme button in the header.
  - The menu scales up a little and fades in, growing from the button's corner, not from its own center.
  - Close it with `Escape`. It scales down and fades, then unmounts. It must not freeze or stay half visible.
  - Click the button quickly five times. The menu must always end in a valid open or closed state.
  - In DevTools, Animations panel at 10%: no flicker or hard edge on the blurred background (`backdrop-blur-md`). Check Safari too if you can. If the blur flickers, STOP and report. Do not remove the blur yourself.
  - In DevTools, the open popup's computed `animation-timing-function` should be `cubic-bezier(0.25, 0.46, 0.45, 0.94)`, not `ease`. If it says `ease`, STOP and report.
  - `prefers-reduced-motion: reduce`: the menu still fades. (The zoom and slide are small; accept them, or report if they bother you.)
- **Done when**: `animate-none!` is gone from `dropdown-menu.tsx`, and the open menu shows an animation name in DevTools.
