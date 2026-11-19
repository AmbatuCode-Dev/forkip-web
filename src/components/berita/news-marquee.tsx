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

export const MARQUEE_LABELS_FASE_A: NewsMarqueeItem[] = [
  { label: "Explore KIPK 2026" },
  { label: "Pelatihan Divisi KIF" },
  { label: "BUSAMAKIP" },
  { label: "Verifikasi KIPK SNBP" },
  { label: "Gelar KIPK" },
];

export const MARQUEE_LABELS_FASE_B: NewsMarqueeItem[] = [
  { label: "BUSAMAKIP" },
  { label: "Verifikasi KIPK SNBP" },
  { label: "Gelar KIPK" },
  { label: "Explore KIPK 2026" },
  { label: "Pelatihan Divisi KIF" },
];

function MarqueeCard({ label }: NewsMarqueeItem) {
  return (
    <div
      className="relative flex h-[300px] w-[340px] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FBF6DF] to-[#F6EFAF]"
      data-testid="marquee-card"
    >
      <span className="text-sm text-[#666666]">Foto {label} (placeholder)</span>
      <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white py-2 pl-3 pr-4 text-xs font-semibold text-[#1C1C1C] shadow-xs">
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full bg-[#F6D34A]"
        />
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
        "group/marquee w-full overflow-hidden bg-[#FBFAF6] py-10",
        className,
      )}
      data-fase={fase}
      {...props}
    >
      <div
        className="marquee-track flex w-max gap-6 will-change-transform group-hover/marquee:[animation-play-state:paused]"
        data-testid="marquee-strip"
      >
        {loop.map(({ item, key }) => (
          <MarqueeCard key={key} label={item.label} />
        ))}
      </div>
      <style>{`
				@media (prefers-reduced-motion: no-preference) {
					.marquee-track {
						animation: marquee-scroll 30s linear infinite;
					}
					@keyframes marquee-scroll {
						from { transform: translateX(0); }
						to { transform: translateX(-50%); }
					}
				}
			`}</style>
    </div>
  );
}
