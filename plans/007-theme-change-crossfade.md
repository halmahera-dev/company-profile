# 007 — Cross-fade the page when the theme changes

- **Status**: TODO
- **Commit**: 834253b
- **Severity**: LOW
- **Category**: Missed opportunities
- **Estimated scope**: 1 file, about 12 lines

## Problem

`setTheme` flips the whole page at once. Only elements with `transition-colors` (buttons, links) fade over 160ms. The rest snap. The page changes unevenly for a moment. `ThemeProvider` (`apps/web/src/components/providers.tsx:10`) does not set `disableTransitionOnChange`, so this mix is live today.

```tsx
// apps/web/src/components/mode-toggle.tsx:30-34 — current
<DropdownMenuContent align="end">
  <DropdownMenuItem onClick={() => setTheme("light")}>Day</DropdownMenuItem>
  <DropdownMenuItem onClick={() => setTheme("dark")}>Night</DropdownMenuItem>
  <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
</DropdownMenuContent>
```

## Target

Wrap the change in a view transition. `packages/ui/src/styles/globals.css` already sets `::view-transition-old(root)` and `::view-transition-new(root)` to 160ms with `--ease-out`, and turns them off for reduced motion. No new CSS is needed. If the browser has no `startViewTransition`, change the theme directly.

```tsx
import { flushSync } from "react-dom";

function chooseTheme(theme: string) {
  if (!document.startViewTransition) {
    setTheme(theme);
    return;
  }
  document.startViewTransition(function applyTheme() {
    flushSync(function changeTheme() {
      setTheme(theme);
    });
  });
}
```

Menu items call `chooseTheme("light")`, `chooseTheme("dark")`, `chooseTheme("system")`. Define `chooseTheme` inside `ModeToggle`, after the `useTheme()` line.

## Repo conventions to follow

- Regular functions, not arrow functions, except when passed as an argument (`AGENTS.md`). The existing `onClick={() => ...}` lines are arrow functions passed as arguments, so they may stay in that form.
- Plan 001 must be done first (same file).

## Steps

1. Add `import { flushSync } from "react-dom";` to `mode-toggle.tsx`.
2. Add `chooseTheme` inside `ModeToggle`.
3. Replace the three `onClick` handlers to call `chooseTheme`.

## Boundaries

- Do NOT add `disableTransitionOnChange` in `providers.tsx`.
- Do NOT add new CSS or new view-transition names.
- Do NOT touch the orbit canvas (`orbit-scene.tsx`). It already redraws on a `class` change with a `MutationObserver`.
- If the theme does not change inside the callback (see below), STOP and report. Do not add timeouts.

## Verification

- **Mechanical**: `bun run lint` and `bun run check-types` pass.
- **Feel check**: run the app. Switch Day, Night, System.
  - In the console, run `document.startViewTransition(()=>{})` once to confirm the browser supports it.
  - The whole page, including the header glass and the hero canvas, fades between themes in about 160ms. No half-themed frame.
  - The hero canvas shows the new theme colors in the same frame, not a frame later. If it lags, report it.
  - Check `document.documentElement.classList` right after the click. It must already show the new theme.
  - `prefers-reduced-motion: reduce`: the theme changes at once, with no fade.
  - In a browser without view transitions (or with it forced off), the theme still changes.
- **Done when**: the theme change fades as one image, and the fallback path works.
