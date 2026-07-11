import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { Header, Footer, BookingCTA, PageHero, useInView } from "@/components/Site";

export const Route = createFileRoute("/tjanster/digitala-system-ai")({
  head: () => ({
    meta: [
      { title: "Digitala system & AI-verktyg | ABO Growth" },
      {
        name: "description",
        content:
          "Strategin först, tekniken sedan. Vi hjälper företag att välja och införa rätt digitala system och AI-verktyg: en helhet som hänger ihop, utan teknikskuld.",
      },
      { property: "og:title", content: "Digitala system & AI-verktyg | ABO Growth" },
      { property: "og:description", content: "Strategin först, sedan rätt system, rätt införda." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://abogrowth.se/tjanster/digitala-system-ai" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://abogrowth.se/tjanster/digitala-system-ai" }],
  }),
  component: Page,
});

const deliverables = [
  { t: "Systemstrategi", b: "En samlad bild av vilka system ni behöver, hur de hänger ihop och i vilken ordning de ska på plats." },
  { t: "Arbetsflödesanalys", b: "Vi kartlägger hur arbetet faktiskt görs, inte hur det borde göras enligt processkartan." },
  { t: "Behovsdefinition", b: "Vad ska lösas, av vem, och hur mäter vi att det fungerar?" },
  { t: "Val av verktyg", b: "Objektiv jämförelse av system och AI-verktyg utifrån behov, budget och integration." },
  { t: "Införande & integration", b: "Konfiguration, integrationer, dataflytt och rollout i etapper, plus utbildning av teamet." },
  { t: "Uppföljning", b: "Adoption, effektmätning och iteration efter go-live." },
];

// Systemkartans noder. x/y = slutposition (% av ytan), sx/sy/sr = startläget:
// en rörig hög kring mitten som glider ut till ordnade platser runt affären.
// Navet ("Er affär") ligger stilla — affären flyttar sig inte, verktygen gör det.
const mapNodes = [
  { label: "Er affär", x: 50, y: 50, sx: 50, sy: 50, sr: 0, hub: true },
  { label: "CRM", x: 16, y: 20, sx: 42, sy: 38, sr: -10 },
  { label: "Mejl & kalender", x: 84, y: 18, sx: 58, sy: 42, sr: 7 },
  { label: "Ekonomi", x: 14, y: 78, sx: 44, sy: 61, sr: 9 },
  { label: "Analys", x: 86, y: 80, sx: 57, sy: 58, sr: -7 },
  { label: "Innehåll", x: 50, y: 8, sx: 48, sy: 33, sr: 12 },
  { label: "AI-assistent", x: 50, y: 92, sx: 53, sy: 66, sr: -12 },
];

/**
 * SystemMap — sidans signaturscen. Verktygsboxarna ligger först huller om
 * buller kring mitten; när ytan scrollas in glider de ut till sina platser
 * och kopplingslinjerna till affären ritas. Hela poängen med tjänsten som
 * en enda animation: ordning ur röran, med affären i centrum.
 */
function SystemMap() {
  const { ref, inView } = useInView<HTMLDivElement>(0.45);
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <div className="eyebrow mb-5">Helheten</div>
          <h2 className="display-heading text-3xl md:text-4xl">
            Från spridda verktyg till <span className="text-brand-green">ett system</span>.
          </h2>
          <p className="mt-6 text-ink/75 leading-relaxed">
            Så här tänker vi: affären i mitten, verktygen runt omkring, valda
            för att de löser er uppgift och pratar med varandra. I praktiken
            betyder det att ett lead från sajten hamnar direkt i CRM:et,
            att mejlen loggas automatiskt och att månadsrapporten i princip
            skriver sig själv.
          </p>
        </div>
        <div
          ref={ref}
          aria-hidden="true"
          className={`sysmap relative mt-12 h-72 md:h-96 ${inView ? "is-visible" : ""}`}
        >
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
            {mapNodes.filter((n) => !n.hub).map((n, i) => (
              <line
                key={n.label}
                className="sysmap-link"
                pathLength={1}
                x1="50" y1="50" x2={n.x} y2={n.y}
                stroke="#1F8A5C"
                strokeOpacity="0.35"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                style={{ transitionDelay: `${0.85 + i * 0.12}s` }}
              />
            ))}
          </svg>
          {/* Pulsring som andas runt navet */}
          <span className="sysmap-hub-ring" style={{ left: "50%", top: "50%" }} />
          {/* Datapulser längs linjerna, varannan åt varje håll */}
          {mapNodes.filter((n) => !n.hub).map((n, i) => (
            <span
              key={`pulse-${n.label}`}
              className={`sysmap-pulse ${i % 2 === 1 ? "flow-back" : ""}`}
              style={{
                ["--nx" as string]: `${n.x}%`,
                ["--ny" as string]: `${n.y}%`,
                animationDelay: `${2.2 + i * 0.55}s`,
              }}
            />
          ))}
          {mapNodes.map((n, i) => (
            <div
              key={n.label}
              className="sysmap-node absolute"
              style={{
                left: `${inView ? n.x : n.sx}%`,
                top: `${inView ? n.y : n.sy}%`,
                transform: `translate(-50%, -50%) rotate(${inView ? 0 : n.sr}deg)`,
                opacity: inView ? 1 : 0.55,
                transitionDelay: `${i * 0.07}s`,
                zIndex: n.hub ? 2 : 1,
              }}
            >
              {/* Inre boxen svävar och reagerar på hover; yttre sköter positionen */}
              <div
                className={`sysmap-node-box whitespace-nowrap px-3.5 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-semibold ${
                  n.hub
                    ? "bg-brand-green text-paper shadow-md"
                    : "bg-white border border-line text-ink/80 shadow-sm"
                }`}
                style={{ animationDelay: `${1.6 + i * 0.8}s` }}
              >
                {n.label}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-subtle max-w-xl">
          Boxarna är exempel. Vilka som ingår hos er avgörs av strategin, inte av trenderna.
        </p>
      </div>
    </section>
  );
}

// Samma tre-fas-upplägg som övriga tjänstesidor, så ett uppdrag känns igen
// oavsett vilken tjänst man läser om.
const steps = [
  { n: "01", t: "Kartläggning", b: "1–2 veckor. Vi går igenom era arbetsflöden och system: vad ni har, vad som faktiskt används och var tiden läcker." },
  { n: "02", t: "Systemstrategi & val", b: "1–2 veckor. Ni får en konkret plan: vilka verktyg ni behöver, i vilken ordning de ska på plats och vad det kostar." },
  { n: "03", t: "Införande & uppföljning", b: "Löpande. Vi konfigurerar, integrerar och utbildar teamet. Sedan mäter vi effekten och justerar tills det sitter." },
];

const useCases = [
  { t: "Få ordning på systemfloran", b: "Färre verktyg, tydligare ägarskap och integrationer som gör att data slutar bo i silos." },
  { t: "Effektivisera säljprocessen", b: "CRM, sekvensering och AI-stöd för kvalificering och uppföljning." },
  { t: "Automatisera administration", b: "Fakturering, rapportering och dokumenthantering, med AI där det faktiskt sparar tid." },
];

function Page() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main>
        <PageHero
          eyebrow="Tjänst 01 · Digitala system & AI"
          title={<>Strategin först. <span className="text-brand-green">Tekniken sedan.</span></>}
          intro="Vi kartlägger era arbetsflöden, väljer rätt system och AI-verktyg, inför dem och utbildar teamet. Ni får en digital helhet som hänger samman och en vardag där systemen jobbar åt er, inte tvärtom."
        />

        <section className="border-b border-line bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="max-w-2xl">
              <div className="eyebrow mb-5">Vår hållning</div>
              <h2 className="display-heading text-3xl md:text-4xl">
                Verktyg ska <span className="text-brand-green">tjäna affären</span>, inte tvärtom.
              </h2>
              <p className="mt-6 text-ink/75 leading-relaxed">
                Ny teknik är billig. Fel val är dyrt. Frågan är inte vilket
                verktyg som är hetast, utan vilken helhet som löser er uppgift.
                Vi hjälper er välja pragmatiskt, införa etappvis och mäta
                effekten, inte samla fler prenumerationer.
              </p>
            </div>
          </div>
        </section>

        <SystemMap />

        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="eyebrow mb-5">Vad ni får</div>
            <h2 className="display-heading text-3xl md:text-4xl">Leverabler</h2>
            <p className="mt-6 mb-12 text-ink/75 leading-relaxed max-w-2xl">
              Sex konkreta delar. Tillsammans tar de er från dagens läge till
              en vardag där systemen sköter rutinerna och ni sköter affären.
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {deliverables.map((d) => (
                <div
                  key={d.t}
                  className="bg-white border border-line p-8 shadow-sm hover:shadow-md hover:border-brand-green/40 transition-all"
                >
                  <Check className="h-5 w-5 text-brand-green mb-4" strokeWidth={2.5} />
                  <h3 className="display-heading text-lg mb-3">{d.t}</h3>
                  <p className="text-sm text-ink/70 leading-relaxed">{d.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <div className="eyebrow mb-5">Upplägg</div>
              <h2 className="display-heading text-3xl md:text-4xl">Tre faser. <span className="text-brand-green">Tydliga milstolpar.</span></h2>
              <p className="mt-6 text-ink/75 leading-relaxed">
                Ett uppdrag hos oss har alltid en tydlig början, konkreta
                beslutspunkter och ett slut ni själva väljer. Inga eviga
                konsulttimmar utan riktning.
              </p>
            </div>
            <div className="md:col-span-8 space-y-6">
              {steps.map((s) => (
                <div
                  key={s.n}
                  className="bg-paper border border-line p-8 shadow-sm hover:shadow-md hover:border-brand-green/40 transition-all flex gap-6"
                >
                  <div className="tracked text-xs text-brand-green pt-1 w-10 shrink-0">{s.n}</div>
                  <div>
                    <h3 className="display-heading text-lg mb-2">{s.t}</h3>
                    <p className="text-sm text-ink/70 leading-relaxed">{s.b}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="eyebrow mb-5">Användningsfall</div>
            <h2 className="display-heading text-3xl md:text-4xl mb-12">Där vi ofta börjar</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {useCases.map((u, i) => (
                <div key={u.t} className="border-t-2 border-brand-green pt-6">
                  <div className="tracked text-xs text-subtle mb-3">0{i + 1}</div>
                  <h3 className="display-heading text-xl mb-3">{u.t}</h3>
                  <p className="text-sm text-ink/70 leading-relaxed">{u.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <BookingCTA
          title="Osäkra på vilka system och verktyg ni behöver?"
          body="Vi tar ett första möte och kartlägger var effekten är störst, och i vilken ordning. Konkret, inte teoretiskt."
        />

        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-6 py-16 flex flex-wrap items-center justify-between gap-6">
            <Link to="/tjanster/affarsutveckling" className="group inline-flex items-center gap-3 text-sm font-semibold">
              <span className="tracked text-xs text-subtle">Nästa tjänst</span>
              <span className="border-b-2 border-brand-green pb-0.5 group-hover:text-brand-green">Affärsutveckling & tillväxtstrategi</span>
              <ArrowUpRight className="h-4 w-4 text-brand-green" strokeWidth={2.5} />
            </Link>
            <Link to="/" className="text-sm text-subtle hover:text-ink">← Tillbaka till startsidan</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
