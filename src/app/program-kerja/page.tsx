import type { Metadata } from "next";
import { ProgramKerjaView } from "@/features/program-kerja";

export const metadata: Metadata = {
  title: "Program Kerja Forkip UNJ 2026",
  description:
    "Disusun berdasarkan AD/ART FORUM KIP-K UNIVERSITAS NEGERI JAKARTA",
};

export default function ProgramKerjaPage() {
  return <ProgramKerjaView />;
}
