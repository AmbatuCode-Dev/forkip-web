import type { PageHeroContent, PdfFile, ProgramKerjaItem } from "../types";

export const programKerjaHero: PageHeroContent = {
  breadcrumbLabel: "Program Kerja",
  title: "Program Kerja Forkip UNJ 2026",
  description:
    "Disusun berdasarkan AD/ART FORUM KIP-K UNIVERSITAS NEGERI JAKARTA",
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
    body: "Pada tanggal 12 Februari 2026, Explore KIPK 2026 merupakan program sosialisasi yang diselenggarakan oleh FORUM KIP-K UNJ sebagai bentuk komitmen dalam memperluas akses informasi mengenai Program Kartu Indonesia Pintar Kuliah (KIP-K). Kegiatan ini menghadirkan perwakilan mahasiswa dari berbagai sekolah di wilayah Jakarta dan sekitarnya untuk mendapatkan pemahaman yang komprehensif terkait KIP-K.",
    hasArchive: true,
  },
  {
    title: "BUSAMAKIP",
    photoLabel: "BUSAMAKIP",
    photoVariant: 2,
    hasArchive: true,
  },
  {
    title: "Verif Akademik SNBP",
    photoLabel: "Verif Akademik SNBP",
    photoVariant: 3,
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
