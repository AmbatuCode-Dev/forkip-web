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
 */
export function HeroMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    return () => media.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative min-h-svh w-full">
      {children}
    </div>
  );
}
