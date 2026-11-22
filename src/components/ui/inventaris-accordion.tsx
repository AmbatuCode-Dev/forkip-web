"use client";

import { type ComponentProps, useId, useState } from "react";
import { AccordionToggleIcon } from "@/components/ui/accordion-toggle-icon";
import { PlaceholdImage } from "@/components/ui/placehold-image";
import { cn } from "@/utils/cn";

export interface InventarisAccordionProps extends ComponentProps<"div"> {
  chip: string;
  /**
   * When given, renders the 96×64 placehold.co image with the label text
   * baked in, in place of the chip. `chip` remains the fallback for
   * existing callers.
   */
  imageLabel?: string;
  title: string;
  meta: string;
  paragraphs: string[];
  footnote?: string;
  defaultExpanded?: boolean;
}

/**
 * Accordion bar for inventory items (spec §4, Handy Talky pattern).
 * Collapsed: 104px row with placehold.co image (or chip) + title + meta +
 * plus icon. Expanded: paragraphs + footnote, minus icon.
 */
export function InventarisAccordion({
  chip,
  imageLabel,
  title,
  meta,
  paragraphs,
  footnote,
  defaultExpanded = false,
  className,
  ...props
}: InventarisAccordionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const headingId = useId();
  const regionId = useId();
  const colonIndex = meta.indexOf(":");
  const metaLabel = colonIndex === -1 ? meta : meta.slice(0, colonIndex + 1);
  const metaValue = colonIndex === -1 ? "" : meta.slice(colonIndex + 1).trim();

  return (
    <div
      className={cn(
        "rounded-10 border border-border-sand bg-white transition-colors",
        className,
      )}
      {...props}
    >
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={regionId}
        id={headingId}
        onClick={() => setExpanded((value) => !value)}
        className="flex h-26 w-full cursor-pointer items-center justify-between gap-6 px-4 text-left focus-visible:ring-2 focus-visible:ring-gold-ink focus-visible:outline-none sm:px-6"
      >
        <span className="flex min-w-0 items-center gap-6">
          {imageLabel ? (
            <PlaceholdImage
              label={imageLabel}
              width={96}
              height={64}
              className="h-16 w-24 shrink-0 rounded object-cover"
            />
          ) : (
            <span className="shrink-0 rounded-md bg-surface-50 px-3 py-1.5 text-9 leading-5 font-semibold text-ink-soft">
              {chip}
            </span>
          )}
          <span className="min-w-0">
            <span className="block truncate text-22 leading-8 font-extrabold text-ink">
              {title}
            </span>
            <span className="block truncate text-13 leading-5">
              <span className="font-medium text-body-muted">{metaLabel}</span>
              {metaValue ? (
                <span className="font-bold text-ink"> {metaValue}</span>
              ) : null}
            </span>
          </span>
        </span>
        <AccordionToggleIcon expanded={expanded} />
      </button>
      <section
        id={regionId}
        aria-labelledby={headingId}
        hidden={!expanded}
        className="overflow-hidden transition-height duration-300 motion-reduce:transition-none"
      >
        <div className="flex max-w-275 flex-col gap-3 pr-6 pb-7 pl-6 sm:pr-12 sm:pl-36">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-15 leading-6 text-body">
              {paragraph}
            </p>
          ))}
          {footnote ? (
            <p className="text-xs leading-6 text-body-muted">{footnote}</p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
