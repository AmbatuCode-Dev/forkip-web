# Page: Penyewaan (/penyewaan) — frame 224:2568 (1440×2510)

Reference screenshot: `docs/figma-specs/pages/penyewaan.png`. Shared header/footer from feat/components. Feature module: `src/features/penyewaan/{components,data,types,index.ts}`, route `src/app/penyewaan/page.tsx`.

## Structure
1. **Page hero** (1440×266, gradient cream→gold like other pages, batik accent right): breadcrumb "Beranda / Penyewaan" (13px muted, "/" separated), H1 "Penyewaan Inventaris Forkip UNJ" (44px bold ink900), sub 16px body: "Dikelola oleh BKK (Biro Kebendaharaan dan keuangan) dengan harga yang terjangkau".
2. **Note card** (1200×96, gold-tint bg #FBF6DF, rounded-14, px-24): text 14px: "Penyewaan barang, harap menghubungi admin BKK dengan klik tombol berikut sebelum isi form di bawah." + right: two outline pills "Admin BKK 1", "Admin BKK 2" (href="#", WhatsApp links placeholder TODO).
3. **Google Form embed** (1200×260 card, white, border, rounded-16, centered): small label 11px uppercase muted "GOOGLE FORM TERTANAM" + title 15px semibold "Peminjaman Barang Inventaris BKK 2026" → implement as embed placeholder card (no real iframe; TODO embed real form URL).
4. **"Inventaris yang kami sewakan"** (H2 28px semibold) + 5 InventarisAccordion instances (shared component), data:
   - Handy Talky — chip "Penyewaan HT", meta: "Jumlah yang tersedia:" + "banyak pcs (include earpiece)", defaultExpanded; body: "Handy Talky merupakan perangkat radio komunikasi dua arah yang digunakan untuk mendukung komunikasi dan koordinasi tim. Perangkat ini beroperasi pada frekuensi VHF/UHF dengan sistem two-way radio (TX/RX), memiliki daya output sekitar 5 watt, serta mampu menjangkau jarak komunikasi kurang lebih 1 hingga 5 km tergantung kondisi lingkungan. Handy Talky dilengkapi kanal multi-channel yang dapat disesuaikan dengan kebutuhan pengguna." footnote: "(gambar hanya ilustrasi, untuk info selengkapnya silakan hubungi admin BKK)"
   - Speaker dan Mic — meta "1 Set"
   - Kompor Portable — meta "banyak Set"
   - Nesting — meta "banyak Set"
   - Proyektor — meta "1 Set"
   (bodies for the 4 collapsed items: 1–2 sentence Indonesian mock, marked TODO real copy)
5. **Card / Hubungi admin** (1200×187, gold gradient bg #FBF6DF→#F6EFAF, rounded-16, centered): "Butuh info selengkapnya?" 20px bold ink900, "Hubungi admin BKK sebelum mengisi form peminjaman." 14px muted, gold pill "Admin BKK 1".
6. Footer (shared).

## Tests
- renders H1 "Penyewaan Inventaris Forkip UNJ", 5 accordion titles, note card text, "GOOGLE FORM TERTANAM" label.
- Playwright: `/penyewaan` loads with header/footer.
