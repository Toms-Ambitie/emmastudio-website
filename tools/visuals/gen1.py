import os
D="/tmp/claude-0/-home-claude/0092c12a-32ed-5d45-a9d8-93b4c57fa9f8/scratchpad"
OUT=D+"/built"; os.makedirs(OUT,exist_ok=True)

# ---- icons (inline svg inner) ----
I = {
 'home':'<path d="M4 11l8-7 8 7v8.4a1.6 1.6 0 0 1-1.6 1.6H14v-6h-4v6H5.6A1.6 1.6 0 0 1 4 19.4Z"/>',
 'inbox':'<path d="M22 13h-5.5l-2 3h-5l-2-3H2"/><path d="M5.2 5h13.6L22 13v5.4a1.6 1.6 0 0 1-1.6 1.6H3.6A1.6 1.6 0 0 1 2 18.4V13Z"/>',
 'task':'<rect x="4" y="4" width="16" height="16" rx="3.2"/><path d="m8.6 12.2 2.4 2.4 4.8-4.8"/>',
 'euro':'<path d="M17.2 5.6a7.4 7.4 0 1 0 0 12.8"/><path d="M4.8 10.4h8M4.8 13.6h8"/>',
 'wave':'<path d="M3 12.5h3.4l2.3-5.6 3.8 10.2 2.3-5.6H21"/>',
 'file':'<path d="M6.5 3h7.2L18.5 7.8V21h-12Z"/><path d="M13.5 3v5h5"/>',
 'clock':'<circle cx="12" cy="12" r="8.6"/><path d="M12 7.4V12l3.1 2"/>',
 'chat':'<path d="M21 11.6a8.2 8.2 0 0 1-11.9 7.3L3.6 20.4l1.5-5.3A8.2 8.2 0 1 1 21 11.6Z"/>',
 'chart':'<rect x="3.4" y="4.6" width="17.2" height="14.8" rx="2.6"/><path d="M7 15l3.2-3.2 2.4 2.4L17.2 9"/>',
 'eye':'<path d="M12 3l7 2.8v5.2c0 4.4-3 7.5-7 8.8-4-1.3-7-4.4-7-8.8V5.8L12 3Z" fill="none"/><path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.6"/>',
 'search':'<circle cx="10.5" cy="10.5" r="6.4"/><path d="m20 20-4.8-4.8"/>',
 'bell':'<path d="M18 8.4a6 6 0 0 0-12 0c0 6.4-2.6 8-2.6 8h17.2S18 14.8 18 8.4Z"/><path d="M13.6 20a2 2 0 0 1-3.2 0"/>',
 'alert':'<circle cx="12" cy="12" r="8.6"/><path d="M12 7.8v5M12 16.1v.2"/>',
 'trenddown':'<path d="M3 7.5l5.8 5.8 3.8-3.8L20 16.9"/><path d="M14.6 17h6v-6"/>',
 'trendup':'<path d="M3 16.5l5.8-5.8 3.8 3.8L20 7.1"/><path d="M14.6 7h6v6"/>',
 'target':'<circle cx="12" cy="12" r="8.4"/><circle cx="12" cy="12" r="4.4"/><circle cx="12" cy="12" r="1"/>',
 'check':'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
 'pin':'<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
 'users':'<circle cx="9.2" cy="8.4" r="3.3"/><path d="M3.4 19.4a5.8 5.8 0 0 1 11.6 0"/><path d="M16 5.5a3.3 3.3 0 0 1 0 5.9M20.6 19.4a5.8 5.8 0 0 0-3.7-5.2"/>',
 'radar':'<circle cx="12" cy="12" r="8.6"/><path d="M12 12l5-3"/><circle cx="12" cy="12" r="1"/>',
 'send':'<path d="M21 3.5 10.4 14.1"/><path d="M21 3.5 14.2 21l-3.8-6.9L3.5 10.3Z"/>',
}
def svg(name,cls='ico',extra=''):
    return f'<svg class="{cls}" viewBox="0 0 24 24" {extra}>{I[name]}</svg>'

def page(title, body, extra_css=''):
    return f'''<!doctype html><html lang="nl"><head><meta charset="utf-8">
<link rel="stylesheet" href="file://{D}/shell.css"><style>{extra_css}</style></head><body>{body}</body></html>'''

