import type { AlurStep } from "../types";

/**
 * The 8 official flow steps (docs/figma-specs/pages/pengunduran-diri-spec.md
 * §2), copy taken from the reference frame form-pengunduran-diri.png.
 */
export const alurSteps: readonly AlurStep[] = [
  { step: 1, title: "Mahasiswa Penerima KIP-KULIAH", icon: "person" },
  {
    step: 2,
    title: 'Unduh surat pengunduran diri klik tombol "Unduh Surat" dibawah',
    icon: "download",
  },
  { step: 3, title: "Cetak surat yang sudah di unduh", icon: "printer" },
  {
    step: 4,
    title: "Isi formulir, beri materai, dan tanda tangan",
    icon: "form",
  },
  { step: 5, title: "Scan dan jadikan PDF", icon: "document" },
  { step: 6, title: "Lampirkan pdf ke link gform dibawah", icon: "upload" },
  {
    step: 7,
    title: 'Hubungi delegasi fakultas dengan klik tombol "Fakultas" dibawah',
    icon: "chat",
  },
  {
    step: 8,
    title:
      "Bawa dokumen asli ke Direktorat Kemahasiswaan (Jl. Kayu Jati IV No.35, Rawamangun, Pulo Gadung, Jakarta Timur)",
    icon: "building",
  },
];
