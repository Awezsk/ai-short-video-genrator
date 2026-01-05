import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Keeps your existing Google Auth images working
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com', // Fixes the error you just saw
      }
    ]
  }
};

export default nextConfig;
