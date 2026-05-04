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
import {
  IconCart,
  IconCheck,
  IconClose,
  IconMinus,
  IconPlus,
  IconPrinter,
  IconRoute,
  IconStore,
  IconTrash,
} from "./Icon";

function formatCLP(n: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

function bestOffer(item: ListItem) {
  return item.ofertas.reduce(
    (acc, o) => (o.precio < acc.precio ? o : acc),
    item.ofertas[0],
  );
}

function buildRoute(list: ListItem[]) {
  const groups = new Map<string, { super: string; items: { item: ListItem; precio: number }[]; total: number }>();
  for (const item of list) {
    const best = bestOffer(item);
    if (!best) continue;
    const cur = groups.get(best.super) ?? { super: best.super, items: [], total: 0 };
    cur.items.push({ item, precio: best.precio });
    cur.total += best.precio * item.qty;
    groups.set(best.super, cur);
  }
  return [...groups.values()].sort((a, b) => b.total - a.total);
}

export default function ListSidebar({ supers }: { supers: string[] }) {
  const [list, setList] = useState<ListItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setList(getList());
    setHydrated(true);
    return onListChange(() => setList(getList()));
  }, []);

  const totals = useMemo(() => (hydrated ? computeTotals(list, supers) : []), [list, supers, hydrated]);
  const route = useMemo(() => buildRoute(list), [list]);
  const totalItems = list.reduce((acc, x) => acc + x.qty, 0);
  const cherryTotal = useMemo(
    () => route.reduce((acc, r) => acc + r.total, 0),
    [route],
  );
  const bestSingleSuper = totals[0];
  const ahorroVsSingle =
    bestSingleSuper && cherryTotal > 0 ? bestSingleSuper.total - cherryTotal : 0;

  if (!hydrated) return null;

  return (
    <>
      <div className="hidden lg:block lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto scroll-thin">
        <ListPanel
          list={list}
          totals={totals}
          route={route}
          cherryTotal={cherryTotal}
          ahorroVsSingle={ahorroVsSingle}
          totalItems={totalItems}
          onClose={() => setDrawerOpen(false)}
          isModal={false}
        />
      </div>

      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-gray-900 px-5 py-3 text-white shadow-lg transition hover:bg-brand lg:hidden"
        aria-label="abrir mi lista"
      >
        <IconCart size={20} />
        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1.5 text-xs font-semibold tabular">
          {totalItems}
        </span>
        {cherryTotal > 0 && (
          <span className="border-l border-white/20 pl-3 text-xs tabular">
            {formatCLP(cherryTotal)}
          </span>
        )}
      </button>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex flex-col lg:hidden">
          <button
            type="button"
            className="flex-1 bg-gray-900/40 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
            aria-label="cerrar"
          />
          <div className="max-h-[88vh] overflow-y-auto rounded-t-2xl bg-white p-5 shadow-2xl">
            <ListPanel
              list={list}
              totals={totals}
              route={route}
              cherryTotal={cherryTotal}
              ahorroVsSingle={ahorroVsSingle}
              totalItems={totalItems}
              onClose={() => setDrawerOpen(false)}
              isModal
            />
          </div>
        </div>
      )}
    </>
  );
}

type Route = ReturnType<typeof buildRoute>;

type PanelProps = {
  list: ListItem[];
  totals: ReturnType<typeof computeTotals>;
  route: Route;
  cherryTotal: number;
  ahorroVsSingle: number;
  totalItems: number;
  onClose: () => void;
  isModal: boolean;
};

