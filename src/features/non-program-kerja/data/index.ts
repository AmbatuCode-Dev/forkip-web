import type { NonProgramItem, PageHeroContent, PdfFile } from "../types";

export const nonProgramHero: PageHeroContent = {
  breadcrumbLabel: "Non Program Kerja",
  title: "Non Program Kerja Forkip UNJ 2026",
  description:
    "Daftar kegiatan di luar program kerja 2026 disusun berdasarkan Anggaran Dasar dan Anggaran Rumah Tangga (AD/ART) Forum KIP-K Universitas Negeri Jakarta.",
};

export const adArtFile: PdfFile = {
  badge: "PDF",
  name: "AD ART FORUM KIP-KULIAH UNJ.pdf",
  href: "#", // TODO: link to the real AD/ART PDF once uploaded.
};

// TODO: link to the real archive/report documents once available.
export const nonProgramLinks = {
  archiveHref: "#",
  reportHref: "#",
};

export const nonProgramItems: readonly NonProgramItem[] = [
  {
    title: "Pelatihan Anggota KIF",
    photoLabel: "Pelatihan Anggota KIF",
    photoVariant: 1,
    body: "Pelatihan ini membekali staf KIF dengan pemahaman tentang tanggung jawab mereka sebagai penghubung informasi di tingkat fakultas. Peserta mempelajari alur koordinasi untuk menyampaikan informasi, menghimpun aspirasi, dan menindaklanjuti kendala mahasiswa.",
  },
  {
    title: "KANTIN (Kumpul Rutin)",
    photoLabel: "KANTIN (Kumpul Rutin)",
    photoVariant: 2,
  },
  {
    title: "Diskusi Birokrat",
    photoLabel: "Diskusi Birokrat",
    photoVariant: 3,
  },
];
