import type { Metadata } from "next";
import { PengumumanContent, PengumumanHero } from "@/features/pengumuman";

export const metadata: Metadata = {
  title: "Pengumuman",
  description:
    "Pusat informasi resmi KIP-K Universitas Negeri Jakarta: pengumuman, panduan, dan pembaruan kebijakan bagi mahasiswa dan calon mahasiswa KIP-K UNJ.",
};

export default function PengumumanPage() {
  return (
    <>
      <PengumumanHero />
      <PengumumanContent />
    </>
  );
}
