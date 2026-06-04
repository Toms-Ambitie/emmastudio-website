'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ICONS } from '@/data/modules';

const RINGS = [
  { d: 54, mods: ['boekt','schrijft','ziet'],  dur: 200000, rev: false, start: -90 },
  { d: 78, mods: ['waakt','vindt','promoot'],  dur: 280000, rev: true,  start: 34 },
  { d: 98, mods: ['loont','coacht'],           dur: 360000, rev: false, start: 205 },
];

function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }

export default function HeroOrbit() {
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orbit = orbitRef.current;
    if (!orbit) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const anims: Animation[] = [];
    RINGS.forEach(ring => {
      const rc = document.createElement('div');
      rc.className = 'orbit__ring';
      rc.style.width = ring.d + '%';
      rc.style.height = ring.d + '%';
      orbit.appendChild(rc);

      const rot = document.createElement('div');
      rot.className = 'orbit__rot';
      orbit.appendChild(rot);

      const r = ring.d / 2;
      ring.mods.forEach((mid, i) => {
        const ang = (ring.start + i * (360 / ring.mods.length)) * Math.PI / 180;
        const x = 50 + r * Math.cos(ang);
        const y = 50 + r * Math.sin(ang);
        const dot = document.createElement('div');
        dot.className = 'orbit__dot';
        dot.style.cssText = `--sz:clamp(40px,9vw,56px); left:${x}%; top:${y}%;`;
        dot.innerHTML = `<div class="orbit__chip" style="--c:var(--m-${mid})"><svg viewBox="0 0 24 24">${ICONS[mid]}</svg></div><span class="orbit__label">Emma${cap(mid)}</span>`;
        rot.appendChild(dot);

        if (!reduce) {
          const chip = dot.querySelector('.orbit__chip') as HTMLElement;
          anims.push(chip.animate(
            [{ transform: `rotate(${ring.rev ? '-' : ''}0deg) scale(1)` }, { transform: `rotate(${ring.rev ? '' : '-'}360deg) scale(1)` }],
            { duration: ring.dur, iterations: Infinity, easing: 'linear' }
          ));
        }
      });

      if (!reduce) {
        anims.push(rot.animate(
          [{ transform: 'rotate(0deg)' }, { transform: `rotate(${ring.rev ? '-' : ''}360deg)` }],
          { duration: ring.dur, iterations: Infinity, easing: 'linear' }
        ));
      }
    });

    orbit.setAttribute('data-spin', '');
    return () => {
      anims.forEach(a => a.cancel());
      orbit.querySelectorAll('.orbit__ring, .orbit__rot').forEach(el => el.remove());
      orbit.removeAttribute('data-spin');
    };
  }, []);

  return (
    <div className="orbit" id="orbit" ref={orbitRef}>
      <div className="orbit__core">
        <div className="orbit__pulse"></div>
        <Image src="/beeldmerk.svg" alt="emma." width={80} height={80} />
      </div>
    </div>
  );
}
