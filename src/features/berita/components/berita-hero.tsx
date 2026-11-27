import { PageHero } from "@/components/layout/page-hero";
import { beritaHero } from "../data/hero";

/**
 * Page hero (spec §1): breadcrumb "Beranda / Berita", H1 "Berita", intro
 * copy from the Humas division.
 */
export function BeritaHero() {
  return (
    <PageHero
      breadcrumb={{ label: beritaHero.breadcrumbLabel, href: "/" }}
      title={beritaHero.title}
      subtitle={beritaHero.description}
    />
  );
}
