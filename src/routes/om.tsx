import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Compass, ListChecks, ClipboardList, Handshake } from "lucide-react";
import { Header, Footer, BookingCTA, PageHero, Reveal, CONTACT_EMAIL } from "@/components/Site";

export const Route = createFileRoute("/om")({
  head: () => ({
    meta: [
      { title: "Om ABO Growth | Affärsutveckling från Stockholm" },
      {
        name: "description",
        content:
          "ABO Growth drivs av Alexander från Stockholm. En person, inga mellanhänder. Strategin först, tekniken sedan och ärliga besked hela vägen.",
      },
      { property: "og:title", content: "Om ABO Growth" },
      { property: "og:description", content: "Den ni pratar med är den som levererar. Affärsutveckling från Stockholm." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://abogrowth.se/om" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://abogrowth.se/om" }],
  }),
  component: Page,
});

// Fyra principer — samma budskap som bär resten av sajten, samlade på ett ställe.
const principles = [
  {
    icon: Compass,
    title: "Strategin först, tekniken sedan",
    body: "Vi börjar i affären: mål, flöden, flaskhalsar. Vilka system och verktyg som behövs är en följdfråga, aldrig utgångspunkten.",
  },
  {
    icon: ListChecks,
    title: "Konkret, inte konsultjargong",
    body: "Leverabler ni kan peka på: en plan, en kampanj, ett system som funkar. Inte en rapport som samlar damm i en mapp.",
  },
  {
    icon: ClipboardList,
    title: "Projektledning som metod",
    body: "Faser, deadlines och tydligt ägarskap. Strategin är inget värd förrän den är genomförd, så vi driver den hela vägen.",
  },
  {
    icon: Handshake,
    title: "Ärliga besked",
    body: "Vi säger vad som går snabbt och vad som kräver uthållighet. Och om vi inte är rätt hjälp för er säger vi det också.",
  },
];

function Page() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main>
        <PageHero
          eyebrow="Om ABO Growth"
          title={
            <>
              Den ni pratar med är <span className="text-brand-green">den som levererar</span>.
            </>
          }
          intro="ABO Growth är en enskild firma i Stockholm. Inga säljteam, inga juniorer som tar över efter kickoffen. Samma person hela vägen från första samtalet till leverans."
        />

        <section className="border-b border-line bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 grid md:grid-cols-12 gap-12">
            <Reveal className="md:col-span-5">
              <div className="eyebrow mb-5">Personen bakom</div>
              <h2 className="display-heading text-3xl md:text-4xl">
                Alexander, <span className="text-brand-green">grundare</span>.
              </h2>
              <div className="mt-10 pt-6 border-t border-line grid grid-cols-3 gap-6">
                <Stat label="Bas" value="Stockholm" />
                <Stat label="Form" value="Enskild firma" />
                <Stat label="Kärna" value="Tillväxt" />
              </div>
              <div className="mt-8 text-sm">
                <div className="tracked text-[10px] text-subtle mb-1">Kontakt</div>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-semibold border-b-2 border-brand-green pb-0.5 hover:text-brand-green"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </Reveal>
            <Reveal className="md:col-span-7 space-y-6 text-ink/80 leading-relaxed" delay={130}>
              <p>
                Kärnan är affärsutveckling: att förstå affären, hitta hävstängerna och
                bygga en plan som faktiskt går att genomföra. Marknadsföring,
                digitala system och AI-verktyg är sätten vi levererar på, inte
                självändamål. Strategin först, tekniken sedan.
              </p>
              <p>
                Att firman är liten är inte något vi ursäktar. Det är så vi vill
                jobba: korta beslutsvägar, inget som går förlorat i överlämningar,
                och ett ansvar som inte går att delegera bort.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="relative bg-ink text-paper overflow-hidden">
          <div className="ai-glow" aria-hidden="true" />
          <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
            <Reveal>
              <div className="max-w-3xl">
                <div className="eyebrow mb-5">Så jobbar vi</div>
                <h2 className="display-heading text-3xl md:text-5xl text-paper">
                  Fyra principer. <span className="text-brand-green">Inga undantag.</span>
                </h2>
              </div>
            </Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {principles.map((p, i) => (
                <Reveal key={p.title} delay={i * 110}>
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

        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-6 py-16 flex flex-wrap items-center justify-between gap-6">
            <Link to="/sa-gar-det-till" className="group inline-flex items-center gap-3 text-sm font-semibold">
              <span className="tracked text-xs text-subtle">Nyfikna?</span>
              <span className="border-b-2 border-brand-green pb-0.5 group-hover:text-brand-green">Så går ett första samtal till</span>
              <ArrowUpRight className="h-4 w-4 text-brand-green" strokeWidth={2.5} />
            </Link>
            <Link to="/" hash="tjanster" className="text-sm text-subtle hover:text-ink">
              Se våra tjänster →
            </Link>
          </div>
        </section>

        <BookingCTA />
      </main>
      <Footer />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="tracked text-[10px] text-subtle mb-1">{label}</div>
      <div className="font-bold">{value}</div>
    </div>
  );
}
