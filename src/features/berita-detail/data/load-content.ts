import "server-only";

import { getNewsPost, getNewsPosts } from "@/lib/content/news";
import type { ArticleDetailContent } from "../types";
import { toArticleDetailContent } from "./index";

/** Detail content for a slug; undefined for unknown slugs (→ notFound()). */
export async function getArticleDetail(
  slug: string,
): Promise<ArticleDetailContent | undefined> {
  const post = await getNewsPost(slug);
  return post ? toArticleDetailContent(post) : undefined;
}

/** Every post slug, for generateStaticParams (spec §A). */
export async function articleStaticParams(): Promise<Array<{ slug: string }>> {
  const posts = await getNewsPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
