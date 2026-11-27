import type { IconComponent } from "@coolicons/react";
import {
  ArrowBigRight,
  Building1,
  ChatHelp,
  FileDownload,
  FileText,
  FileUpload,
  GraduationCap,
  ListCheck,
  Printer,
} from "@coolicons/react";
import type { AlurStepIconId } from "../types";

/**
 * Line icons for the 8-step flow diagram (@coolicons/react, root import =
 * Line). Each maps one AlurStepIconId to a coolicons component; sizing and
 * colour come from the parent className (currentColor).
 */
const ICONS: Record<AlurStepIconId, IconComponent> = {
  person: GraduationCap,
  download: FileDownload,
  printer: Printer,
  form: ListCheck,
  document: FileText,
  upload: FileUpload,
  chat: ChatHelp,
  building: Building1,
};

export interface AlurStepIconProps {
  readonly icon: AlurStepIconId;
  readonly className?: string;
}

export function AlurStepIcon({ icon, className }: AlurStepIconProps) {
  const Glyph = ICONS[icon];
  return (
    <Glyph aria-hidden="true" className={`text-navy ${className ?? ""}`} />
  );
}

/** Chunky blue arrow used between the diagram steps (coolicons ArrowBigRight). */
export function AlurArrow({
  direction,
  className,
}: {
  readonly direction: "right" | "left" | "down";
  readonly className?: string;
}) {
  const rotation = direction === "left" ? 180 : direction === "down" ? 90 : 0;
  return (
    <ArrowBigRight
      size={48}
      aria-hidden="true"
      className={`text-navy ${className ?? ""}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    />
  );
}
