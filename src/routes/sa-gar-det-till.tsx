import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { Header, Footer, PageHero, Reveal, BOOKING_HREF, CONTACT_EMAIL } from "@/components/Site";

export const Route = createFileRoute("/sa-gar-det-till")({
  head: () => ({
    meta: [
      { title: "Så går det till — ABO Growth" },
      {
        name: "description",
        content:
          "Så går första samtalet med ABO Growth till: 30 minuter, kostnadsfritt och utan förberedelsekrav. Vi lyssnar, ställer frågor och föreslår ett upplägg.",
      },
      { property: "og:title", content: "Så går det till — ABO Growth" },
      { property: "og:description", content: "Första samtalet: 30 minuter, kostnadsfritt, inga förberedelsekrav." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://abogrowth.se/sa-gar-det-till" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://abogrowth.se/sa-gar-det-till" }],
  }),
  component: Page,
});

// Tidslinjen för första kontakten — konkret och avdramatiserad.
const steps = [
  {
    n: "01",
    t: "Ni hör av er",
    b: "Ett mejl räcker — ett par rader om vilka ni är och vad ni brottas med. Ni behöver inte ha formulerat något färdigt. Vi svarar inom ett dygn med förslag på tider.",
  },
  {
    n: "02",
    t: "Vi förbereder oss",
    b: "Innan mötet läser vi på om er verksamhet, marknad och digitala närvaro. Ni behöver inte förbereda något — kom som ni är, vi står för frågorna.",
  },
  {
    n: "03",
    t: "Första samtalet — 30 minuter",
    b: "Video eller telefon, ni väljer. Vi lyssnar på var ni står, ställer frågor om mål och flaskhalsar och är ärliga om vi kan hjälpa till — och om vi inte kan.",
  },
  {
    n: "04",
    t: "Ni får ett förslag",
    b: "Inom några dagar skickar vi ett kort, konkret förslag: vad vi ser, var vi skulle börja och vad det kostar. Sedan bestämmer ni er — i er egen takt.",
  },
];

const promises = [
  "Kostnadsfritt och utan förpliktelser",
  "Inga förberedelser krävs av er",
  "Ärligt besked — även när svaret är att ni inte behöver oss",
  "Inget säljmanus, inga uppföljningssamtal ni inte bett om",
];

function Page() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main>
        <PageHero
          eyebrow="Så går det till"
          title={<>Ett första samtal är <span className="text-brand-green">bara ett samtal</span>.</>}
          intro="Att höra av sig ska vara det enklaste steget — inte det svåraste. Här är exakt vad som händer när ni bokar, så att ni vet vad ni säger ja till."
        />

        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <div className="eyebrow mb-5">Steg för steg</div>
              <h2 className="display-heading text-3xl md:text-4xl">
                Från mejl till förslag på <span className="text-brand-green">under en vecka</span>.
              </h2>
            </div>
            <div className="md:col-span-8 space-y-6">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 110}>
                  <div className="bg-white border border-line p-8 shadow-sm hover:shadow-md hover:border-brand-green/40 transition-all flex gap-6">
                    <div className="tracked text-xs text-brand-green pt-1 w-10 shrink-0">{s.n}</div>
                    <div>
                      <h3 className="display-heading text-lg mb-2">{s.t}</h3>
                      <p className="text-sm text-ink/70 leading-relaxed">{s.b}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5">
              <div className="eyebrow mb-5">Vårt löfte</div>
              <h2 className="display-heading text-3xl md:text-4xl">
                Det ni <span className="text-brand-green">inte</span> behöver oroa er för.
              </h2>
              <p className="mt-6 text-ink/75 leading-relaxed">
                Vi vet att "boka ett samtal" ofta betyder säljpitch. Så jobbar
                inte vi. Första mötet handlar om att förstå er affär — inte om
                att sälja in vår.
              </p>
            </div>
            <div className="md:col-span-7">
              <ul className="space-y-4">
                {promises.map((p) => (
                  <li key={p} className="flex items-start gap-3 border border-line bg-paper p-5 text-sm text-ink/80">
                    <Check className="h-4 w-4 mt-0.5 shrink-0 text-brand-green" strokeWidth={2.5} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Egen CTA i stället för BookingCTA — texten här får inte upprepa sidan den avslutar. */}
        <section className="bg-ink text-paper">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-24 grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-8">
              <div className="eyebrow mb-4 text-brand-green">Nästa steg</div>
              <h2 className="display-heading text-3xl md:text-5xl text-paper">Nu vet ni hur det går till.</h2>
              <p className="mt-5 text-paper/70 max-w-xl leading-relaxed">
                Ett mejl med ett par rader räcker. Vi tar det därifrån.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <a
                href={BOOKING_HREF}
                className="inline-flex items-center gap-2 bg-brand-green text-paper px-6 py-4 text-sm font-semibold hover:bg-paper hover:text-ink transition-colors"
              >
                Boka ett samtal <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </a>
              <div className="mt-3 text-xs text-paper/50">
                Eller mejla direkt: <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-paper">{CONTACT_EMAIL}</a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-6 py-16 flex flex-wrap items-center justify-between gap-6">
            <Link to="/" hash="tjanster" className="group inline-flex items-center gap-3 text-sm font-semibold">
              <span className="tracked text-xs text-subtle">Nyfikna på vad vi gör?</span>
              <span className="border-b-2 border-brand-green pb-0.5 group-hover:text-brand-green">Se våra tjänster</span>
              <ArrowUpRight className="h-4 w-4 text-brand-green" strokeWidth={2.5} />
            </Link>
            <Link to="/" className="text-sm text-subtle hover:text-ink">← Tillbaka till startsidan</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
