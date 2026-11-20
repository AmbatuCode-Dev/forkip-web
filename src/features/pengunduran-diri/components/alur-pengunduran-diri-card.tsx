import { alurSteps } from "../data/alur-steps";
import { AlurArrow, AlurStepIcon } from "./alur-step-icon";

/** Static Tailwind classes (the JIT scanner needs full literal names). */
const STEP_POSITION: Record<number, string> = {
  1: "lg:col-start-1 lg:row-start-1",
  2: "lg:col-start-2 lg:row-start-1",
  3: "lg:col-start-3 lg:row-start-1",
  4: "lg:col-start-4 lg:row-start-1",
  5: "lg:col-start-4 lg:row-start-2",
  6: "lg:col-start-3 lg:row-start-2",
  7: "lg:col-start-2 lg:row-start-2",
  8: "lg:col-start-1 lg:row-start-2",
};

/** Small colourful mark used left of the flow banner in the Figma diagram. */
function KipkMark() {
  return (
    <svg viewBox="0 0 96 92" aria-hidden="true" className="w-28 shrink-0">
      <path d="M20 70c16 6 40 6 56 0l-4 8c-16 5-32 5-48 0z" fill="#E8B820" />
      <path
        d="M48 66C36 54 28 42 30 20c8 8 14 14 18 22 4-10 11-16 20-23-1 20-9 33-20 47z"
        fill="#D4492F"
      />
      <path
        d="M48 66C39 58 34 48 36 30c6 7 10 13 12 19 3-8 8-14 15-19-1 15-7 27-15 36z"
        fill="#F08C2E"
      />
      <path
        d="M49 66c-6-9-9-18-7-32 5 6 8 11 9 16 3-7 7-12 13-16-1 13-6 23-15 32z"
        fill="#2E9B83"
      />
      <path d="M48 66c-2-11-1-22 3-32 2 10 2 21-3 32z" fill="#7A5B00" />
      <text
        x="48"
        y="85"
        textAnchor="middle"
        fill="#1C1C1C"
        fontSize="8"
        fontWeight="800"
        fontFamily="Arial, sans-serif"
      >
        FORUM KIP KULIAH
      </text>
    </svg>
  );
}

/**
 * White card with the illustrated 8-step pengunduran diri flow from the
 * Figma reference: banner with gold drop shadow, two rows of coloured
 * pictograms on navy/gold label tiles, and chunky arrows (→ row 1,
 * ← row 2, ↓ at the turn). DOM order stays 1–8 for assistive tech/tests.
 */
export function AlurPengunduranDiriCard() {
  return (
    <section
      aria-labelledby="alur-pengunduran-diri-heading"
      className="flex flex-col gap-4"
    >
      <h2
        id="alur-pengunduran-diri-heading"
        className="text-3xl leading-10 font-bold tracking-tight text-ink"
      >
        Alur pengunduran diri KIPK 2026
      </h2>

      <div className="rounded-2xl border border-border-sand bg-white p-5 sm:p-8">
        <div className="rounded-2xl bg-cream px-4 py-16 sm:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start sm:gap-8">
            <KipkMark />
            <p className="relative rounded-2xl bg-navy px-5 py-10 text-center text-clamp-hero leading-tight font-extrabold tracking-tight text-white shadow-stamp-6 sm:px-12">
              ALUR PENGUNDURAN DIRI KIPK 2026
            </p>
          </div>

          <ol className="relative mt-24 grid grid-cols-2 gap-x-3 gap-y-32 lg:grid-cols-4 lg:gap-x-6">
            {alurSteps.map((item) => (
              <li
                key={item.step}
                className={`relative flex flex-col items-center text-center ${STEP_POSITION[item.step]}`}
              >
                <AlurStepIcon icon={item.icon} className="size-24 sm:size-28" />
                <p className="mt-8 w-full rounded-xl bg-navy px-3 py-9 text-13 leading-snug font-bold text-white shadow-stamp-4 sm:text-15">
                  {item.title}
                </p>
                {item.step <= 3 ? (
                  <AlurArrow
                    direction="right"
                    className="absolute top-8 -right-5 hidden h-6 w-10 lg:block"
                  />
                ) : null}
                {item.step === 4 ? (
                  <AlurArrow
                    direction="down"
                    className="absolute -bottom-11 right-2 hidden h-10 w-7 lg:block"
                  />
                ) : null}
                {item.step >= 5 && item.step <= 7 ? (
                  <AlurArrow
                    direction="left"
                    className="absolute top-8 -left-5 hidden h-6 w-10 lg:block"
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
