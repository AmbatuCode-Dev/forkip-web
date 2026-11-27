// Generates the README header banner from REAL Beranda screenshots.
// Prerequisite: run `node scripts/capture-readme-screens.mjs` first (dev server on http://localhost:3000).
// Output: docs/assets/readme-header.svg (self-contained screenshots + repo logo, no external assets).
//
// Usage: node scripts/generate-readme-header.mjs
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const outPath = join(root, "docs", "assets", "readme-header.svg");
const desktopPng = join(
  root,
  "docs",
  "assets",
  "screenshots",
  "desktop-beranda.jpg",
);
const mobilePng = join(
  root,
  "docs",
  "assets",
  "screenshots",
  "mobile-beranda.jpg",
);
const logoPath = join(root, "public", "images", "logo-mark.svg");

for (const p of [desktopPng, mobilePng]) {
  if (!existsSync(p)) {
    console.error(
      `missing ${p}\nrun: node scripts/capture-readme-screens.mjs (dev server must be on http://localhost:3000)`,
    );
    process.exit(1);
  }
}

if (!existsSync(logoPath)) {
  console.error(
    `missing ${logoPath} — the Forkip logo mark is required for the banner`,
  );
  process.exit(1);
}

// ── Brand tokens (src/app/globals.css, "Ritme Nusantara" palette) ─────────
const CREAM = "#fbfaf6";
const SAND_100 = "#f4f2ea";
const SAND_200 = "#e8e5da";
const SURFACE = "#ffffff";
const INK = "#1c1c1c";
const BODY = "#404040";
const GOLD = "#f6d34a";
const GOLD_DARK = "#e0b400";
const GOLD_SOFT = "#fbf6df";
const GOLD_INK = "#7a5b00";

const W = 1400;
const H = 640;
// Canvas size, so a preview step in the same process can pick it up.
process.env.SVG_PREVIEW_W = String(W);
process.env.SVG_PREVIEW_H = String(H);

const b64 = (p) => readFileSync(p).toString("base64");

// Real repo logo (public/images/logo-mark.svg), inlined and retinted to this
// repo's own golds. Nesting its SVG keeps the output fully self-contained.
function logoMark(x, y, size) {
  return readFileSync(logoPath, "utf8")
    .replace(
      /<svg[^>]*>/,
      `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 742 742" xmlns="http://www.w3.org/2000/svg">`,
    )
    .replaceAll("#FDE143", GOLD)
    .replaceAll("#F9AB10", GOLD_DARK)
    .trim();
}

// A restrained kawung rosette, echoing public/images/batik-kawung.svg.
function rosette(cx, cy, scale, opacity) {
  return `<g transform="translate(${cx} ${cy}) scale(${scale})" opacity="${opacity}" fill="none" stroke="${GOLD_DARK}" stroke-width="2">
    <circle cx="0" cy="-18" r="13"/>
    <circle cx="0" cy="18" r="13"/>
    <circle cx="-18" cy="0" r="13"/>
    <circle cx="18" cy="0" r="13"/>
    <circle cx="0" cy="0" r="5"/>
  </g>`;
}

const text = (
  x,
  y,
  str,
  size,
  fill,
  weight = 600,
  anchor = "start",
  extra = "",
) =>
  `<text x="${x}" y="${y}" font-family="'Plus Jakarta Sans','Segoe UI',system-ui,-apple-system,sans-serif" font-size="${size}" fill="${fill}" font-weight="${weight}" text-anchor="${anchor}" ${extra}>${String(
    str,
  )
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")}</text>`;

// Browser chrome above a screenshot (rounded window + traffic lights + url pill).
function browserChrome(x, y, w, url) {
  const h = 36;
  return [
    `<path d="M${x + 16} ${y} h${w - 32} a16 16 0 0 1 16 16 v${h - 16} h-${w} v-${h - 16} a16 16 0 0 1 16-16 z" fill="${GOLD_SOFT}"/>`,
    `<line x1="${x}" y1="${y + h}" x2="${x + w}" y2="${y + h}" stroke="${SAND_200}"/>`,
    `<circle cx="${x + 26}" cy="${y + h / 2}" r="5.5" fill="#e07a5f"/>`,
    `<circle cx="${x + 44}" cy="${y + h / 2}" r="5.5" fill="#e7b84b"/>`,
    `<circle cx="${x + 62}" cy="${y + h / 2}" r="5.5" fill="#6f9b64"/>`,
    `<rect x="${x + w / 2 - 120}" y="${y + h / 2 - 10}" width="240" height="20" rx="10" fill="${SURFACE}" stroke="${SAND_200}"/>`,
    text(x + w / 2, y + h / 2 + 4, url, 12, GOLD_INK, 600, "middle"),
  ].join("");
}

