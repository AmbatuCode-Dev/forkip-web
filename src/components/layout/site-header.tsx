"use client";

import { ChevronDownSmall, Close, Menu } from "@coolicons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

/**
 * Compact disclosure for < lg. Kept as its own client component so the
 * interactive state stays isolated from the rest of the header. Every desktop
 * route and the CTA are reachable here; the panel is hidden from the
 * accessibility tree until the toggle opens it.
 */
function MobileNav({
  pathname,
  overHero,
  focusRing,
}: {
  readonly pathname: string;
  readonly overHero: boolean;
  readonly focusRing: string;
}) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const lastPathnameRef = useRef(pathname);

  // A route change always collapses the disclosure.
  useEffect(() => {
    if (lastPathnameRef.current !== pathname) {
      lastPathnameRef.current = pathname;
      setOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (panelRef.current?.contains(target)) return;
      if (toggleRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [open]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Tutup navigasi" : "Buka navigasi"}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex size-10 shrink-0 items-center justify-center rounded-lg border lg:hidden",
          overHero
            ? "border-white/40 text-white"
            : "border-border-sand text-ink",
          focusRing,
        )}
      >
        {open ? (
          <Close size={20} aria-hidden="true" />
        ) : (
          <Menu size={20} aria-hidden="true" />
        )}
      </button>
      {/* Keep the panel mounted so it can animate; inert + aria-hidden make the
          collapsed state non-interactive and invisible to assistive tech. */}
      <nav
        id="mobile-navigation"
        ref={panelRef}
        aria-label="Navigasi seluler"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "absolute inset-x-0 top-full z-50 max-h-nav-panel overflow-y-auto border-t border-border-sand bg-white px-4 py-5 shadow-dropdown sm:px-6 lg:hidden",
          "transition-nav-panel duration-200 ease-out motion-reduce:transition-none",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0",
        )}
      >
        <ul className="flex flex-col">
          {navEntries.map((entry) =>
            entry.kind === "link" ? (
              <li key={entry.href}>
                <Link
                  href={entry.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-ink transition-colors hover:bg-surface-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {entry.label}
                </Link>
              </li>
            ) : (
              <li key={entry.id} className="mt-2">
                <p className="px-3 text-xs font-semibold tracking-wide12 text-body-muted uppercase">
                  {entry.label}
                </p>
                <ul className="mt-1 flex flex-col">
                  {entry.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-body transition-colors hover:bg-surface-50 hover:text-ink focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ),
          )}
        </ul>
        <Link
          href="/pertanyaan-pengaduan"
          onClick={() => setOpen(false)}
          className={cn(
            buttonVariants({ variant: "gold", size: "cta" }),
            "mt-5 w-full justify-center",
            focusRing,
          )}
        >
          Pertanyaan &amp; Pengaduan
        </Link>
      </nav>
    </>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<DropdownId | null>(null);
  const [overHero, setOverHero] = useState(pathname === "/");
  const headerRef = useRef<HTMLElement | null>(null);

  const closeMenu = useCallback(() => {
    setOpenMenu(null);
  }, []);

  // Only the home route overlays the hero; every other route keeps the solid
  // white header. The hero pulls itself under this sticky header, so we flip
  // to solid exactly when its bottom edge passes the header's bottom edge.
  useEffect(() => {
    if (pathname !== "/") {
      setOverHero(false);
      return;
    }

    const update = () => {
      const hero = document.getElementById("home-hero");
      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      setOverHero(
        hero
          ? hero.getBoundingClientRect().bottom > headerHeight
          : window.scrollY < 100,
      );
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

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

  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHoverTimeout = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  const handleMouseEnter = (id: DropdownId) => {
    clearHoverTimeout();
    setOpenMenu(id);
  };

  const handleMouseLeave = () => {
    clearHoverTimeout();
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 150);
  };

  const toggleMenu = (id: DropdownId) => {
    clearHoverTimeout();
    // Hover may already have opened the menu; a click must not close it again.
    setOpenMenu(id);
  };

  const focusRing = overHero
    ? "focus-visible:ring-white"
    : "focus-visible:ring-ring";
  const navText = overHero
    ? "text-white/90 hover:text-white"
    : "text-body hover:text-ink";
  const activeNavText = overHero ? "text-gold" : "text-gold-ink";

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-40 transition-colors duration-300",
        overHero ? "bg-transparent" : "bg-white",
      )}
    >
      <div className="relative mx-auto flex h-18 w-full max-w-300 items-center justify-between gap-6 px-4 sm:px-6 xl:px-0">
        <Link
          href="/"
          onClick={closeMenu}
          className={cn(
            "flex shrink-0 items-center gap-2.5 rounded-md focus-visible:ring-2 focus-visible:outline-none",
            focusRing,
          )}
        >
          <Image
            src="/images/logo-mark.svg"
            alt=""
            width={38}
            height={38}
            priority
            className="size-9.5 object-contain"
          />
          <span
            className={cn(
              "hidden text-lg font-extrabold tracking-t04 sm:inline",
              overHero ? "text-white" : "text-ink",
            )}
          >
            {siteConfig.name}
          </span>
        </Link>

        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-4 lg:flex xl:gap-7"
        >
          {navEntries.map((entry) =>
            entry.kind === "link" ? (
              <Link
                key={entry.href}
                href={entry.href}
                onClick={closeMenu}
                className={cn(
                  "rounded-md py-2.75 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none",
                  navText,
                  focusRing,
                )}
              >
                {entry.label}
              </Link>
            ) : (
              // biome-ignore lint/a11y/noStaticElementInteractions: hover wrapper for dropdown menu
              <div
                key={entry.id}
                className="relative flex h-18 items-center"
                onMouseEnter={() => handleMouseEnter(entry.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  aria-expanded={openMenu === entry.id}
                  aria-controls={`${entry.id}-menu`}
                  onClick={() => toggleMenu(entry.id)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md py-2.75 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none",
                    openMenu === entry.id ? activeNavText : navText,
                    focusRing,
                  )}
                >
                  {entry.label}
                  <ChevronDownSmall
                    size={16}
                    aria-hidden="true"
                    className={cn(
                      "shrink-0 transition-transform duration-200",
                      openMenu === entry.id && "rotate-180",
                    )}
                  />
                </button>
                {openMenu === entry.id ? (
                  <div
                    id={`${entry.id}-menu`}
                    className="absolute top-full left-0 z-50 w-96 max-w-viewport-inset rounded-18 border border-border-sand bg-white p-6 shadow-dropdown"
                  >
                    <p className="text-sm leading-5 font-semibold text-body-muted">
                      {entry.heading}
                    </p>
                    <ul className="mt-2 flex flex-col gap-3">
                      {entry.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={closeMenu}
                            className="flex items-center gap-3 rounded-10 p-2 transition-colors hover:bg-surface-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                          >
                            <span className="flex min-w-0 flex-col gap-1">
                              <span className="text-base leading-6 font-semibold text-ink">
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

        <div className="hidden lg:block">
          <Link
            href="/pertanyaan-pengaduan"
            onClick={closeMenu}
            className={cn(
              buttonVariants({ variant: "gold", size: "cta" }),
              "h-11.25 py-3.25",
              focusRing,
            )}
          >
            Pertanyaan &amp; Pengaduan
          </Link>
        </div>

        <MobileNav
          pathname={pathname}
          overHero={overHero}
          focusRing={focusRing}
        />
      </div>
    </header>
  );
}
