import type { NextConfig } from 'next';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

// Permite usar los bindings de Cloudflare (D1, variables) también con `next dev`.
initOpenNextCloudflareForDev();

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    // Imágenes propias ya optimizadas en WebP por scripts/imagenes.mjs (sin servicio de imágenes en la nube).
    loader: 'custom',
    loaderFile: './src/imagenes/loader.ts',
    deviceSizes: [640, 960, 1280, 1600],
    imageSizes: [40, 80, 160, 320, 480],
    formats: ['image/webp'],
  },
};

export default config;
