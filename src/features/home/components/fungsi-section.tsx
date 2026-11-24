"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { fungsiItems, fungsiSection } from "../data";

interface FungsiSectionProps {
  /**
   * Whether the redesigned section animates when motion is allowed. Set to
   * false to render the section instantly (e.g. reduced motion or tests).
   */
  motion?: boolean;
}

/**
 * Fungsi dan Tujuan (spec §3): numbered list left, YouTube embed right.
 * A redraw of the section: staggered reveal of the header and every numbered
 * item via GSAP, with the video panel kept as an additional reveal target.
 */
export function FungsiSection({ motion = true }: FungsiSectionProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!motion || !root || typeof window.matchMedia !== "function") {
      return;
    }

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        root.setAttribute("data-fungsi-motion", "on");
        gsap.fromTo(
          root.querySelectorAll<HTMLElement>("[data-fungsi-reveal]"),
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
          },
        );
      }, root);

      return () => context.revert();
    });

    return () => media.revert();
  }, [motion]);

  return (
    <section
      ref={rootRef}
      data-testid="fungsi-section"
      data-fungsi-motion={motion ? "on" : "off"}
      className="bg-white py-24"
    >
      <div className="mx-auto w-full max-w-300 px-4 sm:px-6 xl:px-0">
        <div className="grid items-center gap-12 lg:cols-hero-b">
          <div>
            <h2
              data-fungsi-reveal
              className="text-24 leading-8 font-semibold tracking-t05 text-ink sm:text-34 sm:leading-11 lg:text-38 lg:leading-12"
            >
              {fungsiSection.title}
            </h2>
            <p className="mt-3 text-base leading-6 text-body-muted">
              {fungsiSection.subtitle}
            </p>

            <ol
              className="mt-6 flex flex-col gap-6 data-[fungsi-motion=on]:mt-4"
              data-fungsi-reveal
            >
              {fungsiItems.map((item, index) => (
                <li key={item.text} className="flex items-start gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gold-soft text-15 font-bold text-gold-ink">
                    {index + 1}
                  </span>
                  <p className="text-15 leading-6 text-body">{item.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div
            data-fungsi-reveal
            className="w-full overflow-hidden rounded-2xl border border-border-sand bg-gold-soft shadow-xs"
          >
            <div className="relative aspect-video w-full">
              <iframe
                src="https://www.youtube-nocookie.com/embed/G338TUmvp1Q"
                title={fungsiSection.videoLabel}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 size-full"
              />
            </div>
            <p className="py-3 text-center text-sm font-semibold text-gold-ink">
              {fungsiSection.videoLabel}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
