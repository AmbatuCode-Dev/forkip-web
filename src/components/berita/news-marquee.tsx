"use client";

import type { ComponentProps } from "react";
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
const CARD_WIDTHS = ["w-115", "w-70", "w-110", "w-75", "w-105"];

function MarqueeCard({
  label,
  widthClass,
}: NewsMarqueeItem & { widthClass: string }) {
  return (
    <div
      className={cn(
        "relative flex h-95 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-gold-soft to-gold-soft-strong",
        widthClass,
      )}
      data-testid="marquee-card"
    >
      <span className="text-sm font-semibold text-body-muted">
        Foto {label} (placeholder)
      </span>
      <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white py-2 pr-4 pl-3 text-sm font-bold text-ink shadow-xs">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold" />
        {label}
      </span>
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
            widthClass={CARD_WIDTHS[index % CARD_WIDTHS.length]}
          />
        ))}
      </div>
    </div>
  );
}
