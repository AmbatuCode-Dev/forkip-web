export interface PageHeroContent {
  readonly breadcrumbLabel: string;
  readonly title: string;
  readonly subtitle: string;
}

export interface ProgramBullet {
  readonly label: string;
  readonly text: string;
}

/** The spotlight and cards are content DTOs (ctaHref may be absent or "#"). */
export type {
  ProgramCardContent as ProgramCard,
  ProgramSpotlightContent as ProgramSpotlight,
} from "@/types";
