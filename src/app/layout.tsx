import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { siteConfig } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${siteConfig.title} —— ${siteConfig.subtitle}`,
  description: siteConfig.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
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
