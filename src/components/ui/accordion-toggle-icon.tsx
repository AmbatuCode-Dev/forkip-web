export function AccordionToggleIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="h-7 w-7 shrink-0 text-ink"
    >
      <line x1="5" y1="14" x2="23" y2="14" />
      {expanded ? null : <line x1="14" y1="5" x2="14" y2="23" />}
    </svg>
  );
}
