import { getAllCategories, getPostsByCategory } from "@/lib/posts";
import PostCard from "@/components/PostCard";

interface PageProps {
  params: Promise<{ name: string }>;
}

export function generateStaticParams() {
  return getAllCategories().map(({ category }) => ({ name: category }));
}

export async function generateMetadata({ params }: PageProps) {
  const { name } = await params;
  return { title: `分类：${name}` };
}

export default async function CategoryPage({ params }: PageProps) {
  const { name } = await params;
  const posts = getPostsByCategory(name);

  return (
    <div>
      <div className="mb-8 border-b border-zinc-200 pb-6">
        <h1 className="text-3xl font-semibold tracking-tight">{name}</h1>
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
