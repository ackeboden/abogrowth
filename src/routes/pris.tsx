import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Header, Footer, PageHero, PriceEmbed } from "@/components/Site";

export const Route = createFileRoute("/pris")({
  head: () => ({
    meta: [
      { title: "Prisuppskattning | ABO Growth" },
      {
        name: "description",
        content:
          "Få en ungefärlig prisbild direkt. Svara på några frågor om omfattning så räknar vårt verktyg fram ett riktpris, och vad ett upplägg hos oss skulle kunna innehålla.",
      },
      { property: "og:title", content: "Prisuppskattning | ABO Growth" },
      { property: "og:description", content: "Räkna fram en ungefärlig prisbild för ert upplägg direkt." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://abogrowth.se/pris" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://abogrowth.se/pris" }],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main>
        <PageHero
          eyebrow="Prisuppskattning"
          title={<>Vad kostar det? <span className="text-brand-green">Räkna själv.</span></>}
          intro="Svara på några frågor om omfattning så får ni en ungefärlig prisbild direkt, plus förslag på vad ett upplägg hos oss skulle kunna innehålla. Ingen offert, ingen förpliktelse."
        />

        <section className="border-b border-line">
          <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
            <PriceEmbed />
          </div>
        </section>

        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-6 py-16 flex flex-wrap items-center justify-between gap-6">
            <Link to="/sa-gar-det-till" className="group inline-flex items-center gap-3 text-sm font-semibold">
              <span className="tracked text-xs text-subtle">Vill ni hellre prata direkt?</span>
              <span className="border-b-2 border-brand-green pb-0.5 group-hover:text-brand-green">Så går ett första samtal till</span>
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
