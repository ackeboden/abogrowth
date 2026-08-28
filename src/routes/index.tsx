import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Check, Plus, X } from "lucide-react";
import { Header, Footer, GrowthLine, Reveal, useInView, useIsMobile, CONTACT_EMAIL } from "@/components/Site";

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

type Service = {
  num: string;
  title: string;
  body: string;
  href?: string;
  tag?: string;
  featured?: boolean;
  deliverables: string[];
};

const services: Service[] = [
  {
    num: "01",
    title: "Digitala system & AI-verktyg",
    tag: "Huvudtjänst",
    featured: true,
    body: "Jag hjälper er få koll: kartlägger systemfloran, rensar bland verktygen och kopplar ihop det som ska hänga samman. Sedan visar jag var AI gör verklig nytta.",
    href: "/tjanster/digitala-system-ai",
    deliverables: [
      "Kartläggning av era system och verktyg",
      "En struktur där allt hänger ihop",
      "Automation och AI där det sparar mest tid",
    ],
  },
  {
    num: "02",
    title: "Affärsutveckling & tillväxtstrategi",
    body: "Jag kartlägger var tillväxten faktiskt finns och bygger en plan som går att genomföra, med prioriterade initiativ som flyttar affären framåt.",
    href: "/tjanster/affarsutveckling",
    deliverables: [
      "Tillväxtanalys av marknad & konkurrens",
      "Prioriterad handlingsplan med tidslinje",
      "Löpande uppföljning mot tydliga mål",
    ],
  },
  {
    num: "03",
    title: "Optimerade kampanjer",
    body: "Rätt budskap, i rätt kanal, till rätt målgrupp. Jag bygger, mäter och skruvar löpande så att budgeten jobbar för er, inte tvärtom.",
    href: "/tjanster/optimerade-kampanjer",
    deliverables: [
      "Kampanjstruktur för passande kanaler",
      "Annonser, målgrupper & spårning på plats",
      "Månadsrapport med resultat & nästa steg",
    ],
  },
];


// Arbetssättet utgår från SYSTEMEN, inte från affärsutveckling. Håll den
// vinkeln: kartlägg systemfloran, prioritera efter effekt, koppla ihop och
// automatisera, följ upp att det används.
const processSteps = [
  {
    step: "01",
    title: "Kartlägg",
    body: "Jag går igenom system, verktyg, licenser och flöden. Var ligger datan, var dubbelarbetas det och var glappar kedjan?",
  },
  {
    step: "02",
    title: "Prioritera",
    body: "Jag rangordnar efter effekt och insats. Det som ger mest tid tillbaka, eller mest affär, görs först.",
  },
  {
    step: "03",
    title: "Genomför",
    body: "Jag rensar, kopplar ihop och automatiserar. Tydliga faser, deadlines och ägarskap hela vägen fram.",
  },
  {
    step: "04",
    title: "Följ upp",
    body: "Jag mäter att det används och håller över tid, och bygger vidare där nästa effekt finns.",
  },
];

// Samma fyra steg översatta per tjänst. Systemen är märkta som grunden;
// de andra två bygger vidare på den.
const methodPerService = [
  {
    service: "Digitala system & AI",
    primary: true,
    flow: [
      "Systemfloran kartläggs",
      "Struktur och källa till sanning sätts",
      "Integrationer och automation byggs",
      "Användning och tidsvinst följs upp",
    ],
  },
  {
    service: "Affärsutveckling",
    flow: [
      "Nuläge, marknad och kunder analyseras",
      "Initiativ prioriteras efter effekt",
      "Planen genomförs i faser",
      "Utfallet mäts mot målen",
    ],
  },
  {
    service: "Optimerade kampanjer",
    flow: [
      "Målgrupp och mätning på plats",
      "Kanaler och budskap väljs",
      "Kampanjer byggs och lanseras",
      "Resultatet optimeras löpande",
    ],
  },
];

// Vanliga frågor — visas i FAQ-sektionen OCH i FAQPage-schemat (SEO).
// Håll frågor och svar identiska på båda ställena, annars kan Google straffa sidan.
const faqItems = [
  {
    q: "Vad kostar det att jobba med dig?",
    a: "Det beror på omfattningen. Ett avgränsat projekt kostar mindre än ett löpande samarbete. Vill ni ha en snabb prisbild direkt kan ni testa min priskalkylator. Ni får alltid ett konkret förslag med pris innan jag börjar, och första samtalet är kostnadsfritt. Inga överraskningar på fakturan.",
  },
  {
    q: "Hur snabbt ser vi resultat?",
    a: "Kartläggningen tar en till två veckor och de första konkreta leverablerna kommer oftast inom en månad. Sedan är jag ärlig: att hålla ordning i systemen är ett löpande arbete, och jag säger vad som går snabbt och vad som kräver uthållighet.",
  },
  {
    q: "Vilka företag jobbar du med?",
    a: "Mindre bolag, från enmansföretag upp till ett femtiotal anställda, oftast utan egen IT-avdelning. Jag vet hur det är att växa med begränsade resurser, och upplägget skalas efter er storlek och budget. Ingen betalar för mer än de behöver.",
  },
  {
    q: "Måste vi köpa en massa nya system och verktyg?",
    a: "Nej. Jag börjar alltid i strategin: vad ni behöver och varför. Ofta räcker verktygen ni redan har, rätt ihopkopplade. Nya system föreslår jag bara när de löser ett verkligt problem, och jag tjänar ingenting på att ni köper fler licenser.",
  },
  {
    q: "Är det här mer AI-hype?",
    a: "Nej. AI är ett verktyg bland flera. Jag använder det där det faktiskt sparar tid och hoppar över det där det inte gör det. Strategin och helheten kommer först, tekniken väljs därefter.",
  },
  {
    q: "Kan vi börja smått?",
    a: "Absolut. Gör systemkollen högre upp på sidan så ser ni var ni står redan idag. Många samarbeten börjar sedan med ett avgränsat projekt: en kartläggning, en kampanj eller ett systemval. Fungerar det bra växer samarbetet därifrån.",
  },
];


// Orden roterar det vi skapar ordning i — besökaren ska inom sekunder förstå
// kärnan: koll och struktur i den digitala floran.
const rotatingWords = ["systemen", "verktygen", "marknadsföringen", "försäljningen"] as const;

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

function RotatingWord() {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(id);
  }, [reduced]);

  const current = reduced ? rotatingWords[0] : rotatingWords[index];

  return (
    <span
      className="relative inline-grid align-baseline text-brand-green"
      aria-live="polite"
    >
      {/* Sizer: reserverar plats för det längsta ordet så rubriken inte hoppar.
          Måste vara det längsta ordet i rotatingWords, annars börjar den hoppa. */}
      <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
        marknadsföringen
      </span>
      {/* Rubriken bär sr-only-meningen; här är allt rent visuellt */}
      <span
        key={current}
        aria-hidden="true"
        className="col-start-1 row-start-1 whitespace-nowrap"
      >
        <Bokstavsrad text={current} bas={0.3} steg={0.05} />
      </span>
    </span>
  );
}

// Hero-nätets noder (% av heroytan). Chips är verktygsboxar med namn,
// resten punkter. x/y = ordnad plats, cx/cy/crot = kaosstart för intro-
// sekvensen (klustrade kring mitten, roterade). Alla driver sedan i egna
// banor (--dx/--dy + duration). Deterministiskt, ingen slump.
type HeroNode = {
  x: number;
  y: number;
  cx: number;
  cy: number;
  crot?: number;
  chip?: string;
  rot?: number;
  mobile?: boolean;
  dx: number;
  dy: number;
  dur: number;
};

const heroNodes: HeroNode[] = [
  { x: 71, y: 16, cx: 62, cy: 42, crot: -16, chip: "CRM", rot: -5, mobile: true, dx: 9, dy: -13, dur: 9 },
  { x: 88, y: 30, cx: 72, cy: 55, crot: 12, chip: "Analys", rot: 4, dx: -11, dy: 9, dur: 11 },
  { x: 65, y: 46, cx: 58, cy: 60, crot: -9, chip: "AI", rot: -3, mobile: true, dx: 13, dy: 7, dur: 8 },
  { x: 91, y: 60, cx: 76, cy: 38, crot: 18, chip: "Ekonomi", rot: 6, dx: -8, dy: -11, dur: 12 },
  { x: 76, y: 78, cx: 66, cy: 50, crot: -14, chip: "Nyhetsbrev", rot: -4, mobile: true, dx: 10, dy: 10, dur: 10 },
  { x: 57, y: 12, cx: 70, cy: 62, crot: 10, chip: "Kalkyl", rot: 3, dx: -9, dy: 11, dur: 13 },
  { x: 60, y: 66, cx: 64, cy: 46, dx: 8, dy: -9, dur: 7, mobile: true },
  { x: 82, y: 12, cx: 74, cy: 58, dx: -7, dy: 12, dur: 9.5 },
  { x: 96, y: 44, cx: 78, cy: 48, dx: -10, dy: -8, dur: 8.5, mobile: true },
  { x: 68, y: 30, cx: 60, cy: 52, dx: 11, dy: 8, dur: 10.5 },
  { x: 86, y: 86, cx: 72, cy: 44, dx: -9, dy: -10, dur: 11.5, mobile: true },
  { x: 52, y: 82, cx: 68, cy: 56, dx: 10, dy: -7, dur: 9 },
];

// [frånNod, tillNod, startfördröjning i sekunder]. Cykeln är 7 s, så med
// linjerna i förskjutning ritas det alltid något någonstans.
const heroLinks: [number, number, number][] = [
  [0, 9, 0],
  [9, 2, 0.7],
  [0, 7, 1.4],
  [1, 8, 2.1],
  [2, 6, 2.8],
  [3, 8, 3.5],
  [4, 10, 4.2],
  [5, 0, 4.9],
  [6, 11, 5.6],
  [3, 4, 6.3],
  [1, 0, 3.2],
  [2, 4, 5.2],
];

