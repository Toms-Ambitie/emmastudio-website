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
  author: string;
  featured?: boolean;
  /** Voorbereiding op de latere blog/kennisbank-splitsing. Nu nog geen filter
   *  actief — /kennisbank toont alle artikelen ongeacht deze waarde.
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
  'klanten-en-personeel-vinden': 'Klanten en personeel vinden in je eigen regio · Emma',
  'tips-per-branche': "3 administratietips voor elke zzp'er en salon · Emma",
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
    { href: '/modules/vindt', anchor: 'EmmaVindt om klanten in dezelfde regio te zoeken' },
    { href: '/modules/waakt', anchor: 'EmmaWaakt, waar je marktpositie terugkomt' },
  ] },
  'loon-zonder-loonbureau': { lead: 'Meer hierover:', links: [
    { href: '/modules/loont', anchor: 'EmmaLoont, je personeelsadministratie' },
    { href: '/modules/boekt', anchor: 'EmmaBoekt, waar de loonjournaalpost landt' },
    { href: '/modules/vindt', anchor: 'EmmaVindt om nieuw personeel te vinden' },
  ] },
  'klanten-en-personeel-vinden': { lead: 'Zo werkt dit in', links: [
    { href: '/modules/vindt', anchor: 'EmmaVindt, één zoeker met twee modi' },
    { href: '/modules/ziet', anchor: 'EmmaZiet om je marktgebied te kennen' },
    { href: '/modules/loont', anchor: 'EmmaLoont zodra iemand in dienst komt' },
  ] },
  'tips-per-branche': { lead: 'Zo pakt Emma dit aan met', links: [
    { href: '/modules/boekt', anchor: 'EmmaBoekt voor je dagelijkse boekhouding' },
    { href: '/modules/waakt', anchor: 'EmmaWaakt voor grip op je cijfers' },
    { href: '/pakketten', anchor: 'een pakket voor jouw branche' },
  ] },
};

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
    read: '7 min',
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
      { t: 'p', v: 'Vijf van de acht modules zijn er en zijn te gebruiken: de boekhoudschil, het financiële overzicht, de marktverkenner, de zoeker voor klanten en personeel, en de loonadministratie. Drie zijn er nog niet: coaching, content en adverteren. Die staan op de planning, zonder datum, want een gemiste datum kost meer vertrouwen dan geen datum.' },
      { t: 'p', v: 'En omdat het makkelijker is om te vertellen wat er wel is: er zit nog geen chatfunctie in waarin je vragen aan je eigen cijfers stelt. Emma bereidt je btw-aangifte niet voor. Contracten worden vastgelegd, niet digitaal ondertekend. Als je die drie dingen zoekt, weet je het nu voordat je begint in plaats van erna.' },
      { t: 'note', v: '<b>Wat het kost:</b> je betaalt per module, vanaf EUR 9 per maand exclusief btw. Elke module begint met 14 dagen gratis, zonder creditcard, en je kunt maandelijks opzeggen. Je neemt alleen wat je gebruikt.' },
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
    read: '5 min',
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
        'Welke dienst of welk product draagt het meest bij, en welke kost me eigenlijk geld?',
        'Wat zou ik deze week kunnen doen om bij te sturen?',
      ] },
      { t: 'p', v: 'Als je deze drie vragen op elk moment kunt beantwoorden zonder eerst een avond te reserveren, heb je grip. Dat is precies waar Emma op mikt. Niet om jou tot data-analist te maken, maar om de antwoorden binnen handbereik te leggen zodat je een beslissing kunt nemen en weer verder kunt.' },
      { t: 'h2', v: 'En als je geen koppeling hebt?' },
      { t: 'p', v: 'Veel ondernemers denken dat zoiets pas kan als hun boekhouding aan een systeem hangt. Dat hoeft niet. Heb je EmmaBoekt, dan komen je cijfers vanzelf binnen. Heb je die niet, dan upload je een omzet- en kostenoverzicht uit je eigen kassa- of boekhoudsysteem. Emma leest het uit, jij controleert het, en daarna werkt je overzicht precies hetzelfde.' },
      { t: 'p', v: 'Eén eis: de bedragen moeten zonder btw zijn. Staan ze inclusief, dan weigert Emma het bestand in plaats van te gokken. Terugrekenen met verschillende tarieven door elkaar levert cijfers op die er goed uitzien en niet kloppen, en dat is erger dan geen cijfers.' },
      { t: 'note', v: '<b>Een lege plek is geen fout.</b> Zie je ergens geen getal staan, dan is er geen bron voor. Emma vult zoiets nooit in met een schatting of een nul. Liever een eerlijke lege plek dan een getal waar je op stuurt terwijl het nergens op slaat.' },
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
    date: '8 augustus 2026',
    read: '5 min',
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
    date: '8 augustus 2026',
    read: '6 min',
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
      { t: 'note', v: '<b>Nog niet mogelijk:</b> contracten digitaal laten ondertekenen. Je legt ze vast in Emma, met alle afspraken en een versiehistorie, maar het tekenen zelf gebeurt buiten Emma om. Dat staat op de planning zonder datum.' },
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
    date: '8 augustus 2026',
    read: '5 min',
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
    slug: 'klanten-en-personeel-vinden',
    cat: 'Groei',
    accent: '#A8553F',
    glyph: 'vindt',
    section: 'kennisbank',
    title: 'Klanten of personeel vinden in je eigen regio',
    dek: 'Dezelfde techniek, twee heel verschillende vragen. Waarom die bij Emma op aparte schermen staan, en waarom LinkedIn er bewust buiten blijft.',
    date: '8 augustus 2026',
    read: '5 min',
    author: 'Het team van Emma',
    body: [
      { t: 'p', v: 'Twee vragen die vaak op hetzelfde moment spelen bij een kleine ondernemer. Ik heb meer klanten nodig. Of: ik heb er iemand bij nodig. Ze voelen totaal verschillend, maar eronder zit dezelfde vraag: wie zit er in mijn buurt, en past die bij mij?' },
      { t: 'h2', v: 'Waar de gegevens vandaan komen' },
      { t: 'p', v: 'Uit het openbare handelsregister, gecombineerd met de officiële Nederlandse locatiegegevens om de straal te bepalen. Je geeft aan in welk vak je zoekt en binnen hoeveel kilometer, en Emma haalt op wie daaraan voldoet.' },
      { t: 'p', v: 'Dat vak kies je uit een lijst, in gewone taal. Je hoeft geen codes op te zoeken.' },
      { t: 'h2', v: 'Twee modi, twee schermen' },
      { t: 'p', v: 'Klanten zoeken en personeel werven staan bij Emma bewust apart, ook al draaien ze op dezelfde techniek. Daar zijn twee redenen voor.' },
      { t: 'p', v: 'De eerste is praktisch. Een lead en een sollicitant horen niet in dezelfde lijst. Je benadert ze anders, je volgt ze anders op, en je wilt niet per ongeluk een wervingsmail naar een prospect sturen.' },
      { t: 'p', v: 'De tweede is juridisch. Voor werving gelden strengere privacyregels dan voor zakelijke prospectie. Emma houdt daarom bij wie wat heeft opgezocht en wanneer, zodat je kunt laten zien wat er is gebeurd als iemand daarnaar vraagt.' },
      { t: 'h2', v: 'Wat Emma erbij doet' },
      { t: 'ul', v: [
        'Een score per match, op basis van wat je zoekt. Een voorstel om je lijst te ordenen, geen oordeel over mensen.',
        'Verrijking met wat openbaar bekend is: bedrijfsnaam, inschrijfnummer, website.',
        'Een voorzet voor je eerste bericht, gebaseerd op publieke informatie over die persoon of dat bedrijf.',
        'Een pijplijn met statussen, zodat je weet wie je nog moet terugbellen.',
      ] },
      { t: 'p', v: 'Dat eerste bericht is een concept, niet iets dat vanzelf de deur uit gaat. Je leest het, past het aan en verstuurt het zelf. Een mail die klinkt alsof een machine hem schreef, kost je de kandidaat.' },
      { t: 'pull', v: 'De radius is het punt. Grote wervingssystemen zijn landelijk en zwaar. Jij zoekt iemand die op de fiets kan komen.' },
      { t: 'h2', v: 'Waarom geen LinkedIn' },
      { t: 'p', v: 'Dit is de vraag die we het vaakst krijgen, dus het antwoord staat er maar meteen bij. LinkedIn zit er niet in, en dat is een keuze, geen gat.' },
      { t: 'p', v: 'De officiële koppeling van LinkedIn staat zoeken op personen of bedrijven voor leadgeneratie niet toe. Dat kan alleen via een duur partnerprogramma. En pagina\'s zelf uitlezen is tegen hun voorwaarden en wordt bestraft met geblokkeerde accounts.' },
      { t: 'p', v: 'Dat risico lopen we niet, en jij wilt het ook niet lopen: het is jouw zakelijke account dat op het spel staat. Liever een bron die minder oplevert en gewoon mag.' },
      { t: 'note', v: '<b>Wat dit niet is:</b> geen wervingssysteem voor grote organisaties, en geen klantsysteem voor je bestaande klanten. Die staan bij je facturen. Dit is de stap ervoor: wie ken je nog niet.' },
      { t: 'p', v: 'Bij Blondes Incognito, waar deze aanpak vandaan komt, ging de zoektocht naar twee kapsters van vier maanden naar zes weken. Niet omdat er ineens meer kandidaten waren, maar omdat de lijst er lag in plaats van dat hij nog gemaakt moest worden.' },
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
    read: '4 min',
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
      { t: 'note', v: '<b>Zelf doorrekenen?</b> Wat je in stap één met de hand doet, houdt EmmaWaakt daarna bij: doelen per dienst en per medewerker, en een signaal als er iets afwijkt. Vanaf EUR 9 per maand, 14 dagen gratis te proberen.' },
    ],
  },
];
