import type { Metadata } from "next";
import { PertanyaanPengaduanView } from "@/features/pertanyaan-pengaduan";

export const metadata: Metadata = {
  title: "Pertanyaan & Pengaduan",
  description:
    "Sarana pertanyaan, pengaduan, keluhan, dan aspirasi mahasiswa KIP-K UNJ melalui delegasi KIF fakultas.",
};

export default function PertanyaanPengaduanPage() {
  return <PertanyaanPengaduanView />;
}
