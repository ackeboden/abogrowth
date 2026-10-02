import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Header, Footer, BookingCTA, PageHero, Reveal } from "@/components/Site";

export const Route = createFileRoute("/case")({
  head: () => ({
    meta: [
      { title: "Case | ABO Growth" },
      {
        name: "description",
        content:
          "Case från ABO Growth: Forcap och Kassaboken. Målgruppsanalys, mätning, sökordsstyrt innehåll, annonsering och löpande uppföljning i månadsrapport.",
      },
      { property: "og:title", content: "Case | ABO Growth" },
      {
        property: "og:description",
        content: "Riktiga uppdrag, från strategi till löpande genomförande.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://abogrowth.se/case" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://abogrowth.se/case" }],
  }),
  component: Page,
});

type Case = {
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
  citat: { text: string; namn: string; titel: string };
};

// Ett case per post, nyast först. Varje case renderas som ett samlat kort,
// så nya case läggs bara till i listan. Skriv aldrig in siffror eller
// resultat som kunden inte har godkänt.
const caseLista: Case[] = [
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
    citat: {
      text: "Alexander har med stort engagemang hjälpt oss att få igång vår marknadsföring. Bra kommunikation och tydlig uppföljning har varit genomgående. Alexander kommer löpande med många goda idéer och tips kring hur vi kan utveckla och forma vår annonsering. Nu har vi även en marknadsföring som går att mäta.",
      namn: "Lina Karlsson",
      titel: "VD-assistent, Forcap AB",
    },
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
    citat: {
      text: "Alexander har gett vår marknadsföring en tydlig riktning. Vi vet alltid vad som görs och varför, och det gör att vi kan lägga vår tid på produkten och våra kunder.",
      namn: "Nils Lundmark",
      titel: "VD, Kassaboken",
    },
  },
];

function Page() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main>
        <PageHero
          eyebrow="Case"
          title={<>Uppdrag som <span className="text-brand-green-strong">visar hur vi jobbar</span>.</>}
          intro="Riktiga uppdrag, från strategi till löpande genomförande. Vi fyller på här efter hand. Vill ni höra hur vi skulle lägga upp arbetet hos er är det snabbaste att ta ett samtal."
        />

        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 space-y-10 md:space-y-14">
            {caseLista.map((c) => (
              <Reveal key={c.slug}>
                <article className="bg-white border border-line shadow-sm">
                  {/* Kunden */}
                  <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-start p-6 md:p-10 border-b border-line">
                    <div className="md:col-span-5">
                      {c.logotyp ? (
                        <>
                          <h2 className="sr-only">{c.klient}</h2>
                          <img
                            src={c.logotyp.src}
                            width={c.logotyp.bredd}
                            height={c.logotyp.hojd}
                            alt={c.klient}
                            decoding="async"
                            className="h-8 md:h-10 w-auto"
                          />
                        </>
                      ) : (
                        <h2 className="display-heading text-2xl md:text-3xl">{c.klient}</h2>
                      )}
                      <p className="mt-4 text-sm text-ink/70 leading-relaxed">{c.tagline}</p>
                      <a
                        href={c.webbplats.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Besök ${c.webbplats.etikett} (öppnas i ny flik)`}
                        className="mt-5 inline-flex items-center gap-2 border border-ink/20 px-4 py-2.5 text-sm font-semibold hover:border-brand-green-strong hover:text-brand-green-strong transition-colors"
                      >
                        {c.webbplats.etikett}
                        <ArrowUpRight className="h-4 w-4 text-brand-green-strong" strokeWidth={2.5} />
                      </a>
                    </div>
                    <div className="md:col-span-7">
                      <p className="text-ink/80 leading-relaxed">{c.ingress}</p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {c.taggar.map((t) => (
                          <span
                            key={t}
                            className="text-[11px] font-semibold tracked-tight border border-brand-green/35 bg-brand-green/10 px-2.5 py-1.5 text-brand-green-deep"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Uppdraget steg för steg */}
                  <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 divide-line border-b border-line">
                    {c.steg.map((s, i) => (
                      <div
                        key={s.n}
                        className={`relative p-6 md:p-8 ${i % 2 === 1 ? "sm:border-l border-line" : ""} ${
                          i > 1 ? "sm:border-t sm:border-line" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2.5 mb-3">
                          <span
                            aria-hidden="true"
                            className={`h-4 w-1 ${i === 0 ? "bg-brand-blue" : "bg-brand-green"}`}
                          />
                          <span className="tracked text-[11px] text-ink/60">{s.n}</span>
                        </div>
                        <h3 className="display-heading text-base mb-2">{s.rubrik}</h3>
                        <p className="text-sm text-ink/70 leading-relaxed">{s.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Resultat och kundens egna ord */}
                  <div className="grid md:grid-cols-12">
                    <div className="md:col-span-7 p-6 md:p-10">
                      <div className="tracked text-[11px] text-brand-green-strong mb-3">Resultat</div>
                      <p className="text-ink/85 leading-relaxed">{c.resultat}</p>
                    </div>
                    <figure className="md:col-span-5 p-6 md:p-10 bg-ink text-paper">
                      <blockquote className="text-sm md:text-base leading-relaxed text-paper/90">
                        {c.citat.text}
                      </blockquote>
                      <figcaption className="mt-5 text-xs text-paper/65">
                        <span className="font-semibold text-paper">{c.citat.namn}</span>, {c.citat.titel}
                      </figcaption>
                    </figure>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <BookingCTA
          title="Vill ni veta hur vi skulle göra hos er?"
          body="Berätta hur ni jobbar idag, så skissar vi på ett upplägg. Första samtalet kostar ingenting."
        />
      </main>
      <Footer />
    </div>
  );
}
