import { BERITA_PAGE_SIZE, type NewsPost } from "../types";

/**
 * News posts, copy verbatim from docs/figma-specs/pages/berita-spec.md,
 * the reference frame berita.png, and the page-2 frame in
 * docs/figma-specs/pagination-screenshot.png.
 */
export const newsPosts: readonly NewsPost[] = [
  {
    slug: "explore-kipk-2026",
    title: "Explore KIPK 2026",
    uploadedLabel: "Rabu 18 Februari 2026",
    photoCount: 4,
    page: 1,
    paragraphs: [
      "Pada tanggal 12 Februari 2026, Explore KIPK 2026 merupakan program sosialisasi yang diselenggarakan oleh FORUM KIP-K UNJ sebagai bentuk komitmen dalam memperluas akses informasi mengenai Program Kartu Indonesia Pintar Kuliah (KIP-K). Kegiatan ini menghadirkan perwakilan mahasiswa dari berbagai sekolah di wilayah Jakarta dan sekitarnya untuk mendapatkan pemahaman yang komprehensif terkait KIP-K.",
      "Melalui kegiatan ini, FORUM KIP-K UNJ memberikan penjelasan mengenai mekanisme pendaftaran, persyaratan, alur seleksi, serta manfaat yang diperoleh sebagai penerima KIP-K. Sosialisasi dilakukan secara interaktif agar peserta tidak hanya menerima informasi, tetapi juga dapat berdiskusi dan menyampaikan pertanyaan secara langsung.",
      "Explore KIPK 2026 diharapkan menjadi jembatan informasi antara mahasiswa KIP-K UNJ dengan calon mahasiswa penerima KIP-K di masa mendatang. Dengan adanya kegiatan ini, diharapkan semakin banyak siswa yang memahami peluang pendidikan tinggi melalui program KIP-K serta termotivasi untuk melanjutkan studi tanpa terkendala keterbatasan ekonomi.",
    ],
  },
  {
    slug: "pelatihan-divisi-kif",
    title: "Pelatihan Divisi KIF",
    uploadedLabel: "Minggu 22 Februari 2026",
    photoCount: 3,
    page: 1,
    paragraphs: [
      "Pelatihan Divisi KIF (Koordinator Integrasi Fakultas) FORUM KIP-K UNJ 2026, merupakan agenda persiapan yang diselenggarakan untuk membekali Staff KIF dengan pemahaman yang komprehensif mengenai peran, fungsi, serta tanggung jawab dalam struktur organisasi FORKIP UNJ.",
      "Dalam pelatihan ini, peserta diberikan materi terkait tugas utama KIF sebagai penghubung informasi antara pengelola KIF dan mahasiswa KIP-K di masing-masing fakultas Universitas Negeri Jakarta. Staff KIF dituntut untuk mampu menyampaikan informasi secara tepat, jelas, dan bertanggung jawab, serta memastikan tidak terjadi miskomunikasi antar pihak.",
      "Selain itu, pelatihan juga menekankan pemahaman mengenai alur birokrasi FORKIP UNJ agar setiap Staff KIF mampu bekerja sesuai mekanisme organisasi yang berlaku. Pemahaman ini penting agar proses koordinasi, penyampaian aspirasi, maupun penyelesaian permasalahan dapat berjalan secara sistematis dan profesional.",
      "Melalui pelatihan ini, Staff KIF diharapkan mampu menjawab, mengarahkan, serta mewadahi berbagai pertanyaan dan kebutuhan mahasiswa KIP-K UNJ secara responsif dan solutif.",
    ],
  },
  {
    slug: "busamakip",
    title: "BUSAMAKIP",
    uploadedLabel: "Sabtu 14 Februari 2026",
    photoCount: 0,
    page: 1,
    mediaOnly: true,
    paragraphs: [
      "Pada Kamis, 5 Maret 2026, FORUM KIP-K UNJ sukses menyelenggarakan kegiatan Buka Bersama Mahasiswa KIP-K yang bertempat di Aula Bung Hatta, Lantai 2 Gedung Pascasarjana UNJ. Agenda ini mengusung tema “Harmoni Ramadhan: Menumbuhkan Rasa Kebarsamaan dalam Bulan Suci”.",
      "Kegiatan ini diselenggarakan dengan tujuan utama untuk mempererat tali silaturahmi antar mahasiswa penerima KIP-K di lingkungan Universitas Negeri Jakarta. Di tengah keberjalanan bulan Ramadhan, momen ini menjadi wadah bagi seluruh mahasiswa untuk berkomunikasi, saling menyapa, dan memperkuat rasa persaudaraan serta solidaritas dalam bingkai kebersamaan.",
      "Tidak sekadar berbuka puasa bersama, acara ini diharapkan dapat meningkatkan semangat kebersamaan dan membangun sinergi antar sesama mahasiswa untuk terus berkontribusi positif di lingkungan kampus maupun masyarakat. Melalui kegiatan ini, FORUM KIP-K UNJ berkomitmen untuk terus menjaga iklim organisasi yang hangat, suportif, dan kekeluargaan.",
    ],
  },
  {
    slug: "verifikasi-kipk-snbp",
    title: "Verifikasi KIPK SNBP",
    uploadedLabel: "Rabu 08 April 2026",
    photoCount: 3,
    page: 2,
    paragraphs: [
      "Pengelola KIPK Universitas Negeri Jakarta (UNJ) menyelenggarakan proses verifikasi berkas bagi calon mahasiswa baru penerima Kartu Indonesia Pintar Kuliah (KIP-K) melalui jalur Seleksi Nasional Berdasarkan Prestasi (SNBP) tahun 2026. Kegiatan yang berlangsung selama lima hari ini bertujuan untuk memastikan validitas data serta kelayakan dokumen pendukung yang telah diunggah oleh para calon mahasiswa.",
      "Dalam tahapan ini, para peserta diwajibkan hadir atau mengirim berkas sesuai dengan jadwal (6–10 April) yang telah ditentukan dengan membawa dokumen asli serta salinan legalisir, seperti Kartu Peserta KIP-K, bukti pendaftaran SNBP, data penghasilan orang tua, serta dokumen pendukung lainnya. Proses verifikasi dilakukan secara teliti oleh tim verifikator untuk menjamin bahwa bantuan pendidikan tepat sasaran bagi mahasiswa yang memiliki potensi akademik tinggi namun memiliki keterbatasan ekonomi.",
    ],
  },
  {
    slug: "gelar-kipk",
    title: "Gelar KIPK",
    uploadedLabel: "Rabu 24 April 2026",
    photoCount: 0,
    page: 2,
    mediaOnly: true,
    paragraphs: [
      "Telah terlaksana kegiatan Gelar KIP-K 2026 yang diselenggarakan oleh Forum KIP-Kuliah UNJ sebagai wadah pengembangan kompetensi mahasiswa di bidang kreatif dan digital. Kegiatan ini menghadirkan sesi sharing interaktif yang membahas fotografi digital serta desain menggunakan Canva yang dikombinasikan dengan pemanfaatan teknologi AI.",
      "Materi yang disampaikan tidak hanya bersifat teoritis, tetapi juga langsung dipraktikkan oleh peserta sehingga memberikan pengalaman belajar yang lebih aplikatif dan mudah dipahami.",
      "Diharapkan kegiatan ini dapat menjadi langkah awal bagi mahasiswa KIP-K untuk terus mengembangkan potensi diri serta mampu beradaptasi dengan perkembangan dunia digital yang semakin pesat.",
    ],
  },
];

export function getNewsPage(page: number): readonly NewsPost[] {
  return newsPosts.filter((post) => post.page === page);
}

export const totalNewsPages = Math.max(
  1,
  Math.ceil(newsPosts.length / BERITA_PAGE_SIZE),
);
