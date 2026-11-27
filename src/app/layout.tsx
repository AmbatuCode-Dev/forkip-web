import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getNavigation } from "@/lib/content/navigation";
import { getSite } from "@/lib/content/site";
import { AppProvider } from "./provider";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: {
      default: site.name,
      template: `%s | ${site.name}`,
    },
    description: site.description,
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [site, navigation] = await Promise.all([getSite(), getNavigation()]);

  return (
    <html lang="id" className={`${jakartaSans.variable} h-full antialiased`}>
      <body className="flex min-h-svh flex-col bg-background font-sans text-foreground">
        <AppProvider>
          <SiteHeader site={site} navigation={navigation} />
          <main className="flex-1">{children}</main>
          <SiteFooter site={site} navigation={navigation} />
        </AppProvider>
      </body>
    </html>
  );
}
