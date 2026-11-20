import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import {
  divisiInfo,
  googleFormEmbed,
  narahubungContact,
  recruitmentStatus,
  rekrutmenHero,
} from "../data";

const STATUS_PILL_CLASS =
  "inline-flex items-center rounded-full bg-destructive/10 px-4 py-1.5 text-xs font-bold tracking-wide text-destructive";

/**
 * /rekrutmen (Figma frame 224:1683): hero with the "SUDAH DITUTUP" status
 * pill, divisi info card, closed Google Form placeholder and the open
 * recruitment contact button.
 *
 * PageHero has no slot beside its H1 and shared components stay untouched,
 * so on xl the pill is overlaid on the H1 row (64px hero padding + ~19px
 * breadcrumb + 12px gap + half of the 60px title line − half pill height).
 * Below xl the title wraps, so the pill renders in flow atop the content.
 */
export function RekrutmenView() {
  return (
    <>
      <div className="relative">
        <PageHero
          breadcrumb={{ label: rekrutmenHero.breadcrumbLabel, href: "/" }}
          title={rekrutmenHero.title}
          subtitle={rekrutmenHero.description}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 hidden xl:block">
          <div
            className="mx-auto flex w-full max-w-300 justify-end"
            style={{ paddingTop: "6.875rem" }}
          >
            <span className={STATUS_PILL_CLASS}>{recruitmentStatus.label}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-300 flex-col gap-10 px-4 pt-18 pb-24 sm:px-4 xl:px-0">
        <span className={cn(STATUS_PILL_CLASS, "w-fit xl:hidden")}>
          {recruitmentStatus.label}
        </span>

        {/* Divisi info card */}
        <section
          aria-label="Info divisi"
          className="flex flex-col gap-3 rounded-2xl border border-border-sand bg-white px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
        >
          <p className="text-base leading-6 text-body">{divisiInfo.text}</p>
          <Link
            href={divisiInfo.href}
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-gold-ink transition-colors hover:text-gold-deep focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {divisiInfo.linkLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </section>

        {/* Google Form embed placeholder — recruitment is closed */}
        <section
          aria-label={googleFormEmbed.title}
          className="flex h-65 flex-col items-center justify-center gap-2 rounded-2xl border border-border-sand bg-white px-6 text-center"
        >
          <p className="text-11 font-semibold tracking-wide12 text-body-muted">
            {googleFormEmbed.label}
          </p>
          <h2 className="text-15 font-semibold text-ink">
            {googleFormEmbed.title}
          </h2>
          {/* TODO: replace with real <iframe> embed of the Google Form. */}
        </section>

        {/* Contact CTA */}
        <div className="flex justify-center">
          {/* TODO: link WhatsApp narahubung open recruitment. */}
          <a
            href={narahubungContact.href}
            className={buttonVariants({ variant: "outline", size: "cta" })}
          >
            {narahubungContact.label}
          </a>
        </div>
      </div>
    </>
  );
}
