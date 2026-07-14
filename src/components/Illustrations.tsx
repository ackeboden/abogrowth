/**
 * Original, licensfria illustrationer i varumärkets stil: tunna ink-linjer,
 * gröna accenter, geometriskt och avskalat. Ritade för hand för den här
 * sajten, inga externa bildkällor och därmed inga licensvillkor.
 * Dekorativa: rendera alltid med aria-hidden.
 */

const INK = "#1A1D1F";
const GREEN = "#1F8A5C";

/** Kompass med nålen mot nordost: riktning före rörelse. Om-sidan. */
export function IllustrationKompass({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 220 170"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bakgrundsrutnät */}
      <path d="M20 140 H200 M20 105 H200 M20 70 H200" stroke={INK} strokeOpacity="0.06" strokeWidth="1" />
      {/* Kompassens ringar */}
      <circle cx="110" cy="85" r="58" stroke={INK} strokeOpacity="0.2" strokeWidth="1.5" />
      <circle cx="110" cy="85" r="46" stroke={INK} strokeOpacity="0.1" strokeWidth="1" />
      {/* Gradstreck */}
      <path d="M110 27 v8 M110 135 v8 M52 85 h8 M160 85 h8" stroke={INK} strokeOpacity="0.35" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M69 44 l5.5 5.5 M145.5 120.5 l5.5 5.5 M69 126 l5.5 -5.5 M145.5 49.5 l5.5 -5.5" stroke={INK} strokeOpacity="0.15" strokeWidth="1.5" strokeLinecap="round" />
      {/* Nålen: grön halva mot nordost, ink-skugga mot sydväst */}
      <path d="M110 85 L138 57 L118 77 Z" fill={GREEN} />
      <path d="M110 85 L82 113 L102 93 Z" fill={INK} fillOpacity="0.25" />
      <circle cx="110" cy="85" r="4" fill={INK} />
      <circle cx="110" cy="85" r="1.5" fill="#FAF9F7" />
      {/* Målpunkten utanför kompassen */}
      <circle cx="182" cy="30" r="4" fill={GREEN} fillOpacity="0.2" />
      <circle cx="182" cy="30" r="2" fill={GREEN} />
      <path d="M144 51 C 156 44, 166 38, 176 33" stroke={GREEN} strokeOpacity="0.45" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 5" />
    </svg>
  );
}

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
