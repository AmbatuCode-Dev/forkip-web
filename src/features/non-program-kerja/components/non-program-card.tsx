import { NewsMediaPlaceholder } from "@/components/berita/news-media-placeholder";
import { buttonVariants } from "@/components/ui/button";
import { nonProgramLinks } from "../data";
import type { NonProgramItem } from "../types";

/**
 * Non-program card (Figma frame 224:1587): gradient photo placeholder, gold
 * tag pill, title, optional body, then "Arsip Kegiatan" (gold) +
 * "Laporan Non Program Kerja" (outline) actions.
 */
export function NonProgramCard({ item }: { readonly item: NonProgramItem }) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-border-sand bg-white p-6">
      <NewsMediaPlaceholder
        label={item.photoLabel}
        variant={item.photoVariant}
        className="h-47"
      />
      <span className="inline-flex w-fit items-center rounded-full bg-gold-soft px-3 py-1.5 text-xs font-bold text-gold-ink">
        Non Program Kerja
      </span>
      <h3 className="text-xl leading-7 font-bold text-ink">{item.title}</h3>
      {item.body ? (
        <p className="text-sm leading-6 text-body">{item.body}</p>
      ) : null}
      <div className="mt-auto flex flex-wrap gap-3 pt-2">
        <a
          href={nonProgramLinks.archiveHref}
          className={buttonVariants({
            variant: "gold",
            size: "md",
            className: "px-5",
          })}
        >
          Arsip Kegiatan
        </a>
        <a
          href={nonProgramLinks.reportHref}
          className={buttonVariants({
            variant: "outline",
            size: "md",
            className: "px-5",
          })}
        >
          Laporan Non Program Kerja
        </a>
      </div>
    </article>
  );
}
