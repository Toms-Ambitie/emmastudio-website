// Tailwind v4 wordt via PostCSS verwerkt. Next.js detecteert dit bestand
// automatisch; er is geen wijziging in next.config.ts nodig.
// LET OP: dit project importeert Tailwind's theme- en utilities-lagen,
// maar BEWUST NIET preflight (de reset). Zie src/app/globals.css.
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
