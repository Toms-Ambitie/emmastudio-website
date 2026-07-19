import { MODULE_STATUS } from '@/data/modules';

/**
 * Prominente statusbadge rechtsboven op een module-kaart. Puur een tweede
 * weergave van dezelfde bron als elders: MODULE_STATUS[id].live. Geen eigen
 * status-logica. Groen "Live" (beschikbaar), neutraal grijs "Binnenkort".
 *
 * Beide varianten delen exact dezelfde box (padding, line-height, stip) zodat
 * ze even hoog zijn; alleen de kleuren verschillen.
 */
export default function StatusBadge({ id, className = '' }: { id: string; className?: string }) {
  const live = MODULE_STATUS[id]?.live;
  const base =
    'inline-flex shrink-0 items-center gap-1.5 rounded-emma-pill px-2 py-0.5 text-[11px] font-semibold leading-4';
  return (
    <span className={`${base} ${live ? 'bg-emma-success text-white' : 'bg-emma-line text-emma-subtext'} ${className}`}>
      <span
        className={`h-1.5 w-1.5 rounded-full ${live ? 'bg-white/90' : 'bg-emma-subtext'}`}
        aria-hidden="true"
      />
      {live ? 'Live' : 'Binnenkort'}
    </span>
  );
}
