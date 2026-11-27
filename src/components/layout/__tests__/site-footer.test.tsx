import { afterEach, describe, expect, it } from "vitest";
import {
  SiteFooter,
  type SiteFooterProps,
} from "@/components/layout/site-footer";
import { cleanup, render, screen } from "@/testing/test-utils";
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
      footerLabel: "Penyewaan",
    },
    "/donat-dan-hibah": { label: "Donat dan Hibah" },
    "/pengunduran-diri": {
      label: "Pengunduran Diri KIPK",
      footerLabel: "Form Pengunduran diri dari KIPK",
    },
    "/arsip-data": { label: "Arsip Data Tiap Divisi" },
    "/berita": { label: "Berita" },
    "/program-kerja": { label: "Program Kerja" },
    "/non-program-kerja": { label: "Non Program Kerja" },
    "/rekrutmen": {
      label: "Rekrutmen Anggota Baru Forkip UNJ 2026",
      shortLabel: "Rekrutmen Anggota Baru",
    },
  },
  header: [],
  footer: {
    menu: [
      "/",
      "/pengumuman",
      "/program-unggulan",
      "/pertanyaan-pengaduan",
      "/berita",
      "/penyewaan",
    ],
    lainnya: [
      "/donat-dan-hibah",
      "/program-kerja",
      "/non-program-kerja",
      "/rekrutmen",
      "/pengunduran-diri",
      "/arsip-data",
    ],
  },
};

const props: SiteFooterProps = { site, navigation };

describe("SiteFooter", () => {
  it("renders brand wordmark and description paragraph", () => {
    render(<SiteFooter {...props} />);

    expect(screen.getAllByText("Forum KIPK UNJ").length).toBeGreaterThan(0);
    expect(
      screen.getByText(
        /Forum KIPK UNJ merupakan sebuah wadah untuk mengurus berbagai hal/,
      ),
    ).toBeInTheDocument();
  });

  it("renders MENU, LAINNYA, and KONTAK column headings", () => {
    render(<SiteFooter {...props} />);

    expect(screen.getByRole("heading", { name: "Menu" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Lainnya" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Kontak" })).toBeInTheDocument();
  });

  it("renders menu and lainnya links with route-map hrefs", () => {
    render(<SiteFooter {...props} />);

    expect(
      screen.getByRole("link", { name: "Pertanyaan & Pengaduan" }),
    ).toHaveAttribute("href", "/pertanyaan-pengaduan");
    expect(screen.getByRole("link", { name: "Penyewaan" })).toHaveAttribute(
      "href",
      "/penyewaan",
    );
    expect(
      screen.getByRole("link", { name: "Donat dan Hibah" }),
    ).toHaveAttribute("href", "/donat-dan-hibah");
    expect(
      screen.getByRole("link", { name: "Arsip Data Tiap Divisi" }),
    ).toHaveAttribute("href", "/arsip-data");
    expect(screen.getByRole("link", { name: "Program Kerja" })).toHaveAttribute(
      "href",
      "/program-kerja",
    );
  });

  it("prefers footerLabel over the full route label", () => {
    render(<SiteFooter {...props} />);

    expect(screen.getByRole("link", { name: "Penyewaan" })).toHaveAttribute(
      "href",
      "/penyewaan",
    );
    expect(
      screen.queryByRole("link", {
        name: "Penyewaan Inventaris Forkip UNJ",
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "Form Pengunduran diri dari KIPK",
      }),
    ).toHaveAttribute("href", "/pengunduran-diri");
  });

  it("renders the four social icon links", () => {
    render(<SiteFooter {...props} />);

    expect(
      screen.getByRole("link", { name: "Instagram Forum KIP-K UNJ" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "X (Twitter) Forum KIP-K UNJ" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "TikTok Forum KIP-K UNJ" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Email humasnyaforkip@gmail.com" }),
    ).toHaveAttribute("href", "mailto:humasnyaforkip@gmail.com");
  });

  it("renders contact CTA, map embed, and copyright", () => {
    render(<SiteFooter {...props} />);

    expect(screen.getByRole("link", { name: "Hubungi Kami" })).toHaveAttribute(
      "href",
      "/pertanyaan-pengaduan",
    );
    expect(
      screen.getByTitle("Peta lokasi Forum KIP-K UNJ"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("© 2026 Forum KIP-K Universitas Negeri Jakarta"),
    ).toBeInTheDocument();
  });
});
