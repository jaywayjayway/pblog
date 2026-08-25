# 电光石火 —— 算力 · 组网 · 存储

个人技术博客，记录 AI 算力、组网与存储相关的笔记。

## 技术栈

- Next.js 16（App Router + TypeScript + Tailwind CSS v4）
- 静态导出（`output: "export"`），部署到 GitHub Pages
- Markdown 内容（`gray-matter` + `react-markdown`）
- 评论：giscus（基于 GitHub Discussions）
- SEO：文章元数据、Open Graph、Sitemap、Robots 和 RSS

## 本地开发

```bash
npm install
npm run dev
```

访问 <http://localhost:3000/pblog>。

生产站点地址和 GitHub Pages 路径统一配置在 `src/lib/site.ts`。仓库名称或域名变化时，只需修改其中的 `url` 和 `basePath`。

## 写文章

每篇文章一个独立目录，文章写在 `content/posts/{slug}/index.md`，图片和文章放在**同一目录**下：

```
content/posts/
  llm-inference-bottleneck/
    index.md       ← 文章正文
    arch.png       ← 该文章的图片
```

`index.md` 的 frontmatter 格式：

```markdown
---
title: "标题"
date: "2026-08-24"
category: "算力"
tags: ["GPU", "LLM"]
description: "摘要"
---

正文内容...
```

- `category`：主分类（一篇一个），归档到 `/categories`
- `tags`：标签（一篇多个），归档到 `/tags`
- `title`、`date`、`category`、`tags`、`description` 均为必填项；构建时会校验格式并给出具体文件错误。

## 插入图片

把图片放进文章目录，在 `index.md` 里用**相对路径**引用即可：

```markdown
![架构图](./arch.png)
```

构建时脚本会把每篇目录里的图片复制到静态资源，无需关心路径前缀。外链图片（`http(s)://` 开头）原样渲染。

## 部署到 GitHub Pages

1. 在 GitHub 创建仓库 `jaywayjayway/pblog`，将本项目推送到 `main` 分支。
2. 仓库 **Settings → Pages**，Source 选 **GitHub Actions**。
3. 推送后 Actions 会自动构建并发布，站点地址为 `https://jaywayjayway.github.io/pblog/`。

站点同时生成：

- Sitemap：`https://jaywayjayway.github.io/pblog/sitemap.xml`
- Robots：`https://jaywayjayway.github.io/pblog/robots.txt`
- RSS：`https://jaywayjayway.github.io/pblog/feed.xml`

### 配置评论（giscus）

1. 仓库 **Settings → General → Features** 开启 **Discussions**。
2. 打开 <https://giscus.app/zh-CN>，填写仓库 `jaywayjayway/pblog`。
3. 按提示生成配置，把 `repoId`、`categoryId`（及 `category`）填入 `src/lib/site.ts` 的 `giscus` 字段。
