import type { Metadata } from "next";
import {
  PengunduranDiriContent,
  PengunduranDiriHero,
} from "@/features/pengunduran-diri";

export const metadata: Metadata = {
  title: "Pengunduran diri KIPK",
  description:
    "Alur, template surat, dan kontak delegasi fakultas untuk pengunduran diri mahasiswa KIPK UNJ.",
};

export default function PengunduranDiriPage() {
  return (
    <>
      <PengunduranDiriHero />
      <PengunduranDiriContent />
    </>
  );
}
