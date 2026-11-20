import { newsPosts } from "../data/news-posts";
import type { NewsPost } from "../types";
import { BeritaNewsCard } from "./berita-news-card";
import { BeritaPagination } from "./berita-pagination";
import { NewsMediaOnlyCard } from "./news-media-only-card";

function NewsListItem({ post }: { post: NewsPost }) {
  if (post.mediaOnly) {
    return <NewsMediaOnlyCard post={post} />;
  }
  return <BeritaNewsCard post={post} />;
}

export interface BeritaNewsListProps {
  readonly page: number;
  readonly totalPages: number;
  readonly posts: readonly NewsPost[];
}

/**
 * Paginated news list (spec §2-§3): cards grid + pagination bar wired to
 * ?halaman=N links. The -mx offset cancels the app-level padding so the
 * cards span the Figma 1200px content column.
 */
export function BeritaNewsList({
  page,
  totalPages,
  posts,
}: BeritaNewsListProps) {
  return (
    <section
      aria-labelledby="berita-list-heading"
      className="-mx-4 flex flex-col gap-10 sm:-mx-6"
    >
      <h2 id="berita-list-heading" className="sr-only">
        Daftar berita
      </h2>
      <div className="flex flex-col gap-12">
        {posts.map((post) => (
          <NewsListItem key={post.slug} post={post} />
        ))}
      </div>
      <BeritaPagination
        page={page}
        totalPages={totalPages}
        totalItems={newsPosts.length}
      />
    </section>
  );
}
