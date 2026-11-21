import { expect, test } from "@playwright/test";

test.describe("Berita detail page", () => {
  test("renders Explore KIPK 2026 article with breadcrumb and meta", async ({
    page,
  }) => {
    await page.goto("/berita/explore-kipk-2026");

    const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
    await expect(
      breadcrumb.getByRole("link", { name: "Beranda" }),
    ).toBeVisible();
    await expect(
      breadcrumb.getByRole("link", { name: "Berita" }),
    ).toBeVisible();
    await expect(breadcrumb.getByText("Explore KIPK 2026")).toBeVisible();

    await expect(
      page.getByRole("heading", { level: 1, name: "Explore KIPK 2026" }),
    ).toBeVisible();
    await expect(page.getByText("Humas Forkip UNJ")).toBeVisible();
    await expect(
      page.getByText(/Rabu 18 Februari 2026 · \d+ menit baca/),
    ).toBeVisible();

    await expect(
      page.getByText(
        /Pada tanggal 12 Februari 2026, Explore KIPK 2026 merupakan program sosialisasi/,
      ),
    ).toBeVisible();
    await expect(page.getByTestId("article-hero-media")).toBeVisible();
    await expect(page.getByText("Kembali ke Berita")).toBeVisible();
    await expect(page.getByTestId("article-back-link")).toHaveAttribute(
      "href",
      "/berita",
    );
  });

  test("renders a second post (Verifikasi KIPK SNBP)", async ({ page }) => {
    await page.goto("/berita/verifikasi-kipk-snbp");

    await expect(
      page.getByRole("heading", { level: 1, name: "Verifikasi KIPK SNBP" }),
    ).toBeVisible();
    await expect(
      page
        .getByTestId("article-header")
        .getByText(/Pengelola KIPK Universitas Negeri Jakarta \(UNJ\)/),
    ).toBeVisible();
    await expect(
      page.getByText(/Rabu 08 April 2026 · \d+ menit baca/),
    ).toBeVisible();
  });

  test("unknown slug renders the 404 boundary", async ({ page }) => {
    const response = await page.goto("/berita/tidak-ada");
    // With cacheComponents the response may stream before notFound() throws,
    // so the status can be 200 while the not-found UI still renders (noindex).
    expect([200, 404]).toContain(response?.status());
    await expect(page.getByText("Page not found")).toBeVisible();
  });
});
