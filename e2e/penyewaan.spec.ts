import { expect, test } from "@playwright/test";

const ADMIN_1_URL =
  "https://wa.me/6281945811412?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20penyewaan%20inventaris%20FORKIP%20UNJ.";
const ADMIN_2_URL = "https://wa.me/6281945811412";
const FORM_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScfwQjAb9KO5YMIcz4MHXrEwkvF0VTSavvLqS9CpEl5jSgpZg/viewform?embedded=true";

test.describe("Penyewaan page", () => {
  test("loads with hero, admin links, embedded form, inventory and footer", async ({
    page,
  }) => {
    await page.goto("/penyewaan");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Penyewaan Inventaris Forkip UNJ",
      }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "BKK FORKIP UNJ mengelola penyewaan inventaris yang dapat digunakan untuk mendukung berbagai kegiatan.",
      ),
    ).toBeVisible();
    await expect(
      page
        .getByRole("banner")
        .getByRole("link", { name: "Pertanyaan & Pengaduan" }),
    ).toBeVisible();

    await expect(
      page.getByText(
        "Silakan hubungi admin BKK sebelum mengisi formulir peminjaman.",
      ),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Admin BKK 1" }).first(),
    ).toHaveAttribute("href", ADMIN_1_URL);
    await expect(
      page.getByRole("link", { name: "Admin BKK 2" }),
    ).toHaveAttribute("href", ADMIN_2_URL);

    await expect(page.getByText("GOOGLE FORM TERTANAM")).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Peminjaman Barang Forkip UNJ 2026",
      }),
    ).toBeVisible();
    await expect(
      page.getByTitle("Peminjaman Barang Forkip UNJ 2026"),
    ).toHaveAttribute("src", FORM_EMBED_URL);

    await expect(
      page.getByRole("heading", { name: "Inventaris yang kami sewakan" }),
    ).toBeVisible();
    for (const title of [
      "Handy Talky",
      "Speaker dan Mic",
      "Kompor Portable",
      "Nesting",
      "Proyektor",
    ]) {
      await expect(
        page.getByRole("button", { name: new RegExp(title) }),
      ).toBeVisible();
    }
    await expect(
      page.getByRole("img", {
        name: "Foto Placeholder ilustrasi Handy Talky (placeholder)",
      }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Butuh info selengkapnya?" }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "Tanyakan ketersediaan barang dan ketentuan penyewaan kepada admin BKK sebelum mengisi formulir.",
      ),
    ).toBeVisible();
    const cta = page.getByRole("link", { name: "Admin BKK 1" }).last();
    await expect(cta).toHaveAttribute("href", ADMIN_1_URL);

    await expect(
      page.getByText("© 2026 Forum KIP-K Universitas Negeri Jakarta"),
    ).toBeVisible();
  });

  test("keeps the first item expanded and expands and collapses another", async ({
    page,
  }) => {
    await page.goto("/penyewaan");

    const handyTalky = page.getByRole("button", { name: /Handy Talky/ });
    await expect(handyTalky).toHaveAttribute("aria-expanded", "true");
    await expect(
      page.getByText(
        "Radio dua arah (HT) untuk koordinasi tim selama kegiatan. Perangkat mendukung beberapa kanal komunikasi dan dilengkapi earpiece.",
      ),
    ).toBeVisible();

    const speaker = page.getByRole("button", { name: /Speaker dan Mic/ });
    await expect(speaker).toHaveAttribute("aria-expanded", "false");
    await speaker.click();
    await expect(speaker).toHaveAttribute("aria-expanded", "true");
    await speaker.click();
    await expect(speaker).toHaveAttribute("aria-expanded", "false");
  });
});
