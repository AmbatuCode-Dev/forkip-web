import { expect, test } from "@playwright/test";

test.describe("Donat dan Hibah page", () => {
  test("renders hero, faculty grid, and transparency card", async ({
    page,
  }) => {
    await page.goto("/donat-dan-hibah");

    await expect(
      page.getByRole("heading", { level: 1, name: "Peminjaman (DONAT)" }),
    ).toBeVisible();
    await expect(
      page
        .getByRole("navigation", { name: "Breadcrumb" })
        .getByRole("link", { name: "Beranda" }),
    ).toBeVisible();
    await expect(
      page
        .getByRole("navigation", { name: "Breadcrumb" })
        .getByText("Donat dan Hibah"),
    ).toBeVisible();

    await expect(
      page.getByText(
        "Silakan klik tombol di bawah untuk menghubungi Delegasi Advo fakultasnya masing-masing:",
      ),
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
      page.getByRole("heading", { name: "Transparansi dana hibah" }),
    ).toBeVisible();
    await expect(page.getByText("*Akses Terbatas")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Alokasi dana hibah" }),
    ).toBeVisible();
  });
});
