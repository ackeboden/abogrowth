import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Site";
import { casePaStartsidan } from "@/data/case";

/**
 * Recensioner — kort version av de senaste casen, direkt under Systemkollen.
 * Kundens egna ord bär kortet, resultatet ligger som en rad under. Hela
 * kortet länkar till sitt case på /case, och listan kommer från samma data
 * som case-sidan, så startsidan följer med när ett nytt case läggs till.
 */
export function Recensioner() {
  return (
    <section id="case" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <div className="eyebrow mb-5">Case</div>
          <h2 className="display-heading text-3xl md:text-4xl max-w-2xl">
            Vad kunderna <span className="text-brand-green-strong">säger</span>.
          </h2>
          <p className="mt-5 max-w-2xl text-ink/70 leading-relaxed">
            Två uppdrag som rullar idag. Klicka er vidare för hela historien, från utgångsläge till löpande arbete.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {casePaStartsidan.map((c, i) => (
            <Reveal key={c.slug} delay={i * 110}>
              <Link
                to="/case"
                hash={c.slug}
                aria-label={`Läs caset om ${c.klient}`}
                className="group flex h-full flex-col bg-white border border-line shadow-sm p-6 md:p-8 transition-colors hover:border-brand-green/60"
              >
                {c.logotyp ? (
                  <img
                    src={c.logotyp.src}
                    width={c.logotyp.bredd}
                    height={c.logotyp.hojd}
                    alt={c.klient}
                    decoding="async"
                    className="h-7 w-auto self-start"
                  />
                ) : (
                  <span className="display-heading text-xl self-start">{c.klient}</span>
                )}

                <blockquote className="mt-6 text-ink/85 leading-relaxed">{c.kortCitat}</blockquote>
                <div className="mt-4 text-xs text-ink/60">
                  <span className="font-semibold text-ink">{c.citat.namn}</span>, {c.citat.titel}
                </div>

                <div className="mt-auto pt-6">
                  <div className="flex items-start gap-3 border-t border-line pt-5">
                    <span aria-hidden="true" className="mt-1 h-4 w-1 shrink-0 bg-brand-green" />
                    <p className="text-sm text-ink/75 leading-relaxed">{c.kortResultat}</p>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green-strong">
                    Läs caset
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2.5}
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={220}>
          <Link
            to="/case"
            className="mt-10 inline-flex items-center gap-2 border border-ink/20 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-brand-green-strong hover:text-brand-green-strong"
          >
            Se alla case
            <ArrowUpRight className="h-4 w-4 text-brand-green-strong" strokeWidth={2.5} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
