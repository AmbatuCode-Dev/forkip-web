/**
 * Page hero (spec §1): breadcrumb "Beranda / Berita", H1 "Berita", intro
 * copy from the Humas division.
 */
export function BeritaHero() {
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
            <li aria-current="page">Berita</li>
          </ol>
        </nav>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-[44px] sm:leading-[52px]">
          Berita
        </h1>
        <p className="mt-4 max-w-[620px] text-base/6 text-body">
          Halaman ini dikelola oleh divisi Humas Forkip UNJ sebagai sarana
          berbagi informasi, dan transparansi laporan kegiatan yang dilakukan
          oleh Forkip UNJ
        </p>
      </div>
    </section>
  );
}
