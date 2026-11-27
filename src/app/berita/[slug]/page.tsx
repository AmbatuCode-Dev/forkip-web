import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  ArticleDetailView,
  articleStaticParams,
  getArticleDetail,
} from "@/features/berita-detail";

/** Prerender every news-post slug at build time (spec §A). */
export async function generateStaticParams() {
  return articleStaticParams();
}

export async function generateMetadata({
  params,
}: PageProps<"/berita/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleDetail(slug);
  if (!article) {
    return { title: "Berita" };
  }
  return {
    title: article.title,
    description: article.subtitle,
  };
}

/** /berita/[slug] — article detail (spec §A); unknown slug → 404. */
export default function BeritaDetailPage({
  params,
}: PageProps<"/berita/[slug]">) {
  return (
    <Suspense
      fallback={<p className="text-sm text-body-muted">Memuat berita…</p>}
    >
      <Article params={params} />
    </Suspense>
  );
}

async function Article({
  params,
}: Pick<PageProps<"/berita/[slug]">, "params">) {
  const { slug } = await params;
  const article = await getArticleDetail(slug);
  if (!article) {
    notFound();
  }
  return <ArticleDetailView article={article} />;
}
