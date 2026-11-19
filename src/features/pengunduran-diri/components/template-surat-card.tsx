import { buttonVariants } from "@/components/ui/button";

/**
 * Cream card with the gold "Unduh Surat" pill (spec §3). href is a
 * placeholder until the real template document URL is provided.
 */
export function TemplateSuratCard() {
  return (
    <section
      aria-labelledby="template-surat-heading"
      className="flex flex-col gap-4 rounded-2xl border border-border-sand bg-gold-soft p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
    >
      <h2
        id="template-surat-heading"
        className="text-[15px] font-semibold text-ink"
      >
        Klik tombol di bawah untuk download template surat pengunduran diri
      </h2>
      {/* TODO(template): replace with the real template document URL. */}
      <a
        // biome-ignore lint/a11y/useValidAnchor: placeholder href until the real template URL exists.
        href="#"
        className={buttonVariants({ variant: "gold", size: "lg" })}
        aria-label="Unduh Surat pengunduran diri (tautan belum tersedia)"
      >
        Unduh Surat
      </a>
    </section>
  );
}
