import "server-only";

import type { NewsPostContent } from "@/types";
import {
  isNewsSlug,
  newsSlugs,
  newsSlugToFile,
  readFrontmatter,
} from "./read-mdx";
import { newsPostContentSchema } from "./schemas";

const newsFiles = newsSlugs.map((slug) => newsSlugToFile(slug));

export async function getNewsPosts(): Promise<readonly NewsPostContent[]> {
  return newsFiles
    .map((file) =>
      readFrontmatter<NewsPostContent>(file, newsPostContentSchema),
    )
    .sort((a, b) => a.order - b.order);
}

export async function getNewsPost(
  slug: string,
): Promise<NewsPostContent | undefined> {
  if (!isNewsSlug(slug)) return undefined;
  return readFrontmatter<NewsPostContent>(
    newsSlugToFile(slug),
    newsPostContentSchema,
  );
}
