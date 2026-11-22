import { NewsMediaPlaceholder } from "@/components/berita/news-media-placeholder";
import type { ArticleMedia } from "../types";

/**
 * Main "Foto utama" block (spec §A): 960-wide gold-gradient stage with the
 * dark photo badge and a caption row below, reusing NewsMediaPlaceholder
 * and the NewsCard media-strip pattern (badge 14 Regular here).
 */
export function ArticleHeroMedia({ media }: { readonly media: ArticleMedia }) {
  return (
    <figure className="flex flex-col gap-3" data-testid="article-hero-media">
      <div className="relative">
        <NewsMediaPlaceholder
          label={media.label}
          variant={1}
          width={960}
          height={380}
          className="h-95 w-full rounded-2xl"
        />
        <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-slate px-3 py-1.5 text-sm text-white shadow-xs">
          {media.badge}
        </span>
      </div>
      <figcaption className="flex items-center gap-3">
        <span className="truncate text-sm text-body-muted">
          {media.caption}
        </span>
        <span className="inline-flex shrink-0 items-center rounded-full border border-border-sand bg-white px-3 py-1.5 text-sm text-body-muted">
          Dokumentasi
        </span>
      </figcaption>
    </figure>
  );
}
