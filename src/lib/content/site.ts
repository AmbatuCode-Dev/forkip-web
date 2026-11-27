import "server-only";

import type { SiteContent } from "@/types";
import { readFrontmatter } from "./read-mdx";
import { siteContentSchema } from "./schemas";

export async function getSite(): Promise<SiteContent> {
  return readFrontmatter<SiteContent>("site", siteContentSchema);
}
