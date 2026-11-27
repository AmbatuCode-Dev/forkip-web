import "server-only";

import { getProgramCards, getProgramSpotlight } from "@/lib/content/program";
import type { ProgramCardContent, ProgramSpotlightContent } from "@/types";
import type { PageHeroContent } from "../types";
import { programLainTitle, programUnggulanHero } from "./index";

/** Everything /program-unggulan needs, as plain content DTOs + page copy. */
export interface ProgramUnggulanContentData {
  readonly hero: PageHeroContent;
  readonly programLainTitle: string;
  readonly spotlight: ProgramSpotlightContent;
  readonly cards: readonly ProgramCardContent[];
}

/** Combines the page copy with the spotlight and cards from MDX content. */
export async function getProgramUnggulanContent(): Promise<ProgramUnggulanContentData> {
  const [spotlight, cards] = await Promise.all([
    getProgramSpotlight(),
    getProgramCards(),
  ]);

  return {
    hero: programUnggulanHero,
    programLainTitle,
    spotlight,
    cards,
  };
}
