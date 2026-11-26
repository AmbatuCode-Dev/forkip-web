import { cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ProgramUnggulanContent } from "@/features/program-unggulan";
import { renderWithProviders, screen, within } from "@/testing/test-utils";
import { isActionableHref } from "@/utils/is-actionable-href";
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
    for (const paragraph of programSpotlight.paragraphs) {
      expect(
        within(spotlight as HTMLElement).getByText(paragraph),
      ).toBeInTheDocument();
    }
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

  it("links the spotlight and actionable cards to their own archive URLs", () => {
    renderWithProviders(<ProgramUnggulanContent />);

    const spotlight = screen
      .getByRole("heading", { level: 2, name: programSpotlight.title })
      .closest("section") as HTMLElement;
    expect(
      within(spotlight).getByRole("link", { name: programSpotlight.cta }),
    ).toHaveAttribute("href", programSpotlight.ctaHref);

    for (const card of programCards.filter((item) =>
      isActionableHref(item.ctaHref),
    )) {
      const article = screen
        .getByRole("heading", { level: 3, name: card.title })
        .closest("article") as HTMLElement;
      expect(
        within(article).getByRole("link", { name: card.cta }),
      ).toHaveAttribute("href", card.ctaHref);
    }
  });

  it("hides the archive button on cards whose href is a placeholder", () => {
    renderWithProviders(<ProgramUnggulanContent />);

    const links = screen.getAllByRole("link", { name: "Arsip Kegiatan" });
    const actionableCards = programCards.filter((card) =>
      isActionableHref(card.ctaHref),
    );
    expect(links).toHaveLength(actionableCards.length + 1);
    expect(links.some((link) => link.getAttribute("href") === "#")).toBe(false);

    for (const card of programCards.filter(
      (item) => !isActionableHref(item.ctaHref),
    )) {
      const article = screen
        .getByRole("heading", { level: 3, name: card.title })
        .closest("article") as HTMLElement;
      expect(
        within(article).queryByRole("link", { name: card.cta }),
      ).not.toBeInTheDocument();
    }
  });
});
