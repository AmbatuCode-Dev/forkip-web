import { afterEach, describe, expect, it } from "vitest";
import { BerandaPage } from "@/features/home";
import { getFaculties } from "@/lib/content/faculties";
import { getHomeBerita } from "@/lib/content/home";
import { getNewsPosts } from "@/lib/content/news";
import { getProgramCards, getProgramSpotlight } from "@/lib/content/program";
import { cleanup, render, screen } from "@/testing/test-utils";
import { buildBeritaSectionContent } from "../data/berita-view";

afterEach(cleanup);

/** BerandaPage is async: resolve its element with content DTOs, then render. */
async function renderPage() {
  const [faculties, spotlight, cards, berita, posts] = await Promise.all([
    getFaculties(),
    getProgramSpotlight(),
    getProgramCards(),
    getHomeBerita(),
    getNewsPosts(),
  ]);
  render(await BerandaPage({ faculties, spotlight, cards, berita, posts }));
}

describe("BerandaPage", () => {
  it("renders the hero H1 'Forum' and 'KIPK UNJ'", async () => {
    await renderPage();

    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent).toContain("Forum");
    expect(h1.textContent).toContain("KIPK UNJ");
  });

  it("renders the required section headings", async () => {
    await renderPage();

    for (const heading of [
      "Fungsi dan Tujuan",
      "Visi dan Misi",
      "Layanan Forkip UNJ",
      "Mengenal Divisi FORKIP UNJ",
      "Berita Forkip UNJ",
    ]) {
      expect(
        screen.getByRole("heading", { level: 2, name: heading }),
      ).toBeInTheDocument();
    }
  });

  it("renders the Delegasi Fakultas heading and 8 faculty rail rows", async () => {
    await renderPage();

    expect(
      screen.getByRole("heading", {
        name: "Menaungi 8 fakultas di Universitas Negeri Jakarta",
      }),
    ).toBeInTheDocument();
    for (const code of [
      "FIP",
      "FBS",
      "FMIPA",
      "FISH",
      "FT",
      "FPsi",
      "FEB",
      "FIKK",
    ]) {
      expect(screen.getByText(code)).toBeInTheDocument();
    }
  });

  it("renders service card links to their pages", async () => {
    await renderPage();

    for (const href of [
      "/pertanyaan-pengaduan",
      "/penyewaan",
      "/donat-dan-hibah",
      "/pengumuman",
      "/pengunduran-diri",
      "/arsip-data",
    ]) {
      const link = screen
        .getAllByRole("link", { name: /Buka halaman/ })
        .find((link) => link.getAttribute("href") === href);
      expect(link).toBeDefined();
    }
  });

  it("renders all 7 division accordion titles with BPHI expanded", async () => {
    await renderPage();

    const titles = [
      "BPHI - Badan Pengurus Harian Inti",
      "PSDM - Pengembangan Sumber Daya Manusia",
      "HUMAS - Hubungan Masyarakat",
      "KIF - Koordinator Integrasi Fakultas",
      "ADVOKASI - Divisi Advokasi",
      "SOSDIKLAT - Sosial, Pendidikan, dan Pelatihan",
      "BKK - Biro Kebendaharaan dan Keuangan",
    ];
    for (const title of titles) {
      const toggle = screen.getByRole("button", { name: new RegExp(title) });
      expect(toggle).toBeInTheDocument();
    }

    const bphiToggle = screen.getByRole("button", {
      name: new RegExp(titles[0]),
    });
    expect(bphiToggle).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText(
        "BPHI terdiri atas Ketua, Wakil Ketua, Sekretaris Umum, dan Bendahara Umum. BPHI menetapkan arah kebijakan organisasi, mengawasi kinerja divisi, serta mengoordinasikan administrasi dan keuangan selama satu periode kepengurusan.",
      ),
    ).toBeVisible();
  });

  it("renders the YouTube embed for Video Forum KIPK UNJ", async () => {
    await renderPage();

    const iframe = screen.getByTitle("Video Forum KIPK UNJ");
    expect(iframe).toHaveAttribute(
      "src",
      "https://www.youtube-nocookie.com/embed/G338TUmvp1Q",
    );
  });

  it("renders the Program Unggulan spotlight and 3 program cards", async () => {
    await renderPage();

    expect(
      screen.getByRole("heading", { level: 3, name: "Kampung KIP-K UNJ" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Kampung KIP-K UNJ merupakan agenda tahunan Direktorat Kemahasiswaan dan Alumni UNJ bagi mahasiswa penerima KIP Kuliah. Selama tiga hari di Bumi Perkemahan Cibubur, peserta berlatih menghadapi tantangan, bekerja sama, dan membangun kemandirian.",
      ),
    ).toBeVisible();
    expect(
      screen.getByText(
        /Peserta berlatih beradaptasi di alam terbuka, antara lain dengan mendirikan tenda secara mandiri\./,
      ),
    ).toBeVisible();
    expect(
      screen.getByText(
        "Pengalaman ini membantu mahasiswa membangun kesiapan akademik, ketangguhan, dan kemampuan bekerja sama selama menempuh pendidikan di UNJ.",
      ),
    ).toBeVisible();
    for (const title of [
      "Explore KIP-Kuliah",
      "Indikasi",
      "Sosialisasi KIP-K Kuliah",
    ]) {
      // Each card title appears exactly once (marquee uses different labels).
      expect(screen.getAllByText(title)).toHaveLength(1);
    }
    expect(
      screen.getByText(
        "Sosialisasi ini membantu calon mahasiswa mengenal program KIP Kuliah dan memahami informasi dasar terkait pendaftaran.",
      ),
    ).toBeVisible();
  });
  it("renders the berita feature and editorial teasers", async () => {
    await renderPage();

    expect(
      screen.getByRole("heading", { level: 3, name: "Explore KIPK 2026" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Pada 12 Februari 2026, FORKIP UNJ menyelenggarakan Explore KIPK 2026 untuk memperkenalkan program Kartu Indonesia Pintar Kuliah (KIP-K) kepada peserta dari berbagai sekolah di Jakarta dan sekitarnya.",
      ),
    ).toBeVisible();
    // Exact counts: teasers render once as text; marquee card labels are no
    // longer DOM text (baked into the placehold.co image), so each duplicated
    // strip card is asserted via its img alt instead.
    const expectedCounts: Record<string, number> = {
      "Pelatihan Divisi KIF": 1,
      BUSAMAKIP: 1,
      "Verifikasi KIPK SNBP": 1,
      "Gelar KIPK": 1,
    };
    for (const [title, count] of Object.entries(expectedCounts)) {
      expect(screen.getAllByText(title)).toHaveLength(count);
    }
    for (const summary of [
      "FORKIP UNJ mengadakan Pelatihan Divisi KIF pada 21 Februari 2026. Kegiatan ini membekali staf dengan pemahaman tentang tugas Koordinator Integrasi Fakultas dan perannya dalam kepengurusan forum.",
      "Pada 5 Maret 2026, FORKIP UNJ menggelar BUSAMAKIP, kegiatan buka puasa bersama mahasiswa penerima KIP Kuliah. Acara berlangsung di Aula Bung Hatta, lantai 2 Gedung Pascasarjana UNJ.",
      "Pengelola KIP Kuliah UNJ melaksanakan verifikasi berkas calon penerima KIP Kuliah jalur Seleksi Nasional Berdasarkan Prestasi (SNBP) pada 6–10 April 2026. Verifikasi berlangsung di Aula Latief Hendraningrat, Gedung Dewi Sartika, Kampus A UNJ.",
      "Pada 4 April 2026, FORKIP UNJ menyelenggarakan Gelar KIPK sebagai ruang bagi mahasiswa untuk mengembangkan keterampilan kreatif dan digital. Sesi berbagi membahas fotografi digital, desain dengan Canva, dan pemanfaatan kecerdasan buatan (AI).",
    ]) {
      expect(screen.getByText(summary)).toBeVisible();
    }
    for (const label of [
      "Explore KIPK 2026",
      "BUSAMAKIP",
      "Verifikasi KIPK SNBP",
      "Gelar KIPK",
    ]) {
      // The marquee loop duplicates each card, so 2 img per label; the
      // feature placeholder adds one more for "Explore KIPK 2026".
      const expected = label === "Explore KIPK 2026" ? 3 : 2;
      expect(
        screen.getAllByAltText(`Foto ${label} (placeholder)`),
      ).toHaveLength(expected);
    }
    expect(
      screen.getByRole("link", { name: "Lihat semua Berita" }),
    ).toHaveAttribute("href", "/berita");

    // The feature card and each teaser link straight to their Berita article
    // via the slug carried in the home data (no title-to-slug lookup table).
    const bacaLinks = screen.getAllByRole("link", {
      name: "Baca selengkapnya",
    });
    expect(bacaLinks).toHaveLength(5);
    expect(bacaLinks.map((link) => link.getAttribute("href"))).toEqual([
      "/berita/explore-kipk-2026",
      "/berita/pelatihan-divisi-kif",
      "/berita/busamakip",
      "/berita/verifikasi-kipk-snbp",
      "/berita/gelar-kipk",
    ]);
  });

  it("derives the feature, teaser summaries and marquee labels from news posts", async () => {
    const [berita, posts] = await Promise.all([
      getHomeBerita(),
      getNewsPosts(),
    ]);
    const view = buildBeritaSectionContent(berita, posts);
    const postBySlug = new Map(posts.map((post) => [post.slug, post]));

    expect(view.feature?.summary).toBe(
      postBySlug.get(berita.featureSlug)?.paragraphs[0],
    );
    expect(view.teasers.map((teaser) => teaser.summary)).toEqual(
      berita.teaserSlugs.map(
        (slug) => postBySlug.get(slug)?.paragraphs[0] ?? "",
      ),
    );
    expect(view.marqueeItems.map((item) => item.label)).toEqual(
      posts.map((post) => post.title),
    );
  });

  it("uses faculty order and names from content", async () => {
    const faculties = await getFaculties();
    expect(faculties.map((faculty) => faculty.code)).toEqual([
      "FIP",
      "FBS",
      "FMIPA",
      "FISH",
      "FT",
      "FPsi",
      "FEB",
      "FIKK",
    ]);

    await renderPage();
    for (const faculty of faculties) {
      expect(screen.getAllByText(faculty.name).length).toBeGreaterThan(0);
    }
  });
});
