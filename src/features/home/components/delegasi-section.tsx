import { DelegasiScrolly } from "./delegasi-scrolly";

/** Delegasi Fakultas (spec §2): the single title lives in the pinned stage. */
export function DelegasiSection() {
  return (
    <section className="bg-gradient-to-b from-gold-soft/70 to-gold-soft-strong/70">
      <DelegasiScrolly />
    </section>
  );
}
