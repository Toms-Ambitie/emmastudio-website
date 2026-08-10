import { MODULE_STATUS } from '@/data/modules';
import { IconCheck } from './icons';

/* ── EMMA-KOLOM IN DE VERGELIJKINGSTABEL ────────────────────────────────────
   Eén plek, want de tabel staat twee keer op de site (homepage en /vergelijk)
   en die twee liepen anders uit elkaar.

   Wat dit oplost: de Emma-kolom zette een vinkje bij elke rij, ongeacht of de
   module bestond. "Marketing & ads" kreeg er dus ook een, terwijl EmmaPromoot
   en EmmaSchrijft geen scherm en geen tabel hebben. In een vergelijkingstabel
   baseert iemand zijn keuze op precies dat vinkje.

   Nu leest hij MODULE_STATUS, dezelfde bron die de modulepagina's gebruiken.
   Gaat EmmaPromoot live, dan wordt dit vinkje vanzelf groen; niemand hoeft
   eraan te denken. */

export function emmaHeeftDit(modules: readonly string[]): boolean {
  /* Lege lijst: een eigenschap van het platform, geen module. Altijd waar.

     Een onbekende module-id valt hier op false, niet op true. Dat is met
     opzet: een typefout in een rij hoort een "Binnenkort" op te leveren en
     geen vinkje dat te veel belooft. */
  return modules.every(id => MODULE_STATUS[id]?.live === true);
}

export function EmmaKolom({ modules, klein = false }: { modules: readonly string[]; klein?: boolean }) {
  if (emmaHeeftDit(modules)) {
    const maat = klein ? 'h-6 w-6' : 'h-7 w-7';
    return (
      <div className={`flex ${maat} items-center justify-center rounded-full bg-emma-coral`} aria-label="Inbegrepen bij Emma">
        <IconCheck size={klein ? 14 : 16} className="text-white" />
      </div>
    );
  }
  return (
    <span className="rounded-emma-pill bg-emma-line/60 px-2.5 py-1 text-xs font-medium text-emma-ink-2" aria-label="Nog niet beschikbaar bij Emma">
      Binnenkort
    </span>
  );
}
