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
        "relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#FBF6DF] to-[#F6EFAF]"
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
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 xl:px-0">
        <h2 className="text-center text-[34px] leading-[44px] font-extrabold tracking-[-0.8px] text-ink sm:text-[42px] sm:leading-[50px]">
          {programSection.title}
        </h2>
        <p className="mx-auto mt-4 max-w-[820px] text-center text-sm leading-5 text-body-muted sm:text-base sm:leading-6">
          {programSection.subtitle}
        </p>

        <div className="mt-14 grid items-center gap-10 rounded-[20px] bg-surface-50 p-6 sm:p-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
          <div>
            <h3 className="text-[32px] leading-[40px] font-bold text-ink sm:text-[40px] sm:leading-[48px]">
              {programSpotlight.title}
            </h3>
            {programSpotlight.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="mt-4 text-[15px] leading-6 text-body"
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
                  <p className="text-[15px] leading-6 text-body">
                    <span className="font-bold text-ink">{bullet.label}</span>:{" "}
                    {bullet.text}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[15px] leading-6 text-body">
              {programSpotlight.closing}
            </p>
          </div>

          <PhotoPlaceholder
            label={programSpotlight.photoLabel}
            className="relative flex h-[420px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#FBF6DF] to-[#F6EFAF] lg:h-[560px]"
          />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programCards.map((card) => (
            <article
              key={card.title}
              className="flex flex-col gap-4 rounded-2xl bg-surface-50 p-6"
            >
              <h3 className="min-h-[72px] text-lg leading-7 font-semibold text-ink">
                {card.title}
              </h3>
              <div className="relative flex h-[170px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#FBF6DF] to-[#F6EFAF]">
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
