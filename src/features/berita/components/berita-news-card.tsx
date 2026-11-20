"use client";

import { useState } from "react";
import type { NewsPost } from "../types";

/** Small person pictograms used inside the media-stage illustrations. */
function Person({
  color,
  className,
}: {
  readonly color: string;
  readonly className?: string;
}) {
  return (
    <span className={`relative inline-block h-7 w-4 ${className ?? ""}`}>
      <span
        className="absolute left-1/2 top-0 size-2 -translate-x-1/2 rounded-full bg-[#E8C4A0]"
        aria-hidden="true"
      />
      <span
        className="absolute inset-x-0 bottom-0 h-5 rounded-t-full"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
    </span>
  );
}

/**
 * Presentation-board illustration from the Figma frame: a cream stage with
 * a faint geometric pattern, a white slide board, coloured presenters and
 * (for the first photo) a green title banner.
 */
function StageIllustration({
  post,
  selected,
}: {
  readonly post: NewsPost;
  readonly selected: number;
}) {
  const isExplore = post.slug === "explore-kipk-2026";
  const isPelatihan = post.slug === "pelatihan-divisi-kif";
  return (
    <div className="relative flex h-[188px] items-center justify-center overflow-hidden rounded-xl bg-[#F4F2EA]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(#D4D0C0 1px, transparent 1px), repeating-linear-gradient(45deg, transparent 0 22px, rgba(212,208,192,0.35) 22px 23px)",
          backgroundSize: "22px 22px, 44px 44px",
        }}
      />
      <div className="relative w-[86%] rounded-lg border border-[#D4D0C0] bg-white px-4 py-3 shadow-[0_2px_0_rgba(0,0,0,0.04)]">
        {isExplore ? (
          <>
            <p className="rounded bg-[#1E6E5E] px-3 py-1.5 text-[9px] font-bold tracking-wide text-white">
              EXPLORE KIPK 2026
            </p>
            <p className="mt-2 text-[6px] leading-3 text-[#7A5B00]">
              Sosialisasi Awal Penerima KIP-K | Universitas Negeri Jakarta
            </p>
            <div className="mt-4 flex items-end justify-center gap-8">
              <Person color="#1E6E5E" />
              <Person color="#1F2937" />
              <Person color="#F6D34A" />
            </div>
          </>
        ) : isPelatihan ? (
          <>
            <p className="text-[9px] font-bold tracking-wide text-[#1E6E5E]">
              PEMBEKALAN STAFF KIF 2026
            </p>
            <div className="mt-3 flex gap-3">
              <div className="h-12 flex-1 rounded bg-[#F6E6A8]" />
              <div className="h-12 flex-1 rounded bg-[#DCEEEA]" />
            </div>
            <div className="mt-1 flex items-end justify-center gap-10">
              <Person color="#1E6E5E" />
              <Person color="#1F2937" />
              <Person color="#F6D34A" />
            </div>
          </>
        ) : (
          <>
            <p className="text-[10px] font-bold text-[#1E6E5E]">{post.title}</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((n) => (
                <div
                  key={n}
                  className={`h-10 rounded ${
                    n === selected % 3 ? "bg-[#F6E6A8]" : "bg-[#DCEEEA]"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-6 h-2 bg-gradient-to-r from-[#C2705A] via-[#C2705A] to-[#9C9C8C] opacity-80"
      />
    </div>
  );
}

/** Reduced copy of the stage used inside the small thumbnail buttons. */
function ThumbnailIllustration({
  post,
  selected,
}: {
  readonly post: NewsPost;
  readonly selected: number;
}) {
  const green = post.slug === "explore-kipk-2026";
  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-[#F4F2EA] p-2">
      <div
        className={`w-4/5 rounded-sm ${green ? "h-2 bg-[#1E6E5E]" : "h-1.5 border border-[#1E6E5E]"}`}
      />
      <div className="mt-1 flex w-4/5 gap-1">
        <div
          className={`h-6 flex-1 rounded-sm border border-[#D4D0C0] bg-white ${selected === 0 ? "ring-1 ring-[#F6D34A]" : ""}`}
        />
        <div className="h-6 flex-1 rounded-sm bg-[#F6E6A8]" />
      </div>
      <div className="mt-1 flex gap-2">
        <span className="size-1.5 rounded-full bg-[#1E6E5E]" />
        <span className="size-1.5 rounded-full bg-[#1F2937]" />
        <span className="size-1.5 rounded-full bg-[#F6D34A]" />
      </div>
    </div>
  );
}

/**
 * Figma-faithful paginated news card: media carousel stage + thumbnail
 * strip on the left, date/photo pills, title and paragraphs on the right.
 * Feature-owned so the shared NewsCard primitive stays untouched.
 */
export function BeritaNewsCard({ post }: { readonly post: NewsPost }) {
  const [selected, setSelected] = useState(0);
  const titleClass =
    post.slug === "explore-kipk-2026"
      ? "text-[38px] leading-[48px] font-extrabold tracking-tight text-[#1C1C1C]"
      : "text-[28px] leading-[36px] font-extrabold tracking-tight text-[#1C1C1C]";
  const thumbCount = Math.max(1, Math.min(4, post.photoCount));
  const gallery = post.gallery;
  const badge =
    gallery?.badge ?? `01 / ${String(thumbCount).padStart(2, "0")} · Foto`;

  return (
    <article
      data-testid={`news-card-${post.slug}`}
      className="grid grid-cols-1 gap-8 border-b border-[#E8E5DA] pb-10 lg:grid-cols-[minmax(0,580px)_1fr] lg:gap-12"
    >
      <div className="space-y-3">
        <div className="relative rounded-2xl border border-[#E8E5DA] bg-[#F4F2EA] p-3">
          <StageIllustration post={post} selected={selected} />
          <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-[#1F2937] px-4 py-2 text-xs font-bold text-white shadow-sm">
            {badge}
          </span>
          <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 shadow-[0_-2px_6px_rgba(0,0,0,0.04)]">
            <span className="truncate text-[13px] leading-[18px] font-semibold text-[#1C1C1C]">
              {gallery?.caption ?? post.title}
            </span>
            <span className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                aria-label="Foto sebelumnya"
                onClick={() =>
                  setSelected((value) => (value - 1 + thumbCount) % thumbCount)
                }
                className="inline-flex size-8 items-center justify-center rounded-full border border-[#E8E5DA] bg-white text-[#404040] hover:bg-[#FBF6DF]"
              >
                <span aria-hidden="true">‹</span>
              </button>
              <button
                type="button"
                aria-label="Foto berikutnya"
                onClick={() => setSelected((value) => (value + 1) % thumbCount)}
                className="inline-flex size-8 items-center justify-center rounded-full bg-[#F6D34A] text-[#1C1C1C] hover:bg-[#E0B400]"
              >
                <span aria-hidden="true">›</span>
              </button>
            </span>
          </div>
        </div>
        <fieldset
          className="flex gap-3 border-0 p-0"
          aria-label={`Thumbnail foto ${post.title}`}
        >
          {Array.from({ length: thumbCount }, (_, index) => ({
            id: `foto-${index + 1}`,
            position: index,
          })).map((thumbnail) => (
            <button
              key={thumbnail.id}
              type="button"
              aria-label={`Lihat foto ${thumbnail.position + 1} dari ${thumbCount}`}
              aria-pressed={selected === thumbnail.position}
              onClick={() => setSelected(thumbnail.position)}
              className={`h-16 flex-1 overflow-hidden rounded-lg border border-[#E8E5DA] transition-shadow ${
                selected === thumbnail.position
                  ? "ring-2 ring-[#F6D34A] ring-offset-2 ring-offset-white"
                  : "opacity-90 hover:opacity-100"
              }`}
            >
              <ThumbnailIllustration
                post={post}
                selected={thumbnail.position}
              />
            </button>
          ))}
        </fieldset>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-[#FBF6DF] px-3 py-1.5 text-xs font-bold text-[#7A5B00]">
            Diupload pada: {post.uploadedLabel}
          </span>
          <span className="inline-flex items-center rounded-full border border-[#E8E5DA] bg-white px-3 py-1.5 text-xs font-semibold text-[#404040]">
            {post.photoCount} Foto
          </span>
        </div>
        <h3 className={titleClass}>{post.title}</h3>
        <div className="space-y-4">
          {post.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-[15px] leading-[24px] text-[#404040]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
