import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import {
  getProgramUnggulanContent,
  type PageHeroContent,
  ProgramUnggulanHero,
} from "@/features/program-unggulan";
import { renderWithProviders, screen } from "@/testing/test-utils";

afterEach(cleanup);

let hero: PageHeroContent;

beforeAll(async () => {
  ({ hero } = await getProgramUnggulanContent());
});

describe("ProgramUnggulanHero", () => {
  it("renders breadcrumb, H1, and the program unggulan intro copy", () => {
    renderWithProviders(<ProgramUnggulanHero hero={hero} />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Program Unggulan Forkip UNJ",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Beranda")).toBeInTheDocument();
    expect(
      screen.getByText(
        /mendukung pengembangan akademik dan keterampilan mahasiswa penerima KIP Kuliah/,
      ),
    ).toBeInTheDocument();
  });
});
