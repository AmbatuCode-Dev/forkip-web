"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type RefObject, useEffect } from "react";

/**
 * Staggered GSAP ScrollTrigger entrance for home page sections.
 * Animates `[data-reveal-heading]` and `[data-reveal-item]` descendants.
 */
export function useSectionReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window.matchMedia !== "function") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const headings = el.querySelectorAll("[data-reveal-heading]");
      if (headings.length > 0) {
        gsap.from(headings, {
          y: 24,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
          },
        });
      }

      const items = el.querySelectorAll("[data-reveal-item]");
      if (items.length > 0) {
        gsap.from(items, {
          y: 28,
          opacity: 0,
          duration: 0.65,
          stagger: 0.1,
          delay: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            once: true,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [ref]);
}
