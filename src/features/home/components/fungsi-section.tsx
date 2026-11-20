import { fungsiItems, fungsiSection } from "../data";

/**
 * Fungsi dan Tujuan (spec §3): numbered list left, YouTube embed right.
 * 16:9 responsive wrapper keeps the iframe from collapsing before load.
 */
export function FungsiSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto w-full max-w-300 px-4 sm:px-6 xl:px-0">
        <div className="grid items-center gap-12 lg:cols-hero-b">
          <div>
            <h2 className="text-34 leading-11 font-extrabold tracking-t08 text-ink sm:text-42 sm:leading-50">
              {fungsiSection.title}
            </h2>
            <p className="mt-3 text-base leading-6 text-body-muted">
              {fungsiSection.subtitle}
            </p>
            <ol className="mt-8 flex flex-col gap-6">
              {fungsiItems.map((item, index) => (
                <li key={item.text} className="flex items-start gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gold-soft text-15 font-bold text-gold-ink">
                    {index + 1}
                  </span>
                  <p className="text-15 leading-6 text-body">{item.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="w-full overflow-hidden rounded-2xl border border-border-sand bg-gold-soft shadow-xs">
            <div className="relative aspect-video w-full">
              <iframe
                src="https://www.youtube-nocookie.com/embed/G338TUmvp1Q"
                title={fungsiSection.videoLabel}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 size-full"
              />
            </div>
            <p className="py-3 text-center text-sm font-semibold text-gold-ink">
              {fungsiSection.videoLabel}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
