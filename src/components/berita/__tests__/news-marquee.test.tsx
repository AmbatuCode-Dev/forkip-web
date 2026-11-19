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
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(2);
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

    const strip = screen.getByTestId("marquee-strip");
    expect(strip.textContent).toContain("BUSAMAKIP");
    expect(strip.textContent?.indexOf("BUSAMAKIP")).toBeLessThan(
      strip.textContent?.indexOf("Explore KIPK 2026") ??
        Number.POSITIVE_INFINITY,
    );
  });

  it("keeps fase A order untouched by default", () => {
    render(<NewsMarquee items={FASE_A_ITEMS} />);

    const labels = screen
      .getAllByTestId("marquee-card")
      .map((card) => card.textContent);
    expect(labels[0]).toContain("Explore KIPK 2026");
    expect(labels[1]).toContain("Pelatihan Divisi KIF");
  });
});
