import { PageHero } from "@/components/layout/page-hero";
import { arsipHero, direktoriRail, divisionArchives } from "../data";

export function ArsipDataView() {
  return (
    <>
      <PageHero
        titleSize="lg"
        breadcrumb={{ label: arsipHero.breadcrumbLabel, href: "/" }}
        title={arsipHero.title}
        subtitle={arsipHero.description}
      />

      <div className="mx-auto w-full max-w-[1200px] px-4 pt-[72px] pb-24 sm:px-4 xl:px-0">
        <section
          aria-labelledby="direktori-heading"
          className="flex flex-col gap-12 lg:flex-row lg:gap-12"
        >
          {/* Left rail — 240px, 3-line heading (Figma frame 224:3597) */}
          <div className="flex w-full flex-col gap-4 lg:w-[240px] lg:shrink-0">
            <p className="text-xs font-bold tracking-[1.2px] text-[#7A5B00] uppercase">
              {direktoriRail.eyebrow}
            </p>
            <h2
              id="direktori-heading"
              className="text-[28px] leading-[38px] font-semibold text-[#1C1C1C]"
            >
              {direktoriRail.heading}
            </h2>
            <p className="max-w-[185px] text-[13px] leading-6 text-[#666666]">
              {direktoriRail.caption}
            </p>
          </div>

          {/* Numbered division rows — 7 × 96px, bottom-only rules */}
          <ol className="flex min-w-0 flex-1 flex-col">
            {divisionArchives.map((division) => (
              <li
                key={division.number}
                className="flex min-h-24 items-center justify-between gap-6 border-b border-[#E8E5DA]"
              >
                <div className="flex min-w-0 items-baseline gap-4 sm:gap-6">
                  <span className="w-8 shrink-0 text-[13px] text-[#666666] tabular-nums">
                    {division.number}
                  </span>
                  <span className="text-[22px] leading-[32px] font-bold tracking-wide text-[#1C1C1C] uppercase">
                    {division.name}
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-4 sm:gap-6">
                  <span className="hidden text-[13px] text-[#666666] sm:inline">
                    {division.accessLabel}
                  </span>
                  <a
                    href={division.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#7A5B00] transition-colors hover:text-[#5c4400] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {division.linkLabel}
                    <span aria-hidden="true">→</span>
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
