import Link from "next/link";

export interface BeritaPaginationProps {
  readonly page: number;
  readonly totalPages: number;
  readonly totalItems: number;
}

function pageHref(page: number) {
  return `/berita?halaman=${page}`;
}

const CONTROL =
  "inline-flex h-10 items-center gap-2 rounded-full border border-[#E8E5DA] bg-white px-4 text-sm font-semibold text-[#404040]";

/**
 * Figma pagination bar: "ARSIP LIPUTAN & KEGIATAN" eyebrow + page/total
 * summary on the left; ‹ Sebelumnya, numbered quick-switcher circles with
 * the gold current page, Berikutnya › on the right. Links keep the shared
 * /berita?halaman=N URL contract.
 */
export function BeritaPagination({
  page,
  totalPages,
  totalItems,
}: BeritaPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  return (
    <nav
      aria-label="Navigasi halaman berita"
      className="flex flex-wrap items-center justify-between gap-4 pt-8"
    >
      <div className="flex flex-col gap-2.5">
        <p className="text-xs font-bold text-[#1C1C1C] uppercase">
          ARSIP LIPUTAN & KEGIATAN
        </p>
        <p className="text-sm font-medium text-[#404040]">
          <span className="sr-only">
            Halaman {page} dari {totalPages} -{" "}
          </span>
          <span>
            Halaman {page} dari {totalPages}
          </span>{" "}
          — Total {totalItems} berita dipublikasikan
        </p>
      </div>
      <div className="flex items-center gap-2">
        {prevDisabled ? (
          <span
            aria-disabled="true"
            className={`${CONTROL} pointer-events-none opacity-50`}
          >
            <span aria-hidden="true">‹</span> Sebelumnya
          </span>
        ) : (
          <Link
            href={pageHref(page - 1)}
            aria-label="Halaman sebelumnya"
            className={CONTROL}
          >
            <span aria-hidden="true">‹</span> Sebelumnya
          </Link>
        )}
        <div className="flex items-center gap-1 rounded-xl p-1">
          {pages.map((number) =>
            number === page ? (
              <span
                key={number}
                aria-current="page"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F6D34A] text-[13px] font-semibold text-[#1C1C1C]"
              >
                {number}
              </span>
            ) : (
              <Link
                key={number}
                href={pageHref(number)}
                aria-label={`Halaman ${number}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E5DA] bg-white text-[13px] font-medium text-[#404040] hover:bg-[#FBF6DF]"
              >
                {number}
              </Link>
            ),
          )}
        </div>
        {nextDisabled ? (
          <span
            aria-disabled="true"
            className={`${CONTROL} pointer-events-none opacity-50`}
          >
            Berikutnya <span aria-hidden="true">›</span>
          </span>
        ) : (
          <Link
            href={pageHref(page + 1)}
            aria-label="Halaman berikutnya"
            className={CONTROL}
          >
            Berikutnya <span aria-hidden="true">›</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
