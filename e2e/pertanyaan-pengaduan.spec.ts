import { expect, test } from "@playwright/test";

test.describe("Pertanyaan & Pengaduan page", () => {
  test("renders hero, faculty grid, and KIF note", async ({ page }) => {
    await page.goto("/pertanyaan-pengaduan");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Pertanyaan & Pengaduan",
      }),
    ).toBeVisible();
    await expect(
      page
        .getByRole("navigation", { name: "Breadcrumb" })
        .getByRole("link", { name: "Beranda" }),
    ).toBeVisible();
    await expect(
      page
        .getByRole("navigation", { name: "Breadcrumb" })
        .getByText("Pertanyaan & Pengaduan"),
    ).toBeVisible();

    await expect(
      page.getByText("Pilih delegasi fakultas Anda untuk menghubungi KIF:"),
    ).toBeVisible();
    for (const code of [
      "FIP",
      "FBS",
      "FMIPA",
      "FISH",
      "FT",
      "FPsi",
      "FEB",
      "FIKK",
    ]) {
      await expect(
        page.getByRole("link", {
          name: `Hubungi delegasi ${code} via WhatsApp`,
        }),
      ).toBeVisible();
    }

    await expect(
      page.getByText(
        "Laporan akan ditindaklanjuti oleh Delegasi Fakultas dari Divisi KIF (Koordinator Integrasi Fakultas) Forkip UNJ.",
      ),
    ).toBeVisible();
    await expect(
      page.getByText("© 2026 Forum KIP-K Universitas Negeri Jakarta"),
    ).toBeVisible();
  });
});
