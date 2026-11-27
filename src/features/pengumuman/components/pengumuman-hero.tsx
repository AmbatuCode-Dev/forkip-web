import { PageHero } from "@/components/layout/page-hero";
import { pengumumanHero } from "../data";

/**
 * Page hero (spec /pengumuman): breadcrumb "Beranda / Pengumuman", H1
 * "Pengumuman", and the official KIP-K information-channel intro copy.
 */
export function PengumumanHero() {
  return (
    <PageHero
      breadcrumb={{ label: pengumumanHero.breadcrumbLabel, href: "/" }}
      title={pengumumanHero.title}
      subtitle={pengumumanHero.subtitle}
    />
  );
}
