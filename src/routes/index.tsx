import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, Sparkles, Workflow, Cpu } from "lucide-react";
import { Header, Footer, BookingCTA, GrowthLine, BOOKING_HREF, CONTACT_EMAIL } from "@/components/Site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ABO Growth — Affärsutveckling & tillväxt" },
      {
        name: "description",
        content:
          "ABO Growth driver affärsutveckling och tillväxt — strukturerat, konkret och med marknadsföring och digitala verktyg som medel, inte målet. Baserade i Stockholm.",
      },
      { name: "keywords", content: "affärsutveckling, tillväxtstrategi, kampanjer, AI-verktyg, digitala system, Stockholm, konsult, projektledning" },
      { property: "og:title", content: "ABO Growth — Affärsutveckling & tillväxt" },
      { property: "og:description", content: "Strukturerad affärsutveckling och tillväxt — från Stockholm." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://abogrowth.se/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ABO Growth — Affärsutveckling & tillväxt" },
      { name: "twitter:description", content: "Vi bygger tillväxt för ert företag. Strukturerat, från Stockholm." },
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
            "Affärsutveckling, tillväxtstrategi, optimerade kampanjer och digitala system för växande företag.",
          areaServed: "Sverige",
          address: { "@type": "PostalAddress", addressLocality: "Stockholm", addressCountry: "SE" },
          email: CONTACT_EMAIL,
          url: "https://abogrowth.se/",
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
};

const services: Service[] = [
  {
    num: "01",
    title: "Affärsutveckling & tillväxtstrategi",
    body: "Vi kartlägger var tillväxten faktiskt finns — och bygger en plan som går att genomföra. 4P, Porters fem krafter, SWOT och buyer personas som verktyg, inte som självändamål.",
    href: "/tjanster/affarsutveckling",
  },
  {
    num: "02",
    title: "Optimerade kampanjer",
    body: "Rätt budskap, i rätt kanal, till rätt målgrupp. Vi bygger, mäter och skruvar löpande — så budgeten jobbar för er, inte tvärtom.",
    href: "/tjanster/optimerade-kampanjer",
  },
  {
    num: "03",
    title: "Digitala system & AI-verktyg",
    tag: "Ny tjänst",
    body: "Vi hjälper er välja och införa system och AI-verktyg som faktiskt sparar tid — utan att fastna i teknik för teknikens skull.",
    href: "/tjanster/digitala-system-ai",
  },
];

const frameworks = ["4P", "Porters fem krafter", "SWOT", "Buyer personas"];

const rotatingWords = ["tillväxt", "struktur", "nya vägar"] as const;

