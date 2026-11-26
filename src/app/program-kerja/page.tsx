import type { Metadata } from "next";
import { ProgramKerjaView } from "@/features/program-kerja";

export const metadata: Metadata = {
  title: "Program Kerja Forkip UNJ 2026",
  description:
    "Program kerja 2026 disusun berdasarkan Anggaran Dasar dan Anggaran Rumah Tangga (AD/ART) Forum KIP-K Universitas Negeri Jakarta.",
};

export default function ProgramKerjaPage() {
  return <ProgramKerjaView />;
}
