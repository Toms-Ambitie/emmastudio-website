export type ModuleVignette = {
  type: 'factuur' | 'inlezen' | 'btw' | 'schil' | 'doel' | 'prognose' | 'signaal' |
        'strook' | 'contract' | 'verlof' | 'pipeline' | 'score' | 'klant' |
        'scorecard' | 'checkin' | 'vraag' | 'prijs' | 'review' | 'concurrent' |
        'kanban' | 'kanalen' | 'stem' | 'campagnes' | 'attributie' | 'budget';
};

export type ModuleFeat = {
  tag: string;
  h: string;
  p: string;
  list: string[];
  vig: string;
};

export type ModuleStep = {
  n: string;
  h: string;
  p: string;
};

export type ModuleFaq = {
  q: string;
  a: string;
};

export type ModuleData = {
  id: string;
  name: string;
  num: string;
  price: number;
  accentVar: string;
  chip: string;
  head: string;
  intro: string;
  heroVig: string;
  does: { title: string; sub: string; feats: ModuleFeat[] };
  steps: { title: string; items: ModuleStep[] };
  faq: ModuleFaq[];
};

export const ICONS: Record<string, string> = {
  boekt:    '<path d="M4 5A1.6 1.6 0 0 1 5.6 3.4H12v17.2H5.6A1.6 1.6 0 0 0 4 22.2Z"/><path d="M20 5A1.6 1.6 0 0 0 18.4 3.4H12v17.2h6.4A1.6 1.6 0 0 1 20 22.2Z"/>',
  waakt:    '<path d="M12 3l7 2.8v5.2c0 4.4-3 7.5-7 8.8-4-1.3-7-4.4-7-8.8V5.8L12 3Z"/><path d="m9 11.8 2 2 4-4"/>',
  loont:    '<circle cx="12" cy="12" r="8.2"/><path d="M14.8 9.2a3.6 3.6 0 1 0 .2 5.7M8.4 11.2h4.8M8.4 13.2h4.8"/>',
  vindt:    '<circle cx="10.5" cy="10.5" r="6.4"/><path d="m20 20-4.8-4.8"/>',
  coacht:   '<circle cx="12" cy="8.2" r="3.4"/><path d="M5.6 20a6.4 6.4 0 0 1 12.8 0"/>',
  ziet:     '<rect x="3.4" y="4.6" width="17.2" height="14.8" rx="2.6"/><path d="M7 15l3.2-3.2 2.4 2.4L17.2 9"/>',
  schrijft: '<path d="M12.5 19.5H21"/><path d="M16.6 4.4a2.05 2.05 0 0 1 2.9 2.9L7.8 19 3.5 20.5 5 16.2Z"/>',
  promoot:  '<path d="m4 10 14-5.5v15L4 14Z"/><path d="M8 14v2.8a2 2 0 0 0 4 0v-1.4"/><path d="M19 9.2a3 3 0 0 1 0 5.6"/>',
};

export const MODULE_TAGS: Record<string, string> = {
  boekt:    'Boekhouding en BTW, automatisch geregeld.',
  waakt:    'Het financiële brein van je zaak.',
  loont:    'Loon en contracten, zonder gedoe.',
  vindt:    'Vind klanten en kandidaten die passen.',
  coacht:   'Coaching en voortgang voor jou en je team.',
  ziet:     'Zie waar je staat in de markt.',
  schrijft: 'Teksten die klinken als jij.',
  promoot:  'Zie welke euro écht omzet oplevert.',
};

export const MODULE_PRICE: Record<string, number> = {
  boekt:9, waakt:9, loont:19, vindt:9, coacht:9, ziet:9, schrijft:19, promoot:19,
};

export const MODULE_ORDER = ['boekt','waakt','loont','vindt','coacht','ziet','schrijft','promoot'];

