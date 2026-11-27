export interface PageHeroContent {
  readonly breadcrumbLabel: string;
  readonly title: string;
  readonly description: string;
}

export interface FacultyContact {
  readonly code: string;
  /** Faculty tile color from docs/figma-specs/missing-pages-spec.md. */
  readonly color: string;
  /** FIKK is an outlined white tile in the reference; the rest are filled. */
  readonly outline?: boolean;
}

export interface TransparansiHibah {
  readonly title: string;
  readonly note: string;
  readonly actionLabel: string;
}
