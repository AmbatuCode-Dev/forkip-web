import { cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ProgramUnggulanContent } from "@/features/program-unggulan";
import { renderWithProviders, screen, within } from "@/testing/test-utils";
import { programCards, programSpotlight } from "../data";

afterEach(cleanup);

describe("ProgramUnggulanContent", () => {
  it("renders the Kampung KIP-K spotlight with paragraphs, bullets, and closing", () => {
    renderWithProviders(<ProgramUnggulanContent />);

    const heading = screen.getByRole("heading", {
      level: 2,
      name: programSpotlight.title,
    });
    expect(heading).toBeInTheDocument();

    const spotlight = heading.closest("section");
    expect(spotlight).not.toBeNull();
    const bullets = within(spotlight as HTMLElement).getAllByRole("listitem");
    expect(bullets).toHaveLength(programSpotlight.bullets.length);
    for (const bullet of programSpotlight.bullets) {
      expect(
        within(spotlight as HTMLElement).getByText(bullet.label),
      ).toBeInTheDocument();
    }
    expect(
      within(spotlight as HTMLElement).getByText(programSpotlight.closing),
    ).toBeInTheDocument();
  });

  it("renders the 'Program lain' heading and all three program cards", () => {
    renderWithProviders(<ProgramUnggulanContent />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Program lain" }),
    ).toBeInTheDocument();

    for (const card of programCards) {
      const heading = screen.getByRole("heading", {
        level: 3,
        name: card.title,
      });
      expect(heading).toBeInTheDocument();
      const article = heading.closest("article");
      expect(article).not.toBeNull();
      expect(
        within(article as HTMLElement).getByText(card.excerpt),
      ).toBeInTheDocument();
    }
  });

  it("renders an 'Arsip Kegiatan' button for the spotlight and each card", () => {
    renderWithProviders(<ProgramUnggulanContent />);

    const links = screen.getAllByRole("link", { name: "Arsip Kegiatan" });
    expect(links).toHaveLength(programCards.length + 1);
    expect(links[0]).toHaveAttribute("href", "#");
    for (const link of links.slice(1)) {
      expect(link).toHaveAttribute("href", "/pertanyaan-pengaduan");
    }
  });
});
