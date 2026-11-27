import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import {
  type FacultyContact,
  getPengunduranDiriFaculties,
  PengunduranDiriContent,
} from "@/features/pengunduran-diri";
import { getFaculties } from "@/lib/content/faculties";
import { renderWithProviders, screen, within } from "@/testing/test-utils";
import { alurSteps } from "../data/alur-steps";

afterEach(cleanup);

let faculties: readonly FacultyContact[] = [];

beforeAll(async () => {
  faculties = await getPengunduranDiriFaculties();
});

function renderContent() {
  renderWithProviders(<PengunduranDiriContent faculties={faculties} />);
}

describe("PengunduranDiriContent", () => {
  it("renders the alur heading, all 8 steps in order, and the Unduh Surat button", () => {
    renderContent();

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
    renderContent();

    expect(screen.getByText(/GOOGLE FORM TERTANAM/i)).toBeInTheDocument();
    expect(
      screen.getByText("Pendataan Pengunduran KIP-K UNJ 2026"),
    ).toBeInTheDocument();
  });

  it("renders 8 faculty cards in content order with their content hrefs", async () => {
    renderContent();

    const contentFaculties = await getFaculties();
    const links = screen.getAllByRole("link", {
      name: /Hubungi delegasi KIF .* via WhatsApp/,
    });
    expect(links).toHaveLength(contentFaculties.length);

    for (const [index, faculty] of contentFaculties.entries()) {
      const link = links[index];
      expect(link).toHaveAttribute(
        "aria-label",
        `Hubungi delegasi KIF ${faculty.code} via WhatsApp`,
      );
      expect(link).toHaveAttribute("href", faculty.whatsappHref ?? "#");
      expect(within(link).getByText(faculty.code)).toBeInTheDocument();
      expect(
        within(link).getByText("Hubungi via WhatsApp"),
      ).toBeInTheDocument();
    }
  });
});
