export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export interface SiteConfig {
  readonly name: string;
  readonly description: string;
  readonly nav: readonly NavItem[];
}

export interface SiteContent {
  readonly name: string;
  readonly description: string;
}

export interface NavigationRoute {
  readonly label: string;
  readonly shortLabel?: string;
  readonly footerLabel?: string;
}

export interface HeaderLinkEntry {
  readonly kind: "link";
  readonly href: string;
  readonly label: string;
}

export interface HeaderDropdownItem {
  readonly href: string;
  readonly chip: string;
  readonly label: string;
  readonly description: string;
}

export interface HeaderDropdownEntry {
  readonly kind: "dropdown";
  readonly id: "layanan" | "organisasi";
  readonly label: string;
  readonly heading: string;
  readonly items: readonly HeaderDropdownItem[];
}

export type HeaderNavEntry = HeaderLinkEntry | HeaderDropdownEntry;

export interface NavigationContent {
  readonly ctaLabel: string;
  readonly ctaHref: string;
  readonly routes: Readonly<Record<string, NavigationRoute>>;
  readonly header: readonly HeaderNavEntry[];
  readonly footer: {
    readonly menu: readonly string[];
    readonly lainnya: readonly string[];
  };
}

export interface FacultyRecord {
  readonly code: string;
  readonly name: string;
  readonly color: string;
  readonly order: number;
  readonly outline?: boolean;
  readonly whatsappHref?: string;
}

export interface ProgramSpotlightContent {
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly bullets: readonly {
    readonly label: string;
    readonly text: string;
  }[];
  readonly closing: string;
  readonly cta: string;
  readonly photoLabel: string;
  readonly ctaHref?: string;
}

export interface ProgramCardContent {
  readonly order: number;
  readonly title: string;
  readonly excerpt: string;
  readonly cta: string;
  readonly photoLabel: string;
  readonly ctaHref?: string;
}

export interface NewsPostContent {
  readonly order: number;
  readonly slug: string;
  readonly title: string;
  readonly uploadedLabel?: string;
  readonly photoCount: number;
  readonly page: number;
  readonly gallery?: {
    readonly badge?: string;
    readonly caption: string;
  };
  readonly paragraphs: readonly string[];
}

export interface HomeBeritaContent {
  readonly title: string;
  readonly subtitle: string;
  readonly featureSlug: string;
  readonly teaserSlugs: readonly string[];
  readonly ctaLabel: string;
  readonly ctaButton: string;
  readonly ctaHref: string;
}
