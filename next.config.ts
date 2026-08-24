import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/pblog",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
