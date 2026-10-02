import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Header, Footer, BookingCTA, PageHero, Reveal } from "@/components/Site";
import { caseLista } from "@/data/case";

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

function Page() {
  // Startsidans kort länkar hit med #slug. Routern byter sida men scrollar
  // inte till ankaret själv, så vi gör det när sidan monterats.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    // Kort fördröjning: routern lägger sig annars överst efter monteringen.
    const t = setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 80);
    return () => clearTimeout(t);
  }, []);

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
                <article id={c.slug} className="scroll-mt-24 bg-white border border-line shadow-sm">
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
