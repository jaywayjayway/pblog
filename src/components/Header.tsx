import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
        <Link href="/" className="group">
          <span className="block text-lg font-semibold tracking-tight">
            {siteConfig.title}
          </span>
          <span className="block text-xs text-zinc-500">{siteConfig.subtitle}</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-zinc-600">
          <Link href="/" className="hover:text-zinc-900">
            文章
          </Link>
          <Link href="/tags" className="hover:text-zinc-900">
            标签
          </Link>
        </nav>
      </div>
    </header>
  );
}
