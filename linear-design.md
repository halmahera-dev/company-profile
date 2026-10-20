---
version: "alpha"
name: "Linear"
description: "Near-black product-system page: 510-weight Inter, 8% hairlines, grey-on-grey panels and a hand-drawn app mock under a soft stage glow."
colors:
  primary: "#5e6ad2"
  on-primary: "#ffffff"
  surface: "#08090a"
  surface-container: "#0f1011"
  on-surface: "#f7f8f8"
  on-surface-variant: "#8a8f98"
  outline: "#1d1e1f"
  ink: "#08090a"
  lime: "#e4f222"
  sky: "#cfe3ff"
  lav: "#ece3fd"
  green: "#4cb782"
  red: "#eb5757"
  yellow: "#f2c94c"
  pink: "#f79ce0"
  teal: "#83dcdc"
typography:
  headline-display:
    fontFamily: "Inter"
    fontSize: 64px
    fontWeight: 510
    lineHeight: 1
    letterSpacing: -0.022em
  headline-lg:
    fontFamily: "Inter"
    fontSize: 48px
    fontWeight: 510
    lineHeight: 1
    letterSpacing: -0.022em
  body-md:
    fontFamily: "Inter"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.6
  label-md:
    fontFamily: "Inter"
    fontSize: 13px
    fontWeight: 510
  label-mono:
    fontFamily: "Geist Mono"
    fontSize: 11px
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  full: 9999px
spacing:
  unit: 4px
  section: 160px
  max-width: 1280px
---

# Lunear

> A near-black product page that sells software by drawing the software: one enormous grey-on-grey app window, 510-weight headlines, and hairlines at 8% white.

Source: https://flavors.design/f/lunear

The intended faces are Inter Variable (at the in-between weight 510) and Berkeley Mono. Inter is on Google Fonts and loaded as a variable font so 510 and 590 render exactly; Geist Mono stands in for the commercial Berkeley Mono (same narrow, squared skeleton) and is listed first in the stack with Berkeley second.

## Overview

Lunear is the "system for product development" look: a page so quiet it reads as an extension of the app. The background is `#08090a`, a hair off black; every panel is `#0f1011` with a 1px white-at-8% hairline; text is three greys (`#f7f8f8`, a blended `--fg-2`, `#8a8f98`) and almost nothing else. Headlines sit at the odd weight 510 with -0.022em tracking, which is what makes them feel engineered rather than bold. The emotion is calm authority: a tool for people who ship and resent noise. The product is **drawn, not screenshotted**: sidebar, issue page, agent chat, kanban board, diff viewer, all in divs and 13px type. It is not neon, not gradient-mesh, not glassmorphism; the only colour on the page lives inside the mocks (status rings, label dots, syntax) and in two pastel/lime testimonial cards.

## Colors

| Role      | Value                                                        | Notes                                                   |
| --------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| bg        | `#08090a`                                                    | page; never pure black                                  |
| bg-2      | `#0f1011`                                                    | every panel, card, app window                           |
| fg        | `#f7f8f8`                                                    | headlines, active items                                 |
| fg-muted  | `#8a8f98`                                                    | nav links, body copy, the second half of the statement  |
| accent    | `#5e6ad2`                                                    | indigo: send button, billing toggle, @mention, Done dot |
| accent-fg | `#ffffff`                                                    | ink on indigo                                           |
| border    | `color-mix(in srgb,var(--fg) var(--hair-alpha),transparent)` | every hairline, alpha is a knob (8%)                    |
| ink       | `#08090a`                                                    | dark text on the pastel and lime quote cards            |
| lime      | `#e4f222`                                                    | one testimonial card, full bleed                        |
| sky / lav | `#cfe3ff` / `#ece3fd`                                        | the 170deg pastel gradient testimonial                  |
| green     | `#4cb782`                                                    | In Review ring, diff additions, status dot              |
| red       | `#eb5757`                                                    | Bug label, diff removals, newest changelog dot          |
| yellow    | `#f2c94c`                                                    | In Progress half-ring, star                             |
| pink/teal | `#f79ce0` / `#83dcdc`                                        | syntax keywords / entities                              |

