# Page: Pengunduran Diri KIPK (/pengunduran-diri) — frame 224:3321 (1440×3024)

Reference screenshot: `docs/figma-specs/pages/form-pengunduran-diri.png`. Feature module: `src/features/pengunduran-diri/{components,data,types,index.ts}`, route `src/app/pengunduran-diri/page.tsx`.

## Structure
1. **Page hero** (1440×294, gradient, batik accent): breadcrumb "Beranda / Form Pengunduran diri dari KIPK", H1 "Pengunduran diri KIPK", sub: "Dibantu oleh divisi KIF Forkip UNJ, kepada mahasiswa KIPK UNJ yang ingin mengundurkan diri diharap untuk membaca informasi di bawah."
2. **Alur pengunduran diri · Referensi resmi** (1200×1166 white card, border, rounded-16): H2 20px "Alur pengunduran diri KIPK 2026"; inside: large official flow diagram image (the Figma frame contains an illustration "ALUR PENGUNDURAN DIRI KIPK 2026" with 8 steps). Implement: download the diagram image asset from Figma (node 224:3502 child illustration) OR recreate simplified 2-row grid of 8 numbered step cards: (1) Mahasiswa Penerima KIP-KULIAH, (2) Unduh surat pengunduran diri klik tombol "Unduh Surat" dibawah, (3) Cetak surat yang sudah di unduh, (4) Isi formulir, beri materi, dan tanda tangan, (5) Scan dan jadikan PDF, (6) Lampirkan pd ke link gform dibawah, (7) Hubungi delegasi fakultas dengan klik "Fakultas" dibawah, (8) Bawa dokumen asli ke Direktorat Kemahasiswaan (Gedung Pop, Lantai 1). Prefer: extract the diagram as image asset (use_figma export) → `public/images/alur-pengunduran-diri.png`; fallback to styled step grid.
3. **Card / Template surat** (1200×143, cream): "Klik tombol di bawah untuk download template surat pengunduran diri" 15px semibold + gold pill "Unduh Surat" (href="#" TODO real doc URL).
4. **Google Form embed** (1200×260 placeholder card): label "GOOGLE FORM TERTANAM" + "Pendataan Pengunduran KIP-K UNJ 2026" (TODO embed).
5. **Pilih fakultas** (1200×270): intro line 15px "Klik tombol di bawah untuk menghubungi delegasi KIF Fakultas:" + 4×2 grid of faculty contact cards (rounded-12, colored per design-style.md faculty colors: FIP #84BC24, FBS teal, FMIPA purple #7A1A7A, FISH red #D40D12, FT blue #005088, FPsi cyan #00A4E4, FEB orange #B25A14, FIKK teal #0F766E; white text): faculty name 16px bold + "Hubungi via WhatsApp" 12px + arrow. hrefs "#" TODO.
6. Footer (shared).

## Tests
- renders H1 "Pengunduran diri KIPK", "Alur pengunduran diri KIPK 2026" (or diagram alt), 8 faculty cards with names, "Unduh Surat" button.
- Playwright: `/pengunduran-diri` loads.
