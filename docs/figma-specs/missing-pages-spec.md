# Missing pages spec (Figma Page 4) — 7 routes

Shared shell (SiteHeader/SiteFooter) + tokens already exist. Reuse shared primitives: `PageHero` (src/components/layout/page-hero.tsx), `Button`/`buttonVariants` (gold/cta/outline), `NewsMediaPlaceholder` (gradient image), `Card`. Faculty colors via inline `style` (NOT Tailwind arbitrary). NO arbitrary Tailwind values (`-[` banned by lint:tw): use existing tokens (text-6…text-56, leading-*, tracking-*, rounded-*, shadow-*, spacing px/4, cols-*) or standard scale; for an exact value with no token use inline `style`. Do NOT edit globals.css.

Gates to satisfy: biome layering (app→feature barrel only; feature→shared only; components/ui ↛ config/hooks/features/app; non-test ↛ @/testing), depcruise (no cross-feature deep, no cycles), check:structure (each feature needs index.ts + components/ + types/; "use client" NOT in src/app except error/provider — put client leaves in feature components), lint:css (globals.css only), lint:tw. Add co-located __tests__ + e2e/<route>.spec.ts.

Faculty tile colors: FIP #84BC24, FBS #00A898, FMIPA #7A1A7A, FISH #D40D12, FT #005088, FPsi #00A4E4, FEB #B25A14, FIKK #0F766E (FIKK = white bg + teal outline + dark text). WhatsApp hrefs "#" (TODO).

## /pengumuman (frame 224:1972)
PageHero breadcrumb "Beranda / Pengumuman", H1 "Pengumuman", sub: "Pusat informasi resmi KIP-K Universitas Negeri Jakarta. Halaman ini berfungsi sebagai kanal komunikasi utama untuk pengumuman, panduan, dan pembaruan kebijakan bagi seluruh mahasiswa dan calon mahasiswa KIP-K UNJ."
Two announcement cards (white, border-sand, r16, image placeholder top "Foto pengumuman"):
1. Tag "Eligible" (gold pill); title "Pengumuman Hasil Verifikasi Berkas KIPK Jalur SNBP (Eligible)"; body: "Sehubungan dengan telah selesainya rangkaian proses verifikasi data dan pemberkasan fisik bagi calon penerima KIP Kuliah jalur Seleksi Nasional Berbasis Prestasi (SNBP) yang dilaksanakan pada 6 – 10 April 2026 di Aula Latief Hendraningrat, Gedung Dewi Sartika, Kampus A UNJ, Pengelola KIPK UNJ resmi merilis daftar mahasiswa yang dinyatakan “LOLOS”"; line "Silakan klik tombol di bawah untuk bertanya dan akses surat hasil verifikasi berkas KIPK jalur SNBP 2026"; note (gold-tint): "Note: Jika nama tidak tercantum di dalam surat, harap cek status KIPK di SIUKAT dengan melengkapi data SIUKAT terlebih dahulu."; buttons: outline "Narahubung KIF Forkip UNJ", gold "Hasil Verif KIPK UNJ 2026".
2. Tag "Pengumuman"; title "Verifikasi Berkas KIPK Jalur SNBP"; body: "Forum KIPK UNJ menginformasikan bahwa proses verifikasi data bagi calon penerima KIP Kuliah melalui jalur Seleksi Nasional Berbasis Prestasi (SNBP) akan segera dilaksanakan. Kegiatan ini bertujuan untuk memastikan validitas data serta kelengkapan berkas administrasi calon mahasiswa."; "Catat detail pelaksanaan secara offline pada:"; detail rows: Tanggal="6 – 10 April 2026", Tempat="Aula Latief Hendraningrat, Gedung Dewi Sartika, Kampus A UNJ", Waktu="08.00 - 15.00 WIB"; line "Pastikan seluruh berkas fisik telah disiapkan sesuai dengan ketentuan yang berlaku. Jangan sampai terlewat!"; line "Jangan lupa follow Instagram @forkipunj.official. Jika ada pertanyaan silakan klik tombol di bawah."; buttons outline "Narahubung 1","Narahubung 2", gold "Surat Verif KIPK UNJ 2026".

