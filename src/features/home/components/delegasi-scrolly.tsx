"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { delegasiSection, faculties } from "../data";
import { DelegasiLogo } from "./delegasi-logo";

/** Official faculty names and logo petal colours (no copy or data edits). */
const FACULTY_NAMES: Readonly<Record<string, string>> = {
  FIP: "Fakultas Ilmu Pendidikan",
  FISH: "Fakultas Ilmu Sosial dan Hukum",
  FMIPA: "Fakultas Matematika dan Ilmu Pengetahuan Alam",
  FEB: "Fakultas Ekonomi dan Bisnis",
  FT: "Fakultas Teknik",
  FPsi: "Fakultas Psikologi",
  FBS: "Fakultas Bahasa dan Seni",
  FIKK: "Fakultas Ilmu Keolahragaan dan Kesehatan",
};

const FACULTY_COLORS: Readonly<Record<string, string>> = {
  FIP: "#688D4D",
  FISH: "#EA3C3B",
  FMIPA: "#B3419A",
  FEB: "#F5833E",
  FT: "#4659A1",
  FPsi: "#06FBF9",
  FBS: "#65AECD",
  FIKK: "#EBEBEB",
};

/** Two petals per level, in build order — one faculty on each physical side. */
const LEVELS: readonly (readonly [string, string])[] = [
  ["FIP", "FISH"],
  ["FMIPA", "FEB"],
  ["FIKK", "FPsi"],
  ["FBS", "FT"],
];

/** Timeline beats, shared by the reveal and the matching pointer highlight. */
const TRACE_DURATION = 1;
const BASE_DURATION = 0.5;
const FLAME_DURATION = 0.5;
const LEVEL_DURATION = 1;
const FIRST_LEVEL_TIME = TRACE_DURATION + BASE_DURATION + FLAME_DURATION;
const TIMELINE_DURATION = FIRST_LEVEL_TIME + LEVEL_DURATION * LEVELS.length;

/** Pin length in viewport heights. Two keeps the six beats from being skipped
    by one wheel gesture while Lenis lerps at 0.25. */
const PIN_VIEWPORTS = 2;

// Visual order is bottom-up: the first built pair sits at the bottom of each
// rail so the leader lines follow the same build order as the petals.
const LEFT_CODES = ["FBS", "FIKK", "FEB", "FIP"] as const;
const RIGHT_CODES = ["FT", "FPsi", "FMIPA", "FISH"] as const;
const MOBILE_CODES = [
  "FBS",
  "FT",
  "FIKK",
  "FPsi",
  "FMIPA",
  "FEB",
  "FIP",
  "FISH",
] as const;

function facultyFor(code: string) {
  return faculties.find((faculty) => faculty.code === code);
}

function FacultyRow({
  code,
  side,
  isActive,
  showCode = true,
}: {
  code: string;
  side: "left" | "right";
  isActive: boolean;
  showCode?: boolean;
}) {
  const swatch = (
    <span
      aria-hidden="true"
      className="size-2 shrink-0 rounded-full border border-border-sand sm:size-3 sm:rounded-sm"
      style={{ backgroundColor: FACULTY_COLORS[code] }}
    />
  );
  const leader = (
    <span
      aria-hidden="true"
      className={cn(
        "hidden h-px w-8 shrink-0 sm:block",
        isActive ? "bg-gold-dark" : "bg-border-sand",
      )}
    />
  );
  const codeLabel = showCode ? (
    <span
      className={cn(
        "w-13 shrink-0 text-13 font-semibold",
        isActive ? "text-gold-ink" : "text-body-muted",
      )}
    >
      {code}
    </span>
  ) : null;
  const name = (
    <span
      className={cn(
        "min-w-0 flex-1 text-sm leading-5",
        side === "right" && "text-right",
        isActive ? "font-semibold text-ink" : "text-body-muted",
      )}
    >
      {FACULTY_NAMES[code]}
    </span>
  );

  return (
    <li
      data-active={isActive ? "true" : "false"}
      data-faculty-code={code}
      className={cn(
        "flex items-center gap-2 py-1 sm:gap-3 sm:py-1.5",
        isActive ? "text-ink" : "text-body-muted",
      )}
    >
      {side === "left" ? (
        <>
          {swatch}
          {codeLabel}
          {name}
          {leader}
        </>
      ) : (
        <>
          {leader}
          {name}
          {codeLabel}
          {swatch}
        </>
      )}
    </li>
  );
}

