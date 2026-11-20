import Link from "next/link";
import { cn } from "@/utils/cn";

export interface PageHeroProps {
  /** Breadcrumb trail: "Beranda / {label}" — label must match the page title. */
  readonly breadcrumb: {
    readonly label: string;
    readonly href: string;
  };
  readonly title: string;
  readonly subtitle: string;
  /** "md" → 34/40px mobile, "lg" → 36/44px mobile; both 52/60px desktop. Default "md". */
  readonly titleSize?: "md" | "lg";
  readonly className?: string;
}

/**
 * Shared service-page hero (penyewaan/arsip/berita/pengunduran-diri family):
 * horizontal cream→gold gradient, batik kawung SVG accent on the right,
 * breadcrumb via next/link, large H1 and muted subtitle. Beranda keeps its
 * own unique hero layout.
 */
export function PageHero({
  breadcrumb,
  title,
  subtitle,
  titleSize = "md",
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gradient-to-r from-[#FBF6DF] via-[#FAE9A8] to-[#F6D34A]",
        className,
      )}
    >
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
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-3 px-4 py-16 sm:px-6 xl:px-0">
        <nav aria-label="Breadcrumb">
          <p className="text-[13px] font-medium text-[#666666]">
            <Link
              href={breadcrumb.href}
              className="rounded-sm transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Beranda
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{breadcrumb.label}</span>
          </p>
        </nav>
        <h1
          className={cn(
            "font-bold tracking-[-0.5px] text-[#1C1C1C]",
            titleSize === "lg"
              ? "text-[36px] leading-[44px] sm:text-[52px] sm:leading-[60px]"
              : "text-[34px] leading-[40px] sm:text-[52px] sm:leading-[60px]",
          )}
        >
          {title}
        </h1>
        <p className="max-w-[760px] text-base leading-[26px] text-[#404040]">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
