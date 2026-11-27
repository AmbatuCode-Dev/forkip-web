# Spec: /berita/[slug] article detail + /pertanyaan-pengaduan redesign (Figma Page 4)

Branch `feat/article-detail-and-aduan` (cut from dev). Gates must pass (biome layering/UI-purity, depcruise, check:structure, lint:tw/css, typecheck, test, build, Playwright CI=true). NO arbitrary Tailwind values (use tokens/standard scale/inline style). NO "use client" in src/app. NO globals.css edits. Copy verbatim. Faculty colors inline style.

## A. /berita/[slug] — Detail Artikel (frame 392:657, 1440×3396)

Route: `src/app/berita/[slug]/page.tsx` (Next 16: async `params` promise, `PageProps<"/berita/[slug]">`). Feature: `src/features/berita-detail/{components,types,data,index.ts}` + `__tests__/`. NOT "use client". Generate static params from existing `newsPosts` (5 slugs: explore-kipk-2026, pelatihan-divisi-kif, busamakip, verifikasi-kipk-snbpt? — use the actual slugs in src/features/berita/data/news-posts.ts; map each post to its detail content, unknown slug → `notFound()`).

Layout (content 1200px, x=120; article column 720px; section pad top-56/bottom-96):
- Breadcrumb (14 Medium): "Beranda / Berita / Explore KIPK 2026" (link /, /berita; current bold-ish SemiBold ink).
- Tag pill "Berita" (12 Bold, gold-soft bg, gold-ink text).
- H1 52/60 ExtraBold ink: post title.
- Subtitle 20/30 Medium body: one-line summary ("Program sosialisasi FORUM KIP-K UNJ untuk memperluas akses informasi KIP-K bagi siswa di Jakarta dan sekitarnya.").
- Meta row 14 Regular: author "Humas Forkip UNJ" 15 SemiBold + "Rabu, 18 Februari 2026 · 1 menit baca" (dot separator; use each post's uploadedLabel + computed read time).
- Foto utama 960 wide: NewsMediaPlaceholder-style main image (label "Foto utama") + below it a carousel/caption block: stage + caption "Sesi pembukaan & sosialisasi program KIP-K UNJ" + badge "01 / 04 · Dokumentasi" — reuse/extend NewsCard's media strip pattern (badge 14 Regular here) or simpler: main image + caption row. Keep presentational.
- Isi artikel (720 col, gap 32): body paragraphs 18/32 Regular body — first paragraph may start with an inline image block (badge "02 / 04 · Dokumentasi"), later block "03 – 04 / 04 · Dokumentasi". Implement: paragraphs interleaved with figure blocks (gradient placeholder + badge caption). Use each post's paragraphs from src/features/berita/data/news-posts.ts.
- Navigasi artikel: link "Kembali ke Berita" 15 SemiBold gold-ink with ← arrow, href /berita.
- Footer shared.

Tests: renders H1 for explore-kipk-2026 slug, breadcrumb, author/date meta, paragraphs count, "Kembali ke Berita" href; unknown slug → notFound (can assert throws/notFound via unit test of the view or page with invalid param). E2E /berita/explore-kipk-2026 loads (CI=true).

## B. /pertanyaan-pengaduan redesign (frame 422:681, 1440×1981) — replaces current design

Update `src/features/pertanyaan-pengaduan/` in place (keep barrel/types structure; update data). Same route.
- PageHero unchanged (H1 "Pertanyaan & Pengaduan", same sub).
- Section Konten (pad 72/120/96/120, gap 32): two-column "Kontak delegasi · Indeks fakultas" (gap 48):
  - Left rail: eyebrow "KONTAK DELEGASI FAKULTAS" (12/24 Bold tracking-wide12 gold-ink uppercase), heading 28/38 Bold ink "Hubungi delegasi fakultasmu." (3 lines), caption 14/24 Regular body-muted "Sampaikan pertanyaan, pengaduan, keluhan, atau aspirasi lewat WhatsApp. Sertakan nama, fakultas, dan angkatan agar mudah ditindaklanjuti."
  - Right: 8 faculty rows/cards (FMIPA, FT, FBS, FPsi, FISH, FEB, FIKK, FIP) — each: code 22 ExtraBold + full faculty name 14 Regular + "Hubungi via WhatsApp" 14 SemiBold with arrow. Faculty full names: FMIPA "Fakultas Matematika dan Ilmu Pengetahuan Alam", FT "Fakultas Teknik", FBS "Fakultas Bahasa dan Seni", FPsi "Fakultas Psikologi", FISH "Fakultas Ilmu Sosial dan Hukum", FEB "Fakultas Ekonomi dan Bisnis", FIKK "Fakultas Ilmu Keolahragaan dan Kesehatan", FIP "Fakultas Ilmu Pendidikan". Colors same map (FIKK outline variant). Use shared FacultyContactGrid IF it fits — otherwise build rows in-feature (data drives it). hrefs "#".
- Note card (1200, h64, r16, pad 20/28, gold-pale bg): "Laporan akan ditindaklanjuti oleh Delegasi Fakultas dari Divisi KIF (Koordinator Integrasi Fakultas) Forkip UNJ."
- Remove the old 4×2 tile grid layout.

Tests: update existing __tests__ for new layout (rail eyebrow, 8 faculty names, note); E2E update if needed. Both must pass.

## Shared
- No new deps. Reuse PageHero, Button, NewsMediaPlaceholder, buttonVariants. Data-driven, typed.
- e2e: add e2e/berita-detail.spec.ts; update e2e/pertanyaan-pengaduan.spec.ts if locators changed.
- Grep gate: zero `[a-z-]+-\[` arbitrary values in src.
