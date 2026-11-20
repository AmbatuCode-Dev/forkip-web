import type { NonProgramItem, PageHeroContent, PdfFile } from "../types";

export const nonProgramHero: PageHeroContent = {
  breadcrumbLabel: "Non Program Kerja",
  title: "Non Program Kerja Forkip UNJ 2026",
  description:
    "Disusun berdasarkan AD/ART FORUM KIP-K UNIVERSITAS NEGERI JAKARTA",
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
    body: "Pelatihan Divisi KIF (Koordinator Integrasi Fakultas) FORUM KIP-K UNJ 2026, merupakan agenda persiapan yang diselenggarakan untuk membekali Staff KIF dengan pemahaman yang komprehensif mengenai peran, fungsi, serta tanggung jawabnya dalam struktur organisasi FORKIP UNJ.",
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
