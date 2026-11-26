/**
 * Article detail view-model for /berita/[slug]
 * (docs/figma-specs/article-detail-and-aduan-spec.md §A). Derived from the
 * NewsPost data in src/features/berita; copy stays verbatim from that data.
 */
export interface ArticleMedia {
  /** PlaceholdImage label baked into the ?text= URL and exposed via alt. */
  readonly label: string;
  /** Dark stage badge, e.g. "01 / 04 · Dokumentasi". */
  readonly badge: string;
  /** Caption line below the media stage. */
  readonly caption: string;
}

/** Inline documentation figure between body paragraphs. */
export interface ArticleFigure {
  /** 2-based photo position (01 is the hero media). */
  readonly position: number;
  /** Badge text, e.g. "02 / 04 · Dokumentasi". */
  readonly badge: string;
}

export interface ArticleDetailContent {
  readonly slug: string;
  readonly title: string;
  /** One-line summary under the H1 (spec §A). */
  readonly subtitle: string;
  readonly author: string;
  /** Verbatim uploadedLabel; undefined until the official date exists. */
  readonly uploadedLabel?: string;
  /** e.g. "1 menit baca" (computed from paragraph word count). */
  readonly readTimeLabel: string;
  /** Main "Foto utama" block; null for posts without photos. */
  readonly heroMedia: ArticleMedia | null;
  /** Verbatim paragraphs from the source post. */
  readonly paragraphs: readonly string[];
  /** Inline figures interleaved after paragraphs. */
  readonly figures: readonly ArticleFigure[];
}
