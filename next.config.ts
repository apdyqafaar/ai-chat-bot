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
        hostname: "https://ai-chat-bot-xi-two.vercel.app",   // ← ADD YOUR DEPLOYMENT DOMAIN
        pathname: "/**",
      },
    ]
  }
};

export default nextConfig;
