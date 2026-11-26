"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
 * The header, each numbered item and the video panel reveal when the section
 * enters the viewport, with an instant static fallback under reduced motion.
 */
export function FungsiSection({ motion = true }: FungsiSectionProps) {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    if (!motion || typeof window.matchMedia !== "function") {
      root.dataset.fungsiMotion = "off";
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // gsap.matchMedia only invokes the callback while the query matches; if it
    // does not match now, show the static content immediately.
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      root.dataset.fungsiMotion = "off";
    }

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        root.dataset.fungsiMotion = "on";
        gsap.fromTo(
          root.querySelectorAll<HTMLElement>("[data-fungsi-reveal]"),
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            immediateRender: true,
            scrollTrigger: {
              trigger: root,
              start: "top 80%",
              once: true,
            },
          },
        );
      }, root);

      return () => {
        context.revert();
        root.dataset.fungsiMotion = "off";
      };
    });

    return () => media.revert();
  }, [motion]);

  return (
    <section
      ref={rootRef}
      data-testid="fungsi-section"
      data-fungsi-motion={motion ? "pending" : "off"}
      className="bg-white py-24"
    >
      <noscript>
        <style>{`[data-fungsi-motion="pending"] [data-fungsi-reveal] { opacity: 1 !important; transform: none !important; }`}</style>
      </noscript>
      <div className="mx-auto w-full max-w-300 px-4 sm:px-6 xl:px-0">
        <div className="grid items-center gap-12 lg:cols-hero-b">
          <div>
            <h2
              data-fungsi-reveal
              className="text-2xl leading-8 font-semibold tracking-t05 text-ink sm:text-4xl sm:leading-11 lg:text-4xl lg:leading-12"
            >
              {fungsiSection.title}
            </h2>
            <p
              data-fungsi-reveal
              className="mt-3 text-base leading-6 text-body-muted"
            >
              {fungsiSection.subtitle}
            </p>

            <ol className="mt-6 flex flex-col gap-6">
              {fungsiItems.map((item, index) => (
                <li
                  key={item.text}
                  data-fungsi-reveal
                  className="flex items-start gap-4"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gold-soft text-base font-bold text-gold-ink">
                    {index + 1}
                  </span>
                  <p className="text-base leading-6 text-body">{item.text}</p>
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
