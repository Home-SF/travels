import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',   // static export → Capacitor reads the out/ folder
  images: {
    unoptimized: true, // required for static export (no server to optimize images)
  },
};

export default nextConfig;
