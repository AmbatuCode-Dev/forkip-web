import { afterEach, describe, expect, it } from "vitest";
import { PenyewaanView } from "@/features/penyewaan";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@/testing/test-utils";

afterEach(cleanup);

const ADMIN_1_URL =
  "https://wa.me/6281945811412?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20penyewaan%20inventaris%20FORKIP%20UNJ.";
const ADMIN_2_URL = "https://wa.me/6281945811412";
const FORM_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScfwQjAb9KO5YMIcz4MHXrEwkvF0VTSavvLqS9CpEl5jSgpZg/viewform?embedded=true";

describe("PenyewaanView", () => {
  it("renders hero, note with real admin links, and the embedded form", () => {
    render(<PenyewaanView />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Penyewaan Inventaris Forkip UNJ",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "BKK FORKIP UNJ mengelola penyewaan inventaris yang dapat digunakan untuk mendukung berbagai kegiatan.",
      ),
    ).toBeInTheDocument();

    const noteCard = screen
      .getByText(
        "Silakan hubungi admin BKK sebelum mengisi formulir peminjaman.",
      )
      .closest("section");
    expect(noteCard).not.toBeNull();
    expect(
      within(noteCard as HTMLElement).getByRole("link", {
        name: "Admin BKK 1",
      }),
    ).toHaveAttribute("href", ADMIN_1_URL);
    expect(
      within(noteCard as HTMLElement).getByRole("link", {
        name: "Admin BKK 2",
      }),
    ).toHaveAttribute("href", ADMIN_2_URL);

    expect(screen.getByText("GOOGLE FORM TERTANAM")).toBeInTheDocument();
    expect(
      screen.getByText("Peminjaman Barang Forkip UNJ 2026"),
    ).toBeInTheDocument();
    expect(
      screen.getByTitle("Peminjaman Barang Forkip UNJ 2026"),
    ).toHaveAttribute("src", FORM_EMBED_URL);
  });

  it("renders the section heading and all 5 inventory items with photo labels", () => {
    render(<PenyewaanView />);

    expect(
      screen.getByRole("heading", { name: "Inventaris yang kami sewakan" }),
    ).toBeInTheDocument();

    const items = [
      { title: "Handy Talky", label: "Placeholder ilustrasi Handy Talky" },
      {
        title: "Speaker dan Mic",
        label: "Placeholder ilustrasi Speaker dan Mic",
      },
      {
        title: "Kompor Portable",
        label: "Placeholder ilustrasi Kompor Portable",
      },
      { title: "Nesting", label: "Placeholder ilustrasi Nesting" },
      { title: "Proyektor", label: "Placeholder ilustrasi Proyektor" },
    ];
    for (const { title, label } of items) {
      expect(
        screen.getByRole("button", { name: new RegExp(title) }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("img", { name: `Foto ${label} (placeholder)` }),
      ).toBeInTheDocument();
    }
    expect(
      screen.getAllByText(
        "Hubungi admin BKK untuk mengetahui ketersediaan barang.",
      ),
    ).toHaveLength(5);
  });

  it("expands Handy Talky by default with body and footnote", () => {
    render(<PenyewaanView />);

    const toggle = screen.getByRole("button", { name: /Handy Talky/ });
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText(
        /Radio dua arah \(HT\) untuk koordinasi tim selama kegiatan/,
      ),
    ).toBeVisible();
    const regionId = toggle.getAttribute("aria-controls");
    expect(regionId).not.toBeNull();
    const region = document.getElementById(regionId ?? "");
    expect(region).not.toBeNull();
    expect(
      within(region as HTMLElement).getByText(
        "Foto merupakan ilustrasi. Hubungi admin BKK untuk detail barang.",
      ),
    ).toBeVisible();
  });

  it("keeps other items collapsed until clicked", () => {
    render(<PenyewaanView />);

    const proyektor = screen.getByRole("button", { name: /Proyektor/ });
    expect(proyektor).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(proyektor);
    expect(proyektor).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText(
        "Proyektor multimedia untuk menampilkan materi presentasi atau video pada layar yang lebih besar.",
      ),
    ).toBeVisible();
  });

  it("renders contact CTA with real WhatsApp button", () => {
    render(<PenyewaanView />);

    expect(
      screen.getByRole("heading", { name: "Butuh info selengkapnya?" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Tanyakan ketersediaan barang dan ketentuan penyewaan kepada admin BKK sebelum mengisi formulir.",
      ),
    ).toBeInTheDocument();
    const ctaLinks = screen.getAllByRole("link", { name: "Admin BKK 1" });
    expect(ctaLinks).toHaveLength(2);
    expect(ctaLinks[1]).toHaveAttribute("href", ADMIN_1_URL);
  });
});
