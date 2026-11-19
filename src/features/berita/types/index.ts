/**
 * News post shape for the /berita list (docs/figma-specs/pages/berita-spec.md
 * §Data). Paragraphs are copied verbatim from the Figma frame (berita.png).
 */
export interface NewsPost {
  readonly slug: string;
  readonly title: string;
  readonly uploadedLabel: string;
  readonly photoCount: number;
  readonly paragraphs: readonly string[];
  /** Pill above the title, e.g. "Selesai dilaksanakan & sosialisasi…". */
  readonly tag?: string;
  /** Page the post appears on (1-based) in the /berita list. */
  readonly page: number;
  /** Media-only card (BUSAMAKIP, Gelar KIPK): dark gradient tile, no photo strip. */
  readonly mediaOnly?: boolean;
}

/** Page-size of the /berita paginated news list. */
export const BERITA_PAGE_SIZE = 3;
