# Home hero spec

Section 1 of the home page. See `site-outline.md` for the copy and `AGENTS.md` for the Design Rules.

## Copy

- **Headline:** Less orbit. More landing.
- **Subline:** A small AI team from Indonesia. We build AI that works in your business, not in a slide deck.
- **Actions:** Book a call (pill button) · See our work → (link)

## Idea

A moon with rings of mono characters that orbit and do nothing. When the user clicks the moon, the inner orbit lands: its characters spiral down and settle on a pad, and the pad lights rose. Less orbit, more landing.

## Layout

- The canvas fills the hero section (`absolute`, not `fixed`).
- The text stack is left-aligned, as in Linear. It uses the left ~5/12 of the `max-w-6xl` container.
- The scene center sits at ~70% of the width. The orbit radius is limited so the rings never enter the text column.
- Background stars may pass behind the text at opacity ≤ 0.15 only.
- The visual box has a fixed aspect ratio, so there is no layout shift.

## Objects

- **Moon:** a skeleton only, with no fill. Latitude and longitude lines plus a hairline outline. The front lines are clear and the back lines are faint. It does not turn.
- **Rings:** 2 rings at different 3D tilts. They are made only of mono characters from this set: `#S08Xx+=-;:. @`.
- **Pad:** a small grid on the moon surface, in the front-facing area. It is faint and unlit at idle.
- All strokes are 0.8px hairlines (`--anatomy-weight`).
- No HUD, no hint text, no corner brackets, no gradient text.

## Color

- Greys come from the `.iso` tokens, so the hero works in both themes. Design dark first because it is the default.
- The main accent is brand rose (`--brand`), used on the lit pad. The hover glow blends rose into a hero-only purple.
- Glow in dark mode uses `globalCompositeOperation = "lighter"`. Light mode uses normal blending, because additive glow does not show on a light background.

## Tech

- Canvas 2D with our own 3D projection (rotate, then perspective-divide, then sort back to front). Characters are drawn with `fillText`.
- No new dependency. Do not use the SVG anatomy kit for the scene, but use its tokens and its drawing style.
- Read the colors from computed CSS custom properties. Read them again when the theme changes.

## Idle motion

- Ring 1 makes one turn in ~60 s. Ring 2 turns the opposite way in ~90 s.
- Each ring changes one character about every 150 ms (data-stream feel).
- No camera motion. Nothing moves on scroll.

## Hover

- Ring characters near the pointer fade from grey to brand rose.
- No glow follows the pointer itself. Within ~90 px of the pointer, ring characters and moon lines (wireframe and outline) light up with a soft glow (`shadowBlur`). The effect is stronger closer to the pointer. The glow color is a diagonal gradient around the pointer, from brand rose (upper left) to purple (lower right). The purple is a hero-only value, `oklch(64.5% 0.24 305)`, at the same lightness as `--brand`. The lit landing pad stays brand rose.
- These are color changes, with a ~160ms `ease-out` fade.
- The moon turns toward the cursor, at most ±20° (0.35 rad) on each axis. It uses the default spring (`bounce: 0`, `0.4 s`) and eases back when the cursor leaves. The pad and the landing cells turn with it. This is a named exception to the hover rule in `AGENTS.md`.
- Reduced motion: the moon does not turn.

## Click: land

- **Target:** the moon only. A transparent `<button aria-label="Land the orbit">` sits over the moon. It has the `pressable` utility, a visible focus ring, and `cursor: pointer`. Enter and Space work. The canvas is `aria-hidden`.
- **Land:** only the inner ring lands. The outer ring keeps its orbit. Each character of the inner ring spirals to its pad cell in ~1.2 s `ease-in-out`, with a stagger. The total time is ~1.6 s. When the last character settles, the pad lights rose with a 160ms `ease-out` color fade.
- **Hold:** 4 s.
- **Return:** the characters rise back into the inner ring in ~1.2 s `ease-in-out`.
- **Interrupt:** a click during flight reverses from the current on-screen positions, with no jump. A click while landed lifts off at once.

## Performance budget

- The headline text is the LCP element, not the canvas.
- The hero adds ≤ 30 KB gz of JS.
- 60 fps at idle on a mid-range Android phone.
- DPR cap of 2.
- The loop stops when the hero is offscreen (`IntersectionObserver`) or the tab is hidden (`visibilitychange`).

## Mobile (below `lg`)

- Stack the content: text first, then the scene as a full-width 1:1 square.
- 40% fewer characters.
- No pointer glow. Tap on the moon still lands the orbit.

## `prefers-reduced-motion`

- Idle: draw one static frame. The rings are frozen and the characters do not change.
- Hover glow stays (color only), and it fades.
- Click: no spiral. The orbit frame crossfades to the landed frame in ~200 ms, then crossfades back after 4 s.

## References

- **neutrack.id (Amadeus):** Canvas 2D with hand-written 3D projection, `fillText` rings, `IntersectionObserver`, reduced-motion check. We copy its tech approach. We do not copy its rainbow text or HUD.
- **OpenAI GPT-6 Astra:** dense glowing particles, probably WebGL. Its density is out of budget, so we use it for mood only.
