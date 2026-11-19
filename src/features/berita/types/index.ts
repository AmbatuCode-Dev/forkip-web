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
  /** Media-only card (BUSAMAKIP): dark gradient tile, no photo strip. */
  readonly mediaOnly?: boolean;
  /** TODO(page-2): stub entries awaiting real copy from the Figma frame. */
  readonly stub?: boolean;
}

/** Page-size of the /berita paginated news list. */
export const BERITA_PAGE_SIZE = 3;

/** Total number of published posts across all pages ("Total 5 berita…"). */
export const BERITA_TOTAL_ITEMS = 5;
