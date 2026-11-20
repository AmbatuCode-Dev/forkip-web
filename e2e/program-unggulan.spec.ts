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
      page
        .getByRole("navigation", { name: "Breadcrumb" })
        .getByText("Program Unggulan"),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { level: 2, name: "Kampung KIP-K UNJ" }),
    ).toBeVisible();
    await expect(
      page.getByText("Resiliensi & Kemandirian", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText(/Melalui Kampung KIP-K, kami berkomitmen/),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { level: 2, name: "Program lain" }),
    ).toBeVisible();
    for (const title of [
      "Explore KIPK UNJ: Jembatan Informasi Menuju Pendidikan Tinggi",
      "INDIKASI: Ikatan Dedikasi KIPK Mengabdi Sepenuh Hati",
      "KIP-K UNJ: Informasi Beasiswa Kampus",
    ]) {
      await expect(page.getByRole("heading", { name: title })).toBeVisible();
    }

    await expect(
      page.getByRole("link", { name: "Arsip Kegiatan" }).first(),
    ).toBeVisible();
  });
});
