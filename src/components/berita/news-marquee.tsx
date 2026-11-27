"use client";

import type { ComponentProps } from "react";
import { PlaceholdImage } from "@/components/ui/placehold-image";
import { cn } from "@/utils/cn";

export interface NewsMarqueeItem {
  label: string;
}

export interface NewsMarqueeProps extends ComponentProps<"div"> {
  items: NewsMarqueeItem[];
  /**
   * Card order varies per phase of the landing page (spec §5: fase A | B).
   */
  fase?: "A" | "B";
}

/** Figma card widths cycle [460, 280, 440, 300, 420] across the strip. */
const CARD_WIDTHS = [
  { cls: "w-115", px: 460 },
  { cls: "w-70", px: 280 },
  { cls: "w-110", px: 440 },
  { cls: "w-75", px: 300 },
  { cls: "w-105", px: 420 },
] as const;

function MarqueeCard({
  label,
  widthClass,
  px,
}: NewsMarqueeItem & { widthClass: string; px: number }) {
  return (
    <div
      className={cn(
        "relative h-95 shrink-0 overflow-hidden rounded-3xl",
        widthClass,
      )}
      data-testid="marquee-card"
    >
      <PlaceholdImage
        label={label}
        width={px}
        height={380}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

/**
 * Full-width auto-scrolling strip of news photo placeholders (spec §5).
 * Duplicated card list for a seamless translateX loop; pauses on hover;
 * animation disabled under prefers-reduced-motion.
 */
export function NewsMarquee({
  items,
  fase = "A",
  className,
  ...props
}: NewsMarqueeProps) {
  const ordered = [...items];
  if (fase === "B") {
    ordered.push(ordered.shift() as NewsMarqueeItem);
  }
  const loop = [
    ...ordered.map((item) => ({ item, key: `${item.label}-a` })),
    ...ordered.map((item) => ({ item, key: `${item.label}-b` })),
  ];

  return (
    <div
      className={cn(
        "group/marquee w-full overflow-hidden bg-surface-50 py-10",
        className,
      )}
      data-fase={fase}
      {...props}
    >
      <div
        className="flex w-max gap-5 will-change-transform group-hover/marquee:[animation-play-state:paused] motion-safe:animate-marquee-scroll"
        data-testid="marquee-strip"
      >
        {loop.map(({ item, key }, index) => (
          <MarqueeCard
            key={key}
            label={item.label}
            widthClass={CARD_WIDTHS[index % CARD_WIDTHS.length].cls}
            px={CARD_WIDTHS[index % CARD_WIDTHS.length].px}
          />
        ))}
      </div>
    </div>
  );
}
