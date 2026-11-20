import { PageHero } from "@/components/layout/page-hero";
import { AlurPengunduranDiriCard } from "./alur-pengunduran-diri-card";
import { FakultasKontakGrid } from "./fakultas-kontak-grid";
import { GoogleFormEmbedCard } from "./google-form-embed-card";
import { TemplateSuratCard } from "./template-surat-card";

/**
 * Page hero (spec §1): breadcrumb "Beranda / Form Pengunduran diri dari
 * KIPK", H1 and intro copy.
 */
export function PengunduranDiriHero() {
  return (
    <PageHero
      breadcrumb={{ label: "Form Pengunduran diri dari KIPK", href: "/" }}
      title="Pengunduran diri KIPK"
      subtitle="Dibantu oleh divisi KIF Forkip UNJ, kepada mahasiswa KIPK UNJ yang ingin mengundurkan diri diharap untuk membaca informasi di bawah."
    />
  );
}

/**
 * Page body (spec §2–§5): alur card, template surat card, Google Form
 * placeholder, faculty contact grid.
 */
export function PengunduranDiriContent() {
  return (
    <div className="mx-auto flex w-full max-w-312 flex-col gap-9 px-6 pt-12 pb-20">
      <AlurPengunduranDiriCard />
      <TemplateSuratCard />
      <GoogleFormEmbedCard />
      <FakultasKontakGrid />
    </div>
  );
}
