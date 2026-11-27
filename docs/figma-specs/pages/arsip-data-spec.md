# Page: Arsip Data (/arsip-data) — frame 224:3597 (1440×1761)

Reference screenshot: `docs/figma-specs/pages/arsip-data.png`. Feature module: `src/features/arsip-data/{components,data,types,index.ts}`, route `src/app/arsip-data/page.tsx`.

## Structure
1. **Page hero** (1440×294, gradient cream→gold, batik accent right): breadcrumb "Beranda / Arsip Data Tiap Divisi", H1 "Arsip data" (48px bold), sub 16px: "Halaman ini disediakan sebagai arsip data tiap divisi di Forum KIPK UNJ, untuk kelancaran administrasi khususnya arsip proposal, RAB, dan LPJ. (Akses file terbatas S&K berlaku)"
2. **Direktori arsip · Indeks divisi** (1200×672): two-column layout:
   - Left rail (~300px): eyebrow 12px bold uppercase gold-dark "DIREKTORI DIVISI", heading 32px semibold 3 lines "Temukan arsip berdasarkan divisi.", caption 13px muted "Proposal, RAB, dan LPJ. Akses file terbatas; syarat dan ketentuan berlaku."
   - Right: numbered rows (7), each h-~88 with top border #E8E5DA: number "01"…"07" (13px muted tabular), division name 20px bold uppercase ink900, right side: "Akses terbatas" 13px muted + gold link "Buka folder" 14px semibold with arrow →.
   Divisions: 01 KETUM/WAKETUM, 02 KIF, 03 SOSDIKLAT, 04 PSDM, 05 HUMAS, 06 ADVOKASI, 07 SEKRETARIS. hrefs "#" (TODO real Drive links).
3. Footer (shared).

## Tests
- renders H1 "Arsip data", eyebrow "DIREKTORI DIVISI", all 7 division names in order, "Buka folder" links ×7.
- Playwright: `/arsip-data` loads.
