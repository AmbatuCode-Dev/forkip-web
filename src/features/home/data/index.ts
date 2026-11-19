import type {
  Division,
  Faculty,
  HeroStat,
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

export const heroStats: readonly HeroStat[] = [
  {
    eyebrow: "Divisi FORKIP UNJ",
    value: "7 Divisi",
    detail: "BPHI, PSDM, HUMAS, KIF, ADVOKASI, SOSDIKLAT, BKK",
  },
  {
    eyebrow: "Delegasi KIF",
    value: "8 Fakultas",
    detail: "FMIPA, FT, FBS, FPsi, FISH, FEB, FIKK, FIP",
  },
  {
    eyebrow: "Layanan mahasiswa",
    value: "DONAT",
    detail: "Pertanyaan & Pengaduan, Penyewaan, Pengunduran diri KIPK",
  },
];

export const heroCopy = {
  titleLight: "Forum",
  titleBold: "KIPK UNJ",
  subtitle:
    "Merupakan sebuah wadah untuk mengurus berbagai hal yang berhubungan dengan mahasiswa penerima KIP-K di UNJ",
  cta: "Pertanyaan & Pengaduan",
  ctaHref: "/pertanyaan-pengaduan",
  videoLabelStrong: "Tonton Video",
  videoLabelMuted: "Forum KIPK UNJ",
  photoLabel: "Foto kegiatan Forkip UNJ",
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
    "Forum KIP-Kuliah Universitas Negeri Jakarta (FORKIP UNJ) terdiri dari beberapa divisi strategis yang bekerja sama untuk menyejahterakan mahasiswa penerima KIP-K dan berkontribusi bagi masyarakat.",
} as const;

export const divisions: readonly Division[] = [
  {
    chip: "BPHI",
    title: "BPHI — Badan Pengurus Harian Inti",
    defaultExpanded: true,
    body: "Badan Pengurus Harian Inti merupakan motor penggerak utama sekaligus pusat komando dalam struktur organisasi FORKIP UNJ. Terdiri dari Ketua, Wakil Ketua, Sekretaris umum, dan Bendahara umum, divisi ini bertanggung jawab penuh dalam menentukan arah kebijakan strategis, mengawasi kinerja seluruh divisi, serta mengelola manajemen administrasi dan keuangan organisasi secara transparan dan akuntabel demi kelancaran visi misi selama satu periode kepengurusan.",
  },
  {
    chip: "PSDM",
    title: "PSDM — Pengembangan Sumber Daya Manusia",
    // TODO: replace with real copy from Figma when available.
    body: "PSDM bertanggung jawab mengembangkan potensi anggota FORKIP UNJ melalui pelatihan, workshop, dan kegiatan pengembangan diri yang berkelanjutan.",
  },
  {
    chip: "HUMAS",
    title: "HUMAS — Hubungan Masyarakat",
    // TODO: replace with real copy from Figma when available.
    body: "HUMAS mengelola informasi, publikasi, dan dokumentasi kegiatan FORKIP UNJ serta menjalin komunikasi dengan masyarakat luas.",
  },
  {
    chip: "KIF",
    title: "KIF — Koordinator Integrasi Fakultas",
    // TODO: replace with real copy from Figma when available.
    body: "KIF menjadi penghubung FORKIP UNJ dengan delegasi fakultas di seluruh UNJ, memastikan aspirasi mahasiswa penerima KIP-K tersampaikan dengan baik.",
  },
  {
    chip: "ADVOKASI",
    title: "ADVOKASI — Divisi Advokasi",
    // TODO: replace with real copy from Figma when available.
    body: "Advokasi mengawal hak dan kepentingan mahasiswa penerima KIP-K UNJ, termasuk pengelolaan layanan DONAT dan pendampingan pengaduan.",
  },
  {
    chip: "SOSDIKLAT",
    title: "SOSDIKLAT — Sosial, Pendidikan, dan Pelatihan",
    // TODO: replace with real copy from Figma when available.
    body: "SOSDIKLAT menyelenggarakan kegiatan sosial, pendidikan, dan pelatihan bagi mahasiswa penerima KIP-K maupun masyarakat sekitar.",
  },
  {
    chip: "BKK",
    title: "BKK — Biro Kreatif dan Keuangan",
    // TODO: replace with real copy from Figma when available.
    body: "BKK mengelola keuangan, perkantoran, dan penyewaan inventaris FORKIP UNJ secara transparan dan akuntabel.",
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
    "Program Unggulan merupakan rangkaian inisiatif strategis yang dirancang untuk mengoptimalkan potensi mahasiswa penerima KIP Kuliah. Mencakup berbagai bidang, mulai dari pengembangan akademik, peningkatan soft skills, hingga aksi pengabdian masyarakat, guna mencetak generasi yang cerdas, kreatif, dan kontributif bagi universitas maupun bangsa.",
} as const;

export const programSpotlight: ProgramSpotlight = {
  title: "Kampung KIP-K UNJ",
  paragraphs: [
    // TODO: verify transcription against Figma text dump when available.
    "Kampung KIP-K UNJ adalah agenda tahunan strategis yang diselenggarakan oleh Direktorat Kemahasiswaan dan Alumni UNJ sebagai kawah candradimuka bagi para awardee KIP Kuliah. Berlokasi di Bumi Perkemahan Buperti Cibubur, kegiatan ini mengusung nilai usaha untuk menumbuhkan resiliensi atau ketahanmblastan sebagai soft skill krusial dalam menyelesaikan studi dan menghadapi tantangan dunia kerja.",
    "Selama tiga hari, sebanyak ribuan peserta dilompa melalui serangkaian kegiatan intensif yang dirancang untuk menumbuhkan kemandirian dan solidaritas, antara lain:",
  ],
  bullets: [
    {
      label: "Resiliensi & Kemandirian",
      text: "Konus aura bertahan tetap dalam tekanan; mengejawantahkan para pendamping secara mandiri, melatih daya juang dan kemampuan beradaptasi dalam kondisi terbatas.",
    },
    {
      label: "Talk Show Akademik",
      text: "Perhelatan malam biasa diangkat dari para Wikil Duta Bickjarig 1ur-lingkungan UNJ mengenai strategi sukses kuliah tepat waktu dan tips navigasi akademik.",
    },
    {
      label: "Kepemimpinan & Karakter",
      text: 'Rangkaian aktivitas yang mengasah jiwa kepemimpinan sesuai tema "Lead The Future", guna mencetak pemimpin perubahan di masa depan.',
    },
    {
      label: "Solidaritas & Kreativitas",
      text: "Mempertemukan silaturahmi melalui kegiatan bermain, kompetisi antar peserta, dan malam pesta seni sebagai ruang ekspresi bakat mahasiswa.",
    },
  ],
  closing:
    "Melalui Kampung KIP-K, kami berkomitmen memastikan bahwa mahasiswa penerima beasiswa tidak hanya anggap secara akademik, tetapi juga memiliki resiliensi tinggi, karakter yang kuat, dan optimisme tinggi dalam menempuh perjalanan akademik di Universitas Negeri Jakarta.",
  cta: "Arsip Kegiatan",
  photoLabel: "Foto Kampung KIP-K UNJ",
};

export const programCards: readonly ProgramCard[] = [
  {
    title: "Explore KIPK UNJ: Jembatan Informasi Menuju Pendidikan Tinggi",
    // TODO: verify transcription against Figma text dump when available.
    excerpt:
      "Explore KIPK 2026 adalah program sosialisasi strategis yang diselenggarakan oleh FORKIP-K UNJ sebagai wujud komitmen dedikasi...",
    cta: "Arsip Kegiatan",
    photoLabel: "Foto Explore KIPK",
  },
  {
    title: "INDIKASI: Ikatan Dedikasi KIPK Mengabdi Sepenuh Hati",
    // TODO: verify transcription against Figma text dump when available.
    excerpt:
      "INDIKASI merupakan agenda tahunan unggulan Forum KIP-K UNJ yang menjadi wujud nyata kepedulian sosial mahasiswa penerima KIP-K...",
    cta: "Arsip Kegiatan",
    photoLabel: "Foto INDIKASI",
  },
  {
    title: "KIP-K UNJ: Informasi Beasiswa Kampus",
    // TODO: verify transcription against Figma text dump when available.
    excerpt:
      "Forum KIP-K UNJ menyediakan informasi dan pendampingan bagi calon mahasiswa penerima KIP-K di Universitas Negeri Jakarta.",
    cta: "Arsip Kegiatan",
    photoLabel: "Foto KIP-K UNJ",
  },
];

export const beritaSection = {
  title: "Berita Forkip UNJ",
  subtitle:
    "Halaman ini dikelola oleh divisi Humas Forkip UNJ sebagai sarana berbagi informasi, dan transparansi laporan kegiatan yang dilakukan oleh Forkip UNJ",
  feature: {
    title: "Explore KIP-K",
    summary:
      "Pada tanggal 12 Februari 2026, Forkip UNJ mengadakan acara penting.",
    photoLabel: "Foto Explore KIP-K",
  } as NewsFeature,
  teasers: [
    {
      title: "Pelatihan KIF",
      // TODO: verify transcription against Figma text dump when available.
      summary: "Pelaksanaan 27 Februari 2026, Divisi KIF melakukan pelatihan.",
    },
    {
      title: "BUSAMAKIP",
      // TODO: verify transcription against Figma text dump when available.
      summary: "Pada tanggal 05 Maret 2026, kami telah melaksanakannya acara.",
    },
    {
      title: "Verifikasi KIPK SNBP",
      // TODO: verify transcription against Figma text dump when available.
      summary: "Terlaksana pada 6–12 April.",
    },
    {
      title: "Gelar KIPK",
      // TODO: verify transcription against Figma text dump when available.
      summary: "Terlaksana pada tanggal 4 April 2026.",
    },
  ] as readonly NewsTeaser[],
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
