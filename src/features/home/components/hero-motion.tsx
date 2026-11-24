"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useEffect, useRef } from "react";

/**
 * The hero's single authored motion moment: a staggered entrance for the
 * copy block and one scrubbed parallax on the photo. gsap.matchMedia only
 * builds the animations when motion is welcome, and its cleanup reverts the
 * context — so a reduced-motion preference (including a runtime change) can
 * never leave a reveal element stuck at opacity: 0.
 *
 * The server renders `data-motion="pending"`; globals.css hides the reveal
 * targets until this effect clears it. `<noscript>` restores visibility when
 * JavaScript is unavailable.
 */
export function HeroMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    // Clear on every path, including the no-matchMedia fallback and cleanup:
    // a stale "pending" marker would hide the copy permanently.
    if (root) {
      root.dataset.motion = "ready";
    }

    // jsdom has no matchMedia; there the static first frame is correct.
    if (typeof window.matchMedia !== "function") {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from("[data-hero-reveal]", {
          opacity: 0,
          y: 18,
          duration: 0.7,
          stagger: 0.09,
          ease: "power2.out",
        });

        gsap.fromTo(
          "[data-hero-photo]",
          { yPercent: -3 },
          {
            yPercent: 3,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }, rootRef);

      return () => context.revert();
    });

    return () => {
      media.revert();
      if (root) {
        root.dataset.motion = "ready";
      }
    };
  }, []);

  return (
    <div
      ref={rootRef}
      data-motion="pending"
      className="relative min-h-svh w-full"
    >
      <noscript>
        <style>{`[data-motion="pending"] [data-hero-reveal] { visibility: visible !important; }`}</style>
      </noscript>
      {children}
    </div>
  );
}
