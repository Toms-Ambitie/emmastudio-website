# Wekelijkse waarheidscontrole en lanceringen

De routine doet drie dingen met één query: kijken of de site nog klopt, en
reageren op de twee gebeurtenissen die een lancering zijn.

## Wat er bij een lancering gebeurt

**Een cao komt erbij** (een `cao_versie` gaat naar `actief`): de routine werkt
`cao.ts` bij en schrijft een artikel in de trant van "EmmaStudio nu ook voor
[branche]".

**Een module gaat live** (`plans.purchasable` wordt true): de routine zet
`MODULE_STATUS` om en schrijft een uitgebreid artikel over die module.

### De grendel op wat er beweerd mag worden

Dit is de reden dat de query meer ophaalt dan alleen namen. Gemeten op
10 augustus 2026 staat de enige actieve cao, Kappersbedrijf, in de database als
`onvolledig = true`:

- 29 loontabellen overgeslagen omdat er geen bedragen in de bron stonden
- bij 428 regels vermeldt de bron niet of het maand- of uurbedragen zijn
- bij alle 470 regels ontbreekt de urenbasis
- geen pensioenfonds en geen ziektepercentages ingevuld

De loontabellen zijn dus bruikbaar (470 regels, 38 uur, maandbedragen), maar
"de cao is volledig geïntegreerd" is niet waar te maken. Een routine die die
zin automatisch publiceert zodra een cao op actief springt, zou precies het
probleem opnieuw invoeren dat de rest van dit document beschrijft, alleen dan
elke week opnieuw en zonder dat iemand meekijkt.

Daarom leest de routine `onvolledig`, `pensioen`, `ziekte` en het aantal
loonregels mee, en mag hij "volledig ingelezen" alleen schrijven als die
allemaal goed staan. Anders schrijft hij dat de loontabellen erin zitten, en
meldt hij in de PR wat er leeg was. Bij nul loonregels schrijft hij helemaal
geen artikel, want dan is er iets mis met de data en is er niets te vieren.

### Waar het naartoe gaat

Bewust twee wegen:

| Wat er verandert | Waarheen |
|---|---|
| alleen cijfers en statussen | rechtstreeks naar `main` |
| er zit een artikel of andere wervende tekst bij | een aparte branch, Tom leest mee |

Een correctie maakt de site alleen maar waarder en hoeft niet te wachten.
Wervende tekst over een branche of een module gaat niet ongelezen de deur uit.

## Waarom de controle bestaat

Deze site heeft één terugkerend probleem gehad: teksten die iets beweerden wat
de code of de database niet deed. Het meeste is opgelost door af te leiden in
plaats van over te typen, maar drie dingen blijven een met de hand bijgehouden
kopie van een databasestand die daarbuiten om verandert:

| Bestand | Kopieert | Wat er misgaat als het verouderd raakt |
|---|---|---|
| `src/data/cao.ts` | actieve cao-versies op prod | Emma vertelt een ondernemer dat zijn cao er niet in zit terwijl dat wel zo is, of andersom |
| `src/data/modules.ts` (`MODULE_STATUS`) | `plans.purchasable` op prod | een module die te koop is heet "Binnenkort", of een module die niet bestaat lijkt beschikbaar |
| `src/data/kennis/index.ts` | pakketstatus | "Geen enkel pakket is op dit moment te koop" klopt niet meer |

`cao.ts` is de gevaarlijkste, want die voedt zowel de EmmaLoont-pagina als de
kennisbasis van de chatbot.

## Hoe hij draait

Routine `trig_019T7csAahq5USKHpYcy8VAU`, elke maandag 08:00 Nederlandse tijd,
in een verse sessie, met de Supabase-connector eraan gekoppeld.

**Over de goedkeuringen.** Elke aanroep van een connector-tool vraagt om
akkoord op de telefoon. In de eerste opzet deed de controle zes losse queries,
dus zes keer tikken. De opdracht hieronder doet er nog maar **één**: alle drie
de controles zitten in één `union all`. Dat is de reden dat die query er zo
uitziet, en dat de opdracht zo nadrukkelijk zegt niet verder te vragen.

Wil je ook die ene tik kwijt, dan is de enige weg om de connector te laten
staan en in plaats daarvan een lees-only databasegebruiker in de omgeving te
zetten, zodat de controle via `curl` kan. Dat werkt, maar het zet een sleutel
op een plek waar er nu geen staat. Zolang één tik per week acceptabel is, niet
doen.

Een webhook of API-aanroep verandert hier niets aan: dat bepaalt alleen wát de
routine start, niet wat de gestarte sessie mag. De goedkeuringsvraag komt van
de rechten van die sessie, niet van de aanleiding.

**Mailmelding staat bewust uit.** Dat is een keuze van Tom, niet iets dat
vergeten is; zet hem niet "behulpzaam" weer aan. Dat kan omdat de melding
niet nodig is om te weten of de controle gedraaid heeft: de
goedkeuringsvraag op de telefoon is zelf het teken van leven. Komt die op
maandagochtend niet, dan is er iets mis met de routine. Vindt de controle een
verschil, dan blijkt dat uit een commit op main; vindt hij niets, dan hoort er
ook niets te gebeuren.

## De opdracht

De volledige opdracht staat in de routine zelf (`trig_019T7csAahq5USKHpYcy8VAU`,
te vinden onder Scheduled op claude.ai). Hij is te lang om hier woordelijk te
herhalen zonder dat de twee versies uit elkaar gaan lopen, en dat is precies de
fout die dit document beschrijft.

Wat je moet weten om hem te kunnen beoordelen:

1. Eén Supabase-aanroep, met een `union all` die de cao-status, de
   volledigheidsvelden, het aantal concepten en alle plannen in één keer
   ophaalt. Meer aanroepen betekent meer tikken op de telefoon.
2. Stap 1 is de vaste controle, stap 2 de cao-lancering, stap 3 de
   modulelancering.
3. De grendel op de beweringen staat hierboven beschreven.
4. Cijfers naar `main`, wervende tekst naar een branch.

## Laatste meting

10 augustus 2026, met de hand nagemeten en gelijk aan wat er in de code staat:

- **Cao:** één actief (Kappersbedrijf), 28 concept, 16 verouderd
- **Modules koopbaar:** boekt, waakt, ziet, vindt, loont. Niet: coacht,
  schrijft, promoot
- **Pakketten:** alle vier `purchasable=false, active=false`
