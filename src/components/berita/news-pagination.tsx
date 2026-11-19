"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

export interface NewsPaginationProps extends ComponentProps<"nav"> {
  page: number;
  totalPages: number;
  totalItems: number;
  /**
   * When given, prev/next/numbered controls render as links to
   * `${basePath}?halaman=N`; otherwise they call `onPageChange`.
   */
  basePath?: string;
  onPageChange?: (page: number) => void;
}

function pageHref(basePath: string, page: number) {
  return `${basePath}?halaman=${page}`;
}

/**
 * Pagination bar for the news list (spec §7): "Halaman X dari Y — Total Z
 * berita dipublikasikan" on the left; ‹ Sebelumnya, numbered circles with
 * the gold current page, Berikutnya › on the right.
 */
export function NewsPagination({
  page,
  totalPages,
  totalItems,
  basePath,
  onPageChange,
  className,
  ...props
}: NewsPaginationProps) {
  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const controlClassName =
    "inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold";

  const prevControl = basePath ? (
    <Link
      href={pageHref(basePath, page - 1)}
      aria-disabled={prevDisabled}
      aria-label="Halaman sebelumnya"
      className={cn(
        controlClassName,
        "border border-[#E8E5DA] bg-white text-[#404040]",
        prevDisabled && "pointer-events-none opacity-50",
      )}
    >
      <span aria-hidden="true">‹</span> Sebelumnya
    </Link>
  ) : (
    <button
      type="button"
      disabled={prevDisabled}
      aria-label="Halaman sebelumnya"
      onClick={() => onPageChange?.(page - 1)}
      className={cn(
        controlClassName,
        "cursor-pointer border border-[#E8E5DA] bg-white text-[#404040]",
        prevDisabled && "cursor-not-allowed opacity-50",
      )}
    >
      <span aria-hidden="true">‹</span> Sebelumnya
    </button>
  );

  const nextControl = basePath ? (
    <Link
      href={pageHref(basePath, page + 1)}
      aria-disabled={nextDisabled}
      aria-label="Halaman berikutnya"
      className={cn(
        controlClassName,
        "border border-[#E8E5DA] bg-white text-[#404040]",
        nextDisabled && "pointer-events-none opacity-50",
      )}
    >
      Berikutnya <span aria-hidden="true">›</span>
    </Link>
  ) : (
    <button
      type="button"
      disabled={nextDisabled}
      aria-label="Halaman berikutnya"
      onClick={() => onPageChange?.(page + 1)}
      className={cn(
        controlClassName,
        "cursor-pointer border border-[#E8E5DA] bg-white text-[#404040]",
        nextDisabled && "cursor-not-allowed opacity-50",
      )}
    >
      Berikutnya <span aria-hidden="true">›</span>
    </button>
  );

  return (
    <nav
      aria-label="Navigasi halaman berita"
      className={cn(
        "flex flex-wrap items-center justify-between gap-4",
        className,
      )}
      {...props}
    >
      <p className="text-sm text-[#404040]">
        <span className="font-semibold text-[#1C1C1C]">
          Halaman {page} dari {totalPages}
        </span>
        <span aria-hidden="true"> — </span>
        <span className="sr-only">
          Halaman {page} dari {totalPages} —{" "}
        </span>
        Total {totalItems} berita dipublikasikan
      </p>
      <div className="flex items-center gap-2">
        {prevControl}
        {pages.map((pageNumber) =>
          pageNumber === page ? (
            <span
              key={pageNumber}
              aria-current="page"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F6D34A] text-sm font-semibold text-[#1C1C1C]"
            >
              {pageNumber}
            </span>
          ) : basePath ? (
            <Link
              key={pageNumber}
              href={pageHref(basePath, pageNumber)}
              aria-label={`Halaman ${pageNumber}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E5DA] bg-white text-sm font-semibold text-[#404040] hover:bg-[#FBF6DF]"
            >
              {pageNumber}
            </Link>
          ) : (
            <button
              key={pageNumber}
              type="button"
              aria-label={`Halaman ${pageNumber}`}
              onClick={() => onPageChange?.(pageNumber)}
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#E8E5DA] bg-white text-sm font-semibold text-[#404040] hover:bg-[#FBF6DF]"
            >
              {pageNumber}
            </button>
          ),
        )}
        {nextControl}
      </div>
    </nav>
  );
}
