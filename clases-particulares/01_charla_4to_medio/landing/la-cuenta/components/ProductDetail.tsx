"use client";

import { useEffect, useState } from "react";
import type { ProductGroup } from "@/lib/db";
import { addToList } from "./list-store";
import { IconCart, IconCheck, IconClose, IconStore } from "./Icon";

function formatCLP(n: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

export function openProductDetail(product: ProductGroup) {
  window.dispatchEvent(
    new CustomEvent("lacuenta:product-detail", { detail: { product } }),
  );
}

export default function ProductDetailHost() {
  const [product, setProduct] = useState<ProductGroup | null>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ product: ProductGroup }>).detail;
      setProduct(detail?.product ?? null);
      setAdded(false);
    };
    window.addEventListener("lacuenta:product-detail", handler as EventListener);
    return () =>
      window.removeEventListener("lacuenta:product-detail", handler as EventListener);
  }, []);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setProduct(null);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [product]);

  if (!product) return null;

  const sorted = [...product.ofertas].sort((a, b) => a.precio - b.precio);
  const min = sorted[0]?.precio ?? 0;
  const max = sorted[sorted.length - 1]?.precio ?? 0;
  const ahorro = max - min;
  const ahorroPct = max > 0 ? (ahorro / max) * 100 : 0;

  const handleAdd = () => {
    addToList(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-gray-900/40 backdrop-blur-sm md:items-center"
      onClick={() => setProduct(null)}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-t-2xl bg-white shadow-2xl md:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-5 py-4 md:px-6">
          <div className="min-w-0">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              {product.category}
            </span>
            <h3 className="mt-1 text-lg font-bold tracking-tight text-gray-900 md:text-xl">
              {product.producto}
            </h3>
            <p className="mt-0.5 text-sm text-gray-500">
              {product.marca || "Sin marca"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setProduct(null)}
            className="grid h-9 w-9 flex-none place-items-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-900"
            aria-label="cerrar"
          >
            <IconClose size={20} />
          </button>
        </div>

        <div className="px-5 py-4 md:px-6">
          <div className="rounded-xl bg-gray-50 p-4">
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                Mejor precio
              </span>
              {ahorro > 0 && (
                <span className="rounded-md bg-deal-light px-1.5 py-0.5 text-[10px] font-bold tabular text-deal-dark">
                  −{Math.round(ahorroPct)}% vs el más caro
                </span>
              )}
            </div>
            <div className="mt-1 flex items-baseline justify-between gap-3">
              <span className="text-3xl font-bold tabular text-gray-900">
                {formatCLP(min)}
              </span>
              <span className="text-sm font-semibold text-brand-dark">
                en {sorted[0]?.super}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              <IconStore size={12} /> Precio por supermercado
            </div>
            <ul className="divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-200">
              {sorted.map((o, i) => {
                const diff = o.precio - min;
                return (
                  <li
                    key={`${o.super}-${i}`}
                    className={`flex items-center justify-between gap-3 px-4 py-3 ${
                      i === 0 ? "bg-brand-50" : "bg-white"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {i === 0 && <IconCheck size={14} className="text-brand" />}
                      <span
                        className={
                          i === 0
                            ? "text-sm font-semibold text-gray-900"
                            : "text-sm text-gray-700"
                        }
                      >
                        {o.super}
                      </span>
                    </span>
                    <span className="flex items-baseline gap-2">
                      <span
                        className={`text-base font-bold tabular ${
                          i === 0 ? "text-brand-dark" : "text-gray-900"
                        }`}
                      >
                        {formatCLP(o.precio)}
                      </span>
                      {i > 0 && diff > 0 && (
                        <span className="text-[11px] font-medium text-gray-400 tabular">
                          +{formatCLP(diff)}
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
            {sorted.length < 6 && (
              <p className="mt-2 text-[11px] text-gray-400">
                Disponible en {sorted.length} de 6 supermercados.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={added}
            className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
              added
                ? "bg-brand text-white"
                : "bg-gray-900 text-white hover:bg-brand"
            }`}
          >
            {added ? <IconCheck size={16} /> : <IconCart size={16} />}
            {added ? "Agregado a tu lista" : "Agregar a mi lista"}
          </button>
        </div>
      </div>
    </div>
  );
}
