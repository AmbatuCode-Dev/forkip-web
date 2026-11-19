# Page 4 styling reference

Extracted from Figma `Forum-KIP-K` (file key `NqZgHhOjq9Rgp81XveFXYz`), page **`218:505` — "Page 4"**. Read-only traversal of 4,387 nodes (1,357 text nodes). Counts indicate how many nodes use each value.

Conventions:
- `rem = px / 16` (default browser root). Both units are shown.
- Colors come from visible SOLID fills/strokes, converted from Figma's 0–1 float RGB to hex.
- `line-height: AUTO` means no explicit pixel line height was set in Figma.
- Spacing values are auto-layout `itemSpacing`, `padding*`, and grid gaps.

## 1. Colors

| Hex | Usage (sample node) | Nodes |
| --- | --- | ---: |
| `#F6D34A` | Primary accent — buttons, tags, dots | 740 |
| `#1C1C1C` | Primary text — headings, wordmark | 602 |
| `#E8E5DA` | Header / border neutral | 417 |
| `#404040` | Secondary text | 388 |
| `#FFFFFF` | Card / page surface, strokes | 350 |
| `#666666` | Tertiary text | 224 |
| `#2B2B2B` | Dark neutral (maps embed) | 188 |
| `#E0B400` | Darker gold — batik background | 110 |
| `#F4F2EA` | Cream section background | 103 |
| `#FBFAF6` | Off-white page background | 98 |
| `#7A5B00` | Dark gold text | 89 |
| `#D4D0C0` | Muted border / chevron | 84 |
| `#E6E6E6` | Placeholder thumbnail gray | 52 |
| `#FFF3C4` | Light yellow note surface | 32 |
| `#E6E3D6` | Map embed tint | 24 |
| `#141414` | Pill background | 15 |
| `#005088` | Faculty tile — FT | 6 |
| `#00A4E4` | Faculty tile — FPsi | 6 |
| `#00A898` | Faculty tile — FBS | 6 |
| `#7A1A7A` | Faculty tile — FMIPA | 6 |
| `#84BC24` | Faculty tile — FIP | 6 |
| `#B25A14` | Faculty tile — FEB | 6 |
| `#D40D12` | Faculty tile — FISH | 6 |
| `#000000` | Black vector | 5 |
| `#0F766E` | Faculty tile — FIKK | 4 |
| `#3D3D3D` | Card text variant | 4 |
| `#B3261E` | Error / PDF accent | 3 |
| `#FCEEEC` | Error surface | 3 |
| `#2F6B3A` | Eligible status text | 1 |
| `#EEF6EC` | Eligible status surface | 1 |

### Color tokens

```css
:root {
  --accent: #f6d34a;
  --accent-dark: #e0b400;
  --accent-ink: #7a5b00;
  --accent-soft: #fff3c4;

  --ink: #1c1c1c;
  --ink-strong: #141414;
  --ink-soft: #2b2b2b;
  --ink-muted: #3d3d3d;
  --text-secondary: #404040;
  --text-tertiary: #666666;

  --surface: #ffffff;
  --surface-off: #fbfaf6;
  --surface-cream: #f4f2ea;
  --surface-sand: #e8e5da;
  --border: #d4d0c0;
  --placeholder: #e6e6e6;

  --success: #2f6b3a;
  --success-bg: #eef6ec;
  --error: #b3261e;
  --error-bg: #fceeec;
}
```

## 2. Typography

**Family:** Plus Jakarta Sans (1,334 of 1,357 text nodes).

**Weights present**

| Weight | Figma style | Nodes |
| ---: | --- | ---: |
| 300 | Light | 1 |
| 400 | Regular | 241 |
| 500 | Medium | 386 |
| 600 | SemiBold | 352 |
| 700 | Bold | 199 |
| 800 | ExtraBold | 155 |

**Line-height units:** `PIXELS` 733 nodes, `AUTO` 624 nodes.

### Type ramp

`letter-spacing` is included only where it is not zero.

