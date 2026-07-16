import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Compass, Workflow, Cpu, Plus } from "lucide-react";
import { Header, Footer, GrowthLine, Reveal, useInView, PriceEmbed, CONTACT_EMAIL } from "@/components/Site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ABO Growth | Ordning i era system och AI" },
      {
        name: "description",
        content:
          "Nya digitala system och AI-verktyg dyker upp varje vecka. ABO Growth hjälper er få koll: struktur i systemfloran, verktyg som hänger ihop och en tydlig väg framåt. Från Stockholm.",
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
    body: "Vi hjälper er få koll: kartlägger systemfloran, rensar bland verktygen och kopplar ihop det som ska hänga samman. Sedan visar vi var AI gör verklig nytta.",
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
    body: "Vi kartlägger var tillväxten faktiskt finns och bygger en plan som går att genomföra, med prioriterade initiativ som flyttar affären framåt.",
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
    body: "Rätt budskap, i rätt kanal, till rätt målgrupp. Vi bygger, mäter och skruvar löpande så att budgeten jobbar för er, inte tvärtom.",
    href: "/tjanster/optimerade-kampanjer",
    deliverables: [
      "Kampanjstruktur för passande kanaler",
      "Annonser, målgrupper & spårning på plats",
      "Månadsrapport med resultat & nästa steg",
    ],
  },
];

const frameworks = ["Trackers", "Faser & milstolpar", "Deadlines", "Löpande uppföljning"];

// Vanliga frågor — visas i FAQ-sektionen OCH i FAQPage-schemat (SEO).
// Håll frågor och svar identiska på båda ställena, annars kan Google straffa sidan.
const faqItems = [
  {
    q: "Vad kostar det att jobba med er?",
    a: "Det beror på omfattningen. Ett avgränsat projekt kostar mindre än ett löpande samarbete. Ni får alltid ett konkret förslag med pris innan vi börjar, och första samtalet är kostnadsfritt. Inga överraskningar på fakturan.",
  },
  {
    q: "Hur snabbt ser vi resultat?",
    a: "Kartläggningen tar en till två veckor och de första konkreta leverablerna kommer oftast inom en månad. Sedan är vi ärliga: tillväxt är ett löpande arbete, och vi säger vad som går snabbt och vad som kräver uthållighet.",
  },
  {
    q: "Jobbar ni med små företag?",
    a: "Ja. Vi är själva en enskild firma och vet hur det är att växa med begränsade resurser. Upplägget skalas efter er storlek och budget. Ingen betalar för mer än de behöver.",
  },
  {
    q: "Måste vi köpa en massa nya system och verktyg?",
    a: "Nej. Vi börjar alltid i strategin: vad ni behöver och varför. Ofta räcker verktygen ni redan har, rätt ihopkopplade. Nya system föreslår vi bara när de löser ett verkligt problem, och vi tjänar ingenting på att ni köper fler licenser.",
  },
  {
    q: "Är det här mer AI-hype?",
    a: "Nej. AI är ett verktyg bland flera. Vi använder det där det faktiskt sparar tid och hoppar över det där det inte gör det. Strategin och helheten kommer först, tekniken väljs därefter.",
  },
  {
    q: "Kan vi börja smått?",
    a: "Absolut. Många samarbeten börjar med ett avgränsat projekt: en kartläggning, en kampanj eller ett systemval. Fungerar det bra bygger vi vidare därifrån.",
  },
];

// Orden roterar det vi skapar ordning i — besökaren ska inom sekunder förstå
// kärnan: koll och struktur i den digitala floran.
const rotatingWords = ["systemen", "verktygen", "AI:n", "datan"] as const;

// Snabb-länkar i heron till de tre tjänsterna; spetstjänsten markeras grön.
const heroChips = [
  { label: "Digitala system & AI", to: "/tjanster/digitala-system-ai", featured: true },
  { label: "Affärsutveckling", to: "/tjanster/affarsutveckling", featured: false },
  { label: "Optimerade kampanjer", to: "/tjanster/optimerade-kampanjer", featured: false },
] as const;

// Rullande band med det vi erbjuder. Systemstrategi och struktur först,
// affärsutveckling och kampanjer som stödtjänster sist.
const marqueeItems = [
  "Systemstrategi", "Systemkartläggning", "Digitala system", "AI-verktyg",
  "AI-agenter", "Automatiserade flöden", "Integrationer", "Struktur & ordning",
  "Effektivisering", "Analys & uppföljning", "CRM",
  "Affärsutveckling", "Optimerade kampanjer", "SEO", "Nyhetsbrev",
] as const;

function Index() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <AiFocus />
        <Services />
        <Process />
        <Faq />
        <Price />
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
      {/* Sizer: reserverar plats för det längsta ordet så rubriken inte hoppar */}
      <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
        verktygen
      </span>
      <span
        key={current}
        className="word-rotate col-start-1 row-start-1 whitespace-nowrap"
      >
        {current}
      </span>
    </span>
  );
}

