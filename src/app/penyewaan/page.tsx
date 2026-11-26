import type { Metadata } from "next";
import { PenyewaanView } from "@/features/penyewaan";

export const metadata: Metadata = {
  title: "Penyewaan Inventaris Forkip UNJ",
  description:
    "BKK FORKIP UNJ mengelola penyewaan inventaris yang dapat digunakan untuk mendukung berbagai kegiatan.",
};

export default function PenyewaanPage() {
  return <PenyewaanView />;
}
