"use client";

import { useRef } from "react";
import { PageHero } from "@/components/layout/page-hero";
import { useSectionReveal } from "@/features/home";
import { adArtFile, nonProgramHero, nonProgramItems } from "../data";
import { NonProgramCard } from "./non-program-card";
import { PdfFileRow } from "./pdf-file-row";

/**
 * /non-program-kerja (Figma frame 224:1587): hero, AD/ART file row and a
 * 3-column grid of non-program cards.
 */
export function NonProgramKerjaView() {
  const contentRef = useRef<HTMLDivElement>(null);
  useSectionReveal(contentRef);

  return (
    <>
      <PageHero
        breadcrumb={{ label: nonProgramHero.breadcrumbLabel, href: "/" }}
        title={nonProgramHero.title}
        subtitle={nonProgramHero.description}
      />

      <div
        ref={contentRef}
        className="mx-auto flex w-full max-w-300 flex-col gap-10 px-4 pt-18 pb-24 sm:px-4 xl:px-0"
      >
        <div data-reveal-item>
          <PdfFileRow file={adArtFile} />
        </div>

        <section
          aria-label="Daftar Non Program Kerja"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {nonProgramItems.map((item) => (
            <div key={item.title} data-reveal-item>
              <NonProgramCard item={item} />
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
