import type { Metadata } from "next";
import { Suspense } from "react";
import {
  BeritaHero,
  BeritaNewsSection,
  beritaHero,
  getBeritaPosts,
} from "@/features/berita";

export async function generateMetadata(): Promise<Metadata> {
  return { title: beritaHero.title, description: beritaHero.description };
}

export default async function BeritaPage({
  searchParams,
}: PageProps<"/berita">) {
  const posts = await getBeritaPosts();

  return (
    <>
      <BeritaHero />
      <div className="mx-auto w-full max-w-300 px-4 pt-12 pb-20 sm:px-6 xl:px-0">
        <Suspense
          fallback={<p className="text-sm text-body-muted">Memuat berita…</p>}
        >
          <BeritaNewsSection searchParams={searchParams} posts={posts} />
        </Suspense>
      </div>
    </>
  );
}
