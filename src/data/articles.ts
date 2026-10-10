export type ArticleBlock =
  | { t: 'p'; v: string }
  | { t: 'h2'; v: string }
  | { t: 'h3'; v: string }
  | { t: 'pull'; v: string }
  | { t: 'note'; v: string }
  | { t: 'ul'; v: string[] };

export type Article = {
  slug: string;
  cat: string;
  accent: string;
  /** Sleutel uit ICONS (src/data/modules.ts). Elke modulesleutel mag. */
  glyph: 'boekt' | 'waakt' | 'loont' | 'vindt' | 'coacht' | 'ziet' | 'schrijft' | 'promoot';
  title: string;
  dek: string;
  date: string;
  read: string;
  /** Coverbeeld in /public/kennisbank/. Ontbreekt het bestand, dan valt de kaart
   *  terug op het gekleurde vlak met glyph-watermerk. */
  image?: string;
  author: string;
  featured?: boolean;
  /** Voorbereiding op de latere blog/kennisbank-splitsing. Nu nog geen filter
   *  actief: /kennisbank toont alle artikelen ongeacht deze waarde.
   *  'kennisbank' = uitleg over hoe iets werkt, tijdloos.
   *  'blog' = verhaal over Emma zelf (herkomst, keuzes, voortgang). */
  section: 'blog' | 'kennisbank';
  body: ArticleBlock[];
};

/** SEO-<title> per artikel. Mikt op één long-tail vraag per artikel; los van de
 *  zichtbare H1. Gebruikt in generateMetadata van kennisbank/[slug]/page.tsx,
 *  met de bestaande titel als fallback. */
export const ARTICLE_SEO_TITLE: Record<string, string> = {
  'hoe-we-emma-bouwen': 'Hoe Emma ontstond in een kapsalon in Heeten · Emma',
  'grip-op-je-cijfers': 'Grip op je cijfers als ondernemer begint met rust · Emma',
  'bonnen-en-facturen-inboeken': 'Bonnetjes inboeken zonder zelf te typen · Emma',
  'weten-wat-de-buurt-vraagt': 'Wat vragen je concurrenten in de buurt? · Emma',
  'loon-zonder-loonbureau': 'Loonstroken draaien zonder loonbureau · Emma',
  'tips-per-branche': "3 administratietips voor elke zzp'er en salon · Emma",
  'emmastudio-voor-motorvoertuigen-en-tweewielers': 'Loonadministratie voor je garage of tweewielerbedrijf · Emma',
  'emmastudio-voor-horeca': 'Loonadministratie voor je horecazaak, met de cao erbij · Emma',
  'emmastudio-voor-kappers': 'Loonadministratie voor je kapsalon, met de kappers-cao erbij · Emma',
  'personeel-vinden-zonder-vacaturebank': 'Personeel vinden in de buurt zonder vacaturebank · Emma',
  'emmastudio-voor-technisch-installatiebedrijf': 'Wat kost een monteur echt? Loonadministratie voor installateurs · Emma',
  'emmastudio-voor-schilders': 'Loonadministratie voor je schildersbedrijf, in uurloon · Emma',
  'emmastudio-voor-huisartsenzorg': 'Loonadministratie voor de huisartsenpraktijk · Emma',
  'emmastudio-voor-carrosserie': 'Loonadministratie voor het schadeherstelbedrijf · Emma',
  'emmastudio-voor-metaalbewerking': 'Je eerste medewerker in de metaal, stap voor stap · Emma',
  'emmastudio-voor-isolatie': 'Loonadministratie voor het isolatiebedrijf · Emma',
  'emmastudio-voor-goud-en-zilvernijverheid': 'Loonadministratie voor goudsmeden en zilversmeden · Emma',
};

/** Contextuele interne links van artikel naar modulepagina's: stuurt autoriteit
 *  naar de transactionele pagina's. Beschrijvende anchors, gerenderd als
 *  prose-alinea onder de artikeltekst. */
export const ARTICLE_RELATED: Record<string, { lead: string; links: { href: string; anchor: string }[] }> = {
  'hoe-we-emma-bouwen': { lead: 'Verder lezen:', links: [
    { href: '/modules', anchor: 'de acht modules van Emma' },
    { href: '/modules/boekt', anchor: 'EmmaBoekt, de schil om je boekhouding' },
    { href: '/over', anchor: 'wie er achter Emma zit' },
  ] },
  'grip-op-je-cijfers': { lead: 'Meer weten? Bekijk', links: [
    { href: '/modules/waakt', anchor: 'EmmaWaakt om je cijfers wekelijks te volgen' },
    { href: '/modules/boekt', anchor: 'EmmaBoekt als bron voor die cijfers' },
    { href: '/vergelijk', anchor: 'de vergelijking met een eigen spreadsheet' },
  ] },
  'bonnen-en-facturen-inboeken': { lead: 'Zo werkt dit in', links: [
    { href: '/modules/boekt', anchor: 'EmmaBoekt, de schil om e-Boekhouden.nl' },
    { href: '/modules/waakt', anchor: 'EmmaWaakt, dat op die boekingen meeleest' },
    { href: '/veiligheid', anchor: 'hoe we met je gegevens omgaan' },
  ] },
  'weten-wat-de-buurt-vraagt': { lead: 'Dit zit in', links: [
    { href: '/modules/ziet', anchor: 'EmmaZiet, je markt in beeld' },
    { href: '/modules/vindt', anchor: 'EmmaVindt om personeel in dezelfde regio te werven' },
    { href: '/modules/waakt', anchor: 'EmmaWaakt, waar je marktpositie terugkomt' },
  ] },
  'loon-zonder-loonbureau': { lead: 'Meer hierover:', links: [
    { href: '/modules/loont', anchor: 'EmmaLoont, je personeelsadministratie' },
    { href: '/modules/boekt', anchor: 'EmmaBoekt, waar de loonjournaalpost landt' },
    { href: '/modules/vindt', anchor: 'EmmaVindt om nieuw personeel te vinden' },
  ] },
  'tips-per-branche': { lead: 'Zo pakt Emma dit aan met', links: [
    { href: '/modules/boekt', anchor: 'EmmaBoekt voor je dagelijkse boekhouding' },
    { href: '/modules/waakt', anchor: 'EmmaWaakt voor grip op je cijfers' },
    { href: '/pakketten', anchor: 'een pakket voor jouw branche' },
  ] },
  'emmastudio-voor-motorvoertuigen-en-tweewielers': { lead: 'Meer hierover:', links: [
    { href: '/modules/loont', anchor: 'EmmaLoont, je personeelsadministratie' },
    { href: '/modules/boekt', anchor: 'EmmaBoekt, waar de loonjournaalpost landt' },
    { href: '/vergelijk', anchor: 'wat EmmaLoont kost naast een loonbureau' },
  ] },
  'emmastudio-voor-horeca': { lead: 'Meer hierover:', links: [
    { href: '/modules/loont', anchor: 'EmmaLoont, je personeelsadministratie' },
    { href: '/modules/ziet', anchor: 'EmmaZiet, je markt en concurrenten in beeld' },
    { href: '/vergelijk', anchor: 'wat EmmaLoont kost naast een loonbureau' },
  ] },
  'emmastudio-voor-kappers': { lead: 'Meer hierover:', links: [
    { href: '/modules/loont', anchor: 'EmmaLoont, je personeelsadministratie' },
    { href: '/pakketten', anchor: 'Emma voor Salons, het complete pakket' },
    { href: '/modules/vindt', anchor: 'EmmaVindt om een nieuwe kapper te vinden' },
  ] },
  'personeel-vinden-zonder-vacaturebank': { lead: 'Meer hierover:', links: [
    { href: '/modules/vindt', anchor: 'EmmaVindt, personeelswerving in je regio' },
    { href: '/modules/loont', anchor: 'EmmaLoont, waar je nieuwe kracht daarna in komt' },
    { href: '/vergelijk', anchor: 'wat EmmaVindt kost naast een bureau' },
  ] },
  'emmastudio-voor-technisch-installatiebedrijf': { lead: 'Meer hierover:', links: [
    { href: '/modules/loont', anchor: 'EmmaLoont, je personeelsadministratie' },
    { href: '/pakketten', anchor: 'Emma voor Installateurs, het pakket in opbouw' },
    { href: '/vergelijk', anchor: 'wat EmmaLoont kost naast een loonbureau' },
  ] },
  'emmastudio-voor-schilders': { lead: 'Meer hierover:', links: [
    { href: '/modules/loont', anchor: 'EmmaLoont, je personeelsadministratie' },
    { href: '/modules/boekt', anchor: 'EmmaBoekt, waar de loonjournaalpost landt' },
    { href: '/vergelijk', anchor: 'wat EmmaLoont kost naast een loonbureau' },
  ] },
  'emmastudio-voor-huisartsenzorg': { lead: 'Meer hierover:', links: [
    { href: '/modules/loont', anchor: 'EmmaLoont, je personeelsadministratie' },
    { href: '/modules/waakt', anchor: 'EmmaWaakt voor grip op de praktijkcijfers' },
    { href: '/veiligheid', anchor: 'hoe we met gegevens omgaan' },
  ] },
  'emmastudio-voor-carrosserie': { lead: 'Meer hierover:', links: [
    { href: '/modules/loont', anchor: 'EmmaLoont, je personeelsadministratie' },
    { href: '/modules/boekt', anchor: 'EmmaBoekt voor je dagelijkse boekhouding' },
    { href: '/vergelijk', anchor: 'wat EmmaLoont kost naast een loonbureau' },
  ] },
  'emmastudio-voor-metaalbewerking': { lead: 'Meer hierover:', links: [
    { href: '/modules/loont', anchor: 'EmmaLoont, je personeelsadministratie' },
    { href: '/modules/vindt', anchor: 'EmmaVindt om vakmensen in de buurt te vinden' },
    { href: '/vergelijk', anchor: 'wat EmmaLoont kost naast een loonbureau' },
  ] },
  'emmastudio-voor-isolatie': { lead: 'Meer hierover:', links: [
    { href: '/modules/loont', anchor: 'EmmaLoont, je personeelsadministratie' },
    { href: '/modules/waakt', anchor: 'EmmaWaakt voor grip op je cijfers' },
    { href: '/vergelijk', anchor: 'wat EmmaLoont kost naast een loonbureau' },
  ] },
  'emmastudio-voor-goud-en-zilvernijverheid': { lead: 'Meer hierover:', links: [
    { href: '/modules/loont', anchor: 'EmmaLoont, je personeelsadministratie' },
    { href: '/modules/ziet', anchor: 'EmmaZiet, je markt en concurrenten in beeld' },
    { href: '/vergelijk', anchor: 'wat EmmaLoont kost naast een loonbureau' },
  ] },
};

