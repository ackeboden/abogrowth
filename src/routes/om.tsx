import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, BookingCTA, PageHero, CONTACT_EMAIL } from "@/components/Site";

export const Route = createFileRoute("/om")({
  head: () => ({
    meta: [
      { title: "Om ABO Growth — Affärsutveckling från Stockholm" },
      {
        name: "description",
        content:
          "ABO Growth drivs av Alexander från Stockholm. Fokus på affärsutveckling och tillväxt — marknadsföring och digitala verktyg är medlen, inte målet.",
      },
      { property: "og:title", content: "Om ABO Growth" },
      { property: "og:description", content: "Alexander bakom ABO Growth — affärsutveckling och tillväxt från Stockholm." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://abogrowth.se/om" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://abogrowth.se/om" }],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main>
        <PageHero
          eyebrow="Om ABO Growth"
          title={
            <>
              Affärsutveckling med <span className="text-brand-green">tydlig riktning</span>.
            </>
          }
          intro="ABO Growth är en enskild firma baserad i Stockholm. Vi hjälper företag att växa — strukturerat, konkret och utan konsultjargong."
        />

        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <div className="eyebrow mb-5">Personen bakom</div>
              <h2 className="display-heading text-3xl md:text-4xl">
                Alexander — <span className="text-brand-green">grundare</span>.
              </h2>
            </div>
            <div className="md:col-span-7 space-y-6 text-ink/80 leading-relaxed">
              <p>
                ABO Growth drivs av Alexander, med bas i Stockholm. Bakgrunden är
                affärsutveckling, partnerskap och projektledning — erfarenhet av att
                driva initiativ hela vägen från idé till mätbart resultat.
              </p>
              <p>
                Kärnan är affärsutveckling: att förstå affären, hitta hävstängerna och
                bygga en plan som faktiskt går att genomföra. Marknadsföring,
                digitala system och AI-verktyg är sätten vi levererar på — inte
                självändamål.
              </p>
              <p>
                Vi jobbar strukturerat och faktabaserat för att undvika lösa
                antaganden. Och vi jobbar med projektledning som metod, för att
                strategin ska bli till leverabler och inte fastna i ett dokument.
              </p>
              <div className="pt-6 border-t border-line grid grid-cols-3 gap-6">
                <Stat label="Bas" value="Stockholm" />
                <Stat label="Form" value="Enskild firma" />
                <Stat label="Kärna" value="Tillväxt" />
              </div>
              <div className="pt-6 text-sm">
                <div className="tracked text-[10px] text-subtle mb-1">Kontakt</div>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-semibold border-b-2 border-brand-green pb-0.5 hover:text-brand-green"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
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
