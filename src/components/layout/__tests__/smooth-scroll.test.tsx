import { ScrollTrigger } from "gsap/ScrollTrigger";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { cleanup, renderWithProviders, screen } from "@/testing/test-utils";

// Mocks live at the external-package boundary only: lenis/gsap own rAF and
// scroll, which jsdom cannot provide. The ticker mock keeps the real
// add/remove contract so leaks are observable.
const engine = vi.hoisted(() => ({
  lenisInstances: [] as Array<{
    raf: ReturnType<typeof vi.fn>;
    destroy: ReturnType<typeof vi.fn>;
    emit: (event: string) => void;
  }>,
  tickerCallbacks: new Set<(time: number) => void>(),
}));

vi.mock("lenis", () => {
  class LenisMock {
    raf = vi.fn();
    destroy = vi.fn();
    private listeners = new Map<string, Array<() => void>>();

    constructor() {
      engine.lenisInstances.push(this);
    }

    on(event: string, listener: () => void) {
      const listeners = this.listeners.get(event) ?? [];
      listeners.push(listener);
      this.listeners.set(event, listeners);
    }

    emit(event: string) {
      for (const listener of this.listeners.get(event) ?? []) {
        listener();
      }
    }
  }
  return { default: LenisMock };
});

vi.mock("gsap", () => ({
  gsap: {
    registerPlugin: vi.fn(),
    ticker: {
      add: (callback: (time: number) => void) => {
        engine.tickerCallbacks.add(callback);
      },
      remove: (callback: (time: number) => void) => {
        engine.tickerCallbacks.delete(callback);
      },
      lagSmoothing: vi.fn(),
    },
  },
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    update: vi.fn(),
    getAll: vi.fn(() => []),
  },
}));

function stubReducedMotion(matches: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({ matches, media: query })),
  );
}

beforeEach(() => {
  engine.lenisInstances.length = 0;
  engine.tickerCallbacks.clear();
  vi.clearAllMocks();
  stubReducedMotion(false);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("SmoothScroll", () => {
  it("starts the smooth-scroll engine on mount", () => {
    renderWithProviders(
      <SmoothScroll>
        <p>Page content</p>
      </SmoothScroll>,
    );

    expect(engine.lenisInstances).toHaveLength(1);
    expect(engine.tickerCallbacks.size).toBe(1);

    const [lenis] = engine.lenisInstances;
    const [tick] = [...engine.tickerCallbacks];
    tick(2);
    expect(lenis.raf).toHaveBeenCalledWith(2000);
  });

  it("updates ScrollTrigger when the page scrolls", () => {
    renderWithProviders(
      <SmoothScroll>
        <p>Page content</p>
      </SmoothScroll>,
    );

    const [lenis] = engine.lenisInstances;
    lenis.emit("scroll");

    expect(vi.mocked(ScrollTrigger.update)).toHaveBeenCalled();
  });

  it("tears down the engine completely on unmount", () => {
    const { unmount } = renderWithProviders(
      <SmoothScroll>
        <p>Page content</p>
      </SmoothScroll>,
    );
    const [lenis] = engine.lenisInstances;

    unmount();

    expect(engine.tickerCallbacks.size).toBe(0);
    expect(lenis.destroy).toHaveBeenCalled();
  });

  it("leaves native scrolling untouched when reduced motion is preferred", () => {
    stubReducedMotion(true);

    renderWithProviders(
      <SmoothScroll>
        <p>Page content</p>
      </SmoothScroll>,
    );

    expect(engine.lenisInstances).toHaveLength(0);
    expect(engine.tickerCallbacks.size).toBe(0);
  });

  it("renders its children unchanged", () => {
    renderWithProviders(
      <SmoothScroll>
        <h1>Beranda</h1>
        <p>Forum KIPK UNJ</p>
      </SmoothScroll>,
    );

    expect(
      screen.getByRole("heading", { name: "Beranda" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Forum KIPK UNJ")).toBeInTheDocument();
  });
});
