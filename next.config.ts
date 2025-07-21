/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/academic-site',
  assetPrefix: '/academic-site/',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

export default nextConfig
