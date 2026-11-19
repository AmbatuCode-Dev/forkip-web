import { NewsCard } from "@/components/berita/news-card";
import { NewsPagination } from "@/components/berita/news-pagination";
import { newsPosts } from "../data/news-posts";
import type { NewsPost } from "../types";
import { NewsMediaOnlyCard } from "./news-media-only-card";

function NewsListItem({ post }: { post: NewsPost }) {
  if (post.mediaOnly) {
    return <NewsMediaOnlyCard post={post} />;
  }
  return (
    <NewsCard
      dateLabel={post.uploadedLabel}
      photoCount={post.photoCount}
      title={post.title}
      paragraphs={[...post.paragraphs]}
      data-testid={`news-card-${post.slug}`}
    />
  );
}

export interface BeritaNewsListProps {
  readonly page: number;
  readonly totalPages: number;
  readonly posts: readonly NewsPost[];
}

/**
 * Paginated news list (spec §2–§3): cards grid + pagination bar wired to
 * ?halaman=N links via the shared NewsPagination.
 */
export function BeritaNewsList({
  page,
  totalPages,
  posts,
}: BeritaNewsListProps) {
  return (
    <section
      aria-labelledby="berita-list-heading"
      className="flex flex-col gap-10"
    >
      <h2 id="berita-list-heading" className="sr-only">
        Daftar berita
      </h2>
      <div className="flex flex-col gap-12">
        {posts.map((post) => (
          <NewsListItem key={post.slug} post={post} />
        ))}
      </div>
      <NewsPagination
        page={page}
        totalPages={totalPages}
        totalItems={newsPosts.length}
        basePath="/berita"
      />
    </section>
  );
}
