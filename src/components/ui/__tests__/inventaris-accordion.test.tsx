import { afterEach, describe, expect, it } from "vitest";
import { InventarisAccordion } from "@/components/ui/inventaris-accordion";
import { cleanup, fireEvent, render, screen } from "@/testing/test-utils";

afterEach(cleanup);

const AVAILABILITY = "Hubungi admin BKK untuk mengetahui ketersediaan barang.";
const FOOTNOTE =
  "Foto merupakan ilustrasi. Hubungi admin BKK untuk detail barang.";
const HT_PARAGRAPHS = [
  "Radio dua arah (HT) untuk koordinasi tim selama kegiatan. Perangkat mendukung beberapa kanal komunikasi dan dilengkapi earpiece.",
  "Perangkat ini dapat digunakan untuk kegiatan di dalam maupun di luar ruangan.",
];

describe("InventarisAccordion", () => {
  it("renders collapsed with chip, title, availability line and plus icon", () => {
    render(
      <InventarisAccordion
        chip="Penyewaan HT"
        title="Handy Talky"
        meta={AVAILABILITY}
        paragraphs={HT_PARAGRAPHS}
      />,
    );

    expect(screen.getByText("Handy Talky")).toBeInTheDocument();
    expect(screen.getByText(AVAILABILITY)).toBeInTheDocument();
    expect(screen.getByText("Penyewaan HT")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Handy Talky/ })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.queryByText(HT_PARAGRAPHS[0])).not.toBeVisible();
  });

  it("expands to show paragraphs and footnote", () => {
    render(
      <InventarisAccordion
        chip="Penyewaan HT"
        title="Handy Talky"
        meta={AVAILABILITY}
        paragraphs={HT_PARAGRAPHS}
        footnote={FOOTNOTE}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Handy Talky/ }));

    expect(screen.getByText(HT_PARAGRAPHS[0])).toBeVisible();
    expect(screen.getByText(HT_PARAGRAPHS[1])).toBeVisible();
    expect(screen.getByText(FOOTNOTE)).toBeVisible();
  });

  it("renders without footnote when omitted", () => {
    render(
      <InventarisAccordion
        chip="Penyewaan Speaker"
        title="Speaker dan Mic"
        meta={AVAILABILITY}
        paragraphs={HT_PARAGRAPHS}
        defaultExpanded
      />,
    );

    expect(
      screen.queryByText(/Foto merupakan ilustrasi/),
    ).not.toBeInTheDocument();
    expect(screen.getByText(HT_PARAGRAPHS[0])).toBeVisible();
    expect(
      screen.getByRole("button", { name: /Speaker dan Mic/ }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("renders the labelled image placeholder instead of the chip when imageLabel is given", () => {
    render(
      <InventarisAccordion
        chip="Penyewaan HT"
        imageLabel="Placeholder ilustrasi Handy Talky"
        title="Handy Talky"
        meta={AVAILABILITY}
        paragraphs={HT_PARAGRAPHS}
      />,
    );

    expect(
      screen.getByRole("img", {
        name: "Foto Placeholder ilustrasi Handy Talky (placeholder)",
      }),
    ).toHaveAttribute("src", expect.stringContaining("placehold.co"));
    expect(screen.queryByText("Penyewaan HT")).not.toBeInTheDocument();
    expect(screen.getByText(AVAILABILITY)).toBeInTheDocument();
  });
});
