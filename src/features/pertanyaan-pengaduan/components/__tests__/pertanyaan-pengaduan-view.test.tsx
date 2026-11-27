import { afterEach, beforeAll, describe, expect, it } from "vitest";
import {
  type FacultyContact,
  getPertanyaanFaculties,
  PertanyaanPengaduanView,
} from "@/features/pertanyaan-pengaduan";
import { getFaculties } from "@/lib/content/faculties";
import { cleanup, render, screen, within } from "@/testing/test-utils";

afterEach(cleanup);

let faculties: readonly FacultyContact[] = [];

beforeAll(async () => {
  faculties = await getPertanyaanFaculties();
});

function renderView() {
  render(<PertanyaanPengaduanView faculties={faculties} />);
}

describe("PertanyaanPengaduanView", () => {
  it("renders hero with breadcrumb, title, and subtitle", () => {
    renderView();

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
    renderView();

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

  it("renders all 8 faculty rows with content names, in content order", async () => {
    renderView();

    const contentFaculties = await getFaculties();
    const rows = screen.getAllByRole("link", {
      name: /Hubungi delegasi .* via WhatsApp/,
    });
    expect(rows).toHaveLength(contentFaculties.length);

    for (const [index, faculty] of contentFaculties.entries()) {
      const link = rows[index];
      expect(link).toHaveAttribute(
        "aria-label",
        `Hubungi delegasi ${faculty.code} via WhatsApp`,
      );
      expect(link).toHaveAttribute("href", "#");
      expect(within(link).getByText(faculty.code)).toBeInTheDocument();
      expect(within(link).getByText(faculty.name)).toBeInTheDocument();
      expect(
        within(link).getByText("Hubungi via WhatsApp"),
      ).toBeInTheDocument();
    }
  });

  it("styles FIKK as the outlined row and FIP with its faculty color", () => {
    renderView();

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
    renderView();

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
