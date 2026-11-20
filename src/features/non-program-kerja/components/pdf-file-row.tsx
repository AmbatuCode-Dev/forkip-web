import type { PdfFile } from "../types";

/**
 * AD/ART document row (Figma frame 224:1587): red PDF badge + filename link.
 */
export function PdfFileRow({ file }: { readonly file: PdfFile }) {
  return (
    <section
      aria-label="Dokumen AD/ART"
      className="flex items-center gap-4 rounded-14 border border-border-sand bg-white px-6 py-4"
    >
      <span className="inline-flex shrink-0 items-center rounded-md bg-destructive/10 px-2.5 py-1 text-xs font-bold tracking-wide text-destructive">
        {file.badge}
      </span>
      {/* TODO: point to the real AD/ART PDF once uploaded. */}
      <a
        href={file.href}
        className="truncate text-sm font-semibold text-ink underline decoration-border-sand underline-offset-4 transition-colors hover:text-gold-ink focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        {file.name}
      </a>
    </section>
  );
}
