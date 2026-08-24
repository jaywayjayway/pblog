import Link from "next/link";
import { getAllTags } from "@/lib/posts";

export const metadata = { title: "标签" };

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div>
      <div className="mb-8 border-b border-zinc-200 pb-6">
        <h1 className="text-3xl font-semibold tracking-tight">标签</h1>
      </div>

      {tags.length === 0 ? (
        <p className="text-sm text-zinc-500">暂无标签。</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {tags.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="rounded-full bg-zinc-100 px-4 py-1.5 text-sm text-zinc-700 hover:bg-zinc-200"
            >
              {tag}
              <span className="ml-1.5 text-xs text-zinc-400">{count}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
