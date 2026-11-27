export type AlurStepIconId =
  | "person"
  | "download"
  | "printer"
  | "form"
  | "document"
  | "upload"
  | "chat"
  | "building";

export interface AlurStep {
  readonly step: number;
  readonly title: string;
  readonly icon: AlurStepIconId;
}

export interface FacultyContact {
  readonly code: string;
  /** Faculty tile color from docs/design-style.md (faculty tile palette). */
  readonly color: string;
  /** WhatsApp contact link; TODO: replace with the real delegation numbers. */
  readonly href: string;
  /** FIKK is an outlined white tile in the reference; the rest are filled. */
  readonly variant?: "filled" | "outline";
}
