import "server-only";

import { getFaculties } from "@/lib/content/faculties";
import type { FacultyContact } from "../types";

/** Faculty delegation rows for the Pertanyaan rail, in content order. */
export async function getPertanyaanFaculties(): Promise<
  readonly FacultyContact[]
> {
  const faculties = await getFaculties();
  return faculties.map((faculty) => ({
    code: faculty.code,
    fullName: faculty.name,
    color: faculty.color,
    outline: faculty.outline,
  }));
}
