import { PageHero as SharedPageHero } from "@/components/layout/page-hero";
import { buttonVariants } from "@/components/ui/button";
import { InventarisAccordion } from "@/components/ui/inventaris-accordion";
import { cn } from "@/utils/cn";
import {
  adminContactLinks,
  contactCta,
  googleFormEmbed,
  inventarisItems,
  penyewaanHero,
} from "../data";

export function PenyewaanView() {
  return (
    <>
      <SharedPageHero
        breadcrumb={{ label: penyewaanHero.breadcrumbLabel, href: "/" }}
        title={penyewaanHero.title}
        subtitle={penyewaanHero.description}
      />

      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-4 pt-[72px] pb-24 sm:px-4 xl:px-0">
        {/* Note card — 1200×96, gold tint #FFF3C4 (Figma frame 224:2568) */}
        <section
          aria-label="Catatan penyewaan"
          className="flex flex-col gap-4 rounded-[14px] bg-[#FFF3C4] py-6 pr-12 pl-[30px] sm:flex-row sm:items-center sm:justify-between sm:gap-6"
        >
          <p className="max-w-[800px] text-base leading-6 font-medium text-[#2B2B2B]">
            Penyewaan barang, harap menghubungi admin BKK dengan klik tombol
            berikut sebelum isi form di bawah.
          </p>
          <div className="flex shrink-0 flex-wrap items-center gap-7">
            {adminContactLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "inline-flex h-10 items-center justify-center rounded-full px-5 text-[13px] font-semibold text-[#1C1C1C] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A5B00]",
                  index === 0
                    ? "bg-[#F6D34A] hover:bg-[#E0B400]"
                    : "border border-[#C9A227] bg-white hover:bg-[#FBF6DF]",
                )}
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>

        {/* Google Form embed placeholder — 1200×260 white card */}
        <section
          aria-label={googleFormEmbed.title}
          className="flex h-[260px] flex-col items-center justify-center gap-2 rounded-2xl border border-border-sand bg-white px-6 text-center"
        >
          <p className="text-[11px] font-semibold tracking-[1.2px] text-[#666666] uppercase">
            {googleFormEmbed.label}
          </p>
          <h2 className="text-[15px] font-semibold text-[#1C1C1C]">
            {googleFormEmbed.title}
          </h2>
          {/* TODO: replace with real <iframe> embed of the Google Form. */}
        </section>

        {/* Inventaris list */}
        <section
          aria-labelledby="inventaris-heading"
          className="flex flex-col gap-8"
        >
          <h2
            id="inventaris-heading"
            className="text-[32px] leading-9 font-semibold text-[#1C1C1C]"
          >
            Inventaris yang kami sewakan
          </h2>
          <div className="flex flex-col gap-4">
            {inventarisItems.map((item) => (
              <InventarisAccordion
                key={item.title}
                chip={item.chip}
                title={item.title}
                meta={item.meta}
                paragraphs={item.paragraphs}
                footnote={item.footnote}
                defaultExpanded={item.defaultExpanded}
              />
            ))}
          </div>
        </section>

        {/* Contact CTA — 1200×187 solid #FFF3C4 (Figma frame 224:2568) */}
        <section
          aria-label={contactCta.title}
          className="flex flex-col items-center gap-2 rounded-2xl bg-[#FFF3C4] px-6 py-9 text-center"
        >
          <h2 className="text-[20px] font-bold text-[#1C1C1C]">
            {contactCta.title}
          </h2>
          <p className="text-sm text-[#666666]">{contactCta.description}</p>
          <a
            href={contactCta.actionHref}
            className={cn(
              buttonVariants({
                variant: "gold",
                size: "md",
                className: "mt-3 px-6",
              }),
            )}
          >
            {contactCta.actionLabel}
          </a>
        </section>
      </div>
    </>
  );
}
