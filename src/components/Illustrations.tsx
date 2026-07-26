/**
 * Original, licensfria illustrationer i varumärkets stil: tunna ink-linjer,
 * gröna accenter, geometriskt och avskalat. Ritade för hand för den här
 * sajten, inga externa bildkällor och därmed inga licensvillkor.
 * Dekorativa: rendera alltid med aria-hidden.
 */

const INK = "#1A1D1F";
const GREEN = "#1F8A5C";

/** Två samtalsbubblor: er berättelse och vårt svar. Så går det till-sidan. */
export function IllustrationSamtal({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 220 170"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Kundens bubbla med textrader */}
      <rect x="22" y="26" width="118" height="72" rx="10" stroke={INK} strokeOpacity="0.3" strokeWidth="1.5" fill="#FFFFFF" />
      <path d="M46 98 L40 114 L62 98" stroke={INK} strokeOpacity="0.3" strokeWidth="1.5" fill="#FFFFFF" strokeLinejoin="round" />
      <path d="M40 48 H122 M40 62 H106 M40 76 H92" stroke={INK} strokeOpacity="0.25" strokeWidth="3" strokeLinecap="round" />
      {/* Vårt svar: grön bubbla med tre punkter */}
      <rect x="106" y="84" width="92" height="56" rx="10" fill={GREEN} />
      <path d="M172 140 L180 154 L156 140" fill={GREEN} />
      <circle cx="136" cy="112" r="4" fill="#FAF9F7" />
      <circle cx="152" cy="112" r="4" fill="#FAF9F7" fillOpacity="0.7" />
      <circle cx="168" cy="112" r="4" fill="#FAF9F7" fillOpacity="0.4" />
      {/* Liten tidsmarkör: svar inom ett dygn */}
      <circle cx="196" cy="38" r="14" stroke={INK} strokeOpacity="0.2" strokeWidth="1.5" />
      <path d="M196 30 V38 L202 42" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Staplar på väg upp med trendlinje. Case-sidans tomläge. */
export function IllustrationDiagram({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 220 170"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Baslinje och axel */}
      <path d="M30 140 H196" stroke={INK} strokeOpacity="0.25" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M30 140 V34" stroke={INK} strokeOpacity="0.1" strokeWidth="1" />
      {/* Staplar */}
      <rect x="48" y="108" width="22" height="32" rx="2" fill={INK} fillOpacity="0.12" />
      <rect x="82" y="92" width="22" height="48" rx="2" fill={INK} fillOpacity="0.2" />
      <rect x="116" y="72" width="22" height="68" rx="2" fill={GREEN} fillOpacity="0.35" />
      <rect x="150" y="48" width="22" height="92" rx="2" fill={GREEN} />
      {/* Trendlinje med målpunkt */}
      <path d="M46 116 C 84 104, 116 88, 152 58 C 162 50, 172 44, 182 39" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
      <circle cx="186" cy="37" r="4" fill={GREEN} fillOpacity="0.2" />
      <circle cx="186" cy="37" r="2" fill={GREEN} />
    </svg>
  );
}
