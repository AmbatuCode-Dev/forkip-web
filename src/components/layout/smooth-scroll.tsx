"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useLayoutEffect, useRef } from "react";

type RouterNavigationType = "push" | "replace" | "traverse";

type NavigationGlobal = typeof globalThis & {
  __forkipNavType?: RouterNavigationType;
};

function consumeNavigationType(): RouterNavigationType | undefined {
  const global = globalThis as NavigationGlobal;
  const navigationType = global.__forkipNavType;
  delete global.__forkipNavType;
  return navigationType;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const previousPathRef = useRef(pathname);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.ticker.lagSmoothing(0);

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({
        lerp: 0.25,
        smoothWheel: true,
        stopInertiaOnNavigate: true,
      });
      lenisRef.current = lenis;

      const tick = (time: number) => {
        lenis.raf(time * 1000);
      };

      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        lenisRef.current = null;
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  useLayoutEffect(() => {
    const lenis = lenisRef.current;
    const navigationType = consumeNavigationType();
    const pathChanged = previousPathRef.current !== pathname;
    previousPathRef.current = pathname;

    if (!lenis || !pathChanged) return;

    if (navigationType === "push" || navigationType === "replace") {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else if (
      navigationType === "traverse" &&
      lenis.isScrolling === "smooth"
    ) {
      // Browser back/forward restores the scroll position; only clear the
      // in-flight Lenis animation without moving the viewport.
      lenis.stop();
      lenis.start();
    }

    ScrollTrigger.refresh(true);
  }, [pathname]);

  return <>{children}</>;
}
