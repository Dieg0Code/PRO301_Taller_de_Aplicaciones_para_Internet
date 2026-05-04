"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Category, ProductGroup } from "@/lib/db";
import { addToList, getList, onListChange } from "./list-store";
import {
  IconCheck,
  IconChevronDown,
  IconClose,
  IconFilter,
  IconPlus,
  IconSearch,
  IconStore,
  IconTag,
} from "./Icon";

function formatCLP(n: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

const CATEGORIES_LIST: Category[] = [
  "Lácteos",
  "Bebidas",
  "Abarrotes",
  "Snacks",
  "Limpieza",
  "Carnes",
  "Panadería",
  "Frutas y verduras",
];

type SortMode = "cheapest" | "expensive" | "biggestSavings" | "az";

const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: "cheapest", label: "Más barato primero" },
  { value: "expensive", label: "Más caro primero" },
  { value: "biggestSavings", label: "Mayor ahorro" },
  { value: "az", label: "Alfabético A–Z" },
];

export default function Search({ supers }: { supers: string[] }) {
  const [query, setQuery] = useState("");
  const [supersFilter, setSupersFilter] = useState<string[]>([]);
  const [catsFilter, setCatsFilter] = useState<Category[]>([]);
  const [sort, setSort] = useState<SortMode>("cheapest");
  const [results, setResults] = useState<ProductGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [listEans, setListEans] = useState<Set<string>>(new Set());
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const sync = () => setListEans(new Set(getList().map((x) => x.ean)));
    sync();
    return onListChange(sync);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ q?: string }>).detail;
      if (detail?.q !== undefined) setQuery(detail.q);
      requestAnimationFrame(() => inputRef.current?.focus());
    };
    window.addEventListener("lacuenta:search", handler as EventListener);
    return () => window.removeEventListener("lacuenta:search", handler as EventListener);
  }, []);

  // Debounced fetch
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const hasFilters = supersFilter.length > 0 || catsFilter.length > 0;
    const hasQuery = query.trim().length >= 2;
    if (!hasQuery && !hasFilters) {
      setResults([]);
      setHasSearched(false);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const params = new URLSearchParams();
        if (hasQuery) params.set("q", query);
        if (supersFilter.length > 0) params.set("supers", supersFilter.join(","));
        if (catsFilter.length > 0) params.set("categories", catsFilter.join(","));
        params.set("limit", "30");
        const res = await fetch(`/api/search?${params.toString()}`);
        const data = (await res.json()) as { results: ProductGroup[] };
        setResults(data.results ?? []);
        setHasSearched(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 220);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, supersFilter, catsFilter]);

  // Client-side sort
  const sortedResults = useMemo(() => {
    const arr = [...results];
    switch (sort) {
      case "cheapest":
        arr.sort((a, b) => a.cheapest.precio - b.cheapest.precio);
        break;
      case "expensive":
        arr.sort((a, b) => b.cheapest.precio - a.cheapest.precio);
        break;
      case "biggestSavings":
        arr.sort((a, b) => b.ahorro_pct - a.ahorro_pct);
        break;
      case "az":
        arr.sort((a, b) => a.producto.localeCompare(b.producto, "es"));
        break;
    }
    return arr;
  }, [results, sort]);

  const toggleSuper = (s: string) =>
    setSupersFilter((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  const toggleCat = (c: Category) =>
    setCatsFilter((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  const activeFilters = supersFilter.length + catsFilter.length;
  const placeholder = "Buscar leche, arroz, coca cola, papel higiénico…";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-5">
      {/* Search input */}
      <label className="relative block">
        <span className="sr-only">Buscar productos</span>
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <IconSearch size={20} />
        </span>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-12 text-base text-gray-900 placeholder:text-gray-400 transition focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20"
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 grid h-7 w-7 place-items-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="limpiar"
          >
            <IconClose size={16} />
          </button>
        )}
      </label>

      {/* Toolbar: filters + sort + count */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
              filtersOpen || activeFilters > 0
                ? "border-brand bg-brand-50 text-brand-dark"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
            }`}
          >
            <IconFilter size={14} />
            Filtros
            {activeFilters > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1.5 text-[11px] font-semibold text-white">
                {activeFilters}
              </span>
            )}
          </button>
          {hasSearched && results.length > 0 && (
            <SortMenu value={sort} onChange={setSort} />
          )}
        </div>
        <span className="text-xs font-medium text-gray-500 tabular">
          {loading ? "Buscando…" : hasSearched ? `${results.length} resultados` : ""}
        </span>
      </div>

      {/* Active filter chips */}
      {(supersFilter.length > 0 || catsFilter.length > 0) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {supersFilter.map((s) => (
            <ActiveChip key={`s-${s}`} icon={<IconStore size={12} />} onRemove={() => toggleSuper(s)}>
              {s}
            </ActiveChip>
          ))}
          {catsFilter.map((c) => (
            <ActiveChip key={`c-${c}`} icon={<IconTag size={12} />} onRemove={() => toggleCat(c)}>
              {c}
            </ActiveChip>
          ))}
          <button
            type="button"
            onClick={() => {
              setSupersFilter([]);
              setCatsFilter([]);
            }}
            className="text-xs font-medium text-gray-500 underline-offset-2 hover:text-gray-900 hover:underline"
          >
            limpiar todo
          </button>
        </div>
      )}

      {/* Filters panel */}
      {filtersOpen && (
        <div className="mt-4 grid gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <FilterGroup icon={<IconStore size={14} />} label="Supermercado">
            {supers.map((s) => {
              const active = supersFilter.includes(s);
              return (
                <FilterChip key={s} active={active} onClick={() => toggleSuper(s)}>
                  {active && <IconCheck size={12} />}
                  {s}
                </FilterChip>
              );
            })}
          </FilterGroup>
          <FilterGroup icon={<IconTag size={14} />} label="Categoría">
            {CATEGORIES_LIST.map((c) => {
              const active = catsFilter.includes(c);
              return (
                <FilterChip key={c} active={active} onClick={() => toggleCat(c)} accent="deal">
                  {active && <IconCheck size={12} />}
                  {c}
                </FilterChip>
              );
            })}
          </FilterGroup>
        </div>
      )}

      {/* Results */}
      <div className="mt-5">
        {!hasSearched && !loading && <EmptyState />}
        {hasSearched && results.length === 0 && !loading && (
          <div className="rounded-xl bg-gray-50 p-8 text-center">
            <p className="text-base font-semibold text-gray-900">No encontramos nada</p>
            <p className="mt-1 text-sm text-gray-500">
              Intenta con otra palabra o quita alguno de los filtros.
            </p>
          </div>
        )}
        {sortedResults.length > 0 && (
          <ul className="max-h-[640px] divide-y divide-gray-100 overflow-y-auto rounded-xl border border-gray-100 scroll-thin">
            {sortedResults.map((g) => (
              <ResultRow key={g.ean} g={g} added={listEans.has(g.ean)} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  const examples = ["leche colun", "arroz", "coca cola", "aceite", "pan de molde", "yoghurt", "papel higiénico"];
  return (
    <div className="rounded-xl bg-gray-50 p-6">
      <p className="text-sm font-medium text-gray-700">Pruebas rápidas</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {examples.map((ex) => (
          <span
            key={ex}
            className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-600"
          >
            {ex}
          </span>
        ))}
      </div>
    </div>
  );
}

function ActiveChip({
  children,
  icon,
  onRemove,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-dark">
      <span className="text-brand">{icon}</span>
      {children}
      <button
        type="button"
        onClick={onRemove}
        className="-mr-1 grid h-5 w-5 place-items-center rounded-full text-brand-dark/60 transition hover:bg-brand-500/10 hover:text-brand-dark"
        aria-label="quitar"
      >
        <IconClose size={12} />
      </button>
    </span>
  );
}

function FilterGroup({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
        {icon}
        {label}
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
  accent = "brand",
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  accent?: "brand" | "deal";
}) {
  const activeClass =
    accent === "deal"
      ? "border-deal bg-deal text-white"
      : "border-brand bg-brand text-white";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition ${
        active ? activeClass : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
      }`}
    >
      {children}
    </button>
  );
}

