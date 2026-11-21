import { describe, expect, it } from "vitest";
import {
  articleStaticParams,
  getArticleDetail,
} from "@/features/berita-detail";

describe("getArticleDetail", () => {
  it("maps every newsPosts slug to detail content with verbatim copy", () => {
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
    expect(explore?.uploadedLabel).toBe("Rabu 18 Februari 2026");
    expect(explore?.author).toBe("Humas Forkip UNJ");
    expect(explore?.readTimeLabel).toMatch(/^\d+ menit baca$/);
    expect(explore?.subtitle).toBe(
      "Program sosialisasi FORUM KIP-K UNJ untuk memperluas akses informasi KIP-K bagi siswa di Jakarta dan sekitarnya.",
    );
    expect(explore?.paragraphs[0]).toContain("Pada tanggal 12 Februari 2026");
    expect(explore?.heroMedia).not.toBeNull();
    expect(explore?.heroMedia?.label).toBe("Foto utama");
    expect(explore?.figures).toHaveLength(3);
  });

  it("returns undefined for unknown slugs (page → notFound)", () => {
    expect(getArticleDetail("tidak-ada")).toBeUndefined();
  });

  it("omits hero media for photo-less posts", () => {
    const gelar = getArticleDetail("gelar-kipk");
    expect(gelar?.heroMedia).toBeNull();
    expect(gelar?.figures).toHaveLength(0);
  });
});
