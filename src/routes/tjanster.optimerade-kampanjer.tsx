import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { Header, Footer, BookingCTA, PageHero, Reveal } from "@/components/Site";

export const Route = createFileRoute("/tjanster/optimerade-kampanjer")({
  head: () => ({
    meta: [
      { title: "Optimerade kampanjer | ABO Growth" },
      {
        name: "description",
        content:
          "Kampanjer på rätt kanaler, med rätt budskap, löpande optimerade mot resultat. Vi hittar var er målgrupp finns och maximerar effekten.",
      },
      { property: "og:title", content: "Optimerade kampanjer | ABO Growth" },
      { property: "og:description", content: "Rätt budskap på rätt kanaler, optimerat löpande mot resultat." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://abogrowth.se/tjanster/optimerade-kampanjer" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://abogrowth.se/tjanster/optimerade-kampanjer" }],
  }),
  component: Page,
});

const deliverables = [
  { t: "Kanalstrategi", b: "Vi väljer kanaler där er målgrupp faktiskt finns, inte där det låter modernt." },
  { t: "Målgrupp & segment", b: "Konkreta segment som styr budskap, format och budget." },
  { t: "Kampanjstruktur & uppsättning", b: "Konton, spårning, kampanjer och målgrupper riggade rätt från start." },
  { t: "Annonsmaterial & budskap", b: "Bilder, video och copy anpassade per kanal och steg i kundresan." },
  { t: "Löpande optimering", b: "A/B-tester på budskap, målgrupper och format. Vi skalar det som fungerar." },
  { t: "Rapportering & uppföljning", b: "Tydliga rapporter mot affärsmål, inte fåfängemått." },
];

const steps = [
  { n: "01", t: "Kartläggning", b: "1–2 veckor. Mål, målgrupp, kanaler och mätning på plats." },
  { n: "02", t: "Uppsättning", b: "1–2 veckor. Konton, spårning, material och första kampanjer i luften." },
  { n: "03", t: "Optimering & uppföljning", b: "Löpande. A/B-tester, iteration och skalning mot resultat." },
];

function Page() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main>
        <PageHero
          eyebrow="Tjänst 03 · Optimerade kampanjer"
          title={<>Rätt budskap, på rätt kanaler, <span className="text-brand-green">optimerat löpande</span>.</>}
          intro="Strategin först: vi börjar i affärsmålet, hittar var er målgrupp finns och väljer kanaler därefter. Sedan optimerar vi mot resultat, inte mot att synas för synandets skull."
        />

        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <Reveal>
              <div className="eyebrow mb-5">Vad ni får</div>
              <h2 className="display-heading text-3xl md:text-4xl mb-12">Leverabler</h2>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {deliverables.map((d, i) => (
                <Reveal key={d.t} delay={i * 90}>
                  <div className="h-full bg-white border border-line p-5 md:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-green/40 hover:-translate-y-1">
                    <Check className="h-5 w-5 text-brand-green mb-4" strokeWidth={2.5} />
                    <h3 className="display-heading text-lg mb-3">{d.t}</h3>
                    <p className="text-sm text-ink/70 leading-relaxed">{d.b}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 grid md:grid-cols-12 gap-12">
            <Reveal className="md:col-span-4">
              <div className="eyebrow mb-5">Upplägg</div>
              <h2 className="display-heading text-3xl md:text-4xl">Tre faser. <span className="text-brand-green">Tydliga milstolpar.</span></h2>
            </Reveal>
            <div className="md:col-span-8 space-y-6">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 110}>
                  <div className="bg-white border border-line p-5 md:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-green/40 hover:-translate-y-1 flex gap-6">
                    <div className="tracked text-xs text-brand-green pt-1 w-10 shrink-0">{s.n}</div>
                    <div>
                      <h3 className="display-heading text-lg mb-2">{s.t}</h3>
                      <p className="text-sm text-ink/70 leading-relaxed">{s.b}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <BookingCTA
          title="Vill ni få mer ut av era kampanjer?"
          body="Ett första möte räcker för att se var effekten är störst och var pengarna rinner ut idag."
        />

        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-6 py-16 flex flex-wrap items-center justify-between gap-6">
            <Link to="/tjanster/digitala-system-ai" className="group inline-flex items-center gap-3 text-sm font-semibold">
              <span className="tracked text-xs text-subtle">Nästa tjänst</span>
              <span className="border-b-2 border-brand-green pb-0.5 group-hover:text-brand-green">Digitala system & AI-verktyg</span>
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
