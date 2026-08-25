import type { NextConfig } from "next";
import { siteConfig } from "./src/lib/site";

const nextConfig: NextConfig = {
  output: "export",
  basePath: siteConfig.basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
