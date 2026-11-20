"use client";

import { type ComponentProps, useId, useState } from "react";
import { AccordionToggleIcon } from "@/components/ui/accordion-toggle-icon";
import { cn } from "@/utils/cn";

export interface DivisiAccordionProps extends ComponentProps<"div"> {
  chip: string;
  /**
   * When given, renders the 96×64 r4 image placeholder (Figma) in place
   * of the chip. `chip` remains the fallback for existing callers.
   */
  imageLabel?: string;
  title: string;
  body: string;
  defaultExpanded?: boolean;
}

/**
 * Accordion bar for division descriptions (spec §3, BPHI pattern).
 * Collapsed: 104px row with image placeholder (or chip) + title + plus
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
        className="flex h-26 w-full cursor-pointer items-center justify-between gap-6 px-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-ink sm:px-6"
      >
        <span className="flex min-w-0 items-center gap-6">
          {imageLabel ? (
            <span className="flex h-16 w-24 shrink-0 items-center justify-center rounded bg-surface-50 text-10 font-semibold leading-14 text-body-muted">
              {imageLabel}
            </span>
          ) : (
            <span className="shrink-0 rounded-md bg-surface-50 px-3 py-1.5 text-9 font-semibold leading-5 text-ink-soft">
              {chip}
            </span>
          )}
          <span className="truncate text-22 font-semibold leading-8 text-ink">
            {title}
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
          <p className="text-15 leading-6 text-body">{body}</p>
        </div>
      </section>
    </div>
  );
}
