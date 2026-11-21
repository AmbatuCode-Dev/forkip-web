import type { ArticleDetailContent } from "../types";
import { ArticleBackLink, ArticleBreadcrumb } from "./article-breadcrumb";
import { ArticleHeroMedia } from "./article-hero-media";
import { ArticleInlineFigure } from "./article-inline-figure";

/**
 * Article detail body (spec §A, frame 392:657): own breadcrumb + article
 * header (no PageHero), "Berita" tag pill, H1 52/60 ExtraBold, 20/30
 * subtitle, meta row, hero media block, 720px content column with
 * paragraphs interleaved by figures, and the "Kembali ke Berita" link.
 * Presentational only — no "use client".
 */
export function ArticleDetailView({
  article,
}: {
  readonly article: ArticleDetailContent;
}) {
  return (
    <div className="mx-auto w-full max-w-300 px-4 pt-56 pb-96 sm:px-6 xl:px-0">
      <div className="flex flex-col gap-8">
        <ArticleBreadcrumb title={article.title} />

        <div
          className="flex flex-col items-start gap-5"
          data-testid="article-header"
        >
          <span className="inline-flex items-center rounded-full bg-gold-soft px-3 py-1.5 text-xs font-bold text-gold-ink">
            Berita
          </span>
          <h1 className="text-52 leading-15 font-extrabold tracking-t05 text-ink">
            {article.title}
          </h1>
          <p
            className="max-w-160 text-xl font-medium text-body"
            style={{ lineHeight: "30px" }}
          >
            {article.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-body-muted">
            <span className="text-15 font-semibold text-ink">
              {article.author}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {article.uploadedLabel} · {article.readTimeLabel}
            </span>
          </div>
        </div>

        {article.heroMedia ? (
          <div className="max-w-240">
            <ArticleHeroMedia media={article.heroMedia} />
          </div>
        ) : null}

        <div className="flex max-w-180 flex-col gap-8">
          {article.paragraphs.map((paragraph, index) => (
            <div key={paragraph.slice(0, 48)} className="flex flex-col gap-8">
              <p className="text-lg leading-8 text-body">{paragraph}</p>
              {article.figures[index] ? (
                <ArticleInlineFigure figure={article.figures[index]} />
              ) : null}
            </div>
          ))}
        </div>

        <ArticleBackLink />
      </div>
    </div>
  );
}
