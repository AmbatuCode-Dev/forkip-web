import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  act,
  cleanup,
  type RenderResult,
  renderWithProviders,
} from "@/testing/test-utils";
import { DelegasiScrolly } from "../delegasi-scrolly";

type ScrollTriggerVars = {
  end: () => string;
  pin: Element;
  onRefresh: (self: { start: number; end: number }) => void;
  onUpdate: (self: { progress: number }) => void;
};

const engine = vi.hoisted(() => ({
  motion: true,
  contexts: [] as Array<{ revert: ReturnType<typeof vi.fn> }>,
  timelines: [] as Array<{
    vars: Record<string, unknown>;
    to: ReturnType<typeof vi.fn>;
  }>,
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
    set: vi.fn(),
    timeline: vi.fn((vars: Record<string, unknown>) => {
      const timeline = { to: vi.fn() };
      timeline.to.mockReturnValue(timeline);
      engine.timelines.push({ vars, to: timeline.to });
      return timeline;
    }),
  },
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: { update: vi.fn() },
}));

function triggerVars(): ScrollTriggerVars {
  const trigger = engine.timelines[0].vars.scrollTrigger as
    | ScrollTriggerVars
    | undefined;
  if (!trigger) {
    throw new Error("expected a ScrollTrigger in the timeline config");
  }
  return trigger;
}

function stubSvgGeometry() {
  Object.defineProperty(SVGElement.prototype, "getBBox", {
    configurable: true,
    value: () => ({ x: 100, y: 100, width: 50, height: 50 }),
  });
  Object.defineProperty(SVGElement.prototype, "getTotalLength", {
    configurable: true,
    value: () => 100,
  });
}

beforeEach(() => {
  engine.motion = true;
  engine.contexts.length = 0;
  engine.timelines.length = 0;
  engine.medias.length = 0;
  engine.cleanups.length = 0;
  vi.clearAllMocks();
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({ matches: engine.motion, media: query })),
  );
  stubSvgGeometry();
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("DelegasiScrolly", () => {
  it("keeps the static complete logo when reduced motion is preferred", () => {
    engine.motion = false;

    const view: RenderResult = renderWithProviders(<DelegasiScrolly />);
    const root = view.getByTestId("delegasi-scrolly");

    expect(view.getByTestId("delegasi-logo")).toHaveAttribute(
      "data-state",
      "complete",
    );
    expect(root).not.toHaveAttribute("data-scroll-end");
    expect(engine.contexts).toHaveLength(0);
    expect(engine.timelines).toHaveLength(0);
    expect(root.querySelectorAll('[data-active="true"]')).toHaveLength(0);

    view.unmount();
    expect(engine.medias[0].revert).toHaveBeenCalled();
  });

  it("pops the pin, publishes its measurements and starts in building state", () => {
    const view = renderWithProviders(<DelegasiScrolly />);
    const root = view.getByTestId("delegasi-scrolly");

    expect(gsap.registerPlugin).toHaveBeenCalledWith(ScrollTrigger);
    expect(view.getByTestId("delegasi-logo")).toHaveAttribute(
      "data-state",
      "building",
    );
    expect(engine.contexts).toHaveLength(1);
    expect(engine.timelines).toHaveLength(1);

    const trigger = triggerVars();
    expect(trigger.end()).toBe(`+=${window.innerHeight * 3.5}`);
    expect(trigger.pin).toBe(root.firstElementChild);

    act(() => trigger.onRefresh({ start: 120, end: 1560 }));
    expect(root).toHaveAttribute("data-scroll-start", "120");
    expect(root).toHaveAttribute("data-scroll-end", "1560");
  });

  it("tracks a mid-reveal faculty and the completed state", () => {
    const view = renderWithProviders(<DelegasiScrolly />);
    const root = view.getByTestId("delegasi-scrolly");
    const logo = view.getByTestId("delegasi-logo");
    const trigger = triggerVars();

    act(() => trigger.onUpdate({ progress: 0.6 }));
    expect(logo).toHaveAttribute("data-state", "building");
    expect(root.querySelector('[data-faculty-code="FMIPA"]')).toHaveAttribute(
      "data-active",
      "true",
    );

    act(() => trigger.onUpdate({ progress: 1 }));
    expect(logo).toHaveAttribute("data-state", "complete");
    expect(root.querySelector('[data-faculty-code="FBS"]')).toHaveAttribute(
      "data-active",
      "true",
    );
  });

  it("restores the complete state and reverts GSAP when motion is switched off", () => {
    const view = renderWithProviders(<DelegasiScrolly />);
    const root = view.getByTestId("delegasi-scrolly");
    const logo = view.getByTestId("delegasi-logo");

    expect(logo).toHaveAttribute("data-state", "building");

    // gsap.matchMedia calls the callback's cleanup on a runtime preference
    // change; simulate that path directly for a deterministic assertion.
    act(() => {
      const [cleanup] = engine.cleanups;
      engine.cleanups.length = 0;
      cleanup();
    });

    expect(engine.contexts[0].revert).toHaveBeenCalled();
    expect(root.querySelector("[data-logo-trace]")).toBeNull();
    expect(logo).toHaveAttribute("data-state", "complete");
    expect(root).not.toHaveAttribute("data-scroll-end");
    expect(root.querySelectorAll('[data-active="true"]')).toHaveLength(0);

    view.unmount();
    expect(engine.medias[0].revert).toHaveBeenCalled();
  });

  it("stays in the static fallback without matchMedia (jsdom)", () => {
    vi.stubGlobal("matchMedia", undefined);

    const view = renderWithProviders(<DelegasiScrolly />);

    expect(engine.medias).toHaveLength(0);
    expect(view.getByTestId("delegasi-logo")).toHaveAttribute(
      "data-state",
      "complete",
    );
  });
});
