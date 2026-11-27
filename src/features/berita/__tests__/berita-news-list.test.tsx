import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import {
  BeritaNewsList,
  getBeritaPosts,
  getNewsPage,
  totalNewsPages,
} from "@/features/berita";
import { renderWithProviders, screen, within } from "@/testing/test-utils";
import type { NewsPostContent } from "@/types";

afterEach(cleanup);

let posts: readonly NewsPostContent[] = [];

beforeAll(async () => {
  posts = await getBeritaPosts();
});

function renderPage(page: number) {
  renderWithProviders(
    <BeritaNewsList
      page={page}
      totalPages={totalNewsPages(posts)}
      totalItems={posts.length}
      posts={getNewsPage(posts, page)}
    />,
  );
}

function expectPlaceholder(label: string) {
  expect(
    screen.getByRole("img", { name: `Foto ${label} (placeholder)` }),
  ).toBeInTheDocument();
}

describe("BeritaNewsList", () => {
  it("keeps the five posts on two pages", () => {
    expect(posts).toHaveLength(5);
    expect(posts.map((post) => post.photoCount)).toEqual([1, 4, 3, 4, 4]);
    expect(totalNewsPages(posts)).toBe(2);
    expect(getNewsPage(posts, 1).map((post) => post.slug)).toEqual([
      "explore-kipk-2026",
      "pelatihan-divisi-kif",
      "busamakip",
    ]);
    expect(getNewsPage(posts, 2).map((post) => post.slug)).toEqual([
      "verifikasi-kipk-snbp",
      "gelar-kipk",
    ]);
  });

  it("renders page 1 with supplied dates, image labels and paragraphs", () => {
    renderPage(1);

    for (const title of [
      "Explore KIPK 2026",
      "Pelatihan Divisi KIF",
      "BUSAMAKIP",
    ]) {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    }

    expect(
      screen.getByText("Diupload pada: 18 Februari 2026"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Diupload pada: 22 Februari 2026"),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Diupload pada:/)).toHaveLength(2);

    expectPlaceholder("Dokumentasi sosialisasi Explore KIPK 2026.");
    expectPlaceholder("Dokumentasi Pelatihan Divisi KIF 2026.");
    expectPlaceholder(
      "Dokumentasi buka puasa bersama mahasiswa KIP Kuliah UNJ.",
    );
    expect(screen.getAllByRole("img")).toHaveLength(3);

    expect(
      screen.getByText(
        /Pada 12 Februari 2026, FORKIP UNJ menyelenggarakan Explore KIPK 2026/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Peserta mendapat penjelasan mengenai cara mendaftar/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/FORKIP UNJ mengadakan Pelatihan Divisi KIF pada/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Pada 5 Maret 2026, FORKIP UNJ menggelar BUSAMAKIP/),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Menyusul/)).not.toBeInTheDocument();
    expect(screen.queryByText(/^\d+ Foto$/)).not.toBeInTheDocument();
    expect(screen.queryByText(/· Foto/)).not.toBeInTheDocument();
  });

  it("renders BUSAMAKIP without an upload date and links its card to the article", () => {
    renderPage(1);

    const card = screen.getByTestId("news-card-busamakip");
    expect(within(card).queryByText(/Diupload pada:/)).not.toBeInTheDocument();
    expect(card).toHaveAttribute("href", "/berita/busamakip");
    expect(
      within(card).getByRole("img", {
        name: "Foto Dokumentasi buka puasa bersama mahasiswa KIP Kuliah UNJ. (placeholder)",
      }),
    ).toBeInTheDocument();
    expect(within(card).queryAllByRole("button")).toHaveLength(0);
    expect(within(card).queryByText(/Foto/)).not.toBeInTheDocument();
  });

  it("renders pagination text and ?halaman=2 links", () => {
    renderPage(1);

    expect(
      screen.getByText(/Total 5 berita dipublikasikan/),
    ).toBeInTheDocument();

    const pageTwoLink = screen.getByRole("link", { name: "Halaman 2" });
    expect(pageTwoLink).toHaveAttribute("href", "/berita?halaman=2");
    expect(
      screen.getByRole("link", { name: "Halaman berikutnya" }),
    ).toHaveAttribute("href", "/berita?halaman=2");
  });

  it("renders page 2 with the April date and no date for Gelar KIPK", () => {
    renderPage(2);

    expect(
      screen.getByRole("heading", { name: "Verifikasi KIPK SNBP" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Gelar KIPK" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Diupload pada: 8 April 2026")).toBeInTheDocument();
    expect(screen.getAllByText(/Diupload pada:/)).toHaveLength(1);

    expectPlaceholder(
      "Dokumentasi verifikasi berkas KIP Kuliah jalur SNBP 2026.",
    );
    expectPlaceholder("Dokumentasi Gelar KIPK 2026.");
    expect(screen.getAllByRole("img")).toHaveLength(2);

    expect(
      screen.getByText(
        /Pengelola KIP Kuliah UNJ melaksanakan verifikasi berkas calon penerima KIP Kuliah/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Pada 4 April 2026, FORKIP UNJ menyelenggarakan Gelar KIPK/,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("news-card-verifikasi-kipk-snbp"),
    ).toHaveAttribute("href", "/berita/verifikasi-kipk-snbp");
    const gelar = screen.getByTestId("news-card-gelar-kipk");
    expect(gelar).toHaveAttribute("href", "/berita/gelar-kipk");
    expect(within(gelar).queryByText(/Diupload pada:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Menyusul/)).not.toBeInTheDocument();
    expect(screen.queryByText(/^\d+ Foto$/)).not.toBeInTheDocument();
    expect(screen.queryByText(/· Foto/)).not.toBeInTheDocument();
  });
});
