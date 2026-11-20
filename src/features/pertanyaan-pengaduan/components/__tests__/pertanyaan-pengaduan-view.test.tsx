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

  it("renders the KIF delegation line and all 8 faculty tiles", () => {
    render(<PertanyaanPengaduanView />);

    expect(
      screen.getByText("Pilih delegasi fakultas Anda untuk menghubungi KIF:"),
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
      expect(
        screen.getByRole("link", {
          name: `Hubungi delegasi ${code} via WhatsApp`,
        }),
      ).toHaveAttribute("href", "#");
    }
  });

  it("styles FIKK as the outlined tile and FIP as a solid color tile", () => {
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
    expect(card?.className).toContain("rounded-14");
  });
});
