"use client";

import { ArrowRight } from "@coolicons/react";
import Link from "next/link";
import { useRef } from "react";
import { NewsMarquee } from "@/components/berita/news-marquee";
import { NewsMediaPlaceholder } from "@/components/berita/news-media-placeholder";
import { beritaMarqueeItems, beritaSection } from "../data";
import { useSectionReveal } from "./use-section-reveal";

/**
 * Berita Forkip UNJ (spec §8): shared NewsMarquee + "Ringkasan berita" split
 * (feature card left, editorial rows right) + CTA row.
 */
export function BeritaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);

  return (
    <section ref={sectionRef} className="bg-white pt-24">
      <div className="mx-auto w-full max-w-300 px-4 sm:px-6 xl:px-0">
        <h2
          data-reveal-heading
          className="text-center text-4xl leading-11 font-extrabold tracking-t08 text-ink sm:text-5xl sm:leading-50"
        >
          {beritaSection.title}
        </h2>
        <p
          data-reveal-heading
          className="mx-auto mt-4 max-w-180 text-center text-sm leading-5 text-body-muted sm:text-base sm:leading-6"
        >
          {beritaSection.subtitle}
        </p>
      </div>

      <div className="mt-10">
        <NewsMarquee items={[...beritaMarqueeItems]} />
      </div>

      <div className="mx-auto w-full max-w-300 px-4 sm:px-6 xl:px-0">
        <div className="mt-14 grid gap-10 pb-16 lg:cols-440">
          <article data-reveal-item className="flex flex-col gap-4">
            <NewsMediaPlaceholder
              label={beritaSection.feature.photoLabel}
              width={440}
              height={260}
              className="h-65"
            />
            <h3 className="mt-2 text-3xl leading-9 font-bold text-ink">
              {beritaSection.feature.title}
            </h3>
            <p className="text-base leading-6 text-body-muted">
              {beritaSection.feature.summary}
            </p>
            <Link
              href={`/berita/${beritaSection.feature.slug}`}
              className="group mt-auto inline-flex items-center gap-2 self-start rounded-md text-base font-semibold text-gold-ink transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Baca selengkapnya
              <ArrowRight
                size={15}
                aria-hidden="true"
                className="shrink-0 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </article>

          <div data-reveal-item className="flex flex-col">
            <ul className="flex flex-col">
              {beritaSection.teasers.map((teaser) => (
                <li
                  key={teaser.title}
                  className="border-b border-border-sand py-6 first:pt-0"
                >
                  <h3 className="text-xl leading-7 font-bold text-ink">
                    {teaser.title}
                  </h3>
                  <p className="mt-2 text-sm leading-5 text-body-muted">
                    {teaser.summary}
                  </p>
                  <Link
                    href={`/berita/${teaser.slug}`}
                    className="group mt-3 inline-flex items-center gap-2 rounded-md text-base font-semibold text-gold-ink transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    Baca selengkapnya
                    <ArrowRight
                      size={15}
                      aria-hidden="true"
                      className="shrink-0 transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <p className="text-lg font-bold text-ink">
                {beritaSection.ctaLabel}
              </p>
              <Link
                href={beritaSection.ctaHref}
                className="mt-4 inline-flex h-9 items-center justify-center rounded-full bg-gold px-6 text-base font-semibold text-ink transition-colors hover:bg-gold-dark focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                {beritaSection.ctaButton}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
