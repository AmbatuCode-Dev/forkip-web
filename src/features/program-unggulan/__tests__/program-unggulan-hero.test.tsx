import { cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ProgramUnggulanHero } from "@/features/program-unggulan";
import { renderWithProviders, screen } from "@/testing/test-utils";

afterEach(cleanup);

describe("ProgramUnggulanHero", () => {
  it("renders breadcrumb, H1, and the strategic-initiative intro copy", () => {
    renderWithProviders(<ProgramUnggulanHero />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Program Unggulan Forkip UNJ",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Beranda")).toBeInTheDocument();
    expect(
      screen.getByText(/rangkaian inisiatif strategis yang dirancang/),
    ).toBeInTheDocument();
  });
});
