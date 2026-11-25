"use client";

import { useRef } from "react";
import { PageHero as SharedPageHero } from "@/components/layout/page-hero";
import { buttonVariants } from "@/components/ui/button";
import { InventarisAccordion } from "@/components/ui/inventaris-accordion";
import { useSectionReveal } from "@/features/home";
import { cn } from "@/utils/cn";
import {
  adminContactLinks,
  contactCta,
  googleFormEmbed,
  inventarisItems,
  penyewaanHero,
} from "../data";

export function PenyewaanView() {
  const contentRef = useRef<HTMLDivElement>(null);
  useSectionReveal(contentRef);

  return (
    <>
      <SharedPageHero
        breadcrumb={{ label: penyewaanHero.breadcrumbLabel, href: "/" }}
        title={penyewaanHero.title}
        subtitle={penyewaanHero.description}
      />

      <div
        ref={contentRef}
        className="mx-auto flex w-full max-w-300 flex-col gap-10 px-4 pt-18 pb-24 sm:px-4 xl:px-0"
      >
        {/* Note card — 1200×96, gold tint #FFF3C4 (Figma frame 224:2568) */}
        <section
          aria-label="Catatan penyewaan"
          data-reveal-item
          className="flex flex-col gap-4 rounded-14 bg-gold-pale py-6 pr-12 pl-7.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
        >
          <p className="max-w-200 text-base leading-6 font-medium text-ink-soft">
            Penyewaan barang, harap menghubungi admin BKK dengan klik tombol
            berikut sebelum isi form di bawah.
          </p>
          <div className="flex shrink-0 flex-wrap items-center gap-7">
            {adminContactLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "inline-flex h-10 items-center justify-center rounded-full px-5 text-13 font-semibold text-ink transition-colors focus-visible:ring-2 focus-visible:ring-gold-ink focus-visible:outline-none",
                  index === 0
                    ? "bg-gold hover:bg-gold-dark"
                    : "border border-gold-outline bg-white hover:bg-gold-soft",
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
          className="flex h-65 flex-col items-center justify-center gap-2 rounded-2xl border border-border-sand bg-white px-6 text-center"
        >
          <p className="text-11 font-semibold tracking-wide12 text-body-muted uppercase">
            {googleFormEmbed.label}
          </p>
          <h2 className="text-15 font-semibold text-ink">
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
            className="text-32 leading-9 font-semibold text-ink"
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
          className="flex flex-col items-center gap-2 rounded-2xl bg-gold-pale px-6 py-9 text-center"
        >
          <h2 className="text-xl font-bold text-ink">{contactCta.title}</h2>
          <p className="text-sm text-body-muted">{contactCta.description}</p>
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
