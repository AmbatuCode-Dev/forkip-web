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
      page.getByText(
        "Program kerja 2026 disusun berdasarkan Anggaran Dasar dan Anggaran Rumah Tangga (AD/ART) Forum KIP-K Universitas Negeri Jakarta.",
      ),
    ).toBeVisible();
    await expect(
      page
        .getByRole("navigation", { name: "Breadcrumb" })
        .getByText("Program Kerja", { exact: true }),
    ).toBeVisible();
    const banner = page.getByRole("banner");
    await banner.getByRole("button", { name: "Organisasi" }).click();
    await expect(
      banner.getByRole("link", { name: /^Program Kerja/ }),
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
      page.getByRole("heading", { name: "Explore KIP-Kuliah" }),
    ).toBeVisible();
    await expect(
      page.getByText("© 2026 Forum KIP-K Universitas Negeri Jakarta"),
    ).toBeVisible();
  });

  test("renders 5 cards with supplied bodies and no placeholder action links", async ({
    page,
  }) => {
    await page.goto("/program-kerja");

    await expect(page.getByRole("article")).toHaveCount(5);
    await expect(
      page.getByRole("link", { name: "Arsip Kegiatan", exact: true }),
    ).toHaveCount(0);
    await expect(
      page.getByRole("link", {
        name: "Laporan Program Kerja",
        exact: true,
      }),
    ).toHaveCount(0);

    const bodies = [
      "FORKIP UNJ mengadakan sosialisasi KIP Kuliah pada 12 Februari 2026 bagi peserta dari sekolah di Jakarta dan sekitarnya. Kegiatan ini membantu calon mahasiswa memahami pendaftaran, persyaratan, dan tahapan seleksi KIP Kuliah.",
      "FORKIP UNJ mengadakan buka puasa bersama pada 5 Maret 2026 di Aula Bung Hatta, Gedung Pascasarjana UNJ, untuk mempererat silaturahmi mahasiswa penerima KIP Kuliah.",
      "Pada 6–10 April 2026, Pengelola KIP Kuliah UNJ memeriksa kesesuaian data dan kelengkapan berkas calon penerima KIP Kuliah jalur SNBP.",
    ];
    for (const body of bodies) {
      await expect(page.getByText(body)).toBeVisible();
    }

    for (const title of ["Verif Akademik SNBT", "Sosialisasi KIPK"]) {
      const card = page.getByRole("article").filter({
        has: page.getByRole("heading", { name: title, exact: true }),
      });
      await expect(card.locator("p")).toHaveCount(0);
      await expect(
        card.getByRole("link", { name: "Arsip Kegiatan", exact: true }),
      ).toHaveCount(0);
      await expect(
        card.getByRole("link", {
          name: "Laporan Program Kerja",
          exact: true,
        }),
      ).toHaveCount(0);
    }
  });
});
