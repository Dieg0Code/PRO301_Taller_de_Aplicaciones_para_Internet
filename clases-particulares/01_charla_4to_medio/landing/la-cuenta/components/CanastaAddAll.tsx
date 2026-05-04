"use client";

import { useState } from "react";
import type { ProductGroup } from "@/lib/db";
import { addToList } from "./list-store";

export default function CanastaAddAll({ items }: { items: ProductGroup[] }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        items.forEach((g) => addToList(g));
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
      className="inline-flex items-center gap-3 rounded-full border-2 border-ink bg-ink px-6 py-3 text-sm font-medium tracking-wide text-paper transition hover:bg-accent-oxblood hover:border-accent-oxblood"
    >
      {done ? "✓ canasta agregada" : "Agregar canasta a mi lista"}
      {!done && <span aria-hidden>→</span>}
    </button>
  );
}
