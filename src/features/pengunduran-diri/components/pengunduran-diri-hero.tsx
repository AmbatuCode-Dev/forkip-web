import { AlurPengunduranDiriCard } from "./alur-pengunduran-diri-card";
import { FakultasKontakGrid } from "./fakultas-kontak-grid";
import { GoogleFormEmbedCard } from "./google-form-embed-card";
import { TemplateSuratCard } from "./template-surat-card";

/**
 * Page hero (spec §1): gold gradient band with batik dot accent, breadcrumb
 * "Beranda / Form Pengunduran diri dari KIPK", H1 and intro copy.
 */
export function PengunduranDiriHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gold-soft-strong via-gold-soft to-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(rgba(224, 180, 0, 0.35) 1.5px, transparent 1.5px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="relative mx-auto w-full max-w-[1200px] px-4 pt-14 pb-16 sm:px-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-body">
            <li>
              <a
                href="/"
                className="transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Beranda
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">Form Pengunduran diri dari KIPK</li>
          </ol>
        </nav>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-[44px] sm:leading-[52px]">
          Pengunduran diri KIPK
        </h1>
        <p className="mt-4 max-w-[620px] text-base/6 text-body">
          Dibantu oleh divisi KIF Forkip UNJ, kepada mahasiswa KIPK UNJ yang
          ingin mengundurkan diri diharap untuk membaca informasi di bawah.
        </p>
      </div>
    </section>
  );
}

/**
 * Page body (spec §2–§5): alur card, template surat card, Google Form
 * placeholder, faculty contact grid.
 */
export function PengunduranDiriContent() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-4 pt-12 pb-20 sm:px-6">
      <AlurPengunduranDiriCard />
      <TemplateSuratCard />
      <GoogleFormEmbedCard />
      <FakultasKontakGrid />
    </div>
  );
}
