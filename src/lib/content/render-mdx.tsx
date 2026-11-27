import "server-only";

import { evaluate } from "@mdx-js/mdx";
import type { ReactNode } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

/** Only these intrinsic elements may be used by content MDX bodies. */
const allowedComponents = {
  a: "a",
  p: "p",
  ul: "ul",
  ol: "ol",
  li: "li",
  strong: "strong",
  em: "em",
  code: "code",
  blockquote: "blockquote",
} as const;

const importPattern = /^\s*(?:import|export)\s/m;

/**
 * Renders an MDX body with a fixed element allowlist. Content files are
 * first-party, but imports and exports are rejected so a body cannot pull in
 * arbitrary modules or redefine the rendered component.
 */
export async function renderMdxBody(source: string): Promise<ReactNode> {
  if (importPattern.test(source)) {
    throw new Error("MDX bodies may not contain imports or exports.");
  }

  const { default: MDXContent } = await evaluate(source, {
    Fragment,
    jsx,
    jsxs,
    development: false,
  });

  return MDXContent({ components: allowedComponents });
}
