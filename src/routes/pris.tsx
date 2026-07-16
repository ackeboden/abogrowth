import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Header, Footer, PageHero } from "@/components/Site";

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

/**
 * PriceEmbed — bäddar in det fristående prisverktyget (public/prisberakning.html)
 * i en ramlös, responsiv iframe. Iframen är samma origin, så föräldern mäter
 * innehållshöjden direkt och observerar den med en ResizeObserver — då växer/
 * krymper iframen med panelerna utan egen scrollbar och utan att bero på
 * postMessage-timing. postMessage från verktyget används som backup (t.ex. om
 * det någon gång skulle serveras cross-origin). min-height-fallback via state.
 */
function PriceEmbed() {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(760);

  useEffect(() => {
    const iframe = ref.current;
    if (!iframe) return;
    const apply = (h: number) => setHeight(Math.max(320, Math.ceil(h)));

    // Primärt: mät samma-origin-dokumentet direkt och följ storleksändringar.
    let ro: ResizeObserver | undefined;
    const measure = () => {
      try {
        const doc = iframe.contentDocument;
        if (doc?.documentElement) apply(doc.documentElement.getBoundingClientRect().height);
      } catch {
        /* cross-origin: förlita oss på postMessage-backupen nedan */
      }
    };
    const onLoad = () => {
      measure();
      try {
        const body = iframe.contentDocument?.body;
        if (body && "ResizeObserver" in window) {
          ro = new ResizeObserver(measure);
          ro.observe(body);
        }
      } catch {
        /* ignorera */
      }
    };
    iframe.addEventListener("load", onLoad);
    if (iframe.contentDocument?.readyState === "complete") onLoad();

    // Backup: verktygets egna höjdmeddelanden.
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      if (e.source !== iframe.contentWindow) return;
      const data = e.data as { type?: string; height?: number } | null;
      if (data?.type === "abogrowth-pris-height" && typeof data.height === "number") apply(data.height);
    };
    window.addEventListener("message", onMessage);

    return () => {
      iframe.removeEventListener("load", onLoad);
      window.removeEventListener("message", onMessage);
      ro?.disconnect();
    };
  }, []);

  return (
    <iframe
      ref={ref}
      src="/prisberakning.html"
      title="Prisuppskattningsverktyg"
      loading="lazy"
      className="block w-full border-0"
      style={{ height }}
    />
  );
}

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
