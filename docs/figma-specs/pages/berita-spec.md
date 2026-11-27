# Page: Berita (/berita) — frame 224:3880 (1440×2749)

Reference screenshot: `docs/figma-specs/pages/berita.png`. Feature module: `src/features/berita/{components,data,types,index.ts}` (page-level composition; shared NewsCard/NewsPagination from feat/components). Route `src/app/berita/page.tsx`.

## Structure
1. **Page hero** (1440×294, gradient, batik accent): breadcrumb "Beranda / Berita", H1 "Berita", sub: "Halaman ini dikelola oleh divisi Humas Forkip UNJ sebagai sarana berbagi informasi, dan transparansi laporan kegiatan yang dilakukan oleh Forkip UNJ"
2. **Konten terpaginasi** (uses shared NewsCard/NewsPagination, page 1 of 2, "Total 5 berita dipublikasikan"): 2-column masonry-ish grid of 3 news cards + 1 card with image only (BUSAMAKIP has media card right, no stage carousel):
   - **Explore KIPK 2026** — stage card left w/ carousel (4 thumbs, badge "01 / 04 · Dokumentasi", caption "Sesi pembukaan & sosialisasi program KIP-K UNJ"); right content: date pill "Diupload pada: Rabu 18 Februari 2026" + "4 Foto"; title 26px bold; 3 paragraphs (full text: "Pada tanggal 12 Februari 2026, Explore KIPK 2026 merupakan program sosialisasi yang diselenggarakan oleh FORUM KIP-K UNJ sebagai bentuk komitmen dalam memperluas akses informasi mengenai Program Kartu Indonesia Pintar Kuliah (KIP-K). Kegiatan ini menghadirkan perwakilan mahasiswa dari berbagai sekolah di wilayah Jakarta dan sekitarnya untuk mendapatkan pemahaman yang komprehensif terkait KIP-K." / "Melalui kegiatan ini, FORUM KIP-K UNJ memberikan penjelasan mengenai mekanisme pendaftaran, persyaratan, alur seleksi, serta manfaat yang diperoleh sebagai penerima KIP-K. Sosialisasi dilakukan secara interaktif agar peserta tidak hanya menerima informasi, tetapi juga dapat berdiskusi dan menyampaikan pertanyaan secara langsung." / "Explore KIPK 2026 diharapkan menjadi jembatan informasi antara mahasiswa KIP-K UNJ dengan calon mahasiswa penerima KIP-K di masa mendatang. Dengan adanya kegiatan ini, diharapkan semakin banyak siswa yang memahami peluang pendidikan tinggi melalui program KIP-K serta termotivasi untuk melanjutkan studi tanpa terkendala keterbatasan ekonomi.")
   - **Pelatihan Divisi KIF** — badge "01 / 03 · Foto", caption "Pembekalan peran & tanggung jawab Staff KIF"; "Diupload pada: Minggu 22 Februari 2026" + "3 Foto"; 4 paragraphs (full text in Figma dump: persiapan Staff KIF, tugas utama KIF, alur birokrasi, penutup).
   - **BUSAMAKIP** — media card only (dark gradient with moon illustration placeholder), "Diupload pada: Sabtu 14 Februari 2026"; 3 paragraphs (Buka Bersama di Aula Bung Hatta, tema "Harmoni Ramadhan…", tujuan kebersamaan/sinergi).
   - Page 2 content: mock (Verifikasi KIPK SNBP, Gelar KIPK) marked TODO.
3. **Pagination bar**: "Halaman 1 dari 2" + "Total 5 berita dipublikasikan" left; right "‹ Sebelumnya | 1 2 | Berikutnya ›" — shared NewsPagination with basePath="/berita".
4. Footer (shared).

## Data
`src/features/berita/data/` — newsPosts: { slug, title, uploadedLabel, photoCount, paragraphs[], gallery?: { badge, caption }[], mediaOnly? }. All copy verbatim above; page 2 stubs TODO.

## Tests
- renders H1 "Berita", titles "Explore KIPK 2026", "Pelatihan Divisi KIF", "BUSAMAKIP", pagination text "Total 5 berita dipublikasikan", links to /berita?page=2 present.
- Playwright: `/berita` loads; `/berita?page=2` renders pagination state 2.
