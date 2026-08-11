import type { NextConfig } from "next";

// De losse Emma-domeinen in TransIP zijn communicatie-URL's, geen zelfstandige sites. Eén merk
// (www.emmastudio.nl); elk moduledomein landt op zijn eigen modulepagina. Het pad gaat bewust niet
// mee: deze domeinen hebben geen eigen inhoud, dus emmaboekt.nl/wat-dan-ook hoort óók op /modules/boekt.
const MODULE_DOMEINEN: Record<string, string> = {
  'emmaboekt.nl': 'boekt',
  'emmawaakt.nl': 'waakt',
  'emmaloont.nl': 'loont',
  'emmavindt.nl': 'vindt',
  'emmavind.nl': 'vindt', // spellingsvariant, zelfde bestemming
  'emmacoacht.nl': 'coacht',
  'emmaziet.nl': 'ziet',
  'emmaschrijft.nl': 'schrijft',
  'emmapromoot.nl': 'promoot',
};

// Domeinen zonder eigen module — die horen op de homepage.
const MERK_DOMEINEN = ['emmastudio.eu', 'emmacorp.nl', 'emmaregelt.nl'];

// `has.value` wordt als regex gelezen en op ^...$ verankerd, dus de punten moeten geëscaped.
// Zonder escape matcht 'emmaboekt.nl' ook 'emmaboektXnl'.
const metOfZonderWww = (domein: string) => `(www\\.)?${domein.replace(/\./g, '\\.')}`;

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
      // Moduledomeinen → de modulepagina. 307 en niet 308: de bestemming is al een keer verschoven
      // (eerst /boekhouding, nu /modules/boekt) en een 308 blijft eeuwig in de browsercache hangen.
      // Zodra de module-URL's vastliggen is `permanent: true` één woord werk.
      ...Object.entries(MODULE_DOMEINEN).map(([domein, module]) => ({
        source: '/:path*',
        has: [{ type: 'host' as const, value: metOfZonderWww(domein) }],
        destination: `https://www.emmastudio.nl/modules/${module}`,
        permanent: false,
      })),
      // Merkdomeinen zonder module → homepage
      ...MERK_DOMEINEN.map(domein => ({
        source: '/:path*',
        has: [{ type: 'host' as const, value: metOfZonderWww(domein) }],
        destination: 'https://www.emmastudio.nl',
        permanent: false,
      })),
      // Korte module-URL's uit de businesscase → modulepagina's
      ...['boekt', 'waakt', 'loont', 'vindt', 'coacht', 'ziet', 'schrijft', 'promoot'].map(id => ({
        source: `/${id}`,
        destination: `/modules/${id}`,
        permanent: false,
      })),
      // Taakgerichte URL, blijft los van de domeinredirect bestaan
      { source: '/boekhouding', destination: '/modules/boekt', permanent: false },
    ];
  },
};

export default nextConfig;
