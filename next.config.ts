import type { NextConfig } from "next";

const configuredApiOrigin = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

if (!configuredApiOrigin && process.env.NODE_ENV === "production") {
  throw new Error("NEXT_PUBLIC_API_URL must be set for production builds");
}

const apiOrigin = configuredApiOrigin || "http://localhost:3000";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.wiscohomebuyer.com",
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
