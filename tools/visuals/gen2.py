import os
D="/tmp/claude-0/-home-claude/0092c12a-32ed-5d45-a9d8-93b4c57fa9f8/scratchpad"
OUT=D+"/built"; os.makedirs(OUT,exist_ok=True)
I = {
 'home':'<path d="M4 11l8-7 8 7v8.4a1.6 1.6 0 0 1-1.6 1.6H14v-6h-4v6H5.6A1.6 1.6 0 0 1 4 19.4Z"/>',
 'inbox':'<path d="M22 13h-5.5l-2 3h-5l-2-3H2"/><path d="M5.2 5h13.6L22 13v5.4a1.6 1.6 0 0 1-1.6 1.6H3.6A1.6 1.6 0 0 1 2 18.4V13Z"/>',
 'task':'<rect x="4" y="4" width="16" height="16" rx="3.2"/><path d="m8.6 12.2 2.4 2.4 4.8-4.8"/>',
 'euro':'<path d="M17.2 5.6a7.4 7.4 0 1 0 0 12.8"/><path d="M4.8 10.4h8M4.8 13.6h8"/>',
 'search':'<circle cx="10.5" cy="10.5" r="6.4"/><path d="m20 20-4.8-4.8"/>',
 'bell':'<path d="M18 8.4a6 6 0 0 0-12 0c0 6.4-2.6 8-2.6 8h17.2S18 14.8 18 8.4Z"/><path d="M13.6 20a2 2 0 0 1-3.2 0"/>',
 'users':'<circle cx="9.2" cy="8.4" r="3.3"/><path d="M3.4 19.4a5.8 5.8 0 0 1 11.6 0"/><path d="M16 5.5a3.3 3.3 0 0 1 0 5.9M20.6 19.4a5.8 5.8 0 0 0-3.7-5.2"/>',
 'user':'<circle cx="12" cy="8.2" r="3.4"/><path d="M5.6 20a6.4 6.4 0 0 1 12.8 0"/>',
 'calendar':'<rect x="3.6" y="5" width="16.8" height="15" rx="2.4"/><path d="M3.6 9.4h16.8M8 3v3.2M16 3v3.2"/>',
 'doc':'<path d="M6.5 3h7.2L18.5 7.8V21h-12Z"/><path d="M13.5 3v5h5"/>',
 'target':'<circle cx="12" cy="12" r="8.4"/><circle cx="12" cy="12" r="4.4"/><circle cx="12" cy="12" r="1"/>',
 'check':'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
 'pen':'<path d="M12.5 19.5H21"/><path d="M16.6 4.4a2.05 2.05 0 0 1 2.9 2.9L7.8 19 3.5 20.5 5 16.2Z"/>',
 'mega':'<path d="m4 10 14-5.5v15L4 14Z"/><path d="M8 14v2.8a2 2 0 0 0 4 0v-1.4"/><path d="M19 9.2a3 3 0 0 1 0 5.6"/>',
 'chart':'<rect x="3.4" y="4.6" width="17.2" height="14.8" rx="2.6"/><path d="M7 15l3.2-3.2 2.4 2.4L17.2 9"/>',
 'chat':'<path d="M21 11.6a8.2 8.2 0 0 1-11.9 7.3L3.6 20.4l1.5-5.3A8.2 8.2 0 1 1 21 11.6Z"/>',
 'search2':'<circle cx="10.5" cy="10.5" r="6.4"/><path d="m20 20-4.8-4.8"/>',
 'clock':'<circle cx="12" cy="12" r="8.6"/><path d="M12 7.4V12l3.1 2"/>',
 'trendup':'<path d="M3 16.5l5.8-5.8 3.8 3.8L20 7.1"/><path d="M14.6 7h6v6"/>',
 'link':'<path d="M10 14.2a4.2 4.2 0 0 0 6.2.4l2.8-2.8a4.2 4.2 0 0 0-5.9-5.9l-1.3 1.3"/><path d="M14 9.8a4.2 4.2 0 0 0-6.2-.4L5 12.2a4.2 4.2 0 0 0 5.9 5.9l1.3-1.3"/>',
 'bulb':'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2H14.5c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3Z"/>',
}
def svg(name,cls='ico'):
    return f'<svg class="{cls}" viewBox="0 0 24 24">{I[name]}</svg>'
def page(title, body, extra=''):
    return f'''<!doctype html><html lang="nl"><head><meta charset="utf-8"><link rel="stylesheet" href="file://{D}/shell.css"><style>{extra}</style></head><body>{body}</body></html>'''
