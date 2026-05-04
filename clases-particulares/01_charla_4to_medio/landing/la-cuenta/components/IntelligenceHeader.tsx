import { IconSparkles } from "./Icon";

export default function IntelligenceHeader() {
  return (
    <section className="border-y-2 border-ink bg-paper-dark py-14 text-paper">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-paper/30">
              <IconSparkles size={22} />
            </span>
            <div>
              <span className="text-[11px] uppercase tracking-widest text-accent-glow">
                Inteligencia · más allá de la lista
              </span>
              <h2 className="mt-1 font-editorial text-3xl font-medium tracking-tightest md:text-5xl">
                Lo que dicen los datos.
              </h2>
            </div>
          </div>
          <p className="max-w-md text-sm text-paper/70">
            Lo que sigue son lecturas que aparecen al mirar los 34.398 precios en conjunto: ahorros más altos, una canasta básica preseleccionada y cómo se construyó todo esto.
          </p>
        </div>
      </div>
    </section>
  );
}
