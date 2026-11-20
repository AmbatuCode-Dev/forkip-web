export interface PageHeroContent {
  readonly breadcrumbLabel: string;
  readonly title: string;
  readonly description: string;
}

export interface PdfFile {
  readonly badge: string;
  readonly name: string;
  readonly href: string;
}

export interface ProgramKerjaItem {
  readonly title: string;
  /** Label for NewsMediaPlaceholder (it renders "Foto {label}"). */
  readonly photoLabel: string;
  readonly photoVariant?: 1 | 2 | 3;
  readonly body?: string;
  /** Cards 4–5 only carry the "Laporan Program Kerja" button (spec). */
  readonly hasArchive: boolean;
}
