import { afterEach, describe, expect, it } from "vitest";
import { ProgramKerjaView } from "@/features/program-kerja";
import { cleanup, render, screen, within } from "@/testing/test-utils";
import { programKerjaItems } from "../../data";

afterEach(cleanup);

describe("ProgramKerjaView", () => {
  it("renders hero and the AD/ART PDF file row without a placeholder link", () => {
    render(<ProgramKerjaView />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Program Kerja Forkip UNJ 2026",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Program kerja 2026 disusun berdasarkan Anggaran Dasar dan Anggaran Rumah Tangga (AD/ART) Forum KIP-K Universitas Negeri Jakarta.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("PDF")).toBeInTheDocument();
    expect(
      screen.getByText("AD ART FORUM KIP-KULIAH UNJ.pdf"),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", {
        name: "AD ART FORUM KIP-KULIAH UNJ.pdf",
      }),
    ).toBeNull();
  });

  it("renders all 5 program cards with tag pill and photo placeholder", () => {
    render(<ProgramKerjaView />);

    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(5);

    for (const title of [
      "Explore KIP-Kuliah",
      "BUSAMAKIP",
      "Verif Akademik SNBP",
      "Verif Akademik SNBT",
      "Sosialisasi KIPK",
    ]) {
      const heading = screen.getByRole("heading", { level: 3, name: title });
      const card = heading.closest("article");
      expect(card).not.toBeNull();
      expect(
        within(card as HTMLElement).getByText("Program Kerja"),
      ).toBeInTheDocument();
      expect(
        within(card as HTMLElement).getByRole("img", {
          name: `Foto ${title} (placeholder)`,
        }),
      ).toHaveAttribute("src", expect.stringContaining("placehold.co"));
    }
  });

  it("renders the supplied body copy on the first three cards only", () => {
    render(<ProgramKerjaView />);

    for (const body of [
      "FORKIP UNJ mengadakan sosialisasi KIP Kuliah pada 12 Februari 2026 bagi peserta dari sekolah di Jakarta dan sekitarnya. Kegiatan ini membantu calon mahasiswa memahami pendaftaran, persyaratan, dan tahapan seleksi KIP Kuliah.",
      "FORKIP UNJ mengadakan buka puasa bersama pada 5 Maret 2026 di Aula Bung Hatta, Gedung Pascasarjana UNJ, untuk mempererat silaturahmi mahasiswa penerima KIP Kuliah.",
      "Pada 6–10 April 2026, Pengelola KIP Kuliah UNJ memeriksa kesesuaian data dan kelengkapan berkas calon penerima KIP Kuliah jalur SNBP.",
    ]) {
      expect(screen.getByText(body)).toBeInTheDocument();
    }

    for (const title of ["Verif Akademik SNBT", "Sosialisasi KIPK"]) {
      const card = screen
        .getByRole("heading", { level: 3, name: title })
        .closest("article") as HTMLElement;
      expect(card.querySelector("p")).toBeNull();
    }
  });

  it("keeps the Arsip/Laporan split in the data but renders no placeholder action links", () => {
    expect(programKerjaItems.map((item) => item.hasArchive)).toEqual([
      true,
      true,
      true,
      false,
      false,
    ]);

    render(<ProgramKerjaView />);

    expect(
      screen.queryAllByRole("link", { name: "Arsip Kegiatan" }),
    ).toHaveLength(0);
    expect(
      screen.queryAllByRole("link", { name: "Laporan Program Kerja" }),
    ).toHaveLength(0);
  });
});
