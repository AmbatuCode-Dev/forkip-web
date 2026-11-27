import type { Division, NumberedItem, Service } from "../types";

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