export function DelegasiScrolly() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [activeCode, setActiveCode] = useState<string | null>(null);
  const activeRef = useRef<string | null>(null);

  useEffect(() => {
    // jsdom has no matchMedia; there the static final logo is correct.
    if (typeof window.matchMedia !== "function") {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const root = rootRef.current;
      const stage = stageRef.current;
      if (!root || !stage) {
        return;
      }

      let traceGroup: SVGGElement | null = null;

      // The static "complete" markup is the reduced-motion/SSR fallback. With
      // motion enabled the reveal starts from nothing, so announce that here.
      logoRef.current?.setAttribute("data-state", "building");

      const context = gsap.context(() => {
        const base = root.querySelector('[data-logo-group="base"]');
        const flame = root.querySelector('[data-logo-group="flame"]');
        const svg = root.querySelector("svg");
        const levels = LEVELS.map((_, index) =>
          root.querySelector(`[data-logo-group="level-${index + 1}"]`),
        );

        gsap.set([base, flame, ...levels], { opacity: 0 });

        // Each petal wipes outward from the centre: right petals are clipped
        // from the right, left petals mirror by being clipped from the left.
        const petals = levels.map((level) =>
          Array.from(level?.querySelectorAll("path") ?? []).map((path) => {
            const petal = path as SVGPathElement;
            const box = petal.getBBox();
            const isLeft = box.x + box.width / 2 < 371;
            gsap.set(petal, {
              clipPath: isLeft
                ? "inset(0% 0% 0% 100%)"
                : "inset(0% 100% 0% 0%)",
            });
            return petal;
          }),
        );

        // Stroke-only clones of every real artwork path (base, all four
        // levels and the flame) are drawn first, then faded as the fills build.
        const traceSelector = "[data-logo-group] path";
        const tracePaths: SVGPathElement[] = [];
        if (svg) {
          traceGroup = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g",
          ) as SVGGElement;
          traceGroup.setAttribute("data-logo-trace", "");
          traceGroup.setAttribute("aria-hidden", "true");
          svg.appendChild(traceGroup);

          root.querySelectorAll(traceSelector).forEach((source) => {
            const clone = source.cloneNode(true) as SVGPathElement;
            clone.setAttribute("fill", "none");
            clone.setAttribute("stroke-width", "2");
            clone.style.stroke = "var(--color-ink)";
            traceGroup?.appendChild(clone);
            const length = clone.getTotalLength();
            gsap.set(clone, {
              strokeDasharray: length,
              strokeDashoffset: length,
            });
            tracePaths.push(clone);
          });
        }

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${window.innerHeight * PIN_VIEWPORTS}`,
            pin: stage,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // Publish the trigger's own measurements so consumers (including
            // the e2e spec) never have to guess the pin distance from layout.
            onRefresh: (self) => {
              root.dataset.scrollStart = String(self.start);
              root.dataset.scrollEnd = String(self.end);
            },
            onUpdate: (self) => {
              logoRef.current?.setAttribute(
                "data-state",
                self.progress >= 0.99 ? "complete" : "building",
              );
              // Highlight the same level the timeline is currently revealing:
              // 1 → 2 → 3 → 4, matching the colours appearing in the logo.
              const step = Math.min(
                LEVELS.length,
                Math.max(
                  0,
                  Math.ceil(
                    (self.progress * TIMELINE_DURATION - FIRST_LEVEL_TIME) /
                      LEVEL_DURATION,
                  ),
                ),
              );
              const next = step === 0 ? null : LEVELS[step - 1][0];
              if (next !== activeRef.current) {
                activeRef.current = next;
                setActiveCode(next);
              }
            },
          },
        });

        const trigger = timeline.scrollTrigger;
        if (trigger) {
          root.dataset.scrollStart = String(trigger.start);
          root.dataset.scrollEnd = String(trigger.end);
        }

        if (tracePaths.length > 0) {
          timeline.to(
            tracePaths,
            { strokeDashoffset: 0, duration: TRACE_DURATION },
            0,
          );
        }
        timeline
          .to(base, { opacity: 1, duration: BASE_DURATION }, TRACE_DURATION)
          .to(
            flame,
            { opacity: 1, duration: FLAME_DURATION },
            TRACE_DURATION + BASE_DURATION,
          );
        if (traceGroup) {
          timeline.to(
            traceGroup,
            { opacity: 0, duration: BASE_DURATION + FLAME_DURATION },
            TRACE_DURATION,
          );
        }

        levels.forEach((level, index) => {
          const start = FIRST_LEVEL_TIME + index * LEVEL_DURATION;
          timeline.to(level, { opacity: 1, duration: LEVEL_DURATION }, start);
          petals[index].forEach((petal) => {
            timeline.to(
              petal,
              { clipPath: "inset(0% 0% 0% 0%)", duration: LEVEL_DURATION },
              start,
            );
          });
        });
      }, root);

      return () => {
        context.revert();
        traceGroup?.remove();
        // A runtime switch to reduced motion shows the static final logo, so
        // the state must no longer claim the reveal is still building.
        logoRef.current?.setAttribute("data-state", "complete");
        delete root.dataset.scrollStart;
        delete root.dataset.scrollEnd;
        activeRef.current = null;
        setActiveCode(null);
      };
    });

    return () => media.revert();
  }, []);

  const activeLevel = activeCode
    ? LEVELS.findIndex((level) => level.includes(activeCode))
    : -1;
  const isLevelActive = (code: string) =>
    activeLevel >= 0 && LEVELS[activeLevel].includes(code);

  return (
    <div ref={rootRef} data-testid="delegasi-scrolly" className="relative">
      <div
        ref={stageRef}
        className="z-0 flex h-svh w-full flex-col justify-start overflow-hidden bg-gold-soft/50 px-4 pt-18 pb-3 sm:px-6 sm:pt-22 sm:pb-5"
      >
        <div className="mx-auto mb-2 max-w-180 shrink-0 text-center sm:mb-4">
          <h2
            data-testid="delegasi-title"
            className="text-24 leading-8 font-semibold tracking-t05 text-ink sm:text-34 sm:leading-11 lg:text-38 lg:leading-12"
          >
            {delegasiSection.title}
          </h2>
          <p className="mx-auto mt-1 max-w-160 text-13 leading-5 text-body-muted sm:mt-2 sm:text-base sm:leading-6">
            {delegasiSection.subtitle}
          </p>
        </div>

        <div className="mx-auto grid min-h-0 w-full max-w-300 flex-1 grid-cols-1 items-center gap-2 sm:gap-4 lg:grid-cols-4 lg:gap-8">
          <ul className="hidden flex-col gap-0.5 sm:flex sm:gap-2">
            {LEFT_CODES.map((code) => {
              const faculty = facultyFor(code);
              return faculty ? (
                <FacultyRow
                  key={faculty.code}
                  code={faculty.code}
                  side="left"
                  isActive={isLevelActive(faculty.code)}
                />
              ) : null;
            })}
          </ul>

          <ul className="grid grid-cols-2 gap-x-2 gap-y-0 sm:hidden">
            {MOBILE_CODES.map((code) => {
              const faculty = facultyFor(code);
              return faculty ? (
                <FacultyRow
                  key={faculty.code}
                  code={faculty.code}
                  side="left"
                  isActive={isLevelActive(faculty.code)}
                  showCode={false}
                />
              ) : null;
            })}
          </ul>

          <div className="relative mx-auto flex min-h-0 w-full max-w-160 items-center justify-center rounded-20 p-3 bg-delegasi-panel sm:p-6 lg:col-span-2 lg:p-10">
            <div
              ref={logoRef}
              data-testid="delegasi-logo"
              data-state="complete"
              className="w-full"
            >
              <DelegasiLogo className="h-auto max-h-[32svh] w-full object-contain motion-reduce:hidden sm:max-h-[42svh]" />
              <Image
                src="/images/forkip-logo-scrolly.svg"
                alt="Lambang Forum KIPK UNJ dengan delapan warna fakultas"
                width={742}
                height={742}
                className="hidden h-auto max-h-[32svh] w-full object-contain motion-reduce:block sm:max-h-[42svh]"
              />
            </div>
          </div>

          <ul className="hidden flex-col gap-0.5 sm:flex sm:gap-2">
            {RIGHT_CODES.map((code) => {
              const faculty = facultyFor(code);
              return faculty ? (
                <FacultyRow
                  key={faculty.code}
                  code={faculty.code}
                  side="right"
                  isActive={isLevelActive(faculty.code)}
                />
              ) : null;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
