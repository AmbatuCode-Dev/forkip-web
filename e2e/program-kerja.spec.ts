import { expect, test } from "@playwright/test";

test.describe("Program Kerja page", () => {
  test("loads with header, hero, file row, and footer", async ({ page }) => {
    await page.goto("/program-kerja");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Program Kerja Forkip UNJ 2026",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("banner").getByRole("link", { name: "Program Kerja" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "AD ART FORUM KIP-KULIAH UNJ.pdf" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Explore KIP-Kuliah" }),
    ).toBeVisible();
    await expect(
      page.getByText("© 2026 Forum KIP-K Universitas Negeri Jakarta"),
    ).toBeVisible();
  });

  test("renders 5 cards with the specified button layout", async ({ page }) => {
    await page.goto("/program-kerja");

    await expect(page.getByRole("article")).toHaveCount(5);
    await expect(
      page.getByRole("link", { name: "Arsip Kegiatan" }),
    ).toHaveCount(3);
    await expect(
      page.getByRole("link", { name: "Laporan Program Kerja" }),
    ).toHaveCount(5);

    const snbt = page.getByRole("article").filter({
      has: page.getByRole("heading", { name: "Verif Akademik SNBT" }),
    });
    await expect(
      snbt.getByRole("link", { name: "Arsip Kegiatan" }),
    ).toHaveCount(0);
    await expect(
      snbt.getByRole("link", { name: "Laporan Program Kerja" }),
    ).toBeVisible();
  });
});
