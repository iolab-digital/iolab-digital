import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iolab.nyc3.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "iolab-digital.nyc3.cdn.digitaloceanspaces.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/hotel-website-design-portfolio",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/marketing-consultant-home/restaurant-photography-videography",
        destination: "/services/web-design",
        permanent: true,
      },
      {
        source: "/lets-chat",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/the-best-restaurant-email-marketing-service",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
