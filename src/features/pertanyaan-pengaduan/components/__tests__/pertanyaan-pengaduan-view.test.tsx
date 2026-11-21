import { afterEach, describe, expect, it } from "vitest";
import { PertanyaanPengaduanView } from "@/features/pertanyaan-pengaduan";
import { cleanup, render, screen, within } from "@/testing/test-utils";

afterEach(cleanup);

describe("PertanyaanPengaduanView", () => {
  it("renders hero with breadcrumb, title, and subtitle", () => {
    render(<PertanyaanPengaduanView />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Pertanyaan & Pengaduan",
      }),
    ).toBeInTheDocument();
    const breadcrumb = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(
      within(breadcrumb).getByRole("link", { name: "Beranda" }),
    ).toHaveAttribute("href", "/");
    expect(
      within(breadcrumb).getByText("Pertanyaan & Pengaduan"),
    ).toBeVisible();
    expect(
      screen.getByText(
        /Halaman ini disediakan sebagai sarana bagi mahasiswa KIP-K UNJ/,
      ),
    ).toBeInTheDocument();
  });

  it("renders the kontak delegasi rail eyebrow, heading, and caption", () => {
    render(<PertanyaanPengaduanView />);

    const rail = screen.getByText("KONTAK DELEGASI FAKULTAS");
    expect(rail).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Hubungi delegasi fakultasmu.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Sampaikan pertanyaan, pengaduan, keluhan, atau aspirasi lewat WhatsApp/,
      ),
    ).toBeInTheDocument();
  });

  it("renders all 8 faculty rows with full names and placeholder hrefs", () => {
    render(<PertanyaanPengaduanView />);

    const rows = [
      ["FMIPA", "Fakultas Matematika dan Ilmu Pengetahuan Alam"],
      ["FT", "Fakultas Teknik"],
      ["FBS", "Fakultas Bahasa dan Seni"],
      ["FPsi", "Fakultas Psikologi"],
      ["FISH", "Fakultas Ilmu Sosial dan Hukum"],
      ["FEB", "Fakultas Ekonomi dan Bisnis"],
      ["FIKK", "Fakultas Ilmu Keolahragaan dan Kesehatan"],
      ["FIP", "Fakultas Ilmu Pendidikan"],
    ];
    for (const [code, fullName] of rows) {
      const link = screen.getByRole("link", {
        name: `Hubungi delegasi ${code} via WhatsApp`,
      });
      expect(link).toHaveAttribute("href", "#");
      expect(within(link).getByText(code)).toBeInTheDocument();
      expect(within(link).getByText(fullName)).toBeInTheDocument();
      expect(
        within(link).getByText("Hubungi via WhatsApp"),
      ).toBeInTheDocument();
    }
  });

  it("styles FIKK as the outlined row and FIP with its faculty color", () => {
    render(<PertanyaanPengaduanView />);

    const fikk = screen.getByRole("link", {
      name: "Hubungi delegasi FIKK via WhatsApp",
    });
    expect(fikk.className).toContain("bg-white");
    expect(fikk.className).toContain("border-teal");
    expect(fikk.className).toContain("text-ink");

    const fip = screen.getByRole("link", {
      name: "Hubungi delegasi FIP via WhatsApp",
    });
    expect(fip).toHaveStyle({ backgroundColor: "#84BC24" });
  });

  it("renders the gold note card about KIF follow-up", () => {
    render(<PertanyaanPengaduanView />);

    const note = screen.getByText(
      "Laporan akan ditindaklanjuti oleh Delegasi Fakultas dari Divisi KIF (Koordinator Integrasi Fakultas) Forkip UNJ.",
    );
    expect(note).toBeInTheDocument();
    const card = note.closest("section");
    expect(card).not.toBeNull();
    expect(card?.className).toContain("bg-gold-pale");
    expect(card?.className).toContain("rounded-2xl");
  });
});