function SortMenu({ value, onChange }: { value: SortMode; onChange: (v: SortMode) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const current = SORT_OPTIONS.find((o) => o.value === value)!;
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:border-gray-300"
      >
        Ordenar: <span className="text-gray-900">{current.label}</span>
        <IconChevronDown size={14} className={`transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-10 mt-1 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          {SORT_OPTIONS.map((opt) => {
            const active = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition ${
                  active ? "bg-brand-50 font-semibold text-brand-dark" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {opt.label}
                {active && <IconCheck size={14} className="text-brand" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ResultRow({ g, added }: { g: ProductGroup; added: boolean }) {
  const [justAdded, setJustAdded] = useState(false);
  const handleAdd = () => {
    addToList(g);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1000);
  };
  const showAhorro = g.ofertas.length >= 2 && g.ahorro_pct >= 1;
  return (
    <li className="flex items-center justify-between gap-3 px-4 py-3 transition hover:bg-gray-50 md:px-5">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <h4 className="text-sm font-semibold text-gray-900 md:text-[15px]">
            {g.producto}
          </h4>
          {showAhorro && (
            <span className="rounded-md bg-deal-light px-1.5 py-0.5 text-[10px] font-bold tabular text-deal-dark">
              −{Math.round(g.ahorro_pct)}%
            </span>
          )}
        </div>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-gray-500">
          <span className="font-medium text-gray-600">{g.category}</span>
          {g.marca && <span>· {g.marca}</span>}
          <span>· {g.ofertas.length} super{g.ofertas.length === 1 ? "" : "s"}</span>
        </div>
      </div>
      <div className="flex flex-none items-center gap-3">
        <div className="text-right">
          <div className="text-base font-bold tabular text-gray-900 md:text-lg">
            {formatCLP(g.cheapest.precio)}
          </div>
          <div className="text-[10px] font-medium text-brand-dark">
            en {g.cheapest.super}
          </div>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={justAdded}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition ${
            justAdded
              ? "bg-brand-500 text-white"
              : added
              ? "border border-brand bg-white text-brand hover:bg-brand-50"
              : "bg-gray-900 text-white hover:bg-brand"
          }`}
        >
          {justAdded ? (
            <>
              <IconCheck size={14} />
              <span className="hidden sm:inline">Agregado</span>
            </>
          ) : added ? (
            <>
              <IconPlus size={14} />
              <span className="hidden sm:inline">Sumar</span>
            </>
          ) : (
            <>
              <IconPlus size={14} />
              <span className="hidden sm:inline">Agregar</span>
            </>
          )}
        </button>
      </div>
    </li>
  );
}
