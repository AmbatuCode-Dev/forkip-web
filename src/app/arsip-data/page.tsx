import type { Metadata } from "next";
import { ArsipDataView } from "@/features/arsip-data";

export const metadata: Metadata = {
  title: "Arsip Data Tiap Divisi",
  description:
    "Halaman ini disediakan sebagai arsip data tiap divisi di Forum KIPK UNJ, untuk kelancaran administrasi khususnya arsip proposal, RAB, dan LPJ. (Akses file terbatas S&K berlaku)",
};

export default function ArsipDataPage() {
  return <ArsipDataView />;
}
