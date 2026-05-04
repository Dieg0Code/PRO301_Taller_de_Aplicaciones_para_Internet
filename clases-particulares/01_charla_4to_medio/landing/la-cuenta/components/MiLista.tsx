"use client";

import { useEffect, useMemo, useState } from "react";
import {
  type ListItem,
  clearList,
  computeTotals,
  getList,
  onListChange,
  removeFromList,
  updateQty,
} from "./list-store";

function formatCLP(n: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

export default function MiLista({ supers }: { supers: string[] }) {
  const [list, setList] = useState<ListItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setList(getList());
    setHydrated(true);
    return onListChange(() => setList(getList()));
  }, []);

  const totals = useMemo(() => (hydrated ? computeTotals(list, supers) : []), [list, supers, hydrated]);
  const cheapest = totals[0];
  const expensive = totals[totals.length - 1];
  const totalItems = list.reduce((acc, x) => acc + x.qty, 0);
  const ahorro = cheapest && expensive ? expensive.total - cheapest.total : 0;

  return (
    <section id="mi-lista" className="relative bg-paper-dark py-24 text-paper md:py-32">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="mb-12 flex items-end justify-between border-b-2 border-paper pb-4">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-accent-glow">Mi lista</span>
            <h2 className="mt-3 max-w-3xl font-editorial text-4xl font-medium tracking-tightest md:text-6xl">
              Tu canasta, comparada en vivo.
            </h2>
          </div>
          <span className="hidden font-mono text-[11px] uppercase tracking-widest text-paper/40 md:inline">
            §4
          </span>
        </div>

        {!hydrated ? null : list.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-12 lg:grid-cols-12">
            {/* List items */}
            <div className="lg:col-span-7">
              <div className="flex items-baseline justify-between border-b border-paper/15 pb-2">
                <span className="font-mono text-[11px] uppercase tracking-widest text-paper/60">
                  {totalItems} producto{totalItems === 1 ? "" : "s"} · {list.length} item{list.length === 1 ? "" : "s"}
                </span>
                <button
                  type="button"
                  onClick={() => clearList()}
                  className="font-mono text-[11px] uppercase tracking-widest text-paper/60 underline-offset-4 hover:text-accent-glow hover:underline"
                >
                  vaciar lista
                </button>
              </div>
              <ul className="divide-y divide-paper/10">
                {list.map((item) => {
                  const cheapestPrice = item.ofertas.reduce(
                    (acc, o) => Math.min(acc, o.precio),
                    Number.POSITIVE_INFINITY,
                  );
                  return (
                    <li key={item.ean} className="grid grid-cols-12 items-baseline gap-3 py-5">
                      <div className="col-span-7 min-w-0 md:col-span-8">
                        <h3 className="font-editorial text-lg font-medium leading-tight text-paper">
                          {item.producto}
                        </h3>
                        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-paper/50">
                          {item.marca || "—"} · desde {formatCLP(cheapestPrice)}
                        </p>
                      </div>
                      <div className="col-span-3 flex items-center justify-end gap-1 md:col-span-2">
                        <button
                          type="button"
                          onClick={() => updateQty(item.ean, item.qty - 1)}
                          className="grid h-8 w-8 place-items-center rounded-full border border-paper/30 text-paper/80 transition hover:border-accent-glow hover:text-accent-glow"
                          aria-label="restar"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-editorial editorial-num text-lg">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.ean, item.qty + 1)}
                          className="grid h-8 w-8 place-items-center rounded-full border border-paper/30 text-paper/80 transition hover:border-accent-glow hover:text-accent-glow"
                          aria-label="sumar"
                        >
                          +
                        </button>
                      </div>
                      <div className="col-span-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeFromList(item.ean)}
                          className="font-mono text-[10px] uppercase tracking-widest text-paper/40 underline-offset-4 hover:text-accent-glow hover:underline"
                        >
                          quitar
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Compare panel */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-paper p-6 text-ink shadow-2xl md:p-8">
                <span className="text-[11px] uppercase tracking-widest text-accent-oxblood">
                  Resultado · comparativa
                </span>
                <div className="mt-3 border-b-2 border-ink pb-3">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
                    Mejor opción
                  </div>
                  <div className="mt-1 font-editorial text-3xl font-medium text-ink md:text-5xl">
                    {cheapest?.super ?? "—"}
                  </div>
                  <div className="mt-2 font-editorial editorial-num text-4xl font-semibold text-accent-mint md:text-6xl">
                    {cheapest ? formatCLP(cheapest.total) : "—"}
                  </div>
                </div>

                <ul className="mt-4 space-y-2">
                  {totals.map((t, i) => (
                    <li key={t.super} className="flex items-baseline justify-between gap-3">
                      <span className="flex items-center gap-2">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            i === 0
                              ? "bg-accent-mint"
                              : i === totals.length - 1
                              ? "bg-accent-oxblood"
                              : "bg-ink-line"
                          }`}
                        />
                        <span className="font-medium text-ink">{t.super}</span>
                        {t.missing > 0 && (
                          <span className="font-mono text-[9px] uppercase tracking-widest text-ink-mute">
                            {t.missing} sin precio
                          </span>
                        )}
                      </span>
                      <span className="font-mono editorial-num text-ink-soft">
                        {formatCLP(t.total)}
                      </span>
                    </li>
                  ))}
                </ul>

                {ahorro > 0 && (
                  <div className="mt-6 rounded-xl bg-paper-deep p-5">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
                      Ahorro vs el más caro
                    </div>
                    <div className="mt-1 font-editorial editorial-num text-3xl font-semibold text-accent-oxblood md:text-4xl">
                      {formatCLP(ahorro)}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                      Comprando en <strong>{cheapest.super}</strong> en lugar de{" "}
                      <strong>{expensive.super}</strong> con esta misma lista.
                    </p>
                  </div>
                )}

                <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-ink-mute">
                  Lista guardada en este dispositivo. No enviamos datos a ningún servidor.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-paper/15 bg-paper/5 p-12 text-center md:p-16">
      <p className="mx-auto max-w-xl font-editorial text-2xl leading-snug text-paper md:text-4xl">
        Tu lista está vacía. Empieza buscando un producto o agrega la canasta básica.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          href="#buscador"
          className="rounded-full bg-paper px-6 py-3 text-sm font-medium tracking-wide text-ink transition hover:bg-accent-glow hover:text-paper"
        >
          Buscar productos
        </a>
        <a
          href="#top-ahorros"
          className="rounded-full border border-paper/30 px-6 py-3 text-sm font-medium tracking-wide text-paper transition hover:border-paper hover:bg-paper hover:text-ink"
        >
          Ver top de ahorros
        </a>
      </div>
    </div>
  );
}
