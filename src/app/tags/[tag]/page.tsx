import { getAllTags, getPostsByTag } from "@/lib/posts";
import { decodeRouteSegment } from "@/lib/routes";
import PostCard from "@/components/PostCard";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({ params }: PageProps) {
  const { tag: routeTag } = await params;
  const tag = decodeRouteSegment(routeTag);
  return { title: `标签：${tag}` };
}

export default async function TagPage({ params }: PageProps) {
  const { tag: routeTag } = await params;
  const tag = decodeRouteSegment(routeTag);
  const posts = getPostsByTag(tag);

  return (
    <div>
      <div className="mb-8 border-b border-zinc-200 pb-6">
        <h1 className="text-3xl font-semibold tracking-tight">#{tag}</h1>
        <p className="mt-2 text-sm text-zinc-500">共 {posts.length} 篇文章</p>
      </div>

      <div className="divide-y divide-zinc-100">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
