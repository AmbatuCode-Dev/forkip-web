export interface Faculty {
  code: string;
}

export interface NumberedItem {
  text: string;
}

export interface SectionIntro {
  title: string;
  subtitle?: string;
}

export type ServiceDivisionTag =
  | "KIF"
  | "BKK"
  | "Advokasi"
  | "Pengumuman"
  | "KIP"
  | "Arsip";

export type ServiceIcon =
  | "question"
  | "rental"
  | "wallet"
  | "verification"
  | "withdrawal"
  | "archive";

export interface Service {
  division: ServiceDivisionTag;
  title: string;
  description: string;
  href: string;
  icon: ServiceIcon;
}

export interface Division {
  chip: string;
  title: string;
  body: string;
  /** BPHI opens by default per the Beranda design. */
  defaultExpanded?: boolean;
}

export interface ProgramBullet {
  /** Bold lead-in, e.g. "Resiliensi & Kemandirian". */
  label: string;
  /** Text after the bold lead-in. */
  text: string;
}

export interface ProgramSpotlight {
  title: string;
  paragraphs: string[];
  bullets: ProgramBullet[];
  closing: string;
  cta: string;
  photoLabel: string;
}

export interface ProgramCard {
  title: string;
  excerpt: string;
  cta: string;
  photoLabel: string;
}

export interface NewsTeaser {
  title: string;
  summary: string;
}

export interface NewsFeature {
  title: string;
  summary: string;
  photoLabel: string;
}
