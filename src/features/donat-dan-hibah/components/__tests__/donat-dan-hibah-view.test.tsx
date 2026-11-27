import { afterEach, beforeAll, describe, expect, it } from "vitest";
import {
  DonatDanHibahView,
  type FacultyContact,
  getDonatDanHibahFaculties,
} from "@/features/donat-dan-hibah";
import { getFaculties } from "@/lib/content/faculties";
import { cleanup, render, screen, within } from "@/testing/test-utils";

afterEach(cleanup);

let faculties: readonly FacultyContact[] = [];

beforeAll(async () => {
  faculties = await getDonatDanHibahFaculties();
});

function renderView() {
  render(<DonatDanHibahView faculties={faculties} />);
}

describe("DonatDanHibahView", () => {
  it("renders hero with breadcrumb, title, and subtitle", () => {
    renderView();

    expect(
      screen.getByRole("heading", { level: 1, name: "Peminjaman (DONAT)" }),
    ).toBeInTheDocument();
    const breadcrumb = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(
      within(breadcrumb).getByRole("link", { name: "Beranda" }),
    ).toHaveAttribute("href", "/");
    expect(within(breadcrumb).getByText("Donat dan Hibah")).toBeVisible();
    expect(
      screen.getByText(
        "Dikelola oleh Divisi Advokasi dengan proses yang mudah dan cepat. (S&K berlaku)",
      ),
    ).toBeInTheDocument();
  });

  it("renders the Advo delegation line and all 8 faculty tiles in content order", async () => {
    renderView();

    expect(
      screen.getByText(
        "Silakan klik tombol di bawah untuk menghubungi Delegasi Advo fakultasnya masing-masing:",
      ),
    ).toBeInTheDocument();

    const contentFaculties = await getFaculties();
    expect(faculties.map((faculty) => faculty.code)).toEqual(
      contentFaculties.map((faculty) => faculty.code),
    );
    const links = screen.getAllByRole("link", {
      name: /Hubungi delegasi .* via WhatsApp/,
    });
    expect(links).toHaveLength(contentFaculties.length);
    links.forEach((link, index) => {
      expect(
        within(link).getByText(contentFaculties[index].code),
      ).toBeInTheDocument();
    });
    for (const faculty of contentFaculties) {
      expect(
        screen.getByRole("link", {
          name: `Hubungi delegasi ${faculty.code} via WhatsApp`,
        }),
      ).toHaveAttribute("href", "#");
    }
  });

  it("renders the transparency card with restricted-access note and gold button", () => {
    renderView();

    const heading = screen.getByRole("heading", {
      name: "Transparansi dana hibah",
    });
    expect(heading).toBeInTheDocument();
    expect(screen.getByText("*Akses Terbatas")).toBeInTheDocument();

    const button = screen.getByRole("button", { name: "Alokasi dana hibah" });
    expect(button.className).toContain("bg-gold");

    const card = heading.closest("section");
    expect(card).not.toBeNull();
    expect(card?.className).toContain("bg-white");
    expect(card?.className).toContain("border-border-sand");
    expect(card?.className).toContain("rounded-2xl");
  });
});
