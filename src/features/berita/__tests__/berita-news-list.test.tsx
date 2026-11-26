import { cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { BeritaNewsList, getNewsPage, newsPosts } from "@/features/berita";
import { renderWithProviders, screen, within } from "@/testing/test-utils";

afterEach(cleanup);

function renderPage(page: number) {
  renderWithProviders(
    <BeritaNewsList page={page} totalPages={2} posts={getNewsPage(page)} />,
  );
}

describe("BeritaNewsList", () => {
  it("keeps the five posts on two pages as normal news cards", () => {
    expect(newsPosts).toHaveLength(5);
    expect(newsPosts.every((post) => post.mediaOnly === false)).toBe(true);
    expect(getNewsPage(1).map((post) => post.slug)).toEqual([
      "explore-kipk-2026",
      "pelatihan-divisi-kif",
      "busamakip",
    ]);
    expect(getNewsPage(2).map((post) => post.slug)).toEqual([
      "verifikasi-kipk-snbp",
      "gelar-kipk",
    ]);
  });

  it("renders page 1 with supplied dates, counts, captions and paragraphs", () => {
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
    expect(screen.getByText("1 Foto")).toBeInTheDocument();
    expect(screen.getByText("4 Foto")).toBeInTheDocument();
    expect(screen.getByText("3 Foto")).toBeInTheDocument();

    expect(
      screen.getByText("Dokumentasi sosialisasi Explore KIPK 2026."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Dokumentasi Pelatihan Divisi KIF 2026."),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Dokumentasi buka puasa bersama mahasiswa KIP Kuliah UNJ.",
      ),
    ).toBeInTheDocument();
    // The client left the gallery badge blank: fall back to a photo counter.
    expect(screen.getByText("01 / 01 · Foto")).toBeInTheDocument();
    expect(screen.getByText("01 / 04 · Foto")).toBeInTheDocument();
    expect(screen.getByText("01 / 03 · Foto")).toBeInTheDocument();

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
  });

  it("renders BUSAMAKIP as a three-photo card without an upload date", () => {
    renderPage(1);

    const card = screen.getByTestId("news-card-busamakip");
    expect(
      screen.queryByTestId("news-media-only-card"),
    ).not.toBeInTheDocument();
    expect(within(card).queryByText(/Diupload pada:/)).not.toBeInTheDocument();
    expect(within(card).getByText("3 Foto")).toBeInTheDocument();
    expect(
      within(card).getAllByRole("button", { name: /Lihat foto/ }),
    ).toHaveLength(3);
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
    expect(screen.getAllByText("4 Foto")).toHaveLength(2);

    expect(
      screen.getByText(
        "Dokumentasi verifikasi berkas KIP Kuliah jalur SNBP 2026.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Dokumentasi Gelar KIPK 2026."),
    ).toBeInTheDocument();

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

    const gelar = screen.getByTestId("news-card-gelar-kipk");
    expect(within(gelar).queryByText(/Diupload pada:/)).not.toBeInTheDocument();
    expect(
      within(gelar).getAllByRole("button", { name: /Lihat foto/ }),
    ).toHaveLength(4);
    expect(screen.queryByText(/Menyusul/)).not.toBeInTheDocument();
  });
});
