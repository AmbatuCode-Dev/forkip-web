import type { AlurStepIconId } from "../types";

const STROKE = {
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  fill: "none",
} as const;

/**
 * Minimal 24×24 stroke icon approximations for the alur step cards
 * (person, download, printer, form, scan/pdf, upload, chat, building).
 */
const ICONS: Record<AlurStepIconId, React.ReactNode> = {
  person: (
    <>
      <circle cx="12" cy="8" r="3.2" {...STROKE} />
      <path d="M5.5 19.5c.8-3.3 3.4-5 6.5-5s5.7 1.7 6.5 5" {...STROKE} />
    </>
  ),
  download: (
    <>
      <path d="M12 4v10" {...STROKE} />
      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" {...STROKE} />
      <path d="M5 19h14" {...STROKE} />
    </>
  ),
  printer: (
    <>
      <path d="M7 8V4.5h10V8" {...STROKE} />
      <rect x="4" y="8" width="16" height="7" rx="1.5" {...STROKE} />
      <path d="M7 13h10v6.5H7z" {...STROKE} />
    </>
  ),
  form: (
    <>
      <rect x="5.5" y="3.5" width="13" height="17" rx="1.5" {...STROKE} />
      <path d="M9 8h6M9 12h6M9 16h3.5" {...STROKE} />
    </>
  ),
  document: (
    <>
      <path d="M6 3.5h8l4 4v13H6z" {...STROKE} />
      <path d="M14 3.5v4h4" {...STROKE} />
      <path d="M9.5 14h5M9.5 17h3" {...STROKE} />
    </>
  ),
  upload: (
    <>
      <path d="M12 19V9" {...STROKE} />
      <path d="m7.5 12.5 4.5-4.5 4.5 4.5" {...STROKE} />
      <path d="M5 4.5h14" {...STROKE} />
    </>
  ),
  chat: (
    <>
      <path
        d="M4.5 6.5A1.5 1.5 0 0 1 6 5h12a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 18 16H9l-4.5 3.5z"
        {...STROKE}
      />
      <path d="M8.5 9.5h7M8.5 12h4.5" {...STROKE} />
    </>
  ),
  building: (
    <>
      <path d="M5 20.5V6l7-2.5L19 6v14.5" {...STROKE} />
      <path d="M3.5 20.5h17" {...STROKE} />
      <path
        d="M9 10h2M13 10h2M9 13.5h2M13 13.5h2M10.5 20.5v-3.5h3v3.5"
        {...STROKE}
      />
    </>
  ),
};

export interface AlurStepIconProps {
  readonly icon: AlurStepIconId;
  readonly className?: string;
}

export function AlurStepIcon({ icon, className }: AlurStepIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      focusable="false"
    >
      {ICONS[icon]}
    </svg>
  );
}
