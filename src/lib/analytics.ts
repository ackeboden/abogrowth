// Google Analytics 4, GDPR-gated: ingenting laddas och inga cookies sätts
// förrän besökaren tackat ja i cookiebannern. Avvisar man laddas GA aldrig.
//
// MÄT-ID: klistra in Alexanders GA4-id (formen G-XXXXXXXXXX) nedan.
// Tomt id = GA helt avstängt; bannern fungerar ändå och sparar valet,
// så statistiken börjar rulla automatiskt när id:t är på plats.
export const GA_MATID: string = "G-RP7EH6ZJWX";

const NYCKEL = "cookie-samtycke";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type Samtycke = "ja" | "nej" | null;

// Ett ja gäller tills besökaren ändrar det. Ett nej gäller i 30 dagar,
// sedan ställs frågan igen vid nästa besök (upplyst på /integritet;
// omfrågning efter månader är ok enligt praxis, tjat inom besöket inte).
const NEJ_GILTIGT_MS = 30 * 24 * 60 * 60 * 1000;

export function hamtaSamtycke(): Samtycke {
  if (typeof window === "undefined") return null;
  try {
    const rad = window.localStorage.getItem(NYCKEL);
    if (!rad) return null;
    // Äldre format: bara "ja"/"nej" utan tidsstämpel. Migrera nej till
    // dagens datum så 30-dagarsklockan börjar ticka därifrån.
    if (rad === "ja") return "ja";
    if (rad === "nej") {
      sparaVal("nej");
      return "nej";
    }
    const { v, t } = JSON.parse(rad) as { v?: string; t?: number };
    if (v === "ja") return "ja";
    if (v === "nej") {
      if (typeof t === "number" && Date.now() - t > NEJ_GILTIGT_MS) {
        window.localStorage.removeItem(NYCKEL);
        return null; // nejet har löpt ut: fråga igen
      }
      return "nej";
    }
    return null;
  } catch {
    return null;
  }
}

function sparaVal(val: "ja" | "nej") {
  try {
    window.localStorage.setItem(NYCKEL, JSON.stringify({ v: val, t: Date.now() }));
  } catch {
    /* privat läge utan lagring: valet gäller ändå för sessionen */
  }
}

export function sparaSamtycke(val: "ja" | "nej") {
  sparaVal(val);
  if (val === "ja") {
    laddaAnalytics();
  } else {
    stangAvAnalytics();
  }
}

let laddad = false;

export function laddaAnalytics() {
  if (laddad || !GA_MATID || typeof window === "undefined") return;
  laddad = true;
  // @ts-expect-error ga-disable är Googles egen avstängningsflagga
  window[`ga-disable-${GA_MATID}`] = false;
  window.dataLayer = window.dataLayer || [];
  // OBS: gtag.js behandlar BARA äkta arguments-objekt i dataLayer som
  // kommandon; en vanlig array (t.ex. via rest-parametrar) ignoreras tyst
  // och då når ingenting Google trots att allt ser rätt ut lokalt.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MATID, { anonymize_ip: true });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MATID}`;
  document.head.appendChild(s);
}

// Ångrat ja: stäng av spårningen direkt och rensa GA-cookies så gott det går.
function stangAvAnalytics() {
  if (!GA_MATID || typeof window === "undefined") return;
  // @ts-expect-error ga-disable är Googles egen avstängningsflagga
  window[`ga-disable-${GA_MATID}`] = true;
  const domaner = [location.hostname, `.${location.hostname}`];
  for (const namn of ["_ga", `_ga_${GA_MATID.replace("G-", "")}`]) {
    for (const d of domaner) {
      document.cookie = `${namn}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${d}`;
    }
    document.cookie = `${namn}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
}

// Sidvisning vid SPA-navigering (första sidan skickas av config-anropet)
export function skickaSidvisning(sokvag: string) {
  if (!laddad || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: sokvag,
    page_location: window.location.href,
    page_title: document.title,
  });
}

// Egen händelse (t.ex. Systemkollens tratt). Samma samtyckesgrind som
// sidvisningarna: utan ja är GA aldrig laddat och anropet blir en no-op.
// Skicka aldrig personuppgifter i parametrarna, bara antal och lägen.
export function skickaHandelse(namn: string, params?: Record<string, string | number>) {
  if (!laddad || !window.gtag) return;
  window.gtag("event", namn, params);
}
