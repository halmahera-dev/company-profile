# 010 — Use the default motion tokens on footer links

- **Status**: TODO
- **Commit**: 834253b
- **Severity**: LOW
- **Category**: Cohesion & tokens
- **Estimated scope**: 1 file, 3 strings

## Problem

The footer links set `duration-150 ease-out`. The default is already `--default-transition-duration: 160ms` with `--ease-out`. The values almost match and drift by 10ms. `design.md` says one duration for every color fade.

```tsx
// apps/web/src/features/profile/components/site-footer.tsx:34, :46, :54 — current
className = "w-fit text-sm transition-colors duration-150 ease-out hover:text-brand-text";
```

## Target

```tsx
className = "w-fit text-sm transition-colors hover:text-brand-text";
```

## Repo conventions to follow

- Exemplar: `packages/ui/src/components/button.tsx:6` and the `link` variant use `transition-[...]` with no duration or curve.

## Steps

1. In `site-footer.tsx`, remove `duration-150 ease-out` from the three `className` strings (lines 34, 46, 54).

## Boundaries

- Do NOT change any other footer class or markup.
- If a string differs from the excerpt, STOP and report.

## Verification

- **Mechanical**: `bun run lint` and `bun run check-types` pass.
- **Feel check**: hover each footer link. The color fades the same as the header buttons (160ms).
- **Done when**: `duration-150` no longer appears in `site-footer.tsx`.
