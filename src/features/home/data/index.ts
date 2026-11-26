import type {
  Division,
  Faculty,
  NewsFeature,
  NewsTeaser,
  NumberedItem,
  ProgramCard,
  ProgramSpotlight,
  Service,
} from "../types";

/**
 * All Indonesian copy verbatim from docs/figma-specs/pages/beranda-spec.md.
 * Long body copy transcribed from the Figma frame where the spec references a
 * text dump that is not in the repo — those entries carry a TODO comment.
 */

export const heroCopy = {
  titleLight: "Forum",
  titleBold: "KIPK UNJ",
  subtitle:
    "Merupakan sebuah wadah untuk mengurus berbagai hal yang berhubungan dengan mahasiswa penerima KIP-K di UNJ",
  cta: "Pertanyaan & Pengaduan",
  ctaHref: "/pertanyaan-pengaduan",
  videoLabelStrong: "Tonton Video",
  videoLabelMuted: "Forum KIPK UNJ",
} as const;

export const heroTrustLinks: readonly {
  readonly label: string;
  readonly href: string;
}[] = [
  {
    label: "linktr.ee/forumbidikmisiunj",
    href: "https://linktr.ee/forumbidikmisiunj",
  },
  {
    label: "Instagram @forkipunj.official",
    href: "https://www.instagram.com/forkipunj.official",
  },
];

export const faculties: readonly Faculty[] = [
  { code: "FIP" },
  { code: "FBS" },
  { code: "FMIPA" },
  { code: "FISH" },
  { code: "FT" },
  { code: "FPsi" },
  { code: "FEB" },
  { code: "FIKK" },
];

export const delegasiSection = {
  title: "Menaungi 8 fakultas di Universitas Negeri Jakarta",
  subtitle:
    "Laporan akan ditindaklanjuti oleh Delegasi Fakultas dari Divisi KIF (Koordinator Integrasi Fakultas) Forkip UNJ.",
} as const;

export const fungsiSection = {
  title: "Fungsi dan Tujuan",
  subtitle: "Forum KIP-K UNJ berfungsi sebagai:",
  videoLabel: "Video Forum KIPK UNJ",
} as const;

export const fungsiItems: readonly NumberedItem[] = [
  {
    text: "Penghubung komunikasi dan informasi antara WR I, pengelola KIPK dan mahasiswa penerima KIP-K UNJ.",
  },
  {
    text: "Sarana meningkatkan partisipasi mahasiswa penerima KIP-K UNJ dalam meraih prestasi baik di dalam maupun di luar kampus melalui kegiatan-kegiatan pembinaan.",
  },
  {
    text: "Sarana pengabdian diri mahasiswa penerima Bidikmisi dan KIP-K baik kepada sesama mahasiswa UNJ maupun masyarakat.",
  },
  {
    text: "Sarana kaderisasi mahasiswa penerima Bidikmisi dan KIP-K UNJ.",
  },
];

export const visiMisiSection = {
  title: "Visi dan Misi",
} as const;

export const visiItems: readonly NumberedItem[] = [
  {
    text: "Mengembangkan potensi dan sumber daya mahasiswa penerima KIP-K UNJ yang beriman dan bertakwa kepada Tuhan Yang Maha Esa, berjiwa Pancasila",
  },
  {
    text: "Menjunjung tinggi Tri Dharma Perguruan Tinggi",
  },
];

export const misiItems: readonly NumberedItem[] = [
  {
    text: "Menjalin hubungan dan komunikasi dengan civitas akademika baik internal maupun eksternal UNJ.",
  },
  {
    text: "Menghimpun data dan informasi yang terkait dengan mahasiswa penerima KIP-K UNJ.",
  },
  {
    text: "Mengembangkan potensi dan kreativitas mahasiswa penerima KIP-K UNJ baik akademik maupun non akademik.",
  },
  {
    text: "Menjalankan fungsi kaderisasi untuk keberlangsungan kepengurusan FORKIP UNJ.",
  },
  {
    text: "Menjalankan fungsi advokasi guna membantu mahasiswa UNJ dengan syarat dan ketentuan yang berlaku",
  },
];

export const layananSection = {
  title: "Layanan Forkip UNJ",
  subtitle:
    "Mengurus berbagai hal yang berhubungan dengan mahasiswa penerima KIP-K di UNJ.",
} as const;

