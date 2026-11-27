import type { Metadata } from "next";
import { RekrutmenView } from "@/features/rekrutmen";

export const metadata: Metadata = {
  title: "Rekrutmen Anggota Baru Forkip UNJ 2026",
  description:
    "Rekrutmen Anggota FORKIP UNJ 2026 merupakan proses seleksi bagi mahasiswa penerima KIP-K Universitas Negeri Jakarta yang ingin berkontribusi aktif dalam organisasi.",
};

export default function RekrutmenPage() {
  return <RekrutmenView />;
}
