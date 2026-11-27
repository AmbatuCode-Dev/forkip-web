import { expect, test } from "@playwright/test";

test.describe("Program Unggulan page", () => {
  test("renders hero, Kampung KIP-K spotlight, and the Program lain grid", async ({
    page,
  }) => {
    await page.goto("/program-unggulan");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Program Unggulan Forkip UNJ",
      }),
    ).toBeVisible();
    await expect(
      page.getByText(
        /Program unggulan FORKIP UNJ mendukung pengembangan akademik dan keterampilan mahasiswa penerima KIP Kuliah/,
      ),
    ).toBeVisible();
    await expect(
      page
        .getByRole("navigation", { name: "Breadcrumb" })
        .getByText("Program Unggulan"),
    ).toBeVisible();

    const spotlight = page.getByRole("region", { name: "Kampung KIP-K UNJ" });
    await expect(
      spotlight.getByRole("heading", { level: 2, name: "Kampung KIP-K UNJ" }),
    ).toBeVisible();
    await expect(
      spotlight.getByText("Resiliensi & Kemandirian", { exact: true }),
    ).toBeVisible();
    await expect(
      spotlight.getByText(
        /Pengalaman ini membantu mahasiswa membangun kesiapan akademik/,
      ),
    ).toBeVisible();
    await expect(
      spotlight.getByRole("link", { name: "Arsip Kegiatan" }),
    ).toHaveAttribute("href", "https://www.instagram.com/p/DTHm46SEf_Q/");

    await expect(
      page.getByRole("heading", { level: 2, name: "Program lain" }),
    ).toBeVisible();
    for (const title of [
      "Explore KIP-Kuliah",
      "Indikasi",
      "Sosialisasi KIP-K Kuliah",
    ]) {
      await expect(
        page.getByRole("heading", { name: title, exact: true }),
      ).toBeVisible();
    }
  });

  test("links only the archive cards with a real URL and hides the placeholder", async ({
    page,
  }) => {
    await page.goto("/program-unggulan");

    for (const [title, href] of [
      ["Explore KIP-Kuliah", "https://www.instagram.com/p/DUvI7WwEnAd/"],
      ["Indikasi", "https://www.instagram.com/p/DNz35_eYiIH/"],
    ]) {
      const card = page.getByRole("article").filter({
        has: page.getByRole("heading", { name: title, exact: true }),
      });
      await expect(
        card.getByRole("link", { name: "Arsip Kegiatan" }),
      ).toHaveAttribute("href", href);
    }

    const sosialisasi = page.getByRole("article").filter({
      has: page.getByRole("heading", {
        name: "Sosialisasi KIP-K Kuliah",
        exact: true,
      }),
    });
    await expect(
      sosialisasi.getByRole("link", { name: "Arsip Kegiatan" }),
    ).toHaveCount(0);

    await expect(
      page.getByRole("link", { name: "Arsip Kegiatan" }),
    ).toHaveCount(3);
  });
});
