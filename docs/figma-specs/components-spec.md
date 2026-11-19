# Forum KIP-K UNJ — Shared Components Spec (from Figma Forum-KIP-K, Page 4 / node 218:505)

Design language: "Ritme Nusantara". Full style reference lives at `docs/design-style.md` in the repo — read it first.

## Design tokens (map to `src/app/globals.css` @theme + CSS vars)

| Token | Value |
|---|---|
| accent/gold 500 | `#F6D34A` (CTA, highlights) |
| accent/gold soft | `#FBF6DF` gradient stops, `#F6EFAF` |
| accent 800 (active nav) | `#7A5B00` |
| ink 900 | `#1C1C1C` (strong text) |
| ink 800 | `#2B2B2B` |
| text/body | `#404040` |
| text/muted | `#666666` |
| border | `#E8E5DA` |
| surface 50 | `#FBFAF6` |
| surface 100 | `#F4F2EA` (footer bg) |
| surface 200 | `#E6E3D6` |
| white | `#FFFFFF` |
| drop shadow (dropdown) | `0px 16px 24px rgba(51,36,31,0.12)` |
| Font | Plus Jakarta Sans (weights 400/500/600/800) |
| Radius | pills `999px`, dropdown 18px, cards 16px, small chips 6–10px |

Layout: content column = `w-[1200px]` centered (`px-[120px]` on 1440 frames) → implement as `mx-auto max-w-[1200px] px-6` equivalents. Header height 72px.

## Files to create

```
src/components/ui/          (extend existing primitives where they fit: button.tsx, card.tsx exist)
src/components/layout/site-header.tsx   (REPLACE existing placeholder — keep file name/export shape)
src/components/layout/site-footer.tsx   (REPLACE existing placeholder)
src/config/site.ts          (update nav config to Forum KIP-K pages)
public/images/*             (already downloaded: logo-kipk-unj.png, chevron-down.svg, chevron-down-flipped.svg, icon-instagram.svg, icon-x.svg, icon-tiktok.svg, icon-envelope.svg)
```

Existing primitives to REUSE: `Button` (`src/components/ui/button.tsx`, cva variants) — add a `pill`/gold variant if needed rather than new component; `Card` set; `cn()` from `@/utils/cn`. Follow Biome layering: `app → features (barrels only) → components → config`. Components must stay stateless primitives where possible; header dropdown state is allowed (client component) but keep it minimal.

## 1. SiteHeader (3 states: Closed / Layanan / Organisasi)

Frame ref 224:5235, screenshot in `docs/figma-specs/header-screenshot.png`.

