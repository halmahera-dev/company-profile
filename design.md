# DESIGN.md

Live showcase: `/design-system` in `apps/web`. Design tokens live in `packages/ui/src/styles/globals.css`. When they change, update this file in the same change.

This file maps the Halmahera design language to CSS tokens. The values match `packages/ui/src/styles/globals.css`. Dark is the source scheme. Light is warm cream paper `#f2f1ed` on every page. The app defaults to dark.

## 1. Character

- **Quiet by default.** Near-black surfaces in dark, warm cream paper in light, and an 8% hairline. Color is data, not decoration.
- **One rose accent.** Rose marks state, focus, and small highlights. The main action is an ink pill.
- **Pills for controls, 12px for panels.** Buttons, badges, and nav links are pills. Cards, dialogs, and panels are 12px.
- **Flat panels.** A panel sits one step above the page and gets a hairline and a soft top-lit gradient. Only floating layers cast a shadow.
- **Still motion.** Hover changes color only (160ms). Nothing lifts, grows, or bounces. Nothing animates on scroll, except section headings (each blurs in once when it enters view) and selected content blocks (each rises in once, no blur).
- **Plain type.** Inter at 510 for headings and UI. Geist Mono for IDs and dates. Headings are never bold and never uppercase.

## 2. Color

### Source colors

| Token                | Light                       | Dark                        | Use                        |
| -------------------- | --------------------------- | --------------------------- | -------------------------- |
| `--background`       | `#f2f1ed`                   | `#08090a`                   | Page                       |
| `--card`             | `#f7f7f4`                   | `#0f1011`                   | Panel, popover, muted fill |
| `--foreground`       | `#26251e`                   | `#f7f8f8`                   | Ink                        |
| `--muted-foreground` | `#6b675d`                   | `#8a8f98`                   | Meta and help text         |
| `--brand`            | `oklch(64.5% 0.246 16.439)` | same                        | Rose accent                |
| `--brand-foreground` | `#ffffff`                   | same                        | Text on a rose fill        |
| `--brand-text`       | `oklch(51.4% 0.222 16.935)` | `oklch(71.2% 0.194 13.428)` | Small rose text            |
| `--destructive`      | `#c9372c`                   | `#eb5757`                   | Errors and urgency         |
| `--chart-1`          | `--brand`                   | same                        | Series 1                   |
| `--chart-2`          | `#5e6ad2`                   | same                        | Series 2                   |
| `--chart-3`          | `#d4a72c`                   | `#f2c94c`                   | Series 3                   |
| `--chart-4`          | `#3d9a6c`                   | `#4cb782`                   | Series 4                   |
| `--chart-5`          | `#3fa7a7`                   | `#83dcdc`                   | Series 5                   |
| `--hair-alpha`       | `8%`                        | same                        | Hairline strength          |

### Derived roles

These mix from the source colors. They live on `:root` and `.dark` so a dark band recomputes them.

| Role                          | Value                                                  |
| ----------------------------- | ------------------------------------------------------ |
| `--surface-raised`            | `color-mix(card 93%, foreground)`                      |
| `--faint-foreground`          | `color-mix(muted-foreground 62%, background)`          |
| `--primary`                   | `color-mix(foreground 92%, background)`                |
| `--primary-foreground`        | `--background`                                         |
| `--secondary`                 | `--surface-raised`                                     |
| `--muted`                     | `--card`                                               |
| `--accent` (quiet hover wash) | `color-mix(foreground 6%, transparent)`                |
| `--border`                    | `color-mix(foreground var(--hair-alpha), transparent)` |
| `--input`                     | `color-mix(foreground 12%, transparent)`               |
| `--rule`                      | `color-mix(foreground 11%, background)`                |
| `--ring`, `--sidebar-primary` | `--brand`                                              |
| `--popover`                   | `--card`                                               |

Tailwind classes: `bg-brand`, `text-brand-text`, `bg-surface-raised`, `text-faint-foreground`.

