import { describe, expect, it } from "vitest";

import { cn } from "@/utils/cn";

describe("cn", () => {
  it("merges class names and resolves Tailwind conflicts", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("handles conditional, falsy, and array inputs", () => {
    const isActive = true;
    const isDisabled = false;

    expect(
      cn(
        "base",
        isActive && "text-foreground",
        isDisabled && "opacity-50",
        undefined,
        null,
        ["rounded-md", { "font-medium": true, hidden: false }],
      ),
    ).toBe("base text-foreground rounded-md font-medium");
  });
});
