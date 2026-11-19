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

describe("PenyewaanView", () => {
  it("renders hero, note card, and Google Form placeholder", () => {
    render(<PenyewaanView />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Penyewaan Inventaris Forkip UNJ",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Dikelola oleh BKK \(Biro Kebendaharaan dan keuangan\)/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Penyewaan barang, harap menghubungi admin BKK dengan klik tombol berikut/,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("GOOGLE FORM TERTANAM")).toBeInTheDocument();
    expect(
      screen.getByText("Peminjaman Barang Inventaris BKK 2026"),
    ).toBeInTheDocument();
    const noteCard = screen
      .getByText(/Penyewaan barang, harap menghubungi admin BKK/)
      .closest("section");
    expect(noteCard).not.toBeNull();
    expect(noteCard).toHaveTextContent("Admin BKK 1");
    expect(noteCard).toHaveTextContent("Admin BKK 2");
    expect(
      within(noteCard as HTMLElement).getByRole("link", {
        name: "Admin BKK 1",
      }),
    ).toHaveAttribute("href", "#");
    expect(
      within(noteCard as HTMLElement).getByRole("link", {
        name: "Admin BKK 2",
      }),
    ).toHaveAttribute("href", "#");
  });

  it("renders all 5 inventory accordion titles", () => {
    render(<PenyewaanView />);

    for (const title of [
      "Handy Talky",
      "Speaker dan Mic",
      "Kompor Portable",
      "Nesting",
      "Proyektor",
    ]) {
      expect(
        screen.getByRole("button", { name: new RegExp(title) }),
      ).toBeInTheDocument();
    }
  });

  it("expands Handy Talky by default with body and footnote", () => {
    render(<PenyewaanView />);

    const toggle = screen.getByRole("button", { name: /Handy Talky/ });
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText(
        /Handy Talky merupakan perangkat radio komunikasi dua arah/,
      ),
    ).toBeVisible();
    expect(
      screen.getByText(
        /\(gambar hanya ilustrasi, untuk info selengkapnya silakan hubungi admin BKK\)/,
      ),
    ).toBeVisible();
  });

  it("keeps other items collapsed until clicked", () => {
    render(<PenyewaanView />);

    const proyektor = screen.getByRole("button", { name: /Proyektor/ });
    expect(proyektor).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(proyektor);
    expect(proyektor).toHaveAttribute("aria-expanded", "true");
  });

  it("renders contact CTA card with gold pill", () => {
    render(<PenyewaanView />);

    expect(
      screen.getByRole("heading", { name: "Butuh info selengkapnya?" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Hubungi admin BKK sebelum mengisi form peminjaman."),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Admin BKK 1" })).toHaveLength(
      2,
    );
  });
});
