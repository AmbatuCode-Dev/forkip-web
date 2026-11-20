import { PageHero } from "@/components/layout/page-hero";
import { FacultyContactGrid } from "@/components/ui/faculty-contact-grid";
import {
  fakultasKontak,
  fakultasKontakLabel,
  kifNote,
  pertanyaanPengaduanHero,
} from "../data";

/**
 * /pertanyaan-pengaduan (Figma frame 224:1120): hero, faculty WhatsApp
 * delegation grid, and the gold KIF follow-up note.
 */
export function PertanyaanPengaduanView() {
  return (
    <>
      <PageHero
        breadcrumb={{
          label: pertanyaanPengaduanHero.breadcrumbLabel,
          href: "/",
        }}
        title={pertanyaanPengaduanHero.title}
        subtitle={pertanyaanPengaduanHero.description}
      />

      <div className="mx-auto flex w-full max-w-300 flex-col gap-10 px-4 pt-18 pb-24 sm:px-4 xl:px-0">
        <FacultyContactGrid
          items={fakultasKontak}
          label={fakultasKontakLabel}
        />

        {/* Note card — gold tint #FFF3C4, r14 */}
        <section
          aria-label="Catatan pertanyaan dan pengaduan"
          className="rounded-14 bg-gold-pale px-6 py-6"
        >
          <p className="text-base leading-6 font-medium text-ink-soft">
            {kifNote}
          </p>
        </section>
      </div>
    </>
  );
}
