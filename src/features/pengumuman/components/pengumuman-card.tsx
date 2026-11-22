import { NewsMediaPlaceholder } from "@/components/berita/news-media-placeholder";
import { buttonVariants } from "@/components/ui/button";
import type { Pengumuman } from "../types";

/**
 * Announcement card (spec /pengumuman): white, border-sand, r16, with the
 * "Foto pengumuman" gradient tile on top, a gold tag pill, H2 title, body
 * copy, optional offline-verification detail rows, closing lines, an
 * optional gold-tint note, and the narahubung / document action buttons.
 */
export function PengumumanCard({
  pengumuman,
  variant = 1,
}: {
  readonly pengumuman: Pengumuman;
  readonly variant?: 1 | 2 | 3;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border-sand bg-white">
      <NewsMediaPlaceholder
        label={pengumuman.photoLabel}
        variant={variant}
        width={640}
        height={260}
        className="h-65 w-full rounded-none"
      />
      <div className="flex flex-col gap-4 p-6 sm:p-8">
        <span className="inline-flex self-start rounded-full bg-gold-pale px-3 py-1.5 text-xs font-semibold text-gold-ink">
          {pengumuman.tag}
        </span>
        <h2 className="text-32 leading-10 font-bold text-ink">
          {pengumuman.title}
        </h2>

        {pengumuman.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-15 leading-6 text-body">
            {paragraph}
          </p>
        ))}

        {pengumuman.detailIntro ? (
          <p className="text-15 leading-6 text-body">
            {pengumuman.detailIntro}
          </p>
        ) : null}
        {pengumuman.details ? (
          <dl className="flex flex-col gap-1.5">
            {pengumuman.details.map((row) => (
              <div key={row.label} className="flex gap-2 text-15 leading-6">
                <dt className="shrink-0 font-semibold text-ink">
                  {row.label}:
                </dt>
                <dd className="text-body">{row.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {pengumuman.lines?.map((line) => (
          <p key={line} className="text-15 leading-6 text-body">
            {line}
          </p>
        ))}

        {pengumuman.note ? (
          <p className="rounded-xl bg-gold-pale px-4 py-3 text-15 leading-6 text-ink-soft">
            {pengumuman.note}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-3 pt-1">
          {pengumuman.buttons.map((button) => (
            <a
              key={button.label}
              href={button.href}
              className={buttonVariants({
                variant: button.variant,
                size: "cta",
              })}
            >
              {button.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
