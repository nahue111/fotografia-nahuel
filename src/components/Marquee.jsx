const TEXT = 'NEXT PHOTOGRAPH · MONTEVIDEO · EVENTOS · MASCOTAS · PAISAJES · MODELAJE · '

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-[rgba(0,0,0,0.06)] py-4 bg-[#F7F5F0]">
      <div className="flex whitespace-nowrap animate-marquee">
        {[TEXT, TEXT].map((t, i) => (
          <span
            key={i}
            className="font-serif italic text-[11px] md:text-[13px] text-[#18180F]/25 pr-0 tracking-[0.18em] flex-shrink-0"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