## /program-unggulan (frame 224:2142)
H1 "Program Unggulan Forkip UNJ" + sub (same as Beranda program subtitle): "Program Unggulan merupakan rangkaian inisiatif strategis yang dirancang untuk mengoptimalkan potensi mahasiswa penerima KIP Kuliah. Mencakup berbagai bidang, mulai dari pengembangan akademik, peningkatan soft skills, hingga aksi pengabdian masyarakat, guna mencetak generasi yang cerdas, kreatif, dan kontributif bagi universitas maupun bangsa."
Spotlight "Kampung KIP-K UNJ" (cream card): paragraphs + 4 dot-bullets + closing (copy identical to Beranda program-section / home data programSpotlight — reuse the same strings):
 p1 "Kampung KIP-K UNJ adalah agenda tahunan strategis yang diselenggarakan oleh Direktorat Kemahasiswaan dan Alumni UNJ sebagai kawah candradimuka bagi para awardee KIP Kuliah. Berlokasi di Bumi Perkemahan (Buperta) Cibubur, kegiatan ini mengusung misi utama untuk menumbuhkan resiliensi atau ketahanmalangan sebagai soft skill krusial dalam menyelesaikan studi dan menghadapi tantangan dunia kerja."
 p2 "Selama tiga hari, sebanyak ribuan peserta ditempa melalui serangkaian kegiatan intensif yang dirancang untuk membangun kemandirian dan soliditas, antara lain:"
 bullets: "Resiliensi & Kemandirian: Simulasi bertahan hidup di alam terbuka dengan membangun tenda secara mandiri, melatih daya juang dan kemampuan beradaptasi dalam keterbatasan." / "Talk Show Akademik: Pembekalan materi khusus dari para Wakil Dekan Bidang I se-lingkungan UNJ mengenai strategi sukses lulus tepat waktu dan tips navigasi akademik." / "Kepemimpinan & Karakter: Sesi motivasi untuk menanamkan jiwa kepemimpinan sesuai tema “Lead The Future”, guna mencetak pemimpin perubahan di masa depan." / "Solidaritas & Kreativitas: Mempererat silaturahmi melalui kegiatan olahraga, kompetisi antar peserta, dan malam pentas seni sebagai ruang ekspresi bakat mahasiswa."
 closing "Melalui Kampung KIP-K, kami berkomitmen memastikan bahwa mahasiswa penerima beasiswa tidak hanya unggul secara akademis, tetapi juga memiliki mentalitas tangguh, karakter yang kuat, dan optimisme tinggi dalam menempuh perjalanan akademik di Universitas Negeri Jakarta."
 button "Arsip Kegiatan"; image placeholder "Foto Kampung KIP-K UNJ".
"Program lain" 3 cards: (a) "Explore KIPK UNJ: Jembatan Informasi Menuju Pendidikan Tinggi" / img "Foto Explore KIPK" / "Explore KIPK 2026 adalah program sosialisasi strategis yang diselenggarakan oleh FORUM KIP-K UNJ sebagai manifestasi dedikasi…" / btn "Arsip Kegiatan"; (b) "INDIKASI: Ikatan Dedikasi KIPK Mengabdi Sepenuh Hati" / "Foto INDIKASI" / "INDIKASI merupakan agenda tahunan unggulan Forum KIP-K UNJ yang menjadi wujud nyata kepedulian sosial mahasiswa penerima KIP Kuliah…" / btn; (c) "KIP-K UNJ: Informasi Beasiswa Kampus" / "Foto KIP-K UNJ" / "Forum KIP-K UNJ menyediakan informasi dan pendampingan bagi calon mahasiswa penerima KIP Kuliah di Universitas Negeri Jakarta." / btn.

## /pertanyaan-pengaduan (frame 224:1120)
PageHero breadcrumb "Beranda / Pertanyaan & Pengaduan", H1 "Pertanyaan & Pengaduan", sub: "Halaman ini disediakan sebagai sarana bagi mahasiswa KIP-K UNJ untuk menyampaikan pertanyaan, pengaduan, keluhan, maupun aspirasi secara tertulis. Setiap laporan yang masuk akan ditindaklanjuti sesuai ketentuan yang berlaku."
Line "Pilih delegasi fakultas Anda untuk menghubungi KIF:" + 4×2 faculty WhatsApp tiles (8, colors above, name + "Hubungi via WhatsApp" + arrow).
Note (gold-tint): "Laporan akan ditindaklanjuti oleh Delegasi Fakultas dari Divisi KIF (Koordinator Integrasi Fakultas) Forkip UNJ."

