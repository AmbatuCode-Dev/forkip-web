import type { HomeBeritaContent, NewsPostContent } from "@/types";

export interface BeritaFeature {
  readonly title: string;
  readonly slug: string;
  readonly summary: string;
  readonly photoLabel: string;
}

export interface BeritaTeaser {
  readonly title: string;
  readonly slug: string;
  readonly summary: string;
}

export interface BeritaMarqueeItem {
  readonly label: string;
}

export interface BeritaSectionContent {
  readonly title: string;
  readonly subtitle: string;
  readonly feature: BeritaFeature | null;
  readonly teasers: readonly BeritaTeaser[];
  readonly marqueeItems: readonly BeritaMarqueeItem[];
  readonly ctaLabel: string;
  readonly ctaButton: string;
  readonly ctaHref: string;
}

/** The lead paragraph is the card summary for features and teasers. */
function summaryOf(post: NewsPostContent): string {
  return post.paragraphs[0] ?? "";
}

function toFeature(post: NewsPostContent): BeritaFeature {
  return {
    title: post.title,
    slug: post.slug,
    summary: summaryOf(post),
    photoLabel: post.title,
  };
}

function toTeaser(post: NewsPostContent): BeritaTeaser {
  return {
    title: post.title,
    slug: post.slug,
    summary: summaryOf(post),
  };
}

/**
 * Resolves the Beranda Berita section against news content: the feature and
 * teasers are selected by the slugs in home/berita.mdx, while the marquee
 * labels follow the post order from getNewsPosts().
 */
export function buildBeritaSectionContent(
  berita: HomeBeritaContent,
  posts: readonly NewsPostContent[],
): BeritaSectionContent {
  const bySlug = new Map(posts.map((post) => [post.slug, post]));
  const featurePost = bySlug.get(berita.featureSlug);
  const teasers = berita.teaserSlugs
    .map((slug) => bySlug.get(slug))
    .filter((post): post is NewsPostContent => post !== undefined);

  return {
    title: berita.title,
    subtitle: berita.subtitle,
    feature: featurePost ? toFeature(featurePost) : null,
    teasers: teasers.map(toTeaser),
    marqueeItems: posts.map((post) => ({ label: post.title })),
    ctaLabel: berita.ctaLabel,
    ctaButton: berita.ctaButton,
    ctaHref: berita.ctaHref,
  };
}
