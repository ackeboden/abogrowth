import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Header, Footer, BookingCTA, PageHero } from "@/components/Site";
import { IllustrationDiagram } from "@/components/Illustrations";

export const Route = createFileRoute("/case")({
  head: () => ({
    meta: [
      { title: "Case | ABO Growth" },
      {
        name: "description",
        content:
          "Utvalda case från ABO Growth. Verkliga uppdrag inom digitala system, AI och affärsutveckling.",
      },
      { property: "og:title", content: "Case | ABO Growth" },
      { property: "og:description", content: "Utvalda uppdrag och resultat." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://abogrowth.se/case" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://abogrowth.se/case" }],
  }),
  component: Page,
});

// Lägg till case här när de är klara. Bygg med samma struktur som exemplet nedan.
const cases: {
  slug: string;
  client: string;
  title: string;
  summary: string;
  result: string;
  tags: string[];
}[] = [];

function Page() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main>
        <PageHero
          eyebrow="Case"
          title={<>Uppdrag som <span className="text-brand-green">visar hur jag jobbar</span>.</>}
          intro="Här samlar jag case från riktiga uppdrag löpande. Vill ni höra hur jag skulle lägga upp arbetet hos er är det snabbaste att ta ett samtal."
        />

        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            {cases.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid gap-px bg-line md:grid-cols-2 border border-line">
                {cases.map((c) => (
                  <article key={c.slug} className="bg-paper p-5 md:p-10">
                    <div className="tracked text-xs text-subtle mb-3">{c.client}</div>
                    <h2 className="display-heading text-2xl mb-4">{c.title}</h2>
                    <p className="text-sm text-ink/70 leading-relaxed mb-6">{c.summary}</p>
                    <div className="pt-6 border-t border-line">
                      <div className="tracked text-[10px] text-brand-green mb-2">Resultat</div>
                      <p className="text-sm font-semibold">{c.result}</p>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {c.tags.map((t) => (
                        <span key={t} className="text-[11px] tracked-tight border border-line px-2.5 py-1 text-subtle">{t}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <BookingCTA
          title="Vill ni veta hur jag skulle göra hos er?"
          body="Berätta hur ni jobbar idag, så skissar jag på ett upplägg. Första samtalet kostar ingenting."
        />
      </main>
      <Footer />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="border-2 border-dashed border-line bg-white p-8 md:p-20 text-center">
      <IllustrationDiagram className="mx-auto mb-6 w-full max-w-[200px]" />
      <div className="eyebrow mb-4">Publicerade case</div>
      <h2 className="display-heading text-2xl md:text-3xl max-w-xl mx-auto">
        Inga case publicerade än.
      </h2>
      <p className="mt-5 text-sm text-ink/65 max-w-md mx-auto leading-relaxed">
        Jag lägger upp uppdrag här när kunderna gett klartecken. Under tiden visar
        arbetssättet på startsidan hur ett uppdrag drivs, steg för steg.
      </p>
      <Link
        to="/"
        hash="arbetssatt"
        className="mt-8 group inline-flex items-center gap-2 bg-ink text-paper px-5 py-3 text-sm font-semibold hover:bg-brand-green transition-colors"
      >
        Se hur jag jobbar
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
      </Link>
    </div>
  );
}
