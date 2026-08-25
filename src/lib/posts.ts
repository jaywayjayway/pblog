import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  description: string;
  content: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  description: string;
}

function readPostFile(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ? new Date(data.date).toISOString() : "",
    category: data.category ?? "未分类",
    tags: Array.isArray(data.tags) ? data.tags : [],
    description: data.description ?? "",
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const slugs = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));

  return slugs
    .map((slug) => {
      const post = readPostFile(slug);
      return {
        slug: post.slug,
        title: post.title,
        date: post.date,
        category: post.category,
        tags: post.tags,
        description: post.description,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    return readPostFile(slug);
  } catch {
    return null;
  }
}

export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts();
  const countMap = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.tags) {
      countMap.set(tag, (countMap.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(countMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export function getAllCategories(): { category: string; count: number }[] {
  const posts = getAllPosts();
  const countMap = new Map<string, number>();

  for (const post of posts) {
    countMap.set(post.category, (countMap.get(post.category) ?? 0) + 1);
  }

  return Array.from(countMap.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category));
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter((post) => post.category === category);
}
