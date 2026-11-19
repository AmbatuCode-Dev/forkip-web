import { afterEach, describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/layout/site-footer";
import { cleanup, render, screen } from "@/testing/test-utils";

afterEach(cleanup);

describe("SiteFooter", () => {
  it("renders brand wordmark and description paragraph", () => {
    render(<SiteFooter />);

    expect(screen.getAllByText("Forum KIPK UNJ").length).toBeGreaterThan(0);
    expect(
      screen.getByText(
        /Forum KIPK UNJ merupakan sebuah wadah untuk mengurus berbagai hal/,
      ),
    ).toBeInTheDocument();
  });

  it("renders MENU, LAINNYA, and KONTAK column headings", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("heading", { name: "Menu" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Lainnya" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Kontak" })).toBeInTheDocument();
  });

  it("renders menu and lainnya links with route-map hrefs", () => {
    render(<SiteFooter />);

    expect(
      screen.getByRole("link", { name: "Pertanyaan & Pengaduan" }),
    ).toHaveAttribute("href", "/pertanyaan-pengaduan");
    expect(screen.getByRole("link", { name: "Penyewaan" })).toHaveAttribute(
      "href",
      "/penyewaan",
    );
    expect(
      screen.getByRole("link", { name: "Donat dan Hibah" }),
    ).toHaveAttribute("href", "/donat-dan-hibah");
    expect(
      screen.getByRole("link", { name: "Arsip Data Tiap Divisi" }),
    ).toHaveAttribute("href", "/arsip-data");
    expect(screen.getByRole("link", { name: "Program Kerja" })).toHaveAttribute(
      "href",
      "/program-kerja",
    );
  });

  it("renders the four social icon links", () => {
    render(<SiteFooter />);

    expect(
      screen.getByRole("link", { name: "Instagram Forum KIP-K UNJ" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "X (Twitter) Forum KIP-K UNJ" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "TikTok Forum KIP-K UNJ" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Email humasnyaforkip@gmail.com" }),
    ).toHaveAttribute("href", "mailto:humasnyaforkip@gmail.com");
  });

  it("renders contact details, map placeholder, and copyright", () => {
    render(<SiteFooter />);

    expect(screen.getByText(/@forkipunj\.official/)).toBeInTheDocument();
    expect(screen.getByText(/@forumkipk_unj/)).toBeInTheDocument();
    expect(screen.getByText(/humasnyaforkip@gmail\.com/)).toBeInTheDocument();
    expect(screen.getByText("Peta lokasi")).toBeInTheDocument();
    expect(
      screen.getByText("© 2026 Forum KIP-K Universitas Negeri Jakarta"),
    ).toBeInTheDocument();
  });
});
