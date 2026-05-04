import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-screen overflow-hidden grain bg-ink-black"
    >
      {/* Background image — premium cyberpunk portrait */}
      <Image
        src="/images/hero-cyberpunk-tattoo.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[60%_30%] opacity-[0.55] mix-blend-luminosity md:opacity-80 md:mix-blend-normal md:object-[70%_30%]"
      />
      {/* Color grading + gradient masks for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(230,57,70,0.32),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(20,40,80,0.5),_transparent_60%)] mix-blend-screen"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,11,0.95)_0%,rgba(10,10,11,0.7)_45%,rgba(10,10,11,0.15)_75%,rgba(10,10,11,0.05)_100%)] md:bg-[linear-gradient(90deg,rgba(10,10,11,0.92)_0%,rgba(10,10,11,0.55)_45%,rgba(10,10,11,0.1)_70%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-ink-black"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-16 px-6 pb-24 pt-40 lg:pt-48">
        <div className="flex flex-col gap-8 lg:max-w-3xl">
          <span className="inline-flex w-fit items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.32em] text-ink-bone/85 backdrop-blur">
            <span className="h-1.5 w-1.5 animate-glow rounded-full bg-accent-red" />
            Studio en Santiago · reservas abiertas
          </span>
          <h1 className="font-display text-[clamp(3.2rem,8vw,7.5rem)] leading-[0.92] tracking-tight text-ink-bone drop-shadow-[0_4px_28px_rgba(0,0,0,0.6)]">
            Tatuajes que
            <br />
            <span className="bg-gradient-to-r from-accent-glow via-accent-rose to-accent-red bg-clip-text text-transparent">
              se sienten tuyos
            </span>
            <br />
            desde el primer trazo.
          </h1>
          <p className="max-w-2xl text-lg text-ink-bone/80 md:text-xl">
            Ink Pulse Studio es un equipo de artistas especializados en distintas técnicas. Diseñamos cada pieza contigo, te acompañamos en el proceso y reservas en línea sin vueltas.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#reservar"
              className="group inline-flex items-center gap-2 rounded-full bg-accent-red px-7 py-3.5 text-sm font-semibold tracking-wide text-ink-bone shadow-[0_0_60px_-8px_rgba(230,57,70,0.95)] transition hover:bg-accent-rose"
            >
              Reservar hora
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <a
              href="#artistas"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/30 px-7 py-3.5 text-sm font-semibold tracking-wide text-ink-bone backdrop-blur transition hover:border-white/50 hover:bg-black/50"
            >
              Ver artistas
            </a>
          </div>
        </div>

        {/* Vital stats strip */}
        <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-10 lg:grid-cols-4">
          {[
            ["6", "Artistas residentes"],
            ["12", "Estilos cubiertos"],
            ["48 h", "Respuesta promedio"],
            ["100%", "Diseños personalizados"],
          ].map(([val, label]) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="font-display text-4xl text-ink-bone drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">{val}</span>
              <span className="text-xs uppercase tracking-[0.22em] text-ink-bone/70">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee strip */}
      <div className="relative overflow-hidden border-y border-white/10 bg-ink-graphite/85 py-5 backdrop-blur">
        <div className="marquee flex w-max gap-12 whitespace-nowrap font-display text-2xl uppercase tracking-[0.32em] text-ink-bone/55">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12 pr-12">
              {["Fine line", "Blackwork", "Tradicional", "Minimalista", "Lettering", "Geométrico", "Sombras", "Piezas grandes"].map((s) => (
                <span key={s + k} className="flex items-center gap-12">
                  {s}
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-red" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
