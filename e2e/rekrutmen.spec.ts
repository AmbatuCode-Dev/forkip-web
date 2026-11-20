import { expect, test } from "@playwright/test";

test.describe("Rekrutmen page", () => {
  test("loads with header, hero, status pill, and footer", async ({ page }) => {
    await page.goto("/rekrutmen");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Rekrutmen Anggota Baru Forkip UNJ 2026",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("banner").getByRole("link", { name: "Rekrutmen" }),
    ).toBeVisible();
    await expect(page.getByText("SUDAH DITUTUP").first()).toBeVisible();
    await expect(
      page.getByText("© 2026 Forum KIP-K Universitas Negeri Jakarta"),
    ).toBeVisible();
  });

  test("renders divisi info, closed form placeholder, and contact button", async ({
    page,
  }) => {
    await page.goto("/rekrutmen");

    await expect(
      page.getByText(
        "Untuk info lengkap divisi yang ada di Forkip UNJ, silakan klik teks ini.",
      ),
    ).toBeVisible();
    const divisiLink = page.getByRole("link", { name: /Lihat divisi/ });
    await expect(divisiLink).toBeVisible();
    await expect(divisiLink).toHaveAttribute("href", "/#divisi");
    await expect(page.getByText("Google Form tertanam")).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Rekrutmen Anggota Baru Forkip UNJ 2026 (ditutup)",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Narahubung Open Recruitment" }),
    ).toBeVisible();
  });
});
