"use client";

import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";

export interface PageHeroProps {
  /** Breadcrumb trail: "Beranda / {label}" — label must match the page title. */
  readonly breadcrumb: {
    readonly label: string;
    readonly href: string;
  };
  readonly title: string;
  readonly subtitle: string;
  /** "md" → 34/40px mobile, "lg" → 36/44px mobile; both 52/60px desktop. Default "md". */
  readonly titleSize?: "md" | "lg";
  readonly className?: string;
}

/**
 * Shared service-page hero (penyewaan/arsip/berita/pengunduran-diri family):
 * horizontal cream→gold gradient, batik kawung SVG accent on the right,
 * breadcrumb via next/link, large H1 and muted subtitle. Beranda keeps its
 * own unique hero layout.
 */
export function PageHero({
  breadcrumb,
  title,
  subtitle,
  titleSize = "md",
  className,
}: PageHeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el || typeof window.matchMedia !== "function") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-hero-reveal]", {
        y: 18,
        opacity: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className={cn(
        "relative overflow-hidden bg-gradient-to-r from-gold-soft via-gold-mid to-gold",
        className,
      )}
    >
      {/* Batik kawung accent (Figma "Batik kawung · Aksen latar" 224:2572:
          600×400 anchored right, wrapper opacity-10, rosettes opacity-20). */}
      <Image
        src="/images/batik-kawung-accent.svg"
        alt=""
        width={560}
        height={258}
        unoptimized
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 h-full w-140 object-cover opacity-10"
      />
      <div className="relative mx-auto flex w-full max-w-300 flex-col gap-3 px-4 py-16 sm:px-6 xl:px-0">
        <nav aria-label="Breadcrumb" data-hero-reveal>
          <p className="text-sm font-medium text-body-muted">
            <Link
              href={breadcrumb.href}
              className="rounded-sm transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Beranda
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{breadcrumb.label}</span>
          </p>
        </nav>
        <h1
          className={cn(
            "font-bold tracking-t05 text-ink",
            titleSize === "lg"
              ? "text-4xl leading-11 sm:text-5xl sm:leading-15"
              : "text-4xl leading-10 sm:text-5xl sm:leading-15",
          )}
        >
          {title}
        </h1>
        <p className="max-w-190 text-base leading-26 text-body">{subtitle}</p>
      </div>
    </section>
  );
}
