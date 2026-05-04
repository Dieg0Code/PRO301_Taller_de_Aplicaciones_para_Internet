"use client";

import { useState } from "react";
import type { ProductGroup } from "@/lib/db";
import { addToList } from "./list-store";
import { IconCart, IconCheck, IconSparkles } from "./Icon";

export default function CanastaButton() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleClick = async () => {
    if (loading || done) return;
    setLoading(true);
    try {
      const res = await fetch("/api/canasta");
      const data = (await res.json()) as { items: ProductGroup[] };
      for (const g of data.items ?? []) addToList(g);
      setDone(true);
      const target = document.getElementById("mi-lista");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => setDone(false), 1500);
    } catch {
      /* noop */
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-semibold transition ${
        done
          ? "border-brand bg-brand text-white"
          : "border-gray-200 bg-white text-gray-700 hover:border-brand hover:bg-brand-50 hover:text-brand-dark"
      }`}
      aria-label="cargar canasta básica"
    >
      {done ? <IconCheck size={14} /> : <IconSparkles size={14} className="text-brand" />}
      {done ? "Canasta cargada" : loading ? "Cargando…" : "Probar con canasta básica"}
    </button>
  );
}
