"use client";

import { useEffect, useState } from "react";
import type { ProductGroup } from "@/lib/db";
import { addToList, getList, onListChange } from "./list-store";
import { IconCheck, IconPlus } from "./Icon";
import { openProductDetail } from "./ProductDetail";

function formatCLP(n: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

export default function ProductCard({ product }: { product: ProductGroup }) {
  const [added, setAdded] = useState(false);
  const [inList, setInList] = useState(false);

  useEffect(() => {
    const check = () => setInList(getList().some((x) => x.ean === product.ean));
    check();
    return onListChange(check);
  }, [product.ean]);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToList(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 900);
  };

  const showAhorro = product.ofertas.length >= 2 && product.ahorro_pct >= 1;

  return (
    <article
      onClick={() => openProductDetail(product)}
      className="group flex cursor-pointer flex-col rounded-2xl border border-gray-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-card-hover md:p-5"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
          {product.category}
        </span>
        {showAhorro && (
          <span className="inline-flex items-center rounded-md bg-deal-light px-2 py-0.5 text-xs font-bold tabular text-deal-dark">
            −{Math.round(product.ahorro_pct)}%
          </span>
        )}
      </div>

      <h3 className="text-[15px] font-semibold leading-snug text-gray-900 line-clamp-2 min-h-[2.6rem]">
        {product.producto}
      </h3>

      <div className="mt-1 text-xs font-medium text-gray-500">
        {product.marca || "Sin marca"}
      </div>

      <div className="mt-4 border-t border-gray-100 pt-3">
        <div className="flex items-baseline justify-between gap-2">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
              Mejor precio
            </div>
            <div className="mt-0.5 text-2xl font-bold leading-none tabular text-gray-900">
              {formatCLP(product.cheapest.precio)}
            </div>
          </div>
          {showAhorro && (
            <div className="text-right">
              <div className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                Más caro
              </div>
              <div className="mt-0.5 text-sm font-medium tabular text-gray-400 line-through">
                {formatCLP(product.mostExpensive.precio)}
              </div>
            </div>
          )}
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-xs">
          <span className="h-2 w-2 rounded-full bg-brand-500" />
          <span className="font-semibold text-brand-dark">
            {product.cheapest.super}
          </span>
          {showAhorro && (
            <span className="text-gray-400">
              · ahorras {formatCLP(product.ahorro_clp)}
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={added}
        className={`mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-semibold transition ${
          added
            ? "border-brand bg-brand text-white"
            : inList
            ? "border-brand bg-brand-50 text-brand-dark hover:bg-brand-100"
            : "border-gray-200 bg-white text-gray-700 hover:border-brand hover:bg-brand-50 hover:text-brand-dark"
        }`}
      >
        {added ? (
          <>
            <IconCheck size={14} /> Agregado
          </>
        ) : inList ? (
          <>
            <IconPlus size={14} /> Sumar otro
          </>
        ) : (
          <>
            <IconPlus size={14} /> Agregar
          </>
        )}
      </button>
    </article>
  );
}
