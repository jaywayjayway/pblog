import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.title} —— ${siteConfig.subtitle}`,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author }],
  alternates: {
    canonical: siteConfig.url,
    types: {
      "application/rss+xml": `${siteConfig.url}/feed.xml`,
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: siteConfig.title,
    title: `${siteConfig.title} —— ${siteConfig.subtitle}`,
    description: siteConfig.description,
    url: siteConfig.url,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-zinc-900">
        <Header />
        <main className="flex-1 mx-auto w-full max-w-3xl px-6 py-8">{children}</main>
        <footer className="border-t border-zinc-200 py-8 text-center text-xs text-zinc-400">
          {siteConfig.title} · {siteConfig.subtitle} · {siteConfig.author}
        </footer>
      </body>
    </html>
  );
}
