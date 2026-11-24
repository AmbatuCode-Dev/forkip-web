import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@/testing/test-utils";
import { fungsiItems, fungsiSection } from "../../data";
import { FungsiSection } from "../fungsi-section";

const VIDEO_SRC = "https://www.youtube-nocookie.com/embed/G338TUmvp1Q";

describe("FungsiSection", () => {
  afterEach(cleanup);

  it("renders the heading, subtitle, numbered items and the video iframe", () => {
    render(<FungsiSection />);

    expect(
      screen.getByRole("heading", { name: fungsiSection.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(fungsiSection.subtitle)).toBeInTheDocument();

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(fungsiItems.length);
    items.forEach((li, index) => {
      expect(li.textContent).toContain(fungsiItems[index].text);
    });

    const iframe = document.querySelector("iframe");
    expect(iframe).toHaveAttribute("src", VIDEO_SRC);
  });

  it("marks the root motion state: on when motion is enabled, off when reduced-motion", () => {
    render(<FungsiSection motion={true} />);
    expect(
      document.querySelector('[data-testid="fungsi-section"]'),
    ).toHaveAttribute("data-fungsi-motion", "on");
  });

  it("marks the root motion state as off with reduced motion, renders all items", () => {
    render(<FungsiSection motion={false} />);
    const root = document.querySelector('[data-testid="fungsi-section"]');
    expect(root).toHaveAttribute("data-fungsi-motion", "off");
    screen.getAllByRole("listitem").forEach((li) => {
      expect(li).not.toHaveAttribute("data-fungsi-reveal");
    });
  });
});
