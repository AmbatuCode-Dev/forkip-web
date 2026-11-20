"use client";

import { type ComponentProps, useState } from "react";
import { NewsMediaPlaceholder } from "@/components/berita/news-media-placeholder";
import { cn } from "@/utils/cn";

export interface NewsCardProps extends ComponentProps<"article"> {
  dateLabel: string;
  photoCount: number;
  title: string;
  paragraphs: string[];
  /**
   * Optional tag pill rendered above the title
   * (e.g. "Selesai dilaksanakan & sosialisasi program KIP-K UNJ").
   */
  tag?: string;
  /** Lead story: 38/48 title instead of the default 28/36 (Figma). */
  lead?: boolean;
  /** Compact variant: 11px stage badge and 12/16 caption. */
  small?: boolean;
  /** Optional dark badge over the media stage (e.g. "01 / 04 · Foto"). */
  stageBadge?: string;
  /** Optional caption line below the media stage. */
  caption?: string;
}

/**
 * Paginated news list card (spec §7): media stage + thumbnail strip on the
 * left, date/photo pills + title + paragraphs on the right. Selected
 * thumbnail gets the gold ring; media are gradient placeholders.
 */
export function NewsCard({
  dateLabel,
  photoCount,
  title,
  paragraphs,
  tag,
  lead = false,
  small = false,
  stageBadge,
  caption,
  className,
  ...props
}: NewsCardProps) {
  const [selected, setSelected] = useState(0);
  const thumbCount = Math.max(1, Math.min(4, photoCount));
  const thumbnails = Array.from({ length: thumbCount }, (_, index) => ({
    id: `foto-${index + 1}-dari-${thumbCount}`,
    position: index,
  }));

  return (
    <article
      className={cn(
        "grid grid-cols-1 gap-8 border-b border-border-sand pb-10 lg:grid-cols-420",
        className,
      )}
      {...props}
    >
      <div className="space-y-3">
        <div className="relative">
          <NewsMediaPlaceholder
            label={title}
            variant={((selected % 3) + 1) as 1 | 2 | 3}
            className="h-75 w-full"
            data-testid="news-card-stage"
          />
          {stageBadge ? (
            <span
              className={cn(
                "absolute top-4 left-4 inline-flex items-center rounded-full bg-slate px-3 py-1.5 font-bold text-white shadow-xs",
                small ? "text-11" : "text-xs",
              )}
            >
              {stageBadge}
            </span>
          ) : null}
        </div>
        {caption ? (
          <p
            className={cn(
              "font-semibold text-ink",
              small ? "text-xs leading-4" : "text-13 leading-18",
            )}
          >
            {caption}
          </p>
        ) : null}
        <fieldset
          className="flex gap-3 border-0 p-0"
          aria-label={`Thumbnail foto ${title}`}
        >
          {thumbnails.map((thumbnail) => (
            <button
              key={thumbnail.id}
              type="button"
              aria-label={`Lihat foto ${thumbnail.position + 1} dari ${thumbCount}`}
              aria-pressed={selected === thumbnail.position}
              onClick={() => setSelected(thumbnail.position)}
              className={cn(
                "h-16 w-24 cursor-pointer rounded-lg transition-shadow",
                selected === thumbnail.position
                  ? "ring-2 ring-gold ring-offset-2 ring-offset-white"
                  : "opacity-90 hover:opacity-100",
              )}
            >
              <NewsMediaPlaceholder
                label={title}
                variant={((thumbnail.position % 3) + 1) as 1 | 2 | 3}
                className="h-full w-full rounded-lg"
              />
            </button>
          ))}
        </fieldset>
      </div>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-gold-soft px-3 py-1.5 text-xs font-bold text-gold-ink">
            Diupload pada: {dateLabel}
          </span>
          <span className="inline-flex items-center rounded-full border border-border-sand bg-white px-3 py-1.5 text-xs font-semibold text-body">
            {photoCount} Foto
          </span>
        </div>
        {tag ? (
          <span className="inline-flex items-center rounded-full bg-gold-pale px-3 py-1.5 text-xs font-semibold text-gold-ink">
            {tag}
          </span>
        ) : null}
        <h3
          className={cn(
            "font-extrabold tracking-tight text-ink",
            lead ? "text-38 leading-12" : "text-28 leading-9",
          )}
        >
          {title}
        </h3>
        <div className="space-y-3">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-15 leading-6 text-body">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
