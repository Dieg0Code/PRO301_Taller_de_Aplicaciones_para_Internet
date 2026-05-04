"use client";

import { useEffect, useState } from "react";
import { IconCart, IconSearch } from "./Icon";
import { getList, onListChange } from "./list-store";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sync = () => setCount(getList().reduce((acc, x) => acc + x.qty, 0));
    sync();
    return onListChange(sync);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-white transition-shadow ${
        scrolled ? "shadow-sm" : "border-b border-gray-100"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-white">
            <BrandMark />
          </span>
          <span className="text-lg font-semibold tracking-tight text-gray-900">
            La Cuenta
          </span>
          <span className="hidden text-xs font-medium text-gray-400 md:inline">· Osorno</span>
        </a>

        <nav className="hidden gap-1 md:flex">
          <NavLink href="#destacados">Destacados</NavLink>
          <NavLink href="#buscador">Buscar</NavLink>
          <NavLink href="#mi-lista">Mi lista</NavLink>
          <NavLink href="#metodo">Cómo funciona</NavLink>
        </nav>

        <a
          href="#mi-lista"
          className="relative inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand md:px-5"
        >
          <IconCart size={16} />
          <span className="hidden sm:inline">Mi lista</span>
          {count > 0 && (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-deal px-1.5 text-[11px] font-semibold tabular text-white">
              {count}
            </span>
          )}
        </a>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
    >
      {children}
    </a>
  );
}

function BrandMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 7h18l-2 12H5L3 7z" />
      <path d="M8 7V5a4 4 0 0 1 8 0v2" />
    </svg>
  );
}
