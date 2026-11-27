import { describe, expect, it } from "vitest";
import type { ZodType } from "zod";
import {
  type ContentFile,
  contentFiles,
  newsSlugs,
  newsSlugToFile,
  readFrontmatter,
} from "@/lib/content/read-mdx";
import {
  facultyRecordSchema,
  homeBeritaContentSchema,
  navigationContentSchema,
  newsPostContentSchema,
  programCardContentSchema,
  programSpotlightContentSchema,
  siteContentSchema,
} from "@/lib/content/schemas";

const schemasByFile: Readonly<Record<ContentFile, ZodType<unknown>>> = {
  site: siteContentSchema,
  navigation: navigationContentSchema,
  "faculties/fip": facultyRecordSchema,
  "faculties/fbs": facultyRecordSchema,
  "faculties/fmipa": facultyRecordSchema,
  "faculties/fish": facultyRecordSchema,
  "faculties/ft": facultyRecordSchema,
  "faculties/fpsi": facultyRecordSchema,
  "faculties/feb": facultyRecordSchema,
  "faculties/fikk": facultyRecordSchema,
  "program-unggulan/spotlight": programSpotlightContentSchema,
  "program-unggulan/explore-kipk": programCardContentSchema,
  "program-unggulan/indikasi": programCardContentSchema,
  "program-unggulan/sosialisasi-kipk": programCardContentSchema,
  "berita/explore-kipk-2026": newsPostContentSchema,
  "berita/pelatihan-divisi-kif": newsPostContentSchema,
  "berita/busamakip": newsPostContentSchema,
  "berita/verifikasi-kipk-snbp": newsPostContentSchema,
  "berita/gelar-kipk": newsPostContentSchema,
  "home/berita": homeBeritaContentSchema,
};

describe("content files", () => {
  it("reads and validates frontmatter for every allowlisted file", () => {
    for (const file of contentFiles) {
      expect(() => readFrontmatter(file, schemasByFile[file])).not.toThrow();
    }
  });

  it("has the expected record counts", () => {
    const facultyFiles = contentFiles.filter((file) =>
      file.startsWith("faculties/"),
    );
    expect(facultyFiles).toHaveLength(8);

    const programCardFiles = contentFiles.filter(
      (file) =>
        file.startsWith("program-unggulan/") &&
        file !== "program-unggulan/spotlight",
    );
    expect(programCardFiles).toHaveLength(3);

    expect(newsSlugs).toHaveLength(5);
    for (const slug of newsSlugs) {
      expect(() =>
        readFrontmatter(newsSlugToFile(slug), newsPostContentSchema),
      ).not.toThrow();
    }

    const homeBerita = readFrontmatter("home/berita", homeBeritaContentSchema);
    expect(homeBerita.teaserSlugs).toHaveLength(4);
  });
});
