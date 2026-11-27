// Captures real Beranda screenshots for the README header banner.
// Prerequisite: dev server running on http://localhost:3000.
//
// Usage: node scripts/capture-readme-screens.mjs
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const BASE = "http://localhost:3000";
const outDir = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "docs",
  "assets",
  "screenshots",
);
mkdirSync(outDir, { recursive: true });

const shots = [
  {
    name: "desktop-beranda",
    viewport: { width: 1440, height: 900 },
    settle: 1500,
  },
  {
    name: "mobile-beranda",
    viewport: { width: 390, height: 844 },
    settle: 1500,
  },
];

const browser = await chromium.launch();

try {
  for (const shot of shots) {
    const ctx = await browser.newContext({
      viewport: shot.viewport,
      deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    // Let the hero reveal animation and fonts settle before capturing.
    await page.waitForTimeout(shot.settle);
    const out = join(outDir, `${shot.name}.jpg`);
    await page.screenshot({ path: out, type: "jpeg", quality: 90 });
    console.log(
      `captured ${shot.name} (${shot.viewport.width}x${shot.viewport.height}) -> ${out}`,
    );
    await ctx.close();
  }
} finally {
  await browser.close();
}
