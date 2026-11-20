import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { FacultyContactGrid } from "@/components/ui/faculty-contact-grid";
import {
  delegasiAdvoLabel,
  donatDanHibahHero,
  fakultasKontak,
  transparansiHibah,
} from "../data";

/**
 * /donat-dan-hibah (Figma frame 224:1216): hero, Advokasi faculty WhatsApp
 * delegation grid, and the restricted hibah transparency card.
 */
export function DonatDanHibahView() {
  return (
    <>
      <PageHero
        breadcrumb={{ label: donatDanHibahHero.breadcrumbLabel, href: "/" }}
        title={donatDanHibahHero.title}
        subtitle={donatDanHibahHero.description}
      />

      <div className="mx-auto flex w-full max-w-300 flex-col gap-10 px-4 pt-18 pb-24 sm:px-4 xl:px-0">
        <FacultyContactGrid items={fakultasKontak} label={delegasiAdvoLabel} />

        {/* Transparency card — white, border-sand, r16 */}
        <section
          aria-labelledby="transparansi-hibah-heading"
          className="flex flex-col gap-4 rounded-2xl border border-border-sand bg-white px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
        >
          <div className="flex flex-col gap-1">
            <h2
              id="transparansi-hibah-heading"
              className="text-xl font-bold text-ink"
            >
              {transparansiHibah.title}
            </h2>
            <p className="text-sm text-body-muted">{transparansiHibah.note}</p>
          </div>
          {/* TODO: wire the restricted hibah allocation action once provided. */}
          <Button variant="gold" size="cta" className="shrink-0">
            {transparansiHibah.actionLabel}
          </Button>
        </section>
      </div>
    </>
  );
}
