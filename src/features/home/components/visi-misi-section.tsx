import { misiItems, visiItems, visiMisiSection } from "../data";

/**
 * Visi dan Misi (spec §4): cream Visi card + white Misi card.
 */
export function VisiMisiSection() {
  return (
    <section className="bg-surface-50 py-24">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 xl:px-0">
        <h2 className="text-center text-[34px] leading-[44px] font-extrabold tracking-[-0.8px] text-ink sm:text-[42px] sm:leading-[50px]">
          {visiMisiSection.title}
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
          <div className="rounded-2xl bg-gradient-to-b from-[#FBF6DF] to-[#F6EFAF] p-8 sm:p-10">
            <h3 className="text-[30px] leading-[38px] font-bold text-ink sm:text-[38px] sm:leading-[48px]">
              Visi
            </h3>
            <ol className="mt-6 flex flex-col gap-6">
              {visiItems.map((item, index) => (
                <li key={item.text} className="flex items-start gap-4">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gold text-[13px] font-bold text-ink">
                    {index + 1}
                  </span>
                  <p className="text-[15px] leading-6 text-body">{item.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-border-sand bg-white p-8 shadow-xs sm:p-10">
            <h3 className="text-[30px] leading-[38px] font-bold text-ink sm:text-[38px] sm:leading-[48px]">
              Misi
            </h3>
            <ol className="mt-6 flex flex-col gap-5">
              {misiItems.map((item, index) => (
                <li key={item.text} className="flex items-start gap-4">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gold-soft text-[13px] font-bold text-gold-ink">
                    {index + 1}
                  </span>
                  <p className="text-[15px] leading-6 text-body">{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
