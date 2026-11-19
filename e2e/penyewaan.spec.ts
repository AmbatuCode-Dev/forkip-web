import { expect, test } from "@playwright/test";

test.describe("Penyewaan page", () => {
  test("loads with header, hero, and footer", async ({ page }) => {
    await page.goto("/penyewaan");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Penyewaan Inventaris Forkip UNJ",
      }),
    ).toBeVisible();
    await expect(
      page
        .getByRole("banner")
        .getByRole("link", { name: "Pertanyaan & Pengaduan" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Inventaris yang kami sewakan" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Handy Talky/ }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Butuh info selengkapnya?" }),
    ).toBeVisible();
    await expect(
      page.getByText("© 2026 Forum KIP-K Universitas Negeri Jakarta"),
    ).toBeVisible();
  });

  test("expands and collapses an inventory accordion", async ({ page }) => {
    await page.goto("/penyewaan");

    const speaker = page.getByRole("button", { name: /Speaker dan Mic/ });
    await expect(speaker).toHaveAttribute("aria-expanded", "false");
    await speaker.click();
    await expect(speaker).toHaveAttribute("aria-expanded", "true");
  });
});
