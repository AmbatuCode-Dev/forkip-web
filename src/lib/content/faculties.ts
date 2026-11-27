import "server-only";

import type { FacultyRecord } from "@/types";
import { type ContentFile, readFrontmatter } from "./read-mdx";
import { facultyRecordSchema } from "./schemas";

const facultyFiles: readonly ContentFile[] = [
  "faculties/fip",
  "faculties/fbs",
  "faculties/fmipa",
  "faculties/fish",
  "faculties/ft",
  "faculties/fpsi",
  "faculties/feb",
  "faculties/fikk",
];

export async function getFaculties(): Promise<readonly FacultyRecord[]> {
  return facultyFiles
    .map((file) => readFrontmatter<FacultyRecord>(file, facultyRecordSchema))
    .sort((a, b) => a.order - b.order);
}
