---
status: accepted
---

# Keep mobile-first responsive styling

The responsive pass across all thirteen routes keeps the existing mobile-first approach: base styles target screens below 640px, and the sm, md, lg and xl tiers add layout as width grows. We considered switching to desktop-first overrides, but rejected it because every component already uses min-width utilities and mixing the two systems would create overlapping rules. The two existing `max-sm` usages are converted to min-width equivalents, and new responsive work should follow the additive pattern.
