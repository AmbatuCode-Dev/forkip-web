import { afterEach, describe, expect, it } from "vitest";
import {
  SiteHeader,
  type SiteHeaderProps,
} from "@/components/layout/site-header";
import { cleanup, fireEvent, render, screen } from "@/testing/test-utils";
import type { NavigationContent, SiteContent } from "@/types";

afterEach(cleanup);

const site: SiteContent = {
  name: "Forum KIPK UNJ",
  description:
    "Forum KIPK UNJ merupakan sebuah wadah untuk mengurus berbagai hal yang berhubungan dengan mahasiswa penerima KIP-K di UNJ",
};

const navigation: NavigationContent = {
  ctaLabel: "Pertanyaan & Pengaduan",
  ctaHref: "/pertanyaan-pengaduan",
  routes: {
    "/": { label: "Beranda" },
    "/pengumuman": { label: "Pengumuman" },
    "/program-unggulan": {
      label: "Program Unggulan Forkip UNJ",
      shortLabel: "Program Unggulan",
    },
    "/pertanyaan-pengaduan": { label: "Pertanyaan & Pengaduan" },
    "/penyewaan": {
      label: "Penyewaan Inventaris Forkip UNJ",
      shortLabel: "Penyewaan Inventaris",
    },
    "/donat-dan-hibah": { label: "Donat dan Hibah" },
    "/pengunduran-diri": { label: "Pengunduran Diri KIPK" },
    "/arsip-data": { label: "Arsip Data Tiap Divisi" },
    "/berita": { label: "Berita" },
    "/program-kerja": { label: "Program Kerja" },
    "/non-program-kerja": { label: "Non Program Kerja" },
    "/rekrutmen": {
      label: "Rekrutmen Anggota Baru Forkip UNJ 2026",
      shortLabel: "Rekrutmen Anggota Baru",
    },
  },
  header: [
    { kind: "link", href: "/", label: "Beranda" },
    { kind: "link", href: "/pengumuman", label: "Pengumuman" },
    { kind: "link", href: "/program-unggulan", label: "Program Unggulan" },
    {
      kind: "dropdown",
      id: "layanan",
      label: "Layanan",
      heading: "Layanan mahasiswa",
      items: [
        {
          href: "/pertanyaan-pengaduan",
          chip: "KIF",
          label: "Pertanyaan & Pengaduan",
          description: "Sampaikan pertanyaan dan aspirasi ke KIF.",
        },
        {
          href: "/penyewaan",
          chip: "BKK",
          label: "Penyewaan Inventaris",
          description: "Perlengkapan kegiatan melalui layanan BKK.",
        },
        {
          href: "/donat-dan-hibah",
          chip: "ADV",
          label: "Donat dan Hibah",
          description: "Informasi peminjaman dana dan dana hibah.",
        },
        {
          href: "/pengunduran-diri",
          chip: "ADM",
          label: "Pengunduran Diri KIPK",
          description: "Panduan dan administrasi pengunduran diri.",
        },
        {
          href: "/arsip-data",
          chip: "ARS",
          label: "Arsip Data Tiap Divisi",
          description: "Dokumen dan arsip administrasi organisasi.",
        },
      ],
    },
    {
      kind: "dropdown",
      id: "organisasi",
      label: "Organisasi",
      heading: "Tentang organisasi",
      items: [
        {
          href: "/program-kerja",
          chip: "PK",
          label: "Program Kerja",
          description: "Agenda dan kegiatan resmi FORKIP UNJ.",
        },
        {
          href: "/non-program-kerja",
          chip: "NPK",
          label: "Non Program Kerja",
          description: "Pelatihan, diskusi, dan kegiatan internal.",
        },
        {
          href: "/rekrutmen",
          chip: "SDM",
          label: "Rekrutmen Anggota Baru",
          description: "Informasi penerimaan anggota FORKIP UNJ.",
        },
      ],
    },
    { kind: "link", href: "/berita", label: "Berita" },
  ],
  footer: { menu: [], lainnya: [] },
};

const props: SiteHeaderProps = { site, navigation };

describe("SiteHeader", () => {
  it("renders logo, wordmark, nav labels, and CTA", () => {
    render(<SiteHeader {...props} />);

    expect(screen.getByText("Forum KIPK UNJ")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Beranda" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Pengumuman" })).toHaveAttribute(
      "href",
      "/pengumuman",
    );
    expect(
      screen.getByRole("link", { name: "Program Unggulan" }),
    ).toHaveAttribute("href", "/program-unggulan");
    expect(screen.getByRole("link", { name: "Berita" })).toHaveAttribute(
      "href",
      "/berita",
    );
    expect(
      screen.getByRole("link", { name: "Pertanyaan & Pengaduan" }),
    ).toHaveAttribute("href", "/pertanyaan-pengaduan");
  });

  it("prefers shortLabel over the full route label for nav links", () => {
    render(
      <SiteHeader
        site={site}
        navigation={{
          ...navigation,
          header: [
            {
              kind: "link",
              href: "/program-unggulan",
              label: "Program Unggulan Forkip UNJ",
            },
          ],
        }}
      />,
    );

    expect(
      screen.getByRole("link", { name: "Program Unggulan" }),
    ).toHaveAttribute("href", "/program-unggulan");
    expect(
      screen.queryByRole("link", {
        name: "Program Unggulan Forkip UNJ",
      }),
    ).not.toBeInTheDocument();
  });

  it("opens the Layanan dropdown on click and lists its items", () => {
    render(<SiteHeader {...props} />);

    const toggle = screen.getByRole("button", { name: /Layanan/ });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Layanan mahasiswa")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Penyewaan Inventaris/ }),
    ).toHaveAttribute("href", "/penyewaan");
    expect(
      screen.getByRole("link", { name: /Arsip Data Tiap Divisi/ }),
    ).toHaveAttribute("href", "/arsip-data");
  });

  it("opens one dropdown at a time", () => {
    render(<SiteHeader {...props} />);

    fireEvent.click(screen.getByRole("button", { name: /Layanan/ }));
    fireEvent.click(screen.getByRole("button", { name: /Organisasi/ }));

    expect(screen.queryByText("Layanan mahasiswa")).not.toBeInTheDocument();
    expect(screen.getByText("Tentang organisasi")).toBeInTheDocument();
  });

  it("closes the dropdown on Escape", () => {
    render(<SiteHeader {...props} />);

    fireEvent.click(screen.getByRole("button", { name: /Layanan/ }));
    expect(screen.getByText("Layanan mahasiswa")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByText("Layanan mahasiswa")).not.toBeInTheDocument();
  });

  it("closes the dropdown on click outside", () => {
    render(<SiteHeader {...props} />);

    fireEvent.click(screen.getByRole("button", { name: /Layanan/ }));
    expect(screen.getByText("Layanan mahasiswa")).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByText("Layanan mahasiswa")).not.toBeInTheDocument();
  });

  it("closes the dropdown when a menu item is clicked", () => {
    render(<SiteHeader {...props} />);

    fireEvent.click(screen.getByRole("button", { name: /Organisasi/ }));
    const item = screen
      .getAllByRole("link", { name: /Program Kerja/ })
      .find((link) => link.getAttribute("href") === "/program-kerja");
    if (!item) {
      throw new Error("Dropdown item with href /program-kerja not found");
    }
    fireEvent.click(item);
    expect(screen.queryByText("Tentang organisasi")).not.toBeInTheDocument();
  });
});
