export function Logo({ inverted = false }: { inverted?: boolean }) {
  const wordColor = inverted ? "text-paper" : "text-ink";
  return (
    <div className="inline-flex flex-col leading-none select-none">
      <div className="flex items-baseline gap-2">
        <span className={`${wordColor} font-bold text-xl tracked-tight`}>ABO</span>
        <span className="text-brand-green font-bold text-[11px] tracked">GROWTH</span>
      </div>
      <div className="mt-1 h-px w-16 bg-brand-green" />
    </div>
  );
}
