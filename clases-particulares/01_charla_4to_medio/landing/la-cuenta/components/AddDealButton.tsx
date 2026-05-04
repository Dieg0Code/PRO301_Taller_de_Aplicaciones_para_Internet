"use client";

import { useState } from "react";
import type { ProductGroup } from "@/lib/db";
import { addToList } from "./list-store";

export default function AddDealButton({ deal }: { deal: ProductGroup }) {
  const [added, setAdded] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        addToList(deal);
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
      }}
      className="rounded-full border border-ink bg-transparent px-3 py-1.5 text-[10px] uppercase tracking-widest text-ink transition hover:bg-ink hover:text-paper"
    >
      {added ? "✓ agregado" : "+ a mi lista"}
    </button>
  );
}
