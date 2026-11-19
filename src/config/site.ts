import type { SiteConfig } from "@/types";

export const siteConfig = {
  name: "forkip-web",
  description:
    "Next.js App Router boilerplate with TypeScript, Tailwind CSS, Biome, Vitest, and Playwright.",
  nav: [{ label: "Home", href: "/" }] as const,
} satisfies SiteConfig;
