/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Fix for the startsWith error - ensure we're not using undefined paths
  basePath: '',
  assetPrefix: '',
  trailingSlash: true,
}

export default nextConfig