function Index() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main>
        <Hero />
        <Services />
        <Trends />
        <Process />
        <BookingCTA />
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
        nya vägar
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
      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-32 md:pb-40 grid md:grid-cols-12 gap-12 items-end">
        <div className="md:col-span-8">
          <div className="eyebrow mb-8">ABO Growth — Stockholm</div>
          <h1 className="display-heading text-[44px] leading-[1.02] md:text-[clamp(44px,5.8vw,76px)]">
            Vi bygger <RotatingWord />
            <br />för ert företag.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-ink/75 leading-relaxed">
            Strategi som blir till handling. Vi driver affärsutveckling och
            projekt hela vägen — marknadsföring och digitala verktyg är medel,
            inte mål.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={BOOKING_HREF}
              className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3.5 text-sm font-semibold hover:bg-brand-green transition-colors"
            >
              Boka ett samtal <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
            <a href="#tjanster" className="text-sm font-semibold border-b-2 border-brand-green pb-1 hover:text-brand-green">
              Se vad vi gör
            </a>
          </div>
        </div>
        <div className="md:col-span-4 md:pb-2">
          <div className="border-l-2 border-brand-green pl-5 space-y-3 text-sm text-ink/70 bg-paper/70 backdrop-blur-sm py-2">
            <div className="flex justify-between"><span className="tracked text-xs text-subtle">Bas</span><span>Stockholm</span></div>
            <div className="flex justify-between"><span className="tracked text-xs text-subtle">Form</span><span>Enskild firma</span></div>
            <div className="flex justify-between"><span className="tracked text-xs text-subtle">Fokus</span><span>Tillväxt</span></div>
            <div className="flex justify-between"><span className="tracked text-xs text-subtle">Metod</span><span>Projektledning</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="tjanster" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          <div className="eyebrow mb-5">Vad vi gör</div>
          <h2 className="display-heading text-3xl md:text-5xl">
            Tre områden. <span className="text-brand-green">En riktning.</span>
          </h2>
          <p className="mt-6 text-ink/70 leading-relaxed max-w-2xl">
            Vi tar er från oklar riktning till konkret plan — och sedan hela vägen
            till leverans. Här är de tre områdena vi driver.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {services.map((s) => {
            const inner = (
              <>
                <div className="flex items-start justify-between mb-8">
                  <span className="tracked text-xs text-subtle">{s.num}</span>
                  {s.tag && (
                    <span className="text-[10px] tracked px-2 py-1 bg-brand-green/10 text-brand-green border border-brand-green/30">
                      {s.tag}
                    </span>
                  )}
                </div>
                <h3 className="display-heading text-xl lg:text-2xl mb-4 group-hover:text-brand-green transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-ink/70 leading-relaxed mb-8">{s.body}</p>
                {s.href && (
                  <div className="mt-auto pt-6 border-t border-line inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green">
                    Läs mer <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                  </div>
                )}
              </>
            );
            const shared =
              "group bg-white border border-line p-8 md:p-10 flex flex-col shadow-sm hover:shadow-md hover:border-brand-green/40 transition-all";
            return s.href ? (
              <Link key={s.num} to={s.href} className={shared}>
                {inner}
              </Link>
            ) : (
              <div key={s.num} className={shared}>
                {inner}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

function Trends() {
  const points = [
    {
      icon: Sparkles,
      title: "AI-verktyg",
      body: "Rätt verktyg på rätt ställe — snabbare research, tydligare underlag, bättre beslut.",
    },
    {
      icon: Workflow,
      title: "Automatiserade flöden",
      body: "Kapa manuellt klickande. Låt system prata med varandra så teamet slipper mellanleden.",
    },
    {
      icon: Cpu,
      title: "Moderna system",
      body: "CRM, analys och innehåll som faktiskt hänger ihop — inte fyra silos som ingen underhåller.",
    },
  ];

  return (
    <section className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-7">
            <div className="eyebrow mb-5">Håll er i framkant</div>
            <h2 className="display-heading text-3xl md:text-5xl">
              Häng med i <span className="text-brand-green">de nya trenderna</span>.
            </h2>
            <p className="mt-6 text-ink/75 leading-relaxed max-w-2xl">
              Nya system och AI-verktyg dyker upp varje månad. Vi hjälper er
              sortera bruset och införa det som faktiskt optimerar arbetet —
              utan att förvandla vardagen till ett teknikprojekt.
            </p>
          </div>
          <div className="md:col-span-5 md:text-right">
            <Link
              to="/tjanster/digitala-system-ai"
              className="inline-flex items-center gap-2 text-sm font-semibold border-b-2 border-brand-green pb-1 hover:text-brand-green"
            >
              Läs om digitala system & AI <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {points.map((p) => (
            <div
              key={p.title}
              className="bg-white border border-line p-8 shadow-sm hover:shadow-md hover:border-brand-green/40 transition-all"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-brand-green/10 text-brand-green mb-6">
                <p.icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="display-heading text-lg mb-3">{p.title}</h3>
              <p className="text-sm text-ink/70 leading-relaxed">{p.body}</p>
            </div>
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
        <div className="max-w-3xl">
          <div className="eyebrow mb-5 text-brand-green">Hur vi jobbar</div>
          <h2 className="display-heading text-3xl md:text-5xl text-paper">
            Struktur som syns <span className="text-brand-green">i resultatet.</span>
          </h2>
          <p className="mt-6 text-paper/70 max-w-2xl leading-relaxed">
            Vi jobbar med etablerade ramverk och tydliga leverabler — trackers,
            faser, deadlines. Strategin är inget värd utan en plan för hur den
            ska genomföras.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-2">
          {frameworks.map((f) => (
            <span key={f} className="text-xs tracked-tight border border-paper/25 px-3 py-2">{f}</span>
          ))}
        </div>

        <div className="mt-16 grid gap-px bg-paper/10 md:grid-cols-4 border border-paper/10">
          {[
            { step: "01", title: "Kartlägg", body: "Vi förstår affären, marknaden och vad som faktiskt bromsar tillväxten." },
            { step: "02", title: "Prioritera", body: "Vi väljer de initiativ som ger störst effekt inom rimlig tid." },
            { step: "03", title: "Leverera", body: "Vi driver arbetet — med tidslinjer, ägarskap och konkreta leverabler." },
            { step: "04", title: "Följ upp", body: "Vi mäter, justerar och skalar det som fungerar." },
          ].map((p) => (
            <div key={p.step} className="bg-ink p-8">
              <div className="tracked text-xs text-brand-green mb-6">{p.step}</div>
              <h3 className="display-heading text-lg mb-3 text-paper">{p.title}</h3>
              <p className="text-sm text-paper/65 leading-relaxed">{p.body}</p>
            </div>
          ))}
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
        <div className="md:col-span-5">
          <div className="eyebrow mb-5">Kontakt</div>
          <h2 className="display-heading text-3xl md:text-5xl">
            Berätta vad ni <span className="text-brand-green">vill uppnå</span>.
          </h2>
          <p className="mt-6 text-ink/75 leading-relaxed">
            Några rader räcker. Vi svarar inom ett dygn och föreslår ett kort
            första samtal — utan förpliktelser.
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
        </div>

        <form
          className="md:col-span-7 bg-white border border-line p-8 md:p-10 space-y-5"
          onSubmit={submit}
        >
          {sent ? (
            <div className="py-10 text-center">
              <div className="eyebrow mb-3">Tack</div>
              <p className="display-heading text-2xl">Din mejlklient öppnades — skicka så hörs vi.</p>
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
                  className="w-full bg-paper border border-line px-4 py-3 text-sm focus:outline-none focus:border-brand-green"
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
        className="w-full bg-paper border border-line px-4 py-3 text-sm focus:outline-none focus:border-brand-green"
      />
    </div>
  );
}
