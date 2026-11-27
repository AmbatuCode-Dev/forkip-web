import "server-only";

import { getFaculties } from "@/lib/content/faculties";
import type { FacultyContact } from "../types";

/** Faculty contact tiles for the KIF delegation grid, in content order. */
export async function getPengunduranDiriFaculties(): Promise<
  readonly FacultyContact[]
> {
  const faculties = await getFaculties();
  return faculties.map((faculty) => ({
    code: faculty.code,
    color: faculty.color,
    href: faculty.whatsappHref ?? "#",
    variant: faculty.outline ? "outline" : "filled",
  }));
}
