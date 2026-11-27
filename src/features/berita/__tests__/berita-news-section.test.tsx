import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { BeritaNewsSection, getBeritaPosts } from "@/features/berita";
import { renderWithProviders, screen } from "@/testing/test-utils";
import type { NewsPostContent } from "@/types";

afterEach(cleanup);

let posts: readonly NewsPostContent[] = [];

beforeAll(async () => {
  posts = await getBeritaPosts();
});

const lastPage = () => Math.max(...posts.map((post) => post.page));

/** The pagination bar states "Halaman X dari Y" (visible + sr-only copy). */
function expectCurrentPage(page: number, totalPages: number) {
  expect(
    screen.getAllByText(new RegExp(`Halaman ${page} dari ${totalPages}`)),
  ).toHaveLength(2);
}

/**
 * The clamp lives in BeritaNewsSection: ?halaman resolves against the
 * explicit page numbers in content. Out-of-range/invalid values fall
 * back to page 1; array params (repeated query key) use the first entry.
 */
async function renderSection(halaman: string | string[] | undefined) {
  const section = await BeritaNewsSection({
    searchParams: Promise.resolve({ halaman }),
    posts,
  });
  renderWithProviders(section);
}

describe("BeritaNewsSection searchParams clamp", () => {
  it("renders page 1 for a non-numeric ?halaman", async () => {
    await renderSection("abc");

    expect(
      screen.getByRole("heading", { name: "Explore KIPK 2026" }),
    ).toBeInTheDocument();
    expectCurrentPage(1, 2);
  });

  it("clamps ?halaman=0 to page 1", async () => {
    await renderSection("0");

    expect(
      screen.getByRole("heading", { name: "Explore KIPK 2026" }),
    ).toBeInTheDocument();
    expectCurrentPage(1, 2);
  });

  it("clamps an out-of-range ?halaman to page 1", async () => {
    await renderSection("99");

    expect(
      screen.getByRole("heading", { name: "Explore KIPK 2026" }),
    ).toBeInTheDocument();
    expectCurrentPage(1, 2);
  });

  it("renders the last page for ?halaman beyond the data", async () => {
    await renderSection(String(lastPage()));

    expect(
      screen.getByRole("heading", { name: "Verifikasi KIPK SNBP" }),
    ).toBeInTheDocument();
    expectCurrentPage(lastPage(), 2);
  });

  it("uses the first entry when ?halaman is an array", async () => {
    await renderSection(["2"]);

    expect(
      screen.getByRole("heading", { name: "Verifikasi KIPK SNBP" }),
    ).toBeInTheDocument();
    expectCurrentPage(2, 2);
  });
});
