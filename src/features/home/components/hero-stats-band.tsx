import { heroStats } from "../data";
import type { HeroStat } from "../types";

function StatItem({ stat }: { stat: HeroStat }) {
  return (
    <div className="py-5 sm:px-8 sm:py-0 first:sm:pl-0">
      <p className="text-13 leading-5 font-medium text-body-muted">
        {stat.eyebrow}
      </p>
      <p className="mt-1 text-2xl leading-8 font-extrabold tracking-t05 text-ink">
        {stat.value}
      </p>
      <p className="mt-1 text-11 leading-4 text-body-muted">{stat.detail}</p>
    </div>
  );
}

/** Slim light band immediately below the hero, closed with a gold seam. */
export function HeroStatsBand() {
  return (
    <section
      aria-label="Ringkasan Forkip UNJ"
      data-testid="home-stats-band"
      className="border-t-2 border-gold-dark bg-surface-50"
    >
      <div className="mx-auto grid w-full max-w-300 grid-cols-1 divide-y divide-border-sand px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6 xl:px-0">
        {heroStats.map((stat) => (
          <StatItem key={stat.value} stat={stat} />
        ))}
      </div>
    </section>
  );
}
