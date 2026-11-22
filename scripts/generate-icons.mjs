/**
 * Generates favicon.ico + PNG icon set from src/app/icon.svg.
 * Run: node scripts/generate-icons.mjs
 */

import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svgPath = join(root, "src", "app", "icon.svg");
const outDir = join(root, "src", "app");
mkdirSync(outDir, { recursive: true });

const svg = await sharp(svgPath, { density: 300 });

// PNG icons (Next.js app icon convention reads icon.svg + png sizes)
for (const size of [192, 512]) {
  await sharp(svgPath, { density: 300 })
    .resize(size, size)
    .png()
    .toFile(join(outDir, `icon${size === 192 ? "-192" : ""}.png`));
  console.log(`icon${size === 192 ? "-192" : ""}.png written`);
}

// favicon.ico (32x32 + 16x16 embedded)
const png32 = await sharp(svgPath, { density: 300 })
  .resize(32, 32)
  .png()
  .toBuffer();
const png16 = await sharp(svgPath, { density: 300 })
  .resize(16, 16)
  .png()
  .toBuffer();
// ICO container: header + directory + combined PNG payload
const dir = Buffer.alloc(6 + 16 * 2);
dir.writeUInt16LE(0, 0); // reserved
dir.writeUInt16LE(1, 2); // type icon
dir.writeUInt16LE(2, 4); // 2 images
dir.writeUInt8(16, 6); // 16px
dir.writeUInt8(16, 7);
dir.writeUInt8(0, 10); // planes
dir.writeUInt8(1, 12); // bpp (png)
dir.writeUInt32LE(png16.length, 14);
dir.writeUInt32LE(6 + 32, 18); // offset
dir.writeUInt8(32, 22);
dir.writeUInt8(32, 23);
dir.writeUInt32LE(png32.length, 30);
dir.writeUInt32LE(6 + 32 + png16.length, 34);
const ico = Buffer.concat([dir, png16, png32]);
const { writeFileSync } = await import("node:fs");
writeFileSync(join(outDir, "favicon.ico"), ico);
console.log("favicon.ico written");

// apple-touch-icon (180x180 with white padding background)
await sharp(svgPath, { density: 300 })
  .resize(140, 140)
  .extend({
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
    background: { r: 251, g: 250, b: 246, alpha: 1 },
  })
  .png()
  .toFile(join(outDir, "apple-icon.png"));
console.log("apple-icon.png written");
