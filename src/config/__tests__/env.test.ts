import { describe, expect, it } from "vitest";

import { parseEnv } from "@/config/env";

describe("parseEnv", () => {
  it("applies default values when variables are omitted", () => {
    expect(parseEnv({})).toEqual({
      NODE_ENV: "development",
      NEXT_PUBLIC_APP_URL: "http://localhost:3000",
    });
  });

  it("accepts valid overrides", () => {
    expect(
      parseEnv({
        NODE_ENV: "production",
        NEXT_PUBLIC_APP_URL: "https://example.com",
      }),
    ).toEqual({
      NODE_ENV: "production",
      NEXT_PUBLIC_APP_URL: "https://example.com",
    });
  });

  it("rejects an invalid NEXT_PUBLIC_APP_URL", () => {
    expect(() =>
      parseEnv({
        NODE_ENV: "development",
        NEXT_PUBLIC_APP_URL: "not-a-valid-url",
      }),
    ).toThrow();
  });

  it("rejects an invalid NODE_ENV", () => {
    expect(() =>
      parseEnv({
        NODE_ENV: "staging",
      }),
    ).toThrow();
  });
});
