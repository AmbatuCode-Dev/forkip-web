import type { PageHeroContent } from "../types";

/**
 * Page-level Indonesian copy for /program-unggulan. The spotlight and program
 * cards come from content/program-unggulan through getProgramUnggulanContent;
 * only the intro copy lives here. An "Arsip Kegiatan" href of "#" means a
 * public URL is not yet available — callers hide it with isActionableHref.
 */

export const programUnggulanHero: PageHeroContent = {
  breadcrumbLabel: "Program Unggulan",
  title: "Program Unggulan Forkip UNJ",
  subtitle:
    "Program unggulan FORKIP UNJ mendukung pengembangan akademik dan keterampilan mahasiswa penerima KIP Kuliah, sekaligus membuka ruang bagi mereka untuk berkontribusi melalui pengabdian kepada masyarakat.",
};

export const programLainTitle = "Program lain";
