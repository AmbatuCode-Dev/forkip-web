/**
 * Google Form embed placeholder (spec §4): TODO replace the placeholder
 * body with the real <iframe> once the form URL is provided.
 */
export function GoogleFormEmbedCard() {
  return (
    <section
      aria-labelledby="google-form-embedded-heading"
      className="flex min-h-65 flex-col items-center justify-center gap-2 rounded-2xl border border-border-sand bg-white p-8 text-center"
    >
      <p
        id="google-form-embedded-heading"
        className="text-xs font-bold tracking-wide12 text-gold-ink uppercase"
      >
        Google Form tertanam
      </p>
      <p className="text-base font-bold text-ink">
        Pendataan Pengunduran KIP-K UNJ 2026
      </p>
      {/* TODO(gform): embed the actual Google Form iframe here. */}
    </section>
  );
}
