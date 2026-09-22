import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { GrowthLine } from "@/components/Site";

// Orden roterar det vi skapar ordning i — besökaren ska inom sekunder förstå
// kärnan: koll och struktur i den digitala floran.
const rotatingWords = ["systemen", "verktygen", "marknadsföringen", "försäljningen"] as const;

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

export function Hero() {
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
    <section ref={ref} id="top" className="snap-start relative bg-paper text-ink overflow-hidden">
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
                className="hero-chip-box block -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-white border border-line shadow-sm px-2.5 py-1 text-[11px] font-semibold text-ink/65"
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
          <h1 className="display-heading text-ink text-[clamp(30px,9vw,44px)] leading-[1.02] md:text-[clamp(44px,5.8vw,76px)]">
            <span className="sr-only">Få koll på {rotatingWords[0]} en gång för alla.</span>
            <span aria-hidden="true">
              <Bokstavsrad text="Få koll på " bas={0.15} />
              <RotatingWord />
              <br />
              <Bokstavsrad text="en gång för alla." bas={0.55} />
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-ink/75 leading-relaxed hero-rise [animation-delay:700ms]">
            Vi skapar ordning: en systemflora som hänger ihop, mindre
            dubbelarbete och en tydlig väg framåt.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4 hero-rise [animation-delay:850ms]">
            <Link
              to="/boka"
              className="inline-flex items-center gap-2 bg-brand-green text-paper px-6 py-3.5 text-sm font-semibold hover:bg-ink hover:text-paper transition-colors"
            >
              Boka ett samtal <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
            <a href="#systemkollen" className="group inline-flex items-center gap-1.5 text-sm font-semibold border-b-2 border-brand-green pb-1 hover:text-brand-green">
              Gör systemkollen
              <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" strokeWidth={2.5} />
            </a>
          </div>
          {/* Svarar på besökarens första fråga: är det här för oss? */}
          <p className="mt-8 flex items-start gap-2.5 text-sm text-subtle leading-relaxed hero-rise [animation-delay:1000ms]">
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
