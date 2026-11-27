import "server-only";

import { getFaculties } from "@/lib/content/faculties";
import type { FacultyContact } from "../types";

/** Faculty tiles for the Advokasi delegation grid, in content order. */
export async function getDonatDanHibahFaculties(): Promise<
  readonly FacultyContact[]
> {
  const faculties = await getFaculties();
  return faculties.map((faculty) => ({
    code: faculty.code,
    color: faculty.color,
    outline: faculty.outline,
  }));
}
