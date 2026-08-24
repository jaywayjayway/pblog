import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      <div className="mb-8 border-b border-zinc-200 pb-6">
        <h1 className="text-3xl font-semibold tracking-tight">文章</h1>
        <p className="mt-2 text-sm text-zinc-500">
          AI 算力 · 组网 · 存储 技术笔记
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-sm text-zinc-500">暂无文章。</p>
      ) : (
        <div className="divide-y divide-zinc-100">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