export const services: readonly Service[] = [
  {
    division: "KIF",
    title: "Pertanyaan & Pengaduan",
    description:
      "Halaman ini disediakan sebagai sarana bagi mahasiswa KIP-K UNJ untuk menyampaikan pertanyaan, pengaduan, keluhan, maupun aspirasi secara tertulis.",
    href: "/pertanyaan-pengaduan",
    icon: "question",
  },
  {
    division: "BKK",
    title: "Penyewaan Inventaris",
    description:
      "Dikelola oleh BKK (Biro Kebendaharaan dan keuangan) dengan harga yang terjangkau.",
    href: "/penyewaan",
    icon: "rental",
  },
  {
    division: "Advokasi",
    title: "Peminjaman (DONAT)",
    description:
      "Dikelola oleh Divisi Advokasi dengan proses yang mudah dan cepat. (S&K berlaku)",
    href: "/donat-dan-hibah",
    icon: "wallet",
  },
  {
    division: "Pengumuman",
    title: "Hasil Verifikasi Berkas KIPK Jalur SNBP (Eligible)",
    description:
      'Pengelola KIPK UNJ resmi merilis daftar mahasiswa yang dinyatakan "LOLOS".',
    href: "/pengumuman",
    icon: "verification",
  },
  {
    division: "KIP",
    title: "Pengunduran Diri KIPK",
    description:
      "Dibantu oleh divisi KIF Forkip UNJ, kepada mahasiswa KIPK UNJ yang ingin mengundurkan diri diharap untuk membaca informasi di bawah.",
    href: "/pengunduran-diri",
    icon: "withdrawal",
  },
  {
    division: "Arsip",
    title: "Arsip Data Tiap Divisi",
    description:
      "Arsip data tiap divisi di Forum KIPK UNJ, untuk kelancaran administrasi khususnya arsip proposal, RAB, dan LPJ. (Akses file terbatas, S&K berlaku)",
    href: "/arsip-data",
    icon: "archive",
  },
];

export const divisiSection = {
  title: "Mengenal Divisi FORKIP UNJ",
  subtitle:
    "Forum KIP-Kuliah Universitas Negeri Jakarta (FORKIP UNJ) memiliki divisi yang bekerja sama untuk mendukung mahasiswa penerima KIP Kuliah dan berkontribusi kepada masyarakat.",
} as const;

export const divisions: readonly Division[] = [
  {
    chip: "BPHI",
    title: "BPHI - Badan Pengurus Harian Inti",
    defaultExpanded: true,
    body: "BPHI terdiri atas Ketua, Wakil Ketua, Sekretaris Umum, dan Bendahara Umum. BPHI menetapkan arah kebijakan organisasi, mengawasi kinerja divisi, serta mengoordinasikan administrasi dan keuangan selama satu periode kepengurusan.",
  },
  {
    chip: "PSDM",
    title: "PSDM - Pengembangan Sumber Daya Manusia",
    body: "PSDM mengelola kaderisasi FORKIP UNJ, mulai dari perekrutan hingga pengembangan kemampuan pengurus dan anggota. Divisi ini juga membina lingkungan kerja yang mendukung kolaborasi dan menyiapkan regenerasi kepemimpinan.",
  },
  {
    chip: "HUMAS",
    title: "HUMAS - Hubungan Masyarakat",
    body: "Humas mengelola komunikasi publik dan kanal informasi digital FORKIP UNJ. Divisi ini menjalin hubungan dengan pihak kampus dan organisasi eksternal serta menyampaikan informasi mengenai kegiatan dan capaian forum.",
  },
  {
    chip: "KIF",
    title: "KIF - Koordinator Integrasi Fakultas",
    body: "KIF mengoordinasikan komunikasi terkait KIP Kuliah di tingkat universitas dan fakultas. Divisi ini menyalurkan informasi ke setiap fakultas serta menghimpun data dan aspirasi mahasiswa penerima KIP Kuliah.",
  },
  {
    chip: "ADVOKASI",
    title: "ADVOKASI - Divisi Advokasi",
    body: "Advokasi mendampingi mahasiswa penerima KIP Kuliah dalam memperoleh layanan terkait hak mereka. Divisi ini memantau kebijakan bantuan pendidikan, membantu mahasiswa menghadapi kendala administrasi atau pencairan dana pinjaman (Donat), serta menyampaikan kendala tersebut kepada pengelola KIP Kuliah.",
  },
  {
    chip: "SOSDIKLAT",
    title: "SOSDIKLAT - Sosial, Pendidikan, dan Pelatihan",
    body: "Sosdiklat membantu mahasiswa mengembangkan kemampuan akademik dan nonakademik melalui kegiatan edukasi dan pelatihan keterampilan. Divisi ini juga menyelenggarakan aksi sosial sebagai sarana pengabdian kepada masyarakat.",
  },
  {
    chip: "BKK",
    title: "BKK - Biro Kebendaharaan dan Keuangan",
    body: "BKK bekerja di bawah koordinasi Bendahara Umum. Unit ini mengelola kegiatan usaha, penyewaan inventaris, dan penjualan FORKIP UNJ, serta mencatat dan mengawasi pemasukan dan pengeluaran dari kegiatan tersebut.",
  },
];

export const dikelolaSection = {
  eyebrow: "Dikelola secara resmi oleh",
  title: "HAK (Humas, Advokasi, dan KIF) - Forkip UNJ",
  cta: "Pertanyaan & Pengaduan",
  ctaHref: "/pertanyaan-pengaduan",
} as const;

