import { expect, test } from "@playwright/test";

test.describe("Non Program Kerja page", () => {
  test("loads with header, hero, file row, and footer", async ({ page }) => {
    await page.goto("/non-program-kerja");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Non Program Kerja Forkip UNJ 2026",
      }),
    ).toBeVisible();
    await expect(
      page
        .getByRole("navigation", { name: "Breadcrumb" })
        .getByText("Non Program Kerja", { exact: true }),
    ).toBeVisible();
    const banner = page.getByRole("banner");
    await banner.getByRole("button", { name: "Organisasi" }).click();
    await expect(
      banner.getByRole("link", { name: /^Non Program Kerja/ }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "AD ART FORUM KIP-KULIAH UNJ.pdf" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Pelatihan Anggota KIF" }),
    ).toBeVisible();
    await expect(
      page.getByText("© 2026 Forum KIP-K Universitas Negeri Jakarta"),
    ).toBeVisible();
  });

  test("renders 3 cards with Arsip and Laporan buttons", async ({ page }) => {
    await page.goto("/non-program-kerja");

    await expect(page.getByRole("article")).toHaveCount(3);
    await expect(
      page.getByRole("link", { name: "Arsip Kegiatan" }),
    ).toHaveCount(3);
    await expect(
      page.getByRole("link", { name: "Laporan Non Program Kerja" }),
    ).toHaveCount(3);
    await expect(
      page.getByRole("heading", { name: "KANTIN (Kumpul Rutin)" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Diskusi Birokrat" }),
    ).toBeVisible();
  });
});