Scheme: dark. Contrast rule: headlines ~19:1, muted `#8a8f98` ~6:1 on bg, tertiary grey (`--fg-3`) only for captions, IDs and timestamps.
Color rules: colour is data, never decoration. Status rings, label dots and syntax carry the palette; sections never get coloured backgrounds except the two quote cards. No literal outside `:root`: tints are `color-mix()` off tokens (`--fg-2`, `--fg-3`, `--bg-3`, `--rule`).

## Typography

- Display: `"Inter", "Inter Variable", "SF Pro Display", system-ui, sans-serif` at weight 510, tracking -0.022em, sentence case, line-height 1.0. h1 64px, section h2 48px, final CTA 72px
- Body: same stack, 15px/1.6, tracking -0.011em; section intros 24px/1.33 in `--fg-2`
- Mono: `"Geist Mono", "Berkeley Mono", ui-monospace` for FIG captions, issue IDs, branch names, dates and the logo-strip caption, 11px uppercase with no extra tracking
- Scale: 11 / 12 / 13 / 15 / 20 / 24 / 32 / 48 / 64 / 72
- Load: `<link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..700&family=Geist+Mono:wght@400;500&display=swap">`
- Rules: UI inside the mocks is 13px with 510 for labels and 590 for issue titles. The long statement headline sets the first sentence in `--fg` and the rest in `--fg-muted` at the same size. Never uppercase a heading; never go above 600 outside the wordmark.

## Layout

- Max width 1280px content, 32px gutters (20px under 820px); the app stage breaks out to 1320px
- Base unit 4px; spacing scale 4 / 8 / 12 / 16 / 24 / 32 / 40 / 48 / 72 / 88 / 120 / 160
- Section rhythm 160px (`--section`), and each big section closes with a full-width 1px `--rule` line
- Hero: 200px of empty top, a two-line 64px h1 at ~900px, then a row with the subhead left and a "New · feature →" link flush right, then the app window
- Section header: two columns, 48px two-line title left, 24px intro + "Learn more →" right; a drawn demo below; then a "Features" label with a two-column `+` list split by a vertical hairline
- Grid: 3-up FIG columns and pricing tiers split by vertical hairlines (no cards), 4-up changelog timeline, 4-up stats, 6-column footer with the logo in column one
- Density: airy outside, dense inside. Huge gaps between sections, 13px type and 30px rows inside every mock

## Elevation & Depth

Tonal layers on near-black. Depth is a one-step surface change plus a hairline, with a single soft shadow under floating windows and one radial glow under the hero stage.

- Hairline: `border: 1px solid color-mix(in srgb, var(--fg) 8%, transparent)` on the app window, sidebar edge, toolbars, agent panel, comment cards, kanban cards, chips, code chips and the header's bottom edge. Section dividers use the opaque `--rule` (`color-mix(in srgb, var(--fg) 11%, var(--bg))`).
- Floating windows (app, agent panel, chat thread): `box-shadow: 0 2px 32px color-mix(in srgb, var(--bg) 60%, transparent), 0 0 0 1px color-mix(in srgb, var(--bg) 40%, transparent)` — a dark ambient plus a black outer ring outside the hairline.
- Stage glow: `.stage` carries `radial-gradient(55% 60% at 50% 100%, color-mix(in srgb, var(--fg) var(--glow), transparent), transparent 72%)`, a grey spotlight rising under the app window's bottom edge.
- Header: sticky, `background: color-mix(in srgb, var(--bg) 82%, transparent)`, `backdrop-filter: blur(20px)`, 1px bottom hairline. The only blur on the page.
- Inside mocks: active sidebar row and group headers are `color-mix(in srgb, var(--fg) 6%, transparent)` / 4%; chat bubbles are `--bg-3` with a 1px dark ring; the send button has `0 0 0 2px` accent at 40%.
- Forbidden: coloured glows, gradients on cards, borders above ~12% white, shadows under anything that is not a floating window.

## Shapes

