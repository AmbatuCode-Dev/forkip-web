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

const AVAILABILITY = "Hubungi admin BKK untuk mengetahui ketersediaan barang.";
const FOOTNOTE =
  "Foto merupakan ilustrasi. Hubungi admin BKK untuk detail barang.";
const HT_PARAGRAPH =
  "Radio dua arah (HT) untuk koordinasi tim selama kegiatan. Perangkat mendukung beberapa kanal komunikasi dan dilengkapi earpiece.";
const SPEAKER_PARAGRAPH =
  "Pengeras suara dan mikrofon untuk mendukung kegiatan di dalam maupun di luar ruangan.";
const KOMPOR_PARAGRAPH =
  "Kompor ringkas dengan kaki lipat yang mudah dibawa. Kompor menggunakan gas butana dalam kemasan kaleng.";
const NESTING_PARAGRAPH =
  "Set peralatan masak berbahan aluminium anodisasi yang ringan dan dikemas dalam tas jaring. Set yang tercantum meliputi panci, wajan, dua mangkuk, sendok nasi, dan spons pembersih.";
const PROYEKTOR_PARAGRAPH =
  "Proyektor multimedia untuk menampilkan materi presentasi atau video pada layar yang lebih besar.";

const joinedBody = (paragraph: string) =>
  `${AVAILABILITY} ${paragraph} ${FOOTNOTE}`;

describe("PenyewaanView", () => {
  it("renders hero, note with real admin links, and the embedded form without a form label", () => {
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

    expect(screen.queryByText("GOOGLE FORM TERTANAM")).not.toBeInTheDocument();
    expect(
      screen.getByText("Peminjaman Barang Forkip UNJ 2026"),
    ).toBeInTheDocument();
    expect(
      screen.getByTitle("Peminjaman Barang Forkip UNJ 2026"),
    ).toHaveAttribute("src", FORM_EMBED_URL);
  });

  it("renders the heading and 5 shared accordions with their titles, images and joined bodies", () => {
    render(<PenyewaanView />);

    expect(
      screen.getByRole("heading", { name: "Inventaris yang kami sewakan" }),
    ).toBeInTheDocument();

    const items = [
      {
        title: "Handy Talky",
        label: "Placeholder ilustrasi Handy Talky",
        paragraph: HT_PARAGRAPH,
        expanded: true,
      },
      {
        title: "Speaker dan Mic",
        label: "Placeholder ilustrasi Speaker dan Mic",
        paragraph: SPEAKER_PARAGRAPH,
        expanded: false,
      },
      {
        title: "Kompor Portable",
        label: "Placeholder ilustrasi Kompor Portable",
        paragraph: KOMPOR_PARAGRAPH,
        expanded: false,
      },
      {
        title: "Nesting",
        label: "Placeholder ilustrasi Nesting",
        paragraph: NESTING_PARAGRAPH,
        expanded: false,
      },
      {
        title: "Proyektor",
        label: "Placeholder ilustrasi Proyektor",
        paragraph: PROYEKTOR_PARAGRAPH,
        expanded: false,
      },
    ];
    for (const { title, label, paragraph, expanded } of items) {
      expect(
        screen.getByRole("button", { name: new RegExp(title) }),
      ).toBeInTheDocument();
      // The shared accordion shows a thumbnail in the header and a larger
      // image inside the body; the latter is only accessible when expanded.
      expect(
        screen.getAllByRole("img", { name: `Foto ${label} (placeholder)` }),
      ).toHaveLength(expanded ? 2 : 1);
      expect(screen.getByText(joinedBody(paragraph))).toBeInTheDocument();
    }
  });

  it("expands Handy Talky by default with one body joining meta, paragraph and footnote", () => {
    render(<PenyewaanView />);

    const toggle = screen.getByRole("button", { name: /Handy Talky/ });
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    const regionId = toggle.getAttribute("aria-controls");
    expect(regionId).not.toBeNull();
    const region = document.getElementById(regionId ?? "");
    expect(region).not.toBeNull();
    expect(region).toHaveAttribute("aria-labelledby", toggle.id);

    const body = joinedBody(HT_PARAGRAPH);
    expect(screen.getAllByText(body)).toHaveLength(1);
    expect(within(region as HTMLElement).getByText(body)).toBeVisible();
    expect(screen.queryByText(AVAILABILITY)).not.toBeInTheDocument();
    expect(screen.queryByText(FOOTNOTE)).not.toBeInTheDocument();
  });

  it("keeps other items collapsed until clicked and collapses them again", () => {
    render(<PenyewaanView />);

    const proyektor = screen.getByRole("button", { name: /Proyektor/ });
    const body = joinedBody(PROYEKTOR_PARAGRAPH);
    expect(proyektor).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText(body)).not.toBeVisible();

    fireEvent.click(proyektor);
    expect(proyektor).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(body)).toBeVisible();

    fireEvent.click(proyektor);
    expect(proyektor).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText(body)).not.toBeVisible();
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
