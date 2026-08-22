import type { NextConfig } from "next";

const apiOrigin =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "https://tygry8.saikat.com.bd";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "tygry8.saikat.com.bd",
      },
      {
        protocol: "http",
        hostname: "2.24.127.98",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${apiOrigin}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
