import { cn } from "@/utils/cn";

/** Placeholder WhatsApp link (TODO: real delegation deep links). */
const WHATSAPP_HREF = "#";

export interface FacultyContactItem {
  readonly code: string;
  /** Faculty tile color, applied as an inline style (not a Tailwind token). */
  readonly color: string;
  /** FIKK renders as a white tile with a teal outline and dark text. */
  readonly outline?: boolean;
}

export interface FacultyContactGridProps {
  readonly items: readonly FacultyContactItem[];
  /** Intro line above the grid, e.g. "Pilih delegasi fakultas Anda…". */
  readonly label: string;
}

/**
 * Shared 4×2 grid of faculty WhatsApp contact tiles (missing-pages spec,
 * frames 224:1120 / 224:1216). Data-driven: colors arrive via props and are
 * applied as inline styles. hrefs are placeholders (TODO: real WhatsApp
 * delegation links).
 */
export function FacultyContactGrid({ items, label }: FacultyContactGridProps) {
  return (
    <section aria-label={label} className="flex flex-col gap-4">
      <h2 className="text-13 font-normal text-body">{label}</h2>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((faculty) => (
          <li key={faculty.code}>
            <a
              href={WHATSAPP_HREF}
              className={cn(
                "flex h-18.5 items-center justify-between gap-2 rounded-10 px-5 py-3 transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
                faculty.outline
                  ? "border border-teal bg-white text-ink"
                  : "border border-transparent text-white",
              )}
              style={
                faculty.outline ? undefined : { backgroundColor: faculty.color }
              }
              aria-label={`Hubungi delegasi ${faculty.code} via WhatsApp`}
            >
              <span className="flex flex-col gap-1 text-left">
                <span className="text-22 font-bold">{faculty.code}</span>
                <span className="text-xs font-normal">
                  Hubungi via WhatsApp
                </span>
              </span>
              <span
                aria-hidden="true"
                className="text-lg leading-none font-medium"
              >
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
