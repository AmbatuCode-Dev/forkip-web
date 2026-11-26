import { expect, test } from "@playwright/test";

test.describe("Berita page", () => {
  test("renders hero, supplied page 1 cards, and pagination", async ({
    page,
  }) => {
    await page.goto("/berita");

    await expect(
      page.getByRole("heading", { level: 1, name: "Berita" }),
    ).toBeVisible();

    for (const title of [
      "Explore KIPK 2026",
      "Pelatihan Divisi KIF",
      "BUSAMAKIP",
    ]) {
      await expect(page.getByRole("heading", { name: title })).toBeVisible();
    }

    const explore = page.getByTestId("news-card-explore-kipk-2026");
    await expect(explore).toHaveAttribute("href", "/berita/explore-kipk-2026");
    await expect(
      explore.getByText("Diupload pada: 18 Februari 2026"),
    ).toBeVisible();
    await expect(
      explore.getByRole("img", {
        name: "Foto Dokumentasi sosialisasi Explore KIPK 2026. (placeholder)",
      }),
    ).toBeVisible();

    const pelatihan = page.getByTestId("news-card-pelatihan-divisi-kif");
    await expect(pelatihan).toHaveAttribute(
      "href",
      "/berita/pelatihan-divisi-kif",
    );
    await expect(
      pelatihan.getByText("Diupload pada: 22 Februari 2026"),
    ).toBeVisible();
    await expect(
      pelatihan.getByRole("img", {
        name: "Foto Dokumentasi Pelatihan Divisi KIF 2026. (placeholder)",
      }),
    ).toBeVisible();

    const busamakip = page.getByTestId("news-card-busamakip");
    await expect(busamakip).toHaveAttribute("href", "/berita/busamakip");
    await expect(busamakip.getByText(/Diupload pada:/)).toHaveCount(0);
    await expect(
      busamakip.getByRole("img", {
        name: "Foto Dokumentasi buka puasa bersama mahasiswa KIP Kuliah UNJ. (placeholder)",
      }),
    ).toBeVisible();

    await expect(
      page.locator('[data-testid^="news-card-"]').getByRole("button"),
    ).toHaveCount(0);
    await expect(page.getByText(/^\d+ Foto$/)).toHaveCount(0);
    await expect(page.getByText(/· Foto/)).toHaveCount(0);
    await expect(page.getByText(/Menyusul/)).toHaveCount(0);

    await expect(page.getByText(/Total 5 berita dipublikasikan/)).toBeVisible();
    await expect(page.getByRole("link", { name: "Halaman 2" })).toBeVisible();
  });

  test("clicking a card navigates to its article", async ({ page }) => {
    await page.goto("/berita");

    await page.getByTestId("news-card-explore-kipk-2026").click();

    await expect(page).toHaveURL(/\/berita\/explore-kipk-2026$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Explore KIPK 2026" }),
    ).toBeVisible();
  });

  test("renders page 2 via ?halaman=2 with supplied cards", async ({
    page,
  }) => {
    await page.goto("/berita?halaman=2");

    await expect(
      page.getByRole("heading", { name: "Verifikasi KIPK SNBP" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Gelar KIPK" }),
    ).toBeVisible();

    const snbp = page.getByTestId("news-card-verifikasi-kipk-snbp");
    await expect(snbp).toHaveAttribute("href", "/berita/verifikasi-kipk-snbp");
    await expect(snbp.getByText("Diupload pada: 8 April 2026")).toBeVisible();
    await expect(
      snbp.getByRole("img", {
        name: "Foto Dokumentasi verifikasi berkas KIP Kuliah jalur SNBP 2026. (placeholder)",
      }),
    ).toBeVisible();
    await expect(
      snbp.getByText(/Pengelola KIP Kuliah UNJ melaksanakan verifikasi berkas/),
    ).toBeVisible();

    const gelar = page.getByTestId("news-card-gelar-kipk");
    await expect(gelar).toHaveAttribute("href", "/berita/gelar-kipk");
    await expect(gelar.getByText(/Diupload pada:/)).toHaveCount(0);
    await expect(
      gelar.getByRole("img", {
        name: "Foto Dokumentasi Gelar KIPK 2026. (placeholder)",
      }),
    ).toBeVisible();
    await expect(page.getByText(/Menyusul/)).toHaveCount(0);
    await expect(page.getByText(/^\d+ Foto$/)).toHaveCount(0);
    await expect(page.getByText(/· Foto/)).toHaveCount(0);

    await expect(page.getByText(/Total 5 berita dipublikasikan/)).toBeVisible();
    await expect(
      page.getByText("Halaman 2 dari 2", { exact: true }),
    ).toBeVisible();
  });
});
