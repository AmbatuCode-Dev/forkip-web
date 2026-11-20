import { delegasiSection, faculties } from "../data";

const FACULTY_TILE_COLORS: Record<string, string> = {
  FIP: "#84BC24",
  FBS: "#00A898",
  FMIPA: "#7A1A7A",
  FISH: "#D40D12",
  FT: "#005088",
  FPsi: "#00A4E4",
  FEB: "#B25A14",
};

const FIKK_OUTLINE_COLOR = "#87BBB7";

/**
 * Delegasi Fakultas (spec §2): cream backdrop, centered two-line heading,
 * row of 8 faculty chips using the official faculty tile colors.
 */
export function DelegasiSection() {
  return (
    <section className="bg-gradient-to-b from-gold-soft/70 to-gold-soft-strong/70 py-20">
      <div className="mx-auto w-full max-w-300 px-4 sm:px-6 xl:px-0">
        <div className="rounded-20 bg-white/60 px-6 py-12 text-center backdrop-blur-2 sm:px-12">
          <h2 className="mx-auto max-w-180 text-28 leading-9 font-semibold tracking-t05 text-ink sm:text-34 sm:leading-11 lg:text-38 lg:leading-12">
            {delegasiSection.title}
          </h2>
          <p className="mx-auto mt-3 max-w-160 text-sm leading-5 text-body-muted sm:text-base sm:leading-6">
            {delegasiSection.subtitle}
          </p>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {faculties.map((faculty) => {
              const isFikk = faculty.code === "FIKK";
              return (
                <li
                  key={faculty.code}
                  className={`flex h-12.75 min-w-22 items-center justify-center rounded-2xl border px-5 text-base font-semibold shadow-xs ${
                    isFikk ? "text-ink" : "text-white"
                  }`}
                  style={{
                    backgroundColor: isFikk
                      ? "#FFFFFF"
                      : FACULTY_TILE_COLORS[faculty.code],
                    borderColor: isFikk
                      ? FIKK_OUTLINE_COLOR
                      : "rgba(255,255,255,0.4)",
                  }}
                >
                  {faculty.code}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
