"use client";

import type { ProductGroup } from "@/lib/db";

export type ListItem = {
  ean: string;
  producto: string;
  marca: string;
  ofertas: { super: string; precio: number }[];
  qty: number;
};

const STORAGE_KEY = "la_cuenta_lista";
const EVENT = "la-cuenta:list-changed";

function safeParse(): ListItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getList(): ListItem[] {
  return safeParse();
}

function persist(list: ListItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function addToList(g: ProductGroup) {
  const list = safeParse();
  const idx = list.findIndex((x) => x.ean === g.ean);
  if (idx >= 0) {
    list[idx].qty += 1;
  } else {
    list.push({
      ean: g.ean,
      producto: g.producto,
      marca: g.marca,
      ofertas: g.ofertas.map((o) => ({ super: o.super, precio: o.precio })),
      qty: 1,
    });
  }
  persist(list);
}

export function updateQty(ean: string, qty: number) {
  const list = safeParse();
  const idx = list.findIndex((x) => x.ean === ean);
  if (idx < 0) return;
  if (qty <= 0) list.splice(idx, 1);
  else list[idx].qty = qty;
  persist(list);
}

export function removeFromList(ean: string) {
  const list = safeParse().filter((x) => x.ean !== ean);
  persist(list);
}

export function clearList() {
  persist([]);
}

export function onListChange(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => cb();
  window.addEventListener(EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

/**
 * Compute the total cost of the list at every super.
 * For supers that don't have a given product, we use the cheapest available price as fallback
 * so the comparison is fair (the user could go to that super and use the cheapest version).
 * Actually we use the price of the same product at the cheapest super as the missing-fallback.
 */
export function computeTotals(list: ListItem[], allSupers: string[]) {
  type Total = { super: string; total: number; missing: number };
  const result: Total[] = allSupers.map((s) => ({ super: s, total: 0, missing: 0 }));
  for (const item of list) {
    const cheapest = item.ofertas.reduce(
      (acc, o) => (o.precio < acc ? o.precio : acc),
      Number.POSITIVE_INFINITY,
    );
    for (const t of result) {
      const o = item.ofertas.find((x) => x.super === t.super);
      if (o) {
        t.total += o.precio * item.qty;
      } else {
        t.total += cheapest * item.qty;
        t.missing += item.qty;
      }
    }
  }
  return result.sort((a, b) => a.total - b.total);
}
