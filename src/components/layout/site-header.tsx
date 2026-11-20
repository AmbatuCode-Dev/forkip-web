"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/utils/cn";

type DropdownId = "layanan" | "organisasi";

interface DropdownItem {
  readonly chip: string;
  readonly title: string;
  readonly description: string;
  readonly href: string;
}

interface DropdownEntry {
  readonly kind: "dropdown";
  readonly id: DropdownId;
  readonly label: string;
  readonly heading: string;
  readonly items: readonly DropdownItem[];
}

interface LinkEntry {
  readonly kind: "link";
  readonly label: string;
  readonly href: string;
}

type NavEntry = LinkEntry | DropdownEntry;

const layananItems: readonly DropdownItem[] = [
  {
    chip: "KIF",
    title: "Pertanyaan & Pengaduan",
    description: "Sampaikan pertanyaan dan aspirasi ke KIF.",
    href: "/pertanyaan-pengaduan",
  },
  {
    chip: "BKK",
    title: "Penyewaan Inventaris",
    description: "Perlengkapan kegiatan melalui layanan BKK.",
    href: "/penyewaan",
  },
  {
    chip: "ADV",
    title: "Donat dan Hibah",
    description: "Informasi peminjaman dana dan dana hibah.",
    href: "/donat-dan-hibah",
  },
  {
    chip: "ADM",
    title: "Pengunduran Diri KIPK",
    description: "Panduan dan administrasi pengunduran diri.",
    href: "/pengunduran-diri",
  },
  {
    chip: "ARS",
    title: "Arsip Data Tiap Divisi",
    description: "Dokumen dan arsip administrasi organisasi.",
    href: "/arsip-data",
  },
];

const organisasiItems: readonly DropdownItem[] = [
  {
    chip: "PK",
    title: "Program Kerja",
    description: "Agenda dan kegiatan resmi FORKIP UNJ.",
    href: "/program-kerja",
  },
  {
    chip: "NPK",
    title: "Non Program Kerja",
    description: "Pelatihan, diskusi, dan kegiatan internal.",
    href: "/non-program-kerja",
  },
  {
    chip: "SDM",
    title: "Rekrutmen Anggota Baru",
    description: "Informasi penerimaan anggota FORKIP UNJ.",
    href: "/rekrutmen",
  },
];

const navEntries: readonly NavEntry[] = [
  { kind: "link", label: "Beranda", href: "/" },
  { kind: "link", label: "Pengumuman", href: "/pengumuman" },
  { kind: "link", label: "Program Unggulan", href: "/program-unggulan" },
  {
    kind: "dropdown",
    id: "layanan",
    label: "Layanan",
    heading: "Layanan mahasiswa",
    items: layananItems,
  },
  {
    kind: "dropdown",
    id: "organisasi",
    label: "Organisasi",
    heading: "Tentang organisasi",
    items: organisasiItems,
  },
  { kind: "link", label: "Berita", href: "/berita" },
];

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<DropdownId | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const closeMenu = useCallback(() => {
    setOpenMenu(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };
    const handleMouseDown = (event: MouseEvent) => {
      if (
        headerRef.current &&
        event.target instanceof Node &&
        !headerRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [closeMenu]);

  const toggleMenu = (id: DropdownId) => {
    setOpenMenu((current) => (current === id ? null : id));
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-40 bg-white">
      <div className="mx-auto flex h-[72px] w-full max-w-[1200px] items-center justify-between gap-6 px-4 sm:px-6 xl:px-0">
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Image
            src="/images/logo-kipk-unj.png"
            alt=""
            width={38}
            height={38}
            priority
            className="size-[38px] object-contain"
          />
          <span className="text-[19px] font-extrabold tracking-[-0.4px] text-ink max-sm:hidden">
            {siteConfig.name}
          </span>
        </Link>

        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-7 lg:flex"
        >
          {navEntries.map((entry) =>
            entry.kind === "link" ? (
              <Link
                key={entry.href}
                href={entry.href}
                onClick={closeMenu}
                className="rounded-md py-[11px] text-sm font-medium text-body transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {entry.label}
              </Link>
            ) : (
              <div
                key={entry.id}
                className="relative flex h-[72px] items-center"
              >
                <button
                  type="button"
                  aria-expanded={openMenu === entry.id}
                  aria-controls={`${entry.id}-menu`}
                  onClick={() => toggleMenu(entry.id)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md py-[11px] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    openMenu === entry.id
                      ? "text-gold-ink"
                      : "text-body hover:text-ink",
                  )}
                >
                  {entry.label}
                  <Image
                    src={
                      openMenu === entry.id
                        ? "/images/chevron-down-flipped.svg"
                        : "/images/chevron-down.svg"
                    }
                    alt=""
                    width={10.6}
                    height={6.4}
                    unoptimized
                    className={cn(
                      "transition-transform duration-200",
                      openMenu === entry.id && "rotate-180",
                    )}
                  />
                </button>
                {openMenu === entry.id ? (
                  <div
                    id={`${entry.id}-menu`}
                    className="absolute -left-[58px] top-full z-50 w-[420px] rounded-[18px] border border-border-sand bg-white p-6 shadow-dropdown"
                  >
                    <p className="text-[13px] font-semibold text-body-muted">
                      {entry.heading}
                    </p>
                    <ul className="mt-2 flex flex-col gap-3">
                      {entry.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={closeMenu}
                            className="flex items-center gap-3 rounded-[10px] p-2 transition-colors hover:bg-surface-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <span className="inline-flex h-7 shrink-0 items-center justify-center rounded-md bg-surface-50 px-2.5 text-[9px] font-semibold text-ink-soft">
                              {item.chip}
                            </span>
                            <span className="flex min-w-0 flex-col gap-1">
                              <span className="text-[15px] leading-5 font-semibold text-ink">
                                {item.title}
                              </span>
                              <span className="text-sm leading-5 text-body-muted">
                                {item.description}
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ),
          )}
        </nav>

        <Link
          href="/pertanyaan-pengaduan"
          onClick={closeMenu}
          className={cn(buttonVariants({ variant: "gold", size: "cta" }))}
        >
          Pertanyaan &amp; Pengaduan
        </Link>
      </div>
    </header>
  );
}
