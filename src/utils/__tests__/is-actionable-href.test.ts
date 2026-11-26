import { describe, expect, it } from "vitest";

import { isActionableHref } from "@/utils/is-actionable-href";

describe("isActionableHref", () => {
  it("accepts real internal and external URLs", () => {
    expect(isActionableHref("/berita")).toBe(true);
    expect(isActionableHref("https://wa.me/6281945811412")).toBe(true);
  });

  it("rejects placeholders and empty values", () => {
    expect(isActionableHref("#")).toBe(false);
    expect(isActionableHref("  ")).toBe(false);
    expect(isActionableHref("")).toBe(false);
    expect(isActionableHref(undefined)).toBe(false);
    expect(isActionableHref(null)).toBe(false);
  });
});
