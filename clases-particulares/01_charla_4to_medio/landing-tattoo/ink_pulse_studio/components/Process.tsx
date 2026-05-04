const steps = [
  { n: "01", title: "Eliges artista", body: "Revisas el catálogo y eliges con quién quieres trabajar." },
  { n: "02", title: "Eliges estilo", body: "Defines el lenguaje visual: fine line, blackwork, tradicional…" },
  { n: "03", title: "Cuentas tu idea", body: "En el formulario describes la pieza, zona y referencias." },
  { n: "04", title: "Revisamos", body: "El equipo evalúa la solicitud y propone una primera dirección." },
  { n: "05", title: "Coordinamos", body: "Cerramos fecha, presupuesto y agendamos la sesión." },
];

export default function Process() {
  return (
    <section id="proceso" className="relative bg-ink-graphite py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mb-14 flex flex-col items-start gap-3">
          <span className="text-xs uppercase tracking-[0.32em] text-accent-red">Proceso</span>
          <h2 className="max-w-3xl font-display text-4xl tracking-tight md:text-5xl">
            Cinco pasos. Sin ruido.
          </h2>
        </div>
        <div className="relative grid gap-4 md:grid-cols-5">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent md:block"
          />
          {steps.map((s) => (
            <article
              key={s.n}
              className="reveal relative flex flex-col gap-3 rounded-2xl border border-white/5 bg-ink-smoke/60 p-6 backdrop-blur"
            >
              <span className="font-display text-3xl text-accent-red">{s.n}</span>
              <h3 className="font-display text-xl tracking-tight text-ink-bone">{s.title}</h3>
              <p className="text-sm text-ink-mute">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
