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

      <div className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6">
        <section
          aria-labelledby="direktori-heading"
          className="flex flex-col gap-12 lg:flex-row lg:gap-16"
        >
          {/* Left rail */}
          <div className="flex w-full flex-col gap-4 lg:w-[300px] lg:shrink-0">
            <p className="text-xs font-bold tracking-[1.2px] text-[#7A5B00] uppercase">
              {direktoriRail.eyebrow}
            </p>
            <h2
              id="direktori-heading"
              className="text-[28px] leading-[1.2] font-semibold text-[#1C1C1C] sm:text-[32px]"
            >
              {direktoriRail.heading}
            </h2>
            <p className="text-[13px] leading-5 text-[#666666]">
              {direktoriRail.caption}
            </p>
          </div>

          {/* Numbered division rows */}
          <ol className="flex min-w-0 flex-1 flex-col">
            {divisionArchives.map((division) => (
              <li
                key={division.number}
                className="flex min-h-[88px] items-center justify-between gap-6 border-t border-[#E8E5DA] py-4 last:border-b"
              >
                <div className="flex min-w-0 items-baseline gap-4 sm:gap-6">
                  <span className="w-8 shrink-0 text-[13px] text-[#666666] tabular-nums">
                    {division.number}
                  </span>
                  <span className="text-[17px] font-bold tracking-wide text-[#1C1C1C] uppercase sm:text-[20px]">
                    {division.name}
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-4 sm:gap-6">
                  <span className="hidden text-[13px] text-[#666666] sm:inline">
                    {division.accessLabel}
                  </span>
                  <a
                    href={division.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7A5B00] transition-colors hover:text-[#5c4400] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
