import type { Metadata } from "next";
import { DonatDanHibahView } from "@/features/donat-dan-hibah";

export const metadata: Metadata = {
  title: "Peminjaman (DONAT)",
  description:
    "Donat dan hibah dikelola oleh Divisi Advokasi dengan proses yang mudah dan cepat. (S&K berlaku)",
};

export default function DonatDanHibahPage() {
  return <DonatDanHibahView />;
}
