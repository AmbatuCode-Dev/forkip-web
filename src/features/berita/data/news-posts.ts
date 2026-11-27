import type { NewsPostContent } from "@/types";

/** Posts belonging to the requested page of the /berita list. */
export function getNewsPage(
  posts: readonly NewsPostContent[],
  page: number,
): readonly NewsPostContent[] {
  return posts.filter((post) => post.page === page);
}

/** Highest page number across posts; pages are explicit in the content. */
export function totalNewsPages(posts: readonly NewsPostContent[]): number {
  return Math.max(1, ...posts.map((post) => post.page));
}
