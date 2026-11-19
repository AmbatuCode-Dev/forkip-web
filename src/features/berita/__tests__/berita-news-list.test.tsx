import { cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { BeritaNewsList, getNewsPage } from "@/features/berita";
import { renderWithProviders, screen, within } from "@/testing/test-utils";

afterEach(cleanup);

describe("BeritaNewsList", () => {
  it("renders page 1 cards with verbatim titles, dates, and photo counts", () => {
    renderWithProviders(
      <BeritaNewsList page={1} totalPages={2} posts={getNewsPage(1)} />,
    );

    expect(
      screen.getByRole("heading", { name: "Explore KIPK 2026" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Pelatihan Divisi KIF" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "BUSAMAKIP" }),
    ).toBeInTheDocument();

    expect(screen.getByText(/Rabu 18 Februari 2026/)).toBeInTheDocument();
    expect(screen.getByText(/Minggu 22 Februari 2026/)).toBeInTheDocument();
    expect(screen.getByText(/Sabtu 14 Februari 2026/)).toBeInTheDocument();
    expect(screen.getByText("4 Foto")).toBeInTheDocument();
    expect(screen.getByText("3 Foto")).toBeInTheDocument();

    expect(
      screen.getByText(
        /Explore KIPK 2026 merupakan program sosialisasi yang diselenggarakan oleh FORUM KIP-K UNJ/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Pelatihan Divisi KIF \(Koordinator Integrasi Fakultas\) FORUM KIP-K UNJ 2026/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Pada Kamis, 5 Maret 2026, FORUM KIP-K UNJ sukses/),
    ).toBeInTheDocument();
  });

  it("renders BUSAMAKIP as a media-only card without thumbnails", () => {
    renderWithProviders(
      <BeritaNewsList page={1} totalPages={2} posts={getNewsPage(1)} />,
    );

    expect(screen.getByTestId("news-media-only-card")).toBeInTheDocument();
    expect(screen.queryByText("0 Foto")).not.toBeInTheDocument();
  });

  it("renders pagination text and ?halaman=2 links", () => {
    renderWithProviders(
      <BeritaNewsList page={1} totalPages={2} posts={getNewsPage(1)} />,
    );

    expect(
      screen.getByText(/Total 5 berita dipublikasikan/),
    ).toBeInTheDocument();

    const pageTwoLink = screen.getByRole("link", { name: "Halaman 2" });
    expect(pageTwoLink).toHaveAttribute("href", "/berita?halaman=2");
    expect(
      screen.getByRole("link", { name: "Halaman berikutnya" }),
    ).toHaveAttribute("href", "/berita?halaman=2");
  });

  it("renders page 2 stub cards marked TODO", () => {
    renderWithProviders(
      <BeritaNewsList page={2} totalPages={2} posts={getNewsPage(2)} />,
    );

    expect(
      screen.getByRole("heading", { name: "Verifikasi KIPK SNBP" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Gelar KIPK" }),
    ).toBeInTheDocument();

    const firstCard = screen.getByTestId("news-card-verifikasi-kipk-snbp");
    expect(within(firstCard).getByText(/TODO/)).toBeInTheDocument();
  });
});
