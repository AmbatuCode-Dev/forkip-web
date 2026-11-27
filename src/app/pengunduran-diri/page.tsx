import type { Metadata } from "next";
import {
  getPengunduranDiriFaculties,
  PengunduranDiriContent,
  PengunduranDiriHero,
} from "@/features/pengunduran-diri";

export const metadata: Metadata = {
  title: "Pengunduran diri KIPK",
  description:
    "Alur, template surat, dan kontak delegasi fakultas untuk pengunduran diri mahasiswa KIPK UNJ.",
};

export default async function PengunduranDiriPage() {
  const faculties = await getPengunduranDiriFaculties();
  return (
    <>
      <PengunduranDiriHero />
      <PengunduranDiriContent faculties={faculties} />
    </>
  );
}
