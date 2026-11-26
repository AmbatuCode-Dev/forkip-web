export interface PageHeroContent {
  readonly breadcrumbLabel: string;
  readonly title: string;
  readonly description: string;
}

export interface PenyewaanCopy {
  readonly note: string;
  readonly inventarisHeading: string;
}

export interface AdminContactLink {
  readonly label: string;
  readonly href: string;
}

export interface GoogleFormEmbed {
  readonly title: string;
  readonly url: string;
  readonly embedUrl: string;
}

export interface InventarisItem {
  readonly chip: string;
  readonly imageLabel?: string;
  readonly title: string;
  readonly meta: string;
  readonly paragraphs: string[];
  readonly footnote?: string;
  readonly defaultExpanded?: boolean;
}

export interface ContactCta {
  readonly title: string;
  readonly description: string;
  readonly actionLabel: string;
  readonly actionHref: string;
}