**Why rose is `--brand`, not `--accent`:** menus, selects, and comboboxes use `--accent` to highlight the focused item. A rose wash on every menu item is too loud, so `--accent` stays a 6% ink wash and rose has its own token.

### Rules

- Small text needs AA (4.5:1). Use `--brand-text` for small rose text. White on `--brand` is for bold pill labels.
- Rose is for state, focus, links, and small highlights. Do not fill large areas with it.
- The primary action is the ink pill (`--primary`), not rose.
- Red is for urgency and errors only.
- Contrast pairs to check: page, panel, popover, primary pill, brand rose, secondary, muted, raised panel, brand text on page, destructive on page, faint text on page.

## 3. Typography

- **UI and headings:** Inter Variable (`font-sans` and `font-heading`). Fallback: SF Pro Display, system-ui.
- **Data:** Geist Mono (`font-mono`). Fallback: Berkeley Mono, SF Mono, Menlo. Use it for IDs, dates, and figure captions.
- **Weights:** `--font-weight-medium` is 510. `--font-weight-semibold` is 590. Do not use 700.

The type scale is a set of `type-*` utilities in `packages/ui/src/styles/globals.css`. Use them for headings and lead text. Body copy is the `body` rule.

| Token             | Spec                                            | Use                                               |
| ----------------- | ----------------------------------------------- | ------------------------------------------------- |
| `type-display-xl` | clamp 48–72px / 1 / 510 / -0.022em, Inter       | Large page hero                                   |
| `type-display`    | clamp 40–64px / 1 / 510 / -0.022em, Inter       | Page hero. Second line in `text-muted-foreground` |
| `type-headline`   | clamp 36–56px / 1 / 510 / -0.022em, Inter       | Section heads                                     |
| `type-title`      | 20px / 1.3 / 590 / -0.012em, Inter              | Card and block titles                             |
| `type-lead`       | clamp 18–24px / 1.33 / 400 / -0.011em, Inter    | Intro paragraphs                                  |
| body              | 15px / 1.6 / 400 / -0.011em, Inter              | Body copy                                         |
| `type-caption`    | 13px / 1.5, Inter, with `text-muted-foreground` | UI, meta, and help text                           |
| `type-label-mono` | 11px / 1.4, Geist Mono, uppercase               | IDs, dates, figure captions                       |

Buttons use `text-[13px]` at the default size and `font-medium` (510). `CardTitle` uses `type-title`.

Rules:

- Headings sit at 510 with tight tracking. Titles sit at 590. Body sits at 400.
- Headings are never bold and never uppercase. Uppercase is only for `type-label-mono`.
- A strong run-in phrase uses `font-medium`, not `font-bold`.
- Links in body copy use `text-brand-text` with an underline and `underline-offset-4`.

## 4. Shape

`--radius` is `0.5rem`. Each step is pinned in `@theme inline`. Do not derive the scale from `--radius`.

| Token          | Value | Use                                           |
| -------------- | ----- | --------------------------------------------- |
| `rounded-sm`   | 4px   | Inline code, tags                             |
| `rounded-md`   | 6px   | Menu items, sidebar rows                      |
| `rounded-lg`   | 6px   | Tooltips, kbd                                 |
| `rounded-xl`   | 8px   | Small cards, bubbles                          |
| `rounded-2xl`  | 8px   | Fields, alerts, small cards                   |
| `rounded-3xl`  | 12px  | Popovers, menus                               |
| `rounded-4xl`  | 12px  | Cards, dialogs, panels                        |
| `rounded-full` | pill  | Buttons, badges, nav links, switches, avatars |

**Media card:** panel with `rounded-3xl p-3 shadow-card`, image inside with `rounded-2xl aspect-4/3`, title below with `type-title pt-4 px-1`. Hover changes the panel color to `bg-surface-raised`. It does not lift.

## 5. Elevation

Depth is a surface step plus a hairline. Flat panels do not cast a drop shadow.