def side(active_group, active_item):
    groups=[('Financiën',['Facturen','Offertes','Openstaande posten','BTW']),
            ('Personeel',['Loon','Contracten','Verlof','Voortgang']),
            ('Groei',['Kandidaten & klanten','Pipeline']),
            ('Marketing',['Content','Advertenties']),
            ('Signalen & Markt',['Signalen','Markt']),
            ('Relaties',['Klanten','Rapportages'])]
    top=f'''<div class="brand">emma<b>.</b></div><nav class="nav">
      <a class="{'on' if active_item=='Overzicht' else ''}">{svg('home')} Overzicht</a>
      <a>{svg('inbox')} Inbox <span class="b">2</span></a>
      <a>{svg('task')} Taken <span class="b">6</span></a>'''
    mid=''
    for g,items in groups:
        if g!=active_group:
            mid+=f'<div class="grp">{g}</div>'+''.join(f'<a class="sub">{it}</a>' for it in items[:1]); continue
        mid+=f'<div class="grp">{g}</div>'+''.join(f'<a class="sub {"on" if it==active_item else ""}">{it}</a>' for it in items)
    return f'<aside class="side">{top}{mid}</nav><div class="foot nav"><a>⚙ Instellingen</a><a>⤶ Uitloggen</a></div></aside>'
def top():
    return f'''<div class="top"><div class="search">{svg('search','')} Vraag Emma of zoek iets… <span class="k">⌘K</span></div>
    <div class="sp"></div><div class="bell">{svg('bell','')}</div><div class="who"><span class="av">IS</span> Ilze Spannenberg ▾</div></div>'''
def head(color, icon, eyebrow, title, sub, actions=''):
    return f'''<div class="head"><div class="bi" style="background:{color}1a;color:{color}">{svg(icon,'')}</div>
    <div><div class="eyebrow" style="color:{color}">{eyebrow}</div><div class="title">{title}</div>{f'<div class="sub">{sub}</div>' if sub else ''}</div><div class="act">{actions}</div></div>'''
def kpi(color,icon,label,val,note,nc=''):
    return f'''<div class="kpi"><div class="l"><span class="ci" style="background:{color}1a;color:{color}">{svg(icon,'')}</span>{label}</div><div class="v">{val}</div><div class="n {nc}">{note}</div></div>'''
def full(sb,body,): return sb+f'<div class="main">{top()}<div class="body">{body}</div></div>'

# ---------- LOONT ----------
C='#4D6BF5'
def lrow(l,v,neg=False,bold=False):
    st='color:var(--error)' if neg else ''
    b='font-weight:700' if bold else ''
    return f'<div style="display:flex;justify-content:space-between;padding:11px 0;border-top:1px solid var(--line);font-size:14.5px;{b}"><span>{l}</span><span style="{st};font-variant-numeric:tabular-nums">{v}</span></div>'
lo=head(C,'euro','Personeel','Loon','Salarisadministratie met de CAO van je branche al ingebouwd.',
   '<button class="btn">Opslaan</button><button class="btn primary">Loonstrook ⭳</button>')+f'''
<div class="grid2" style="grid-template-columns:1fr 1.1fr">
 <div class="card"><div class="ch">Gegevens</div>
  <div style="padding:4px 18px 18px">
   {''.join(f'<div style="margin-top:14px"><div style="font-family:var(--mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--subtext);margin-bottom:6px">{lab}</div><div style="border:1px solid var(--line);border-radius:11px;padding:12px 14px;font-size:14.5px;display:flex;justify-content:space-between">{val}<span class="muted">▾</span></div></div>' for lab,val in [('Functie','Kapper'),('Salaristrede','Trede 3'),('Uren per week','32'),('Contracttype','Vast (onbepaalde tijd)')])}
   <div style="margin-top:16px;background:#4D6BF510;border-radius:11px;padding:13px 15px;font-size:13.5px;color:var(--ink-2)">Emma rekent met de actuele CAO-loontabel en houdt heffingskortingen en premies automatisch bij.</div>
  </div>
 </div>
 <div class="card"><div class="ch">Loonstrook · mei 2025 <span class="lk" style="color:{C}">Schaal 3, trede 3</span></div>
  <div style="padding:2px 18px 8px">
   <div style="display:flex;gap:12px;margin:8px 0 4px">
    <div style="flex:1;background:var(--creme);border-radius:11px;padding:12px 14px"><div class="muted" style="font-size:12px">Bruto</div><div style="font-family:var(--disp);font-weight:800;font-size:20px">€ 2.180</div></div>
    <div style="flex:1;background:var(--success-soft);border-radius:11px;padding:12px 14px"><div style="font-size:12px;color:var(--success)">Netto</div><div style="font-family:var(--disp);font-weight:800;font-size:20px;color:var(--success)">€ 1.842</div></div>
    <div style="flex:1;background:var(--coral-soft);border-radius:11px;padding:12px 14px"><div style="font-size:12px;color:var(--coral-strong)">WG-kosten</div><div style="font-family:var(--disp);font-weight:800;font-size:20px;color:var(--coral-strong)">€ 2.760</div></div>
   </div>
   {lrow('Brutoloon','€ 2.180,00')}{lrow('Pensioenpremie werknemer','− € 141,70',True)}{lrow('Loonheffing','− € 148,90',True)}{lrow('Arbeidskorting','+ € 372,00')}
   <div style="margin-top:8px">{lrow('Geschat netto maandloon','€ 1.842,00',False,True)}</div>
  </div>
 </div>
</div>'''
open(OUT+"/loont.html","w").write(page("EmmaLoont",full(side('Personeel','Loon'),lo)))