def side(active_group, active_item):
    groups=[('Financiën',['Facturen','Offertes','Openstaande posten','BTW']),
            ('Personeel',['Loon','Contracten','Verlof','Voortgang']),
            ('Groei',['Kandidaten & klanten','Pipeline']),
            ('Marketing',['Campagnes','Advertenties']),
            ('Signalen & Markt',['Signalen','Markt']),
            ('Relaties',['Klanten','Rapportages'])]
    top=f'''<div class="brand">emma<b>.</b></div><nav class="nav">
      <a class="{'on' if active_item=='Overzicht' else ''}">{svg('home')} Overzicht</a>
      <a>{svg('inbox')} Inbox <span class="b">2</span></a>
      <a>{svg('task')} Taken <span class="b">6</span></a>'''
    mid=''
    for g,items in groups:
        if g!=active_group: 
            mid+=f'<div class="grp">{g}</div>'+''.join(f'<a class="sub">{it}</a>' for it in items[:1])
            continue
        mid+=f'<div class="grp">{g}</div>'
        for it in items:
            mid+=f'<a class="sub {"on" if it==active_item else ""}">{it}</a>'
    foot='</nav><div class="foot nav"><a>⚙ Instellingen</a><a>⤶ Uitloggen</a></div>'
    return f'<aside class="side">{top}{mid}{foot}</aside>'

def top():
    return f'''<div class="top"><div class="search">{svg('search','',' ')} Vraag Emma of zoek iets… <span class="k">⌘K</span></div>
    <div class="sp"></div><div class="bell">{svg('bell','',' ')}</div>
    <div class="who"><span class="av">IS</span> Ilze Spannenberg ▾</div></div>'''

def head(color, icon, eyebrow, title, sub, actions=''):
    return f'''<div class="head"><div class="bi" style="background:{color}1a;color:{color}">{svg(icon,'',' ')}</div>
    <div><div class="eyebrow" style="color:{color}">{eyebrow}</div><div class="title">{title}</div>{f'<div class="sub">{sub}</div>' if sub else ''}</div>
    <div class="act">{actions}</div></div>'''

def kpi(color,icon,label,val,note,noteclass=''):
    return f'''<div class="kpi"><div class="l"><span class="ci" style="background:{color}1a;color:{color}">{svg(icon,'',' ')}</span>{label}</div>
    <div class="v">{val}</div><div class="n {noteclass}">{note}</div></div>'''

def wrap(sidebar, body):
    return f'<div class="main">{top()}<div class="body">{body}</div></div>'
def full(sidebar,body): return sidebar+f'<div class="main">{top()}<div class="body">{body}</div></div>'

# ===================== OVERZICHT =====================
sig = lambda ic,col,k,h,p,r: f'''<div class="row"><div class="ri" style="background:{col}1a;color:{col}">{svg(ic,'',' ')}</div>
 <div class="rt"><div class="k" style="color:{col}">{k}</div><div class="h">{h}</div><div class="p">{p}</div></div><div class="rr">{r} ›</div></div>'''
ov_body = head('#EB5C43','home','','Goedemiddag, Ilze','Dit is je overzicht van vandaag.') + f'''
<div class="kpis">
 {kpi('#16B79C','euro','Omzet · deze maand','€ 24.680','+12% t.o.v. vorige maand','up')}
 {kpi('#16B79C','wave','Cashflow','€ 8.430','Positief','up')}
 {kpi('#9A6512','file','Openstaande facturen','€ 6.240','3 facturen · 1 te laat','warn')}
 {kpi('#EB5C43','task','Taken','12','6 openstaand vandaag')}
</div>
<div class="grid2">
 <div class="card"><div class="ch">{svg('chat','',' ')} Wat Emma ziet</div>
  {sig('clock','#A83C26','Let op','Eén factuur staat 43 dagen open','Studio Vorm · € 3.450. Deze klant betaalde de vorige twee facturen ook te laat.','Openstaand')}
  {sig('trenddown','#9A6512','Aandacht','Je omzet loopt 8% achter op je maanddoel','€ 24.680 van € 26.800 — nog 9 dagen te gaan deze maand.','Rapportage')}
  {sig('check','#1F6E47','Klaar','Je BTW-overzicht is voorbereid','Alles staat klaar om te controleren voor de aangifte.','Bekijk')}
 </div>
 <div class="card" style="background:var(--petrol);color:var(--creme);border-color:var(--petrol)">
  <div class="ch" style="color:var(--creme)">{svg('chat','',' ')} Vraag Emma</div>
  <div style="padding:0 18px 4px;font-size:14px;line-height:1.5;color:#DCE7E3">Stel een vraag over je cijfers, klanten of facturen. Emma antwoordt met je eigen data.</div>
  <div style="padding:14px 18px;display:flex;flex-direction:column;gap:9px">
   <div style="background:rgba(255,255,255,.08);border-radius:11px;padding:11px 14px;font-size:14px">Wie heeft nog niet betaald? →</div>
   <div style="background:rgba(255,255,255,.08);border-radius:11px;padding:11px 14px;font-size:14px">Hoe staat mijn cashflow ervoor? →</div>
   <div style="background:rgba(255,255,255,.08);border-radius:11px;padding:11px 14px;font-size:14px">Maak een factuur voor De Creatieven →</div>
  </div>
 </div>
</div>'''
open(OUT+"/overzicht.html","w").write(page("Overzicht", full(side('','Overzicht'), ov_body)))

