import type { ProductGroup } from "@/lib/db";
import { formatCLP } from "@/lib/db";
import CanastaAddAll from "./CanastaAddAll";

export default function Canasta({ items }: { items: ProductGroup[] }) {
  // Compute total at cheapest combination
  const totalCheapest = items.reduce((acc, g) => acc + g.cheapest.precio, 0);
  const totalExpensive = items.reduce((acc, g) => acc + g.mostExpensive.precio, 0);
  const ahorro = totalExpensive - totalCheapest;

  return (
    <section className="relative bg-paper py-16 md:py-20">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-editorial text-3xl font-medium tracking-tightest md:text-4xl">
              Canasta básica
            </h2>
            <p className="mt-1 text-sm text-ink-soft">
              Diez productos esenciales con su mejor super y diferencia calculada.
            </p>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <CanastaAddAll items={items} />
            <div className="rule mt-6 grid gap-6 pt-6">
              <div>
                <span className="block text-[11px] uppercase tracking-widest text-ink-mute">Total eligiendo el más barato</span>
                <span className="mt-1 block font-editorial editorial-num text-3xl font-medium text-accent-mint md:text-5xl">
                  {formatCLP(totalCheapest)}
                </span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-widest text-ink-mute">Total eligiendo el más caro</span>
                <span className="mt-1 block font-editorial editorial-num text-2xl font-medium text-ink-mute line-through md:text-3xl">
                  {formatCLP(totalExpensive)}
                </span>
              </div>
              <div className="rule-thick pt-4">
                <span className="block text-[11px] uppercase tracking-widest text-accent-oxblood">Ahorro al comparar</span>
                <span className="mt-1 block font-editorial editorial-num text-4xl font-semibold text-accent-oxblood md:text-6xl">
                  {formatCLP(ahorro)}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-lg border border-ink-line bg-paper-deep">
              <div className="grid grid-cols-12 gap-3 border-b border-ink-line bg-ink px-5 py-3 text-[10px] uppercase tracking-widest text-paper">
                <span className="col-span-6">Producto</span>
                <span className="col-span-3">Mejor super</span>
                <span className="col-span-2 text-right">Precio</span>
                <span className="col-span-1 text-right">Δ%</span>
              </div>
              <ul className="divide-y divide-ink-line">
                {items.map((g) => (
                  <li key={g.ean} className="grid grid-cols-12 items-baseline gap-3 px-5 py-4">
                    <div className="col-span-6 min-w-0">
                      <div className="font-editorial text-base font-medium leading-tight text-ink">
                        {g.producto}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
                        {g.marca || "—"}
                      </div>
                    </div>
                    <div className="col-span-3 font-mono text-xs uppercase tracking-wider text-accent-mint">
                      {g.cheapest.super}
                    </div>
                    <div className="col-span-2 text-right font-editorial editorial-num text-base font-medium text-ink">
                      {formatCLP(g.cheapest.precio)}
                    </div>
                    <div className="col-span-1 text-right font-mono text-xs text-accent-oxblood">
                      −{Math.round(g.ahorro_pct)}%
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
