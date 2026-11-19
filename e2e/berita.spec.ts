import { expect, test } from "@playwright/test";

test.describe("Berita page", () => {
  test("renders hero, page 1 cards, and pagination", async ({ page }) => {
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

    await expect(page.getByText(/Total 5 berita dipublikasikan/)).toBeVisible();
    await expect(page.getByRole("link", { name: "Halaman 2" })).toBeVisible();
  });

  test("renders page 2 via ?halaman=2 with transcribed cards", async ({
    page,
  }) => {
    await page.goto("/berita?halaman=2");

    await expect(
      page.getByRole("heading", { name: "Verifikasi KIPK SNBP" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Gelar KIPK" }),
    ).toBeVisible();
    await expect(page.getByText(/Total 5 berita dipublikasikan/)).toBeVisible();
    await expect(
      page.getByText("Halaman 2 dari 2", { exact: true }),
    ).toBeVisible();
  });
});
