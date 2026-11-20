import type { FacultyContact, PageHeroContent } from "../types";

export const pertanyaanPengaduanHero: PageHeroContent = {
  breadcrumbLabel: "Pertanyaan & Pengaduan",
  title: "Pertanyaan & Pengaduan",
  description:
    "Halaman ini disediakan sebagai sarana bagi mahasiswa KIP-K UNJ untuk menyampaikan pertanyaan, pengaduan, keluhan, maupun aspirasi secara tertulis. Setiap laporan yang masuk akan ditindaklanjuti sesuai ketentuan yang berlaku.",
};

export const fakultasKontakLabel =
  "Pilih delegasi fakultas Anda untuk menghubungi KIF:";

export const kifNote =
  "Laporan akan ditindaklanjuti oleh Delegasi Fakultas dari Divisi KIF (Koordinator Integrasi Fakultas) Forkip UNJ.";

/**
 * Faculty WhatsApp delegation tiles, ordered as in the reference frame
 * (224:1120). Colors follow the faculty tile palette; the shared grid
 * renders placeholder "#" hrefs (TODO: real WhatsApp deep links).
 */
export const fakultasKontak: readonly FacultyContact[] = [
  { code: "FIP", color: "#84BC24" },
  { code: "FBS", color: "#00A898" },
  { code: "FMIPA", color: "#7A1A7A" },
  { code: "FISH", color: "#D40D12" },
  { code: "FT", color: "#005088" },
  { code: "FPsi", color: "#00A4E4" },
  { code: "FEB", color: "#B25A14" },
  { code: "FIKK", color: "#0F766E", outline: true },
];
