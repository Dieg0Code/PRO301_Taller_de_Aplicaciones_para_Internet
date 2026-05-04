const props = [
  {
    kicker: "01",
    title: "Diseño personalizado",
    body: "Cada tatuaje parte desde tu idea. Conversamos referencias, ajustamos el diseño y solo avanzamos cuando te calza.",
  },
  {
    kicker: "02",
    title: "Artistas especializados",
    body: "Cada artista tiene una técnica madura. Eliges con quién quieres trabajar antes de reservar.",
  },
  {
    kicker: "03",
    title: "Reserva sin vueltas",
    body: "Completas el formulario, revisamos tu solicitud y coordinamos fecha. Sin llamadas innecesarias.",
  },
];

export default function ValueProps() {
  return (
    <section className="relative bg-ink-black py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mb-14 flex flex-col items-start gap-3">
          <span className="text-xs uppercase tracking-[0.32em] text-accent-red">Por qué Ink Pulse</span>
          <h2 className="max-w-3xl font-display text-4xl tracking-tight text-ink-bone md:text-5xl">
            No vendemos tatuajes. Acompañamos un proceso.
          </h2>
        </div>
        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/5 bg-white/5 md:grid-cols-3">
          {props.map((p) => (
            <article
              key={p.kicker}
              className="reveal flex flex-col gap-4 bg-ink-graphite p-8 transition hover:bg-ink-smoke md:p-10"
            >
              <span className="font-display text-5xl text-accent-red/80">{p.kicker}</span>
              <h3 className="font-display text-2xl tracking-tight text-ink-bone md:text-3xl">{p.title}</h3>
              <p className="text-ink-mute">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
