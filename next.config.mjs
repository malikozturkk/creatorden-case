/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // experimental: { optimizeCss: true },
  // purge: ['./src/*/.tsx'],
  // ...(process.env.NODE_ENV === 'production' ? {cssnano: {}}: {})
};

export default nextConfig;
