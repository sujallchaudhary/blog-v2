/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hajiriresource.blob.core.windows.net',

      },
    ],
  },
};

module.exports = nextConfig;