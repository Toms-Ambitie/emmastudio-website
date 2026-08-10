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

```
Wekelijkse controle of de website van EmmaStudio nog klopt met de werkelijkheid
op productie. Werk zelfstandig; er kijkt niemand mee.

Repo: Toms-Ambitie/emmastudio-website, branch main.

BELANGRIJK: DOE EXACT ÉÉN SUPABASE-AANROEP. Elke aanroep vraagt Tom om
goedkeuring op zijn telefoon, dus meer dan één is hinderlijk. Roep
mcp__Supabase__execute_sql precies één keer aan, met project_id
rzizzoatvfdzmbwornss en letterlijk deze query:

select 'cao_actief' as soort, c.naam as sleutel, v.status as waarde
from cao c join cao_versie v on v.cao_id = c.id where v.status = 'actief'
union all
select 'cao_concept_aantal', 'totaal', count(*)::text from cao_versie where status = 'concept'
union all
select 'plan_' || kind, plan_key, 'purchasable=' || purchasable::text || ' active=' || active::text
from plans where billing_interval = 'month'
order by 1, 2;

Heb je die uitkomst, doe dan verder geen enkele query meer, ook niet om iets na
te kijken. Alles wat je nodig hebt zit erin.

ACHTERGROND. Deze site heeft een terugkerend probleem gehad: teksten die iets
beweerden wat de code of de database niet deed. Drie bestanden zijn een met de
hand bijgehouden kopie van een databasestand die daarbuiten om verandert. Deze
controle vindt dat verschil voordat een bezoeker het vindt.

VERGELIJK DE UITKOMST MET DE CODE:

1. CAO. De regels met soort 'cao_actief' geven de cao's die een klant echt kan
   kiezen. Die namen moeten exact in CAO_GEVALIDEERD staan in src/data/cao.ts.
   Het getal bij 'cao_concept_aantal' hoort CAO_IN_VOORBEREIDING te zijn. Werk
   bij een wijziging ook CAO_GEMETEN_OP bij naar vandaag.
   Dit bestand voedt de EmmaLoont-pagina én de kennisbasis van de chatbot, dus
   een afwijking betekent dat Emma bezoekers verkeerd voorlicht over hun cao.

2. MODULES. De regels 'plan_module' met purchasable=true zijn de modules die op
   prod te koop zijn. Vergelijk met MODULE_STATUS in src/data/modules.ts. Een
   module die te koop is maar op de site "Binnenkort" heet, kost omzet;
   andersom kost het vertrouwen. Let op: koopbaar zijn en technisch werken zijn
   twee verschillende assen. Zet een module alleen op live als hij ook echt
   bereikbaar is; twijfel je, meld het dan in plaats van het te wijzigen.

3. PAKKETTEN. De regels 'plan_bundle' horen allemaal purchasable=false te zijn.
   Staat er één op true, dan klopt de zin "Geen enkel pakket is op dit moment te
   koop" niet meer. Die staat in src/data/kennis/index.ts en wordt door een
   bouwcontrole afgedwongen.

BIJ EEN VERSCHIL. Pas de databestanden aan, draai `npm run build` (de
zelfcontrole van de kennisbasis draait daarin mee en laat de build vallen bij
onzin), commit met een bericht dat de gemeten waarden noemt, en push naar main.
Push niets als de build niet slaagt.

ALS ALLES KLOPT. Niets wijzigen, niets pushen.

Noem in je samenvatting altijd de gemeten waarden, ook als alles klopt: welke
cao's actief zijn, hoeveel concept, welke modules koopbaar, en of de pakketten
nog dicht staan. Zo is één blik genoeg.

Schrijf je samenvatting in het Nederlands, tutoyeren, zonder uitroeptekens en
zonder gedachtestreepjes (em-dash of en-dash) als leesteken; dat is een harde
huisstijlregel van dit project.
```

## Laatste meting

10 augustus 2026, met de hand nagemeten en gelijk aan wat er in de code staat:

- **Cao:** één actief (Kappersbedrijf), 28 concept, 16 verouderd
- **Modules koopbaar:** boekt, waakt, ziet, vindt, loont. Niet: coacht,
  schrijft, promoot
- **Pakketten:** alle vier `purchasable=false, active=false`
