import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, renderWithProviders } from "@/testing/test-utils";
import { HeroMotion } from "../hero-motion";

const engine = vi.hoisted(() => ({
  motion: true,
  contexts: [] as Array<{ revert: ReturnType<typeof vi.fn> }>,
  from: [] as unknown[][],
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
    from: vi.fn((...args: unknown[]) => {
      engine.from.push(args);
    }),
    fromTo: vi.fn((...args: unknown[]) => {
      engine.fromTo.push(args);
    }),
  },
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: { update: vi.fn() },
}));

beforeEach(() => {
  engine.motion = true;
  engine.contexts.length = 0;
  engine.from.length = 0;
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

describe("HeroMotion", () => {
  it("ships a pending marker in SSR markup so the copy cannot flash", () => {
    const html = renderToString(
      <HeroMotion>
        <h1 data-hero-reveal>Forum KIPK UNJ</h1>
      </HeroMotion>,
    );

    expect(html).toContain('data-motion="pending"');
    expect(html).toContain("Forum KIPK UNJ");
  });

  it("builds the reveal with motion enabled and clears the marker on teardown", () => {
    const { container, unmount } = renderWithProviders(
      <HeroMotion>
        <h1 data-hero-reveal>Forum</h1>
        <div data-hero-photo>photo</div>
      </HeroMotion>,
    );
    const root = container.firstElementChild as HTMLElement;

    expect(root).toHaveAttribute("data-motion", "ready");
    expect(gsap.registerPlugin).toHaveBeenCalledWith(ScrollTrigger);
    expect(engine.contexts).toHaveLength(1);
    expect(engine.from[0][0]).toBe("[data-hero-reveal]");
    expect(engine.fromTo[0][0]).toBe("[data-hero-photo]");

    unmount();

    expect(engine.contexts[0].revert).toHaveBeenCalled();
    expect(engine.medias[0].revert).toHaveBeenCalled();
    expect(root).toHaveAttribute("data-motion", "ready");
  });

  it("leaves the copy untouched when reduced motion is preferred", () => {
    engine.motion = false;

    const { container } = renderWithProviders(
      <HeroMotion>
        <h1 data-hero-reveal>Forum</h1>
      </HeroMotion>,
    );
    const root = container.firstElementChild as HTMLElement;

    expect(engine.contexts).toHaveLength(0);
    expect(engine.from).toHaveLength(0);
    expect(root).toHaveAttribute("data-motion", "ready");
  });

  it("still clears the marker without matchMedia (jsdom fallback)", () => {
    vi.stubGlobal("matchMedia", undefined);

    const { container } = renderWithProviders(
      <HeroMotion>
        <h1 data-hero-reveal>Forum</h1>
      </HeroMotion>,
    );

    expect(engine.medias).toHaveLength(0);
    expect((container.firstElementChild as HTMLElement).dataset.motion).toBe(
      "ready",
    );
  });
});