# ---------- VINDT ----------
C='#EB5C43'
def krow(letter,name,plaats,score,scol,oms,stap):
    return f'''<tr><td><div style="display:flex;align-items:center;gap:10px"><span style="width:30px;height:30px;border-radius:8px;background:{C}1a;color:{C};font-weight:700;font-family:var(--disp);display:inline-flex;align-items:center;justify-content:center">{letter}</span><div><div class="klant">{name}</div><div class="muted" style="font-size:12.5px">{plaats}</div></div></div></td>
    <td><span style="background:{scol}1a;color:{scol};font-weight:700;border-radius:8px;padding:3px 10px">{score}</span></td><td class="num">{oms}</td><td>{stap} ›</td></tr>'''
vi=head(C,'search2','Groei','Kandidaten & klanten','Ontdek wie bij je past — in jouw buurt, met een nette pipeline.',
   '<button class="btn">Modus: Klanten ▾</button><button class="btn primary">+ Nieuwe zoekopdracht</button>')+f'''
<div class="kpis">
 {kpi(C,'search2','Prospects','258','+18 deze week','up')}
 {kpi(C,'target','Kansen','34','€ 128.500 potentiële omzet')}
 {kpi(C,'link','Nabijgelegen','46','Binnen 25 km van Heeten')}
 {kpi('#9A6512','clock','Opvolging nodig','12','Taken deze week','warn')}
</div>
<div class="card"><div class="ch">Klantkansen <span class="lk" style="color:{C}">Bekijk alle</span></div>
 <table><thead><tr><th>Bedrijf</th><th>Score</th><th class="num">Potentiële omzet</th><th>Volgende stap</th></tr></thead><tbody>
 {krow('B','Bakkerij De Vries','Raalte','92','#1F6E47','€ 18.400','Voorstel sturen')}
 {krow('S','Studio Groen','Heeten','81','#1F6E47','€ 12.750','Gesprek plannen')}
 {krow('V','Van Dijk Installaties','Nieuw Heeten','74','#9A6512','€ 9.600','Offerte opvolgen')}
 {krow('L','Lunchroom Het Station','Raalte','68','#9A6512','€ 7.250','Contact opnemen')}
 {krow('K','Kapsalon Moda','Heeten','61','#9A6512','€ 6.100','Informatie sturen')}
 </tbody></table></div>'''
open(OUT+"/vindt.html","w").write(page("EmmaVindt",full(side('Groei','Kandidaten & klanten'),vi)))

# ---------- COACHT ----------
C='#FF7FA3'
def prow(init,name,rol,doel,pct,pcol,datum):
    return f'''<tr><td><div style="display:flex;align-items:center;gap:10px"><span style="width:30px;height:30px;border-radius:50%;background:{C}22;color:#c14e73;font-weight:700;font-size:12px;display:inline-flex;align-items:center;justify-content:center">{init}</span><div><div class="klant">{name}</div><div class="muted" style="font-size:12.5px">{rol}</div></div></div></td>
    <td>{doel}</td><td style="min-width:130px"><div style="display:flex;align-items:center;gap:8px"><div class="bar" style="flex:1"><i style="width:{pct}%;background:{pcol}"></i></div><span style="font-size:13px;font-weight:600;color:{pcol}">{pct}%</span></div></td><td class="muted">{datum}</td></tr>'''
