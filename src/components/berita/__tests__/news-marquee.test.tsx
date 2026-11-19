import { afterEach, describe, expect, it } from "vitest";
import {
  MARQUEE_LABELS_FASE_A,
  MARQUEE_LABELS_FASE_B,
  NewsMarquee,
} from "@/components/berita/news-marquee";
import { cleanup, render, screen } from "@/testing/test-utils";

afterEach(cleanup);

describe("NewsMarquee", () => {
  it("renders every news label (duplicated loop included)", () => {
    render(<NewsMarquee items={MARQUEE_LABELS_FASE_A} />);

    for (const { label } of MARQUEE_LABELS_FASE_A) {
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(2);
    }
  });

  it("duplicates the card list for the seamless loop", () => {
    render(<NewsMarquee items={MARQUEE_LABELS_FASE_A} />);

    expect(screen.getAllByTestId("marquee-card")).toHaveLength(
      MARQUEE_LABELS_FASE_A.length * 2,
    );
  });

  it("reorders cards for fase B", () => {
    render(<NewsMarquee items={MARQUEE_LABELS_FASE_A} fase="B" />);

    const strip = screen.getByTestId("marquee-strip");
    expect(strip.textContent).toContain("BUSAMAKIP");
    expect(strip.textContent?.indexOf("BUSAMAKIP")).toBeLessThan(
      strip.textContent?.indexOf("Explore KIPK 2026") ??
        Number.POSITIVE_INFINITY,
    );
    expect(MARQUEE_LABELS_FASE_B[0].label).toBe("BUSAMAKIP");
  });

  it("keeps fase A order untouched by default", () => {
    render(<NewsMarquee items={MARQUEE_LABELS_FASE_A} />);

    const labels = screen
      .getAllByTestId("marquee-card")
      .map((card) => card.textContent);
    expect(labels[0]).toContain("Explore KIPK 2026");
    expect(labels[1]).toContain("Pelatihan Divisi KIF");
  });
});
