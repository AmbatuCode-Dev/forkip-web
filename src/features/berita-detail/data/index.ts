import type { NewsPost } from "@/features/berita";
import { newsPosts } from "@/features/berita";
import type {
  ArticleDetailContent,
  ArticleFigure,
  ArticleMedia,
} from "../types";

/** Author shown in the detail meta row (spec §A). */
export const ARTICLE_AUTHOR = "Humas Forkip UNJ";

/** ~200 words per minute, minimum 1 (spec §A meta row read time). */
function estimateReadMinutes(paragraphs: readonly string[]): number {
  const words = paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function firstSentence(paragraph: string): string {
  const end = paragraph.indexOf(". ");
  const sentence = end === -1 ? paragraph : paragraph.slice(0, end + 1);
  return sentence.trim();
}

/** One-line summary under the H1: the first sentence of the lead paragraph. */
function subtitleFor(post: NewsPost): string {
  const lead = post.paragraphs[0];
  return lead ? firstSentence(lead) : "";
}

function heroMediaFor(post: NewsPost): ArticleMedia | null {
  if (post.photoCount <= 0) {
    return null;
  }
  const total = String(post.photoCount).padStart(2, "0");
  return {
    label: "Foto utama",
    badge: post.gallery?.badge ?? `01 / ${total} · Foto`,
    caption: post.gallery?.caption ?? post.title,
  };
}

/** Photo 01 is the hero media; photos 02…N become inline body figures. */
function figuresFor(post: NewsPost): readonly ArticleFigure[] {
  if (post.photoCount <= 1) {
    return [];
  }
  const total = String(post.photoCount).padStart(2, "0");
  const suffix = post.gallery?.badge?.split("·")[1]?.trim() ?? "Foto";
  return Array.from({ length: post.photoCount - 1 }, (_, index) => {
    const position = index + 2;
    return {
      position,
      badge: `${String(position).padStart(2, "0")} / ${total} · ${suffix}`,
    };
  });
}

/** Maps a verbatim NewsPost onto the §A detail view-model. */
export function toArticleDetailContent(post: NewsPost): ArticleDetailContent {
  return {
    slug: post.slug,
    title: post.title,
    subtitle: subtitleFor(post),
    author: ARTICLE_AUTHOR,
    uploadedLabel: post.uploadedLabel,
    readTimeLabel: `${estimateReadMinutes(post.paragraphs)} menit baca`,
    heroMedia: heroMediaFor(post),
    paragraphs: post.paragraphs,
    figures: figuresFor(post),
  };
}

/** Detail content for a slug; undefined for unknown slugs (→ notFound()). */
export function getArticleDetail(
  slug: string,
): ArticleDetailContent | undefined {
  const post = newsPosts.find((candidate) => candidate.slug === slug);
  return post ? toArticleDetailContent(post) : undefined;
}

/** Every post slug, for generateStaticParams (spec §A). */
export function articleStaticParams(): Array<{ slug: string }> {
  return newsPosts.map((post) => ({ slug: post.slug }));
}
