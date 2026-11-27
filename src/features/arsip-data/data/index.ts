import type {
  ArsipHeroContent,
  DirektoriRail,
  DivisionArchive,
} from "../types";

export const arsipHero: ArsipHeroContent = {
  breadcrumbLabel: "Arsip Data Tiap Divisi",
  title: "Arsip data",
  description:
    "Halaman ini disediakan sebagai arsip data tiap divisi di Forum KIPK UNJ, untuk kelancaran administrasi khususnya arsip proposal, RAB, dan LPJ. (Akses file terbatas S&K berlaku)",
};

export const direktoriRail: DirektoriRail = {
  eyebrow: "DIREKTORI DIVISI",
  heading: "Temukan arsip berdasarkan divisi.",
  caption:
    "Proposal, RAB, dan LPJ. Akses file terbatas; syarat dan ketentuan berlaku.",
};

// TODO: replace "#" with real Google Drive folder links per division.
export const divisionArchives: readonly DivisionArchive[] = [
  {
    number: "01",
    name: "KETUM/WAKETUM",
    accessLabel: "Akses terbatas",
    linkLabel: "Buka folder",
    href: "#",
  },
  {
    number: "02",
    name: "KIF",
    accessLabel: "Akses terbatas",
    linkLabel: "Buka folder",
    href: "#",
  },
  {
    number: "03",
    name: "SOSDIKLAT",
    accessLabel: "Akses terbatas",
    linkLabel: "Buka folder",
    href: "#",
  },
  {
    number: "04",
    name: "PSDM",
    accessLabel: "Akses terbatas",
    linkLabel: "Buka folder",
    href: "#",
  },
  {
    number: "05",
    name: "HUMAS",
    accessLabel: "Akses terbatas",
    linkLabel: "Buka folder",
    href: "#",
  },
  {
    number: "06",
    name: "ADVOKASI",
    accessLabel: "Akses terbatas",
    linkLabel: "Buka folder",
    href: "#",
  },
  {
    number: "07",
    name: "SEKRETARIS",
    accessLabel: "Akses terbatas",
    linkLabel: "Buka folder",
    href: "#",
  },
];
