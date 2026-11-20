import { PageHero } from "@/components/layout/page-hero";
import { adArtFile, nonProgramHero, nonProgramItems } from "../data";
import { NonProgramCard } from "./non-program-card";
import { PdfFileRow } from "./pdf-file-row";

/**
 * /non-program-kerja (Figma frame 224:1587): hero, AD/ART file row and a
 * 3-column grid of non-program cards.
 */
export function NonProgramKerjaView() {
  return (
    <>
      <PageHero
        breadcrumb={{ label: nonProgramHero.breadcrumbLabel, href: "/" }}
        title={nonProgramHero.title}
        subtitle={nonProgramHero.description}
      />

      <div className="mx-auto flex w-full max-w-300 flex-col gap-10 px-4 pt-18 pb-24 sm:px-4 xl:px-0">
        <PdfFileRow file={adArtFile} />

        <section
          aria-label="Daftar Non Program Kerja"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {nonProgramItems.map((item) => (
            <NonProgramCard key={item.title} item={item} />
          ))}
        </section>
      </div>
    </>
  );
}
