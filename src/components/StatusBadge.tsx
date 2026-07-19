import { MODULE_STATUS } from '@/data/modules';

/**
 * Prominente statusbadge rechtsboven op een module-kaart. Puur een tweede,
 * opvallendere weergave van dezelfde bron als de bestaande live/binnenkort-
 * tekst onderin de kaart: MODULE_STATUS[id].live. Geen eigen status-logica.
 * Groen "Live" voor beschikbare modules, neutraal grijs "Binnenkort" voor de
 * rest — consistent met de bestaande kleurcodering (groen = live).
 */
export default function StatusBadge({ id, className = '' }: { id: string; className?: string }) {
  const live = MODULE_STATUS[id]?.live;
  return live ? (
    <span className={`inline-flex shrink-0 items-center gap-1 rounded-emma-pill bg-emma-success px-2 py-0.5 text-[11px] font-semibold text-white ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-white/90" aria-hidden="true" />
      Live
    </span>
  ) : (
    <span className={`inline-flex shrink-0 items-center rounded-emma-pill bg-emma-creme px-2 py-0.5 text-[11px] font-semibold text-emma-subtext ${className}`}>
      Binnenkort
    </span>
  );
}
