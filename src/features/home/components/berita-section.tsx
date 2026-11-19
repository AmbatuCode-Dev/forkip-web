import Link from "next/link";
import { NewsMarquee } from "@/components/berita/news-marquee";
import { NewsMediaPlaceholder } from "@/components/berita/news-media-placeholder";
import { beritaMarqueeItems, beritaSection } from "../data";

/**
 * Berita Forkip UNJ (spec §8): shared NewsMarquee + "Ringkasan berita" split
 * (feature card left, editorial rows right) + CTA row.
 */
export function BeritaSection() {
  return (
    <section className="bg-white pt-24">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <h2 className="text-center text-[34px] leading-[44px] font-extrabold tracking-[-0.8px] text-ink sm:text-[42px] sm:leading-[50px]">
          {beritaSection.title}
        </h2>
        <p className="mx-auto mt-4 max-w-[720px] text-center text-sm/5 text-body-muted sm:text-base/6">
          {beritaSection.subtitle}
        </p>
      </div>

      <div className="mt-10">
        <NewsMarquee items={[...beritaMarqueeItems]} />
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <div className="mt-14 grid gap-10 pb-16 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)]">
          <article className="flex flex-col gap-4">
            <NewsMediaPlaceholder
              label={beritaSection.feature.photoLabel}
              className="h-[260px]"
            />
            <h3 className="mt-2 text-3xl leading-9 font-bold text-ink">
              {beritaSection.feature.title}
            </h3>
            <p className="text-[15px]/6 text-body-muted">
              {beritaSection.feature.summary}
            </p>
            <Link
              href="/berita"
              className="group mt-auto inline-flex items-center gap-2 self-start rounded-md text-[15px] font-semibold text-gold-ink transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Baca selengkapnya
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </article>

          <div className="flex flex-col">
            <ul className="flex flex-col">
              {beritaSection.teasers.map((teaser) => (
                <li
                  key={teaser.title}
                  className="border-b border-border-sand py-6 first:pt-0"
                >
                  <h3 className="text-xl leading-7 font-bold text-ink">
                    {teaser.title}
                  </h3>
                  <p className="mt-2 text-sm/5 text-body-muted">
                    {teaser.summary}
                  </p>
                  <Link
                    href="/berita"
                    className="group mt-3 inline-flex items-center gap-2 rounded-md text-[15px] font-semibold text-gold-ink transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Baca selengkapnya
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-0.5"
                    >
                      →
                    </span>
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
                className="mt-4 inline-flex h-9 items-center justify-center rounded-full bg-gold px-6 text-[15px] font-semibold text-ink transition-colors hover:bg-gold-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
