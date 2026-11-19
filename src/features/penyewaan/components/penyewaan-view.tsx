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

      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-4 py-12 sm:px-6">
        {/* Note card */}
        <section
          aria-label="Catatan penyewaan"
          className="flex flex-col gap-4 rounded-[14px] bg-[#FBF6DF] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6"
        >
          <p className="max-w-xl text-sm leading-6 text-[#2B2B2B]">
            Penyewaan barang, harap menghubungi admin BKK dengan klik tombol
            berikut sebelum isi form di bawah.
          </p>
          <div className="flex shrink-0 flex-wrap items-center gap-3">
            {adminContactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "md",
                    className: "rounded-full border-[#C9A227] px-5 text-sm",
                  }),
                )}
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>

        {/* Google Form embed placeholder */}
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
          className="flex flex-col gap-4 pt-2"
        >
          <h2
            id="inventaris-heading"
            className="text-[28px] leading-9 font-semibold text-[#1C1C1C]"
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

        {/* Contact CTA */}
        <section
          aria-label={contactCta.title}
          className="mt-2 flex flex-col items-center gap-2 rounded-2xl bg-gradient-to-r from-[#FBF6DF] to-[#F6EFAF] px-6 py-12 text-center"
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
