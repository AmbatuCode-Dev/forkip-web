import type { Metadata } from "next";
import {
  getProgramUnggulanContent,
  ProgramUnggulanContent,
  ProgramUnggulanHero,
} from "@/features/program-unggulan";

export async function generateMetadata(): Promise<Metadata> {
  const { hero } = await getProgramUnggulanContent();
  return { title: hero.title, description: hero.subtitle };
}

export default async function ProgramUnggulanPage() {
  const { hero, programLainTitle, spotlight, cards } =
    await getProgramUnggulanContent();

  return (
    <>
      <ProgramUnggulanHero hero={hero} />
      <ProgramUnggulanContent
        spotlight={spotlight}
        cards={cards}
        programLainTitle={programLainTitle}
      />
    </>
  );
}
