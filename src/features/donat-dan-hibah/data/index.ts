import type {
  FacultyContact,
  PageHeroContent,
  TransparansiHibah,
} from "../types";

export const donatDanHibahHero: PageHeroContent = {
  breadcrumbLabel: "Donat dan Hibah",
  title: "Peminjaman (DONAT)",
  description:
    "Dikelola oleh Divisi Advokasi dengan proses yang mudah dan cepat. (S&K berlaku)",
};

export const delegasiAdvoLabel =
  "Silakan klik tombol di bawah untuk menghubungi Delegasi Advo fakultasnya masing-masing:";

/**
 * Faculty WhatsApp delegation tiles, ordered as in the reference frame
 * (224:1216). Colors follow the faculty tile palette; the shared grid
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

export const transparansiHibah: TransparansiHibah = {
  title: "Transparansi dana hibah",
  note: "*Akses Terbatas",
  actionLabel: "Alokasi dana hibah",
};
