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
      // Korte module-URL's uit de businesscase → modulepagina's
      ...['boekt', 'waakt', 'loont', 'vindt', 'coacht', 'ziet', 'schrijft', 'promoot'].map(id => ({
        source: `/${id}`,
        destination: `/modules/${id}`,
        permanent: false,
      })),
      // Taakgerichte URL: doel van de emmaboekt.nl-domeinredirect
      { source: '/boekhouding', destination: '/modules/boekt', permanent: false },
    ];
  },
};

export default nextConfig;
