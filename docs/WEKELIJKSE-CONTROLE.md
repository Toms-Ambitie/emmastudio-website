# Wekelijkse waarheidscontrole

## Waarom dit bestaat

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

## Status

De routine is aangemaakt (`trig_019T7csAahq5USKHpYcy8VAU`) maar staat **uit**.
Reden: een routine die vanuit een sessie wordt aangemaakt, draait zonder
connectortools, en deze organisatie staat niet toe die er alsnog aan te hangen.
Zonder Supabase-toegang kan de controle niets vergelijken. Er staat ook geen
Supabase-sleutel in de omgeving, dus er is geen omweg via curl.

**Om hem werkend te krijgen:** maak de routine aan via de Routines-pagina op
claude.ai en koppel daar de Supabase-connector. Plak de opdracht hieronder als
prompt, zet hem op maandag 08:00, en laat hem een verse sessie starten met
mailmelding. Daarna is er geen handmatige stap meer nodig.

## De opdracht

```
Wekelijkse controle of de website van EmmaStudio nog klopt met de werkelijkheid
op productie. Werk zelfstandig; er kijkt niemand mee.

Repo: Toms-Ambitie/emmastudio-website, branch main. Supabase productieproject:
rzizzoatvfdzmbwornss (emmastudio-prod), via de Supabase MCP-tools.

ACHTERGROND. Deze site heeft een terugkerend probleem gehad: teksten die iets
beweerden wat de code of de database niet deed. Een paar bestanden zijn met de
hand bijgehouden kopieën van een databasestand die daarbuiten om verandert.
Deze controle bestaat om dat verschil te vinden voordat een bezoeker het vindt.

CONTROLEER DEZE DRIE:

1. CAO-DEKKING. Query prod:
   select c.naam, v.status from cao c join cao_versie v on v.cao_id = c.id
   where v.status = 'actief';
   en tel hoeveel versies er op 'concept' staan.
   Vergelijk met src/data/cao.ts: CAO_GEVALIDEERD moet exact de namen bevatten
   van de cao's met een actieve versie, CAO_IN_VOORBEREIDING is het aantal
   concept-versies. Werk CAO_GEMETEN_OP bij naar vandaag.
   Dit bestand voedt de EmmaLoont-pagina en de kennisbasis van de chatbot, dus
   een afwijking betekent dat Emma bezoekers verkeerd voorlicht over hun cao.

2. MODULESTATUS. Query de plans-tabel op prod (purchasable en active per
   module) en vergelijk met MODULE_STATUS in src/data/modules.ts. Een module
   die op prod koopbaar is maar op de site "Binnenkort" heet, kost omzet;
   andersom kost het vertrouwen. Let op: koopbaar zijn en technisch draaien
   zijn twee verschillende assen. Verander MODULE_STATUS alleen als de module
   ook echt bereikbaar en werkend is. Twijfel je, meld het dan in plaats van
   het te wijzigen.

3. PAKKETTEN. Controleer of de vier pakketten nog op purchasable = false
   staan. Staan ze op true, dan klopt "Geen enkel pakket is op dit moment te
   koop" niet meer; die zin staat in src/data/kennis/index.ts en wordt door een
   bouwcontrole afgedwongen.

BIJ EEN VERSCHIL. Pas de databestanden aan, draai `npm run build` (de
zelfcontrole van de kennisbasis draait daarin mee en laat de build vallen bij
onzin), commit met een bericht dat de gemeten waarden noemt, en push naar main.
Push niets als de build niet slaagt.

ALS ALLES KLOPT. Niets wijzigen, niets pushen. Rond af met een korte melding
dat de drie controles klopten.

Schrijf je samenvatting in het Nederlands, tutoyeren, zonder uitroeptekens en
zonder gedachtestreepjes (em-dash of en-dash) als leesteken; dat is een harde
huisstijlregel van dit project.
```

## Tot die tijd

Zeg het even zodra je een cao activeert of een module koopbaar maakt, dan pas
ik `cao.ts` of `MODULE_STATUS` bij. Dat is de handmatige variant van precies
deze controle.

Laatst met de hand gemeten: 10 augustus 2026. Eén actieve cao (Kappersbedrijf),
28 concept, 16 verouderd. Vijf modules live en koopbaar, drie niet gebouwd,
vier pakketten niet koopbaar.