export const MODULES: Record<string, ModuleData> = {
  boekt:{
    id:'boekt', name:'Boekt', num:'01', price:9, accentVar:'--m-boekt',
    chip:'al 18 maanden bewezen in de praktijk',
    head:'Boekhouding die zichzelf bijhoudt.',
    intro:'Een rustige schil rond je boekhouding. Emma leest binnenkomende facturen vanzelf in en houdt je administratie bij, zodat jij niet meer in losse systemen hoeft te werken.',
    heroVig:'boekt_inlezen',
    does:{
      title:'Wat EmmaBoekt voor je doet.',
      sub:'De dagelijkse boekhouding, teruggebracht tot een paar rustige handelingen. Jij houdt het overzicht, Emma doet het typewerk.',
      feats:[
        { tag:'Facturen & offertes', h:'Factureren in een paar klikken.',
          p:'Maak en verstuur facturen en offertes vanuit één rustig scherm. Emma onthoudt je klanten, je diensten en je huisstijl.',
          list:['Professionele facturen en offertes','Automatische nummering en herinneringen','Klaar voor je klant, in jouw stijl'],
          vig:'boekt_factuur' },
        { tag:'Automatisch inlezen', h:'Bonnetjes en facturen leest Emma zelf.',
          p:'Stuur een inkomende factuur door en Emma herkent het bedrag, de BTW en de juiste grootboekrekening. Jij hoeft alleen nog te controleren.',
          list:['Bedrag en BTW automatisch herkend','Direct op de juiste rekening geboekt','Geen overtypen, geen schoenendoos'],
          vig:'boekt_inlezen' },
        { tag:'BTW voorbereid', h:'Je BTW-aangifte staat klaar.',
          p:'Emma houdt je BTW het hele kwartaal bij en zet de aangifte voor je klaar. Jij controleert en verstuurt, je accountant kijkt mee.',
          list:['Altijd actueel BTW-overzicht','Aangifte voorbereid per kwartaal','Klaar om te controleren en in te dienen'],
          vig:'boekt_btw' },
        { tag:'Rust rond je software', h:'Een schil rond wat je al gebruikt.',
          p:'EmmaBoekt werkt bovenop je bestaande boekhoudpakket, zoals eBoekhouden.nl of SnelStart. Je cijfers blijven waar ze horen; jij werkt voortaan in de rust van Emma.',
          list:['Sluit aan op eBoekhouden.nl en SnelStart','Geen migratie, geen dubbel werk','Je accountant houdt toegang'],
          vig:'boekt_schil' },
      ],
    },
    steps:{ title:'Zo rustig werkt het.', items:[
      { n:'01 · KOPPEL', h:'Verbind je boekhouding', p:'Koppel je bestaande pakket. Emma haalt je klanten en instellingen op, je hoeft niets opnieuw in te richten.' },
      { n:'02 · INLEZEN', h:'Emma leest je post in', p:'Inkomende facturen en bonnetjes worden automatisch herkend en geboekt op de juiste rekening.' },
      { n:'03 · CONTROLE', h:'Jij houdt de regie', p:'In één overzicht controleer en verstuur je facturen. Niets gebeurt zonder dat jij het ziet.' },
      { n:'04 · KLAAR', h:'Je BTW staat klaar', p:'Aan het eind van het kwartaal is je aangifte voorbereid. Controleren, indienen, klaar.' },
    ] },
    faq:[
      { q:'Vervangt EmmaBoekt mijn boekhoudsoftware?', a:'Nee. EmmaBoekt is een rustige schil rond je bestaande pakket, zoals eBoekhouden.nl of SnelStart. Je cijfers blijven daar staan; jij werkt voortaan in het overzicht van Emma in plaats van in die losse systemen.' },
      { q:'Werkt het samen met mijn accountant?', a:'Ja. Je accountant houdt gewoon toegang tot je boekhouding en blijft eindverantwoordelijk. Emma neemt het voorbereidende werk over, zodat er minder uren overblijven om te factureren.' },
      { q:'Hoe leest Emma mijn facturen in?', a:'Je stuurt een inkomende factuur door of uploadt hem. Emma herkent het bedrag, de BTW en de leverancier en boekt het op de juiste grootboekrekening. Jij controleert het resultaat voordat het definitief is.' },
      { q:'Wat kost EmmaBoekt?', a:'EmmaBoekt is bij de lancering los te gebruiken vanaf €9 per maand, exclusief btw. Het zit ook in elk branche-pakket, van ZZP tot Compleet. Maandelijks opzegbaar.' },
      { q:'Kan ik EmmaBoekt nu al gebruiken?', a:'Nog niet. We bouwen Emma op dit moment als platform. De boekhoud-functies zijn 18 maanden bewezen in de praktijk bij salon Blondes Incognito. Laat je e-mail achter en je hoort het als eerste zodra je kunt starten.' },
    ],
  },
  waakt:{
    id:'waakt', name:'Waakt', num:'02', price:9, accentVar:'--m-waakt',
    chip:'al bewezen in de praktijk',
    head:'Het financiële brein van je zaak.',
    intro:'Doelen, prognoses en een wekelijks advies op je échte cijfers. Emma kijkt mee en zegt het op tijd als iets afwijkt, zodat je kunt sturen in plaats van het achteraf te ontdekken.',
    heroVig:'waakt_doel',
    does:{
      title:'Wat EmmaWaakt voor je doet.',
      sub:'Je cijfers, vertaald naar rust en richting. Geen dashboard om in te verdwalen, maar de paar dingen die er deze week toe doen.',
      feats:[
        { tag:'Doelen', h:'Stel doelen, op elk niveau.', p:'Bepaal doelen voor je bedrijf en per medewerker. Emma houdt de voortgang bij en laat rustig zien waar je staat.',
          list:['Doelen op bedrijfs- en teamniveau','Voortgang automatisch bijgehouden','Altijd actueel, zonder bijwerken'], vig:'waakt_signaal' },
        { tag:'Prognoses', h:'Vooruitkijken op echte cijfers.', p:'Prognoses op basis van je werkelijke data en seizoenspatronen, zodat je weet wat eraan komt in plaats van het te gokken.',
          list:['Gebaseerd op je eigen historie','Houdt rekening met het seizoen','Zie verwachte omzet en kosten'], vig:'waakt_prognose' },
        { tag:'Wekelijks advies', h:'Drie acties, elke week.', p:'Een rustig, kort advies op je cijfers. Geen alarmbellen, maar concrete stappen die je zelf kunt wegen.',
          list:['Kort advies op jouw situatie','Concrete acties, geen ruis','Jij beslist wat je doet'], vig:'waakt_doel' },
      ],
    },
    steps:{ title:'Zo houd je grip.', items:[
      { n:'01 · KOPPEL', h:'Verbind je cijfers', p:'EmmaWaakt leest mee op je boekhouding en je doelen. Je hoeft niets dubbel in te voeren.' },
      { n:'02 · DOELEN', h:'Stel je doelen', p:'Bepaal waar je naartoe wilt, voor je bedrijf en je team. Emma vertaalt dat naar voortgang.' },
      { n:'03 · VOLG', h:'Volg de voortgang', p:'In één rustig overzicht zie je hoe je ervoor staat, zonder zelf cijfers te hoeven uitpluizen.' },
      { n:'04 · STUUR', h:'Stuur op tijd bij', p:'Elke week een kort advies met concrete acties. Jij beslist, Emma rekent het voor je uit.' },
    ] },
    faq:[
      { q:'Heb ik verstand van cijfers nodig?', a:'Nee. EmmaWaakt is juist bedoeld voor ondernemers die geen analist willen worden. Je krijgt de paar inzichten die ertoe doen in gewone taal, met een concrete suggestie erbij.' },
      { q:'Werkt EmmaWaakt samen met EmmaBoekt?', a:'Ja. EmmaWaakt gebruikt je boekhoudcijfers uit EmmaBoekt als basis. Samen vormen ze het financiële hart van je onderneming, maar je kunt ook starten met alleen Waakt.' },
      { q:'Wat kost EmmaWaakt?', a:'EmmaWaakt is bij de lancering los te gebruiken vanaf €9 per maand, exclusief btw. Het zit ook in elk branche-pakket. Maandelijks opzegbaar.' },
      { q:'Kan ik het nu al gebruiken?', a:'Nog niet. We bouwen Emma op dit moment als platform; de aanpak is 18 maanden bewezen bij salon Blondes Incognito. Laat je e-mail achter en je hoort het als eerste.' },
    ],
  },
  loont:{
    id:'loont', name:'Loont', num:'03', price:19, accentVar:'--m-loont',
    chip:'met CAO-engine voor jouw branche',
    head:'Loon en contracten, zonder gedoe.',
    intro:'De volledige HR-administratie op één plek. Loonstroken, contracten met digitale ondertekening, en verlof en verzuim, met de CAO van jouw branche al ingebouwd.',
    heroVig:'loont_strook',
    does:{
      title:'Wat EmmaLoont voor je doet.',
      sub:'Alles rond je personeel, rustig geregeld. Geen los loonbureau meer, geen losse mappen met contracten.',
      feats:[
        { tag:'Salaris', h:'Loonstroken die kloppen.', p:'Salarisadministratie met een CAO-engine voor jouw branche. Proforma\'s en loonstroken, klaar als nette PDF.',
          list:['CAO-engine voor o.a. Kappers en Fysio','Proforma\'s en loonstroken als PDF','Werkgeverslasten automatisch berekend'], vig:'loont_strook' },
        { tag:'Contracten', h:'Contracten in een paar minuten.', p:'Een contractgenerator met digitale ondertekening. Stel op, stuur door, en laat veilig tekenen.',
          list:['Arbeidsovereenkomsten op maat','Digitaal ondertekenen','Alles netjes bewaard op één plek'], vig:'loont_contract' },
        { tag:'Verlof & verzuim', h:'Saldo dat zichzelf bijhoudt.', p:'Verlof- en verzuimadministratie met een automatisch pro-rata saldo, zodat je nooit hoeft te rekenen.',
          list:['Verlofsaldo automatisch berekend','Verzuim overzichtelijk bijgehouden','Altijd actueel per medewerker'], vig:'loont_verlof' },
      ],
    },
    steps:{ title:'Zo simpel werkt het.', items:[
      { n:'01 · KIES CAO', h:'Stel je branche in', p:'Kies de CAO die bij je past. Emma zet de regels en berekeningen voor je klaar.' },
      { n:'02 · VOEG TOE', h:'Zet je team erin', p:'Voeg je medewerkers toe met hun gegevens. De rest rekent Emma uit.' },
      { n:'03 · DRAAI', h:'Draai de loonronde', p:'Loonstroken, werkgeverslasten en vakantiegeld staan klaar als nette PDF.' },
      { n:'04 · REGEL', h:'Contracten & verlof', p:'Stel contracten op, laat digitaal tekenen, en houd verlof en verzuim moeiteloos bij.' },
    ] },
    faq:[
      { q:'Voor wie is EmmaLoont bedoeld?', a:'Voor ondernemers met één of meer medewerkers, in salons, zorgpraktijken en kleine teams. Werk je alleen, dan heb je deze module simpelweg niet nodig.' },
      { q:'Welke CAO\'s ondersteunt het?', a:'De CAO-engine is opgezet voor onder andere Kappers, Schoonheidsspecialisten, tandartsen (KNMT) en fysiotherapie. Welke CAO\'s er bij de lancering klaarstaan, communiceren we vooraf.' },
      { q:'Vervangt het mijn loonbureau?', a:'Voor veel ondernemers wel. EmmaLoont neemt de loonadministratie over, inclusief loonstroken en werkgeverslasten. Twijfel je over een specifieke situatie, dan kun je je accountant laten meekijken.' },
      { q:'Wat kost EmmaLoont en kan ik het nu gebruiken?', a:'EmmaLoont is bij de lancering los te gebruiken vanaf €19 per maand, exclusief btw, en zit in de pakketten voor Salons en Zorg. We bouwen het platform nu; laat je e-mail achter voor de start.' },
    ],
  },
  vindt:{
    id:'vindt', name:'Vindt', num:'04', price:9, accentVar:'--m-vindt',
    chip:'recruitment én sales in één',
    head:'Vind wie bij je past.',
    intro:'Eén module met twee gezichten. Ontdek kandidaten als je personeel zoekt, of nieuwe klanten als je wilt groeien, allebei dichtbij en met een nette pipeline.',
    heroVig:'vindt_pipeline',
    does:{
      title:'Wat EmmaVindt voor je doet.',
      sub:'Of je nu mensen zoekt of klanten, het begint met de juiste in beeld krijgen. Rustig, gericht, en netjes vastgelegd.',
      feats:[
        { tag:'Recruitment', h:'Kandidaten in de buurt.', p:'Ontdek kandidaten binnen jouw straal, met een score die laat zien wie past, en een pipeline om het overzicht te houden.',
          list:['Kandidaatdetectie binnen 25 km','Score op basis van je vacature','Pipeline van eerste contact tot match'], vig:'vindt_score' },
        { tag:'Sales', h:'Klanten die bij je passen.', p:'Ontdek potentiële klanten op basis van locatie en branche, met lead-scoring en een sales-pipeline.',
          list:['Leads op locatie en SBI-code','Lead-scoring die prioriteert','Sales-pipeline in één overzicht'], vig:'vindt_klant' },
        { tag:'AVG-proof', h:'Netjes en navolgbaar.', p:'Een audit-log houdt bij wat er gebeurt, zodat je werving en acquisitie voldoen aan de privacyregels.',
          list:['Audit-log voor de AVG','Inzichtelijk wie je benadert','Rustig en verantwoord opgezet'], vig:'vindt_pipeline' },
      ],
    },
    steps:{ title:'Zo werkt het ontdekken.', items:[
      { n:'01 · KIES MODUS', h:'Mensen of klanten', p:'Bepaal of je kandidaten of nieuwe klanten zoekt. Emma stemt zich daarop af.' },
      { n:'02 · STEL IN', h:'Bepaal je straal', p:'Geef je werkgebied en wensen op. Emma zoekt binnen jouw buurt en branche.' },
      { n:'03 · SCOOR', h:'Zie wie past', p:'Profielen krijgen een score, zodat je je tijd steekt in wie er echt toe doet.' },
      { n:'04 · VOLG OP', h:'Houd je pipeline', p:'Van eerste contact tot match of klant, alles netjes en AVG-proof vastgelegd.' },
    ] },
    faq:[
      { q:'Is dit een vacaturebank?', a:'Nee. EmmaVindt helpt je actief ontdekken wie in jouw buurt past, in plaats van te wachten op reacties. In sales-modus werkt het net zo, maar dan voor potentiële klanten.' },
      { q:'Hoe zit het met privacy?', a:'EmmaVindt is opgezet met de AVG als uitgangspunt, inclusief een audit-log die bijhoudt wat er gebeurt. Jij houdt zicht en controle op wie je benadert.' },
      { q:'Voor wie is het handig?', a:'Voor ondernemers die personeel werven, zoals salons en zorgpraktijken, en voor wie nieuwe klanten zoekt, zoals ZZP\'ers en kleine teams.' },
      { q:'Wat kost het en kan ik het nu gebruiken?', a:'EmmaVindt is bij de lancering los te gebruiken vanaf €9 per maand, exclusief btw. We bouwen het platform nu; laat je e-mail achter om als eerste te starten.' },
    ],
  },
  coacht:{
    id:'coacht', name:'Coacht', num:'05', price:9, accentVar:'--m-coacht',
    chip:'gekoppeld aan EmmaWaakt',
    head:'Je team laten groeien, rustig.',
    intro:'Coaching-administratie die het makkelijk maakt om je mensen te ontwikkelen. Scorecards, gesprekken en voortgangsdoelen per persoon, met slimme suggesties voor je gesprekken.',
    heroVig:'coacht_scorecard',
    does:{
      title:'Wat EmmaCoacht voor je doet.',
      sub:'Goede gesprekken beginnen met goede voorbereiding. Emma houdt de lijn vast, zodat jij je op je mensen kunt richten.',
      feats:[
        { tag:'Scorecards', h:'Voortgang per persoon.', p:'Scorecards en voortgangsdoelen per medewerker, zodat je ziet hoe iemand zich ontwikkelt.',
          list:['Scorecards per medewerker','Voortgangsdoelen die je samen zet','Overzicht zonder spreadsheets'], vig:'coacht_scorecard' },
        { tag:'Check-ins', h:'Gesprekken die je niet vergeet.', p:'Periodieke check-ins met herinneringen en een log, zodat elk gesprek voortbouwt op het vorige.',
          list:['Gesprekslogs op één plek','Herinneringen voor je check-ins','Elk gesprek bouwt verder'], vig:'coacht_checkin' },
        { tag:'Slimme vragen', h:'Goed voorbereid het gesprek in.', p:'Suggesties voor coachvragen op basis van de cijfers uit EmmaWaakt, zodat je het over de juiste dingen hebt.',
          list:['Suggesties op basis van prestaties','Gericht op wat speelt','Jij voert het gesprek, Emma denkt mee'], vig:'coacht_vraag' },
      ],
    },
    steps:{ title:'Zo coach je rustiger.', items:[
      { n:'01 · ZET DOELEN', h:'Doelen per persoon', p:'Bepaal samen met je medewerker waar het naartoe gaat. Emma houdt de voortgang bij.' },
      { n:'02 · PLAN', h:'Plan je check-ins', p:'Zet periodieke gesprekken klaar. Emma herinnert je er op tijd aan.' },
      { n:'03 · BEREID VOOR', h:'Krijg suggesties', p:'Voor elk gesprek krijg je vragen voorgesteld op basis van de cijfers.' },
      { n:'04 · LEG VAST', h:'Houd de lijn vast', p:'Notities en afspraken blijven bewaard, zodat het volgende gesprek verder bouwt.' },
    ] },
    faq:[
      { q:'Voor wie is EmmaCoacht?', a:'Voor ondernemers met personeel dat ze willen ontwikkelen, zoals salons en zorgpraktijken. Werk je alleen, dan heb je deze module niet nodig.' },
      { q:'Waar komen de coachvragen vandaan?', a:'Uit de prestatiecijfers in EmmaWaakt. Loopt de productverkoop van iemand terug, dan stelt Emma voor daar het gesprek over te voeren. Jij bepaalt wat je ermee doet.' },
      { q:'Werkt het samen met de andere modules?', a:'Ja. EmmaCoacht leunt op EmmaWaakt voor de cijfers en sluit aan op EmmaLoont voor je personeelsadministratie. Je kunt ook met alleen Coacht beginnen.' },
      { q:'Wat kost het en kan ik het nu gebruiken?', a:'EmmaCoacht is bij de lancering los te gebruiken vanaf €9 per maand, exclusief btw. We bouwen het platform nu; laat je e-mail achter voor de start.' },
    ],
  },
  ziet:{
    id:'ziet', name:'Ziet', num:'06', price:9, accentVar:'--m-ziet',
    chip:'lokale markt in beeld',
    head:'Zie waar je staat in de markt.',
    intro:'Markt-intelligentie die meedenkt. Hoe verhouden je prijzen zich tot de buurt, wie zijn je concurrenten, en wat zeggen je reviews? Eén keer per maand rustig samengevat.',
    heroVig:'ziet_prijs',
    does:{
      title:'Wat EmmaZiet voor je doet.',
      sub:'Je hoeft niet zelf de buurt af te speuren. Emma houdt de markt in de gaten en vat samen wat ertoe doet.',
      feats:[
        { tag:'Prijsvergelijking', h:'Weet of je goed zit.', p:'Vergelijk je prijzen per dienst met vergelijkbare bedrijven in de buurt, zodat je bewust kunt kiezen.',
          list:['Prijsvergelijking per dienst','Binnen jouw straal','Bewust kiezen, niet gokken'], vig:'ziet_prijs' },
        { tag:'Concurrenten', h:'Weet wie er om je heen zit.', p:'Automatische detectie van concurrenten in de buurt, met een rustige maandelijkse update.',
          list:['Concurrenten automatisch in kaart','Op basis van locatie en branche','Maandelijkse positie-update'], vig:'ziet_concurrent' },
        { tag:'Reviews', h:'Hoor wat klanten zeggen.', p:'Je reviews verzameld en samengevat tot thema\'s, zodat je ziet waar je sterk in bent en wat beter kan.',
          list:['Reviews op één plek','Samengevat tot thema\'s','Zie je sterke punten en kansen'], vig:'ziet_review' },
      ],
    },
    steps:{ title:'Zo zie je de markt.', items:[
      { n:'01 · STEL IN', h:'Geef je werkgebied', p:'Bepaal je locatie en diensten. Emma weet waar en wat ze moet vergelijken.' },
      { n:'02 · VERZAMEL', h:'Emma kijkt rond', p:'Prijzen, concurrenten en reviews in de buurt worden automatisch verzameld.' },
      { n:'03 · SAMENVATTING', h:'Krijg het overzicht', p:'Eén keer per maand een rustige samenvatting van waar je staat.' },
      { n:'04 · BESLIS', h:'Doe er iets mee', p:'Pas je prijzen aan, speel in op een kans, of laat het juist zoals het is.' },
    ] },
    faq:[
      { q:'Hoe komt Emma aan deze gegevens?', a:'Uit openbare bronnen, zoals bedrijfsregisters en openbare reviews in jouw omgeving. EmmaZiet vat dat samen tot een rustig overzicht.' },
      { q:'Voor wie is het vooral nuttig?', a:'Voor lokale dienstverleners zoals salons en zorgpraktijken, die willen weten hoe ze zich verhouden tot de buurt zonder er zelf onderzoek naar te doen.' },
      { q:'Word ik er niet onrustig van?', a:'Daar is het juist niet voor. EmmaZiet stuurt geen alarmen, maar één rustige update per maand met wat er echt toe doet.' },
      { q:'Wat kost het en kan ik het nu gebruiken?', a:'EmmaZiet is bij de lancering los te gebruiken vanaf €9 per maand, exclusief btw. We bouwen het platform nu; laat je e-mail achter voor de start.' },
    ],
  },
  schrijft:{
    id:'schrijft', name:'Schrijft', num:'07', price:19, accentVar:'--m-schrijft',
    chip:'in jouw eigen stem',
    head:'Teksten die klinken als jij.',
    intro:'Alles rond schrijven en plannen op één plek. Blogs, social, e-mail en SEO vanuit één planner, in de toon van je bedrijf, met jou aan het roer van de eindredactie.',
    heroVig:'schrijft_kanban',
    does:{
      title:'Wat EmmaSchrijft voor je doet.',
      sub:'Van leeg scherm naar geplande content, zonder dat het uren kost of klinkt als een ander. Jij houdt de eindredactie.',
      feats:[
        { tag:'Eén planner', h:'Al je content op één plek.', p:'Een centrale planner voor blogs, social en e-mail, zodat je overzicht houdt over wat wanneer uitgaat.',
          list:['Blog, social en e-mail samen','Kanban van idee tot gepland','Koppelt aan WordPress, Instagram, Mailchimp'], vig:'schrijft_kanban' },
        { tag:'Jouw stem', h:'Geschreven zoals jij praat.', p:'Emma leert de toon van je bedrijf, zodat concepten klinken als jij, niet als een willekeurige tekst.',
          list:['Leert de stem van je bedrijf','Concepten als startpunt','Jij doet de eindredactie'], vig:'schrijft_stem' },
        { tag:'SEO', h:'Gevonden worden.', p:'SEO-teksten op basis van echte zoekwoorddata, zodat je content ook gevonden wordt.',
          list:['Op basis van zoekwoorddata','Praktische SEO, geen trucs','Klaar om te plannen'], vig:'schrijft_kanalen' },
      ],
    },
    steps:{ title:'Zo plan je je content.', items:[
      { n:'01 · STEM', h:'Leer Emma je toon', p:'Geef een paar voorbeelden van je stijl. Emma leert hoe jouw bedrijf klinkt.' },
      { n:'02 · KIES', h:'Kies een onderwerp', p:'Blog, social-post of e-mail. Emma maakt een concept als startpunt.' },
      { n:'03 · REDIGEER', h:'Maak het van jou', p:'Schaaf het concept bij. Jij houdt de eindredactie, altijd.' },
      { n:'04 · PLAN', h:'Zet het klaar', p:'Plan het op het juiste kanaal en moment, vanuit één overzicht.' },
    ] },
    faq:[
      { q:'Schrijft Emma alles voor me?', a:'Emma maakt concepten als startpunt, in de stem van je bedrijf. Jij houdt altijd de eindredactie, zodat het klopt en klinkt als jij. Het neemt het lege scherm weg, niet je stem.' },
      { q:'Met welke kanalen werkt het?', a:'EmmaSchrijft is opgezet om aan te sluiten op onder andere WordPress, Instagram, Facebook en Mailchimp, met SEO op basis van zoekwoorddata. Welke koppelingen bij de lancering klaarstaan, communiceren we vooraf.' },
      { q:'Voor wie is het handig?', a:'Voor elke ondernemer die regelmatig content maakt maar er weinig tijd voor heeft, in alle branches en pakketten.' },
      { q:'Wat kost het en kan ik het nu gebruiken?', a:'EmmaSchrijft is bij de lancering los te gebruiken vanaf €19 per maand, exclusief btw. We bouwen het platform nu; laat je e-mail achter voor de start.' },
    ],
  },
  promoot:{
    id:'promoot', name:'Promoot', num:'08', price:19, accentVar:'--m-promoot',
    chip:'nieuw bij de lancering',
    head:'Zie welke euro écht werkt.',
    intro:'Alles rond geld in marketing. Google en Meta Ads in één overzicht, gekoppeld aan je cijfers, zodat je ziet welke advertentie echt omzet oplevert en welke niet.',
    heroVig:'promoot_attributie',
    does:{
      title:'Wat EmmaPromoot voor je doet.',
      sub:'Adverteren hoeft geen blind budget te zijn. Emma laat zien wat werkt, gekoppeld aan je echte omzet.',
      feats:[
        { tag:'Eén overzicht', h:'Al je advertenties samen.', p:'Google Ads en Meta Ads in één scherm, zodat je niet langer tussen platforms hoeft te springen.',
          list:['Google en Meta naast elkaar','Resultaten per campagne en kanaal','Geen losse logins meer'], vig:'promoot_kanalen' },
        { tag:'Attributie', h:'Weet wat omzet oplevert.', p:'Resultaten gekoppeld aan je omzet, tot op de dienst, zodat je ziet welke euro echt iets doet.',
          list:['Toegerekend aan je omzet','Inzicht per dienst','Stop met gokken op gevoel'], vig:'promoot_attributie' },
        { tag:'Budgetadvies', h:'Zet je geld waar het werkt.', p:'Een advies voor je budgetverdeling, direct gekoppeld aan de cijfers uit EmmaWaakt.',
          list:['Advies voor je budgetverdeling','Gekoppeld aan EmmaWaakt','Jij beslist, Emma onderbouwt'], vig:'promoot_budget' },
      ],
    },
    steps:{ title:'Zo adverteer je gericht.', items:[
      { n:'01 · KOPPEL', h:'Verbind je kanalen', p:'Koppel Google en Meta Ads. Emma haalt je campagnes en resultaten op.' },
      { n:'02 · MEET', h:'Koppel aan omzet', p:'Resultaten worden toegerekend aan je echte omzet, tot op de dienst.' },
      { n:'03 · ZIE', h:'Zie wat werkt', p:'In één overzicht zie je welke campagne oplevert en welke geld kost.' },
      { n:'04 · VERDEEL', h:'Stuur je budget', p:'Volg het advies om je budget te zetten waar het rendeert, of kies zelf.' },
    ] },
    faq:[
      { q:'Is EmmaPromoot ook bewezen bij Blondes Incognito?', a:'Dit is de nieuwste van de acht modules en de enige die nog niet 18 maanden in de praktijk draaide. We bouwen hem nu mee op, op hetzelfde fundament als de rest. We zijn daar liever eerlijk over.' },
      { q:'Met welke platforms werkt het?', a:'EmmaPromoot is opgezet voor Google Ads en Meta Ads, met attributie op basis van je webstatistieken. Welke koppelingen bij de lancering klaarstaan, communiceren we vooraf.' },
      { q:'Voor wie is het bedoeld?', a:'Voor ondernemers die advertentiebudget inzetten en willen weten of het rendeert, in plaats van blind door te betalen.' },
      { q:'Wat kost het en kan ik het nu gebruiken?', a:'EmmaPromoot is bij de lancering los te gebruiken vanaf €19 per maand, exclusief btw. We bouwen het platform nu; laat je e-mail achter om als eerste te starten.' },
    ],
  },
};

