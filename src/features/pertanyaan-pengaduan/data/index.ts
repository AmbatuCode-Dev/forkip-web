import type {
  FacultyContact,
  KontakDelegasiRail,
  PageHeroContent,
} from "../types";

export const pertanyaanPengaduanHero: PageHeroContent = {
  breadcrumbLabel: "Pertanyaan & Pengaduan",
  title: "Pertanyaan & Pengaduan",
  description:
    "Halaman ini disediakan sebagai sarana bagi mahasiswa KIP-K UNJ untuk menyampaikan pertanyaan, pengaduan, keluhan, maupun aspirasi secara tertulis. Setiap laporan yang masuk akan ditindaklanjuti sesuai ketentuan yang berlaku.",
};

export const kontakRail: KontakDelegasiRail = {
  eyebrow: "KONTAK DELEGASI FAKULTAS",
  heading: "Hubungi delegasi fakultasmu.",
  caption:
    "Sampaikan pertanyaan, pengaduan, keluhan, atau aspirasi lewat WhatsApp. Sertakan nama, fakultas, dan angkatan agar mudah ditindaklanjuti.",
};

export const kifNote =
  "Laporan akan ditindaklanjuti oleh Delegasi Fakultas dari Divisi KIF (Koordinator Integrasi Fakultas) Forkip UNJ.";

/**
 * Faculty WhatsApp delegation rows, ordered as in the redesign frame
 * (422:681). Colors follow the faculty tile palette; the view renders
 * placeholder "#" hrefs (TODO: real WhatsApp deep links).
 */
export const fakultasKontak: readonly FacultyContact[] = [
  {
    code: "FMIPA",
    fullName: "Fakultas Matematika dan Ilmu Pengetahuan Alam",
    color: "#7A1A7A",
  },
  { code: "FT", fullName: "Fakultas Teknik", color: "#005088" },
  { code: "FBS", fullName: "Fakultas Bahasa dan Seni", color: "#00A898" },
  { code: "FPsi", fullName: "Fakultas Psikologi", color: "#00A4E4" },
  {
    code: "FISH",
    fullName: "Fakultas Ilmu Sosial dan Hukum",
    color: "#D40D12",
  },
  { code: "FEB", fullName: "Fakultas Ekonomi dan Bisnis", color: "#B25A14" },
  {
    code: "FIKK",
    fullName: "Fakultas Ilmu Keolahragaan dan Kesehatan",
    color: "#0F766E",
    outline: true,
  },
  { code: "FIP", fullName: "Fakultas Ilmu Pendidikan", color: "#84BC24" },
];
