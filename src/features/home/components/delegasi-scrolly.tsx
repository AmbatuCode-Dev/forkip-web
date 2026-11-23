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

// Visual order is bottom-up: the first built pair sits at the bottom of each
// rail so the leader lines follow the same build order as the petals.
const LEFT_CODES = ["FIKK", "FBS", "FEB", "FIP"] as const;
const RIGHT_CODES = ["FPsi", "FT", "FMIPA", "FISH"] as const;
const MOBILE_CODES = [
  "FIKK",
  "FPsi",
  "FBS",
  "FT",
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

      const context = gsap.context(() => {
        const base = root.querySelector('[data-logo-group="base"]');
        const flame = root.querySelector('[data-logo-group="flame"]');
        const levels = LEVELS.map((_, index) =>
          root.querySelector(`[data-logo-group="level-${index + 1}"]`),
        );

        gsap.set([base, flame, ...levels], { opacity: 0 });

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${window.innerHeight * 2}`,
            pin: stage,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              logoRef.current?.setAttribute(
                "data-state",
                self.progress >= 0.99 ? "complete" : "building",
              );
              const step = Math.min(
                LEVELS.length,
                Math.max(0, Math.ceil(self.progress * (LEVELS.length + 1)) - 1),
              );
              const next = step === 0 ? null : LEVELS[step - 1][0];
              if (next !== activeRef.current) {
                activeRef.current = next;
                setActiveCode(next);
              }
            },
          },
        });

        timeline
          .to(base, { opacity: 1, duration: 0.5 })
          .to(flame, { opacity: 1, duration: 0.5 })
          .to(levels[0], { opacity: 1, duration: 1 })
          .to(levels[1], { opacity: 1, duration: 1 })
          .to(levels[2], { opacity: 1, duration: 1 })
          .to(levels[3], { opacity: 1, duration: 1 });
      }, root);

      return () => {
        context.revert();
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
        className="z-0 flex min-h-svh w-full flex-col justify-start bg-gold-soft/50 px-4 pt-19 pb-4 sm:px-6 sm:pt-20 sm:pb-6"
      >
        <div className="mx-auto mb-4 max-w-180 text-center">
          <h2
            data-testid="delegasi-title"
            className="text-28 leading-9 font-semibold tracking-t05 text-ink sm:text-34 sm:leading-11 lg:text-38 lg:leading-12"
          >
            {delegasiSection.title}
          </h2>
          <p className="mx-auto mt-2 max-w-160 text-sm leading-5 text-body-muted sm:text-base sm:leading-6">
            {delegasiSection.subtitle}
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-300 flex-1 grid-cols-1 items-center gap-8 lg:grid-cols-4 lg:gap-8">
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

          <ul className="flex flex-col gap-0.5 sm:hidden">
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

          <div className="relative mx-auto w-full max-w-160 rounded-20 p-6 bg-delegasi-panel sm:p-10 lg:col-span-2">
            <div
              ref={logoRef}
              data-testid="delegasi-logo"
              data-state="complete"
              className="w-full"
            >
              <DelegasiLogo
                aria-hidden="true"
                className="h-auto w-full motion-reduce:hidden"
              />
              <Image
                src="/images/forkip-logo-scrolly.svg"
                alt="Lambang Forum KIPK UNJ dengan delapan warna fakultas"
                width={742}
                height={742}
                className="hidden h-auto w-full motion-reduce:block"
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