export const VIGNETTES: Record<string, string> = {
  boekt_factuur:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Facturen &amp; offertes</div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Factuur · Blondes Incognito</span><b class="vig__pill">verstuurd</b></div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Offerte · nieuwe klant</span><b class="vig__pill">bekeken</b></div>
    <div class="vig__li vig__li--soft"><span class="vig__scan"></span><span>Concept · maandfactuur</span><b class="vig__pill vig__pill--w">opstellen…</b></div>`,
  boekt_inlezen:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Inkomende post</div>
    <div class="vig__li vig__li--soft"><span class="vig__scan"></span><span>Leverancier · PDF</span><b class="vig__pill vig__pill--w">inlezen…</b></div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Bedrag &amp; BTW herkend</span><b class="vig__pill">geboekt</b></div>
    <div class="vig__insight"><span class="vig__spark">◆</span> Emma boekt automatisch op de juiste <b>grootboekrekening</b></div>`,
  boekt_btw:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> BTW-aangifte · Q2</div>
    <div class="vig__pay"><span>Omzet hoog tarief</span><i></i></div>
    <div class="vig__pay"><span>Voorbelasting</span><i style="width:46%"></i></div>
    <div class="vig__bar"><span>Aangifte voorbereid, klaar om te controleren</span><i></i></div>`,
  boekt_schil:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Gekoppeld</div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>eBoekhouden.nl</span><b class="vig__pill">verbonden</b></div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>SnelStart</span><b class="vig__pill">verbonden</b></div>
    <div class="vig__insight"><span class="vig__spark">◆</span> Jij werkt in Emma. Je cijfers blijven <b>op hun plek</b></div>`,
  waakt_doel:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Omzet vs. doel</div>
    <div class="vig__chart"><i style="height:44%"></i><i style="height:58%"></i><i style="height:50%"></i><i style="height:71%"></i><i style="height:63%"></i><i style="height:84%"></i></div>
    <div class="vig__insight"><span class="vig__spark">◆</span> Je loopt iets achter op je doel. <b>Drie acties</b> voor deze week</div>`,
  waakt_prognose:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Prognose dit kwartaal</div>
    <div class="vig__pay"><span>Deze maand</span><i></i></div>
    <div class="vig__pay"><span>Verwacht</span><i style="width:62%"></i></div>
    <div class="vig__pay"><span>Doel</span><i style="width:70%"></i></div>
    <div class="vig__insight"><span class="vig__spark">◆</span> Op basis van je <b>werkelijke cijfers</b> en het seizoen</div>`,
  waakt_signaal:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Deze week</div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Omzet op koers</span><b class="vig__pill">+ doel</b></div>
    <div class="vig__li vig__li--soft"><span class="vig__scan"></span><span>Kosten lopen op</span><b class="vig__pill vig__pill--w">let op</b></div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Marge stabiel</span><b class="vig__pill">rustig</b></div>`,
  loont_strook:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Loonstrook</div>
    <div class="vig__pay"><span>Brutoloon</span><i></i></div>
    <div class="vig__pay"><span>Werkgeverslasten</span><i style="width:54%"></i></div>
    <div class="vig__pay"><span>Vakantiegeld · pro rata</span><i style="width:30%"></i></div>
    <div class="vig__li" style="margin-top:12px"><span class="vig__tick">✓</span><span>Loonstrook · PDF</span><b class="vig__pill">klaar</b></div>`,
  loont_contract:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Contract</div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Arbeidsovereenkomst</span><b class="vig__pill">opgesteld</b></div>
    <div class="vig__li vig__li--soft"><span class="vig__scan"></span><span>Digitale ondertekening</span><b class="vig__pill vig__pill--w">verstuurd</b></div>
    <div class="vig__insight"><span class="vig__spark">◆</span> Met de <b>CAO van jouw branche</b> als basis</div>`,
  loont_verlof:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Verlof &amp; verzuim</div>
    <div class="vig__pay"><span>Opgenomen</span><i style="width:40%"></i></div>
    <div class="vig__pay"><span>Resterend saldo</span><i style="width:60%"></i></div>
    <div class="vig__li" style="margin-top:12px"><span class="vig__tick">✓</span><span>Saldo automatisch bijgewerkt</span></div>`,
  vindt_pipeline:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Pipeline</div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Kandidaat · in de buurt</span><b class="vig__pill">match</b></div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Lead · binnen 25 km</span><b class="vig__pill">gesprek</b></div>
    <div class="vig__li vig__li--soft"><span class="vig__scan"></span><span>Nieuw profiel gevonden</span><b class="vig__pill vig__pill--w">scoren…</b></div>`,
  vindt_score:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Match-score</div>
    <div class="vig__scale"><span class="vig__band"></span><span class="vig__me" style="left:74%">deze</span><span class="vig__avg" style="left:50%"></span></div>
    <div class="vig__legend"><span><i class="vig__lg vig__lg--me"></i> deze kandidaat</span><span><i class="vig__lg"></i> gemiddelde</span></div>
    <div class="vig__li" style="margin-top:6px"><span class="vig__tick">✓</span><span>Past bij je vacature</span></div>`,
  vindt_klant:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Klanten ontdekken</div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Bedrijf · jouw werkgebied</span><b class="vig__pill">lead</b></div>
    <div class="vig__insight"><span class="vig__spark">◆</span> Gevonden op <b>locatie en branche</b> (SBI-code)</div>`,
  coacht_scorecard:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Scorecard · Eva</div>
    <div class="vig__pay"><span>Klanttevredenheid</span><i style="width:82%"></i></div>
    <div class="vig__pay"><span>Productverkoop</span><i style="width:54%"></i></div>
    <div class="vig__pay"><span>Stiptheid</span><i style="width:90%"></i></div>`,
  coacht_checkin:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Check-ins</div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Gesprek vorige maand</span><b class="vig__pill">vastgelegd</b></div>
    <div class="vig__li vig__li--soft"><span class="vig__scan"></span><span>Volgende check-in</span><b class="vig__pill vig__pill--w">herinnering</b></div>`,
  coacht_vraag:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Voorbereiding</div>
    <div class="vig__insight"><span class="vig__spark">◆</span> Suggestie: <b>vraag naar productverkoop</b>, die liep terug</div>
    <div class="vig__li" style="margin-top:8px"><span class="vig__tick">✓</span><span>Op basis van je eigen cijfers</span></div>`,
  ziet_prijs:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Jouw prijs vs. de markt</div>
    <div class="vig__scale"><span class="vig__band"></span><span class="vig__me" style="left:58%">jij</span><span class="vig__avg" style="left:50%"></span></div>
    <div class="vig__legend"><span><i class="vig__lg vig__lg--me"></i> jouw tarief</span><span><i class="vig__lg"></i> gemiddelde in de buurt</span></div>`,
  ziet_review:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Reviews</div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Jouw reviewscore</span><b class="vig__pill">sterk</b></div>
    <div class="vig__insight"><span class="vig__spark">◆</span> Veel genoemd: <b>vriendelijkheid</b> en <b>resultaat</b></div>`,
  ziet_concurrent:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> In de buurt</div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Concurrenten in kaart</span><b class="vig__pill">2 km</b></div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Maandelijkse update</span><b class="vig__pill">rustig</b></div>`,
  schrijft_kanban:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Contentplanner</div>
    <div class="vig__kan">
      <div class="vig__col"><span class="vig__colh">Idee</span><i></i><i style="width:70%"></i></div>
      <div class="vig__col"><span class="vig__colh">Concept</span><i style="background:var(--sc);opacity:.9"></i><i style="width:60%"></i></div>
      <div class="vig__col"><span class="vig__colh">Gepland</span><i style="width:80%"></i></div>
    </div>`,
  schrijft_kanalen:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Klaar om te plannen</div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Blog · WordPress</span><b class="vig__pill">concept</b></div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Social · Instagram</span><b class="vig__pill">gepland</b></div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>E-mail · Mailchimp</span><b class="vig__pill">klaar</b></div>`,
  schrijft_stem:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Jouw stem</div>
    <div class="vig__insight"><span class="vig__spark">◆</span> Geschreven in de <b>toon van je bedrijf</b>, jij doet de eindredactie</div>
    <div class="vig__li" style="margin-top:8px"><span class="vig__tick">✓</span><span>SEO op je keywords</span></div>`,
  promoot_kanalen:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Advertenties</div>
    <div class="vig__pay"><span>Google Ads</span><i style="width:74%"></i></div>
    <div class="vig__pay"><span>Meta Ads</span><i style="width:48%"></i></div>
    <div class="vig__insight"><span class="vig__spark">◆</span> Eén overzicht, <b>alle kanalen</b></div>`,
  promoot_attributie:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Wat levert het op?</div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Toegerekend aan omzet</span><b class="vig__pill">per dienst</b></div>
    <div class="vig__insight"><span class="vig__spark">◆</span> Zie welke euro <b>écht</b> iets oplevert</div>`,
  promoot_budget:`
    <div class="vig__row vig__row--head"><span class="vig__dot"></span> Budgetadvies</div>
    <div class="vig__pay"><span>Nu</span><i style="width:50%"></i></div>
    <div class="vig__pay"><span>Voorstel</span><i style="width:68%"></i></div>
    <div class="vig__li" style="margin-top:12px"><span class="vig__tick">✓</span><span>Gekoppeld aan je cijfers in EmmaWaakt</span></div>`,
};
