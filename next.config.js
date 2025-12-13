/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Asegurar que las rutas se generen correctamente
  output: undefined, // Dejar que Vercel maneje esto
}

module.exports = nextConfig

