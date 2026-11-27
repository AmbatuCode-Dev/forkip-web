import type {
  FacultyRecord,
  HomeBeritaContent,
  NewsPostContent,
  ProgramCardContent,
  ProgramSpotlightContent,
} from "@/types";
import { BeritaSection } from "./berita-section";
import { DelegasiSection } from "./delegasi-section";
import { DivisiSection } from "./divisi-section";
import { FungsiSection } from "./fungsi-section";
import { HeroSection } from "./hero-section";
import { LayananSection } from "./layanan-section";
import { ProgramSection } from "./program-section";
import { VisiMisiSection } from "./visi-misi-section";

export interface BerandaPageProps {
  readonly faculties: readonly FacultyRecord[];
  readonly spotlight: ProgramSpotlightContent;
  readonly cards: readonly ProgramCardContent[];
  readonly berita: HomeBeritaContent;
  readonly posts: readonly NewsPostContent[];
}

/**
 * Beranda composition (docs/figma-specs/pages/beranda-spec.md §1–§8).
 * Header and footer come from the shared layout in src/app/layout.tsx.
 * Content DTOs arrive as props so the shared home barrel stays client-safe.
 */
export async function BerandaPage({
  faculties,
  spotlight,
  cards,
  berita,
  posts,
}: BerandaPageProps) {
  return (
    <>
      <HeroSection />
      <DelegasiSection faculties={faculties} />
      <FungsiSection />
      <VisiMisiSection />
      <LayananSection />
      <DivisiSection />
      <ProgramSection spotlight={spotlight} cards={cards} />
      <BeritaSection berita={berita} posts={posts} />
    </>
  );
}
