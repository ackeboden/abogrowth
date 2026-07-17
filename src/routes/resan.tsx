import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { Header, Footer, PageHero, useInView } from "@/components/Site";

export const Route = createFileRoute("/resan")({
  head: () => ({
    meta: [
      { title: "Resan: från kaos till ordning | ABO Growth" },
      {
        name: "description",
        content:
          "Så kan en resa med ABO Growth se ut: från en spretig verktygsflora som kostar pengar, till en struktur som hänger ihop och ett team som förstår hur allt används.",
      },
      { property: "og:title", content: "Resan: från kaos till ordning | ABO Growth" },
      { property: "og:description", content: "Följ resan från spretig verktygsflora till ordning som håller." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://abogrowth.se/resan" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://abogrowth.se/resan" }],
  }),
  component: Page,
});

const GREEN = "#1F8A5C";

/** Enkel figur (person). tone styr färgen. */
function Figur({ w = 44, tone = "ink" }: { w?: number; tone?: "ink" | "green" | "paper" | "subtle" }) {
  const color = tone === "green" ? GREEN : tone === "paper" ? "#FAF9F7" : tone === "subtle" ? "#9AA39E" : "#1A1D1F";
  return (
    <svg width={w} viewBox="0 0 44 60" fill="none" aria-hidden="true">
      <circle cx="22" cy="13" r="10" fill={color} />
      <path d="M4 58 v-5 a18 18 0 0 1 36 0 v5 z" fill={color} />
    </svg>
  );
}

type Chip = { label: string; x: number; y: number; rot?: number };

/** En systemruta som placeras absolut i scenen. */
function ToolChip({
  chip,
  variant,
  cut,
  delay,
  dark,
}: {
  chip: Chip;
  variant: "chaos" | "calm" | "still";
  cut?: boolean;
  delay: number;
  dark?: boolean;
}) {
  return (
    <div
      className="absolute"
      style={{ left: `${chip.x}%`, top: `${chip.y}%`, transform: "translate(-50%, -50%)", zIndex: 2 }}
    >
      <div
        className={`resan-chip ${variant === "chaos" ? "resan-chip--chaos" : variant === "calm" ? "resan-chip--calm" : ""} ${
          cut ? "resan-chip--cut" : ""
        } relative whitespace-nowrap px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-semibold border shadow-sm ${
          dark ? "bg-white/10 border-white/20 text-paper" : "bg-white border-line text-ink/80"
        }`}
        style={{ ["--rot" as string]: `${chip.rot ?? 0}deg`, transitionDelay: `${delay}s`, animationDelay: `${delay}s` }}
      >
        {chip.label}
        {cut && <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center text-subtle text-lg">✕</span>}
      </div>
    </div>
  );
}

/** Ett litet mynt som läcker ut ur floran (kaos). */
function Coin({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <span
      aria-hidden="true"
      className="resan-coin absolute flex items-center justify-center h-5 w-5 rounded-full bg-amber-200 text-amber-800 text-[9px] font-bold border border-amber-300"
      style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${delay}s`, zIndex: 1 }}
    >
      kr
    </span>
  );
}

function Scene({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  return (
    <div ref={ref} className={`resan-scene ${inView ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

// ---- Akt 1: Kaos ----
const kaosChips: Chip[] = [
  { label: "CRM", x: 20, y: 20, rot: -9 },
  { label: "Mejl", x: 70, y: 15, rot: 7 },
  { label: "Kalkylark", x: 44, y: 35, rot: -5 },
  { label: "AI-verktyg", x: 80, y: 44, rot: 11 },
  { label: "Ekonomi", x: 23, y: 58, rot: 8 },
  { label: "Analys", x: 57, y: 66, rot: -7 },
  { label: "Chatt", x: 80, y: 76, rot: 5 },
];
// Trassliga, grå streck mellan slumpvisa system
const kaosLinks = [
  [20, 20, 44, 35], [70, 15, 80, 44], [23, 58, 57, 66], [44, 35, 80, 76], [80, 44, 57, 66], [20, 20, 23, 58],
];

function ActKaos() {
  return (
    <section className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 grid md:grid-cols-12 gap-10 md:gap-12 items-center">
        <div className="md:col-span-5">
          <div className="eyebrow mb-4">01 · Idag</div>
          <h2 className="display-heading text-3xl md:text-5xl">Kaos.</h2>
          <p className="mt-6 text-ink/75 leading-relaxed">
            Sju verktyg, ingen överblick. De pratar inte med varandra, dubbel-
            arbetet växer och prenumerationerna kostar pengar varje månad.
          </p>
        </div>
        <div className="md:col-span-7">
          <Scene className="relative h-80 md:h-[420px] rounded-lg bg-white/40 border border-line overflow-hidden">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
              {kaosLinks.map(([x1, y1, x2, y2], i) => (
                <line
                  key={i}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="#B9433A" strokeOpacity="0.35" strokeWidth="1"
                  strokeDasharray="3 3" vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
            {[[24, 30], [82, 54], [58, 76], [26, 68]].map(([x, y], i) => (
              <Coin key={i} x={x} y={y} delay={i * 0.5} />
            ))}
            {kaosChips.map((c, i) => (
              <ToolChip key={c.label} chip={c} variant="chaos" delay={i * 0.08} />
            ))}
            <div className="resan-fade absolute" style={{ left: "48%", top: "88%", transform: "translate(-50%,-50%)" }}>
              <div className="relative">
                <Figur w={38} tone="subtle" />
                <span className="absolute -top-3 -right-3 text-lg font-bold text-[#B9433A]">?</span>
              </div>
            </div>
          </Scene>
        </div>
      </div>
    </section>
  );
}

// ---- Akt 2: Vi reder ut ----
const redaChips: (Chip & { cut?: boolean })[] = [
  { label: "Analys", x: 50, y: 15 },
  { label: "CRM", x: 20, y: 30 },
  { label: "Mejl", x: 80, y: 30 },
  { label: "AI-verktyg", x: 16, y: 60 },
  { label: "Ekonomi", x: 84, y: 60 },
  { label: "Kalkylark", x: 34, y: 86, cut: true },
  { label: "Chatt", x: 66, y: 86, cut: true },
];

function ActRedaUt() {
  const guide = { x: 50, y: 52 };
  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 grid md:grid-cols-12 gap-10 md:gap-12 items-center">
        <div className="md:col-span-5 md:order-2">
          <div className="eyebrow mb-4">02 · Med ABO Growth</div>
          <h2 className="display-heading text-3xl md:text-5xl">Vi reder ut.</h2>
          <p className="mt-6 text-ink/75 leading-relaxed">
            Vi kartlägger allt ni har, väljer bort det som inte bär och kopplar
            ihop det som faktiskt ska prata med varandra. Strategin först,
            tekniken sedan.
          </p>
        </div>
        <div className="md:col-span-7 md:order-1">
          <Scene className="relative h-80 md:h-[420px] rounded-lg bg-paper/60 border border-line overflow-hidden">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
              {redaChips.filter((c) => !c.cut).map((c, i) => (
                <line
                  key={c.label}
                  className="resan-link"
                  pathLength={1}
                  x1={guide.x} y1={guide.y} x2={c.x} y2={c.y}
                  stroke={GREEN} strokeOpacity="0.5" strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  style={{ transitionDelay: `${0.4 + i * 0.12}s` }}
                />
              ))}
            </svg>
            {redaChips.map((c, i) => (
              <ToolChip key={c.label} chip={c} variant="still" cut={c.cut} delay={i * 0.08} />
            ))}
            <div className="resan-fade absolute" style={{ left: `${guide.x}%`, top: `${guide.y}%`, transform: "translate(-50%,-50%)", zIndex: 3 }}>
              <div className="flex flex-col items-center">
                <Figur w={50} tone="green" />
                <span className="mt-1 tracked text-[9px] text-brand-green whitespace-nowrap">ABO Growth</span>
              </div>
            </div>
          </Scene>
        </div>
      </div>
    </section>
  );
}

// ---- Akt 3: Ordning ----
const ordningChips: Chip[] = [
  { label: "CRM", x: 50, y: 12 },
  { label: "Mejl", x: 85, y: 38 },
  { label: "AI-verktyg", x: 72, y: 78 },
  { label: "Ekonomi", x: 28, y: 78 },
  { label: "Analys", x: 15, y: 38 },
];

function ActOrdning() {
  const hub = { x: 50, y: 45 };
  return (
    <section className="relative bg-ink text-paper overflow-hidden">
      <div className="ai-glow" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28 grid md:grid-cols-12 gap-10 md:gap-12 items-center">
        <div className="md:col-span-5">
          <div className="eyebrow mb-4">03 · Resultatet</div>
          <h2 className="display-heading text-3xl md:text-5xl text-paper">Ordning.</h2>
          <p className="mt-6 text-paper/70 leading-relaxed">
            En systemflora som hänger ihop, lägre kostnad, och ett team som vet
            exakt hur allt används. Ni sköter affären, systemen sköter rutinerna.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-paper/80">
            {["Allt hänger ihop", "Lägre verktygskostnad", "Teamet ombord"].map((t) => (
              <span key={t} className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-brand-green" strokeWidth={2.5} /> {t}
              </span>
            ))}
          </div>
        </div>
        <div className="md:col-span-7">
          <Scene className="relative h-80 md:h-[420px] rounded-lg bg-white/[0.04] border border-paper/15 overflow-hidden">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
              {ordningChips.map((c, i) => (
                <line
                  key={c.label}
                  className="resan-link"
                  pathLength={1}
                  x1={hub.x} y1={hub.y} x2={c.x} y2={c.y}
                  stroke={GREEN} strokeOpacity="0.5" strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  style={{ transitionDelay: `${0.4 + i * 0.1}s` }}
                />
              ))}
            </svg>
            {/* Navet */}
            <div className="absolute" style={{ left: `${hub.x}%`, top: `${hub.y}%`, transform: "translate(-50%,-50%)", zIndex: 3 }}>
              <div className="resan-chip resan-chip--calm bg-brand-green text-paper px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-semibold shadow-md">
                Er affär
              </div>
            </div>
            {ordningChips.map((c, i) => (
              <ToolChip key={c.label} chip={c} variant="calm" delay={0.2 + i * 0.1} dark />
            ))}
            {/* Team med checkar */}
            <div className="resan-fade absolute flex items-end gap-3" style={{ left: "50%", top: "93%", transform: "translate(-50%,-50%)" }}>
              {[0, 1, 2].map((i) => (
                <div key={i} className="relative">
                  <Figur w={30} tone="paper" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-green">
                    <Check className="h-2.5 w-2.5 text-paper" strokeWidth={3} />
                  </span>
                </div>
              ))}
            </div>
          </Scene>
        </div>
      </div>
    </section>
  );
}

function Page() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main>
        <PageHero
          eyebrow="Resan"
          title={<>Från kaos till <span className="text-brand-green">ordning</span>.</>}
          intro="Så här kan en resa med oss se ut. Scrolla för att följa med, från spretig verktygsflora som kostar pengar till en struktur som hänger ihop."
        />

        <ActKaos />
        <ActRedaUt />
        <ActOrdning />

        <section className="bg-ink text-paper border-t border-paper/10">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20 grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-8">
              <div className="eyebrow mb-4 text-brand-green">Nästa steg</div>
              <h2 className="display-heading text-3xl md:text-5xl text-paper">Redo för samma resa?</h2>
              <p className="mt-5 text-paper/70 max-w-xl leading-relaxed">
                Boka ett kort första samtal, så börjar vi där ni står idag.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link
                to="/boka"
                className="inline-flex items-center gap-2 bg-brand-green text-paper px-6 py-4 text-sm font-semibold hover:bg-paper hover:text-ink transition-colors"
              >
                Boka ett samtal <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
              <div className="mt-3 text-xs text-paper/50">Svar inom ett dygn.</div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
