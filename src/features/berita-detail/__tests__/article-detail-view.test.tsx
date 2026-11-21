import { cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { newsPosts } from "@/features/berita";
import { renderWithProviders, screen, within } from "@/testing/test-utils";
import { ArticleDetailView } from "../components/article-detail-view";
import { toArticleDetailContent } from "../data";

afterEach(cleanup);

const explore = newsPosts.find((post) => post.slug === "explore-kipk-2026");

function renderExplore() {
  if (!explore) {
    throw new Error("explore-kipk-2026 post missing from newsPosts");
  }
  renderWithProviders(
    <ArticleDetailView article={toArticleDetailContent(explore)} />,
  );
}

describe("ArticleDetailView", () => {
  it("renders breadcrumb with Beranda, Berita, and the post title", () => {
    renderExplore();

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

  it("renders the Berita tag pill, H1, subtitle, and meta row", () => {
    renderExplore();

    const tagPill = within(screen.getByTestId("article-header")).getByText(
      "Berita",
      { exact: true },
    );
    expect(tagPill).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Explore KIPK 2026" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Program sosialisasi FORUM KIP-K UNJ untuk memperluas akses informasi KIP-K bagi siswa di Jakarta dan sekitarnya.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Humas Forkip UNJ")).toBeInTheDocument();
    expect(
      screen.getByText(/Rabu 18 Februari 2026 · \d+ menit baca/),
    ).toBeInTheDocument();
  });

  it("renders the hero media block with badge and caption", () => {
    renderExplore();

    expect(screen.getByTestId("article-hero-media")).toBeInTheDocument();
    expect(screen.getByText("01 / 04 · Dokumentasi")).toBeInTheDocument();
    expect(
      screen.getByText("Sesi pembukaan & sosialisasi program KIP-K UNJ"),
    ).toBeInTheDocument();
  });

  it("renders every verbatim paragraph and inline figures", () => {
    renderExplore();

    expect(
      screen.getByText(
        /Pada tanggal 12 Februari 2026, Explore KIPK 2026 merupakan program sosialisasi/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Melalui kegiatan ini, FORUM KIP-K UNJ memberikan penjelasan mengenai mekanisme pendaftaran/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Explore KIPK 2026 diharapkan menjadi jembatan informasi antara mahasiswa/,
      ),
    ).toBeInTheDocument();

    const paragraphs = explore?.paragraphs.length ?? 0;
    expect(screen.getAllByRole("paragraph").length).toBeGreaterThanOrEqual(
      paragraphs,
    );
    expect(screen.getByTestId("article-figure-2")).toBeInTheDocument();
    expect(screen.getByText("02 / 04 · Dokumentasi")).toBeInTheDocument();
    expect(screen.getByText("03 / 04 · Dokumentasi")).toBeInTheDocument();
    expect(screen.getByText("04 / 04 · Dokumentasi")).toBeInTheDocument();
  });

  it("links Kembali ke Berita to /berita", () => {
    renderExplore();

    expect(screen.getByTestId("article-back-link")).toHaveAttribute(
      "href",
      "/berita",
    );
    expect(screen.getByText("Kembali ke Berita")).toBeInTheDocument();
  });

  it("omits the hero media block for posts without photos", () => {
    const gelar = newsPosts.find((post) => post.slug === "gelar-kipk");
    if (!gelar) {
      throw new Error("gelar-kipk post missing from newsPosts");
    }
    renderWithProviders(
      <ArticleDetailView article={toArticleDetailContent(gelar)} />,
    );

    expect(screen.queryByTestId("article-hero-media")).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Gelar KIPK" }),
    ).toBeInTheDocument();
  });
});

describe("getArticleDetail", () => {
  it("returns content for a known slug and undefined for unknown slugs", () => {
    expect(toArticleDetailContent(explore ?? newsPosts[0]).slug).toBe(
      "explore-kipk-2026",
    );
  });
});
