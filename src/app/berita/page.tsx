import type { Metadata } from "next";
import { Suspense } from "react";
import { BeritaHero, BeritaNewsSection } from "@/features/berita";

export const metadata: Metadata = {
  title: "Berita",
  description:
    "Informasi dan transparansi laporan kegiatan FORKIP UNJ, dikelola oleh divisi Humas.",
};

export default async function BeritaPage({
  searchParams,
}: PageProps<"/berita">) {
  return (
    <>
      <BeritaHero />
      <div className="mx-auto w-full max-w-300 px-4 pt-12 pb-20 sm:px-6 xl:px-0">
        <Suspense
          fallback={<p className="text-sm text-body-muted">Memuat berita…</p>}
        >
          <BeritaNewsSection searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