co=head(C,'user','Personeel','Voortgang & coaching','Scorecards, gesprekken en doelen per persoon.',
   '<button class="btn">Team: Blondes Incognito ▾</button>')+f'''
<div class="kpis">
 {kpi(C,'target','Teamdoelen','71%','5 van 7 op schema','up')}
 {kpi(C,'chat','1-op-1 momenten','4','2 gepland deze week')}
 {kpi('#9A6512','bulb','Aandachtspunten','3','1 nieuw sinds vorige week','warn')}
 {kpi('#1F6E47','trendup','Teamtevredenheid','7,8','+0,4 t.o.v. vorige maand','up')}
</div>
<div class="grid2"><div class="card"><div class="ch">Voortgang per medewerker</div>
 <table><thead><tr><th>Medewerker</th><th>Ontwikkeldoel</th><th>Voortgang</th><th>Check-in</th></tr></thead><tbody>
 {prow('EV','Eva de Wit','Senior kapper','Kleurtechniek verdiepen','78','#1F6E47','14 mei')}
 {prow('LK','Lotte Kramer','Kapper','Klantbinding vergroten','62','#9A6512','12 mei')}
 {prow('SB','Sanne Bos','Assistent','Zelfstandig behandelen','45','#A83C26','9 mei')}
 {prow('TJ','Tess Jansen','Kapper','Productverkoop','70','#1F6E47','13 mei')}
 </tbody></table></div>
 <div class="card"><div class="ch">Voorgestelde acties</div>
  <div class="row"><div class="ri" style="background:{C}1a;color:#c14e73">{svg('chat','')}</div><div class="rt"><div class="h">Plan 1-op-1 met Sanne</div><div class="p">Voortgang loopt achter — begeleiding gewenst.</div></div><div class="rr">Plan ›</div></div>
  <div class="row"><div class="ri" style="background:{C}1a;color:#c14e73">{svg('bulb','')}</div><div class="rt"><div class="h">Vraag naar productverkoop bij Tess</div><div class="p">Op basis van de cijfers uit EmmaWaakt.</div></div><div class="rr">Bekijk ›</div></div>
  <div class="row"><div class="ri" style="background:{C}1a;color:#c14e73">{svg('target','')}</div><div class="rt"><div class="h">Teamdoel: klanttevredenheid 8,0</div><div class="p">Nog 0,2 te gaan met de huidige trend.</div></div><div class="rr">Bekijk ›</div></div>
 </div>
</div>'''
open(OUT+"/coacht.html","w").write(page("EmmaCoacht",full(side('Personeel','Voortgang'),co)))

# ---------- SCHRIJFT ----------
C='#1FA4E0'
extra_s='.kan{display:flex;gap:14px;padding:16px}.kcol{flex:1;background:var(--creme);border-radius:12px;padding:12px}.kcol h4{font-size:12.5px;text-transform:uppercase;letter-spacing:.06em;color:var(--subtext);font-family:var(--mono);font-weight:600;margin-bottom:10px}.kcard{background:var(--paper);border:1px solid var(--line);border-radius:10px;padding:11px 12px;margin-bottom:9px;font-size:13.5px;font-weight:600}.kcard .kt{font-size:11px;font-weight:600;border-radius:999px;padding:1px 8px;display:inline-block;margin-top:7px}'
sc=head(C,'pen','Marketing · content','Content & planning','Blogs, social en e-mail vanuit één planner — in jouw stem, jij doet de eindredactie.',
   '<button class="btn">Geschiedenis</button><button class="btn primary">+ Nieuw stuk</button>')+f'''
<div class="card"><div class="ch">{svg('chart','')} Contentplanner</div>
 <div class="kan">
  <div class="kcol"><h4>Idee</h4>
   <div class="kcard">Voorjaarslook: 5 tips<span class="kt" style="background:#DBEEE3;color:#1F6E47;display:block;width:max-content">Blog</span></div>
   <div class="kcard">Klantverhaal: Ilze &amp; team<span class="kt" style="background:#E4EEF6;color:#1F5E91;display:block;width:max-content">Social</span></div></div>
  <div class="kcol"><h4>Concept</h4>
   <div class="kcard">Zomeractie — nieuwsbrief<span class="kt" style="background:#F8E9CF;color:#9A6512;display:block;width:max-content">E-mail</span></div>
   <div class="kcard">Nieuwe openingstijden<span class="kt" style="background:#E4EEF6;color:#1F5E91;display:block;width:max-content">Social</span></div></div>
  <div class="kcol"><h4>Gepland</h4>
   <div class="kcard">Weekendactie · Instagram<span class="kt" style="background:#DBEEE3;color:#1F6E47;display:block;width:max-content">vr 09:15</span></div>
   <div class="kcard">Blog · WordPress<span class="kt" style="background:#DBEEE3;color:#1F6E47;display:block;width:max-content">ma 08:00</span></div></div>
 </div>
</div>
<div class="grid2" style="margin-top:16px"><div class="card"><div class="ch">Concept · in jouw stem</div>
 <div style="padding:4px 18px 18px;font-size:14px;line-height:1.6;color:var(--ink-2)"><b style="color:var(--ink)">Onderwerp: Klaar voor de lente?</b><br>Beste {{voornaam}},<br>De dagen worden langer en dat vraagt om een frisse look. Deze maand geven we je graag drie ideeën die passen bij jouw haar…<br><span class="muted">Emma schrijft een concept in de toon van je bedrijf. Jij redigeert en plant het in.</span></div>
 </div>
 <div class="card"><div class="ch">Klaar om te plannen</div>
  <div class="row"><div class="ri" style="background:{C}1a;color:{C}">{svg('check','')}</div><div class="rt"><div class="h">Blog · WordPress</div><div class="p">SEO op je zoekwoorden</div></div><div class="rr"><span class="pill neut">Concept</span></div></div>
  <div class="row"><div class="ri" style="background:{C}1a;color:{C}">{svg('check','')}</div><div class="rt"><div class="h">Social · Instagram</div></div><div class="rr"><span class="pill ok">Gepland</span></div></div>
  <div class="row"><div class="ri" style="background:{C}1a;color:{C}">{svg('check','')}</div><div class="rt"><div class="h">E-mail · Mailchimp</div></div><div class="rr"><span class="pill ok">Klaar</span></div></div>
 </div>
</div>'''
open(OUT+"/schrijft.html","w").write(page("EmmaSchrijft",full(side('Marketing','Content'),sc),extra_s))

