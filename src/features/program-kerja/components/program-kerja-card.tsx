import { NewsMediaPlaceholder } from "@/components/berita/news-media-placeholder";
import { buttonVariants } from "@/components/ui/button";
import { isActionableHref } from "@/utils/is-actionable-href";
import { programKerjaLinks } from "../data";
import type { ProgramKerjaItem } from "../types";

/**
 * Program card (Figma frame 224:1467): gradient photo placeholder, gold tag
 * pill, title, optional body, then "Arsip Kegiatan" (gold) and/or
 * "Laporan Program Kerja" (outline) actions. Placeholder hrefs render no link.
 */
export function ProgramKerjaCard({
  item,
}: {
  readonly item: ProgramKerjaItem;
}) {
  const hasArchiveLink =
    item.hasArchive && isActionableHref(programKerjaLinks.archiveHref);
  const hasReportLink = isActionableHref(programKerjaLinks.reportHref);

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-border-sand bg-white p-6">
      <NewsMediaPlaceholder
        label={item.photoLabel}
        variant={item.photoVariant}
        width={560}
        height={188}
        className="h-47"
      />
      <span className="inline-flex w-fit items-center rounded-full bg-gold-soft px-3 py-1.5 text-xs font-bold text-gold-ink">
        Program Kerja
      </span>
      <h3 className="text-xl leading-7 font-bold text-ink">{item.title}</h3>
      {item.body ? (
        <p className="text-sm leading-6 text-body">{item.body}</p>
      ) : null}
      {hasArchiveLink || hasReportLink ? (
        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          {hasArchiveLink ? (
            <a
              href={programKerjaLinks.archiveHref}
              className={buttonVariants({
                variant: "gold",
                size: "md",
                className: "px-5",
              })}
            >
              Arsip Kegiatan
            </a>
          ) : null}
          {hasReportLink ? (
            <a
              href={programKerjaLinks.reportHref}
              className={buttonVariants({
                variant: "outline",
                size: "md",
                className: "px-5",
              })}
            >
              Laporan Program Kerja
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
