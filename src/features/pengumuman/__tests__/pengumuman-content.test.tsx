import { cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PengumumanContent } from "@/features/pengumuman";
import { renderWithProviders, screen, within } from "@/testing/test-utils";
import { pengumumanList } from "../data";

afterEach(cleanup);

describe("PengumumanContent", () => {
  it("renders both announcement cards with their tag pills and H2 titles", () => {
    renderWithProviders(<PengumumanContent />);

    for (const pengumuman of pengumumanList) {
      const heading = screen.getByRole("heading", {
        level: 2,
        name: pengumuman.title,
      });
      expect(heading).toBeInTheDocument();

      const card = heading.closest("article");
      expect(card).not.toBeNull();
      expect(
        within(card as HTMLElement).getByText(pengumuman.tag),
      ).toBeInTheDocument();
    }
  });

  it("renders the Eligible card gold-tint SIUKAT note and action buttons", () => {
    renderWithProviders(<PengumumanContent />);

    expect(
      screen.getByText(/Jika nama tidak tercantum di dalam surat/),
    ).toBeInTheDocument();

    const eligible = pengumumanList[0];
    for (const button of eligible.buttons) {
      const link = screen.getByRole("link", { name: button.label });
      expect(link).toBeInTheDocument();
      // Placeholder hrefs until real contact/document URLs are provided.
      expect(link).toHaveAttribute("href", "#");
    }
  });

  it("renders the SNBP verification detail rows and its three buttons", () => {
    renderWithProviders(<PengumumanContent />);

    const verification = pengumumanList[1];
    expect(
      screen.getByText("Catat detail pelaksanaan secara offline pada:"),
    ).toBeInTheDocument();
    for (const row of verification.details ?? []) {
      expect(screen.getByText(`${row.label}:`)).toBeInTheDocument();
      expect(screen.getByText(row.value)).toBeInTheDocument();
    }

    for (const button of verification.buttons) {
      expect(
        screen.getByRole("link", { name: button.label }),
      ).toBeInTheDocument();
    }
  });
});
