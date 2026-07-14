import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { Header, Footer, BookingCTA, PageHero, Reveal, useInView } from "@/components/Site";

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

// Kanalkartan: budgeten utgår från målet och varje kanal får ett löpande
// beslut. statusTyp styr brickans utseende; pausad kanal tonas ner.
type KanalNode = {
  label: string;
  x: number; y: number;
  sx: number; sy: number; sr: number;
  hub?: boolean;
  status?: string;
  statusTyp?: "skala" | "justera" | "pausa";
};

const kanalNodes: KanalNode[] = [
  { label: "Ert mål", x: 14, y: 50, sx: 14, sy: 50, sr: 0, hub: true },
  { label: "Sök", x: 72, y: 12, sx: 40, sy: 42, sr: -8, status: "Skala", statusTyp: "skala" },
  { label: "Sociala medier", x: 72, y: 38, sx: 48, sy: 55, sr: 6, status: "Skala", statusTyp: "skala" },
  { label: "Nyhetsbrev", x: 72, y: 64, sx: 44, sy: 60, sr: -6, status: "Justera", statusTyp: "justera" },
  { label: "Display", x: 72, y: 88, sx: 52, sy: 48, sr: 8, status: "Pausa", statusTyp: "pausa" },
];

/**
 * KanalMap — sidans signaturscen, samma teknik som kartorna på de andra
 * tjänstesidorna. Kanalerna ligger först i en hög; när ytan scrollas in
 * flyger de ut, linjerna från målet ritas, datapulser vandrar och varje
 * kanal får sitt löpande beslut: skala, justera eller pausa.
 */
function KanalMap() {
  const { ref, inView } = useInView<HTMLDivElement>(0.45);
  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <div className="eyebrow mb-5">Löpande optimering</div>
          <h2 className="display-heading text-3xl md:text-4xl">
            Budgeten ska ligga <span className="text-brand-green">där den gör nytta</span>.
          </h2>
          <p className="mt-6 text-ink/75 leading-relaxed">
            Vi följer varje kanal mot samma mål. Det som levererar får mer
            budget, det som tvekar justeras och det som inte bär pausas.
            Besluten ser ni i rapporten varje månad.
          </p>
        </Reveal>
        <div
          ref={ref}
          aria-hidden="true"
          className={`sysmap relative mt-12 h-72 md:h-96 ${inView ? "is-visible" : ""}`}
        >
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
            {kanalNodes.filter((n) => !("hub" in n && n.hub)).map((n, i) => (
              <line
                key={n.label}
                className="sysmap-link"
                pathLength={1}
                x1="14" y1="50" x2={n.x} y2={n.y}
                stroke="#1F8A5C"
                strokeOpacity={n.statusTyp === "pausa" ? "0.15" : "0.35"}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                style={{ transitionDelay: `${0.85 + i * 0.12}s` }}
              />
            ))}
          </svg>
          <span className="sysmap-hub-ring" style={{ left: "14%", top: "50%" }} />
          {kanalNodes.filter((n) => !("hub" in n && n.hub) && n.statusTyp !== "pausa").map((n, i) => (
            <span
              key={`pulse-${n.label}`}
              className={`sysmap-pulse ${i % 2 === 1 ? "flow-back" : ""}`}
              style={{
                ["--hx" as string]: "14%",
                ["--hy" as string]: "50%",
                ["--nx" as string]: `${n.x}%`,
                ["--ny" as string]: `${n.y}%`,
                animationDelay: `${2.2 + i * 0.55}s`,
              }}
            />
          ))}
          {kanalNodes.map((n, i) => {
            const hub = "hub" in n && n.hub;
            return (
              <div
                key={n.label}
                className="sysmap-node absolute"
                style={{
                  left: `${inView ? n.x : n.sx}%`,
                  top: `${inView ? n.y : n.sy}%`,
                  transform: `translate(-50%, -50%) rotate(${inView ? 0 : n.sr}deg)`,
                  opacity: inView ? ("statusTyp" in n && n.statusTyp === "pausa" ? 0.45 : 1) : 0.55,
                  transitionDelay: `${i * 0.07}s`,
                  zIndex: hub ? 2 : 1,
                }}
              >
                <div
                  className={`sysmap-node-box whitespace-nowrap px-3 py-1.5 md:px-5 md:py-2.5 text-xs md:text-sm font-semibold ${
                    hub
                      ? "bg-brand-green text-paper shadow-md"
                      : "bg-white border border-line text-ink/80 shadow-sm"
                  }`}
                  style={{ animationDelay: `${1.6 + i * 0.8}s` }}
                >
                  {n.label}
                  {"status" in n && n.status && (
                    <span
                      className={`sysmap-badge tracked text-[9px] ml-2 px-1.5 py-0.5 align-middle ${
                        n.statusTyp === "skala"
                          ? "bg-brand-green text-paper"
                          : n.statusTyp === "justera"
                            ? "border border-brand-green/40 text-brand-green"
                            : "border border-line text-subtle"
                      }`}
                      style={{ transitionDelay: `${2 + i * 0.2}s` }}
                    >
                      {n.status}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-8 text-sm text-subtle max-w-xl">
          Kanalerna är exempel. Vilka som skalas hos er avgör siffrorna, inte vanan.
        </p>
      </div>
    </section>
  );
}

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

        <KanalMap />

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
