import "server-only";

import type { ProgramCardContent, ProgramSpotlightContent } from "@/types";
import { type ContentFile, readFrontmatter } from "./read-mdx";
import {
  programCardContentSchema,
  programSpotlightContentSchema,
} from "./schemas";

const programCardFiles: readonly ContentFile[] = [
  "program-unggulan/explore-kipk",
  "program-unggulan/indikasi",
  "program-unggulan/sosialisasi-kipk",
];

export async function getProgramSpotlight(): Promise<ProgramSpotlightContent> {
  return readFrontmatter<ProgramSpotlightContent>(
    "program-unggulan/spotlight",
    programSpotlightContentSchema,
  );
}

export async function getProgramCards(): Promise<
  readonly ProgramCardContent[]
> {
  return programCardFiles
    .map((file) =>
      readFrontmatter<ProgramCardContent>(file, programCardContentSchema),
    )
    .sort((a, b) => a.order - b.order);
}
