import { cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { BeritaHero } from "@/features/berita";
import { renderWithProviders, screen } from "@/testing/test-utils";

afterEach(cleanup);

describe("BeritaHero", () => {
  it("renders breadcrumb, H1, and intro copy", () => {
    renderWithProviders(<BeritaHero />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Berita" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Beranda")).toBeInTheDocument();
    expect(
      screen.getByText(/divisi Humas Forkip UNJ sebagai sarana berbagi/),
    ).toBeInTheDocument();
  });
});
