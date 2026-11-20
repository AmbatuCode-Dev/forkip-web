import type { PageHeroContent, ProgramCard, ProgramSpotlight } from "../types";

/**
 * Indonesian copy verbatim from docs/figma-specs/missing-pages-spec.md
 * (/program-unggulan, frame 224:2142). The spotlight paragraphs, bullets and
 * closing mirror the Beranda program-section copy (home feature data); they
 * are duplicated here because features may not import each other's data.
 * "Arsip Kegiatan" hrefs are placeholders (TODO: real activity-archive URLs).
 */

export const programUnggulanHero: PageHeroContent = {
  breadcrumbLabel: "Program Unggulan",
  title: "Program Unggulan Forkip UNJ",
  subtitle:
    "Program Unggulan merupakan rangkaian inisiatif strategis yang dirancang untuk mengoptimalkan potensi mahasiswa penerima KIP Kuliah. Mencakup berbagai bidang, mulai dari pengembangan akademik, peningkatan soft skills, hingga aksi pengabdian masyarakat, guna mencetak generasi yang cerdas, kreatif, dan kontributif bagi universitas maupun bangsa.",
};

export const programLainTitle = "Program lain";

export const programSpotlight: ProgramSpotlight = {
  title: "Kampung KIP-K UNJ",
  paragraphs: [
    "Kampung KIP-K UNJ adalah agenda tahunan strategis yang diselenggarakan oleh Direktorat Kemahasiswaan dan Alumni UNJ sebagai kawah candradimuka bagi para awardee KIP Kuliah. Berlokasi di Bumi Perkemahan (Buperta) Cibubur, kegiatan ini mengusung misi utama untuk menumbuhkan resiliensi atau ketahanmalangan sebagai soft skill krusial dalam menyelesaikan studi dan menghadapi tantangan dunia kerja.",
    "Selama tiga hari, sebanyak ribuan peserta ditempa melalui serangkaian kegiatan intensif yang dirancang untuk membangun kemandirian dan soliditas, antara lain:",
  ],
  bullets: [
    {
      label: "Resiliensi & Kemandirian",
      text: "Simulasi bertahan hidup di alam terbuka dengan membangun tenda secara mandiri, melatih daya juang dan kemampuan beradaptasi dalam keterbatasan.",
    },
    {
      label: "Talk Show Akademik",
      text: "Pembekalan materi khusus dari para Wakil Dekan Bidang I se-lingkungan UNJ mengenai strategi sukses lulus tepat waktu dan tips navigasi akademik.",
    },
    {
      label: "Kepemimpinan & Karakter",
      text: "Sesi motivasi untuk menanamkan jiwa kepemimpinan sesuai tema “Lead The Future”, guna mencetak pemimpin perubahan di masa depan.",
    },
    {
      label: "Solidaritas & Kreativitas",
      text: "Mempererat silaturahmi melalui kegiatan olahraga, kompetisi antar peserta, dan malam pentas seni sebagai ruang ekspresi bakat mahasiswa.",
    },
  ],
  closing:
    "Melalui Kampung KIP-K, kami berkomitmen memastikan bahwa mahasiswa penerima beasiswa tidak hanya unggul secara akademis, tetapi juga memiliki mentalitas tangguh, karakter yang kuat, dan optimisme tinggi dalam menempuh perjalanan akademik di Universitas Negeri Jakarta.",
  cta: "Arsip Kegiatan",
  ctaHref: "#", // TODO: real Kampung KIP-K activity-archive URL.
  photoLabel: "Kampung KIP-K UNJ",
};

export const programCards: readonly ProgramCard[] = [
  {
    title: "Explore KIPK UNJ: Jembatan Informasi Menuju Pendidikan Tinggi",
    excerpt:
      "Explore KIPK 2026 adalah program sosialisasi strategis yang diselenggarakan oleh FORUM KIP-K UNJ sebagai manifestasi dedikasi…",
    cta: "Arsip Kegiatan",
    ctaHref: "#", // TODO: real Explore KIPK activity-archive URL.
    photoLabel: "Explore KIPK",
  },
  {
    title: "INDIKASI: Ikatan Dedikasi KIPK Mengabdi Sepenuh Hati",
    excerpt:
      "INDIKASI merupakan agenda tahunan unggulan Forum KIP-K UNJ yang menjadi wujud nyata kepedulian sosial mahasiswa penerima KIP Kuliah…",
    cta: "Arsip Kegiatan",
    ctaHref: "#", // TODO: real INDIKASI activity-archive URL.
    photoLabel: "INDIKASI",
  },
  {
    title: "KIP-K UNJ: Informasi Beasiswa Kampus",
    excerpt:
      "Forum KIP-K UNJ menyediakan informasi dan pendampingan bagi calon mahasiswa penerima KIP Kuliah di Universitas Negeri Jakarta.",
    cta: "Arsip Kegiatan",
    ctaHref: "#", // TODO: real KIP-K UNJ information/archive URL.
    photoLabel: "KIP-K UNJ",
  },
];
