"use client";

import Link from "next/link";
import { useRef } from "react";
import { buttonVariants } from "@/components/ui/button";
import { PlaceholdImage } from "@/components/ui/placehold-image";
import { useSectionReveal } from "@/features/home";
import { isActionableHref } from "@/utils/is-actionable-href";
import type { ProgramCard, ProgramSpotlight } from "../types";
import { ProgramSpotlightSection } from "./program-spotlight";

/**
 * Page body (spec /program-unggulan): the Kampung KIP-K UNJ spotlight followed
 * by the "Program lain" three-card grid matching the home page's ProgramSection.
 */
export function ProgramUnggulanContent({
  spotlight,
  cards,
  programLainTitle,
}: {
  readonly spotlight: ProgramSpotlight;
  readonly cards: readonly ProgramCard[];
  readonly programLainTitle: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  useSectionReveal(containerRef);

  return (
    <div
      ref={containerRef}
      className="mx-auto w-full max-w-300 px-4 pt-12 pb-20 sm:px-6 xl:px-0"
    >
      <div data-reveal-item>
        <ProgramSpotlightSection spotlight={spotlight} />
      </div>

      <section aria-labelledby="program-lain-heading" className="mt-14">
        <h2
          id="program-lain-heading"
          data-reveal-heading
          className="text-3xl leading-10 font-bold text-ink"
        >
          {programLainTitle}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const ctaHref = card.ctaHref ?? "#";
            return (
              <article
                key={card.title}
                data-reveal-item
                className="flex flex-col gap-4 rounded-2xl bg-surface-50 p-6"
              >
                <h3 className="min-h-18 text-lg leading-7 font-semibold text-ink">
                  {card.title}
                </h3>
                <PlaceholdImage
                  label={card.photoLabel}
                  width={368}
                  height={170}
                  className="h-42.5 w-full rounded-2xl object-cover"
                />
                <p className="flex-1 text-sm leading-5 text-body-muted">
                  {card.excerpt}
                </p>
                {isActionableHref(ctaHref) && (
                  <Link
                    href={ctaHref}
                    className={buttonVariants({
                      variant: "gold",
                      size: "sm",
                      className: "h-9 rounded-full px-5 text-sm font-semibold",
                    })}
                  >
                    {card.cta}
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
