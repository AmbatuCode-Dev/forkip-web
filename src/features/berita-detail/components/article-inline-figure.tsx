import { NewsMediaPlaceholder } from "@/components/berita/news-media-placeholder";
import type { ArticleFigure } from "../types";

/**
 * Inline documentation figure between body paragraphs (spec §A): a
 * PlaceholdImage tile with a dark badge caption ("02 / 04 · Dokumentasi").
 * Its label is baked into the placehold.co ?text= URL and exposed via alt.
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
          width={640}
          height={300}
          className="h-75 w-full rounded-2xl"
        />
        <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-slate px-3 py-1.5 text-sm text-white shadow-xs">
          {figure.badge}
        </span>
      </div>
    </figure>
  );
}
