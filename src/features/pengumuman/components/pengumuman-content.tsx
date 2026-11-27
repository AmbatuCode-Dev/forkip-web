"use client";

import { useRef } from "react";
import { useSectionReveal } from "@/features/home";
import { pengumumanList } from "../data";
import { PengumumanCard } from "./pengumuman-card";

/**
 * Page body (spec /pengumuman): the two official announcement cards in a
 * 2-column grid within the shared service-page container.
 */
export function PengumumanContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  useSectionReveal(containerRef);

  return (
    <div
      ref={containerRef}
      className="mx-auto grid w-full max-w-300 grid-cols-1 gap-8 px-4 pt-12 pb-20 sm:px-6 lg:grid-cols-2 xl:px-0"
    >
      {pengumumanList.map((pengumuman, index) => (
        <div key={pengumuman.id} data-reveal-item>
          <PengumumanCard
            pengumuman={pengumuman}
            variant={((index % 3) + 1) as 1 | 2 | 3}
          />
        </div>
      ))}
    </div>
  );
}
