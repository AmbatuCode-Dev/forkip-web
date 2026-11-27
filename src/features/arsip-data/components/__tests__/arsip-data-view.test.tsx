import { afterEach, describe, expect, it } from "vitest";
import { ArsipDataView } from "@/features/arsip-data";
import { cleanup, render, screen } from "@/testing/test-utils";

afterEach(cleanup);

describe("ArsipDataView", () => {
  it("renders hero with breadcrumb, H1, and description", () => {
    render(<ArsipDataView />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Arsip data" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Beranda")).toBeInTheDocument();
    expect(screen.getByText("Arsip Data Tiap Divisi")).toBeInTheDocument();
    expect(
      screen.getByText(/Halaman ini disediakan sebagai arsip data tiap divisi/),
    ).toBeInTheDocument();
  });

  it("renders direktori rail eyebrow, heading, and caption", () => {
    render(<ArsipDataView />);

    expect(screen.getByText("DIREKTORI DIVISI")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Temukan arsip berdasarkan divisi.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Proposal, RAB, dan LPJ\. Akses file terbatas/),
    ).toBeInTheDocument();
  });

  it("renders all 7 divisions in order with numbers", () => {
    render(<ArsipDataView />);

    const names = [
      "KETUM/WAKETUM",
      "KIF",
      "SOSDIKLAT",
      "PSDM",
      "HUMAS",
      "ADVOKASI",
      "SEKRETARIS",
    ];
    const listItems = screen.getAllByRole("listitem");

    expect(listItems).toHaveLength(7);
    names.forEach((name, index) => {
      expect(listItems[index]).toHaveTextContent(name);
      expect(listItems[index]).toHaveTextContent(
        String(index + 1).padStart(2, "0"),
      );
      expect(listItems[index]).toHaveTextContent("Akses terbatas");
    });
  });

  it("renders 7 'Buka folder' links with placeholder hrefs", () => {
    render(<ArsipDataView />);

    const links = screen.getAllByRole("link", { name: "Buka folder" });
    expect(links).toHaveLength(7);
    for (const link of links) {
      expect(link).toHaveAttribute("href", "#");
    }
  });
});
