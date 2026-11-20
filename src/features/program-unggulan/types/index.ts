export interface PageHeroContent {
  readonly breadcrumbLabel: string;
  readonly title: string;
  readonly subtitle: string;
}

export interface ProgramBullet {
  /** Bold lead-in, e.g. "Resiliensi & Kemandirian". */
  readonly label: string;
  /** Text after the bold lead-in. */
  readonly text: string;
}

export interface ProgramSpotlight {
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly bullets: readonly ProgramBullet[];
  readonly closing: string;
  readonly cta: string;
  /** Placeholder href ("#") until the real activity-archive URL is provided. */
  readonly ctaHref: string;
  /**
   * Subject for NewsMediaPlaceholder, which renders "Foto {label}
   * (placeholder)" — the spec's "Foto Kampung KIP-K UNJ" tile.
   */
  readonly photoLabel: string;
}

export interface ProgramCard {
  readonly title: string;
  readonly excerpt: string;
  readonly cta: string;
  /** Placeholder href ("#") until the real activity-archive URL is provided. */
  readonly ctaHref: string;
  /** Subject for NewsMediaPlaceholder ("Foto {label}"). */
  readonly photoLabel: string;
}
