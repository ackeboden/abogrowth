/**
 * Monogrammet ur den grafiska profilen (september 2026): ett geometriskt A
 * ritat som en konturtriangel med skarp spets, plus en grön tvärslå med
 * snedskurna ändar som lutar uppåt och sticker ut åt höger. Tvärslån bär
 * profilens rörelse framåt.
 *
 * Måtten är hämtade ur profilens egna vektorer och ska inte justeras på
 * fri hand: triangeln är 37,5 bred och 51 hög med linjetjocklek 12, och
 * tvärslån går från y 38,2 upp till y 28,5 och slutar 10,5 utanför det
 * högra benet. Spetsen är en miter-fog, vilket är varför viewBox börjar
 * ovanför nollan: fogen sticker upp 17,5 enheter över triangelns topp.
 *
 * A:t ärver textfärgen (Ink på ljus botten, Paper på mörk) enligt
 * profilens inverteringsregel. Tvärslån är alltid grön.
 */
export function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-6 -18 55 72" fill="none" aria-hidden="true" className={className}>
      <path
        d="M 0 51 L 18.7 0 L 37.5 51"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
      />
      <path d="M 6 38.2 H 41.2 L 48 28.5 H 12.7 Z" fill="var(--brand-green)" />
    </svg>
  );
}

/**
 * Logotypen: monogrammet följt av ordmärket. "ABO" är den tunga primära
 * delen i Ink eller Paper, "GROWTH" mindre och grön med bokstavsavstånd,
 * på samma baslinje. Inga skuggor, gradienter eller ändrade proportioner.
 */
export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <div
      className={`inline-flex items-center gap-2.5 leading-none select-none ${
        inverted ? "text-paper" : "text-ink"
      }`}
    >
      <Monogram className="h-8 w-auto shrink-0" />
      <span className="flex items-baseline gap-1.5">
        <span className="font-bold text-xl tracked-tight">ABO</span>
        <span className="text-brand-green font-bold text-[10px] tracked">GROWTH</span>
      </span>
    </div>
  );
}
