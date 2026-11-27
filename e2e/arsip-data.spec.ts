import { expect, test } from "@playwright/test";

test.describe("Arsip data page", () => {
  test("loads with header, hero, direktori, and footer", async ({ page }) => {
    await page.goto("/arsip-data");

    await expect(
      page.getByRole("heading", { level: 1, name: "Arsip data" }),
    ).toBeVisible();
    await expect(
      page
        .getByRole("banner")
        .getByRole("link", { name: "Pertanyaan & Pengaduan" }),
    ).toBeVisible();
    await expect(page.getByText("DIREKTORI DIVISI")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Temukan arsip berdasarkan divisi." }),
    ).toBeVisible();
    await expect(page.getByText("KETUM/WAKETUM")).toBeVisible();
    await expect(
      page.getByText("© 2026 Forum KIP-K Universitas Negeri Jakarta"),
    ).toBeVisible();
  });

  test("renders 7 division rows with folder links", async ({ page }) => {
    await page.goto("/arsip-data");

    const links = page.getByRole("link", { name: "Buka folder" });
    await expect(links).toHaveCount(7);
    await expect(page.getByText("SEKRETARIS")).toBeVisible();
  });
});
