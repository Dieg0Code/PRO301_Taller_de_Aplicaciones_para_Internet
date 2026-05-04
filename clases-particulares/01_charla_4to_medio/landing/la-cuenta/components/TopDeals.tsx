import type { ProductGroup } from "@/lib/db";
import { formatCLP } from "@/lib/db";
import AddDealButton from "./AddDealButton";

export default function TopDeals({ deals }: { deals: ProductGroup[] }) {
  return (
    <section id="top-ahorros" className="relative bg-paper-deep py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="rule-thick mb-12 flex items-end justify-between pb-4">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-accent-oxblood">Top de ahorros</span>
            <h2 className="mt-3 max-w-3xl font-editorial text-4xl font-medium tracking-tightest md:text-6xl">
              Donde elegir bien <span className="italic">cambia</span> la cuenta.
            </h2>
          </div>
          <span className="hidden font-mono text-[11px] uppercase tracking-widest text-ink-mute md:inline">
            §2
          </span>
        </div>

        <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">
          Ordenado por porcentaje de ahorro: el mismo producto puede costar el doble si lo compras en el super equivocado.
        </p>

        <ol className="mt-12 divide-y divide-ink-line border-y border-ink-line">
          {deals.map((d, i) => (
            <li
              key={d.ean}
              className="grid grid-cols-12 items-baseline gap-4 py-6 transition hover:bg-paper md:gap-8"
            >
              <span className="col-span-1 font-editorial editorial-num text-2xl font-medium text-accent-oxblood md:text-3xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="col-span-7 min-w-0 md:col-span-6">
                <h3 className="font-editorial text-lg font-medium leading-tight text-ink md:text-2xl">
                  {d.producto}
                </h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-ink-mute">
                  {d.marca || "—"} · {d.ofertas.length} super{d.ofertas.length === 1 ? "" : "s"}
                </p>
              </div>
              <div className="col-span-2 hidden text-right md:block">
                <div className="font-editorial editorial-num text-xl font-medium text-ink">
                  {formatCLP(d.cheapest.precio)}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-accent-mint">
                  {d.cheapest.super}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-ink-mute line-through">
                  {formatCLP(d.mostExpensive.precio)} · {d.mostExpensive.super}
                </div>
              </div>
              <div className="col-span-3 text-right md:col-span-2">
                <div className="font-editorial editorial-num text-3xl font-semibold leading-none text-accent-oxblood md:text-5xl">
                  −{Math.round(d.ahorro_pct)}<span className="text-2xl">%</span>
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ink-mute">
                  ahorras {formatCLP(d.ahorro_clp)}
                </div>
              </div>
              <div className="col-span-12 md:col-span-1 md:text-right">
                <AddDealButton deal={d} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
