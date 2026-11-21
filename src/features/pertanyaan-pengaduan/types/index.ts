export interface PageHeroContent {
  readonly breadcrumbLabel: string;
  readonly title: string;
  readonly description: string;
}

/** Left rail of the "Kontak delegasi · Indeks fakultas" section. */
export interface KontakDelegasiRail {
  readonly eyebrow: string;
  readonly heading: string;
  readonly caption: string;
}

export interface FacultyContact {
  readonly code: string;
  /** Full faculty name shown under the code in the delegation row. */
  readonly fullName: string;
  /** Faculty row color from docs/figma-specs/missing-pages-spec.md. */
  readonly color: string;
  /** FIKK is an outlined white row in the reference; the rest are filled. */
  readonly outline?: boolean;
}
