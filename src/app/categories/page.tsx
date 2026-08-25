import Link from "next/link";
import { getAllCategories } from "@/lib/posts";

export const metadata = { title: "分类" };

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div>
      <div className="mb-8 border-b border-zinc-200 pb-6">
        <h1 className="text-3xl font-semibold tracking-tight">分类</h1>
      </div>

      {categories.length === 0 ? (
        <p className="text-sm text-zinc-500">暂无分类。</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {categories.map(({ category, count }) => (
            <Link
              key={category}
              href={`/categories/${encodeURIComponent(category)}`}
              className="rounded-full bg-zinc-100 px-4 py-1.5 text-sm text-zinc-700 hover:bg-zinc-200"
            >
              {category}
              <span className="ml-1.5 text-xs text-zinc-400">{count}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
