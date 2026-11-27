import { ArrowRight } from "@coolicons/react";
import type { FacultyContact } from "../types";

/**
 * 4×2 grid of faculty WhatsApp contact tiles (spec §5). Colors come from the
 * faculty content DTOs; white text; hrefs are supplied by content.
 */
export function FakultasKontakGrid({
  faculties,
}: {
  readonly faculties: readonly FacultyContact[];
}) {
  return (
    <section
      aria-labelledby="fakultas-kontak-heading"
      className="flex flex-col gap-4"
    >
      <h2
        id="fakultas-kontak-heading"
        className="text-sm font-normal text-body"
      >
        Klik tombol di bawah untuk menghubungi delegasi KIF Fakultas:
      </h2>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {faculties.map((faculty) => (
          <li key={faculty.code}>
            <a
              href={faculty.href}
              className={`flex h-18.5 items-center justify-between gap-2 rounded-10 px-5 py-3 transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none ${
                faculty.variant === "outline"
                  ? "border border-teal bg-white text-ink"
                  : "border border-transparent text-white"
              }`}
              style={
                faculty.variant === "outline"
                  ? undefined
                  : { backgroundColor: faculty.color }
              }
              aria-label={`Hubungi delegasi KIF ${faculty.code} via WhatsApp`}
            >
              <span className="flex flex-col gap-1 text-left">
                <span className="text-xl font-bold">{faculty.code}</span>
                <span className="text-xs font-normal">
                  Hubungi via WhatsApp
                </span>
              </span>
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="shrink-0 font-medium"
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