function compose() {
  const parts = [];

  // desktop screenshot is 1440x900 CSS px (2x = 2880x1800 actual px)
  const dw = 600;
  const dh = Math.round((dw * 900) / 1440); // 375
  const dx = 500;
  const dy = 150;
  const chromeH = 36;

  // mobile screenshot is 390x844 CSS px (2x = 780x1688 actual px)
  const mw = 200;
  const mh = Math.round((mw * 844) / 390); // 433
  const bezel = 9;
  const mx = dx + dw + 28;
  const my = 134;

  parts.push(`<defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${CREAM}"/>
      <stop offset="0.5" stop-color="${SAND_100}"/>
      <stop offset="1" stop-color="${SAND_200}"/>
    </linearGradient>
    <radialGradient id="glow1" cx="0.08" cy="0.02" r="0.65">
      <stop offset="0" stop-color="rgba(255,255,255,0.85)"/>
      <stop offset="1" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.92" cy="0.98" r="0.6">
      <stop offset="0" stop-color="rgba(246,211,74,0.22)"/>
      <stop offset="1" stop-color="rgba(246,211,74,0)"/>
    </radialGradient>
    <pattern id="batik" width="120" height="120" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
      ${rosette(60, 60, 0.75, 0.14)}
    </pattern>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="${GOLD_INK}" flood-opacity="0.18"/>
    </filter>
    <!-- clip coordinates are local to the nested screenshot SVG -->
    <clipPath id="deskScreen"><path d="M0 0 H1440 V862 A38 38 0 0 1 1402 900 H38 A38 38 0 0 1 0 862 Z"/></clipPath>
    <clipPath id="mobScreen"><rect x="0" y="0" width="390" height="844" rx="24"/></clipPath>
  </defs>`);

  parts.push(`<rect width="${W}" height="${H}" fill="url(#bg)"/>`);
  parts.push(`<rect width="${W}" height="${H}" fill="url(#glow1)"/>`);
  parts.push(`<rect width="${W}" height="${H}" fill="url(#batik)"/>`);
  parts.push(`<rect width="${W}" height="${H}" fill="url(#glow2)"/>`);

  // Understated batik accents balance the empty lower-left of the composition.
  parts.push(rosette(180, 470, 2.6, 0.1));
  parts.push(rosette(360, 560, 1.4, 0.07));

  // ── brand block — left column ──
  parts.push(logoMark(66, 60, 104));
  parts.push(
    text(188, 110, "FORKIP UNJ", 42, INK, 800, "start", `letter-spacing="0.5"`),
  );
  parts.push(
    text(
      189,
      140,
      "Forum KIP-Kuliah Universitas Negeri Jakarta",
      13.5,
      BODY,
      600,
    ),
  );
  parts.push(
    `<rect x="66" y="178" width="48" height="5" rx="2.5" fill="${GOLD_DARK}"/>`,
  );
  parts.push(
    text(
      66,
      234,
      "Portal Informasi &",
      30,
      INK,
      800,
      "start",
      `letter-spacing="-0.4"`,
    ),
  );
  parts.push(
    text(
      66,
      276,
      "Layanan KIP-K UNJ",
      30,
      INK,
      800,
      "start",
      `letter-spacing="-0.4"`,
    ),
  );
  parts.push(
    text(66, 318, "Beranda · Pengumuman · Program · Berita", 14, GOLD_INK, 600),
  );

  // ── desktop mockup — center-right ──
  parts.push(`<g filter="url(#shadow)">
    <rect x="${dx}" y="${dy}" width="${dw}" height="${chromeH + dh}" rx="16" fill="${SURFACE}"/>
  </g>`);
  parts.push(browserChrome(dx, dy, dw, "forkip.unj.ac.id/beranda"));
  parts.push(`<svg x="${dx}" y="${dy + chromeH}" width="${dw}" height="${dh}" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMin slice">
    <g clip-path="url(#deskScreen)">
      <image href="data:image/jpeg;base64,${b64(desktopPng)}" x="0" y="0" width="1440" height="900"/>
    </g>
  </svg>`);
  parts.push(
    `<rect x="${dx}" y="${dy}" width="${dw}" height="${chromeH + dh}" rx="16" fill="none" stroke="${SAND_200}"/>`,
  );

  // ── mobile mockup — right, phone bezel ──
  parts.push(`<g filter="url(#shadow)">
    <rect x="${mx - bezel}" y="${my - bezel}" width="${mw + bezel * 2}" height="${mh + bezel * 2}" rx="28" fill="${INK}"/>
  </g>`);
  parts.push(`<svg x="${mx}" y="${my}" width="${mw}" height="${mh}" viewBox="0 0 390 844" preserveAspectRatio="xMidYMin slice">
    <g clip-path="url(#mobScreen)">
      <image href="data:image/jpeg;base64,${b64(mobilePng)}" x="0" y="0" width="390" height="844"/>
    </g>
  </svg>`);
  parts.push(
    `<rect x="${mx - bezel}" y="${my - bezel}" width="${mw + bezel * 2}" height="${mh + bezel * 2}" rx="28" fill="none" stroke="${GOLD_DARK}" stroke-opacity="0.55"/>`,
  );

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="FORKIP UNJ banner: Beranda page on desktop and mobile, real screenshots">${parts.join("")}</svg>`;
}

const svg = compose();
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, svg, "utf8");
console.log(`wrote ${outPath} (${Math.round(svg.length / 1024)} KB)`);
