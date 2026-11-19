import { BeritaSection } from "./berita-section";
import { DelegasiSection } from "./delegasi-section";
import { DivisiSection } from "./divisi-section";
import { FungsiSection } from "./fungsi-section";
import { HeroSection } from "./hero-section";
import { LayananSection } from "./layanan-section";
import { ProgramSection } from "./program-section";
import { VisiMisiSection } from "./visi-misi-section";

/**
 * Beranda composition (docs/figma-specs/pages/beranda-spec.md §1–§8).
 * Header and footer come from the shared layout in src/app/layout.tsx.
 */
export function BerandaPage() {
  return (
    <>
      <HeroSection />
      <DelegasiSection />
      <FungsiSection />
      <VisiMisiSection />
      <LayananSection />
      <DivisiSection />
      <ProgramSection />
      <BeritaSection />
    </>
  );
}