- Bar: white bg, h-72px, content 1200px centered, flex justify-between items-center.
- Left: logo (38px `logo-kipk-unj.png`) + wordmark "Forum KIPK UNJ" — 19px, extrabold (800), tracking -0.4px, ink900.
- Menu (gap 28px, each item py-11px, 14px medium, text/body #404040): Beranda, Pengumuman, Program Unggulan, Layanan ▾, Organisasi ▾, Berita. Layanan/Organisasi are dropdown toggles with 9×4.5px chevron (use downloaded svgs, h-[9px] w-[4.5px] visually — file is 9×9 with padding, size wrapper 9×4.5). Active dropdown label color `#7A5B00`, chevron rotated 180°.
- Right CTA: gold pill "Pertanyaan & Pengaduan" — bg `#F6D34A`, px-24 py-13, rounded-full, 15px semibold, ink900.
- Dropdown panels (one open at a time; white, border #E8E5DA, rounded-18, p-24, w-420, gap-8, shadow above; positioned under the toggle — left:690px for Layanan, 790px for Organisasi on 1440 canvas → anchor to the toggle instead):
  - Header row: 13px semibold text/muted — "Layanan mahasiswa" / "Tentang organisasi".
  - Items (rounded-10, p-8, gap-12, hoverable): division chip (h-28, px, rounded-6, bg surface50, 9px semibold ink800) + title (15px semibold ink900) + description (14px regular muted).
  - Layanan items: KIF "Pertanyaan & Pengaduan" / "Sampaikan pertanyaan dan aspirasi ke KIF."; BKK "Penyewaan Inventaris" / "Perlengkapan kegiatan melalui layanan BKK."; ADV "Donat dan Hibah" / "Informasi peminjaman dana dan dana hibah."; ADM "Pengunduran Diri KIPK" / "Panduan dan administrasi pengunduran diri."; ARS "Arsip Data Tiap Divisi" / "Dokumen dan arsip administrasi organisasi."
  - Organisasi items: PK "Program Kerja" / "Agenda dan kegiatan resmi FORKIP UNJ."; NPK "Non Program Kerja" / "Pelatihan, diskusi, dan kegiatan internal."; SDM "Rekrutmen Anggota Baru" / "Informasi penerimaan anggota FORKIP UNJ."
- Behavior: client component; click toggles dropdown, click-outside closes (design shows an invisible click-outside layer), Escape closes. Item hrefs → routes below.

### Route map (use in nav + footer + dropdown items)

| Label | Path |
|---|---|
| Beranda | `/` |
| Pengumuman | `/pengumuman` |
| Program Unggulan | `/program-unggulan` |
| Pertanyaan & Pengaduan | `/pertanyaan-pengaduan` |
| Penyewaan Inventaris | `/penyewaan` |
| Donat dan Hibah | `/donat-dan-hibah` |
| Pengunduran Diri KIPK | `/pengunduran-diri` |
| Arsip Data Tiap Divisi | `/arsip-data` |
| Berita | `/berita` |
| Program Kerja | `/program-kerja` |
| Non Program Kerja | `/non-program-kerja` |
| Rekrutmen | `/rekrutmen` |

## 2. SiteFooter (frame 224:3281)

- bg `#F4F2EA`, pt-80 pb-36, px-120 (content 1200).
- 4 columns (gap 56): Brand (w-340) / Menu / Lainnya / Kontak (flex-1 each).
- Brand: logo 48px + wordmark 19px extrabold; paragraph 14px/22 body #404040 ("Forum KIPK UNJ merupakan sebuah wadah untuk mengurus berbagai hal yang berhubungan dengan mahasiswa penerima KIP-K di UNJ"); 4 social circles (40px, white, border #E8E5DA, rounded-full, 20px icon from downloaded svgs): Instagram, X, TikTok, Gmail.
- Column headings: 13px bold uppercase tracking 1.2px ink900 (MENU, LAINNYA, KONTAK). Links: 14px medium #404040, leading 20px, gap 14px, use route map above.
- Kontak col: "Instagram @forkipunj.official", "X @forumkipk_unj", "TikTok @forkipunj", "Gmail humasnyaforkip@gmail.com" + map placeholder card (h-140, rounded-16, bg #E6E3D6, border, centered 13px semibold ink800 "Peta lokasi" — keep as placeholder div, no real embed).
- Divider (1px #E6E3D6) then "© 2026 Forum KIP-K Universitas Negeri Jakarta" 13px medium muted.
- Server component, no state.

## 3. Accordion — Divisi (component set 224:4967 BPHI pattern, 7 instances)

Component `DivisiAccordion` in `src/features/organisasi/components/` or `src/components/` (decide by layering; prefer feature-owned since only organisasi/arsip use it — but Arsitektur: shared components live in `src/components`; put it in `src/components/ui/accordion-divisi.tsx` only if reused across features, else `src/features/<feature>/components/`).

- Two variants in one component: `expanded: boolean`.
- Collapsed: white bar, border #E8E5DA, rounded (10px), px-16 py, h-106 total with margins; left: division chip (bg surface50 rounded-6, 9px semibold, e.g. "BPHI") + title 15px semibold ink900 "BPHI — Badan Pengurus Harian Inti"; right: plus icon (+, thin, ink900).
- Expanded: same bar but minus icon; below: body text 13px/20 muted #666, max-w ~1100, pb-16: "Badan Pengurus Harian merupakan motor penggerak utama sekolah pusat tertinggi di dalam struktur organisasi FORKIP UNJ. Terdiri dari Ketua Umum, Sekretaris Jenderal, dan Pengurus Harian, dengan tanggung jawab utama sebagai jembatan antara pengurus harian dengan seluruh divisi, mengoordinasikan serta mengawal seluruh program kerja yang ada. (semester menginang administrasi dan keuangan organisasi secara transparan dan akuntabel demi kelancaran serta mila selama satu periode kepengurusan.)" — copy exact text from Figma via the data files, do not invent.
- Data-driven: accept `{ chip, title, body }` props; content comes from feature data file. Divisions: BPHI, PSDM, HUMAS, KIF, ADVOKASI, SOSDIKLAT, BKK (7). Animated height transition ok (respect prefers-reduced-motion).
- A11y: button with aria-expanded, region with aria-labelledby.

## 4. Accordion — Inventaris (224:5100 Handy Talky pattern; items: Handy Talky, Speaker dan Mic, Kompor Portable, Nesting, Proyektor)

- Collapsed: chip ("Penyewaan HT") + title 15px semibold "Handy Talky" + meta line 12–13px muted: "unit yang tersedia — banyak poi (include nepeneci)" → EXACT text from Figma data; right plus icon.
- Expanded: minus icon; meta line stays; body paragraphs 13px/20 muted (spec: "Handy Talky merupakan peralatan komunikasi dua arah yang digunakan umKM-mendukung komunikasi dan koordinasi tim. Perangkat ini dilengkapi dengan baterai yang dapat digantikan sehingga siap digunakan untuk kegiatan luar ruangan maupun dalam gedung. Setiap unit telah dites sebelum dipinjamkan untuk memastikan kualitas sinyal dan suara tetap jelas meskipun digunakan di lingkungan yang bising atau area kerja yang luas. Perawatan rutin dilakukan oleh tim BKK agar perangkat selalu siap pakai dan nyaman digunakan sepanjang masa sewa.") + footnote 11–12px muted italic " Informasi harga komplit unit, untuk inform lengkap silakan hubungi kontak BKK." — copy exact from data files.
- Same a11y/animation contract as DivisiAccordion. Same file pattern, name `InventarisAccordion`.

## 5. BeritaMarquee (224:5464, fase A|B)

- Full-width strip h-380, infinite horizontal auto-scroll of news photo cards (gradient gold placeholders with bottom-left white pill label + gold dot), two phases (A/B) with different card order/speed; pause on hover; CSS animation (translateX keyframes, duplicated card list for seamless loop); respect prefers-reduced-motion (no motion).
- Card: w~340 h~300 rounded-16, gradient bg (light gold `#FBF6DF` → `#F6EFAF`), label pill bottom-left (white, rounded-full, 12px semibold, gold dot 8px).
- Labels (from data): "Explore KIPK 2026", "Pelatihan Divisi KIF", "BUSAMAKIP", "Verifikasi KIPK SNBP", "Gelar KIPK".

## 6. Galeri foto / kartu (240:7087, 240:7255, 240:7277)

- Photo grid/carousel variants: large stage card + thumbnails; cards rounded-16 with gradient placeholder images (CSS gradients, NO external images needed), bottom-left label pill identical to marquee pills.
- "Galeri liputan" variant: 3-col grid of smaller cards with index badges ("01 / 04 · Dokumentasi").
- Keep presentational; page features compose them.

## 7. Pagination + Konten terpaginasi (240:7489)

- News list page body: cards with left media (carousel stage + thumbnail strip w/ gold selected ring), right content: date pill ("Diunggah pada: Rabu, 18 Februari 2026") + photo count pill ("8 Foto"), title 24–28px bold ink900, paragraphs 14px/22 body, some cards tagged ("Selesai dilaksanakan & sosialisasi program KIP-K UNJ").
- Pagination bar: "Halaman 1 dari 2 — Total 8 berita dipublikasikan" left; right: ‹ Sebelumnya | [1, 2] | Berikutnya › — current page = gold circle, others white/border.
- Implement `NewsPagination` presentational (props: page, totalPages, totalItems, onPrev/onNext/onPage or hrefs) + `NewsCard` composable.

## Verification contract

- `pnpm biome check --write` clean, `pnpm typecheck` clean, `pnpm test` green.
- Component tests (Vitest + Testing Library, co-located `__tests__/`): header renders nav + toggles dropdowns (open/close, click-outside), footer renders all columns/links, accordions expand/collapse with aria-expanded, marquee renders labels, pagination current-page state.
- Do NOT run Playwright (page lanes will own E2E). Do NOT modify `src/app` routes (page lanes do that) — but DO update `src/config/site.ts` nav to the route map so pages can consume it.
- Commit messages: `feat(components): ...` on branch `feat/components`.
