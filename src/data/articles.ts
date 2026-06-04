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
  glyph: 'waakt' | 'vindt' | 'schrijft';
  title: string;
  dek: string;
  date: string;
  read: string;
  author: string;
  featured?: boolean;
  body: ArticleBlock[];
};

export const ARTICLES: Article[] = [
  {
    slug: 'grip-op-je-cijfers',
    cat: 'Grip op cijfers',
    accent: '#44857C',
    glyph: 'waakt',
    title: 'Waarom grip op je cijfers begint met rust',
    dek: 'De meeste ondernemers weten pas hoe het écht gaat als de cijfers van de accountant binnen zijn. Dat kan anders, en rustiger.',
    date: '28 mei 2026',
    read: '5 min',
    author: 'Het team van Emma',
    featured: true,
    body: [
      { t: 'p', v: 'Vraag een ondernemer hoe het met de zaak gaat en je krijgt vaak een gevoel terug, geen getal. Druk, rustig, het loopt wel. Dat gevoel klopt meestal aardig. Maar het is geen sturing, en zeker geen rust.' },
      { t: 'p', v: 'Een van de eerste ondernemers die met Emma werkte, Ilze van salon Blondes Incognito, vatte het mooi samen. Ze wil gewoon lekker kunnen knippen. Niet omdat cijfers haar niet interesseren, maar omdat ze er niet elke avond voor in een spreadsheet wil duiken. Ze wil weten hoe haar salon en haar team het doen ten opzichte van haar doelen, en daar klaar mee zijn.' },
      { t: 'pull', v: 'Grip is niet meer data. Grip is de juiste data, op het juiste moment, zonder dat je ervoor hoeft te graven.' },
      { t: 'h2', v: 'Het verschil tussen weten en zoeken' },
      { t: 'p', v: 'Veel software geeft je toegang tot alles. Elke transactie, elke marge, elke trend, als je maar de juiste schermen weet te vinden en de tijd hebt om te kijken. In de praktijk doet bijna niemand dat. Niet omdat ze lui zijn, maar omdat de dag vol zit met het echte werk.' },
      { t: 'p', v: 'Grip ontstaat pas als de cijfers naar jou toe komen in plaats van andersom. Een rustig signaal dat je productverkoop iets achterloopt op je doel. Een seintje dat een dienst structureel onder je marge zit. Geen alarmbellen, geen dashboard vol rode getallen, maar een korte observatie en een suggestie die je zelf kunt wegen.' },
      { t: 'h2', v: 'Drie vragen die je altijd zou moeten kunnen beantwoorden' },
      { t: 'ul', v: [
        'Hoe sta ik er deze maand voor ten opzichte van mijn doel?',
        'Welke dienst of welk product draagt het meest bij, en welke kost me eigenlijk geld?',
        'Wat zou ik deze week kunnen doen om bij te sturen?',
      ] },
      { t: 'p', v: 'Als je deze drie vragen op elk moment kunt beantwoorden zonder eerst een avond te reserveren, heb je grip. Dat is precies waar Emma op mikt. Niet om jou tot data-analist te maken, maar om de antwoorden binnen handbereik te leggen zodat je beslissing kunt nemen en weer verder kunt.' },
      { t: 'note', v: '<b>Eerlijk over waar we staan:</b> Emma wordt op dit moment opgebouwd als platform. De aanpak is bewezen in de praktijk bij Blondes Incognito; nu maken we het beschikbaar voor iedere ondernemer. Wil je het volgen? Laat je e-mail achter op de wachtlijst.' },
      { t: 'p', v: 'Rust en grip lijken tegenpolen, maar ze horen bij elkaar. Je krijgt pas rust als je weet dat je het ziet wanneer het ertoe doet. En je houdt pas grip als het kijken je geen energie kost.' },
    ],
  },
  {
    slug: 'tips-per-branche',
    cat: 'Praktijk',
    accent: '#AE8232',
    glyph: 'vindt',
    title: 'Eén ding dat elke salon, praktijk en ZZP\'er morgen anders kan doen',
    dek: 'Drie korte, praktische gewoontes die je vandaag al kunt oppakken, ongeacht je branche.',
    date: '21 mei 2026',
    read: '4 min',
    author: 'Het team van Emma',
    body: [
      { t: 'p', v: 'Goede gewoontes hoeven niet groot te zijn. De ondernemers die het rustig hebben zijn vaak niet degenen die het hardst werken, maar degenen die een paar slimme dingen standaard hebben gemaakt. Hier zijn er drie, per type onderneming.' },
      { t: 'h2', v: 'Voor de salon: weet wat een behandeling echt oplevert' },
      { t: 'p', v: 'Een knipbeurt van een uur en een kleuring van een uur leveren zelden hetzelfde op. Toch plannen veel salons puur op beschikbaarheid. Kijk eens een maand lang naar wat een dienst werkelijk bijdraagt, inclusief productgebruik en tijd. Vaak blijkt dat een kleine verschuiving in je agenda meer ruimte en meer marge geeft, zonder een euro meer omzet.' },
      { t: 'h2', v: 'Voor de zorgpraktijk: maak van targets een gesprek, geen rapport' },
      { t: 'p', v: 'In praktijken met meerdere behandelaars verdwijnen doelen makkelijk in een spreadsheet die niemand opent. Maak er een kort, terugkerend gesprek van. Niet om af te rekenen, maar om te zien waar iemand tegenaan loopt. Voortgang die je samen bekijkt, motiveert meer dan een cijfer dat je achteraf deelt.' },
      { t: 'h2', v: 'Voor de ZZP\'er: scheid je weken in maken en regelen' },
      { t: 'p', v: 'Het zwaarste aan zelfstandig werken is dat alles door elkaar loopt. Klantwerk, facturen, acquisitie, administratie. Geef het regelwerk een vast moment, bijvoorbeeld een dagdeel per week, en bescherm de rest voor het werk waar je voor betaald wordt. Het klinkt simpel, maar het scheelt een hoop ruis in je hoofd.' },
      { t: 'pull', v: 'De beste systemen voelen niet als systemen. Ze zijn gewoon hoe je het doet.' },
      { t: 'p', v: 'Wat deze drie gewoontes gemeen hebben: ze vragen geen software om te beginnen. Ze vragen alleen aandacht. En als je ze eenmaal te pakken hebt, is het fijn als iets ze voor je bijhoudt zodat je er niet meer aan hoeft te denken. Daar komt Emma straks van pas.' },
      { t: 'note', v: '<b>In ontwikkeling:</b> de modules die dit soort gewoontes ondersteunen, zijn bewezen bij een echte salon en worden nu opnieuw opgebouwd. Zet je op de wachtlijst om als eerste te starten.' },
    ],
  },
  {
    slug: 'hoe-we-emma-bouwen',
    cat: 'Achter de schermen',
    accent: '#9C4456',
    glyph: 'schrijft',
    title: 'Achter de schermen: hoe we Emma opnieuw opbouwen',
    dek: 'Emma is niet op een whiteboard bedacht. Ze is ontstaan in een echte salon. Dit is hoe we van die ervaring een platform maken.',
    date: '14 mei 2026',
    read: '6 min',
    author: 'Het team van Emma',
    body: [
      { t: 'p', v: 'De eerlijkste manier om over Emma te praten is om bij het begin te beginnen. Emma is geen idee dat we bedachten en vervolgens aan ondernemers probeerden te verkopen. Het is andersom gegaan.' },
      { t: 'h2', v: 'Geboren in de praktijk' },
      { t: 'p', v: 'Achttien maanden lang draaiden de eerste modules dagelijks bij salon Blondes Incognito. Niet als pilot, maar als gereedschap dat echt gebruikt werd om te factureren, om cijfers te volgen, om personeel en content te regelen. Zeven van de acht modules die je nu op de site ziet, zijn daar in de praktijk getest, bijgeschaafd en bewezen.' },
      { t: 'p', v: 'Dat is een ongebruikelijke start voor software. De meeste producten worden bedacht voor een brede markt en daarna versmald. Emma is precies omgekeerd ontstaan: smal en echt, en nu maken we het breed.' },
      { t: 'pull', v: 'We bouwen niet wat we denken dat ondernemers nodig hebben. We bouwen wat er in een echte zaak al werkte.' },
      { t: 'h2', v: 'Waarom opnieuw opbouwen?' },
      { t: 'p', v: 'Iets dat werkt voor één salon is nog geen platform voor iedereen. Wat bij Blondes Incognito op maat was gemaakt, moet nu werken voor een ZZP\'er zonder personeel, een zorgpraktijk met een eigen CAO, en een team van vijftien. Dat vraagt om opnieuw bouwen op een stevig fundament, niet om hier en daar een knop bijplakken.' },
      { t: 'p', v: 'Dus dat is wat we nu doen. We nemen de bewezen aanpak en gieten die in een platform dat veilig is, dat de privacyregels respecteert, en dat meegroeit met het type ondernemer dat ermee werkt.' },
      { t: 'h2', v: 'Wat dat voor jou betekent' },
      { t: 'ul', v: [
        'Je kunt Emma nog niet kopen. We bouwen eerst het fundament goed.',
        'De prijzen die je op de site ziet, zijn de beoogde lanceringsprijzen.',
        'De productbeelden zijn impressies, geen schermen uit een live app.',
      ] },
      { t: 'p', v: 'We vertellen dit liever te open dan te mooi. Een wachtlijst die groeit omdat mensen geloven in waar we naartoe werken, is voor ons waardevoller dan een belofte die we nog niet kunnen waarmaken.' },
      { t: 'note', v: '<b>Wil je het volgen?</b> Zet je op de wachtlijst en je hoort als eerste wanneer Emma live gaat, plus af en toe een eerlijk bericht over hoe het bouwen vordert.' },
    ],
  },
];