- Radius: pill (9999px) for nav links, every button and label chips; 12px (`--panel-radius`) for the app window, agent panel, quote cards and code viewer; 9px for comment cards; 8px (`--radius`) for kanban cards, bubbles and reply boxes; 6px for sidebar rows; 4px for inline `code` and model tags
- Testimonial row: cards at 12px inside a 20px outer frame with 12px padding (a frame-in-frame)
- Status icons are 13px circles: empty ring (Todo), half-filled conic ring (In Progress), three-quarter ring (In Review), solid disc (Done)
- The FIG illustrations are 1px isometric line drawings: a stack of plates with a striped sun, four cubes in a dashed frame, a descending row of vertical fins

## Components

- Nav: 72px sticky bar, wordmark (22px cratered-moon mark + 20px/600 name) left; 13px muted links at 12px horizontal padding, a 1px×16px divider, "Log in", then a light pill "Sign up" (32px tall, 13px/510, `color-mix(fg 92%, bg)` fill, dark text)
- Buttons: primary is the light pill; secondary is `--bg-3` with a hairline and light text. CTA size is 44px tall, 16px text, 20px padding. No arrows inside buttons; arrows live on quiet text links ("Learn more →", "View all →") in `--fg-muted` that brighten on hover
- App mock: 240px sidebar (workspace switcher, icon rows, "Workspace ▾" / "Favorites ▾" group labels, active row on a 6% fill) + main pane (44px toolbar with issue ID, title, star and pager; a document with a 20px/590 title, activity events with 16px avatars, a comment card) + a floating agent panel (model tag, right-aligned request bubble, "added to context" line, "Worked for 12 sec ▸", a draft-PR card with a mono branch, reply box)
- Kanban: columns headed by a status ring + name + count; cards with a mono ID, 13px/510 title and pill chips with a coloured 7px dot; the board masks out to the right
- Diff viewer: issue list on the left (group bars, priority bars, mono IDs, status rings); right pane with a mono file path header and 24px code rows; removed lines tinted red at 10% with a 1px red left rule, added lines green at 9%
- Changelog: 4-column timeline, 18px ringed dots joined by a 1px rule; the newest dot is red. Titles 15px/510, 2-line clamped body, mono uppercase date
- Testimonials: tall 480px cards, 32px/400 quote with a hanging open quote, author row at the bottom with a 36px ringed monogram, a vertical hairline and name/role; one pastel gradient card with a faint ring motif, one lime, one dark
- Pricing: three columns split by vertical rules (no boxes), 24px tier name, price with "per seat/month" muted, hairline, billing line (indigo toggle on paid tiers), check-circle list, full-width pill button; the highlighted tier gets a 4% top wash
- FAQ: `details` rows split by `--rule`, 17px/510 questions, `+` rotating to `×`

## Do's and Don'ts

- Do draw the product in HTML at 13px: sidebar, issue page, board, diff. It is the hero image and the feature art.
- Do set every headline at 510 with -0.022em tracking and line-height 1.
- Do split long statements into a white first sentence and a muted remainder at the same size.
- Do separate columns with vertical 1px rules instead of card boxes.
- Do keep colour inside the mocks: status rings, label dots, syntax.
- Do end each major section with a full-width hairline and 160px of air.
- Do caption diagrams and dates in 11px mono uppercase.

- Don't use bold (700) headlines or uppercase headings.
- Don't give sections coloured backgrounds; only the quote cards get colour.
- Don't put arrows or icons inside the pill buttons.
- Don't use pure `#000` or pure white; the page is `#08090a` and text is `#f7f8f8`.
- Don't add drop shadows to flat cards; only floating windows get the ambient shadow.
- Don't animate on scroll or bounce; hovers are colour fades.
- Don't hardcode a colour outside `:root`.

## Motion

- Duration 160ms (links 100ms), easing `cubic-bezier(.25, .46, .45, .94)`
- What animates: link and nav colour, button background, FAQ `+` rotation, a one-time 12px rise on the hero headline, subhead and app window (0 / 80 / 160ms stagger), a blinking composer caret
- What never animates: the mocks' layout, the board, section entrances on scroll
- Signature move: the hero settles in one soft rise and then nothing else moves
- All of it inside `@media (prefers-reduced-motion: no-preference)`

## Tweaks

Five knobs. `--glow` (0–60%) is the strength of the grey spotlight under the app stage; `--hair-alpha` drives every hairline; `--head-weight` and `--head-track` set every headline's weight and tracking (510 / -0.022em is the look); `--panel-radius` rounds the app window, agent panel, quote cards and code viewer. Schemes: Daylight, Indigo night, Ember, Moss — each sets every colour literal on `:root`.

