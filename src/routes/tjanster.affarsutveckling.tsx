import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { Header, Footer, BookingCTA, PageHero, Reveal, useInView, BOOKING_HREF } from "@/components/Site";

export const Route = createFileRoute("/tjanster/affarsutveckling")({
  head: () => ({
    meta: [
      { title: "Affärsutveckling & tillväxtstrategi | ABO Growth" },
      {
        name: "description",
        content:
          "Nulägesanalys, positionering och tillväxtstrategi. Vi bygger en konkret plan för hur ert företag växer: analys, prioritering och genomförande.",
      },
      { property: "og:title", content: "Affärsutveckling & tillväxtstrategi | ABO Growth" },
      { property: "og:description", content: "Konkret tillväxtstrategi som går att genomföra." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://abogrowth.se/tjanster/affarsutveckling" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://abogrowth.se/tjanster/affarsutveckling" }],
  }),
  component: Page,
});

// Tidslinjekartan: sex initiativ ligger huller om buller och flyger in i tre
// faser längs en tidslinje som ritas under dem. Alla initiativ får plats,
// men i rätt ordning; speglar leverabeln "prioriterad handlingsplan med tidslinje".
const planNodes = [
  { label: "Bättre säljprocess", x: 18, y: 26, sx: 45, sy: 40, sr: -8, fas: 1 },
  { label: "Fler återköp", x: 18, y: 48, sx: 55, sy: 55, sr: 6, fas: 1 },
  { label: "Nytt erbjudande", x: 50, y: 26, sx: 48, sy: 62, sr: -5, fas: 2 },
  { label: "Höjd prissättning", x: 50, y: 48, sx: 52, sy: 35, sr: 9, fas: 2 },
  { label: "Ny målgrupp", x: 82, y: 26, sx: 42, sy: 50, sr: -7, fas: 3 },
  { label: "Ny marknad", x: 82, y: 48, sx: 58, sy: 45, sr: 7, fas: 3 },
];

const faser = [
  { x: 18, namn: "Fas 1" },
  { x: 50, namn: "Fas 2" },
  { x: 82, namn: "Fas 3" },
];

/**
 * PlanMap — sidans signaturscen, samma teknik som systemkartan på tjänst 01.
 * Initiativen ligger först i en hög; när ytan scrollas in flyger de till sina
 * faser medan tidslinjen ritas under dem och fasmarkörerna tänds. Planen som
 * animation: allt får plats, men i rätt ordning.
 */
function PlanMap() {
  const { ref, inView } = useInView<HTMLDivElement>(0.45);
  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <div className="eyebrow mb-5">Planen</div>
          <h2 className="display-heading text-3xl md:text-4xl">
            Rätt initiativ, <span className="text-brand-green">i rätt ordning</span>.
          </h2>
          <p className="mt-6 text-ink/75 leading-relaxed">
            En tillväxtplan är en sekvens, inte en önskelista. Vi lägger varje
            initiativ där det gör störst nytta och ger varje fas ett tydligt
            mål att leverera mot.
          </p>
        </Reveal>
        <div
          ref={ref}
          aria-hidden="true"
          className={`sysmap relative mt-12 h-72 md:h-80 ${inView ? "is-visible" : ""}`}
        >
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
            {/* Tidslinjen ritas vänster till höger när chipsen börjar landa */}
            <line
              className="sysmap-link"
              pathLength={1}
              x1="4" y1="70" x2="96" y2="70"
              stroke="#1F8A5C"
              strokeOpacity="0.45"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              style={{ transitionDelay: "0.8s" }}
            />
          </svg>
          {/* Fasmarkörer och etiketter tänds i tur och ordning längs linjen */}
          {faser.map((f, i) => (
            <span key={f.namn}>
              <span
                className="sysmap-badge absolute h-2.5 w-2.5 rounded-full bg-brand-green"
                style={{ left: `${f.x}%`, top: "70%", transform: "translate(-50%, -50%)", transitionDelay: `${1.2 + i * 0.25}s` }}
              />
              <span
                className="sysmap-badge absolute tracked text-[10px] text-brand-green whitespace-nowrap"
                style={{ left: `${f.x}%`, top: "82%", transform: "translate(-50%, -50%)", transitionDelay: `${1.35 + i * 0.25}s` }}
              >
                {f.namn}
              </span>
            </span>
          ))}
          {planNodes.map((n, i) => (
            <div
              key={n.label}
              className="sysmap-node absolute"
              style={{
                left: `${inView ? n.x : n.sx}%`,
                top: `${inView ? n.y : n.sy}%`,
                transform: `translate(-50%, -50%) rotate(${inView ? 0 : n.sr}deg)`,
                opacity: inView ? 1 : 0.55,
                transitionDelay: `${i * 0.07}s`,
              }}
            >
              <div
                className="sysmap-node-box whitespace-nowrap px-3 py-1.5 md:px-5 md:py-2.5 text-xs md:text-sm font-semibold bg-white border border-line text-ink/80 shadow-sm"
                style={{ animationDelay: `${1.6 + i * 0.8}s` }}
              >
                {n.label}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-subtle max-w-xl">
          Initiativen är exempel. Ordningen hos er avgör analysen.
        </p>
      </div>
    </section>
  );
}

const deliverables = [
  { t: "Nulägesanalys", b: "En ärlig bild av marknad, konkurrens och era interna hävstänger: var ni står idag och var potentialen finns." },
  { t: "Positionering", b: "Vem ni är för, vad ni står för och varför någon ska välja er framför alternativen." },
  { t: "Erbjudandearkitektur", b: "Paketering, prissättning och struktur som gör det enkelt att sälja och köpa." },
  { t: "Målgrupper", b: "Konkreta målgrupper som styr budskap, kanaler och säljprocess." },
  { t: "Tillväxtplan", b: "Prioriterade initiativ med tidslinjer, ägarskap och mätpunkter." },
  { t: "Uppföljning", b: "Löpande avstämning, justering och skalning av det som fungerar." },
];

const steps = [
  { n: "01", t: "Kartläggning", b: "1–2 veckor. Intervjuer, datainsamling, hypoteser." },
  { n: "02", t: "Analys & strategi", b: "2–4 veckor. Analys, positionering, prioriterad plan." },
  { n: "03", t: "Genomförande", b: "Löpande. Vi driver eller stöttar exekveringen." },
];

function Page() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main>
        <PageHero
          eyebrow="Tjänst 02 · Affärsutveckling"
          title={<>Analys, strategi och en <span className="text-brand-green">plan som håller</span>.</>}
          intro="Vi hjälper er förstå var affären står idag, var potentialen finns och hur ni tar er dit. Tydlig metod, konkreta leverabler, ingen konsultjargong."
        />

        <PlanMap />

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
          title="Vill ni börja med en nulägesanalys?"
          body="Ett första möte räcker för att se om upplägget passar. Vi förbereder frågor, ni delar sammanhang."
        />

        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-6 py-16 flex flex-wrap items-center justify-between gap-6">
            <Link to="/tjanster/optimerade-kampanjer" className="group inline-flex items-center gap-3 text-sm font-semibold">
              <span className="tracked text-xs text-subtle">Nästa tjänst</span>
              <span className="border-b-2 border-brand-green pb-0.5 group-hover:text-brand-green">Optimerade kampanjer</span>
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
