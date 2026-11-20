import Image from "next/image";
import Link from "next/link";

interface FooterLink {
  readonly label: string;
  readonly href: string;
}

interface SocialLink {
  readonly label: string;
  readonly href: string;
  readonly icon: string;
}

const menuLinks: readonly FooterLink[] = [
  { label: "Beranda", href: "/" },
  { label: "Pengumuman", href: "/pengumuman" },
  { label: "Program Unggulan", href: "/program-unggulan" },
  { label: "Pertanyaan & Pengaduan", href: "/pertanyaan-pengaduan" },
  { label: "Berita", href: "/berita" },
  { label: "Penyewaan", href: "/penyewaan" },
];

const lainnyaLinks: readonly FooterLink[] = [
  { label: "Donat dan Hibah", href: "/donat-dan-hibah" },
  { label: "Program Kerja", href: "/program-kerja" },
  { label: "Non Program Kerja", href: "/non-program-kerja" },
  { label: "Rekrutmen Anggota Baru Forkip UNJ 2026", href: "/rekrutmen" },
  { label: "Form Pengunduran diri dari KIPK", href: "/pengunduran-diri" },
  { label: "Arsip Data Tiap Divisi", href: "/arsip-data" },
];

const kontakItems: readonly {
  readonly label: string;
  readonly value: string;
}[] = [
  { label: "Instagram", value: "@forkipunj.official" },
  { label: "X", value: "@forumkipk_unj" },
  { label: "TikTok", value: "@forkipunj" },
  { label: "Gmail", value: "humasnyaforkip@gmail.com" },
];

const socialLinks: readonly SocialLink[] = [
  {
    label: "Instagram Forum KIP-K UNJ",
    href: "https://www.instagram.com/forkipunj.official",
    icon: "/images/icon-instagram.svg",
  },
  {
    label: "X (Twitter) Forum KIP-K UNJ",
    href: "https://x.com/forumkipk_unj",
    icon: "/images/icon-x.svg",
  },
  {
    label: "TikTok Forum KIP-K UNJ",
    href: "https://www.tiktok.com/@forkipunj",
    icon: "/images/icon-tiktok.svg",
  },
  {
    label: "Email humasnyaforkip@gmail.com",
    href: "mailto:humasnyaforkip@gmail.com",
    icon: "/images/icon-envelope.svg",
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-surface-100">
      <div className="mx-auto w-full max-w-[1200px] px-4 pt-20 pb-9 sm:px-6 xl:px-0">
        <div className="flex flex-col gap-12 md:flex-row md:gap-14">
          <div className="flex w-full flex-col md:w-[340px] md:shrink-0">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo-kipk-unj.png"
                alt=""
                width={48}
                height={48}
                className="size-12 object-contain"
              />
              <span className="text-[19px] font-extrabold tracking-[-0.4px] text-ink">
                Forum KIPK UNJ
              </span>
            </div>
            <p className="mt-4 text-sm leading-[22px] font-normal text-body">
              Forum KIPK UNJ merupakan sebuah wadah untuk mengurus berbagai hal
              yang berhubungan dengan mahasiswa penerima KIP-K di UNJ
            </p>
            <div className="mt-[14px] flex items-center gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http")
                      ? "noreferrer noopener"
                      : undefined
                  }
                  className="inline-flex size-10 items-center justify-center rounded-full border border-border-sand bg-white transition-colors hover:bg-surface-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Image
                    src={social.icon}
                    alt=""
                    width={20}
                    height={20}
                    unoptimized
                    className="size-5"
                  />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Menu footer" className="flex-1">
            <h2 className="text-[13px] font-bold tracking-[1.2px] text-ink uppercase">
              Menu
            </h2>
            <ul className="mt-[10px] flex flex-col gap-3.5 leading-5">
              {menuLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm leading-5 font-medium text-body transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Lainnya footer" className="flex-1">
            <h2 className="text-[13px] font-bold tracking-[1.2px] text-ink uppercase">
              Lainnya
            </h2>
            <ul className="mt-[10px] flex flex-col gap-3.5 leading-5">
              {lainnyaLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm leading-5 font-medium text-body transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex-1">
            <h2 className="text-[13px] font-bold tracking-[1.2px] text-ink uppercase">
              Kontak
            </h2>
            <ul className="mt-[10px] flex flex-col gap-3.5 leading-5">
              {kontakItems.map((item) => (
                <li
                  key={item.label}
                  className="text-sm leading-5 font-medium text-body"
                >
                  {item.label} {item.value}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex h-[140px] items-center justify-center rounded-2xl border border-border-sand bg-surface-200">
              <span className="text-[13px] font-semibold text-ink-soft">
                Peta lokasi
              </span>
            </div>
          </div>
        </div>

        <div className="mt-[47px] h-px bg-surface-200" />
        <p className="mt-12 text-[13px] leading-[17px] font-medium text-body-muted">
          © 2026 Forum KIP-K Universitas Negeri Jakarta
        </p>
      </div>
    </footer>
  );
}
