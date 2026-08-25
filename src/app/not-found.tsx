import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <p className="text-sm font-medium text-zinc-400">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">页面不存在</h1>
      <p className="mt-3 text-sm text-zinc-500">链接可能已失效，或者页面已被移动。</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-md bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-700"
      >
        返回文章列表
      </Link>
    </div>
  );
}
