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
        className="absolute left-1/2 top-0 size-2 -translate-x-1/2 rounded-full bg-tan"
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
    <div className="relative flex h-47 items-center justify-center overflow-hidden rounded-xl bg-surface-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(#D4D0C0 1px, transparent 1px), repeating-linear-gradient(45deg, transparent 0 22px, rgba(212,208,192,0.35) 22px 23px)",
          backgroundSize: "22px 22px, 44px 44px",
        }}
      />
      <div className="relative w-86p rounded-lg border border-sand-line bg-white px-4 py-3 shadow-card-sm">
        {isExplore ? (
          <>
            <p className="rounded bg-teal-ink px-3 py-1.5 text-9 font-bold tracking-wide text-white">
              EXPLORE KIPK 2026
            </p>
            <p className="mt-2 text-6 leading-3 text-gold-ink">
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
            <p className="text-9 font-bold tracking-wide text-teal-ink">
              PEMBEKALAN STAFF KIF 2026
            </p>
            <div className="mt-3 flex gap-3">
              <div className="h-12 flex-1 rounded bg-olive" />
              <div className="h-12 flex-1 rounded bg-teal-pale" />
            </div>
            <div className="mt-1 flex items-end justify-center gap-10">
              <Person color="#1E6E5E" />
              <Person color="#1F2937" />
              <Person color="#F6D34A" />
            </div>
          </>
        ) : (
          <>
            <p className="text-10 font-bold text-teal-ink">{post.title}</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((n) => (
                <div
                  key={n}
                  className={`h-10 rounded ${
                    n === selected % 3 ? "bg-olive" : "bg-teal-pale"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-6 h-2 bg-gradient-to-r from-clay via-clay to-stone opacity-80"
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
    <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-surface-100 p-2">
      <div
        className={`w-4/5 rounded-sm ${green ? "h-2 bg-teal-ink" : "h-1.5 border border-teal-ink"}`}
      />
      <div className="mt-1 flex w-4/5 gap-1">
        <div
          className={`h-6 flex-1 rounded-sm border border-sand-line bg-white ${selected === 0 ? "ring-1 ring-gold" : ""}`}
        />
        <div className="h-6 flex-1 rounded-sm bg-olive" />
      </div>
      <div className="mt-1 flex gap-2">
        <span className="size-1.5 rounded-full bg-teal-ink" />
        <span className="size-1.5 rounded-full bg-slate" />
        <span className="size-1.5 rounded-full bg-gold" />
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
      ? "text-38 leading-12 font-extrabold tracking-tight text-ink"
      : "text-28 leading-9 font-extrabold tracking-tight text-ink";
  const thumbCount = Math.max(1, Math.min(4, post.photoCount));
  const gallery = post.gallery;
  const badge =
    gallery?.badge ?? `01 / ${String(thumbCount).padStart(2, "0")} · Foto`;

  return (
    <article
      data-testid={`news-card-${post.slug}`}
      className="grid grid-cols-1 gap-8 border-b border-border-sand pb-10 lg:cols-580 lg:gap-12"
    >
      <div className="space-y-3">
        <div className="relative rounded-2xl border border-border-sand bg-surface-100 p-3">
          <StageIllustration post={post} selected={selected} />
          <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-slate px-4 py-2 text-xs font-bold text-white shadow-sm">
            {badge}
          </span>
          <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 shadow-card-up">
            <span className="truncate text-13 leading-18 font-semibold text-ink">
              {gallery?.caption ?? post.title}
            </span>
            <span className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                aria-label="Foto sebelumnya"
                onClick={() =>
                  setSelected((value) => (value - 1 + thumbCount) % thumbCount)
                }
                className="inline-flex size-8 items-center justify-center rounded-full border border-border-sand bg-white text-body hover:bg-gold-soft"
              >
                <span aria-hidden="true">‹</span>
              </button>
              <button
                type="button"
                aria-label="Foto berikutnya"
                onClick={() => setSelected((value) => (value + 1) % thumbCount)}
                className="inline-flex size-8 items-center justify-center rounded-full bg-gold text-ink hover:bg-gold-dark"
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
              className={`h-16 flex-1 overflow-hidden rounded-lg border border-border-sand transition-shadow ${
                selected === thumbnail.position
                  ? "ring-2 ring-gold ring-offset-2 ring-offset-white"
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
          <span className="inline-flex items-center rounded-full bg-gold-soft px-3 py-1.5 text-xs font-bold text-gold-ink">
            Diupload pada: {post.uploadedLabel}
          </span>
          <span className="inline-flex items-center rounded-full border border-border-sand bg-white px-3 py-1.5 text-xs font-semibold text-body">
            {post.photoCount} Foto
          </span>
        </div>
        <h3 className={titleClass}>{post.title}</h3>
        <div className="space-y-4">
          {post.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-15 leading-6 text-body">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
