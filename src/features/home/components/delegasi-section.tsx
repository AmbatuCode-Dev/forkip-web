import { delegasiSection, faculties } from "../data";

const FACULTY_TILE_COLORS: Record<string, string> = {
  FIP: "#84BC24",
  FBS: "#00A898",
  FMIPA: "#7A1A7A",
  FISH: "#D40D12",
  FT: "#005088",
  FPsi: "#00A4E4",
  FEB: "#B25A14",
  FIKK: "#0F766E",
};

/**
 * Delegasi Fakultas (spec §2): cream backdrop, centered two-line heading,
 * row of 8 faculty chips using the official faculty tile colors.
 */
export function DelegasiSection() {
  return (
    <section className="bg-gradient-to-b from-[#FBF6DF]/70 to-[#F6EFAF]/70 py-20">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <div className="rounded-[20px] bg-white/60 px-6 py-12 text-center backdrop-blur-[2px] sm:px-12">
          <h2 className="mx-auto max-w-[720px] text-[28px] leading-9 font-semibold tracking-[-0.5px] text-ink sm:text-[34px] sm:leading-[44px] lg:text-[38px] lg:leading-[48px]">
            {delegasiSection.title}
          </h2>
          <p className="mx-auto mt-3 max-w-[640px] text-sm/5 text-body-muted sm:text-base/6">
            {delegasiSection.subtitle}
          </p>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {faculties.map((faculty) => (
              <li
                key={faculty.code}
                className="flex h-[51px] min-w-[88px] items-center justify-center rounded-2xl border px-5 text-base font-semibold text-white shadow-xs"
                style={{
                  backgroundColor: FACULTY_TILE_COLORS[faculty.code],
                  borderColor: "rgba(255,255,255,0.4)",
                }}
              >
                {faculty.code}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
