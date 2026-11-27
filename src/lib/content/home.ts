import "server-only";

import type { HomeBeritaContent } from "@/types";
import { readFrontmatter } from "./read-mdx";
import { homeBeritaContentSchema } from "./schemas";

export async function getHomeBerita(): Promise<HomeBeritaContent> {
  return readFrontmatter<HomeBeritaContent>(
    "home/berita",
    homeBeritaContentSchema,
  );
}
