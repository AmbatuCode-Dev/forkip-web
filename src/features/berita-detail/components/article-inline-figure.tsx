import { NewsMediaPlaceholder } from "@/components/berita/news-media-placeholder";
import type { ArticleFigure } from "../types";

/**
 * Inline documentation figure between body paragraphs (spec §A): gradient
 * placeholder with a dark badge caption ("02 / 04 · Dokumentasi").
 */
export function ArticleInlineFigure({
  figure,
}: {
  readonly figure: ArticleFigure;
}) {
  return (
    <figure
      className="flex flex-col gap-3"
      data-testid={`article-figure-${figure.position}`}
    >
      <div className="relative">
        <NewsMediaPlaceholder
          label="Dokumentasi"
          variant={((figure.position % 3) + 1) as 1 | 2 | 3}
          className="h-75 w-full rounded-2xl"
        />
        <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-slate px-3 py-1.5 text-sm text-white shadow-xs">
          {figure.badge}
        </span>
      </div>
    </figure>
  );
}
