export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export interface SiteConfig {
  readonly name: string;
  readonly description: string;
  readonly nav: readonly NavItem[];
}
