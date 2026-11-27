import type { Metadata } from "next";
import {
  DonatDanHibahView,
  getDonatDanHibahFaculties,
} from "@/features/donat-dan-hibah";

export const metadata: Metadata = {
  title: "Peminjaman (DONAT)",
  description:
    "Donat dan hibah dikelola oleh Divisi Advokasi dengan proses yang mudah dan cepat. (S&K berlaku)",
};

export default async function DonatDanHibahPage() {
  const faculties = await getDonatDanHibahFaculties();
  return <DonatDanHibahView faculties={faculties} />;
}
