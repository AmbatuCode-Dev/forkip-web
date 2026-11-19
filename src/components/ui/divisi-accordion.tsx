"use client";

import { type ComponentProps, useId, useState } from "react";
import { AccordionToggleIcon } from "@/components/ui/accordion-toggle-icon";
import { cn } from "@/utils/cn";

export interface DivisiAccordionProps extends ComponentProps<"div"> {
  chip: string;
  title: string;
  body: string;
  defaultExpanded?: boolean;
}

/**
 * Accordion bar for division descriptions (spec §3, BPHI pattern).
 * Collapsed: chip + title + plus icon. Expanded: body text below, minus icon.
 */
export function DivisiAccordion({
  chip,
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
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A5B00] sm:px-6"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="shrink-0 rounded-md bg-[#FBFAF6] px-3 py-1.5 text-[9px] font-semibold leading-5 text-[#2B2B2B]">
            {chip}
          </span>
          <span className="truncate text-[15px] font-semibold leading-6 text-[#1C1C1C]">
            {title}
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
        <p className="max-w-[1100px] px-4 pb-4 text-[13px] leading-5 text-[#666666] sm:px-6">
          {body}
        </p>
      </section>
    </div>
  );
}
