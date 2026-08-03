import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Check, Plus } from "lucide-react";
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
    a: "Absolut. Många samarbeten börjar med ett avgränsat projekt: en kartläggning, en kampanj eller ett systemval. Fungerar det bra växer samarbetet därifrån.",
  },
];

// Det paketerade första steget. Håll i linje med tjänst 01 och priskalkylatorn:
// avgränsat uppdrag, fast pris innan start.
const mappingIncludes = [
  "Genomgång av systemen, verktygen och licenserna ni har idag",
  "En karta över hur allt hänger ihop, och var det glappar",
  "Prioriterad åtgärdslista: vad som ger mest effekt först",
  "Förslag på var automation och AI sparar tid hos just er",
];

// Orden roterar det vi skapar ordning i — besökaren ska inom sekunder förstå
// kärnan: koll och struktur i den digitala floran.
const rotatingWords = ["systemen", "verktygen", "marknadsföringen", "försäljningen"] as const;

function Index() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main>
        <MorkScen>
          <Hero />
          <JungleTest />
        </MorkScen>
        <StartHere />
        <Services />
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

// Hero-djungelns noder (% av heroytan). Chips är verktygsboxar med namn,
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
function Bokstavsrad({ text, bas, steg = 0.03 }: { text: string; bas: number; steg?: number }) {
  return (
    <>
      {text.split("").map((b, i) => (
        <span
          key={i}
          className="hero-letter"
          style={{
            animationDelay: `${bas + i * steg}s`,
            ["--lr" as string]: `${(i % 2 ? -1 : 1) * (5 + (i % 3) * 4)}deg`,
            ["--lx" as string]: `${((i % 3) - 1) * 0.06}em`,
            whiteSpace: b === " " ? "pre" : undefined,
          }}
        >
          {b}
        </span>
      ))}
    </>
  );
}

// useLayoutEffect på klienten (kaospositionerna måste sättas före första
// målningen, annars blinkar den ordnade vyn förbi), useEffect vid SSR.
const useKlientLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * MorkScen — sidbytes-scrollen. Heron (första barnet) är sticky och
 * Djungeltestet glider upp över den som en ny sida. Här mäts hur långt
 * täckningen kommit (--covp 0..1) så heron kan krympa och tona i CSS.
 * Scrollen kapas aldrig: allt är native scroll + sticky + snap.
 */
function MorkScen({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const uppdatera = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const hero = el.firstElementChild as HTMLElement | null;
      const h = hero?.offsetHeight || window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / h));
      el.style.setProperty("--covp", p.toFixed(3));
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
    <div ref={ref}>
      {children}
    </div>
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
    // Sticky + z-0: Djungeltestet (z-10) glider upp över heron som en ny
    // sida. stack-cover-target krymper och tonar innehållet via --covp.
    <section ref={ref} id="top" className="snap-start sticky top-0 z-0 bg-ink text-paper overflow-hidden">
      <div className="stack-cover-target relative min-h-svh flex items-center">
      <div className="hero-par hero-par-1 absolute inset-0" aria-hidden="true">
        <div className="ai-glow" />
      </div>
      <div className="hero-par hero-par-2 absolute inset-0" aria-hidden="true">
        <GrowthLine className="opacity-80" />
      </div>
      {/* Hero-djungeln: verktygschips som tumlar in i kaos och snäpper till
          ordning, driver i egna banor och binds av kopplingar. hero-net är
          även hemvist för pekarens strålar och markörnod. */}
      <div ref={layerRef} className="hero-net hero-par hero-par-3 absolute inset-0" aria-hidden="true">
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
            <span className="sr-only">Få koll på {rotatingWords[0]} i den digitala djungeln.</span>
            <span aria-hidden="true">
              <Bokstavsrad text="Få koll på " bas={0.15} />
              <RotatingWord />
              <br />
              <Bokstavsrad text="i den digitala djungeln." bas={0.55} />
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
            <a href="#djungeltestet" className="group inline-flex items-center gap-1.5 text-sm font-semibold border-b-2 border-brand-green pb-1 hover:text-brand-green">
              Testa er djungel
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

