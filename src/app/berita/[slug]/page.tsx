import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArticleDetailView,
  articleStaticParams,
  getArticleDetail,
} from "@/features/berita-detail";

/** Prerender every news-post slug at build time (spec §A). */
export function generateStaticParams() {
  return articleStaticParams();
}

export async function generateMetadata({
  params,
}: PageProps<"/berita/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleDetail(slug);
  if (!article) {
    return { title: "Berita" };
  }
  return {
    title: article.title,
    description: article.subtitle,
  };
}

/** /berita/[slug] — article detail (spec §A); unknown slug → 404. */
export default async function BeritaDetailPage({
  params,
}: PageProps<"/berita/[slug]">) {
  const { slug } = await params;
  const article = getArticleDetail(slug);
  if (!article) {
    notFound();
  }
  return <ArticleDetailView article={article} />;
}
