import type { SiteConfig } from "@/types";

export const siteConfig = {
  name: "Forum KIPK UNJ",
  description:
    "Forum KIPK UNJ merupakan sebuah wadah untuk mengurus berbagai hal yang berhubungan dengan mahasiswa penerima KIP-K di UNJ",
  nav: [
    { label: "Beranda", href: "/" },
    { label: "Pengumuman", href: "/pengumuman" },
    { label: "Program Unggulan", href: "/program-unggulan" },
    { label: "Pertanyaan & Pengaduan", href: "/pertanyaan-pengaduan" },
    { label: "Penyewaan Inventaris", href: "/penyewaan" },
    { label: "Donat dan Hibah", href: "/donat-dan-hibah" },
    { label: "Pengunduran Diri KIPK", href: "/pengunduran-diri" },
    { label: "Arsip Data Tiap Divisi", href: "/arsip-data" },
    { label: "Berita", href: "/berita" },
    { label: "Program Kerja", href: "/program-kerja" },
    { label: "Non Program Kerja", href: "/non-program-kerja" },
    { label: "Rekrutmen", href: "/rekrutmen" },
  ],
} satisfies SiteConfig;
