"use client";

import { type ComponentProps, useId, useState } from "react";
import { AccordionToggleIcon } from "@/components/ui/accordion-toggle-icon";
import { PlaceholdImage } from "@/components/ui/placehold-image";
import { cn } from "@/utils/cn";

export interface DivisiAccordionProps extends ComponentProps<"div"> {
  chip: string;
  /**
   * When given, renders the 96×64 placehold.co image with the label text
   * baked in, in place of the chip. `chip` remains the fallback for
   * existing callers.
   */
  imageLabel?: string;
  title: string;
  body: string;
  defaultExpanded?: boolean;
}

/**
 * Accordion bar for division descriptions (spec §3, BPHI pattern).
 * Collapsed: 104px row with placehold.co image (or chip) + title + plus
 * icon. Expanded: body text below, minus icon.
 */
export function DivisiAccordion({
  chip,
  imageLabel,
  title,
  body,
  defaultExpanded = false,
  className,
  ...props
}: DivisiAccordionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const headingId = useId();
  const regionId = useId();

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
        className="flex h-26 w-full cursor-pointer items-center justify-between gap-3 px-4 text-left focus-visible:ring-2 focus-visible:ring-gold-ink focus-visible:outline-none sm:gap-6 sm:px-6"
      >
        <span className="flex min-w-0 items-center gap-3 sm:gap-6">
          {imageLabel ? (
            <PlaceholdImage
              label={imageLabel}
              width={96}
              height={64}
              className={cn(
                "h-16 shrink-0 rounded object-cover transition-all duration-300 motion-reduce:transition-none",
                expanded ? "-mr-6 w-0 opacity-0" : "w-24 opacity-100",
              )}
            />
          ) : (
            <span className="shrink-0 rounded-md bg-surface-50 px-3 py-1.5 text-xs leading-5 font-semibold text-ink-soft">
              {chip}
            </span>
          )}
          <span className="truncate text-xl leading-8 font-semibold text-ink">
            {title}
          </span>
        </span>
        <AccordionToggleIcon expanded={expanded} />
      </button>
      <section
        id={regionId}
        aria-labelledby={headingId}
        aria-hidden={!expanded}
        style={{ visibility: expanded ? "visible" : "hidden" }}
        className={cn(
          "grid transition-accordion duration-300 ease-out motion-reduce:transition-none",
          expanded
            ? "visible grid-rows-1fr opacity-100"
            : "invisible grid-rows-0fr opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "flex flex-col gap-5 pr-6 pb-7 pl-6 sm:pr-12",
              imageLabel ? "sm:flex-row sm:items-start" : "max-w-275 sm:pl-36",
            )}
          >
            {imageLabel && (
              <PlaceholdImage
                label={imageLabel}
                width={320}
                height={224}
                className="h-48 w-full shrink-0 rounded-xl object-cover sm:h-52 sm:w-72"
              />
            )}
            <p className="text-base leading-6 text-body">{body}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
