// Google Analytics 4, GDPR-gated: ingenting laddas och inga cookies sätts
// förrän besökaren tackat ja i cookiebannern. Avvisar man laddas GA aldrig.
//
// MÄT-ID: klistra in Alexanders GA4-id (formen G-XXXXXXXXXX) nedan.
// Tomt id = GA helt avstängt; bannern fungerar ändå och sparar valet,
// så statistiken börjar rulla automatiskt när id:t är på plats.
export const GA_MATID = "";

const NYCKEL = "cookie-samtycke";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type Samtycke = "ja" | "nej" | null;

export function hamtaSamtycke(): Samtycke {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(NYCKEL);
    return v === "ja" || v === "nej" ? v : null;
  } catch {
    return null;
  }
}

export function sparaSamtycke(val: "ja" | "nej") {
  try {
    window.localStorage.setItem(NYCKEL, val);
  } catch {
    /* privat läge utan lagring: valet gäller ändå för sessionen */
  }
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
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
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