function Hero() {
  return (
    <section id="top" className="relative border-b border-line overflow-hidden">
      <div className="hero-ambient" aria-hidden="true" />
      <GrowthLine />
      <div className="relative mx-auto max-w-6xl px-6 pt-14 pb-16 md:pt-32 md:pb-40 grid md:grid-cols-12 gap-8 md:gap-12 items-end">
        <div className="md:col-span-8">
          <div className="eyebrow mb-8 hero-rise">ABO Growth · Digitala system & AI</div>
          <h1 className="display-heading text-[44px] leading-[1.02] md:text-[clamp(44px,5.8vw,76px)] hero-rise [animation-delay:120ms]">
            Få koll på <RotatingWord />
            <br />i den digitala djungeln.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-ink/75 leading-relaxed hero-rise [animation-delay:260ms]">
            Nya system och AI-verktyg dyker upp varje vecka, och det är lätt
            att tappa greppet. Vi hjälper er skapa ordning: en systemflora
            som hänger ihop, mindre dubbelarbete och en tydlig väg framåt.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4 hero-rise [animation-delay:400ms]">
            <Link
              to="/boka"
              className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3.5 text-sm font-semibold hover:bg-brand-green transition-colors"
            >
              Boka ett samtal <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
            <a href="#tjanster" className="text-sm font-semibold border-b-2 border-brand-green pb-1 hover:text-brand-green">
              Se vad vi gör
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-2 hero-rise [animation-delay:500ms]">
            {heroChips.map((c) => (
              <Link
                key={c.to}
                to={c.to}
                className={`group inline-flex items-center gap-1.5 border px-3.5 py-2 text-xs font-semibold tracked-tight transition-colors ${
                  c.featured
                    ? "border-brand-green bg-brand-green/10 text-brand-green hover:bg-brand-green hover:text-paper"
                    : "border-line bg-white/70 hover:border-brand-green hover:text-brand-green"
                }`}
              >
                {c.label}
                <ArrowUpRight
                  className="h-3 w-3 opacity-40 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2.5}
                />
              </Link>
            ))}
          </div>
        </div>
        {/* Statistiklådan tar för mycket plats på mobil; visas från md och uppåt */}
        <div className="hidden md:block md:col-span-4 md:pb-2 hero-rise [animation-delay:540ms]">
          <div className="border-l-2 border-brand-green pl-5 space-y-3 text-sm text-ink/70 bg-paper/70 backdrop-blur-sm py-2">
            <div className="flex justify-between"><span className="tracked text-xs text-subtle">Bas</span><span>Stockholm</span></div>
            <div className="flex justify-between"><span className="tracked text-xs text-subtle">Form</span><span>Enskild firma</span></div>
            <div className="flex justify-between"><span className="tracked text-xs text-subtle">Fokus</span><span>Struktur & ordning</span></div>
            <div className="flex justify-between"><span className="tracked text-xs text-subtle">Spets</span><span>Digitala system & AI</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Marquee — rullande band med konkreta kompetenser.
 * Gör startsidan levande OCH svarar direkt på "vad gör ni?".
 * Listan dubbleras för sömlös loop; pausar vid hover och står
 * still vid prefers-reduced-motion (styrs i CSS).
 */
function Marquee() {
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {marqueeItems.map((item) => (
        <span key={item} className="flex items-center">
          <span className="tracked text-xs text-ink/60 whitespace-nowrap px-5 py-4">{item}</span>
          <span className="h-1.5 w-1.5 bg-brand-green/60 rounded-full shrink-0" />
        </span>
      ))}
    </div>
  );
  // Bandet döljs på mobil: tog för mycket plats direkt under heron.
  return (
    <section aria-label="Kompetenser och kanaler" className="marquee hidden md:block border-b border-line bg-white/60 overflow-hidden">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}

function AiFocus() {
  const points = [
    {
      icon: Compass,
      title: "Strategi & verktygsval",
      body: "Vi utgår från affärsmålet, inte från tekniken. Vilka system och verktyg ni behöver, och varför.",
    },
    {
      icon: Cpu,
      title: "System som hänger ihop",
      body: "CRM, analys och innehåll som faktiskt pratar med varandra, i stället för fyra silos som ingen underhåller.",
    },
    {
      icon: Workflow,
      title: "Automation & AI där det ger nytta",
      body: "Kapa manuellt klickande och låt AI göra tunga lyft, men bara där det faktiskt sparar tid.",
    },
  ];

  return (
    <section className="relative bg-ink text-paper overflow-hidden">
      <div className="ai-glow" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <div className="grid md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-8">
              <div className="eyebrow mb-5">Huvudtjänst · Digitala system & AI</div>
              <h2 className="display-heading text-3xl md:text-5xl text-paper">
                Ordning i <span className="text-brand-green">djungeln</span>.
              </h2>
              <p className="mt-6 text-paper/70 leading-relaxed max-w-2xl">
                Nya system och AI-verktyg dyker upp varje vecka. Alla säger sig
                vara oumbärliga, konkurrenterna verkar redan köra igång, och er
                data ligger spridd på fem ställen. Vi reder ut floran, kopplar
                ihop det som ska prata med varandra och visar var AI faktiskt gör
                nytta, så att ni får koll i stället för fler flikar.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link
                to="/tjanster/digitala-system-ai"
                className="inline-flex items-center gap-2 bg-brand-green text-paper px-6 py-3.5 text-sm font-semibold hover:bg-paper hover:text-ink transition-colors"
              >
                Utforska tjänsten <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 130}>
              <div className="h-full border border-paper/15 bg-white/5 p-5 md:p-8 transition-all duration-300 hover:border-brand-green/50 hover:bg-white/[0.08] hover:-translate-y-1">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-green/15 text-brand-green mb-6">
                  <p.icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="display-heading text-lg mb-3 text-paper">{p.title}</h3>
                <p className="text-sm text-paper/65 leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="tjanster" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <div className="max-w-3xl">
            <div className="eyebrow mb-5">Vad vi gör</div>
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
            <div className="eyebrow mb-5 text-brand-green">Hur vi jobbar</div>
            <h2 className="display-heading text-3xl md:text-5xl text-paper">
              Struktur som syns <span className="text-brand-green">i resultatet.</span>
            </h2>
            <p className="mt-6 text-paper/70 max-w-2xl leading-relaxed">
              Vi jobbar med en tydlig metod och konkreta leverabler: trackers,
              faser, deadlines. Strategin är inget värd utan en plan för hur den
              ska genomföras.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-2">
            {frameworks.map((f) => (
              <span key={f} className="text-xs tracked-tight border border-paper/25 px-3 py-2">{f}</span>
            ))}
          </div>
        </Reveal>

        <ProcessLine />

        <div className="mt-16 md:mt-5 grid gap-px bg-paper/10 md:grid-cols-4 border border-paper/10">
          {[
            { step: "01", title: "Kartlägg", body: "Vi förstår affären, marknaden och vad som faktiskt bromsar tillväxten." },
            { step: "02", title: "Prioritera", body: "Vi väljer de initiativ som ger störst effekt inom rimlig tid." },
            { step: "03", title: "Leverera", body: "Vi driver arbetet, med tidslinjer, ägarskap och konkreta leverabler." },
            { step: "04", title: "Följ upp", body: "Vi mäter, justerar och skalar det som fungerar." },
          ].map((p, i) => (
            <Reveal key={p.step} delay={i * 110} className="bg-ink">
              <div className="h-full p-5 md:p-8 transition-colors duration-300 hover:bg-white/5">
                <div className="tracked text-xs text-brand-green mb-6">{p.step}</div>
                <h3 className="display-heading text-lg mb-3 text-paper">{p.title}</h3>
                <p className="text-sm text-paper/65 leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
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
    <section id="faq" className="border-b border-line bg-white">
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
              Mejla oss
            </a>{" "}
            så svarar vi inom ett dygn.
          </p>
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

function Price() {
  return (
    <section id="pris" className="border-b border-line bg-white">
      <div className="mx-auto max-w-3xl px-6 py-24 md:py-28">
        <Reveal>
          <div className="eyebrow mb-5">Prisuppskattning</div>
          <h2 className="display-heading text-3xl md:text-5xl">
            Vad kostar det? <span className="text-brand-green">Räkna själv.</span>
          </h2>
          <p className="mt-6 text-ink/70 leading-relaxed">
            Svara på några frågor om omfattning så får ni en ungefärlig prisbild
            direkt, plus förslag på vad ett upplägg hos oss skulle kunna
            innehålla. Ingen offert, ingen förpliktelse.
          </p>
        </Reveal>
        <div className="mt-10">
          <PriceEmbed />
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Kontakt från ${form.name || "webbformulär"}`;
    const body = `Namn: ${form.name}\nE-post: ${form.email}\n\n${form.message}`;
    const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    setSent(true);
  };

  return (
    <section id="kontakt">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 grid md:grid-cols-12 gap-12">
        <Reveal className="md:col-span-5">
          <div className="eyebrow mb-5">Kontakt</div>
          <h2 className="display-heading text-3xl md:text-5xl">
            Berätta vad ni <span className="text-brand-green">vill uppnå</span>.
          </h2>
          <p className="mt-6 text-ink/75 leading-relaxed">
            Några rader räcker. Vi svarar inom ett dygn och föreslår ett kort
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
                <p className="display-heading text-2xl">Din mejlklient öppnades. Skicka, så hörs vi.</p>
                <p className="mt-4 text-sm text-ink/60">
                  Öppnades inget? Mejla direkt till{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold border-b-2 border-brand-green">
                    {CONTACT_EMAIL}
                  </a>
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
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3.5 text-sm font-semibold hover:bg-brand-green transition-colors"
                >
                  Skicka <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </button>
                <p className="text-xs text-subtle">
                  Formuläret öppnar din mejlklient. Går även bra att mejla direkt till {CONTACT_EMAIL}.
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
