import type { ComponentProps } from "react";
import { NewsMediaPlaceholder } from "@/components/berita/news-media-placeholder";
import { cn } from "@/utils/cn";

export interface NewsGaleriItem {
  label: string;
  /**
   * Tailwind span for the grid column, e.g. "col-span-2".
   */
  span?: string;
}

export interface NewsGaleriProps extends ComponentProps<"div"> {
  items: NewsGaleriItem[];
  /**
   * "liputan" renders a 3-column grid with "01 / 04 · Dokumentasi"
   * index badges (spec §6); "default" renders a single large stage card.
   */
  variant?: "default" | "liputan";
}

const DEFAULT_INDEX_LABEL = "01 / 04 · Dokumentasi";

/**
 * Presentational photo galeri variants (spec §6). Pages compose these
 * with their own data; media are gradient placeholders, no external images.
 */
export function NewsGaleri({
  items,
  variant = "default",
  className,
  ...props
}: NewsGaleriProps) {
  if (items.length === 0) {
    return null;
  }

  if (variant === "liputan") {
    return (
      <div
        className={cn(
          "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
          className,
        )}
        {...props}
      >
        {items.map((item, index) => (
          <div key={item.label} className={cn("relative", item.span)}>
            <NewsMediaPlaceholder
              label={item.label}
              variant={((index % 3) + 1) as 1 | 2 | 3}
              className="h-[240px]"
            />
            <span className="absolute top-3 left-3 rounded-full bg-[#1C1C1C] px-3 py-1.5 text-[9px] font-semibold tracking-wide text-white">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(items.length).padStart(2, "0")} · Dokumentasi
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)} {...props}>
      <NewsMediaPlaceholder
        label={items[0].label}
        variant={1}
        className="h-[420px] w-full"
      />
      {items.length > 1 ? (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {items.slice(1).map((item, index) => (
            <NewsMediaPlaceholder
              key={item.label}
              label={item.label}
              variant={((index % 3) + 1) as 1 | 2 | 3}
              className="h-[140px]"
            />
          ))}
        </div>
      ) : null}
      <span className="sr-only">{DEFAULT_INDEX_LABEL}</span>
    </div>
  );
}
