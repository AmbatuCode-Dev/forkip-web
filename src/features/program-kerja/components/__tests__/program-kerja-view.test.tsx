import { afterEach, describe, expect, it } from "vitest";
import { ProgramKerjaView } from "@/features/program-kerja";
import { cleanup, render, screen, within } from "@/testing/test-utils";

afterEach(cleanup);

describe("ProgramKerjaView", () => {
  it("renders hero and the AD/ART PDF file row", () => {
    render(<ProgramKerjaView />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Program Kerja Forkip UNJ 2026",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Disusun berdasarkan AD/ART FORUM KIP-K UNIVERSITAS NEGERI JAKARTA",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("PDF")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "AD ART FORUM KIP-KULIAH UNJ.pdf" }),
    ).toHaveAttribute("href", "#");
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

  it("renders the Explore KIP-Kuliah body copy", () => {
    render(<ProgramKerjaView />);

    expect(
      screen.getByText(
        /Pada tanggal 12 Februari 2026, Explore KIPK 2026 merupakan program sosialisasi/,
      ),
    ).toBeInTheDocument();
  });

  it("shows both buttons on the first 3 cards and only Laporan on the last 2", () => {
    render(<ProgramKerjaView />);

    expect(
      screen.getAllByRole("link", { name: "Arsip Kegiatan" }),
    ).toHaveLength(3);
    expect(
      screen.getAllByRole("link", { name: "Laporan Program Kerja" }),
    ).toHaveLength(5);

    for (const title of ["Verif Akademik SNBT", "Sosialisasi KIPK"]) {
      const card = screen
        .getByRole("heading", { level: 3, name: title })
        .closest("article");
      expect(
        within(card as HTMLElement).queryByRole("link", {
          name: "Arsip Kegiatan",
        }),
      ).toBeNull();
      expect(
        within(card as HTMLElement).getByRole("link", {
          name: "Laporan Program Kerja",
        }),
      ).toHaveAttribute("href", "#");
    }
  });
});
