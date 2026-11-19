import { expect, test } from "@playwright/test";

test.describe("Pengunduran diri page", () => {
  test("renders hero, alur card, template surat, gform, and faculty grid", async ({
    page,
  }) => {
    await page.goto("/pengunduran-diri");

    await expect(
      page.getByRole("heading", { level: 1, name: "Pengunduran diri KIPK" }),
    ).toBeVisible();
    await expect(page.getByText("Beranda")).toBeVisible();
    await expect(
      page.getByText("Form Pengunduran diri dari KIPK"),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Alur pengunduran diri KIPK 2026",
      }),
    ).toBeVisible();
    await expect(page.getByText("Mahasiswa Penerima KIP-KULIAH")).toBeVisible();

    await expect(page.getByRole("link", { name: /Unduh Surat/ })).toBeVisible();
    await expect(
      page.getByText("Pendataan Pengunduran KIP-K UNJ 2026"),
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
          name: `Hubungi delegasi KIF ${code} via WhatsApp`,
        }),
      ).toBeVisible();
    }
  });
});
