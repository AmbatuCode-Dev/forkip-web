import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { heroCopy, heroStats, heroTrustLinks } from "../data";
import type { HeroStat } from "../types";

function StatCard({ stat }: { stat: HeroStat }) {
  return (
    <div className="pointer-events-auto w-[230px] max-w-full rounded-[14px] bg-white p-4 shadow-[0px_16px_24px_rgba(51,36,31,0.12)]">
      <p className="text-[10px] font-semibold tracking-[1.2px] text-body-muted uppercase">
        {stat.eyebrow}
      </p>
      <p className="mt-1 text-2xl leading-8 font-extrabold tracking-[-0.5px] text-ink">
        {stat.value}
      </p>
      <p className="mt-1 text-[11px] leading-4 text-body-muted">
        {stat.detail}
      </p>
    </div>
  );
}

function PlayCircle({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={
        className ??
        "inline-flex size-[46px] shrink-0 items-center justify-center rounded-full bg-gold"
      }
    >
      <svg
        viewBox="0 0 12 12"
        fill="currentColor"
        focusable="false"
        className="size-3 text-ink"
      >
        <title>Putar video</title>
        <path d="M3.5 2.2v7.6a.5.5 0 0 0 .77.42l5.2-3.8a.5.5 0 0 0 0-.84l-5.2-3.8a.5.5 0 0 0-.77.42Z" />
      </svg>
    </span>
  );
}

/**
 * Hero (spec §1): batik kawung approximation via CSS gradients, gold ring +
 * photo placeholder, three floating stat cards.
 */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <div className="grid items-center gap-12 py-14 lg:min-h-[644px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8 lg:py-16">
          <div className="flex flex-col items-start gap-6">
            <h1 className="text-[44px] leading-[1.05] tracking-[-2px] text-ink sm:text-[56px] lg:text-[72px] lg:leading-[1.1]">
              <span className="block font-light">{heroCopy.titleLight}</span>
              <span className="block font-extrabold">{heroCopy.titleBold}</span>
            </h1>
            <p className="max-w-[560px] text-base/6 text-body">
              {heroCopy.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link
                href={heroCopy.ctaHref}
                className={buttonVariants({
                  variant: "gold",
                  size: "cta",
                  className: "h-9 px-6 text-[15px]",
                })}
              >
                {heroCopy.cta}
              </Link>
              <a
                href="https://www.youtube.com/watch?v=G338TUmvp1Q"
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <PlayCircle className="inline-flex size-[46px] shrink-0 items-center justify-center rounded-full bg-gold transition-transform group-hover:scale-105" />
                <span className="flex flex-col gap-0.5">
                  <span className="text-[15px] leading-5 font-semibold text-ink">
                    {heroCopy.videoLabelStrong}
                  </span>
                  <span className="text-xs leading-4 text-body-muted">
                    {heroCopy.videoLabelMuted}
                  </span>
                </span>
              </a>
            </div>

            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {heroTrustLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-2 rounded-md text-base/6 text-body transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span
                      aria-hidden="true"
                      className="size-2 rounded-full bg-gold"
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex min-h-[420px] items-center justify-center lg:min-h-[560px]">
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-[24px] lg:-inset-y-6"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(246,211,74,0.14) 0%, rgba(246,211,74,0.34) 68%, rgba(224,180,0,0.5) 100%)",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-40 lg:opacity-55"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(224,180,0,0.5) 1.2px, transparent 1.2px), radial-gradient(rgba(224,180,0,0.28) 1.2px, transparent 1.2px)",
                backgroundSize: "28px 28px, 56px 56px",
                backgroundPosition: "0 0, 14px 14px",
                maskImage:
                  "radial-gradient(circle at center, black 30%, transparent 78%)",
                WebkitMaskImage:
                  "radial-gradient(circle at center, black 30%, transparent 78%)",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute rounded-full border-[10px] border-white/70 shadow-[0_0_40px_rgba(246,211,74,0.45)]"
              style={{ width: 400, height: 400 }}
            />

            <div className="relative z-10 flex h-[380px] w-[340px] max-w-full items-center justify-center rounded-[16px] bg-gradient-to-br from-[#FBF6DF] via-[#FBF6DF] to-[#F6EFAF] shadow-[0px_16px_24px_rgba(51,36,31,0.12)]">
              <span className="px-6 text-center text-sm text-body-muted">
                {heroCopy.photoLabel}
              </span>
            </div>

            <div className="pointer-events-none absolute inset-0 z-20">
              <div className="absolute top-2 right-0 hidden sm:block lg:-right-2">
                <StatCard stat={heroStats[0]} />
              </div>
              <div className="absolute top-1/2 left-0 hidden -translate-y-1/2 sm:block lg:-left-2">
                <StatCard stat={heroStats[1]} />
              </div>
              <div className="absolute right-2 bottom-2 hidden sm:block lg:bottom-0 lg:-right-4">
                <StatCard stat={heroStats[2]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
