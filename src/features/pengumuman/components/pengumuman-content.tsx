import { pengumumanList } from "../data";
import { PengumumanCard } from "./pengumuman-card";

/**
 * Page body (spec /pengumuman): the two official announcement cards stacked
 * in the shared service-page container.
 */
export function PengumumanContent() {
  return (
    <div className="mx-auto grid w-full max-w-300 grid-cols-1 gap-8 px-4 pt-12 pb-20 sm:px-6 lg:grid-cols-2 xl:px-0">
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