const MAANDEN = ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'];

/** "19 juni 2026" omzetten naar een sorteerbaar getal (20260619).
 *  De datum staat als leesbare Nederlandse tekst in de data, want die tekst wordt
 *  ook getoond. Zonder deze sleutel zou de volgorde op de pagina de volgorde van
 *  de array zijn, en die zegt niets over hoe recent een artikel is.
 *
 *  Waarom dit een fout gooit en geen 0 teruggeeft: bij 0 zakt het artikel stil
 *  naar de onderkant. Je schrijft "15 sept 2026" in plaats van "15 september
 *  2026", je publiceert, en je nieuwste stuk verschijnt nergens bovenaan zonder
 *  dat iets je waarschuwt. Deze pagina's worden bij de build gegenereerd, dus een
 *  fout hier breekt de build en zie je het meteen in plaats van weken later. */
export function datumSleutel(datum: string): number {
  const m = datum.trim().match(/^(\d{1,2})\s+([a-zA-Z]+)\s+(\d{4})$/);
  const maand = m ? MAANDEN.indexOf(m[2].toLowerCase()) : -1;
  if (!m || maand < 0) {
    throw new Error(
      `Onleesbare artikeldatum: "${datum}". Schrijf hem voluit als "15 september 2026" ` +
      `(dag, volledige Nederlandse maandnaam, jaar). Afkortingen als "sept" en notaties ` +
      `als "15-09-2026" worden niet herkend.`,
    );
  }
  return Number(m[3]) * 10000 + (maand + 1) * 100 + Number(m[1]);
}

/** Nieuwste eerst. Nieuwe artikelen komen hierdoor vanzelf bovenaan te staan,
 *  op /kennisbank en in de preview op de homepage. */
export function nieuwsteEerst<T extends { date: string }>(lijst: T[]): T[] {
  return [...lijst].sort((a, b) => datumSleutel(b.date) - datumSleutel(a.date));
}

/** Sorteersleutel van vandaag, in Nederlandse tijd. De server draait op UTC;
 *  zonder tijdzone zou een artikel 's winters een of twee uur te vroeg of te
 *  laat verschijnen rond middernacht. */
