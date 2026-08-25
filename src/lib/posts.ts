import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content", "posts");

function postError(slug: string, message: string): Error {
  return new Error(`文章 ${slug}/index.md 的 Frontmatter 无效：${message}`);
}

function requiredString(
  slug: string,
  value: unknown,
  field: string,
): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw postError(slug, `${field} 必须是非空字符串`);
  }
  return value.trim();
}

function parseDate(slug: string, value: unknown): string {
  if (typeof value !== "string" && !(value instanceof Date)) {
    throw postError(slug, "date 必须是有效日期");
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw postError(slug, `date 不是有效日期：${String(value)}`);
  }
  return parsed.toISOString();
}

function parseTags(slug: string, value: unknown): string[] {
  if (!Array.isArray(value) || value.some((tag) => typeof tag !== "string" || !tag.trim())) {
    throw postError(slug, "tags 必须是由非空字符串组成的数组");
  }
  return Array.from(new Set(value.map((tag) => tag.trim())));
}

function isSafeSlug(slug: string): boolean {
  return (
    slug.length > 0 &&
    slug === path.basename(slug) &&
    !slug.includes("/") &&
    !slug.includes("\\") &&
    slug !== "." &&
    slug !== ".."
  );
}

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
  if (!isSafeSlug(slug)) {
    throw new Error(`非法文章 slug：${slug}`);
  }

  const fullPath = path.join(postsDirectory, slug, "index.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: requiredString(slug, data.title, "title"),
    date: parseDate(slug, data.date),
    category: requiredString(slug, data.category, "category"),
    tags: parseTags(slug, data.tags),
    description: requiredString(slug, data.description, "description"),
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const slugs = fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) =>
      fs.existsSync(path.join(postsDirectory, entry.name, "index.md")),
    )
    .map((entry) => entry.name);

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
  if (!isSafeSlug(slug)) return null;

  try {
    return readPostFile(slug);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
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
