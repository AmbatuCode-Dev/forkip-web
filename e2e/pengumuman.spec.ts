import { expect, test } from "@playwright/test";

test.describe("Pengumuman page", () => {
  test("renders hero, both announcement cards, note, details, and buttons", async ({
    page,
  }) => {
    await page.goto("/pengumuman");

    await expect(
      page.getByRole("heading", { level: 1, name: "Pengumuman" }),
    ).toBeVisible();
    await expect(
      page
        .getByRole("navigation", { name: "Breadcrumb" })
        .getByText("Pengumuman"),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Pengumuman Hasil Verifikasi Berkas KIPK Jalur SNBP (Eligible)",
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Verifikasi Berkas KIPK Jalur SNBP",
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      page.getByText(/Jika nama tidak tercantum di dalam surat/),
    ).toBeVisible();
    await expect(page.getByText("Tanggal:")).toBeVisible();
    await expect(
      page.getByText("6 – 10 April 2026", { exact: true }),
    ).toBeVisible();

    for (const label of [
      "Narahubung KIF Forkip UNJ",
      "Hasil Verif KIPK UNJ 2026",
      "Narahubung 1",
      "Narahubung 2",
      "Surat Verif KIPK UNJ 2026",
    ]) {
      await expect(page.getByRole("link", { name: label })).toBeVisible();
    }
  });
});
