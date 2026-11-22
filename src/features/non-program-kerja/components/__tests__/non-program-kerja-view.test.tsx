import { afterEach, describe, expect, it } from "vitest";
import { NonProgramKerjaView } from "@/features/non-program-kerja";
import { cleanup, render, screen, within } from "@/testing/test-utils";

afterEach(cleanup);

describe("NonProgramKerjaView", () => {
  it("renders hero and the AD/ART PDF file row", () => {
    render(<NonProgramKerjaView />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Non Program Kerja Forkip UNJ 2026",
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

  it("renders all 3 non-program cards with tag pill and photo placeholder", () => {
    render(<NonProgramKerjaView />);

    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(3);

    for (const title of [
      "Pelatihan Anggota KIF",
      "KANTIN (Kumpul Rutin)",
      "Diskusi Birokrat",
    ]) {
      const heading = screen.getByRole("heading", { level: 3, name: title });
      const card = heading.closest("article");
      expect(card).not.toBeNull();
      expect(
        within(card as HTMLElement).getByText("Non Program Kerja"),
      ).toBeInTheDocument();
      expect(
        within(card as HTMLElement).getByRole("img", {
          name: `Foto ${title} (placeholder)`,
        }),
      ).toHaveAttribute("src", expect.stringContaining("placehold.co"));
    }
  });

  it("renders the Pelatihan Anggota KIF body copy", () => {
    render(<NonProgramKerjaView />);

    expect(
      screen.getByText(
        /Pelatihan Divisi KIF \(Koordinator Integrasi Fakultas\) FORUM KIP-K UNJ 2026/,
      ),
    ).toBeInTheDocument();
  });

  it("shows Arsip Kegiatan and Laporan Non Program Kerja on every card", () => {
    render(<NonProgramKerjaView />);

    expect(
      screen.getAllByRole("link", { name: "Arsip Kegiatan" }),
    ).toHaveLength(3);
    expect(
      screen.getAllByRole("link", { name: "Laporan Non Program Kerja" }),
    ).toHaveLength(3);

    for (const link of screen.getAllByRole("link", {
      name: "Arsip Kegiatan",
    })) {
      expect(link).toHaveAttribute("href", "#");
    }
  });
});
