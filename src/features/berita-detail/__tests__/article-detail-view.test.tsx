import { cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { newsPosts } from "@/features/berita";
import { renderWithProviders, screen, within } from "@/testing/test-utils";
import { ArticleDetailView } from "../components/article-detail-view";
import { toArticleDetailContent } from "../data";

afterEach(cleanup);

function postBySlug(slug: string) {
  const post = newsPosts.find((candidate) => candidate.slug === slug);
  if (!post) {
    throw new Error(`${slug} post missing from newsPosts`);
  }
  return post;
}

function renderArticle(slug: string) {
  renderWithProviders(
    <ArticleDetailView article={toArticleDetailContent(postBySlug(slug))} />,
  );
}

describe("ArticleDetailView", () => {
  it("renders breadcrumb with Beranda, Berita, and the post title", () => {
    renderArticle("explore-kipk-2026");

    const breadcrumb = screen.getByRole("navigation", {
      name: "Breadcrumb",
    });
    expect(
      within(breadcrumb).getByRole("link", { name: "Beranda" }),
    ).toHaveAttribute("href", "/");
    expect(
      within(breadcrumb).getByRole("link", { name: "Berita" }),
    ).toHaveAttribute("href", "/berita");
    expect(within(breadcrumb).getByText("Explore KIPK 2026")).toBeVisible();
  });

  it("renders the Berita tag pill, H1, derived subtitle, and dated meta row", () => {
    renderArticle("explore-kipk-2026");

    const header = screen.getByTestId("article-header");
    expect(
      within(header).getByText("Berita", { exact: true }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Explore KIPK 2026" }),
    ).toBeInTheDocument();
    const explore = postBySlug("explore-kipk-2026");
    expect(within(header).getByText(explore.paragraphs[0])).toBeInTheDocument();
    expect(screen.getByText("Humas Forkip UNJ")).toBeInTheDocument();
    expect(
      screen.getByText(/18 Februari 2026 · \d+ menit baca/),
    ).toBeInTheDocument();
  });

  it("renders the single-photo hero with fallback badge and supplied caption", () => {
    renderArticle("explore-kipk-2026");

    expect(screen.getByTestId("article-hero-media")).toBeInTheDocument();
    expect(screen.getByText("01 / 01 · Foto")).toBeInTheDocument();
    expect(
      screen.getByText("Dokumentasi sosialisasi Explore KIPK 2026."),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("article-figure-2")).not.toBeInTheDocument();
  });

  it("renders every supplied paragraph and one figure per extra photo", () => {
    renderArticle("pelatihan-divisi-kif");

    expect(
      screen.getByText(
        /FORKIP UNJ mengadakan Pelatihan Divisi KIF pada 21 Februari 2026. Kegiatan ini membekali staf/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Peserta mempelajari cara menyampaikan informasi/),
    ).toBeInTheDocument();

    const pelatihan = postBySlug("pelatihan-divisi-kif");
    expect(screen.getAllByRole("paragraph").length).toBeGreaterThanOrEqual(
      pelatihan.paragraphs.length,
    );
    expect(screen.getByTestId("article-figure-2")).toBeInTheDocument();
    expect(screen.getByTestId("article-figure-4")).toBeInTheDocument();
    expect(screen.getByText("02 / 04 · Foto")).toBeInTheDocument();
    expect(screen.getByText("04 / 04 · Foto")).toBeInTheDocument();
  });

  it("omits the date but still shows the read time for pending posts", () => {
    renderArticle("busamakip");

    const header = screen.getByTestId("article-header");
    expect(within(header).queryByText(/Menyusul/)).not.toBeInTheDocument();
    expect(
      within(header).queryByText(/Februari|April/),
    ).not.toBeInTheDocument();
    expect(within(header).getByText(/^\d+ menit baca$/)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Pada 5 Maret 2026, FORKIP UNJ menggelar BUSAMAKIP, kegiatan buka puasa bersama mahasiswa penerima KIP Kuliah. Acara berlangsung/,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("01 / 03 · Foto")).toBeInTheDocument();
    expect(screen.getByTestId("article-figure-3")).toBeInTheDocument();
    expect(screen.queryByTestId("article-figure-4")).not.toBeInTheDocument();
  });

  it("renders Gelar KIPK with its gallery and no placeholder date", () => {
    renderArticle("gelar-kipk");

    expect(
      screen.getByRole("heading", { level: 1, name: "Gelar KIPK" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("article-hero-media")).toBeInTheDocument();
    expect(screen.getByText("01 / 04 · Foto")).toBeInTheDocument();
    expect(
      screen.getByText("Dokumentasi Gelar KIPK 2026."),
    ).toBeInTheDocument();
    expect(screen.getByTestId("article-figure-4")).toBeInTheDocument();
    expect(screen.queryByText(/Menyusul/)).not.toBeInTheDocument();
  });

  it("links Kembali ke Berita to /berita", () => {
    renderArticle("verifikasi-kipk-snbp");

    expect(screen.getByTestId("article-back-link")).toHaveAttribute(
      "href",
      "/berita",
    );
    expect(screen.getByText("Kembali ke Berita")).toBeInTheDocument();
    expect(
      screen.getByText(/8 April 2026 · \d+ menit baca/),
    ).toBeInTheDocument();
  });
});
