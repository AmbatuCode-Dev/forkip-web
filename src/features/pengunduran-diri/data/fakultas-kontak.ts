import type { FacultyContact } from "../types";

/**
 * Faculty WhatsApp delegation tiles, ordered as in the reference frame.
 * Colors come from docs/design-style.md §1 (faculty tile palette).
 * hrefs are placeholders (TODO: real WhatsApp deep links).
 */
export const fakultasKontak: readonly FacultyContact[] = [
  { code: "FIP", color: "#84BC24", href: "#" },
  { code: "FBS", color: "#00A898", href: "#" },
  { code: "FMIPA", color: "#7A1A7A", href: "#" },
  { code: "FISH", color: "#D40D12", href: "#" },
  { code: "FT", color: "#005088", href: "#" },
  { code: "FPsi", color: "#00A4E4", href: "#" },
  { code: "FEB", color: "#B25A14", href: "#" },
  { code: "FIKK", color: "#0F766E", href: "#" },
];
