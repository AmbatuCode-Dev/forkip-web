import "server-only";

import { getNewsPosts } from "@/lib/content/news";

/** News list content for the route and the article detail view-model. */
export async function getBeritaPosts() {
  return getNewsPosts();
}
