import { cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PengumumanHero } from "@/features/pengumuman";
import { renderWithProviders, screen } from "@/testing/test-utils";

afterEach(cleanup);

describe("PengumumanHero", () => {
  it("renders breadcrumb, H1, and the official-channel intro copy", () => {
    renderWithProviders(<PengumumanHero />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Pengumuman" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Beranda")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Pusat informasi resmi KIP-K Universitas Negeri Jakarta/,
      ),
    ).toBeInTheDocument();
  });
});
