import Link from "next/link";
import { PlaceholdImage } from "@/components/ui/placehold-image";
import type { NewsPost } from "../types";

/**
 * News card: one media placeholder, then the title, upload date and copy.
 * The whole card is a single link to its article page.
 */
export function BeritaNewsCard({ post }: { readonly post: NewsPost }) {
  const titleClass =
    "text-2xl leading-8 font-extrabold tracking-tight text-ink sm:text-3xl sm:leading-9";

  return (
    <article className="overflow-hidden border-b border-border-sand pb-10 lg:h-96">
      <Link
        href={`/berita/${post.slug}`}
        data-testid={`news-card-${post.slug}`}
        className="grid grid-cols-1 gap-8 lg:h-full lg:cols-580 lg:gap-12"
      >
        <div className="relative h-56 overflow-hidden rounded-2xl border border-border-sand bg-surface-100 sm:h-72 lg:h-full lg:min-h-48">
          <PlaceholdImage
            label={post.gallery?.caption ?? post.title}
            width={640}
            height={300}
            variant={1}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className={titleClass}>{post.title}</h3>
            {post.uploadedLabel ? (
              <p className="text-xs text-body-muted">
                Diupload pada: {post.uploadedLabel}
              </p>
            ) : null}
          </div>
          <div className="space-y-4">
            {post.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-6 text-body">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