```css
@theme inline {
  --shadow-card: 0 0 0 1px var(--border);
  --shadow-inset: inset 0 0 0 1px var(--border);
  --shadow-card-lg: var(--shadow-lg);
}

@theme {
  --shadow-2xs: 0 0 #0000;
  --shadow-xs: 0 0 #0000;
  --shadow-sm: 0 0 #0000;
  --shadow-md: 0 2px 32px var(--shadow-ambient), 0 0 0 1px var(--shadow-outline);
  --shadow-lg: var(--shadow-md);
  --shadow-xl: var(--shadow-md);
}
```

| Token          | Use                                                |
| -------------- | -------------------------------------------------- |
| `bg-card`      | Panel, one step up from the page                   |
| `shadow-card`  | Flat panels. This is a hairline, not a drop shadow |
| `shadow-inset` | Raised inner panel (`bg-surface-raised`)           |
| `glass`        | Sticky header only                                 |
| `shadow-lg`    | Floating windows and menus                         |

- **Glass:** `packages/ui/src/styles/globals.css`. Background at 82%, `blur(20px)`. It turns solid for `prefers-reduced-transparency` and `prefers-contrast: more`. High contrast adds a 1px foreground outline. The sticky header adds `border`. Buttons never get glass.
- **Blur exception:** the home hero headline uses `blur-in` once on load. Section headings use `blur-in-view` once when they enter view. No other blur.
- **Floating layers** (popovers, menus, dialogs): `shadow-lg`. Popovers and menus scale from their trigger (`origin-(--transform-origin)`). Modals stay centered.
- **Bands:** a section can sit on `bg-surface-raised/40`. A sunken group uses `rounded-4xl bg-surface-raised shadow-inset`.

## 6. Layout

- Page content: `mx-auto max-w-6xl px-4 sm:px-8`. Text blocks: `max-w-2xl` or `max-w-4xl`.
- Sections: `py-16`, with `scroll-mt-24` under the sticky header.
- Navigation floats: a pill bar, `sticky top-0`, `px-4 pt-4`, `rounded-full border glass`.
- The page header is the only glass surface.

## 7. Components

Components are shadcn/ui on Base UI (style `base-luma`, set in `packages/ui/components.json`). Each one is a file in `packages/ui/src/components/<name>.tsx`. Add more with `bunx shadcn add <name>`, or copy from the `paddy` project, then restyle. ui-sdk stays only for custom primitives that shadcn and Base UI do not have, which today is `hold-button`.

The look lives in the component files, not in global tokens. Soft skeuomorphism is a faint gradient plus a hairline. It is never a heavy bevel or a stack of inner shadows.

### Button

Pill buttons have text only. Do not put arrows or icons inside them. Quiet text links (`variant="link"`) use plain words only, for example "Learn more". Do not use `→`, `•`, or `·` in UI copy. Icon-only buttons (`size="icon*"`) and the loading `Spinner` are allowed.

| Variant       | Use                                       | Look                                                                 |
| ------------- | ----------------------------------------- | -------------------------------------------------------------------- |
| `default`     | Main action ("Save plan", "Choose plan")  | Ink fill with a soft sheen. One per group. Hover fades to foreground |
| `brand`       | Confirm a field action ("Start planting") | Rose fill with a soft sheen. Hover fades 10%                         |
| `secondary`   | Second action ("Save draft")              | Raised fill with a sheen and an inset 1px hairline                   |
| `outline`     | Quiet action over a surface               | Transparent, hairline, accent wash on hover                          |
| `ghost`       | Nav links, toolbar actions                | Muted text, accent wash on hover                                     |
| `destructive` | Delete                                    | Red fill with a soft sheen. Hover fades 10%                          |
| `link`        | Inline links                              | Muted text. Color changes on hover                                   |

The sheen is `linear-gradient(180deg, rgb(255 255 255 / 0.14), transparent)` laid over a solid background color. Hover fades the color, because a gradient cannot transition. There is no inner shadow, no drop shadow and no bevel. The `secondary` hairline is an inset `box-shadow`, not a `border`. A real border would let the gradient paint underneath it and show a seam. The recipe lives in `buttonVariants` (a `cva` call) in `packages/ui/src/components/button.tsx`.

