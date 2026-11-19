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
        "grid grid-cols-1 gap-8 border-b border-[#E8E5DA] pb-10 lg:grid-cols-[minmax(0,420px)_1fr]",
        className,
      )}
      {...props}
    >
      <div className="space-y-3">
        <NewsMediaPlaceholder
          label={title}
          variant={((selected % 3) + 1) as 1 | 2 | 3}
          className="h-[300px] w-full"
          data-testid="news-card-stage"
        />
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
                  ? "ring-2 ring-[#F6D34A] ring-offset-2 ring-offset-white"
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
          <span className="inline-flex items-center rounded-full bg-[#FBF6DF] px-3 py-1.5 text-xs font-semibold text-[#7A5B00]">
            Diupload pada: {dateLabel}
          </span>
          <span className="inline-flex items-center rounded-full border border-[#E8E5DA] bg-white px-3 py-1.5 text-xs font-semibold text-[#404040]">
            {photoCount} Foto
          </span>
        </div>
        {tag ? (
          <span className="inline-flex items-center rounded-full bg-[#FFF3C4] px-3 py-1.5 text-xs font-semibold text-[#7A5B00]">
            {tag}
          </span>
        ) : null}
        <h3 className="text-2xl font-bold leading-8 tracking-tight text-[#1C1C1C]">
          {title}
        </h3>
        <div className="space-y-3">
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-sm leading-[22px] text-[#404040]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
