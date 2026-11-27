// Renders the generated SVG header to a PNG for headless visual verification.
// Usage: node scripts/render-svg-preview.mjs [path-to-svg]
// Defaults to docs/assets/readme-header.svg -> docs/assets/readme-header-preview.png.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "@playwright/test";

const here = dirname(fileURLToPath(import.meta.url));
const svgPath =
  process.argv[2] || join(here, "..", "docs", "assets", "readme-header.svg");
const outPath = join(here, "..", "docs", "assets", "readme-header-preview.png");

// The generator exports the canvas size; fall back to the SVG root attributes.
const svg = readFileSync(svgPath, "utf8");
const wMatch = svg.match(/width="(\d+)"/);
const hMatch = svg.match(/height="(\d+)"/);
const width =
  Number(process.env.SVG_PREVIEW_W) || (wMatch ? Number(wMatch[1]) : 1400);
const height =
  Number(process.env.SVG_PREVIEW_H) || (hMatch ? Number(hMatch[1]) : 640);

const browser = await chromium.launch();

try {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(pathToFileURL(svgPath).href, { waitUntil: "networkidle" });
  await page.waitForTimeout(300); // let the embedded screenshots decode
  await page.screenshot({ path: outPath });
} finally {
  await browser.close();
}

console.log(`rendered ${outPath} (${width}x${height})`);