Focus is `ring-3 ring-ring/40`. Press uses the `pressable` utility: scale 0.97 on pointer-down, except when the button opens a popup. The button transition is 150ms on `color`, `background-color`, `border-color`, `box-shadow` and `scale` with `cubic-bezier(0.23, 1, 0.32, 1)`. This is the one place a curve is written in a component, because it is stronger than the global `ease-out`. Under reduced motion the scale is off and colors still fade. Disabled is `opacity-50`.

Live showcase: `/buttons` in the app. Every variant, size and state is on that page.

Sizes: `xs` 24px, `sm` 28px, `default` 32px, `lg` 44px, plus matching `icon` sizes. Default and `sm` use 13px type.

### Badge

`h-5 rounded-full text-xs font-medium`, defined in `packages/ui/src/components/badge.tsx` (a `cva` call). Variants: `default`, `brand` (rose tint with a faint inset ring, for good status), `secondary` (inset hairline), `destructive` (red tint, for urgency), `outline`, `ghost`, `link`.

### Fields

Quiet fields with a hairline. Focus shows a rose ring (`ring-3 ring-ring/40`). Invalid uses `border-destructive` and `ring-destructive/20`.

A field is a label, the control, and either help text (`FieldDescription`) or an error (`FieldError`). Disabled fields use `data-disabled`.

| Control                 | Notes                                                                                                                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Input                   | Placeholder "Field name". States: default, hover, focus, disabled, invalid                                                                                                                        |
| Textarea                | Grows with content. `rounded-2xl`                                                                                                                                                                 |
| Select                  | Custom list and `NativeSelect`                                                                                                                                                                    |
| Input group             | Icon on the start, meta text on the end                                                                                                                                                           |
| Slider                  | Recessed track with a soft inner shadow, ink fill, ink thumb with a sheen and a small drop shadow. Values are arrays, for example `value={[offset]}`. See `packages/ui/src/components/slider.tsx` |
| Checkbox, radio, switch | Horizontal field: control, label, optional description                                                                                                                                            |

### Card

`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` from `packages/ui/src/components/card.tsx`. The card is `bg-card surface-lit rounded-4xl shadow-card` with a faint top-lit gradient (`--edge-light` at 40%, fading out by half height). `shadow-card` is the hairline only. Spacing follows `--card-spacing`. `size="sm"` is the compact card. No drop shadow. Use `surface-lit` on any flat panel that should match the card wash.

### Data

- **Table:** wrap in `rounded-4xl bg-card p-2 shadow-card`. IDs use `font-mono text-xs`. Status uses a badge.
- **Tabs:** pill list. The active trigger has the strongest contrast.
- **Accordion:** `rounded-4xl bg-card px-6 shadow-card`.
- **Progress, skeleton, avatar group, item:** sit inside a card. Skeletons keep the layout still.
- **Empty:** icon, title, one sentence, one primary button.

### Feedback

Short, friendly messages. Red only when something is wrong. Alerts have a default and a `destructive` variant. Toasts use `toast.success` and `toast.error`. A pending task shows `Spinner` next to muted text.

### Sidebar

shadcn `Sidebar` in `packages/ui/src/components/sidebar.tsx`. Wrap the app in `SidebarProvider` (`h-svh min-h-0 overflow-hidden`), then `<Sidebar variant="inset" collapsible="icon">` and a `SidebarInset` that scrolls (`overflow-y-auto overscroll-contain`). Pages inside the inset need `w-full` next to `mx-auto max-w-2xl`, because the inset is a flex column.

- **`inset`** (default): the page takes `--sidebar`, the sidebar has no border, and the main area is a `rounded-4xl shadow-card` panel floating inside it.
- **`sidebar`**: a flat sidebar with a hairline divider and an unframed main area.
- Desktop collapses to a 3rem icon rail with Cmd/Ctrl+B or the trigger. It is not resizable. Collapsed items show a tooltip.
- Below 768px the sidebar becomes a left sheet.
- Active item: neutral `secondary` fill with the soft sheen and an inset hairline, like the secondary button. Inactive items: flat, with an accent wash on hover. Rows scale to 0.97 on press.
- The page header is `PageHeader` (`min-h-14 shrink-0`, sticky, glass). Keep `shrink-0`, or the flex column squashes it.

