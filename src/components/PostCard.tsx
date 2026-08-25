import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="py-6">
      <div className="mb-1 text-sm text-zinc-400">{formatDate(post.date)}</div>
      <Link href={`/posts/${post.slug}`}>
        <h2 className="mb-2 text-xl font-semibold tracking-tight hover:text-zinc-500">
          {post.title}
        </h2>
      </Link>
      {post.description && (
        <p className="mb-3 text-sm leading-6 text-zinc-600">{post.description}</p>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={`/categories/${encodeURIComponent(post.category)}`}
          className="rounded-full bg-zinc-900 px-2.5 py-0.5 text-xs text-white hover:bg-zinc-700"
        >
          {post.category}
        </Link>
        {post.tags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 hover:bg-zinc-200"
          >
            {tag}
          </Link>
        ))}
      </div>
    </article>
  );
}
