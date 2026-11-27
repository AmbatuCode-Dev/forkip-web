import { afterEach, describe, expect, it } from "vitest";
import { NewsMarquee } from "@/components/berita/news-marquee";
import { cleanup, render, screen } from "@/testing/test-utils";

const FASE_A_ITEMS = [
  { label: "Explore KIPK 2026" },
  { label: "Pelatihan Divisi KIF" },
  { label: "BUSAMAKIP" },
  { label: "Verifikasi KIPK SNBP" },
  { label: "Gelar KIPK" },
];

afterEach(cleanup);

describe("NewsMarquee", () => {
  it("renders every news label (duplicated loop included)", () => {
    render(<NewsMarquee items={FASE_A_ITEMS} />);

    for (const { label } of FASE_A_ITEMS) {
      expect(
        screen.getAllByAltText(`Foto ${label} (placeholder)`).length,
      ).toBeGreaterThanOrEqual(2);
    }
  });

  it("duplicates the card list for the seamless loop", () => {
    render(<NewsMarquee items={FASE_A_ITEMS} />);

    expect(screen.getAllByTestId("marquee-card")).toHaveLength(
      FASE_A_ITEMS.length * 2,
    );
  });

  it("reorders cards for fase B", () => {
    render(<NewsMarquee items={FASE_A_ITEMS} fase="B" />);

    const alts = screen
      .getAllByTestId("marquee-card")
      .map((card) => card.querySelector("img")?.getAttribute("alt"));
    expect(alts).toContain("Foto BUSAMAKIP (placeholder)");
    expect(alts.indexOf("Foto BUSAMAKIP (placeholder)")).toBeLessThan(
      alts.indexOf("Foto Explore KIPK 2026 (placeholder)"),
    );
  });

  it("keeps fase A order untouched by default", () => {
    render(<NewsMarquee items={FASE_A_ITEMS} />);

    const alts = screen
      .getAllByTestId("marquee-card")
      .map((card) => card.querySelector("img")?.getAttribute("alt"));
    expect(alts[0]).toContain("Explore KIPK 2026");
    expect(alts[1]).toContain("Pelatihan Divisi KIF");
  });

  it("cycles the Figma card widths [460, 280, 440, 300, 420]", () => {
    render(<NewsMarquee items={FASE_A_ITEMS} />);

    const cards = screen.getAllByTestId("marquee-card");
    const expected = ["w-115", "w-70", "w-110", "w-75", "w-105"];
    cards.forEach((card, index) => {
      expect(card.className).toContain(expected[index % expected.length]);
      expect(card.className).toContain("h-95");
      expect(card.className).toContain("rounded-3xl");
      expect(card.querySelector("img")).toHaveAttribute(
        "src",
        expect.stringContaining("placehold.co"),
      );
    });
  });
});
