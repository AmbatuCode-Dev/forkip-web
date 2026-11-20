import type { PageHeroContent, Pengumuman } from "../types";

/**
 * Indonesian copy verbatim from docs/figma-specs/missing-pages-spec.md
 * (/pengumuman, frame 224:1972). Button hrefs are placeholders (TODO: real
 * narahubung WhatsApp links and verification-letter document URLs).
 */

export const pengumumanHero: PageHeroContent = {
  breadcrumbLabel: "Pengumuman",
  title: "Pengumuman",
  subtitle:
    "Pusat informasi resmi KIP-K Universitas Negeri Jakarta. Halaman ini berfungsi sebagai kanal komunikasi utama untuk pengumuman, panduan, dan pembaruan kebijakan bagi seluruh mahasiswa dan calon mahasiswa KIP-K UNJ.",
};

export const pengumumanList: readonly Pengumuman[] = [
  {
    id: "hasil-verifikasi-snbp-eligible",
    tag: "Eligible",
    title: "Pengumuman Hasil Verifikasi Berkas KIPK Jalur SNBP (Eligible)",
    photoLabel: "pengumuman",
    paragraphs: [
      "Sehubungan dengan telah selesainya rangkaian proses verifikasi data dan pemberkasan fisik bagi calon penerima KIP Kuliah jalur Seleksi Nasional Berbasis Prestasi (SNBP) yang dilaksanakan pada 6 – 10 April 2026 di Aula Latief Hendraningrat, Gedung Dewi Sartika, Kampus A UNJ, Pengelola KIPK UNJ resmi merilis daftar mahasiswa yang dinyatakan “LOLOS”",
    ],
    lines: [
      "Silakan klik tombol di bawah untuk bertanya dan akses surat hasil verifikasi berkas KIPK jalur SNBP 2026",
    ],
    note: "Note: Jika nama tidak tercantum di dalam surat, harap cek status KIPK di SIUKAT dengan melengkapi data SIUKAT terlebih dahulu.",
    buttons: [
      // TODO: real narahubung WhatsApp link.
      { label: "Narahubung KIF Forkip UNJ", variant: "outline", href: "#" },
      // TODO: real verification-result letter URL.
      { label: "Hasil Verif KIPK UNJ 2026", variant: "gold", href: "#" },
    ],
  },
  {
    id: "verifikasi-berkas-snbp",
    tag: "Pengumuman",
    title: "Verifikasi Berkas KIPK Jalur SNBP",
    photoLabel: "pengumuman",
    paragraphs: [
      "Forum KIPK UNJ menginformasikan bahwa proses verifikasi data bagi calon penerima KIP Kuliah melalui jalur Seleksi Nasional Berbasis Prestasi (SNBP) akan segera dilaksanakan. Kegiatan ini bertujuan untuk memastikan validitas data serta kelengkapan berkas administrasi calon mahasiswa.",
    ],
    detailIntro: "Catat detail pelaksanaan secara offline pada:",
    details: [
      { label: "Tanggal", value: "6 – 10 April 2026" },
      {
        label: "Tempat",
        value: "Aula Latief Hendraningrat, Gedung Dewi Sartika, Kampus A UNJ",
      },
      { label: "Waktu", value: "08.00 - 15.00 WIB" },
    ],
    lines: [
      "Pastikan seluruh berkas fisik telah disiapkan sesuai dengan ketentuan yang berlaku. Jangan sampai terlewat!",
      "Jangan lupa follow Instagram @forkipunj.official. Jika ada pertanyaan silakan klik tombol di bawah.",
    ],
    buttons: [
      // TODO: real narahubung WhatsApp links.
      { label: "Narahubung 1", variant: "outline", href: "#" },
      { label: "Narahubung 2", variant: "outline", href: "#" },
      // TODO: real verification-letter URL.
      { label: "Surat Verif KIPK UNJ 2026", variant: "gold", href: "#" },
    ],
  },
];
