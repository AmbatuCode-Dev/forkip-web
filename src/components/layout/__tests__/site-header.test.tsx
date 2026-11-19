import { afterEach, describe, expect, it } from "vitest";
import { SiteHeader } from "@/components/layout/site-header";
import { cleanup, fireEvent, render, screen } from "@/testing/test-utils";

afterEach(cleanup);

describe("SiteHeader", () => {
  it("renders logo, wordmark, nav labels, and CTA", () => {
    render(<SiteHeader />);

    expect(screen.getByText("Forum KIPK UNJ")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Beranda" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Pengumuman" })).toHaveAttribute(
      "href",
      "/pengumuman",
    );
    expect(
      screen.getByRole("link", { name: "Program Unggulan" }),
    ).toHaveAttribute("href", "/program-unggulan");
    expect(screen.getByRole("link", { name: "Berita" })).toHaveAttribute(
      "href",
      "/berita",
    );
    expect(
      screen.getByRole("link", { name: "Pertanyaan & Pengaduan" }),
    ).toHaveAttribute("href", "/pertanyaan-pengaduan");
  });

  it("opens the Layanan dropdown on click and lists its items", () => {
    render(<SiteHeader />);

    const toggle = screen.getByRole("button", { name: /Layanan/ });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Layanan mahasiswa")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Penyewaan Inventaris/ }),
    ).toHaveAttribute("href", "/penyewaan");
    expect(
      screen.getByRole("link", { name: /Arsip Data Tiap Divisi/ }),
    ).toHaveAttribute("href", "/arsip-data");
  });

  it("opens one dropdown at a time", () => {
    render(<SiteHeader />);

    fireEvent.click(screen.getByRole("button", { name: /Layanan/ }));
    fireEvent.click(screen.getByRole("button", { name: /Organisasi/ }));

    expect(screen.queryByText("Layanan mahasiswa")).not.toBeInTheDocument();
    expect(screen.getByText("Tentang organisasi")).toBeInTheDocument();
  });

  it("closes the dropdown on Escape", () => {
    render(<SiteHeader />);

    fireEvent.click(screen.getByRole("button", { name: /Layanan/ }));
    expect(screen.getByText("Layanan mahasiswa")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByText("Layanan mahasiswa")).not.toBeInTheDocument();
  });

  it("closes the dropdown on click outside", () => {
    render(<SiteHeader />);

    fireEvent.click(screen.getByRole("button", { name: /Layanan/ }));
    expect(screen.getByText("Layanan mahasiswa")).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByText("Layanan mahasiswa")).not.toBeInTheDocument();
  });

  it("closes the dropdown when a menu item is clicked", () => {
    render(<SiteHeader />);

    fireEvent.click(screen.getByRole("button", { name: /Organisasi/ }));
    const item = screen
      .getAllByRole("link", { name: /Program Kerja/ })
      .find((link) => link.getAttribute("href") === "/program-kerja");
    if (!item) {
      throw new Error("Dropdown item with href /program-kerja not found");
    }
    fireEvent.click(item);
    expect(screen.queryByText("Tentang organisasi")).not.toBeInTheDocument();
  });
});
