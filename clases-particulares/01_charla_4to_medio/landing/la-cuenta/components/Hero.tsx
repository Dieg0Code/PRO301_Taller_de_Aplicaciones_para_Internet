"use client";

import { useState } from "react";
import { IconSearch } from "./Icon";

type HeroProps = {
  totalProductos: number;
  totalSupers: number;
  ahorroPctMax: number;
  ahorroPctPromedio: number;
};

export default function Hero({
  totalProductos,
  totalSupers,
  ahorroPctMax,
  ahorroPctPromedio,
}: HeroProps) {
  const [q, setQ] = useState("");

  const goToSearch = (query: string) => {
    const target = document.getElementById("buscador");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.dispatchEvent(
      new CustomEvent("lacuenta:search", { detail: { q: query } }),
    );
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goToSearch(q);
  };

  const suggestions = ["leche", "arroz", "coca cola", "aceite", "papel higiénico"];

  return (
    <section id="top" className="border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            {totalSupers} supermercados · Osorno · 2026
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            Compara precios y arma tu lista.
            <br className="hidden md:inline" />{" "}
            <span className="text-brand">Ahorra hasta {Math.round(ahorroPctMax)}%</span>
            <span className="text-gray-900">.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">
            Precios reales de los supermercados de Osorno. Encuentra dónde te conviene comprar antes de salir.
          </p>

          {/* Buscador puente */}
          <form onSubmit={onSubmit} className="mx-auto mt-8 max-w-xl">
            <label className="relative block">
              <span className="sr-only">Buscar productos</span>
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <IconSearch size={20} />
              </span>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar leche, arroz, coca cola…"
                className="w-full rounded-xl border border-gray-200 bg-white py-4 pl-12 pr-28 text-base text-gray-900 placeholder:text-gray-400 shadow-sm transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                autoComplete="off"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand"
              >
                Buscar
              </button>
            </label>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs text-gray-500">
              <span>Prueba con</span>
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setQ(s);
                    goToSearch(s);
                  }}
                  className="rounded-full border border-gray-200 bg-white px-2.5 py-0.5 font-medium text-gray-700 transition hover:border-gray-400 hover:text-gray-900"
                >
                  {s}
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* Stats inline */}
        <dl className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-8 border-t border-gray-100 pt-8 md:grid-cols-4">
          <Stat label="Productos" value={totalProductos.toLocaleString("es-CL")} />
          <Stat label="Supermercados" value={String(totalSupers)} />
          <Stat label="Ahorro máximo" value={`${Math.round(ahorroPctMax)}%`} accent />
          <Stat label="Ahorro promedio" value={`${Math.round(ahorroPctPromedio)}%`} />
        </dl>
      </div>
    </section>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="text-center md:text-left">
      <dt className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
        {label}
      </dt>
      <dd
        className={`mt-1 text-2xl font-bold leading-none tabular md:text-3xl ${
          accent ? "text-brand" : "text-gray-900"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
