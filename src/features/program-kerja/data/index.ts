import type { PageHeroContent, PdfFile, ProgramKerjaItem } from "../types";

export const programKerjaHero: PageHeroContent = {
  breadcrumbLabel: "Program Kerja",
  title: "Program Kerja Forkip UNJ 2026",
  description:
    "Program kerja 2026 disusun berdasarkan Anggaran Dasar dan Anggaran Rumah Tangga (AD/ART) Forum KIP-K Universitas Negeri Jakarta.",
};

export const adArtFile: PdfFile = {
  badge: "PDF",
  name: "AD ART FORUM KIP-KULIAH UNJ.pdf",
  href: "#", // TODO: link to the real AD/ART PDF once uploaded.
};

// TODO: link to the real archive/report documents once available.
export const programKerjaLinks = {
  archiveHref: "#",
  reportHref: "#",
};

export const programKerjaItems: readonly ProgramKerjaItem[] = [
  {
    title: "Explore KIP-Kuliah",
    photoLabel: "Explore KIP-Kuliah",
    photoVariant: 1,
    body: "FORKIP UNJ mengadakan sosialisasi KIP Kuliah pada 12 Februari 2026 bagi peserta dari sekolah di Jakarta dan sekitarnya. Kegiatan ini membantu calon mahasiswa memahami pendaftaran, persyaratan, dan tahapan seleksi KIP Kuliah.",
    hasArchive: true,
  },
  {
    title: "BUSAMAKIP",
    photoLabel: "BUSAMAKIP",
    photoVariant: 2,
    body: "FORKIP UNJ mengadakan buka puasa bersama pada 5 Maret 2026 di Aula Bung Hatta, Gedung Pascasarjana UNJ, untuk mempererat silaturahmi mahasiswa penerima KIP Kuliah.",
    hasArchive: true,
  },
  {
    title: "Verif Akademik SNBP",
    photoLabel: "Verif Akademik SNBP",
    photoVariant: 3,
    body: "Pada 6–10 April 2026, Pengelola KIP Kuliah UNJ memeriksa kesesuaian data dan kelengkapan berkas calon penerima KIP Kuliah jalur SNBP.",
    hasArchive: true,
  },
  {
    title: "Verif Akademik SNBT",
    photoLabel: "Verif Akademik SNBT",
    photoVariant: 1,
    hasArchive: false,
  },
  {
    title: "Sosialisasi KIPK",
    photoLabel: "Sosialisasi KIPK",
    photoVariant: 2,
    hasArchive: false,
  },
];
