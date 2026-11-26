import { Play } from "@coolicons/react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { heroCopy, heroTrustLinks } from "../data";
import { HeroMotion } from "./hero-motion";

const HERO_PHOTO_ALT =
  "Foto bersama mahasiswa penerima KIP-K UNJ di depan gedung Universitas Negeri Jakarta";

function PlayCircle({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={
        className ??
        "inline-flex size-11.5 shrink-0 items-center justify-center rounded-full bg-gold"
      }
    >
      <Play
        size={12}
        title="Putar video"
        fill="currentColor"
        className="size-3 text-ink"
      />
    </span>
  );
}

/**
 * Hero (redesign): the real KIP-K UNJ group photo runs edge to edge under a
 * shaped sky scrim. Copy sits in the open sky, upper-left, clear of the group
 * and the UNJ sign below.
 */
export function HeroSection() {
  return (
    <section
      id="home-hero"
      className="relative isolate -mt-18 min-h-svh overflow-hidden bg-ink"
    >
      <HeroMotion>
        <div data-hero-photo className="absolute inset-x-0 inset-hero-photo">
          <Image
            src="/images/forkip-unj-beranda.webp"
            alt={HERO_PHOTO_ALT}
            fill
            priority
            sizes="100vw"
            className="object-cover object-hero-mobile lg:object-hero-desktop"
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-hero-scrim-mobile sm:bg-hero-scrim"
        />

        <div className="relative mx-auto flex min-h-svh w-full max-w-300 flex-col px-4 pt-24 pb-10 sm:px-6 sm:pt-28 lg:pt-32 xl:px-0">
          <div className="flex max-w-140 flex-col gap-3 sm:gap-5">
            <h1
              data-hero-reveal
              className="text-5xl leading-hero tracking-t2 text-white sm:text-6xl lg:text-7xl lg:leading-hero-lg"
            >
              <span className="block font-light">{heroCopy.titleLight}</span>
              <span className="block font-extrabold">{heroCopy.titleBold}</span>
            </h1>

            <p
              data-hero-reveal
              className="max-w-140 text-sm leading-5 text-white/90 sm:text-base sm:leading-6"
            >
              {heroCopy.subtitle}
            </p>

            <div
              data-hero-reveal
              className="flex flex-wrap items-center gap-3 sm:gap-5"
            >
              <Link
                href={heroCopy.ctaHref}
                className={buttonVariants({
                  variant: "gold",
                  size: "cta",
                  className: "h-9 px-6 text-base focus-visible:ring-white",
                })}
              >
                {heroCopy.cta}
              </Link>
              <a
                href="https://www.youtube.com/watch?v=G338TUmvp1Q"
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-3 rounded-md focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                <PlayCircle className="inline-flex size-11.5 shrink-0 items-center justify-center rounded-full bg-gold transition-transform group-hover:scale-105" />
                <span className="flex flex-col gap-0.5">
                  <span className="text-base leading-5 font-semibold text-white">
                    {heroCopy.videoLabelStrong}
                  </span>
                  <span className="text-xs leading-4 text-white/75">
                    {heroCopy.videoLabelMuted}
                  </span>
                </span>
              </a>
            </div>

            <ul
              data-hero-reveal
              className="flex flex-wrap items-center gap-x-4 gap-y-1 sm:gap-x-6 sm:gap-y-2"
            >
              {heroTrustLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-2 rounded-md text-sm text-white/90 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none sm:text-base"
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
        </div>
      </HeroMotion>
    </section>
  );
}
