# Animation plans

Written at commit `834253b`. Each plan is self-contained. Run them in the order below.

| #   | Title                                          | Severity | Status           |
| --- | ---------------------------------------------- | -------- | ---------------- |
| 001 | Stop the theme icons scaling to zero           | HIGH     | DONE in worktree |
| 002 | Let the dropdown menu animate from its trigger | MEDIUM   | DONE in worktree |
| 003 | Use the repo ease-out on popups and dialogs    | MEDIUM   | DONE in worktree |
| 006 | Fade the showcase text with its screen         | MEDIUM   | DONE in worktree |
| 004 | Replace `transition-all` with named properties | LOW      | DONE in worktree |
| 005 | Rotate one FAQ chevron, not swap two icons     | LOW      | DONE in worktree |
| 007 | Cross-fade the page when the theme changes     | LOW      | DONE in worktree |
| 008 | Fade disabled buttons instead of snapping      | LOW      | DONE in worktree |
| 009 | Add press feedback to the showcase phrases     | LOW      | DONE in worktree |
| 010 | Use the default motion tokens on footer links  | LOW      | DONE in worktree |

## Order and dependencies

- 001 before 007 (same file, `mode-toggle.tsx`).
- 004 before 005 (same file, `accordion.tsx`).
- 002 and 003 are independent. Do 002 first: it proves that `ease-out` sets `--tw-ease`, which 003 relies on.
- 006, 008, 009, 010 have no dependencies.

## Open decisions (no plan written)

- `context-menu.tsx`, `menubar.tsx` and `select.tsx` have the same `animate-none!` as the dropdown menu. No page uses them. If plan 002 works well, repeat it there.
- `toast.tsx:72`, `drawer.tsx:71,111,142` and `navigation-menu.tsx:109` write their own `cubic-bezier(...)`. `design.md` says not to. They are probably tuned for swipe physics, so I did not plan a swap. Decide first whether to add shared tokens (for example `--ease-drawer`).
- The dropdown menu uses `backdrop-blur-md`. `design.md` says blur is for the sticky header only. This is a design question, not motion.

## Cleared (no finding)

Hero (`blur-in`, `rise-in`, glitch), the orbit canvas (pauses off screen, respects reduced motion), the device frame (`transition-device`, a documented choice), carousel scroll (native), accordion height (checked: animates), iso figures (reduced motion handled), not-found orrery.

## Execution notes

Executed in branch `worktree-agent-af9c70bdf38fe2ee9` (uncommitted). `bun run lint` and `bun run check-types` pass.

- The lint rule `shadcn/no-arbitrary-values` bans `transition-[...]` in `apps/web`. So plans 001 and 009 use the named `transition` utility (with `motion-reduce:transition-opacity` in 001). Plan 004 left `transition-all` on the team-carousel dot (`team-carousel.tsx:116`) for the same reason.
- Not checked in a browser: plan 003 on dialog, tooltip and hover card; Safari blur flicker (002); reduced-motion paths; the FAQ chevron (005); the showcase fade (006); press scale (009); disabled fade (008); footer hover (010).
- Plan 007: one test run left the theme on dark when the menu was still closing. Re-check it by hand.