| Size (px) | rem | Style / weight | Line height | Letter spacing | Nodes |
| ---: | ---: | --- | --- | --- | ---: |
| 9 | 0.5625 | SemiBold 600 | 20px / 1.25rem | 0 | 48 |
| 10 | 0.625 | SemiBold 600 | 14px / 0.875rem | 0 | 36 |
| 10 | 0.625 | ExtraBold 800 | AUTO | 0 | 2 |
| 10 | 0.625 | Medium 500 | AUTO | 0 | 3 |
| 10 | 0.625 | Bold 700 | AUTO | 1.2px | 3 |
| 11 | 0.6875 | SemiBold 600 | AUTO | 0 | 9 |
| 11 | 0.6875 | Bold 700 | AUTO | 1.2px | 3 |
| 12 | 0.75 | Bold 700 | AUTO | 1.2–1.4px | 42 |
| 12 | 0.75 | Regular 400 | AUTO | 0 | 1 |
| 12 | 0.75 | SemiBold 600 | AUTO | 0 | 5 |
| 12 | 0.75 | SemiBold 600 | 16px / 1rem | 0 | 9 |
| 12 | 0.75 | Regular 400 | 24px / 1.5rem | 0 | 11 |
| 12 | 0.75 | Bold 700 | 24px / 1.5rem | 0 | 1 |
| 13 | 0.8125 | Medium 500 | AUTO | 0 | 55 |
| 13 | 0.8125 | SemiBold 600 | AUTO | 0 | 36 |
| 13 | 0.8125 | SemiBold 600 | 18px / 1.125rem | 0 | 6 |
| 13 | 0.8125 | SemiBold 600 | 20px / 1.25rem | 0 | 17 |
| 13 | 0.8125 | Bold 700 | AUTO | 0 | 15 |
| 14 | 0.875 | Medium 500 | 20px / 1.25rem | 0 | 192 |
| 14 | 0.875 | Medium 500 | AUTO | 0 | 120 |
| 14 | 0.875 | Regular 400 | 20px / 1.25rem | 0 | 48 |
| 14 | 0.875 | Regular 400 | 22px / 1.375rem | 0 | 18 |
| 14 | 0.875 | Regular 400 | 24px / 1.5rem | 0 | 28 |
| 14 | 0.875 | Regular 400 | AUTO | 0 | 3 |
| 14 | 0.875 | SemiBold 600 | 20px / 1.25rem | 0 | 1 |
| 14 | 0.875 | SemiBold 600 | AUTO | 0 | 86 |
| 14 | 0.875 | Bold 700 | AUTO | 0 | 60 |
| 14 | 0.875 | ExtraBold 800 | AUTO | 0 | 14 |
| 15 | 0.9375 | Regular 400 | 24px / 1.5rem | 0 | 64 |
| 15 | 0.9375 | Medium 500 | AUTO | 0 | 1 |
| 15 | 0.9375 | SemiBold 600 | 24px / 1.5rem | 0 | 49 |
| 15 | 0.9375 | SemiBold 600 | AUTO | 0 | 55 |
| 15 | 0.9375 | Bold 700 | 22px / 1.375rem | 0 | 3 |
| 15 | 0.9375 | Bold 700 | AUTO | 0 | 8 |
| 16 | 1 | Medium 500 | 25px / 1.5625rem | 0 | 11 |
| 16 | 1 | Regular 400 | 24px / 1.5rem | 0 | 1 |
| 16 | 1 | Regular 400 | 26px / 1.625rem | 0 | 9 |
| 16 | 1 | SemiBold 600 | 26px / 1.625rem | 0 | 3 |
| 16 | 1 | Bold 700 | 26px / 1.625rem | 0 | 1 |
| 17 | 1.0625 | Medium 500 | 26px / 1.625rem | 0 | 3 |
| 17 | 1.0625 | Bold 700 | 26px / 1.625rem | 0 | 1 |
| 18 | 1.125 | Regular 400 | 24px / 1.5rem | 0 | 5 |
| 18 | 1.125 | Regular 400 | 28px / 1.75rem | 0 | 1 |
| 18 | 1.125 | Medium 500 | 28px / 1.75rem | 0 | 1 |
| 18 | 1.125 | ExtraBold 800 | 28px / 1.75rem | -0.4px | 1 |
| 19 | 1.1875 | ExtraBold 800 | AUTO | -0.4px | 30 |
| 20 | 1.25 | Bold 700 | 26px / 1.625rem | 0 | 6 |
| 20 | 1.25 | Bold 700 | 28px / 1.75rem | 0 | 4 |
| 20 | 1.25 | Bold 700 | AUTO | 0 | 3 |
| 22 | 1.375 | ExtraBold 800 | 28px / 1.75rem | -0.4px | 8 |
| 22 | 1.375 | ExtraBold 800 | 32px / 2rem | -0.4px | 28 |
| 22 | 1.375 | ExtraBold 800 | AUTO | 0 | 24 |
| 24 | 1.5 | ExtraBold 800 | 30px / 1.875rem | -0.4px | 8 |
| 24 | 1.5 | ExtraBold 800 | AUTO | -0.5px | 3 |
| 26 | 1.625 | ExtraBold 800 | 32px / 2rem | -0.5px | 1 |
| 28 | 1.75 | Regular 400 | 32px / 2rem | 0 | 36 |
| 28 | 1.75 | Bold 700 | 38px / 2.375rem | 0 | 1 |
| 28 | 1.75 | ExtraBold 800 | 34px / 2.125rem | -0.6px | 2 |
| 28 | 1.75 | ExtraBold 800 | 36px / 2.25rem | -0.3px | 4 |
| 28 | 1.75 | ExtraBold 800 | AUTO | -0.6px | 1 |
| 30 | 1.875 | ExtraBold 800 | 38px / 2.375rem | -0.3px | 2 |
| 30 | 1.875 | ExtraBold 800 | 40px / 2.5rem | -0.5px | 1 |
| 30 | 1.875 | ExtraBold 800 | AUTO | -0.6px | 3 |
| 32 | 2 | ExtraBold 800 | AUTO | -0.8px | 1 |
| 34 | 2.125 | Bold 700 | 44px / 2.75rem | 0 | 1 |
| 36 | 2.25 | ExtraBold 800 | 44px / 2.75rem | -0.8px | 2 |
| 38 | 2.375 | ExtraBold 800 | 48px / 3rem | -0.5px | 2 |
| 42 | 2.625 | ExtraBold 800 | 50px / 3.125rem | -1px | 7 |
| 52 | 3.25 | ExtraBold 800 | 60px / 3.75rem | -1.4px | 10 |
| 64 | 4 | Light 300 | 72px / 4.5rem | -2px | 1 |
| 64 | 4 | Bold 700 | 72px / 4.5rem | -2px | 1 |

