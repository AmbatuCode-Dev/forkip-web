import { pengumumanList } from "../data";
import { PengumumanCard } from "./pengumuman-card";

/**
 * Page body (spec /pengumuman): the two official announcement cards stacked
 * in the shared service-page container.
 */
export function PengumumanContent() {
  return (
    <div className="mx-auto flex w-full max-w-300 flex-col gap-8 px-4 pt-12 pb-20 sm:px-6 xl:px-0">
      {pengumumanList.map((pengumuman, index) => (
        <PengumumanCard
          key={pengumuman.id}
          pengumuman={pengumuman}
          variant={((index % 3) + 1) as 1 | 2 | 3}
        />
      ))}
    </div>
  );
}
