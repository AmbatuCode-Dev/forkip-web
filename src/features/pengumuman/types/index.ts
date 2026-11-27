export interface PageHeroContent {
  readonly breadcrumbLabel: string;
  readonly title: string;
  readonly subtitle: string;
}

export interface PengumumanDetailRow {
  readonly label: string;
  readonly value: string;
}

export type PengumumanButtonVariant = "outline" | "gold";

export interface PengumumanButton {
  readonly label: string;
  readonly variant: PengumumanButtonVariant;
  /** Placeholder href ("#") until the real contact/document URL is provided. */
  readonly href: string;
}

export interface Pengumuman {
  readonly id: string;
  /** Gold pill above the title, e.g. "Eligible" or "Pengumuman". */
  readonly tag: string;
  readonly title: string;
  /**
   * Subject for NewsMediaPlaceholder, which renders "Foto {label}
   * (placeholder)" — the spec's "Foto pengumuman" tile.
   */
  readonly photoLabel: string;
  /** Body paragraphs rendered under the title. */
  readonly paragraphs: readonly string[];
  /** Optional lead-in line above the detail rows (SNBP verification card). */
  readonly detailIntro?: string;
  readonly details?: readonly PengumumanDetailRow[];
  /** Closing lines rendered after the body/detail block. */
  readonly lines?: readonly string[];
  /** Gold-tint note (bg-gold-pale), e.g. the SIUKAT reminder. */
  readonly note?: string;
  readonly buttons: readonly PengumumanButton[];
}