// Bokstäver som landar en i taget, lätt vridna ur trasslet. Delas av
// rubrikens statiska delar och det roterande ordet.
// VIKTIGT: varje ORD wrappas i en obrytbar span. Utan den kan webbläsaren
// radbryta mellan två bokstavsspans mitt i ett ord ("djunge / ln"), vilket
// hände på mobil. Radbrytning sker nu bara vid mellanslagen.
function Bokstavsrad({ text, bas, steg = 0.03 }: { text: string; bas: number; steg?: number }) {
  let lopande = 0; // bokstavsindex som fortsätter över ordgränserna
  return (
    <>
      {text.split(/(\s+)/).map((del, d) =>
        /^\s+$/.test(del) ? (
          <span key={`m-${d}`}>{del}</span>
        ) : del ? (
          <span key={`o-${d}`} className="inline-block whitespace-nowrap">
            {del.split("").map((b) => {
              const j = lopande++;
              return (
                <span
                  key={j}
                  className="hero-letter"
                  style={{
                    animationDelay: `${bas + j * steg}s`,
                    ["--lr" as string]: `${(j % 2 ? -1 : 1) * (5 + (j % 3) * 4)}deg`,
                    ["--lx" as string]: `${((j % 3) - 1) * 0.06}em`,
                  }}
                >
                  {b}
                </span>
              );
            })}
          </span>
        ) : null,
      )}
    </>
  );
}

