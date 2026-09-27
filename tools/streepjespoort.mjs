// Streepjespoort: huisregel van Tom. Een streepje op de juridische pagina's mag
// alleen een koppelteken zijn. Deze poort draait voor elke build (prebuild) en
// faalt zodra er een em-streepje (U+2014) of en-streepje (U+2013) in een van de
// vijf bestanden hieronder staat. De kennisbasis van de chatbot heeft een eigen
// controle in src/data/kennis/index.ts; die valt hier bewust buiten.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const BESTANDEN = [
  'src/app/verwerkersovereenkomst/page.tsx',
  'src/app/algemene-voorwaarden/page.tsx',
  'src/app/cookiebeleid/page.tsx',
  'src/app/privacy/page.tsx',
  'src/app/veiligheid/page.tsx',
];

const VERBODEN = /[–—]/g;
const NAAM = { '—': 'em-streepje (U+2014)', '–': 'en-streepje (U+2013)' };

const treffers = [];
for (const bestand of BESTANDEN) {
  const regels = readFileSync(path.join(root, bestand), 'utf8').split('\n');
  regels.forEach((regel, i) => {
    for (const m of regel.matchAll(VERBODEN)) {
      treffers.push({ bestand, regel: i + 1, teken: NAAM[m[0]], zin: regel.trim() });
    }
  });
}

if (treffers.length > 0) {
  console.error(`Streepjespoort: ${treffers.length} verboden streepje(s) gevonden. Alleen koppeltekens zijn toegestaan.\n`);
  for (const t of treffers) {
    console.error(`  ${t.bestand}, regel ${t.regel}: ${t.teken}`);
    console.error(`    ${t.zin}\n`);
  }
  console.error('Herschrijf met een komma, dubbele punt of haakjes. Zet er geen gewoon streepje (-) voor in de plaats.');
  process.exit(1);
}

console.log(`Streepjespoort: ${BESTANDEN.length} bestanden gekeurd, geen em- of en-streepjes gevonden.`);
