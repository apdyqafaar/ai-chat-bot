import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "replicate.delivery",
        pathname: "/**",
      },
         {
        protocol: "https",
        hostname: "ai-chat-bot-xi-two.vercel.app",
        pathname: "/**",
      },
    ]
  }
};

export default nextConfig;
