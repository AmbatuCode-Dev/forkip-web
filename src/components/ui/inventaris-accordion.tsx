"use client";

import { type ComponentProps, useId, useState } from "react";
import { AccordionToggleIcon } from "@/components/ui/accordion-toggle-icon";
import { cn } from "@/utils/cn";

export interface InventarisAccordionProps extends ComponentProps<"div"> {
  chip: string;
  title: string;
  meta: string;
  paragraphs: string[];
  footnote?: string;
  defaultExpanded?: boolean;
}

/**
 * Accordion bar for inventory items (spec §4, Handy Talky pattern).
 * Collapsed: chip + title + meta + plus icon. Expanded: paragraphs + footnote, minus icon.
 */
export function InventarisAccordion({
  chip,
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

  return (
    <div
      className={cn(
        "rounded-[10px] border border-[#E8E5DA] bg-white transition-colors",
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
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A5B00] sm:px-6"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="shrink-0 rounded-md bg-[#FBFAF6] px-3 py-1.5 text-[9px] font-semibold leading-5 text-[#2B2B2B]">
            {chip}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[15px] font-semibold leading-6 text-[#1C1C1C]">
              {title}
            </span>
            <span className="block truncate text-xs leading-5 text-[#666666]">
              {meta}
            </span>
          </span>
        </span>
        <AccordionToggleIcon expanded={expanded} />
      </button>
      <section
        id={regionId}
        aria-labelledby={headingId}
        hidden={!expanded}
        className="overflow-hidden transition-[height] duration-300 motion-reduce:transition-none"
      >
        <div className="max-w-[1100px] space-y-3 px-4 pb-4 sm:px-6">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-[13px] leading-5 text-[#666666]">
              {paragraph}
            </p>
          ))}
          {footnote ? (
            <p className="text-xs italic leading-5 text-[#666666]">
              {footnote}
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
