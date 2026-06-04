'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ICONS } from '@/data/modules';

const QUIZ: Record<string, { name: string; price: number; pr: string; desc: string; mods: string[] }> = {
  zzp:   { name:"Emma voor ZZP'ers", price:29, pr:'€29', desc:"Lichte hulp, geen software. Boekhouding en marketing op orde, zonder personeelszaken.", mods:['boekt','waakt','vindt','schrijft'] },
  salon: { name:'Emma voor Salons',  price:59, pr:'€59', desc:'Voor een klein team: overzicht, personeel, markt en content op één rustige plek. Onze aanrader.', mods:['boekt','waakt','loont','vindt','coacht','ziet','schrijft'] },
  zorg:  { name:'Emma voor Zorg',    price:39, pr:'€39', desc:'Voor praktijken met medewerkers: financieel én op medewerker-niveau, compliance-proof.', mods:['boekt','waakt','loont','vindt','coacht'] },
};

const COLORS: Record<string, string> = {
  boekt:'--m-boekt', waakt:'--m-waakt', loont:'--m-loont', vindt:'--m-vindt',
  coacht:'--m-coacht', ziet:'--m-ziet', schrijft:'--m-schrijft', promoot:'--m-promoot',
};

function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }

export default function Quiz() {
  const [result, setResult] = useState<string | null>(null);

  const pick = (profile: string) => setResult(profile);
  const reset = () => setResult(null);

  const r = result ? QUIZ[result] : null;

  return (
    <section className="quiz" id="quiz">
      <div className="wrap">
        <div className={`quiz__wrap${result ? ' done' : ''}`}>
          {!result ? (
            <div className="quiz__panel">
              <div className="eyebrow quiz__eyebrow"><span className="tick"></span> Welke Emma past bij jou?</div>
              <h2 className="quiz__q">Hoe ziet jouw onderneming eruit?</h2>
              <p className="quiz__step">Stap 1 van 1 · Kies wat het beste past</p>
              <div className="quiz__opts">
                <button className="quiz__opt" data-profile="zzp" onClick={() => pick('zzp')}>
                  <b>Ik werk solo</b>
                  <span>Eenpitter of ZZP'er zonder vast personeel</span>
                </button>
                <button className="quiz__opt" data-profile="salon" onClick={() => pick('salon')}>
                  <b>Ik heb een salon of studio</b>
                  <span>Klein team, dienstverlening, klantcontact</span>
                </button>
                <button className="quiz__opt" data-profile="zorg" onClick={() => pick('zorg')}>
                  <b>Ik heb een zorgpraktijk</b>
                  <span>Behandelaars, CAO, compliance</span>
                </button>
                <button className="quiz__opt" data-profile="salon" onClick={() => pick('salon')}>
                  <b>Iets anders</b>
                  <span>Klein team, mix van diensten</span>
                </button>
              </div>
            </div>
          ) : r ? (
            <div className="quiz__result">
              <div className="quiz__rlabel">Jouw aanbeveling</div>
              <div className="quiz__rname">
                {r.name} <span className="pr">· {r.pr}/mnd</span>
              </div>
              <p className="quiz__rdesc">{r.desc}</p>
              <div className="quiz__rmods">
                {r.mods.map(m => (
                  <span key={m} className="quiz__rmod" style={{ ['--qc' as string]: `var(${COLORS[m]})` }}>
                    <i></i>Emma{cap(m)}
                  </span>
                ))}
              </div>
              <div className="quiz__ractions">
                <Link className="btn btn-creme" href="/#packs">Bekijk dit pakket <span className="arr">→</span></Link>
                <button className="quiz__restart" onClick={reset}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width:16,height:16 }}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                  Opnieuw
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
