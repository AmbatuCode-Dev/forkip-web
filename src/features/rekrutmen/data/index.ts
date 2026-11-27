import type {
  ContactLink,
  DivisiInfo,
  GoogleFormEmbed,
  PageHeroContent,
  RecruitmentStatus,
} from "../types";

export const rekrutmenHero: PageHeroContent = {
  breadcrumbLabel: "Rekrutmen Anggota Baru",
  title: "Rekrutmen Anggota Baru Forkip UNJ 2026",
  description:
    "Rekrutmen Anggota FORKIP UNJ 2026 merupakan proses seleksi bagi mahasiswa penerima KIP-K Universitas Negeri Jakarta yang ingin berkontribusi aktif dalam organisasi. Melalui rekrutmen ini, FORKIP UNJ membuka kesempatan bagi mahasiswa untuk mengembangkan potensi diri, meningkatkan kemampuan kepemimpinan, serta berperan dalam pelayanan dan advokasi mahasiswa KIP-K.",
};

export const recruitmentStatus: RecruitmentStatus = {
  label: "SUDAH DITUTUP",
};

export const divisiInfo: DivisiInfo = {
  text: "Untuk info lengkap divisi yang ada di Forkip UNJ, silakan klik teks ini.",
  linkLabel: "Lihat divisi",
  href: "/#divisi",
};

export const googleFormEmbed: GoogleFormEmbed = {
  label: "Google Form tertanam",
  title: "Rekrutmen Anggota Baru Forkip UNJ 2026 (ditutup)",
  // TODO: embed real Google Form URL via iframe once provided by HAK.
};

export const narahubungContact: ContactLink = {
  label: "Narahubung Open Recruitment",
  href: "#", // TODO: link WhatsApp narahubung open recruitment.
};
