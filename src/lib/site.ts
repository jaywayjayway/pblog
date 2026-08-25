export const siteConfig = {
  title: "电光石火",
  subtitle: "算力 · 组网 · 存储",
  author: "一页空纸",
  basePath: "/pblog",
  url: "https://jaywayjayway.github.io/pblog",
  description: "关于 AI 算力、组网与存储的技术笔记",
  giscus: {
    repo: "jaywayjayway/pblog",
    repoId: "R_kgDOUC3PMg",
    category: "General",
    categoryId: "DIC_kwDOUC3PMs4DEHbj",
  },
} as const;

export function absoluteUrl(pathname = ""): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${siteConfig.url}${normalized === "/" ? "" : normalized}`;
}
