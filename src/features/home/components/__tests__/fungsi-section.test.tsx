import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@/testing/test-utils";
import { fungsiItems, fungsiSection } from "../../data";
import { FungsiSection } from "../fungsi-section";

const VIDEO_SRC = "https://www.youtube-nocookie.com/embed/G338TUmvp1Q";

const engine = vi.hoisted(() => ({
  motion: true,
  contexts: [] as Array<{ revert: ReturnType<typeof vi.fn> }>,
  fromTo: [] as unknown[][],
  medias: [] as Array<{
    add: ReturnType<typeof vi.fn>;
    revert: ReturnType<typeof vi.fn>;
  }>,
  cleanups: [] as Array<() => void>,
}));

vi.mock("gsap", () => ({
  gsap: {
    registerPlugin: vi.fn(),
    matchMedia: vi.fn(() => {
      const media = {
        add: vi.fn((_query: string, callback: () => () => void) => {
          if (engine.motion) {
            const cleanup = callback();
            if (typeof cleanup === "function") {
              engine.cleanups.push(cleanup);
            }
          }
        }),
        revert: vi.fn(() => {
          for (const cleanup of engine.cleanups) {
            cleanup();
          }
          engine.cleanups.length = 0;
        }),
      };
      engine.medias.push(media);
      return media;
    }),
    context: vi.fn((callback: () => void) => {
      const context = { revert: vi.fn() };
      engine.contexts.push(context);
      callback();
      return context;
    }),
    fromTo: vi.fn((...args: unknown[]) => {
      engine.fromTo.push(args);
    }),
  },
}));

vi.mock("gsap/ScrollTrigger", () => ({ ScrollTrigger: { update: vi.fn() } }));

beforeEach(() => {
  engine.motion = true;
  engine.contexts.length = 0;
  engine.fromTo.length = 0;
  engine.medias.length = 0;
  engine.cleanups.length = 0;
  vi.clearAllMocks();
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({ matches: engine.motion, media: query })),
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("FungsiSection", () => {
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

    expect(document.querySelector("iframe")).toHaveAttribute("src", VIDEO_SRC);
  });

  it("ships a pending marker in SSR markup so reveals cannot flash", () => {
    const html = renderToString(<FungsiSection />);

    expect(html).toContain('data-fungsi-motion="pending"');
    expect(html).toContain(fungsiSection.title);
  });

  it("reveals the header, each item and the video on scroll, then cleans up", () => {
    const { unmount } = render(<FungsiSection />);
    const root = screen.getByTestId("fungsi-section");

    expect(root).toHaveAttribute("data-fungsi-motion", "on");
    expect(gsap.registerPlugin).toHaveBeenCalledWith(ScrollTrigger);
    expect(engine.contexts).toHaveLength(1);
    expect(engine.fromTo).toHaveLength(1);

    const [targets, from, to] = engine.fromTo[0] as [
      NodeList,
      Record<string, number>,
      Record<string, unknown> & {
        scrollTrigger: { start: string; once: boolean };
      },
    ];
    // H2, subtitle, four numbered items, video panel.
    expect(targets).toHaveLength(fungsiItems.length + 3);
    expect(from).toEqual({ opacity: 0, y: 12 });
    expect(to.scrollTrigger.start).toBe("top 80%");
    expect(to.scrollTrigger.once).toBe(true);

    unmount();

    expect(engine.contexts[0].revert).toHaveBeenCalled();
    expect(engine.medias[0].revert).toHaveBeenCalled();
    expect(root).toHaveAttribute("data-fungsi-motion", "off");
  });

  it("renders everything instantly when reduced motion is preferred", () => {
    engine.motion = false;

    render(<FungsiSection />);

    expect(screen.getByTestId("fungsi-section")).toHaveAttribute(
      "data-fungsi-motion",
      "off",
    );
    expect(engine.contexts).toHaveLength(0);
    expect(engine.fromTo).toHaveLength(0);
    expect(screen.getAllByRole("listitem")).toHaveLength(fungsiItems.length);
  });
});
