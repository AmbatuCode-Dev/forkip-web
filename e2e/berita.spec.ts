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
    await expect(
      explore.getByText("Diupload pada: 18 Februari 2026"),
    ).toBeVisible();
    await expect(explore.getByText("1 Foto")).toBeVisible();
    await expect(
      explore.getByText("Dokumentasi sosialisasi Explore KIPK 2026."),
    ).toBeVisible();
    await expect(explore.getByText("01 / 01 · Foto")).toBeVisible();

    const pelatihan = page.getByTestId("news-card-pelatihan-divisi-kif");
    await expect(
      pelatihan.getByText("Diupload pada: 22 Februari 2026"),
    ).toBeVisible();
    await expect(pelatihan.getByText("4 Foto")).toBeVisible();
    await expect(
      pelatihan.getByText("Dokumentasi Pelatihan Divisi KIF 2026."),
    ).toBeVisible();

    const busamakip = page.getByTestId("news-card-busamakip");
    await expect(busamakip.getByText(/Diupload pada:/)).toHaveCount(0);
    await expect(busamakip.getByText("3 Foto")).toBeVisible();
    await expect(
      busamakip.getByText(
        "Dokumentasi buka puasa bersama mahasiswa KIP Kuliah UNJ.",
      ),
    ).toBeVisible();
    await expect(page.getByTestId("news-media-only-card")).toHaveCount(0);
    await expect(page.getByText(/Menyusul/)).toHaveCount(0);

    await expect(page.getByText(/Total 5 berita dipublikasikan/)).toBeVisible();
    await expect(page.getByRole("link", { name: "Halaman 2" })).toBeVisible();
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
    await expect(snbp.getByText("Diupload pada: 8 April 2026")).toBeVisible();
    await expect(snbp.getByText("4 Foto")).toBeVisible();
    await expect(
      snbp.getByText(
        "Dokumentasi verifikasi berkas KIP Kuliah jalur SNBP 2026.",
      ),
    ).toBeVisible();
    await expect(
      snbp.getByText(/Pengelola KIP Kuliah UNJ melaksanakan verifikasi berkas/),
    ).toBeVisible();

    const gelar = page.getByTestId("news-card-gelar-kipk");
    await expect(gelar.getByText(/Diupload pada:/)).toHaveCount(0);
    await expect(gelar.getByText("4 Foto")).toBeVisible();
    await expect(gelar.getByText("Dokumentasi Gelar KIPK 2026.")).toBeVisible();
    await expect(page.getByText(/Menyusul/)).toHaveCount(0);
    await expect(page.getByTestId("news-media-only-card")).toHaveCount(0);

    await expect(page.getByText(/Total 5 berita dipublikasikan/)).toBeVisible();
    await expect(
      page.getByText("Halaman 2 dari 2", { exact: true }),
    ).toBeVisible();
  });
});
