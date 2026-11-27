"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import type { FacultyRecord } from "@/types";
import { cn } from "@/utils/cn";
import { delegasiSection } from "../data";
import { DelegasiLogo } from "./delegasi-logo";

/** Decorative ink-wash colours for the logo petals and leader-line dots. */
const FACULTY_COLORS: Readonly<Record<string, string>> = {
  FIP: "#688D4D",
  FISH: "#EA3C3B",
  FMIPA: "#B3419A",
  FEB: "#F5833E",
  FT: "#4659A1",
  FPsi: "#00A4E4",
  FBS: "#65AECD",
  FIKK: "#9C978B",
};

/** Two petals per level, in build order — [leftCode, rightCode]. */
const LEVELS: readonly (readonly [string, string])[] = [
  ["FIP", "FISH"],
  ["FEB", "FMIPA"],
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

/** Pin length in viewport heights — generous scroll budget for the ink & paper beats. */
const PIN_VIEWPORTS = 3.5;

/** The scrubbed pin is a desktop-only moment; mobile stays a plain stack. */
const PIN_QUERY =
  "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

const LEFT_CODES = ["FBS", "FIKK", "FEB", "FIP"] as const;
const RIGHT_CODES = ["FT", "FPsi", "FMIPA", "FISH"] as const;
const MOBILE_CODES = [
  "FBS",
  "FT",
  "FIKK",
  "FPsi",
  "FEB",
  "FMIPA",
  "FIP",
  "FISH",
] as const;

const SCRAP_ROTATIONS: Readonly<Record<string, number>> = {
  FBS: -1.4,
  FIKK: 1.1,
  FEB: -0.9,
  FIP: 1.3,
  FT: 1.2,
  FPsi: -1.3,
  FMIPA: 0.8,
  FISH: -1.1,
};

const TORN_CLIP_A =
  "polygon(1% 4%, 14% 1%, 28% 5%, 45% 1%, 63% 4%, 81% 0%, 98% 3%, 100% 24%, 98% 52%, 100% 78%, 97% 97%, 82% 99%, 66% 96%, 48% 100%, 31% 96%, 15% 99%, 2% 95%, 0% 71%, 2% 41%)";
const TORN_CLIP_B =
  "polygon(0% 2%, 19% 5%, 37% 1%, 54% 4%, 73% 0%, 91% 4%, 99% 1%, 98% 28%, 100% 56%, 98% 84%, 100% 98%, 79% 96%, 61% 100%, 42% 97%, 22% 100%, 4% 96%, 1% 74%, 0% 45%)";

/** Vertical entry offset per scrap so papers enter from top, top-mid, bot-mid, bot. */
const SCRAP_ENTRY_Y: Readonly<Record<string, number>> = {
  FBS: -170,
  FT: -170,
  FIKK: -55,
  FPsi: -55,
  FEB: 55,
  FMIPA: 55,
  FIP: 170,
  FISH: 170,
};

const LEADER_LEVEL: Readonly<Record<string, number>> = {
  FBS: 4,
  FIKK: 3,
  FEB: 2,
  FIP: 1,
  FT: 4,
  FPsi: 3,
  FMIPA: 2,
  FISH: 1,
};

function updateLeaderGeometry(grid: HTMLElement, leaderSvg: SVGSVGElement) {
  const gridRect = grid.getBoundingClientRect();
  if (gridRect.width === 0 || gridRect.height === 0) return;

  leaderSvg.setAttribute(
    "viewBox",
    `0 0 ${Math.round(gridRect.width)} ${Math.round(gridRect.height)}`,
  );

  for (const code of [...LEFT_CODES, ...RIGHT_CODES]) {
    const anchor = grid.querySelector(`[data-scrap-anchor="${code}"]`);
    const pathEl = leaderSvg.querySelector(`[data-leader-path="${code}"]`);
    const dotEl = leaderSvg.querySelector(`[data-leader-dot="${code}"]`);
    const level = LEADER_LEVEL[code];
    if (!anchor || !pathEl || !dotEl || !level) continue;

    const levelGroup = grid.querySelector(`[data-logo-group="level-${level}"]`);
    const petalPaths = Array.from(levelGroup?.querySelectorAll("path") ?? []);
    if (petalPaths.length === 0) continue;

    const isLeft = (LEFT_CODES as readonly string[]).includes(code);
    // Use getBBox() + getScreenCTM() instead of getBoundingClientRect() so
    // clip-path: circle(0%) on hidden petals never collapses the measurement.
    const petalRects = petalPaths
      .map((p) => {
        if (
          typeof p.getBBox !== "function" ||
          typeof p.getScreenCTM !== "function"
        ) {
          return null;
        }
        const ctm = p.getScreenCTM();
        if (!ctm) return null;
        const box = p.getBBox();
        if (box.width <= 4 || box.height <= 4) return null;
        const left = ctm.a * box.x + ctm.e;
        const top = ctm.d * box.y + ctm.f;
        const width = ctm.a * box.width;
        const height = ctm.d * box.height;
        return { left, top, right: left + width, width, height };
      })
      .filter((r): r is NonNullable<typeof r> => r !== null);
    if (petalRects.length === 0) continue;

    petalRects.sort((a, b) => a.left - b.left);
    const targetPetal = isLeft
      ? petalRects[0]
      : petalRects[petalRects.length - 1];

    const aRect = anchor.getBoundingClientRect();
    const x1 = isLeft
      ? aRect.right - gridRect.left - 4
      : aRect.left - gridRect.left + 4;
    const y1 = aRect.top - gridRect.top + aRect.height / 2;

    const x2 = isLeft
      ? targetPetal.left - gridRect.left + targetPetal.width * 0.25
      : targetPetal.right - gridRect.left - targetPetal.width * 0.25;
    const y2 = targetPetal.top - gridRect.top + targetPetal.height * 0.45;

    const midX = x2 + (x1 - x2) * 0.48;
    // Draw outward from the petal (x2, y2) to the torn-paper edge (x1, y1)
    const d = `M ${x2.toFixed(1)} ${y2.toFixed(1)} C ${midX.toFixed(1)} ${y2.toFixed(1)}, ${midX.toFixed(1)} ${y1.toFixed(1)}, ${x1.toFixed(1)} ${y1.toFixed(1)}`;
    pathEl.setAttribute("d", d);
    dotEl.setAttribute("cx", x2.toFixed(1));
    dotEl.setAttribute("cy", y2.toFixed(1));
  }
}

function TornPaperScrap({
  code,
  name,
  side,
  isActive,
  compact = false,
  showCode = true,
}: {
  code: string;
  name: string;
  side: "left" | "right";
  isActive: boolean;
  compact?: boolean;
  showCode?: boolean;
}) {
  const clip = code.length % 2 === 0 ? TORN_CLIP_A : TORN_CLIP_B;
  const rot = SCRAP_ROTATIONS[code] ?? 0;

  return (
    <li
      data-faculty-code={code}
      data-active={isActive ? "true" : "false"}
      data-scrap-side={side}
      data-scrap-anchor={compact ? undefined : code}
    >
      <div
        data-scrap-code={compact ? undefined : code}
        style={{ transform: `rotate(${rot}deg)` }}
        className="drop-shadow-scrap"
      >
        <div
          style={{ clipPath: clip }}
          className={cn(
            "relative bg-paper text-paper-ink transition-colors duration-200",
            compact ? "px-3 py-2" : "px-4 py-3",
            isActive && "bg-paper-raised",
          )}
        >
          <div
            className={cn(
              "flex items-center gap-2",
              side === "left" && !compact && "justify-end text-right",
            )}
          >
            <span
              aria-hidden="true"
              className="size-2.5 shrink-0 rounded-full opacity-90 mix-blend-multiply"
              style={{ backgroundColor: FACULTY_COLORS[code] }}
            />
            {showCode ? (
              <span className="text-sm font-extrabold tracking-tight">
                {code}
              </span>
            ) : null}
          </div>
          <p
            className={cn(
              "mt-0.5 text-xs leading-tight text-paper-muted",
              side === "left" && !compact && "text-right",
            )}
          >
            {name}
          </p>
        </div>
      </div>
    </li>
  );
}

/**
 * Scroll-driven Delegasi logo on procedural archival paper: charcoal ink
 * sketches the outline, then each level's torn-paper scraps slide in from
 * outside (right leading left by ~25% of a beat), hand-drawn ink leader lines
 * connect to their petals, and colored ink washes soak into the paper.
 *
 * Reduced motion renders the completed paper, ink, torn-paper scraps and
 * leader lines statically (unpinned).
 */
export function DelegasiScrolly({
  faculties,
}: {
  readonly faculties: readonly FacultyRecord[];
}) {
  const facultyFor = (code: string) =>
    faculties.find((faculty) => faculty.code === code);
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const leaderSvgRef = useRef<SVGSVGElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<string | null>(null);
  const [activeCode, setActiveCode] = useState<string | null>(null);

  // Leader lines only exist in the pinned desktop stage; below lg the section
  // is a plain stack, so skip the JS measurement entirely there.
  useEffect(() => {
    const grid = gridRef.current;
    const leaderSvg = leaderSvgRef.current;
    if (!grid || !leaderSvg || typeof window.matchMedia !== "function") return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    const syncLeaders = () => {
      if (desktop.matches) updateLeaderGeometry(grid, leaderSvg);
    };
    syncLeaders();

    if (typeof desktop.addEventListener === "function") {
      desktop.addEventListener("change", syncLeaders);
      return () => desktop.removeEventListener("change", syncLeaders);
    }
    if (typeof desktop.addListener === "function") {
      desktop.addListener(syncLeaders);
      return () => desktop.removeListener(syncLeaders);
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage || typeof window.matchMedia !== "function") {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();

    media.add(PIN_QUERY, () => {
      let traceGroup: SVGGElement | null = null;
      logoRef.current?.setAttribute("data-state", "building");

      const context = gsap.context(() => {
        const base = root.querySelector('[data-logo-group="base"]');
        const flame = root.querySelector('[data-logo-group="flame"]');
        const levels = LEVELS.map((_, index) =>
          root.querySelector(`[data-logo-group="level-${index + 1}"]`),
        );
        const svg = root.querySelector("svg[data-delegasi-logo]");

        gsap.set([base, flame, ...levels], { opacity: 0 });
        // Ink-spread initial state for base and flame (radiating from their
        // lower centers through the SVG ink-wash displacement filter)
        if (base) {
          gsap.set(base, { clipPath: "circle(0% at 50% 88%)" });
        }
        if (flame) {
          gsap.set(flame, { clipPath: "circle(0% at 50% 60%)" });
        }

        const petals = levels.map((level) =>
          Array.from(level?.querySelectorAll("path") ?? []).map((petal) => {
            const box = petal.getBBox();
            const isLeft = box.x + box.width / 2 < 371;
            // Start the ink blot at the inner stem of each petal so colored
            // ink spreads organically outward across the paper grain.
            gsap.set(petal, {
              clipPath: isLeft
                ? "circle(0% at 85% 85%)"
                : "circle(0% at 15% 85%)",
            });
            return petal;
          }),
        );

        // Slide-in initial states for desktop torn-paper scraps (completely
        // outside the viewport even on wide lg+/2xl monitors, at full opacity)
        const offscreenX = () => Math.max(window.innerWidth * 0.65, 650);
        for (const code of LEFT_CODES) {
          const el = root.querySelector(`[data-scrap-code="${code}"]`);
          if (el) {
            gsap.set(el, {
              x: () => -offscreenX(),
              y: SCRAP_ENTRY_Y[code] ?? 0,
              rotation: (SCRAP_ROTATIONS[code] ?? 0) - 8,
            });
          }
        }
        for (const code of RIGHT_CODES) {
          const el = root.querySelector(`[data-scrap-code="${code}"]`);
          if (el) {
            gsap.set(el, {
              x: () => offscreenX(),
              y: SCRAP_ENTRY_Y[code] ?? 0,
              rotation: (SCRAP_ROTATIONS[code] ?? 0) + 8,
            });
          }
        }

        // Measure leader lines before setting initial dashoffset in real px
        if (gridRef.current && leaderSvgRef.current) {
          updateLeaderGeometry(gridRef.current, leaderSvgRef.current);
        }
        root.querySelectorAll("[data-leader-path]").forEach((pathEl) => {
          const len =
            typeof (pathEl as SVGPathElement).getTotalLength === "function"
              ? (pathEl as SVGPathElement).getTotalLength()
              : 300;
          pathEl.setAttribute("data-leader-ready", "true");
          gsap.set(pathEl, {
            strokeDasharray: len,
            strokeDashoffset: len,
          });
        });
        root.querySelectorAll("[data-leader-dot]").forEach((dotEl) => {
          gsap.set(dotEl, { opacity: 0 });
        });

        // Charcoal ink outline trace clones
        const traceSelector = "[data-logo-group] path";
        const tracePaths: SVGPathElement[] = [];
        if (svg) {
          traceGroup = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g",
          ) as SVGGElement;
          traceGroup.setAttribute("data-logo-trace", "");
          traceGroup.setAttribute("aria-hidden", "true");
          traceGroup.setAttribute("filter", "url(#delegasi-ink-outline)");
          traceGroup.setAttribute("opacity", "0.72");
          traceGroup.style.mixBlendMode = "multiply";
          svg.appendChild(traceGroup);

          root.querySelectorAll(traceSelector).forEach((source) => {
            const clone = source.cloneNode(true) as SVGPathElement;
            // Clear any inline clip-path set on fill petals so every petal
            // outline is fully visible when drawn.
            clone.style.clipPath = "";
            clone.setAttribute("fill", "none");
            clone.setAttribute("stroke-width", "2.4");
            clone.setAttribute("stroke-linecap", "round");
            clone.setAttribute("stroke-linejoin", "round");
            clone.style.stroke = "#1E1A16";
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
            onRefresh: (self) => {
              root.dataset.scrollStart = String(self.start);
              root.dataset.scrollEnd = String(self.end);
              if (gridRef.current && leaderSvgRef.current) {
                updateLeaderGeometry(gridRef.current, leaderSvgRef.current);
              }
            },
            onUpdate: (self) => {
              logoRef.current?.setAttribute(
                "data-state",
                self.progress >= 0.99 ? "complete" : "building",
              );
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
          .to(
            base,
            {
              opacity: 1,
              clipPath: "circle(140% at 50% 88%)",
              duration: BASE_DURATION,
              ease: "power1.out",
            },
            TRACE_DURATION,
          )
          .to(
            flame,
            {
              opacity: 1,
              clipPath: "circle(140% at 50% 60%)",
              duration: FLAME_DURATION,
              ease: "power1.out",
            },
            TRACE_DURATION + BASE_DURATION,
          );

        levels.forEach((level, index) => {
          const [leftCode, rightCode] = LEVELS[index];
          const start = FIRST_LEVEL_TIME + index * LEVEL_DURATION;

          // 1. Colored ink spreads organically outward across the petals
          timeline.to(level, { opacity: 1, duration: 0.45 }, start);
          petals[index].forEach((petal) => {
            const box = petal.getBBox();
            const isLeft = box.x + box.width / 2 < 371;
            timeline.to(
              petal,
              {
                clipPath: isLeft
                  ? "circle(145% at 85% 85%)"
                  : "circle(145% at 15% 85%)",
                duration: 0.55,
                ease: "power1.out",
              },
              start,
            );
          });

          // 2. Leading line draws (right leads left by ~0.2 of a beat)
          const rightLine = root.querySelector(
            `[data-leader-path="${rightCode}"]`,
          );
          const rightDot = root.querySelector(
            `[data-leader-dot="${rightCode}"]`,
          );
          const rightScrap = root.querySelector(
            `[data-scrap-code="${rightCode}"]`,
          );
          if (rightDot) {
            timeline.to(rightDot, { opacity: 1, duration: 0.12 }, start + 0.32);
          }
          if (rightLine) {
            timeline.to(
              rightLine,
              { strokeDashoffset: 0, duration: 0.28 },
              start + 0.35,
            );
          }
          // 3. Right torn-paper slides in after its leading line
          if (rightScrap) {
            timeline.to(
              rightScrap,
              {
                x: 0,
                y: 0,
                rotation: SCRAP_ROTATIONS[rightCode] ?? 0,
                duration: 0.3,
                ease: "power2.out",
              },
              start + 0.56,
            );
          }

          const leftLine = root.querySelector(
            `[data-leader-path="${leftCode}"]`,
          );
          const leftDot = root.querySelector(`[data-leader-dot="${leftCode}"]`);
          const leftScrap = root.querySelector(
            `[data-scrap-code="${leftCode}"]`,
          );
          if (leftDot) {
            timeline.to(leftDot, { opacity: 1, duration: 0.12 }, start + 0.52);
          }
          if (leftLine) {
            timeline.to(
              leftLine,
              { strokeDashoffset: 0, duration: 0.28 },
              start + 0.55,
            );
          }
          // 3. Left torn-paper slides in after its leading line
          if (leftScrap) {
            timeline.to(
              leftScrap,
              {
                x: 0,
                y: 0,
                rotation: SCRAP_ROTATIONS[leftCode] ?? 0,
                duration: 0.3,
                ease: "power2.out",
              },
              start + 0.76,
            );
          }
        });
      }, root);

      return () => {
        context.revert();
        traceGroup?.remove();
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
        className="relative z-0 flex w-full flex-col justify-center gap-10 overflow-hidden bg-surface-100 px-4 pt-16 pb-4 sm:gap-16 sm:px-6 sm:pt-20 sm:pb-6 lg:h-svh lg:gap-20"
      >
        {/* Procedural archival paper grain + ink SVG filters */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full opacity-55 mix-blend-multiply"
        >
          <defs>
            <filter id="delegasi-paper-grain">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.82"
                numOctaves="4"
                stitchTiles="stitch"
                result="noise"
              />
              <feDiffuseLighting
                in="noise"
                lightingColor="#F7F3E8"
                surfaceScale="1.6"
              >
                <feDistantLight azimuth="45" elevation="58" />
              </feDiffuseLighting>
            </filter>
            <filter
              id="delegasi-ink-outline"
              x="-5%"
              y="-5%"
              width="110%"
              height="110%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.045"
                numOctaves="3"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="3.2"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
            <filter
              id="delegasi-ink-wash"
              x="-8%"
              y="-8%"
              width="116%"
              height="116%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.035"
                numOctaves="3"
                result="washNoise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="washNoise"
                scale="4"
                xChannelSelector="R"
                yChannelSelector="G"
                result="roughened"
              />
              <feGaussianBlur
                in="roughened"
                stdDeviation="0.7"
                result="bleed"
              />
              <feMerge>
                <feMergeNode in="bleed" />
                <feMergeNode in="roughened" />
              </feMerge>
            </filter>
          </defs>
          <rect
            width="100%"
            height="100%"
            filter="url(#delegasi-paper-grain)"
          />
        </svg>

        {/* Subtle archival edge vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 58%, rgba(138, 118, 86, 0.16) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-180 shrink-0 text-center">
          <h2
            data-testid="delegasi-title"
            className="text-2xl leading-8 font-semibold tracking-t05 text-ink sm:text-4xl sm:leading-11 lg:text-4xl lg:leading-12"
          >
            {delegasiSection.title}
          </h2>
          <p className="mx-auto mt-1 max-w-160 text-sm leading-5 text-body-muted sm:mt-2 sm:text-base sm:leading-6">
            {delegasiSection.subtitle}
          </p>
        </div>

        <div
          ref={gridRef}
          className="relative z-10 mx-auto grid min-h-0 w-full max-w-300 grid-cols-1 items-center gap-2 sm:gap-4 lg:grid-cols-4 lg:gap-8"
        >
          {/* Desktop hand-drawn curved ink leader lines (DOM-measured) */}
          <svg
            ref={leaderSvgRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden size-full overflow-visible mix-blend-multiply lg:block"
          >
            {Object.entries(LEADER_LEVEL).map(([code, level]) => {
              const isActive = activeLevel + 1 === level;
              return (
                <g key={code} filter="url(#delegasi-ink-outline)">
                  <path
                    data-leader-path={code}
                    d=""
                    fill="none"
                    stroke={isActive ? "#1C1915" : "#4A433A"}
                    strokeWidth={isActive ? 2.1 : 1.4}
                    strokeLinecap="round"
                  />
                  <circle
                    data-leader-dot={code}
                    cx={0}
                    cy={0}
                    r={isActive ? 4.2 : 3}
                    fill={FACULTY_COLORS[code]}
                  />
                </g>
              );
            })}
          </svg>

          <ul className="relative z-10 hidden flex-col gap-6 lg:flex">
            {LEFT_CODES.map((code) => {
              const faculty = facultyFor(code);
              return faculty ? (
                <TornPaperScrap
                  key={faculty.code}
                  code={faculty.code}
                  name={faculty.name}
                  side="left"
                  isActive={isLevelActive(faculty.code)}
                />
              ) : null;
            })}
          </ul>

          <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-160 items-center justify-center lg:col-span-2">
            <div
              ref={logoRef}
              data-testid="delegasi-logo"
              data-state="complete"
              className="w-full"
            >
              <DelegasiLogo
                data-delegasi-logo=""
                style={{
                  filter: "url(#delegasi-ink-wash)",
                  mixBlendMode: "multiply",
                }}
                className="h-auto max-h-logo-mobile w-full object-contain sm:max-h-logo-desktop"
              />
            </div>
          </div>

          <ul className="relative z-10 hidden flex-col gap-6 lg:flex">
            {RIGHT_CODES.map((code) => {
              const faculty = facultyFor(code);
              return faculty ? (
                <TornPaperScrap
                  key={faculty.code}
                  code={faculty.code}
                  name={faculty.name}
                  side="right"
                  isActive={isLevelActive(faculty.code)}
                />
              ) : null;
            })}
          </ul>

          {/* Mobile compact torn-paper scraps (no leader lines) */}
          <ul className="relative z-10 grid grid-cols-2 gap-2 lg:hidden">
            {MOBILE_CODES.map((code) => {
              const faculty = facultyFor(code);
              return faculty ? (
                <TornPaperScrap
                  key={faculty.code}
                  code={faculty.code}
                  name={faculty.name}
                  side="right"
                  compact
                  isActive={isLevelActive(faculty.code)}
                  showCode={false}
                />
              ) : null;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
