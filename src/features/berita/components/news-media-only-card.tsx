import type { NewsPost } from "../types";

/**
 * BUSAMAKIP media-only card (spec §2): dark gradient tile with moon
 * illustration placeholder + date pill, then title + paragraphs — composed
 * with the same card pattern as NewsCard but without the photo strip.
 */
export function NewsMediaOnlyCard({ post }: { post: NewsPost }) {
  return (
    <article
      data-testid="news-media-only-card"
      className="grid grid-cols-1 gap-8 border-b border-[#E8E5DA] pb-10 lg:grid-cols-[minmax(0,420px)_1fr]"
    >
      <div className="relative flex h-[300px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#3D2E10] via-[#2B1F08] to-[#141004]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(rgba(246, 211, 74, 0.5) 1.5px, transparent 1.5px)",
            backgroundSize: "26px 26px",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute top-8 right-10 size-14 rounded-full bg-gradient-to-bl from-[#F6D34A] via-[#E0B400] to-[#8a6d00] shadow-[0_0_40px_rgba(246,211,74,0.45)]"
        />
        <span className="relative inline-flex items-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#1C1C1C] shadow-xs">
          {post.title} — media (placeholder)
        </span>
      </div>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-[#FBF6DF] px-3 py-1.5 text-xs font-semibold text-[#7A5B00]">
            Diupload pada: {post.uploadedLabel}
          </span>
        </div>
        <h3 className="text-2xl font-bold leading-8 tracking-tight text-[#1C1C1C]">
          {post.title}
        </h3>
        <div className="space-y-3">
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
