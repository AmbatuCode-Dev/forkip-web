import type { Metadata } from "next";
import { PenyewaanView } from "@/features/penyewaan";

export const metadata: Metadata = {
  title: "Penyewaan Inventaris Forkip UNJ",
  description:
    "Dikelola oleh BKK (Biro Kebendaharaan dan keuangan) dengan harga yang terjangkau",
};

export default function PenyewaanPage() {
  return <PenyewaanView />;
}
