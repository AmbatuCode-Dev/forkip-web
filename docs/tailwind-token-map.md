# Tailwind arbitrary-value → token/utility map (Figma parity)

Replace EVERY arbitrary class in your assigned files with the right-hand side. Preserve prefixes (sm:, lg:, hover:, focus-visible:, etc.) and class order semantics. Tokens/utilities already exist in src/app/globals.css — do NOT edit globals.css, except for the documented custom utilities and the semantic font-size/line-height scale (see below). The full-screen hero and Delegasi scrollytelling redesigns added app-level `@utility` rules directly to globals.css (listed under "Custom utilities" below). Those rules are already merged — use them, but do not re-add or remove them.

## Colors
bg-[#F6D34A]→bg-gold · bg-[#E0B400]→bg-gold-dark · bg-[#FBF6DF]→bg-gold-soft · bg-[#FBFAF6]→bg-surface-50 · bg-[#F4F2EA]→bg-surface-100 · bg-[#FFF3C4]→bg-gold-pale · bg-[#1E6E5E]→bg-teal-ink · bg-[#DCEEEA]→bg-teal-pale · bg-[#122338]→bg-navy · bg-[#1F2937]→bg-slate · bg-[#FDFCF8]→bg-cream · bg-[#F3F0E7]→bg-sand · bg-[#E8C4A0]→bg-tan · bg-[#F6E6A8]→bg-olive
text-[#1C1C1C]→text-ink · text-[#2B2B2B]→text-ink-soft · text-[#404040]→text-body · text-[#666666]→text-body-muted · text-[#7A5B00]→text-gold-ink · text-[#E9C94F]→text-gold-bright · text-[#5c4400]→text-gold-deep · text-[#1E6E5E]→text-teal-ink
border-[#E8E5DA]→border-border-sand · border-[#C9A227]→border-gold-outline · border-[#F6D34A]→border-gold · border-[#0F766E]→border-teal · border-[#1E6E5E]→border-teal-ink · border-[#D4D0C0]→border-sand-line
ring-[#7A5B00]→ring-gold-ink · ring-[#F6D34A]→ring-gold
from-[#FBF6DF]→from-gold-soft · from-[#C2705A]→from-clay · via-[#FBF6DF]→via-gold-soft · via-[#F6EFAF]→via-gold-soft-strong · via-[#FAE9A8]→via-gold-mid · via-[#C2705A]→via-clay · to-[#F6EFAF]→to-gold-soft-strong · to-[#F6D34A]→to-gold · to-[#9C9C8C]→to-stone · to-[#E8D9A0]→to-wheat

## Font size (standard semantic scale; no custom text-N tokens)
9px → text-xs (0.75rem) · 10px → text-xs · 11px → text-xs · 13px → text-sm (0.875rem) · 15px → text-base (1rem) · 19px → text-lg (1.125rem) · 22px → text-xl (1.25rem) · 24px → text-2xl (1.5rem) · 26px → text-2xl · 28px → text-3xl (1.875rem) · 32px → text-3xl · 34px → text-4xl (2.25rem) · 38px → text-4xl · 40px → text-4xl · 42px → text-5xl (3rem) · 44px → text-5xl · 52px → text-5xl · 56px → text-6xl (3.75rem)
The numeric `--text-*` tokens were removed from `globals.css`; use the semantic utilities above and preserve any `sm:`/`lg:` prefixes.

## Line height (custom tokens are rem values, 16px = 1rem)
14px → leading-14 (0.875rem) · 17px → leading-17 (1.0625rem) · 18px → leading-18 (1.125rem) · 22px → leading-22 (1.375rem) · 26px → leading-26 (1.625rem) · 38px → leading-38 (2.375rem) · 50px → leading-50 (3.125rem)
16px → leading-4 · 20px → leading-5 · 24px → leading-6 · 32px → leading-8 · 36px → leading-9 · 40px → leading-10 · 44px → leading-11 · 48px → leading-12 · 60px → leading-15
leading-[1.05]→leading-hero (2.8875rem) · lg:leading-[1.1]→lg:leading-hero-lg (4.95rem)

## Tracking
-0.4px→tracking-t04 · -0.5px→tracking-t05 · -0.8px→tracking-t08 · -2px→tracking-t2 · 1.2px→tracking-wide12

## Radius
6px→rounded-md · 10px→rounded-10 · 14px→rounded-14 · 16px→rounded-2xl · 18px→rounded-18 · 20px→rounded-20 · 24px→rounded-3xl

## Shadow
0px_16px_24px_rgba(51,36,31,0.12)→shadow-dropdown · 0_0_40px_rgba(246,211,74,0.45)→shadow-glow · 0_2px_0_rgba(0,0,0,0.04)→shadow-card-sm · 0_-2px_6px_rgba(0,0,0,0.04)→shadow-card-up · 4px_4px_0_#E0B400→shadow-stamp-4 · 6px_6px_0_#E0B400→shadow-stamp-6

## Spacing (px/4)
h-104→h-26 h-140→h-35 h-170→h-42.5 h-188→h-47 h-190→h-47.5 h-260→h-65 h-300→h-75 h-380→h-95 h-420→h-105 h-45→h-11.25 h-51→h-12.75 h-560→h-140 h-72→h-18 h-74→h-18.5
w-230→w-57.5 w-240→w-60 w-280→w-70 w-300→w-75 w-340→w-85 w-420→w-105 w-440→w-110 w-460→w-115 w-640→w-160
w-[62%]→w-62p w-[78%]→w-78p w-[86%]→w-86p
max-w-1100→max-w-275 max-w-1200→max-w-300 max-w-1248→max-w-312 max-w-185→max-w-46.25 max-w-560→max-w-140 max-w-640→max-w-160 max-w-720→max-w-180 max-w-760→max-w-190 max-w-800→max-w-200 max-w-820→max-w-205
min-h-260→min-h-65 min-h-420→min-h-105 min-h-560→min-h-140 min-h-644→min-h-161 min-h-72→min-h-18 min-w-88→min-w-22
mt-10→mt-2.5 mt-47→mt-11.75 pl-144→pl-36 pl-30→pl-7.5 pt-72→pt-18 py-11→py-2.75 py-13→py-3.25 size-38→size-9.5 size-46→size-11.5 -left-58→-left-14.5 top-132→top-33

## Grid templates (keep lg: prefix)
[minmax(0,1fr)_minmax(0,1.05fr)]→cols-hero-a · [minmax(0,1.05fr)_minmax(0,1fr)]→cols-hero-b · [minmax(0,1.45fr)_minmax(0,1fr)]→cols-spotlight · [minmax(0,420px)_1fr]→cols-420 · [minmax(0,420px)_minmax(0,1fr)]→cols-420f · [minmax(0,440px)_minmax(0,1fr)]→cols-440 · [minmax(0,580px)_1fr]→cols-580

## Misc
bg-[radial-gradient(ellipse_at_50%_35%,#6D5A2C_0%,#3B2E13_52%,#1D1709_100%)]→bg-night-radial · text-[clamp(1.1rem,2.7vw,2.6rem)]→text-clamp-hero · backdrop-blur-[2px]→backdrop-blur-2 · transition-[height]→transition-height · border-[10px]→border-10

## Custom utilities (the globals.css exception)

The full-screen hero (`c603044`) and Delegasi scrollytelling (`da044fc`) redesigns define these app-level `@utility` rules directly in `src/app/globals.css`. They are already merged — use them instead of re-introducing arbitrary values; do not re-add or remove them.

object-hero-mobile→object-position 42% 50% (hero photo, phones) · object-hero-desktop→object-position 50% 42% (hero photo, lg+) · inset-hero-photo→top/bottom -4% overscan for the parallax · bg-hero-scrim→top-down ink scrim over the hero photo · bg-hero-scrim-mobile→stronger ink scrim on phones · bg-delegasi-panel→surface-tinted translucent panel (72%)

Preserve prefixes as usual, e.g. `lg:object-hero-desktop` and `max-sm:bg-hero-scrim-mobile`.
