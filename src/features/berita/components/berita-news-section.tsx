import { getNewsPage, totalNewsPages } from "../data/news-posts";
import { BeritaNewsList } from "./berita-news-list";

/**
 * Reads the ?halaman=N search param (Next 16: searchParams is a Promise and
 * a request-time API, so this runs under a Suspense boundary while the
 * static shell — hero — prerenders). Invalid/out-of-range values clamp to
 * page 1.
 */
export async function BeritaNewsSection({
  searchParams,
}: {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const raw = params.halaman;
  const requested = Array.isArray(raw) ? raw[0] : raw;
  const parsed = requested === undefined ? 1 : Number.parseInt(requested, 10);
  const page =
    Number.isNaN(parsed) || parsed < 1 || parsed > totalNewsPages ? 1 : parsed;

  return (
    <BeritaNewsList
      page={page}
      totalPages={totalNewsPages}
      posts={getNewsPage(page)}
    />
  );
}