# ===================== BOEKT =====================
def frow(nr,kl,d,v,bed,st,stcls,red=False):
    vd=f'<span class="red">{v}</span>' if red else v
    return f'<tr><td>{nr}</td><td class="klant">{kl}</td><td>{d}</td><td>{vd}</td><td class="num">{bed}</td><td><span class="pill {stcls}">{st}</span></td></tr>'
bk_body = head('#16B79C','file','Financiën','Facturen','', 
    '<button class="btn">Verstuur herinnering</button><button class="btn primary">+ Nieuwe factuur</button>') + f'''
<div class="kpis">
 {kpi('#9A6512','file','Openstaand','€ 6.240','3 facturen','warn')}
 {kpi('#1F6E47','check','Betaald','€ 48.230','28 facturen','up')}
 {kpi('#6E655C','file','Concept','€ 1.640','1 factuur')}
 {kpi('#A83C26','alert','Te laat','€ 3.450','1 factuur','')}
</div>
<div class="card"><div class="tabs"><span class="tab on">Alle</span><span class="tab">Openstaand</span><span class="tab">Betaald</span><span class="tab">Concept</span><span class="tab">Te laat</span></div>
<table><thead><tr><th>Factuurnummer</th><th>Klant</th><th>Datum</th><th>Vervaldatum</th><th class="num">Bedrag</th><th>Status</th></tr></thead><tbody>
{frow('2024-045','Studio Vorm','23-04-2024','23-04-2024','€ 3.450,00','Te laat','laat',True)}
{frow('2024-044','Bright Minds','18-04-2024','18-05-2024','€ 1.250,00','Openstaand','open')}
{frow('2024-043','De Creatieven','15-04-2024','15-05-2024','€ 2.950,00','Openstaand','open')}
{frow('2024-042','Weekend Studio','10-04-2024','10-05-2024','€ 1.880,00','Openstaand','open')}
{frow('2024-041','Klant & Co','05-04-2024','05-05-2024','€ 2.750,00','Betaald','betaald')}
{frow('2024-040','Noord Media','02-04-2024','02-05-2024','€ 4.120,00','Betaald','betaald')}
</tbody></table></div>'''
open(OUT+"/boekt.html","w").write(page("EmmaBoekt", full(side('Financiën','Facturen'), bk_body)))

# ===================== WAAKT =====================
wk_body = head('#FFB23E','chart','Relaties · rapportages','Signalen & advies','Je doelen, prognose en wekelijks advies op één plek.',
    '<button class="btn">Exporteren</button>') + f'''
<div class="kpis">
 {kpi('#9A6512','euro','Omzet t.o.v. doel','89%','€ 24.680 van € 27.700','warn')}
 {kpi('#1F6E47','wave','Cashflow','€ 8.430','Positief','up')}
 {kpi('#1F5E91','trendup','Prognose kwartaal','€ 82.400','Op basis van je historie','')}
 {kpi('#16B79C','target','Marge','29%','Stabiel t.o.v. vorig kwartaal','up')}
</div>
<div class="grid2">
 <div class="card"><div class="ch">{svg('chart','',' ')} Omzet & prognose per maand</div>
  <div style="display:flex;align-items:flex-end;gap:16px;height:220px;padding:18px 22px 22px">
   {''.join(f'<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:8px"><div style="width:100%;display:flex;align-items:flex-end;gap:5px;height:150px"><i style="flex:1;background:#EB5C43;border-radius:6px 6px 0 0;height:{h}%"></i><i style="flex:1;background:#0E3D37;border-radius:6px 6px 0 0;height:{h2}%"></i></div><span style="font-size:12px;color:var(--subtext)">{m}</span></div>' for m,h,h2 in [('Jan',52,60),('Feb',64,55),('Mrt',78,70),('Apr',60,66),('Mei',88,80),('Jun',72,90)])}
  </div>
  <div style="padding:0 22px 16px;font-size:12.5px;color:var(--subtext)"><span style="color:#EB5C43">■</span> Werkelijk &nbsp; <span style="color:#0E3D37">■</span> Prognose</div>
 </div>
 <div class="card"><div class="ch">{svg('chat','',' ')} Advies van deze week</div>
  {sig('alert','#9A6512','Actie','Drie klanten betalen structureel te laat','Stuur EmmaBoekt een herinnering; samen goed voor € 6.240.','Bekijk')}
  {sig('trendup','#1F6E47','Kans','Mei ligt 12% boven vorig jaar','Zet de extra ruimte in op je zomercampagne.','Rapportage')}
  {sig('target','#1F5E91','Doel','Nog € 3.020 tot je maanddoel','Haalbaar met de huidige trend en 9 dagen te gaan.','Bekijk')}
 </div>
</div>'''
open(OUT+"/waakt.html","w").write(page("EmmaWaakt", full(side('Relaties','Rapportages'), wk_body)))

