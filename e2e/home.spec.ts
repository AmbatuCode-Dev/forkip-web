import { expect, test } from "@playwright/test";

test.describe("Home page", () => {
  test("renders title, main heading, and starter sections", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/forkip-web/);
    await expect(
      page.getByRole("heading", { level: 1, name: "forkip-web" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Quick start" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Project structure" }),
    ).toBeVisible();
  });

  test("renders 404 page and navigates back to home", async ({ page }) => {
    await page.goto("/non-existent-route");

    await expect(
      page.getByRole("heading", { name: "Page not found" }),
    ).toBeVisible();

    const backLink = page.getByRole("link", { name: "Back to home" });
    await expect(backLink).toBeVisible();
    await backLink.click();

    await expect(page).toHaveURL("/");
    await expect(
      page.getByRole("heading", { level: 1, name: "forkip-web" }),
    ).toBeVisible();
  });
});