## Reference CSS

```css
:root {
  --bg: #08090a;
  --bg-2: #0f1011;
  --fg: #f7f8f8;
  --fg-muted: #8a8f98;
  --accent: #5e6ad2;
  --accent-fg: #ffffff;
  --lime: #e4f222;
  --sky: #cfe3ff;
  --lav: #ece3fd;
  --green: #4cb782;
  --red: #eb5757;
  --yellow: #f2c94c;
  --pink: #f79ce0;
  --teal: #83dcdc;
  --ink: #08090a;
  --border: color-mix(in srgb, var(--fg) var(--hair-alpha), transparent);
  --fg-2: color-mix(in srgb, var(--fg) 80%, var(--fg-muted));
  --fg-3: color-mix(in srgb, var(--fg-muted) 62%, var(--bg));
  --bg-3: color-mix(in srgb, var(--bg-2) 93%, var(--fg));
  --rule: color-mix(in srgb, var(--fg) 11%, var(--bg));
  --f2: color-mix(in srgb, var(--fg) 2%, transparent);
  --f4: color-mix(in srgb, var(--fg) 4%, transparent);
  --f6: color-mix(in srgb, var(--fg) 6%, transparent);
  --peach: color-mix(in srgb, var(--yellow) 55%, var(--red));
  --font-display: "Inter", "Inter Variable", "SF Pro Display", system-ui, sans-serif;
  --font-body: "Inter", "Inter Variable", "SF Pro Display", system-ui, sans-serif;
  --font-mono: "Geist Mono", "Berkeley Mono", ui-monospace, "SF Mono", Menlo, monospace;
  --radius: 8px;
  --radius-sm: 4px;
  --radius-md: 9px;
  --radius-lg: 12px;
  --radius-pill: 9999px;
  --space-1: 4px;
  --space-8: 160px;
  --shadow:
    0 2px 32px color-mix(in srgb, var(--bg) 60%, transparent),
    0 0 0 1px color-mix(in srgb, var(--bg) 40%, transparent);
  --ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --dur: 160ms;
  --max-width: 1280px;
  --section: 160px;
  --hair-alpha: 8%;
  --glow: 34%;
  --head-weight: 510;
  --head-track: -0.022em;
  --panel-radius: 12px;
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 13px;
  border-radius: var(--radius-pill);
  border: 1px solid color-mix(in srgb, var(--fg) 92%, var(--bg));
  background: color-mix(in srgb, var(--fg) 92%, var(--bg));
  color: var(--bg);
  font: 510 13px/1 var(--font-body);
}
.app {
  display: grid;
  grid-template-columns: 240px 1fr;
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  background: var(--bg-2);
  box-shadow: var(--shadow);
  overflow: hidden;
  font-size: 13px;
}
.sh h2 {
  font-size: 48px;
  line-height: 1;
  font-weight: var(--head-weight);
  letter-spacing: var(--head-track);
}
```

## Reference markup

```html
<section class="sec">
  <div class="sh">
    <h2>Intake<br />and telemetry</h2>
    <div>
      <p>Radio chatter, sensor alarms and crew notes become routed, labelled issues.</p>
      <a href="#" class="lm">Learn more →</a>
    </div>
  </div>
  <div class="board">
    <div class="col">
      <div class="x"><span class="st p"></span>In Progress <span class="mu">3</span></div>
      <div class="card">
        <span class="m">LUN-1487</span>
        <h5>Drop raw IMU frames from uplink</h5>
        <div class="chips x"><span class="chip" style="--c:var(--red)">Bug</span></div>
      </div>
    </div>
  </div>
  <div class="fl">
    <span class="mu">Features</span>
    <ul>
      <li>Faults</li>
      <li>Sorties</li>
    </ul>
  </div>
</section>
```

## How to apply this flavor

1. Replace the target page's design tokens with the palette, fonts and spacing above.
2. Restyle components to match the Components section; keep the page's content and structure.
3. Apply the motion rules; remove any animation not described here.
4. Check the Don't list before finishing.