# ===================== ZIET (accuraat: kaart + concurrent-detectie + monitoring) =====================
extra_ziet='''
.mapwrap{position:relative;height:300px;background:linear-gradient(135deg,#EAF1EC,#F1E8DC);overflow:hidden}
.mapwrap .street{position:absolute;background:#fff;opacity:.7}
.dotc{position:absolute;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:3px}
.dotc .m{width:22px;height:22px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 5px rgba(0,0,0,.2)}
.dotc.me .m{background:#EB5C43} .dotc .m{background:#9B6BE0}
.dotc .lbl{font-size:11px;font-weight:600;background:#fff;border:1px solid var(--line);border-radius:6px;padding:1px 6px;white-space:nowrap}
'''
def crow(letter,col,name,plaats,km,tag,tagcls):
    return f'''<div class="row"><div class="ri" style="background:{col}1a;color:{col};font-weight:700;font-family:var(--disp)">{letter}</div>
     <div class="rt"><div class="h">{name}</div><div class="p">{plaats} · {km} km</div></div><div class="rr"><span class="pill {tagcls}">{tag}</span></div></div>'''
zt_body = head('#9B6BE0','eye','Signalen & Markt','Markt','Wie er in jouw straal zit — automatisch via KvK en SBI-codes.',
    '<button class="btn">Radius: 5 km ▾</button><button class="btn primary">Vernieuwen</button>') + f'''
<div class="kpis">
 {kpi('#9B6BE0','radar','Concurrenten in beeld','9','Binnen 5 km van Heeten','')}
 {kpi('#9B6BE0','pin','Automatisch gedetecteerd','via KvK','SBI 96.02 · kappers','')}
 {kpi('#9A6512','alert','Nieuw deze week','1','Emma signaleerde 1 nieuwe zaak','warn')}
 {kpi('#1F6E47','check','Laatste controle','zojuist','Wekelijkse monitoring actief','up')}
</div>
<div class="grid2">
 <div class="card"><div class="ch">{svg('pin','',' ')} Concurrenten op de kaart <span class="lk">Volledig scherm</span></div>
  <div class="mapwrap">
   <div class="street" style="left:0;top:46%;width:100%;height:10px"></div>
   <div class="street" style="left:38%;top:0;width:9px;height:100%"></div>
   <div class="street" style="left:0;top:74%;width:100%;height:7px;transform:rotate(-4deg)"></div>
   <div class="dotc me" style="left:39%;top:50%"><div class="m"></div><div class="lbl" style="border-color:#EB5C43;color:#EB5C43">Jij</div></div>
   <div class="dotc" style="left:20%;top:30%"><div class="m"></div><div class="lbl">Bright Studio</div></div>
   <div class="dotc" style="left:62%;top:38%"><div class="m"></div><div class="lbl">Vorm & Vakwerk</div></div>
   <div class="dotc" style="left:70%;top:68%"><div class="m"></div><div class="lbl">Noord Creatief</div></div>
   <div class="dotc" style="left:28%;top:70%"><div class="m"></div><div class="lbl">De Werkplaats</div></div>
  </div>
 </div>
 <div class="card"><div class="ch">{svg('users','',' ')} In de buurt</div>
  {crow('B','#9B6BE0','Bright Studio','Heeten','1,2','Nieuw','warn')}
  {crow('V','#9B6BE0','Vorm & Vakwerk','Raalte','2,4','Bekend','neut')}
  {crow('N','#9B6BE0','Noord Creatief','Nieuw Heeten','3,1','Bekend','neut')}
  {crow('W','#9B6BE0','De Werkplaats','Heeten','3,6','Bekend','neut')}
  <div style="padding:13px 18px;border-top:1px solid var(--line);font-size:13.5px;color:var(--subtext)">Prijsvergelijking en reviews-analyse — <b style="color:var(--ink)">op de roadmap</b></div>
 </div>
</div>'''
open(OUT+"/ziet.html","w").write(page("EmmaZiet", full(side('Signalen & Markt','Markt'), zt_body), extra_ziet))

print("gebouwd:", ", ".join(sorted(os.listdir(OUT))))
