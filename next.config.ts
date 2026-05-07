import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '3rcore.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '3rcore-server.com.pe',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '**',
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/:locale(es|en)/servicios/web-deveploment',
        destination: '/:locale/servicios/web-development',
        permanent: true,
      },
      {
        source: '/servicios/web-deveploment',
        destination: '/es/servicios/web-development',
        permanent: true,
      },
      {
        source: '/:locale(es|en)/blog',
        destination: '/:locale/blogs',
        permanent: true,
      },
      {
        source: '/:locale(es|en)/blog/:slug*',
        destination: '/:locale/blogs/:slug*',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/es/blogs',
        permanent: true,
      },
      {
        source: '/blog/:slug*',
        destination: '/es/blogs/:slug*',
        permanent: true,
      },
      {
        source: '/:locale(es|en)/contacto',
        destination: '/:locale#contacto',
        permanent: true,
      },
      {
        source: '/contacto',
        destination: '/es#contacto',
        permanent: true,
      },
    ];
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://3rcore.com' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
