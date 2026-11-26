import { cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { type NewsPost, newsPosts } from "@/features/berita";
import { renderWithProviders, screen, within } from "@/testing/test-utils";
import { BeritaNewsCard } from "../components/berita-news-card";

afterEach(cleanup);

function postBySlug(slug: string): NewsPost {
  const post = newsPosts.find((candidate) => candidate.slug === slug);
  if (!post) {
    throw new Error(`Missing news post: ${slug}`);
  }
  return post;
}

function renderCard(post: NewsPost) {
  renderWithProviders(<BeritaNewsCard post={post} />);
  return screen.getByTestId(`news-card-${post.slug}`);
}

describe("BeritaNewsCard", () => {
  it("renders exactly one placeholder image labelled with the supplied caption", () => {
    for (const post of newsPosts) {
      cleanup();
      const card = renderCard(post);
      const images = within(card).getAllByRole("img");
      const label = post.gallery?.caption ?? post.title;

      expect(images).toHaveLength(1);
      expect(images[0]).toHaveAttribute("alt", `Foto ${label} (placeholder)`);
    }
  });

  it("links the whole card to its article with a single focus target", () => {
    for (const post of newsPosts) {
      cleanup();
      const card = renderCard(post);

      expect(card).toHaveAttribute("href", `/berita/${post.slug}`);
      expect(screen.getAllByRole("link")).toHaveLength(1);
      expect(within(card).queryAllByRole("button")).toHaveLength(0);
    }
  });

  it("shows the upload date directly under the title only when supplied", () => {
    for (const slug of [
      "explore-kipk-2026",
      "pelatihan-divisi-kif",
      "verifikasi-kipk-snbp",
    ]) {
      cleanup();
      const post = postBySlug(slug);
      const card = renderCard(post);
      const title = within(card).getByRole("heading", { name: post.title });

      expect(title.nextElementSibling).toHaveTextContent(
        `Diupload pada: ${post.uploadedLabel}`,
      );
      expect(title.nextElementSibling).toHaveClass(
        "text-xs",
        "text-body-muted",
      );
    }

    for (const slug of ["busamakip", "gelar-kipk"]) {
      cleanup();
      const post = postBySlug(slug);
      const card = renderCard(post);
      const title = within(card).getByRole("heading", { name: post.title });

      expect(title.nextElementSibling).toBeNull();
      expect(
        within(card).queryByText(/Diupload pada:/),
      ).not.toBeInTheDocument();
    }
  });

  it("uses one title size across cards and drops carousel-era text", () => {
    const explore = renderCard(postBySlug("explore-kipk-2026"));
    expect(within(explore).getByRole("heading")).toHaveClass("text-3xl");
    expect(within(explore).queryByText(/^\d+ Foto$/)).not.toBeInTheDocument();
    expect(within(explore).queryByText(/· Foto/)).not.toBeInTheDocument();
    expect(
      within(explore).queryByLabelText(/Lihat foto/),
    ).not.toBeInTheDocument();

    cleanup();

    const other = renderCard(postBySlug("pelatihan-divisi-kif"));
    expect(within(other).getByRole("heading")).toHaveClass("text-3xl");
    expect(within(other).queryByText(/^\d+ Foto$/)).not.toBeInTheDocument();
    expect(within(other).queryByText(/· Foto/)).not.toBeInTheDocument();
    expect(within(other).queryByTestId("news-stage")).not.toBeInTheDocument();
    expect(within(other).queryByText(/Menyusul/)).not.toBeInTheDocument();
  });
});
