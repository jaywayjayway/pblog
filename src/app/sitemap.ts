import type { MetadataRoute } from "next";
import { getAllCategories, getAllPosts, getAllTags } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const newestPostDate = posts[0]?.date ? new Date(posts[0].date) : new Date();

  return [
    {
      url: absoluteUrl(),
      lastModified: newestPostDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/categories"),
      lastModified: newestPostDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...getAllCategories().map(({ category }) => ({
      url: absoluteUrl(`/categories/${encodeURIComponent(category)}`),
      lastModified: newestPostDate,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    {
      url: absoluteUrl("/tags"),
      lastModified: newestPostDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...getAllTags().map(({ tag }) => ({
      url: absoluteUrl(`/tags/${encodeURIComponent(tag)}`),
      lastModified: newestPostDate,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/posts/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
