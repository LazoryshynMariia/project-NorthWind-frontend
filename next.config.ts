import type { NextConfig } from 'next';

<<<<<<< HEAD
const nextConfig: NextConfig = {};
=======
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ftp.goit.study',
      },
    ],
  },
};
>>>>>>> origin/main

export default nextConfig;
