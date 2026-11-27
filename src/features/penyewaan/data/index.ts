import type {
  AdminContactLink,
  ContactCta,
  GoogleFormEmbed,
  InventarisItem,
  PageHeroContent,
  PenyewaanCopy,
} from "../types";

// Klien memakai satu nomor untuk kedua tombol Admin BKK — konfirmasi sebelum publikasi.
const adminBkk1Url =
  "https://wa.me/6281945811412?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20penyewaan%20inventaris%20FORKIP%20UNJ.";
const adminBkk2Url = "https://wa.me/6281945811412";

export const penyewaanHero: PageHeroContent = {
  breadcrumbLabel: "Penyewaan",
  title: "Penyewaan Inventaris Forkip UNJ",
  description:
    "BKK FORKIP UNJ mengelola penyewaan inventaris yang dapat digunakan untuk mendukung berbagai kegiatan.",
};

export const penyewaanCopy: PenyewaanCopy = {
  note: "Silakan hubungi admin BKK sebelum mengisi formulir peminjaman.",
  inventarisHeading: "Inventaris yang kami sewakan",
};

export const adminContactLinks: readonly AdminContactLink[] = [
  { label: "Admin BKK 1", href: adminBkk1Url },
  { label: "Admin BKK 2", href: adminBkk2Url },
];

export const googleFormEmbed: GoogleFormEmbed = {
  title: "Peminjaman Barang Forkip UNJ 2026",
  url: "https://docs.google.com/forms/d/e/1FAIpQLScfwQjAb9KO5YMIcz4MHXrEwkvF0VTSavvLqS9CpEl5jSgpZg/viewform",
  embedUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLScfwQjAb9KO5YMIcz4MHXrEwkvF0VTSavvLqS9CpEl5jSgpZg/viewform?embedded=true",
};

const availability = "Hubungi admin BKK untuk mengetahui ketersediaan barang.";
const photoFootnote =
  "Foto merupakan ilustrasi. Hubungi admin BKK untuk detail barang.";

export const inventarisItems: readonly InventarisItem[] = [
  {
    chip: "Penyewaan HT",
    imageLabel: "Placeholder ilustrasi Handy Talky",
    title: "Handy Talky",
    meta: availability,
    paragraphs: [
      "Radio dua arah (HT) untuk koordinasi tim selama kegiatan. Perangkat mendukung beberapa kanal komunikasi dan dilengkapi earpiece.",
    ],
    footnote: photoFootnote,
    defaultExpanded: true,
  },
  {
    chip: "Penyewaan Perangkat Audio",
    imageLabel: "Placeholder ilustrasi Speaker dan Mic",
    title: "Speaker dan Mic",
    meta: availability,
    paragraphs: [
      "Pengeras suara dan mikrofon untuk mendukung kegiatan di dalam maupun di luar ruangan.",
    ],
    footnote: photoFootnote,
  },
  {
    chip: "Penyewaan Kompor",
    imageLabel: "Placeholder ilustrasi Kompor Portable",
    title: "Kompor Portable",
    meta: availability,
    paragraphs: [
      "Kompor ringkas dengan kaki lipat yang mudah dibawa. Kompor menggunakan gas butana dalam kemasan kaleng.",
    ],
    footnote: photoFootnote,
  },
  {
    chip: "Penyewaan Peralatan Masak",
    imageLabel: "Placeholder ilustrasi Nesting",
    title: "Nesting",
    meta: availability,
    paragraphs: [
      "Set peralatan masak berbahan aluminium anodisasi yang ringan dan dikemas dalam tas jaring. Set yang tercantum meliputi panci, wajan, dua mangkuk, sendok nasi, dan spons pembersih.",
    ],
    footnote: photoFootnote,
  },
  {
    chip: "Penyewaan Proyektor",
    imageLabel: "Placeholder ilustrasi Proyektor",
    title: "Proyektor",
    meta: availability,
    paragraphs: [
      "Proyektor multimedia untuk menampilkan materi presentasi atau video pada layar yang lebih besar.",
    ],
    footnote: photoFootnote,
  },
];

export const contactCta: ContactCta = {
  title: "Butuh info selengkapnya?",
  description:
    "Tanyakan ketersediaan barang dan ketentuan penyewaan kepada admin BKK sebelum mengisi formulir.",
  actionLabel: "Admin BKK 1",
  actionHref: adminBkk1Url,
};
