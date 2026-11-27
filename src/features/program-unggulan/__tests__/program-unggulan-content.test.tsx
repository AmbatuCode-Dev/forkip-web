import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import {
  getProgramUnggulanContent,
  ProgramUnggulanContent,
} from "@/features/program-unggulan";
import { renderWithProviders, screen, within } from "@/testing/test-utils";
import type { ProgramCardContent, ProgramSpotlightContent } from "@/types";
import { isActionableHref } from "@/utils/is-actionable-href";

afterEach(cleanup);

let spotlight: ProgramSpotlightContent;
let cards: readonly ProgramCardContent[];
let programLainTitle = "Program lain";

beforeAll(async () => {
  const content = await getProgramUnggulanContent();
  spotlight = content.spotlight;
  cards = content.cards;
  programLainTitle = content.programLainTitle;
});

function renderContent() {
  renderWithProviders(
    <ProgramUnggulanContent
      spotlight={spotlight}
      cards={cards}
      programLainTitle={programLainTitle}
    />,
  );
}

describe("ProgramUnggulanContent", () => {
  it("renders the Kampung KIP-K spotlight with paragraphs, bullets, and closing", () => {
    renderContent();

    const heading = screen.getByRole("heading", {
      level: 2,
      name: spotlight.title,
    });
    expect(heading).toBeInTheDocument();

    const spotlightSection = heading.closest("section");
    expect(spotlightSection).not.toBeNull();
    for (const paragraph of spotlight.paragraphs) {
      expect(
        within(spotlightSection as HTMLElement).getByText(paragraph),
      ).toBeInTheDocument();
    }
    const bullets = within(spotlightSection as HTMLElement).getAllByRole(
      "listitem",
    );
    expect(bullets).toHaveLength(spotlight.bullets.length);
    for (const bullet of spotlight.bullets) {
      expect(
        within(spotlightSection as HTMLElement).getByText(bullet.label),
      ).toBeInTheDocument();
    }
    expect(
      within(spotlightSection as HTMLElement).getByText(spotlight.closing),
    ).toBeInTheDocument();
  });

  it("renders the 'Program lain' heading and all three program cards", () => {
    renderContent();

    expect(
      screen.getByRole("heading", { level: 2, name: "Program lain" }),
    ).toBeInTheDocument();

    for (const card of cards) {
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
    renderContent();

    const spotlightSection = screen
      .getByRole("heading", { level: 2, name: spotlight.title })
      .closest("section") as HTMLElement;
    expect(
      within(spotlightSection).getByRole("link", { name: spotlight.cta }),
    ).toHaveAttribute("href", spotlight.ctaHref);

    for (const card of cards.filter((item) => isActionableHref(item.ctaHref))) {
      const article = screen
        .getByRole("heading", { level: 3, name: card.title })
        .closest("article") as HTMLElement;
      expect(
        within(article).getByRole("link", { name: card.cta }),
      ).toHaveAttribute("href", card.ctaHref);
    }
  });

  it("hides the archive button on cards whose href is a placeholder", () => {
    renderContent();

    const links = screen.getAllByRole("link", { name: "Arsip Kegiatan" });
    const actionableCards = cards.filter((card) =>
      isActionableHref(card.ctaHref),
    );
    expect(links).toHaveLength(actionableCards.length + 1);
    expect(links.some((link) => link.getAttribute("href") === "#")).toBe(false);

    for (const card of cards.filter(
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