## /donat-dan-hibah (frame 224:1216)
PageHero breadcrumb "Beranda / Donat dan Hibah", H1 "Peminjaman (DONAT)", sub: "Dikelola oleh Divisi Advokasi dengan proses yang mudah dan cepat. (S&K berlaku)"
Line "Silakan klik tombol di bawah untuk menghubungi Delegasi Advo fakultasnya masing-masing:" + 8 faculty WhatsApp tiles.
Card "Transparansi dana hibah" (white border r16) with "*Akses Terbatas" muted + gold button "Alokasi dana hibah".

## /program-kerja (frame 224:1467)
PageHero breadcrumb "Beranda / Program Kerja", H1 "Program Kerja Forkip UNJ 2026", sub: "Disusun berdasarkan AD/ART FORUM KIP-K UNIVERSITAS NEGERI JAKARTA"
File row: PDF badge + "AD ART FORUM KIP-KULIAH UNJ.pdf" (link "#").
Grid program (3 cols): cards with image placeholder, tag "Program Kerja", title, optional body, buttons "Arsip Kegiatan" + "Laporan Program Kerja":
 1 "Explore KIP-Kuliah" img "Foto Explore KIP-Kuliah" body "Pada tanggal 12 Februari 2026, Explore KIPK 2026 merupakan program sosialisasi yang diselenggarakan oleh FORUM KIP-K UNJ sebagai bentuk komitmen dalam memperluas akses informasi mengenai Program Kartu Indonesia Pintar Kuliah (KIP-K). Kegiatan ini menghadirkan perwakilan mahasiswa dari berbagai sekolah di wilayah Jakarta dan sekitarnya untuk mendapatkan pemahaman yang komprehensif terkait KIP-K." (both buttons)
 2 "BUSAMAKIP" img "Foto BUSAMAKIP" (both buttons, no body)
 3 "Verif Akademik SNBP" img "Foto Verif Akademik SNBP" (both buttons)
 4 "Verif Akademik SNBT" img "Foto Verif Akademik SNBT" (only "Laporan Program Kerja")
 5 "Sosialisasi KIPK" img "Foto Sosialisasi KIPK" (only "Laporan Program Kerja")

## /non-program-kerja (frame 224:1587)
PageHero breadcrumb "Beranda / Non Program Kerja", H1 "Non Program Kerja Forkip UNJ 2026", sub same AD/ART line.
File row PDF + "AD ART FORUM KIP-KULIAH UNJ.pdf".
Grid 3 cards tag "Non Program Kerja", buttons "Arsip Kegiatan" + "Laporan Non Program Kerja":
 1 "Pelatihan Anggota KIF" img "Foto Pelatihan Anggota KIF" body "Pelatihan Divisi KIF (Koordinator Integrasi Fakultas) FORUM KIP-K UNJ 2026, merupakan agenda persiapan yang diselenggarakan untuk membekali Staff KIF dengan pemahaman yang komprehensif mengenai peran, fungsi, serta tanggung jawabnya dalam struktur organisasi FORKIP UNJ."
 2 "KANTIN (Kumpul Rutin)" img "Foto KANTIN (Kumpul Rutin)"
 3 "Diskusi Birokrat" img "Foto Diskusi Birokrat"

## /rekrutmen (frame 224:1683)
PageHero breadcrumb "Beranda / Rekrutmen Anggota Baru", H1 "Rekrutmen Anggota Baru Forkip UNJ 2026" + tag "SUDAH DITUTUP" (red/neutral pill), sub: "Rekrutmen Anggota FORKIP UNJ 2026 merupakan proses seleksi bagi mahasiswa penerima KIP-K Universitas Negeri Jakarta yang ingin berkontribusi aktif dalam organisasi. Melalui rekrutmen ini, FORKIP UNJ membuka kesempatan bagi mahasiswa untuk mengembangkan potensi diri, meningkatkan kemampuan kepemimpinan, serta berperan dalam pelayanan dan advokasi mahasiswa KIP-K."
Card info divisi: "Untuk info lengkap divisi yang ada di Forkip UNJ, silakan klik teks ini." + link "Lihat divisi →" (href "/#divisi").
Google Form placeholder: label "Google Form tertanam" + "Rekrutmen Anggota Baru Forkip UNJ 2026 (ditutup)".
Button outline "Narahubung Open Recruitment".
