import { expect, test } from "@playwright/test";

test.describe("Berita detail page", () => {
  test("renders Explore KIPK 2026 with breadcrumb, date and single photo", async ({
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
      page.getByText(/18 Februari 2026 · \d+ menit baca/),
    ).toBeVisible();

    // The lead sentence is also the subtitle; .last() targets the body paragraph.
    await expect(
      page
        .getByText(
          /Pada 12 Februari 2026, FORKIP UNJ menyelenggarakan Explore KIPK 2026/,
        )
        .last(),
    ).toBeVisible();
    await expect(page.getByTestId("article-hero-media")).toBeVisible();
    await expect(page.getByText("01 / 01 · Foto")).toBeVisible();
    await expect(
      page.getByText("Dokumentasi sosialisasi Explore KIPK 2026."),
    ).toBeVisible();
    await expect(page.getByTestId("article-figure-2")).toHaveCount(0);
    await expect(page.getByText("Kembali ke Berita")).toBeVisible();
    await expect(page.getByTestId("article-back-link")).toHaveAttribute(
      "href",
      "/berita",
    );
  });

  test("renders Verifikasi KIPK SNBP with the April date and four photos", async ({
    page,
  }) => {
    await page.goto("/berita/verifikasi-kipk-snbp");

    await expect(
      page.getByRole("heading", { level: 1, name: "Verifikasi KIPK SNBP" }),
    ).toBeVisible();
    await expect(
      page
        .getByTestId("article-header")
        .getByText(/Pengelola KIP Kuliah UNJ melaksanakan verifikasi berkas/),
    ).toBeVisible();
    await expect(page.getByText(/8 April 2026 · \d+ menit baca/)).toBeVisible();
    await expect(page.getByText("01 / 04 · Foto")).toBeVisible();
    await expect(page.getByTestId("article-figure-4")).toBeVisible();
  });

  test("hides the date for BUSAMAKIP until one is official", async ({
    page,
  }) => {
    await page.goto("/berita/busamakip");

    await expect(
      page.getByRole("heading", { level: 1, name: "BUSAMAKIP" }),
    ).toBeVisible();
    const header = page.getByTestId("article-header");
    await expect(header.getByText(/Menyusul|Februari|April/)).toHaveCount(0);
    await expect(header.getByText(/^\d+ menit baca$/)).toBeVisible();
    await expect(page.getByText("01 / 03 · Foto")).toBeVisible();
    await expect(
      page.getByText(
        "Dokumentasi buka puasa bersama mahasiswa KIP Kuliah UNJ.",
      ),
    ).toBeVisible();
    await expect(page.getByTestId("article-figure-3")).toBeVisible();
  });

  test("renders Gelar KIPK with its gallery and no placeholder date", async ({
    page,
  }) => {
    await page.goto("/berita/gelar-kipk");

    await expect(
      page.getByRole("heading", { level: 1, name: "Gelar KIPK" }),
    ).toBeVisible();
    await expect(
      page.getByTestId("article-header").getByText(/Menyusul/),
    ).toHaveCount(0);
    await expect(page.getByTestId("article-hero-media")).toBeVisible();
    await expect(page.getByText("01 / 04 · Foto")).toBeVisible();
    await expect(page.getByText("Dokumentasi Gelar KIPK 2026.")).toBeVisible();
    await expect(page.getByTestId("article-figure-4")).toBeVisible();
  });

  test("unknown slug renders the 404 boundary", async ({ page }) => {
    const response = await page.goto("/berita/tidak-ada");
    // With cacheComponents the response may stream before notFound() throws,
    // so the status can be 200 while the not-found UI still renders (noindex).
    expect([200, 404]).toContain(response?.status());
    await expect(page.getByText("Page not found")).toBeVisible();
  });
});
