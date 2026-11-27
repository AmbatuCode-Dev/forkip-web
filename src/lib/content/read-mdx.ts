import "server-only";

import { readFileSync } from "node:fs";
import path from "node:path";
import * as YAML from "yaml";
import * as z from "zod";

/** Every content file that may be read. Keys are content-relative IDs. */
export const contentFiles = [
  "site",
  "navigation",
  "faculties/fip",
  "faculties/fbs",
  "faculties/fmipa",
  "faculties/fish",
  "faculties/ft",
  "faculties/fpsi",
  "faculties/feb",
  "faculties/fikk",
  "program-unggulan/spotlight",
  "program-unggulan/explore-kipk",
  "program-unggulan/indikasi",
  "program-unggulan/sosialisasi-kipk",
  "berita/explore-kipk-2026",
  "berita/pelatihan-divisi-kif",
  "berita/busamakip",
  "berita/verifikasi-kipk-snbp",
  "berita/gelar-kipk",
  "home/berita",
] as const;

export type ContentFile = (typeof contentFiles)[number];

const contentPaths: Readonly<Record<ContentFile, string>> = {
  site: "site.mdx",
  navigation: "navigation.mdx",
  "faculties/fip": "faculties/fip.mdx",
  "faculties/fbs": "faculties/fbs.mdx",
  "faculties/fmipa": "faculties/fmipa.mdx",
  "faculties/fish": "faculties/fish.mdx",
  "faculties/ft": "faculties/ft.mdx",
  "faculties/fpsi": "faculties/fpsi.mdx",
  "faculties/feb": "faculties/feb.mdx",
  "faculties/fikk": "faculties/fikk.mdx",
  "program-unggulan/spotlight": "program-unggulan/spotlight.mdx",
  "program-unggulan/explore-kipk": "program-unggulan/explore-kipk.mdx",
  "program-unggulan/indikasi": "program-unggulan/indikasi.mdx",
  "program-unggulan/sosialisasi-kipk": "program-unggulan/sosialisasi-kipk.mdx",
  "berita/explore-kipk-2026": "berita/explore-kipk-2026.mdx",
  "berita/pelatihan-divisi-kif": "berita/pelatihan-divisi-kif.mdx",
  "berita/busamakip": "berita/busamakip.mdx",
  "berita/verifikasi-kipk-snbp": "berita/verifikasi-kipk-snbp.mdx",
  "berita/gelar-kipk": "berita/gelar-kipk.mdx",
  "home/berita": "home/berita.mdx",
};

/** Allowlisted news slugs; no slug is ever turned into a filesystem path. */
export const newsSlugs = [
  "explore-kipk-2026",
  "pelatihan-divisi-kif",
  "busamakip",
  "verifikasi-kipk-snbp",
  "gelar-kipk",
] as const;

export type NewsSlug = (typeof newsSlugs)[number];

const newsSlugSet: ReadonlySet<string> = new Set(newsSlugs);

const newsSlugFiles: Readonly<Record<NewsSlug, ContentFile>> = {
  "explore-kipk-2026": "berita/explore-kipk-2026",
  "pelatihan-divisi-kif": "berita/pelatihan-divisi-kif",
  busamakip: "berita/busamakip",
  "verifikasi-kipk-snbp": "berita/verifikasi-kipk-snbp",
  "gelar-kipk": "berita/gelar-kipk",
};

export function isNewsSlug(slug: string): slug is NewsSlug {
  return newsSlugSet.has(slug);
}

export function newsSlugToFile(slug: NewsSlug): ContentFile {
  return newsSlugFiles[slug];
}

function resolveContentPath(file: ContentFile): string {
  return path.join(process.cwd(), "content", contentPaths[file]);
}

const frontmatterPattern = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/;

/**
 * Reads and validates the `---` fenced YAML frontmatter of one allowlisted MDX
 * file. Bodies are deliberately not read here; use render-mdx for those.
 */
export function readFrontmatter<T>(file: ContentFile, schema: z.ZodType<T>): T {
  const filePath = resolveContentPath(file);
  const source = readFileSync(filePath, "utf8");
  const match = frontmatterPattern.exec(source);

  if (!match) {
    throw new Error(
      `Content file ${filePath} is missing a --- fenced frontmatter block.`,
    );
  }

  let parsed: unknown;
  try {
    parsed = YAML.parse(match[1]);
  } catch (error) {
    throw new Error(
      `Invalid YAML frontmatter in ${filePath}: ${error instanceof Error ? error.message : String(error)}`,
      { cause: error },
    );
  }

  const result = schema.safeParse(parsed);
  if (!result.success) {
    throw new Error(
      `Invalid frontmatter in ${filePath}:\n${z.prettifyError(result.error)}`,
    );
  }

  return result.data;
}
