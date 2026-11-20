import type { NewsPost } from "../types";

/**
 * Media-only news card (BUSAMAKIP / Gelar KIPK): the Figma reference uses
 * a dark, warmly lit illustration tile instead of a photo carousel. Built
 * from CSS + SVG so no external image asset is required.
 */
function BusamakipStage() {
  return (
    <div className="relative h-[300px] overflow-hidden rounded-2xl bg-[radial-gradient(ellipse_at_50%_35%,#6D5A2C_0%,#3B2E13_52%,#1D1709_100%)]">
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
      <div className="absolute left-1/2 top-[132px] w-[62%] -translate-x-1/2 rounded-md bg-[#F3F0E7] px-4 py-3 text-center shadow-sm">
        <p className="text-[10px] font-bold text-[#1C1C1C]">
          BUSAMAKIP - Harmoni Ramadhan
        </p>
        <p className="mt-1 text-[7px] text-[#666666]">
          Aula Bung Hatta | Jumat, 6 Maret 2026
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-8 flex justify-center gap-16">
        {["#D98A5B", "#1E6E5E", "#1F2937", "#F6D34A"].map((color) => (
          <span key={color} className="flex flex-col items-center">
            <span className="size-2 rounded-full bg-[#E8C4A0]" />
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
  return (
    <div className="relative flex h-[300px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#FBF6DF] via-[#F6EFAF] to-[#E8D9A0]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(#D4D0C0 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="relative flex h-[190px] w-[78%] items-center gap-6 rounded-2xl bg-[#122338] px-8 shadow-lg">
        <div className="relative size-20 shrink-0 rounded-full border-[10px] border-[#F6D34A]" />
        <div className="flex-1 rounded-lg bg-white p-4">
          <p className="text-[11px] font-bold text-[#1C1C1C]">Gelar KIPK</p>
          <p className="mt-2 text-[8px] text-[#666666]">
            Fotografi &amp; Canva
          </p>
          <p className="mt-1 text-[8px] text-[#666666]">AI untuk kreativitas</p>
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
      className="grid grid-cols-1 gap-8 border-b border-[#E8E5DA] pb-10 lg:grid-cols-[minmax(0,580px)_1fr] lg:gap-12"
    >
      {post.slug === "gelar-kipk" ? <GelarKipkStage /> : <BusamakipStage />}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-[#FBF6DF] px-3 py-1.5 text-xs font-semibold text-[#7A5B00]">
            Diupload pada: {post.uploadedLabel}
          </span>
        </div>
        <h3 className="text-[28px] leading-[36px] font-bold tracking-tight text-[#1C1C1C]">
          {post.title}
        </h3>
        <div className="space-y-4">
          {post.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-sm leading-[22px] text-[#404040]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
