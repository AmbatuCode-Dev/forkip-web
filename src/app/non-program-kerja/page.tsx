import type { Metadata } from "next";
import { NonProgramKerjaView } from "@/features/non-program-kerja";

export const metadata: Metadata = {
  title: "Non Program Kerja Forkip UNJ 2026",
  description:
    "Daftar kegiatan di luar program kerja 2026 disusun berdasarkan Anggaran Dasar dan Anggaran Rumah Tangga (AD/ART) Forum KIP-K Universitas Negeri Jakarta.",
};

export default function NonProgramKerjaPage() {
  return <NonProgramKerjaView />;
}
