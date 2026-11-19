import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { DivisiAccordion } from "@/components/ui/divisi-accordion";
import { dikelolaSection, divisions, divisiSection } from "../data";

/**
 * Divisi FORKIP UNJ (spec §6): 7 shared DivisiAccordion instances (BPHI
 * expanded) + "Dikelola oleh HAK" cream card.
 */
export function DivisiSection() {
  return (
    <section className="bg-surface-50 py-24">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <h2 className="text-center text-[34px] leading-[44px] font-extrabold tracking-[-0.8px] text-ink sm:text-[42px] sm:leading-[50px]">
          {divisiSection.title}
        </h2>
        <p className="mx-auto mt-4 max-w-[760px] text-center text-sm/5 text-body-muted sm:text-base/6">
          {divisiSection.subtitle}
        </p>

        <div className="mt-12 flex flex-col gap-4">
          {divisions.map((division) => (
            <DivisiAccordion
              key={division.chip}
              chip={division.chip}
              title={division.title}
              body={division.body}
              defaultExpanded={division.defaultExpanded}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl bg-gold-soft px-6 py-12 text-center">
          <p className="text-[13px] font-medium tracking-wide text-body-muted uppercase">
            {dikelolaSection.eyebrow}
          </p>
          <p className="text-base/6 font-semibold text-ink sm:text-lg/7">
            {dikelolaSection.title}
          </p>
          <Link
            href={dikelolaSection.ctaHref}
            className={buttonVariants({
              variant: "gold",
              size: "cta",
              className: "h-9 px-6 text-[15px]",
            })}
          >
            {dikelolaSection.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
