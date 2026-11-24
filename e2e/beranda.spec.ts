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

  test("renders the Fungsi dan Tujuan section with the video", async ({
    page,
  }) => {
    await page.goto("/");

    const heading = page.getByRole("heading", { name: "Fungsi dan Tujuan" });
    await expect(heading).toBeVisible();

    const items = page.getByTestId("fungsi-section").getByRole("listitem");
    await expect(items).toHaveCount(4);

    await expect(page.getByTitle("Video Forum KIPK UNJ")).toBeVisible();
  });

  test("respects prefers-reduced-motion on the Fungsi section", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Fungsi dan Tujuan" }),
    ).toBeVisible();
    await expect(
      page.getByTestId("fungsi-section").getByRole("listitem"),
    ).toHaveCount(4);
    // With reduced motion the whole section is instantly usable.
    await expect(page.getByTitle("Video Forum KIPK UNJ")).toBeVisible();
  });

  test("builds the Delegasi logo and tracks the active faculty", async ({
    page,
  }) => {
    await page.goto("/");

    const scrolly = page.getByTestId("delegasi-scrolly");
    const logo = page.getByTestId("delegasi-logo");

    // These attributes come from ScrollTrigger's own refresh, so they only
    // exist once the pin is installed. Measuring offsetHeight before that
    // point yields the unpinned (1×vh) layout and every scroll lands wrong.
    await expect(scrolly).toHaveAttribute("data-scroll-end", /\d/);
    await expect(page.locator(".pin-spacer")).toHaveCount(1);

    const { start, end } = await scrolly.evaluate((el) => {
      const node = el as HTMLElement;
      return {
        start: Number(node.dataset.scrollStart),
        end: Number(node.dataset.scrollEnd),
      };
    });
    expect(end).toBeGreaterThan(start);

    const scrollTo = (fraction: number) =>
      page.evaluate(
        ({ start, end, part }) =>
          window.scrollTo(0, start + (end - start) * part),
        { start, end, part: fraction },
      );

    await scrollTo(0.5);
    await expect(page.getByTestId("delegasi-title")).toBeVisible();

    // Assert a real mid-reveal, not the SSR "complete" value: level 2 is
    // wiping in, level 4 is still hidden, a faculty rail is highlighted and
    // the logo reports that it is still building.
    await expect
      .poll(async () => {
        await scrollTo(0.6);
        return page.evaluate(() => {
          const root = document.querySelector(
            '[data-testid="delegasi-scrolly"]',
          );
          const opacity = (group: string) => {
            const el = root?.querySelector(`[data-logo-group="${group}"]`);
            return el ? Number(getComputedStyle(el).opacity) : -1;
          };
          const highlighted =
            root?.querySelectorAll('[data-active="true"]').length ?? 0;
          const state = root
            ?.querySelector('[data-testid="delegasi-logo"]')
            ?.getAttribute("data-state");
          return (
            opacity("level-2") > 0 &&
            opacity("level-2") < 1 &&
            opacity("level-4") === 0 &&
            highlighted > 0 &&
            state === "building"
          );
        });
      })
      .toBe(true);

    await scrollTo(1.02);
    await expect(logo).toHaveAttribute("data-state", "complete");

    await expect
      .poll(async () => {
        await scrollTo(0.45);
        const mid = await page
          .locator('[data-active="true"]')
          .first()
          .getAttribute("data-faculty-code");
        await scrollTo(1.02);
        const endCode = await page
          .locator('[data-active="true"]')
          .first()
          .getAttribute("data-faculty-code");
        return mid !== null && endCode !== null && mid !== endCode;
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

  test("resets scroll on navigation and restores it on back", async ({
    page,
  }) => {
    await page.goto("/");

    await page.mouse.move(640, 400);
    await page.mouse.wheel(0, 1800);
    // Let Lenis settle before recording the origin, otherwise the recorded
    // value lags the wheel target and cannot be compared with restoration.
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(1500);
    const before = await page.evaluate(() => window.scrollY);

    await page
      .getByRole("banner")
      .getByRole("link", { name: "Pertanyaan & Pengaduan" })
      .click();

    await expect(page).toHaveURL(/\/pertanyaan-pengaduan$/);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);

    await page.goBack();

    await expect(page).toHaveURL("/");
    await expect
      .poll(
        () =>
          page.evaluate(
            (expected) =>
              Math.abs(window.scrollY - expected) < window.innerHeight,
            before,
          ),
        { timeout: 10_000 },
      )
      .toBe(true);
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
