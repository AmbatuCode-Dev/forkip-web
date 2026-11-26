import type { NewsPost } from "../types";

/**
 * Media-only news card (BUSAMAKIP / Gelar KIPK): the Figma reference uses
 * a dark, warmly lit illustration tile instead of a photo carousel. Built
 * from CSS + SVG so no external image asset is required.
 */
function BusamakipStage() {
  return (
    <div className="relative h-75 overflow-hidden rounded-2xl bg-night-radial">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(rgba(246, 211, 74, 0.55) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      {/* hanging light cord + drops */}
      <svg
        viewBox="0 0 580 300"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-0 size-full"
      >
        {[120, 225, 355, 460].map((x) => (
          <g key={x}>
            <line
              x1={x}
              y1="0"
              x2={x}
              y2="58"
              stroke="#C9A227"
              strokeWidth="1"
              opacity="0.7"
            />
            <rect
              x={x - 5}
              y="58"
              width="10"
              height="34"
              rx="2"
              fill="#F6D34A"
              opacity="0.85"
            />
          </g>
        ))}
        <circle cx="290" cy="82" r="26" fill="#F6D34A" />
        <circle cx="300" cy="76" r="24" fill="#2B2417" />
      </svg>
      <div className="absolute top-33 left-1/2 w-62p -translate-x-1/2 rounded-md bg-sand px-4 py-3 text-center shadow-sm">
        <p className="text-10 font-bold text-ink">
          BUSAMAKIP - Harmoni Ramadhan
        </p>
        <p className="mt-1 text-7 text-body-muted">
          Aula Bung Hatta | Jumat, 6 Maret 2026
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-8 flex justify-center gap-16">
        {["#D98A5B", "#1E6E5E", "#1F2937", "#F6D34A"].map((color) => (
          <span key={color} className="flex flex-col items-center">
            <span className="size-2 rounded-full bg-tan" />
            <span
              className="mt-0.5 h-6 w-4 rounded-t-full"
              style={{ backgroundColor: color }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

function GelarKipkStage() {
  // Deliberate hand-built illustration: an exception to the placehold-image sweep.
  return (
    <div className="relative flex h-75 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-gold-soft via-gold-soft-strong to-wheat">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(#D4D0C0 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="relative flex h-47.5 w-78p items-center gap-6 rounded-2xl bg-navy px-8 shadow-lg">
        <div className="relative size-20 shrink-0 rounded-full border-10 border-gold" />
        <div className="flex-1 rounded-lg bg-white p-4">
          <p className="text-11 font-bold text-ink">Gelar KIPK</p>
          <p className="mt-2 text-8 text-body-muted">Fotografi &amp; Canva</p>
          <p className="mt-1 text-8 text-body-muted">AI untuk kreativitas</p>
        </div>
      </div>
    </div>
  );
}

/** Placeholder media tile plus date pill, title and paragraph copy. */
export function NewsMediaOnlyCard({ post }: { post: NewsPost }) {
  return (
    <article
      data-testid="news-media-only-card"
      className="grid grid-cols-1 gap-8 border-b border-border-sand pb-10 lg:cols-580 lg:gap-12"
    >
      {post.slug === "gelar-kipk" ? <GelarKipkStage /> : <BusamakipStage />}
      <div className="space-y-4">
        {post.uploadedLabel ? (
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-gold-soft px-3 py-1.5 text-xs font-semibold text-gold-ink">
              Diupload pada: {post.uploadedLabel}
            </span>
          </div>
        ) : null}
        <h3 className="text-28 leading-9 font-bold tracking-tight text-ink">
          {post.title}
        </h3>
        <div className="space-y-4">
          {post.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-22 text-body">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
