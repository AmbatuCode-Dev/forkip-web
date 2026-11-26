import { afterEach, describe, expect, it } from "vitest";
import { NonProgramKerjaView } from "@/features/non-program-kerja";
import { cleanup, render, screen, within } from "@/testing/test-utils";

afterEach(cleanup);

describe("NonProgramKerjaView", () => {
  it("renders hero and the AD/ART PDF file row without a placeholder link", () => {
    render(<NonProgramKerjaView />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Non Program Kerja Forkip UNJ 2026",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Daftar kegiatan di luar program kerja 2026 disusun berdasarkan Anggaran Dasar dan Anggaran Rumah Tangga (AD/ART) Forum KIP-K Universitas Negeri Jakarta.",
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

  it("renders the supplied body copy on the first card only", () => {
    render(<NonProgramKerjaView />);

    expect(
      screen.getByText(
        "Pelatihan ini membekali staf KIF dengan pemahaman tentang tanggung jawab mereka sebagai penghubung informasi di tingkat fakultas. Peserta mempelajari alur koordinasi untuk menyampaikan informasi, menghimpun aspirasi, dan menindaklanjuti kendala mahasiswa.",
      ),
    ).toBeInTheDocument();

    for (const title of ["KANTIN (Kumpul Rutin)", "Diskusi Birokrat"]) {
      const card = screen
        .getByRole("heading", { level: 3, name: title })
        .closest("article") as HTMLElement;
      expect(card.querySelector("p")).toBeNull();
    }
  });

  it("renders no placeholder archive or report action links", () => {
    render(<NonProgramKerjaView />);

    expect(
      screen.queryAllByRole("link", { name: "Arsip Kegiatan" }),
    ).toHaveLength(0);
    expect(
      screen.queryAllByRole("link", { name: "Laporan Non Program Kerja" }),
    ).toHaveLength(0);
  });
});