function ListPanel({
  list,
  totals,
  route,
  cherryTotal,
  ahorroVsSingle,
  totalItems,
  onClose,
  isModal,
}: PanelProps) {
  const itemsCount = list.length;
  const handlePrint = () => {
    document.body.classList.add("print-list");
    window.print();
    setTimeout(() => document.body.classList.remove("print-list"), 100);
  };

  return (
    <div data-print="lista" className="rounded-xl border border-gray-200 bg-white p-5 md:p-6">
      <div className="mb-4 flex items-center gap-3">
        <h3 className="text-lg font-bold tracking-tight text-gray-900 md:text-xl">
          Tu lista
        </h3>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold tabular text-gray-700">
          <IconCart size={12} />
          {totalItems}
        </span>
        {isModal && (
          <button
            type="button"
            onClick={onClose}
            className="grid h-7 w-7 place-items-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-900"
            aria-label="cerrar"
          >
            <IconClose size={18} />
          </button>
        )}
      </div>

      {list.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
          <IconCart size={28} className="mx-auto text-gray-300" />
          <p className="mt-3 text-sm font-semibold text-gray-900">
            Tu lista está vacía
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Agrega productos desde el buscador, o prueba con la canasta básica.
          </p>
        </div>
      ) : (
        <>
          {/* Total óptimo */}
          <div className="mb-4 rounded-xl border border-brand bg-brand-50 p-4">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-brand-dark">
              Total óptimo
            </div>
            <div className="mt-1 flex items-baseline justify-between gap-3">
              <span className="text-3xl font-bold tabular text-gray-900">
                {formatCLP(cherryTotal)}
              </span>
              <span className="text-xs font-semibold text-brand-dark">
                {route.length} {route.length === 1 ? "super" : "supers"}
              </span>
            </div>
            {ahorroVsSingle > 0 && bestSingleSuperName(totals) && (
              <p className="mt-1 text-[11px] text-gray-600">
                Ahorras {formatCLP(ahorroVsSingle)} vs comprar todo en {bestSingleSuperName(totals)}.
              </p>
            )}
          </div>

          {/* Hoja de ruta */}
          <div className="mb-4 rounded-xl border border-gray-200 bg-white p-4">
            <div className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              <IconRoute size={12} /> Hoja de ruta
            </div>
            <ul className="space-y-3">
              {route.map((r) => (
                <li key={r.super} className="border-l-2 border-brand pl-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-bold text-gray-900">{r.super}</span>
                    <span className="text-sm font-semibold tabular text-gray-700">
                      {formatCLP(r.total)}
                    </span>
                  </div>
                  <div className="mt-1 text-[12px] text-gray-600">
                    {r.items
                      .map((x) => x.item.qty > 1 ? `${x.item.producto} ×${x.item.qty}` : x.item.producto)
                      .join(" · ")}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Items */}
          <ul className="divide-y divide-gray-100 max-h-[320px] overflow-y-auto scroll-thin">
            {list.map((item) => {
              const best = bestOffer(item);
              const minPrice = best?.precio ?? 0;
              const maxPrice = item.ofertas.reduce(
                (acc, o) => Math.max(acc, o.precio),
                0,
              );
              const hasRange = item.ofertas.length > 1 && maxPrice > minPrice;
              return (
                <li key={item.ean} className="py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold text-gray-900">
                        {item.producto}
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px]">
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 font-semibold text-brand-dark">
                          <IconStore size={10} />
                          {best?.super ?? "—"}
                        </span>
                        <span className="font-semibold tabular text-gray-900">
                          {formatCLP(minPrice)}
                        </span>
                        {hasRange && (
                          <span className="text-gray-400 tabular">
                            · hasta {formatCLP(maxPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-none items-center gap-1">
                      <button
                        type="button"
                        onClick={() => updateQty(item.ean, item.qty - 1)}
                        className="grid h-7 w-7 place-items-center rounded-full border border-gray-200 text-gray-500 transition hover:border-gray-400 hover:text-gray-900"
                        aria-label="restar"
                      >
                        <IconMinus size={14} />
                      </button>
                      <span className="w-7 text-center text-sm font-semibold tabular text-gray-900">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.ean, item.qty + 1)}
                        className="grid h-7 w-7 place-items-center rounded-full border border-gray-200 text-gray-500 transition hover:border-gray-400 hover:text-gray-900"
                        aria-label="sumar"
                      >
                        <IconPlus size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromList(item.ean)}
                        className="ml-1 grid h-7 w-7 place-items-center rounded-full text-gray-400 transition hover:bg-gray-50 hover:text-danger"
                        aria-label="quitar"
                      >
                        <IconTrash size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Comparativa por super (referencial) */}
          <details className="mt-4 rounded-xl bg-gray-50 p-4">
            <summary className="flex cursor-pointer items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              <IconStore size={12} /> Comparar contra comprar en un solo super
            </summary>
            <ul className="mt-3 space-y-1.5">
              {totals.map((t, i) => {
                const available = itemsCount - Math.min(t.missing, itemsCount);
                return (
                  <li key={t.super} className="flex items-baseline justify-between gap-2 text-sm">
                    <span className="flex flex-wrap items-center gap-x-2">
                      {i === 0 ? (
                        <IconCheck size={12} className="text-brand" />
                      ) : (
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-300" />
                      )}
                      <span className={i === 0 ? "font-semibold text-gray-900" : "text-gray-600"}>
                        {t.super}
                      </span>
                      <span className="text-[10px] text-gray-400 tabular">
                        {available}/{itemsCount}
                      </span>
                    </span>
                    <span className={`tabular ${i === 0 ? "font-semibold text-brand-dark" : "text-gray-500"}`}>
                      {formatCLP(t.total)}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-2 text-[10px] text-gray-400">
              Para los productos sin precio en un super usamos el mínimo encontrado.
            </p>
          </details>

          <div className="mt-4 grid grid-cols-2 gap-2 print:hidden">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white py-2 text-xs font-semibold text-gray-700 transition hover:border-gray-400"
            >
              <IconPrinter size={12} /> Imprimir
            </button>
            <button
              type="button"
              onClick={() => clearList()}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white py-2 text-xs font-semibold text-gray-500 transition hover:border-danger hover:text-danger"
            >
              <IconTrash size={12} /> Vaciar lista
            </button>
          </div>

          <p className="mt-3 text-center text-[10px] text-gray-400 print:hidden">
            La lista se guarda en este dispositivo. Sin servidor, sin cuentas.
          </p>
        </>
      )}
    </div>
  );
}

function bestSingleSuperName(totals: ReturnType<typeof computeTotals>) {
  return totals[0]?.super ?? "";
}
