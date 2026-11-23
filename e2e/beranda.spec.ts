import { expect, test } from "@playwright/test";

test.describe("Beranda", () => {
  test("loads with header, hero H1, and footer visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Forum",
    );
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "KIPK UNJ",
    );

    const header = page.getByRole("banner");
    await expect(header).toBeVisible();
    await expect(
      header.getByRole("link", { name: "Pertanyaan & Pengaduan" }),
    ).toBeVisible();

    const footer = page.getByRole("contentinfo");
    await expect(footer).toBeVisible();
    await expect(
      footer.getByText("© 2026 Forum KIP-K Universitas Negeri Jakarta"),
    ).toBeVisible();
  });

  test("renders the main sections in order", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 2, name: "Fungsi dan Tujuan" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Visi dan Misi" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Layanan Forkip UNJ" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Mengenal Divisi FORKIP UNJ",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Berita Forkip UNJ" }),
    ).toBeVisible();
  });

  test("wheel scrolling moves the page content", async ({ page }) => {
    await page.goto("/");

    // Lenis marks the root element while the smooth-scroll engine is active.
    await expect(page.locator("html")).toHaveClass(/lenis/);

    await page.mouse.move(640, 400);
    await page.mouse.wheel(0, 1500);

    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(0);
  });

  test.describe("with reduced motion", () => {
    test.use({ reducedMotion: "reduce" });

    test("native scrolling still works without the smooth-scroll engine", async ({
      page,
    }) => {
      await page.goto("/");

      await expect(page.locator("html")).not.toHaveClass(/lenis/);

      await page.mouse.move(640, 400);
      await page.mouse.wheel(0, 800);

      await expect
        .poll(() => page.evaluate(() => window.scrollY))
        .toBeGreaterThan(0);
    });
  });

  test("renders the 404 page and navigates back to beranda", async ({
    page,
  }) => {
    await page.goto("/non-existent-route");

    await expect(
      page.getByRole("heading", { name: "Page not found" }),
    ).toBeVisible();

    const backLink = page.getByRole("link", { name: "Back to home" });
    await expect(backLink).toBeVisible();
    await backLink.click();

    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "KIPK UNJ",
    );
  });
});
