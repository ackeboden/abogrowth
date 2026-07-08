import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useId, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "./Logo";

export const CONTACT_EMAIL = "alexander@aboconsult.se";

export const BOOKING_HREF =
  `mailto:${CONTACT_EMAIL}?subject=Boka%20ett%20samtal%20med%20ABO%20Growth&body=Hej%20Alexander%2C%0A%0AVi%20vill%20g%C3%A4rna%20boka%20ett%20f%C3%B6rsta%20samtal.%0A%0AKort%20om%20oss%3A%0AVad%20vi%20vill%20uppn%C3%A5%3A%0AF%C3%B6rslag%20p%C3%A5%20tider%3A%0A%0ATack%21`;

const NAV_LINKS = [
  { label: "Tjänster", to: "/", hash: "tjanster" },
  { label: "Case", to: "/case" },
  { label: "Arbetssätt", to: "/", hash: "arbetssatt" },
  { label: "Om", to: "/om" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  // Stäng mobilmenyn vid navigering och lås bakgrundsscroll när den är öppen.
  useEffect(() => setOpen(false), [location.href]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-paper/85 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link to="/"><Logo /></Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              hash={"hash" in l ? l.hash : undefined}
              className="hover:text-brand-green transition-colors"
              activeProps={l.to !== "/" ? { className: "text-brand-green" } : undefined}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={BOOKING_HREF}
            className="inline-flex items-center gap-1.5 bg-ink text-paper px-4 py-2 hover:bg-brand-green transition-colors font-semibold"
          >
            Boka ett samtal <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </a>
        </nav>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobilmeny"
          aria-label={open ? "Stäng menyn" : "Öppna menyn"}
          className="md:hidden inline-flex items-center justify-center h-10 w-10 -mr-2 text-ink hover:text-brand-green transition-colors"
        >
          {open ? <X className="h-6 w-6" strokeWidth={2} /> : <Menu className="h-6 w-6" strokeWidth={2} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobilmeny"
          className="md:hidden absolute inset-x-0 top-16 h-[calc(100vh-4rem)] bg-paper border-t border-line px-6 py-8 flex flex-col gap-1 overflow-y-auto"
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              hash={"hash" in l ? l.hash : undefined}
              onClick={() => setOpen(false)}
              className="py-4 text-lg font-semibold border-b border-line hover:text-brand-green transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={BOOKING_HREF}
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex items-center justify-center gap-2 bg-ink text-paper px-6 py-4 text-sm font-semibold hover:bg-brand-green transition-colors"
          >
            Boka ett samtal <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-paper/70">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <Logo inverted />
          <p className="mt-4 text-sm text-paper/60 max-w-xs">
            Affärsutveckling och tillväxt — levererat strukturerat från Stockholm.
          </p>
        </div>
        <div>
          <div className="tracked text-[10px] text-brand-green mb-3">Sidor</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/tjanster/affarsutveckling" className="hover:text-paper">Affärsutveckling</Link></li>
            <li><Link to="/tjanster/optimerade-kampanjer" className="hover:text-paper">Optimerade kampanjer</Link></li>
            <li><Link to="/tjanster/digitala-system-ai" className="hover:text-paper">Digitala system & AI</Link></li>
            <li><Link to="/case" className="hover:text-paper">Case</Link></li>
            <li><Link to="/om" className="hover:text-paper">Om</Link></li>
            <li><Link to="/" hash="kontakt" className="hover:text-paper">Kontakt</Link></li>
          </ul>
        </div>
        <div>
          <div className="tracked text-[10px] text-brand-green mb-3">Kontakt</div>
          <ul className="space-y-2 text-sm">
            <li><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-paper">{CONTACT_EMAIL}</a></li>
            <li>Stockholm, Sverige</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="mx-auto max-w-6xl px-6 py-6 text-xs tracked text-paper/50">
          ABO Growth · Stockholm · {CONTACT_EMAIL} · © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}

export function BookingCTA({
  title = "Redo att växa?",
  body = "Boka ett kort första samtal. Vi lyssnar, ställer frågor och föreslår ett upplägg.",
}: { title?: string; body?: string }) {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-8">
          <div className="eyebrow mb-4 text-brand-green">Boka samtal</div>
          <h2 className="display-heading text-3xl md:text-5xl text-paper">{title}</h2>
          <p className="mt-5 text-paper/70 max-w-xl leading-relaxed">{body}</p>
        </div>
        <div className="md:col-span-4 md:text-right">
          <a
            href={BOOKING_HREF}
            className="inline-flex items-center gap-2 bg-brand-green text-paper px-6 py-4 text-sm font-semibold hover:bg-paper hover:text-ink transition-colors"
          >
            Boka ett samtal <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
          <div className="mt-3 text-xs text-paper/50">Svar inom ett dygn.</div>
        </div>
      </div>
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
}) {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-20 md:pt-28 md:pb-28">
        <div className="eyebrow mb-6">{eyebrow}</div>
        <h1 className="display-heading text-[40px] leading-[1.05] md:text-[68px] max-w-4xl">{title}</h1>
        <p className="mt-8 max-w-2xl text-lg text-ink/75 leading-relaxed">{intro}</p>
      </div>
    </section>
  );
}

/**
 * GrowthLine — signaturdetalj.
 * En tunn grön linje som "stiger" genom sidan som en subtil tillväxtkurva.
 * Absolut positionerad — placera i ett `relative` föräldrar-element.
 * Respekterar prefers-reduced-motion (ingen animation renderas i CSS).
 */
export function GrowthLine({
  className = "",
  variant = "hero",
}: {
  className?: string;
  variant?: "hero" | "full";
}) {
  // Gradient som tonar ut linjen till vänster så den aldrig stör texten,
  // och låter den framträda till höger där ytan är fri.
  const gradientId = useId();
  if (variant === "hero") {
    return (
      <svg
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#1F8A5C" stopOpacity="0" />
            <stop offset="0.45" stopColor="#1F8A5C" stopOpacity="0.08" />
            <stop offset="0.72" stopColor="#1F8A5C" stopOpacity="0.4" />
            <stop offset="1" stopColor="#1F8A5C" stopOpacity="0.75" />
          </linearGradient>
        </defs>
        <path
          className="growth-line-path"
          style={{ ["--growth-line-length" as string]: "1600" }}
          d="M0,520 C220,510 320,480 460,420 C600,360 700,300 820,220 C940,140 1060,90 1200,60"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.25"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <circle className="growth-line-dot" cx="1200" cy="60" r="3.5" fill="#1F8A5C" />
      </svg>
    );
  }
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1F8A5C" stopOpacity="0" />
          <stop offset="0.5" stopColor="#1F8A5C" stopOpacity="0.06" />
          <stop offset="1" stopColor="#1F8A5C" stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <path
        className="growth-line-path"
        style={{ ["--growth-line-length" as string]: "180" }}
        d="M0,90 C15,88 25,82 40,70 C55,58 70,44 85,28 C92,20 96,14 100,10"
        stroke={`url(#${gradientId})`}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
