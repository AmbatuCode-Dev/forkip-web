import Link from "next/link";

export interface BeritaPaginationProps {
  readonly page: number;
  readonly totalPages: number;
  readonly totalItems: number;
}

function pageHref(page: number) {
  return `/berita?halaman=${page}`;
}

const PILL =
  "inline-flex h-10 items-center gap-2 rounded-full border border-[#E8E5DA] bg-white px-4 text-[13px] font-medium text-[#404040]";

/**
 * Figma pagination bar: "Halaman X dari Y" in a white outlined pill plus the
 * total count as plain text; previous / numbered / next controls on the
 * right. Links keep the shared /berita?halaman=N URL contract.
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
      className="flex flex-wrap items-center justify-between gap-4"
    >
      <p className="flex items-center gap-3 text-[13px] text-[#404040]">
        <span className="rounded-full border border-[#E8E5DA] bg-white px-3 py-2 font-semibold text-[#1C1C1C]">
          Halaman {page} dari {totalPages}
        </span>
        <span className="sr-only">
          Halaman {page} dari {totalPages} -{" "}
        </span>
        Total {totalItems} berita dipublikasikan
      </p>
      <div className="flex items-center gap-2">
        {prevDisabled ? (
          <span
            aria-disabled="true"
            className={`${PILL} pointer-events-none opacity-50`}
          >
            <span aria-hidden="true">‹</span> Sebelumnya
          </span>
        ) : (
          <Link
            href={pageHref(page - 1)}
            aria-label="Halaman sebelumnya"
            className={PILL}
          >
            <span aria-hidden="true">‹</span> Sebelumnya
          </Link>
        )}
        {pages.map((number) =>
          number === page ? (
            <span
              key={number}
              aria-current="page"
              className="inline-flex size-10 items-center justify-center rounded-lg bg-[#F6D34A] text-[13px] font-bold text-[#1C1C1C]"
            >
              {number}
            </span>
          ) : (
            <Link
              key={number}
              href={pageHref(number)}
              aria-label={`Halaman ${number}`}
              className="inline-flex size-10 items-center justify-center rounded-lg border border-[#E8E5DA] bg-white text-[13px] font-semibold text-[#404040] hover:bg-[#FBF6DF]"
            >
              {number}
            </Link>
          ),
        )}
        {nextDisabled ? (
          <span
            aria-disabled="true"
            className={`${PILL} pointer-events-none opacity-50`}
          >
            Berikutnya <span aria-hidden="true">›</span>
          </span>
        ) : (
          <Link
            href={pageHref(page + 1)}
            aria-label="Halaman berikutnya"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-[#1C1C1C] px-4 text-[13px] font-semibold text-white"
          >
            Berikutnya <span aria-hidden="true">›</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
