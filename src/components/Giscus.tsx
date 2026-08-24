"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/site";

export default function Giscus() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { repo, repoId, category, categoryId } = siteConfig.giscus;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !repoId || !categoryId) return;
    if (container.querySelector("iframe")) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", repo);
    script.setAttribute("data-repo-id", repoId);
    script.setAttribute("data-category", category);
    script.setAttribute("data-category-id", categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "light");
    script.setAttribute("data-lang", "zh-CN");
    script.setAttribute("data-loading", "lazy");
    container.appendChild(script);
  }, [repo, repoId, category, categoryId]);

  return (
    <div className="mt-12 border-t border-zinc-200 pt-8">
      <h2 className="mb-4 text-lg font-semibold">评论</h2>
      <div ref={containerRef}>
        {(!repoId || !categoryId) && (
          <p className="text-sm text-zinc-500">
            评论功能尚未配置：请在 GitHub 仓库开启 Discussions 后，到{" "}
            <a
              href="https://giscus.app/zh-CN"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              giscus.app
            </a>{" "}
            生成 repoId 与 categoryId，填入 src/lib/site.ts。
          </p>
        )}
      </div>
    </div>
  );
}
