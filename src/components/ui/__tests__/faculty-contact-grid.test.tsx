import { afterEach, describe, expect, it } from "vitest";
import { FacultyContactGrid } from "@/components/ui/faculty-contact-grid";
import { cleanup, render, screen } from "@/testing/test-utils";

afterEach(cleanup);

const items = [
  { code: "FIP", color: "#84BC24" },
  { code: "FBS", color: "#00A898" },
  { code: "FIKK", color: "#0F766E", outline: true },
];

describe("FacultyContactGrid", () => {
  it("renders the label and one WhatsApp tile per faculty", () => {
    render(
      <FacultyContactGrid
        items={items}
        label="Pilih delegasi fakultas Anda untuk menghubungi KIF:"
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: "Pilih delegasi fakultas Anda untuk menghubungi KIF:",
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(3);
    expect(screen.getAllByText("Hubungi via WhatsApp")).toHaveLength(3);
  });

  it("links every tile to the placeholder href with an accessible name", () => {
    render(<FacultyContactGrid items={items} label="Delegasi fakultas" />);

    for (const code of ["FIP", "FBS", "FIKK"]) {
      expect(
        screen.getByRole("link", {
          name: `Hubungi delegasi ${code} via WhatsApp`,
        }),
      ).toHaveAttribute("href", "#");
    }
  });

  it("fills solid tiles with the faculty color via inline style", () => {
    render(<FacultyContactGrid items={items} label="Delegasi fakultas" />);

    const fip = screen.getByRole("link", {
      name: "Hubungi delegasi FIP via WhatsApp",
    });
    expect(fip).toHaveStyle({ backgroundColor: "#84BC24" });
    expect(fip.className).toContain("text-white");
    expect(fip.className).toContain("border-transparent");
  });

  it("renders the outline tile (FIKK) white with teal border and dark text", () => {
    render(<FacultyContactGrid items={items} label="Delegasi fakultas" />);

    const fikk = screen.getByRole("link", {
      name: "Hubungi delegasi FIKK via WhatsApp",
    });
    expect(fikk.className).toContain("bg-white");
    expect(fikk.className).toContain("border-teal");
    expect(fikk.className).toContain("text-ink");
    expect(fikk).not.toHaveStyle({ backgroundColor: "#0F766E" });
  });
});
