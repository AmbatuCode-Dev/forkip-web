import { cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PengunduranDiriHero } from "@/features/pengunduran-diri";
import { renderWithProviders, screen } from "@/testing/test-utils";

afterEach(cleanup);

describe("PengunduranDiriHero", () => {
  it("renders breadcrumb, H1, and intro copy", () => {
    renderWithProviders(<PengunduranDiriHero />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Pengunduran diri KIPK" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Beranda")).toBeInTheDocument();
    expect(
      screen.getByText("Form Pengunduran diri dari KIPK"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Dibantu oleh divisi KIF Forkip UNJ/),
    ).toBeInTheDocument();
  });
});
