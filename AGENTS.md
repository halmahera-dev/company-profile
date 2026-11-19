<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->

## Engineering Preferences

- Pragmatic over perfect. Solve the problem at hand.
- Choose the simplest implementation that fully meets the current requirements. Avoid speculative abstractions, configuration, and indirection.
- Grow the system in layers. Start from the smallest version that works end-to-end, and add each new capability on top of a product that already works. Never trade a working product for unfinished complexity.
- Keep components modular and concerns clearly separated.
- Minimal abstractions. Extract only when a pattern appears 3+ times.
- Explicit over clever. Prefer clear names over comments. Avoid long comments that explain what the code does.
- Write expressive, readable code in React and backend code. Prefer clear names and explicit control flow over shorthand expressions.
- DRY in data-fetching and shared components. Not in one-off pages.
- No unnecessary files. Only create helpers/utils if used in 2+ places.
- Prefer regular functions over arrow functions. Use arrow functions only when passed as an argument or the functions are defined inside a component.
- Keep comments short and limited to intent that clear code cannot express.
- Keep values in the narrowest scope that uses them. Promote a value to a module constant only when it is shared, configurable, or a stable domain concept.
- Do not add `Co-authored-by` trailers to commit messages.

## Design Rules

- Pill buttons have text only. Never put arrows or icons inside them. Quiet text links (`variant="link"`) use plain words only, for example "Learn more". Do not use `→`, `•`, or `·` in UI copy. Icon-only buttons (`size="icon*"`) and the loading `Spinner` are allowed.
- Motion values live in `packages/ui/src/styles/globals.css`. Use the tokens there. Do not write new cubic-bezier values in components.
- Hover changes color only (160ms, `ease-out`). Things do not lift, grow, or bounce on hover, and nothing animates on scroll. Exception: section headings blur in once when they enter view (`blur-in-view`), and selected content blocks rise in once (`rise-in-view`, no blur).
  - Exception: the home hero moon turns toward the cursor (at most ±20°, default spring). It is a deliberate choice. Do not remove it to match this rule.
- Pressable elements use the `pressable` utility (scale 0.97 on pointer-down). Release is fast: 160ms `ease-out`.
- Elements that move or resize on screen use `ease-in-out`. Give each property its own duration when press and resize happen on the same element.
- Popovers and menus scale from their trigger (`origin-(--transform-origin)`). Modals stay centered.
- Blur (`glass`) is for the sticky header only. Exceptions: the home hero headline blurs in one time on load (`blur-in`), and section headings blur in one time when they enter view (`blur-in-view`).
- Prefer native behavior before JS physics. Phone carousels use CSS scroll-snap, which already gives momentum and edge resistance.
- When a gesture needs JS physics, use a `motion` spring: `{ type: "spring", bounce: 0, duration: 0.4 }` by default, and `bounce: 0.2` only after a flick or throw. Start from the current on-screen value and pass the release velocity.
- Respect `prefers-reduced-motion`: replace movement with a short fade, and keep color changes.

## Talking to Human

- When speaking English, always talk in ASD-STE100 Simplified Technical English.
- Constraint yourself not to use C1-C2 sentences and vocabularies. Keep your responses in plain English.
