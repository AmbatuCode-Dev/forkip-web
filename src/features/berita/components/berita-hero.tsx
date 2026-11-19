import { PageHero } from "@/components/layout/page-hero";

/**
 * Page hero (spec §1): breadcrumb "Beranda / Berita", H1 "Berita", intro
 * copy from the Humas division.
 */
export function BeritaHero() {
  return (
    <PageHero
      breadcrumb={{ label: "Berita", href: "/" }}
      title="Berita"
      subtitle="Halaman ini dikelola oleh divisi Humas Forkip UNJ sebagai sarana berbagi informasi, dan transparansi laporan kegiatan yang dilakukan oleh Forkip UNJ"
    />
  );
}
