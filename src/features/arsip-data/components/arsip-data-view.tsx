"use client";

import { ArrowRight } from "@coolicons/react";
import { useRef } from "react";
import { PageHero } from "@/components/layout/page-hero";
import { useSectionReveal } from "@/features/home";
import { arsipHero, direktoriRail, divisionArchives } from "../data";

export function ArsipDataView() {
  const contentRef = useRef<HTMLDivElement>(null);
  useSectionReveal(contentRef);

  return (
    <>
      <PageHero
        titleSize="lg"
        breadcrumb={{ label: arsipHero.breadcrumbLabel, href: "/" }}
        title={arsipHero.title}
        subtitle={arsipHero.description}
      />

      <div
        ref={contentRef}
        className="mx-auto w-full max-w-300 px-4 pt-18 pb-24 sm:px-4 xl:px-0"
      >
        <section
          aria-labelledby="direktori-heading"
          className="flex flex-col gap-12 lg:flex-row lg:gap-12"
        >
          {/* Left rail — 240px, 3-line heading (Figma frame 224:3597) */}
          <div
            data-reveal-heading
            className="flex w-full flex-col gap-4 lg:w-60 lg:shrink-0"
          >
            <p className="text-xs font-bold tracking-wide12 text-gold-ink uppercase">
              {direktoriRail.eyebrow}
            </p>
            <h2
              id="direktori-heading"
              className="text-3xl leading-38 font-semibold text-ink"
            >
              {direktoriRail.heading}
            </h2>
            <p className="max-w-46.25 text-sm leading-6 text-body-muted">
              {direktoriRail.caption}
            </p>
          </div>

          {/* Numbered division rows — 7 × 96px, bottom-only rules */}
          <ol className="flex min-w-0 flex-1 flex-col">
            {divisionArchives.map((division) => (
              <li
                key={division.number}
                data-reveal-item
                className="flex min-h-24 flex-col items-start justify-center gap-3 border-b border-border-sand py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-0"
              >
                <div className="flex min-w-0 items-baseline gap-4 sm:gap-6">
                  <span className="w-8 shrink-0 text-sm text-body-muted tabular-nums">
                    {division.number}
                  </span>
                  <span className="text-lg leading-7 font-bold tracking-wide break-words text-ink uppercase sm:text-xl sm:leading-8">
                    {division.name}
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-4 sm:gap-6">
                  <span className="hidden text-sm text-body-muted sm:inline">
                    {division.accessLabel}
                  </span>
                  <a
                    href={division.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gold-ink transition-colors hover:text-gold-deep focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    {division.linkLabel}
                    <ArrowRight
                      size={14}
                      aria-hidden="true"
                      className="shrink-0"
                    />
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </>
  );
}
