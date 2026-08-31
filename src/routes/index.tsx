import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Header, Footer, CONTACT_EMAIL } from "@/components/Site";
import { Hero } from "@/components/startsida/Hero";
import { SystemKollen } from "@/components/startsida/SystemKollen";
import { Services, Varde, Process, Faq, Contact, faqItems } from "@/components/startsida/Sektioner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ABO Growth | Ordning i era system och AI" },
      {
        name: "description",
        content:
          "Nya digitala system och AI-verktyg dyker upp varje vecka. ABO Growth hjälper mindre bolag få koll: struktur i systemfloran, verktyg som hänger ihop och en tydlig väg framåt. Från Stockholm.",
      },
      { name: "keywords", content: "digitala system, AI-verktyg, systemstrategi, struktur, effektivitet, automatisering, integration, affärsutveckling, Stockholm, konsult" },
      { property: "og:title", content: "ABO Growth | Ordning i era system och AI" },
      { property: "og:description", content: "Få koll på era digitala system och AI-verktyg. Struktur, ordning och effektivitet, från Stockholm." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://abogrowth.se/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ABO Growth | Ordning i era system och AI" },
      { name: "twitter:description", content: "Få koll på era digitala system och AI-verktyg. Struktur och ordning, från Stockholm." },
    ],
    links: [{ rel: "canonical", href: "https://abogrowth.se/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "ABO Growth",
          description:
            "ABO Growth hjälper företag att få ordning i sina digitala system och AI-verktyg: systemstrategi, struktur och effektivitet, med affärsutveckling och kampanjer som stödtjänster.",
          areaServed: "Sverige",
          address: { "@type": "PostalAddress", addressLocality: "Stockholm", addressCountry: "SE" },
          email: CONTACT_EMAIL,
          url: "https://abogrowth.se/",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <FramstegsLinje />
      <SidNav />
      <Header />
      <main>
        <Hero />
        <SystemKollen />
        <Services />
        <Varde />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

/**
 * FramstegsLinje — tunn grön linje högst upp som fylls i takt med hur
 * långt man scrollat. Helt passiv: läser positionen, rör aldrig scrollen.
 */
function FramstegsLinje() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const uppdatera = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      el.style.transform = `scaleX(${p.toFixed(4)})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(uppdatera);
    };
    uppdatera();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-[3px] pointer-events-none">
      <div ref={ref} className="h-full w-full origin-left bg-brand-green" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}

// Sektionsprickarnas mål, i sidans ordning.
const sidNavMal = [
  { id: "top", namn: "Hem" },
  { id: "systemkollen", namn: "Systemkollen" },
  { id: "tjanster", namn: "Tjänster" },
  { id: "varde", namn: "Värdet" },
  { id: "arbetssatt", namn: "Arbetssätt" },
  { id: "faq", namn: "Vanliga frågor" },
  { id: "kontakt", namn: "Kontakt" },
];

/**
 * SidNav — klickbar minikarta i högerkanten (desktop): en prick per
 * sektion, aktiv lyser grönt, namnet visas vid hover. Ankarlänkar +
 * webbläsarens egen mjuka scroll, ingen kapning.
 */
function SidNav() {
  const [aktiv, setAktiv] = useState("top");
  useEffect(() => {
    let raf = 0;
    const uppdatera = () => {
      raf = 0;
      const mitt = window.innerHeight * 0.5;
      let vald = sidNavMal[0].id;
      for (const m of sidNavMal) {
        const el = document.getElementById(m.id);
        if (el && el.getBoundingClientRect().top <= mitt) vald = m.id;
      }
      setAktiv(vald);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(uppdatera);
    };
    uppdatera();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <nav
      aria-label="Snabbnavigering mellan sektioner"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
    >
      {sidNavMal.map((m) => (
        <a
          key={m.id}
          href={`#${m.id}`}
          aria-label={m.namn}
          aria-current={aktiv === m.id ? "true" : undefined}
          className="group relative flex items-center justify-center h-4 w-4"
        >
          <span
            className={`block rounded-full transition-all duration-300 ${
              aktiv === m.id
                ? "h-3 w-3 bg-brand-green shadow-[0_0_8px_rgba(31,138,92,0.6)]"
                : "h-2 w-2 bg-subtle/60 group-hover:bg-brand-green/70"
            }`}
          />
          <span className="pointer-events-none absolute right-6 whitespace-nowrap text-xs font-semibold text-ink bg-white border border-line px-2 py-1 opacity-0 translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 shadow-sm">
            {m.namn}
          </span>
        </a>
      ))}
    </nav>
  );
}
