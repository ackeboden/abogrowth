/**
 * Casen, på ett ställe. Case-sidan visar hela kortet, startsidan visar en
 * kort recensionsvariant av de översta i listan.
 *
 * Nyast först. Skriv aldrig in siffror eller resultat som kunden inte har
 * godkänt, och korta citat bara genom att plocka hela meningar ur citatet,
 * aldrig genom att skriva om dem.
 */
export type Case = {
  slug: string;
  klient: string;
  // Logotypen är frivillig. Saknas den skrivs kundens namn ut som rubrik.
  logotyp?: { src: string; bredd: number; hojd: number };
  tagline: string;
  webbplats: { url: string; etikett: string };
  ingress: string;
  taggar: string[];
  steg: { n: string; rubrik: string; text: string }[];
  resultat: string;
  // Kortversionen på startsidan: en rad om vad det gav.
  kortResultat: string;
  citat: { text: string; namn: string; titel: string };
  // De första meningarna ur citatet, ordagrant, för startsidans kort.
  kortCitat: string;
};

export const caseLista: Case[] = [
  {
    slug: "forcap",
    klient: "Forcap",
    logotyp: { src: "/forcap.webp", bredd: 610, hojd: 140 },
    tagline: "Skogsrådgivning och skogsförvaltning för skogsägare",
    webbplats: { url: "https://forcap.se", etikett: "forcap.se" },
    ingress:
      "Forcap är ett rådgivningsföretag i Skellefteå som hjälper skogsägare med skogsförvaltning, strategisk rådgivning och skogsskötsel.",
    taggar: [
      "Målgruppsanalys",
      "Mätning och spårning",
      "SEO och innehåll",
      "Google Ads",
      "Meta och LinkedIn",
      "Nyhetsbrev",
      "Månadsrapport",
    ],
    steg: [
      {
        n: "01",
        rubrik: "Utgångsläget",
        text: "Kunskapen och kundrelationerna fanns redan, men Forcap hade aldrig annonserat digitalt och webbplatsen saknade både mätning och en tydlig strategi.",
      },
      {
        n: "02",
        rubrik: "Grunden",
        text: "Vi gjorde en målgruppsanalys för att identifiera rätt personer och rätt kanaler. Sedan satte vi upp Google Tag Manager, Google Analytics och samtyckeshantering, så att varje insats går att följa upp.",
      },
      {
        n: "03",
        rubrik: "Webbplatsen och kampanjerna",
        text: "Vi tog fram en sökordskarta och ny text till webbplatsen, där varje sida har ett tydligt huvudsökord. Sommaren 2026 lanserade vi Forcaps första Google Ads-kampanj och en Meta-kampanj med annonser i flera format.",
      },
      {
        n: "04",
        rubrik: "Det löpande arbetet",
        text: "Vi skriver blogginlägg och nyhetsbrev, publicerar inlägg på LinkedIn och Meta, driver annonser under kampanjperioderna och följer upp allt i en månadsrapport.",
      },
    ],
    resultat:
      "Idag har Forcap en marknadsföring som går att mäta, en plan med tydliga kampanjperioder och innehåll på webbplatsen som hjälper skogsägare att hitta dem när de söker svar.",
    kortResultat: "En marknadsföring som går att mäta, och en plan med tydliga kampanjperioder.",
    citat: {
      text: "Alexander har med stort engagemang hjälpt oss att få igång vår marknadsföring. Bra kommunikation och tydlig uppföljning har varit genomgående. Alexander kommer löpande med många goda idéer och tips kring hur vi kan utveckla och forma vår annonsering. Nu har vi även en marknadsföring som går att mäta.",
      namn: "Lina Karlsson",
      titel: "VD-assistent, Forcap AB",
    },
    kortCitat:
      "Alexander har med stort engagemang hjälpt oss att få igång vår marknadsföring. Bra kommunikation och tydlig uppföljning har varit genomgående.",
  },
  {
    slug: "kassaboken",
    klient: "Kassaboken",
    logotyp: { src: "/kassaboken.webp", bredd: 875, hojd: 140 },
    tagline: "Digital bokföring för enskilda näringsidkare och skogsägare",
    webbplats: { url: "https://kassaboken.se", etikett: "kassaboken.se" },
    ingress:
      "Kassabokens mission är att spara tid och pengar åt småföretagare. Verktyget är inspirerat av den klassiska kassaboken, ger färdiga deklarationsbilagor och gör bokföringen både enkel och trygg.",
    taggar: ["Marknadsstrategi", "Årsplanering", "SEO och innehåll", "Nyhetsbrev", "Annonsering", "Månadsrapport"],
    steg: [
      {
        n: "01",
        rubrik: "Utgångsläget",
        text: "Produkten löser ett verkligt problem, men målgruppen finns i många kanaler och det saknades en konkret plan för hur Kassaboken skulle nå ut.",
      },
      {
        n: "02",
        rubrik: "Strategin",
        text: "Vi identifierade målgruppen och tog fram en marknadsstrategi och en årsplanering med kanaler, budget och mål.",
      },
      {
        n: "03",
        rubrik: "Genomförandet",
        text: "Vi ansvarar för genomförandet: blogginlägg utifrån en sökordskarta, nyhetsbrev och annonser i Kassabokens grafiska profil.",
      },
      {
        n: "04",
        rubrik: "Uppföljningen",
        text: "Allt följs upp i en månadsrapport. Kassaboken ser vad som gjorts, vad det gav och vad som står näst på tur.",
      },
    ],
    resultat:
      "Idag har Kassaboken en samlad och kontinuerlig marknadsföring, och löpande innehåll på webbplatsen som arbetar för dem året runt.",
    kortResultat: "Samlad och kontinuerlig marknadsföring, med innehåll som arbetar året runt.",
    citat: {
      text: "Alexander har gett vår marknadsföring en tydlig riktning. Vi vet alltid vad som görs och varför, och det gör att vi kan lägga vår tid på produkten och våra kunder.",
      namn: "Nils Lundmark",
      titel: "VD, Kassaboken",
    },
    kortCitat: "Alexander har gett vår marknadsföring en tydlig riktning. Vi vet alltid vad som görs och varför.",
  },
];

// Startsidan visar de två senaste casen. Lägger du till ett nytt case högst
// upp i listan byts startsidans kort ut av sig själva.
export const casePaStartsidan = caseLista.slice(0, 2);