export const programSection = {
  title: "Program Unggulan Forkip UNJ",
  subtitle:
    "Program unggulan FORKIP UNJ mendukung pengembangan akademik dan keterampilan mahasiswa penerima KIP Kuliah, sekaligus membuka ruang bagi mereka untuk berkontribusi melalui pengabdian kepada masyarakat.",
} as const;

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
  photoLabel: "Kampung KIP-K UNJ",
};

export const programCards: readonly ProgramCard[] = [
  {
    title: "Explore KIP-Kuliah",
    excerpt:
      "Explore KIP-Kuliah memperkenalkan program KIP Kuliah kepada siswa dari sekolah di Jabodetabek. Melalui sosialisasi dan sesi berbagi pengalaman dengan penerima KIP Kuliah, siswa mempelajari proses pendaftaran dan mendapat gambaran tentang kehidupan kampus di UNJ.",
    cta: "Arsip Kegiatan",
    photoLabel: "Explore KIP-Kuliah",
  },
  {
    title: "Indikasi",
    excerpt:
      "INDIKASI (Ikatan Dedikasi KIPK Mengabdi Sepenuh Hati) merupakan program pengabdian tahunan FORKIP UNJ. Pada 2025, mahasiswa penerima KIP Kuliah terlibat dalam sosialisasi warga, edukasi dan pendampingan, serta kegiatan sosial yang disesuaikan dengan kebutuhan masyarakat setempat.",
    cta: "Arsip Kegiatan",
    photoLabel: "Indikasi",
  },
  {
    title: "Sosialisasi KIP-K Kuliah",
    excerpt:
      "Sosialisasi ini membantu calon mahasiswa mengenal program KIP Kuliah dan memahami informasi dasar terkait pendaftaran.",
    cta: "Arsip Kegiatan",
    photoLabel: "Sosialisasi KIP-K Kuliah",
  },
];

export const beritaSection = {
  title: "Berita Forkip UNJ",
  subtitle:
    "Halaman ini dikelola oleh divisi Humas Forkip UNJ sebagai sarana berbagi informasi, dan transparansi laporan kegiatan yang dilakukan oleh Forkip UNJ",
  feature: {
    title: "Explore KIPK 2026",
    slug: "explore-kipk-2026",
    summary:
      "Pada 12 Februari 2026, FORKIP UNJ menyelenggarakan Explore KIPK 2026 untuk memperkenalkan program Kartu Indonesia Pintar Kuliah (KIP-K) kepada peserta dari berbagai sekolah di Jakarta dan sekitarnya.",
    photoLabel: "Explore KIPK 2026",
  } as NewsFeature & { readonly slug: string },
  teasers: [
    {
      title: "Pelatihan Divisi KIF",
      slug: "pelatihan-divisi-kif",
      summary:
        "FORKIP UNJ mengadakan Pelatihan Divisi KIF pada 21 Februari 2026. Kegiatan ini membekali staf dengan pemahaman tentang tugas Koordinator Integrasi Fakultas dan perannya dalam kepengurusan forum.",
    },
    {
      title: "BUSAMAKIP",
      slug: "busamakip",
      summary:
        "Pada 5 Maret 2026, FORKIP UNJ menggelar BUSAMAKIP, kegiatan buka puasa bersama mahasiswa penerima KIP Kuliah. Acara berlangsung di Aula Bung Hatta, lantai 2 Gedung Pascasarjana UNJ.",
    },
    {
      title: "Verifikasi KIPK SNBP",
      slug: "verifikasi-kipk-snbp",
      summary:
        "Pengelola KIP Kuliah UNJ melaksanakan verifikasi berkas calon penerima KIP Kuliah jalur Seleksi Nasional Berdasarkan Prestasi (SNBP) pada 6–10 April 2026. Verifikasi berlangsung di Aula Latief Hendraningrat, Gedung Dewi Sartika, Kampus A UNJ.",
    },
    {
      title: "Gelar KIPK",
      slug: "gelar-kipk",
      summary:
        "Pada 4 April 2026, FORKIP UNJ menyelenggarakan Gelar KIPK sebagai ruang bagi mahasiswa untuk mengembangkan keterampilan kreatif dan digital. Sesi berbagi membahas fotografi digital, desain dengan Canva, dan pemanfaatan kecerdasan buatan (AI).",
    },
  ] as readonly (NewsTeaser & { readonly slug: string })[],
  ctaLabel: "Laporan kegiatan Forkip UNJ",
  ctaButton: "Lihat semua Berita",
  ctaHref: "/berita",
} as const;

export const beritaMarqueeItems: readonly { readonly label: string }[] = [
  { label: "Explore KIPK 2026" },
  { label: "Pelatihan Divisi KIF" },
  { label: "BUSAMAKIP" },
  { label: "Verifikasi KIPK SNBP" },
  { label: "Gelar KIPK" },
];
