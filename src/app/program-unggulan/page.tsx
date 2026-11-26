import type { Metadata } from "next";
import {
  ProgramUnggulanContent,
  ProgramUnggulanHero,
} from "@/features/program-unggulan";

export const metadata: Metadata = {
  title: "Program Unggulan Forkip UNJ",
  description:
    "Program unggulan FORKIP UNJ mendukung pengembangan akademik dan keterampilan mahasiswa penerima KIP Kuliah, sekaligus membuka ruang bagi mereka untuk berkontribusi melalui pengabdian kepada masyarakat.",
};

export default function ProgramUnggulanPage() {
  return (
    <>
      <ProgramUnggulanHero />
      <ProgramUnggulanContent />
    </>
  );
}
