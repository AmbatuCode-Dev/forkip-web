export function AccordionToggleIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="h-4 w-4 shrink-0 text-[#1C1C1C]"
    >
      <line x1="2.75" y1="8" x2="13.25" y2="8" />
      {expanded ? null : <line x1="8" y1="2.75" x2="8" y2="13.25" />}
    </svg>
  );
}
