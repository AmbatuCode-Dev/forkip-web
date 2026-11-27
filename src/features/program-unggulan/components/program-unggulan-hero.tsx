import { PageHero } from "@/components/layout/page-hero";
import type { PageHeroContent } from "../types";

/**
 * Page hero (spec /program-unggulan): breadcrumb "Beranda / Program
 * Unggulan", H1 "Program Unggulan Forkip UNJ", and the strategic-initiative
 * intro copy shared with the Beranda program section.
 */
export function ProgramUnggulanHero({
  hero,
}: {
  readonly hero: PageHeroContent;
}) {
  return (
    <PageHero
      breadcrumb={{ label: hero.breadcrumbLabel, href: "/" }}
      title={hero.title}
      subtitle={hero.subtitle}
    />
  );
}
