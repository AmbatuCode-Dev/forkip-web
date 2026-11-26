import type { NewsPost } from "../types";

/**
 * News posts, verbatim from content-template-terisi.md §3 and its developer
 * notes. BUSAMAKIP and Gelar KIPK have no official upload date yet, so their
 * uploadedLabel is omitted rather than showing a placeholder.
 */
export const newsPosts: readonly NewsPost[] = [
  {
    slug: "explore-kipk-2026",
    title: "Explore KIPK 2026",
    uploadedLabel: "18 Februari 2026",
    photoCount: 1,
    page: 1,
    gallery: {
      caption: "Dokumentasi sosialisasi Explore KIPK 2026.",
    },
    paragraphs: [
      "Pada 12 Februari 2026, FORKIP UNJ menyelenggarakan Explore KIPK 2026 untuk memperkenalkan program Kartu Indonesia Pintar Kuliah (KIP-K) kepada peserta dari berbagai sekolah di Jakarta dan sekitarnya.",
      "Peserta mendapat penjelasan mengenai cara mendaftar, persyaratan, tahapan seleksi, dan manfaat program. Mereka juga berkesempatan berdiskusi dan mengajukan pertanyaan langsung.",
      "Melalui kegiatan ini, FORKIP UNJ membantu calon mahasiswa memahami jalur yang dapat mereka tempuh untuk melanjutkan studi dengan dukungan KIP Kuliah.",
    ],
  },
  {
    slug: "pelatihan-divisi-kif",
    title: "Pelatihan Divisi KIF",
    uploadedLabel: "22 Februari 2026",
    photoCount: 4,
    page: 1,
    gallery: {
      caption: "Dokumentasi Pelatihan Divisi KIF 2026.",
    },
    paragraphs: [
      "FORKIP UNJ mengadakan Pelatihan Divisi KIF pada 21 Februari 2026. Kegiatan ini membekali staf dengan pemahaman tentang tugas Koordinator Integrasi Fakultas dan perannya dalam kepengurusan forum.",
      "Peserta mempelajari cara menyampaikan informasi kepada mahasiswa di tiap fakultas, menghimpun aspirasi, serta meneruskan pertanyaan atau kendala sesuai alur koordinasi FORKIP UNJ.",
    ],
  },
  {
    slug: "busamakip",
    title: "BUSAMAKIP",
    photoCount: 3,
    page: 1,
    gallery: {
      caption: "Dokumentasi buka puasa bersama mahasiswa KIP Kuliah UNJ.",
    },
    paragraphs: [
      "Pada 5 Maret 2026, FORKIP UNJ menggelar BUSAMAKIP, kegiatan buka puasa bersama mahasiswa penerima KIP Kuliah. Acara berlangsung di Aula Bung Hatta, lantai 2 Gedung Pascasarjana UNJ.",
      "Kegiatan bertema kebersamaan di bulan Ramadan ini menjadi kesempatan bagi mahasiswa penerima KIP Kuliah untuk bersilaturahmi dan mempererat hubungan antarmahasiswa di lingkungan UNJ.",
    ],
  },
  {
    slug: "verifikasi-kipk-snbp",
    title: "Verifikasi KIPK SNBP",
    uploadedLabel: "8 April 2026",
    photoCount: 4,
    page: 2,
    gallery: {
      caption: "Dokumentasi verifikasi berkas KIP Kuliah jalur SNBP 2026.",
    },
    paragraphs: [
      "Pengelola KIP Kuliah UNJ melaksanakan verifikasi berkas calon penerima KIP Kuliah jalur Seleksi Nasional Berdasarkan Prestasi (SNBP) pada 6–10 April 2026. Verifikasi berlangsung di Aula Latief Hendraningrat, Gedung Dewi Sartika, Kampus A UNJ.",
      "Tim verifikator memeriksa kesesuaian data dan kelengkapan dokumen pendukung calon mahasiswa. Setelah proses verifikasi selesai, Pengelola KIP Kuliah UNJ merilis hasilnya melalui halaman Pengumuman.",
    ],
  },
  {
    slug: "gelar-kipk",
    title: "Gelar KIPK",
    photoCount: 4,
    page: 2,
    gallery: {
      caption: "Dokumentasi Gelar KIPK 2026.",
    },
    paragraphs: [
      "Pada 4 April 2026, FORKIP UNJ menyelenggarakan Gelar KIPK sebagai ruang bagi mahasiswa untuk mengembangkan keterampilan kreatif dan digital. Sesi berbagi membahas fotografi digital, desain dengan Canva, dan pemanfaatan kecerdasan buatan (AI).",
      "Peserta mempraktikkan materi selama kegiatan. Melalui latihan ini, mahasiswa dapat menerapkan pengetahuan yang diperoleh dalam kegiatan kreatif mereka.",
    ],
  },
];

export function getNewsPage(page: number): readonly NewsPost[] {
  return newsPosts.filter((post) => post.page === page);
}

/** Highest page number across posts; pages are explicit in the data. */
export const totalNewsPages = Math.max(
  1,
  ...newsPosts.map((post) => post.page),
);
