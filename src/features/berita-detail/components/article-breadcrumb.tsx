import { ArrowLeft } from "@coolicons/react";
import Link from "next/link";
import { cn } from "@/utils/cn";

/**
 * Breadcrumb trail (spec §A): "Beranda / Berita / {title}" — links to / and
 * /berita; current page SemiBold ink. Own component (PageHero is not used on
 * this page).
 */
export function ArticleBreadcrumb({ title }: { readonly title: string }) {
  const linkClass =
    "rounded-sm transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";
  return (
    <nav aria-label="Breadcrumb">
      <p className="text-sm font-medium text-body-muted">
        <Link href="/" className={linkClass}>
          Beranda
        </Link>
        <span aria-hidden="true"> / </span>
        <Link href="/berita" className={linkClass}>
          Berita
        </Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page" className="font-semibold text-ink">
          {title}
        </span>
      </p>
    </nav>
  );
}

/** "Kembali ke Berita" back-link (spec §A): 15 SemiBold gold-ink with arrow. */
export function ArticleBackLink() {
  return (
    <Link
      href="/berita"
      className={cn(
        "inline-flex items-center gap-2 rounded-sm text-base font-semibold text-gold-ink",
        "transition-colors hover:text-gold-deep focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
      )}
      data-testid="article-back-link"
    >
      <ArrowLeft size={15} aria-hidden="true" className="shrink-0" />
      Kembali ke Berita
    </Link>
  );
}
