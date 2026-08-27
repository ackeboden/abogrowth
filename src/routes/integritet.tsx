import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, PageHero, Reveal, CONTACT_EMAIL } from "@/components/Site";
import { oppnaCookieBanner } from "@/components/CookieBanner";

export const Route = createFileRoute("/integritet")({
  head: () => ({
    meta: [
      { title: "Integritet & cookies | ABO Growth" },
      {
        name: "description",
        content:
          "Så hanterar abogrowth.se cookies och personuppgifter: anonym besöksstatistik via Google Analytics, bara efter ditt samtycke, och formulärdata som endast används för att svara dig.",
      },
      { property: "og:title", content: "Integritet & cookies | ABO Growth" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://abogrowth.se/integritet" },
    ],
    links: [{ rel: "canonical", href: "https://abogrowth.se/integritet" }],
  }),
  component: Page,
});

// Kort och ärligt: sidan speglar exakt vad sajten faktiskt gör. Uppdatera
// den om spårning eller formulärhantering ändras.
const block = [
  {
    rubrik: "Vilka cookies används?",
    text: "En enda sorts cookie, och bara om du tackat ja i bannern: Google Analytics, som ger mig anonym statistik över vilka sidor som besöks och hur besökare hittar hit. IP-adresser anonymiseras. Tackar du nej sätts ingen cookie alls och ingenting laddas.",
  },
  {
    rubrik: "Vad används statistiken till?",
    text: "Till att förstå vad på sajten som är till nytta: vilka sidor som läses, var besökare tappar intresset och vilka vägar som leder till kontakt. Den säljs inte, delas inte och kopplas aldrig till dig som person.",
  },
  {
    rubrik: "Formulären då?",
    text: "Uppgifter du lämnar i boknings-, kontakt- eller prisformulären (namn, e-post och det du skriver) går via Netlify Forms direkt till mig och används enbart för att svara dig. De läggs inte i nyhetsbrevslistor och delas inte vidare.",
  },
  {
    rubrik: "Dina rättigheter",
    text: "Du kan när som helst begära att få veta vilka uppgifter jag har om dig, få dem rättade eller raderade. Mejla mig så ordnar jag det.",
  },
];

function Page() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main>
        <PageHero
          eyebrow="Integritet & cookies"
          title={
            <>
              Ditt besök, <span className="text-brand-green">dina villkor</span>.
            </>
          }
          intro="Kort och ärligt om vad sajten sparar, varför, och hur du ändrar dig. Ingen juridisk dimma."
        />

        <section className="border-b border-line bg-white">
          <div className="mx-auto max-w-3xl px-6 py-20 md:py-28 space-y-12">
            {block.map((b, i) => (
              <Reveal key={b.rubrik} delay={i * 90}>
                <div className="border-l-2 border-brand-green pl-5">
                  <h2 className="display-heading text-xl md:text-2xl mb-3">{b.rubrik}</h2>
                  <p className="text-ink/75 leading-relaxed">{b.text}</p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={380}>
              <div className="bg-paper border border-line p-5 md:p-8">
                <h2 className="display-heading text-xl mb-3">Ändra ditt cookieval</h2>
                <p className="text-sm text-ink/70 leading-relaxed mb-6">
                  Ditt val sparas i din webbläsare. Klicka nedan för att öppna
                  bannern igen och välja om. Ångrar du ett ja stängs
                  spårningen av direkt och statistikcookien rensas.
                </p>
                <button
                  type="button"
                  onClick={oppnaCookieBanner}
                  className="inline-flex items-center gap-2 bg-ink text-paper px-5 py-3 text-sm font-semibold hover:bg-brand-green transition-colors"
                >
                  Öppna cookieinställningarna
                </button>
                <p className="mt-8 pt-6 border-t border-line text-sm text-ink/70">
                  Frågor om integritet? Mejla{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-semibold border-b-2 border-brand-green pb-0.5 hover:text-brand-green"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
