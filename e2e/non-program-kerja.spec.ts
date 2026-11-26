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
      page.getByText(
        "Daftar kegiatan di luar program kerja 2026 disusun berdasarkan Anggaran Dasar dan Anggaran Rumah Tangga (AD/ART) Forum KIP-K Universitas Negeri Jakarta.",
      ),
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
      page.getByText("AD ART FORUM KIP-KULIAH UNJ.pdf"),
    ).toBeVisible();
    await expect(
      page.getByRole("link", {
        name: "AD ART FORUM KIP-KULIAH UNJ.pdf",
        exact: true,
      }),
    ).toHaveCount(0);
    await expect(
      page.getByRole("heading", { name: "Pelatihan Anggota KIF" }),
    ).toBeVisible();
    await expect(
      page.getByText("© 2026 Forum KIP-K Universitas Negeri Jakarta"),
    ).toBeVisible();
  });

  test("renders 3 cards with the supplied body and no placeholder action links", async ({
    page,
  }) => {
    await page.goto("/non-program-kerja");

    await expect(page.getByRole("article")).toHaveCount(3);
    await expect(
      page.getByRole("link", { name: "Arsip Kegiatan", exact: true }),
    ).toHaveCount(0);
    await expect(
      page.getByRole("link", {
        name: "Laporan Non Program Kerja",
        exact: true,
      }),
    ).toHaveCount(0);

    await expect(
      page.getByText(
        "Pelatihan ini membekali staf KIF dengan pemahaman tentang tanggung jawab mereka sebagai penghubung informasi di tingkat fakultas. Peserta mempelajari alur koordinasi untuk menyampaikan informasi, menghimpun aspirasi, dan menindaklanjuti kendala mahasiswa.",
      ),
    ).toBeVisible();

    for (const title of ["KANTIN (Kumpul Rutin)", "Diskusi Birokrat"]) {
      const card = page.getByRole("article").filter({
        has: page.getByRole("heading", { name: title, exact: true }),
      });
      await expect(card.locator("p")).toHaveCount(0);
    }

    await expect(
      page.getByRole("heading", { name: "KANTIN (Kumpul Rutin)" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Diskusi Birokrat" }),
    ).toBeVisible();
  });
});
