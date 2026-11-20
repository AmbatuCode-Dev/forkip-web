import type { AlurStepIconId } from "../types";

/**
 * Colourful 80×80 illustrations for the 8-step flow diagram
 * (docs/figma-specs/pages/form-pengunduran-diri.png). Each icon mirrors the
 * pictogram used in the Figma reference: student, download, printer, form,
 * PDF, document, google form and reporting delegate.
 */
const ICONS: Record<AlurStepIconId, React.ReactNode> = {
  person: (
    <>
      <path d="M22 70c1-14 7-21 18-21s17 7 18 21z" fill="#2F5D8E" />
      <path d="M33 49l7 8 7-8-7-4z" fill="#FFFFFF" />
      <circle cx="40" cy="29" r="12" fill="#F2C6A0" />
      <path
        d="M28 27c0-9 5-14 12-14s12 5 12 14c-3-4-7-5-12-5s-9 1-12 5z"
        fill="#6B3F2A"
      />
      <rect x="46" y="56" width="14" height="10" rx="2" fill="#FFFFFF" />
      <rect x="48" y="59" width="8" height="1.5" fill="#2F5D8E" />
      <rect x="48" y="62" width="6" height="1.5" fill="#9AA5B1" />
    </>
  ),
  download: (
    <>
      <rect x="16" y="12" width="48" height="48" rx="12" fill="#2F80ED" />
      <rect
        x="16"
        y="12"
        width="48"
        height="48"
        rx="12"
        fill="url(#downloadShine)"
      />
      <path
        d="M40 24v20m0 0-9-9m9 9 9-9"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="downloadShine" x1="16" y1="12" x2="64" y2="60">
          <stop stopColor="#FFFFFF" stopOpacity="0.25" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
    </>
  ),
  printer: (
    <>
      <rect
        x="27"
        y="12"
        width="26"
        height="20"
        rx="2"
        fill="#FFFFFF"
        stroke="#94A3B8"
        strokeWidth="2"
      />
      <rect
        x="14"
        y="30"
        width="52"
        height="26"
        rx="6"
        fill="#D8E0EA"
        stroke="#94A3B8"
        strokeWidth="2"
      />
      <rect
        x="24"
        y="52"
        width="32"
        height="16"
        rx="2"
        fill="#FFFFFF"
        stroke="#94A3B8"
        strokeWidth="2"
      />
      <path
        d="M29 58h22M29 63h16"
        stroke="#B7C1CC"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="57" cy="40" r="2.5" fill="#E05A5A" />
      <circle cx="50" cy="40" r="2.5" fill="#6FBF73" />
      <rect x="20" y="35" width="20" height="4" rx="2" fill="#A9B6C4" />
    </>
  ),
  form: (
    <>
      <rect
        x="20"
        y="16"
        width="40"
        height="52"
        rx="5"
        fill="#E9EEF3"
        stroke="#8FA0B2"
        strokeWidth="2"
      />
      <rect x="32" y="10" width="16" height="9" rx="3" fill="#8FA0B2" />
      <path
        d="M28 32h8M28 42h8M28 52h6"
        stroke="#5B6B7B"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect x="40" y="29" width="12" height="6" rx="2" fill="#F6D34A" />
      <rect x="40" y="39" width="12" height="6" rx="2" fill="#BFE3CF" />
      <rect x="40" y="49" width="12" height="6" rx="2" fill="#BFE3CF" />
      <path
        d="M50 58l14-14 4 4-14 14-6 2z"
        fill="#E8A33D"
        stroke="#A86F1E"
        strokeWidth="1.5"
      />
    </>
  ),
  document: (
    <>
      <path
        d="M24 10h24l12 12v46a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4z"
        fill="#D93B3B"
      />
      <path d="M48 10v12h12z" fill="#A52020" />
      <text
        x="40"
        y="53"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="17"
        fontWeight="800"
        fontFamily="Arial, sans-serif"
      >
        PDF
      </text>
    </>
  ),
  upload: (
    <>
      <path
        d="M26 10h24l12 12v44a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4z"
        fill="#7B3FC6"
      />
      <path d="M50 10v12h12z" fill="#5B2A9B" />
      <circle cx="34" cy="38" r="3" fill="#FFFFFF" />
      <circle cx="34" cy="52" r="3" fill="#FFFFFF" />
      <path
        d="M43 36h12M43 43h10M43 50h12M43 57h7"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </>
  ),
  chat: (
    <>
      <rect
        x="14"
        y="14"
        width="52"
        height="46"
        rx="6"
        fill="#FFFFFF"
        stroke="#B7C4D2"
        strokeWidth="2"
      />
      <rect x="14" y="14" width="52" height="13" rx="6" fill="#2F80ED" />
      <circle cx="28" cy="43" r="7" fill="#BFE3CF" />
      <circle cx="28" cy="40" r="2.5" fill="#4E9F7A" />
      <path d="M23 49c1-3 3-4 5-4s4 1 5 4z" fill="#4E9F7A" />
      <rect x="40" y="35" width="18" height="5" rx="2.5" fill="#E7C7A8" />
      <rect x="40" y="44" width="18" height="5" rx="2.5" fill="#E7C7A8" />
      <circle
        cx="53"
        cy="59"
        r="7"
        fill="#F6D34A"
        stroke="#FFFFFF"
        strokeWidth="2"
      />
      <circle cx="53" cy="57" r="2" fill="#7A5B00" />
      <path d="M49 63c1-2 2-3 4-3s3 1 4 3z" fill="#7A5B00" />
    </>
  ),
  building: (
    <>
      <path d="M16 70V40l24-9 24 9v30z" fill="#1F2937" />
      <circle cx="40" cy="24" r="10" fill="#F2C6A0" />
      <path
        d="M30 23c0-7 4-11 10-11s10 4 10 11c-3-3-6-4-10-4s-7 1-10 4z"
        fill="#3B2B25"
      />
      <path d="M31 38l9 8 9-8-9-4z" fill="#FFFFFF" />
      <rect x="58" y="26" width="20" height="12" rx="3" fill="#D93B3B" />
      <text
        x="68"
        y="34.5"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="7"
        fontWeight="800"
        fontFamily="Arial, sans-serif"
      >
        REPORT
      </text>
      <path d="M59 38l9 4 9-4" fill="none" stroke="#A52020" strokeWidth="2" />
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
      viewBox="0 0 80 80"
      aria-hidden="true"
      className={className}
      focusable="false"
    >
      {ICONS[icon]}
    </svg>
  );
}

/** Chunky blue ± gold arrow used between the diagram steps. */
export function AlurArrow({
  direction,
  className,
}: {
  readonly direction: "right" | "left" | "down";
  readonly className?: string;
}) {
  const rotation = direction === "left" ? 180 : direction === "down" ? 90 : 0;
  return (
    <svg
      viewBox="0 0 48 32"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <path
        d="M3 12h27V4l16 12-16 12v-8H3z"
        fill="#22579B"
        stroke="#E0B400"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
