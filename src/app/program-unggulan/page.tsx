import type { Metadata } from "next";
import {
  ProgramUnggulanContent,
  ProgramUnggulanHero,
} from "@/features/program-unggulan";

export const metadata: Metadata = {
  title: "Program Unggulan Forkip UNJ",
  description:
    "Rangkaian inisiatif strategis Forum KIP-K UNJ: Kampung KIP-K UNJ, Explore KIPK, INDIKASI, dan informasi beasiswa kampus.",
};

export default function ProgramUnggulanPage() {
  return (
    <>
      <ProgramUnggulanHero />
      <ProgramUnggulanContent />
    </>
  );
}
