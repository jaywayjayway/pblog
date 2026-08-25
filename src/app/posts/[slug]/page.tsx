import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
import Giscus from "@/components/Giscus";

function resolveImageSrc(src: string, slug: string): string {
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:")) {
    return src;
  }
  const rel = src.startsWith("/")
    ? src
    : `/images/${slug}/${src.replace(/^\.\//, "")}`;
  return `${siteConfig.basePath}${rel}`;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return { title: post ? post.title : "未找到" };
}

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="py-16 text-center text-zinc-500">
        <p>文章不存在。</p>
        <Link href="/" className="mt-4 inline-block text-sm underline">
          返回首页
        </Link>
      </div>
    );
  }

  const MarkdownImage = ({
    src,
    alt,
  }: {
    src?: string | Blob;
    alt?: string;
  }) => {
    if (typeof src !== "string") return null;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resolveImageSrc(src, slug)}
        alt={alt ?? ""}
        className="my-6 rounded-lg"
      />
    );
  };

  return (
    <article>
      <header className="mb-8 border-b border-zinc-200 pb-6">
        <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
          <time>{formatDate(post.date)}</time>
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
      </header>

      <div className="prose prose-zinc max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{ img: MarkdownImage }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      <Giscus />
    </article>
  );
}
