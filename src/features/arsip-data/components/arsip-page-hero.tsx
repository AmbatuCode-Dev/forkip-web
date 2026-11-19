import Link from "next/link";
import type { ArsipHeroContent } from "../types";

interface ArsipPageHeroProps {
  readonly content: ArsipHeroContent;
}

/**
 * Page hero shared look with Beranda: gradient cream→gold, batik accent
 * right, breadcrumb 13px muted, H1 48px bold ink900.
 */
export function ArsipPageHero({ content }: ArsipPageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#FBF6DF] via-[#FAE9A8] to-[#F6D34A]">
      {/* Batik accent approximation (kawung motif, right side) */}
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 640 294"
        className="pointer-events-none absolute inset-y-0 right-0 h-full w-[640px] text-[#E9C94F]"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          {[0, 1, 2, 3, 4].map((row) =>
            [0, 1, 2, 3, 4].map((col) => (
              <ellipse
                key={`${row}-${col}`}
                cx={520 + col * 64 - (row % 2) * 32}
                cy={36 + row * 64}
                rx={26}
                ry={30}
                transform={`rotate(45 ${520 + col * 64 - (row % 2) * 32} ${
                  36 + row * 64
                })`}
              />
            )),
          )}
        </g>
      </svg>
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-3 px-4 py-16 sm:px-6">
        <nav aria-label="Breadcrumb">
          <p className="text-[13px] font-medium text-[#666666]">
            <Link
              href="/"
              className="rounded-sm transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Beranda
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{content.breadcrumbLabel}</span>
          </p>
        </nav>
        <h1 className="text-[36px] leading-[1.15] font-bold tracking-[-0.5px] text-[#1C1C1C] sm:text-[48px]">
          {content.title}
        </h1>
        <p className="max-w-[760px] text-base leading-relaxed text-[#404040]">
          {content.description}
        </p>
      </div>
    </section>
  );
}
