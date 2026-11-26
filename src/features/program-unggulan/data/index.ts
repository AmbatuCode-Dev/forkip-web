import type { PageHeroContent, ProgramCard, ProgramSpotlight } from "../types";

/**
 * Indonesian copy verbatim from content-template-terisi.md section 2
 * (/program-unggulan). The spotlight paragraphs, bullets and closing are also
 * used on Beranda; they are duplicated here because features may not import
 * each other's data. An "Arsip Kegiatan" href of "#" means a public URL is not
 * yet available — callers hide the button with isActionableHref.
 */

export const programUnggulanHero: PageHeroContent = {
  breadcrumbLabel: "Program Unggulan",
  title: "Program Unggulan Forkip UNJ",
  subtitle:
    "Program unggulan FORKIP UNJ mendukung pengembangan akademik dan keterampilan mahasiswa penerima KIP Kuliah, sekaligus membuka ruang bagi mereka untuk berkontribusi melalui pengabdian kepada masyarakat.",
};

export const programLainTitle = "Program lain";

export const programSpotlight: ProgramSpotlight = {
  title: "Kampung KIP-K UNJ",
  paragraphs: [
    "Kampung KIP-K UNJ merupakan agenda tahunan Direktorat Kemahasiswaan dan Alumni UNJ bagi mahasiswa penerima KIP Kuliah. Selama tiga hari di Bumi Perkemahan Cibubur, peserta berlatih menghadapi tantangan, bekerja sama, dan membangun kemandirian.",
    "Rangkaian kegiatan mencakup latihan di alam terbuka, pembekalan akademik, pengembangan kepemimpinan, serta kegiatan olahraga dan seni.",
  ],
  bullets: [
    {
      label: "Resiliensi & Kemandirian",
      text: "Peserta berlatih beradaptasi di alam terbuka, antara lain dengan mendirikan tenda secara mandiri.",
    },
    {
      label: "Talk Show Akademik",
      text: "Para Wakil Dekan Bidang I di lingkungan UNJ berbagi strategi untuk merencanakan studi dan lulus tepat waktu.",
    },
    {
      label: "Kepemimpinan & Karakter",
      text: "Sesi bertema Lead The Future mengajak peserta mengembangkan kemampuan memimpin dan mengambil peran dalam perubahan.",
    },
    {
      label: "Solidaritas & Kreativitas",
      text: "Olahraga, kompetisi, dan pentas seni menjadi ruang bagi peserta untuk menjalin pertemanan dan menampilkan bakat.",
    },
  ],
  closing:
    "Pengalaman ini membantu mahasiswa membangun kesiapan akademik, ketangguhan, dan kemampuan bekerja sama selama menempuh pendidikan di UNJ.",
  cta: "Arsip Kegiatan",
  ctaHref: "https://www.instagram.com/p/DTHm46SEf_Q/",
  photoLabel: "Kampung KIP-K UNJ",
};

export const programCards: readonly ProgramCard[] = [
  {
    title: "Explore KIP-Kuliah",
    excerpt:
      "Explore KIP-Kuliah memperkenalkan program KIP Kuliah kepada siswa dari sekolah di Jabodetabek. Melalui sosialisasi dan sesi berbagi pengalaman dengan penerima KIP Kuliah, siswa mempelajari proses pendaftaran dan mendapat gambaran tentang kehidupan kampus di UNJ.",
    cta: "Arsip Kegiatan",
    ctaHref: "https://www.instagram.com/p/DUvI7WwEnAd/",
    photoLabel: "Explore KIP-Kuliah",
  },
  {
    title: "Indikasi",
    excerpt:
      "INDIKASI (Ikatan Dedikasi KIPK Mengabdi Sepenuh Hati) merupakan program pengabdian tahunan FORKIP UNJ. Pada 2025, mahasiswa penerima KIP Kuliah terlibat dalam sosialisasi warga, edukasi dan pendampingan, serta kegiatan sosial yang disesuaikan dengan kebutuhan masyarakat setempat.",
    cta: "Arsip Kegiatan",
    ctaHref: "https://www.instagram.com/p/DNz35_eYiIH/",
    photoLabel: "Indikasi",
  },
  {
    title: "Sosialisasi KIP-K Kuliah",
    excerpt:
      "Sosialisasi ini membantu calon mahasiswa mengenal program KIP Kuliah dan memahami informasi dasar terkait pendaftaran.",
    cta: "Arsip Kegiatan",
    ctaHref: "#", // TODO: real Sosialisasi KIP-K Kuliah archive URL.
    photoLabel: "Sosialisasi KIP-K Kuliah",
  },
];
