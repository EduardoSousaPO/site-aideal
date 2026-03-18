import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aideal.com.br",
      },
      {
        protocol: "http",
        hostname: "aideal.com.br",
      },
      {
        protocol: "https",
        hostname: "www.aideal.com.br",
      },
      {
        protocol: "http",
        hostname: "www.aideal.com.br",
      },
    ],
  },
};

export default nextConfig;
