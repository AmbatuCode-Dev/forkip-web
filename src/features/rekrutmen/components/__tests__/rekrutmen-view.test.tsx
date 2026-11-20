import { afterEach, describe, expect, it } from "vitest";
import { RekrutmenView } from "@/features/rekrutmen";
import { cleanup, render, screen } from "@/testing/test-utils";

afterEach(cleanup);

describe("RekrutmenView", () => {
  it("renders hero with the SUDAH DITUTUP status pill", () => {
    render(<RekrutmenView />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Rekrutmen Anggota Baru Forkip UNJ 2026",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Rekrutmen Anggota FORKIP UNJ 2026 merupakan proses seleksi/,
      ),
    ).toBeInTheDocument();
    // One pill overlaid beside the H1 (xl) + one in-flow fallback (< xl).
    expect(screen.getAllByText("SUDAH DITUTUP")).toHaveLength(2);
  });

  it("renders the divisi info card linking to /#divisi", () => {
    render(<RekrutmenView />);

    expect(
      screen.getByText(
        "Untuk info lengkap divisi yang ada di Forkip UNJ, silakan klik teks ini.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Lihat divisi/ })).toHaveAttribute(
      "href",
      "/#divisi",
    );
  });

  it("renders the closed Google Form placeholder", () => {
    render(<RekrutmenView />);

    expect(screen.getByText("Google Form tertanam")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Rekrutmen Anggota Baru Forkip UNJ 2026 (ditutup)",
      }),
    ).toBeInTheDocument();
  });

  it("renders the outline Narahubung Open Recruitment contact", () => {
    render(<RekrutmenView />);

    expect(
      screen.getByRole("link", { name: "Narahubung Open Recruitment" }),
    ).toHaveAttribute("href", "#");
  });
});
