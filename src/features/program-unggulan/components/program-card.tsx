import { NewsMediaPlaceholder } from "@/components/berita/news-media-placeholder";
import { buttonVariants } from "@/components/ui/button";
import { isActionableHref } from "@/utils/is-actionable-href";
import type { ProgramCard as ProgramCardType } from "../types";

/**
 * "Program lain" card (spec /program-unggulan): white, border-sand, r16, with
 * the title, gradient photo tile, excerpt, and an "Arsip Kegiatan" button.
 */
export function ProgramCard({
  card,
  variant = 1,
}: {
  readonly card: ProgramCardType;
  readonly variant?: 1 | 2 | 3;
}) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-border-sand bg-white p-6">
      <h3 className="min-h-18 text-lg leading-7 font-semibold text-ink">
        {card.title}
      </h3>
      <NewsMediaPlaceholder
        label={card.photoLabel}
        variant={variant}
        width={368}
        height={170}
        className="h-42.5 w-full"
      />
      <p className="flex-1 text-base leading-6 text-body">{card.excerpt}</p>
      {isActionableHref(card.ctaHref) && (
        <a
          href={card.ctaHref}
          className={buttonVariants({
            variant: "gold",
            size: "cta",
            className: "self-start",
          })}
        >
          {card.cta}
        </a>
      )}
    </article>
  );
}