// Djungeltestets verktyg. Kaospositionerna (sx/sy/sr) är spridda och roterade
// så kartan känns rörig innan ordningen läggs. Allt är deterministiskt: ingen
// slump, samma karta vid varje besök och inga SSR-problem.
type JungleTool = {
  id: string;
  label: string;
  labelShort?: string;
  sx: number;
  sy: number;
  sr: number;
};

const jungleTools: JungleTool[] = [
  { id: "crm", label: "CRM", sx: 30, sy: 26, sr: -9 },
  { id: "mejl", label: "Mejl & kalender", labelShort: "Mejl", sx: 63, sy: 22, sr: 7 },
  { id: "ekonomi", label: "Ekonomi", sx: 45, sy: 50, sr: -6 },
  { id: "kalkyl", label: "Kalkylblad", sx: 71, sy: 55, sr: 11 },
  { id: "projekt", label: "Projektverktyg", labelShort: "Projekt", sx: 25, sy: 62, sr: 8 },
  { id: "socialt", label: "Sociala medier", labelShort: "Socialt", sx: 55, sy: 35, sr: -12 },
  { id: "nyhetsbrev", label: "Nyhetsbrev", sx: 38, sy: 76, sr: 6 },
  { id: "ai", label: "AI-assistent", labelShort: "AI", sx: 66, sy: 78, sr: -8 },
  { id: "analys", label: "Analys", sx: 21, sy: 41, sr: -5 },
  { id: "lagring", label: "Fillagring", labelShort: "Lagring", sx: 50, sy: 66, sr: 9 },
];

// Vilka system som hör ihop i verkligheten. En koppling ritas bara när
// besökaren valt BÅDA verktygen i paret. Deterministisk lista, ingen slump.
// AI-assistenten finns INTE här: den kopplas till ALLA valda verktyg och
// ritas som ett eget, lättare lager i komponenten.
const jungleRelations: [string, string][] = [
  ["crm", "nyhetsbrev"], // kontakterna styr utskicken
  ["crm", "mejl"], // mejlen loggas på kunden
  ["crm", "ekonomi"], // offert blir faktura
  ["socialt", "analys"], // resultatet mäts
  ["nyhetsbrev", "analys"], // öppningar och klick mäts
  ["kalkyl", "ekonomi"], // kalkylen hämtar siffrorna
  ["projekt", "mejl"], // deadlines hamnar i kalendern
  ["lagring", "projekt"], // filerna kopplas till projekten
];

/**
 * JungleTest — sajtens signaturfunktion. Besökaren väljer sina verktyg,
 * ser sin egen röriga karta växa fram och trycker sedan på knappen som gör
 * det tjänsten gör: skapar ordning. Bygger på sysmap-tekniken från
 * tjänstesidorna; is-visible styrs här av knappen i stället för scroll.
 */
