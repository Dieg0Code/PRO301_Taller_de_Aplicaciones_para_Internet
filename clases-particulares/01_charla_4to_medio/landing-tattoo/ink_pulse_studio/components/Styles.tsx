const styles = [
  {
    name: "Fine line",
    desc: "Trazos finos, detalle alto, ideal para piezas pequeñas.",
    bg: "from-rose-500/30 via-amber-200/20 to-transparent",
  },
  {
    name: "Blackwork",
    desc: "Negro denso. Geometría, simbolismo, fuerza visual.",
    bg: "from-zinc-700/50 via-zinc-900 to-transparent",
  },
  {
    name: "Tradicional",
    desc: "Líneas gruesas, color saturado, iconografía clásica.",
    bg: "from-red-700/40 via-orange-400/20 to-transparent",
  },
  {
    name: "Minimalista",
    desc: "Lo justo. Símbolos limpios y micro-tatuajes.",
    bg: "from-violet-500/30 via-indigo-300/15 to-transparent",
  },
  {
    name: "Lettering",
    desc: "Tipografía como protagonista, frases y nombres con carácter.",
    bg: "from-cyan-500/25 via-sky-200/15 to-transparent",
  },
  {
    name: "Geométrico",
    desc: "Formas, simetría, ornamentos. Equilibrio matemático.",
    bg: "from-emerald-600/30 via-teal-300/15 to-transparent",
  },
];

export default function Styles() {
  return (
    <section id="estilos" className="relative bg-ink-black py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.32em] text-accent-red">Estilos</span>
            <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
              Encuentra el lenguaje que te calza.
            </h2>
          </div>
          <p className="max-w-md text-ink-mute">
            Estos son los seis estilos principales del studio. Si tu idea no está acá, igual conversemos: probablemente alguien del equipo lo trabaja.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {styles.map((s) => (
            <article
              key={s.name}
              className="reveal group relative overflow-hidden rounded-2xl border border-white/5 bg-ink-graphite p-7 transition hover:border-accent-red/40"
            >
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${s.bg} opacity-70 transition duration-500 group-hover:opacity-100`}
              />
              <div className="relative flex flex-col gap-3">
                <span className="font-display text-3xl tracking-tight text-ink-bone">{s.name}</span>
                <p className="text-sm text-ink-mute">{s.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
