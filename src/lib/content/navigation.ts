import "server-only";

import type { NavigationContent } from "@/types";
import { readFrontmatter } from "./read-mdx";
import { navigationContentSchema } from "./schemas";

export async function getNavigation(): Promise<NavigationContent> {
  return readFrontmatter<NavigationContent>(
    "navigation",
    navigationContentSchema,
  );
}