// useLayoutEffect på klienten (kaospositionerna måste sättas före första
// målningen, annars blinkar den ordnade vyn förbi), useEffect vid SSR.
const useKlientLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

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

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const raySvgRef = useRef<SVGSVGElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  // "still" = SSR/utan JS (ordnad, stilla). Intro: kaos → ordning.
  const [scen, setScen] = useState<"still" | "kaos" | "ordning">("still");

  useKlientLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setScen("ordning");
      return;
    }
    setScen("kaos");
    const t = setTimeout(() => setScen("ordning"), 550);
    return () => clearTimeout(t);
  }, []);

  // Musparallax + ljuskägla: --par-x/--par-y (-1..1) och --mx/--my (%).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;
      const ny = (e.clientY - r.top) / r.height;
      el.style.setProperty("--par-x", ((nx - 0.5) * 2).toFixed(3));
      el.style.setProperty("--par-y", ((ny - 0.5) * 2).toFixed(3));
      el.style.setProperty("--mx", (nx * 100).toFixed(1));
      el.style.setProperty("--my", (ny * 100).toFixed(1));
    };
    const onLeave = () => {
      el.style.setProperty("--par-x", "0");
      el.style.setProperty("--par-y", "0");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Pekaren blir en nod: linjer ritas live från närliggande noder till
  // pekaren, och chips som kommer nära tänds (is-near). Uppdateras
  // imperativt i en rAF-loop, ingen React-state per frame.
  useEffect(() => {
    const hero = ref.current;
    const layer = layerRef.current;
    const svgEl = raySvgRef.current;
    const cursor = cursorRef.current;
    if (!hero || !layer || !svgEl || !cursor) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const RACKVIDD = 300;
    const NARA = 170;
    let raf = 0;
    let px = 0;
    let py = 0;
    let aktiv = false;

    const rita = () => {
      const lr = layer.getBoundingClientRect();
      cursor.style.left = `${px}px`;
      cursor.style.top = `${py}px`;
      const linjer = svgEl.children;
      heroNodes.forEach((_, i) => {
        const el = nodeRefs.current[i];
        const ln = linjer[i] as SVGLineElement | undefined;
        if (!el || !ln) return;
        if (getComputedStyle(el).display === "none") {
          ln.style.opacity = "0";
          return;
        }
        const r = el.getBoundingClientRect();
        const nx = r.left + r.width / 2 - lr.left;
        const ny = r.top + r.height / 2 - lr.top;
        const d = Math.hypot(nx - px, ny - py);
        ln.setAttribute("x1", String(px));
        ln.setAttribute("y1", String(py));
        ln.setAttribute("x2", String(nx));
        ln.setAttribute("y2", String(ny));
        ln.style.opacity = d < RACKVIDD ? (0.55 * (1 - d / RACKVIDD)).toFixed(2) : "0";
        el.classList.toggle("is-near", d < NARA);
      });
      if (aktiv) raf = requestAnimationFrame(rita);
    };
    const onMove = (e: PointerEvent) => {
      const lr = layer.getBoundingClientRect();
      px = e.clientX - lr.left;
      py = e.clientY - lr.top;
      if (!aktiv) {
        aktiv = true;
        layer.classList.add("is-live");
        raf = requestAnimationFrame(rita);
      }
    };
    const onLeave = () => {
      aktiv = false;
      cancelAnimationFrame(raf);
      layer.classList.remove("is-live");
      for (const c of svgEl.children) (c as SVGElement).style.opacity = "0";
      nodeRefs.current.forEach((el) => el?.classList.remove("is-near"));
    };
    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      onLeave();
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const kaos = scen === "kaos";

  return (
    <section ref={ref} id="top" className="snap-start relative bg-ink text-paper overflow-hidden">
      <div className="relative min-h-svh flex items-center">
      <div className="hero-par hero-par-1 absolute inset-0" aria-hidden="true">
        <div className="ai-glow" />
      </div>
      <div className="hero-par hero-par-2 absolute inset-0" aria-hidden="true">
        <GrowthLine className="opacity-80" />
      </div>
      {/* Hero-nätet: verktygschips som tumlar in i kaos och snäpper till
          ordning, driver i egna banor och binds av kopplingar. hero-net är
          även hemvist för pekarens strålar och markörnod. */}
      {/* Hela nätverkslagret är dolt på mobil: chips och linjer bakom texten
          blev rörigt när rubriken tar hela bredden. Glöden och tillväxt-
          linjen bär mobilheron i stället. */}
      <div ref={layerRef} className="hero-net hero-par hero-par-3 absolute inset-0 hidden md:block" aria-hidden="true">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
          {heroLinks.map(([a, b, delay]) => (
            <line
              key={`hl-${a}-${b}`}
              className={`${scen === "ordning" ? "hero-link" : "opacity-0"} ${
                heroNodes[a].mobile && heroNodes[b].mobile ? "" : "hidden md:block"
              }`}
              pathLength={1}
              x1={heroNodes[a].x}
              y1={heroNodes[a].y}
              x2={heroNodes[b].x}
              y2={heroNodes[b].y}
              stroke="#1F8A5C"
              strokeOpacity="0.55"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </svg>
        {/* Pekarens strålar: pixelkoordinater, uppdateras i rAF-loopen */}
        <svg ref={raySvgRef} className="absolute inset-0 h-full w-full" fill="none">
          {heroNodes.map((_, i) => (
            <line key={`ray-${i}`} x1="0" y1="0" x2="0" y2="0" stroke="#1F8A5C" strokeWidth="1" style={{ opacity: 0 }} />
          ))}
        </svg>
        {heroNodes.map((nd, i) => (
          <span
            key={`hn-${i}`}
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            className={`hero-node absolute ${kaos ? "hero-node-snap" : ""} ${
              scen === "ordning" ? "hero-drift" : ""
            } ${nd.mobile ? "" : "hidden md:block"}`}
            style={{
              left: `${kaos ? nd.cx : nd.x}%`,
              top: `${kaos ? nd.cy : nd.y}%`,
              ["--dx" as string]: `${nd.dx}px`,
              ["--dy" as string]: `${nd.dy}px`,
              animationDuration: `${nd.dur}s`,
              animationDelay: `${1 + i * 0.3}s`,
            }}
          >
            {nd.chip ? (
              <span
                className="hero-chip-box block -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-white/5 border border-paper/15 shadow-sm px-2.5 py-1 text-[11px] font-semibold text-paper/60"
                style={{ rotate: `${kaos ? (nd.crot ?? 0) : (nd.rot ?? 0)}deg` }}
              >
                {nd.chip}
              </span>
            ) : (
              <span className="hero-dot" style={{ animationDelay: `${i * 0.7}s` }} />
            )}
          </span>
        ))}
        {/* Besökarens egen nod: följer pekaren, med pulsring */}
        <div ref={cursorRef} className="hero-cursor" />
      </div>
      {/* Ljuskägla som följer musen (döljs på pekskärm och vid reduced motion) */}
      <div className="hero-spot" aria-hidden="true" />
      {/* Vertikalt centrerat i skärmhöjden; pt klarar headern ovanpå */}
      <div className="relative w-full mx-auto max-w-6xl px-6 pt-24 pb-14 md:pt-28 md:pb-20 grid md:grid-cols-12 gap-8 md:gap-12 items-end">
        <div className="md:col-span-12">
          <div className="eyebrow mb-8 hero-rise">ABO Growth · Digitala system & AI</div>
          {/* Skärmläsare får hela meningen; bokstavsspelet är rent visuellt.
              Mobilstorleken skalar med skärmen: annars klipps det längsta
              roterande ordet (marknadsföringen), som inte kan radbrytas. */}
          <h1 className="display-heading text-paper text-[clamp(30px,9vw,44px)] leading-[1.02] md:text-[clamp(44px,5.8vw,76px)]">
            <span className="sr-only">Få koll på {rotatingWords[0]} en gång för alla.</span>
            <span aria-hidden="true">
              <Bokstavsrad text="Få koll på " bas={0.15} />
              <RotatingWord />
              <br />
              <Bokstavsrad text="en gång för alla." bas={0.55} />
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-paper/70 leading-relaxed hero-rise [animation-delay:700ms]">
            Jag skapar ordning: en systemflora som hänger ihop, mindre
            dubbelarbete och en tydlig väg framåt.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4 hero-rise [animation-delay:850ms]">
            <Link
              to="/boka"
              className="inline-flex items-center gap-2 bg-brand-green text-paper px-6 py-3.5 text-sm font-semibold hover:bg-paper hover:text-ink transition-colors"
            >
              Boka ett samtal <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
            <a href="#systemkollen" className="group inline-flex items-center gap-1.5 text-sm font-semibold border-b-2 border-brand-green pb-1 hover:text-brand-green">
              Gör systemkollen
              <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" strokeWidth={2.5} />
            </a>
          </div>
          {/* Svarar på besökarens första fråga: är det här för mig? */}
          <p className="mt-8 flex items-start gap-2.5 text-sm text-paper/50 leading-relaxed hero-rise [animation-delay:1000ms]">
            <span aria-hidden="true" className="mt-2 h-px w-6 shrink-0 bg-brand-green" />
            För mindre bolag, från enmansföretag upp till ett femtiotal
            anställda, som inte har någon egen IT-avdelning.
          </p>
        </div>
      </div>
      </div>
    </section>
  );
}

// ============================================================================
// SYSTEMKOLLEN — besökaren anger sina RIKTIGA system, låser upp
// resultatet med ett kort formulär (lead till Netlify Forms "systemkollen")
// och får kartan som förslag: systemen ordnade kring affären med
// regelbaserade kopplingar som förklarar sig vid hover/tryck.
// Deterministiskt, ingen AI-tjänst, ingen backend utöver Netlify Forms.
// ============================================================================

type Kategori =
  | "ekonomi"
  | "crm"
  | "mejl"
  | "komm"
  | "projekt"
  | "mf"
  | "ehandel"
  | "lagring"
  | "analys"
  | "ai"
  | "ovrigt";

const kategoriNamn: Record<Kategori, string> = {
  ekonomi: "Ekonomi",
  crm: "CRM & sälj",
  mejl: "Mejl & kalender",
  komm: "Kommunikation",
  projekt: "Projekt",
  mf: "Marknadsföring",
  ehandel: "E-handel & webb",
  lagring: "Fillagring",
  analys: "Analys & kalkyl",
  ai: "AI-verktyg",
  ovrigt: "Övrigt",
};

// Katalog över vanliga system i svenska småbolag. Namnen används i leads
// och på kartan; håll stavningen som varumärkena själva skriver den.
// regelgrupp: ersätter kategorin vid regelmatchning när systemet inte beter
// sig som kategorins typfall (Klarna bokför inte, Canva skickar inga utskick).
// overlapp: två valda system i samma overlapp-grupp gör samma jobb → bytestips.
type RegelToken =
  | Kategori
  | "betalning"
  | "webbanalys"
  | "beteende"
  | "webbplats"
  | "design"
  | "video"
  | "bildai";

type KatalogPost = { namn: string; kat: Kategori; regelgrupp?: RegelToken; overlapp?: string };

const systemKatalog: KatalogPost[] = [
  { namn: "Fortnox", kat: "ekonomi", overlapp: "bokforing" },
  { namn: "Visma eEkonomi", kat: "ekonomi", overlapp: "bokforing" },
  { namn: "Bokio", kat: "ekonomi", overlapp: "bokforing" },
  { namn: "Wint", kat: "ekonomi", overlapp: "bokforing" },
  { namn: "PE Accounting", kat: "ekonomi", overlapp: "bokforing" },
  { namn: "Björn Lundén", kat: "ekonomi", overlapp: "bokforing" },
  { namn: "Billogram", kat: "ekonomi" },
  { namn: "Klarna", kat: "ekonomi", regelgrupp: "betalning" },
  { namn: "Stripe", kat: "ekonomi", regelgrupp: "betalning" },
  { namn: "Zettle", kat: "ekonomi", regelgrupp: "betalning" },
  { namn: "Swish", kat: "ekonomi", regelgrupp: "betalning" },
  { namn: "HubSpot", kat: "crm", overlapp: "crm" },
  { namn: "Pipedrive", kat: "crm", overlapp: "crm" },
  { namn: "Salesforce", kat: "crm", overlapp: "crm" },
  { namn: "Upsales", kat: "crm", overlapp: "crm" },
  { namn: "Lime CRM", kat: "crm", overlapp: "crm" },
  { namn: "Zoho CRM", kat: "crm", overlapp: "crm" },
  { namn: "webCRM", kat: "crm", overlapp: "crm" },
  { namn: "Microsoft 365", kat: "mejl", overlapp: "kontorspaket" },
  { namn: "Google Workspace", kat: "mejl", overlapp: "kontorspaket" },
  { namn: "Outlook", kat: "mejl", overlapp: "mejlklient" },
  { namn: "Gmail", kat: "mejl", overlapp: "mejlklient" },
  { namn: "Calendly", kat: "mejl" },
  { namn: "Slack", kat: "komm", overlapp: "chatt" },
  { namn: "Teams", kat: "komm", overlapp: "chatt" },
  { namn: "Discord", kat: "komm", overlapp: "chatt" },
  { namn: "Zoom", kat: "komm", regelgrupp: "video", overlapp: "video" },
  { namn: "Google Meet", kat: "komm", regelgrupp: "video", overlapp: "video" },
  { namn: "Monday", kat: "projekt", overlapp: "projektverktyg" },
  { namn: "Trello", kat: "projekt", overlapp: "projektverktyg" },
  { namn: "Asana", kat: "projekt", overlapp: "projektverktyg" },
  { namn: "ClickUp", kat: "projekt", overlapp: "projektverktyg" },
  { namn: "Jira", kat: "projekt", overlapp: "projektverktyg" },
  { namn: "Basecamp", kat: "projekt", overlapp: "projektverktyg" },
  { namn: "Notion", kat: "projekt" },
  { namn: "Mailchimp", kat: "mf", overlapp: "nyhetsbrev" },
  { namn: "Klaviyo", kat: "mf", overlapp: "nyhetsbrev" },
  { namn: "Rule", kat: "mf", overlapp: "nyhetsbrev" },
  { namn: "Get a Newsletter", kat: "mf", overlapp: "nyhetsbrev" },
  { namn: "Meta Ads", kat: "mf" },
  { namn: "Google Ads", kat: "mf" },
  { namn: "LinkedIn Ads", kat: "mf" },
  { namn: "Canva", kat: "mf", regelgrupp: "design" },
  { namn: "Shopify", kat: "ehandel", overlapp: "webbshop" },
  { namn: "WooCommerce", kat: "ehandel", overlapp: "webbshop" },
  { namn: "Quickbutik", kat: "ehandel", overlapp: "webbshop" },
  { namn: "Wix", kat: "ehandel", regelgrupp: "webbplats", overlapp: "sajtbyggare" },
  { namn: "Squarespace", kat: "ehandel", regelgrupp: "webbplats", overlapp: "sajtbyggare" },
  { namn: "WordPress", kat: "ehandel", regelgrupp: "webbplats", overlapp: "sajtbyggare" },
  { namn: "Google Drive", kat: "lagring", overlapp: "fillagring" },
  { namn: "OneDrive", kat: "lagring", overlapp: "fillagring" },
  { namn: "Dropbox", kat: "lagring", overlapp: "fillagring" },
  { namn: "SharePoint", kat: "lagring" },
  { namn: "Google Analytics", kat: "analys", regelgrupp: "webbanalys", overlapp: "webbanalys" },
  { namn: "Matomo", kat: "analys", regelgrupp: "webbanalys", overlapp: "webbanalys" },
  { namn: "Hotjar", kat: "analys", regelgrupp: "beteende" },
  { namn: "Looker Studio", kat: "analys", overlapp: "bi" },
  { namn: "Power BI", kat: "analys", overlapp: "bi" },
  { namn: "Excel", kat: "analys", overlapp: "kalkyl" },
  { namn: "Google Sheets", kat: "analys", overlapp: "kalkyl" },
  { namn: "ChatGPT", kat: "ai", overlapp: "ai-assistent" },
  { namn: "Claude", kat: "ai", overlapp: "ai-assistent" },
  { namn: "Copilot", kat: "ai", overlapp: "ai-assistent" },
  { namn: "Gemini", kat: "ai", overlapp: "ai-assistent" },
  { namn: "Midjourney", kat: "ai", regelgrupp: "bildai" },
];

// Snabbval under sökfältet: de vanligaste hos målgruppen.
const snabbval = [
  "Fortnox",
  "Microsoft 365",
  "HubSpot",
  "Slack",
  "Google Workspace",
  "Shopify",
  "Mailchimp",
  "ChatGPT",
  "Trello",
  "Google Analytics",
];

// Regelkatalogen: vad två sorters system kan göra ihop. Matchas på
// regel-token (kategori eller regelgrupp), riktningsneutral text som
// prefixas med systemens riktiga namn. Skriv bara regler som stämmer för
// ALLA system bakom respektive token; specialfall får egen regelgrupp.
const kopplingsregler: { par: [RegelToken, RegelToken]; text: string }[] = [
  { par: ["ekonomi", "crm"], text: "godkänd offert blir faktura automatiskt" },
  { par: ["ekonomi", "analys"], text: "nyckeltalen uppdaterar sig själva i rapporterna" },
  { par: ["ekonomi", "lagring"], text: "kvitton och underlag arkiveras automatiskt" },
  { par: ["ekonomi", "projekt"], text: "projektets timmar och utlägg blir fakturaunderlag" },
  { par: ["ekonomi", "komm"], text: "betald faktura ger en notis i kanalen" },
  { par: ["ekonomi", "ehandel"], text: "ordrar bokförs utan handpåläggning" },
  { par: ["crm", "mejl"], text: "mejl och möten loggas på rätt kund" },
  { par: ["crm", "mf"], text: "kundlistan styr utskick och annonsmålgrupper" },
  { par: ["crm", "projekt"], text: "vunnen affär blir ett projekt med uppgifter direkt" },
  { par: ["crm", "analys"], text: "säljtratten blir mätbar i rapporterna" },
  { par: ["crm", "lagring"], text: "avtal och offerter sparas på rätt kund" },
  { par: ["crm", "komm"], text: "kunddialogen samlas på ett ställe" },
  { par: ["crm", "ehandel"], text: "kunderna i butiken blir kontakter i registret" },
  { par: ["mf", "analys"], text: "kampanjresultaten mäts mot riktiga siffror" },
  { par: ["mf", "ehandel"], text: "köpdatan styr kampanjer och annonser" },
  { par: ["mejl", "komm"], text: "mötesbokningar och påminnelser dyker upp i chatten" },
  { par: ["mejl", "projekt"], text: "deadlines hamnar i kalendern av sig själva" },
  { par: ["mejl", "lagring"], text: "bilagor arkiveras automatiskt i rätt mapp" },
  { par: ["projekt", "lagring"], text: "filerna ligger på rätt projekt" },
  { par: ["projekt", "komm"], text: "uppdateringar landar där teamet redan är" },
  { par: ["ehandel", "analys"], text: "försäljningen syns i realtid i rapporterna" },
  { par: ["ehandel", "komm"], text: "nya ordrar pingar direkt i kanalen" },
  { par: ["analys", "komm"], text: "veckans siffror postas automatiskt i kanalen" },
  { par: ["komm", "lagring"], text: "filer som delas i chatten sparas på rätt ställe" },
  { par: ["betalning", "ekonomi"], text: "betalningarna prickas av i bokföringen automatiskt" },
  { par: ["betalning", "ehandel"], text: "kassan och betalningen hänger ihop utan mellansteg" },
  { par: ["webbanalys", "mf"], text: "ni ser vilka kampanjer som ger trafik som konverterar" },
  { par: ["webbanalys", "ehandel"], text: "besök och köp kopplas ihop i samma vy" },
  { par: ["webbanalys", "webbplats"], text: "ni ser vad besökarna faktiskt gör på sajten" },
  { par: ["webbanalys", "analys"], text: "webbsiffrorna landar i samma rapport som resten" },
  { par: ["beteende", "ehandel"], text: "ni ser var besökarna fastnar innan köpet" },
  { par: ["beteende", "webbplats"], text: "ni ser var besökarna fastnar på sidorna" },
  { par: ["beteende", "mf"], text: "kampanjtrafiken följs hela vägen in på sidan" },
  { par: ["beteende", "webbanalys"], text: "siffrorna får en förklaring i hur besökarna beter sig" },
  { par: ["webbplats", "crm"], text: "formulären på sajten skapar kontakter automatiskt" },
  { par: ["webbplats", "mf"], text: "kampanjerna leder till sidor som går att följa upp" },
  { par: ["design", "ehandel"], text: "grafiken går rakt in i butik och produktsidor" },
  { par: ["design", "mf"], text: "designmallarna återanvänds i utskick och annonser" },
  { par: ["video", "mejl"], text: "möteslänken hamnar rätt i varje kalenderbokning" },
  { par: ["video", "crm"], text: "kundmöten loggas på rätt kontakt" },
  { par: ["bildai", "mf"], text: "AI:n tar fram bilder och grafik till inlägg och annonser" },
  { par: ["bildai", "ehandel"], text: "AI:n skapar produktbilder åt butiken" },
  { par: ["bildai", "design"], text: "AI-bilderna landar direkt i designflödet" },
];

// AI-assistenternas koppling till övriga system: etiketten väljs efter vad
// motparten är för sorts system, så varje koppling säger något konkret.
const aiEtiketter: Record<Kategori, string> = {
  ekonomi: "AI:n tolkar siffrorna och flaggar det som sticker ut",
  crm: "AI:n skriver utkast till offerter och uppföljningsmejl",
  mejl: "AI:n sammanfattar mejltrådar och föreslår svar",
  komm: "AI:n sammanfattar möten och långa trådar",
  projekt: "AI:n bryter ner uppgifter och skriver statusrapporter",
  mf: "AI:n tar fram utkast till inlägg och annonstexter",
  ehandel: "AI:n skriver produkttexter och svarar på vanliga kundfrågor",
  lagring: "AI:n hittar rätt dokument och sammanfattar innehållet",
  analys: "AI:n förklarar vad siffrorna faktiskt betyder",
  ai: "AI:n avlastar rutinjobbet",
  ovrigt: "AI:n avlastar rutinjobbet i vardagen",
};

// Bytestips när två valda system gör samma jobb. Nyckel = overlapp-grupp,
// "standard" är fallback.
const overlappTexter: Record<string, string> = {
  standard: "{a} och {b} gör i stort sett samma jobb. Ett av dem brukar räcka.",
  kontorspaket:
    "{a} och {b} är två parallella kontorsvärldar. Att samla allt i en brukar spara både pengar och strul.",
  mejlklient:
    "{a} och {b} är två mejlmiljöer sida vid sida. En gemensam brukar ge färre tappade trådar.",
  chatt:
    "{a} och {b} delar på samma konversationer. En kanal brukar ge färre missade meddelanden.",
  fillagring:
    "{a} och {b} betyder att filerna ligger på två ställen. En gemensam yta sparar mycket letande.",
  "ai-assistent":
    "{a} och {b} löser samma sak. Välj en som standard så samlas vanan och historiken på ett ställe.",
};

const MAX_SYSTEM = 12;

type ValtSystem = { namn: string; kat: Kategori };

const katalogPost = (namn: string) =>
  systemKatalog.find((s) => s.namn.toLowerCase() === namn.toLowerCase());

// Regel-token: regelgruppen om systemet har en, annars kategorin.
// Fritextsystem finns inte i katalogen och faller tillbaka på sin kategori.
const regelToken = (v: ValtSystem): RegelToken => katalogPost(v.namn)?.regelgrupp ?? v.kat;

type Tips = { typ: "byte" | "komplement"; text: string };

// Tipsmotorn: bytesförslag (två system i samma overlapp-grupp) och
// komplementförslag (lucka i floran som ett känt verktyg skulle fylla).
// Föreslår aldrig något ur en kategori/grupp besökaren redan täckt.
function beraknaTips(valda: ValtSystem[]): Tips[] {
  const tips: Tips[] = [];

  for (let i = 0; i < valda.length; i++) {
    for (let j = i + 1; j < valda.length; j++) {
      const ga = katalogPost(valda[i].namn)?.overlapp;
      const gb = katalogPost(valda[j].namn)?.overlapp;
      if (ga && ga === gb) {
        const mall = overlappTexter[ga] ?? overlappTexter.standard;
        tips.push({
          typ: "byte",
          text: mall.replace("{a}", valda[i].namn).replace("{b}", valda[j].namn),
        });
      }
    }
  }

  const kats = new Set(valda.map((v) => v.kat));
  const toks = new Set(valda.map(regelToken));
  const grupper = new Set(valda.map((v) => katalogPost(v.namn)?.overlapp).filter(Boolean));
  const namnMedToken = (t: RegelToken) => valda.find((v) => regelToken(v) === t)?.namn;
  const namnMedGrupp = (g: string) =>
    valda.find((v) => katalogPost(v.namn)?.overlapp === g)?.namn;

  if (kats.has("crm") && !toks.has("ekonomi")) {
    tips.push({
      typ: "komplement",
      text: `Ett ekonomisystem som Fortnox skulle kunna ta emot affärerna från ${namnMedToken("crm")} och göra offert till faktura i ett steg.`,
    });
  }
  if (toks.has("ekonomi") && !kats.has("crm")) {
    tips.push({
      typ: "komplement",
      text: `Ett CRM, till exempel Pipedrive eller HubSpot, skulle ge koll på affärerna innan de landar i ${namnMedToken("ekonomi")}.`,
    });
  }
  if (toks.has("ehandel") && !grupper.has("nyhetsbrev")) {
    tips.push({
      typ: "komplement",
      text: `Ett nyhetsbrevsverktyg som Mailchimp eller Klaviyo skulle kunna jobba direkt med köpdatan från ${namnMedToken("ehandel")}.`,
    });
  }
  let webbmatning = false;
  if ((toks.has("ehandel") || toks.has("webbplats")) && !toks.has("webbanalys")) {
    webbmatning = true;
    tips.push({
      typ: "komplement",
      text: `Google Analytics eller Matomo skulle visa vad besökarna gör på ${namnMedToken("ehandel") ?? namnMedToken("webbplats")} innan de köper eller hör av sig.`,
    });
  }
  if (kats.has("mf") && !kats.has("analys") && !webbmatning) {
    tips.push({
      typ: "komplement",
      text: "Ett mätverktyg, till exempel Google Analytics, skulle visa vilka kampanjer som faktiskt ger något.",
    });
  }
  if (kats.has("projekt") && !kats.has("lagring")) {
    tips.push({
      typ: "komplement",
      text: `En gemensam fillagring som Google Drive eller OneDrive skulle ge ${namnMedToken("projekt")} ett ställe att hämta filerna från.`,
    });
  }
  if (grupper.has("chatt") && !kats.has("projekt")) {
    tips.push({
      typ: "komplement",
      text: `Ett projektverktyg som Trello eller Monday skulle ge trådarna i ${namnMedGrupp("chatt")} någonstans att bli uppgifter.`,
    });
  }
  if (valda.length >= 3 && !kats.has("ai")) {
    tips.push({
      typ: "komplement",
      text: "Ett AI-verktyg som ChatGPT eller Copilot skulle kunna avlasta rutinjobbet i flera av systemen.",
    });
  }

  return tips.slice(0, 4);
}

// Kaosplatser för upp till 12 noder (index-styrt, deterministiskt).
const kaosPlatser = [
  { x: 34, y: 26, r: -9 },
  { x: 62, y: 22, r: 7 },
  { x: 46, y: 48, r: -6 },
  { x: 70, y: 54, r: 11 },
  { x: 28, y: 60, r: 8 },
  { x: 55, y: 34, r: -12 },
  { x: 38, y: 74, r: 6 },
  { x: 66, y: 76, r: -8 },
  { x: 22, y: 42, r: -5 },
  { x: 50, y: 64, r: 9 },
  { x: 78, y: 36, r: -7 },
  { x: 42, y: 14, r: 10 },
];

function SystemKollen() {
  const [valda, setValda] = useState<ValtSystem[]>([]);
  const [sok, setSok] = useState("");
  const [okand, setOkand] = useState<string | null>(null);
  const [fas, setFas] = useState<"bygga" | "formular" | "ordnad">("bygga");
  const [lead, setLead] = useState({ namn: "", epost: "", foretag: "" });
  const [skickar, setSkickar] = useState(false);
  const [fel, setFel] = useState(false);
  const [etikett, setEtikett] = useState<number | null>(null);
  const mobil = useIsMobile();

  const n = valda.length;
  const ordnad = fas === "ordnad";
  const hub = { x: 50, y: mobil ? 48 : 47 };
  const rx = mobil ? 34 : 38;
  const ry = mobil ? 36 : 33;

  const orderedPos = (i: number) => {
    const vinkel = -Math.PI / 2 + (i * 2 * Math.PI) / Math.max(n, 1);
    return { x: hub.x + rx * Math.cos(vinkel), y: hub.y + ry * Math.sin(vinkel) };
  };
  const kaosPos = (i: number) => kaosPlatser[i % kaosPlatser.length];
  const pos = (i: number) => (ordnad ? orderedPos(i) : kaosPos(i));

  // Sökförslag: katalogträffar som inte redan är valda, max 6.
  const forslag =
    sok.trim().length < 2
      ? []
      : systemKatalog
          .filter(
            (k) =>
              k.namn.toLowerCase().includes(sok.trim().toLowerCase()) &&
              !valda.some((v) => v.namn.toLowerCase() === k.namn.toLowerCase()),
          )
          .slice(0, 6);
  // Exakt träff i katalogen ELLER bland redan valda: då göms fritextvalet
  // (annars visas en död "Lägg till"-knapp för system som redan ligger inne).
  const exaktTraff =
    forslag.some((f) => f.namn.toLowerCase() === sok.trim().toLowerCase()) ||
    valda.some((v) => v.namn.toLowerCase() === sok.trim().toLowerCase());

  const laggTill = (namn: string, kat: Kategori) => {
    if (n >= MAX_SYSTEM) return;
    if (valda.some((v) => v.namn.toLowerCase() === namn.toLowerCase())) return;
    setValda((s) => [...s, { namn, kat }]);
    setSok("");
    setOkand(null);
  };
  const taBort = (namn: string) => setValda((s) => s.filter((v) => v.namn !== namn));
  const reset = () => {
    setValda([]);
    setSok("");
    setOkand(null);
    setFas("bygga");
    setLead({ namn: "", epost: "", foretag: "" });
    setFel(false);
    setEtikett(null);
  };

  // Kopplingar: regelkatalogen matchas på regel-token (i<j, en linje per
  // systempar). AI-assistenter kopplas till allt som ett lättare lager med
  // etikett vald efter motpartens kategori; bild-AI (Midjourney) går i
  // stället via egna regler så den bara kopplas dit den hör hemma.
  const lankar: { a: number; b: number; text: string; ai: boolean }[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const A = valda[i];
      const B = valda[j];
      const tokA = regelToken(A);
      const tokB = regelToken(B);
      if (tokA === tokB) continue;
      const prefix = `${A.namn} + ${B.namn}: `;
      if (tokA === "ai" || tokB === "ai") {
        const partner = tokA === "ai" ? B : A;
        if (partner.kat === "ai") continue;
        lankar.push({ a: i, b: j, text: prefix + aiEtiketter[partner.kat], ai: true });
        continue;
      }
      const regel = kopplingsregler.find(
        (r) =>
          (r.par[0] === tokA && r.par[1] === tokB) ||
          (r.par[0] === tokB && r.par[1] === tokA),
      );
      if (regel) lankar.push({ a: i, b: j, text: prefix + regel.text, ai: false });
    }
  }
  const k = lankar.length;
  const tips = beraknaTips(valda);

  // När besökaren går vidare till bokningen från resultatet följer kartan
  // med: /boka läser nyckeln vid mount och förifyller meddelandefältet.
  const sparaBokningsKontext = () => {
    try {
      sessionStorage.setItem(
        "systemkollen-boka",
        `Jag gjorde systemkollen: ${valda.map((v) => `${v.namn} (${kategoriNamn[v.kat]})`).join(", ")}. ` +
          (k > 0
            ? `Kartan visade ${k} ${k === 1 ? "möjlig koppling" : "möjliga kopplingar"}.`
            : "Kartan visade inga givna kopplingar."),
      );
    } catch {
      /* privat läge utan sessionStorage: bokningen funkar ändå */
    }
  };

  // Trassel i kaosläget (kedja + genvägar mellan kaosplatserna).
  const tangle: [number, number][] = [];
  for (let i = 0; i < n - 1; i++) tangle.push([i, i + 1]);
  if (n >= 3) tangle.push([n - 1, 0]);
  if (n >= 5) for (let i = 0; i < n; i += 2) tangle.push([i, (i + 3) % n]);

  const arcPath = (ai: number, bi: number) => {
    const A = orderedPos(ai);
    const B = orderedPos(bi);
    const mx = (A.x + B.x) / 2;
    const my = (A.y + B.y) / 2;
    let dx = mx - hub.x;
    let dy = my - hub.y;
    let len = Math.hypot(dx, dy);
    if (len < 1) {
      dx = -(B.y - A.y);
      dy = B.x - A.x;
      len = Math.hypot(dx, dy) || 1;
    }
    const bulge = 13;
    const cx = mx + (dx / len) * bulge;
    const cy = my + (dy / len) * bulge;
    return {
      d: `M ${A.x} ${A.y} Q ${cx} ${cy} ${B.x} ${B.y}`,
      apx: (A.x + 2 * cx + B.x) / 4,
      apy: (A.y + 2 * cy + B.y) / 4,
    };
  };

  // Grinden: leaden skickas till Netlify Forms (statiska detekteringsfilen,
  // ALDRIG "/"), med hela systemlistan som säljunderlag. I dev-läge saknas
  // Netlify-mottagaren, då släpps man vidare ändå.
  const skickaLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setSkickar(true);
    setFel(false);
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "systemkollen",
          "bot-field": "",
          namn: lead.namn,
          epost: lead.epost,
          foretag: lead.foretag,
          system: valda.map((v) => `${v.namn} (${kategoriNamn[v.kat]})`).join(", "),
          kopplingar: String(k),
          tips: tips.map((t) => `[${t.typ}] ${t.text}`).join(" | "),
        }).toString(),
      });
      if (!res.ok && import.meta.env.PROD) throw new Error(String(res.status));
      setFas("ordnad");
    } catch {
      setFel(true);
    } finally {
      setSkickar(false);
    }
  };

  return (
    <section id="systemkollen" className="snap-start relative min-h-svh bg-ink text-paper overflow-hidden">
      <div className="ai-glow" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <div className="max-w-3xl">
            <div className="eyebrow mb-5">Huvudtjänst · Digitala system & AI</div>
            <h2 className="display-heading text-3xl md:text-5xl text-paper">
              Gör <span className="text-brand-green">systemkollen</span>.
            </h2>
            <p className="mt-6 text-paper/70 leading-relaxed max-w-2xl">
              Skriv in systemen ni faktiskt använder och se er egen karta växa
              fram. Sedan ordnar jag den: kartan som landar är mitt förslag på
              hur allt kan jobba ihop.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          {/* Sökfält + snabbval (döljs när kartan är ordnad) */}
          {!ordnad && (
            <div className="mt-10 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={sok}
                  onChange={(e) => {
                    setSok(e.target.value);
                    setOkand(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (forslag.length > 0) laggTill(forslag[0].namn, forslag[0].kat);
                      else if (sok.trim().length >= 2) setOkand(sok.trim());
                    }
                  }}
                  placeholder={n >= MAX_SYSTEM ? "Max 12 system" : "Sök era system: Fortnox, HubSpot, Slack ..."}
                  disabled={n >= MAX_SYSTEM}
                  aria-label="Sök efter system"
                  className="w-full bg-white/5 border border-paper/25 px-4 py-3.5 text-base text-paper placeholder:text-paper/40 focus:outline-none focus:border-brand-green disabled:opacity-50"
                />
                {(forslag.length > 0 || (sok.trim().length >= 2 && !exaktTraff)) && (
                  <div className="absolute inset-x-0 top-full mt-1 z-20 bg-ink border border-paper/20 shadow-xl">
                    {forslag.map((f) => (
                      <button
                        key={f.namn}
                        type="button"
                        onClick={() => laggTill(f.namn, f.kat)}
                        className="flex w-full items-center justify-between px-4 py-2.5 text-sm text-left text-paper/85 hover:bg-white/10"
                      >
                        <span>{f.namn}</span>
                        <span className="tracked text-[9px] text-paper/40">{kategoriNamn[f.kat]}</span>
                      </button>
                    ))}
                    {sok.trim().length >= 2 && !exaktTraff && (
                      <button
                        type="button"
                        onClick={() => setOkand(sok.trim())}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-left text-brand-green hover:bg-white/10 border-t border-paper/10"
                      >
                        <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                        Lägg till &quot;{sok.trim()}&quot;
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Kategorifråga för okända system */}
              {okand && (
                <div className="mt-3 border border-brand-green/40 bg-white/5 p-4">
                  <p className="text-sm text-paper/75 mb-3">
                    Vad är <span className="font-semibold text-paper">{okand}</span> för sorts system?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(kategoriNamn) as Kategori[]).map((kat) => (
                      <button
                        key={kat}
                        type="button"
                        onClick={() => laggTill(okand, kat)}
                        className="px-3 py-1.5 text-xs font-semibold border border-paper/25 text-paper/75 hover:border-brand-green hover:text-paper transition-colors"
                      >
                        {kategoriNamn[kat]}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Snabbval */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="tracked text-[9px] text-paper/40 mr-1">Vanliga:</span>
                {snabbval
                  .filter((namn) => !valda.some((v) => v.namn === namn))
                  .slice(0, mobil ? 6 : 10)
                  .map((namn) => {
                    const post = systemKatalog.find((s) => s.namn === namn)!;
                    return (
                      <button
                        key={namn}
                        type="button"
                        onClick={() => laggTill(post.namn, post.kat)}
                        disabled={n >= MAX_SYSTEM}
                        className="px-3 py-1.5 text-xs font-semibold border border-paper/20 text-paper/65 hover:border-brand-green/60 hover:text-paper transition-colors disabled:opacity-40"
                      >
                        {namn}
                      </button>
                    );
                  })}
              </div>

              {/* Valda system som borttagbara taggar */}
              {n > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {valda.map((v) => (
                    <span
                      key={v.namn}
                      className="inline-flex items-center gap-1.5 bg-brand-green/15 border border-brand-green/40 text-paper px-2.5 py-1 text-xs font-semibold"
                    >
                      {v.namn}
                      <button
                        type="button"
                        onClick={() => taBort(v.namn)}
                        aria-label={`Ta bort ${v.namn}`}
                        className="text-paper/60 hover:text-paper"
                      >
                        <X className="h-3 w-3" strokeWidth={2.5} />
                      </button>
                    </span>
                  ))}
                  <span className="text-xs text-paper/40">{n}/{MAX_SYSTEM}</span>
                </div>
              )}
            </div>
          )}

          {/* Kartan */}
          <div
            className={`sysmap relative mt-8 h-[21rem] md:h-96 border border-paper/10 bg-white/[0.03] ${
              ordnad ? "is-visible" : ""
            }`}
            onClick={() => setEtikett(null)}
          >
            {n === 0 ? (
              <p className="absolute inset-0 flex items-center justify-center px-8 text-center text-sm text-paper/40">
                Sök eller välj era system ovan, så byggs er karta här.
              </p>
            ) : (
              <>
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" aria-hidden="true">
                  {tangle.map(([a, b]) => (
                    <line
                      key={`t-${a}-${b}`}
                      className="jungle-tangle"
                      x1={kaosPos(a).x}
                      y1={kaosPos(a).y}
                      x2={kaosPos(b).x}
                      y2={kaosPos(b).y}
                      stroke="#8A8D90"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                  {valda.map((v, i) => (
                    <line
                      key={`o-${v.namn}`}
                      className="sysmap-link"
                      pathLength={1}
                      x1={hub.x}
                      y1={hub.y}
                      x2={orderedPos(i).x}
                      y2={orderedPos(i).y}
                      stroke="#1F8A5C"
                      strokeOpacity="0.35"
                      strokeWidth="1.25"
                      vectorEffect="non-scaling-stroke"
                      style={{ transitionDelay: `${0.55 + i * 0.06}s` }}
                    />
                  ))}
                  {lankar.map((l, j) => (
                    <path
                      key={`s-${l.a}-${l.b}`}
                      className="sysmap-link"
                      pathLength={1}
                      d={arcPath(l.a, l.b).d}
                      stroke="#1F8A5C"
                      strokeOpacity={l.ai ? "0.3" : etikett === j ? "1" : "0.8"}
                      strokeWidth={l.ai ? "0.75" : etikett === j ? "1.75" : "1"}
                      fill="none"
                      vectorEffect="non-scaling-stroke"
                      style={{ transitionDelay: `${1.3 + j * 0.09}s` }}
                    />
                  ))}
                </svg>
                <span className="sysmap-hub-ring" style={{ left: `${hub.x}%`, top: `${hub.y}%` }} />
                {/* Kopplingsmarkörer: hover/tryck visar förslaget i klartext */}
                {ordnad &&
                  lankar.map((l, j) => {
                    const arc = arcPath(l.a, l.b);
                    return (
                      <button
                        key={`m-${l.a}-${l.b}`}
                        type="button"
                        aria-label={l.text}
                        onMouseEnter={() => setEtikett(j)}
                        onMouseLeave={() => setEtikett((v) => (v === j ? null : v))}
                        onClick={(e) => {
                          e.stopPropagation();
                          setEtikett((v) => (v === j ? null : j));
                        }}
                        className="jungle-late absolute z-10 flex h-6 w-6 items-center justify-center"
                        style={{
                          left: `${arc.apx}%`,
                          top: `${arc.apy}%`,
                          transform: "translate(-50%, -50%)",
                          transitionDelay: `${1.6 + j * 0.05}s`,
                        }}
                      >
                        <span
                          className={`block rounded-full transition-all ${
                            etikett === j ? "h-3 w-3 bg-brand-green shadow-[0_0_10px_rgba(31,138,92,0.8)]" : "h-2 w-2 bg-brand-green/70"
                          }`}
                        />
                      </button>
                    );
                  })}
                {/* Etiketten */}
                {ordnad && etikett !== null && lankar[etikett] && (
                  <div
                    className="absolute z-20 max-w-[260px] -translate-x-1/2 bg-white text-ink text-xs font-semibold leading-snug px-3 py-2 shadow-lg border border-line pointer-events-none"
                    style={{
                      left: `${Math.min(80, Math.max(20, arcPath(lankar[etikett].a, lankar[etikett].b).apx))}%`,
                      top: `${Math.max(4, arcPath(lankar[etikett].a, lankar[etikett].b).apy - 10)}%`,
                    }}
                  >
                    {lankar[etikett].text}
                  </div>
                )}
                {/* Navet */}
                <div
                  className="jungle-late absolute"
                  style={{ left: `${hub.x}%`, top: `${hub.y}%`, transform: "translate(-50%, -50%)", transitionDelay: "0.45s", zIndex: 2 }}
                >
                  <div className="sysmap-node-box bg-brand-green text-paper shadow-md whitespace-nowrap px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-semibold">
                    Er affär
                  </div>
                </div>
                {/* Systemnoderna med riktiga namn */}
                {valda.map((v, i) => {
                  const p = pos(i);
                  const rot = ordnad ? 0 : kaosPos(i).r;
                  return (
                    <div
                      key={v.namn}
                      className="sysmap-node absolute"
                      style={{ left: `${p.x}%`, top: `${p.y}%`, transform: `translate(-50%, -50%) rotate(${rot}deg)`, zIndex: 1 }}
                    >
                      <div className="jungle-pop sysmap-node-box whitespace-nowrap bg-white/95 border border-line text-ink/80 shadow-sm px-2 py-1 md:px-3 md:py-1.5 text-[10px] md:text-xs font-semibold">
                        {v.namn}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* Under kartan: knapp / grind / resultat beroende på fas */}
          <div className="mt-8 min-h-14">
            {fas === "bygga" && (
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setFas("formular")}
                  disabled={n < 2}
                  className="inline-flex items-center gap-2 bg-brand-green text-paper px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-paper hover:text-ink disabled:opacity-40 disabled:pointer-events-none"
                >
                  Skapa ordning <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </button>
                <span className="text-sm text-paper/50">
                  {n < 2 ? "Välj minst två system." : `${n} system valda.`}
                </span>
              </div>
            )}

            {fas === "formular" && (
              <form onSubmit={skickaLead} className="max-w-xl border border-brand-green/40 bg-white/5 p-5 md:p-6">
                <p className="text-sm text-paper/75 leading-relaxed mb-5">
                  Fyll i så ordnar jag er karta. Jag hör av mig med tankar om
                  er systemflora, kostnadsfritt och utan förpliktelser.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    required
                    value={lead.namn}
                    onChange={(e) => setLead({ ...lead, namn: e.target.value })}
                    placeholder="Namn *"
                    aria-label="Namn"
                    className="w-full bg-ink border border-paper/25 px-4 py-3 text-base text-paper placeholder:text-paper/40 focus:outline-none focus:border-brand-green"
                  />
                  <input
                    type="email"
                    required
                    value={lead.epost}
                    onChange={(e) => setLead({ ...lead, epost: e.target.value })}
                    placeholder="E-post *"
                    aria-label="E-post"
                    className="w-full bg-ink border border-paper/25 px-4 py-3 text-base text-paper placeholder:text-paper/40 focus:outline-none focus:border-brand-green"
                  />
                  <input
                    type="text"
                    value={lead.foretag}
                    onChange={(e) => setLead({ ...lead, foretag: e.target.value })}
                    placeholder="Företag (valfritt)"
                    aria-label="Företag"
                    className="w-full bg-ink border border-paper/25 px-4 py-3 text-base text-paper placeholder:text-paper/40 focus:outline-none focus:border-brand-green sm:col-span-2"
                  />
                </div>
                {fel && (
                  <p className="mt-3 text-sm text-paper/70">
                    Något gick fel vid skickandet. Prova igen om en stund.
                  </p>
                )}
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={skickar}
                    className="inline-flex items-center gap-2 bg-brand-green text-paper px-6 py-3 text-sm font-semibold transition-colors hover:bg-paper hover:text-ink disabled:opacity-50"
                  >
                    {skickar ? "Ordnar ..." : "Ordna min karta"}
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setFas("bygga")}
                    className="text-sm text-paper/50 hover:text-paper underline underline-offset-4"
                  >
                    Tillbaka
                  </button>
                </div>
              </form>
            )}

            {fas === "ordnad" && (
              <div className="jungle-result is-visible">
                <div className="grid md:grid-cols-12 gap-6 items-center">
                  <div className="jungle-late md:col-span-7" style={{ transitionDelay: "0.9s" }}>
                    <p className="display-heading text-xl md:text-2xl text-paper">
                      {k > 0 ? (
                        <>
                          {n} system. <span className="text-brand-green">Ett förslag: {k} {k === 1 ? "koppling" : "kopplingar"}.</span>
                        </>
                      ) : (
                        <>
                          {n} system, <span className="text-brand-green">inga givna kopplingar.</span>
                        </>
                      )}
                    </p>
                    <p className="mt-2 text-sm text-paper/65 leading-relaxed">
                      {k > 0
                        ? `${mobil ? "Tryck" : "Håll muspekaren"} på punkterna längs linjerna så ser ni vad varje koppling gör. Jag hör av mig med mina tankar.`
                        : "Era system saknar självklara kopplingar i min regelbok, vilket i sig säger något. Jag hör av mig med mina tankar."}
                    </p>
                  </div>
                  <div className="jungle-late md:col-span-5 flex flex-wrap items-center gap-4 md:justify-end" style={{ transitionDelay: "1.05s" }}>
                    <Link
                      to="/boka"
                      onClick={sparaBokningsKontext}
                      className="inline-flex items-center gap-2 bg-brand-green text-paper px-6 py-3.5 text-sm font-semibold hover:bg-paper hover:text-ink transition-colors"
                    >
                      Boka ett samtal <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                    </Link>
                    <button
                      type="button"
                      onClick={reset}
                      className="text-sm text-paper/50 hover:text-paper underline underline-offset-4"
                    >
                      Börja om
                    </button>
                  </div>
                </div>
                {/* Bara första tipset visas i klartext: resten är samtalets
                    värde och följer med i leadet så Alexander kommer förberedd. */}
                {tips.length > 0 && (
                  <div
                    className="jungle-late mt-8 max-w-3xl border border-paper/15 bg-white/[0.04] p-5 md:p-6"
                    style={{ transitionDelay: "1.2s" }}
                  >
                    <p className="tracked text-[10px] text-paper/45 mb-4">Tips utifrån er karta</p>
                    <div className="flex items-start gap-3 text-sm text-paper/75 leading-relaxed">
                      <span
                        className={`tracked shrink-0 mt-0.5 px-2 py-0.5 border text-[9px] ${
                          tips[0].typ === "byte"
                            ? "border-paper/30 text-paper/60"
                            : "border-brand-green/50 text-brand-green"
                        }`}
                      >
                        {tips[0].typ === "byte" ? "Överlapp" : "Komplement"}
                      </span>
                      <span>{tips[0].text}</span>
                    </div>
                    {tips.length > 1 && (
                      <p className="mt-4 pt-4 border-t border-paper/10 text-sm text-paper/75 leading-relaxed">
                        Jag ser{" "}
                        <span className="font-semibold text-paper">
                          {tips.length - 1 === 1 ? "en sak till" : `${tips.length - 1} saker till`}
                        </span>{" "}
                        i er karta. Dem går vi igenom i ett{" "}
                        <Link
                          to="/boka"
                          onClick={sparaBokningsKontext}
                          className="font-semibold text-paper border-b border-brand-green hover:text-brand-green"
                        >
                          kostnadsfritt samtal
                        </Link>
                        .
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="tjanster" className="border-b border-line bg-mist">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <div className="max-w-3xl">
            <div className="eyebrow mb-5">Vad jag gör</div>
            <h2 className="display-heading text-3xl md:text-5xl">
              En grund. <span className="text-brand-green">Två som bygger vidare.</span>
            </h2>
            <p className="mt-6 text-ink/70 leading-relaxed max-w-2xl">
              Kärnan är att få ordning i era digitala system och AI-verktyg. När
              grunden sitter blir allt annat enklare: affärsutveckling och
              kampanjer bygger vidare på en struktur som redan hänger ihop.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {services.map((s, i) => {
            const inner = (
              <>
                {/* Grön topplinje markerar spetstjänsten */}
                {s.featured && <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-brand-green" />}
                <span
                  aria-hidden="true"
                  className="pointer-events-none select-none absolute -bottom-5 right-3 display-heading text-[110px] leading-none text-ink/[0.04]"
                >
                  {s.num}
                </span>
                <div className="flex items-start justify-between mb-8 min-h-6">
                  <span className="tracked text-xs text-subtle">{s.num}</span>
                  {s.tag && (
                    <span
                      className={`text-[10px] tracked px-2 py-1 ${
                        s.featured
                          ? "bg-brand-green text-paper"
                          : "bg-brand-green/10 text-brand-green border border-brand-green/30"
                      }`}
                    >
                      {s.tag}
                    </span>
                  )}
                </div>
                <h3 className="display-heading text-xl lg:text-2xl lg:min-h-16 mb-4 group-hover:text-brand-green transition-colors">
                  {s.title}
                </h3>
                {/* min-höjd på lg så "Ni får" börjar på samma rad i alla korten */}
                <p className="text-sm text-ink/70 leading-relaxed mb-6 lg:min-h-[7.5rem]">{s.body}</p>
                <div className="mb-8">
                  <div className="tracked text-[10px] text-subtle mb-3">Ni får</div>
                  <ul className="space-y-2.5">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2.5 text-sm text-ink/80">
                        <Check className="h-4 w-4 mt-0.5 shrink-0 text-brand-green" strokeWidth={2.5} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                {s.href && (
                  <div className="mt-auto pt-6 border-t border-line inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green">
                    Läs mer{" "}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                      strokeWidth={2.5}
                    />
                  </div>
                )}
              </>
            );
            const shared = `group relative overflow-hidden h-full bg-white border p-5 md:p-10 flex flex-col transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${
              s.featured
                ? "border-brand-green/50 shadow-md hover:border-brand-green"
                : "border-line shadow-sm hover:border-brand-green/40"
            }`;
            return (
              <Reveal key={s.num} delay={i * 130}>
                {s.href ? (
                  <Link to={s.href} className={shared}>
                    {inner}
                  </Link>
                ) : (
                  <div className={shared}>{inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Värdet av tjänsterna: EFFEKTEN i kundens vardag och plånbok, medvetet
// skilt från tjänstekortens "Ni får"-leverabler. Alla tre kort delar EXAKT
// samma skelett (vertikal lista, samma typografi); huvudtjänsten framhävs
// enbart med färg. Vertikala listor radbryter aldrig ojämnt.
type VardePunkt = { rubrik: string; rad: string };

const vardeTjanster: {
  tjanst: string;
  huvud?: boolean;
  punkter: VardePunkt[];
}[] = [
  {
    tjanst: "Digitala system & AI",
    huvud: true,
    punkter: [
      { rubrik: "Spara pengar", rad: "Färre licenser, mindre spill och timmar tillbaka varje vecka." },
      { rubrik: "Mindre dubbeljobb", rad: "Uppgifter skrivs in en gång och landar rätt överallt." },
      { rubrik: "Tydligare arbetsflöde", rad: "Alla vet var saker finns och vad som händer härnäst." },
      { rubrik: "Modernare verktyg", rad: "Rätt teknik i tiden, utan att jaga varje trend." },
      { rubrik: "En opartisk rådgivare", rad: "Jag tjänar ingenting på att ni köper fler licenser." },
    ],
  },
  {
    tjanst: "Affärsutveckling",
    punkter: [
      { rubrik: "Hitta nya marknader", rad: "Tillväxt i segment ni ännu inte prövat." },
      { rubrik: "Nytt perspektiv", rad: "Utifrånblick på det ni sitter för nära för att se." },
      { rubrik: "Grundade prioriteringar", rad: "Vägval byggda på analys, inte magkänsla." },
      { rubrik: "En plan som genomförs", rad: "Faser och deadlines i stället för en rapport i en mapp." },
    ],
  },
  {
    tjanst: "Optimerade kampanjer",
    punkter: [
      { rubrik: "Spara annonspengar", rad: "Budgeten läggs där den ger effekt, spillet försvinner." },
      { rubrik: "Nå rätt målgrupp snabbare", rad: "Rätt budskap möter rätt personer från start." },
      { rubrik: "Beslut på data", rad: "Siffror i stället för gissningar när kampanjer skruvas." },
      { rubrik: "Syns där kunderna finns", rad: "Kanalval efter var era kunder faktiskt är." },
    ],
  },
];

function Varde() {
  return (
    <section id="varde" className="border-b border-line bg-white">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <div className="max-w-3xl">
            <div className="eyebrow mb-5">Värdet</div>
            <h2 className="display-heading text-3xl md:text-5xl">
              Vad får ni <span className="text-brand-green">ut av det?</span>
            </h2>
            <p className="mt-6 text-ink/70 leading-relaxed max-w-2xl">
              Leverabler i all ära, men det som räknas är effekten i vardagen
              och plånboken. Det här är vad kunderna faktiskt får ut.
            </p>
          </div>
        </Reveal>

        {/* Tre identiska kolumner. items-start så inget kort tänjs ut. */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3 items-start">
          {vardeTjanster.map((t, i) => (
            <Reveal key={t.tjanst} delay={i * 120}>
              <div
                className={`relative overflow-hidden bg-paper border p-5 md:p-8 ${
                  t.huvud ? "border-brand-green/50 shadow-md" : "border-line shadow-sm"
                }`}
              >
                {t.huvud && (
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-brand-green" />
                )}
                <div className="flex items-center justify-between gap-3 mb-7 min-h-7">
                  <h3 className="display-heading text-lg">{t.tjanst}</h3>
                  {t.huvud && (
                    <span className="text-[10px] tracked px-2 py-1 bg-brand-green text-paper shrink-0">
                      Huvudtjänst
                    </span>
                  )}
                </div>
                <ul className="space-y-5">
                  {t.punkter.map((v) => (
                    <li key={v.rubrik} className="border-l-2 border-brand-green pl-4">
                      <div className="font-semibold text-sm mb-1">{v.rubrik}</div>
                      <p className="text-sm text-ink/65 leading-relaxed">{v.rad}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="arbetssatt" className="relative bg-ink text-paper overflow-hidden">
      <GrowthLine className="opacity-40" />
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <div className="max-w-3xl">
            <div className="eyebrow mb-5 text-brand-green">Hur jag jobbar</div>
            <h2 className="display-heading text-3xl md:text-5xl text-paper">
              Fyra steg. <span className="text-brand-green">Varje uppdrag.</span>
            </h2>
            <p className="mt-6 text-paper/70 max-w-2xl leading-relaxed">
              Jag börjar alltid i nuläget: hur ni faktiskt arbetar och vilka
              system som bär verksamheten. Systemen är grunden, och när den
              sitter följer allt annat samma fyra steg.
            </p>
          </div>
        </Reveal>

        <ProcessLine />

        <div className="mt-16 md:mt-5 grid gap-px bg-paper/10 md:grid-cols-4 border border-paper/10">
          {processSteps.map((p, i) => (
            <Reveal key={p.step} delay={i * 110} className="bg-ink">
              <div className="h-full p-5 md:p-8 transition-colors duration-300 hover:bg-white/5">
                <div className="tracked text-xs text-brand-green mb-6">{p.step}</div>
                <h3 className="display-heading text-lg mb-3 text-paper">{p.title}</h3>
                <p className="text-sm text-paper/65 leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Visar att samma metod bär alla tre tjänsterna, med systemen som grund. */}
        <Reveal delay={120}>
          <div className="mt-16">
            <div className="tracked text-[10px] text-brand-green mb-6">Samma metod, per tjänst</div>
            <div className="grid gap-px bg-paper/10 border border-paper/10 md:grid-cols-3">
              {methodPerService.map((m) => (
                <div key={m.service} className="bg-ink p-5 md:p-8">
                  <h3 className="display-heading text-base mb-4 text-paper">
                    {m.service}
                    {m.primary && (
                      <span className="ml-2 align-middle text-[10px] tracked bg-brand-green text-paper px-2 py-0.5">
                        Grunden
                      </span>
                    )}
                  </h3>
                  <ol className="space-y-2">
                    {m.flow.map((f, n) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-paper/65 leading-relaxed">
                        <span className="tracked text-[10px] text-brand-green mt-1 shrink-0">0{n + 1}</span>
                        {f}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// Kurvans fyra punkter (x i % av bredden, y i % av höjden) — en per processteg,
// centrerade över respektive kolumn. Kurvan i SVG:n måste passera genom samma
// punkter (y-värdena är desamma / 24-dels viewBox-höjd).
const processDots = [
  { x: 12.5, y: 79 },
  { x: 37.5, y: 58 },
  { x: 62.5, y: 37.5 },
  { x: 87.5, y: 17 },
];

/**
 * ProcessLine — tillväxtkurva som ritas genom de fyra stegen när sektionen
 * scrollas in, med en punkt som tänds över varje kolumn. Döljs på mobil där
 * stegen staplas vertikalt. Dekorativ (aria-hidden) — stegen är innehållet.
 */
function ProcessLine() {
  const { ref, inView } = useInView<HTMLDivElement>(0.6);
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`process-line relative mt-14 h-16 hidden md:block ${inView ? "is-visible" : ""}`}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 24" preserveAspectRatio="none" fill="none">
        <path
          className="process-line-path"
          pathLength={1}
          d="M0,21.5 C6,21 9,20.2 12.5,19 S30,15.4 37.5,14 S55,10.4 62.5,9 S80,5.4 87.5,4 S97,2.7 100,2.4"
          stroke="#1F8A5C"
          strokeOpacity="0.55"
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {processDots.map((d, i) => (
        <span
          key={d.x}
          className="process-line-dot absolute h-2.5 w-2.5 rounded-full bg-brand-green"
          style={{ left: `${d.x}%`, top: `${d.y}%`, transitionDelay: `${0.35 + i * 0.32}s` }}
        />
      ))}
    </div>
  );
}

function Faq() {
  return (
    <section id="faq" className="border-b border-line bg-mist">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 grid md:grid-cols-12 gap-12 items-start">
        <Reveal className="md:col-span-4">
          <div className="eyebrow mb-5">Vanliga frågor</div>
          <h2 className="display-heading text-3xl md:text-4xl">
            Undrar ni något? <span className="text-brand-green">Fler har undrat samma sak.</span>
          </h2>
          <p className="mt-6 text-ink/70 leading-relaxed">
            Hittar ni inte svaret här?{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold border-b-2 border-brand-green pb-0.5 hover:text-brand-green"
            >
              Mejla mig
            </a>{" "}
            så svarar jag inom ett dygn.
          </p>
          <Link
            to="/pris"
            className="mt-8 group inline-flex items-center gap-2 bg-ink text-paper px-5 py-3 text-sm font-semibold hover:bg-brand-green transition-colors"
          >
            Räkna ut ett riktpris
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
          </Link>
        </Reveal>
        <div className="md:col-span-8 space-y-3">
          {faqItems.map((f, i) => (
            <Reveal key={f.q} delay={i * 70}>
              <details className="faq bg-paper border border-line hover:border-brand-green/40 transition-colors">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-4 md:p-6 text-sm md:text-base font-semibold">
                  {f.q}
                  <Plus className="faq-icon h-4 w-4 shrink-0 text-brand-green" strokeWidth={2.5} />
                </summary>
                <p className="px-4 pb-4 md:px-6 md:pb-6 -mt-1 text-sm text-ink/70 leading-relaxed max-w-2xl">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // Skickar till Netlify Forms (boka-samtal) via den statiska filen, inte
      // till "/" som SSR-funktionen skulle sluka. Ingen mejlklient längre.
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "boka-samtal",
          "bot-field": "",
          namn: form.name,
          epost: form.email,
          foretag: "",
          telefon: "",
          meddelande: form.message,
        }).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };
  const sent = status === "sent";

  return (
    <section id="kontakt" className="bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 grid md:grid-cols-12 gap-12">
        <Reveal className="md:col-span-5">
          <div className="eyebrow mb-5">Kontakt</div>
          <h2 className="display-heading text-3xl md:text-5xl">
            Berätta vad ni <span className="text-brand-green">vill uppnå</span>.
          </h2>
          <p className="mt-6 text-ink/75 leading-relaxed">
            Några rader räcker. Jag svarar inom ett dygn och föreslår ett kort
            första samtal, utan förpliktelser.
          </p>
          <div className="mt-10 space-y-4 text-sm">
            <div>
              <div className="tracked text-[10px] text-subtle mb-1">E-post</div>
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold border-b-2 border-brand-green pb-0.5 hover:text-brand-green">
                {CONTACT_EMAIL}
              </a>
            </div>
            <div>
              <div className="tracked text-[10px] text-subtle mb-1">Webb</div>
              <div>abogrowth.se</div>
            </div>
            <div>
              <div className="tracked text-[10px] text-subtle mb-1">Ort</div>
              <div>Stockholm, Sverige</div>
            </div>
          </div>
        </Reveal>

        <Reveal className="md:col-span-7" delay={130}>
          <form
            className="h-full bg-white border border-line p-5 md:p-10 space-y-5"
            onSubmit={submit}
          >
            {sent ? (
              <div className="py-10 text-center">
                <div className="eyebrow mb-3">Tack</div>
                <p className="display-heading text-2xl">
                  Tack {form.name.trim().split(" ")[0]}! Jag hör av mig inom ett dygn.
                </p>
                <p className="mt-4 text-sm text-ink/60">
                  Jag svarar på {form.email.trim()}.
                </p>
              </div>
            ) : (
              <>
                <Field label="Namn" name="name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                <Field label="E-post" name="email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                <div>
                  <label htmlFor="message" className="tracked text-[10px] text-subtle block mb-2">Meddelande *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-paper border border-line px-4 py-3 text-base md:text-sm focus:outline-none focus:border-brand-green"
                    placeholder="Vad vill ni uppnå?"
                  />
                </div>
                {status === "error" && (
                  <p className="text-sm text-red-700">
                    Något gick fel. Försök igen, eller mejla direkt till{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3.5 text-sm font-semibold hover:bg-brand-green transition-colors disabled:bg-subtle disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Skickar…" : "Skicka"} <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </button>
                <p className="text-xs text-subtle">
                  Jag svarar inom ett dygn. Går även bra att mejla direkt till {CONTACT_EMAIL}.
                </p>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label, name, type = "text", required, value, onChange,
}: {
  label: string; name: string; type?: string; required?: boolean;
  value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="tracked text-[10px] text-subtle block mb-2">
        {label}{required && " *"}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-paper border border-line px-4 py-3 text-base md:text-sm focus:outline-none focus:border-brand-green"
      />
    </div>
  );
}
