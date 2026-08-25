import { getAllPosts } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value.replace(/[<>&'\"]/g, (character) => {
    const entities: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&apos;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

export function GET() {
  const posts = getAllPosts();
  const feedUrl = absoluteUrl("/feed.xml");
  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/posts/${post.slug}`);
      return [
        "<item>",
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${escapeXml(url)}</link>`,
        `<guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `<pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        `<description>${escapeXml(post.description)}</description>`,
        `<category>${escapeXml(post.category)}</category>`,
        ...post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`),
        "</item>",
      ].join("");
    })
    .join("");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "<channel>",
    `<title>${escapeXml(siteConfig.title)}</title>`,
    `<link>${escapeXml(siteConfig.url)}</link>`,
    `<description>${escapeXml(siteConfig.description)}</description>`,
    '<language>zh-CN</language>',
    `<atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml"/>`,
    items,
    "</channel>",
    "</rss>",
  ].join("");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
