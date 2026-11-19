import { fakultasKontak } from "../data/fakultas-kontak";

/**
 * 4×2 grid of faculty WhatsApp contact tiles (spec §5). Colors follow
 * docs/design-style.md faculty tile palette; white text; hrefs are
 * placeholders (TODO real WhatsApp links).
 */
export function FakultasKontakGrid() {
  return (
    <section
      aria-labelledby="fakultas-kontak-heading"
      className="flex flex-col gap-4"
    >
      <h2
        id="fakultas-kontak-heading"
        className="text-[15px] font-medium text-ink"
      >
        Klik tombol di bawah untuk menghubungi delegasi KIF Fakultas:
      </h2>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {fakultasKontak.map((faculty) => (
          <li key={faculty.code}>
            <a
              href={faculty.href}
              className="flex h-[74px] items-center justify-between gap-2 rounded-xl px-5 py-3 text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              style={{ backgroundColor: faculty.color }}
              aria-label={`Hubungi delegasi KIF ${faculty.code} via WhatsApp`}
            >
              <span className="flex flex-col gap-1 text-left">
                <span className="text-base font-bold">{faculty.code}</span>
                <span className="text-xs font-normal">
                  Hubungi via WhatsApp
                </span>
              </span>
              <span
                aria-hidden="true"
                className="text-lg leading-none font-medium"
              >
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
