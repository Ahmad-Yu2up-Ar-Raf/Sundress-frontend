import type { NextConfig } from "next";
import withPlaiceholder from "@plaiceholder/next";

const config: NextConfig = {
  
  experimental: {
    turbo: {
      rules: {
        
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.ts',
        },
     
      },

      resolveExtensions: [
        '.mdx',
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
        '.mjs',
        '.json',
      ],
    },
  },
  images: {
 qualities: [25, 50, 75, 100],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
     remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.chicagofriedchicken.co.id',
      },
  
    ],
  },
  poweredByHeader: false,
  compress: true,
};

export default withPlaiceholder(config);