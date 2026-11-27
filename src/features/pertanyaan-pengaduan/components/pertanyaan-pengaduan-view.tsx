"use client";

import { ArrowRight } from "@coolicons/react";
import { useRef } from "react";
import { PageHero } from "@/components/layout/page-hero";
import { useSectionReveal } from "@/features/home";
import { cn } from "@/utils/cn";
import { kifNote, kontakRail, pertanyaanPengaduanHero } from "../data";
import type { FacultyContact } from "../types";

/** Placeholder WhatsApp link (TODO: real delegation deep links). */
const WHATSAPP_HREF = "#";

/**
 * /pertanyaan-pengaduan (Figma frame 422:681): hero, "Kontak delegasi ·
 * Indeks fakultas" two-column section with 8 WhatsApp delegation rows, and
 * the gold KIF follow-up note. Faculty colors arrive as data and are applied
 * as inline styles (FIKK renders as the outlined variant).
 */
export function PertanyaanPengaduanView({
  faculties,
}: {
  readonly faculties: readonly FacultyContact[];
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  useSectionReveal(contentRef);

  return (
    <>
      <PageHero
        breadcrumb={{
          label: pertanyaanPengaduanHero.breadcrumbLabel,
          href: "/",
        }}
        title={pertanyaanPengaduanHero.title}
        subtitle={pertanyaanPengaduanHero.description}
      />

      <div
        ref={contentRef}
        className="mx-auto flex w-full max-w-300 flex-col gap-8 px-4 pt-18 pb-24 sm:px-4 xl:px-0"
      >
        {/* Kontak delegasi · Indeks fakultas (rail + rows, gap 48) */}
        <section
          aria-label="Kontak delegasi fakultas"
          className="flex flex-col gap-10 lg:flex-row lg:gap-12"
        >
          {/* Left rail — 240px, 3-line heading */}
          <div
            data-reveal-heading
            className="flex w-full flex-col gap-4 lg:w-60 lg:shrink-0"
          >
            <p className="text-xs leading-6 font-bold tracking-wide12 text-gold-ink uppercase">
              {kontakRail.eyebrow}
            </p>
            <h2 className="text-3xl leading-38 font-bold text-ink">
              {kontakRail.heading}
            </h2>
            <p className="text-sm leading-6 text-body-muted">
              {kontakRail.caption}
            </p>
          </div>

          {/* Faculty delegation rows */}
          <ul className="flex min-w-0 flex-1 flex-col gap-3">
            {faculties.map((faculty) => (
              <li key={faculty.code} data-reveal-item>
                <a
                  href={WHATSAPP_HREF}
                  className={cn(
                    "flex min-h-18.5 flex-col items-start justify-center gap-3 rounded-10 px-5 py-3 transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none sm:flex-row sm:items-center sm:justify-between sm:gap-6",
                    faculty.outline
                      ? "border border-teal bg-white text-ink"
                      : "border border-transparent text-white",
                  )}
                  style={
                    faculty.outline
                      ? undefined
                      : { backgroundColor: faculty.color }
                  }
                  aria-label={`Hubungi delegasi ${faculty.code} via WhatsApp`}
                >
                  <span className="flex min-w-0 flex-col gap-0.5 text-left">
                    <span className="text-xl leading-7 font-extrabold">
                      {faculty.code}
                    </span>
                    <span className="text-sm leading-6 font-normal">
                      {faculty.fullName}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2 text-sm font-semibold">
                    Hubungi via WhatsApp
                    <ArrowRight
                      size={14}
                      aria-hidden="true"
                      className="shrink-0"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Note card — gold tint #FFF3C4, r16, pad 20/28, h64 */}
        <section
          aria-label="Catatan pertanyaan dan pengaduan"
          className="rounded-2xl bg-gold-pale px-7 py-5"
        >
          <p className="text-base leading-6 font-medium text-ink-soft">
            {kifNote}
          </p>
        </section>
      </div>
    </>
  );
}
