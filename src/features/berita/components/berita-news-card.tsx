import Link from "next/link";
import { PlaceholdImage } from "@/components/ui/placehold-image";
import type { NewsPost } from "../types";

/**
 * News card: one media placeholder, then the title, upload date and copy.
 * The whole card is a single link to its article page.
 */
export function BeritaNewsCard({ post }: { readonly post: NewsPost }) {
  const titleClass = "text-28 leading-9 font-extrabold tracking-tight text-ink";

  return (
    <article className="h-96 overflow-hidden border-b border-border-sand pb-10">
      <Link
        href={`/berita/${post.slug}`}
        data-testid={`news-card-${post.slug}`}
        className="grid h-full grid-cols-1 gap-8 lg:cols-580 lg:gap-12"
      >
        <div className="relative h-full min-h-48 overflow-hidden rounded-2xl border border-border-sand bg-surface-100">
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
              <p className="text-10 text-body-muted">
                Diupload pada: {post.uploadedLabel}
              </p>
            ) : null}
          </div>
          <div className="space-y-4">
            {post.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-15 leading-6 text-body">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
