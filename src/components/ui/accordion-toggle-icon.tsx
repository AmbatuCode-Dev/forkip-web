import { Minus, Plus } from "@coolicons/react";

export function AccordionToggleIcon({ expanded }: { expanded: boolean }) {
  return expanded ? (
    <Minus size={28} aria-hidden="true" className="h-7 w-7 shrink-0 text-ink" />
  ) : (
    <Plus size={28} aria-hidden="true" className="h-7 w-7 shrink-0 text-ink" />
  );
}