# ---------- PROMOOT ----------
C='#FF4D2E'
def carow(name,st,stc,per,pct,pcol):
    return f'''<div class="row"><div class="rt"><div class="h">{name} <span class="pill {stc}" style="margin-left:6px">{st}</span></div><div class="p">{per}</div></div>
    <div style="width:150px"><div class="bar"><i style="width:{pct}%;background:{pcol}"></i></div></div><div class="rr">{pct}%</div></div>'''
pr=head(C,'mega','Marketing','Advertenties','Google en Meta Ads in één overzicht, gekoppeld aan je echte omzet.',
   '<button class="btn primary">+ Nieuwe campagne</button>')+f'''
<div class="kpis">
 {kpi(C,'mega','Actieve campagnes','4','2 starten deze week')}
 {kpi(C,'trendup','Bereik (7 dagen)','24.680','+18% t.o.v. vorige 7 dagen','up')}
 {kpi('#9A6512','euro','Advertentiekosten','€ 1.240','Deze maand','warn')}
 {kpi('#1F6E47','link','Toegerekend aan omzet','€ 6.480','5,2× ROAS','up')}
</div>
<div class="grid2"><div class="card"><div class="ch">Campagnes</div>
 {carow('Lenteactie 2024','Actief','ok','Google · 15 apr – 5 mei','62','#1F6E47')}
 {carow('Nieuwe collectie','Gepland','neut','Meta · 20 mei – 16 jun','0','#4D6BF5')}
 {carow('Klantenweekend','Actief','ok','Meta · 3 – 12 mei','48','#1F6E47')}
 {carow('Terugkerende klanten','Concept','warn','Google · nog niet gestart','0','#9A6512')}
</div>
 <div class="card"><div class="ch">{svg('bulb','')} Budgetadvies</div>
  <div style="padding:6px 18px 4px;font-size:13.5px;color:var(--ink-2)">Emma rekent je advertentieresultaat toe aan je omzet uit EmmaWaakt.</div>
  <div class="row"><div class="rt"><div class="h">Google Ads</div><div class="p">Levert € 4,10 per euro</div></div><div style="width:120px"><div class="bar"><i style="width:74%;background:#1F6E47"></i></div></div></div>
  <div class="row"><div class="rt"><div class="h">Meta Ads</div><div class="p">Levert € 2,30 per euro</div></div><div style="width:120px"><div class="bar"><i style="width:44%;background:#9A6512"></i></div></div></div>
  <div style="margin:10px 18px 16px;background:{C}12;border-radius:11px;padding:12px 14px;font-size:13.5px"><b>Voorstel:</b> verschuif € 200/mnd van Meta naar Google.</div>
 </div>
</div>'''
open(OUT+"/promoot.html","w").write(page("EmmaPromoot",full(side('Marketing','Advertenties'),pr)))
print("batch2:", ", ".join(sorted(f for f in os.listdir(OUT) if f.endswith('.html'))))
