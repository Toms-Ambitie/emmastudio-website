import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Alles van emmastudio.nl (zonder www) → https://www.emmastudio.nl
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'emmastudio.nl' }],
        destination: 'https://www.emmastudio.nl/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
