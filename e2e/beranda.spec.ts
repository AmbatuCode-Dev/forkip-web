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

  test("shows the hero photo", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("img", { name: /mahasiswa.*UNJ/ }),
    ).toBeVisible();
  });

  test("builds the Delegasi logo and tracks the active faculty", async ({
    page,
  }) => {
    await page.goto("/");

    const scrolly = await page
      .getByTestId("delegasi-scrolly")
      .evaluate((el) => {
        const node = el as HTMLElement;
        return {
          top: node.getBoundingClientRect().top + window.scrollY,
          height: node.offsetHeight,
        };
      });

    const pinDistance = scrolly.height - (page.viewportSize()?.height ?? 900);
    const scrollTo = (fraction: number) =>
      page.evaluate(
        ({ top, distance, part }) => window.scrollTo(0, top + distance * part),
        { top: scrolly.top, distance: pinDistance, part: fraction },
      );

    await scrollTo(0.5);
    await expect(page.getByTestId("delegasi-title")).toBeVisible();

    await scrollTo(1.02);
    await expect(page.getByTestId("delegasi-logo")).toHaveAttribute(
      "data-state",
      "complete",
    );

    await expect
      .poll(async () => {
        await scrollTo(0.45);
        const mid = await page
          .locator('[data-active="true"]')
          .first()
          .getAttribute("data-faculty-code");
        await scrollTo(1.02);
        const end = await page
          .locator('[data-active="true"]')
          .first()
          .getAttribute("data-faculty-code");
        return mid !== null && end !== null && mid !== end;
      })
      .toBe(true);
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
