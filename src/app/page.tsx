import { BerandaPage } from "@/features/home";
import { getFaculties } from "@/lib/content/faculties";
import { getHomeBerita } from "@/lib/content/home";
import { getNewsPosts } from "@/lib/content/news";
import { getProgramCards, getProgramSpotlight } from "@/lib/content/program";

export default async function HomePage() {
  const [faculties, spotlight, cards, berita, posts] = await Promise.all([
    getFaculties(),
    getProgramSpotlight(),
    getProgramCards(),
    getHomeBerita(),
    getNewsPosts(),
  ]);

  return (
    <BerandaPage
      faculties={faculties}
      spotlight={spotlight}
      cards={cards}
      berita={berita}
      posts={posts}
    />
  );
}
