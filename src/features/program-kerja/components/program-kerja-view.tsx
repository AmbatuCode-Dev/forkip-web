import { PageHero } from "@/components/layout/page-hero";
import { adArtFile, programKerjaHero, programKerjaItems } from "../data";
import { PdfFileRow } from "./pdf-file-row";
import { ProgramKerjaCard } from "./program-kerja-card";

/**
 * /program-kerja (Figma frame 224:1467): hero, AD/ART file row and a
 * 3-column grid of program cards.
 */
export function ProgramKerjaView() {
  return (
    <>
      <PageHero
        breadcrumb={{ label: programKerjaHero.breadcrumbLabel, href: "/" }}
        title={programKerjaHero.title}
        subtitle={programKerjaHero.description}
      />

      <div className="mx-auto flex w-full max-w-300 flex-col gap-10 px-4 pt-18 pb-24 sm:px-4 xl:px-0">
        <PdfFileRow file={adArtFile} />

        <section
          aria-label="Daftar Program Kerja"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {programKerjaItems.map((item) => (
            <ProgramKerjaCard key={item.title} item={item} />
          ))}
        </section>
      </div>
    </>
  );
}
