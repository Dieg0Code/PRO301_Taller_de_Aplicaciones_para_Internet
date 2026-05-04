import Image from "next/image";

const tiles = [
  { src: "/images/gallery-02-back-bw.jpg", title: "Espalda · blackwork", h: "row-span-2" },
  { src: "/images/gallery-01-neck-bw.jpg", title: "Cuello · ornamental", h: "" },
  { src: "/images/gallery-04-process.jpg", title: "Antebrazo · proceso", h: "" },
  { src: "/images/gallery-03-detailed.jpg", title: "Pecho · detalle", h: "row-span-2" },
  { src: "/images/gallery-05-arm-studio.jpg", title: "Brazo · studio", h: "" },
  { src: "/images/gallery-06-session.jpg", title: "Sesión · noche", h: "" },
  { src: "/images/gallery-07-closeup.jpg", title: "Línea · close-up", h: "" },
];

export default function Gallery() {
  return (
    <section id="galeria" className="relative bg-ink-black py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.32em] text-accent-red">Galería</span>
            <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
              Una muestra del trabajo del studio.
            </h2>
          </div>
          <p className="max-w-md text-ink-mute">
            Cada pieza nace de una conversación con el cliente. Esto es referencia visual, no catálogo cerrado.
          </p>
        </div>
        <div className="grid auto-rows-[200px] grid-cols-2 gap-3 md:grid-cols-4">
          {tiles.map((t, i) => (
            <figure
              key={i}
              className={`reveal group relative overflow-hidden rounded-2xl border border-white/5 ${t.h}`}
            >
              <Image
                src={t.src}
                alt={t.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_55%,rgba(10,10,11,0.92)_100%)]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-ink-black/0 transition group-hover:bg-ink-black/15"
              />
              <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-ink-bone/90">
                <span>{t.title}</span>
                <span className="rounded-full border border-white/30 bg-black/40 px-2 py-0.5 backdrop-blur">
                  IPS
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
