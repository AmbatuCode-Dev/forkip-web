import { alurSteps } from "../data/alur-steps";
import { AlurStepIcon } from "./alur-step-icon";

/**
 * White card with the 8-step pengunduran diri flow, implemented as a 2×4
 * grid of numbered step cards (spec §2 fallback; the Figma frame shows the
 * same 8 steps as one illustrated diagram). Order runs left-to-right,
 * top-to-bottom, matching the reference arrows.
 */
export function AlurPengunduranDiriCard() {
  return (
    <section
      aria-labelledby="alur-pengunduran-diri-heading"
      className="rounded-2xl border border-border-sand bg-white p-6 sm:p-10"
    >
      <h2
        id="alur-pengunduran-diri-heading"
        className="text-xl font-bold tracking-tight text-ink"
      >
        Alur pengunduran diri KIPK 2026
      </h2>
      <ol className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {alurSteps.map((item) => (
          <li
            key={item.step}
            className="flex flex-col items-center gap-4 rounded-xl border border-border-sand bg-surface-50 p-5 text-center"
          >
            <span className="inline-flex size-8 items-center justify-center rounded-full bg-gold text-sm font-bold text-ink">
              {item.step}
            </span>
            <AlurStepIcon icon={item.icon} className="size-10 text-ink-soft" />
            <p className="text-sm/20 font-medium text-body">{item.title}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
