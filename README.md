# 电光石火 —— 算力 · 组网 · 存储

个人技术博客，记录 AI 算力、组网与存储相关的笔记。

## 技术栈

- Next.js 16（App Router + TypeScript + Tailwind CSS v4）
- 静态导出（`output: "export"`），部署到 GitHub Pages
- Markdown 内容（`gray-matter` + `react-markdown`）
- 评论：giscus（基于 GitHub Discussions）

## 本地开发

```bash
npm install
npm run dev
```

访问 <http://localhost:3000/pblog>。

## 写文章

在 `content/posts/` 下新建 `.md` 文件，frontmatter 格式：

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

## 插入图片

图片放在 `public/images/{slug}/` 目录下（每篇文章独立目录），markdown 里写相对站点根的路径（**不要**带 `/pblog` 前缀，构建时会自动补上）：

```markdown
![架构图](/images/llm-inference-bottleneck/arch.png)
```

外链图片（`http(s)://` 开头）不受影响，原样渲染。

## 部署到 GitHub Pages

1. 在 GitHub 创建仓库 `jaywayjayway/pblog`，将本项目推送到 `main` 分支。
2. 仓库 **Settings → Pages**，Source 选 **GitHub Actions**。
3. 推送后 Actions 会自动构建并发布，站点地址为 `https://jaywayjayway.github.io/pblog/`。

### 配置评论（giscus）

1. 仓库 **Settings → General → Features** 开启 **Discussions**。
2. 打开 <https://giscus.app/zh-CN>，填写仓库 `jaywayjayway/pblog`。
3. 按提示生成配置，把 `repoId`、`categoryId`（及 `category`）填入 `src/lib/site.ts` 的 `giscus` 字段。
