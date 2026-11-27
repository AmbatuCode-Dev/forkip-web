"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { misiItems, visiItems, visiMisiSection } from "../data";

/**
 * Visi dan Misi (spec §4): cream Visi card + white Misi card.
 */
export function VisiMisiSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window.matchMedia !== "function") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from("[data-vm-title]", {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from("[data-vm-card]", {
        y: 32,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          once: true,
        },
      });

      gsap.from("[data-vm-item]", {
        x: -16,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-surface-50 py-24">
      <div className="mx-auto w-full max-w-300 px-4 sm:px-6 xl:px-0">
        <h2
          data-vm-title
          className="text-center text-4xl leading-11 font-extrabold tracking-t08 text-ink sm:text-5xl sm:leading-50"
        >
          {visiMisiSection.title}
        </h2>

        <div className="mt-12 grid gap-6 lg:cols-420f">
          <div
            data-vm-card
            className="rounded-2xl bg-gradient-to-b from-gold-soft to-gold-soft-strong p-8 sm:p-10"
          >
            <h3 className="text-3xl leading-38 font-bold text-ink sm:text-4xl sm:leading-12">
              Visi
            </h3>
            <ol className="mt-6 flex flex-col gap-6">
              {visiItems.map((item, index) => (
                <li
                  key={item.text}
                  data-vm-item
                  className="flex items-start gap-4"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-ink">
                    {index + 1}
                  </span>
                  <p className="text-base leading-6 text-body">{item.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div
            data-vm-card
            className="rounded-2xl border border-border-sand bg-white p-8 shadow-xs sm:p-10"
          >
            <h3 className="text-3xl leading-38 font-bold text-ink sm:text-4xl sm:leading-12">
              Misi
            </h3>
            <ol className="mt-6 flex flex-col gap-5">
              {misiItems.map((item, index) => (
                <li
                  key={item.text}
                  data-vm-item
                  className="flex items-start gap-4"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gold-soft text-sm font-bold text-gold-ink">
                    {index + 1}
                  </span>
                  <p className="text-base leading-6 text-body">{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