### Overlays

Floating layers. Each one opens from a secondary button.

| Overlay      | Content                                                |
| ------------ | ------------------------------------------------------ |
| Dialog       | Title, description, ghost cancel, primary save         |
| Alert dialog | Destructive confirm. The cancel action is the safe one |
| Sheet        | Side panel for detail                                  |
| Popover      | A short fact, with a title                             |
| Menu         | Grouped items. Delete is `variant="destructive"`       |
| Tooltip      | A few words                                            |
| Hover card   | A person or org, with one line of meta                 |

## 8. Motion

Motion values live in `packages/ui/src/styles/globals.css`. Do not write new cubic-bezier values in components.

| Token          | Value                              | Use                                                                      |
| -------------- | ---------------------------------- | ------------------------------------------------------------------------ |
| duration       | 160ms                              | Every color fade (the default)                                           |
| `ease-out`     | `cubic-bezier(.25, .46, .45, .94)` | Color fades and enter/exit                                               |
| `ease-in-out`  | `cubic-bezier(.77, 0, .175, 1)`    | Elements that move or resize on screen                                   |
| `pressable`    | scale 0.97, 160ms                  | Press feedback on pointer-down                                           |
| `rise-in`      | 640ms, 12px                        | Hero only, once, 80ms stagger                                            |
| `blur-in`      | 700ms, 8px blur                    | Hero headline only, once, 60ms per word                                  |
| `blur-in-view` | 700ms, 8px blur                    | Section headings, once, when they enter view                             |
| `rise-in-view` | 640ms, 12px rise, no blur          | Content blocks, once, when they enter view; the 12px rise uses `rise-in` |

Rules:

- Hover changes color only. Things do not lift, grow, or bounce on hover.
- Nothing animates on scroll, except section headings (`blur-in-view`, once) and selected content blocks (`rise-in-view`, once).
- When a gesture needs JS physics, use a motion spring: `{ type: "spring", bounce: 0, duration: 0.4 }`. Use `bounce: 0.2` only after a flick or throw. Start from the current on-screen value and pass the release velocity.
- Exception: the home hero moon turns toward the cursor, at most ±20°, with the default spring.
- `prefers-reduced-motion`: replace movement with a short fade (`fade-in`, 300ms). Keep color changes.

## 9. Recipes

Build these from tokens and components only.

- **Floating navbar.** `rounded-full border glass`. Ghost links. One ink CTA on the end.
- **Pricing card.** `Card`, a `type-headline` price, a destructive badge for a short offer, a feature list with rose check icons, a full-width primary button, and a full-width secondary button.
- **Testimonials.** A two-tone `type-headline` (ink line, then `text-muted-foreground`). One `bg-card` card and one `bg-primary` card. Five rose stars, the quote, then an avatar and a name.
- **Sunken panel with media cards.** `rounded-4xl bg-surface-raised shadow-inset`, then the media card pattern from section 4. Horizontal scroll on small screens.
- **Dark band.** A `dark` footer uses the same components on dark tokens. Separate inline links with `size-1.5 rounded-full bg-brand` dots.

## 10. Do and don't

**Do**

- Use the ink pill for the main action. Rose marks state.
- Quiet text links use plain words only. No `→` or `•` in UI copy.
- Separate panels with a hairline, not a shadow.
- Keep one primary button per group.
- Use `type-*` utilities for headings and lead text.

**Don't**

- Don't fill large areas or every button with rose.
- Don't put arrows or icons inside pill buttons.
- Don't use heavy borders or drop shadows on flat panels.
- Don't use bold or uppercase headings.
- Don't animate on hover or on scroll (section headings blur in once, see Motion).
