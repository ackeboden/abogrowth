import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { hamtaSamtycke, laddaAnalytics, skickaSidvisning, sparaSamtycke } from "@/lib/analytics";

/**
 * CookieBanner — GDPR-samtycke för besöksstatistiken. Visas tills ett val
 * gjorts; Google Analytics laddas ENDAST vid ja. Kan öppnas igen via
 * "Cookieinställningar" i footern (visa-cookiebanner-eventet) eller
 * knappen på /integritet.
 */
export function CookieBanner() {
  const [synlig, setSynlig] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const forstaSidan = useRef(true);

  useEffect(() => {
    const val = hamtaSamtycke();
    if (val === "ja") laddaAnalytics();
    if (val === null) setSynlig(true);
    const oppna = () => setSynlig(true);
    window.addEventListener("visa-cookiebanner", oppna);
    return () => window.removeEventListener("visa-cookiebanner", oppna);
  }, []);

  // Sidvisning vid SPA-navigering; första sidan skickas av GA:s config.
  useEffect(() => {
    if (forstaSidan.current) {
      forstaSidan.current = false;
      return;
    }
    skickaSidvisning(pathname);
  }, [pathname]);

  const valj = (val: "ja" | "nej") => {
    sparaSamtycke(val);
    setSynlig(false);
  };

  if (!synlig) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookieval"
      className="fixed inset-x-0 bottom-0 z-50 bg-ink text-paper border-t border-paper/15 shadow-[0_-8px_30px_rgba(0,0,0,0.35)]"
    >
      <div className="mx-auto max-w-6xl px-6 py-5 md:py-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        <p className="text-sm text-paper/75 leading-relaxed md:flex-1">
          Den här hemsidan använder en cookie för anonym besöksstatistik
          (Google Analytics). Den kopplas aldrig till dig som person och
          hjälper hemsidan att bli bättre. Inget laddas förrän du sagt ja,
          och du kan ångra dig när som helst.{" "}
          <Link to="/integritet" className="font-semibold text-paper border-b border-brand-green hover:text-brand-green">
            Läs mer
          </Link>
        </p>
        {/* Båda valen i första lagret, ett klick var (lagkravet). Acceptera
            är primär knapp; Avvisa nedtonad men fullt läsbar textlänk. */}
        <div className="flex items-center gap-5 shrink-0">
          <button
            type="button"
            onClick={() => valj("nej")}
            className="text-sm text-paper/60 underline underline-offset-4 hover:text-paper transition-colors"
          >
            Avvisa
          </button>
          <button
            type="button"
            onClick={() => valj("ja")}
            className="bg-brand-green text-paper px-7 py-3 text-sm font-semibold hover:bg-paper hover:text-ink transition-colors"
          >
            Acceptera
          </button>
        </div>
      </div>
    </div>
  );
}

/** Öppnar bannern igen, oavsett var i sajten man är. */
export function oppnaCookieBanner() {
  window.dispatchEvent(new Event("visa-cookiebanner"));
}
