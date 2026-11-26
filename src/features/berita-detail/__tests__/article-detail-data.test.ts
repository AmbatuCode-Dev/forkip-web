import { describe, expect, it } from "vitest";
import {
  articleStaticParams,
  getArticleDetail,
} from "@/features/berita-detail";

describe("getArticleDetail", () => {
  it("maps every supplied slug to detail content with verbatim copy", () => {
    const slugs = articleStaticParams().map((param) => param.slug);
    expect(slugs).toEqual([
      "explore-kipk-2026",
      "pelatihan-divisi-kif",
      "busamakip",
      "verifikasi-kipk-snbp",
      "gelar-kipk",
    ]);

    const explore = getArticleDetail("explore-kipk-2026");
    expect(explore?.title).toBe("Explore KIPK 2026");
    expect(explore?.uploadedLabel).toBe("18 Februari 2026");
    expect(explore?.author).toBe("Humas Forkip UNJ");
    expect(explore?.readTimeLabel).toMatch(/^\d+ menit baca$/);
    expect(explore?.subtitle).toBe(explore?.paragraphs[0]);
    expect(explore?.paragraphs[0]).toContain(
      "Pada 12 Februari 2026, FORKIP UNJ menyelenggarakan Explore KIPK 2026",
    );
    expect(explore?.heroMedia).not.toBeNull();
    expect(explore?.heroMedia?.label).toBe("Foto utama");
    expect(explore?.heroMedia?.badge).toBe("01 / 01 · Foto");
    expect(explore?.heroMedia?.caption).toBe(
      "Dokumentasi sosialisasi Explore KIPK 2026.",
    );
    expect(explore?.figures).toHaveLength(0);
  });

  it("derives one inline figure per additional photo, with no gallery badge", () => {
    const pelatihan = getArticleDetail("pelatihan-divisi-kif");
    expect(pelatihan?.uploadedLabel).toBe("22 Februari 2026");
    expect(pelatihan?.heroMedia?.badge).toBe("01 / 04 · Foto");
    expect(pelatihan?.heroMedia?.caption).toBe(
      "Dokumentasi Pelatihan Divisi KIF 2026.",
    );
    expect(pelatihan?.figures.map((figure) => figure.badge)).toEqual([
      "02 / 04 · Foto",
      "03 / 04 · Foto",
      "04 / 04 · Foto",
    ]);
  });

  it("omits the upload date until the official date exists", () => {
    for (const slug of ["busamakip", "gelar-kipk"]) {
      const article = getArticleDetail(slug);
      expect(article?.uploadedLabel).toBeUndefined();
      expect(JSON.stringify(article)).not.toContain("Menyusul");
    }

    const busamakip = getArticleDetail("busamakip");
    expect(busamakip?.heroMedia?.badge).toBe("01 / 03 · Foto");
    expect(busamakip?.heroMedia?.caption).toBe(
      "Dokumentasi buka puasa bersama mahasiswa KIP Kuliah UNJ.",
    );
    expect(busamakip?.figures).toHaveLength(2);
    expect(busamakip?.paragraphs[0]).toContain(
      "Pada 5 Maret 2026, FORKIP UNJ menggelar BUSAMAKIP",
    );

    const gelar = getArticleDetail("gelar-kipk");
    expect(gelar?.heroMedia?.badge).toBe("01 / 04 · Foto");
    expect(gelar?.heroMedia?.caption).toBe("Dokumentasi Gelar KIPK 2026.");
    expect(gelar?.figures).toHaveLength(3);
    expect(gelar?.paragraphs[0]).toContain(
      "Pada 4 April 2026, FORKIP UNJ menyelenggarakan Gelar KIPK",
    );
  });

  it("uses the supplied April date and four-photo gallery for SNBP", () => {
    const snbp = getArticleDetail("verifikasi-kipk-snbp");
    expect(snbp?.uploadedLabel).toBe("8 April 2026");
    expect(snbp?.heroMedia?.caption).toBe(
      "Dokumentasi verifikasi berkas KIP Kuliah jalur SNBP 2026.",
    );
    expect(snbp?.figures).toHaveLength(3);
    expect(snbp?.paragraphs[0]).toContain("6–10 April 2026");
  });

  it("returns undefined for unknown slugs (page → notFound)", () => {
    expect(getArticleDetail("tidak-ada")).toBeUndefined();
  });
});
