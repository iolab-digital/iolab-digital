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
        hostname: "iolab.nyc3.cdn.digitaloceanspaces.com",
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
        destination: "/blog/best-restaurant-email-marketing-service",
        permanent: true,
      },
      {
        source: "/automated-email-marketing-tools",
        destination: "/blog/automated-email-marketing-tools",
        permanent: true,
      },
      {
        source: "/how-much-does-restaurant-and-hotel-email-marketing-cost",
        destination: "/blog/restaurant-hotel-email-marketing-cost",
        permanent: true,
      },
      {
        source: "/top-social-media-management-tools",
        destination: "/blog/top-social-media-management-tools",
        permanent: true,
      },
      {
        source: "/essential-social-media-management-tools-for-startup-success",
        destination: "/blog/social-media-tools-for-startups",
        permanent: true,
      },
      {
        source: "/cost-effective-social-media-scheduling-tools-for-small-businesses",
        destination: "/blog/social-media-scheduling-tools",
        permanent: true,
      },
      {
        source: "/comparing-multi-platform-management-tools-for-small-business-efficiency",
        destination: "/blog/multi-platform-management-tools",
        permanent: true,
      },
      // Legacy WordPress URLs — batch 2
      {
        source: "/free-digital-kickstart",
        destination: "/",
        permanent: true,
      },
      {
        source: "/free-digital-kickstart/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/restaurant-email-marketing-ideas",
        destination: "/blog/restaurant-email-marketing-ideas",
        permanent: true,
      },
      {
        source: "/restaurant-email-marketing-ideas/",
        destination: "/blog/restaurant-email-marketing-ideas",
        permanent: true,
      },
      {
        source: "/category/social-media-marketing",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/category/social-media-marketing/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/category/:slug",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/leveraging-ai-to-elevate-seo-for-small-businesses-emerging-trends",
        destination: "/blog/leveraging-ai-to-elevate-seo-for-small-businesses-emerging-trends",
        permanent: true,
      },
      {
        source: "/leveraging-ai-to-elevate-seo-for-small-businesses-emerging-trends/",
        destination: "/blog/leveraging-ai-to-elevate-seo-for-small-businesses-emerging-trends",
        permanent: true,
      },
      {
        source: "/brat-girl-marketing-and-gen-z-marketing-trends",
        destination: "/blog/brat-girl-marketing-and-gen-z-marketing-trends",
        permanent: true,
      },
      {
        source: "/brat-girl-marketing-and-gen-z-marketing-trends/",
        destination: "/blog/brat-girl-marketing-and-gen-z-marketing-trends",
        permanent: true,
      },
      {
        source: "/how-ai-for-small-businesses-elevates-digital-marketing",
        destination: "/blog/how-ai-for-small-businesses-elevates-digital-marketing",
        permanent: true,
      },
      {
        source: "/how-ai-for-small-businesses-elevates-digital-marketing/",
        destination: "/blog/how-ai-for-small-businesses-elevates-digital-marketing",
        permanent: true,
      },
      {
        source: "/ai-tools-revolutionize-audience-analysis-in-small-business-sector",
        destination: "/blog/ai-tools-revolutionize-audience-analysis-in-small-business-sector",
        permanent: true,
      },
      {
        source: "/ai-tools-revolutionize-audience-analysis-in-small-business-sector/",
        destination: "/blog/ai-tools-revolutionize-audience-analysis-in-small-business-sector",
        permanent: true,
      },
      // Catch-all WordPress file requests
      {
        source: "/wp-login.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-admin/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-content/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-includes/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/xmlrpc.php",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
