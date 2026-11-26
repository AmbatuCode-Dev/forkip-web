/**
 * News post shape for the /berita list. Paragraphs, dates, photo counts and
 * captions are verbatim from content-template-terisi.md §3.
 */
export interface NewsPost {
  readonly slug: string;
  readonly title: string;
  /** Omitted until an official upload date exists (BUSAMAKIP, Gelar KIPK). */
  readonly uploadedLabel?: string;
  readonly photoCount: number;
  readonly paragraphs: readonly string[];
  /** Page the post appears on (1-based) in the /berita list. */
  readonly page: number;
  /** Caption shown with the media; badge was left blank by the client. */
  readonly gallery?: {
    readonly badge?: string;
    readonly caption: string;
  };
}
