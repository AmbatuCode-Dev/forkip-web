import { afterEach, describe, expect, it } from "vitest";
import { DonatDanHibahView } from "@/features/donat-dan-hibah";
import { cleanup, render, screen, within } from "@/testing/test-utils";

afterEach(cleanup);

describe("DonatDanHibahView", () => {
  it("renders hero with breadcrumb, title, and subtitle", () => {
    render(<DonatDanHibahView />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Peminjaman (DONAT)" }),
    ).toBeInTheDocument();
    const breadcrumb = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(
      within(breadcrumb).getByRole("link", { name: "Beranda" }),
    ).toHaveAttribute("href", "/");
    expect(within(breadcrumb).getByText("Donat dan Hibah")).toBeVisible();
    expect(
      screen.getByText(
        "Dikelola oleh Divisi Advokasi dengan proses yang mudah dan cepat. (S&K berlaku)",
      ),
    ).toBeInTheDocument();
  });

  it("renders the Advo delegation line and all 8 faculty tiles", () => {
    render(<DonatDanHibahView />);

    expect(
      screen.getByText(
        "Silakan klik tombol di bawah untuk menghubungi Delegasi Advo fakultasnya masing-masing:",
      ),
    ).toBeInTheDocument();
    for (const code of [
      "FIP",
      "FBS",
      "FMIPA",
      "FISH",
      "FT",
      "FPsi",
      "FEB",
      "FIKK",
    ]) {
      expect(
        screen.getByRole("link", {
          name: `Hubungi delegasi ${code} via WhatsApp`,
        }),
      ).toHaveAttribute("href", "#");
    }
  });

  it("renders the transparency card with restricted-access note and gold button", () => {
    render(<DonatDanHibahView />);

    const heading = screen.getByRole("heading", {
      name: "Transparansi dana hibah",
    });
    expect(heading).toBeInTheDocument();
    expect(screen.getByText("*Akses Terbatas")).toBeInTheDocument();

    const button = screen.getByRole("button", { name: "Alokasi dana hibah" });
    expect(button.className).toContain("bg-gold");

    const card = heading.closest("section");
    expect(card).not.toBeNull();
    expect(card?.className).toContain("bg-white");
    expect(card?.className).toContain("border-border-sand");
    expect(card?.className).toContain("rounded-2xl");
  });
});
