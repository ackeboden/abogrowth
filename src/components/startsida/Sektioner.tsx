import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Plus } from "lucide-react";
import { GrowthLine, Reveal, useInView, CONTACT_EMAIL } from "@/components/Site";

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


// Arbetssättet utgår från SYSTEMEN, inte från affärsutveckling. Håll den
// vinkeln: kartlägg systemfloran, prioritera efter effekt, koppla ihop och
// automatisera, följ upp att det används.
const processSteps = [
  {
    step: "01",
    title: "Kartlägg",
    body: "Vi går igenom system, verktyg, licenser och flöden. Var ligger datan, var dubbelarbetas det och var glappar kedjan?",
  },
  {
    step: "02",
    title: "Prioritera",
    body: "Vi rangordnar efter effekt och insats. Det som ger mest tid tillbaka, eller mest affär, görs först.",
  },
  {
    step: "03",
    title: "Genomför",
    body: "Vi rensar, kopplar ihop och automatiserar. Tydliga faser, deadlines och ägarskap hela vägen fram.",
  },
  {
    step: "04",
    title: "Följ upp",
    body: "Vi mäter att det används och håller över tid, och bygger vidare där nästa effekt finns.",
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
export const faqItems = [
  {
    q: "Vad kostar det att jobba med er?",
    a: "Det beror på omfattningen. Ett avgränsat projekt kostar mindre än ett löpande samarbete. Vill ni ha en snabb prisbild direkt kan ni testa vår priskalkylator. Ni får alltid ett konkret förslag med pris innan vi börjar, och första samtalet är kostnadsfritt. Inga överraskningar på fakturan.",
  },
  {
    q: "Hur snabbt ser vi resultat?",
    a: "Kartläggningen tar en till två veckor och de första konkreta leverablerna kommer oftast inom en månad. Sedan är vi ärlig: att hålla ordning i systemen är ett löpande arbete, och vi säger vad som går snabbt och vad som kräver uthållighet.",
  },
  {
    q: "Vilka företag jobbar ni med?",
    a: "Mindre bolag, från enmansföretag upp till ett femtiotal anställda, oftast utan egen IT-avdelning. Vi vet hur det är att växa med begränsade resurser, och upplägget skalas efter er storlek och budget. Ingen betalar för mer än de behöver.",
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
    a: "Absolut. Gör systemkollen högre upp på sidan så ser ni var ni står redan idag. Många samarbeten börjar sedan med ett avgränsat projekt: en kartläggning, en kampanj eller ett systemval. Fungerar det bra växer samarbetet därifrån.",
  },
];


export function Services() {
  return (
    <section id="tjanster" className="border-b border-line bg-mist">
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
                {/* Topplinjen bär färgsystemet: grönt för grunden, blått för de
                    två tjänster som bygger vidare på den. */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-1 ${s.featured ? "bg-brand-green" : "bg-brand-blue"}`}
                />
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
                          : "bg-brand-blue/10 text-brand-blue border border-brand-blue/30"
                      }`}
                    >
                      {s.tag}
                    </span>
                  )}
                </div>
                <h3 className={`display-heading text-xl lg:text-2xl lg:min-h-16 mb-4 transition-colors ${s.featured ? "group-hover:text-brand-green" : "group-hover:text-brand-blue"}`}>
                  {s.title}
                </h3>
                {/* min-höjd på lg så "Ni får" börjar på samma rad i alla korten */}
                <p className="text-sm text-ink/70 leading-relaxed mb-6 lg:min-h-[7.5rem]">{s.body}</p>
                <div className="mb-8">
                  <div className="tracked text-[10px] text-subtle mb-3">Ni får</div>
                  <ul className="space-y-2.5">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2.5 text-sm text-ink/80">
                        <Check className={`h-4 w-4 mt-0.5 shrink-0 ${s.featured ? "text-brand-green" : "text-brand-blue"}`} strokeWidth={2.5} />
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
      { rubrik: "En opartisk rådgivare", rad: "Vi tjänar ingenting på att ni köper fler licenser." },
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

export function Varde() {
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
                  t.huvud ? "border-brand-green/50 shadow-md" : "border-brand-blue/40 shadow-sm"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-1 ${t.huvud ? "bg-brand-green" : "bg-brand-blue"}`}
                />
                {/* Korten är fortfarande identiska i form; bara färgen skiljer
                    grunden från de två som bygger vidare. */}
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
                    <li key={v.rubrik} className={`border-l-2 pl-4 ${t.huvud ? "border-brand-green" : "border-brand-blue"}`}>
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

export function Process() {
  return (
    <section id="arbetssatt" className="relative bg-paper text-ink overflow-hidden">
      <GrowthLine className="opacity-30" />
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <div className="max-w-3xl">
            <div className="eyebrow mb-5 text-brand-green">Hur vi jobbar</div>
            <h2 className="display-heading text-3xl md:text-5xl text-ink">
              Fyra steg. <span className="text-brand-green">Varje uppdrag.</span>
            </h2>
            <p className="mt-6 text-ink/75 max-w-2xl leading-relaxed">
              Vi börjar alltid i nuläget: hur ni faktiskt arbetar och vilka
              system som bär verksamheten. Systemen är grunden, och när den
              sitter följer allt annat samma fyra steg.
            </p>
          </div>
        </Reveal>

        <ProcessLine />

        <div className="mt-16 md:mt-5 grid gap-px bg-line md:grid-cols-4 border border-line">
          {processSteps.map((p, i) => (
            <Reveal key={p.step} delay={i * 110} className="bg-paper">
              <div className="h-full p-5 md:p-8 transition-colors duration-300 hover:bg-mist">
                <div className="tracked text-xs text-brand-green mb-6">{p.step}</div>
                <h3 className="display-heading text-lg mb-3 text-ink">{p.title}</h3>
                <p className="text-sm text-ink/70 leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Visar att samma metod bär alla tre tjänsterna, med systemen som grund. */}
        <Reveal delay={120}>
          <div className="mt-16">
            <div className="tracked text-[10px] text-brand-green mb-6">Samma metod, per tjänst</div>
            <div className="grid gap-px bg-line border border-line md:grid-cols-3">
              {methodPerService.map((m) => (
                <div key={m.service} className="bg-paper p-5 md:p-8">
                  <h3 className="display-heading text-base mb-4 text-ink">
                    {m.service}
                    {m.primary && (
                      <span className="ml-2 align-middle text-[10px] tracked bg-brand-green text-paper px-2 py-0.5">
                        Grunden
                      </span>
                    )}
                  </h3>
                  <ol className="space-y-2">
                    {m.flow.map((f, n) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-ink/70 leading-relaxed">
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

export function Faq() {
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
              Mejla oss
            </a>{" "}
            så svarar vi inom ett dygn.
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

export function Contact() {
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
      // I dev-läge saknas Netlify-mottagaren; släpp igenom så flödet går
      // att klicka igenom lokalt (samma undantag som Systemkollen).
      if (!res.ok && import.meta.env.PROD) throw new Error(String(res.status));
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
                <p className="display-heading text-2xl">
                  Tack {form.name.trim().split(" ")[0]}! Vi hör av oss inom ett dygn.
                </p>
                <p className="mt-4 text-sm text-ink/60">
                  Vi svarar på {form.email.trim()}.
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
                  Vi svarar inom ett dygn. Går även bra att mejla direkt till {CONTACT_EMAIL}.
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
