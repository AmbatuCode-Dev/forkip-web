"use client";

import { ArrowRight } from "@coolicons/react";
import Link from "next/link";
import { useRef } from "react";
import { layananSection, services } from "../data";
import { ServiceIconGlyph } from "./service-icon";
import { useSectionReveal } from "./use-section-reveal";

/**
 * Layanan Forkip UNJ (spec §5): 3×2 grid of service cards with icon tile,
 * division pill, description and "Buka halaman" arrow link.
 */
export function LayananSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);

  return (
    <section ref={sectionRef} className="bg-white py-24">
      <div className="mx-auto w-full max-w-300 px-4 sm:px-6 xl:px-0">
        <h2
          data-reveal-heading
          className="text-center text-34 leading-11 font-extrabold tracking-t08 text-ink sm:text-42 sm:leading-50"
        >
          {layananSection.title}
        </h2>
        <p
          data-reveal-heading
          className="mx-auto mt-3 max-w-160 text-center text-sm leading-5 text-body-muted sm:text-base sm:leading-6"
        >
          {layananSection.subtitle}
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.href}
              data-reveal-item
              className="flex flex-col gap-4 rounded-2xl border border-border-sand bg-white p-6 shadow-xs"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex size-12 items-center justify-center rounded-xl bg-gold-soft text-gold-ink">
                  <ServiceIconGlyph
                    icon={service.icon}
                    className="size-6 text-gold-ink"
                  />
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <h3 className="text-xl leading-7 font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="text-sm leading-5 text-body-muted">
                  {service.description}
                </p>
              </div>
              <Link
                href={service.href}
                className="group inline-flex items-center gap-2 self-start rounded-md text-15 font-semibold text-gold-ink transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Buka halaman
                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  className="shrink-0 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
