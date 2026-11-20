import { programCards, programLainTitle } from "../data";
import { ProgramCard } from "./program-card";
import { ProgramSpotlightSection } from "./program-spotlight";

/**
 * Page body (spec /program-unggulan): the Kampung KIP-K UNJ spotlight followed
 * by the "Program lain" three-card grid.
 */
export function ProgramUnggulanContent() {
  return (
    <div className="mx-auto w-full max-w-300 px-4 pt-12 pb-20 sm:px-6 xl:px-0">
      <ProgramSpotlightSection />

      <section aria-labelledby="program-lain-heading" className="mt-14">
        <h2
          id="program-lain-heading"
          className="text-32 leading-10 font-bold text-ink"
        >
          {programLainTitle}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programCards.map((card, index) => (
            <ProgramCard
              key={card.title}
              card={card}
              variant={((index % 3) + 1) as 1 | 2 | 3}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
