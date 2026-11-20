import { programCards, programSection, programSpotlight } from "../data";

function PhotoPlaceholder({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={
        className ??
        "relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-gold-soft to-gold-soft-strong"
      }
    >
      <span className="px-6 text-center text-sm text-body-muted">{label}</span>
      <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white py-2 pr-4 pl-3 text-xs font-semibold text-ink shadow-xs">
        <span aria-hidden="true" className="size-2 rounded-full bg-gold" />
        {label}
      </span>
    </div>
  );
}

/**
 * Program Unggulan (spec §7): Kampung KIP-K UNJ spotlight + 3 program cards.
 */
export function ProgramSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto w-full max-w-300 px-4 sm:px-6 xl:px-0">
        <h2 className="text-center text-34 leading-11 font-extrabold tracking-t08 text-ink sm:text-42 sm:leading-50">
          {programSection.title}
        </h2>
        <p className="mx-auto mt-4 max-w-205 text-center text-sm leading-5 text-body-muted sm:text-base sm:leading-6">
          {programSection.subtitle}
        </p>

        <div className="mt-14 grid items-center gap-10 rounded-20 bg-surface-50 p-6 sm:p-10 lg:cols-spotlight">
          <div>
            <h3 className="text-32 leading-10 font-bold text-ink sm:text-40 sm:leading-12">
              {programSpotlight.title}
            </h3>
            {programSpotlight.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="mt-4 text-15 leading-6 text-body"
              >
                {paragraph}
              </p>
            ))}
            <ul className="mt-5 flex flex-col gap-4">
              {programSpotlight.bullets.map((bullet) => (
                <li key={bullet.label} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-2 shrink-0 rounded-full bg-gold"
                  />
                  <p className="text-15 leading-6 text-body">
                    <span className="font-bold text-ink">{bullet.label}</span>:{" "}
                    {bullet.text}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-15 leading-6 text-body">
              {programSpotlight.closing}
            </p>
          </div>

          <PhotoPlaceholder
            label={programSpotlight.photoLabel}
            className="relative flex h-105 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-soft to-gold-soft-strong lg:h-140"
          />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programCards.map((card) => (
            <article
              key={card.title}
              className="flex flex-col gap-4 rounded-2xl bg-surface-50 p-6"
            >
              <h3 className="min-h-18 text-lg leading-7 font-semibold text-ink">
                {card.title}
              </h3>
              <div className="relative flex h-42.5 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-soft to-gold-soft-strong">
                <span className="px-6 text-center text-sm text-body-muted">
                  {card.photoLabel}
                </span>
              </div>
              <p className="flex-1 text-sm leading-5 text-body-muted">
                {card.excerpt}
              </p>
              <span className="inline-flex h-9 items-center justify-center rounded-full bg-gold px-5 text-sm font-semibold text-ink">
                {card.cta}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
