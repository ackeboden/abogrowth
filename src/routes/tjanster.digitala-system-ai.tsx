import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { Header, Footer, BookingCTA, PageHero } from "@/components/Site";

export const Route = createFileRoute("/tjanster/digitala-system-ai")({
  head: () => ({
    meta: [
      { title: "Digitala system & AI-verktyg — ABO Growth" },
      {
        name: "description",
        content:
          "Vi hjälper företag att välja och införa rätt digitala system och AI-verktyg. Effektivare arbetsflöden — utan teknikskuld.",
      },
      { property: "og:title", content: "Digitala system & AI-verktyg — ABO Growth" },
      { property: "og:description", content: "Rätt system, rätt AI, rätt införda." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://abogrowth.se/tjanster/digitala-system-ai" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://abogrowth.se/tjanster/digitala-system-ai" }],
  }),
  component: Page,
});

const deliverables = [
  { t: "Arbetsflödesanalys", b: "Vi kartlägger hur arbetet faktiskt görs — inte hur det borde göras enligt processkartan." },
  { t: "Behovsdefinition", b: "Vad ska lösas, av vem, och hur mäter vi att det fungerar?" },
  { t: "Val av verktyg", b: "Objektiv jämförelse av system och AI-verktyg utifrån behov, budget och integration." },
  { t: "Införande", b: "Konfiguration, integrationer, dataflytt och rollout i etapper." },
  { t: "AI-användning", b: "Konkreta användningsfall för LLM och automation — inte hype." },
  { t: "Uppföljning", b: "Adoption, effektmätning och iteration efter go-live." },
];

const useCases = [
  { t: "Effektivisera säljprocessen", b: "CRM, sekvensering och AI-stöd för kvalificering och uppföljning." },
  { t: "Automatisera administration", b: "Fakturering, rapportering, dokumenthantering." },
  { t: "AI i kunskapstungt arbete", b: "Assistenter, sammanfattningar och sökning i egen data." },
];

function Page() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main>
        <PageHero
          eyebrow="Tjänst 03 — Digitala system & AI"
          title={<>Rätt verktyg. <span className="text-brand-green">Rätt införda.</span></>}
          intro="Vi hjälper er identifiera och införa digitala system och AI-verktyg som faktiskt gör arbetet enklare. Från kartläggning till löpande uppföljning."
        />

        <section className="border-b border-line bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="max-w-2xl">
              <div className="eyebrow mb-5">Vår hållning</div>
              <h2 className="display-heading text-3xl md:text-4xl">
                Verktyg ska <span className="text-brand-green">tjäna affären</span> — inte tvärtom.
              </h2>
              <p className="mt-6 text-ink/75 leading-relaxed">
                Ny teknik är billig. Fel val är dyrt. Vi hjälper er välja
                pragmatiskt, införa etappvis och mäta effekten — inte samla
                fler prenumerationer.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="eyebrow mb-5">Vad ni får</div>
            <h2 className="display-heading text-3xl md:text-4xl mb-12">Leverabler</h2>
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
          title="Osäkra på var ni ska börja med AI?"
          body="Vi tar ett första möte och kartlägger var effekten är störst. Konkret, inte teoretiskt."
        />

        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-6 py-16 flex flex-wrap items-center justify-between gap-6">
            <Link to="/tjanster/optimerade-kampanjer" className="group inline-flex items-center gap-3 text-sm font-semibold">
              <span className="tracked text-xs text-subtle">Föregående tjänst</span>
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
