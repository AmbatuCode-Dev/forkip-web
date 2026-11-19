import type { ServiceIcon } from "../types";

interface IconProps {
  className?: string;
}

/**
 * Minimal inline line icons for the Layanan cards (spec §5: no icon package).
 * All share a 24×24 viewBox with 1.5px strokes.
 */
export function ServiceIconGlyph({
  icon,
  className,
}: IconProps & { icon: ServiceIcon }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {icon === "question" ? (
        <>
          <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v10a1.5 1.5 0 0 1-1.5 1.5H12l-4.2 3.4a.5.5 0 0 1-.8-.4V17H5.5A1.5 1.5 0 0 1 4 15.5Z" />
          <path d="M9.8 9.2a2.2 2.2 0 1 1 3.2 2c-.6.35-1 .75-1 1.4" />
          <circle cx="12" cy="14.7" r="0.4" fill="currentColor" stroke="none" />
        </>
      ) : null}
      {icon === "rental" ? (
        <>
          <path d="M5.5 8 7 4.5h10L18.5 8" />
          <rect x="4" y="8" width="16" height="4" rx="1.2" />
          <path d="M5.5 12v7A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5v-7" />
          <path d="M10 15.5h4" />
        </>
      ) : null}
      {icon === "wallet" ? (
        <>
          <rect x="3.5" y="6" width="17" height="13" rx="2" />
          <path d="M3.5 9.5h17" />
          <path d="M15.5 14.5h2" />
        </>
      ) : null}
      {icon === "verification" ? (
        <>
          <path d="M12 3.5 5.5 6v5.2c0 4.4 2.8 7.6 6.5 9.3 3.7-1.7 6.5-4.9 6.5-9.3V6Z" />
          <path d="m9.3 11.8 2 2 3.4-3.6" />
        </>
      ) : null}
      {icon === "withdrawal" ? (
        <>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M9.5 4v16" />
          <path d="m13 9 3 3-3 3" />
        </>
      ) : null}
      {icon === "archive" ? (
        <>
          <rect x="3.5" y="4.5" width="17" height="4.5" rx="1.2" />
          <path d="M5 9v9.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V9" />
          <path d="M10 13h4" />
        </>
      ) : null}
    </svg>
  );
}
