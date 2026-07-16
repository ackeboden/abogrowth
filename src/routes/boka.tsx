import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { Header, Footer, PageHero, CONTACT_EMAIL } from "@/components/Site";

export const Route = createFileRoute("/boka")({
  head: () => ({
    meta: [
      { title: "Boka ett samtal | ABO Growth" },
      {
        name: "description",
        content:
          "Boka ett kort första samtal med ABO Growth. Kostnadsfritt och utan förpliktelser. Vi svarar inom ett dygn.",
      },
      { property: "og:title", content: "Boka ett samtal | ABO Growth" },
      { property: "og:description", content: "Boka ett kort första samtal. Kostnadsfritt, svar inom ett dygn." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://abogrowth.se/boka" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://abogrowth.se/boka" }],
  }),
  component: Page,
});

const loften = [
  "Kostnadsfritt och utan förpliktelser",
  "Vi svarar inom ett dygn",
  "Inget säljmanus – vi lyssnar först",
];

function encodeForm(data: Record<string, string>) {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    .join("&");
}

function BookingForm() {
  const [form, setForm] = useState({ namn: "", epost: "", foretag: "", telefon: "", meddelande: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.epost.trim());
  const canSubmit = form.namn.trim().length > 1 && emailOk && status !== "sending";

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("sending");
    try {
      // Posta till den statiska filen, inte till "/": på den serverrenderade
      // sajten ägs "/" av serverfunktionen som slukar POST:en innan Netlify
      // Forms hinner fånga den.
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeForm({ "form-name": "boka-samtal", "bot-field": "", ...form }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="bg-white border border-line p-8 md:p-10 shadow-sm">
        <div className="w-10 h-10 flex items-center justify-center bg-brand-green text-paper mb-6">
          <Check className="h-5 w-5" strokeWidth={2.5} />
        </div>
        <h2 className="display-heading text-2xl mb-3">Tack {form.namn.trim().split(" ")[0]}!</h2>
        <p className="text-ink/75 leading-relaxed">
          Er förfrågan är skickad. Vi hör av oss på {form.epost.trim()} inom ett dygn med förslag på tider.
        </p>
        <div className="mt-8">
          <Link to="/" className="text-sm text-subtle hover:text-ink">← Tillbaka till startsidan</Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-white border border-line p-8 md:p-10 shadow-sm space-y-5">
      <Field label="Namn" name="namn" value={form.namn} onChange={set("namn")} required />
      <Field label="E-post" name="epost" type="email" value={form.epost} onChange={set("epost")} required />
      <Field label="Företag (valfritt)" name="foretag" value={form.foretag} onChange={set("foretag")} />
      <Field label="Telefon (valfritt)" name="telefon" type="tel" value={form.telefon} onChange={set("telefon")} />
      <div>
        <label htmlFor="meddelande" className="tracked text-[10px] text-subtle block mb-2">
          Vad vill ni prata om? (valfritt)
        </label>
        <textarea
          id="meddelande"
          name="meddelande"
          rows={4}
          value={form.meddelande}
          onChange={set("meddelande")}
          className="w-full bg-paper border border-line px-4 py-3 text-base md:text-sm focus:outline-none focus:border-brand-green"
          placeholder="Kort om er och vad ni vill uppnå."
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
        disabled={!canSubmit}
        className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3.5 text-sm font-semibold hover:bg-brand-green transition-colors disabled:bg-subtle disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Skickar…" : "Boka samtal"}
        <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
      </button>
      <p className="text-xs text-subtle">
        Vi svarar inom ett dygn. Går även bra att mejla direkt till {CONTACT_EMAIL}.
      </p>
    </form>
  );
}

function Field({
  label, name, type = "text", required, value, onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
        onChange={onChange}
        className="w-full bg-paper border border-line px-4 py-3 text-base md:text-sm focus:outline-none focus:border-brand-green"
      />
    </div>
  );
}

function Page() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main>
        <PageHero
          eyebrow="Boka ett samtal"
          title={<>Låt oss <span className="text-brand-green">ta ett första samtal</span>.</>}
          intro="Fyll i formuläret så hör vi av oss inom ett dygn med förslag på tider. Ett kort samtal där vi lyssnar, ställer frågor och ser om vi kan hjälpa till."
        />

        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20 grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5">
              <div className="eyebrow mb-5">Vad ni kan förvänta er</div>
              <ul className="space-y-4">
                {loften.map((l) => (
                  <li key={l} className="flex items-start gap-3 text-sm text-ink/80">
                    <Check className="h-4 w-4 mt-0.5 shrink-0 text-brand-green" strokeWidth={2.5} />
                    {l}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-ink/60 leading-relaxed">
                Vill ni veta exakt hur ett samtal går till?{" "}
                <Link to="/sa-gar-det-till" className="font-semibold border-b-2 border-brand-green pb-0.5 hover:text-brand-green">
                  Så går det till
                </Link>
              </p>
            </div>
            <div className="md:col-span-7">
              <BookingForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