### Common patterns (CSS)

```css
/* Nav / medium label */
font-size: 0.875rem;   /* 14px */
font-weight: 500;
line-height: 1.25rem;  /* 20px */

/* Body / secondary text */
font-size: 0.875rem;   /* 14px */
font-weight: 400;
line-height: 1.25rem;  /* 20px */

/* Body / small copy */
font-size: 0.9375rem;  /* 15px */
font-weight: 400;
line-height: 1.5rem;   /* 24px */

/* Card title */
font-size: 1.5rem;     /* 24px */
font-weight: 800;
line-height: 1.875rem; /* 30px */
letter-spacing: -0.4px;

/* Section heading */
font-size: 2.625rem;   /* 42px */
font-weight: 800;
line-height: 3.125rem; /* 50px */
letter-spacing: -1px;

/* Hero heading */
font-size: 3.25rem;    /* 52px */
font-weight: 800;
line-height: 3.75rem;  /* 60px */
letter-spacing: -1.4px;
```

## 3. Spacing

### Gaps (`itemSpacing` / grid gaps)

| px | rem | Nodes |
| ---: | ---: | ---: |
| 2 | 0.125 | 1 |
| 4 | 0.25 | 88 |
| 6 | 0.375 | 153 |
| 8 | 0.5 | 160 |
| 10 | 0.625 | 102 |
| 12 | 0.75 | 116 |
| 14 | 0.875 | 51 |
| 16 | 1 | 72 |
| 18 | 1.125 | 13 |
| 20 | 1.25 | 23 |
| 22 | 1.375 | 2 |
| 24 | 1.5 | 71 (+3 grid column gaps, 1 grid row gap) |
| 28 | 1.75 | 19 |
| 32 | 2 | 22 |
| 36 | 2.25 | 2 |
| 40 | 2.5 | 6 |
| 48 | 3 | 24 |
| 56 | 3.5 | 14 |
| 64 | 4 | 5 |
| 72 | 4.5 | 1 |

### Padding

| px | rem | Nodes |
| ---: | ---: | ---: |
| 4 | 0.25 | 2 |
| 5 | 0.3125 | 39 |
| 6 | 0.375 | 9 |
| 8 | 0.5 | 60 |
| 9 | 0.5625 | 60 |
| 10 | 0.625 | 9 |
| 11 | 0.6875 | 108 |
| 12 | 0.75 | 10 |
| 13 | 0.8125 | 54 |
| 14 | 0.875 | 18 |
| 16 | 1 | 72 |
| 18 | 1.125 | 7 |
| 22 | 1.375 | 25 |
| 24 | 1.5 | 149 |
| 26 | 1.625 | 8 |
| 28 | 1.75 | 14 |
| 32 | 2 | 6 |
| 36 | 2.25 | 6 |
| 40 | 2.5 | 3 |
| 48 | 3 | 3 |
| 64 | 4 | 10 |
| 72 | 4.5 | 11 |
| 80 | 5 | 12 |
| 88 | 5.5 | 1 |
| 96 | 6 | 5 |
| 112 | 7 | 2 |

### Spacing tokens

```css
:root {
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.5rem;   /* 24px */
  --space-6: 2rem;     /* 32px */
  --space-7: 3rem;     /* 48px */
  --space-8: 4rem;     /* 64px */
  --space-9: 6rem;     /* 96px */
  --space-10: 7rem;    /* 112px */
}
```

## 4. Border radii (bonus)

| px | rem | Nodes | Typical use |
| ---: | ---: | ---: | --- |
| 999 | — | 281 | Pill buttons / badges |
| 24 | 1.5 | 86 | Cards |
| 20 | 1.25 | 34 | Faculty tiles |
| 16 | 1 | 27 | Media / map embeds |
| 14 | 0.875 | 27 | Notes |
| 12 | 0.75 | 8 | Floating dock |
| 10 | 0.625 | 105 | Menu items |
| 8 | 0.5 | 51 | Small chips |
| 6 | 0.375 | 85 | Division labels |
| 4 | 0.25 | 36 | Placeholder images |

## Notes

- 23 text nodes (1.7%) had no resolved font family/style — likely mixed or missing local fonts; omitted from the weight counts.
- One-off type sizes not listed above: 9px SemiBold, 26px ExtraBold, 30px ExtraBold, 38px ExtraBold, 34px Bold, 64px Light/Bold.
- This is a design reference, not generated CSS in the app. No source files were modified.
