import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StrictMode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { cleanup, renderWithProviders, screen } from "@/testing/test-utils";

type MatchMediaContext = {
  query: string;
  active: boolean;
  cleanup?: () => void;
  activate: () => void;
};

// Mocks live at the external-package boundary only: lenis/gsap own rAF and
// scroll, which jsdom cannot provide. The ticker and matchMedia mocks keep the
// real add/remove/revert contracts so leaks and preference changes are
// observable.
const engine = vi.hoisted(() => ({
  reducedMotion: false,
  lenisInstances: [] as Array<{
    raf: ReturnType<typeof vi.fn>;
    destroy: ReturnType<typeof vi.fn>;
    emit: (event: string) => void;
  }>,
  tickerCallbacks: new Set<(time: number) => void>(),
  matchMediaContexts: [] as MatchMediaContext[],
  unrelatedTrigger: { kill: vi.fn() },
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
    },
    matchMedia: () => {
      const localContexts: MatchMediaContext[] = [];

      const mm = {
        add(query: string, func: () => (() => void) | undefined) {
          const context: MatchMediaContext = {
            query,
            active: false,
            cleanup: undefined,
            activate: () => {
              const matches = window.matchMedia(query).matches;
              if (matches && !context.active) {
                const result = func();
                context.cleanup =
                  typeof result === "function" ? result : undefined;
                context.active = true;
              } else if (!matches && context.active) {
                context.cleanup?.();
                context.cleanup = undefined;
                context.active = false;
              }
            },
          };
          localContexts.push(context);
          engine.matchMediaContexts.push(context);
          context.activate();
          return mm;
        },
        revert() {
          for (const context of localContexts) {
            if (context.active) {
              context.cleanup?.();
              context.cleanup = undefined;
              context.active = false;
            }
            const index = engine.matchMediaContexts.indexOf(context);
            if (index >= 0) {
              engine.matchMediaContexts.splice(index, 1);
            }
          }
        },
      };

      return mm;
    },
  },
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    update: vi.fn(),
    getAll: vi.fn(() => [engine.unrelatedTrigger]),
  },
}));

function stubReducedMotion(matches: boolean) {
  engine.reducedMotion = matches;
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
      matches: query.includes("no-preference")
        ? !engine.reducedMotion
        : engine.reducedMotion,
      media: query,
    })),
  );
}

function setReducedMotion(matches: boolean) {
  stubReducedMotion(matches);
  for (const context of [...engine.matchMediaContexts]) {
    context.activate();
  }
}

function activeLenisInstances() {
  return engine.lenisInstances.filter(
    (instance) => instance.destroy.mock.calls.length === 0,
  );
}

beforeEach(() => {
  engine.lenisInstances.length = 0;
  engine.tickerCallbacks.clear();
  engine.matchMediaContexts.length = 0;
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

  it("registers the ScrollTrigger plugin", () => {
    renderWithProviders(
      <SmoothScroll>
        <p>Page content</p>
      </SmoothScroll>,
    );

    expect(gsap.registerPlugin).toHaveBeenCalledWith(ScrollTrigger);
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

  it("does not kill unrelated ScrollTriggers on unmount", () => {
    const { unmount } = renderWithProviders(
      <SmoothScroll>
        <p>Page content</p>
      </SmoothScroll>,
    );

    unmount();

    expect(engine.unrelatedTrigger.kill).not.toHaveBeenCalled();
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

  it("starts and stops the engine when the reduced-motion preference changes", () => {
    stubReducedMotion(true);
    renderWithProviders(
      <SmoothScroll>
        <p>Page content</p>
      </SmoothScroll>,
    );

    expect(engine.lenisInstances).toHaveLength(0);
    expect(engine.tickerCallbacks.size).toBe(0);

    setReducedMotion(false);
    expect(engine.lenisInstances).toHaveLength(1);
    expect(engine.tickerCallbacks.size).toBe(1);

    const [lenis] = engine.lenisInstances;
    setReducedMotion(true);
    expect(lenis.destroy).toHaveBeenCalled();
    expect(engine.tickerCallbacks.size).toBe(0);

    setReducedMotion(false);
    expect(engine.lenisInstances).toHaveLength(2);
    expect(engine.tickerCallbacks.size).toBe(1);
  });

  it("creates exactly one engine under StrictMode mount/unmount/mount", () => {
    renderWithProviders(
      <StrictMode>
        <SmoothScroll>
          <p>Page content</p>
        </SmoothScroll>
      </StrictMode>,
    );

    expect(activeLenisInstances()).toHaveLength(1);
    expect(engine.tickerCallbacks.size).toBe(1);
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
