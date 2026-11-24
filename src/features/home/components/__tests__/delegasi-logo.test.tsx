import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@/testing/test-utils";
import { DelegasiLogo } from "../delegasi-logo";

const assetPath = resolve(
  process.cwd(),
  "public/images/forkip-logo-scrolly.svg",
);

afterEach(cleanup);

describe("DelegasiLogo", () => {
  it("names itself for screen readers when the inline SVG is shown", () => {
    render(<DelegasiLogo />);

    expect(
      screen.getByRole("img", { name: "Forum KIPK UNJ" }),
    ).toBeInTheDocument();
  });

  // The reduced-motion fallback is a separate static SVG. Until one file can
  // safely generate the other, this parity check makes a one-sided path edit
  // fail CI instead of silently diverging the two renditions.
  it("keeps every inline path identical to the reduced-motion asset", () => {
    const { container } = render(<DelegasiLogo />);
    const inlinePaths = Array.from(container.querySelectorAll("path")).map(
      (path) => path.getAttribute("d"),
    );
    const assetSource = readFileSync(assetPath, "utf8");
    const assetPaths = Array.from(assetSource.matchAll(/\sd="([^"]+)"/g)).map(
      (match) => match[1],
    );

    expect(inlinePaths.length).toBeGreaterThan(0);
    expect(assetPaths).toEqual(inlinePaths);
  });
});
