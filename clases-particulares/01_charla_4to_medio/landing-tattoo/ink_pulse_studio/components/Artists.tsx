"use client";

import Image from "next/image";
import { artists, formatCLP } from "@/lib/artists";

export default function Artists() {
  const handleSelect = (artistName: string) => {
    window.dispatchEvent(new CustomEvent("reserve-with", { detail: artistName }));
    document.getElementById("reservar")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="artistas" className="relative bg-ink-graphite py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(230,57,70,0.10),_transparent_55%)]"
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="reveal mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.32em] text-accent-red">Marketplace de artistas</span>
            <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
              Elige con quién quieres tatuarte.
            </h2>
          </div>
          <p className="max-w-md text-ink-mute">
            Cada artista trabaja un lenguaje distinto. Reserva con quien sientas más cerca de la idea que tienes en la cabeza.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {artists.map((a) => (
            <article
              key={a.id}
              className="reveal group relative flex flex-col gap-5 overflow-hidden rounded-3xl border border-white/5 bg-ink-smoke/60 p-6 backdrop-blur transition hover:border-accent-red/40"
            >
              {/* Portrait */}
              <div className="relative h-72 w-full overflow-hidden rounded-2xl">
                <Image
                  src={a.photo}
                  alt={`${a.name} — ${a.specialty}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-tr ${a.accent} opacity-30 mix-blend-overlay`}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_45%,rgba(10,10,11,0.85)_100%)]"
                />
                <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-ink-bone backdrop-blur">
                  · activo
                </span>
                <span className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-black/40 px-3 py-1 font-display text-sm tracking-[0.22em] text-ink-bone backdrop-blur">
                  {a.initials}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-3xl tracking-tight text-ink-bone">{a.name}</h3>
                  <span className="text-xs uppercase tracking-[0.22em] text-ink-mute">{a.id}</span>
                </div>
                <span className="text-sm uppercase tracking-[0.18em] text-accent-red">{a.specialty}</span>
                <p className="text-sm text-ink-mute">{a.bio}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {a.styles.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-ink-bone/80"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/5 pt-4">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-ink-mute">Tarifa orientativa</span>
                  <span className="font-display text-xl text-ink-bone">
                    {formatCLP(a.rate)}
                    <span className="text-sm text-ink-mute"> /hora</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleSelect(a.name)}
                  className="rounded-full bg-accent-red px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-bone transition hover:bg-accent-rose"
                >
                  Reservar
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
