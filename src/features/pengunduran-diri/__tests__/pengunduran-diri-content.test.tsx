import { cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PengunduranDiriContent } from "@/features/pengunduran-diri";
import { renderWithProviders, screen, within } from "@/testing/test-utils";
import { alurSteps } from "../data/alur-steps";
import { fakultasKontak } from "../data/fakultas-kontak";

afterEach(cleanup);

describe("PengunduranDiriContent", () => {
  it("renders the alur heading, all 8 steps in order, and the Unduh Surat button", () => {
    renderWithProviders(<PengunduranDiriContent />);

    const alurHeading = screen.getByRole("heading", {
      level: 2,
      name: "Alur pengunduran diri KIPK 2026",
    });
    expect(alurHeading).toBeInTheDocument();

    const alurCard = alurHeading.closest("section");
    expect(alurCard).not.toBeNull();
    const steps = within(alurCard as HTMLElement).getAllByRole("listitem");
    expect(steps).toHaveLength(alurSteps.length);
    expect(
      within(steps[0]).getByText(/Mahasiswa Penerima KIP-KULIAH/),
    ).toBeInTheDocument();
    expect(
      within(steps[alurSteps.length - 1]).getByText(
        /Bawa dokumen asli ke Direktorat Kemahasiswaan/,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /Unduh Surat/ }),
    ).toBeInTheDocument();
  });

  it("renders the Google Form placeholder", () => {
    renderWithProviders(<PengunduranDiriContent />);

    expect(screen.getByText(/GOOGLE FORM TERTANAM/i)).toBeInTheDocument();
    expect(
      screen.getByText("Pendataan Pengunduran KIP-K UNJ 2026"),
    ).toBeInTheDocument();
  });

  it("renders 8 faculty cards with names, WhatsApp hint, and placeholder hrefs", () => {
    renderWithProviders(<PengunduranDiriContent />);

    for (const faculty of fakultasKontak) {
      const link = screen.getByRole("link", {
        name: `Hubungi delegasi KIF ${faculty.code} via WhatsApp`,
      });
      expect(link).toBeInTheDocument();
      // Placeholder hrefs until real WhatsApp numbers are provided.
      expect(link).toHaveAttribute("href", "#");
      expect(within(link).getByText(faculty.code)).toBeInTheDocument();
      expect(
        within(link).getByText("Hubungi via WhatsApp"),
      ).toBeInTheDocument();
    }
  });
});
