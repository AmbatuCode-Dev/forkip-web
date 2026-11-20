import { afterEach, describe, expect, it } from "vitest";
import { InventarisAccordion } from "@/components/ui/inventaris-accordion";
import { cleanup, fireEvent, render, screen } from "@/testing/test-utils";

afterEach(cleanup);

const HT_PARAGRAPHS = [
  "Handy Talky merupakan peralatan komunikasi dua arah yang digunakan untuk mendukung komunikasi dan koordinasi tim.",
  "Perangkat ini dilengkapi dengan baterai yang dapat digantikan sehingga siap digunakan untuk kegiatan luar ruangan maupun dalam gedung.",
];

describe("InventarisAccordion", () => {
  it("renders collapsed with chip, title, meta line and plus icon", () => {
    render(
      <InventarisAccordion
        chip="Penyewaan HT"
        title="Handy Talky"
        meta="Jumlah yang tersedia: banyak pcs (include earpiece)"
        paragraphs={HT_PARAGRAPHS}
      />,
    );

    expect(screen.getByText("Handy Talky")).toBeInTheDocument();
    expect(screen.getByText(/Jumlah yang tersedia:/)).toBeInTheDocument();
    expect(
      screen.getByText(/banyak pcs \(include earpiece\)/),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Handy Talky/ })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.queryByText(HT_PARAGRAPHS[0])).not.toBeVisible();
  });

  it("expands to show meta, paragraphs and footnote", () => {
    render(
      <InventarisAccordion
        chip="Penyewaan HT"
        title="Handy Talky"
        meta="Jumlah yang tersedia: banyak pcs (include earpiece)"
        paragraphs={HT_PARAGRAPHS}
        footnote="(gambar hanya ilustrasi. untuk info sewa/aksesoris silakan hubungi admin BKK)"
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Handy Talky/ }));

    expect(screen.getByText(HT_PARAGRAPHS[0])).toBeVisible();
    expect(screen.getByText(HT_PARAGRAPHS[1])).toBeVisible();
    expect(screen.getByText(/gambar hanya ilustrasi/)).toBeInTheDocument();
  });

  it("renders without footnote when omitted", () => {
    render(
      <InventarisAccordion
        chip="Penyewaan Speaker"
        title="Speaker dan Mic"
        meta="Jumlah yang tersedia: 2 set"
        paragraphs={HT_PARAGRAPHS}
        defaultExpanded
      />,
    );

    expect(
      screen.queryByText(/gambar hanya ilustrasi/),
    ).not.toBeInTheDocument();
    expect(screen.getByText(HT_PARAGRAPHS[0])).toBeVisible();
    expect(
      screen.getByRole("button", { name: /Speaker dan Mic/ }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("renders the image placeholder instead of the chip when imageLabel is given", () => {
    render(
      <InventarisAccordion
        chip="Penyewaan HT"
        imageLabel="Foto HT"
        title="Handy Talky"
        meta="Jumlah yang tersedia: banyak pcs (include earpiece)"
        paragraphs={HT_PARAGRAPHS}
      />,
    );

    expect(screen.getByText("Foto HT")).toBeInTheDocument();
    expect(screen.queryByText("Penyewaan HT")).not.toBeInTheDocument();
    expect(screen.getByText(/Jumlah yang tersedia:/)).toBeInTheDocument();
    expect(
      screen.getByText(/banyak pcs \(include earpiece\)/),
    ).toBeInTheDocument();
  });
});
