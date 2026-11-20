import { buttonVariants } from "@/components/ui/button";

/**
 * White card with the small gold "Unduh Surat" pill (spec §3). Figma places
 * the button directly under the left-aligned sentence, not at the far right.
 * href is a placeholder until the real template document URL is provided.
 */
export function TemplateSuratCard() {
  return (
    <section
      aria-labelledby="template-surat-heading"
      className="flex flex-col items-start gap-4 rounded-2xl border border-border-sand bg-white px-6 py-7"
    >
      <h2
        id="template-surat-heading"
        className="text-[26px] leading-[32px] font-bold text-ink"
      >
        Klik tombol di bawah untuk download template surat pengunduran diri
      </h2>
      {/* TODO(template): replace with the real template document URL. */}
      <a
        // biome-ignore lint/a11y/useValidAnchor: placeholder href until the real template URL exists.
        href="#"
        className={buttonVariants({ variant: "gold", size: "sm" })}
        aria-label="Unduh Surat pengunduran diri (tautan belum tersedia)"
      >
        Unduh Surat
      </a>
    </section>
  );
}
