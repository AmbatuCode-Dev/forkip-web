import { afterEach, describe, expect, it } from "vitest";
import { NewsCard } from "@/components/berita/news-card";
import { cleanup, fireEvent, render, screen } from "@/testing/test-utils";

afterEach(cleanup);

const PARAGRAPHS = [
  "Pada tanggal 12 Februari 2026, Explore KIPK 2026 merupakan program sosialisasi yang diselenggarakan oleh FORUM KIP-K UNJ.",
  "Melaui kegiatan ini, FORUM KIP-K UNJ memberikan penjelasan mengenai mekanisme perpanjangan, penyiaran, alur seleksi, serta manfaat yang diperoleh.",
];

describe("NewsCard", () => {
  it("renders title, date pill and photo count pill", () => {
    render(
      <NewsCard
        dateLabel="Rabu, 18 Februari 2026"
        photoCount={8}
        title="Explore KIPK 2026"
        paragraphs={PARAGRAPHS}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Explore KIPK 2026" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Diupload pada: Rabu, 18 Februari 2026/),
    ).toBeInTheDocument();
    expect(screen.getByText("8 Foto")).toBeInTheDocument();
    expect(screen.getByText(PARAGRAPHS[0])).toBeInTheDocument();
  });

  it("renders the optional tag pill", () => {
    render(
      <NewsCard
        dateLabel="Rabu, 18 Februari 2026"
        photoCount={8}
        title="Explore KIPK 2026"
        paragraphs={PARAGRAPHS}
        tag="Selesai dilaksanakan & sosialisasi program KIP-K UNJ"
      />,
    );

    expect(
      screen.getByText("Selesai dilaksanakan & sosialisasi program KIP-K UNJ"),
    ).toBeInTheDocument();
  });

  it("selects a thumbnail with a gold ring", () => {
    render(
      <NewsCard
        dateLabel="Rabu, 18 Februari 2026"
        photoCount={4}
        title="Gelar KIPK"
        paragraphs={PARAGRAPHS}
      />,
    );

    const second = screen.getByRole("button", { name: "Lihat foto 2 dari 4" });
    expect(second).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(second);
    expect(second).toHaveAttribute("aria-pressed", "true");
    expect(second.className).toContain("ring-gold");
  });

  it("renders lead title, stage badge and caption when given", () => {
    render(
      <NewsCard
        dateLabel="Rabu, 18 Februari 2026"
        photoCount={8}
        title="Explore KIPK 2026"
        paragraphs={PARAGRAPHS}
        lead
        stageBadge="01 / 04 · Foto"
        caption="Suasana sosialisasi Explore KIPK 2026"
      />,
    );

    const heading = screen.getByRole("heading", { name: "Explore KIPK 2026" });
    expect(heading.className).toContain("text-4xl");
    expect(heading.className).toContain("leading-12");
    expect(screen.getByText("01 / 04 · Foto")).toBeInTheDocument();
    expect(
      screen.getByText("Suasana sosialisasi Explore KIPK 2026"),
    ).toBeInTheDocument();
  });

  it("uses the small badge and caption sizes in the small variant", () => {
    render(
      <NewsCard
        dateLabel="Rabu, 18 Februari 2026"
        photoCount={8}
        title="Explore KIPK 2026"
        paragraphs={PARAGRAPHS}
        small
        stageBadge="01 / 04 · Foto"
        caption="Suasana sosialisasi"
      />,
    );

    expect(screen.getByText("01 / 04 · Foto").className).toContain("text-xs");
    expect(screen.getByText("Suasana sosialisasi").className).toContain(
      "leading-4",
    );
    expect(
      screen.getByRole("heading", { name: "Explore KIPK 2026" }).className,
    ).toContain("text-3xl");
  });
});
