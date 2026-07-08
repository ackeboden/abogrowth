import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { Header, Footer, BookingCTA, PageHero, BOOKING_HREF } from "@/components/Site";

export const Route = createFileRoute("/tjanster/affarsutveckling")({
  head: () => ({
    meta: [
      { title: "Affärsutveckling & tillväxtstrategi — ABO Growth" },
      {
        name: "description",
        content:
          "Nulägesanalys, positionering och tillväxtstrategi. Vi bygger en konkret plan för hur ert företag växer — med SWOT, Porters fem krafter och 4P.",
      },
      { property: "og:title", content: "Affärsutveckling & tillväxtstrategi — ABO Growth" },
      { property: "og:description", content: "Konkret tillväxtstrategi byggd på etablerade ramverk." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://abogrowth.se/tjanster/affarsutveckling" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://abogrowth.se/tjanster/affarsutveckling" }],
  }),
  component: Page,
});

const deliverables = [
  { t: "Nulägesanalys", b: "SWOT, Porters fem krafter och en ärlig bild av marknad, konkurrens och interna hävstänger." },
  { t: "Positionering", b: "Vem ni är för, vad ni står för och varför någon ska välja er framför alternativen." },
  { t: "Erbjudandearkitektur", b: "Paketering, prissättning och struktur som gör det enkelt att sälja och köpa." },
  { t: "Buyer personas", b: "Konkreta målgrupper som styr budskap, kanaler och säljprocess." },
  { t: "Tillväxtplan", b: "Prioriterade initiativ med tidslinjer, ägarskap och mätpunkter." },
  { t: "Uppföljning", b: "Löpande avstämning, justering och skalning av det som fungerar." },
];

const steps = [
  { n: "01", t: "Diskovery", b: "1–2 veckor. Intervjuer, datainsamling, hypoteser." },
  { n: "02", t: "Analys & strategi", b: "2–4 veckor. Ramverk, positionering, prioriterad plan." },
  { n: "03", t: "Genomförande", b: "Löpande. Vi driver eller stöttar exekveringen." },
];

function Page() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main>
        <PageHero
          eyebrow="Tjänst 01 — Affärsutveckling"
          title={<>Analys, strategi och en <span className="text-brand-green">plan som håller</span>.</>}
          intro="Vi hjälper er förstå var affären står idag, var potentialen finns och hur ni tar er dit. Etablerade ramverk, tydliga leverabler, ingen konsultjargong."
        />

        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="eyebrow mb-5">Vad ni får</div>
            <h2 className="display-heading text-3xl md:text-4xl mb-12">Leverabler</h2>
            <div className="grid gap-6 md:grid-cols-3">
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

        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <div className="eyebrow mb-5">Upplägg</div>
              <h2 className="display-heading text-3xl md:text-4xl">Tre faser. <span className="text-brand-green">Tydliga milstolpar.</span></h2>
            </div>
            <div className="md:col-span-8 space-y-6">
              {steps.map((s) => (
                <div
                  key={s.n}
                  className="bg-white border border-line p-8 shadow-sm hover:shadow-md hover:border-brand-green/40 transition-all flex gap-6"
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
