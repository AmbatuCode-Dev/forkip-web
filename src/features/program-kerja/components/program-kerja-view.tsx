"use client";

import { useRef } from "react";
import { PageHero } from "@/components/layout/page-hero";
import { useSectionReveal } from "@/features/home";
import { adArtFile, programKerjaHero, programKerjaItems } from "../data";
import { PdfFileRow } from "./pdf-file-row";
import { ProgramKerjaCard } from "./program-kerja-card";

/**
 * /program-kerja (Figma frame 224:1467): hero, AD/ART file row and a
 * 3-column grid of program cards.
 */
export function ProgramKerjaView() {
  const contentRef = useRef<HTMLDivElement>(null);
  useSectionReveal(contentRef);

  return (
    <>
      <PageHero
        breadcrumb={{ label: programKerjaHero.breadcrumbLabel, href: "/" }}
        title={programKerjaHero.title}
        subtitle={programKerjaHero.description}
      />

      <div
        ref={contentRef}
        className="mx-auto flex w-full max-w-300 flex-col gap-10 px-4 pt-18 pb-24 sm:px-4 xl:px-0"
      >
        <div data-reveal-item>
          <PdfFileRow file={adArtFile} />
        </div>

        <section
          aria-label="Daftar Program Kerja"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {programKerjaItems.map((item) => (
            <div key={item.title} data-reveal-item>
              <ProgramKerjaCard item={item} />
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
