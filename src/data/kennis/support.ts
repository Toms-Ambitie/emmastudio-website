/* ── SUPPORT-ANTWOORDEN ─────────────────────────────────────────────────────
   Vragen die bezoekers en klanten echt stellen, met het antwoord erbij.

   Herkomst: `emmastudio-app/docs/SUPPORT-ANTWOORDEN.md`. Dat document is voor
   Tom, die zelf mailt; dit is voor de chatbot. Het verschil is klein maar
   belangrijk -- waar het originele antwoord "mail dan even, dan kijk ik het na"
   zegt, hoort hier de doorzet-actie. De feiten zijn identiek.

   Waarom deze antwoorden met de hand hier staan en niet afgeleid worden: dit
   zijn de dingen die NIET op de site staan. De randen, de "nee, dat kan niet",
   de "waarom is het zo goedkoop". Juist die vragen stelt een twijfelende
   prospect, en juist daar verzint een chatbot zonder bron iets moois.

   Deze antwoorden zijn voorbeelden van juiste inhoud en toon, geen scripts.
   Emma mag ze in eigen woorden geven. */

export const SUPPORT = `
# Veelgestelde vragen, met het antwoord

## Abonnement en prijs

**"Zit ik ergens aan vast?"**
Nee. Maandelijks opzegbaar, en je data blijft van jou. Bij EmmaBoekt staat je
volledige boekhouding gewoon in e-Boekhouden.nl: stop je met Emma, dan verlies
je niets, want de boekhouding stond daar toch al.

**"Waarom is er geen gratis versie?"**
Omdat €9 per maand die rol al vervult. Een gratis versie betekent meestal een
uitgeklede versie, en dan weet je nog steeds niet of het voor jou werkt. Je
krijgt liever 14 dagen de échte module.

**"Wat gebeurt er na de proefperiode?"**
Niets, tenzij je zelf iets doet. Je start zonder creditcard, dus er kan ook
niets worden afgeschreven. Vul je geen betaalgegevens in, dan pauzeert je
account: geen factuur, geen opzegging nodig. Je gegevens blijven staan, dus je
kunt later verder waar je gebleven was.

**"Kan ik later een module bijnemen?"**
Ja, dat regel je zelf in de app onder Abonnement. Ook een nieuwe module begint
met 14 dagen gratis.

**"Ik wil opzeggen."**
Dat regel je zelf in de app onder Abonnement; het loopt af aan het eind van je
maand. Geen weerstand, geen kortingsaanbod. Vraag wel vriendelijk of hij wil
vertellen wat er niet werkte -- niet om hem om te praten, maar om het beter te
maken -- en zet dat antwoord door naar Tom.

## EmmaBoekt

**"Vervangt het e-Boekhouden.nl?"**
Nee, juist niet. e-Boekhouden.nl blijft de motor van je boekhouding en alles
blijft daar netjes staan. Emma is de schil eromheen die het dagelijkse werk
sneller maakt. Je logt alleen bijna nooit meer rechtstreeks in.

**"Ik gebruik SnelStart / Moneybird / Exact."**
Dan kan EmmaBoekt op dit moment nog niets voor je doen; we werken alleen met
e-Boekhouden.nl. De koppeling is zo gebouwd dat een tweede pakket erbij kan, en
SnelStart en Moneybird staan op de lijst, maar er is geen datum. Exact is bewust
geen doel: wie Exact gebruikt heeft meestal een eigen boekhouder, en dan voegt
Emma weinig toe.

**"Boekt Emma dingen automatisch?"**
Nee, en dat is expres. Emma leest je bon of factuur, herkent de leverancier, het
bedrag en de btw, en stelt de grootboekrekening voor met de reden erbij. Pas als
jij op Boeken klikt, gaat het je administratie in.

**"Hoe stuur ik een bon naar Emma?"**
Sleep de PDF of foto in je inbox in Emma. Emma leest hem en zet een voorstel
klaar.

**"Blijft mijn accountant erbij kunnen?"**
Ja. Je accountant houdt gewoon toegang tot e-Boekhouden.nl en blijft
eindverantwoordelijk. Emma neemt het voorbereidende werk over.

**"Ik heb een factuur in dollars gekregen."**
Die kun je gewoon inboeken. Emma rekent hem om naar euro tegen de koers van de
factuurdatum en bewaart de originele valuta en koers in de omschrijving. Dat
moet ook zo: de Belastingdienst wil je boekhouding in euro's.

**"Kan ik terugkerende facturen maken?"**
Ja. Die functie is wel nieuw en nog nauwelijks door klanten gebruikt, dus zeg
erbij dat ze het mogen melden als er iets misgaat.

## EmmaWaakt

**"Ik heb geen boekhoudkoppeling. Kan ik EmmaWaakt dan gebruiken?"**
Ja. Heb je EmmaBoekt, dan komen je cijfers vanzelf binnen. Heb je die niet, dan
upload je een omzet- en kostenoverzicht uit je eigen kassa- of boekhoudsysteem.
Emma leest het uit, jij bevestigt, en daarna werkt je dashboard hetzelfde.

**"Mijn upload wordt geweigerd."**
Waarschijnlijk staan de bedragen inclusief btw. Emma accepteert alleen bedragen
zonder btw, omdat terugrekenen niet betrouwbaar kan: verschillende tarieven door
elkaar geven verkeerde uitkomsten. Zoek in je systeem het overzicht exclusief
btw.

**"Waarom staat er niets op mijn dashboard?"**
Omdat Emma niets verzint. Staat er geen cijfer, dan is er geen bron. Dat is
bewust: liever een lege plek dan een getal waar je op stuurt terwijl het nergens
op slaat.

**"Kan ik mijn kosten met mijn budget vergelijken?"**
Nog niet. Je ziet je kosten per categorie en je kunt doelen instellen voor omzet
en marge, maar een begroting waar Emma tegenaan rekent zit er niet in.

## EmmaZiet

**"Hoe weet Emma wie mijn concurrenten zijn?"**
Via het openbare KvK-register. Emma kijkt naar je SBI-code en een straal die je
zelf instelt, en komt met een voorstel. Jij bepaalt wie er op je lijst blijft
staan, want jij weet wie je echte concurrent is en Emma niet.

**"Waarom zie ik geen prijzen van een concurrent?"**
Omdat er niets te halen valt. Emma leest prijzen van de website van je
concurrent. Staat er geen prijslijst op, dan blijft die leeg. En Emma vergelijkt
alleen diensten die jij zelf hebt gekoppeld: een gegokte match is erger dan een
lege plek.

**"Waar komen de reviews vandaan?"**
Van Google. Emma haalt ze op, haalt de terugkerende thema's eruit en houdt bij
of het sentiment beter of slechter wordt. Geen social media. Alleen openbare
bronnen.

**"Staat mijn eigen zaak er ook tussen?"**
Die kun je uitsluiten. Je legt eenmalig je eigen vestiging vast, en dan houdt
Emma jezelf uit de lijst.

## EmmaVindt

**"Zoekt Emma op LinkedIn?"**
Nee, en dat doen we bewust niet. De officiële LinkedIn-API staat zoeken op
personen of bedrijven voor leadgeneratie niet toe, en pagina's scrapen is tegen
hun voorwaarden en kost je je account. Emma zoekt in het openbare KvK-register.

**"Wat is het verschil tussen klanten zoeken en personeel werven?"**
Twee aparte schermen, dezelfde techniek eronder. Gescheiden omdat een sollicitant
geen lead is: er gelden andere privacyregels, en je wilt ze niet in één lijst.

**"Mag dit zomaar, met de AVG?"**
Het gaat om openbare bedrijfsgegevens uit het KvK-register. Emma houdt daarnaast
bij wie wat heeft opgezocht en wanneer, zodat je kunt verantwoorden wat er is
gebeurd. Dat is vooral van belang bij werving.

**"Verstuurt Emma zelf berichten?"**
Nee. Emma stelt een eerste bericht voor op basis van wat er openbaar bekend is.
Jij past het aan en verstuurt het zelf.

## EmmaLoont

**"Vervangt dit mijn loonbureau?"**
Grotendeels, maar niet helemaal, en dat hoor je vooraf te weten. Emma rekent het
loon, maakt de loonstroken, legt contracten vast, houdt verlof, verzuim en
declaraties bij en zet de loonkosten in je boekhouding. Wat Emma niet doet, is
de loonaangifte bij de Belastingdienst. Die doe je zelf via Mijn Belastingdienst
Zakelijk, wat mag bij tien of minder werknemers, of je laat die bij je
administratiekantoor.

**"Waarom is het zo goedkoop vergeleken met mijn payroll-bureau?"**
Omdat je bij een bureau vooral uren betaalt. Bij Emma is het software die het
rekenwerk doet, en software schaalt. Er zit geen addertje onder: je krijgt het
reken-, loonstrook- en boekwerk, en niet de aangifte.

**"Zit mijn cao erin?"**
Emma leest openbare cao-loontabellen in en bewaart ze per versie; er staan er
inmiddels tientallen klaar. Volg je geen cao, dan kan dat ook: je legt het
contract dan vast zonder schaal ernaast. Twijfelt iemand over zijn eigen cao,
zet de vraag dan door -- dat is na te kijken, maar niet door jou.

**"Ik wil iemand onder de cao-schaal betalen."**
Dat kan, Emma houdt je niet tegen. Er zijn legitieme redenen voor, bijvoorbeeld
een andere urenbasis of functie. Wat Emma wel doet is de schaal ernaast zetten
en waarschuwen, zodat je het bewust doet en later kunt uitleggen.

**"Hoe komen de loonkosten in mijn boekhouding?"**
Na de loonronde zet Emma de loonjournaalpost klaar. Met EmmaBoekt boekt hij door
naar je boekhouding; zonder krijg je een CSV voor je eigen pakket of je kantoor.
Je koppelt eenmalig welke grootboekrekeningen erbij horen.

**"Kunnen mijn medewerkers zelf iets zien?"**
Ja. Je geeft ze een eigen inlog met de rol medewerker. Ze zien hun eigen
loonstroken en gegevens, en kunnen verlof aanvragen en declaraties indienen. Ze
zien geen bedrijfscijfers en niets van collega's.

**"Krijgt mijn medewerker zijn loonstrook per e-mail?"**
Alleen met zijn toestemming; dat schrijft de wet voor. Zonder toestemming opent
hij hem zelf in de app.

## EmmaCoacht, EmmaSchrijft en EmmaPromoot

**"Wanneer komen die?"**
Daar is geen datum voor, en die geven we ook liever niet. Een datum die we
missen kost meer vertrouwen dan geen datum. Ze staan op de planning.

**"Kan ik er alvast voor betalen?"**
Nee, en dat willen we ook niet. Je betaalt bij Emma alleen voor wat er is.

## Over de app

**"Ik zie een module niet in mijn menu."**
Dan staat die module niet aan voor dat bedrijf. Aanzetten gaat onder
Abonnement, en daarna verschijnen de schermen vanzelf. Emma laat alleen zien
waar je iets aan hebt.

**"Ik ben medewerker en zie bijna niets."**
Dat klopt. Als medewerker zie je alleen wat jou aangaat: je eigen loonstroken,
je eigen gegevens, je verlof en je declaraties. Bedrijfscijfers en gegevens van
collega's zijn afgeschermd.

**"Kan ik iemand toegang geven?"**
Ja, onder Instellingen bij Gebruikers. Je kiest per persoon een rol. Een
beheerder mag meekijken en werken in de bedrijfsdata maar niet bij de
facturatie; een medewerker ziet alleen zichzelf.

**"Waar is de chat in de app? Ik zie Vraag Emma staan."**
Die is er nog niet. Het paneel staat er met het label Binnenkort, maar de chat
zelf werkt nog niet.

## Wanneer je altijd doorzet

Deze gesprekken horen bij Tom, ook als je denkt het antwoord te weten:

- **"Ik zag op jullie site iets staan dat niet in de app zit."** Neem het
  serieus, zeg één keer dat het er niet had moeten staan, en zet het door. Niet
  wegpraten en niet verdedigen.
- **"Het werkt niet zoals ik dacht."** Vraag wat hij deed en wat hij zag, en zet
  dat door met de details erbij.
- Alles over iemands eigen account, factuur, loonstrook of cijfers.
- Elk verzoek om een demo, een offerte of een gesprek.
`.trim();
