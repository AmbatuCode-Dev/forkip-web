import type { Metadata } from "next";
import { NonProgramKerjaView } from "@/features/non-program-kerja";

export const metadata: Metadata = {
  title: "Non Program Kerja Forkip UNJ 2026",
  description:
    "Disusun berdasarkan AD/ART FORUM KIP-K UNIVERSITAS NEGERI JAKARTA",
};

export default function NonProgramKerjaPage() {
  return <NonProgramKerjaView />;
}
