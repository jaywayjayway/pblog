import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: `${siteConfig.basePath}/`,
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
