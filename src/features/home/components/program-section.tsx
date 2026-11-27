"use client";

import Link from "next/link";
import { useRef } from "react";
import { buttonVariants } from "@/components/ui/button";
import { PlaceholdImage } from "@/components/ui/placehold-image";
import type { ProgramCardContent, ProgramSpotlightContent } from "@/types";
import { programSection } from "../data";
import { useSectionReveal } from "./use-section-reveal";

function PhotoPlaceholder({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <PlaceholdImage
      label={label}
      width={480}
      height={560}
      className={className ?? "h-105 w-full rounded-2xl object-cover lg:h-140"}
    />
  );
}

/**
 * Program Unggulan (spec §7): Kampung KIP-K UNJ spotlight + 3 program cards.
 */
export function ProgramSection({
  spotlight,
  cards,
}: {
  readonly spotlight: ProgramSpotlightContent;
  readonly cards: readonly ProgramCardContent[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);

  return (
    <section ref={sectionRef} className="bg-white py-24">
      <div className="mx-auto w-full max-w-300 px-4 sm:px-6 xl:px-0">
        <h2
          data-reveal-heading
          className="text-center text-4xl leading-11 font-extrabold tracking-t08 text-ink sm:text-5xl sm:leading-50"
        >
          {programSection.title}
        </h2>
        <p
          data-reveal-heading
          className="mx-auto mt-4 max-w-205 text-center text-sm leading-5 text-body-muted sm:text-base sm:leading-6"
        >
          {programSection.subtitle}
        </p>

        <div
          data-reveal-item
          className="mt-14 grid items-center gap-10 rounded-20 bg-surface-50 p-6 sm:p-10 lg:cols-spotlight"
        >
          <div>
            <h3 className="text-3xl leading-10 font-bold text-ink sm:text-4xl sm:leading-12">
              {spotlight.title}
            </h3>
            {spotlight.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="mt-4 text-base leading-6 text-body"
              >
                {paragraph}
              </p>
            ))}
            <ul className="mt-5 flex flex-col gap-4">
              {spotlight.bullets.map((bullet) => (
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
              {spotlight.closing}
            </p>
          </div>

          <PhotoPlaceholder
            label={spotlight.photoLabel}
            className="h-105 w-full rounded-2xl object-cover lg:h-140"
          />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
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
              <Link
                href="/program-unggulan"
                className={buttonVariants({
                  variant: "gold",
                  size: "sm",
                  className: "h-9 rounded-full px-5 text-sm font-semibold",
                })}
              >
                {card.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
