# FungsiSection redesign blueprint (2026-11-25)

**Branch**: `feat/home-page-redesign` (from `dev`).
**Scope** (per user answers): new look + animation on the existing Fungsi dan Tujuan section. Content stays verbatim (copy already documented in `docs/figma-specs/pages/beranda-spec.md` §3).
**Tech**: GSAP via ScrollTrigger, no new deps.

## Current state

`src/features/home/components/fungsi-section.tsx` — `bg-white` section, 2-col grid (`lg:cols-hero-b`), H2, subtitle, `ol` of `fungsiItems` (8 items, gold-tinted squares), right-col video (YouTube iframe + label).

## Proposed shape

- Visual: keep the `bg-white` section and 2-col grid; rework the H2 + number column with layered reveal (subtitle fades, H2 with `text-24`→`text-34` per current type ramp, H3-less list preserved), rework right column (video card stays, gets a subtle lift on scroll).
- Layout: same column split, same max-w-300, keep responsive behavior (`items-center`, no extra padding changes).
- Animation (GSAP, `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`):
  - H2 reveal: staggered fade-up of the H2 + subtitle.
  - Numbered items: staggered reveal down the list (one Timeline), disabled under reduced motion.
  - Video panel: reveal on scroll (optional; only if cheap).
  - SSR-safe: `data-fungsi-reveal` on targets; clears via `gsap.context().revert()`.
- Reduced-motion fallback: instantly visible list, no GSAP.
- Fidelity: current color tokens from `docs/design-style.md` (`text-ink`, `text-ink-strong`, `accent-gold`, `gold-ink`, etc. — see `tailwind-token-map.md`).

## Acceptance (TDD seams)

`src/features/home/components/__tests__/fungsi-section.test.tsx`:
1. Heading + subtitle + 8 items + iframe render (any mode).
2. Reduced motion: list items carry no `data-fungsi-reveal` (or are always visible).
3. Motion: reveals are marked pending, fire, and clean up.

Plus e2e in `e2e/beranda.spec.ts`: items visible when scrolled; instant under `prefers-reduced-motion: reduce`.

## Next

Start TDD loop on the seam tests above.