function JungleTest() {
  const [selected, setSelected] = useState<string[]>([]);
  const [ordered, setOrdered] = useState(false);
  const mobil = useIsMobile();

  const tools = selected
    .map((id) => jungleTools.find((t) => t.id === id))
    .filter((t): t is JungleTool => !!t);
  const n = tools.length;
  const hub = { x: 50, y: mobil ? 48 : 47 };
  const rx = mobil ? 34 : 38;
  const ry = mobil ? 36 : 33;

  // Ordnade platser: jämnt fördelade på en ellips runt affären, start rakt
  // uppåt. Beräknas ur index, så layouten är deterministisk.
  const orderedPos = (i: number) => {
    const vinkel = -Math.PI / 2 + (i * 2 * Math.PI) / Math.max(n, 1);
    return { x: hub.x + rx * Math.cos(vinkel), y: hub.y + ry * Math.sin(vinkel) };
  };
  const pos = (t: JungleTool, i: number) => (ordered ? orderedPos(i) : { x: t.sx, y: t.sy });

  const toggla = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const reset = () => {
    setSelected([]);
    setOrdered(false);
  };

  // Systemkopplingar: relationer där besökaren valt båda verktygen.
  const sysLinks = jungleRelations
    .map(([a, b]) => [tools.findIndex((t) => t.id === a), tools.findIndex((t) => t.id === b)] as [number, number])
    .filter(([a, b]) => a !== -1 && b !== -1);
  // AI-assistenten kopplas till allt: ett lättare lager av bågar till varje
  // annat valt verktyg, plus en förstärkt navlinje (analys + AI + er affär
  // hänger alltid ihop när båda är valda).
  const aiIdx = tools.findIndex((t) => t.id === "ai");
  const aiLinks = aiIdx === -1 ? [] : tools.map((_, i) => i).filter((i) => i !== aiIdx);
  const k = sysLinks.length + aiLinks.length;

  // Mjuk båge mellan två ordnade noder som buktar UTÅT från navet, så att
  // kopplingarna läses som medvetna och aldrig korsar navlinjerna i mitten.
  // apx/apy är bågens topp (kvadratisk Bezier vid t=0,5) och styr pulsen.
  const arcPath = (ai: number, bi: number) => {
    const A = orderedPos(ai);
    const B = orderedPos(bi);
    const mx = (A.x + B.x) / 2;
    const my = (A.y + B.y) / 2;
    let dx = mx - hub.x;
    let dy = my - hub.y;
    let len = Math.hypot(dx, dy);
    if (len < 1) {
      // Paret sitter mittemot varandra: bukta vinkelrätt mot kordan i stället.
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

  // Trasslet i kaosläget: en kedja genom alla valda plus korsande genvägar.
  // Linjerna ligger kvar i DOM efter ordningen och tonas ut via CSS.
  const tangle: [number, number][] = [];
  for (let i = 0; i < n - 1; i++) tangle.push([i, i + 1]);
  if (n >= 3) tangle.push([n - 1, 0]);
  if (n >= 5) for (let i = 0; i < n; i += 2) tangle.push([i, (i + 3) % n]);

  return (
    <section id="djungeltestet" className="snap-start relative z-10 min-h-svh bg-ink text-paper overflow-hidden">
      <div className="ai-glow" aria-hidden="true" />
      {/* stack-enter-target: svingar in via --covp när sektionen täcker heron */}
      <div className="stack-enter-target relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <div className="max-w-3xl">
            <div className="eyebrow mb-5">Huvudtjänst · Digitala system & AI</div>
            <h2 className="display-heading text-3xl md:text-5xl text-paper">
              Hur ser er <span className="text-brand-green">djungel</span> ut?
            </h2>
            <p className="mt-6 text-paper/70 leading-relaxed max-w-2xl">
              Klicka i verktygen ni använder idag och se er egen karta växa
              fram. Gör sedan det jag gör i varje uppdrag: skapa ordning.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Välj era verktyg">
            {jungleTools.map((t) => {
              const vald = selected.includes(t.id);
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={vald}
                  onClick={() => toggla(t.id)}
                  className={`px-3.5 py-2 text-xs md:text-sm font-semibold border transition-colors ${
                    vald
                      ? "bg-brand-green border-brand-green text-paper"
                      : "border-paper/25 text-paper/75 hover:border-brand-green/60 hover:text-paper"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          <div
            className={`sysmap relative mt-8 h-[21rem] md:h-96 border border-paper/10 bg-white/[0.03] ${
              ordered ? "is-visible" : ""
            }`}
          >
            {n === 0 ? (
              <p className="absolute inset-0 flex items-center justify-center px-8 text-center text-sm text-paper/40">
                Välj verktygen ovan, så byggs er karta här.
              </p>
            ) : (
              <>
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden="true"
                >
                  {tangle.map(([a, b]) => (
                    <line
                      key={`t-${tools[a].id}-${tools[b].id}`}
                      className="jungle-tangle"
                      x1={tools[a].sx}
                      y1={tools[a].sy}
                      x2={tools[b].sx}
                      y2={tools[b].sy}
                      stroke="#8A8D90"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                  {/* Nav- och systemlinjer renderas alltid men är dolda tills
                      is-visible sätts: så spelas ritanimationen upp korrekt. */}
                  {tools.map((t, i) => (
                    <line
                      key={`o-${t.id}`}
                      className="sysmap-link"
                      pathLength={1}
                      x1={hub.x}
                      y1={hub.y}
                      x2={orderedPos(i).x}
                      y2={orderedPos(i).y}
                      stroke="#1F8A5C"
                      strokeOpacity={t.id === "ai" ? "0.7" : "0.35"}
                      strokeWidth={t.id === "ai" ? "1.75" : "1.25"}
                      vectorEffect="non-scaling-stroke"
                      style={{ transitionDelay: `${0.55 + i * 0.08}s` }}
                    />
                  ))}
                  {/* Systemkopplingarna: tunnare, klarare gröna bågar som buktar
                      utåt. Ritas som andra våg, efter navlinjerna. */}
                  {sysLinks.map(([a, b], j) => (
                    <path
                      key={`s-${tools[a].id}-${tools[b].id}`}
                      className="sysmap-link"
                      pathLength={1}
                      d={arcPath(a, b).d}
                      stroke="#1F8A5C"
                      strokeOpacity="0.8"
                      strokeWidth="1"
                      fill="none"
                      vectorEffect="non-scaling-stroke"
                      style={{ transitionDelay: `${1.35 + j * 0.14}s` }}
                    />
                  ))}
                  {/* AI-lagret: assistenten når allt. Tunnare och ljusare än
                      systemkopplingarna så det läses som ett stödskikt,
                      inte som nytt trassel. Tredje vågen. */}
                  {aiLinks.map((i, j) => (
                    <path
                      key={`ai-${tools[i].id}`}
                      className="sysmap-link"
                      pathLength={1}
                      d={arcPath(aiIdx, i).d}
                      stroke="#1F8A5C"
                      strokeOpacity="0.3"
                      strokeWidth="0.75"
                      fill="none"
                      vectorEffect="non-scaling-stroke"
                      style={{ transitionDelay: `${1.8 + j * 0.1}s` }}
                    />
                  ))}
                </svg>
                <span className="sysmap-hub-ring" style={{ left: `${hub.x}%`, top: `${hub.y}%` }} />
                {tools.slice(0, 5).map((t, i) => (
                  <span
                    key={`p-${t.id}`}
                    className={`sysmap-pulse ${i % 2 === 1 ? "flow-back" : ""}`}
                    style={{
                      ["--hx" as string]: `${hub.x}%`,
                      ["--hy" as string]: `${hub.y}%`,
                      ["--nx" as string]: `${orderedPos(i).x}%`,
                      ["--ny" as string]: `${orderedPos(i).y}%`,
                      animationDelay: `${1.6 + i * 0.5}s`,
                    }}
                  />
                ))}
                {/* En puls som följer första systemkopplingens båge */}
                {sysLinks.slice(0, 2).map(([a, b], j) => {
                  const arc = arcPath(a, b);
                  const A = orderedPos(a);
                  const B = orderedPos(b);
                  return (
                    <span
                      key={`sp-${tools[a].id}-${tools[b].id}`}
                      className="jungle-syspulse"
                      style={{
                        ["--ax" as string]: `${A.x}%`,
                        ["--ay" as string]: `${A.y}%`,
                        ["--mx" as string]: `${arc.apx}%`,
                        ["--my" as string]: `${arc.apy}%`,
                        ["--bx" as string]: `${B.x}%`,
                        ["--by" as string]: `${B.y}%`,
                        animationDelay: `${2.4 + j * 1.1}s`,
                      }}
                    />
                  );
                })}
                <div
                  className="jungle-late absolute"
                  style={{
                    left: `${hub.x}%`,
                    top: `${hub.y}%`,
                    transform: "translate(-50%, -50%)",
                    transitionDelay: "0.45s",
                    zIndex: 2,
                  }}
                >
                  <div className="sysmap-node-box bg-brand-green text-paper shadow-md whitespace-nowrap px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-semibold">
                    Er affär
                  </div>
                </div>
                {tools.map((t, i) => {
                  const p = pos(t, i);
                  return (
                    <div
                      key={t.id}
                      className="sysmap-node absolute"
                      style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        transform: `translate(-50%, -50%) rotate(${ordered ? 0 : t.sr}deg)`,
                        zIndex: 1,
                      }}
                    >
                      <div className="jungle-pop sysmap-node-box whitespace-nowrap bg-white/95 border border-line text-ink/80 shadow-sm px-2.5 py-1.5 md:px-4 md:py-2 text-[11px] md:text-sm font-semibold">
                        {t.labelShort ? (
                          <>
                            <span className="md:hidden">{t.labelShort}</span>
                            <span className="hidden md:inline">{t.label}</span>
                          </>
                        ) : (
                          t.label
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          <div className="mt-8 min-h-14">
            {!ordered ? (
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setOrdered(true)}
                  disabled={n < 2}
                  className="inline-flex items-center gap-2 bg-brand-green text-paper px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-paper hover:text-ink disabled:opacity-40 disabled:pointer-events-none"
                >
                  Skapa ordning <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </button>
                <span className="text-sm text-paper/50" aria-live="polite">
                  {n < 2 ? "Välj minst två verktyg." : `${n} verktyg valda.`}
                </span>
              </div>
            ) : (
              <div className="jungle-result is-visible grid md:grid-cols-12 gap-6 items-center">
                <div className="jungle-late md:col-span-7" style={{ transitionDelay: "0.9s" }}>
                  <p className="display-heading text-xl md:text-2xl text-paper">
                    {n} verktyg. <span className="text-brand-green">Ett system.</span>
                  </p>
                  <p className="mt-2 text-sm text-paper/65 leading-relaxed">
                    {k > 0
                      ? `${k} ${k === 1 ? "koppling" : "kopplingar"} som jobbar åt er, i stället för ${n} öar. Första steget dit: en systemkartläggning.`
                      : "Så här ser det ut när allt utgår från affären i stället för från apparna. Första steget dit: en systemkartläggning."}
                  </p>
                </div>
                <div
                  className="jungle-late md:col-span-5 flex flex-wrap items-center gap-4 md:justify-end"
                  style={{ transitionDelay: "1.05s" }}
                >
                  <Link
                    to="/boka"
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
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * StartHere — paketerar systemkartläggningen som ett tydligt första steg.
 * Finns för att besökaren annars inte vet hur ett samarbete börjar eller
 * vad som konkret landar på bordet.
 */
function StartHere() {
  return (
    <section id="borja-har" className="snap-start border-b border-line bg-white">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          {/* items-stretch (default) + h-full på kortet gör att kolumnernas
              underkanter hamnar i linje i stället för att sluta olika högt. */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5 flex flex-col">
              <div className="eyebrow mb-5">Första steget</div>
              <h2 className="display-heading text-3xl md:text-5xl">
                Börja med en <span className="text-brand-green">systemkartläggning</span>
              </h2>
              <p className="mt-6 text-ink/75 leading-relaxed">
                Det naturliga första steget, och ett avgränsat uppdrag i sig. Jag
                går igenom vad ni använder idag, var det krånglar och vad som bör
                göras först. Ni får ett fast pris innan jag börjar, och ingenting
                binder er vid mer än det.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
                <span>
                  <span className="tracked text-[10px] text-subtle block mb-1">Tid</span>
                  <span className="font-semibold">1 till 2 veckor</span>
                </span>
                <span>
                  <span className="tracked text-[10px] text-subtle block mb-1">Upplägg</span>
                  <span className="font-semibold">Avgränsat projekt, fast pris</span>
                </span>
              </div>
              {/* mt-auto trycker ned knapparna så de möter kortets underkant */}
              <div className="mt-auto pt-10 flex flex-wrap items-center gap-4">
                <Link
                  to="/boka"
                  className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3.5 text-sm font-semibold hover:bg-brand-green transition-colors"
                >
                  Boka ett samtal <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </Link>
                <Link
                  to="/pris"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold border-b-2 border-brand-green pb-1 hover:text-brand-green"
                >
                  Se vad det kan kosta
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 flex">
              <div className="w-full h-full flex flex-col border border-brand-green/40 bg-paper p-5 md:p-10 shadow-sm">
                <div className="tracked text-[10px] text-subtle mb-6">Det här får ni</div>
                <ul className="space-y-5">
                  {mappingIncludes.map((item) => (
                    <li key={item} className="flex items-start gap-3.5 text-sm md:text-base text-ink/85 leading-relaxed">
                      <Check className="h-5 w-5 mt-0.5 shrink-0 text-brand-green" strokeWidth={2.5} />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-8 text-sm text-ink/65 leading-relaxed">
                  <span className="block mb-6 h-px w-full bg-line" aria-hidden="true" />
                  Vill ni sedan att jag genomför åtgärderna gör jag det. Vill ni
                  göra dem själva fungerar listan lika bra utan mig.
                </p>
              </div>
            </div>
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
    <section id="kontakt">
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
