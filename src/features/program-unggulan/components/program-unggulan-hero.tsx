import { PageHero } from "@/components/layout/page-hero";
import { programUnggulanHero } from "../data";

/**
 * Page hero (spec /program-unggulan): breadcrumb "Beranda / Program
 * Unggulan", H1 "Program Unggulan Forkip UNJ", and the strategic-initiative
 * intro copy shared with the Beranda program section.
 */
export function ProgramUnggulanHero() {
  return (
    <PageHero
      breadcrumb={{ label: programUnggulanHero.breadcrumbLabel, href: "/" }}
      title={programUnggulanHero.title}
      subtitle={programUnggulanHero.subtitle}
    />
  );
}
