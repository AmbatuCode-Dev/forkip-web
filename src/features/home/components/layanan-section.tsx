import Link from "next/link";
import { layananSection, services } from "../data";
import { ServiceIconGlyph } from "./service-icon";

/**
 * Layanan Forkip UNJ (spec §5): 3×2 grid of service cards with icon tile,
 * division pill, description and "Buka halaman →" link.
 */
export function LayananSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <h2 className="text-center text-[34px] leading-[44px] font-extrabold tracking-[-0.8px] text-ink sm:text-[42px] sm:leading-[50px]">
          {layananSection.title}
        </h2>
        <p className="mx-auto mt-3 max-w-[640px] text-center text-sm/5 text-body-muted sm:text-base/6">
          {layananSection.subtitle}
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.href}
              className="flex flex-col gap-4 rounded-2xl border border-border-sand bg-white p-6 shadow-xs"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex size-12 items-center justify-center rounded-xl bg-gold-soft text-gold-ink">
                  <ServiceIconGlyph
                    icon={service.icon}
                    className="size-6 text-gold-ink"
                  />
                </span>
                <span className="rounded-full bg-gold-soft px-3 py-1.5 text-[9px] font-semibold text-gold-ink">
                  {service.division}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <h3 className="text-xl leading-7 font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="text-sm/5 text-body-muted">
                  {service.description}
                </p>
              </div>
              <Link
                href={service.href}
                className="group inline-flex items-center gap-2 self-start rounded-md text-[15px] font-semibold text-gold-ink transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Buka halaman
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
