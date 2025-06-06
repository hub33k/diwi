import type { NextConfig } from 'next';
import { env } from './src/env';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `${env.API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
