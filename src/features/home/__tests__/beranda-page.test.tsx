import { afterEach, describe, expect, it } from "vitest";
import { BerandaPage } from "@/features/home";
import { cleanup, render, screen } from "@/testing/test-utils";

afterEach(cleanup);

describe("BerandaPage", () => {
  it("renders the hero H1 'Forum' and 'KIPK UNJ'", () => {
    render(<BerandaPage />);

    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent).toContain("Forum");
    expect(h1.textContent).toContain("KIPK UNJ");
  });

  it("renders the required section headings", () => {
    render(<BerandaPage />);

    for (const heading of [
      "Fungsi dan Tujuan",
      "Visi dan Misi",
      "Layanan Forkip UNJ",
      "Mengenal Divisi FORKIP UNJ",
      "Berita Forkip UNJ",
    ]) {
      expect(
        screen.getByRole("heading", { level: 2, name: heading }),
      ).toBeInTheDocument();
    }
  });

  it("renders the Delegasi Fakultas heading and 8 faculty rail rows", () => {
    render(<BerandaPage />);

    expect(
      screen.getByRole("heading", {
        name: "Menaungi 8 fakultas di Universitas Negeri Jakarta",
      }),
    ).toBeInTheDocument();
    for (const code of [
      "FIP",
      "FBS",
      "FMIPA",
      "FISH",
      "FT",
      "FPsi",
      "FEB",
      "FIKK",
    ]) {
      expect(screen.getByText(code)).toBeInTheDocument();
    }
  });

  it("renders service card links to their pages", () => {
    render(<BerandaPage />);

    for (const href of [
      "/pertanyaan-pengaduan",
      "/penyewaan",
      "/donat-dan-hibah",
      "/pengumuman",
      "/pengunduran-diri",
      "/arsip-data",
    ]) {
      const link = screen
        .getAllByRole("link", { name: /Buka halaman/ })
        .find((link) => link.getAttribute("href") === href);
      expect(link).toBeDefined();
    }
  });

  it("renders all 7 division accordion titles with BPHI expanded", () => {
    render(<BerandaPage />);

    const titles = [
      "BPHI — Badan Pengurus Harian Inti",
      "PSDM — Pengembangan Sumber Daya Manusia",
      "HUMAS — Hubungan Masyarakat",
      "KIF — Koordinator Integrasi Fakultas",
      "ADVOKASI — Divisi Advokasi",
      "SOSDIKLAT — Sosial, Pendidikan, dan Pelatihan",
      "BKK — Biro Kebendaharaan dan keuangan",
    ];
    for (const title of titles) {
      const toggle = screen.getByRole("button", { name: new RegExp(title) });
      expect(toggle).toBeInTheDocument();
    }

    const bphiToggle = screen.getByRole("button", {
      name: new RegExp(titles[0]),
    });
    expect(bphiToggle).toHaveAttribute("aria-expanded", "true");
  });

  it("renders the YouTube embed for Video Forum KIPK UNJ", () => {
    render(<BerandaPage />);

    const iframe = screen.getByTitle("Video Forum KIPK UNJ");
    expect(iframe).toHaveAttribute(
      "src",
      "https://www.youtube-nocookie.com/embed/G338TUmvp1Q",
    );
  });

  it("renders the Program Unggulan spotlight and 3 program cards", () => {
    render(<BerandaPage />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Kampung KIP-K UNJ" }),
    ).toBeInTheDocument();
    for (const title of [
      "Explore KIPK UNJ: Jembatan Informasi Menuju Pendidikan Tinggi",
      "INDIKASI: Ikatan Dedikasi KIPK Mengabdi Sepenuh Hati",
      "KIP-K UNJ: Informasi Beasiswa Kampus",
    ]) {
      // Each card title appears exactly once (marquee uses different labels).
      expect(screen.getAllByText(title)).toHaveLength(1);
    }
  });
  it("renders the berita feature and editorial teasers", () => {
    render(<BerandaPage />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Explore KIP-K" }),
    ).toBeInTheDocument();
    // Exact counts: teasers render once as text; marquee card labels are no
    // longer DOM text (baked into the placehold.co image), so each duplicated
    // strip card is asserted via its img alt instead.
    const expectedCounts: Record<string, number> = {
      "Pelatihan KIF": 1,
      BUSAMAKIP: 1,
      "Verifikasi KIPK SNBP": 1,
      "Gelar KIPK": 1,
    };
    for (const [title, count] of Object.entries(expectedCounts)) {
      expect(screen.getAllByText(title)).toHaveLength(count);
    }
    for (const label of ["BUSAMAKIP", "Verifikasi KIPK SNBP", "Gelar KIPK"]) {
      // The marquee loop duplicates each card, so 2 img per label.
      expect(
        screen.getAllByAltText(`Foto ${label} (placeholder)`),
      ).toHaveLength(2);
    }
    expect(
      screen.getByRole("link", { name: "Lihat semua Berita" }),
    ).toHaveAttribute("href", "/berita");
  });
});
