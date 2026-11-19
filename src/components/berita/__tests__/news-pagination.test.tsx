import { afterEach, describe, expect, it, vi } from "vitest";
import { NewsPagination } from "@/components/berita/news-pagination";
import { cleanup, fireEvent, render, screen } from "@/testing/test-utils";

afterEach(cleanup);

describe("NewsPagination", () => {
  it("renders the Indonesian total text", () => {
    render(<NewsPagination page={1} totalPages={2} totalItems={8} />);

    expect(
      screen.getByText(/Total 8 berita dipublikasikan/),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Halaman 1 dari 2/).length).toBeGreaterThan(0);
  });

  it("marks the current page gold with aria-current", () => {
    render(<NewsPagination page={2} totalPages={3} totalItems={8} />);

    const current = screen.getByText("2");
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current.className).toContain("bg-[#F6D34A]");
  });

  it("disables Sebelumnya on page 1 (callback mode)", () => {
    const onPageChange = vi.fn();
    render(
      <NewsPagination
        page={1}
        totalPages={2}
        totalItems={8}
        onPageChange={onPageChange}
      />,
    );

    const prev = screen.getByRole("button", { name: "Halaman sebelumnya" });
    expect(prev).toBeDisabled();

    fireEvent.click(prev);
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("disables Berikutnya on the last page and fires page changes otherwise", () => {
    const onPageChange = vi.fn();
    const { rerender } = render(
      <NewsPagination
        page={1}
        totalPages={2}
        totalItems={8}
        onPageChange={onPageChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Halaman berikutnya" }));
    expect(onPageChange).toHaveBeenCalledWith(2);

    rerender(
      <NewsPagination
        page={2}
        totalPages={2}
        totalItems={8}
        onPageChange={onPageChange}
      />,
    );
    expect(
      screen.getByRole("button", { name: "Halaman berikutnya" }),
    ).toBeDisabled();
  });

  it("renders href-based controls with basePath", () => {
    render(
      <NewsPagination
        page={1}
        totalPages={2}
        totalItems={8}
        basePath="/berita"
      />,
    );

    const next = screen.getByRole("link", { name: "Halaman berikutnya" });
    expect(next).toHaveAttribute("href", "/berita?halaman=2");
    expect(screen.getByRole("link", { name: "Halaman 2" })).toHaveAttribute(
      "href",
      "/berita?halaman=2",
    );
  });
});
