import { NewsMediaPlaceholder } from "@/components/berita/news-media-placeholder";
import { buttonVariants } from "@/components/ui/button";
import { isActionableHref } from "@/utils/is-actionable-href";
import { programSpotlight } from "../data";

/**
 * "Kampung KIP-K UNJ" spotlight (spec /program-unggulan): cream card with the
 * two intro paragraphs, four gold dot-bullets, the closing commitment, an
 * "Arsip Kegiatan" button, and the photo tile. Layout mirrors the Beranda
 * program-section spotlight (cols-spotlight split).
 */
export function ProgramSpotlightSection() {
  return (
    <section
      aria-labelledby="program-spotlight-heading"
      className="grid items-center gap-10 rounded-20 bg-surface-50 p-6 sm:p-10 lg:cols-spotlight"
    >
      <div>
        <h2
          id="program-spotlight-heading"
          className="text-3xl leading-10 font-bold text-ink sm:text-4xl sm:leading-12"
        >
          {programSpotlight.title}
        </h2>
        {programSpotlight.paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 24)}
            className="mt-4 text-base leading-6 text-body"
          >
            {paragraph}
          </p>
        ))}
        <ul className="mt-5 flex flex-col gap-4">
          {programSpotlight.bullets.map((bullet) => (
            <li key={bullet.label} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-2 size-2 shrink-0 rounded-full bg-gold"
              />
              <p className="text-base leading-6 text-body">
                <span className="font-bold text-ink">{bullet.label}</span>:{" "}
                {bullet.text}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-base leading-6 text-body">
          {programSpotlight.closing}
        </p>
        {isActionableHref(programSpotlight.ctaHref) && (
          <a
            href={programSpotlight.ctaHref}
            className={buttonVariants({
              variant: "gold",
              size: "cta",
              className: "mt-6",
            })}
          >
            {programSpotlight.cta}
          </a>
        )}
      </div>

      <NewsMediaPlaceholder
        label={programSpotlight.photoLabel}
        width={480}
        height={560}
        className="h-105 w-full lg:h-140"
      />
    </section>
  );
}
