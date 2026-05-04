type MarqueeProps = { supers: string[] };

export default function Marquee({ supers }: MarqueeProps) {
  return (
    <section className="border-b border-gray-100 bg-white py-3">
      <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-hidden px-4 md:px-6">
        <span className="hidden flex-none text-xs font-medium uppercase tracking-wider text-gray-400 md:inline">
          Comparando
        </span>
        <div className="flex flex-1 items-center gap-6 overflow-hidden">
          <div className="flex w-max animate-ticker gap-8 whitespace-nowrap text-sm font-medium text-gray-700">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex items-center gap-8 pr-8">
                {supers.map((s, i) => (
                  <span key={`${k}-${i}`} className="flex items-center gap-8">
                    <span>{s}</span>
                    <span aria-hidden className="h-1 w-1 rounded-full bg-brand" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
