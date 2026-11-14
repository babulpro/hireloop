import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/seeker",
        permanent: false,
      },
      {
        source: "/seeker",
        destination: "/dashboard/seeker",
        permanent: false,
      },
      {
        source: "/seeker/:path*",
        destination: "/dashboard/seeker/:path*",
        permanent: false,
      },
      {
        source: "/recruiter",
        destination: "/dashboard/recruiter",
        permanent: false,
      },
      {
        source: "/recruiter/:path*",
        destination: "/dashboard/recruiter/:path*",
        permanent: false,
      },
      {
        source: "/admin",
        destination: "/dashboard/admin",
        permanent: false,
      },
      {
        source: "/admin/:path*",
        destination: "/dashboard/admin/:path*",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://hireloop-server-sandy.vercel.app";
    return [
      {
        source: "/api/v1/:path*",
        destination: `${backendUrl}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
