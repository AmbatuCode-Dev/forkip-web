import { afterEach, describe, expect, it } from "vitest";
import { DivisiAccordion } from "@/components/ui/divisi-accordion";
import { cleanup, fireEvent, render, screen } from "@/testing/test-utils";

afterEach(cleanup);

const BPHI_BODY =
  "BPHI terdiri atas Ketua, Wakil Ketua, Sekretaris Umum, dan Bendahara Umum. BPHI menetapkan arah kebijakan organisasi, mengawasi kinerja divisi, serta mengoordinasikan administrasi dan keuangan selama satu periode kepengurusan.";

describe("DivisiAccordion", () => {
  it("renders collapsed by default with chip, title and plus icon", () => {
    render(
      <DivisiAccordion
        chip="BPHI"
        title="BPHI - Badan Pengurus Harian Inti"
        body={BPHI_BODY}
      />,
    );

    expect(
      screen.getByText("BPHI - Badan Pengurus Harian Inti"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /BPHI/ })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.queryByText(BPHI_BODY)).not.toBeVisible();
  });

  it("expands on click: aria-expanded true, body visible", () => {
    render(
      <DivisiAccordion
        chip="BPHI"
        title="BPHI - Badan Pengurus Harian Inti"
        body={BPHI_BODY}
      />,
    );

    const toggle = screen.getByRole("button", { name: /BPHI/ });
    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("region")).toBeInTheDocument();
    expect(screen.getByText(BPHI_BODY)).toBeVisible();
  });

  it("collapses again on second click", () => {
    render(
      <DivisiAccordion
        chip="PSDM"
        title="PSDM - Pengembangan Sumber Daya Manusia"
        body={BPHI_BODY}
        defaultExpanded
      />,
    );

    const toggle = screen.getByRole("button", { name: /PSDM/ });
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText(BPHI_BODY)).not.toBeVisible();
  });

  it("links region to heading via aria-labelledby", () => {
    render(
      <DivisiAccordion
        chip="KIF"
        title="KIF"
        body={BPHI_BODY}
        defaultExpanded
      />,
    );

    const toggle = screen.getByRole("button", { name: /KIF/ });
    const region = screen.getByRole("region");
    expect(region).toHaveAttribute("aria-labelledby", toggle.id);
  });

  it("renders the image placeholder instead of the chip when imageLabel is given", () => {
    render(
      <DivisiAccordion
        chip="BPHI"
        imageLabel="Foto BPHI"
        title="BPHI - Badan Pengurus Harian Inti"
        body={BPHI_BODY}
      />,
    );

    expect(
      screen.getByRole("img", { name: "Foto BPHI (placeholder)" }),
    ).toHaveAttribute("src", expect.stringContaining("placehold.co"));
    expect(screen.queryByText("BPHI")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /BPHI - Badan Pengurus Harian Inti/ }),
    ).toBeInTheDocument();
  });
});
