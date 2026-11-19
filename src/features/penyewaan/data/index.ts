import type {
  AdminContactLink,
  ContactCta,
  GoogleFormEmbed,
  InventarisItem,
  PageHeroContent,
} from "../types";

// TODO(ggm): ganti dengan salinan final dari BKK untuk 4 item yang masih mock.
export const penyewaanHero: PageHeroContent = {
  breadcrumbLabel: "Penyewaan",
  title: "Penyewaan Inventaris Forkip UNJ",
  description:
    "Dikelola oleh BKK (Biro Kebendaharaan dan keuangan) dengan harga yang terjangkau",
};

export const adminContactLinks: readonly AdminContactLink[] = [
  { label: "Admin BKK 1", href: "#" }, // TODO: link WhatsApp admin BKK 1
  { label: "Admin BKK 2", href: "#" }, // TODO: link WhatsApp admin BKK 2
];

export const googleFormEmbed: GoogleFormEmbed = {
  label: "GOOGLE FORM TERTANAM",
  title: "Peminjaman Barang Inventaris BKK 2026",
  // TODO: embed real Google Form URL via iframe once provided by BKK.
};

export const inventarisItems: readonly InventarisItem[] = [
  {
    chip: "Penyewaan HT",
    title: "Handy Talky",
    meta: "Jumlah yang tersedia: banyak pcs (include earpiece)",
    paragraphs: [
      "Handy Talky merupakan perangkat radio komunikasi dua arah yang digunakan untuk mendukung komunikasi dan koordinasi tim. Perangkat ini beroperasi pada frekuensi VHF/UHF dengan sistem two-way radio (TX/RX), memiliki daya output sekitar 5 watt, serta mampu menjangkau jarak komunikasi kurang lebih 1 hingga 5 km tergantung kondisi lingkungan. Handy Talky dilengkapi kanal multi-channel yang dapat disesuaikan dengan kebutuhan pengguna.",
    ],
    footnote:
      "(gambar hanya ilustrasi, untuk info selengkapnya silakan hubungi admin BKK)",
    defaultExpanded: true,
  },
  {
    chip: "Penyewaan Speaker",
    title: "Speaker dan Mic",
    meta: "Jumlah yang tersedia: 1 Set",
    // TODO: real copy from BKK.
    paragraphs: [
      "Speaker dan mic disewakan dalam satu set siap pakai untuk mendukung kegiatan seperti seminar, pelatihan, dan pertemuan organisasi di lingkungan UNJ.",
    ],
  },
  {
    chip: "Penyewaan Masak",
    title: "Kompor Portable",
    meta: "Jumlah yang tersedia: banyak Set",
    // TODO: real copy from BKK.
    paragraphs: [
      "Kompor portable tersedia dalam jumlah banyak dan umumnya dipinjam untuk kegiatan bazar, kuliner, maupun acara dakwah yang membutuhkan peralatan memasak serbaguna.",
    ],
  },
  {
    chip: "Penyewaan Nesting",
    title: "Nesting",
    meta: "Jumlah yang tersedia: banyak Set",
    // TODO: real copy from BKK.
    paragraphs: [
      "Set nesting berisi peralatan masak bertingkat yang praktis untuk kegiatan memasak bersama, catering sederhana, maupun program pengabdian masyarakat.",
    ],
  },
  {
    chip: "Penyewaan Proyektor",
    title: "Proyektor",
    meta: "Jumlah yang tersedia: 1 Set",
    // TODO: real copy from BKK.
    paragraphs: [
      "Proyektor disewakan lengkap dalam satu set untuk mendukung presentasi, screening film, serta kegiatan akademik maupun non-akademik organisasi.",
    ],
  },
];

export const contactCta: ContactCta = {
  title: "Butuh info selengkapnya?",
  description: "Hubungi admin BKK sebelum mengisi form peminjaman.",
  actionLabel: "Admin BKK 1",
  actionHref: "#", // TODO: link WhatsApp admin BKK 1
};