export function vandaagSleutel(): number {
  const delen = new Intl.DateTimeFormat('nl-NL', {
    timeZone: 'Europe/Amsterdam', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(new Date());
  const pak = (t: string) => Number(delen.find(p => p.type === t)?.value ?? 0);
  return pak('year') * 10000 + pak('month') * 100 + pak('day');
}

/** Alleen artikelen waarvan de publicatiedatum is aangebroken. Een artikel met
 *  een datum in de toekomst staat klaar in de code maar is nergens zichtbaar:
 *  niet in de lijst, niet op de homepage, niet in de sitemap, niet voor de
 *  chatbot, en zijn eigen URL geeft 404 tot de dag zelf. De pagina's die dit
 *  gebruiken hebben een `revalidate`, zodat publiceren vanzelf gebeurt zonder
 *  nieuwe deploy. */
export function gepubliceerd<T extends { date: string }>(lijst: T[]): T[] {
  const vandaag = vandaagSleutel();
  return lijst.filter(a => datumSleutel(a.date) <= vandaag);
}

export const ARTICLES: Article[] = [
  {
    slug: 'hoe-we-emma-bouwen',
    cat: 'Achter de schermen',
    accent: '#9C4456',
    glyph: 'schrijft',
    section: 'blog',
    title: 'Hoe Emma ontstond in een kapsalon in Heeten',
    dek: 'Emma is niet op een whiteboard bedacht. Ze begon als gereedschap voor één salon, en groeide uit tot software voor ondernemers die de randzaken er zelf bij doen.',
    date: '8 augustus 2026',
    read: '4 min',
    image: '/kennisbank/hoe-we-emma-bouwen.jpg',
    author: 'Het team van Emma',
    featured: true,
    body: [
      { t: 'p', v: 'De eerlijkste manier om over Emma te praten is bij het begin beginnen. Emma is geen idee dat we bedachten en daarna aan ondernemers probeerden te verkopen. Het is precies andersom gegaan.' },
      { t: 'h2', v: 'Het begon bij één salon' },
      { t: 'p', v: 'Blondes Incognito is de kapsalon van Ilze Spannenberg in Heeten. Zoals de meeste ondernemers deed ze de zaak erbij: de omzet in een spreadsheet, de concurrentie in haar hoofd, het personeel op gevoel, de marketing als er tijd over was. Er was niets mis met hoe ze het deed. Het kostte alleen elke week avonden.' },
      { t: 'p', v: 'Eind 2024 bouwden we voor haar een tool met vier overzichten: hoe staat de zaak ervoor, wat doet de markt, hoe gaat het met het team, en wat levert de marketing op. Geen pilot, geen proefopstelling. Gewoon iets dat dagelijks gebruikt werd, met echte cijfers uit de kassa, de boekhouding en Google.' },
      { t: 'pull', v: 'We bouwen niet wat we denken dat ondernemers nodig hebben. We bouwen wat er in een echte zaak al werkte.' },
      { t: 'h2', v: 'Van vier overzichten naar acht modules' },
      { t: 'p', v: 'Toen we gingen kijken of dit voor meer ondernemers bruikbaar was, viel iets op. Dit waren geen vier onderdelen van één product. Het waren losse stukken werk die ondernemers los of gebundeld willen afnemen. Een zzp\'er zonder personeel heeft niets aan een loonadministratie. Een praktijk met acht mensen heeft er alles aan.' },
      { t: 'p', v: 'Zo werden de vier overzichten zeven modules. Daar kwam er een achtste bij, en die had een andere aanleiding: onze eigen ergernis. Boekhoudpakketten zijn krachtig, maar onvriendelijk in dagelijks gebruik. Zes klikken om een factuur te maken die je in twintig seconden had kunnen versturen. EmmaBoekt is de enige module die niet uit de salon komt maar uit die frustratie.' },
      { t: 'h2', v: 'Waarom het opnieuw gebouwd moest worden' },
      { t: 'p', v: 'Iets dat werkt voor één salon is nog geen platform voor iedereen. De eerste versie kende maar één klant, dus er zat nergens een grens in: geen scheiding tussen bedrijven, geen rollen, geen manier om een onderdeel aan of uit te zetten.' },
      { t: 'p', v: 'Dat kun je er niet later bij plakken. Als de scheiding tussen klanten niet vanaf de eerste regel in het fundament zit, lekt op enig moment de omzet van de een naar de ander. Het is de duurste fout om achteraf te herstellen. Dus is de bewezen werkwijze overgenomen en de fundering opnieuw gebouwd, met die grenzen erin.' },
      { t: 'h2', v: 'Voor wie Emma bedoeld is' },
      { t: 'p', v: 'Voor de ondernemer die de randzaken er zelf bij doet en er niet vrolijk van wordt. Zzp\'ers, en kleine bedrijven tot ongeveer tien medewerkers: salons, zorgpraktijken, dienstverleners. Mensen die geen controller in dienst hebben en geen bureau willen inhuren, maar wel willen weten waar ze staan.' },
      { t: 'p', v: 'Niet voor grote organisaties met een eigen financiële afdeling. Wie met Exact werkt en een boekhouder in dienst heeft, heeft Emma niet nodig. Dat is geen bescheidenheid, het is afbakening: software die voor iedereen bedoeld is, past uiteindelijk niemand.' },
      { t: 'h2', v: 'Een schil, geen kooi' },
      { t: 'p', v: 'Een principe waar we niet vanaf wijken: waar Emma bovenop een bestaand systeem werkt, blijft dat systeem de baas. Je boekhouding leeft in e-Boekhouden.nl, niet in Emma. Alles wat je bij ons doet, landt daar. Stop je met Emma, dan ben je niets kwijt.' },
      { t: 'p', v: 'Dat maakt de keuze om te beginnen kleiner, en dat is precies de bedoeling. Je hoeft niet te migreren, niets over te zetten en je accountant houdt gewoon toegang.' },
      { t: 'h2', v: 'Waar het vandaag staat' },
      { t: 'p', v: 'Vijf van de acht modules zijn er en zijn te gebruiken: de boekhoudschil, het financiële overzicht, de marktverkenner, de personeelszoeker en de loonadministratie. Drie zijn er nog niet: coaching, content en adverteren. Die staan op de planning, zonder datum, want een gemiste datum kost meer vertrouwen dan geen datum.' },
      { t: 'p', v: 'En omdat eerlijkheid twee kanten op werkt, ook de grenzen: Emma bereidt je btw-aangifte niet voor, en de loonaangifte bij de Belastingdienst blijft bij jou of je kantoor. Als je die twee dingen zoekt, weet je het nu voordat je begint in plaats van erna.' },
      { t: 'note', v: '<b>Wat het kost:</b> je betaalt per module, vanaf €9 per maand exclusief btw. Elke module begint met 14 dagen gratis en je kunt maandelijks opzeggen. Je betaalgegevens vul je meteen in, maar er wordt pas op dag 15 iets afgeschreven. Je neemt alleen wat je gebruikt.' },
      { t: 'p', v: 'Het blijft een raar startpunt voor software: één kapsalon in Overijssel. Maar het is wel de reden dat de vragen die Emma stelt de vragen zijn die een ondernemer herkent, en niet de vragen die een boekhoudpakket handig vindt.' },
    ],
  },
  {
    slug: 'grip-op-je-cijfers',
    cat: 'Grip op cijfers',
    accent: '#44857C',
    glyph: 'waakt',
    section: 'kennisbank',
    title: 'Waarom grip op je cijfers begint met rust',
    dek: 'De meeste ondernemers weten pas hoe het écht gaat als de cijfers van de accountant binnen zijn. Dat kan anders, en rustiger.',
    date: '28 mei 2026',
    read: '3 min',
    image: '/kennisbank/grip-op-je-cijfers.jpg',
    author: 'Het team van Emma',
    body: [
      { t: 'p', v: 'Vraag een ondernemer hoe het met de zaak gaat en je krijgt vaak een gevoel terug, geen getal. Druk, rustig, het loopt wel. Dat gevoel klopt meestal aardig. Maar het is geen sturing, en zeker geen rust.' },
      { t: 'p', v: 'Ilze van salon Blondes Incognito, de ondernemer waar Emma begon, vatte het mooi samen. Ze wil gewoon lekker kunnen knippen. Niet omdat cijfers haar niet interesseren, maar omdat ze er niet elke avond voor in een spreadsheet wil duiken. Ze wil weten hoe haar salon en haar team het doen ten opzichte van haar doelen, en daar klaar mee zijn.' },
      { t: 'pull', v: 'Grip is niet meer data. Grip is de juiste data, op het juiste moment, zonder dat je ervoor hoeft te graven.' },
      { t: 'h2', v: 'Het verschil tussen weten en zoeken' },
      { t: 'p', v: 'Veel software geeft je toegang tot alles. Elke transactie, elke marge, elke trend, als je maar de juiste schermen weet te vinden en de tijd hebt om te kijken. In de praktijk doet bijna niemand dat. Niet omdat ze lui zijn, maar omdat de dag vol zit met het echte werk.' },
      { t: 'p', v: 'Grip ontstaat pas als de cijfers naar jou toe komen in plaats van andersom. Een rustig signaal dat je productverkoop iets achterloopt op je doel. Een seintje dat een dienst structureel onder je marge zit. Geen alarmbellen, geen dashboard vol rode getallen, maar een korte observatie en een suggestie die je zelf kunt wegen.' },
      { t: 'p', v: 'Daarom staan er op je overzicht nooit meer dan acht signalen, gesorteerd op wat het meest urgent is. Neem je later een module erbij, dan wordt die lijst niet langer. Hij wordt scherper.' },
      { t: 'h2', v: 'Drie vragen die je altijd zou moeten kunnen beantwoorden' },
      { t: 'ul', v: [
        'Hoe sta ik er deze maand voor ten opzichte van mijn doel?',
        'Welke kosten lopen op, en wat houd ik onderaan de streep over?',
        'Wat zou ik deze week kunnen doen om bij te sturen?',
      ] },
      { t: 'p', v: 'Als je deze drie vragen op elk moment kunt beantwoorden zonder eerst een avond te reserveren, heb je grip. Dat is precies waar Emma op mikt. Niet om jou tot data-analist te maken, maar om de antwoorden binnen handbereik te leggen zodat je een beslissing kunt nemen en weer verder kunt.' },
      { t: 'h2', v: 'En als je geen koppeling hebt?' },
      { t: 'p', v: 'Veel ondernemers denken dat zoiets pas kan als hun boekhouding aan een systeem hangt. Dat hoeft niet. Heb je EmmaBoekt, dan komen je cijfers vanzelf binnen. Heb je die niet, dan upload je een omzet- en kostenoverzicht uit je eigen kassa- of boekhoudsysteem. Emma leest het uit, jij controleert het, en daarna werkt je overzicht precies hetzelfde.' },
      { t: 'p', v: 'Eén eis: de bedragen moeten zonder btw zijn. Staan ze inclusief, dan weigert Emma het bestand in plaats van te gokken. Terugrekenen met verschillende tarieven door elkaar levert cijfers op die er goed uitzien en niet kloppen, en dat is erger dan geen cijfers.' },
      { t: 'note', v: '<b>Een lege plek is geen fout.</b> Zie je ergens geen getal staan, dan is er geen bron voor. Emma vult zoiets nooit in met een schatting of een nul. Liever een eerlijke lege plek dan een getal waar je op stuurt terwijl het nergens op slaat.' },
      { t: 'h2', v: 'Of je vraagt het gewoon' },
      { t: 'p', v: 'Wil je iets weten dat niet op je overzicht staat, dan hoef je niet te zoeken. Met Vraag Emma, de knop bovenin de app of de sneltoets Ctrl+K, stel je een vraag over je eigen administratie, bijvoorbeeld wie er nog niet heeft betaald. Het antwoord komt uit je eigen gegevens, met de bron erbij en een link naar het scherm waar je het zelf kunt nakijken.' },
      { t: 'p', v: 'Rust en grip lijken tegenpolen, maar ze horen bij elkaar. Je krijgt pas rust als je weet dat je het ziet wanneer het ertoe doet. En je houdt pas grip als het kijken je geen energie kost.' },
    ],
  },
  {
    slug: 'bonnen-en-facturen-inboeken',
    cat: 'Boekhouding',
    accent: '#2F7A6E',
    glyph: 'boekt',
    section: 'kennisbank',
    title: 'Bonnetjes inboeken zonder zelf te typen',
    dek: 'Emma leest je inkomende facturen, stelt de boeking voor en legt uit waarom. Jij bevestigt. Zo werkt dat, en zo bewust is dat gebouwd.',
    date: '19 juni 2026',
    read: '3 min',
    image: '/kennisbank/bonnen-en-facturen-inboeken.jpg',
    author: 'Het team van Emma',
    body: [
      { t: 'p', v: 'Inkomende facturen verwerken is het werk waar niemand voor kiest. Een stapel bonnen, een pakket dat om een grootboekrekening vraagt, en de vage twijfel of je die tankbeurt vorige maand ook zo geboekt hebt.' },
      { t: 'h2', v: 'Vier stappen, en één ervan is van jou' },
      { t: 'p', v: 'Je sleept een PDF of een foto in je inbox. Emma leest wie de leverancier is, wat het bedrag is, welke btw erop zit en wat de datum is. Daarna stelt ze een grootboekrekening voor, met de reden erbij: meestal omdat je die leverancier eerder zo geboekt hebt.' },
      { t: 'p', v: 'Dan komt de stap die veel software overslaat. Voordat er iets in je boekhouding belandt, kun je eerst laten zien wat de boeking zou worden. Een droogloop. Klopt het, dan bevestig je. Klopt het niet, dan pas je het aan.' },
      { t: 'pull', v: 'Emma stelt voor, jij bevestigt. Er wordt nooit iets automatisch geboekt.' },
      { t: 'h2', v: 'Waarom niet gewoon automatisch?' },
      { t: 'p', v: 'Omdat het jouw boekhouding is en jij ervoor tekent. Automatisch boeken gaat prima tot het misgaat, en dan zit de fout drie maanden diep in je administratie voordat iemand hem ziet. Terugdraaien kost meer tijd dan het bevestigen ooit heeft bespaard.' },
      { t: 'p', v: 'Er zit ook een praktische kant aan. Emma herkent een bekende leverancier goed, een onbekende redelijk, en een factuur die afwijkt van je gewoonte minder goed. Juist bij die laatste wil je zelf even kijken. Bevestigen is één klik; corrigeren is een keuze die je alleen maakt als het nodig is.' },
      { t: 'h2', v: 'Waar je bon daarna blijft' },
      { t: 'p', v: 'De boeking gaat naar je boekhoudpakket, en de bon zelf naar je digitale archief. Dat laatste loopt via een omweg: e-Boekhouden.nl heeft geen manier om via de koppeling een PDF mee te sturen. Dat hebben we uitgezocht en het bestaat simpelweg niet. Dus stuurt Emma je bon naar het archiefadres van je eigen administratie, waar hij wordt bewaard zonder opnieuw geboekt te worden.' },
      { t: 'p', v: 'Het is een omweg, en we vertellen hem liever dan dat je er zelf achter komt.' },
      { t: 'h2', v: 'Facturen in een andere valuta' },
      { t: 'p', v: 'Krijg je een factuur in dollars of ponden, dan rekent Emma die om naar euro tegen de koers van de factuurdatum. De originele valuta en de gebruikte koers blijven in de omschrijving staan, zodat je later kunt zien hoe het bedrag tot stand kwam. Dat moet ook zo: de Belastingdienst wil je boekhouding in euro\'s, en boekhoudpakketten accepteren niets anders.' },
      { t: 'note', v: '<b>Waar de grens ligt:</b> EmmaBoekt werkt op dit moment met e-Boekhouden.nl. SnelStart en Moneybird staan op de planning zonder datum. En Emma bereidt je btw-aangifte niet voor: die doe je in je eigen pakket of via je boekhouder, zoals je gewend bent.' },
      { t: 'p', v: 'Wat je wint is niet dat de boekhouding verdwijnt. Wat je wint is dat je er niet meer voor hoeft in te loggen, na te denken over de juiste rekening, of te zoeken waar je die bon ook alweer gelaten hebt.' },
    ],
  },
  {
    slug: 'loon-zonder-loonbureau',
    cat: 'Personeel',
    accent: '#40548F',
    glyph: 'loont',
    section: 'kennisbank',
    title: 'Loonstroken draaien zonder loonbureau: wat wel en niet kan',
    dek: 'Een loonbureau kost al snel honderd euro per maand of meer. Wat je daarvan zelf kunt doen, en waar de grens ligt die je moet kennen voordat je begint.',
    date: '5 augustus 2026',
    read: '3 min',
    image: '/kennisbank/loon-zonder-loonbureau.jpg',
    author: 'Het team van Emma',
    body: [
      { t: 'p', v: 'Zodra je één medewerker in dienst neemt, verandert je administratie. Loon berekenen, premies afdragen, een loonstrook maken, verlof bijhouden, en dat elke maand opnieuw. De meeste kleine ondernemers besteden dat uit, en betalen daar honderd tot driehonderd euro per maand voor.' },
      { t: 'p', v: 'Een deel van dat werk is rekenwerk dat software prima kan. Een ander deel niet. Het verschil kennen scheelt je geld, en voorkomt dat je halverwege ontdekt dat je iets zelf moet doen.' },
      { t: 'h2', v: 'Drie handelingen die vaak op één hoop gaan' },
      { t: 'p', v: 'Als mensen zeggen "mijn loonadministratie", bedoelen ze eigenlijk drie dingen die technisch los van elkaar staan.' },
      { t: 'ul', v: [
        'Het loon berekenen en de loonstrook maken. Dat is rekenwerk op basis van je cao, het contract en de premies.',
        'De loonkosten in je boekhouding zetten. Dat is één boeking per maand: brutoloon, werkgeverslasten, af te dragen heffingen.',
        'De loonaangifte bij de Belastingdienst. Dat is de afdracht zelf, via een aparte gecertificeerde koppeling.',
      ] },
      { t: 'p', v: 'Emma doet de eerste twee. De derde niet.' },
      { t: 'pull', v: 'EmmaLoont rekent, maakt de strook en boekt. De aangifte doe je zelf of laat je bij je kantoor.' },
      { t: 'h2', v: 'Waarom die aangifte er niet in zit' },
      { t: 'p', v: 'Aangifte doen bij de Belastingdienst vraagt een gecertificeerde verbinding. Dat is geen knop die je even bouwt. Zolang die er niet is, zeggen we dat, want dit is precies het soort detail waar je in maand twee achter komt en dan boos over bent.' },
      { t: 'p', v: 'De praktische kant valt mee. Heb je tien of minder werknemers, dan mag je de aangifte zelf doen via Mijn Belastingdienst Zakelijk. Veel ondernemers laten alleen dat stukje bij hun administratiekantoor liggen, wat een stuk goedkoper is dan de hele loonadministratie uitbesteden.' },
      { t: 'h2', v: 'De cao staat ernaast, niet in de weg' },
      { t: 'p', v: 'Emma leest openbare cao-loontabellen in en bewaart ze per versie. Leg je een contract vast, dan zie je de bijbehorende schaal ernaast staan. Zit je eronder, dan krijg je een waarschuwing.' },
      { t: 'p', v: 'Een waarschuwing, geen blokkade. Er zijn legitieme redenen voor een afwijkend bedrag: een andere urenbasis, een andere functie, afspraken die ouder zijn dan de laatste cao-ronde. Emma is geen poortwachter van jouw arbeidsvoorwaarden. Ze zorgt er alleen voor dat je het bewust doet in plaats van per ongeluk.' },
      { t: 'p', v: 'Volg je helemaal geen cao, dan kan dat ook. Je legt het contract dan vast zonder schaal ernaast.' },
      { t: 'h2', v: 'Wat er verder in zit' },
      { t: 'ul', v: [
        'Een proforma-loonstrook voordat iemand in dienst is, zodat je in het gesprek kunt laten zien wat hij netto overhoudt.',
        'De loonronde: voorbereiden, controleren, en de stroken als PDF naar je mensen.',
        'Verlof aanvragen en goedkeuren, ziekmeldingen in- en uitmelden, declaraties indienen en afhandelen.',
        'Een eigen inlog voor je medewerkers, waarin ze hun eigen strook zien en niets van collega\'s.',
        'De loonjournaalpost, die doorboekt naar je boekhouding of eruit komt als CSV als je EmmaBoekt niet hebt.',
      ] },
      { t: 'note', v: '<b>Ook ondertekenen gaat in Emma:</b> werkgever en medewerker zetten hun handtekening in de app, en Emma legt vast wie er wanneer tekende. Op het contract staat dan "ondertekend in Emma". Het is geen gekwalificeerde elektronische handtekening met certificaat; heb je die specifiek nodig, dan regel je die buiten Emma om.' },
      { t: 'h2', v: 'Voor wie dit uitkomt' },
      { t: 'p', v: 'Voor de ondernemer met een paar mensen in dienst die het rekenwerk kwijt wil maar de controle wil houden. Betaal je nu een bureau voor het geheel, dan is de eerlijke vergelijking niet "negentien euro tegen tweehonderd". Het is "negentien euro plus wat je kantoor rekent voor alleen de aangifte" tegen tweehonderd. Vaak scheelt dat nog steeds flink, maar reken het even door voordat je overstapt.' },
    ],
  },
  {
    slug: 'weten-wat-de-buurt-vraagt',
    cat: 'Markt',
    accent: '#6B5091',
    glyph: 'ziet',
    section: 'kennisbank',
    title: 'Weten wat de salon drie straten verderop vraagt',
    dek: 'Je concurrenten zijn openbaar: hun inschrijving, hun prijzen, hun reviews. Alleen zoekt niemand dat elke maand na. Zo doet Emma dat wel.',
    date: '10 juli 2026',
    read: '3 min',
    image: '/kennisbank/weten-wat-de-buurt-vraagt.jpg',
    author: 'Het team van Emma',
    body: [
      { t: 'p', v: 'Bijna elke lokale ondernemer heeft een globaal idee van wat de buurt vraagt. Dat idee komt uit een gesprek, een blik op een website, of een klant die iets liet vallen. Het is zelden actueel en meestal onvolledig.' },
      { t: 'p', v: 'Alles wat je zou willen weten is openbaar. Wie er in jouw vak staat ingeschreven, wat ze op hun site vragen, wat hun klanten van ze vinden. Het probleem is niet toegang. Het probleem is dat niemand daar elke maand een avond voor uittrekt.' },
      { t: 'h2', v: 'Emma doet een voorstel, jij bepaalt' },
      { t: 'p', v: 'Op basis van je eigen bedrijfsactiviteit en een straal die je zelf instelt, zoekt Emma in het openbare handelsregister wie er in jouw vak zit. In een dorp zet je die straal ruim, in de stad kan één kilometer al genoeg zijn.' },
      { t: 'p', v: 'Wat eruit komt is een lijst, geen oordeel. Jij haalt eruit wie je echte concurrent is. Een kapper twee straten verderop die alleen heren knipt, is misschien geen concurrent. Dat weet jij en Emma niet.' },
      { t: 'h2', v: 'Prijzen, en waarom er soms niets staat' },
      { t: 'p', v: 'Zet je je eigen diensten en prijzen erin, dan haalt Emma de prijzen van de websites van je concurrenten op en legt ze ernaast. Per dienst, met het verschil in procenten.' },
      { t: 'p', v: 'Maar alleen bij diensten die jij hebt gekoppeld. Emma raadt niet dat jouw "knippen dames" hetzelfde is als hun "dameskapsel plus föhnen". Zonder bevestigde koppeling zie je "nog niet gekoppeld" staan.' },
      { t: 'pull', v: 'Een gegokte vergelijking is erger dan een lege plek. Je gaat er iets mee doen.' },
      { t: 'p', v: 'En staat er op de site van een concurrent helemaal geen prijslijst, dan valt er niets te halen. Dat zegt Emma dan ook. Reken erop dat je lijst niet compleet wordt: lang niet iedereen zet zijn tarieven online, en wie dat niet doet blijft onzichtbaar op dit punt.' },
      { t: 'h2', v: 'Reviews zeggen meer dan een cijfer' },
      { t: 'p', v: 'Een gemiddelde van 4,4 vertelt je weinig. Emma haalt de Google-reviews van je concurrenten op en haalt daar de terugkerende onderwerpen uit. Gaat het steeds over wachttijd, over prijs, over hoe iemand zich behandeld voelde?' },
      { t: 'p', v: 'Daarnaast houdt ze bij of het sentiment beter of slechter wordt. Een concurrent die van 4,6 naar 4,1 zakt is interessanter dan een die al jaren op 4,2 staat. En bovenaan staat het antwoord op de vraag waar het echt om gaat: waar sta jij ertegenover.' },
      { t: 'h2', v: 'Eén keer instellen, daarna zelf' },
      { t: 'p', v: 'Elke week kijkt Emma of er iemand nieuw is in jouw gebied. Zo ja, dan hoor je het. Zo nee, dan hoor je niets. Geen wekelijkse mail met "geen wijzigingen", want dat is precies het soort bericht dat je na drie weken wegklikt zonder te lezen.' },
      { t: 'note', v: '<b>Waar dit niet voor is:</b> Emma reageert niet op reviews, onderneemt geen actie richting concurrenten en levert geen branchebrede marktrapporten. Het is lokaal en het is inzicht, geen automatische tegenzet.' },
    ],
  },
  {
    slug: 'tips-per-branche',
    cat: 'Praktijk',
    accent: '#AE8232',
    glyph: 'waakt',
    section: 'kennisbank',
    title: 'Eén ding dat elke salon, praktijk en zzp\'er morgen anders kan doen',
    dek: 'Drie gewoontes die geen software nodig hebben om te beginnen, en die je meteen iets opleveren.',
    date: '21 mei 2026',
    read: '3 min',
    image: '/kennisbank/tips-per-branche.jpg',
    author: 'Het team van Emma',
    body: [
      { t: 'p', v: 'Goede gewoontes hoeven niet groot te zijn. De ondernemers die het rustig hebben zijn vaak niet degenen die het hardst werken, maar degenen die een paar slimme dingen standaard hebben gemaakt. Hier zijn er drie, per type onderneming, en je kunt ze alle drie morgen beginnen.' },
      { t: 'h2', v: 'Voor de salon: reken één maand lang door wat een behandeling oplevert' },
      { t: 'p', v: 'Een knipbeurt van een uur en een kleuring van een uur leveren zelden hetzelfde op. Toch plannen veel salons puur op beschikbaarheid.' },
      { t: 'p', v: 'Pak een maand en zet per dienst drie dingen naast elkaar: wat je ervoor rekent, hoeveel tijd hij echt kost inclusief opruimen, en wat er aan product in gaat. Vaak blijkt één dienst structureel onder je gemiddelde te zitten. Dan hoef je hem niet te schrappen, maar wel anders te prijzen of anders in te plannen.' },
      { t: 'p', v: 'Wat je hier ontdekt, ontdek je maar één keer. Daarna weet je het.' },
      { t: 'h2', v: 'Voor de zorgpraktijk: maak van targets een gesprek van tien minuten' },
      { t: 'p', v: 'In praktijken met meerdere behandelaars verdwijnen doelen makkelijk in een overzicht dat niemand opent. Een cijfer dat je achteraf deelt, voelt als een beoordeling. Hetzelfde cijfer dat je samen bekijkt terwijl de maand nog loopt, is een gesprek.' },
      { t: 'p', v: 'Zet er een vast moment voor: één keer per maand, tien minuten per persoon, met de cijfers erbij. Niet om af te rekenen, maar om te horen waar iemand tegenaan loopt. Dat is meestal ook het moment dat je hoort wat er in de praktijk niet werkt.' },
      { t: 'h2', v: 'Voor de zzp\'er: geef je regelwerk een vast dagdeel' },
      { t: 'p', v: 'Het zwaarste aan zelfstandig werken is dat alles door elkaar loopt. Klantwerk, facturen, acquisitie, administratie. Elk van die dingen kost je op zichzelf weinig tijd; het schakelen ertussen kost je de dag.' },
      { t: 'p', v: 'Blok één dagdeel per week voor het regelwerk en bescherm de rest voor het werk waar je voor betaald wordt. Verstuur je facturen op dat moment, niet als het je toevallig invalt. Klanten betalen niet sneller omdat je op dinsdagavond factureerde, maar jij slaapt er wel beter van.' },
      { t: 'pull', v: 'De beste systemen voelen niet als systemen. Ze zijn gewoon hoe je het doet.' },
      { t: 'h2', v: 'Wat deze drie gemeen hebben' },
      { t: 'p', v: 'Geen van drieën vraagt software om te beginnen. Ze vragen aandacht, en dat is precies waarom ze het vaakst blijven liggen: er is nooit een moment waarop ze urgent worden.' },
      { t: 'p', v: 'Zodra je ze te pakken hebt, is het wel prettig als iets ze voor je bijhoudt. Dat je niet elke maand opnieuw hoeft uit te rekenen wat een dienst oplevert, en dat het je opvalt als het verschuift. Daar is Emma voor, maar begin gerust zonder.' },
      { t: 'note', v: '<b>Zelf doorrekenen?</b> De uitkomst van stap één zet je om in doelen: EmmaWaakt volgt je omzet, marge en kosten tegen die doelen en geeft een signaal als er iets afwijkt. Vanaf €9 per maand, 14 dagen gratis te proberen.' },
    ],
  },
  {
    slug: 'emmastudio-voor-motorvoertuigen-en-tweewielers',
    cat: 'Lancering',
    accent: '#40548F',
    glyph: 'loont',
    section: 'blog',
    title: 'EmmaStudio nu ook voor het motorvoertuigen- en tweewielerbedrijf',
    dek: 'De cao voor garages, autobedrijven en tweewielerspecialisten zit nu in EmmaLoont. Loonstroken, contracten en verlof, met de cao-schaal ernaast.',
    date: '2 september 2026',
    read: '4 min',
    image: '/kennisbank/emmastudio-voor-motorvoertuigen-en-tweewielers.jpg',
    author: 'Het team van Emma',
    body: [
      { t: 'p', v: 'Een garage draait op de brug en de planning, niet op de administratie. Toch gaat er elke maand een avond op aan lonen, contracten en verlofbriefjes. Vanaf nu kan dat anders: de cao voor het motorvoertuigen- en tweewielerbedrijf zit in EmmaLoont.' },
      { t: 'h2', v: 'Wat dat betekent' },
      { t: 'p', v: 'De loontabellen van de cao zijn volledig ingelezen en cel voor cel gecontroleerd tegen de gepubliceerde bron: 1.890 cellen, zonder één afwijking. Leg je een contract vast voor een monteur, dan staat de bijbehorende schaal er meteen naast. Zit je eronder, dan zie je dat, met een waarschuwing en niet met een blokkade. Jij bepaalt, Emma laat zien wat de cao zegt.' },
      { t: 'p', v: 'De loonronde zelf werkt zoals alles in Emma: zij bereidt voor, jij controleert, en pas daarna gaan de loonstroken als nette PDF naar je mensen.' },
      { t: 'h2', v: 'Weten wat een monteur kost voordat je ja zegt' },
      { t: 'p', v: 'Zit er iemand tegenover je die je wilt aannemen? Reken de loonstrook vooraf door met de proforma. Je ziet wat hij netto overhoudt en wat hij jou als werkgever echt kost, inclusief werkgeverslasten. Dat gesprek voer je dan met cijfers in plaats van met een schatting.' },
      { t: 'h2', v: 'Contracten worden in de zaak getekend, niet op de keukentafel' },
      { t: 'p', v: 'Het contract leg je vast in Emma, met uren, functie en beloning. Elke wijziging wordt een nieuwe versie, zodat je altijd terug kunt zien wat er wanneer gold. Ondertekenen gebeurt ook in de app: jij tekent, je medewerker tekent, en Emma legt vast wie dat wanneer deed.' },
      { t: 'p', v: 'Verlof, ziekmeldingen en declaraties lopen langs dezelfde weg. Je medewerker vraagt aan of dient in, jij keurt goed, en het staat meteen goed in de administratie. Na de loonronde zet Emma de loonjournaalpost klaar voor je boekhouding.' },
      { t: 'pull', v: 'Jij doet je werk. Emma de rest.' },
      { t: 'h2', v: 'En als je iets wilt weten, vraag je het gewoon' },
      { t: 'p', v: 'In de app zit Vraag Emma. Je typt een vraag over je eigen administratie, bijvoorbeeld wie er nog verlof heeft staan, en het antwoord komt uit je eigen gegevens, met de bron erbij en een link naar het scherm waar je het zelf kunt nakijken.' },
      { t: 'p', v: 'Eén ding doet Emma bewust niet: de loonaangifte bij de Belastingdienst. Die blijft bij jou of je kantoor. Het rekenwerk, de stroken en de journaalpost krijg je aangeleverd, dus dat laatste stukje is klein.' },
      { t: 'note', v: '<b>Wat het kost:</b> EmmaLoont kost €19 per maand, exclusief btw. Je probeert het 14 dagen gratis en je kunt maandelijks opzeggen. Je betaalgegevens vul je meteen in, maar er wordt pas op dag 15 iets afgeschreven.' },
    ],
  },
  {
    slug: 'emmastudio-voor-horeca',
    cat: 'Lancering',
    accent: '#40548F',
    glyph: 'loont',
    section: 'blog',
    title: 'EmmaStudio nu ook voor de horeca',
    dek: 'De horeca-cao zit nu in EmmaLoont. Contracten, loonstroken en verlof voor je team in de keuken en de bediening, zonder avondwerk.',
    date: '2 september 2026',
    read: '4 min',
    image: '/kennisbank/emmastudio-voor-horeca.jpg',
    author: 'Het team van Emma',
    body: [
      { t: 'p', v: 'In de horeca is personeel je grootste kostenpost en je grootste zorg. Mensen komen en gaan, contracten verschillen per persoon, en de administratie doe je na sluitingstijd. Vanaf nu zit de horeca-cao in EmmaLoont, zodat dat werk in de app gebeurt in plaats van in je avonden.' },
      { t: 'h2', v: 'De cao-schaal staat er gewoon naast' },
      { t: 'p', v: 'De loontabellen van de horeca-cao zijn volledig ingelezen en cel voor cel gecontroleerd tegen de gepubliceerde bron: 792 cellen, zonder één afwijking. Neem je iemand aan voor de bediening of de keuken, dan zie je bij het contract meteen de schaal die de cao voorschrijft. Wijk je af, dan zie je dat bewust, met een waarschuwing en niet met een blokkade.' },
      { t: 'h2', v: 'Snel iemand aannemen, zonder gokken' },
      { t: 'p', v: 'Juist in de horeca neem je vaak snel iemand aan. Met de proforma reken je de loonstrook vooraf door: wat houdt zij netto over, en wat kost zij jou echt, inclusief werkgeverslasten. Dat weet je dan vóór het gesprek, niet na de eerste loonronde.' },
      { t: 'p', v: 'Het contract leg je vast in Emma en onderteken je ook daar: jij tekent, je medewerker tekent, en Emma legt vast wie dat wanneer deed. Elke wijziging wordt een nieuwe versie, dus bij een urenwijziging zie je altijd terug wat er eerder gold.' },
      { t: 'h2', v: 'De loonronde: voorbereiden, controleren, klaar' },
      { t: 'p', v: 'Emma bereidt de loonronde voor, jij controleert per medewerker, en de stroken gaan als PDF naar je mensen. Verlof, ziekmeldingen en declaraties lopen langs dezelfde weg: aanvragen, goedkeuren, verwerkt. Je team heeft een eigen inlog en ziet alleen de eigen gegevens, niets van collega\'s en niets van de zaak.' },
      { t: 'p', v: 'Na de loonronde staat de loonjournaalpost klaar. Gebruik je ook EmmaBoekt, dan boekt hij door naar je boekhouding; anders krijg je een net bestand voor je eigen pakket of je kantoor.' },
      { t: 'pull', v: 'Liever een avond in de zaak dan een avond in de administratie.' },
      { t: 'h2', v: 'Eerlijk over de grens' },
      { t: 'p', v: 'De loonaangifte bij de Belastingdienst doet Emma niet. Die doe je zelf via Mijn Belastingdienst Zakelijk, wat mag bij tien of minder werknemers, of je laat dat stukje bij je kantoor. Het rekenwerk en de stroken heb je dan al, dus dat laatste stukje is klein.' },
      { t: 'note', v: '<b>Wat het kost:</b> EmmaLoont kost €19 per maand, exclusief btw. Je probeert het 14 dagen gratis en je kunt maandelijks opzeggen. Je betaalgegevens vul je meteen in, maar er wordt pas op dag 15 iets afgeschreven.' },
    ],
  },
  {
    slug: 'emmastudio-voor-kappers',
    cat: 'Lancering',
    accent: '#40548F',
    glyph: 'loont',
    section: 'blog',
    title: 'EmmaStudio nu ook volledig voor kappers',
    dek: 'Emma begon in een kapsalon. Nu is de kappers-cao volledig ingelezen en is er een compleet pakket voor salons.',
    date: '12 oktober 2026',
    read: '4 min',
    image: '/kennisbank/emmastudio-voor-kappers.jpg',
    author: 'Het team van Emma',
    body: [
      { t: 'p', v: 'Emma is ontstaan in een kapsalon, dus het is een beetje gek dat dit artikel er nu pas is. Maar we wilden het pas opschrijven als het helemaal waar was. Dat is het nu: de cao voor het kappersbedrijf is volledig ingelezen en cel voor cel gecontroleerd tegen de gepubliceerde bron, 530 cellen zonder één afwijking.' },
      { t: 'h2', v: 'Wat dat in de salon betekent' },
      { t: 'p', v: 'Neem je een kapper of een leerling aan, dan leg je het contract vast in Emma en staat de cao-schaal er meteen naast. Wijk je af, dan zie je dat bewust, met een waarschuwing en niet met een blokkade. Ondertekenen gebeurt ook in de app: jij tekent, je medewerker tekent, en Emma legt vast wie dat wanneer deed.' },
      { t: 'p', v: 'De loonronde zelf is voorbereiden, controleren en versturen. Emma rekent, jij kijkt per medewerker na, en de loonstroken gaan als nette PDF naar je mensen. Twijfel je vooraf wat iemand je gaat kosten, dan reken je het eerst door met de proforma: netto voor de kandidaat, bruto en werkgeverslasten voor jou.' },
      { t: 'h2', v: 'Je team regelt het zelf' },
      { t: 'p', v: 'Je medewerkers krijgen een eigen inlog. Daar staan hun loonstroken, daar vragen ze verlof aan en dienen ze een declaratie in met de bon erbij. Jij keurt goed, en het staat meteen goed in de administratie. Niemand ziet iets van collega\'s of van de zaak.' },
      { t: 'pull', v: 'Liever een vol boek met afspraken dan een avond vol administratie.' },
      { t: 'h2', v: 'Het hele pakket voor salons' },
      { t: 'p', v: 'Voor salons is er ook een compleet pakket: Emma voor Salons bundelt de boekhoudschil, het cijferoverzicht, de loonadministratie, personeelswerving en de buurtscan voor €49,50 per maand, 10% korting op de losse prijs. Dat pakket is er niet toevallig als eerste: alles in Emma is begonnen bij wat een salon nodig heeft, van de prijsvergelijking met de salon verderop tot het vinden van een nieuwe kapper in de buurt.' },
      { t: 'p', v: 'Eerlijk over de grens: de loonaangifte bij de Belastingdienst doet Emma niet. Die doe je zelf via Mijn Belastingdienst Zakelijk, wat mag bij tien of minder werknemers, of je laat dat stukje bij je kantoor.' },
      { t: 'note', v: '<b>Wat het kost:</b> EmmaLoont kost €19 per maand en Emma voor Salons €49,50 per maand, exclusief btw. Je probeert het 14 dagen gratis. Je betaalgegevens vul je meteen in, maar er wordt pas op dag 15 iets afgeschreven; zeg je eerder op, dan betaal je niets.' },
    ],
  },
  {
    slug: 'personeel-vinden-zonder-vacaturebank',
    cat: 'Lancering',
    accent: '#A14A36',
    glyph: 'vindt',
    section: 'blog',
    title: 'Personeel vinden zonder vacaturebank',
    dek: 'De vakmensen die je zoekt kijken niet op vacaturebanken; ze werken al ergens in de buurt. EmmaVindt brengt ze in beeld, netjes en navolgbaar.',
    date: '15 oktober 2026',
    read: '4 min',
    image: '/kennisbank/personeel-vinden-zonder-vacaturebank.jpg',
    author: 'Het team van Emma',
    body: [
      { t: 'p', v: 'Een vacature plaatsen werkt prima voor mensen die actief zoeken. Het probleem is dat de beste vakmensen dat zelden doen: die werken al, vaak bij een zaak drie straten verderop. Daar is EmmaVindt voor gemaakt.' },
      { t: 'h2', v: 'Waar de namen vandaan komen' },
      { t: 'p', v: 'Emma zoekt in het openbare KvK-register en op openbare teampagina\'s van bedrijven in jouw buurt, binnen een straal die je zelf instelt. Daarbij houdt ze zich aan de regels die een website zelf stelt (robots.txt) en legt ze vast waar een naam vandaan komt. Herkent Emma iemand als vermoedelijke eigenaar van de zaak, dan zet ze die meteen op afgewezen, met de reden erbij: een eigenaar ga je niet wegkapen met een vacature.' },
      { t: 'p', v: 'Geen LinkedIn, en dat is bewust. Daar zoeken op personen mag niet volgens hun voorwaarden, en dat risico lopen we niet, ook niet met jouw account.' },
      { t: 'h2', v: 'Van naam naar gesprek' },
      { t: 'p', v: 'Elke kandidaat krijgt een score met de reden erbij, geen kaal cijfer. In de pipeline volg je iedereen van eerste contact tot match. Emma schrijft een concept voor het eerste bericht op basis van wat er openbaar bekend is; jij leest het na, past het aan en verstuurt het zelf. Emma verstuurt nooit iets uit zichzelf.' },
      { t: 'h2', v: 'En sinds kort: je vacature erbij' },
      { t: 'p', v: 'Je legt je vacature vast in Emma, met functie, uren en wat je zoekt. Emma schrijft er een tekstconcept bij dat alleen gebruikt wat jij hebt ingevuld, zonder verzonnen details. Jij plaatst hem waar je wilt; Emma publiceert niets. Kandidaten uit je pipeline koppel je aan de vacature, zodat je ziet wie waarvoor in beeld is, van open tot vervuld.' },
      { t: 'pull', v: 'Werven is geen campagne. Het is weten wie er in je buurt werkt en netjes vragen of iemand koffie wil doen.' },
      { t: 'h2', v: 'Netjes volgens de regels' },
      { t: 'p', v: 'Een audit-log houdt bij wie je hebt opgezocht en benaderd, zodat je je werving kunt verantwoorden. Geeft iemand aan geen berichten te willen, dan legt Emma dat vast en blijft die persoon buiten je berichten. En eerlijk over de grens: Vindt levert namen om zelf te benaderen. Het is geen vacaturebank en voert het gesprek niet voor je.' },
      { t: 'note', v: '<b>Wat het kost:</b> EmmaVindt kost €9 per maand, exclusief btw. Je probeert het 14 dagen gratis. Je betaalgegevens vul je meteen in, maar er wordt pas op dag 15 iets afgeschreven; zeg je eerder op, dan betaal je niets.' },
    ],
  },
  {
    slug: 'emmastudio-voor-technisch-installatiebedrijf',
    cat: 'Lancering',
    accent: '#40548F',
    glyph: 'loont',
    section: 'blog',
    title: 'EmmaStudio nu ook voor het technisch installatiebedrijf',
    dek: 'Wat kost een monteur je echt per maand? De cao voor het technisch installatiebedrijf zit nu in EmmaLoont, dus dat reken je uit voordat je ja zegt.',
    date: '19 oktober 2026',
    read: '4 min',
    image: '/kennisbank/emmastudio-voor-technisch-installatiebedrijf.jpg',
    author: 'Het team van Emma',
    body: [
      { t: 'p', v: 'Begin eens met de rekensom, want daar wringt het bij elk installatiebedrijf dat wil groeien. Je hebt werk genoeg, je wilt een monteur erbij, maar wat kost die je nou echt per maand? Het brutoloon is het halve antwoord; de werkgeverslasten zijn de andere helft, en die schat bijna iedereen te laag in.' },
      { t: 'h2', v: 'Eerst rekenen, dan pas ja zeggen' },
      { t: 'p', v: 'De cao voor het technisch installatiebedrijf is nu volledig ingelezen in EmmaLoont en cel voor cel gecontroleerd tegen de gepubliceerde bron, 660 cellen zonder één afwijking. Met de proforma reken je een loonstrook door vóór iemand in dienst is: wat houdt de monteur netto over, en wat betaal jij als werkgever echt. Dat gesprek voer je dan met cijfers in plaats van met een gok.' },
      { t: 'h2', v: 'Daarna gaat het vanzelf mee' },
      { t: 'p', v: 'Zeg je ja, dan leg je het contract vast met de cao-schaal ernaast. Zit je eronder, dan zie je dat, met een waarschuwing en niet met een blokkade. Ondertekenen doen jullie allebei in de app, en Emma legt vast wie wanneer tekende. Elke wijziging wordt een nieuwe versie, dus bij een functiewijziging zie je altijd terug wat er eerder gold.' },
      { t: 'p', v: 'De loonronde is daarna voorbereiden, controleren en versturen: Emma rekent, jij kijkt na, en de stroken gaan als PDF naar je mensen. De loonjournaalpost staat klaar voor je boekhouding, of komt eruit als net bestand voor je kantoor.' },
      { t: 'h2', v: 'Onderweg geregeld' },
      { t: 'p', v: 'Je monteurs hebben een eigen inlog. Verlof aanvragen, een ziekmelding, een bon declareren van de bouwmarkt: het gebeurt vanaf de telefoon, en jij keurt goed als het uitkomt. Geen briefjes in de bus van de zaak.' },
      { t: 'p', v: 'Eerlijk over de grens: de loonaangifte bij de Belastingdienst doet Emma niet. Die blijft bij jou of je administratiekantoor; het rekenwerk, de stroken en de journaalpost liggen er dan al.' },
      { t: 'note', v: '<b>Wat het kost:</b> EmmaLoont kost €19 per maand, exclusief btw, hoeveel monteurs je ook hebt. Je probeert het 14 dagen gratis. Je betaalgegevens vul je meteen in, maar er wordt pas op dag 15 iets afgeschreven; zeg je eerder op, dan betaal je niets.' },
    ],
  },
  {
    slug: 'emmastudio-voor-schilders',
    cat: 'Lancering',
    accent: '#40548F',
    glyph: 'loont',
    section: 'blog',
    title: 'EmmaStudio nu ook voor schilders',
    dek: 'De schilders-cao rekent in uurloon, en dat doet EmmaLoont nu ook. Contracten, loonstroken en verlof voor je ploeg, zonder papierwerk in de bus.',
    date: '22 oktober 2026',
    read: '3 min',
    image: '/kennisbank/emmastudio-voor-schilders.jpg',
    author: 'Het team van Emma',
    body: [
      { t: 'p', v: 'Een schildersbedrijf runnen is buiten zijn, op de steiger en bij de klant. De administratie gebeurt daarna, aan de keukentafel. Vanaf nu zit de schilders-cao in EmmaLoont, zodat dat tweede deel een stuk korter wordt.' },
      { t: 'h2', v: 'Uurloon, zoals de cao het zegt' },
      { t: 'p', v: 'De schilders-cao rekent in uurloon, en zo staat hij ook in Emma: volledig ingelezen en cel voor cel gecontroleerd tegen de gepubliceerde bron, zonder één afwijking. Leg je een contract vast voor een schilder, dan staat de schaal uit de cao ernaast. Wijk je af, dan zie je dat bewust, met een waarschuwing en niet met een blokkade.' },
      { t: 'p', v: 'Het contract onderteken je samen in de app: jij tekent, je schilder tekent, en Emma legt vast wie dat wanneer deed. Geen printje dat nog ergens in de bus moet.' },
      { t: 'h2', v: 'De maandelijkse ronde' },
      { t: 'p', v: 'Emma bereidt de loonronde voor op de uren die je doorgeeft, jij controleert per medewerker, en de stroken gaan als PDF naar je mensen. Je ploeg heeft een eigen inlog voor loonstroken, verlof en declaraties, dus de vraag om een vrije vrijdag komt binnen in de app in plaats van halverwege een klus.' },
      { t: 'pull', v: 'Jij doet je werk. Emma de rest.' },
      { t: 'p', v: 'Eerlijk over de grens: de loonaangifte bij de Belastingdienst doet Emma niet. Die doe je zelf via Mijn Belastingdienst Zakelijk, wat mag bij tien of minder werknemers, of je laat dat stukje bij je kantoor.' },
      { t: 'note', v: '<b>Wat het kost:</b> EmmaLoont kost €19 per maand, exclusief btw. Je probeert het 14 dagen gratis. Je betaalgegevens vul je meteen in, maar er wordt pas op dag 15 iets afgeschreven; zeg je eerder op, dan betaal je niets.' },
    ],
  },
  {
    slug: 'emmastudio-voor-huisartsenzorg',
    cat: 'Lancering',
    accent: '#40548F',
    glyph: 'loont',
    section: 'blog',
    title: 'EmmaStudio nu ook voor de huisartsenzorg',
    dek: 'De praktijk draait op assistenten en ondersteuners. De cao Huisartsenzorg zit nu in EmmaLoont, met een eigen inlog voor je team.',
    date: '26 oktober 2026',
    read: '4 min',
    image: '/kennisbank/emmastudio-voor-huisartsenzorg.jpg',
    author: 'Het team van Emma',
    body: [
      { t: 'p', v: 'Wie aan een huisartsenpraktijk denkt, denkt aan de huisarts. Maar de praktijk draait op het team eromheen: assistenten, ondersteuners, een praktijkmanager als je geluk hebt. Voor dat team is er nu EmmaLoont met de cao Huisartsenzorg erin, volledig ingelezen en cel voor cel gecontroleerd tegen de gepubliceerde bron, 452 cellen zonder één afwijking.' },
      { t: 'h2', v: 'Het team regelt zichzelf' },
      { t: 'p', v: 'Begin bij wat de meeste tijd scheelt: je medewerkers krijgen een eigen inlog. Daar staan hun loonstroken, daar vragen ze verlof aan en dienen ze declaraties in. Jij of je praktijkmanager keurt goed, en het staat meteen goed in de administratie. Niemand ziet iets van collega\'s, en bedrijfscijfers blijven afgeschermd.' },
      { t: 'h2', v: 'Contracten zonder printwerk' },
      { t: 'p', v: 'Een nieuwe assistent leg je vast met de cao-schaal ernaast; zit het aangeboden loon eronder, dan zie je dat meteen. Ondertekenen gebeurt in de app, door jou en je medewerker allebei, en Emma legt vast wie wanneer tekende. Elke wijziging wordt een nieuwe versie, dus bij een urenuitbreiding zie je altijd terug wat er eerder gold.' },
      { t: 'p', v: 'De loonronde is voorbereiden, controleren en versturen. Vooraf doorrekenen wat een extra ondersteuner kost, doe je met de proforma: netto voor de kandidaat, bruto en werkgeverslasten voor de praktijk.' },
      { t: 'h2', v: 'Wat Emma bewust niet doet' },
      { t: 'p', v: 'De loonaangifte bij de Belastingdienst blijft bij jou of je kantoor; het rekenwerk, de stroken en de loonjournaalpost liggen er dan al. En Emma geeft geen fiscaal of arbeidsrechtelijk advies: ze zet de cao ernaast en rekent, de keuzes blijven van jou.' },
      { t: 'note', v: '<b>Wat het kost:</b> EmmaLoont kost €19 per maand, exclusief btw, ongeacht de grootte van je team. Je probeert het 14 dagen gratis. Je betaalgegevens vul je meteen in, maar er wordt pas op dag 15 iets afgeschreven; zeg je eerder op, dan betaal je niets.' },
    ],
  },
  {
    slug: 'emmastudio-voor-carrosserie',
    cat: 'Lancering',
    accent: '#40548F',
    glyph: 'loont',
    section: 'blog',
    title: 'EmmaStudio nu ook voor het carrosseriebedrijf',
    dek: 'Schadeherstel draait op planning en vakwerk. De carrosserie-cao zit nu in EmmaLoont, dus de personeelsadministratie hoeft de werkplaats niet meer uit te houden.',
    date: '29 oktober 2026',
    read: '4 min',
    image: '/kennisbank/emmastudio-voor-carrosserie.jpg',
    author: 'Het team van Emma',
    body: [
      { t: 'p', v: 'In een schadeherstelbedrijf is de planning heilig. Elke auto die langer op de brug staat, kost een klant en een verzekeraar geduld. Juist daarom is het zonde als de ondernemer zelf avonden kwijt is aan loonstroken en verlofbriefjes. De carrosserie-cao zit nu in EmmaLoont: volledig ingelezen en cel voor cel gecontroleerd tegen de gepubliceerde bron, 642 cellen zonder één afwijking.' },
      { t: 'h2', v: 'Vraag het gewoon' },
      { t: 'p', v: 'Het begint bij iets kleins dat veel scheelt: in de app zit Vraag Emma. Je typt een vraag over je eigen administratie, bijvoorbeeld wie er nog verlof heeft staan voor de kerstperiode, en het antwoord komt uit je eigen gegevens, met de bron erbij en een link naar het scherm waar je het zelf kunt nakijken. Zoeken door mappen hoeft niet meer.' },
      { t: 'h2', v: 'Van plaatwerker tot leerling' },
      { t: 'p', v: 'Elk contract leg je vast met de cao-schaal ernaast, en ondertekenen gebeurt in de app door jullie allebei. Neem je iemand aan, dan reken je vooraf met de proforma door wat die je echt kost, inclusief werkgeverslasten. De loonronde is daarna voorbereiden, controleren en versturen; de stroken gaan als PDF naar je mensen en de loonjournaalpost staat klaar voor je boekhouding.' },
      { t: 'p', v: 'Je monteurs en plaatwerkers hebben een eigen inlog voor loonstroken, verlof, ziekmeldingen en declaraties. Jij keurt goed wanneer het uitkomt, tussen twee offertes door.' },
      { t: 'pull', v: 'De brug is voor de auto\'s. De administratie mag in de app.' },
      { t: 'p', v: 'Eerlijk over de grens: de loonaangifte bij de Belastingdienst doet Emma niet. Die blijft bij jou of je administratiekantoor; het rekenwerk ligt er dan al.' },
      { t: 'note', v: '<b>Wat het kost:</b> EmmaLoont kost €19 per maand, exclusief btw. Je probeert het 14 dagen gratis. Je betaalgegevens vul je meteen in, maar er wordt pas op dag 15 iets afgeschreven; zeg je eerder op, dan betaal je niets.' },
    ],
  },
  {
    slug: 'emmastudio-voor-metaalbewerking',
    cat: 'Lancering',
    accent: '#40548F',
    glyph: 'loont',
    section: 'blog',
    title: 'EmmaStudio nu ook voor het metaalbewerkingsbedrijf',
    dek: 'Je eerste vaste kracht aannemen in de werkplaats, stap voor stap: van proforma tot eerste loonstrook, met de metaal-cao erbij.',
    date: '2 november 2026',
    read: '4 min',
    image: '/kennisbank/emmastudio-voor-metaalbewerking.jpg',
    author: 'Het team van Emma',
    body: [
      { t: 'p', v: 'Veel metaalbewerkingsbedrijven beginnen als eenmanszaak met een draaibank en een volle agenda. Het moment dat je er niet meer alleen uitkomt, is ook het moment dat de personeelsadministratie begint. Zo ziet die er met Emma uit, stap voor stap. De cao voor het metaalbewerkingsbedrijf is volledig ingelezen en cel voor cel gecontroleerd tegen de gepubliceerde bron, 660 cellen zonder één afwijking.' },
      { t: 'h2', v: 'Stap één: reken het door' },
      { t: 'p', v: 'Voordat je iemand iets belooft, maak je een proforma-loonstrook. Je ziet wat de kandidaat netto overhoudt en wat jij als werkgever echt betaalt, inclusief werkgeverslasten. Dat is vaak meer dan je dacht, en beter dat je het nu weet dan bij de eerste loonronde.' },
      { t: 'h2', v: 'Stap twee: leg het contract vast' },
      { t: 'p', v: 'Uren, functie en beloning gaan in het contract, met de cao-schaal ernaast als ondergrens. Jullie ondertekenen allebei in de app, en Emma legt vast wie wanneer tekende. Verandert er later iets, dan wordt dat een nieuwe versie en blijft het oude bewaard.' },
      { t: 'h2', v: 'Stap drie: draai de eerste loonronde' },
      { t: 'p', v: 'Emma bereidt de ronde voor, jij controleert, en de strook gaat als PDF naar je medewerker. De loonjournaalpost staat klaar voor je boekhouding, of komt eruit als net bestand voor je kantoor. Vanaf dan is het elke maand een kwartier in plaats van een avond.' },
      { t: 'h2', v: 'Stap vier: laat het team het zelf doen' },
      { t: 'p', v: 'Je medewerker krijgt een eigen inlog voor loonstroken, verlof en declaraties. De vraag om een snipperdag komt binnen in de app, jij keurt goed, klaar. Eerlijk over de grens: de loonaangifte bij de Belastingdienst doet Emma niet; die blijft bij jou of je kantoor.' },
      { t: 'note', v: '<b>Wat het kost:</b> EmmaLoont kost €19 per maand, exclusief btw, of je nu één of tien mensen hebt. Je probeert het 14 dagen gratis. Je betaalgegevens vul je meteen in, maar er wordt pas op dag 15 iets afgeschreven; zeg je eerder op, dan betaal je niets.' },
    ],
  },
  {
    slug: 'emmastudio-voor-isolatie',
    cat: 'Lancering',
    accent: '#40548F',
    glyph: 'loont',
    section: 'blog',
    title: 'EmmaStudio nu ook voor het isolatiebedrijf',
    dek: 'Het werk groeit hard en je mensen zijn de hele dag onderweg. De isolatie-cao zit nu in EmmaLoont, met verlof en declaraties gewoon vanaf de telefoon.',
    date: '5 november 2026',
    read: '3 min',
    image: '/kennisbank/emmastudio-voor-isolatie.jpg',
    author: 'Het team van Emma',
    body: [
      { t: 'p', v: 'Isolatiebedrijven hebben de wind mee: er moet meer verduurzaamd worden dan er handen zijn. Maar groei betekent personeel, en personeel betekent administratie. Daarom zit de cao voor het isolatiebedrijf nu in EmmaLoont: volledig ingelezen en cel voor cel gecontroleerd tegen de gepubliceerde bron, 642 cellen zonder één afwijking.' },
      { t: 'h2', v: 'Je ploegen zijn onderweg, de administratie niet' },
      { t: 'p', v: 'Je mensen zitten op projecten, niet op kantoor. Daarom heeft iedereen een eigen inlog: verlof aanvragen, een ziekmelding doorgeven of een bon declareren gebeurt vanaf de telefoon, vanaf de bus of de bouwplaats. Jij keurt goed op het moment dat het jou uitkomt, en het staat meteen goed in de administratie.' },
      { t: 'h2', v: 'Contracten en loonrondes zonder gedoe' },
      { t: 'p', v: 'Een nieuwe kracht leg je vast met de cao-schaal ernaast, en jullie ondertekenen allebei in de app. Vooraf doorrekenen wat iemand kost, doe je met de proforma. De loonronde is daarna voorbereiden, controleren en versturen; de stroken gaan als PDF naar je mensen en de loonjournaalpost staat klaar voor je boekhouding of je kantoor.' },
      { t: 'p', v: 'Eerlijk over de grens: de loonaangifte bij de Belastingdienst doet Emma niet. Die doe je zelf via Mijn Belastingdienst Zakelijk, wat mag bij tien of minder werknemers, of je laat dat stukje bij je kantoor.' },
      { t: 'note', v: '<b>Wat het kost:</b> EmmaLoont kost €19 per maand, exclusief btw. Je probeert het 14 dagen gratis. Je betaalgegevens vul je meteen in, maar er wordt pas op dag 15 iets afgeschreven; zeg je eerder op, dan betaal je niets.' },
    ],
  },
  {
    slug: 'emmastudio-voor-goud-en-zilvernijverheid',
    cat: 'Lancering',
    accent: '#40548F',
    glyph: 'loont',
    section: 'blog',
    title: 'EmmaStudio nu ook voor de goud- en zilvernijverheid',
    dek: 'Een atelier met één gezel heeft dezelfde loonadministratie als een bedrijf met tien man. De cao voor de goud- en zilvernijverheid zit nu in EmmaLoont.',
    date: '9 november 2026',
    read: '3 min',
    image: '/kennisbank/emmastudio-voor-goud-en-zilvernijverheid.jpg',
    author: 'Het team van Emma',
    body: [
      { t: 'p', v: 'De goud- en zilvernijverheid is een vak van kleine ateliers: een goudsmid, soms een gezel, soms een leerling. Juist daar doet de administratie pijn, want of je nu één of tien mensen op de loonlijst hebt, de regels zijn hetzelfde. Daarom zit de cao voor de goud- en zilvernijverheid nu in EmmaLoont: volledig ingelezen en cel voor cel gecontroleerd tegen de gepubliceerde bron, 660 cellen zonder één afwijking.' },
      { t: 'h2', v: 'Klein team, volwassen administratie' },
      { t: 'p', v: 'Het contract van je gezel leg je vast met de cao-schaal ernaast, en jullie ondertekenen allebei in de app. Emma legt vast wie wanneer tekende, en elke wijziging wordt een nieuwe versie. Overweeg je een leerling aan te nemen, dan reken je met de proforma eerst door wat dat je echt kost.' },
      { t: 'p', v: 'De loonronde is elke maand hetzelfde rustige ritueel: Emma bereidt voor, jij controleert, de strook gaat als PDF de deur uit. De loonjournaalpost staat klaar voor je boekhouding of je kantoor, en je medewerker heeft een eigen inlog voor stroken, verlof en declaraties.' },
      { t: 'pull', v: 'Vakwerk verdient een administratie die zichzelf gedraagt.' },
      { t: 'p', v: 'Eerlijk over de grens: de loonaangifte bij de Belastingdienst doet Emma niet. Bij een atelier met een of twee mensen op de loonlijst mag je die zelf doen via Mijn Belastingdienst Zakelijk, of je laat dat stukje bij je kantoor.' },
      { t: 'note', v: '<b>Wat het kost:</b> EmmaLoont kost €19 per maand, exclusief btw. Je probeert het 14 dagen gratis. Je betaalgegevens vul je meteen in, maar er wordt pas op dag 15 iets afgeschreven; zeg je eerder op, dan betaal je niets.' },
    ],
  },
];
