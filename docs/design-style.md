# Design style — Forum KIP-K UNJ / Beranda

CSS extracted from the Figma design (`Forum-KIP-K`, file key `NqZgHhOjq9Rgp81XveFXYz`), focused on the `Section / Program Unggulan` block (`224:3154`) and its compact program cards.

Values come from the node properties read in Figma. A few values marked `†` were derived from node geometry/screenshots rather than an explicit property read.

## Tokens

```css
:root {
  --color-bg: #f4f2ea; /* section background + thumbnail placeholder */
  --color-surface: #ffffff; /* cards */
  --color-ink: #1c1c1c; /* headings, primary text */
  --color-muted: #404040; /* paragraph text */
  --color-accent: #f6d34a; /* buttons, bullets, eyebrow */
  --font-sans: "Plus Jakarta Sans", sans-serif;

  --page-max: 1200px;
  --section-pad-x: 120px;
  --section-pad-y: 112px;
  --section-gap: 64px;
  --grid-gap: 24px;

  --radius-card: 24px;
  --radius-thumb: 16px; /* † */
  --radius-pill: 999px;
}
```

## Base

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-ink);
  font-family: var(--font-sans);
}

img {
  display: block;
  max-width: 100%;
}
```

## Section shell

```css
.section {
  width: 100%;
  max-width: 1440px;
  margin-inline: auto;
  padding: var(--section-pad-y) var(--section-pad-x);
  background: var(--color-bg);
  display: flex;
  flex-direction: column;
  gap: var(--section-gap);
}

.section__inner {
  width: 100%;
  max-width: var(--page-max);
  margin-inline: auto;
}
```

## Section heading

```css
.section-heading {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
}

.section-heading__eyebrow {
  font-size: 13px; /* † */
  font-weight: 600;
  line-height: 16px;
  color: var(--color-accent); /* † */
}

.section-heading__title {
  margin: 0;
  font-size: 40px; /* † */
  font-weight: 800;
  line-height: 50px;
  color: var(--color-ink);
}

.section-heading__subtitle {
  margin: 0 auto;
  max-width: 900px;
  font-size: 18px; /* † */
  font-weight: 400;
  line-height: 28px;
  color: var(--color-muted);
}
```

## Spotlight (Kampung KIP-K UNJ)

```css
.spotlight {
  display: grid;
  grid-template-columns: 676px 460px;
  gap: 64px;
  align-items: center;
}

.spotlight__text {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.spotlight__title {
  margin: 0;
  font-size: 36px;
  font-weight: 800;
  line-height: 44px;
}

.spotlight__body {
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.spotlight__lead {
  font-size: 16px;
  font-weight: 600;
  line-height: 26px;
}

.spotlight__media {
  width: 460px;
  height: 620px;
}

.bullets {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.bullet {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.bullet__dot {
  flex: none;
  width: 8px;
  height: 8px;
  margin-top: 8px;
  border-radius: 50%;
  background: var(--color-accent);
}

.bullet__text {
  font-size: 15px;
  line-height: 24px;
}
```

## Placeholder image

Used for the spotlight photo and for the card thumbnails. It is an editable frame in Figma, not a real photo.

```css
.placeholder-image {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  border: 1px solid var(--color-surface);
  border-radius: 28px;
  color: var(--color-ink);
  font-size: 13px;
  font-weight: 600;
  text-align: center;
}

.placeholder-image--thumb {
  border-radius: var(--radius-thumb);
}
```

## Program card grid

```css
.program-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--grid-gap);
}

.program-card {
  display: flex;
  flex-direction: column;
  min-height: 511px;
  padding: 37px;
  background: var(--color-surface);
  border: 1px solid var(--color-surface);
  border-radius: var(--radius-card);
}

.program-card__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 18px;
}

.program-card__title {
  min-height: 90px; /* fixed so thumbnails align across cards */
  margin: 0;
  font-size: 24px;
  font-weight: 800;
  line-height: 30px;
  color: var(--color-ink);
}

.program-card__thumb {
  width: 100%;
  aspect-ratio: 310 / 170;
}

.program-card__body {
  margin: 0;
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  color: var(--color-muted);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.program-card__cta {
  margin-top: auto;
}
```

## Pill button

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  padding: 13px 24px;
  border: 0;
  border-radius: var(--radius-pill);
  background: var(--color-accent);
  color: var(--color-ink);
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 19px;
  cursor: pointer;
}
```

## Node → class map

| Figma node                                 | Class                                  |
| ------------------------------------------ | -------------------------------------- |
| `224:3154` Section / Program Unggulan      | `.section` / `.section__inner`         |
| `224:3155` Section heading                 | `.section-heading`                     |
| `224:3159` Spotlight / Kampung KIP-K UNJ   | `.spotlight`                           |
| `224:3160` Teks                            | `.spotlight__text`                     |
| `224:3184` Image placeholder (spotlight)   | `.placeholder-image .spotlight__media` |
| `323:709` Program lain (3-column grid)     | `.program-grid`                        |
| `224:3187`, `224:3211`, `323:701` cards    | `.program-card`                        |
| `323:697`, `323:699`, `323:704` thumbnails | `.placeholder-image--thumb`            |
| `224:3209`, `224:3229`, CTA in `323:701`   | `.button`                              |

## Notes

- The typography scale uses only Plus Jakarta Sans: Regular 400, SemiBold 600, ExtraBold 800.
- Card width is 384px at a 1200px content width with three columns and 24px gaps; the thumbnail is the card's full inner width (310px) at 170px tall.
- `-webkit-line-clamp` reproduces the Figma "3 lines + ellipsis" truncation. In Figma the paragraph text itself was shortened with a literal `…`; in HTML/CSS the clamp handles it dynamically.
- The repo currently uses Tailwind v4 in `src/app/globals.css`; these plain-CSS rules can be pasted there or imported as a separate stylesheet. No application code was changed.
