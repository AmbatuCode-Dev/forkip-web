import { Instagram, Mail, Tiktok, X } from "@coolicons/react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import type { NavigationContent, SiteContent } from "@/types";

interface FooterLink {
  readonly label: string;
  readonly href: string;
}

export interface SiteFooterProps {
  readonly site: SiteContent;
  readonly navigation: NavigationContent;
}

function footerLinks(
  routes: NavigationContent["routes"],
  hrefs: readonly string[],
): readonly FooterLink[] {
  return hrefs.map((href) => {
    const route = routes[href];
    return { href, label: route.footerLabel ?? route.label };
  });
}

interface SocialLink {
  readonly label: string;
  readonly href: string;
  readonly Icon: React.ComponentType<{ className?: string }>;
}

const socialLinks: readonly SocialLink[] = [
  {
    label: "Instagram Forum KIP-K UNJ",
    href: "https://www.instagram.com/forkipunj.official",
    Icon: Instagram,
  },
  {
    label: "X (Twitter) Forum KIP-K UNJ",
    href: "https://x.com/forumkipk_unj",
    Icon: X,
  },
  {
    label: "TikTok Forum KIP-K UNJ",
    href: "https://www.tiktok.com/@forkipunj",
    Icon: Tiktok,
  },
  {
    label: "Email humasnyaforkip@gmail.com",
    href: "mailto:humasnyaforkip@gmail.com",
    Icon: Mail,
  },
];

export function SiteFooter({ site, navigation }: SiteFooterProps) {
  const menuLinks = footerLinks(navigation.routes, navigation.footer.menu);
  const lainnyaLinks = footerLinks(
    navigation.routes,
    navigation.footer.lainnya,
  );

  return (
    <footer className="bg-surface-100">
      <div className="mx-auto w-full max-w-300 px-4 pt-20 pb-9 sm:px-6 xl:px-0">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-14">
          <div className="flex w-full flex-col lg:w-85 lg:shrink-0">
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/logo-mark.svg"
                alt=""
                width={48}
                height={48}
                className="size-12 object-contain"
              />
              <span className="text-lg font-extrabold tracking-t04 text-ink">
                {site.name}
              </span>
            </div>
            <p className="mt-4 text-sm leading-22 font-normal text-body">
              {site.description}
            </p>
            <div className="mt-4 flex items-center gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http")
                      ? "noreferrer noopener"
                      : undefined
                  }
                  className="inline-flex size-10 items-center justify-center rounded-full border border-border-sand bg-white transition-colors hover:bg-surface-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <social.Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Menu footer" className="flex-1">
            <h2 className="text-sm font-bold tracking-wide12 text-ink uppercase">
              Menu
            </h2>
            <ul className="mt-2.5 flex flex-col gap-3.5 leading-5">
              {menuLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm leading-5 font-medium text-body transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Lainnya footer" className="flex-1">
            <h2 className="text-sm font-bold tracking-wide12 text-ink uppercase">
              Lainnya
            </h2>
            <ul className="mt-2.5 flex flex-col gap-3.5 leading-5">
              {lainnyaLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm leading-5 font-medium text-body transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex-1">
            <h2 className="text-sm font-bold tracking-wide12 text-ink uppercase">
              Kontak
            </h2>
            <div className="mt-3">
              <Link
                href="/pertanyaan-pengaduan"
                className={buttonVariants({
                  variant: "gold",
                  size: "sm",
                  className: "rounded-full px-5 text-sm font-semibold",
                })}
              >
                Hubungi Kami
              </Link>
            </div>
            <div className="mt-4 overflow-hidden rounded-2xl border border-border-sand bg-surface-200">
              <iframe
                title="Peta lokasi Forum KIP-K UNJ"
                src="https://www.google.com/maps?q=Universitas+Negeri+Jakarta+Kampus+A&output=embed"
                className="h-35 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="mt-11.75 h-px bg-surface-200" />
        <p className="mt-12 text-sm leading-17 font-medium text-body-muted">
          © 2026 Forum KIP-K Universitas Negeri Jakarta
        </p>
      </div>
    </footer>
  );
}
